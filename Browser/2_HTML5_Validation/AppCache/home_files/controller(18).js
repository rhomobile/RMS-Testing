jQuery.extend({
	PartCategoryListPageController: function (model, view){
		
		var partService = sessionStorage.partServiceId;		
		sessionStorage.removeItem('partCategoryId');

		var addPartToAppointment = false;
		if(sessionStorage.addPartToAppointment)
		{
			addPartToAppointment = true;
		}
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.PartCategoryListPageViewListener({
			itemClicked : function(categoryId) {				
			    sessionStorage.partCategoryId = categoryId;
			    $.mobile.changePage( "storePartList.html", { showLoadMsg: true, transition: "slide"} );
			},
			refreshClicked : function(){
				$.mobile.showPageLoadingMsg();
				model.reloadData();
			}
		});
		view.addListener(viewListener);
	
		if(partService){
			view.updateHeader(new $.ServiceDao().findById(partService).description);
		}
		if(addPartToAppointment){
			view.addPartToAppointmentMode();
		}
			
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.PartCategoryListPageModelListener({
			loadBegin    : function() { 
				$.mobile.showPageLoadingMsg();
			},
			loadFinish   : function(categoryList) {
				view.updateList(categoryList);
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
		model.loadData(partService);
	}
});