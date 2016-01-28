jQuery.extend({
	AssetManufacturerListPageController: function (model, view){
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.AssetManufacturerListPageViewListener({
			itemClicked : function(assetManufacturerId) {				
			    //update new asset in session storage
				var newAsset = sessionStorage.getObject("newAsset");
				newAsset.manufacturer = assetManufacturerId;
				sessionStorage.setObject("newAsset", newAsset);
			    consoleLog('AssetManufacturerListPageController:itemClick:'+newAsset.manufacturer+":"+newAsset.assetType);
			    $.mobile.changePage( "addAsset.html", { showLoadMsg: true, transition: "slide"} );
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
		var modelListener = $.AssetManufacturerListPageModelListener({
			loadBegin    : function() { 
				$.mobile.showPageLoadingMsg();
			},
			loadFinish   : function(assetManufacturerList) {
				view.updateList(assetManufacturerList);
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