const fs  = require('fs');
const path = require('path');
const beaut = require('./beautifier');

function mkdirSync(p){
	if(!p) throw 'Dirname is null.';
	if(fs.existsSync(p)){
		if(fs.lstatSync(p).isDirectory()) return true;
		else throw 'File '+p+' exists.';
	}
	else{
		try{
			fs.mkdirSync(p);
		}catch(e){
			mkdirSync(path.dirname(p));
			fs.mkdirSync(p);
		}
	}
}

var pkgpath = process.argv[2];
var outputPath = process.argv[3];
if(outputPath == null) outputPath = './asar_'+path.basename(pkgpath);

function printH(){
	console.log('Usage: '+process.argv[1]+' <filePath> [outputDir(defaults=./asar_$filePath.name)]');
}

if(pkgpath == null || !fs.existsSync(pkgpath)){
	if(pkgpath != null) console.log('Error: file not found: '+pkgpath);
	printH();
	return -1;
}else if(fs.lstatSync(pkgpath).isDirectory()){
	console.log('Error: file is a dir.');
	printH();
	return -1;
}

var pkg = fs.readFileSync(pkgpath, 'binary');

function parse2(pkg){
	// Advanced parser

	// basic functions
	var pos = 0;
	function readStr(bits){
		var str = '';
		for(var i=pos, n=pos+bits; i<n; ++i){
			str += pkg[i];
		}
		pos += bits;
		return str;
	}
	function read(bits, big){
		var num=0;
		var dats = [];
		if(!big){
			// little endian
			for(var i=pos, n=pos+bits;i<n;++i){
				dats.push(pkg[i]);
			}
		}else{
			// big endian
			for(var i=pos+bits-1, n=pos; i>=n; --i){
				dats.push(pkg[i]);
			}
		}

		for(var i=0;i<bits;++i){
			num *= 256;
			num += (dats[i].charCodeAt())>>>0;
		}
		pos+=bits;
		return num;
	}

	console.log('Parsing file '+pkgpath);

	if(read(4) != 0x04000000){
		console.log('Error: file is not a asar file.');
		return -1;
	}

	read(4, true);
	read(4, true);
	var indexLen = read(4, true);
	var START = indexLen + 18;

	var indexJson = JSON.parse(readStr(indexLen));

	var sfiles = [];
	// format [[off, siz, path],...]

	function preload(obj, prevKey, prevAll){
		prevKey = prevKey || [];
		prevAll = prevAll || prevKey;
		var r = 0;
		var N = Object.keys(obj);
		if(N.length==0 || obj.constructor == String) return 0;
		if(prevAll[prevAll.length-2] == 'files'){
			prevAll.splice(prevAll.length-2,1)
			sfiles.push([parseInt(obj.offset), parseInt(obj.size), prevAll]);
		}
		for(var i of N){
			if(i == 'files') r+=Object.keys(obj[i]).length;
			r += preload(obj[i], [i], prevAll.concat([i]));
		}
		return r;
	}

	var count = preload(indexJson);
	if(count != sfiles.length){
		console.log('error: internal bug detected: length != length: ',count, sfiles.length);
		return -1;
	}
	console.log(''+count+' file(s) archived.');

	for(var i=0; i<count; ++i){
		// parse one file
		/* var nlength = read(4);
		var name = readStr(nlength);
		var dataPos = read(4);
		var dataLength = read(4);*/
		var F = sfiles[i];
		var name = F[2].join('/');
		var dataPos = F[0]+START;
		var dataLength = F[1];

		if(!dataPos || !dataLength) continue;

		// copy data
		/* var dat = '';
		for(var i=dataPos, n=dataPos+dataLength, j=0; i<n; ++i, ++j){
			dat[j] = pkg[i];
		}*/
		
		// now it is alternative with readStr
		// backup ptr
		var bkp = pos;
		pos = dataPos;
		var dat = readStr(dataLength);
		// restore ptr
		pos = bkp;

		console.log('Extracting '+name);
		// now write to file
		var filepath = path.join(outputPath, name);
		mkdirSync(path.dirname(filepath));

		// beautify
		if(name.endsWith('.js')){
			console.log('JS beautifing... ');
			dat = beaut.js(dat, {});
		}else if(name.endsWith('.css')){
			console.log('CSS beautifing... ');
			dat = beaut.css(dat, {});
		}else if(name.endsWith('.html')){
			console.log('HTML beautifing... ');
			dat = beaut.html(dat, {});
		}else if(name.endsWith('.json')){
			console.log('JSON beautifing... ');
			dat = JSON.stringify(JSON.parse(dat), null, '\t');
		}
		
		fs.writeFileSync(filepath, dat, {encoding: 'binary'});
	}
}

// determine formats
// nope, just use parse2
parse2(pkg);

console.log('Process done.');
