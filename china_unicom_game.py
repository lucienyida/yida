#!/usr/bin/python3
# -- coding: utf-8 --
# -------------------------------
# @Author : github@limoruirui https://github.com/limoruirui by院长修改
# @Time : 2023/2/19 21:03
# cron "" script-path=xxx.py,tag=匹配cron用
# const $ = new Env('某通畅游');
# -------------------------------
"""
1  脚本仅供学习交流使用, 请在下载后24h内删除
2. 活动入口: 某通app首页-5g新通信-某通畅游
3. 暂时先弄抓包版本 后续再加短信验证码获取token_online
4. 环境变量 UNICOM_GAME_ACCOUNT_INFO 格式 某通手机号#appid#token_online#兑换话费参数
    抓包得到appid和token_online，不要名称和等号，只要其内容值即可
    appid可抓包获取 安卓也有不抓包的方法 自行搜索
    token_online 抓包获取 搜索 mobileService/onLine 切换账号可触发此数据包 此数据包包含 token_online和appid
    兑换话费参数(非必填) 参考第6点，默认兑换5元，其他的自行替换参数进去

    login文件夹内有短信验证码登录(经过几天的反馈测试 不一定能用 有人可以有人不行 暂未知道原因) 抄自小一佬 github@https://github.com/xream 感谢
    默认不添加新crontab 需要手动新建 task yuanter_misaka/login/unicom_login.py
5. 特别说明
    i.第一次运行会因为没有积分而无法进行积分抽奖 可再运行一次或者等第二天再抽奖即可 目前场次不多 不会每天都抽
    ii. 兑换话费已写 但未调用 有需要自行修改调用
6. 替换兑换话费参数
    i.5元 803779159738716160
    ii.10元 803779159738716161
    iii.20元 803779159742910464
    iiii.30元 803779160573382658
    iiiii.50元 803779159759687680
    iiiiii.100元 803779159759687681
"""
from time import sleep
from requests import post, get
from random import randint
from tools.tool import get_environ, timestamp
from tools.send_msg import push
from uuid import uuid4
from tools.notify import send
from tools.ql_api import get_cookie
import threading


msg_str = ""

