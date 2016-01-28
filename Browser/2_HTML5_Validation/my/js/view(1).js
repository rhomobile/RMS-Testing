jQuery.extend({
	/**
	 * Services page contains a list of services
	 * for a client
	 */
	ServicesPageView: function(){
		var self = this;
		var listeners = new Array();

		//unregister if we were on this page before
		$('a.serviceLink').die('vclick');
	    $('a.serviceLink').live('vclick', function(event, ui) {
	        event.preventDefault();
	    	consoleLog('click:service link');
			var serviceId = $(this).jqmData('identifier');
			consoleLog('serviceId clicked'+serviceId);
			self.notifyItemClicked(serviceId);
		});
		
		$('#refreshServiceList').die('vclick');
		$('#refreshServiceList').live('vclick', function(event){
			consoleLog('refreshServiceList');
			self.notifyRefreshClicked();
		});
	    
		/** updates page layout */
		this.updateLayout = function(){
			$('#serviceList #list').trigger('updatelayout');
		}
		
		this.updateList = function(services){
			consoleLog('services:view:updateList' + new Date().getTime());
			var servicesList = $('#serviceList #list');
			servicesList.empty();
			for(var i = 0; i < services.length; i++){
				var row = ich.serviceRow(services[i]);
				servicesList.append(row);
			}
			servicesList.listview('refresh');
			consoleLog('services:view:updateList:refreshed'+new Date().getTime());
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyItemClicked = function(serviceId){
    		$.each(listeners, function(i){
    			listeners[i].itemClicked(serviceId);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
	},
	ServicesPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			itemClicked : function(serviceId) { },
			refreshClicked : function() { }
		}, list);			
	}

});
