const fs = require('fs')

function deployObj(data, names){
	if(names.length != data.length) return null;
	var n = names.length;
	
	var tarobj = {};
	
	for(var i=0;i<n;++i){
		tarobj[names[i]] = data[i];
	}
	
	return tarobj;
}

function byte2num(bytes, signed){
	bytes = bytes.toString('binary');
	var num=0;
	const len = bytes.length;
	for(var j=len-1;j>=0;--j){
		num *= 256;
		num += bytes.charCodeAt(j);
		/* num <<= 8;
		num |= bytes.charCodeAt(j)&0xff;*/
	}
	if(signed && (bytes.charCodeAt(len-1) & 128)){
		// console.log(new Buffer(bytes))
		num |= ~(Math.pow(2,len*8)-1);
		// console.log(new Buffer(bytes))
	}
	return num;
}

function num2byte(num, len){
	var data = '';
	/* if(num<0){
		num |= ~(Math.pow(2,len*8)-1);
	}*/
	for(var i=0;i<len;++i){
		data += String.fromCharCode(num&0xff);
		num >>= 8;
	}
	return data;
}

/* @params
	dat instanceof Array
	data instanceof String
*/

function ddcompile(data, isNum, len){
	if(data instanceof Buffer) data = data.toString('binary');
	if(isNum){
		data = num2byte(data, len);
	}
	return data;
}

function dwrite(target, cfg, ncfg, dat){
	for(var i=0, n=dat.length;i<n;++i){
		if(target instanceof String)
			target += ddcompile(dat[i], ncfg[i], cfg[i]);
		else if(target instanceof Array)
			target.push(ddcompile(dat[i], ncfg[i], cfg[i]));
		else if(target instanceof Buffer)
			target = target.concat(new Buffer(ddcompile(dat[i], ncfg[i], cfg[i])));
	}
	
	return target;
}

function fpwrite(fp, len, pos, isNum, dat){
	if(dat instanceof Buffer) dat = dat.toString('binary');
	if(!!isNum){
		dat = num2byte(dat, len);
	}
	fs.writeSync(fp, new Buffer(dat, 'binary'), 0, len, pos);
}

function fwrite(path, cfg, numcfg, position, dat){
	var fp;
	
	if((!(numcfg instanceof Array)) || (!(dat instanceof Object)) || !(fp=fs.openSync(path, 'w'))) return false;
	position = position || 0;
	cfg = cfg || [];
	
	for(var i=0, keys=Object.keys(dat), n=keys.length, lst=position;i<n;lst+=cfg[i],++i){
		fpwrite(fp, cfg[i], lst, numcfg[i], dat[keys[i]]);
	}
	fs.closeSync(fp);
	return true;
}

function dparse(data, len, pos, isNum){
	data = data.toString('binary').substr(pos, len);
	if(!!isNum){
		data = byte2num(data);
	}
	return data;
}

function dread(dat, cfg, numcfg, position){
	if(!(cfg instanceof Array)) return null;
	position = position || 0;
	numcfg = numcfg || [];
	
	var len = cfg.length;
	
	var data = new Array(len);
	
	for(var i=0, lst=position;i<len;lst+=cfg[i],++i){
		/* var buf = new Buffer(cfg[i]);
		fs.readSync(fp, buf, 0, cfg[i], lst);
		data[i] = buf.toString('binary');
		if(!!numcfg[i]){
			var dat = data[i];
			var num=0;
			for(var j=cfg[i]-1;j>=0;--j){
				num *= 256;
				num += dat.charCodeAt(j);
			}
			data[i] = num;
		}*/
		data[i] = dparse(dat, cfg[i], lst, numcfg[i]);
	}
	
	return data;
}

function fpread(fp, offset, len, pos, isNum){
	// var buf = new Buffer(len);
	var buf = fs.readSync(fp, len, pos, 'binary')[0];
	buf = buf.toString('binary');
	if(!!isNum){
		buf = byte2num(buf);
	}
	return buf;
}

function fread(path, cfg, numcfg, position){
	
	// cfg: bits
	// numcfg: - default number
	
	var fp;
	
	if((!(cfg instanceof Array)) || !(fp=fs.openSync(path, 'r'))) return null;
	position = position || 0;
	numcfg = numcfg || [];
	
	var len = cfg.length;
	
	var data = new Array(len);
	
	for(var i=0, lst=position;i<len;lst+=cfg[i],++i){
		/* var buf = new Buffer(cfg[i]);
		fs.readSync(fp, buf, 0, cfg[i], lst);
		data[i] = buf.toString('binary');
		if(!!numcfg[i]){
			var dat = data[i];
			var num=0;
			for(var j=cfg[i]-1;j>=0;--j){
				num *= 256;
				num += dat.charCodeAt(j);
			}
			data[i] = num;
		}*/
		data[i] = fpread(fp, 0, cfg[i], lst, numcfg[i]);
	}
	
	fs.closeSync(fp);
	
	return data;
}

function fsize(path){
	return fs.statSync(path).size;
}

GLOBAL.deployObj = deployObj;
GLOBAL.dwrite = dwrite;
GLOBAL.fwrite = fwrite;
GLOBAL.fread = fread;
GLOBAL.fpread = fpread;
GLOBAL.fsize = fsize;
GLOBAL.byte2num = byte2num;
GLOBAL.num2byte = num2byte;
