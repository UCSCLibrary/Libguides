/* This file contains breakpoint.js and custom code for the UCSC Libguides site. Add this in the Custom JS/CSS box here: https://ucsc.libapps.com/libguides/lookfeel.php?action=1, wrapped in <script></script> tags. This is paseted after the css code.
/*
	Breakpoints.js
	version 1.0
	
	Creates handy events for your responsive design breakpoints
	
	Copyright 2011 XOXCO, Inc
	http://xoxco.com/

	Documentation for this plugin lives here:
	http://xoxco.com/projects/code/breakpoints
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php

*/
(function($) {

	var lastSize = 0;
	var interval = null;

	$.fn.resetBreakpoints = function() {
		$(window).unbind('resize');
		if (interval) {
			clearInterval(interval);
		}
		lastSize = 0;
	};
	
	$.fn.setBreakpoints = function(settings) {
		var options = jQuery.extend({
							distinct: true,
							breakpoints: new Array(320,480,768,1024)
				    	},settings);


		interval = setInterval(function() {
	
			var w = $(window).width();
			var done = false;
			
			for (var bp in options.breakpoints.sort(function(a,b) { return (b-a) })) {
			
				// fire onEnter when a browser expands into a new breakpoint
				// if in distinct mode, remove all other breakpoints first.
				if (!done && w >= options.breakpoints[bp] && lastSize < options.breakpoints[bp]) {
					if (options.distinct) {
						for (var x in options.breakpoints.sort(function(a,b) { return (b-a) })) {
							if ($('body').hasClass('breakpoint-' + options.breakpoints[x])) {
								$('body').removeClass('breakpoint-' + options.breakpoints[x]);
								$(window).trigger('exitBreakpoint' + options.breakpoints[x]);
							}
						}
						done = true;
					}
					$('body').addClass('breakpoint-' + options.breakpoints[bp]);
					$(window).trigger('enterBreakpoint' + options.breakpoints[bp]);

				}				

				// fire onExit when browser contracts out of a larger breakpoint
				if (w < options.breakpoints[bp] && lastSize >= options.breakpoints[bp]) {
					$('body').removeClass('breakpoint-' + options.breakpoints[bp]);
					$(window).trigger('exitBreakpoint' + options.breakpoints[bp]);

				}
				
				// if in distinct mode, fire onEnter when browser contracts into a smaller breakpoint
				if (
					options.distinct && // only one breakpoint at a time
					w >= options.breakpoints[bp] && // and we are in this one
					w < options.breakpoints[bp-1] && // and smaller than the bigger one
					lastSize > w && // and we contracted
					lastSize >0 &&  // and this is not the first time
					!$('body').hasClass('breakpoint-' + options.breakpoints[bp]) // and we aren't already in this breakpoint
					) {					
					$('body').addClass('breakpoint-' + options.breakpoints[bp]);
					$(window).trigger('enterBreakpoint' + options.breakpoints[bp]);

				}						
			}
			
			// set up for next call
			if (lastSize != w) {
				lastSize = w;
			}
		},250);
	};
	
})(jQuery);


/* Spencer.js scripts */

