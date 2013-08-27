
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
		
		/**
		 * @desc binding the _self to an var
		*/
		var _self = $(this);

		/**
		 * config
		 * @desc container which contains the configions
		*/
		var config =  $.extend({
				 'bigImgSrc'			: _self.data('img')
				,'bigImgWidth' 			: _self.data('width')
				,'bigImgHeight' 		: _self.data('height')
				,'orgImgWidth'			: _self.attr('width')
				,'orgImgHeight'			: _self.attr('height')
				,'zoomContainerWidth' 	: 300
				,'zoomContainerHeight' 	: 200
			}, config);

		if(		typeof(config['bigImgWidth']) === "undefined" 
			||  typeof(config['bigImgHeight']) === "undefined" 
			|| typeof(config['bigImgSrc']) === "undefined"
		){
			return false;
		}

		/**
		 * @param config ration		defines the ratio between big and small img
		*/
		config['ratio'] = config['bigImgWidth'] / config['orgImgWidth']

		/**
		 * bigImg
		 * @desc _self with big img for mousemove
		*/		
		var bigImg = $('<img src="' + config['bigImgSrc'] + '" width="' + config['bigImgWidth'] + '" height="' + config['bigImgHeight'] + '" />');

		/**
		 * zoomContainer
		 * @desc container for the big img
				 insertet after the min img
				 contains the zoom img
		*/
		var zoomContainer = $('<div class="zoom"></div>')
					.insertAfter(_self)
					.html(bigImg)
					.css({
						 'position' : 'fixed'
						,'width' : config['zoomContainerWidth']
						,'height' : config['zoomContainerHeight']
					});
		
		/**
		 * mousemove
		 @desc event for mousemove over the min img
		*/
		_self.unbind('mouseenter').bind('mousemove', function(e){

			var offset	=	_self.offset(),
				offsetX	=	offset.left,
				offsetY	=	offset.top,
				x 		=	e.pageX - offsetX,
				y		=	e.pageY - offsetY
			;

			/**
			 * @desc position the zoomContainer
			*/
			zoomContainer.css({
				 'top' 	: (e.clientY + 10)
				,'left' : (e.clientX + 10)
			});

			/**
			 * @desc position the big Img
					 subtract the container width and height to center the img in zoomContainer
			*/
			bigImg.css({
				 'top' 	: -((y * config['ratio']) - (config['zoomContainerWidth'] / 2))
				,'left' : -((x * config['ratio']) - (config['zoomContainerHeight'] / 2))
			
			});
		})
		.bind('mouseleave', function(e){

			zoomContainer.css({
				'left' : '-9999px'				
			});

		});

	}

})(jQuery);