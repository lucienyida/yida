/*
微信小程序:燕京啤酒小程序官方旗舰店
功能:签到得积分，兑实物
变量名:yjpjck，随便找一个请求是https://h5.youzan.com的，找到请求头，取请求头里面Extra-Data里的sid和uuid，总#链接，多账号@隔开
注意⚠️uuid是一串数字字母组成的，倒数13位是时间戳，不要填进变量！！只要前面部分就可以了。
比如uuid=FmdMpKAeiknJs6O1670565573439,填进变量的只需要FmdMpKAeiknJs6O
每天运行一次就好
*/
const $ = new Env("燕京啤酒小程序");
let envSplitor = ['@', '\n']
let result, resurq, resurp, abcd = [], userList = [], usid = 0, userCount = 0, OooOo = 'yjpjck'
let userCookie = ($.isNode() ? process.env[OooOo] : $.getdata(OooOo)) || '';
///////////////////////////////////////////////////////////////////
class UserInfo {
    constructor(str) {this._ = ++usid, this.f = `账号 [${this._}] `, this.ck=str.split('#'), this.i=this.ck[0], this.p=this.ck[1]}
    async task() {
        await this.signin()
        await $.wait(2000)
        await this.getuserinfo()
        }

async signin() {
this.ts = Math.round(new Date().getTime()).toString();
this.da = `{"is_weapp":1,"sid":"${this.i}","version":"2.117.8.101","client":"weapp","bizEnv":"wsc","uuid":"${this.p}${this.ts}","ftime":${this.ts}}`
  this.h = {
'Accept-Encoding' : `gzip,compress,br,deflate`,
'content-type' : `application/json`,
'Connection' : `keep-alive`,
'Referer' : `https://servicewechat.com/wx4ccbcc233eead2ee/129/page-frame.html`,
'Host' : `h5.youzan.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.30(0x18001e32) NetType/4G Language/zh_CN`,
'Extra-Data' : `${this.da}`
}  
        await httpRequest('get', popu(`https://h5.youzan.com/wscump/checkin/checkinV2.json?checkinId=2299510&app_id=wx6b7c12aaef6cbd9f&kdt_id=107786737`, this.h))
//if (result.code==0){
  console.log(`${this.f}签到:${result.msg} `)
        //}
    }

    
async getuserinfo() {
this.ts = Math.round(new Date().getTime()).toString();
this.da = `{"is_weapp":1,"sid":"${this.i}","version":"2.117.8.101","client":"weapp","bizEnv":"wsc","uuid":"${this.p}${this.ts}","ftime":${this.ts}}`
  this.h = {
'Accept-Encoding' : `gzip,compress,br,deflate`,
'content-type' : `application/json`,
'Connection' : `keep-alive`,
'Referer' : `https://servicewechat.com/wx4ccbcc233eead2ee/129/page-frame.html`,
'Host' : `h5.youzan.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.30(0x18001e32) NetType/4G Language/zh_CN`,
'Extra-Data' : `${this.da}`
}  
await httpRequest('get', popu(`https://h5.youzan.com/wscuser/membercenter/stats.json?app_id=wx6b7c12aaef6cbd9f&kdt_id=107786737`,this.h))
console.log(`${this.f}已有积分:${result.data.stats.points}`)       
    }





} !(async () => {
    if (!(await checkEnv())) return;
        for (let user of userList)await user.task()
})()
    .catch((e) => console.log(e))
    .finally(() => $.done())
