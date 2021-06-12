var fs = require('fs');

var loadedpath = null;
var loadedb = null;

function random(max){
	return (Math.random()*max) | 0;
}

function readFileSync(fpath){
	return fs.readFileSync(fpath);
}
function writeFileSync(foutpath, fdat){
	return fs.writeFileSync(foutpath, fdat);
}

function optdb(fdat){
	var tmpobj = JSON.parse(fdat);
	return JSON.stringify(tmpobj);
}
function foptdb(fpath){
	return optdb(readFileSync(fpath));
}
function foptdbf(fpath, foutpath){
	foutpath = foutpath || fpath;
	writeFileSync(foutpath, foptdb(fpath));
}

function loadb(fdat){
	return JSON.parse(fdat);
}
function floadb(fpath){
	if(fpath == loadedpath) return loadedb;
	if(loadedpath){}
	loadedpath = fpath;
	return loadedb = loadb(readFileSync(fpath));
}

function fsavedb(foutpath, dat){
	return writeFileSync(foutpath, JSON.stringify(dat));
}

function parsedb(jobj){
	/**
		Library parser
		{
			info: obj{
				name: string
				author: string
				version: string
				verdate: string
				count: int
			}
			conf: array[
				{
					type: string:enum{
						s:	single selection
						ms:	multi selection
						t:	plain text
					}
					
				},...
			]
			ans: array[
				{
					qus: string
					ans: string:enum{
						type['*s']	--plain text
						type['t']	--regex
					},...
				},...
			]
		}
	*/
	throw 'Deprecated function: parsedb()';
}

/**
	@cb.params:
		[iqus, ians], iqus.type, iqus.body, ians
	@cb.return:
		true | false | null :	has processed
		[ans:text, cb:func] :	back to process
*/
function ansloop(jobj, cb){

	var anslen = 6;
	var qus = jobj.qus;
	var ans = jobj.ans;
	// generate random list
	// now is just random.
	var n = qus.length;
	while(true){	// enter loop
		var r = random(n);
		var iqus = qus[r];
		var ians = ans[r];
		var ianses = [];
		var riansi = random(anslen-1);
		if(iqus.type == 's' || iqus.type == 'ms'){
			for(var i=0;i<anslen;++i){
				var rand = random(n);
				var rqus = null;
				var rans = ans[rand];
				if(riansi != r){
					if((rqus=qus[rand]).type != iqus.type){
						--i; continue;
					}
				}
				ianses.push(rans);
			}
		}
		var an = cb([iqus, ians], iqus.type, iqus.body, ians, ianses);
		if(an == 0) break;
		if(an == true || an == false || an == null) continue;
		var cbfunc = an[1];
		switch(iqus.type){
			default: throw 'Unknown return value at core.js';
			case 's':
				if(an[0] == ians) cbfunc(true);
				else cbfunc(false, ians);
				break;
			case 'ms':
				var fal = function(){cbfunc(false, ians)};
				if(an.length != ians.length) fal();
				else for(var i=0, nn=an.length; i<nn; ++i){
					for(var j=0; j<nn; ++j){
						if(an[i] == ians[j]) break;
					}
					if(j==nn-1){
						fal();break;
					}
				}
				if(i == nn-1) cbfunc(true);
				break;
			case 't':
				if(an.match(ians)) cbfunc(true);
				else cbfunc(false, ians);
				break;
		}
	}
}
function fansloop(fpath, cb){
	return ansloop(floadb(fpath), cb);
}

module.exports = {
	floadb,
	fsavedb,
	fansloop
}
