jQuery.extend({

	SurveyAttributePageModel: function(){
		
		var self = this;
		var listeners = new Array();
		var surveyDetailsDao = new $.SurveyDetailsDao();
		var survey = null;
		var siteSurveyId = null;		
		
		var jobRef = AppointmentController.getAppointment().jobRef;
		
		this.dataLoaded = function(){
			consoleLog('model:SurveyAttributePage:survey loaded');

			var siteSurveyId = sessionStorage.siteSurveyId;
			var siteSurveyAttributeGroupId = sessionStorage.siteSurveyAttributeGroupId;
			//var siteSurveys = jQuery.parseJSON(localStorage.getItemDecompress('surveyDetails'));
			var siteSurveys = localStorage.getObjectDecompress('surveyDetails');			
			var siteSurvey = getSurvey(siteSurveyId);
			consoleLog("SiteSurvey: " + siteSurveyId);
			self.notifyLoadFinish(siteSurvey,siteSurveyAttributeGroupId);
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
		}
		
		/** data is pre-loaded on the home page... so fireup dataLoaded event  */
		this.loadData = function(){
			consoleLog("loadData");
			self.notifyLoadBegin();
			self.dataLoaded();
		}
		
		this.updateSurvey = function(attributes){
			  consoleLog("SurveyAttributePage:updateSurvey");
			  
			  // update local survey and generate an update request for just the fields that have changed
			  var res = localStorage.getObject('resource');
			  var newSurvey = {"performedOn":getFormattedDate(new Date()), "performedBy":res.id, "status":"2"};
			  var newAttributes = new Array();
			  
			  // get the original attributes
			  var siteSurveyId = sessionStorage.siteSurveyId;
			  //var siteSurveys = jQuery.parseJSON(localStorage.getItem('surveyDetails'));
			  var siteSurveys = localStorage.getObjectDecompress('surveyDetails');
			  var siteSurvey = null;
			  var siteSurveyAttributeGroupId = sessionStorage.siteSurveyAttributeGroupId; // required group
			  var siteSurveyStatus = null;
			  //consoleLog("siteSurveys: "+siteSurveys.length);
			  
			  for (var x=0;x<siteSurveys.length;x++)
			  {
				    siteSurvey = siteSurveys[x];
				    //consoleLog("siteSurvey: "+siteSurvey.id);
					if (siteSurvey.id == siteSurveyId)
					{				
					  siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
					  //consoleLog("SiteSurvey: " + JSON.stringify(siteSurvey));
					  var siteSurveyAttributes = null;
					  var attributeGroups = siteSurvey.attributeGroups; // get original group data
					  //consoleLog("AttributeGroups: "+JSON.stringify(attributeGroups));					  

					  // look for this attribute group
					  for (var y=0;y<attributeGroups.length;y++)
					  {
						  //consoleLog("AttributeGroup: "+ attributeGroups[x].id);
						  //consoleLog(attributeGroups[y].id +" <=> "+siteSurveyAttributeGroupId);
						  if (attributeGroups[y].id == siteSurveyAttributeGroupId)
						  {
							  siteSurveyAttributes = attributeGroups[y].attributes;
							  //consoleLog("Original attributes: "+JSON.stringify(siteSurveyAttributes));
							  
							  // compare new with old to find changes to update
							  for (var z=0;z<attributes.length;z++)
							  {
								  // get current stored value
								  var currData = siteSurveyStatus.getAttribute(attributes[z].id);
								  // see if this value has changed
								  for (var i=0;i<siteSurveyAttributes.length;i++)
								  {
									  if (siteSurveyAttributes[i].id == attributes[z].id)
										  consoleLog("UPDATE: "+siteSurveyAttributes[i].value +" <=> "+ currData.value);									  
									  if (siteSurveyAttributes[i].id == attributes[z].id && siteSurveyAttributes[i].value != currData.value)
									  {
										  siteSurveyAttributes[i].value = currData.value;
										  newAttributes.push({"id":currData.id,"value":currData.value});						
									  }
								  }
							  }	
							  consoleLog("New attributes: "+JSON.stringify(newAttributes));
							  
							  // update local survey
							  consoleLog("Updating local survey");
							  siteSurveys[x].attributeGroups[y].attributes = siteSurveyAttributes;
							  //consoleLog("Updating with: "+JSON.stringify(siteSurveys));
							  localStorage.setObjectCompress('surveyDetails',siteSurveys);
					  	  }
					  }
			  
					  // add data to update request json
					  newSurvey.attributes = newAttributes;
					  newSurvey.assets = new Array();
					  consoleLog("updateSurvey data\n"+JSON.stringify(newSurvey));			  
					  
					  // add survey to the update queue
					  // NB. we still send even if nothing changed so we get the performedOn/performedBy entries
					  var updateSurveyUrl = escape(localStorage.ctx+"/rest/assetmgmt/survey/updateSurvey/");
					  var requestDetails = new $.RequestDetails(updateSurveyUrl + siteSurveyId, 'POST', newSurvey);
					  var remoteUpdater = new $.RemoteUpdater();
					  remoteUpdater.update(requestDetails);			
					  
					  // update the survey status in the local storage
					  siteSurveyStatus.updateAttributeGroupStatus(siteSurveyAttributeGroupId);
				  }
			}
		
			  // tidy up
			  //sessionStorage.removeItem("siteSurveyAttributes");
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(siteSurvey,siteSurveyAttributeGroupId){
			$.each(listeners, function(i){
				listeners[i].loadFinish(siteSurvey,siteSurveyAttributeGroupId);
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
	SurveyAttributePageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(siteSurvey,siteSurveyAttributeGroupId) { },
			loadFail     : function() { },
			reloadBegin : function() { },
			reloadFinish : function() { }
		}, list);
	}
});
	    					