jQuery.extend({
	SurveyAttributePageController: function (model, view){
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.SurveyAttributePageViewListener({
			refreshClicked : function(){
				$.mobile.showPageLoadingMsg();
				model.reloadData();
			},
			updateSurvey : function(attributes){
				//$.mobile.showPageLoadingMsg();
				model.updateSurvey(attributes);
			}			
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.SurveyAttributePageModelListener({
			loadBegin    : function() { 
				$.mobile.showPageLoadingMsg();
				setTimeout(function(){},100);//give time for above message to render
			},
			//loadFinish   : function(surveyList) {
			//	view.updateList(surveyList);
			//	$.mobile.hidePageLoadingMsg();
			//},
			loadFinish   : function(siteSurvey,siteSurveyAttributeGroupId) {
				view.updateSurveyName(siteSurvey.surveyName);
				view.updateList(siteSurvey,siteSurveyAttributeGroupId);
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