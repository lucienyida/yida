# 变量名 sbzck 一行一个
# 定时自己看着来
# 注册链接 http://xyinmw.ddkuaidobanchq6hb.cn/5605767
import json #line:1
import os #line:2
import sys #line:3
import threading #line:4
import time #line:5
import requests #line:7
import ast #line:8
import random #line:9
uuid =""#line:11
dsh =[]#line:12
data =[]#line:13
key =[]#line:14
wtgdata =[]#line:16
def sctaskid ():#line:19
    while 1 :#line:20
        OO0O0OO000000000O =random .randint (0 ,len (key ))#line:21
        OO0O0OO000000000O =key [OO0O0OO000000000O ]#line:22
        if not len (data [OO0O0OO000000000O ]):#line:23
            continue #line:24
        OO000000OO0OOO0OO =random .randint (0 ,len (data [OO0O0OO000000000O ])-1 )#line:25
        if data [OO0O0OO000000000O ][OO000000OO0OOO0OO ]not in key :#line:26
            return data [OO0O0OO000000000O ][OO000000OO0OOO0OO ]#line:27
def hqdsh ():#line:30
    O0OOOO0000O00000O =request_get ("https://gateway.shangbangzhuan.com/task/orderList/1?size=125&current=1","")#line:31
    if O0OOOO0000O00000O ['data']==None :#line:32
        return 0 #line:33
    O0OOOO00OO000OO0O =0 #line:34
    for OO00O0O0O0O0000OO in O0OOOO0000O00000O ['data']:#line:35
        O0OOOO00OO000OO0O +=OO00O0O0O0O0000OO ['money']#line:36
        dsh .append (OO00O0O0O0O0000OO ['name'])#line:37
    return O0OOOO00OO000OO0O #line:38
def sctjcs (O0000OO0O0O00OOO0 ):#line:41
    O0O00O0O0O00OO0O0 =[]#line:42
    O0O0O00O00000O0OO =request_get ("https://gateway.shangbangzhuan.com/task/detail/"+str (O0000OO0O0O00OOO0 ),"")#line:44
    for OOO0O0O000O0O00O0 in O0O0O00O00000O0OO ["data"]["steps"]:#line:45
        O00O0O000O0OOO000 ={"stepId":"","isImg":"false","title":"","content":"15550102865"}#line:46
        O00O00OO0O0OOOO00 =OOO0O0O000O0O00O0 ["type"]#line:47
        O00O0O000O0OOO000 ["stepId"]=OOO0O0O000O0O00O0 ["id"]#line:48
        O00O0O000O0OOO000 ["title"]=OOO0O0O000O0O00O0 ["title"]#line:49
        if O00O00OO0O0OOOO00 ==6 or O00O00OO0O0OOOO00 ==7 :#line:50
            O00O0O000O0OOO000 ["isImg"]=("true"if O00O00OO0O0OOOO00 ==6 else "false")#line:51
            O00O0O000O0OOO000 ["content"]=("http://chemishequ.com/imgV4/release/taskSubmit/20230103_xCvqd_96537228053535_0.png"if O00O00OO0O0OOOO00 ==6 else "15550102865")#line:53
            O0O00O0O0O00OO0O0 .append (O00O0O000O0OOO000 )#line:54
    return O0O00O0O0O00OO0O0 #line:55
def tjrw (O00O000O0OOOO0000 ):#line:58
    O0O0OO000O00000OO =sctjcs (O00O000O0OOOO0000 )#line:59
    O0OO0O00O0O0O000O ="taskId="+str (O00O000O0OOOO0000 )+"&content="+str (O0O0OO000O00000OO )+"&reSubmit=null"#line:61
    O0OO0O00O0O0O000O =O0OO0O00O0O0O000O .encode ("utf-8")#line:63
    O00O00OO00OOOO000 ={'Host':'gateway.shangbangzhuan.com','Connection':'keep-alive','device':'android','uuid':uuid ,'User-Agent':'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36','version':'2.01','Accept':'*/*','Origin':'https://m.shangbangzhuan.com','X-Requested-With':'mark.via','Sec-Fetch-Site':'same-site','Sec-Fetch-Mode':'cors','Sec-Fetch-Dest':'empty','Referer':'https://m.shangbangzhuan.com/','Accept-Language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','content-type':'application/x-www-form-urlencoded'}#line:80
    O0000O000OO0OOOOO =requests .request ("POST","https://gateway.shangbangzhuan.com/task/submit",headers =O00O00OO00OOOO000 ,data =O0OO0O00O0O0O000O ,timeout =10 ).text #line:82
    O0000O000OO0OOOOO =json .loads (O0000O000OO0OOOOO )#line:83
    return O0000O000OO0OOOOO ["message"]#line:84
