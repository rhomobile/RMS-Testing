jQuery.extend({
	ImagePageController: function (model, view){
		
		selfController = this;
		
		/**
		 * Listen to the view
		 */
		var viewListener = $.ImagePageViewListener({
			uploadImageClicked : function(image,scale,scaled,rotated,newname) { 
				model.uploadImageClicked(image,scale,scaled,rotated,newname);
			}		
		});
		view.addListener(viewListener);
		
		var modelListener = $.ImagePageModelListener({
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