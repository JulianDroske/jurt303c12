var bg = chrome.extension.getBackgroundPage();



function sendToContent(msg){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, msg, function(response){
			
		});
	});
}

function runjs(content){
	bg.runjs(content);
}

function injs(content){
	bg.injs(content.toString());
}

window.onload = function(){
	var pr = document.getElementById('Content');
	var childr = pr.childNodes;
	var n = childr.length;
	var maxBottom=0;
	/* for(var i=0;i<n;++i){
		var t=0;
		try{
			if((t=childr[i].getBoundingClientRect().bottom) > maxBottom){
				maxBottom = t;
			}
		}catch(e){}
	}*/
	// document.body.style.height = document.getElementsByTagName('html')[0].style.height = maxBottom;
	document.body.style.height = document.getElementsByTagName('html')[0].style.height = pr.style.height = pr.getBoundingClientRect().right;
}

document.getElementById('jurtindex').onclick = function(){
	window.open(chrome.extension.getURL('jurt.html'));
}
document.getElementById('mousetouch').onclick = function(){
	sendToContent({cmd: 'inject', content: 'Contents/mouse2touch.js'});
}
document.getElementById('inject').onclick = function(){
	sendToContent({cmd: 'inject', content: 'tools.js'});
}
document.getElementById('szSafetreeAuto').onclick = function(){
	// sendToContent({cmd: 'szXueanquan'});
	sendToContent({cmd: 'inject', content: 'Contents/suzhouXueanquan.js'});
}
document.getElementById('bgMusicMon').onclick = function(){
	bg.startCatching();
}
document.getElementById('bgMusicMonE').onclick = function(){
	bg.stopCatching();
}
document.getElementById('bgMusicl').onclick = function(){
	bg.clear();
}
document.getElementById('Bbot').onclick = function(){
	sendToContent({cmd: 'Bbot', content: document.getElementById('BbotCon').value});
}
document.getElementById('rmMarq').onclick = function(){
	// sendToContent({cmd: 'rmMarq'});
	runjs("var marquee = document.getElementById('marquee');\
		if(marquee){\
			marquee.parentNode.removeChild(marquee);\
		}"
	);
}
document.getElementById('autoSign').onclick = function(){
	runjs("setInterval(function(){\
			var buts = document.getElementsByTagName('button');\
			if(!buts) return;\
			var n = buts.length;\
			for(var i=0; i<n; ++i){\
				if(buts[i].innerHTML == 'Ç©µ½' || buts[i].innerHTML == 'È·¶¨'){\
					buts[i].click();\
				}\
			}\
		},5000);"
	);
}
document.getElementById('gBG').onclick = function(){
	// injs(JSS.download);
	runjs(bg.JSS.download + "try{\
			var url = document.getElementById('bgImgProgLoad').attributes.getNamedItem('data-ultra-definition-src').value;\
			var t;\
			url = url.substr(0,(t=url.indexOf('.jpg'))>0?t+4:url.length);\
			var name = null;\
			if((t=url.indexOf('id='))>0){\
				name = url.substr(t+3,url.length);\
			}\
			download(url,name);\
		}catch(e){}");
}

document.getElementById('rmCov').onclick = function(){
	runjs("var cover = document.getElementsByClassName('hide-article-box')[0];\
			var content = document.getElementById('article_content');\
			cover.parentNode.removeChild(cover);\
			content.style.height = 'auto';");
}
