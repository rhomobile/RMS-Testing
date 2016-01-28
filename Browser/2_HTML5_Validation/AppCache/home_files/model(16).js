jQuery.extend({

	SearchJobPageModel: function(){
		var searchJobUrl = escape(localStorage.ctx+"/rest/workflow/job/getJobsWithUnassignedActivities/");
		var addAppointmentUrl = escape(localStorage.ctx+"/rest/rs/addAppointment/");
		var maxJobsReturned = 25;
		
		var self = this;
		var listeners = new Array();
		var text = null;
		var jobs = null;
		var searchActive = false;
		
		function sortacts(act1, act2){
			 var x = act1.name;
			 var y = act2.name;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		this.dataLoaded = function(response, status, request){
			this.searchActive = false;
			self.notifyLoadFinish(response.jobs);
		}
		
		this.dataLoadError = function(response, status, request){
			this.searchActive = false;
			self.notifyLoadFail();
		}
		
		/** data is pre-loaded on the home page */
		this.loadData = function(text){
			if(this.searchActive)
			{
				return;
			}
			searchActive = true;
			
			consoleLog('searchJob:loadData:text:'+text);
			self.text = text;
			self.notifyLoadBegin();
			var resource = localStorage.getObject('resource');
			var url = searchJobUrl + resource.resourceId + "/" + escape(text) + "/" + maxJobsReturned;
			console.log('searchJob:url:'+url);
			
			$.ajax({
				url: url,
				type: 'GET',
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				contentType: "application/json",
				async: true,
				data: '',
				timeout: searchJobTimeout,
				success: function(response, status, request){
					self.dataLoaded(response, status, request);
				},
				error: function(response, status, request){
					self.dataLoadError(response, status, request);
				}
              });
		}
		
		this.addAppointment = function(appointmentData){
			self.notifyAddBegin();
			
			var resource = localStorage.getObject('resource');
			appointmentData.resourceId = resource.resourceId;
			appointmentData.notes = getMessage('searchJob.newAppointmentNotes', '');
			
			$.ajax({
				url: addAppointmentUrl,
				type: 'POST',
				timeout: addApptTimeout,
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				contentType: "application/json",
				async: true,
				data: JSON.stringify(appointmentData),				
				success: function(response, status, request){
					console.log('appointment added id: ' + parseInt(response.appointmentId) + ' full response:'+JSON.stringify(response));
					self.notifyAppointmentAdded(parseInt(response.appointmentId, 10));
				},
				error: function(response, status, request){
					if(response.status == 409)
					{
						console.log('unable to add appointment:409:error');
		    			self.notifyAppointmentAddError('searchJob.unableToAddAppointmentConflict', appointmentData.jobRef);
					}else{
						console.log('unable to add appointment:error');
						self.notifyAppointmentAddError('searchJob.unableToAddAppointmentOther', appointmentData.jobRef);
					}		    			
		  		},
              });
		}
	
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(jobs){
			$.each(listeners, function(i){
				listeners[i].loadFinish(jobs);
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
		
		this.notifyAddBegin = function(){
			$.each(listeners, function(i){
				listeners[i].addBegin();
			});
		}
		
		this.notifyAppointmentAdded = function(appId){
			$.each(listeners, function(i){
				listeners[i].appointmentAdded(appId);
			});
		}
		this.notifyAppointmentAddError = function(error, jobRef){
			$.each(listeners, function(i){
				listeners[i].appointmentAddError(error, jobRef);
			});
		}
	},
	SearchJobPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(jobs) { },
			loadFail     : function() { },
			appointmentAdded : function() { },
			appointmentAddError : function() {},
			addBegin : function(){}
		}, list);
	}
});
	    					