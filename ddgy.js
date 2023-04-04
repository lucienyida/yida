/*
 日期：2022-10-8
 软件：滴滴果园
 功能：签到，做任务，浇水
 抓包：随便抓一个包，只要token后面的内容就行"token":"xxxxxxxxxxxxxxxxxxxxxxxx"}
 变量：ddgy='xxxxxxxxxxxxx@xxxxxxxxxxxxx '  多个账号用 @ 或者 换行 分割
 注意：必须先完成新手教程
 浏览周边好去处，查看附近核酸检测点，真香卡 这三个任务第一次是完成不了，第二次会自动完成
 cron: 8 8,12,15 * * *
 */

const $ = new Env('滴滴果园');
const notify = $.isNode() ? require('./sendNotify') : '';
const {log} = console;
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const taskarra = [72,41,62,261]
const fdarra = [251,252,253]

//////////////////////
let ddgy = process.env.ddgy;
let ddgyArr = [];
let data = '';
let msg = '';
const header = JSON.parse(`{"User-Agent":"Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/105.0.5195.136 Mobile Safari/537.36 didi.passenger/6.2.4 FusionKit/2.0.0","Content-Type":"application/json;charset=UTF-8","Accept":"application/json, text/plain, */*"}`)

!(async () => {

	if (!(await Envs()))
		return;
	else {



		log(`\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
			new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
			8 * 60 * 60 * 1000).toLocaleString()} \n=============================================\n`);


		log(`\n=================== 共找到 ${ddgyArr.length} 个账号 ===================`)

		for (let index = 0; index < ddgyArr.length; index++) {

			let num = index + 1
			log(`\n========= 开始【第 ${num} 个账号】=========\n`)
			token = ddgyArr[index];
			msg += `\n第${num}个账号运行结果：`
			log('开始签到');
			await doSign();
			await checkwater();
			await getask();
			await $.wait(2 * 1000);
			log('开始任务')
			for (let i = 0; i < taskarra.length; i++) {
				await dotask(taskarra[i])
				await $.wait(2 * 1000);
                await award(taskarra[i])
            }
			await $.wait(2 * 1000);
			log('做【饭点领水滴】任务')
			for (let i = 0; i < fdarra.length; i++) {
                await award(fdarra[i])
				await $.wait(2 * 1000);
            }
			log('做【从福利中心浏览滴滴果园】任务')
			await accept(255);
			await $.wait(3 * 1000);
			await doflzx();
			await $.wait(3 * 1000);
			await award(255);
			log('做【看附近核酸检测点】任务')
			await accept(68);
			await $.wait(3 * 1000);
			await dohesuan();
			await $.wait(3 * 1000);
			await award(68);
			log('做【浏览真香卡30s】任务')
			await accept(65);
			await $.wait(3 * 1000);
			await dozxk()
			await $.wait(2 * 1000);
			await award(65)
			await $.wait(2 * 1000);
			log('做【浏览周边好去处】任务')
			await accept(70);
			await $.wait(3 * 1000);
			await dozb()
			await $.wait(2 * 1000);
			await award(70)
			await $.wait(2 * 1000);
			await checkwater();
			await $.wait(2 * 1000);
			await collectwater();
			await $.wait(2 * 1000);
			if(jscs >= 200){
				log('浇水达到200g获取1袋肥料')
				await award(100)
				await $.wait(2 * 1000);
			}else if(jscs >= 500){
				log('浇水达到500g获取2袋肥料')
				await award(101)
				await $.wait(2 * 1000);
			}else{
				log('浇水次数不足无法领取200g/500g奖励')
			}
			if(parseInt(sl) > 10){
				for (i = 0; i < 10; i++) {
                    await water();//浇水
				    await $.wait(2 * 1000);
				    if(parseInt(nowater) < 10){
					  log('水滴不足10，停止浇水')
					  break;
				    }
			    } 
			}
			await info();
		}
		await SendMsg(msg);
	}

})()
	.catch((e) => log(e))
	.finally(() => $.done())


/**
 * 签到
 */
