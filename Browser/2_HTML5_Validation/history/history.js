(function($) {
	
	"use strict";

	/* check for support before we move ahead */
	if (typeof history.pushState !== "undefined") {
    
    	$('nav').find('li').find('a').live('click',function(){
    		
    		var href = $(this).attr('href');
    		
    		$('#main').html('<img src="loading.gif" alt="loading content">').load(href + ' #main', function(){
    			$(this).find('#main').unwrap();
    			$('#main').hide().fadeIn(500)
    			
    			// get the new page title
    			var title = $('#main').find('h1').text();
    			
    			// update the page <title>
    			$('head').find('title').text(title);
    		
    			// do a history push to change the URL
    			history.pushState(null, title, href);
    			   			
    		});

    		return false;
    		
    	});

	}
	
}(jQuery));