var networking = {}

//constructor
networking.NetworkStatus = function() {
	
}

networking.NetworkStatus.prototype.checkNetworkStatus = function(async) {
	networkStatusSelf = this;
	
	networkStatusSelf.checkStart();
	if (async === undefined)
	{
		async = true;
	}
    if (navigator.onLine) {
    	var ctx = localStorage.getItem('ctx');
        // Just because the browser says we're online doesn't mean we're online. The browser lies.
        // Check to see if we are really online by making a call for a static JSON resource on
        // the originating Web site. If we can get to it, we're online. If not, assume we're
        // offline.

    	var sDate = new Date();
        $.ajax({
            async: async,
            cache: false, // don't cache request
            dataType: "json",
    		error: function(response, status, request){
        	 	var eDate = new Date();      		  	
      		    consoleLog("Offline at:"+(eDate.getTime()-sDate.getTime()));
                // We might not be technically "offline" if the error is not a timeout, but
                // otherwise we're getting some sort of error when we shouldn't, so we're
                // going to treat it as if we're offline.
                // Note: This might not be totally correct if the error is because the
                // manifest is ill-formed.
            	networkStatusSelf.setOnline(false);
            	networkStatusSelf.checkFinish();
            },
            success: function (data, status, req) {
           	 	var eDate = new Date();
           	    consoleLog("Online at:"+(eDate.getTime()-sDate.getTime()));           	
            	networkStatusSelf.setOnline(true);
            	networkStatusSelf.checkFinish();
            },
            timeout: 5000,
            type: "GET",
            // use absolute path or some browsers think it's cross-domain for some reason
            url: window.location.protocol+"//"+window.location.host + ctx + "/mobile/js/ping.js"
        });
    }
    else {
    	networkStatusSelf.setOnline(false);
    	networkStatusSelf.checkFinish();
    }
}

/** called before online-offline check starts */
networking.NetworkStatus.prototype.checkStart = function(){
	
}
/** called after online-offline check has been performed */
networking.NetworkStatus.prototype.checkFinish = function(){
	
}
 
//function to be overridden called after the check was performed
//isOnline - true then we where able to contact the server, otherwise false 
networking.NetworkStatus.prototype.setOnline = function(isOnline){
}

networking.CacheUpdate = function() {
	var registered = false;
}

networking.CacheUpdate.prototype.logEvent = function(e) {
    var cacheStatusValues = [];
    cacheStatusValues[0] = 'uncached';
    cacheStatusValues[1] = 'idle';
    cacheStatusValues[2] = 'checking';
    cacheStatusValues[3] = 'downloading';
    cacheStatusValues[4] = 'updateready';
    cacheStatusValues[5] = 'obsolete';
	
    var online, status, type, message;
    online = offline() ? 'no' : 'yes';
    status = cacheStatusValues[window.applicationCache.status];
    type = e.type;
    message = 'online: ' + online;
    message+= ', event: ' + type;
    message+= ', status: ' + status;
    if (type == 'error' && !offline()) {
        message+= ' (possible invalid syntax error in manifest)';
        remoteLogger('Application cache update error','na', JSON.stringify(e), 3);
    }
    if(type == 'downloading'){
    	//show loading message this will be hidden after page reload caused by updateready listener
    	$.mobile.showPageLoadingMsg();
    	$('#loginButton').addClass('ui-disabled');
    }else if(type == 'cached'){
        //first time we visit the page we get this event
        //and page won't get reloaded so hide the message
    	$('#loginButton').removeClass('ui-disabled');
    	
        //if we are on the login page reload the page
        if($.mobile.activePage != undefined && $.mobile.activePage.attr('id') == 'login'){
	    	window.location = localStorage.ctx + '/mobile/login.jsp';
        }else{
        	//hide the progress bar as user is on other page the login, 
        	//update to the app will get applied after next login page refresh
        	$.mobile.hidePageLoadingMsg();
        }
    	
    }
    consoleLog(message);
}

networking.CacheUpdate.prototype.registerListeners = function(){
	if(this.registered){
		return;
	}
	this.registered = true;
	
    var cache = window.applicationCache;
    cache.addEventListener('cached', this.logEvent, false);
    cache.addEventListener('checking', this.logEvent, false);
    cache.addEventListener('downloading', this.logEvent, false);
    cache.addEventListener('error', this.logEvent, false);
    cache.addEventListener('noupdate', this.logEvent, false);
    cache.addEventListener('obsolete', this.logEvent, false);
    cache.addEventListener('progress', this.logEvent, false);
    //cache.addEventListener('updateready', logEvent, false);
    
    cache.addEventListener('updateready',
    	function(){
        	consoleLog('before swapCache()');
        	$('#loginButton').addClass('ui-disabled');
            try {
            	cache.swapCache();
    	    	consoleLog('Application updated');
            	$('#loginButton').removeClass('ui-disabled');
            	
    	        //if we are on the login page reload the page
    	        if($.mobile.activePage != undefined && $.mobile.activePage.attr('id') == 'login'){
    		    	window.location = localStorage.ctx + '/mobile/login.jsp';
    	        }else{
    	        	//hide the progress bar as user is on other page the login, 
    	        	//update to the app will get applied after next login page refresh
    	        	$.mobile.hidePageLoadingMsg();
    	        }
            }catch(e){
            	consoleLog('Error cache.swapCache' + e);
            	$('#loginButton').removeClass('ui-disabled');
            }
    	},
        false
    );
}

networking.CacheUpdate.prototype.checkForUpdate = function(){
	consoleLog('checkForUpdate');
	this.registerListeners();
    //setInterval(function(){
    	try {
    		consoleLog("cache status: "+window.applicationCache.status);
    		if (window.applicationCache.status != 3) // already downloading
    		{
    			consoleLog('cache.update - init');
	    		window.applicationCache.update();
	    		consoleLog('cache.update - ok');
    		}
    	}catch(e){
    		consoleLog('Error cache.update()' + e);	
    	}
    //}, 10000);
}