function encrypt(e){return CryptoJS.AES.encrypt(e,CryptoJS.enc.Utf8.parse(key),{iv:CryptoJS.enc.Utf8.parse(iv),mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString()}function decrypt(e){return CryptoJS.AES.decrypt(e,CryptoJS.enc.Utf8.parse(key),{iv:CryptoJS.enc.Utf8.parse(iv),mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString(CryptoJS.enc.Utf8)}
function MD5Encrypt(_) { function $(_, $) { return _ << $ | _ >>> 32 - $ } function r(_, $) { var r, n, o, t, e; return o = 2147483648 & _, t = 2147483648 & $, r = 1073741824 & _, n = 1073741824 & $, e = (1073741823 & _) + (1073741823 & $), r & n ? 2147483648 ^ e ^ o ^ t : r | n ? 1073741824 & e ? 3221225472 ^ e ^ o ^ t : 1073741824 ^ e ^ o ^ t : e ^ o ^ t } function n(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) & (C = o) | ~f & t, e), a)), r($(_, u), n) } function o(_, n, o, t, e, u, a) { var f, C, c; return _ = r(_, r(r((f = n, C = o, f & (c = t) | C & ~c), e), a)), r($(_, u), n) } function t(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) ^ (C = o) ^ t, e), a)), r($(_, u), n) } function e(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n, (C = o) ^ (f | ~t)), e), a)), r($(_, u), n) } function u(_) { var $, r = "", n = ""; for ($ = 0; 3 >= $; $++)r += (n = "0" + (_ >>> 8 * $ & 255).toString(16)).substr(n.length - 2, 2); return r } var a, f, C, c, h, i, v, d, g, m = []; for (m = function (_) { for (var $, r = _.length, n = r + 8, o = 16 * ((n - n % 64) / 64 + 1), t = Array(o - 1), e = 0, u = 0; r > u;)$ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | _.charCodeAt(u) << e, u++; return $ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | 128 << e, t[o - 2] = r << 3, t[o - 1] = r >>> 29, t }(_ = function (_) { _ = _.replace(/\r\n/g, "\n"); for (var $ = "", r = 0; r < _.length; r++) { var n = _.charCodeAt(r); 128 > n ? $ += String.fromCharCode(n) : n > 127 && 2048 > n ? ($ += String.fromCharCode(n >> 6 | 192), $ += String.fromCharCode(63 & n | 128)) : ($ += String.fromCharCode(n >> 12 | 224), $ += String.fromCharCode(n >> 6 & 63 | 128), $ += String.fromCharCode(63 & n | 128)) } return $ }(_)), i = 1732584193, v = 4023233417, d = 2562383102, g = 271733878, a = 0; a < m.length; a += 16)f = i, C = v, c = d, h = g, i = n(i, v, d, g, m[a + 0], 7, 3614090360), g = n(g, i, v, d, m[a + 1], 12, 3905402710), d = n(d, g, i, v, m[a + 2], 17, 606105819), v = n(v, d, g, i, m[a + 3], 22, 3250441966), i = n(i, v, d, g, m[a + 4], 7, 4118548399), g = n(g, i, v, d, m[a + 5], 12, 1200080426), d = n(d, g, i, v, m[a + 6], 17, 2821735955), v = n(v, d, g, i, m[a + 7], 22, 4249261313), i = n(i, v, d, g, m[a + 8], 7, 1770035416), g = n(g, i, v, d, m[a + 9], 12, 2336552879), d = n(d, g, i, v, m[a + 10], 17, 4294925233), v = n(v, d, g, i, m[a + 11], 22, 2304563134), i = n(i, v, d, g, m[a + 12], 7, 1804603682), g = n(g, i, v, d, m[a + 13], 12, 4254626195), d = n(d, g, i, v, m[a + 14], 17, 2792965006), v = n(v, d, g, i, m[a + 15], 22, 1236535329), i = o(i, v, d, g, m[a + 1], 5, 4129170786), g = o(g, i, v, d, m[a + 6], 9, 3225465664), d = o(d, g, i, v, m[a + 11], 14, 643717713), v = o(v, d, g, i, m[a + 0], 20, 3921069994), i = o(i, v, d, g, m[a + 5], 5, 3593408605), g = o(g, i, v, d, m[a + 10], 9, 38016083), d = o(d, g, i, v, m[a + 15], 14, 3634488961), v = o(v, d, g, i, m[a + 4], 20, 3889429448), i = o(i, v, d, g, m[a + 9], 5, 568446438), g = o(g, i, v, d, m[a + 14], 9, 3275163606), d = o(d, g, i, v, m[a + 3], 14, 4107603335), v = o(v, d, g, i, m[a + 8], 20, 1163531501), i = o(i, v, d, g, m[a + 13], 5, 2850285829), g = o(g, i, v, d, m[a + 2], 9, 4243563512), d = o(d, g, i, v, m[a + 7], 14, 1735328473), v = o(v, d, g, i, m[a + 12], 20, 2368359562), i = t(i, v, d, g, m[a + 5], 4, 4294588738), g = t(g, i, v, d, m[a + 8], 11, 2272392833), d = t(d, g, i, v, m[a + 11], 16, 1839030562), v = t(v, d, g, i, m[a + 14], 23, 4259657740), i = t(i, v, d, g, m[a + 1], 4, 2763975236), g = t(g, i, v, d, m[a + 4], 11, 1272893353), d = t(d, g, i, v, m[a + 7], 16, 4139469664), v = t(v, d, g, i, m[a + 10], 23, 3200236656), i = t(i, v, d, g, m[a + 13], 4, 681279174), g = t(g, i, v, d, m[a + 0], 11, 3936430074), d = t(d, g, i, v, m[a + 3], 16, 3572445317), v = t(v, d, g, i, m[a + 6], 23, 76029189), i = t(i, v, d, g, m[a + 9], 4, 3654602809), g = t(g, i, v, d, m[a + 12], 11, 3873151461), d = t(d, g, i, v, m[a + 15], 16, 530742520), v = t(v, d, g, i, m[a + 2], 23, 3299628645), i = e(i, v, d, g, m[a + 0], 6, 4096336452), g = e(g, i, v, d, m[a + 7], 10, 1126891415), d = e(d, g, i, v, m[a + 14], 15, 2878612391), v = e(v, d, g, i, m[a + 5], 21, 4237533241), i = e(i, v, d, g, m[a + 12], 6, 1700485571), g = e(g, i, v, d, m[a + 3], 10, 2399980690), d = e(d, g, i, v, m[a + 10], 15, 4293915773), v = e(v, d, g, i, m[a + 1], 21, 2240044497), i = e(i, v, d, g, m[a + 8], 6, 1873313359), g = e(g, i, v, d, m[a + 15], 10, 4264355552), d = e(d, g, i, v, m[a + 6], 15, 2734768916), v = e(v, d, g, i, m[a + 13], 21, 1309151649), i = e(i, v, d, g, m[a + 4], 6, 4149444226), g = e(g, i, v, d, m[a + 11], 10, 3174756917), d = e(d, g, i, v, m[a + 2], 15, 718787259), v = e(v, d, g, i, m[a + 9], 21, 3951481745), i = r(i, f), v = r(v, C), d = r(d, c), g = r(g, h); return (u(i) + u(v) + u(d) + u(g)).toLowerCase() }
async function checkEnv(){if(userCookie){let e=envSplitor[0];for(let f of envSplitor)if(userCookie.indexOf(f)>-1){e=f;break}for(let l of userCookie.split(e))l&&userList.push(new UserInfo(l));userCount=userList.length}else console.log(`未找到任何账号`);return console.log(`找到 ${userCount}个账号`),!0}
function popu(e,t,n=""){e.replace("//","/").split("/")[1];let l={url:e,headers:t,timeout:12e3};return n&&(l.body=n,l.headers["Content-Length"]=n?.length||0),l}async function httpRequest(e,t){return result=null,resurq=null,resurp=null,new Promise(n=>{$.send(e,t,async(e,t,l)=>{try{if(resurq=t,resurp=l,e);else if(l.body){if("object"==typeof l.body)result=l.body;else try{result=JSON.parse(l.body)}catch(o){result=l.body}}}catch(y){console.log(y)}finally{n()}})})}
 function randomszxx(e) {
	 e = e || 32;
	 var t = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890",
		 a = t.length,
		 n = "";
 
	 for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	 return n;
 }
