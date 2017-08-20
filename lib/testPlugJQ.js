(function( $ ){

	var methods = {
		init : function( options ) {

			return this.each(function(){

				// проверка инициализации плагина
				var $this = $(this),
				data = $this.data('testPlug'),
				testPlug = $('<div />', {
					text : $this.attr('title')
				});

				// если плагин ещё не проинициализирован
				if ( !data ) {

					// инициализация
					$(this).bind('click.testPlug', methods.increase);
					$(this).bind('contextmenu.testPlug', methods.decrease);
					$(this).bind('mouseenter.testPlug', methods.textRed);
					$(this).bind('mouseleave.testPlug', methods.textBlack);

					$(this).data('testPlug', {
						target : $this,
						testPlug : testPlug
					});

				}
			});
		},
		destroy : function( ) {

			return this.each(function(){

				var $this = $(this),
				data = $this.data('testPlug');

				$(window).unbind('.testPlug');
				data.tooltip.remove();
				$this.removeData('testPlug');

			})

		},
		increase : function(e) { 
			/* Прибавление трех элементов  */ 
			console.log('click.testPlug');
			var $e_ = $(this).children(":last-child");
			if ($e_[0].tagName == 'P') {
				for (i=0; i<3; i++) {
					$e_.clone().appendTo(this);
				}
			}
		},
		decrease : function(e) { 
			/* Удаление элемента  */ 
			console.log('dblclick.testPlug');
			var $e_ = $(this).children(":last-child");
			if ($e_[0].tagName == 'P') {
				$e_.remove();
				return false;
			}
		},
		textRed : function( ) { 
			/* Сделать текст красным  */ 
			console.log('show.testPlug');
			$(this).css("color", "red");
		},
		textBlack : function( ) { 
			/* Сделать текст черным */ 
			console.log('hide.testPlug');
			$(this).css("color", "black");
		}
	};

	$.fn.testPlug = function( method ) {

		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.testPlug' );
		}    

	};

})( jQuery );