jQuery.extend({
	/**
	 * 
	 */
	SurveyListPageView: function(){
		var self = this;
		var listeners = new Array();
		var statusText = new Array("","Pending","In progress","Complete","Approved","Rejected");
		
		//unregister if we were on this page before
		$('a.surveyLink').die('vclick');
	    $('a.surveyLink').live('vclick', function(event, ui) {
	        event.preventDefault();
			var siteSurveyId = $(this).jqmData('identifier');
			consoleLog('siteSurveyId clicked: '+siteSurveyId);
			logUserAction("Survey link for "+siteSurveyId+" clicked");
			self.notifyItemClicked(siteSurveyId);
		});
	    
		$('#refreshSurveyList').die('vclick');
		$('#refreshSurveyList').live('vclick', function(event){
			consoleLog('refreshSurveyList');
			logUserAction("Refresh survey list clicked");
			self.notifyRefreshClicked();
		});
	    
		/** updates page layout */
		this.updateLayout = function(){
			$('#list').trigger('updatelayout');
		}
		
		this.updateList = function(surveys, disableAnytimeSurveys){
			consoleLog('SurveyListPage:view:updateList');
			var surveyList = $('#surveyList');
			surveyList.empty();
			var lastCompletionStage = -1;
			
			for(var i = 0; i < surveys.length; i++){
				var siteSurvey = surveys[i];
				
				var completionStage = siteSurvey.completionStage;
				if(lastCompletionStage != completionStage){
					surveyList.append(ich.divider({text: getMessage('survey.completionStage.' + completionStage)}));
				}
				console.log("completionStage: " + completionStage);
				lastCompletionStage = completionStage;
				
				var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
				siteSurvey.statusClass = 'pending';
				// check for enabling the Complete button
				if(!siteSurvey.canComplete){
					var status = new $.SiteSurveyStatus(siteSurvey);
					if (status.isSurveyComplete(siteSurvey.id))
					{
						siteSurvey.canComplete = 'true';
						siteSurvey.statusClass = 'complete';				
					}
				}
				else
				{
					siteSurvey.statusClass = 'complete';	
				}
				// check for completed/approved surveys to set readonly
				if (siteSurveyStatus.isReadonly())
				{
					siteSurvey.statusClass = 'readonly';	
				}

				var finished = false;
				if ((siteSurvey.status == SURVEY_PENDING || siteSurvey.status == SURVEY_IN_PROGRESS) && siteSurvey.canComplete)
				{
					finished = true;
				}
				console.log("Status: "+siteSurvey.status);
				
				var disableAnytimeSurveysClass = disableAnytimeSurveys ? "ui-disabled" : "";
				if(siteSurvey.completionStage == SurveyCompletetionStage.BEFORE_WORKS_STARTS){
					disableAnytimeSurveysClass = '';
				}
				
				var surveyData = {"id":siteSurvey.id, 
								"surveyName":siteSurvey.surveyName, 
								"statusClass":siteSurvey.statusClass,
								"finished":finished,
								"surveyStatus":getMessage("survey.status."+siteSurvey.status,statusText[siteSurvey.status]),
								"completionStage":siteSurvey.completionStage,
								"disableAnytimeSurveysClass" : disableAnytimeSurveysClass};
				var row = ich.surveyRow(surveyData);
				surveyList.append(row);
			}
			surveyList.trigger('create');
			surveyList.listview('refresh');			
			
			consoleLog('SurveyListPage:view:updateList:refreshed');
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyItemClicked = function(siteSurveyId){
    		$.each(listeners, function(i){
    			listeners[i].itemClicked(siteSurveyId);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
    	
    	this.notifyCompleteClicked = function(siteSurveyId){
    		$.each(listeners, function(i){
    			listeners[i].completeClicked(siteSurveyId);
    		});
    	}
	},
	SurveyListPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			itemClicked : function(siteSurveyId) { },
			refreshClicked : function() { },
			completeClicked : function(siteSurveyId) { }
		}, list);			
	}

});
