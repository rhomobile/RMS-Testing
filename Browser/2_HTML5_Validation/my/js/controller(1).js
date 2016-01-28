jQuery.extend({
	ServicesPageController: function (model, view){
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.ServicesPageViewListener({
			itemClicked : function(serviceId) {				
			    sessionStorage.serviceId = serviceId;
			    $.mobile.changePage( "libraryActivityList.html", { showLoadMsg: true, transition: "slide"} );
			},
			refreshClicked : function(){
				$.mobile.showPageLoadingMsg();
				model.reloadData();
			}
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.ServicesPageModelListener({
			loadBegin    : function() { 
				$.mobile.showPageLoadingMsg();
			},
			loadFinish   : function(servicesList) {
				view.updateList(servicesList);
				$.mobile.hidePageLoadingMsg();
			},
			loadFail     : function() { 

			},
			reloadBegin : function() {
				$.mobile.showPageLoadingMsg();
			},
			reloadFinish : function() {
				model.loadData();
				$.mobile.hidePageLoadingMsg();
			},
		});
		model.addListener(modelListener);
		model.loadData();
	}
});