jQuery( document ).ready(function() {
	
	//replace sidebar with link for mobile
	jQuery( '<h2 class="hours-link"><a href="http://guides.library.ucsc.edu/libraryhours">Today\'s Hours</a></h2>' ).insertBefore( 'body.front #block-multisearch-multisearch' );
	jQuery ( 'body.front #sidebar' ).addClass('hidden');
	jQuery ( 'body.front .navbar' ).addClass('hidden');
	var viewportWidth = jQuery(window).width();
	if (viewportWidth > 767) {
		jQuery( 'body.front #sidebar' ).removeClass('hidden');
		jQuery( 'body.front .navbar' ).removeClass('hidden');
		jQuery ( 'body.front h2.hours-link' ).addClass('hidden');
		jQuery('.view-news').addClass('view-news-767plus');
	}
	
	
	//add classes to body
	jQuery('body').addClass('mobile');
	
	// modify the html of the secondary menu
	
	var menuButton = '<div class="menubutton">Menu</div>';
	jQuery( menuButton  ).insertBefore( '.header-secondary-menu ul.menu' );
	jQuery('.menubutton').click(function (e) {
		e.preventDefault();
    	jQuery('.header-secondary-menu ul.menu').toggle();
	});
	jQuery('.menu-toggle').siblings('.mega-hook').hide();
	jQuery('.research.menu-toggle').click(function () {
    	jQuery('.header-secondary-menu .mega-research').toggle();
	});
	jQuery('.services.menu-toggle').click(function () {
    	jQuery('.header-secondary-menu .mega-services').toggle();
	});
	jQuery('.collections.menu-toggle').click(function () {
    	jQuery('.header-secondary-menu .mega-collections').toggle();
	});
	jQuery('.about.menu-toggle').click(function () {
    	jQuery('.header-secondary-menu .mega-about').toggle();
	});

	if (viewportWidth > 860) {
		
		jQuery('.view-news').addClass('view-news-860plus');
		
		//remove mobile class to body
		jQuery('body').removeClass('mobile');
		jQuery('body').addClass('notmobile');
		
		//modify secondary menu
		jQuery('.header-secondary-menu ul.menu a.mainlink').removeClass('menu-toggle');
		jQuery('div.mega-hook').addClass('mega-menu');
		jQuery('.header-secondary-menu a.research').html('<span>Research</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>Tools & Help');
		jQuery('.header-secondary-menu a.services').html('<span>Services</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>Borrowing & Spaces');
		jQuery('.header-secondary-menu a.collections').html('<span>Collections</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>& Scholarly Communication');
		jQuery('.header-secondary-menu a.about').html('<span>About</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>Visit & Contact');
		
	}
	
	//modify the html of the site search text field
	//jQuery('.header-main-menu .form-type-textfield').html('<input type="text" id="edit-search-block-form--2" name="search_block_form" value="" size="15" maxlength="128" class="form-text" /><img class="search" src="https://library.ucsc.edu/sites/default/files/external/images/header-search.png">');
	
	// toggle the visibility of the site search text field when the spyglass graphic is clicked
	//jQuery ('.header-main-sitesearch form .form-text').addClass('form-hide');
	//jQuery('.header-main-sitesearch form .search').click(function (e) {
		//e.preventDefault();
    	//jQuery('.header-main-sitesearch form .form-text').toggle('fast');
	//});
	
	// collapse the sidebar on mobile
	  jQuery('[data-toggle=offcanvas]').click(function() {
    	jQuery('.row-offcanvas').toggleClass('active');
	  });
	
});


$(window).setBreakpoints({
	distinct: true,
	breakpoints: [
		767,
		860,
		1000,
		1350
	]
});

jQuery(window).bind('enterBreakpoint767',function() {
	jQuery('.view-news').addClass('view-news-767plus');
	
	jQuery( 'body.front #sidebar' ).removeClass('hidden');
	jQuery( 'body.front .navbar' ).removeClass('hidden');
	jQuery ( 'body.front h2.hours-link' ).addClass('hidden');
	
});

jQuery(window).bind('exitBreakpoint767',function() {
	//jQuery('.view-news').removeClass('view-news-767plus');
	jQuery ( 'body.front h2.hours-link' ).removeClass('hidden');
	
});


//changes to secondary menu
jQuery(window).bind('enterBreakpoint860',function() {
	
	jQuery('.view-news').addClass('view-news-860plus');
	
	jQuery( 'body.front #sidebar' ).removeClass('hidden');
	jQuery( 'body.front .navbar' ).removeClass('hidden');
	jQuery ( 'body.front h2.hours-link' ).addClass('hidden');
	
	//remove mobile class from body
		jQuery('body').removeClass('mobile');
	jQuery('body').addClass('notmobile');
	
	//changes to secondary menu
	jQuery('.header-secondary-menu ul.menu a.mainlink').removeClass('menu-toggle');
	jQuery('div.mega-hook').addClass('mega-menu');
	jQuery( '.header-secondary-menu ul' ).show();
	jQuery('.header-secondary-menu a.research').html('<span>Research</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>Tools & Help');
		jQuery('.header-secondary-menu a.services').html('<span>Services</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>Borrowing & Spaces');
		jQuery('.header-secondary-menu a.collections').html('<span>Collections</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>& Scholarly Communication');
		jQuery('.header-secondary-menu a.about').html('<span>About</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>Visit & Contact');
	
});

