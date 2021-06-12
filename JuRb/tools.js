var JuRt = {
	download: function(url,name){
		/* var link = document.createElement('a');
		link.setAttribute('download',name?name:'');
		link.href = url;
		link.click();*/
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'localhost:6122/DoWnLoAd', false);
		xhr.setRequestHeader('dl', JSON.stringify({url: url, name: name}));
		xhr.send(null);
	}
}
