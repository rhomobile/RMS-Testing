jQuery.extend({
	AssetAttributePageController: function (model, view){
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.AssetAttributePageViewListener({
			itemClicked : function(siteSurveyId) {				
			    sessionStorage.siteSurveyId = siteSurveyId;
			    window.history.go(-1);
			},
			refreshClicked : function(){
				$.mobile.showPageLoadingMsg();
				model.reloadData();
			},
			updateSurvey : function(siteSurveyAssets){
				//$.mobile.showPageLoadingMsg();
				model.updateSurvey(siteSurveyAssets);
			}			
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.AssetAttributePageModelListener({
			loadBegin    : function() { 
				$.mobile.showPageLoadingMsg();
				setTimeout(function(){},100);//give time for above message to render
			},
			//loadFinish   : function(surveyList) {
			//	view.updateList(surveyList);
			//	$.mobile.hidePageLoadingMsg();
			//},
			loadFinish   : function(survey,siteSurveyAssetId,assetAttributeGroupId) {
				view.updateSurveyName(survey.surveyName);
				view.updateList(survey,siteSurveyAssetId,assetAttributeGroupId);
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