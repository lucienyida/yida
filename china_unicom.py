#!/usr/bin/python3
# -- coding: utf-8 --
# -------------------------------
# @Author : github@limoruirui https://github.com/limoruirui
# @Time : 2022/8/10 13:23
# -------------------------------
# cron "30 9 * * *" script-path=xxx.py,tag=匹配cron用
# const $ = new Env('某通阅读');
"""
联通app抽奖 入口:联通app 搜索 阅读专区 进入话费派送中
1. 脚本仅供学习交流使用, 请在下载后24h内删除
2. 需要第三方库 pycryptodome 支持 命令行安装 pip3 install pycryptodome或者根据自己环境自行安装
3. 环境变量说明 PHONE_NUM(必需) UNICOM_LOTTER(选填) 自行新建环境变量添加
    PHONE_NUM  格式：手机号#UA     多账号使用&隔开    UA(选填) 为联通app的useragent 随便一个数据包的请求头里应该都有 建议自己抓一个填上 不填也能跑 数据内容参考 line 49 双引号的内容
    UA例子：Mozilla/5.0 (iPhone; CPU iPhone OS 15_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 unicom{version:iphone_c@10.0001}
    UNICOM_LOTTER 默认自动抽奖, 若不需要 则添加环境变量值为 False
"""
"""
updateTime: 2023.1.1  log: 更新aes加密key
updateTime: 2022.12.1 log: 活动重新上架 改用 pycryptodome 替代 cryptography 进行aes加密
updateTime: 2022.9.1  log: 每个月活动id改变更新
"""

from requests import post, get
from time import sleep, time
from datetime import datetime
from hashlib import md5 as md5Encode
from random import randint, uniform, choice
from os import environ
from sys import stdout, exit
from base64 import b64encode
from json import dumps
from tools.notify import send
from tools.encrypt_symmetric import Crypt
from tools.send_msg import push
from tools.tool import get_environ, random_sleep
#random_sleep(0, 1600)
from tools.ql_api import get_cookie
import threading



msg_str = "联通话费兑换路径：联通APP搜索阅读--->阅读专区--->我的--->话费红包，可兑换3元或者5元话费抵扣券，最后使用沃钱包支付即可\n\n"

