
/*

请把下面let nlbl='改成你自己的'


*/
const $ = new Env('节日倒计时');
let nlbl='19560912'
var request = require('request');
const notifyFlag = 1; //0为关闭通知，1为打开通知,默认为1
const logDebug = 0
const notify = $.isNode() ? require('./sendNotify') : '';
let notifyStr = ''

///////////////////////////////////////////////////////////////////

!(async () => {

   
  await RunMultiUser()

})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


//通知
async function showmsg() {

  notifyStr =  nianlingxx+nlcx+ddzxx+'\n'+ydxx+'\n'+cjxx+'\n'+yxxx+'\n'+qmxx+'\n'+wyxx+'\n'+mqxx+'\n'+lyxx+'\n'+fqxx+'\n'+zqxx+'\n'+gqxx+'\n'+dzxx
  
    notifyBody = $.name + "运行通知\n\n" + notifyStr

    if (notifyFlag != 1) {
        console.log(notifyBody);
    }

    if (notifyFlag == 1) {
        $.msg(notifyBody);
        if ($.isNode()){await notify.sendNotify($.name, notifyBody );}
    }
}


async function RunMultiUser() {
    
        
        console.log('===============准备开始===================');
        await cs()
        await $.wait (3000)
        await nl()
        await $.wait (3000)
        await ddz()
        await yd()

        
        
        await cx()
        
        await yx()
        
        await qm()
        
        await wy()
        
        
        await mq()
        
        await ly()
        
        await fq()
        
        await zq()
        
        await gq()
        
        await dz()
        
        await showmsg()
        

    

   
    
        
    

}

async function yd() {

 
  var nowtime = new Date(),  //获取当前时间
      endtime = new Date("2023-01-01 00:00:00");  //定义结束时间
  var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
      tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
      xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
      fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
      miao = Math.floor(lefttime/1000%60);  //计算秒数
  xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
  fen = fen<10?'0'+fen:fen;
  miao = miao<10?'0'+miao:miao;
  
  
  console.log('距离2023年元旦       还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'+'\n');
  ydxx = '距离2023年元旦          还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
  //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
  
};

