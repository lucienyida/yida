import requests, json,uuid,datetime
from datetime import datetime
from datetime import timedelta

# 配置参数 登录https://www.ddnsto.com/app/#/devices 抓包cookie
cookie='ksuser=**********'
# 先购买一次7天免费套餐 抓包查看https://www.ddnsto.com/api/user/routers/*****/ 请求头里面的x-csrftoken
xcsrftoken='**************'
# 先购买一次7天免费套餐 抓包查看https://www.ddnsto.com/api/user/routers/*****/ 这个url里面的*****就是userid
userid='*****'

# utc-beijing
def UTC2BJS(UTC):
    UTC_format = "%Y-%m-%dT%H:%M:%S.%fZ"
    BJS_format = "%Y-%m-%d %H:%M:%S"
    UTC = datetime.strptime(UTC,UTC_format)
    #格林威治时间+8小时变为北京时间
    BJS = UTC + timedelta(hours=8)
    BJSJ = BJS.strftime(BJS_format)
    return BJSJ


#获取订单号
uu_id = uuid.uuid4()
suu_id = ''.join(str(uu_id).split('-'))
url_2 = 'https://www.ddnsto.com/api/user/product/orders/'
headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cookie': f'{cookie}',
    'referer': 'https://www.ddnsto.com/app/',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    'x-csrftoken': f'{xcsrftoken}'
}
data_2 = {
    'product_id': '2',
    'uuid_from_client': f'{suu_id}'
}
html_2 = requests.post(url=url_2, headers=headers,data=data_2)
result_2 = json.loads(html_2.text)
id = result_2['id']


# 提交订单
url_3 = f'https://www.ddnsto.com/api/user/product/orders/{id}/'
html_3 = requests.get(url=url_3, headers=headers).text

#创建
url_4 =f'https://www.ddnsto.com/api/user/routers/{userid}/'
data_4 ={
    "plan_ids_to_add":[f'{id}'],
    "server":3
}
html_4 = requests.patch(url=url_4, headers=headers,data =data_4)
result_4 = json.loads(html_4.text)
if len(result_4['uid'])>0:
    print('****白嫖成功*****'+'\n'+'到期时间：'+UTC2BJS(result_4['active_plan']["product_expired_at"]))
else:
    print('没有白嫖到！检查配置看看')
