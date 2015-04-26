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

constructor

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