async function cs() {

 
    var request = require('request');

var headers = {
    'authority': 'shijisuishu.bmcx.com',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-user': '?1',
    'sec-fetch-dest': 'document',
    'referer': 'https://shijisuishu.bmcx.com/'+nlbl+'__shijisuishu/',
    'accept-language': 'zh-CN,zh;q=0.9,fr;q=0.8,ko;q=0.7',
    'cookie': 'c_y_g_j=shijisuishu; __bid_n=1849d79cc75d016eb94207; __gads=ID=544988f8787606fd-228a92fd9ed80062:T=1669089317:RT=1669089317:S=ALNI_MaTL0hKrye4BMJX7yeJMiM5-CI_zw; __gpi=UID=00000b80f05ee6f2:T=1669089317:RT=1669089317:S=ALNI_MY7yaHtBerm8zsw74i4Xpfl9zhyRA; FPTOKEN=30$y008qTQa6Zc+epNkuet33upzmJZl9wx5VY4FIsMRn58awDN48TycT8YXkI3FsDQGEn9eKz0D/EwQdI9xOM2T/fD5mKBmgDT3r5z0MZ4zj1SoQ9mqNq3LXG/36sb4N5hRgLrv7XzJcaH8CzybkriG9J05trHyh0Q9xE7ymendqqkVESBeQXOUbm7669ZAhQzojLvAcgdKUJx7quxKJBgE0RsWInPyU8ezfAriUCaWB/d1CGMhnEWXLuJestd5fZL3ZoloCyGAkUIP02vW6ivUBktl8GJ00nSBKf/aP2ZcY28b7eflx6W6elD3DxTKH8LEbroAhpGVMF6/rux0cFpfJXyt5qdQ27rMZID04bl+oo+nkGwNDZYZqoFKw5NC6gjB|+eZLulT6WiFRy8o1KXF77ySrV0avtmSqwGzx3WVzRX0=|10|f0298f298469d94427e37c7340ff0ebe; Hm_lvt_bd706f26d2267b54fd3543ceaea48e96=1669089325; Hm_lpvt_bd706f26d2267b54fd3543ceaea48e96=1669089325'
};

var options = {
    url: 'https://shijisuishu.bmcx.com/'+nlbl+'__shijisuishu/',
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        nln = body.match(/<tr><td bgcolor="#F5F5F5" align="center">.+td/g);
        th = nln.toString().replace("</td><td bgcolor=",'')
        th1 = th.toString().replace('<tr><td bgcolor="#F5F5F5" align="center">','')
        th2 = th1.toString().replace('"#FFFFFF" align="center"><font color="#ff0000"><strong>','：')
        th3 = th2.toString().replace('</strong></font></td><td bgcolor="#FFFFFF"><font color="#999999">','\n')
        th4 = th3.toString().replace('</font></td,<tr><td bgcolor="#F5F5F5" align="center">','\n')
        th5 = th4.toString().replace('</td><td bgcolor="#FFFFFF" align="center"><font color="#ff0000"><strong>',':')
        th6 = th5.toString().replace('</strong></font></td><td bgcolor="#FFFFFF"><font color="#999999">','\n')
        th7 = th6.toString().replace('</font></td,<tr><td bgcolor="#F5F5F5" align="center">','\n')
        th8 = th7.toString().replace('</td><td colspan="2" align="center" bgcolor="#FFFFFF">','：')
        th9 = th8.toString().replace('</td,<tr><td bgcolor="#F5F5F5" align="center">','\n')
        th10 = th9.toString().replace('</td><td colspan="2" align="center" bgcolor="#FFFFFF">','：')
        th11 = th10.toString().replace('</td,<tr><td bgcolor="#F5F5F5" align="center">','\n')
        th12 = th11.toString().replace('</td><td colspan="2" align="center" bgcolor="#FFFFFF">','：')
        th13 = th12.toString().replace('</td,<tr><td bgcolor="#F5F5F5" align="center">','\n')
        th14 = th13.toString().replace('</td><td colspan="2" align="center" bgcolor="#FFFFFF">','：')
        th15 = th14.toString().replace('</td,<tr><td bgcolor="#F5F5F5" align="center">','\n')
        th16 = th15.toString().replace('</td><td colspan="2" align="center" bgcolor="#FFFFFF">','：')
        th17 = th16.toString().replace('</td,<tr><td bgcolor="#F5F5F5" align="center">','\n')
        th18 = th17.toString().replace('</td><td colspan="2" align="center" bgcolor="#FFFFFF">','：')
        th19 = th18.toString().replace('</td,<tr><td bgcolor="#F5F5F5" align="center">','\n')
        th20 = th19.toString().replace('</td><td colspan="2" align="center" bgcolor="#FFFFFF">','')
        th21 = th20.toString().replace(/<div.+td/,'')
        th22 = th21.toString().replace(/人生进度/,'')
        th23 = th22.toString().replace(/a href=".*?"/g,'')
        th24 = th23.toString().replace('（< target="_blank">生日密码</a> / < target="_blank">生日书</a>）','')



       

        console.log(th24);
        nianlingxx = th24
    }
}

request(options, callback);
    
  };
