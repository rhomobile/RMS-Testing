jQuery.extend({
	SurveyAssetPageController: function (model, view){
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.SurveyAssetPageViewListener({
			itemClicked : function(siteSurveyId, assetAttributeGroupId) {				
				consoleLog('SurveyAssetPageController:itemClicked:'+assetAttributeGroupId+":"+siteSurveyId);
		        sessionStorage.siteSurveyAssetAttributeGroupId = assetAttributeGroupId;		        
			    $.mobile.changePage( "assetAttribute.html", { showLoadMsg: true, transition: "slide"} );
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
		var modelListener = $.SurveyAssetPageModelListener({
			loadBegin    : function() { 
				$.mobile.showPageLoadingMsg();
				setTimeout(function(){},100);//give time for above message to render
			},
			//loadFinish   : function(surveyList) {
			//	view.updateList(surveyList);
			//	$.mobile.hidePageLoadingMsg();
			//},
			loadFinish   : function(siteSurvey,siteSurveyAssetId) {
				view.updateSurveyName(siteSurvey.surveyName);
				view.updateList(siteSurvey,siteSurveyAssetId);
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