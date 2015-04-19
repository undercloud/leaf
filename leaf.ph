<?php
	class Leaf 
	{
		private $format = false;
		private $level = 0;
		private $tags_stack = array();
		private $fill_stack = array();
		private $selfclosing = array('area','base','br','col', 'command', 'embed','hr', 'img', 'input','keygen','link','meta','param','source','track','wbr');
		private $content = '';

		public function __construct($o = array())
		{
			if(isset($o['selfclosing']))
				$this->selfclosing = $o['selfclosing'];

			if(isset($o['format']))
				$this->format = $o['format'];
		}

		public static function init($o = array())
		{
			return new self($o);
		}

		public function el($tag)
		{
			$attr = array();
			$text = null;
			$args = func_get_args();

			switch(count($args)){
				case 2:
					if(is_array($args[1]))
						$attr = $args[1];	  
					else
						$text = $args[1];
				break;

				case 3:
					$attr = $args[1];
					$text = $args[2];
				break;
			}
 
			if($attr){
				array_walk($attr,function(&$a, $b){
					if(is_numeric($b)){
						$a = htmlentities($a,ENT_QUOTES,'UTF-8',false);
					}else{
						if('style' == $b and is_array($a)){
							array_walk($a,function(&$x, $y){
								$x = ($y . ':' . $x);
							});

							$a = implode(';',$a);
						}

						$a = $b . '="' . htmlentities($a,ENT_QUOTES,'UTF-8',false) . '"';
					}
				});
			}

 			$space = '';

 			if(true === $this->format)
				$indent = str_repeat('  ',$this->level);

			$closed = in_array($tag,$this->selfclosing);

			if(false == $closed){
				$this->tags_stack[] = $tag;
				$this->level++;
			}

			if(true === $this->format){
				$this->fill_stack[] = (false == $closed and $text !== null);
				$space = ($this->level > 1 ? (PHP_EOL . $indent) : '');
			}

			$this->content .= $space . '<' . $tag . ($attr ? (' ' .implode(' ',$attr)) : '') . ($closed ? ' />' : '>') . $text;
	   
			return $this;
		}
 
		public function end()
		{
			$space = '';
			$this->level--;

			if(true === $this->format){
				$indent = str_repeat('  ',$this->level);
				$space = (false == array_pop($this->fill_stack) ? (PHP_EOL . $indent) : '');
			}

			$this->content .= $space . '</' . array_pop($this->tags_stack) . '>';

			return $this;
		}
 
		public function __toString()
		{
			return $this->content;
		}
	}
?>