async function nl() {

  var request = require('request');

  var headers = {
      'authority': 'rili.ximizi.com',
      'cache-control': 'max-age=0',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'sec-fetch-site': 'cross-site',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-user': '?1',
      'sec-fetch-dest': 'document',
      'accept-language': 'zh-CN,zh;q=0.9,fr;q=0.8,ko;q=0.7',
      'cookie': 'Hm_lvt_6a6b7a18fc9e4048d179520fdc0a5ae5=1669045202; Hm_lpvt_6a6b7a18fc9e4048d179520fdc0a5ae5=1669045202; __gads=ID=d8a5b0237575ad37-2294b4e197d800d3:T=1669045202:RT=1669045202:S=ALNI_Mbk9rYwoPVggxnjk0DbPQRkhDzJvA; __gpi=UID=00000b804c2456bf:T=1669045202:RT=1669045202:S=ALNI_MZelNSnZ8hN8YgCHRHQRaciE01B_g'
  };
  
  var options = {
      url: 'https://rili.ximizi.com/nonglichaxun.php?ivk_sa=1024320u',
      headers: headers
  };
  
  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        qc = body.replace(/\r\n/g, '')
        nln = qc.match(/<div class="hc3_text"><p><span>.+黄历日期/g);
        th = nln.toString().replace('<div class="hc3_text"><p><span>','')
        th1 = th.toString().replace('</span>','')
        th2 = th1.toString().replace('<strong>','')
        th3 = th2.toString().replace('</strong>','')
        th4 = th3.toString().replace('</p><p><span>','\n')
        th5 = th4.toString().replace('</p><p><span>','\n')
        th6 = th5.toString().replace('</p><p><span>','\n')
        th7 = th6.toString().replace('</p><p><span>','\n')
        th8 = th7.toString().replace('</p><p><span>','\n')
        th9 = th8.toString().replace('</p><p><span>','\n')
        th10 = th9.toString().replace('</p><p><span>','\n')
        th11 = th10.toString().replace('</p><p><span>','\n')
        th12 = th11.toString().replace('</p><p><span>','\n')
        th13 = th12.toString().replace('</p><p><span>','\n')
        th14 = th13.toString().replace('</p><p><span>','\n')
        th15 = th14.toString().replace('</p><p><span class="yj2y">','\n')
        th16 = th15.toString().replace('</p><p><span class="yj2j">','\n')
        th17 = th16.toString().replace('</span>','')
        th18 = th17.toString().replace('</span>','')
        th19 = th18.toString().replace('</span>','')
        th20 = th19.toString().replace('</span>','')
        th21 = th20.toString().replace('</span>','')
        th22 = th21.toString().replace('</span>','')
        th23 = th22.toString().replace('</span>','')
        th24 = th23.toString().replace('</span>','')
        th25 = th24.toString().replace('</span>','')
        th26 = th25.toString().replace('</span>','')
        th27 = th26.toString().replace('</span>','')
        th28 = th27.toString().replace('</span>','')
        th29 = th28.toString().replace('</span>','')
        th30 = th29.toString().replace('</p><p><span>黄历日期','')
        var nowtime = new Date();
        
        s = nowtime.getHours();
        f =nowtime.getMinutes();
        m = nowtime.getSeconds();
        console.log('北京时间：',s+'点'+f+'分'+m+'秒');
        console.log(th30,'\n');
        
        th31 = th5.toString().replace(/回.+黄历日期/,'')
        th32 = th31.toString().replace('</span>','')
        nlcx = '北京时间：'+s+'点'+f+'分'+m+'秒'+'\n'+th32
        
      }
  }
  
  request(options, callback);
};


async function ddz() {

 
    var nowtime = new Date(),  //获取当前时间
        endtime = new Date("2022-12-22 00:00:00");  //定义结束时间
    var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
        tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
        xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
        fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
        miao = Math.floor(lefttime/1000%60);  //计算秒数
    xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
    fen = fen<10?'0'+fen:fen;
    miao = miao<10?'0'+miao:miao;
    console.log('距离2022年冬至       还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒');
    ddzxx = '距离2022年冬至          还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
    //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
    
};

async function cx() {

 
    var nowtime = new Date(),  //获取当前时间
        endtime = new Date("2023-01-21 00:00:00");  //定义结束时间
    var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
        tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
        xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
        fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
        miao = Math.floor(lefttime/1000%60);  //计算秒数
    xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
    fen = fen<10?'0'+fen:fen;
    miao = miao<10?'0'+miao:miao;
    console.log('距离2023年春节       还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒');
    cjxx = '距离2023年春节          还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
    //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
    
};

async function yx() {

 
  var nowtime = new Date(),  //获取当前时间
      endtime = new Date("2023-02-05 00:00:00");  //定义结束时间
  var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
      tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
      xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
      fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
      miao = Math.floor(lefttime/1000%60);  //计算秒数
  xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
  fen = fen<10?'0'+fen:fen;
  miao = miao<10?'0'+miao:miao;
  console.log('距离2023年元宵节     还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒');
  yxxx = '距离2023年元宵节        还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
  //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
  
};

async function qm() {

 
  var nowtime = new Date(),  //获取当前时间
      endtime = new Date("2023-04-05 00:00:00");  //定义结束时间
  var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
      tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
      xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
      fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
      miao = Math.floor(lefttime/1000%60);  //计算秒数
  xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
  fen = fen<10?'0'+fen:fen;
  miao = miao<10?'0'+miao:miao;
  console.log('距离2023年清明节     还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒');
  qmxx = '距离2023年清明节        还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
  //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
  
};

