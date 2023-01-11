/*
邀请码：BLJSNK 408行默认作者邀请码 可自行修改
安卓地址：https://x0.ifengimg.com/producttech/novel/apk/202205/7e8f05e9b40469a5131c84e5cb143948.apk
苹果：APP商店 八蕉免费小说
抓域名novel.vpquc9rn.com
查看请求头x-novel-app: XXXXXXXXXXXX
变量
export bjxshd='XXXXXXX'
多号@或换行
corn 0 0 * * * bjxs.js
============================================
圈X
 重写
 [MITM]
 hostname = novel.vpquc9rn.com

 [rewrite_local]
https://novel.vpquc9rn.com/api/task/bajiaoRemind url script-request-header http://nm6.xyz:20080/ningmeng/ningmeng/raw/branch/main/bjxs.js
*/
//[task_local]
//0 */1 * * * http://nm6.xyz:20080/ningmeng/ningmeng/raw/branch/main/bjxs.js, tag=八蕉免费小说, enabled=true


const $ = new Env('八蕉免费小说');
const {log} = console;
const CryptoJS = require('crypto-js')
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
//////////////////////

let bjxshd = ($.isNode() ? process.env.bjxshd : $.getdata("bjxshd")) || "";
let bjxshdArr = [];
let msg = '';
let accountTips = '';
var timestamp = Math.round(new Date().getTime()/1000).toString();
!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite();
    } else {
        if (!(await Envs()))
            return;
        else {

            log(`\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000).toLocaleString()} \n=============================================\n`);


            log(`\n============ 微信公众号：柠檬玩机交流 ============`)
            log(`\n=================== 共找到 ${bjxshdArr.length} 个账号 ===================`)
            if (debug) {
                log(`【debug】 这是你的全部账号数组:\n ${bjxshdArr}`);
            }

            for (let index = 0; index < bjxshdArr.length; index++) {
                let num = index + 1
                log(`\n========= 开始【第 ${num} 个账号】=========\n`)
                accountTips = `账号【${num}】`;
                var temp = bjxshdArr[index];
                //判断下格式
                if (temp.indexOf('&') >= 0) {
                    var info = temp.split('&');
                    var theRequest = new Object();
                    for (var i = 0; i < info.length; i++) {
                        theRequest[info[i].split("=")[0]] = unescape(info[i].split("=")[1]);
                    }
                    bjxshd = theRequest.data;
                } else {
                    bjxshd = bjxshdArr[index];
                }

await bajiaoCheckIn()
await bajiaoBindInviter()
await bajiaoTreasureBoxComplete()
await bajiaoTaskComplete(Encrypt('taskid=97')) 
await bajiaoShareNovel()              
await bajiaoTaskComplete(Encrypt('taskid=38'))
await bajiaoReadPreferenceSet()
await bajiaoTaskComplete(Encrypt('taskid=20'))
await rank()
await tasks()
await bajiaoRemind()
await withdrawalInfoNew()
            }
            await SendMsg(msg);
        }
    }
})()
    .catch((e) => log(e))
    .finally(() => $.done())




