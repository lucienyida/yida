//阿里云盘连续签到活动
//https://alist.nn.ci/zh/guide/drivers/aliyundrive.html 打开页面扫码获取refresh_token
//环境变量:ALI_TOKEN,多账号用换行或,或@或&分隔

const $ = API();
let refresh_token = [];
let msg = '';
!(async () => {

    if ($.env.isNode) {
        if (process.env.ALI_TOKEN) {
            if (process.env.ALI_TOKEN.indexOf(',') > -1) {
                refresh_token = process.env.ALI_TOKEN.split(',');
            } else if (process.env.ALI_TOKEN.indexOf('&') > -1) {
                refresh_token = process.env.ALI_TOKEN.split('&');
            } else if (process.env.ALI_TOKEN.indexOf('\n') > -1) {
                refresh_token = process.env.ALI_TOKEN.split('\n');
            } else if (process.env.ALI_TOKEN.indexOf('@') > -1) {
                refresh_token = process.env.ALI_TOKEN.split('@');
            } else {
                refresh_token = [process.env.ALI_TOKEN];
            }
        }
    }

    if (!refresh_token || refresh_token.length == 0) {
        console.log('先填写refresh_token!');
        return;
    }
    for (let i = 0; i < refresh_token.length; i++) {
        await main(refresh_token[i]);
        await $.wait(1000);
        if (i < refresh_token.length - 1) msg += '\n\n';
    }

    try {
        if ($.env.isNode) {
            const notify = require('./sendNotify');
            notify.sendNotify('【阿里云盘】', msg);
        }
        else {
            $.notify('【阿里云盘】', msg);
        }
    } catch (error) {
        console.log('通知发送失败', error);
    }

})().catch(async (e) => {
    console.log('', '❌失败! 原因:' + e + '!', '');
}).finally(() => {
    $.done();
});

async function main(tk) {
    try {
        const url = `https://auth.aliyundrive.com/v2/account/token`;
        const method = `POST`;
        const headers = {
            'Connection': `keep-alive`,
            'Content-Type': `application/json; charset=UTF-8`,
            'X-Canary': `client=iOS,app=adrive,version=v4.1.3`,
            'User-Agent': `AliApp(AYSD/4.1.3) com.alicloud.smartdrive/4.1.3 Version/16.3 Channel/201200 Language/zh-Hans-CN /iOS Mobile/iPhone15,2`,
            'Host': `auth.aliyundrive.com`,
            'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
            'Accept': `*/*`
        };
        const body = `{"grant_type":"refresh_token","app_id":"pJZInNHN2dZWk8qg","refresh_token":"${tk}"}`;

        const myRequest = {
            url: url,
            method: method,
            headers: headers,
            body: body
        };

        let a = await $.http.post(myRequest);
        let data = JSON.parse(a.body);
        if (data.code == 'InvalidParameter.RefreshToken') {
            //{"code":"InvalidParameter.RefreshToken","message":"The input parameter refresh_token is not valid. ","requestId":null}
            console.log(`【❌】token刷新失败,${data.message}`);
            msg += `【❌】token刷新失败,${data.message}`;
        }
        else {
            console.log(`【${data.nick_name}】`);
            let token = data.access_token;
            msg += `【${data.nick_name}】`;
            await sign(token);
        }

    } catch (error) {
        console.log('error:' + error);
    }
}

async function sign(token) {
    try {
        const url = `https://member.aliyundrive.com/v1/activity/sign_in_list`;
        const method = `POST`;
        const headers = {
            'Connection': `keep-alive`,
            'Content-Type': `application/json`,
            'Origin': `https://pages.aliyundrive.com`,
            'X-Canary': `client=web,app=other,version=v0.1.0`,
            'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20D5024e iOS16.3 (iPhone15,2;zh-Hans-CN) App/4.1.3 AliApp(yunpan/4.1.3) com.alicloud.smartdrive/28278449  Channel/201200 AliApp(AYSD/4.1.3) com.alicloud.smartdrive/4.1.3 Version/16.3 Channel/201200 Language/zh-Hans-CN /iOS Mobile/iPhone15,2 language/zh-Hans-CN`,
            'Authorization': `Bearer ${token}`,
            'Host': `member.aliyundrive.com`,
            'Referer': `https://pages.aliyundrive.com/`,
            'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
            'Accept': `application/json, text/plain, */*`
        };
        const body = `{"isReward":false}`;

        const myRequest = {
            url: url,
            method: method,
            headers: headers,
            body: body
        };
        let a = await $.http.post(myRequest);//console.log(a.body);
        let data = JSON.parse(a.body);
        if (data.success) {
            console.log(`已连续签到${data.result.signInCount}天!`);
            msg += `已连续签到${data.result.signInCount}天!`
            await sign_in_reward(token, data.result.signInCount);
        }
        else {
            console.log(`签到失败,${data.message}!`);
            msg += `签到失败,${data.message}!`;
        }

    } catch (error) {
        console.log(error);
    }
}

async function sign_in_reward(token, day) {
    try {
        const url = `https://member.aliyundrive.com/v1/activity/sign_in_reward`;
        const method = `POST`;
        const headers = {
            'Connection': `keep-alive`,
            'Content-Type': `application/json`,
            'Origin': `https://pages.aliyundrive.com`,
            'X-Canary': `client=web,app=other,version=v0.1.0`,
            'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20D5024e iOS16.3 (iPhone15,2;zh-Hans-CN) App/4.1.3 AliApp(yunpan/4.1.3) com.alicloud.smartdrive/28278449  Channel/201200 AliApp(AYSD/4.1.3) com.alicloud.smartdrive/4.1.3 Version/16.3 Channel/201200 Language/zh-Hans-CN /iOS Mobile/iPhone15,2 language/zh-Hans-CN`,
            'Authorization': `Bearer ${token}`,
            'Host': `member.aliyundrive.com`,
            'Referer': `https://pages.aliyundrive.com/`,
            'Accept-Language': `zh-CN,zh-Hans;q=0.9`,
            'Accept': `application/json, text/plain, */*`
        };
        const body = `{"signInDay":${day}}`;

        const myRequest = {
            url: url,
            method: method,
            headers: headers,
            body: body
        };

        let a = await $.http.post(myRequest);
        let data = JSON.parse(a.body);
        if (data.success) {
            if (data?.result?.name) {
                console.log(`🎁奖励:${data?.result?.name},${data?.result?.description},${data?.result?.notice}!`);
                msg += `🎁奖励:${data?.result?.name},${data?.result?.description},${data?.result?.notice}!`;
            }
            else {
                console.log(`🎁奖励:领了个寂寞!`);
                msg += `🎁奖励:领了个寂寞!`;
            }
        }
        else {
            console.log(`🎁奖励获取失败:${data.message}!`);
            msg += `🎁奖励获取失败:${data.message}!`;
        }

    } catch (error) {
        console.log(error);
    }
}


/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/