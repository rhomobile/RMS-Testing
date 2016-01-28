jQuery.extend({

	SurveyListPageModel: function(){
		
		var self = this;
		var listeners = new Array();
		var surveyDetailsDao = new $.SurveyDetailsDao();
		
		var appointment = AppointmentController.getAppointment();
		var jobRef = appointment.jobRef;
		
		function sortSurveys(survey1, survey2){
			 var x = survey2.completionStage;
			 var y = survey1.completionStage;
			 if(x == y){
				 x = survey1.surveyName;
				 y = survey2.surveyName;
			 }
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		function getSurveys(){
			var surveys = surveyDetailsDao.findByAppointment(appointment);
			for(var index in surveys)
			{
				var survey = surveys[index];
				surveys[index].canComplete = surveyDetailsDao.canComplete(survey);				
			}			
			surveys.sort(sortSurveys);
			return surveys;
		}
		
		this.dataLoaded = function(){
			consoleLog('model:surveyListPage:survey loaded');
			var surveys = getSurveys();
			var disableAnytimeSurveys 
				= surveyDetailsDao.hasUncompletedSurveyWithCompletionStage(appointment, SurveyCompletetionStage.BEFORE_WORKS_STARTS);
			
			consoleLog('model:surveyListPage:loaded:'+surveys.length);
			self.notifyLoadFinish(surveys, disableAnytimeSurveys);
		}
		
		this.reloadData = function(){
			self.notifyReloadBegin();
			var dataProvider = new $.SurveyDetailsRemoteDataProvider();
			var jobRefs = new Array();
			jobRefs.push(jobRef);
			
			//register callback
			dataProvider.dataLoaded = function(){
				self.notifyReloadFinish();
			}
			dataProvider.downloadData(false, jobRefs);
			//updateLocalSurveyStatus();
		}
		
		this.completeSurvey = function(siteSurveyId){
			consoleLog("Completing siteSurvey: "+siteSurveyId);
			// make remote call
			completeSurveyRemote(siteSurveyId);
			// update local data
			completeSurveyLocal(siteSurveyId);
			
			// set up data for page refresh
			var surveys = getSurveys();
			self.notifySurveyCompleted(surveys);
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
		
		this.notifyLoadFinish = function(surveys, disableAnytimeSurveys){
			$.each(listeners, function(i){
				listeners[i].loadFinish(surveys, disableAnytimeSurveys);
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
		
		this.notifySurveyCompleted = function(surveys){
			$.each(listeners, function(i){
				listeners[i].surveyCompleted(surveys);
			});
		}
	},
	SurveyListPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(list) { },
			loadFail     : function() { },
			reloadBegin : function() { },
			reloadFinish : function() { },
			surveyCompleted : function(surveys) { }
		}, list);
	}
});
	    					