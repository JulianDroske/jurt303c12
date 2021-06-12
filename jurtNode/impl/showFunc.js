require('../JuRt.js');

function f(x){
	return Math.pow(x|0,2);
}

var width = 800;
var height = 600;
var oriX = width / 2;
var oriY = height / 2;
var xScale = 10;
var yScale = 1;

var c = new Canvas(width, height, width, height, true);

// X,Y
c.setStrokeColor((128<<16)+(255<<8)+255);
c.drawLine(0, oriY, width, oriY);
c.drawLine(oriX, 0, oriX, height);
c.setStrokeColor(255<<16);

for(var X=0; X<width; ++X){
	var x = X-oriX;
	var y = (f(x/xScale)+oriY)*yScale;
	// X==0? c.moveTo(X, y) : c.lineTo(X, y);
	c.drawPixel(X, y);
}

c.stroke();
c.outputMPEG(true);