class CUG:
    def __init__(self, phone: str, appid: str, token_online: str, product_id_str: str):
        self.phone_num = phone.rstrip("\n")
        self.appId = appid.rstrip("\n")
        self.token_online = token_online.rstrip("\n")
        default_ua = f"Mozilla/5.0 (Linux; Android {randint(8, 13)}; SM-S908U Build/TP1A.220810.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/{randint(95, 108)}.0.5359.128 Mobile Safari/537.36; unicom{{version:android@9.0{randint(0, 6)}00,desmobile:{self.phone_num}}};devicetype{{deviceBrand:,deviceModel:}};{{yw_code:}}"
        self.run_ua = get_environ(key="UNICOM_USERAGENT", default=default_ua, output=False)
        self.deviceId = uuid4().hex
        self.msg = ""
        self.product_id_str = product_id_str.rstrip("\n")
        

        
    def get_ecsToken(self):
        url = "https://m.client.10010.com/mobileService/onLine.htm"
        body = f"reqtime={timestamp()}&netWay=Wifi&version=android%4010.0100&deviceId={self.deviceId}&token_online={self.token_online}&provinceChanel=general&appId={self.appId}&deviceModel=SM-S908U&step=bindlist&androidId={uuid4().hex[8:24]}&deviceBrand=&flushkey=1"
        headers = {
            "content-type": "application/x-www-form-urlencoded",
            "user-agent": self.run_ua
        }
        try:
            data = post(url, headers=headers, data=body).json()
            # print(data)
            self.ecs_token = data["ecs_token"]
            # print(self.ecs_token)
        except Exception as e:
            print(f"\n\n账号{self.phone_num}获取token请求出现错误,请检查CK是否正确或已失效，跳过该账号\n\n" )
            exit(0)
            

    def login(self):
        url = "https://game.wostore.cn/api/app//user/v2/login"
        body = {
            "identityType": "esToken",
            "code": self.ecs_token
        }
        headers = {
            "pragma": "no-cache",
            "cache-control": "no-cache",
            "accept": "application/json",
            "content-type": "application/json;charset=utf-8",
            "user-agent": self.run_ua,
            "channelid": "GAMELTAPP_90006",
            "device": "5",
            "origin": "https://web.wostore.cn",
            "x-requested-with": "com.sinovatech.unicom.ui",
            "sec-fetch-site": "same-site",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://web.wostore.cn/",
            "accept-encoding": "gzip, deflate",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
        }
        data = ""
        try:
            data = post(url, headers=headers, json=body).json()
            self.access_token = data["data"]["access_token"]
            self.headers = {
                "pragma": "no-cache",
                "cache-control": "no-cache",
                "accept": "application/json, text/plain, */*",
                "authorization": self.access_token,
                "user-agent": self.run_ua,
                "origin": "https://web.wostore.cn",
                "x-requested-with": "com.sinovatech.unicom.ui",
                "sec-fetch-site": "same-site",
                "sec-fetch-mode": "cors",
                "sec-fetch-dest": "empty",
                "referer": "https://web.wostore.cn/",
                "accept-encoding": "gzip, deflate",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
            }
        except Exception as e:
            print(f"\n\n账号{self.phone_num}登录请求出现错误,请检查CK是否正确或已失效，跳过该账号\n\n" )
            exit(0)
        

    def check_in(self):
        url = "https://game.wostore.cn/api/app/user/v2/signIn"
        data = get(url, headers=self.headers).json()
        # print(data)

    def lotter(self):
        url = "https://game.wostore.cn/api/app/user/v2/benefit/lottery?id=1"
        data = get(url, headers=self.headers).json()
        # print(data)

    def pay_lotter(self, lotter_id):
        if lotter_id is None:
            return
        url = f"https://game.wostore.cn/api/app/user/v2/lottery/join?id={lotter_id}"
        data = get(url, headers=self.headers).json()
        # print(data)

    def get_task(self):
        """
        receiveStatus 2 为已完成
        :return:
        """
        url = "https://game.wostore.cn/api/app/user/v2/task/list"
        data = get(url, headers=self.headers).json()
        all_task_info = {}
        # print(data)
        for task_info in data["data"]:
            if task_info["receiveStatus"] == 2:
                print(f"任务{task_info['taskName']}已完成 跳过领取")
                continue
            elif task_info["receiveStatus"] == 0:
                print(f"任务{task_info['taskName']}已完成 跳过领取")
                continue
            all_task_info[task_info["id"]] = task_info["productId"]
        return all_task_info

    def finish_task(self, task_id, productId):
        url = f"https://game.wostore.cn/api/app/user/v2/task/receive?productId={productId}&taskId={task_id}"
        data = get(url, headers=self.headers).json()
        print(data)
        sleep(3)

    def play_game(self):
        url = "https://game.wostore.cn/api/app/user/v2/play/save"
        body = {
            "cpGameId": f"1500019{randint(900, 999)}"
        }
        data = post(url, headers=self.headers, json=body).json()
        # print(data)

    # 兑换5元话费，兑换其他话费，自行抓包替换productId
    '''
    联通话费100元: 803779159759687681
    联通话费50元:  803779159759687680
    联通话费30元:  803779160573382658
    联通话费20元:  803779159742910464
    联通话费10元:  803779159738716161
    联通话费5元:   803779159738716160
    '''
    def exchange(self):
        def get_exchange():
            url = "https://game.wostore.cn/api/app/game/v2/shop/getToken"
            data = get(url, headers=self.headers).json()
            # print(data)
            return data["data"]
        url = f"https://game.wostore.cn/api/app/shop/order/product/order/mall?Authorization={get_exchange()}"
        if self.product_id_str == "" or self.product_id_str is None:
            self.product_id_str = "803779159738716160"
        # print(f"当前兑换的话费参数为：{self.product_id_str}\n")
        phone_bill = "5元"
        if self.product_id_str == "803779159738716160":
            phone_bill = "5元"
        elif self.product_id_str == "803779159738716161":
            phone_bill = "10元"
        elif self.product_id_str == "803779159742910464":
            phone_bill = "20元"
        elif self.product_id_str == "803779160573382658":
            phone_bill = "30元"
        elif self.product_id_str == "803779159759687680":
            phone_bill = "50元"
        elif self.product_id_str == "803779159759687681":
            phone_bill = "100元"

        
        body = {
            "productId": self.product_id_str
        }
        data = post(url, headers=self.headers, json=body).json()
        # print(data)
        try:
            print(f"账号{self.phone_num}---执行兑换{phone_bill}话费结果为：{data['msg']}\n")
            return f"账号{self.phone_num}---执行兑换{phone_bill}话费结果为：{data['msg']}\n\n"
        except Exception as e:
            print(f"账号{self.phone_num}出现错误，请求失败结果: " )
            print_now(data)
    def init(self):
        """
        初始化活动及查询积分
        :return:
        """
        url = "https://game.wostore.cn/api/app/user/v2/getMemberInfo"
        data = get(url, headers=self.headers).json()
        # print(data)
        return data["data"]["userIntegral"]
    def get_pay_lotter_list(self):
        """
        status
            0: 可参与
            1: 已参与
            2: 已结束
        :return:
        """
        def get_shopToken():
            url = "https://game.wostore.cn/api/app/game/v2/shop/getToken"
            data = get(url, headers=self.headers).json()
            # print(data)
            return data["data"]
        url = f"https://game.wostore.cn/api/app/shop/business/lottery/available?Authorization={get_shopToken()}"
        headers = {
            "pragma": "no-cache",
            "cache-control": "no-cache",
            "accept": "application/json",
            "user-agent": self.run_ua,
            "channelid": "GAMELTAPP_90006",
            "device": "5",
            "origin": "https://web.wostore.cn",
            "x-requested-with": "com.sinovatech.unicom.ui",
            "sec-fetch-site": "same-site",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://web.wostore.cn/",
            "accept-encoding": "gzip, deflate",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
        }
        data = get(url, headers=headers).json()
        # print(data)
        for lotter_info in data["data"]["list"]:
            if lotter_info["status"] == 0 and lotter_info["points"] <= 30:
                return lotter_info["id"]
        print("当前抽奖轮次已全部参加或没有符合条件的场次 跳过")
        return None
    def main(self):
        global msg_str #声明我们在函数内部使用的是在函数外部定义的全局变量msg_str
        self.get_ecsToken()
        self.login()
        old_score = self.init()
        self.check_in()
        self.lotter()
        self.pay_lotter(self.get_pay_lotter_list())
        self.play_game()
        [self.finish_task(task_id, productId) for task_id, productId in self.get_task().items()]
        
        # 新增调用原作者写好的兑换奖品方法
        exchange_result = self.exchange()

        sleep(5)
        now_score = self.init()
        today_score = now_score - old_score
        self.msg += f"账号{self.phone_num}---本次运行获得{today_score}分, 当前共有{now_score}分\n{exchange_result}"
        msg_str += f"账号{self.phone_num}---本次运行获得{today_score}分, 当前共有{now_score}分\n{exchange_result}"
        # push("某通畅游", self.msg)


