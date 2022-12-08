#!/usr/bin/python3
# -- coding: utf-8 --

from time import sleep, time
from datetime import date, datetime
from random import   choices
from requests import get, post
from binascii import b2a_hex, a2b_hex
from base64 import b64encode, b64decode
from Crypto.PublicKey.RSA import importKey, construct
from Crypto.Cipher import PKCS1_v1_5
from Crypto.Cipher import AES
from string import ascii_letters, digits
import os

#签到喂食只需要手机号码，多号填写多行，去掉开头#号
account_list=[
     "180****2916",
     "133****0650",
     "133****7005",
     "181****0501",
     "181****0601",
     "133****5709",
     #"133****3325",
     #"189****9991",
]

#是否发送青龙通知
sendNotify=True
#收集通知内容
msgg=[]
#通知的标题
title='中国电信签到喂食'




def checkCount():
    try:
        strTime = datetime.now().__format__("%Y-%m-%d")
        filename = os.path.basename(__file__)[:-3]
        path = "../log/"+filename
        if os.path.exists(path):
            listDir = os.listdir(path)
            sum_sign=0
            sum_food=0 
            for item in listDir:
                if(item.startswith(strTime)):            
                    filePath = os.path.join(path, item)
                    with open(filePath,'r',encoding='utf8') as f:
                        txt = f.read()
                        food = txt.count("今天已达到最大喂食次数")
                        sign = txt.count("签到成功")
                        if(sign>0 or food>0):
                            sum_sign+=sign
                            sum_food+=food
                            msgg.append("参考日志文件：{0}".format(item))                    
                            msgg.append("签到完成{0}次,最大喂食{1}次".format(sign,food))                    
            if(sum_sign == 0 and sum_food == 0):
                return False
            
            x = len(account_list)
            msgg.append('----------------------------------------')
            msgg.append("签到总数量{0}个,喂食总数量{1}个".format(x,x))
            msgg.append("签到完成总次数{0}次,喂食成功总次数{1}次".format(sum_sign,sum_food))
            if sum_sign>=x and sum_food >= x:
                msgg.append("达标! 取消发送签到请求!")
                return True
            else:        
                msgg.append("未达标! 继续发送签到请求!")
                return False
        else:
            msgg.append(f"文件夹不存在{path}")
            return False
    except Exception as e:
            print(e)
    finally:
        msgg.append(f'---------------')

def timestamp(short=False):
    if short:
        return int(round(time()))
    return int(round(time() * 1000))

class AES_Ctypt:
    def __init__(self, key, iv=None, mode="ECB"):
        if len(key) % 16 != 0:
            key = key + (AES.block_size - len(key) % AES.block_size) * chr(0)
        self.key = key.encode("utf-8")
        if mode == "ECB":
            self.mode = AES.MODE_ECB
        elif mode == "CBC":
            self.mode = AES.MODE_CBC
        else:
            print("您选择的加密方式错误")
        if iv is None:
            self.cipher = AES.new(self.key, self.mode)
        else:
            if isinstance(iv, str):
                self.cipher = AES.new(self.key, self.mode, iv.encode("utf-8"))
            else:
                print("偏移量不为字符串")
    def encrypt(self, data, padding="pkcs7", b64=False):
        bs = AES.block_size
        pkcs7_padding = lambda s: s + (bs - len(s.encode()) % bs) * chr(bs - len(s.encode()) % bs)
        zero_padding = lambda s: s + (bs - len(s) % bs) * chr(0)
        pad = pkcs7_padding if padding=="pkcs7" else zero_padding
        data = self.cipher.encrypt(pad(data).encode("utf8"))
        encrypt_data = b64encode(data) if b64 else b2a_hex(data) # 输出hex或者base64
        return encrypt_data.decode('utf8')
    def decrypt(self, data, b64=False):
        data = b64decode(data) if b64 else a2b_hex(data)
        decrypt_data = self.cipher.decrypt(data).decode()
        unpadding = lambda s: s.replace(s[-1], "")
        return unpadding(decrypt_data)

