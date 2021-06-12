var LOC;
var PATH;

/* chrome.runtime.onConnect.addListener(function(PORT){
	console.assert(PORT.name == 'jurt');
	PORT.onMessage.addListener(function(msg){
		
	});
});*/

function GFILE(url){
	var Purl = url.split("?",1)[0];
	var Purl2 = url.split("#",1)[0];
	if(Purl2.length!=0 && (Purl2.length < Purl.length)) Purl = Purl2;
	return Purl.substring(Purl.lastIndexOf("/")+1);
}

function injs(cont){
	/* ar tmp = document.createElement('script');
	tmp.setAttribute('type','text/javascript');
	tmp.innerHTML = content;
	tmp.onload = function(){
		this.parentNode.removeChild(this);
	};
	document.head.appendChild(tmp);*/
	chrome.runtime.sendMessage({cmd: 'script', content: cont});
}

function injectJS(path){
	var scr = document.createElement('script');
	scr.setAttribute('type','text/javascript');
	scr.src = chrome.extension.getURL(path);
	document.head.appendChild(scr);
}

/* var szXueanquan = {
	doComplete: function(){
		var n = document.getElementsByTagName("dl").length;
		for(var i=0;i<n;++i){
			var radios = document.getElementsByName("radio"+i+"_"+i);
			var tn = radios.length;
			for(var j=0;j<tn;++i){
				if(radios[j].value == 1){
					radios[j].click();
				}
			}
		}
		document.getElementsByClassName("btn_submit")[0].click();
		setTimeout(function(){
			window.close();
		},1000);
	},


	init: function(){
		if(PATH == '/MainPage.html'){
			window.open('http://suzhou.xueanquan.com/JiaTing/JtMyHomeWork.html');
		}else if(PATH == '/JiaTing/JtMyHomeWork.html'){
			var unDones = document.getElementsByClassName('wcnodiv');
			for(var i=0;i<unDones.length;++i){
				unDones[i].parentNode.parentNode.cells[6].children[0].click();
			}
		}else if(GFILE(PATH) == 'SeeVideo.aspx'){
			var TestPageOpen = document.getElementsByTagName('a');
			for(var i=0;i<TestPageOpen.length;++i){
				if(TestPageOpen[i].href == 'javascript:ShowTestPaper();'){
					TestPageOpen.click();
					setTimeout(function(){
						this.doComplete();
					},1000);
				}
			}
		}
	}
}*/

var Bilibili = {
	init: function(msg){
		var input = document.getElementsByClassName('bilibili-player-video-danmaku-input')[0];
		var send = document.getElementsByClassName('bilibili-player-video-btn-send bui bui-button bui-button-blue')[0];
		if((!input) || (!send)) return;
		var i=0;
		var inter = setInterval(function(){
			input.value = msg;
			send.click();
			++i;
			if(i==10) clearInterval(inter);
		},1000);
	}
}

var TencentKe = {
	init: function(){
		injs("var marquee = document.getElementById('marquee');console.log(marquee)\
		if(marquee){\
			marquee.parentNode.removeChild(marquee);\
		}");
	}
}

LOC = window.location.href;
PATH = window.location.pathname;
const loc = window.location.host;

function MQIN(){
	if(loc=="suzhou.xueanquan.com"){
		// szXueanquan.init();
		if(GFILE(PATH) == 'SeeVideo.aspx'){
			setTimeout(function(){
				injectJS('Contents/suzhouXueanquan.js');
			},1000);
		}
	}else if(loc == "www.bilibili.com"){
		// Bilibili.init();
	}else{
		// console.log("JuRt: Site is not recognized.");
	}
}

MQIN();


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
	if(msg.cmd == 'inject'){
		/* var scr = document.createElement('script');
		scr.setAttribute('type','text/javascript');
		scr.src = chrome.extension.getURL(msg.content);
		document.head.appendChild(scr);*/
		injectJS(msg.content);
	}else if(msg.cmd == 'szXueanquan'){
		// szXueanquan.init();
	}else if(msg.cmd == 'Bbot'){
		Bilibili.init(msg.content);
	}else if(msg.cmd == 'rmMarq'){
		TencentKe.init();
	}
});