function doSign(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240301",
                "prod_key": "didi-orchard",
                "xpsid": "",
                "dchn": "O9aM923",
                "xoid": "",
                "uid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
                "platform": 1,
				"token": `${token}`
            }
		let url = {
			url: 'http://game.xiaojukeji.com/api/game/plant/sign',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
					log(`签到成功，今天是第${result.data['sign_times']}天签到，获得：${result.data.rewards[0].name}`)
					msg += `\n签到成功，今天是第${result.data['sign_times']}天签到，获得：${result.data.rewards[0].name}`
				} else if (result.errmsg == '您今天已经签过到啦') {
					log(`签到失败，今日已签到`)
					//msg += `\n签到失败，今日已签到`
				} else {
					log(`签到失败，原因是：${result}`)
					msg += `\n签到失败，原因是：${result}`
				}
			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 获取任务列表
 */
function getask(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = {
			url: `http://game.xiaojukeji.com/api/game/mission/get?xbiz=240301&prod_key=didi-orchard&xpsid=&dchn=O9aM923&xoid=&uid=&xenv=passenger&xspm_from=&xpsid_root=&xpsid_from=&xpsid_share=&game_id=23&loop=0&platform=1&token=${token}`,
			headers: JSON.parse(`{"User-Agent":"Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/105.0.5195.136 Mobile Safari/537.36 didi.passenger/6.2.4 FusionKit/2.0.0","Content-Type":"application/json;charset=UTF-8"}`),
		}

		$.get(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
					log('任务获取成功')
					let tasklist = result.data.missions
					let b = tasklist.find(item => item['title']==='每日浇水200g')
					jscs = b['progress']
				} else {
					log(`任务获取失败，原因是：${result}`)
				}
			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}
/**
 * 接受任务
 */
function accept(id,timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240301",
                "prod_key": "didi-orchard",
                "xpsid": "",
                "dchn": "O9aM923",
                "xoid": "",
                "uid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
				"mission_id": id,
				"game_id": 23,
                "platform": 1,
				"token": `${token}`
            }
		let url = {
			url: 'http://game.xiaojukeji.com/api/game/mission/accept',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg != 'success') {
                    log(`任务接受失败，原因是:${data}`)
				}

			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 做任务
 */
function dotask(id,timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240301",
                "prod_key": "didi-orchard",
                "xpsid": "",
                "dchn": "O9aM923",
                "xoid": "",
                "uid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
				"mission_id": id,
				"game_id": 23,
                "platform": 1,
				"token": `${token}`
            }
		let url = {
			url: 'https://game.xiaojukeji.com/api/game/mission/update',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
					log('任务已提交')
				}else if(result.errmsg == '服务内部错误'){
					log('任务已完成不存在或者无法完成，需要手动完成')
				} else {
					log(`任务失败，原因是：${data}`)
					msg += '\n任务失败'
				}
			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 完成任务
 */
function award(id,timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240301",
                "prod_key": "didi-orchard",
                "xpsid": "",
                "dchn": "O9aM923",
                "xoid": "",
                "uid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
				"mission_id": id,
				"game_id": 23,
                "platform": 1,
				"token": `${token}`
            }
		let url = {
			url: 'http://game.xiaojukeji.com/api/game/mission/award',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
					log(`<${result.data.title}>任务完成，获得${result.data.reward[0].count}点${result.data.reward[0].name}`)
				} else if (result.errmsg == '对应奖励已领取') {
					log(`任务完成，奖励已经领取`)
				} else if (result.errmsg == '任务未达到领奖条件') {
					log(`任务提交失败`)
				} else {
					log(`任务失败，原因是：${data}`)
					msg += '\n任务失败'
				}
			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 做核酸
 */
