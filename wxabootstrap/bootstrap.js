const fs = require('fs');
const http = require('http');
const vm = require('vm');

const JSDOM = require('./jsdom/api.js');

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
// then how to load this page via browser?
// create a server? maybe yes.

var bootstrap_gui = '\
	<html>\
		<head>\
			<meta http-equiv="refresh" content="5" />\
		</head>\
		<body>\
			<h> Waiting for refresh </h>\
		</body>\
	</html>\
';



function mkContext(){
	return Object.assign(new JSDOM('<html></html>'),{
		wxhack_files: {},
		define: function(name, func){
			this.wxhack_files[name] = func;
		},
		require: function(name){
			return wxhack_files[name];
		}
	});
}
var app_service = vm.createContext(mkContext());
new vm.Script(fs.readFileSync('./app-service.js')).runInContext(app_service);
console.log('Defined files in service: ', app_service.wxhack_files);

var app_wxss = vm.createContext(mkContext());
new vm.Script(fs.readFileSync('./app-wxss.js')).runInContext(app_wxss);


var GUI = http.createServer(function(req, res){
	res.write(bootstrap_gui);
	res.end();
}).listen(1191, function(){
	console.log('Listening on localhost:1191 as http.');
})

