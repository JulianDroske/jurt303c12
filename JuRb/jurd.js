const http = require('http');
const fs = require('fs');
const url = require('url');
// require('./JuRt');

function GFILE(url){
	var Purl = url.split("?",1)[0];
	var Purl2 = url.split("#",1)[0];
	if(Purl2.length!=0 && (Purl2.length < Purl.length)) Purl = Purl2;
	return Purl.substring(Purl.lastIndexOf("/")+1);
}

var server = http.createServer(function(req, res){
	if(req.method == 'GET' && req.url == '/DoWnLoAd'){
		var op = JSON.parse(req.headers.dl);
		if(op.name == null) op.name = GFILE(op.url);
		var uri = url.parse(op.url);
		// console.log('debug=', op);
		if(! (process.argv[2] == 'append' && fs.existsSync(op.name)) ){
			console.log('Downloading '+url);
			try{
				var protocol = uri.protocol? uri.protocol.substring(0, uri.protocol.length-1) : 'http';
				var PRO = require(protocol);
				// var pro = PRO.request({method: 'GET', path: uri.path, host: uri.host, port: uri.port}, function(r){
				PRO.get(op.url, function(r){
					var bd = '';
					r.on('data', function(part){
						bd += part.toString('binary');
					});
					r.on('end', function(){
						fs.writeFileSync(op.name, bd, {encoding: 'binary'});
						console.log('File Downloaded: '+op.name);
					});
				});
			}catch(e){
				console.log(e);
			}
		}else{
			console.log('Skipping '+ op.name);
		}
		
		res.writeHead(200, {'Content-Type': 'text'});
		res.write('Done.');
		res.end();
	}else{
		res.writeHead(404);
		res.end();
	}
}).listen(6122, function(){
	console.log('JuRt Server Created.');
});