function dohesuan(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240000",
                "prod_key": "ut-nucleic-acid-test",
                "xpsid": "fdd4115c5e704edc8303ac958a8d57b3",
                "dchn": "dQnERQO",
                "xoid": "gCTBp+hrSmitnuv3eGQUhg",
                "uid": 1,
                "xenv": "passenger",
                "xspm_from": "didi-orchard.none.c10030.none",
                "xpsid_root": "53ebf61bb0b048b493f590b49cf06536",
                "xpsid_from": "53ebf61bb0b048b493f590b49cf06536",
                "xpsid_share": "",
				"xpos_from": "%7B%22id%22%3A205%2C%22pk%22%3A%22didi-orchard%22%2C%22idx%22%3A%22none%22%7D",
	            "web_type": 1,
	            "token": `${token}`,
	            "ticket": `${token}`,
	            "city_id": 11,
	            "lon": 111,
	            "lat": 11,
				"env": {
		            "newTicket": `${token}`,
		            "newAppid": "10000",
		            "openId": "",
		            "latitude": "11",
		            "longitude": "111",
		            "cityId": "11",
		            "isHitButton": true,
		            "isOpenWeb": false,
		            "ddfp": "f44f15a79a26400afa9f49e44987c310",
		            "deviceId": "f44f15a79a26400afa9f49e44987c310",
		            "appVersion": "6.2.4",
		            "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
		            "fromChannel": "1"
	            },
	            "biz": 2
            }
		let url = {
			url: 'https://gaea.xiaojukeji.com/poi/health/preview/page',
			headers: {
                "Accept-Encoding": "gzip, deflate, br",
                "Host": "gaea.xiaojukeji.com",
                "Content-Length": 1623,
                "Referer": "https://page.udache.com/",
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive"
            },
			body: JSON.stringify(postbody),
		}

		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'ok') {
                    log('【查看附近核酸检测点】任务浏览成功')
				} else {
					log(`任务失败，原因是：${data}`)
					msg += '\n任务失败'
				}
			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 做真香卡
 */
function dozxk(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240201",
                "prod_key": "ut-carowner-service",
                "xpsid": "",
                "dchn": "YOwwv95",
                "xoid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
				"xpos_from": "",
	            "platform_type": 1,
	            "token": `${token}`,
				"env": {
		            "newTicket": `${token}`,
					"isOpenWeb": true,
					"ticket": `${token}`,
		            "cityId": "11",
		            "longitude": "111",
		            "latitude": "11",
		            "xAxes": "0",
		            "yAxes": "0",
		            "newAppid": "10000",
		            "isHitButton": true,
		            "ddfp": "f44f15a79a26400afa9f49e44987c310",
		            "deviceId": "f44f15a79a26400afa9f49e44987c310",
		            "appVersion": "6.2.4",
		            "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
		            "fromChannel": "1"
	            },
	            "appversion": "6.2.4",
	            "city_id": 11,
	            "version": 2
            }
		let url = {
			url: 'https://ut.xiaojukeji.com/ut/kappa/api/owner/vip/index',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
                    log('【浏览真香卡30s】任务浏览成功')
				} else {
					log(`任务失败，原因是：${data}`)
					msg += '\n任务失败'
				}
			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 福利中心浏览果园
 */
function doflzx(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240000",
                "prod_key": "welfare-center",
                "xpsid": "",
                "dchn": "DpQ3dga",
                "xoid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
	            "token": `${token}`,
				"lat": "11",
	            "lng": "111",
	            "platform": "na",
				"env": `{\"cityId\":\"11\",\"token\":\"${token}\",\"longitude\":\"111\",\"latitude\":\"11\",\"appid\":\"30004\",\"fromChannel\":\"1\",\"deviceId\":\"f44f15a79a26400afa9f49e44987c310\",\"ddfp\":\"f44f15a79a26400afa9f49e44987c310\",\"appVersion\":\"6.2.4\",\"userAgent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 BottomBar/on OffMode/0\"}`,
	            "type": "navigation_click",
	            "data": {
		            "navigation_type": "didi_garden"
	            }
            }
		let url = {
			url: 'https://ut.xiaojukeji.com/ut/welfare/api/action/event/report',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
                    log('【从福利中心浏览滴滴果园】任务成功')
				} else {
					log(`任务失败，原因是：${data}`)
					msg += '\n任务失败'
				}
			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

