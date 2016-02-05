
/**
 * zoom
 * @desc zooming an img :-)
 * 
 * Bsp1. :
 
   <img src="test.jpg" width="" height="" alt="" />
   $('img').zoom(
   		 'bigImgSrc' : 'test2.jpg'
   		,'bigImgWidth' : 1000
   		,'bigImgHeight' : 1000
   );
   
 * Bsp2. :  
 
   <img src="test.jpg" width="" height="" alt="" data-img="test2.jpg" data-width="1000" data-height="1000" />
   $('img').zoom();
   
 * 
 * 
 * @param object
 * 		string bigImgSrc				src of the big img	
 * 		string bigImgWidth				width of the big img
 * 		string bigImgHeight				height of the big img
 * 		string orgImgWidth				width of the min img
 * 		string orgImgHeight				height of the min img
 * 		string zoomContainerWidth		width of the zoom container
 * 		string zoomContainerHeight		height of the zoom container
 */
(function($) {

	"use strict";

	$.fn.zoom = function(config) {

		var $self = $(this);

		/**
		 * container which contains the configions.
		*/
		var config =  $.extend({
				 'bigImgSrc'			: $self.data('img')
				,'bigImgWidth' 			: $self.data('width')
				,'bigImgHeight' 		: $self.data('height')
				,'orgImgWidth'			: $self.attr('width')
				,'orgImgHeight'			: $self.attr('height')
				,'zoomContainerWidth' 	: 300
				,'zoomContainerHeight' 	: 200
			}, config);

		var HANDLER = {
			mousemove : function(e) {

				var offset	=	$self.offset(),
					offsetX	=	offset.left,
					offsetY	=	offset.top,
					x 		=	e.pageX - offsetX,
					y		=	e.pageY - offsetY
				;

				/**
				 * move position of zoomContainer.
				*/
				$zoomContainer.css({
					 'top' 	: (e.clientY + 10)
					,'left' : (e.clientX + 10)
				});

				/**
				 * Subtract the container width and height to center the img in zoomContainer.
				*/
				$bigImg.css({
					 'top' 	: -((y * config['ratio']) - (config['zoomContainerWidth'] / 2))
					,'left' : -((x * config['ratio']) - (config['zoomContainerHeight'] / 2))
				
				});
			},

			mouseleave : function() {
				$zoomContainer.css({
					'left' : '-9999px'				
				});
			}
		};	
			
		if(	!config['bigImgWidth'] || !config['bigImgHeight'] || ! config['bigImgSrc'] ) {
			return false;
		}

		/**
		 * defines the ratio between big and small img.
		*/
		config['ratio'] = config['bigImgWidth'] / config['orgImgWidth']

		/**
		 * The big img for mousemove.
		*/		
		var $bigImg = $('<img>');
		$bigImg.attr( {
			'src' : config['bigImgSrc'],
			'width' : config['bigImgWidth'],
			'height' : config['bigImgHeight']
		} );

		/**
		 * Container for the big img insertet after the min img contains the zoom img.
		*/
		var $zoomContainer = $('<div class="zoom"></div>');
		$zoomContainer.insertAfter($self).html($bigImg).css({
			'position' : 'fixed',
			'width' : config['zoomContainerWidth'],
			'height' : config['zoomContainerHeight'],
		});
		
		/**
		 * binding the events
		*/
		$self
			.unbind('mouseenter')
			.bind('mousemove', HANDLER.mousemove )
			.bind('mouseleave', HANDLER.mousemove );

	}

})(jQuery);
