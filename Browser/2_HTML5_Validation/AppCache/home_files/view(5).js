jQuery.extend({

	ToolsPageView: function(){
		var self = this;
		var listeners = new Array();
		
		$('#sendToServer').die('vclick');
		$('#sendToServer').live('vclick', function refresh(){
			notifySendQueueClicked();
		});

		$('#sendLogsToServer').die('vclick');
		$('#sendLogsToServer').live('vclick', function refresh(){
			notifySendLogsClicked();
		});
		
		this.update = function(lastOffline, lastOnline, queuedItems,averageBandwidth){
			$('#lastOffline').text(lastOffline);
			$('#lastOnline').text(lastOnline);
			$('#queuedItems').text(queuedItems);
			$('#averageBandwidth').text(averageBandwidth);			
		}
		
    	function notifySendQueueClicked(){
    		$.each(listeners, function(i){
    			listeners[i].sendLocalStorageClicked();
    		});
    	}
    	
    	function notifySendLogsClicked(){
    		$.each(listeners, function(i){
    			listeners[i].sendLogsClicked();
    		});
    	}
    	
		this.addListener = function(list){
			listeners.push(list);
		}
	},
	ToolsPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			sendLocalStorageClicked : function() { },
			sendLogsClicked : function() { }
		}, list);			
	}

});