jQuery.extend({
	SurveyListPageController: function (model, view){
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.SurveyListPageViewListener({
			itemClicked : function(siteSurveyId) {
				sessionStorage.removeItem('newAsset');
			    sessionStorage.siteSurveyId = siteSurveyId;
			    $.mobile.changePage( "survey.html", { showLoadMsg: true, transition: "slide"} );
			},
			refreshClicked : function(){
				$.mobile.showPageLoadingMsg();
				model.reloadData();
			},
			completeClicked : function(siteSurveyId){
				$.mobile.showPageLoadingMsg();
				model.completeSurvey(siteSurveyId);
				$.mobile.hidePageLoadingMsg();
				//$.mobile.changePage( "surveyList.html", { showLoadMsg: true, transition: "slide"} );
			}
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.SurveyListPageModelListener({
			loadBegin    : function() { 
				$.mobile.showPageLoadingMsg();
			},
			loadFinish   : function(surveyList, disableAnytimeSurveys) {
				view.updateList(surveyList, disableAnytimeSurveys);
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
			surveyCompleted : function(surveys) {
				consoleLog("Updating the survey list after survey completion");
				view.updateList(surveys);
			}
		});
		model.addListener(modelListener);
		model.loadData();
	}
});