class RSA_Encrypt:
    def __init__(self, key):
        if isinstance(key, str):
            self.key = self.public_key(key) if "PUBLIC KEY" not in key else key.encode()
        else:
            print("提供的公钥格式不正确")

    def public_key(self, rsaExponent, rsaModulus=10001):
        e = int(rsaExponent, 16)
        n = int(rsaModulus, 16)  # snipped for brevity
        pubkey = construct((n, e)).export_key()
        return pubkey

    def encrypt(self, data, b64=False):
        pub_key = importKey(self.key)
        cipher = PKCS1_v1_5.new(pub_key)
        rsa_text = cipher.encrypt(data.encode("utf8"))
        rsa_text = b64encode(rsa_text).decode() if b64 else rsa_text.hex()
        return rsa_text

def get_phoneNum(phone):
    result = ""
    for i in phone:
        result += chr(ord(i) + 2)
    return result    
def add(txt):      
   return a2b_hex(''.join(['2d2d2d2d2d424547494e205055424c4943204b45592d2d2d2d2d0a4d4947664d',        '413047435371475349623344514542415155414134474e4144434269514b4267',        '51432b756747354138635a334671554b44774d3537474d34696f360a4a476353',        '746976543855644774363750454f69684c5a54773350373337312b4e34375072',        '6d7343706e54527a6254676375704b74557638496d5a616c596b36350a645538',        '726a432f72696477687739666657324c4277766b456e446b6b4b4b5269326c69',        '574949744466744a564269574f6831376f36676662506f4e72574f52630a4164',        '6362706b324c2b75646c64356b5a4e774944415141420a2d2d2d2d2d454e4420',        '5055424c4943204b45592d2d2d2d2d'   ])).decode()
    


