var core = require('./core');
/* var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})*/

// ask for ques and ans
// also capture keys, Ctrl+C to exit

// global, for saving and exit
var sobj={
	info: {
		name: 'internal tester',
		author: 'JulianDroid',
		version: '1.0',
		verdate: '28/2/2020',
		count: '1'
	},
	qus: [
		
	],
	ans: [
		
	]
};

/* process.stdin.setRawMode(true);
process.stdin.resume();*/

function mkqus(type, txt){
	return {
		body: txt,
		type: type
	}
}
function mkans(txt){
	return txt;
}

var fs = require('fs');
var file = fs.readFileSync('config.inf');
var sf = file.toString().split('\n');
	
// start to loop
// readline sync... copy from jurtirc is enough.
// now is only to read file as input
function readline(){
	return sf.shift();
}

while(true){
	var qus = readline();
	var ans = readline();
	if(qus == null || ans == null){
		core.fsavedb('./core.json', sobj);
		break;
	}
	sobj.qus.push(mkqus('s',qus));
	sobj.ans.push(mkans(ans));
}

console.log('Program done.');
