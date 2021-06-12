var LOC = window.location.href;
var PATH = window.location.pathname;

function GFILE(url){
	var Purl = url.split("?",1)[0];
	var Purl2 = url.split("#",1)[0];
	if(Purl2.length!=0 && (Purl2.length < Purl.length)) Purl = Purl2;
	return Purl.substring(Purl.lastIndexOf("/")+1);
}

var doComplete = function(){
	var n = document.getElementsByTagName("dl").length;
	for(var i=0;i<n;++i){
		var radios = document.getElementsByName("radio"+i+"_"+i);
		var tn = radios.length;
		for(var j=0;j<tn;++j){
			if(radios[j].value == 1){
				radios[j].click();
			}
		}
	}
	document.getElementsByClassName("btn_submit")[0].click();
	setTimeout(function(){
		window.close();
	},1000);
}

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
			TestPageOpen[i].click();
			setTimeout(function(){
				this.doComplete();
			},1000);
		}
	}
}