function dozb(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240000",
                "prod_key": "ut-poi-evaluation",
                "xpsid": "8b29c3e9b700429998fe26e672299ec9",
                "dchn": "djB58ok",
                "xoid": "gCTBp+hrSmitnuv3eGQUhg",
                "uid": 1,
                "xenv": "passenger",
                "xspm_from": "didi-orchard.none.c10030.none",
                "xpsid_root": "39d678d291b54ebf96a3e625c6177a91",
                "xpsid_from": "39d678d291b54ebf96a3e625c6177a91",
                "xpsid_share": "",
				"xpos_from": "%7B%22id%22%3A205%2C%22pk%22%3A%22didi-orchard%22%2C%22idx%22%3A%22none%22%7D",
	            "web_type": 1,
	            "token": `${token}`,
	            "ticket": `${token}`,
	            "city_id": 11,
	            "lon": 111,
	            "lat": 11,
				"env": {
		            "newTicket": `${token}`,
		            "newAppid": "10000",
		            "openId": "",
		            "latitude": "11",
		            "longitude": "111",
		            "cityId": "11",
		            "isHitButton": true,
		            "isOpenWeb": false,
		            "ddfp": "f44f15a79a26400afa9f49e44987c310",
		            "deviceId": "f44f15a79a26400afa9f49e44987c310",
		            "appVersion": "6.2.4",
		            "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
		            "fromChannel": "1"
	            },
	            "biz": 3
            }
		let url = {
			url: 'https://gaea.xiaojukeji.com/poi/health/preview/page',
			headers: {
                "Accept-Encoding": "gzip, deflate, br",
                "Host": "gaea.xiaojukeji.com",
                "Content-Length": 1620,
                "Referer": "https://page.udache.com/",
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive"
            },
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'ok') {
                    log('【浏览周边好去处】任务浏览成功')
				} else {
					log(`任务失败，原因是：${data}`)
					msg += '\n任务失败'
				}
			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 查询水果是否成熟
 */
function checkFruits(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240301",
                "prod_key": "didi-orchard",
                "xpsid": "",
                "dchn": "O9aM923",
                "xoid": "",
                "uid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
                "platform": 1,
				"token": `${token}`
            }
		let url = {
			url: 'https://game.xiaojukeji.com/api/game/plant/myFruits',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.data['my_fruits'] == null) {
					log('水果还没成熟')
				} else {
					log(`浇水失败，原因是：${data}`)
					msg += `\n浇水失败`
				}

			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 浇水
 */
function water(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240301",
                "prod_key": "didi-orchard",
                "xpsid": "",
                "dchn": "O9aM923",
                "xoid": "",
                "uid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
				"is_fast": false,
				"water_status": 0,
                "platform": 1,
				"token": `${token}`
            }
		let url = {
			url: 'https://game.xiaojukeji.com/api/game/plant/watering',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
					let w=100 - parseInt(result.data['tree_progress'])
					nowater=result.data['pack_water']
					if(result.data['pack_fer'] > 0){
						log('有肥料可用，自动使用')
						await yjsf();
						await $.wait(2 * 1000);
					}
					log(`浇水成功，水滴剩余${nowater}g，差${result.data['next_box_progress']}开宝箱，再浇水${w}%就升级到下一级`)
				} else if (result.errmsg == '水滴不足') {
					log('浇水失败，水滴不足')
					msg += `\n浇水失败，水滴不足`
				} else {
					log(`浇水失败，原因是：${data}`)
					msg += `\n浇水失败`
				}

			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 一键施肥
 */
function yjsf(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240301",
                "prod_key": "didi-orchard",
                "xpsid": "",
                "dchn": "O9aM923",
                "xoid": "",
                "uid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
				"count": 1,
	            "quick": true,
	            "platform": 1,
				"token": `${token}`
            }
		let url = {
			url: 'https://game.xiaojukeji.com/api/game/plant/fertilizer',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
					log(`施肥成功，目前肥力：${result.data['tree_nutrient']}，剩余饲料${result.data['pack_fer']}袋可用`)
				} else {
					log(`施肥失败，原因是：${data}`)
				}

			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 收集水滴
 */
function collectwater(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240301",
                "prod_key": "didi-orchard",
                "xpsid": "",
                "dchn": "O9aM923",
                "xoid": "",
                "uid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
	            "platform": 1,
				"token": `${token}`
            }
		let url = {
			url: 'https://game.xiaojukeji.com/api/game/plant/recBucketWater',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
					log(`水滴收集成功，获得：${result.data['rec_water']}g`)
				} else {
					log(`水滴收集失败，原因是：${data}`)
				}

			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 查水
 */
