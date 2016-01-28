jQuery.extend({

	AssetTypeListPageModel: function(){
		
		var self = this;
		var listeners = new Array();
		var surveyTemplateDao = new $.SurveyTemplateDao();
		
		function sortTypes(type1, type2){
			 var x = type1.name;
			 var y = type2.name;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		this.dataLoaded = function(templateSurveyId){
			consoleLog('model:assetTypeListPage:survey loaded');
			var types = surveyTemplateDao.getAssetTypesByTemplateSurveyId(templateSurveyId);
			
			types.sort(sortTypes);
			
			consoleLog('model:assetTypeListPage:loaded:'+types.length);
			self.notifyLoadFinish(types);
		}
		
		this.reloadData = function(){
			self.notifyReloadBegin();			
			
			var dataProvider = new $.SurveyDetailsRemoteDataProvider();
			
			var jobRef = AppointmentController.getAppointment().jobRef;
			var jobRefs = new Array();
			jobRefs.push(jobRef);
			
			//register callback
			dataProvider.dataLoaded = function(){
				self.notifyReloadFinish();
			}
			dataProvider.downloadData(false, jobRefs);			
		}
		
		/** data is pre-loaded on the home page... so fireup dataLoaded event  */
		this.loadData = function(templateSurveyId){
			self.notifyLoadBegin();
			self.dataLoaded(templateSurveyId);
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(types){
			$.each(listeners, function(i){
				listeners[i].loadFinish(types);
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
	AssetTypeListPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(list) { },
			loadFail     : function() { },
			reloadBegin : function() { },
			reloadFinish : function() { }
		}, list);
	}
});
	    					