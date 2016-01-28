jQuery.extend({
	SurveyPageController: function (model, view){
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.SurveyPageViewListener({
			attributeItemClicked : function(siteSurveyId) {				
			    //sessionStorage.siteSurveyId = siteSurveyId;
			    //window.history.go(-1);
			    $.mobile.changePage( "surveyAttributeGroup.html", { showLoadMsg: true, transition: "slide"} );
			},			
			assetItemClicked : function(siteSurveyId) {				
			    //sessionStorage.siteSurveyId = siteSurveyId;
			    //window.history.go(-1);
			    $.mobile.changePage( "surveyAssets.html", { showLoadMsg: true, transition: "slide"} );
			},
			refreshClicked : function(){
				$.mobile.showPageLoadingMsg();
				model.reloadData();
			},
			completeClicked : function(siteSurveyId){
				$.mobile.showPageLoadingMsg();
				model.completeSurvey(siteSurveyId);
				$.mobile.hidePageLoadingMsg();
				//console.log("History: "+JSON.stringify(window.history));
				window.history.go(-2);
				//$.mobile.changePage( "surveyList.html", { showLoadMsg: true, transition: "slide"} );
			},
			assetRestoreClicked : function(siteSurveyId,assetId){
				$.mobile.showPageLoadingMsg();
				model.restoreAsset(siteSurveyId,assetId);
				$.mobile.hidePageLoadingMsg();
				view.updateList(getCurrentSurvey());
				//$.mobile.changePage( "surveyList.html", { showLoadMsg: true, transition: "slide"} );
			}
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.SurveyPageModelListener({
			loadBegin    : function() { 
				$.mobile.showPageLoadingMsg();
			},
			loadFinish   : function(siteSurvey) {
				consoleLog("loadFinish: "+siteSurvey);
				consoleLog("view.updateSurveyName: "+siteSurvey.surveyName);
				view.updateSurveyName(siteSurvey.surveyName);
				consoleLog("view.updateList");
				view.updateList(siteSurvey);
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