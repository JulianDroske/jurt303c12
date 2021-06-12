'use strict';

var OBJ = [];

Object.defineProperty(GLOBAL,'GLOBAL',{
	get: function(){
		return OBJ;
	},
	set: function(v){
		OBJ.push(v);
	}
});

var mod;
try{
	mod = require(process.argv[2]);
}catch(e){
	mod = require('./'+process.argv[2]);
}

function tree(lay){
	lay = lay || 0;
	for(var i=0;i<lay;++i){
		process.stdout.write('    ');
	}
	process.stdout.write('|-- ');
}

function parse(cls, lay){
	lay = lay || 0;
	if(!cls && typeof cls != 'object' && typeof cls != 'function'){
		return;
	}
	const keys = Object.keys(cls);
	const n = keys.length;
	for(var i=0;i<n;++i){
		// avoid circularing
		if(cls[keys[i]] == cls) continue;
		var type = typeof cls[keys[i]];
		if(type == 'object' || type == 'function'){
			tree(lay);
			console.log(keys[i] + (type=='function'?'('+(cls[keys[i]].length+')'):''));
		}
		parse(cls[keys[i]], lay+1);
	}
}

tree();
console.log('MODULE');
parse(mod,1);
tree();
console.log('GLOBAL');
parse(OBJ,1);
