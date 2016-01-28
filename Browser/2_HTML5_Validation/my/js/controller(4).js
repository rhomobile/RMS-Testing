jQuery.extend({
	ToolsPageController: function (model, view){
		
		selfConntroler = this;
		
		/**
		 * Listen to the view
		 */
		var viewListener = $.ToolsPageViewListener({
			sendLocalStorageClicked : function() { 
				model.sendLocalStorageToLogs();
			},
			sendLogsClicked : function() { 
				model.sendLogsToServer();
			}			
		});
		view.addListener(viewListener);
		
		var modelListener = $.ToolsPageModelListener({
			loadBegin    : function() { 
				$.mobile.showPageLoadingMsg();
			},
			loadFinish   : function(lastOffline, lastOnline, queuedItems,averageBandwidth) {
				view.update(lastOffline, lastOnline, queuedItems,averageBandwidth);
				$.mobile.hidePageLoadingMsg();
			}
		});
		
		model.addListener(modelListener);
		model.loadData();
	}
});