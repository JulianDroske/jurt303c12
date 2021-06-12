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
if(outputPath == null) outputPath = './wxapkg_'+path.basename(pkgpath);

function printH(){
	console.log('Usage: '+process.argv[1]+' <filePath> [outputDir(defaults=./wxapkg_$filePath.name)]');
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

function parse1(pkg){
	var parts = pkg.split('\x0a\x09\x09');
	console.log(''+parts.length+' files detected.');

	if(parts.length == 0){
		console.log('Exiting...');
		return 0;
	}

	if(!fs.existsSync(outputPath)){
		try{
			mkdirSync(outputPath);
		}catch(e){
			console.log('Error: cannot create outputDir: '+e);
			return -1;
		}
	}
	if(fs.lstatSync(outputPath).isFile()){
		console.log('Error: please remove the file the same name as outputDir.');
		return -1;
	}

	for(var i=0, n=parts.length; i<n; ++i){
		// get filename
		var part = parts[i];
		/* var filename = part.match('define\\(".*"')[0].replace('define\("','').replace('"','');
		
		console.log('Extracting '+filename);

		var od = path.join(outputPath, path.dirname(filename));
		mkdirSync(od);
		fs.writeFileSync(path.join(od, path.basename(filename)), part, {encoding: 'binary'});
		*/
		(function(od,  part){
			var define = function(name, func){
				console.log('Extracting '+filename);
				mkdirSync(od);
				fs.writeFileSync(path.join(od, name), func, {encoding: 'binary'});
			};
			require = function(file){
				// ignore
			};
			eval(part);
		})(od, part);
	}
}

function parse2(pkg){
	// Advanced parser
	/**
		Data struct may be: (bytes)
			[Head] definesCount: 4
			// type: 2
			nameLength: 4
			name
			dataStartPos: 4
			dataLength: 4
			data
	*/

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

	if(read(4) != 0xbe000000){
		console.log('Error: file is not a wxapkg file.');
		return -1;
	}

	read(10);	// skip them

	var count = read(4);
	console.log(''+count+' file(s) archived.');

	for(var i=0; i<count; ++i){
		// parse one file
		var nlength = read(4);
		var name = readStr(nlength);
		var dataPos = read(4);
		var dataLength = read(4);

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