function checkwater(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240301",
                "prod_key": "didi-orchard",
                "xpsid": "",
                "dchn": "O9aM923",
                "xoid": "",
                "uid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
				"assist_type": 0,
				"encode_uid": "",
				"is_old_player": true,
                "platform": 1,
				"token": `${token}`
            }
		let url = {
			url: 'https://game.xiaojukeji.com/api/game/plant/enter',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
					let w=100 - parseInt(result.data['tree_info']['tree_progress'])
					sl=result.data['tree_info']['pack_water']
					box = result.data['tree_info']['available_box']
					fl = result.data['tree_info']['tree_nutrient']
					if(box){
						await recCommonBox();
					}
					log(`水滴剩余${sl}g，肥料：${fl}，差${result.data['tree_info']['next_box_progress']}开宝箱，再浇水${w}%就升级到下一级`)
				} else {
					log(`数据获取失败，原因是：${data}`)
					msg += `\n数据获取失败，原因是：${data}`
				}
			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 查水2
 */
function info(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240301",
                "prod_key": "didi-orchard",
                "xpsid": "",
                "dchn": "O9aM923",
                "xoid": "",
                "uid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
				"assist_type": 0,
				"encode_uid": "",
				"is_old_player": true,
                "platform": 1,
				"token": `${token}`
            }
		let url = {
			url: 'https://game.xiaojukeji.com/api/game/plant/enter',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
					let w=100 - parseInt(result.data['tree_info']['tree_progress'])
					log(`果树水滴剩余${result.data['tree_info']['pack_water']}g，肥料：${result.data['tree_info']['tree_nutrient']}，差${result.data['tree_info']['next_box_progress']}开宝箱，再浇水${w}%就升级到下一级`);
					msg += `\n果树水滴剩余${result.data['tree_info']['pack_water']}g，肥料：${result.data['tree_info']['tree_nutrient']}，差${result.data['tree_info']['next_box_progress']}开宝箱，再浇水${w}%就升级到下一级`
				} else {
					log(`数据获取失败，原因是：${data}`)
					msg += `\n数据获取失败，原因是：${data}`
				}

			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

/**
 * 开宝箱
 */
function recCommonBox(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		var postbody = { 
                "xbiz": "240301",
                "prod_key": "didi-orchard",
                "xpsid": "",
                "dchn": "O9aM923",
                "xoid": "",
                "uid": "",
                "xenv": "passenger",
                "xspm_from": "",
                "xpsid_root": "",
                "xpsid_from": "",
                "xpsid_share": "",
                "platform": 1,
				"token": `${token}`
            }
		let url = {
			url: 'https://game.xiaojukeji.com/api/game/plant/recCommonBox',
			headers: header,
			body: JSON.stringify(postbody),
		}
		$.post(url, async (error, response, data) => {
			try {
				let result = JSON.parse(data);
				if (result.errmsg == 'success') {
					log(`宝箱领取成功，获得${result.data.rewards[0].num}点${result.data.rewards[0].name}`)
				}else if(result.errmsg == '对应奖励已领取'){
					log('暂时没有宝箱可以领取')
				} else {
					log(`宝箱领取失败，原因是：${data}`)
				}
			} catch (e) {
				log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}

// ============================================变量检查============================================ \\
async function Envs() {
	if (ddgy) {
		if (ddgy.indexOf("@") != -1) {
			ddgy.split("@").forEach((item) => {
				ddgyArr.push(item);
			});
		} else if (ddgy.indexOf("\n") != -1) {
			ddgy.split("\n").forEach((item) => {
				ddgyArr.push(item);
			});
		} else {
			ddgyArr.push(ddgy);
		}
	} else {
		log(`\n 【${$.name}】：未填写变量 ddgy`)
		return;
	}

	return true;
}

// ============================================发送消息============================================ \\
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
 * 修改配置文件
 */
function modify() {

	fs.readFile('/ql/data/config/config.sh','utf8',function(err,dataStr){
		if(err){
			return log('读取文件失败！'+err)
		}
		else {
			var result = dataStr.replace(/regular/g,string);
			fs.writeFile('/ql/data/config/config.sh', result, 'utf8', function (err) {
				if (err) {return log(err);}
			});
		}
	})
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
