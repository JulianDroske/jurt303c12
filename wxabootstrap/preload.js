// some definations for wxapkg.js

var wxhack_files={};

function define(name, func){
	wxhack_files[name] = func;
}

function require(name){
	return wxhack_files[name];
}

function loadJs(file){
	// eval(decodeURIComponent(wxhack_files[file]));
	var scr = document.createElement('script');
	scr.innerHTML = decodeURIComponent(wxhack_files[file]);
	document.body.appendChild(scr);
}

function MQIN(path){
	/* var FRAME = document.getElementById('MAIN');
	FRAME.src = path;
	var OUTWIND = window;
	var INSWIND = FRAME.contentWindow;
	for(var i in Object.keys(OUTWIND)){
		if(INSWIND[i] == null) INSWIND[i] = OUTWIND[i];
	}*/
	var tmp = document.createElement('div');
	tmp.innerHTML = decodeURIComponent(wxhack_files[path]);
	document.getElementById('MAIN').innerHTML = tmp.innerHTML;
	for(var i in tmp.children){
		var child = tmp.children[i];
		try{
			if(child.localName == 'script'){
				eval(child.innerHTML);
			}
		}catch(e){}
	}
}

function WAIMQIN(path){
	window.onload = function(){
		MQIN(path);
	}
}