class ChinaTelecom:
    def __init__(self, account):
        self.phone = account

    def init(self):
        self.ua = f"CtClient;9.6.1;Android;12;SM-G9860;{b64encode(self.phone[5:11].encode()).decode().strip('=+')}!#!{b64encode(self.phone[0:5].encode()).decode().strip('=+')}"
        self.headers = {
            "Host": "wapside.189.cn:9001",
            "Referer": "https://wapside.189.cn:9001/resources/dist/signInActivity.html",
            "User-Agent": self.ua
        }

    def req(self, url, method, data=None):
        retryTimes=0
        while retryTimes<5:
            try:                  
                if method == "GET":
                    return get(url, headers=self.headers).json()
                elif method.upper() == "POST":
                    return  post(url, headers=self.headers, json=data).json()
                else:
                    print("您当前使用的请求方式有误,请检查")
                    return None
            except Exception as e:
                retryTimes+=1
                print(f'{method} ,请求异常,尝试重新第{retryTimes}次请求:{e}')            
        return None    
        
    def telecom(self, text):      
        if len(text) <= 32:
            return RSA_Encrypt(add(text)).encrypt(text)
        else:
            encrypt_text = ""
            for i in range(int(len(text) / 32) + 1):
                split_text = text[(32 * i):(32 * (i + 1))]
                encrypt_text += RSA_Encrypt(add(text)).encrypt(split_text)
            return encrypt_text
            
    @staticmethod
    def geneRandomToken():
        randomList = choices(ascii_letters + digits, k=129)
        token = f"V1.0{''.join(x for x in randomList)}"
        return token
        
    def check_in(self):
        try:
            url = "https://wapside.189.cn:9001/jt-sign/api/home/sign"
            data = {
                "encode": AES_Ctypt("34d7cb0bcdf07523").encrypt(
                    f'{{"phone":{self.phone},"date":{timestamp()},"signSource":"smlprgrm"}}')
            }
            jsont = self.req(url, "post", data)
            if jsont == None:
                return
            else:
                if jsont["data"]["code"] == 1:
                    print(f'签到结果:{jsont["data"]["msg"]},获得{jsont["data"]["coin"]}金豆,已签到{jsont["data"]["totalDay"]}天')
                    msgg.append(f'签到结果:{jsont["data"]["msg"]},获得{jsont["data"]["coin"]}金豆,已签到{jsont["data"]["totalDay"]}天')
                else:
                    print(f'签到异常:{jsont["data"]["msg"]}')
                    msgg.append(f'签到异常:{jsont["data"]["msg"]}')
        except Exception as e:
            raise Exception(f'签到，{e}')

    def get_task(self):
        try:
            url = "https://wapside.189.cn:9001/jt-sign/paradise/getTask"
            data = {
                "para": self.telecom(f'{{"phone":{self.phone}}}')
            }            
            jsont = self.req(url, "post", data)            
            if jsont == None:
                return                   
            if jsont["resoultCode"] == "0":
                self.task_list = jsont["data"]       
            else:
                print("获取任务列表失败")
                print(jsont)
        except Exception as e:
            raise Exception(f'获取任务列表，{e}')

    def do_task(self):
        try:
            url = "https://wapside.189.cn:9001/jt-sign/paradise/polymerize"        
            for task in self.task_list:            
                if "翻牌抽好礼" in task["title"] or "查看我的订单" in task["title"] or "查看我的云盘" in task["title"]:
                    decrept_para = f'{{"phone":"{self.phone}","jobId":"{task["taskId"]}"}}'
                    data = {"para": self.telecom(decrept_para)}
                    jsont = self.req(url, "POST", data)
                    if jsont == None:
                        return                    
                    if jsont["data"]["code"] == 0:
                        print(f'每日任务:{task["title"].split(" ")[0]},{jsont["resoultMsg"]},{task["title"].split(" ",1)[1]}')
                        msgg.append(f'每日任务:{task["title"].split(" ")[0]},{task["title"].split(" ",1)[1]}')
                    else:
                        print(f'每日任务:{task["title"].split(" ")[0]},{jsont["resoultMsg"]}')
                        msgg.append(f'每日任务:{task["title"].split(" ")[0]},{jsont["resoultMsg"]}')
        except Exception as e:
            raise Exception(f'每日任务，{e}')

    def food(self):
        try:
            url = "https://wapside.189.cn:9001/jt-sign/paradise/food"
            data = {
                "para": self.telecom(f'{{"phone":{self.phone}}}')
            }
            jsont = self.req(url, "POST", data)
            if jsont == None:
                return
            if jsont["resoultCode"] == "0":
                print(f'喂食结果:{jsont["resoultMsg"]}')
                msgg.append(f'喂食结果:{jsont["resoultMsg"]}')
            else:
                print(f'喂食异常:{jsont["resoultMsg"]}')
                msgg.append(f'喂食异常:{jsont["resoultMsg"]}')
            return jsont["resoultMsg"]
        except Exception as e:
            raise Exception(f'宠物喂食，{e}')
   
    def get_level2(self):
        try:
            url = "https://wapside.189.cn:9001/jt-sign/paradise/getParadiseInfo"
            body = {
                "para": self.telecom(f'{{"phone":{self.phone}}}')
            }
            data = self.req(url, "POST", body)
            if int(data["userInfo"]["paradiseDressup"]["level"]) >=6:
                print(f'当前等级:Lv{data["userInfo"]["paradiseDressup"]["level"]}, 已达到满级！')
                msgg.append(f'当前等级:Lv{data["userInfo"]["paradiseDressup"]["level"]}, 已达到满级！')
            else:
                print(f'当前等级:Lv{data["userInfo"]["paradiseDressup"]["level"]}, {data["percentage"]}')
                msgg.append(f'当前等级:Lv{data["userInfo"]["paradiseDressup"]["level"]}, {data["percentage"]}')                
        except Exception as e:
            raise Exception(f'宠物等级，{e}')    
            
    def coin_info(self):
        try:
            url = "https://wapside.189.cn:9001/jt-sign/api/home/userCoinInfo"
            data = {
                "para": self.telecom(f'{{"phone":{self.phone}}}')
            }
            jsont = self.req(url, "post", data)
            if jsont == None:
                return 
            if jsont["resoultCode"] == '0':
                self.coin_count = jsont        
            else:
                self.coin_count = {"totalCoin":None}
        except Exception as e:
            raise Exception(f'查询金豆数量，{e}')            
    def get_userid(self):
        url = "https://wapside.189.cn:9001/jt-sign/api/home/homeInfo"
        body = {
            "para": self.telecom(f'{{"phone":"{self.phone}","signDate":"{datetime.now().__format__("%Y-%m")}"}}')
        }
        userid = post(url, json=body).json()["data"]["userInfo"]["userThirdId"]
        return userid        
        
    def share(self):
        try:
            url = "https://appfuwu.189.cn:9021/query/sharingGetGold"
            body = {
                "headerInfos": {
                    "code": "sharingGetGold",
                    "timestamp": datetime.now().__format__("%Y%m%d%H%M%S"),
                    "broadAccount": "",
                    "broadToken": "",
                    "clientType": "#9.6.1#channel50#iPhone 14 Pro Max#",
                    "shopId": "20002",
                    "source": "110003",
                    "sourcePassword": "Sid98s",
                    "token": self.geneRandomToken(),
                    "userLoginName": self.phone
                },
                "content": {
                    "attach": "test",
                    "fieldData": {
                        "shareSource": "3",
                        "userId": self.get_userid(),
                        "account": get_phoneNum(self.phone)
                    }
                }
            }
            headers = {
                "user-agent": "iPhone 14 Pro Max/9.6.1"
            }
            data = post(url, headers=headers, json=body).json()        
            print(f'分享任务:{data["responseData"]["resultDesc"]}')
            msgg.append(f'分享任务:{data["responseData"]["resultDesc"]}')
        except Exception as e:
            raise Exception(f'分享任务，{e}')
    def main(self):
        try:
            self.init()
            self.coin_info()
            print(f'手机号码:{self.phone.replace(self.phone[3:7],"****")}')
            msgg.append(f'手机号码:{self.phone.replace(self.phone[3:7],"****")}')
            print(f'当前金豆:{self.coin_count["totalCoin"]}')
            msgg.append(f'当前金豆:{self.coin_count["totalCoin"]}')
            #print('----签到----')
            self.check_in()
            #print('----查询等级----')            
            self.get_level2()
            #print('----喂食----')            
            for i in range(20):
                ret = self.food()
                if ret.find('已达到最大喂食次数')!=-1:
                    break
            #print('----做任务----')
            self.get_task()
            self.do_task()
            #print('----分享----')
            self.share()
            self.coin_info()
            print(f'剩余金豆:{self.coin_count["totalCoin"]}')
            msgg.append(f'剩余金豆:{self.coin_count["totalCoin"]}')
        except Exception as e:
            print(f'手机号码:{self.phone.replace(self.phone[3:7],"****")},运行异常:{e}')
            msgg.append(f'手机号码:{self.phone.replace(self.phone[3:7],"****")},运行异常:{e}')
        finally:
            print(f'-----------')
            msgg.append(f'-----------')

if __name__ == "__main__":
    try:
        result = checkCount()
        print('\n'.join(msgg))
        if not result:
            for item in account_list:        
                if len(item) == 11:               
                    ChinaTelecom(item).main()
                else:
                    print(f'你这个什么鬼？【{item}】')
                    msgg.append(f'你这个什么鬼？【{item}】')                    
    except Exception as e:
        print(f'未知异常:{e}')
        msgg.append(f'未知异常:{e}')
    finally:
        #发送青龙通知
        if sendNotify and os.path.exists("./sendNotify.js") and msgg:
            if not os.path.exists("./invoke_notify.js"):
                invoke_notify='''
                    const notify = require('./sendNotify.js');
                    notify.sendNotify(`${process.argv[2]}`, `${process.argv[3]}`);
                '''
                with open("./invoke_notify.js",'w',encoding='utf-8') as f:
                    f.write(invoke_notify)
                    f.close()
            content='\n'.join(msgg)             
            os.system(f"node invoke_notify.js '{title}' '{content}'")        
