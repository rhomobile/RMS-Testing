jQuery.extend({

	SurveyAssetPageModel: function(){

		var self = this;
		var listeners = new Array();
		var updateSurveyUrl = escape(localStorage.ctx+"/rest/assetmgmt/survey/updateSurvey/");
		
		function sortSiteLocations(loc1, loc2){
			 var x = loc1.name;
			 var y = loc2.name;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		this.dataLoaded = function(){
			consoleLog('model:surveyAssetPage:survey loaded');
			var siteSurveyId = sessionStorage.siteSurveyId;
			var siteSurveyAssetId = sessionStorage.siteSurveyAssetId;
			var siteSurvey = getSurvey(siteSurveyId);
			consoleLog("SiteSurvey: " + siteSurveyId);

			// load locations
			var surveyDetailsDao = new $.SurveyDetailsDao;
			var siteLocations = surveyDetailsDao.findSiteLocationsBySiteSurveyId(siteSurveyId);
			siteLocations.sort(sortSiteLocations);
			sessionStorage.setObject('siteSurveyAssetLocations',siteLocations);
			
			// load conditions
			var assetConditionDao = new $.AssetConditionDao;
			var conditions = assetConditionDao.getAll();
			sessionStorage.setObject('siteSurveyAssetConditions',conditions);
			
			self.notifyLoadFinish(siteSurvey,siteSurveyAssetId);
			consoleLog('model:surveyPage:loaded:');
		}
		
		this.reloadData = function(){
			self.notifyReloadBegin();
		}
		
		this.updateSurvey = function(asset){
			consoleLog('model:surveyAssetPage:updateSurvey');
			  // update local survey and generate an update request for just the fields that have changed
			  var res = localStorage.getObject('resource');
			  var newSurvey = {"performedOn":getFormattedDate(new Date()), "performedBy":res.id, "status":"2"};
			  var newAttributes = new Array();
			  var newAsset = new Array();
			  newSurvey.attributes = new Array();
			  newSurvey.assets = new Array();
			  
			  // get the original attributes
			  var siteSurveyId = sessionStorage.siteSurveyId;
			  var sequenceDao = new $.SequenceDao();	
			  
			  // update new
			  newAsset = {"ref":asset.ref,
						"conditionID":asset.conditionID,
						"status":asset.status};	
			  
			  if (asset.id < 0)
			  {
				  newAsset.autocode = sequenceDao.getAutocode(asset.id);
			  }
			  else
			  {
				  newAsset.id = asset.id;
			  }
			  
			  if (asset.siteLocationID < 0)
			  {
				  newAsset.siteLocationAutocode = sequenceDao.getAutocode(asset.siteLocationID);
			  }
			  else
			  {
				  newAsset.siteLocationID = asset.siteLocationID;
			  }
			
			  
			  // add data to update request json
			  newAsset.attributes = newAttributes;
			  newSurvey.assets.push(newAsset);
			  consoleLog("updateSurvey data: "+JSON.stringify(newSurvey));
			  
			  // add survey to the update queue
			  // NB. we still send even if nothing changed so we get the performedOn/performedBy entries
			  var requestDetails = new $.RequestDetails(updateSurveyUrl + siteSurveyId, 'POST', newSurvey);
			  var remoteUpdater = new $.RemoteUpdater();
			  remoteUpdater.update(requestDetails);	
			  consoleLog("model:surveyAssetPage:updateSurvey - end");			
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
		
		this.notifyLoadFinish = function(siteSurvey,siteSurveyAssetId){
			$.each(listeners, function(i){
				listeners[i].loadFinish(siteSurvey,siteSurveyAssetId);
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
	SurveyAssetPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(siteSurvey,siteSurveyAssetId) { },
			loadFail     : function() { },
			reloadBegin : function() { },
			reloadFinish : function() { }
		}, list);
	}
});



    					