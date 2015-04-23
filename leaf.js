(function(){
	"use strict";

	window.leaf = function(o) {
		var format = false;
		var level = 0;
		var tags_stack = [];
		var fill_stack = [];
		var selfclosing = ['area','base','br','col', 'command', 'embed','hr', 'img', 'input','keygen','link','meta','param','source','track','wbr'];
		var content = '';

		if(typeof o == 'undefined')
			o = {}

		if(typeof o.selfclosing != 'undefined')
			selfclosing = o.selfclosing;

		if(typeof o.format != 'undefined')
			format = o.format;

		var htmlentities = function(s){
			var pre = document.createElement('pre');
	   		var text = document.createTextNode(s);
			pre.appendChild(text);
			
	    	return pre.innerHTML;
		}

		this.el = function(tag){
			var attr = {},
				text = '',
				args = arguments;

			switch(args.length){
				case 2:
					if(args[1] === Object(args[1]))
						attr = args[1];	  
					else
						text = args[1];
				break;

				case 3:
					attr = args[1];
					text = args[2];
				break;
			}

			tag = tag.replace(/(\.|\#|\:)([A-Za-z]+)/g,function(a,b,c){
				switch(b){
					case '.':
						if(typeof attr['class'] != 'undefined')
							attr['class'] += ' ' + c
						else
							attr['class'] = c; 
					break;

					case '#':
						attr['id'] = c;
					break;

					case ':':
						if(-1 != ['button','checkbox','file','hidden','image','password','radio','reset','submit','text'].indexOf(c)){
							attr['type'] = c;
						}else if(-1 != ['checked','disabled','readonly','required','multiple'].indexOf(c)){
							attr[c] = c;
						}
					break;
				}

				return '';
			})

			var inline = [];

			for(var x in attr){
				if(attr.hasOwnProperty(x)){
					if('style' == x && (attr[x] == Object(attr[x]))){
						var s = [];
						for(var y in attr[x]){
							if(attr[x].hasOwnProperty(y)){
								s.push(y + ':' + attr[x][y]);
							}
						}

						inline.push(x + '="' + htmlentities(s.join(';')) + '"');
					}else{
						inline.push(x + '="' + htmlentities(attr[x]) + '"');
					}
				}
			}

			var space = '';

			if(true === format)
				var indent = new Array(level + 1).join('  ');

			var closed = (-1 != selfclosing.indexOf(tag));

			if(false == closed){
				tags_stack.push(tag);
				level++;
			}

			if(true === format){
				fill_stack.push(false == closed && text != '');
				space = (level > 1 ? ('\n' + indent) : '');
			}

			content += space + '<' + tag + (inline.length ? (' ' + inline.join(' ')) : '') + (closed ? ' />' : '>') + text;
	   
			return this;
		}

		this.end = function(){
			var space = '';
			level--;

			if(true === format){
				var indent = new Array(level + 1).join('  ');
				space = (false == fill_stack.pop() ? ('\n' + indent) : '');
			}

			content += space + '</' + tags_stack.pop() + '>';

			return this;
		}

		this.toString = function(){
			return content;
		}
	}
})()