def request_get (O0OOO0OOOO000OOO0 ,O000OO0000OOO00O0 ):#line:87
    O0O00O0OOOOOOOO0O =0 #line:88
    while True :#line:89
        try :#line:90
            if O0O00O0OOOOOOOO0O >=20 :#line:91
                break #line:92
            OOOO00O0O00000OO0 ={"Content-Length":"0","Host":"gateway.shangbangzhuan.com","Connection":"Keep-Alive","Accept-Encoding":"gzip","User-Agent":"okhttp/4.0.1","uuid":uuid ,"deviceInfo":"BRAND:Xiaomi,MODEL:Redmi K20 Pro,VERSION:12,DEVICE:raphael,BOARD:raphael,NETWORK:NETWORK_WIFI","device":"android","version":"2.21"}#line:98
            O0O0O00OO000O0O0O =requests .get (url =O0OOO0OOOO000OOO0 ,params =O000OO0000OOO00O0 ,headers =OOOO00O0O00000OO0 ,timeout =10 )#line:99
            if O0O0O00OO000O0O0O .status_code ==200 :#line:101
                O0000OO00O0OO0OO0 =json .loads (O0O0O00OO000O0O0O .text )#line:102
            else :#line:103
                continue #line:104
        except :#line:105
            O0O00O0OOOOOOOO0O +=1 #line:106
            print ('网络连接出现问题, 正在尝试再次请求: ',O0O00O0OOOOOOOO0O )#line:107
        else :#line:108
            break #line:109
    return O0000OO00O0OO0OO0 #line:110
def uuidinfo ():#line:113
    O0O0O0O0O00000000 =request_get ("https://gateway.shangbangzhuan.com/user/getUserInfo","")#line:114
    if O0O0O0O0O00000000 ['code']==200 :#line:115
        print ("=====",O0O0O0O0O00000000 ['data']['weChatNickName'],"=====")#line:116
        O0OO00000OO0OO0OO =O0O0O0O0O00000000 ['data']['weChatNickName']#line:117
    else :#line:118
        O0OO00000OO0OO0OO =O0O0O0O0O00000000 ['message']#line:119
    return O0OO00000OO0OO0OO #line:120
def config ():#line:123
    global data ,wtgdata ,dsh ,key #line:124
    O00OO00OO00OOO0OO =request_get ("https://api.oshao.top/index/send/file?emailuser=2636387912%40qq.com&api=sbz&title=审核未通过","")#line:126
    wtgdata =O00OO00OO00OOO0OO ['data']['content']#line:127
    O0O0OO00000O0OOO0 =1 #line:129
    OOOOOOO0OO0000O0O ={"taskid":1000 ,"userid":1000 ,"jointime":"2000-1-19 00:00:00"}#line:130
    while O0O0OO00000O0OOO0 :#line:131
        O000000OOO00OO0O0 =request_get ("https://gateway.shangbangzhuan.com/task/orderList/3?size=100&current="+O0O0OO00000O0OOO0 ,"")#line:132
        for OOOOO000000O0O00O in O000000OOO00OO0O0 ['data']:#line:133
            OOOOOOO0OO0000O0O .fromkeys ("taskid",OOOOO000000O0O00O ['taskId'])#line:134
            OOOOOOO0OO0000O0O .fromkeys ("userid",OOOOO000000O0O00O ['userid'])#line:135
            OOOOOOO0OO0000O0O ['userid']=OOOOO000000O0O00O ['userid']#line:136
            OOOOOOO0OO0000O0O ['jointime']=OOOOO000000O0O00O ['jointime']#line:137
    print (wtgdata )#line:139
def get_ck ():#line:142
    global token #line:143
    if "sbztoken"in os .environ :#line:145
        O0000OO0O00O000OO =[]#line:146
        OO0O000OOOOO0OOO0 =os .environ ['sbzck'].replace ('http',"\n")#line:147
        OO0O000OOOOO0OOO0 =OO0O000OOOOO0OOO0 .split ('\n')#line:148
        for O0000O0OOO0O0O000 in OO0O000OOOOO0OOO0 :#line:149
            if O0000O0OOO0O0O000 !='':#line:150
                O0000OO0O00O000OO .append (O0000O0OOO0O0O000 )#line:151
        if len (O0000OO0O00O000OO )>0 :#line:152
            return O0000OO0O00O000OO #line:153
        else :#line:154
            print ("sbztoken变量未启用")#line:155
            sys .exit (1 )#line:156
    else :#line:157
        try :#line:158
            with open ('sbztoken.txt','r')as O000000OOOOOOOOOO :#line:159
                OO0O000OOOOO0OOO0 =O000000OOOOOOOOOO .read ().split ('\n')#line:160
            if len (OO0O000OOOOO0OOO0 )>=1 :#line:161
                return OO0O000OOOOO0OOO0 #line:162
            else :#line:163
                print ("未添加sbztoken变量,或未有sbztoken.txt文件")#line:164
                sys .exit (0 )#line:165
        except BaseException :#line:166
            print ("未添加sbztoken变量,或未有sbztoken.txt文件")#line:167
            sys .exit (0 )#line:168
