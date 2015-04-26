# leaf
PHP / JS DOM Generator

simple example
```PHP
	require 'leaf.php';

	$l = new Leaf();

	$l->el('html')
		->el('body')
			->el('h1#id.classname','Heading')->end
			->el('p',array('class' => 'article'),'Lorem ipsum...')->end
			->el('input',array('type'=>'text'))
		->end
	->end;

	echo $l;
```

##constructor

```PHP
	$l = new Leaf(
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

**text** - create text node
```PHP
$l->text('any content')
```

**end** - close tag
#l->end()

##helpers
**init** - create instance
```PHP
Leaf::init($opt = array())
```
**escape** - escape special chars
```PHP
Leaf::escape($s)
```
