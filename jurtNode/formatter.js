const fs = require('fs')

const argv = process.argv;

if(argv.length != 4){
	console.log('Usage: node form.js <c> <file>');
	return;
}

const opt = argv[2];
const path = argv[3];

var Content = '';

function output(str){
	// process.stdout.write(ch);
	Content += str;
}

try{
	var content = fs.readFileSync(path,'binary');
	var n = content.length-1;
	var ind = '';
	for(var i = 0; i < n; ++i){
		var ch = content.charAt(i);
		var ent = '';
		var useind = false;
		switch(ch){
			default:
				break;
			case '{':
				ind += '\t';
				ent = '\n';
				useind = true;
				break;
			case '}':
				prent = true;
				useind = true;
				// ind -= '\t';\
				ent = '\n\n';
				break;
			case ';':
				ent = '\n';
				useind = true;
				break;
			/* case ',':
				ent = '\n';
				break;*/
		}
		if(content.charAt(i+1) == '}'){
			ind = ind.substring(0,ind.length-1);
			useind = true;
			ent = '\n';
		}
		output(ch + ent + (useind?ind:''));
	}
	output('\n' + content.charAt(n) + '\n');
	// Fix
	Content = Content.replace(new RegExp('}\n\n\t*\\)','g'),'})');
	Content = Content.replace(new RegExp('}\n\n\t*\\,','g'),'},');
	Content = Content.replace(new RegExp('}\n\n\t*\\;','g'),'};');
	Content = Content.replace(new RegExp('{\n\t*}','g'),'{}');
	fs.writeFileSync(path + '.formed.js',Content);
}catch(e){
	console.log('Program error.');
	console.log(e);
}
