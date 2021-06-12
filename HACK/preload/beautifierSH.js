var beaut = require('./beautifier');
var fs = require('fs');

if(process.argv.length != 4){
	console.log('Invalid argments.');
	console.log('Usage: beautifierSH <format=js|css|xml|json> <file>');
	console.log('Output will be beaut_\$file');
	return;
}

var fmt = process.argv[2].trim().toLowerCase();
var file = process.argv[3];

if(fmt == 'xml'){fmt = 'html';}
var dat = fs.readFileSync(file).toString();
if(fmt == 'json'){
	dat = JSON.stringify(JSON.parse(dat), null, '\t');
}else{
	try{
		eval('dat = beaut.'+fmt+'(dat,  {});');
	}catch(e){
		console.log('Error caught: '+e);
		return;
	}
}

fs.writeFileSync('beaut_'+file, dat);
