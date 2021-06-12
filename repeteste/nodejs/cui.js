var core = require('./core');
var readline = require('readline');

var rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});

function fansloop(fpath){
	core.fansloop(fpath, function(is, type, body, ans, anses){
		if(type.match('s')){
			console.log('\nThis is a selection.');
			for(var i in anses){
				console.log(''+i+': '+anses[i]);
			}
		}
		rl.question(body, function(input){
			if(anses[input] != ans) console.log('Wrong.\nRight ans = '+ans);
			else console.log('Right answer.');
			fansloop(fpath);
		});
		return 0;
	});
}

// file: default is ./core.json
fansloop('./core.json');