def job ():#line:174
    global uuid #line:175
    uuid =threading .current_thread ().getName ()#line:176
    O00OOOO0OO0OOO0O0 =uuidinfo ()#line:177
    OO00000OOOOOO0O0O ="http://124.222.32.25/sbz/data/hua.json"#line:178
    O0OO0O00OO0000000 =requests .request ("GET",OO00000OOOOOO0O0O ,headers ='',data ='').text #line:179
    O0OO0O00OO0000000 =ast .literal_eval (O0OO0O00OO0000000 )#line:180
    O0OO0O00O00000OOO =hqdsh ()#line:181
    print (O00OOOO0OO0OOO0O0 ,"|待审核余额：",O0OO0O00O00000OOO )#line:182
    for OOO0OO00OO000000O in O0OO0O00OO0000000 .keys ():#line:183
        key .append (OOO0OO00OO000000O )#line:184
    OOO0000OOOO0O0OO0 =0 #line:185
    OOOOO00OOOO0O0O00 =O0OO0O00O00000OOO #line:186
    for O00O0OOOO0O000000 in O0OO0O00OO0000000 :#line:187
        if OOO0000OOOO0O0OO0 >=3 or OOOOO00OOOO0O0O00 >=10 or O0OO0O00O00000OOO >10 :#line:188
            break #line:189
        for O000O00OOO0000O0O in O0OO0O00OO0000000 [O00O0OOOO0O000000 ]:#line:190
            if OOO0000OOOO0O0OO0 >=3 or OOOOO00OOOO0O0O00 >=10 or O0OO0O00O00000OOO >10 :#line:192
                print ("flag:",str (OOO0000OOOO0O0OO0 ),"money:",str (OOOOO00OOOO0O0O00 ))#line:193
                break #line:194
            OOOOOOO0O0OOO0O0O =request_get ("https://gateway.shangbangzhuan.com/task/fetch/"+str (O000O00OOO0000O0O ['id']),"")#line:196
            if OOOOOOO0O0OOO0O0O ['code']!=200 :#line:198
                continue #line:199
            elif OOOOOOO0O0OOO0O0O ['code']==2024 :#line:200
                break #line:201
            print (O00OOOO0OO0OOO0O0 ,"|接单:"+str (O000O00OOO0000O0O ['id'])+OOOOOOO0O0OOO0O0O ["message"])#line:202
            OOO0000O0OO00O00O =[]#line:203
            OOOOO0000O000O000 =random .randint (1 ,5 )#line:206
            print (O00OOOO0OO0OOO0O0 ,"|等待时间："+str (OOOOO0000O000O000 ))#line:207
            time .sleep (OOOOO0000O000O000 )#line:208
            O00OO0O000O0000OO =tjrw (O000O00OOO0000O0O ['id'])#line:210
            if O00OO0O000O0000OO =="操作成功！":#line:211
                OOOOO00OOOO0O0O00 +=O000O00OOO0000O0O ['money']#line:212
                if O000O00OOO0000O0O ['money']>=1 :#line:213
                    OOO0000OOOO0O0OO0 +=1 #line:214
            print (O00OOOO0OO0OOO0O0 ,"|提交任务:",O00OO0O000O0000OO ,"金额：",str (OOOOO00OOOO0O0O00 ))#line:215
            break #line:216
if __name__ =='__main__':#line:218
    cklist =get_ck ()#line:219
    for i in cklist :#line:220
        new_thread =threading .Thread (target =job ,name =i )#line:221
        new_thread .start ()#line:222
        new_thread .join ()#line:223
def request_post (O00OO00000O00OO00 ,O0O000O0OO00OOO00 ):#line:225
    OO000OOO0OOO00O00 =0 #line:226
    while True :#line:227
        try :#line:228
            if OO000OOO0OOO00O00 >=20 :#line:229
                break #line:230
            O00OOO000OO000000 ={"Content-Length":"0","Host":"gateway.shangbangzhuan.com","Connection":"Keep-Alive","Accept-Encoding":"gzip","User-Agent":"okhttp/4.0.1","uuid":uuid ,"deviceInfo":"BRAND:Xiaomi,MODEL:Redmi K20 Pro,VERSION:12,DEVICE:raphael,BOARD:raphael,NETWORK:NETWORK_WIFI","device":"android","version":"2.21"}#line:236
            OO00OO000O0O0OOOO =requests .post (O00OO00000O00OO00 ,json =O0O000O0OO00OOO00 ,headers =O00OOO000OO000000 ,timeout =10 )#line:237
            if OO00OO000O0O0OOOO .status_code ==200 :#line:239
                O00OOOO0O00OOO00O =json .loads (OO00OO000O0O0OOOO .text )#line:240
            else :#line:241
                continue #line:242
        except :#line:243
            OO000OOO0OOO00O00 +=1 #line:244
            print ('网络连接出现问题, 正在尝试再次请求: ',OO000OOO0OOO00O00 )#line:245
        else :#line:246
            break #line:247
    return O00OOOO0O00OOO00O #line:248
