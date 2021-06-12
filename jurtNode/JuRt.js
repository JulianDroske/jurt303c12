const fs = require('fs')
const cp = require('child_process')
const path = require('path')

const modpt = __dirname;

function FFmpeg(fn){
	
	this.extCode = 0;
	this.ff = null;
	this.log = '';
	
	this.init = function(filename){
		
		try{
			this.ff.kill('SIGINT');
		}catch(e){}
		
		if(filename) this.ff = cp.spawn('ffmpeg',['-loop','1','-i','pipe:','-y','-c:v','mpeg1video','-q','0',filename]);
		else this.ff = cp.spawn('ffplay',['-fflags','nobuffer','-analyzeduration','1','-i','pipe:']);
		// this.ff = cp.spawn('ffplay',['-i','pipe:']);
		// this.ff.stdin.setNoDelay(true);
		
		this.ff.stdout.on('data',function(dat){
			// this.log += dat.toString();
			// console.log(dat.toString())
		});
		this.ff.stderr.on('data',function(dat){
			// this.log += dat.toString();
			// console.log(dat.toString())
		});
		this.ff.on('close',function(code){
			this.extCode = code;
			try{
				this.ff.stdin.end();
			}catch(e){}
			this.ff = null;
		});
	}
	
	this.init(fn);
	
	this.write = function(dat){
		if(this.ff != null){
			for(var i=0;i<180;++i){
				this.ff.stdin.write(dat);
				// fs.writeSync(this.ff.stdin._handle.fd,dat,0,dat.length);
			}
			return true;
		}
		return false;
	}
	
	this.writeiloop = function(dat){
		if(this.ff != null){
			this.ff.stdin.write(dat);
			// fs.writeSync(this.ff.stdin._handle.fd,dat,0,dat.length);
			// this.ff.stdin.end();
			// fs.writeSync(this.ff.stdin.fd,dat,0,dat.length);
			return true;
		}
		// process.stderr.write('FFmpeg terminated.\n');
		return false;
	}
	
	this.read = function(){
		return this.log;
	}
	
	this.kill = function(){
		try{
			// this.ff.kill('SIGINT');
			this.ff.kill('SIGTERM');
			// this.ff.stdin.end('q');
		}catch(e){}
		// this.ff = null;
	}
}

function C(a,b){
	// MUST BE INT,INT
	
	a = a || 0;
	b = b || 0;
	
	this.a = a;
	this.b = b;
	
	this.plus = function(c){
		if(c instanceof C) return new C(this.a + c.a, this.b + c.b);
		else return new C(this.a + c, this.b);
	}
	
	this.minus = function(c){
		if(c instanceof C) return new C(this.a - c.a, this.b - c.b);
		else return new C(this.a - c, this.b);
	}
	
	this.time = function(c){
		if(c instanceof C) return new C(this.a * c.a - this.b * c.b, this.a * c.b + this.b * c.a);
		else return new C(this.a * c, this.b * c);
	}
	
	this.div = function(c){
		if(c instanceof C) return;
		return new C(this.a / c, this.b / c);
	}
	
	this.getPoint = function(){
		return [a,b];
	}
	
}

function V(c,s){
	// saved PI
	// c*e^{s*PI*i}
	
	c = c || 1;
	s = s || 0;
	
	if(!(c instanceof C)) c = new C(c);
	// if(!(s instanceof C)) s = new C(s);
	
	this.c = c;
	this.s = s;
	
	this.time = function(c){
		if(c instanceof V) return new V(c.c.time(this.c), c.s + this.s);
		else if(c instanceof C) return new V(c.time(this.c), this.s);
		else{
			try{
				return new V(this.c.time(c), this.s);
			}catch(e){
				return new V(this.c * c,this.s);
			}
		}
	}
	
	this.toC = function(){
		try{
			return new C(Math.cos(s*Math.PI), Math.sin(s*Math.PI)).time(c);
		}catch(e){
			return new C(Math.cos(s * Math.PI), Math.sin(s * Math.PI)).time(c);
		}
	}
	
	this.getPoint = function(t){
		// 0 < t < 1
		return new C(Math.cos(s*Math.PI * t), Math.sin(s*Math.PI * t)).time(c).getPoint();
	}
}