"""主类"""
class China_Unicom:
    def __init__(self, phone_num, run_ua):
        self.phone_num = phone_num
        default_ua = f"Mozilla/5.0 (Linux; Android {randint(8, 13)}; SM-S908U Build/TP1A.220810.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/{randint(95, 108)}.0.5359.128 Mobile Safari/537.36; unicom{{version:android@9.0{randint(0,6)}00,desmobile:{self.phone_num}}};devicetype{{deviceBrand:,deviceModel:}};{{yw_code:}}"
        #run_ua = get_environ(key="UNICOM_USERAGENT", default=default_ua, output=False)
        if run_ua is None or run_ua == "":
            run_ua = default_ua
        # print("使用的UA："+run_ua)

        self.headers = {
            "Host": "10010.woread.com.cn",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json;charset=utf-8",
            "Origin": "https://10010.woread.com.cn",
            "User-Agent": run_ua,
            "Connection": "keep-alive",
            "Referer": "https://10010.woread.com.cn/ng_woread/",
        }
        self.fail_num = 0

    def timestamp(self):
        return round(time() * 1000)

    def print_now(self, content):
        print(content)
        stdout.flush()

    def md5(self, str):
        m = md5Encode(str.encode(encoding='utf-8'))
        return m.hexdigest()

    def req(self, url, crypt_text, retry_num=5):
        while retry_num > 0:
            body = {
                "sign": b64encode(Crypt(crypt_type="AES", key="update!@#1234567", iv="16-Bytes--String", mode="CBC").encrypt(crypt_text).encode()).decode()
            }
            self.headers["Content-Length"] = str(len(dumps(body).replace(" ", "")))
            try:
                res = post(url, headers=self.headers, json=body)
                data = res.json()
                return data
            except Exception as e:
                print(f"本次请求失败, 正在重新发送请求 剩余次数{retry_num}")
                print(f"本次请求失败原因------{e}")
                retry_num -= 1
                sleep(5)
                return self.req(url, crypt_text, retry_num)

    def referer_login(self):
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        timestamp = self.timestamp()
        url = f"https://10010.woread.com.cn/ng_woread_service/rest/app/auth/10000002/{timestamp}/{self.md5(f'100000027k1HcDL8RKvc{timestamp}')}"
        crypt_text = f'{{"timestamp":"{date}"}}'
        body = {
            "sign": b64encode(Crypt(crypt_type="AES", key="1234567890abcdef").encrypt(crypt_text).encode()).decode()
        }
        self.headers["Content-Length"] = str(len(str(body)) - 1)
        data = post(url, headers=self.headers, json=body).json()
        if data["code"] == "0000":
            self.headers["accesstoken"] = data["data"]["accesstoken"]
        else:
            self.print_now(f"设备登录失败,日志为{data}")
            exit(0)

    def get_userinfo(self):
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        url = "https://10010.woread.com.cn/ng_woread_service/rest/account/login"
        crypt_text = f'{{"phone":"{self.phone_num}","timestamp":"{date}"}}'
        data = self.req(url, crypt_text)
        if data["code"] == "0000":
            self.userinfo = data["data"]
        else:
            self.print_now(f"手机号登录失败, 日志为{data}")
            exit(0)

    def watch_video(self):
        global msg_str #声明我们在函数内部使用的是在函数外部定义的全局变量msg_str
        self.print_now("看广告获取积分任务: ")
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/yearEnd/obtainScoreByAd"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"value":"947728124","timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        for i in range(3):
            data = self.req(url, crypt_text)
            self.print_now(data)
            if self.fail_num == 3:
                self.print_now("当前任务出现异常 且错误次数达到3次 请手动检查")
                # push("某通阅读", "当前任务出现异常 且错误次数达到3次 请手动检查")
                msg_str += f"账号{self.phone_num}当前任务出现异常 且错误次数达到3次 请手动检查\n\n"
                exit(0)
            if data["code"] == "9999":
                self.print_now("当前任务出现异常 正在重新执行")
                self.fail_num += 1
                self.main()
                return False
            sleep(uniform(2, 8))
        return True

    def read_novel(self):
        global msg_str #声明我们在函数内部使用的是在函数外部定义的全局变量msg_str
        self.get_cardid()
        self.get_cntindex()
        self.get_chapterallindex()
        self.print_now(f"你的账号{self.phone_num} ：正在执行观看300次小说, 此过程较久, 最大时长为300 * 8s = 40min")
        for i in range(300):
            date = datetime.today().__format__("%Y%m%d%H%M%S")
            chapterAllIndex = choice(self.chapterallindex_list)
            url = f"https://10010.woread.com.cn/ng_woread_service/rest/cnt/wordsDetail?catid={self.catid}&pageIndex={self.pageIndex}&cardid={randint(10000, 99999)}&cntindex={self.cntindex}&chapterallindex={chapterAllIndex}&chapterseno=3"
            crypt_text = f'{{"chapterAllIndex":{chapterAllIndex},"cntIndex":{self.cntindex},"cntTypeFlag":"1","timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
            data = self.req(url, crypt_text)
            if self.fail_num == 3:
                self.print_now("当前任务出现异常 且错误次数达到3次 请手动检查")
                # push("某通阅读", "阅读任务出现异常 且错误次数达到3次 请手动检查")
                msg_str += f"账号{self.phone_num}阅读任务出现异常 且错误次数达到3次 请手动检查\n\n"
                exit(0)
            if data.get("code") != "0000":
                self.print_now("阅读小说发生异常, 正在重新登录执行, 接口返回")
                self.print_now(data)
                return self.main()
            sleep(uniform(2, 4))

    def query_score(self):
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/yearEnd/queryUserScore"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"activeIndex":{self.activeIndex},"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        total_score = data["data"]["validScore"]
        self.lotter_num = int(total_score / 50)
        self.print_now(f"你的账号{self.phone_num}当前有积分{total_score}, 可以抽奖{self.lotter_num}次")

    def get_activetion_id(self):
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/yearEnd/queryActiveInfo"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        if data["code"] == "0000":
            self.activeIndex = data["data"]["activeindex"]
        else:
            self.print_now(f"活动id获取失败 将影响抽奖和查询积分")
    def get_cardid(self):
        """
        获取cardid
        :return:
        """
        url = "https://10010.woread.com.cn/ng_woread_service/rest/basics/getIntellectRecommend"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"cntsize":8,"recommendsize":5,"recommendid":0,"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        # print(data)
        self.pageIndex = data["data"]["recommendindex"] if "recommendindex" in data["data"] else "10725"
        self.cardid = data["data"]["catindex"] if "catindex" in data["data"] else "119056"
    def get_cntindex(self):
        url = "https://10010.woread.com.cn/ng_woread_service/rest/basics/recommposdetail/12279"
        self.headers.pop("Content-Length", "no")
        data = get(url, headers=self.headers).json()
        booklist = data["data"]["booklist"]["message"]
        book_num = len(booklist)
        self.catid = booklist[0]["catindex"] if "catindex" in booklist[0] else "119411"
        self.cntindex = booklist[randint(0, book_num - 1)]["cntindex"]
    def get_chapterallindex(self):
        url = f"https://10010.woread.com.cn/ng_woread_service/rest/cnt/chalist?catid=119411&pageIndex=10725&cardid=12279&cntindex={self.cntindex}"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"curPage":1,"limit":30,"index":"{self.cntindex}","sort":0,"finishFlag":1,"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        chapterallindexlist = data["list"][0]["charptercontent"]
        chapterallindex_num = len(chapterallindexlist)
        self.chapterallindex_list = [0] * chapterallindex_num
        i = 0
        while i < chapterallindex_num:
            self.chapterallindex_list[i] = chapterallindexlist[i]["chapterallindex"]
            i += 1
    def lotter(self):
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/yearEnd/handleDrawLottery"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"activeIndex":{self.activeIndex},"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        if data["code"] == "0000":
            self.print_now(f"抽奖成功, 获得{data['data']['prizename']}")
        else:
            self.print_now(f"抽奖失败, 日志为{data}")

    def watch_ad(self):
        self.print_now("观看广告得话费红包: ")
        url = "https://10010.woread.com.cn/ng_woread_service/rest/activity/userTakeActive"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"activeIndex":6880,"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        self.print_now(data)

    def exchange(self):
        # ticketValue activeid来自于https://10010.woread.com.cn/ng_woread_service/rest/phone/vouchers/getSysConfig get请求
        # {"ticketValue":"300","activeid":"61yd210901","timestamp":"20220816213709","token":"","userId":"","userIndex":,"userAccount":"","verifyCode":""}
        url = "https://10010.woread.com.cn/ng_woread_service/rest/phone/vouchers/exchange"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"ticketValue":"300","activeid":"61yd210901","timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        print(data)

    def query_red(self):
        global msg_str #声明我们在函数内部使用的是在函数外部定义的全局变量msg_str
        url = "https://10010.woread.com.cn/ng_woread_service/rest/phone/vouchers/queryTicketAccount"
        date = datetime.today().__format__("%Y%m%d%H%M%S")
        crypt_text = f'{{"timestamp":"{date}","token":"{self.userinfo["token"]}","userId":"{self.userinfo["userid"]}","userIndex":{self.userinfo["userindex"]},"userAccount":"{self.userinfo["phone"]}","verifyCode":"{self.userinfo["verifycode"]}"}}'
        data = self.req(url, crypt_text)
        if data["code"] == "0000":
            can_use_red = data["data"]["usableNum"] / 100
            if can_use_red >= 3:
                self.print_now(f"账号{self.phone_num}查询成功 你当前有话费红包{can_use_red} 可以去兑换了")
                # push("某通阅读", f"账号{self.phone_num}查询成功 你当前有话费红包{can_use_red} 可以去兑换了")
                msg_str += f"账号{self.phone_num}查询成功 你当前有话费红包{can_use_red} 可以去兑换了\n\n"
            else:
                self.print_now(f"账号{self.phone_num}查询成功 你当前有话费红包{can_use_red} 不足兑换的最低额度")
                # push("某通阅读", f"账号{self.phone_num}查询成功 你当前有话费红包{can_use_red} 不足兑换的最低额度")
                msg_str += f"账号{self.phone_num}查询成功 你当前有话费红包{can_use_red} 不足兑换的最低额度\n\n"

    def main(self):
        self.referer_login()
        self.get_userinfo()
        if not self.watch_video():
            return
        self.get_activetion_id()
        self.read_novel()
        self.query_score()
        self.watch_ad()
        if unicom_lotter:
            for i in range(self.lotter_num):
                self.lotter()
                sleep(2)
            self.query_score()
        self.query_red()


        
def start(phone,run_ua):
    if phone == "":
        exit(0)
    China_Unicom(phone,run_ua).main()
    print("\n")
    print("\n")        

    
    
        
if __name__ == "__main__":
    #unicom_lotter = get_environ("UNICOM_LOTTER", default=True)
    unicom_lotter = get_cookie("UNICOM_LOTTER", True, False)
    """读取环境变量"""
    l = []
    user_map = []
    cklist = get_cookie("PHONE_NUM")
    for i in range(len(cklist)):
        #以#分割开的ck
        split1 = cklist[i].split("&")
        if len(split1)>1:
            for j in range(len(split1)):
                user_map.append(split1[j])
        else:
            user_map.append(cklist[i])

    
    
    for i in range(len(user_map)):
        phone=""
        info = user_map[i].split("&")[0]
        #以#分割开的ck
        split1 = info.split("#")
        run_ua = ""
        phone = split1[0]
        if len(split1)>1:
            run_ua = split1[1] + f";devicetype{{deviceBrand:,deviceModel:}};{{yw_code:}}"

        print('开始执行第{}个账号：{}'.format((i+1),phone))
        if phone == "":
            print("当前账号未填写手机号 跳过")
            print("\n")
            continue
        p = threading.Thread(target=start,args=(phone, run_ua))
        l.append(p)
        p.start()
        print("\n")
    for i in l:
        i.join()
    send("联通阅读",msg_str)
