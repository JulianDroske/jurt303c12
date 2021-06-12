var LOGMSG = document.getElementById('log');
function log(msg){
	LOGMSG.innerHTML += msg.replace('\n','<br />')+'<br/>';
}

function download(url,name){
	/* var link = document.createElement('a');
	link.setAttribute('download',name?name:'');
	link.href = url;
	link.click();*/
	log('Name: '+name+'\nUrl: '+url);
	// link.parentNode.removeChild(link);
}

window.onload = function(){
	document.getElementById('dlpixlroverlay').onclick = function(){
		var req = new XMLHttpRequest();
		req.open('GET','http://pixlr.com/data');
		req.setRequestHeader('Content-Type','application/json');
		req.send(null);
		req.onload = function(){
			if(req.status == 200){
				log('Successfully got JSON');
				var json = JSON.parse(req.responseText);
				for(var i in json.packs){
					var pack = json.packs[i];
					var aid = pack.aid;
					if(aid.toString().split('.')[1]=='general' && aid.toString().split('.')[2]=='overlay'){
						for(var j in pack.content){
							download('http://pixlr.com/data/'+aid.split('.')[2]+'/'+aid.split('.')[3]+'/'+pack.content[j]);
						}
						log('Package Downloaded: '+pack.aid);
					}else log('Premium Pack Detected: '+pack.aid);
				}
			}
		}
	}
}