def start(unicom_game_info):
    if unicom_game_info == "":
        exit(0)
    info = unicom_game_info.split("#")
    # cug = CUG(*unicom_game_info.split("#"))
    if len(info)<3:
        exit(0)
    phone = info[0]
    appid = info[1]
    token_online = info[2]
    product_id_str = ""
    # 新增兑换话费参数
    if len(info)>3:
        product_id_str = info[3]
        if product_id_str is None:
            product_id_str = ""
            product_id_str = ""
        else :
            product_id_str = product_id_str.rstrip("\n")
    cug = CUG(phone, appid, token_online,product_id_str )
    cug.main()
    print("\n")
    print("\n")  

if __name__ == '__main__':
    """读取环境变量"""
    l = []
    user_map = []
    cklist = get_cookie("UNICOM_GAME_ACCOUNT_INFO")
    for i in range(len(cklist)):
        #以&分割开的ck
        split1 = cklist[i].split("&")
        split2 = cklist[i].split("\n")
        if len(split1)>1:
            for j in range(len(split1)):
                user_map.append(split1[j])
        elif len(split2)>1:
            for j in range(len(split2)):
                user_map.append(split2[j])
        else:
            user_map.append(cklist[i])

    
    
    for i in range(len(user_map)):
        unicom_game_info=""
        unicom_game_info = user_map[i]
        if unicom_game_info == "":
            print("当前账号未填写CK 跳过")
            print("\n")
            continue
        print('开始执行第{}个账号：{}'.format((i+1),unicom_game_info.split("#")[0]))
        p = threading.Thread(target=start,args=(unicom_game_info, ))
        l.append(p)
        p.start()
        print("\n")
    for i in l:
        i.join()
    msg_string = ""
    if msg_str != '':
        msg_string += "活动入口: 联通app首页-5g新通信-联通畅游\n\n"
        msg_string += msg_str

    send("联通畅游",msg_string)
    