async function wy() {

 
  var nowtime = new Date(),  //获取当前时间
      endtime = new Date("2023-05-01 00:00:00");  //定义结束时间
  var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
      tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
      xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
      fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
      miao = Math.floor(lefttime/1000%60);  //计算秒数
  xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
  fen = fen<10?'0'+fen:fen;
  miao = miao<10?'0'+miao:miao;
  console.log('距离2023年劳动节     还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒');
  wyxx ='距离2023年劳动节        还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
  //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
  
};

async function mq() {

 
  var nowtime = new Date(),  //获取当前时间
      endtime = new Date("2023-05-14 00:00:00");  //定义结束时间
  var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
      tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
      xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
      fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
      miao = Math.floor(lefttime/1000%60);  //计算秒数
  xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
  fen = fen<10?'0'+fen:fen;
  miao = miao<10?'0'+miao:miao;
  console.log('距离2023年母亲节     还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒');
  mqxx = '距离2023年母亲节        还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
  //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
  
};
async function fq() {

 
  var nowtime = new Date(),  //获取当前时间
      endtime = new Date("2023-06-18 00:00:00");  //定义结束时间
  var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
      tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
      xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
      fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
      miao = Math.floor(lefttime/1000%60);  //计算秒数
  xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
  fen = fen<10?'0'+fen:fen;
  miao = miao<10?'0'+miao:miao;
  console.log('距离2023年父亲节     还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒');
  fqxx = '距离2023年父亲节        还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
  //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
  
};

async function ly() {

 
  var nowtime = new Date(),  //获取当前时间
      endtime = new Date("2023-06-01 00:00:00");  //定义结束时间
  var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
      tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
      xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
      fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
      miao = Math.floor(lefttime/1000%60);  //计算秒数
  xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
  fen = fen<10?'0'+fen:fen;
  miao = miao<10?'0'+miao:miao;
  console.log('距离2023年儿童节     还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒');
  lyxx = '距离2023年儿童节        还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
  //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
  
};

async function zq() {

 
  var nowtime = new Date(),  //获取当前时间
      endtime = new Date("2023-09-29 00:00:00");  //定义结束时间
  var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
      tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
      xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
      fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
      miao = Math.floor(lefttime/1000%60);  //计算秒数
  xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
  fen = fen<10?'0'+fen:fen;
  miao = miao<10?'0'+miao:miao;
  console.log('距离2023年中秋节     还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒');
  zqxx = '距离2023年中秋节        还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
  //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
  
};

async function gq() {

 
  var nowtime = new Date(),  //获取当前时间
      endtime = new Date("2023-10-01 00:00:00");  //定义结束时间
  var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
      tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
      xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
      fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
      miao = Math.floor(lefttime/1000%60);  //计算秒数
  xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
  fen = fen<10?'0'+fen:fen;
  miao = miao<10?'0'+miao:miao;
  console.log('距离2023年国庆节     还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒');
  gqxx = '距离2023年国庆节        还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
  //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
  
};

async function dz() {

 
  var nowtime = new Date(),  //获取当前时间
      endtime = new Date("2023-12-22 00:00:00");  //定义结束时间
  var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
      tian = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
      xiaoshi = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
      fen = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
      miao = Math.floor(lefttime/1000%60);  //计算秒数
  xiaoshi = xiaoshi<10?'0'+xiaoshi:xiaoshi;
  fen = fen<10?'0'+fen:fen;
  miao = miao<10?'0'+miao:miao;
  console.log('距离2023年冬至       还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒');
  dzxx = '距离2023年冬至          还有'+tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒'
  //return tian + "天" + xiaoshi + "小时" + fen + "分" + miao+'秒';  
  
};
function safeGet(data,caller) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        } else {
            console.log(`Function ${caller}: 未知错误`);
            console.log(data)
        }
    } catch (e) {
        console.log(e);
        console.log(`Function ${caller}: 服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function printCaller(){
    return (new Error()).stack.split("\n")[2].trim().split(" ")[1]
}

function getMin(a,b){
    return ((a<b) ? a : b)
}

function getMax(a,b){
    return ((a<b) ? b : a)
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }