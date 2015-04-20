# leaf
PHP / JS DOM Generator

```PHP
	require 'leaf.php';

	$l = new Leaf();

	$l->el('html')
		->el('body')
			->el('h1','Heading')->end
			->el('p',array('class' => 'article'),'Lorem ipsum...')->end
			->el('input',array('type'=>'text'))
		->end
	->end;

	echo $l;
```