jQuery(window).bind('enterBreakpoint1000',function() {
	jQuery( 'body.front #sidebar' ).removeClass('hidden');
	jQuery( 'body.front .navbar' ).removeClass('hidden');
	jQuery ( 'body.front h2.hours-link' ).addClass('hidden');
		//remove mobile class from body
		jQuery('body').removeClass('mobile');
	jQuery('body').addClass('notmobile');
	
	//changes to secondary menu
	jQuery('.header-secondary-menu ul.menu a.mainlink').removeClass('menu-toggle');
	jQuery('div.mega-hook').addClass('mega-menu-mid');
	jQuery('div.mega-hook').removeClass('mega-menu-wide');
	jQuery('div.mega-hook').addClass('mega-menu');
	jQuery( '.header-secondary-menu ul' ).show();
	jQuery('.header-secondary-menu a.research').html('<span>Research</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>Tools & Help');
		jQuery('.header-secondary-menu a.services').html('<span>Services</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>Borrowing & Spaces');
		jQuery('.header-secondary-menu a.collections').html('<span>Collections</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>& Scholarly Communication');
		jQuery('.header-secondary-menu a.about').html('<span>About</span><img src="https://library.ucsc.edu/sites/default/files/external/images/header-menu-arrow.png" alt="navigation arrow"><br>Visit & Contact');
});

jQuery(window).bind('exitBreakpoint1000',function() {
	jQuery('.view-news').addClass('view-news-860plus');
	jQuery('div.mega-hook').removeClass('mega-menu-mid');
	
});
	
jQuery(window).bind('exitBreakpoint860',function() {
	jQuery('.view-news').removeClass('view-news-860plus');
	jQuery('div.mega-hook').removeClass('mega-menu-mid');
	
	//add mobile class to body
	jQuery('body').addClass('mobile');
	jQuery('body').removeClass('notmobile');
	
	//mega menu scripts
	jQuery('.mega-research').hide();
	jQuery('.mega-services').hide();
	jQuery('.mega-collections').hide();
	jQuery('.mega-about').hide();

//changes to secondary menu
	jQuery('.header-secondary-menu ul.menu a.mainlink').addClass('menu-toggle');
	jQuery('div.mega-hook').removeClass('mega-menu');
	jQuery('.header-secondary-menu ul.menu').hide();
	jQuery('.header-secondary-menu a.research').html('Research');
	jQuery('.header-secondary-menu a.services').html('Services');
	jQuery('.header-secondary-menu a.collections').html('Collections');
	jQuery('.header-secondary-menu a.about').html('About');
	
});

jQuery(window).bind('enterBreakpoint1350',function() {
	jQuery('.view-news').addClass('view-news-860plus');
	jQuery('div.mega-hook').removeClass('mega-menu-mid');
	jQuery('div.mega-hook').addClass('mega-menu-wide');
});

jQuery(window).bind('exitBreakpoint1350',function() {
});

jQuery( document ).ready(function() {
					//mega-menu scripts
	jQuery( "li.research" ).mouseover(function() {
		if ($('body').hasClass('notmobile')) {
			jQuery('.mega-research').show();
		}
	});
	jQuery( "li.services" ).mouseover(function() {
		if ($('body').hasClass('notmobile')) {
			jQuery('.mega-services').show();
		}
	});
	jQuery( "li.collections" ).mouseover(function() {
		if ($('body').hasClass('notmobile')) {
			jQuery('.mega-collections').show();
		}
	});
	jQuery( "li.about" ).mouseover(function() {
		if ($('body').hasClass('notmobile')) {
			jQuery('.mega-about').show();
		}
	});
	
});

(function ($) {

  $(function () {
    var googleCSEWatermark = function (id) {
      var f = $(id)[0];
      if (f && (f.query || f['edit-search-block-form--2'] || f['edit-keys'])) {
        var q = f.query ? f.query : (f['edit-search-block-form--2'] ? f['edit-search-block-form--2'] : f['edit-keys']);
        var n = navigator;
        var l = location;
        if (n.platform == 'Win32') {
          q.style.cssText = 'border: 1px solid #7e9db9; padding: 2px;';
        }
        var b = function () {
          if (q.value == '') {
            q.style.background = '#FFFFFF url(https://cse.google.com/cse/intl//images/google_custom_search_watermark.gif) left no-repeat';
          }
        };
        var f = function () {
          q.style.background = '#ffffff';
        };
        q.onfocus = f;
        q.onblur = b;
//      if (!/[&?]query=[^&]/.test(l.search)) {
        b();
//      }
      }
    };
    googleCSEWatermark('#search-block-form.google-cse');
    googleCSEWatermark('#search-form.google-cse');
    googleCSEWatermark('#google-cse-results-searchbox-form');
  }); 
})(jQuery);