/*
 APP：爱临安
 功能：完成任务，获得积分
 抓包：https://vapp.tmuyun.com/ 任意-请求头中 x-session-id 或使用 手机号#密码 两者互不影响
 变量：alaCookie='xxxx@12345678910#abcdefg '  多个账号用 @ 或者 换行 分割
 定时一天三次
 cron: 10 8,10,19 * * *
 */
 const $ = new Env('爱临安')
 const notify = $.isNode() ? require('./sendNotify') : '';
 const CryptoJS = require("crypto-js");
 const salt = "FR*r!isE5W";
 const appid = 56;
 let cookiesArr = [],
   message = "",
   channelId = ["6328a1effe3fc1537e5646e3", "6328a20db40eef1840195e60", "6328a1fead61a4052a4a3315", "6328a27aad61a4052a4a3317","6328a245ad61a4052a4a3316","6328a254b40eef1840195e61"]
 cookie = ($.isNode() ? process.env.alaCookie : $.getdata("alaCookie")) || ``
 helpAu = ($.isNode() ? process.env.jrychelpAu : $.getdata("jrychelpAu")) || true
 !(async () => {
     await requireConfig();
     for (let i = 0; i < cookiesArr.length; i++) {
       if (cookiesArr[i]) {
         sessionid = ''
         msg = '';
         $.index = i + 1;
         $.nickName = '';
         $.userId = '';
         $.mobile = '';
         $.userIdStr = '';
         $.vehicleToken = '';
         $.taskList = {}
         $.queryList = {}
         await getCookie(cookiesArr[i])
         await account_detail();
         console.log(`\n******开始【🐳爱临安账号${$.index}】${$.nickName}|${$.mobile}*********\n`);
         await main()
       }
     }
     if ($.isNode() && message) {
       await notify.sendNotify(`${$.name}`, `${message}`)
     }
   })()
   .catch((e) => $.logErr(e))
   .finally(() => $.done())
 
 async function main() {
   if ($.userId) {
     console.log(`【获取任务列表】`)
     await numberCenter()
     console.log(`【开始完成任务】`)
     await article()
     for (i = 0; i < $.taskList.length; i++) {
       if ($.taskList[i].completed === 1) {
         console.log(`[${$.taskList[i].name}]已完成`)
         continue
       } else {
         console.log(`去完成任务：${$.taskList[i].name}`)
         await doTask($.taskList[i])
       }
     }
     if (helpAu == true) {
       console.log(`【环境变量：jrychelpAu 默认为True 前往助力作者】`)
       await invite()
     }
     console.log(`【查询账号信息】`)
     await account_detail()
     console.log(`拥有:[${$.integral}]积分 | 等级:[${$.grade}]-${$.grade_name}`)
     msg += `拥有:[${$.integral}]积分 \n等级:[${$.grade}]-${$.grade_name}\n\n`
     await showMsg()
   } else console.log(`获取userId失败，退出任务`)
 }
 async function doTask(task) {
   let type = JSON.stringify(task.id);
   let num = Number(task.frequency) - Number(task.finish_times)
   //console.log(`去完成：${task.name},id：${type}`)
   switch (type) {
     case '1327': //签到
       await signin()
       break;
     case '2132123': //新闻资讯阅读
       for (j = 0; j < num && j < $.acticleList.length; j++) {
         console.log(`去浏览：${$.acticleList[j].list_title}`)
         await read($.acticleList[j].id)
         await $.wait(1500)
       }
       break;
     case '1317': //分享资讯给好友
       for (j = 0; j < num && j < $.acticleList.length; j++) {
         console.log(`去分享：${$.acticleList[j].list_title}`)
         await share($.acticleList[j].id)
         await $.wait(1500)
       }
       break;
     case '1320': //新闻资讯评论
       for (j = 0; j < num && j < $.acticleList.length; j++) {
         console.log(`去评论：${$.acticleList[j].list_title}`)
         await comment($.acticleList[j].id)
         await $.wait(1500)
       }
       break;
     case '1319': //新闻资讯点赞
       for (j = 0; j < num && j < $.acticleList.length; j++) {
         console.log(`去点赞：${$.acticleList[j].list_title}`)
         await like($.acticleList[j].id)
         await $.wait(1500)
       }
       break;
      case '1316': //使用本地服务
       for (j = 0; j < num && j < $.acticleList.length; j++) {
         await local()
         await $.wait(1500)
       }
       break;
     case '1328': //邀请
       console.log(`邀请功能暂未上线`)
       break;
     default:
       console.log(`${task.name}暂未上线,请反馈作者`);
   }
 }
 /**
  * 
  * 获取登录Code
  */
  async function credential_auth() {
   let url = {
     url: `https://passport.tmuyun.com/web/oauth/credential_auth`,
     body: `client_id=10012&password=${encodeURIComponent($.pwd)}&phone_number=${$.mobile}`,
     headers: {
       'Host': 'passport.tmuyun.com',
       'Content-Type': 'application/x-www-form-urlencoded',
       'Accept-Encoding': 'gzip, deflate, br'
     }
   }
   return new Promise(resolve => {
     $.post(url, async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               await login(data.data.authorization_code.code)
             } else {
               console.log(data.message)
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * 登录
  */
 async function login(code) {
   let body = 'code=' + code
   sessionid = '63777162fe3fc118b09fab89'
   return new Promise(resolve => {
     $.post(taskPostUrl('/api/zbtxz/login', body), async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               sessionid = data.data.session.id
             } else {
               //console.log(JSON.stringify(data))
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * 获取账号信息
  */
 async function account_detail() {
   let body = ''
   return new Promise(resolve => {
     $.get((taskUrl("/api/user_mumber/account_detail", body)), async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               $.userId = data.data.rst.id
               $.nickName = data.data.rst.nick_name
               $.mobile = data.data.rst.mobile
               $.grade = data.data.rst.grade
               $.grade_name = data.data.rst.grade_name
               $.integral = data.data.rst.total_integral
             } else {
               //console.log(JSON.stringify(data))
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * 获取任务列表
  */
 async function numberCenter() {
   let body = ''
   return new Promise(resolve => {
     $.get((taskUrl("/api/user_mumber/numberCenter", body)), async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               console.log(`获取成功！`)
               $.taskList = data.data.rst['user_task_list']
               //console.log(JSON.stringify($.taskList))
             } else {
               console.log(JSON.stringify(data))
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * 签到
  */
 async function signin() {
   let body = ''
   return new Promise(resolve => {
     $.get((taskUrl("/api/user_mumber/sign", body)), async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               console.log(`签到成功！获得：${data.data.signIntegral}积分`)
             } else {
               console.log(data.message)
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * 获取文章
  */
 async function article() {
   let body = `?channel_id=${channelId[Math.floor(Math.random()*channelId.length)]}&isDiFangHao=false&is_new=1&list_count=${Math.floor(Math.random()*5+1)*10}&size=10&start=${Date.now()}`
   return new Promise(resolve => {
     $.get((taskUrl("/api/article/channel_list", body)), async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               $.acticleList = data.data['article_list']
             } else {
               console.log(data.message)
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * 浏览新闻资讯
  */
 async function read(id) {
   let body = `?id=${id}`
   return new Promise(resolve => {
     $.get((taskUrl("/api/article/detail", body)), async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               console.log(`浏览成功！`)
               if (data.data['score_notify']) console.log(`浏览任务完成，获得[${data.data.score_notify.integral}]积分`)
             } else {
               console.log(data.message)
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * 分享资讯给好友
  */
 async function share() {
   let body = `member_type=3&memberType=3`
   return new Promise(resolve => {
     $.post((taskPostUrl("/api/user_mumber/doTask", body)), async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               console.log(`分享成功！`)
               if (data.data) console.log(`分享任务完成，获得[${data.data.score_notify.integral}]积分`)
             } else {
               console.log(data.message)
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * 新闻资讯评论
  */
 async function comment(id) {
   let body = `channel_article_id=${id}&content=1`
   return new Promise(resolve => {
     $.post((taskPostUrl("/api/comment/create", body)), async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               console.log(`评论成功！`)
               if (data.data) console.log(`评论任务完成，获得[${data.data.score_notify.integral}]积分`)
             } else {
               console.log(data.message)
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * 新闻资讯点赞
  */
 async function like(id) {
   let body = `id=${id}&action=true`
   return new Promise(resolve => {
     $.post((taskPostUrl("/api/favorite/like", body)), async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               console.log(`点赞成功！`)
               if (data.data) console.log(`点赞任务完成，获得[${data.data.score_notify.integral}]积分`)
             } else {
               console.log(data.message)
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * 使用本地服务
  */
 async function local() {
   let body = `member_type=6&memberType=6`
   return new Promise(resolve => {
     $.post((taskPostUrl("/api/user_mumber/doTask", body)), async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               console.log(`使用成功！`)
               if (data.data) console.log(`使用成功，获得[${data.data.score_notify.integral}]积分`)
             } else {
               console.log(data.message)
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * 助力
  */
 async function invite() {
   let body = `ref_code=GUJ289`
   return new Promise(resolve => {
     $.post((taskPostUrl("/api/account/update_ref_code", body)), async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 0) {
               console.log(`助力成功！`)
             } else {
               console.log(data.message)
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data);
       }
     })
   })
 }
 /**
  * 
  * API
  */
 function taskUrl(type, body) {
   getSign(type)
   return {
     url: `https://vapp.tmuyun.com${type}${body}`,
     headers: {
       "X-SESSION-ID": sessionid,
       "X-REQUEST-ID": requestid,
       "X-TIMESTAMP": timestamp,
       "X-SIGNATURE": sign,
       "Cache-Control": `no-cache`,
       "X-TENANT-ID": 56,
       'Host': 'vapp.tmuyun.com',
       'Connection': 'Keep-Alive',
       "Content-Type": `application/x-www-form-urlencoded`,
       'User-Agent': `1.2.2;${requestid};iPad13,4;IOS;16.2;Appstore`
     },
   }
 }
 
 function taskPostUrl(type, body) {
   getSign(type)
   return {
     url: `https://vapp.tmuyun.com${type}`,
     body: `${body}`,
     headers: {
       "X-SESSION-ID": sessionid,
       "X-REQUEST-ID": requestid,
       "X-TIMESTAMP": timestamp,
       "X-SIGNATURE": sign,
       "Cache-Control": `no-cache`,
       "X-TENANT-ID": 56,
       'Host': 'vapp.tmuyun.com',
       'Connection': 'Keep-Alive',
       "Content-Type": `application/x-www-form-urlencoded`,
       'User-Agent': `1.2.2;${requestid};iPad13,4;IOS;16.2;Appstore`
     },
   }
 }
 /**
  * 获取X-SIGNATURE
  */
 function getSign(type) {
   timestamp = Date.now()
   requestid = uuid()
   sign = CryptoJS.SHA256(`${type}&&${sessionid}&&${requestid}&&${timestamp}&&${salt}&&${appid}`).toString()
   //console.log(sign)
 }
 
 function uuid() {
   function S4() {
     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
   }
   return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
 }
 /**
  * 
  * RSA加密
  */
  async function RSA_Encrypt(data) {
   let url = {
     url: `https://www.bejson.com/Bejson/Api/Rsa/pubEncrypt`,
     headers: {
       "Accept": "application/json, text/javascript, */*; q=0.01",
       "Accept-Encoding": " gzip, deflate, br",
       "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
       "Host": "www.bejson.com",
       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
     },
     body: `publicKey=-----BEGIN+PUBLIC+KEY-----%0D%0AMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs%2BcFqwa7ETJ%2BWXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx%2FiOiXFc%2BzCPvaKZric2dXCw27EvlH5rq%2BzwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg%2BthwIDAQAB%0D%0A-----END+PUBLIC+KEY-----&encStr=${data}&etype=rsa2`
   }
   return new Promise(resolve => {
     $.post(url, async (err, resp, data) => {
       try {
         if (err) {
           console.log(`${err}`)
           console.log(`${$.name} API请求失败，请检查网路重试`)
         } else {
           if (data) {
             data = JSON.parse(data);
             //console.log(JSON.stringify(data));
             if (data.code === 200) {
 
             } else {
               console.log(data.msg)
             }
           } else {
             console.log("没有返回数据")
           }
         }
       } catch (e) {
         $.logErr(e, resp)
       } finally {
         resolve(data.data);
       }
     })
   })
 }
 /**
  * 
  * 消息推送
  */
 function showMsg() {
   message += `=== ${$.nickName} | ${$.mobile} ===\n`;
   message += msg
   //console.log(message)
 }
 /**
  * 
  * cookie处理
  */
 function requireConfig() {
   if (cookie) {
     if (cookie.indexOf("@") != -1) {
       cookie.split("@").forEach((item) => {
         cookiesArr.push(item);
       });
     } else if (cookie.indexOf("\n") != -1) {
       cookie.split("\n").forEach((item) => {
         cookiesArr.push(item);
       });
     } else {
       cookiesArr.push(cookie);
     }
     console.log(`\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(new Date().getTime() +new Date().getTimezoneOffset() * 3 * 1000 + 8 * 3 * 3 * 1000).toLocaleString()} \n=============================================\n`)
     console.log(`\n=========共有${cookiesArr.length}个${$.name}账号Cookie=========\n`);
   } else {
     console.log(`\n【缺少alaCookies环境变量或者Cookies为空！】`)
     return;
   }
 }
 /**
  * cookie转换
  */
 async function getCookie(rawCookie) {
   if (rawCookie.includes('#')) {
     $.pwd = await RSA_Encrypt(rawCookie.split('#')[1])
     $.mobile = rawCookie.split('#')[0]
     await credential_auth()
   } else {
     sessionid = rawCookie;
   }
 }
 // prettier-ignore
 function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
