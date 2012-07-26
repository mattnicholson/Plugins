window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

/* AUTOEMPTY PLUGIN
-------------------------------------
*/
	
(function($){
 $.fn.autoEmpty = function(options,settings) {
    
  var defaults = {
  	
  };
  
  var options = $.extend(defaults, options);
  var items = [];
			  
  this.each(function() {
  	if($(this).attr('value') == '') $(this).attr('value',$(this).attr('data-placeholder'));
		$(this).focus(function(){
			if($(this).attr('value') == $(this).attr('data-placeholder')) $(this).attr('value','');
		});
		
		$(this).blur(function(){
			if($(this).attr('value') == '') $(this).attr('value',$(this).attr('data-placeholder'));
		});   
  }); // End each
  
  
 };
})(jQuery);

/* IMAGES LOADED PLUGIN
-------------------------------------
*/

/*!
 * jQuery imagesLoaded plugin v2.0.1
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

/*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
/*global jQuery: false */

;(function($, undefined) {
'use strict';

// blank image data-uri bypasses webkit log warning (thx doug jones)
var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

$.fn.imagesLoaded = function( callback ) {
	var $this = this,
		deferred = $.isFunction($.Deferred) ? $.Deferred() : 0,
		hasNotify = $.isFunction(deferred.notify),
		$images = $this.find('img').add( $this.filter('img') ),
		loaded = [],
		proper = [],
		broken = [];

	function doneLoading() {
		var $proper = $(proper),
			$broken = $(broken);

		if ( deferred ) {
			if ( broken.length ) {
				deferred.reject( $images, $proper, $broken );
			} else {
				deferred.resolve( $images );
			}
		}

		if ( $.isFunction( callback ) ) {
			callback.call( $this, $images, $proper, $broken );
		}
	}

	function imgLoaded( img, isBroken ) {
		// don't proceed if BLANK image, or image is already loaded
		if ( img.src === BLANK || $.inArray( img, loaded ) !== -1 ) {
			return;
		}

		// store element in loaded images array
		loaded.push( img );

		// keep track of broken and properly loaded images
		if ( isBroken ) {
			broken.push( img );
		} else {
			proper.push( img );
		}

		// cache image and its state for future calls
		$.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

		// trigger deferred progress method if present
		if ( hasNotify ) {
			deferred.notifyWith( $(img), [ isBroken, $images, $(proper), $(broken) ] );
		}

		// call doneLoading and clean listeners if all images are loaded
		if ( $images.length === loaded.length ){
			setTimeout( doneLoading );
			$images.unbind( '.imagesLoaded' );
		}
	}

	// if no images, trigger immediately
	if ( !$images.length ) {
		doneLoading();
	} else {
		$images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
			// trigger imgLoaded
			imgLoaded( event.target, event.type === 'error' );
		}).each( function( i, el ) {
			var src = el.src;

			// find out if this image has been already checked for status
			// if it was, and src has not changed, call imgLoaded on it
			var cached = $.data( el, 'imagesLoaded' );
			if ( cached && cached.src === src ) {
				imgLoaded( el, cached.isBroken );
				return;
			}

			// if complete is true and browser supports natural sizes, try
			// to check for image status manually
			if ( el.complete && el.naturalWidth !== undefined ) {
				imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
				return;
			}

			// cached images don't fire load sometimes, so we reset src, but only when
			// dealing with IE, or image is complete (loaded) and failed manual check
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			if ( el.readyState || el.complete ) {
				el.src = BLANK;
				el.src = src;
			}
		});
	}

	return deferred ? deferred.promise( $this ) : $this;
};

})(jQuery);

/* HAS ATTRIBUTE PLUGIN
--------------------------------------
- Description: Check if an element has an attribute
- Author: 

*/
(function($){
	$.fn.hasAttr = function(name) {  
	   return this.attr(name) !== undefined;
	};
})(jQuery);

/* FIT PARENT PLUGIN
--------------------------------------

- Description: Ensure image is visible either by making width or height 100% depending on parent dimensions
- Author: matt@archivestudio.co.uk

*/