async function rank() {

var options = {

  url: 'https://novel.vpquc9rn.com/api/rank?rank_id=0&channel_id=2&offset=0&limit=10',
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'Accept-Encoding': 'gzip',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'
    

  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.get(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                list = result.data
                for(let i=0;i<list.length;i++){
                log(list[i].name)
                await content(list[i].bookId)
                await $.wait(30000)
                await bajiaoReadTime()
                }
                } else 
                    log(result.message)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function bajiaoTaskComplete(a) {

var options = {

  url: 'https://novel.vpquc9rn.com/api/task/bajiaoTaskComplete',
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },
body:`{"c":"${a}"}`
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.post(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log(result.msg)
                } else 
                 log(result.msg) 
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function bajiaoCheckIn() {

var options = {

  url: 'https://novel.vpquc9rn.com/api/task/bajiaoCheckIn',
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },
body:`{"c":"lGzpPTN19+cIgmcLt4tGGg=="}`
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.post(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                
                    log(result.msg)
                    await bajiaoTaskCompleteDouble()
                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function bajiaoTaskCompleteDouble() {

var options = {

  url: 'https://novel.vpquc9rn.com/api/task/bajiaoTaskCompleteDouble',
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },
body:`{"c":"SwRRUgDAv26ng20bBgscNg=="}`
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.post(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log(result.msg)
                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function bajiaoShareNovel() {

var options = {

  url: 'https://novel.vpquc9rn.com/api/task/bajiaoShareNovel?bookId=3252679&taskid=38',
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },
body:``
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.post(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log(result.msg)
                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function bajiaoReadPreferenceSet() {

var options = {

  url: 'https://novel.vpquc9rn.com/api/task/bajiaoReadPreferenceSet',
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },
body:`{"c":"0H6mV4UqzzgXpni8a2OZUoQRr5m6ajF9i1TnfEheIxM="}`
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.post(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log(result.msg)
                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function bajiaoWatchInspireVideo() {

var options = {

  url: 'https://novel.vpquc9rn.com/api/task/bajiaoWatchInspireVideo',
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.get(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log(result.msg)
                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function bajiaoBindInviter() {

var options = {

  url: 'https://novel.vpquc9rn.com/api/task/bajiaoBindInviter?code=BLJSNK',
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.post(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log(result.msg)
                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function bajiaoTreasureBoxComplete() {

var options = {

  url: 'https://novel.vpquc9rn.com/api/task/bajiaoTreasureBoxComplete',
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.get(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log(result.msg)
                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function content(a) {

var options = {

  url: `https://novel.vpquc9rn.com/api/content?bookId=${a}&chapterId=1`,
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.get(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log(result.data.title)

                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function bajiaoReadTime() {

var options = {

  url: `https://novel.vpquc9rn.com/api/task/bajiaoReadTime?readTime=30`,
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },
body:''
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.post(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log(result.msg)
                    await readTiming()
                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function readTiming() {

var options = {

  url: `https://novel.vpquc9rn.com/api/task/readTiming`,
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },
body:''
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.post(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log(result.msg)
                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function tasks() {

var options = {

  url: `https://novel.vpquc9rn.com/api/task/tasks?c=XP0NGJcEmJATDmOr3T8i4g%3D%3D`,
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.get(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                readTimelist = result.data.readTime
                for(let i =0;i<readTimelist.length;i++){
                 if(readTimelist[i].status == 1) {
                 await bajiaoTaskComplete(Encrypt('taskid='+readTimelist[i].id)) 
                 }  
                }
                if(result.data.adVideo.times !== 5){
                cs = 5-result.data.adVideo.times
                for(let i=0;i<cs;i++){
                await bajiaoWatchInspireVideo()
                await $.wait(10000)
                }    
                }
                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function bajiaoRemind() {

var options = {

  url: `https://novel.vpquc9rn.com/api/task/bajiaoRemind`,
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.get(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log('今日获得：'+result.data.integral_today)
                    log('公共获得：'+result.data.integral_total)
                    log('今日已阅读：'+result.data.readtime/60)
                    msg += '今日获得：'+result.data.integral_today+'\n公共获得：'+result.data.integral_total+'\n今日已阅读：'+result.data.readtime/60

                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function withdrawalInfoNew() {

var options = {

  url: `https://novel.vpquc9rn.com/api/withdrawalInfoNew`,
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.get(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                    log(result.data.body)
                    openid = result.data.openid
                    log('余额：'+result.data.money)
                    log('已绑定：'+result.data.nickname+' openid：'+result.data.openid)
                    log('==开始提现==')

                    if(result.data.money > result.data.withdrawa[1].amount && result.data.withdrawa[1].status == true){
                    await WithdrawalFormNew(result.data.withdrawa[1].amount,openid)    
                    }
                    else
                    if(result.data.money > result.data.withdrawa[0].amount && result.data.withdrawa[0].status == true){
                    await WithdrawalFormNew(result.data.withdrawa[0].amount,openid)
                    }
                    else
                    if(result.data['fitst_withdrawa'] && result.data['fitst_withdrawa'].status){
                    if(result.data['fitst_withdrawa'].status == true){
                    await WithdrawalFormNew(result.data['fitst_withdrawa'].amount,openid)    
                    }

                    }


                } else 
                    log(result.msg)
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
async function WithdrawalFormNew(amount,openid) {

var options = {

  url: `https://novel.vpquc9rn.com/api/WithdrawalFormNew?amount=${amount}&openid=${openid}`,
  headers: {
    'x-novel-app': bjxshd,
    'client-id': 'ifsSdkysvtumeglrxoe3959745383482',
    'x-novel-info': '{"platform":0,"package":"com.feiyang.novel.reader","build":"94","channel":""}',
    'Content-Type': 'application/json',
    'Content-Length': '32',
    Host: 'novel.vpquc9rn.com',
    Connection: 'Keep-Alive',
    'User-Agent': 'okhttp/3.6.0',
    'content-type': 'application/json'

  },
body:''
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
            return new Promise((resolve) => {
        $.post(options, async (error, response, data) =>{
            try {
                 let result= JSON.parse(data);
                if (debug) {
                    log(`\n\n【debug】===============这是 返回result==============`);
                    log(data)
                }
                if (result.ret == 0) {
                 if(result.data && result.data[0].status){
                     log(result.data[0].title+'\n'+result.data[1].title)
                     msg += result.data[0].title+'\n'+result.data[1].title
                 }

                  

                } else 
                    log('\n'+result.msg)
                    msg += '\n'+result.msg
            } catch (e) {
                log(`异常，原因：${e}，返回：${data}`)
            } finally {
                resolve();
            }
        })
    })
}
// ============================================重写============================================ \\
async function GetRewrite() {
    if ($request.url.indexOf("/api/task/bajiaoRemind") > -1) {
        const ck1 = $request.headers;
        ck = ck1.match(/x-novel-app: (.*)/)[0]
        if (bjxshd) {
            if (bjxshd.indexOf(ck) == -1) {
                bjxshd = bjxshd + "@" + ck;
                $.setdata(bjxshd, "bjxshd");
                let List = bjxshd.split("@");
                $.msg(`【${$.name}】` + ` 获取第${List.length}个 ck 成功: ${ck} ,不用请自行关闭重写!`);
            }
        } else {
            $.setdata(ck, "bjxshd");
            $.msg(`【${$.name}】` + ` 获取第1个 ck 成功: ${ck} ,不用请自行关闭重写!`);
        }
    }
}
function md5(a){function b(a,b){return a<<b|a>>>32-b}function c(a,b){var c,d,e,f,g;return e=2147483648&a,f=2147483648&b,c=1073741824&a,d=1073741824&b,g=(1073741823&a)+(1073741823&b),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f}function d(a,b,c){return a&b|~a&c}function e(a,b,c){return a&c|b&~c}function f(a,b,c){return a^b^c}function g(a,b,c){return b^(a|~c)}function h(a,e,f,g,h,i,j){return a=c(a,c(c(d(e,f,g),h),j)),c(b(a,i),e)}function i(a,d,f,g,h,i,j){return a=c(a,c(c(e(d,f,g),h),j)),c(b(a,i),d)}function j(a,d,e,g,h,i,j){return a=c(a,c(c(f(d,e,g),h),j)),c(b(a,i),d)}function k(a,d,e,f,h,i,j){return a=c(a,c(c(g(d,e,f),h),j)),c(b(a,i),d)}function l(a){for(var b,c=a.length,d=c+8,e=(d-d%64)/64,f=16*(e+1),g=new Array(f-1),h=0,i=0;c>i;)b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|a.charCodeAt(i)<<h,i++;return b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|128<<h,g[f-2]=c<<3,g[f-1]=c>>>29,g}function m(a){var b,c,d="",e="";for(c=0;3>=c;c++)b=a>>>8*c&255,e="0"+b.toString(16),d+=e.substr(e.length-2,2);return d}function n(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b}var o,p,q,r,s,t,u,v,w,x=[],y=7,z=12,A=17,B=22,C=5,D=9,E=14,F=20,G=4,H=11,I=16,J=23,K=6,L=10,M=15,N=21;for(a=n(a),x=l(a),t=1732584193,u=4023233417,v=2562383102,w=271733878,o=0;o<x.length;o+=16)p=t,q=u,r=v,s=w,t=h(t,u,v,w,x[o+0],y,3614090360),w=h(w,t,u,v,x[o+1],z,3905402710),v=h(v,w,t,u,x[o+2],A,606105819),u=h(u,v,w,t,x[o+3],B,3250441966),t=h(t,u,v,w,x[o+4],y,4118548399),w=h(w,t,u,v,x[o+5],z,1200080426),v=h(v,w,t,u,x[o+6],A,2821735955),u=h(u,v,w,t,x[o+7],B,4249261313),t=h(t,u,v,w,x[o+8],y,1770035416),w=h(w,t,u,v,x[o+9],z,2336552879),v=h(v,w,t,u,x[o+10],A,4294925233),u=h(u,v,w,t,x[o+11],B,2304563134),t=h(t,u,v,w,x[o+12],y,1804603682),w=h(w,t,u,v,x[o+13],z,4254626195),v=h(v,w,t,u,x[o+14],A,2792965006),u=h(u,v,w,t,x[o+15],B,1236535329),t=i(t,u,v,w,x[o+1],C,4129170786),w=i(w,t,u,v,x[o+6],D,3225465664),v=i(v,w,t,u,x[o+11],E,643717713),u=i(u,v,w,t,x[o+0],F,3921069994),t=i(t,u,v,w,x[o+5],C,3593408605),w=i(w,t,u,v,x[o+10],D,38016083),v=i(v,w,t,u,x[o+15],E,3634488961),u=i(u,v,w,t,x[o+4],F,3889429448),t=i(t,u,v,w,x[o+9],C,568446438),w=i(w,t,u,v,x[o+14],D,3275163606),v=i(v,w,t,u,x[o+3],E,4107603335),u=i(u,v,w,t,x[o+8],F,1163531501),t=i(t,u,v,w,x[o+13],C,2850285829),w=i(w,t,u,v,x[o+2],D,4243563512),v=i(v,w,t,u,x[o+7],E,1735328473),u=i(u,v,w,t,x[o+12],F,2368359562),t=j(t,u,v,w,x[o+5],G,4294588738),w=j(w,t,u,v,x[o+8],H,2272392833),v=j(v,w,t,u,x[o+11],I,1839030562),u=j(u,v,w,t,x[o+14],J,4259657740),t=j(t,u,v,w,x[o+1],G,2763975236),w=j(w,t,u,v,x[o+4],H,1272893353),v=j(v,w,t,u,x[o+7],I,4139469664),u=j(u,v,w,t,x[o+10],J,3200236656),t=j(t,u,v,w,x[o+13],G,681279174),w=j(w,t,u,v,x[o+0],H,3936430074),v=j(v,w,t,u,x[o+3],I,3572445317),u=j(u,v,w,t,x[o+6],J,76029189),t=j(t,u,v,w,x[o+9],G,3654602809),w=j(w,t,u,v,x[o+12],H,3873151461),v=j(v,w,t,u,x[o+15],I,530742520),u=j(u,v,w,t,x[o+2],J,3299628645),t=k(t,u,v,w,x[o+0],K,4096336452),w=k(w,t,u,v,x[o+7],L,1126891415),v=k(v,w,t,u,x[o+14],M,2878612391),u=k(u,v,w,t,x[o+5],N,4237533241),t=k(t,u,v,w,x[o+12],K,1700485571),w=k(w,t,u,v,x[o+3],L,2399980690),v=k(v,w,t,u,x[o+10],M,4293915773),u=k(u,v,w,t,x[o+1],N,2240044497),t=k(t,u,v,w,x[o+8],K,1873313359),w=k(w,t,u,v,x[o+15],L,4264355552),v=k(v,w,t,u,x[o+6],M,2734768916),u=k(u,v,w,t,x[o+13],N,1309151649),t=k(t,u,v,w,x[o+4],K,4149444226),w=k(w,t,u,v,x[o+11],L,3174756917),v=k(v,w,t,u,x[o+2],M,718787259),u=k(u,v,w,t,x[o+9],N,3951481745),t=c(t,p),u=c(u,q),v=c(v,r),w=c(w,s);var O=m(t)+m(u)+m(v)+m(w);return O.toLowerCase()}
/**
 *
 * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
 *    :$.time('yyyyMMddHHmmssS')
 *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
 *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
 * @param {string} fmt 格式化参数
 * @param {number} 可选: 根据指定时间戳返回格式化日期
 *
 */
var key = CryptoJS.enc.Utf8.parse("yytkjfgzmnklfgyy");

function Encrypt(word) {
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function Decrypt(word) {
    var srcs = word;
    var decrypt = CryptoJS.AES.decrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
}
function time(fmt, ts = null) {
    const date = ts ? new Date(ts) : new Date();
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length)
            );
    return fmt;
}


// ============================================变量检查============================================ \\
async function Envs() {
    if (bjxshd) {
        if (bjxshd.indexOf("@") != -1) {
            bjxshd.split("@").forEach((item) => {
                bjxshdArr.push(item);
            });
        } else if (bjxshd.indexOf("\n") != -1) {
            bjxshd.split("\n").forEach((item) => {
                bjxshdArr.push(item);
            });
        } else {
            bjxshdArr.push(bjxshd);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 bjxshd`)
        return;
    }
    return true;
}

// ============================================发送消息============================================ \\
/**
 * 添加消息
 * @param str
 * @param is_log
 */
function addNotifyStr(str, is_log = true) {
    if (is_log) {
        log(`${accountTips}${str}\n`)
    }
    msg += `${accountTips}${str}\n`
}

async function SendMsg(message) {
    if (!message)
        return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        log(message);
    }
}






/**
 * 随机数生成
 */
function randomString(e) {
    e = e || 32;
    var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}

/**
 * 随机整数生成
 */
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

/**
 * 获取毫秒时间戳
 */
function timestampMs() {
    return new Date().getTime();
}

/**
 * 获取秒时间戳
 */
function timestampS() {
    return Date.parse(new Date()) / 1000;
}

/**
 * 获取随机诗词
 */


/**
 * 修改配置文件
 */
function modify() {

    fs.readFile('/ql/data/config/config.sh', 'utf8', function (err, dataStr) {
        if (err) {
            return log('读取文件失败！' + err)
        } else {
            var result = dataStr.replace(/regular/g, string);
            fs.writeFile('/ql/data/config/config.sh', result, 'utf8', function (err) {
                if (err) {
                    return log(err);
                }
            });
        }
    })
}


function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({url: t}, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: r},
                    headers: {"X-Key": o, Accept: "*/*"}
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => {
                const {message: s, response: i} = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t => {
                    const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                    e(null, {status: s, statusCode: i, headers: r, body: o}, o)
                }, t => {
                    const {message: s, response: i} = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return {openUrl: e, mediaUrl: s}
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return {"open-url": e, "media-url": s}
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {url: e}
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}