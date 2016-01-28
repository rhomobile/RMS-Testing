jQuery.extend({
	AssetTypeListPageController: function (model, view){
		
		sessionStorage.removeItem("newAsset");
		var siteSurveyId = sessionStorage.siteSurveyId;
		var surveyDetailsDao = new $.SurveyDetailsDao();
		var templateSurveyId = surveyDetailsDao.findById(siteSurveyId).surveyID; 
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.AssetTypeListPageViewListener({
			itemClicked : function(assetTypeId) {
				
				//representation of newAsset
				var newAsset = {
						assetType: assetTypeId,
						siteSurveyID: sessionStorage.siteSurveyId, //this need to be set - OSD-1045
						templateSurveyId: templateSurveyId,
						manufacturer: null, //manufacturer id
						libraryAssetID: null,
						libraryAssetName: null,
						ref: null,
						location: null,
						condition: null
				};
				sessionStorage.setObject("newAsset", newAsset);
			    
			    $.mobile.changePage( "assetManufacturerList.html", { showLoadMsg: true, transition: "slide"} );
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
		var modelListener = $.AssetTypeListPageModelListener({
			loadBegin    : function() { 
				$.mobile.showPageLoadingMsg();
			},
			loadFinish   : function(assetTypeList) {
				view.updateList(assetTypeList);
				$.mobile.hidePageLoadingMsg();
			},
			loadFail     : function() { 

			},
			reloadBegin : function() {
				$.mobile.showPageLoadingMsg();
			},
			reloadFinish : function() {
				model.loadData(templateSurveyId);
				$.mobile.hidePageLoadingMsg();
			},
		});
		model.addListener(modelListener);		
		model.loadData(templateSurveyId);
	}
});