function Env(e,s){return"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0),new class{constructor(e,s){this.name=e,this.notifyStr="",this.startTime=(new Date).getTime(),Object.assign(this,s),console.log(`${this.name} 开始运行：
`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}getdata(e){let s=this.getval(e);if(/^@/.test(e)){let[,i,n]=/^@(.*?)\.(.*?)$/.exec(e),r=i?this.getval(i):"";if(r)try{let o=JSON.parse(r);s=o?this.lodash_get(o,n,""):s}catch(a){s=""}}return s}setdata(e,s){let i=!1;if(/^@/.test(s)){let[,n,r]=/^@(.*?)\.(.*?)$/.exec(s),o=this.getval(n);try{let a=JSON.parse(n?"null"===o?null:o||"{}":"{}");this.lodash_set(a,r,e),i=this.setval(JSON.stringify(a),n)}catch(l){let h={};this.lodash_set(h,r,e),i=this.setval(JSON.stringify(h),n)}}else i=this.setval(e,s);return i}getval(e){return this.isSurge()||this.isLoon()?$persistentStore.read(e):this.isQuanX()?$prefs.valueForKey(e):this.isNode()?(this.data=this.loaddata(),this.data[e]):this.data&&this.data[e]||null}setval(e,s){return this.isSurge()||this.isLoon()?$persistentStore.write(e,s):this.isQuanX()?$prefs.setValueForKey(e,s):this.isNode()?(this.data=this.loaddata(),this.data[s]=e,this.writedata(),!0):this.data&&this.data[s]||null}send(e,s,i=()=>{}){if("get"!=e&&"post"!=e&&"put"!=e&&"delete"!=e){console.log(`无效的http方法：${e}`);return}if("get"==e&&s.headers?(delete s.headers["Content-Type"],delete s.headers["Content-Length"]):s.body&&s.headers&&(s.headers["Content-Type"]||(s.headers["Content-Type"]="application/x-www-form-urlencoded")),this.isSurge()||this.isLoon()){this.isSurge()&&this.isNeedRewrite&&(s.headers=s.headers||{},Object.assign(s.headers,{"X-Surge-Skip-Scripting":!1}));let n={method:e,url:s.url,headers:s.headers,timeout:s.timeout,data:s.body};"get"==e&&delete n.data,$axios(n).then(e=>{let{status:s,request:n,headers:r,data:o}=e;i(null,n,{statusCode:s,headers:r,body:o})}).catch(e=>console.log(e))}else if(this.isQuanX())s.method=e.toUpperCase(),this.isNeedRewrite&&(s.opts=s.opts||{},Object.assign(s.opts,{hints:!1})),$task.fetch(s).then(e=>{let{statusCode:s,request:n,headers:r,body:o}=e;i(null,n,{statusCode:s,headers:r,body:o})},e=>i(e));else if(this.isNode()){this.got=this.got?this.got:require("got");let{url:r,...o}=s;this.instance=this.got.extend({followRedirect:!1}),this.instance[e](r,o).then(e=>{let{statusCode:s,request:n,headers:r,body:o}=e;i(null,n,{statusCode:s,headers:r,body:o})},e=>{let{message:s,response:n}=e;i(s,n,n&&n.body)})}}time(e){let s={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"h+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};for(let i in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length))),s)RegExp("("+i+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?s[i]:("00"+s[i]).substr((""+s[i]).length)));return e}async showmsg(){if(!this.notifyStr)return;let e=this.name+" 运行通知\n\n"+this.notifyStr;if($.isNode()){var s=require("./sendNotify");console.log("\n============== 推送 =============="),await s.sendNotify(this.name,e)}else this.msg(e)}logAndNotify(e){console.log(e),this.notifyStr+=e,this.notifyStr+="\n"}msg(e=t,s="",i="",n){let r=e=>{if(!e)return e;if("string"==typeof e)return this.isLoon()?e:this.isQuanX()?{"open-url":e}:this.isSurge()?{url:e}:void 0;if("object"==typeof e){if(this.isLoon()){let s;return{openUrl:e.openUrl||e.url||e["open-url"],mediaUrl:e.mediaUrl||e["media-url"]}}if(this.isQuanX()){let i;return{"open-url":e["open-url"]||e.url||e.openUrl,"media-url":e["media-url"]||e.mediaUrl}}if(this.isSurge())return{url:e.url||e.openUrl||e["open-url"]}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,r(n)):this.isQuanX()&&$notify(e,s,i,r(n)));let o=["","============== 系统通知 =============="];o.push(e),s&&o.push(s),i&&o.push(i),console.log(o.join("\n"))}getMin(e,s){return e<s?e:s}getMax(e,s){return e<s?s:e}padStr(e,s,i="0"){let n=String(e),r=s>n.length?s-n.length:0,o="";for(let a=0;a<r;a++)o+=i;return o+n}json2str(e,s,i=!1){let n=[];for(let r of Object.keys(e).sort()){let o=e[r];o&&i&&(o=encodeURIComponent(o)),n.push(r+"="+o)}return n.join(s)}str2json(e,s=!1){let i={};for(let n of e.split("#")){if(!n)continue;let r=n.indexOf("=");if(-1==r)continue;let o=n.substr(0,r),a=n.substr(r+1);s&&(a=decodeURIComponent(a)),i[o]=a}return i}randomString(e,s="abcdef0123456789"){let i="";for(let n=0;n<e;n++)i+=s.charAt(Math.floor(Math.random()*s.length));return i}randomList(e){return e[Math.floor(Math.random()*e.length)]}wait(e){return new Promise(s=>setTimeout(s,e))}done(e={}){let s=((new Date).getTime()-this.startTime)/1e3;console.log(`
${this.name} 运行结束，共运行了 ${s} 秒！`),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(e)}}(e,s)}
