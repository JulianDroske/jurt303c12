var DLEDF = [];
var enable = false;

/*chrome.runtime.onMessage.addListener(function(req,sender,res){
	if(req.cmd == 'script'){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.tabs.executeScript(tabs.length?tabs[0].id:null, {code: req.content});
		});
	}
});*/

var JSS = {
	/* download: "function download(url,name){\
		var link = document.createElement('a');\
		link.setAttribute('download',name?name:'');\
		link.href = url;\
		link.click();\
		document.removeChild(link);\
	}"*/
	download: "function download(url, name){\
			var xhr = new XMLHttpRequest();\
			xhr.open('GET', 'http://localhost:6122/DoWnLoAd', false);\
			xhr.setRequestHeader('dl', JSON.stringify({url: url, name: name}));\
			xhr.send(null);\
	}"
}

function runjs(content){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.executeScript(tabs.length?tabs[0].id:null, {code: content});
	});
}

function injs(content){
	runjs("var tmp = document.createElement('script');\
		tmp.setAttribute('type','text/javascript');\
		tmp.innerHTML = \""+content.toString().replace(new RegExp('"','g'),'\\\"')+"\";\
		tmp.onload = function(){\
			/* this.parentNode.removeChild(this); */\
		};\
		document.head.appendChild(tmp);");
}

function DLED(file){
	for(i=0;i<DLEDF.length;++i){
		if(file == DLEDF[i]) return true;
	}
	DLEDF.push(file);
	return false;
}

function FET(str,type){
	if(typeof type == "string") return str.substr(str.length-type.length,type.length) == type;
	for(i=0;i<type.length;++i){
		var TYPE = type[i];
		if(str.substr(str.length-TYPE.length,TYPE.length) == TYPE) return true;
	}return false;
}

function GFILE(url){
	var Purl = url.split("?",1)[0];
	var Purl2 = url.split("#",1)[0];
	if(Purl2.length!=0 && (Purl2.length < Purl.length)) Purl = Purl2;
	return Purl.substring(Purl.lastIndexOf("/")+1);
}

function MQIN(dt){
	if(!enable) return {cancel: false};
	var URL = dt.url;
	var FILE = GFILE(URL);
	if(FET(FILE,[".mp3",".m4a"])){
		if(!DLED(FILE)){
			// console.log("Downloading "+FILE);
			// window.open(URL);
			runjs(JSS.download + 'download("'+URL+'");');
		}
	}
	return {cancel: false};
}

function MQIN2(dt){
	var FILEN = dt.responseHeaders[5].value;	// x-nos-object-name
	if(FET(FILEN,".m4a") || FET(FILEN,".mp3")){
		// NeteaseMusic
		window.open
	}
}

chrome.webRequest.onBeforeRequest.addListener(
	MQIN,
	{urls: ["<all_urls>"]},
	["blocking"]
);

function startCatching(){
	enable = true;
}

function clear(){
	DLEDF = [];
}

function stopCatching(){
	enable = false;
}

/* chrome.browserAction.onClicked.addListener(function(tab){
	window.open(chrome.extension.getURL('jurt.html'));
});*/