(function($){
 $.fn.fitParent = function(options,settings) {
    
  var defaults = {
  	centre : 1
  };
  
  var options = $.extend(defaults, options);
  var items = [];
			  
  this.each(function() {
  	var $item = $(this);
	items.push($item);    
  }); // End each
  
  for(var i in items){
	var $item = items[i];
	
	// Store some data about the image
	if(!$item.hasAttr('orig-height')){
		$item.attr('orig-height',$item.height());
		$item.attr('orig-width',$item.width());
		$item.attr('h-ratio',$item.height() / $item.width());
		$item.attr('w-ratio',$item.width() / $item.height());
	}
	
	// How big is the parent?
	var ph = $item.parent().height();
	var pw = $item.parent().width();
	
	// What's the parent ratio?
	
	var pr = (ph / pw);
	
	// How big is the image?
	
	var ih = $item.attr('orig-height');
	var iw = $item.attr('orig-width');
	var ir = $item.attr('h-ratio');
	
	
	// Should the image height be max or the image width be max?
	if(pr >= ir){
		
		// New height is 100%, so we need to center the width
		var ratio = parseFloat($item.attr('w-ratio'));
		var cm = Math.round(ph * ratio);
		
	
		
		// Container is portrait - make image fit to height
		$item.css({'width':cm,'height':'100%'});
		
		if(options.centre){
			$item.css({'top':0,'left':'50%','margin-top':0,'margin-left':-(cm/2)});
		}
		
	}else{
		
		// New width is 100%, so we need to center the height
		var ratio = parseFloat($item.attr('h-ratio'));
		var cm = Math.round(pw * ratio);
		
		// Container is landscape - make image fit to width
		$item.css({'width':'100%','height':cm});
		
		if(options.centre){
			$item.css({'left':0,'top':'50%','margin-left':0,'margin-top':-(cm/2)});
		}
	}
	
	
	
  } // End For
  
 };
})(jQuery);

/*
VERTICAL CENTER PLUGIN
-----------------------------------
Author: matt@archivestudio.co.uk
*/

(function($){
 $.fn.verticalCenter = function(options,settings) {
    
  var defaults = {
  	
  };
  
  var options = $.extend(defaults, options);
  var items = [];
			  
  this.each(function() {
  	var $item = $(this);
	items.push($item);    
  }); // End each
  
  for(var i in items){
	var $item = items[i];	
	$item.css({'padding-top':0,'padding-bottom':0,'height':'auto'});
	var ph = $item.parent().height();
	var ih = $item.height();
	var diff = ph - ih;
	if(diff > 0){
		var pad = Math.floor(diff/2);
		$item.css({'padding-top':pad,'padding-bottom':pad});
	}
	
		
  } // End For
  
 };
})(jQuery);



/* RAND
------------------------------*/

function rand (min, max) {
    // http://kevin.vanzonneveld.net
    // +   original by: Leslie Hoare
    // +   bugfixed by: Onno Marsman
    // %          note 1: See the commented out code below for a version which will work with our experimental (though probably unnecessary) srand() function)
    // *     example 1: rand(1, 1);
    // *     returns 1: 1
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;

/*
    // See note above for an explanation of the following alternative code
    
    // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: srand
    // %          note 1: This is a very possibly imperfect adaptation from the PHP source code
    var rand_seed, ctx, PHP_RAND_MAX=2147483647; // 0x7fffffff

    if (!this.php_js || this.php_js.rand_seed === undefined) {
        this.srand();
    }
    rand_seed = this.php_js.rand_seed;

    var argc = arguments.length;
    if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }

    var do_rand = function (ctx) {
        return ((ctx * 1103515245 + 12345) % (PHP_RAND_MAX + 1));
    };

    var php_rand = function (ctxArg) { // php_rand_r
        this.php_js.rand_seed = do_rand(ctxArg);
        return parseInt(this.php_js.rand_seed, 10);
    };

    var number = php_rand(rand_seed);

    if (argc === 2) {
        number = min + parseInt(parseFloat(parseFloat(max) - min + 1.0) * (number/(PHP_RAND_MAX + 1.0)), 10);
    }
    return number;
    */
}

/*
NO CACHE IMAGE PLUGIN
-----------------------------------
Author: matt@archivestudio.co.uk
*/

(function($){
 $.fn.nocacheImg = function(options,settings) {
    
  var defaults = {
  	
  };
  
  var options = $.extend(defaults, options);
	if(this.length){		  
  this.each(function() {
  	var $img = $(this).find('img');
	var src = $img.attr('src');
	src = src.replace(/\.jpg(.*)/,'.jpg?nocache='+rand());
	$img.attr('src',src);
	$img.show();    
  }); // End each
  }
 };
})(jQuery);


