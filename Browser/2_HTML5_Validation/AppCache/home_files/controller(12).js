jQuery.extend({
	AddAssetPageController: function (model, view){
		
		var surveyDetailsDao = new $.SurveyDetailsDao();
		
		
		//session stored
		var newAsset = sessionStorage.getObject("newAsset");
		/*
		var newAsset = {
				assetType: assetTypeId,
				siteSurveyID: sessionStorage.siteSurveyId, 
				templateSurveyId: templateSurveyId,
				manufacturer: null, //manufacturer id
				libraryAssetID: null,
				libraryAssetName: null,
				ref: null,
				location: null,
				condition: null
		};*/
		
		var siteSurveyId = newAsset.siteSurveyID;
		var assetTypeId = newAsset.assetType;
		var assetManufacturerId = newAsset.manufacturer;
		var surveyTemplateId = newAsset.templateSurveyId; 

		/**
		 * Listen to the view events
		 */
		var viewListener = $.AddAssetPageViewListener({			
			refreshClicked : function(){
				$.mobile.showPageLoadingMsg();
				model.reloadData();
			},
			saveClicked : function(newAsset){
				$.mobile.showPageLoadingMsg();
				model.addAsset(newAsset);
			}
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.AddAssetPageModelListener({
			loadBegin    : function() { 
				$.mobile.showPageLoadingMsg();
			},
			
			loadFinish   : function(assetTypeName, assetManufacturerName, modelList, siteLocationList, conditionList) {				
				view.update(assetTypeName, assetManufacturerName, modelList, siteLocationList, conditionList, newAsset);
				$.mobile.hidePageLoadingMsg();
			},
			loadFail     : function() { 

			},
			reloadBegin : function() {
				$.mobile.showPageLoadingMsg();
			},
			reloadFinish : function() {
				//after reload from the server the survey template may have changed
				surveyTemplateId = surveyDetailsDao.findById(siteSurveyId).surveyID; 
				newAsset.surveyTemplateId = surveyTemplateId;
				model.loadData(newAsset);
				$.mobile.hidePageLoadingMsg();
			},
			assetAdded : function() {
				//console.log("History: "+JSON.stringify(window.history));
				window.history.go(-3);
				sessionStorage.removeItem("newAsset");
				$.mobile.hidePageLoadingMsg();
			}
		});
		model.addListener(modelListener);		
		model.loadData(newAsset);
	}
});