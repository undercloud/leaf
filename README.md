# leaf
PHP DOM Generator

simple example
```PHP
	$l = new Undercloud\Leaf();

	$l->el('html')
		->el('body')
			->el('h1#id.classname','Heading')->end
			->el('p',array('class' => 'article'),'Lorem ipsum...')->end
			->el('input:text',array('value'=>'text'))
		->end
	->end;

	echo $l;
```

##constructor

```PHP
	$l = new Undercloud\Leaf(
		array(
			//format tree
			'format' => true
			//define own single tags
			'selfclosing' => array(...) 
		)
	);

```

##methods
**el** - create element
```PHP
$l->el('tag')
```
or
```PHP
$l->el('tag','text')
```
or
```PHP
$l->el('tag',array $attr)
```
or
```PHP
$l->el('tag',array $attr,'text')
```

You can combine tag with #id and .classname shortcut e.g.
```PHP
$l->el('span#id.classname.anotherclass')
```
Input[type] attr helper for button,checkbox,file,hidden,image,password,radio,reset,submit,text e.g.
```PHP
$l->el('input:text')
```

Single attr helper for 'checked','disabled','readonly','required','multiple e.g.
```PHP
$l->('select:multiple')
```

**text** - create text node
```PHP
$l->text('any content')
```

**end** - close tag
```PHP
$l->end()
```

##helpers
**init** - create instance
```PHP
Undercloud\Leaf::init($opt = array())
```
**escape** - escape special chars
```PHP
Leaf::escape($s)
```