function Canvas(zomX,zomY, x,y, rev){
	
	rev = rev || false;
	x = x || zomX;
	y = y || zomY;
	
	function Core(x,y,zomX,zomY){
		this.cache = [];
		this.X = x;
		this.Y = y;
		this.camX = 0;	// Left
		this.camY = 0;	// Top
		this.zomX =  zomX;
		this.zomY =  zomY;
		this.imgdat =  [];
		this.paintc =  4294967295;
		this.curX =  0;
		this.curY =  0;
		this.ff = null;
		this.rev = rev;
		this.svgs = [];
		this.anim = [];
		
		this.p2l = function(x,y){
			x |= 0;
			y |= 0;
			x--;y--;
			return x + y*this.zomX;
		}
		
		this.l2p = function(l){
			l |= 0;
			return [(l+1)%5,((l/this.zomX)+1)|0];
		}
		
		this.drawPixel = function(x,y,c){
			
			c = c || this.paintc;
			
			x -= this.camX;
			y -= this.camY;
			if(x >= this.zomX || y >= this.zomY || x <= 0 || y <= 0){
				// console.log('Out of range: '+x+','+y);
				// throwError();
				return;
			}
			this.imgdat[this.p2l(x,y)] = c;
		};
		
		this.moveTo = function(x,y){
			this.curX = x;
			this.curY = y;
		};
		
		this.drawLine = function(x1,y1,x2,y2){
			if(x1>x2){
				x1 += x2
				x2 = x1 - x2
				x1 -= x2
			}
			if(y1>y2){	
				y1 += y2
				y2 = y1 - y2
				y1 -= y2
			}
			
			var dx = x2-x1;
			var dy = y2-y1;
			if(dx==0){
				for(var y=y1;y<=y2;++y){
					this.drawPixel(x1,y);
				}
			}else if(dy==0){
				for(var x=x1;x<=x2;++x){
					this.drawPixel(x,y1);
				}
			}else if(Math.abs(dy) > Math.abs(dx)){
				if(y1>y2){
					x1 += x2
					x2 = x1 - x2
					x1 -= x2
					
					y1 += y2
					y2 = y1 - y2
					y1 -= y2
				}
				var k = dx/dy;
				for(var x=x1, y=y1;y<=y2;++y,x+=k){
					this.drawPixel(0|(x+0.5),y);
				}
			}else{
				var k = dy/dx;
				for(var y=y1, x=x1;x<=x2;++x,y+=k){
					this.drawPixel(x,0|(y+0.5));
				}
			}
		};
		
		this.lineTo = function(x,y){
			this.drawLine(this.curX,this.curY,x,y);
			this.curX = x;
			this.curY = y;
		};
		
		this.setStrokeColor = function(c){
			this.paintc = c || 4294967295;
		};
		
		this.init = function(color){
			// this.imgdat = [];
			color = color || 0;
			for(var i=0;i<this.zomX*this.zomY;++i){
				this.imgdat[i] = color;
			}
			this.cache = [];
		};
		
		this.clearRect = function(x,y,xx,yy,c){
			c = c || 0;
			for(var i=x;i<=xx;++i){
				for(var j=y;j<=yy;++j){
					this.drawPixel(i,j,c);
				}
			}
		};
		
		this.setCameraPos = function(x,y,center){
			if(x<0) x=0;if(y<0) y=0;
			if(center){
				var hl=this.zomX/2;
				var ht=this.zomY/2;
				if(x<hl) x=hl;if(y<ht) y=ht;
				if(x>this.X-hl) x=this.X-hl;if(y>this.Y-ht) y=this.Y-ht;
				x -= hl;
				y -= ht;
			}else{
				var ml=this.X-this.zomX;
				var mt=this.Y-this.zomY;
				if(x>ml) x=ml;if(y>mt) y=mt;
			}
			
			this.camX = x;
			this.camY = y;
		};
		
		this.setZoom = function(zX,zY){
			this.zomX = zX;
			this.zomY = zY;
		};
		
		this.getBMP = function(){
			var n = this.zomX * this.zomY;
			var l = n*4+54;
			var out = new Buffer(l);
			var point = -1;
			
			// Init Header
			var header = ['B'.charCodeAt(),'M'.charCodeAt(),0,0,0,0,0,0,0,0,54,0,0,0,40,0,0,0,0,0,0,0,0,0,0,0,1,0,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			function setHeader(dat, pos){
				var pn = pos+4;
				for(;pos<pn;++pos){
					header[pos] = dat&255;
					dat >>>= 8;
				}
			}
			
			setHeader(l,2);
			setHeader(this.zomX,18);
			setHeader(this.rev?this.zomY:0-this.zomY,22);
			
			for(x in header){
				out[++point] = header[x];
			}
			
			// Init Data
			for(var x=0;x<n; ++x){
				var dat = this.imgdat[x];
				for(var y=0;y<4;++y){
					// out += (this.imgdat[x]?this.imgdat[x][y]:'0')+' ';
					out[++point] = dat&255;
					dat>>>=8;
				}
			}
			return out;
		};
		
		this.outputBMP = function(){
			fs.writeSync(process.stdout.fd,this.getBMP(),0,l);
		}
		
		this.outputMPEG = function(relt,filename){
			if(this.ff == null) this.ff = new FFmpeg(filename);
			var bmp = this.getBMP();
			if(relt){
				if(!this.ff.write(bmp)){
					this.ff.init();
					this.ff.write(bmp);
				}
			}else{
				if(!this.ff.writeiloop(bmp)){
					this.ff.init();
					this.ff.writeiloop(bmp);
				}
			}
		}
		
		this.stroke = function(){	
			var n = this.cache.length;
			for(var i=0;i<n;++i){
				var p = this.cache[i];
				switch(p[0]){
					case 'p':
						this.drawPixel(p[1],p[2],p[3]);
						break;
					case 'm':
						this.moveTo(p[1],p[2]);
						break;
					case 'bl':
						this.drawLine(p[1],p[2],p[3],p[4]);
						break;
					case 'l':
						this.lineTo(p[1],p[2]);
						break;
					case 'c':
						this.setStrokeColor(p[1]);
						break;
				}
			}
			
			// Svg support
			var n = this.svgs.length;
			for(var i=0;i<n;++i){
				var ps = this.svgs[i].getPoints();
				var nn = ps.length;
				for(var j=0;j<nn;++j){
					this.drawPixel(ps[j][0], ps[j][1]);
				}
			}
		}
		
		this.clearCache = function(){
			this.cache = [];
		}
		
		this.getCanvasSize = function(){
			return this.X*this.Y;
		}
		
		this.getCameraSize = function(){
			return this.zomX*this.zomY;
		}
		
		this.putSvg = function(svg){
			this.svgs.push(svg);
		}
		
		this.rmSvg = function(svg){
			var n = this.svgs.length;
			for(var i=0;i<n;++i){
				if(this.svgs[i] == svg){
					this.svgs.splice(i,1);
					return;
				}
			}
		}
		
		this.putText = function(text){
			var n = text.texts.length;
			for(var i=0;i<n;++i){
				this.putSvg(text.texts[i]);
			}
		}
		
		this.rmText = function(text){
			var n = text.texts.length;
			for(var i=0;i<n;++i){
				this.rmSvg(text.texts[i]);
			}
		}
		
		this.setAnim = function(obj, anim){
			obj.ANIM(anim);
			this.anim.push(anim);
		}
		
		this.startAnim = function(){
			// var anim = this.anim;
			var t = [];
			var dur = [];
			setInterv(function(){
				var n = this.anim.length;
				var cleared = true;
				for(var i=0;i<n;++i){
					if(t[i] == undefined){
						t[i] = 0;
						dur[i] = 1/this.anim[i].dur;
					}
					if(t[i] >= 1){
						t[i] = null;
					}
					if(t[i] != null) cleared = false;
					else continue;
					this.anim[i].appPara(t[i]);
					console.log(t[i])
					t[i]+=dur[i];
				}
				this.init();
				this.stroke();
				this.outputMPEG();
				if(cleared){
					this.anim = [];
					return false;
				}
				return true;
			},0,this);
		}
		
	}
	
	this.core = new Core(x,y,zomX,zomY);
	
	this.init = function(color){
		this.core.init(color);
		// this.core.clearCache();
	}
	
	this.drawPixel = function(x,y,c){
		this.core.cache.push(['p',x,y,c]);
	}
	
	this.moveTo = function(x,y){
		this.core.cache.push(['m',x,y]);
	}
	
	this.drawLine = function(x1,y1,x2,y2){
		this.core.cache.push(['bl',x1,y1,x2,y2]);
	}
	
	this.lineTo = function(x,y){
		this.core.cache.push(['l',x,y]);
	}
	
	this.setStrokeColor = function(c){
		this.core.cache.push(['c',c]);
	}
	
	this.clearRect = function(x,y,xx,yy,c){
		this.core.clearRect(x,y,xx,yy,c);
	}
	
	this.clear = function(color){
		this.init(color);
	}
	
	this.stroke = function(){	
		this.core.stroke();
		this.core.clearCache();
	}
	
	this.outputBMP = function(){
		this.core.outputBMP();
	}
	
	this.outputMPEG = function(realtime,filename){
		this.core.outputMPEG(realtime,filename);
	}
	
	this.endMPEG = function(){
		this.core.ff.kill();
	}
	
	this.setCameraPos = function(x,y,center){
		this.core.setCameraPos(x,y,center);
	}
	
	this.setZoom = function(zX,zY){
		this.core.setZoom(zX,zY);
	}
	
	this.setReversed = function(stat){
		this.core.rev = stat;
	}
	
	this.putSvg = function(svg){
		this.core.putSvg(svg);
	}
	
	this.rmSvg = function(svg){
		this.core.rmSvg(svg);
	}
	
	this.putText = function(text){
		this.core.putText(text);
	}
	
	this.rmText = function(text){
		this.core.rmText(text);
	}
	
	this.setAnim = function(obj, anim){
		this.core.setAnim(obj, anim);
	}
	
	this.startAnim = function(){
		this.core.startAnim();
	}
}
/**
	Canvas Child(SVG) Interfaces
		var left;
		var top;
		function f(t)	// For Svg, t$=[0,svglen]
		function moveTo(x,y)
		function scaleTo(s)
		function ANIM(anim)
*/

// Reversed
Canvas.Child = function(){
	
}

Canvas.Child.SVG = function(left,top,scale,angle,svgs,f,ANIM){
	this.left = left || 0;
	this.top = top || 0;
	this.scale = scale || 1;
	this.angle = angle || 0;
	this.svgs = svgs || [];
	this.totalLength = 0;
	this.lengths = [0];
	for(var i=0;i<this.svgs.length;++i){
		this.totalLength = this.lengths[i+1] = this.lengths[i]+this.svgs[i].length;
	}
	this.f = f || function(t){
		var parg = 0;
		for(var n=this.lengths.length;parg<n && this.lengths[parg]<t;++parg);
		parg--;
		
		var per = t-this.lengths[parg];
		return new V(this.svgs[parg].f(per).plus(new C(this.left, this.top)),this.angle).toC();
	};
	this.moveTo = function(x,y){
		this.left = x || 0;
		this.top = y || 0;
	}
	this.scaleTo = function(sca){
		this.scale = sca || 1;
	}
	this.rotateTo = function(angle){
		this.angle = angle || 0;
	}
	this.ANIM = ANIM || function(anim){
		anim.init([x,y,scale],function(type, para){
			switch(type){
				case 'trans':
					this.moveTo(para[0], para[1]);
					break;
				case 'scale':
					this.scaleTo();
					break;
			}
		}.bind(this));
	};
}

/**
	Formats:
		trans2: [x1,y1],[x2,y2]
		trans: [dx,xy]
		scale2: sc1,sc2
		scale: sc
*/
Canvas.Transform = function(type, dur, par1, par2){
	this.type = type;
	this.dur = dur;
	
	function len(p1,p2){
		var dx=p1[0]-p2[0];
		var dy=p1[1]-p2[1];
		return Math.sqrt(dx*dx + dy*dy);
	}
	
	// op:[ox,oy,osc]
	this.init = function(op, cb){
		switch(type){
			case 'trans':
				par2 = [];
				par2[0] = op[0] + par1[0];
				par2[1] = op[1] + par1[1];
				par1[0] = op[0];
				par1[1] = op[1];
			case 'trans2':
				var dx = par2[0]-par1[0];
				var dy = par2[1]-par1[1];
				var dax = dx*2;
				var day = dy*2;
				this.appPara = function(t){
					if(t>0.5){
						t = 1-t;
						var dxy = [par1[0] + dx - dax*t*t, par1[1] + dy - day*t*t];
					}else{
						var dxy = [par1[0] + dax*t*t, par1[1] + day*t*t];
					}
					if(cb) cb('trans', dxy, op);
				}
				break;
			case 'scale':
				par2 = op[2] + par1[2];
				par1 = op[2];
			case 'scale2':
				var ds = par2-par1;
				var dsx = ds*2;
				this.appPara = function(t){
					if(t>0.5){
						t = 1-t;
						var dsc = par1 + dx - dsx*t*t;
					}else{
						var dsc = par1 + dsx*t*t;
					}
					if(cb) cb('scale', dsc, op);
				}
				break;
		}
	}
}


function XML(content){
	
	var c = content.toString();
	this.tago = [];
	
	// init
	var i=0;
	this.iSpace = function(ch){
		if( ch==' ' || ch=='\n' || ch=='\r' || ch=='\t') return true;
		return false;
	}
	this.iNum = function(ch){
		var ich = ch.charCodeAt();
		return ( (ich>=48 && ich<=57) || ch=='.' || ch=='-' );
	}
	this.sKntil = function(ch, dat){
		var d = dat || c;
		while(d.charAt(i) != ch) ++i;
	}
	this.sKntilRev = function(ch, dat){
		var d = dat || c;
		while(true){
			if(d.charAt(i) == ch){
				if(d.charAt(i-1) != '\\') break;
			}
			++i;
		}
		
	}
	this.sKpace = function(dat){
		var d = dat || c;
		while(this.iSpace(d.charAt(i))) ++i;
	}
	this.iEnd = function(ch){
		if( ch==' ' || ch=='>' || ch=='/' || ch=='\t' || ch=='=') return true;
		return false;
	}
	this.sKnd = function(dat){
		var d = dat || c;
		while(!this.iEnd(d.charAt(i))) ++i;
	}
	
	this.mkObj = function(part, putInner){
		var stend = this.tago[part];
		var cont = c.substring(stend.start, stend.end);
		// var obj = {};
		var obj = new XML(cont);
		
		// parse
		i = 0;
		var attrs = cont.substring(0,cont.indexOf('>')+1);
		attrs = attrs.substring(attrs.indexOf('<'), attrs.length);
		var n = attrs.length;
		
		this.sKpace(attrs);
		
		// var start = i;
		this.sKnd(attrs);
		i++;
		// obj.tagName = attrs.substring(start+1, i-1).toUpperCase();
		obj.tagName = stend.name;	// .toUpperCase();

		attrloop:
		while(i < n){
			this.sKpace(attrs);
			
			var start = i;
			this.sKnd(attrs);
			switch(attrs.charAt(i)){
				case '/':
					++i;
				case '>':
					// end
					++i;
					break attrloop;
			}
			var attrNs = attrs.substring(start, i);
			if(attrs.charAt(i)=='='){
				// has value
				start = ++i;
				if(attrs.charAt(i) == '"'){
					++i;
					this.sKntilRev('"', attrs);
					++i;
					obj[attrNs] = attrs.substring(start+1, i-1);
				}
			}else{
				obj[attrNs] = true;
			}
		}
		if(stend.inner && putInner){
			// has inner
			// this.sKntilRev('>', cont);
			// ++i;
			this.sKpace(cont);
			start = i;
			var end = cont.lastIndexOf('<');
			obj.innerHTML = cont.substring(start, end);
		}
		
		return obj;
	}
	
	
	// tago[n] = {tagname, start, end, hasinnerHTML}
	
	this.load = function(d){
		d = d || 0;
		this.sKpace();
		
		var start = c.indexOf('<',i);
		mainloop:
		while(start >= 0){
			i = start = c.indexOf('<',i)	// tag start
			if(start<0) break;
			switch(c.charAt(start+1)){
				default:
					// get tagname
					// var start = i+1;
					var sta = i+1;
					this.sKnd();
					var tagName = c.substring(sta, i);
					break;
				case '?':
				case '!':
					this.sKntil('>');
					continue mainloop;
				case '/':
					// outHTML end sign
					//i--;
					// fix previous tag
					// wanna find it by tag name
					i+=2;
					var tgs = i;
					this.sKnd();
					var tgName = c.substring(tgs, i);
					var n = this.tago.length;
					for(var j = n-1; j >= 0; --j){
						var tag = this.tago[j];
						if(tag.name == tgName && tag.inner == undefined){
							tag.end = i+1;
							tag.inner = true;
							break;
						}
					}
					this.sKntil('>');
					i++;
					continue mainloop;
					// break mainloop;
			}
			this.sKntil('>');	// tag end
			var hasInner = undefined;
			// strict mode
			if(c.charAt(i-1) == '/'){
				hasInner = false;
			}
			// make a object first, change it later
			this.sKntil('>');
			i++;
			// this.tago.push([tagName, start, i, hasInner, ]);
			this.tago.push({
				name: tagName,
				start: start,
				end: i,
				inner: hasInner
			});
		}
	}
	
	this.load();
	
	this.getByTagName = function(name, putInner){
		if(putInner == undefined) putInner = true;
		name = name.toString();
		var ret = [];
		var n = this.tago.length;
		for(var x=0;x<n;++x){
			if(this.tago[x].name == name){
				ret.push(this.mkObj(x,putInner));
			}
		}
		return ret;
	}
	
	this.getByAttr = function(attr,v, putInner){
		if(putInner == undefined) putInner = true;
		var ret = [];
		var n = this.tago.length;
		for(var x=0;x<n;++x){
			var obj = this.mkObj(x, putInner);
			var attrs = Object.keys(obj);
			var nn = attrs.length;
			checkloop:
			for(var j=0;j<nn;++j){
				var y = attrs[j];
				switch(y){
					case attr:
						if(obj[y] == v){
							ret.push(obj);
							break checkloop;
						}
						break;
					case 'innerHTML':
					case 'tagName':
						break;
				}
			}
		}
		return ret;
	}
}



/* format@path:
	[ [ cmd, [ x, y ], ... ], ... ]
*/
function SVG(d,scale,offX,offY){
	this.scale = scale || 1;
	this.path = [];
	this.length = 0;
	this.offX = offX || 0;
	this.offY = offY || 0;
	
	if(!d) d = 'z';
	d = d.toString().trim();
	
	// boolean: absolute ; boolean: push?
	this.Donfig = {
		'M': [1, true, false],
		'm': [1,false, false],
		
		'C': [3, true, true],
		'c': [3, false, true],
		
		'S': [2, true, true],
		's': [2, false, true],
		
		'L': [1, true, true],
		'l': [1, false, true],
		
		'Z': [0, true, true],
		'z': [0, true, true],
		
		'Q': [2, true, true],
		'q': [2, false, true],
		
		'T': [1, true, true],
		't': [1, false, true],
		
		'H': [-1, true, true, 'x'],
		'h': [-1, false, true, 'x'],
		
		'V': [-1, true, true, 'y'],
		'v': [-1, false, true, 'y']
	}
	this.DL = [0];
	tmPoint = [0,0];
	
	/* INIT */
	// parse PATH
	var i = 0;
	this.iSpace = function(ch){
		if( ch==' ' || ch=='\n' || ch=='\r' || ch==',' || ch=='\t') return true;
		return false;
	}
	this.iNum = function(ch){
		var ich = ch.charCodeAt();
		return ( (ich>=48 && ich<=57) || ch=='.' || ch=='-' );
	}
	this.sKpace = function(){
		while(this.iSpace(d.charAt(i))) ++i;
	}
	this.getCmd = function(){
		this.sKpace();
		return d.charAt(i++);
	}
	this.next = function(save, rel){
		this.sKpace();
		var ch = d.charAt(i);
		var sti = i;
		var num = 0;
		var neg = false;
		var flt = -1;
		while( this.iNum(ch) ){
			var ich = ch.charCodeAt();
			if(ch == '-'){
				if(sti==i)neg = true;
				else break;
			}
			else if(ch == '.') flt = 0;
			else if( flt != -1){
				// float
				num += (ich-48) * Math.pow(0.1, ++flt);
			}else{
				num *= 10;
				num += (ich-48);
			}
			ch = d.charAt(++i);
		}
		
		num = neg?-num:num;
		
		if(save == 'x') save = 1;
		if(save == 'y') save = 2;
		if(save){
			save--;
			if(rel) num += tmPoint[save];
			// tmPoint[save] = num;
			var bkp = tmPoint.slice();
			bkp[save] = num;
			tmPoint = bkp;
		}
		return num;
	}
	this.nextps = function(n, rel){
		var points = [tmPoint];
		var x = tmPoint[0];
		var y = tmPoint[1];
		if(rel){
			for(var i=0;i<n; ++i){
				points.push( [ x+this.next() , y+this.next() ] );
			}
		}else{
			for(var i = 0;i<n; ++i){
				points.push( [ this.next() , this.next() ] );
			}
		}
		tmPoint = points[n];
		return points;
	}
	/* this.nextpsRelative = function(n){
		var points = [tmPoint];
		var x = tmPoint[0];
		var y = tmPoint[1];
		for(var i=0;i<n; ++i){
			points.push( [ x+this.next() , y+this.next() ] );
		}
		tmPoint = points[n];
		return points;
	}*/

	var mvStart = [0,0];
	while( i<d.length ){
		var ch = this.getCmd();
		if(this.Donfig[ch][0] >= 0) var dat = this.nextps(this.Donfig[ch][0], !this.Donfig[ch][1])
		else var dat = [tmPoint, (this.Donfig[ch][3]=='x')?[this.next(this.Donfig[ch][3], !this.Donfig[ch][1]), tmPoint[1]]:[tmPoint[0], this.next(this.Donfig[ch][3], !this.Donfig[ch][1])]];
		
		var cmd = ch.toUpperCase();
		/* Fixs */
		switch(cmd){
			case 'Z':
				dat.push(tmPoint = /*this.path[0][1][0]*/mvStart);
				// ch = 'L';
				break;
			case 'S':
			case 'T':
				var ldat = this.path[this.path.length-1];
				var indep = false;
				if(ldat){
					var ld = ldat[1];
					switch(ldat[0]){
						default:
							// indep
							indep = true;
							break;
						case 'T':
						case 'Q':
							if(cmd != 'T'){indep = true;break;}
							//dat = [[2*ld[1][0]-ld[0][0], 2*ld[1][1]-ld[0][1]]].concat(dat);
							// dat = [[2*ld[2][0]-ld[1][0], 2*ld[2][1]-ld[1][1]]].concat(dat);
							dat = [dat[0]].concat([[2*ld[2][0]-ld[1][0], 2*ld[2][1]-ld[1][1]]]).concat(dat.slice(1));
							break;
						case 'S':
						case 'C':
							if(cmd != 'S'){indep = true;break;}
							// dat = [[2*ld[2][0]-ld[1][0], 2*ld[2][1]-ld[1][1]]].concat(dat);
							dat = [dat[0]].concat([[2*ld[3][0]-ld[2][0], 2*ld[3][1]-ld[2][1]]]).concat(dat.slice(1));
							break;
					}
				}else{
					// indep
					indep = true;
				}
				if(indep){
					// dat.concat(dat);
					dat = [ldat[1][ldat[1].length-1]].concat(dat);
				}
				break;
			case 'M':
				mvStart = dat[1].slice();
				break;
		}
		// console.log(JSON.stringify(dat))
		
		if(this.Donfig[ch][2]) this.path.push( [cmd, dat] );
	}
	
	// console.log(JSON.stringify(this.path).replace(new RegExp(']]','g'),']]\n'))
	
	
	this.calcPoint = function(parg, per){
		var CMD = this.path[parg];
		var ps = CMD[1];
		var tmp = 1 - per;
		switch(CMD[0]){
			case 'S':
			case 'C':
				return { x: ps[0][0] * Math.pow(tmp,3) + 3 * ps[1][0] * per * tmp * tmp + 3 * ps[2][0] * per * per * tmp + ps[3][0] * Math.pow(per,3), y: ps[0][1] * Math.pow(tmp,3) + 3 * ps[1][1] * per * tmp * tmp + 3 * ps[2][1] * per * per * tmp + ps[3][1] * Math.pow(per,3) }
			case 'T':
			case 'Q':
				return { x: ps[0][0] * tmp * tmp + 2 * ps[1][0] * tmp * per + ps[2][0] * per * per, y: ps[0][1] * tmp * tmp + 2 * ps[1][1] * tmp * per + ps[2][1] * per * per }
			case 'V':
			case 'H':
			case 'Z':
			case 'L':
				return { x: per*ps[1][0] + tmp*ps[0][0], y: per*ps[1][1] + tmp*ps[0][1] }
		}
	}
	
	// Calculate Length
	// vars: DL
	var samp = 0.01;
	
	function calcLength(a,b){
		var dx = Math.abs(b.x-a.x);
		var dy = Math.abs(b.y-a.y);
		return Math.sqrt(dx*dx + dy*dy);
	}
	
	for (var i=0;i<this.path.length;++i){
		var k = i+1;
		var dp = this.path[i];
		//this.DL.push(0);
		this.DL[k] = 0;
		switch(dp[0]){
			case 'S':
			case 'T':
			case 'Q':
			case 'C':
				var lst = this.calcPoint(i, 0);
				for(var j=samp;j<=1;j+=samp){
					var st = this.calcPoint(i, j);
					this.DL[k] += calcLength(st,lst);
					lst = st;
				}
				break;
			case 'V':
			case 'H':
			case 'Z':
			case 'L':
				var p = dp[1];
				this.DL[k] = calcLength({x: p[0][0], y:p[0][1]}, {x: p[1][0], y:p[1][1]});
				break;
		}
		this.length = (this.DL[k] += this.DL[i]);
	}
	
	this.getPointAtLength = function(l){
		var lstl = this.DL[this.DL.length-1];
		while(lstl < l) l-=lstl;
		
		var parg = 0;
		// Fixed for d=undefined
		while(this.DL[parg] <= l && this.DL[parg+1] != undefined) ++parg;
		parg--;
		
		return this.calcPoint(parg, (l - this.DL[parg])/(this.DL[parg+1]-this.DL[parg]));
	}
	
	
	this.f = function(t){
		var p = this.getPointAtLength(this.length*t);
		return new C(p.x, p.y).time(this.scale).plus(new C(this.offX,this.offY));
	}
	
	this.getPoints = function(samp){
		samp = samp || 0.001;
		points = [];
		for(var i=0;i<=1;i+=samp){
			var c = this.f(i);
			points.push([c.a, c.b]);
		}
		return points;
	}
}
SVG.parseFile = function(path,scale,offX,offY){
	try{
		var content = fs.readFileSync(path).toString();
	}catch(e){
		process.stderr.write('Error when loading svg file.\n');
		// process.exit(1);
		return;
	}
	var start = content.indexOf(' d="');
	if(start < 0) start = content.indexOf('\nd="');
	content = content.substring(start+4,content.length);
	return new SVG(content.substring(0,content.indexOf('"')),scale,offX,offY);
}


function Text(text, scale, x, y){
	Canvas.Child.SVG.call(this,x,y);
	scale = scale || 1;
	this.scale = scale;
	x = x || 0;
	this.x = x;
	y = y || 0;
	this.y = y;
	
	var fp = new XML(fs.readFileSync(path.join(modpt,'font.svg')));
	
	this.texts = null;
	this.widths = null;
	
	this.setText = function(text,scale,x,y){
		this.texts = [];
		
		
		this.widths = [x];
		var n = text.length;
		var left = 0;
		var top = 0;
		for(var i=0;i<n;++i){
			var ch = text.charAt(i);
			var ele = fp.getByAttr('unicode',ch,false)[0];
			var svg = new SVG(ele.d,scale,left,y);
			this.texts.push(svg);
			left += ele['horiz-adv-x']*scale;
			this.widths.push(left);
		}
	}
	
	this.setText(text,scale,x,y);
	
	// uncomplete
	this.reset = function(text, scale, x, y){
		scale = scale || 1;
		this.scale = scale;
		x = x || 0;
		this.x = x;
		y = y || 0;
		this.y = y;
		
		var n = this.texts.length;
		var dx = x - this.widths[0];
		for(var i=0;i<n;++i){
			this.texts[i].offX = (this.widths[i]+=dx);
			this.texts[i].offY = y;
		}
		this.widths[n]+=dx;
	}
	
	this.moveTo = function(x,y){
		this.x = x || 0;
		this.y = y || 0;
		var n = this.texts.length;
		var dx = x - this.widths[0];
		for(var i=0;i<n;++i){
			this.texts[i].offX = (this.widths[i]+=dx);
			this.texts[i].offY = y;
		}
		this.widths[n]+=dx;
	}
	
	this.scaleTo = function(sca){
		this.scale = sca || 1;
	}
	
	// interface
	this.ANIM = function(anim){
		anim.init([x,y,scale],function(type, para){
			switch(type){
				case 'trans':
					this.moveTo(para[0], para[1]);
					break;
				case 'scale':
					this.scaleTo();
				this.scaleTo();
					break;
			}
		}.bind(this));
	}
}
Text.prototype = new Canvas.Child.SVG();

function setInterv(cb, time, ROOT){
	setTimeout(function(){
		if(cb.bind(ROOT)()) setTimeout(arguments.callee, time);
	},time);
}


GLOBAL.C = C;
GLOBAL.V = V;

GLOBAL.Canvas = Canvas;

GLOBAL.XML = XML;
GLOBAL.FFmpeg = FFmpeg;
GLOBAL.SVG = SVG;

GLOBAL.Text = Text;

GLOBAL.setInterv = setInterv;
