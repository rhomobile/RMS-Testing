jQuery.extend({

	SurveyPageModel: function(){

		var self = this;
		var listeners = new Array();
		
		this.restoreAsset = function(siteSurveyId, assetId)
		{
			consoleLog("model:surveyPage:Restoring asset: "+assetId);
			// local restore
			restoreAsset(siteSurveyId, assetId);
			// remote restore
			restoreAssetRemote(siteSurveyId, assetId);
			consoleLog("model:surveyPage:Restored asset: "+assetId);
		}
		
		this.dataLoaded = function(){
			consoleLog('model:surveyPage:siteSurvey loaded');
			var siteSurveyId = sessionStorage.siteSurveyId;
			var siteSurvey = getSurvey(siteSurveyId);
			consoleLog("SiteSurvey: " + siteSurveyId + " loaded");
			var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
			self.notifyLoadFinish(siteSurvey);
			consoleLog('model:siteSurveyPage:loaded:');
		}
		
		this.reloadData = function(){
			self.notifyReloadBegin();
		}
		
		this.completeSurvey = function(siteSurveyId){
			consoleLog("Completing siteSurvey: "+siteSurveyId);
			// make remote call
			completeSurveyRemote(siteSurveyId);
			// update local data
			completeSurveyLocal(siteSurveyId);
		}
				
		/** data is pre-loaded on the home page... so fireup dataLoaded event  */
		this.loadData = function(){
			self.notifyLoadBegin();
			self.dataLoaded();
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(siteSurvey){
			consoleLog("notifyLoadFinish.Survey: " + siteSurvey);
			$.each(listeners, function(i){
				listeners[i].loadFinish(siteSurvey);
			});
		}
		
		this.notifyLoadFail = function(){
			$.each(listeners, function(i){
				listeners[i].loadFail();
			});
		}
		
		
		this.notifyReloadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].reloadBegin();
			});
		}
		
		this.notifyReloadFinish = function(){
			$.each(listeners, function(i){
				listeners[i].reloadFinish();
			});
		}
	},
	SurveyPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(siteSurvey) { },
			loadFail     : function() { },
			reloadBegin : function() { },
			reloadFinish : function() { }
		}, list);
	}
});



    					