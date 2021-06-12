function sendEv(cli,scr,page,type,ele){
	const target = ele || document;
	const touch = new Touch({
		identifier: Date.now(),
		target: target,
		clientX: cli[0],
		clientY: cli[1],
		screenX: scr[0],
		screenY: scr[1],
		pageX: page[0],
		pageY: page[1],
		radiusX: 2.5,
		radiusY: 2.5,
		rotationAngle: 0.0,
		force: 1
	});
	
	const touchEv = new TouchEvent(type, {
		cancelable: true,
		bubbles: true,
		composed: true,
		touches: [touch],
		targetTouches: [touch],
		changedTouches: [touch]
	});
	
	target.dispatchEvent(touchEv);
}

document.onmousedown = function(ev){
	if(window.event){
		ev = window.event;
	}
	switch(ev.button){
		case 0:
			// Left Click
			sendEv([ev.clientX,ev.clientY], [ev.screenX,ev.screenY], [ev.pageX,ev.pageY], 'touchstart', ev.target);
			break;
		case 2:
			// Right Click
			break;
	}
}

document.onmousemove = function(ev){
	if(window.event){
		ev = window.event;
	}
	switch(ev.button){
		case 0:
			// Left Click
			sendEv([ev.clientX,ev.clientY], [ev.screenX,ev.screenY], [ev.pageX,ev.pageY], 'touchmove', ev.target);
			break;
		case 2:
			// Right Click
			break;
	}
}

document.onmouseup = function(ev){
	if(window.event){
		ev = window.event;
	}
	switch(ev.button){
		case 0:
			// Left Click
			sendEv([ev.clientX,ev.clientY], [ev.screenX,ev.screenY], [ev.pageX,ev.pageY], 'touchend', ev.target);
			break;
		case 2:
			// Right Click
			break;
	}
}
