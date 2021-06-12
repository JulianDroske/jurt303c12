const fs = require('fs');
const http = require('http');
const path = require('path');

if(process.argv.length != 3){
	console.log('Usage: node bootstrap.js <packDir>');
	exit(-1);
}

process.chdir(process.argv[2]);

console.log('Parsing config...');
// load config file
var config = JSON.parse(fs.readFileSync('./app-config.json'));

// load initial entry page
var entryPage = config.entryPagePath;

console.log('Entrance at '+entryPage);

// now build the whole project as singleton js file for html
var bootpackjs = '';	// internal script
bootpackjs += fs.readFileSync(__dirname + '/preload.js');

function packfile(file){
	try{
		bootpackjs += 'wxhack_files[\'' + file + '\'] = "' + encodeURIComponent(fs.readFileSync(file)) + '";\n';
	}catch(e){}
}

function runfile(file){
	bootpackjs += 'loadJs(\'' + file + '\');\n';
}

function packrunfile(file){
	packfile(file);
	runfile(file);
}

// add all htmls to resource
var pgS = config.page;
for(var k in pgS){
	packfile(k);
}

packrunfile('app-wxss.js');
packrunfile('app-service.js');

bootpackjs += 'WAIMQIN(\'' + entryPage + '\');';

// then how to load this page via browser?
// create a server? maybe yes.

function sendHTML(res,path,head){
	fs.exists(path,function(e){
		if(!e || !fs.statSync(path).isFile()) path = __dirname + '/error.html';
		res.writeHead(200,head?head:{'Content-Type':'text/html; charset=UTF-8'});
		var dat = fs.readFileSync(path,'utf-8');
		res.write(dat);
		res.end();
	});
}

var GUI = http.createServer(function(req, res){
	if(req.url == '/wxapkg.js'){
		res.writeHead(200, {'Content-Type':'text/javascript; charset=UTF-8'});
		res.write(bootpackjs);
		res.end();
	}else if(req.url == '/'){
		sendHTML(res, __dirname + '/wxa.html');
	}else{
		sendHTML(res, process.cwd()+req.url);
	}
}).listen(1191, function(){
	console.log('Listening on localhost:1191 as http.');
})

