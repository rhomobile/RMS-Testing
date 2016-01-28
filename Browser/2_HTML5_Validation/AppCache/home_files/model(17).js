jQuery.extend({	

	ActivityEditPageModel: function(){
		var updateActivityUrl = escape(localStorage.ctx+"/rest/workflow/activity/updateActivity");
		var deleteActivityUrl = escape(localStorage.ctx+"/rest/workflow/activity/deleteActivity/");
		
		var self = this;
		var listeners = new Array();

		function getAppointment(){
			return AppointmentController.getAppointment();
		}
		function updateAppointment(appointment) {
			AppointmentController.setAppointment(appointment);
			AppointmentController.save();
		}
		
		/** sort alphabetically */
		function sortLocations(loc1, loc2){
			 var x = loc1.name;
			 var y = loc2.name;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		function getSiteLocations(){
			var appointment = getAppointment();
			if(appointment.siteLocations){
				appointment.siteLocations.sort(sortLocations);
				return appointment.siteLocations;
			}else{
				consoleLog('ActivityEditPageModel:no siteLocations found')
				return new Array();
			}
		}
		
		function getCategoryList(){
			var activityCategoryDao = new $.ActivityCategoryDao();
			return activityCategoryDao.getAll();
		}
		
		/**
		 * if activityId = null no pre-selected values will be returned
		 */
		this.loadData = function(activityId, libraryActivityCode) {
			var locationList = getSiteLocations();
			var categoryList = getCategoryList();
			//activity location
			var selectedLocationId = null;
			var selectedCategoryId = null;
			//activity notes
			var notes = null;
			var completedQty = parseFloat(0).toFixed(2);
			var totalQty = parseFloat(0).toFixed(2);
			var description = "";
			if(activityId)
			{
				var activity = getLocalActivity(activityId);
				if(activity.siteLocation){					
					selectedLocationId = activity.siteLocation.id;
				}
				if(activity.category){					
					selectedCategoryId = activity.category.id;
				}
				completedQty = activity.completedQuantity;
				totalQty = activity.totalQuantity;
				notes = activity.note;
				description = activity.code + " - " + activity.description;
			}else{
				var libraryActivityDao = new $.LibraryActivityDao();
				var libraryActivity = libraryActivityDao.findByCode(libraryActivityCode);
				if(libraryActivity.quantity){
					totalQty = parseFloat(libraryActivity.quantity).toFixed(2);
				}else{
					totalQty = parseFloat(1).toFixed(2);
				}
				description = libraryActivity.code + " - " + libraryActivity.name;
			}
			self.notifyDataLoaded({locationList: locationList, 
								   selectedLocationId: selectedLocationId, 
								   notes: notes, 
								   completeQty: completedQty, 
								   totalQty: totalQty,
								   description: description,
								   categoryList: categoryList,
								   selectedCategoryId: selectedCategoryId});			
		}
		
		
		/**
		 * return raw activity as stored in localStorage
		 */
		function getLocalActivity(activityId){
			var appointment = getAppointment();
			var activitiesRaw = appointment.activities;
			for(var index =0; index < activitiesRaw.length; index++){
				var activityRaw = activitiesRaw[index];
				if(activityRaw.activityId == activityId || (activityRaw.localId && activityRaw.localId == activityId)) {
					return activityRaw;
				}
			}
			consoleLog('getLocalActivity:not found');
			return null;
		}
		
		/**
		 * 
		 *  START - function related to UPDATE ACTIVITY 
		 *  
		 */
		
		/**
		 * updates local activity
		 */
		this.updateLocalData = function(data){
			var appointment = getAppointment();
			var activitiesRaw = appointment.activities;
			for(var index =0; index < activitiesRaw.length; index++){
				var activityRaw = activitiesRaw[index];
				if(activityRaw.activityId == data.activityId) {
					activityRaw.completedQuantity = data.completedQuantity;
					activityRaw.totalQuantity= data.totalQuantity;
					//on update increase activity version
					activityRaw.activityVersion = parseInt(activityRaw.activityVersion, 10) + 1;
					activityRaw.note = data.note;
					if(data.siteLocationId){
						activityRaw.siteLocation = {id: data.siteLocationId, name: data.siteLocationName}
					}else{
						activityRaw.siteLocation  = null; 
					}
					
					if(data.activityCategoryId){
						activityRaw.category = {id: data.activityCategoryId, name: data.activityCategoryName}
					}else{
						activityRaw.category  = null; 
					}
					break;
				}
			}
			updateAppointment(appointment);
		}
		
		this.deleteLocalData = function(activityId){
			var toRemoveIndex = -1;
			var appointment = getAppointment();
			var activitiesRaw = appointment.activities;
			for(var index =0; index < activitiesRaw.length; index++){
				var activityRaw = activitiesRaw[index];
				if(activityRaw.activityId == activityId){
					toRemoveIndex = index;
					break;
				}
			}
			
			if(toRemoveIndex != -1) {
				consoleLog("local activity removed:" + activityId +"index:"+toRemoveIndex);
				activitiesRaw.splice(toRemoveIndex, 1);
				appointment.activities = activitiesRaw; 
				consoleLog("Activities after remove:" + appointment.activities.length);
				
			}
			consoleLog("Before app update:" + localStorage.getObject('currentAppointment').activities.length);
			updateAppointment(appointment);
			consoleLog("After app update:" + localStorage.getObject('currentAppointment').activities.length);
			
		}
		
		
		this.deleteActivity = function(activityId){
			consoleLog("delete activity: "+ activityId);
			
			//if activity id < 0 then, check if the activity has been updated in the local storage
			//since we rendered the page, thats why after this point use localActivity.activityId
			var  localActivity = getLocalActivity(activityId);
			var activityVersion = localActivity.activityVersion;
			consoleLog("delete activity version: "+ activityVersion);
			//self.deleteLocalData(activityId);

			//Rest request
			var requestDetails = new $.RequestDetails(deleteActivityUrl + localActivity.activityId + "/" + activityVersion, 'DELETE', null);
			var remoteUpdater = new $.RemoteUpdater();			

			//if the activity was added in offline mode and now user tries to delete it
			//remove add request entry from the queue and don't add delete request to the queue
			if(localActivity.activityId < 0){
				consoleLog("delete activity with negative id: "+ localActivity.activityId);
				//this method is called just before entry is added to the queue
				remoteUpdater.onBeforeAddToQueue = function(queue, requestDetails){
					var requests = queue.getAll();
					
					//find the add activity request
					for(var requestIndex in requests){
						var request = requests[requestIndex];

						//find matching activity in the request (multiple activities per add request)
						var requestData = jQuery.parseJSON(request.data);
						if(requestData.activities){
							var activityRemoved = false;
							for(var activityIndex in requestData.activities){
								if(requestData.activities[activityIndex].activityId == localActivity.activityId){
									requestData.activities.splice(activityIndex, 1);
									activityRemoved = true;
								}
							}
							//if only one activity to add in the request remove whole request from the queue						
							if(activityRemoved && requestData.activities.length == 0){
								consoleLog('request removed from queue');
								requests.splice(requestIndex, 1);
								queue.override(requests);
							}else{
								//update activity
								request.data = JSON.stringify(requestData);
							}
						}
					}
					queue.override(requests);
					//false - as we don't want to queue delete request in the queue
					return false;
				}
			}
			
			//called onError
			var hasError = false;
			//override onError function
			remoteUpdater.onError = function(status, request, response, requestDetails){
				//check status if we have 409 error, so mobile.activity.version != server.activity.version 
				consoleLog("Delete activity error: "+JSON.stringify(response));
				if(request.status == 401){
					hasError = true;					
					requestDetails.success = true;
					self.notifyItemChangeFail();
					alert(getMessage('libraryActivity.noDeleteRights'));
					//delActivitiesLocalData(requestDetails.data);  // how do we undelete locally?
				}				
				if(request.status == 409){
					hasError = true;
					self.notifyDeleteConflict();
					requestDetails.success = true;
				}
			}
			
			remoteUpdater.update(requestDetails);			
			
			if(!hasError){
				self.deleteLocalData(localActivity.activityId);
				//update screen so use the activtiyId passed in from ui, instead localActivity.activityId
				self.notifyItemDeleted(activityId);
			}		
		}
		
		this.update = function(completedQty, totalQty, note, locationId, locationName, categoryId, categoryName, activityId){
	    	// create new record for either sending or queueing
			//if activity id < 0 then, check if the activity has been updated in the local storage
			//since we rendered the page, thats why after this point use localActivity.activityId
			var  localActivity = getLocalActivity(activityId);
			
			//only send to server if quantity has changed
			var updateData = {"activityId": localActivity.activityId, 
							  "completedQuantity":completedQty,
							  "totalQuantity":totalQty,
							  "activityVersion": localActivity.activityVersion,
							  "siteLocationId": locationId,
							  "siteLocationName": locationName,
							  "activityCategoryId": categoryId,
							  "activityCategoryName": categoryName,
							  "note": note
							 };

			//update activities on appointment
			self.updateLocalData(updateData);
			
			//no need for locationName to be send to server
			delete updateData.siteLocationName;
			delete updateData.activityCategoryName;
				
			//Rest request
			var requestDetails = new $.RequestDetails(updateActivityUrl, 'POST', updateData);
			var remoteUpdater = new $.RemoteUpdater();
				
			consoleLog('activityEdit:model:update:activitities');
			//if the activity was added in offline mode and now user tries to update
			//the activity, change the entry in the queue instead of adding new entry
			if(localActivity.activityId < 0){
				consoleLog('activityEdit:model:update:activitities with negative id');
				//this method is called just before entry is added to the queue
				remoteUpdater.onBeforeAddToQueue = function(queue, requestDetails){
					var requests = queue.getAll();
					//find the add activity request
					for(var requestIndex in requests){
						var request = requests[requestIndex];
						
						//find matching activity in the request (multiple activities per add request)
						var requestData = jQuery.parseJSON(request.data);
						for(var activityIndex in requestData.activities){
							if(requestData.activities[activityIndex].activityId == localActivity.activityId){
								requestData.activities[activityIndex].completedQuantity = completedQty;
								requestData.activities[activityIndex].totalQuantity = totalQty;
								requestData.activities[activityIndex].note = note;
								requestData.activities[activityIndex].siteLocationId = locationId;
								request.data = JSON.stringify(requestData);
							}
					}						
						}
					queue.override(requests);
					return false;
				}
			}
			remoteUpdater.update(requestDetails);			
			consoleLog('activityEdit:model:updated');
			self.notifyUpdated();
		}
		/** END - UPDATE ACTIVITY */
		
		/** 
		 * 
		 * 
		 * START - ADD ACTIVITY 
		 * 
		 */
		function addActivitiesLocalData(activityData){
			var libActivityDao = new $.LibraryActivityDao();
			var appointment = getAppointment();
			
			var activityCode = activityData.code;
			var libActivity = libActivityDao.findByCode(activityCode);
			var location = null;
			if(activityData.siteLocationId){
				location = {id : activityData.siteLocationId, name: activityData.siteLocationName}
			}
			var category = null;
			if(activityData.activityCategoryId){
				category = {id: activityData.activityCategoryId, name: activityData.activityCategoryName}
			}
			var activity = {
					appointmentId : activityData.appointmentId,
					code: activityCode,						
					description: libActivity.name,
					completedQuantity: activityData.completedQuantity,
					totalQuantity: activityData.totalQuantity,
					note: activityData.note,
					activityId: activityData.activityId, //temporary mobile id
					siteLocation: location,
					category: category,
					/* 
					 * Mobile id needed in case when user added an lib activity then request takes longer to come back
					 * then screen to render (almost always the case, as request is asynch). Problem would be when
					 * when user wants to remove just added activity, 
					 * as page has been rendered with data-activity-id=<local id which has value less then 0>
					 * this lookup would fail, as call from the server had time to come back and update the activityId
					 */  
					localId: activityData.activityId,
					activityVersion: null
			};
			consoleLog("Adding temp activity: "+activity.activityId);
			appointment.activities.push(activity);
			updateAppointment(appointment);
		}

		/**
		 * Add activity to local storage and queue
		 */
		this.add = function(completedQty, totalQty, note, locationId, locationName, categoryId, categoryName, libraryActivityCode){
			consoleLog('libActivities:model:add');
			var sequenceDao = new $.SequenceDao();			
			var updateData = new Array();
			var appId = getAppointment().id;
			
			var data = {
				appointmentId : appId,
				code : libraryActivityCode,
				totalQuantity : totalQty,
				completedQuantity: completedQty,
				activityId: sequenceDao.getNextId(),//local id
				note: note,
				siteLocationId: locationId,
				siteLocationName: locationName,
				activityCategoryId: categoryId, 
				activityCategoryName: categoryName
			};

			addActivitiesLocalData(data);
			
			//no need for location name in the request
			delete data.siteLocationName;
			delete data.activityCategoryName;
			var addActivityUrl = escape(localStorage.ctx+"/rest/workflow/activity/addActivity/");
			updateData.push(data);
			//Rest request
			var requestDetails = new $.RequestDetails(	addActivityUrl, 
														'POST', 
														{activities: updateData}, 
														null, 
														"$.ActivityEditPageModel.callbackOnSuccess(requestData, response)",
														null);
			var remoteUpdater = new $.RemoteUpdater();
			consoleLog("Sending add activity update");
			remoteUpdater.update(requestDetails);
			self.notifyAdded();
		}
		
		function delActivitiesLocalData(sdata) {
			consoleLog("Deleting local activities not added to server");
			//consoleLog(sdata);
			var libActivityDao = new $.LibraryActivityDao();
			var appointment = getAppointment();
			var data = JSON.parse(sdata);
			
			for(var i = 0; i < data.activities.length; i++){
				var activityToDel = data.activities[i];
				var activityCode = activityToDel.code;

				var activity = {
						appointmentId : activityToDel.appointmentId,
						code: activityCode,						
						activityId: activityToDel.activityId, //temporary mobile id 
				};		
				if (activityToDel.activityId < 0)
				{
					consoleLog("Deleting temp activity: "+activity.activityId);
					appointment.activities.pop(activity);
				}
			}
			updateAppointment(appointment);			
		}
		
		
		/**
		 * static callback method - after 200 response from the server when activities has been added
		 */
		$.ActivityEditPageModel.callbackOnSuccess = function(requestData, response){
			consoleLog('callbackOnSuccess');
						
			var libActivityDao = new $.LibraryActivityDao();
			consoleLog('callbackOnSuccess:parse requestData'+requestData);
			
			//as its a static method find appointment in local storage
			//also make sure if returned appointemnt is the one in use we update it 
			var appointmentId = JSON.parse(requestData).activities[0].appointmentId;
			var appointment = AppointmentController.getAppointment();
			
			//if the appointment is not currently in use
			if(!appointment || appointment.id != appointmentId){
				appController = new AppController();
				appointment = appController.getCurrentAppointment(appointmentId);	
			}else{
				appController = AppointmentController;
			}
			consoleLog('callbackOnSuccess:update activities');
			for(var i = 0; i < response.activities.length; i++){
				var activityUpdate = response.activities[i];

				consoleLog('process activity update:' + activityUpdate.activityId);
				
				var found = false;
				for(var j = 0; j < appointment.activities.length; j++){
					var appActivity = appointment.activities[j];
					
					if(appActivity.activityId < 0 && appActivity.code == activityUpdate.code){
						consoleLog('activity updated:' + appActivity.activityId);
						found = true;
						appActivity.activityId = activityUpdate.activityId;
						appActivity.activityVersion = activityUpdate.activityVersion;
					}
				}
				if(!found){
					consoleLog('could not update activity id for id:' + activityUpdate.activityId + " code:"+ activityUpdate.code);
				}
				
			}
			appController.setAppointment(appointment);
			appController.save();
			consoleLog('callbackOnSuccess:updated appointment');			
		}
		
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyUpdated = function(){
			$.each(listeners, function(i){
				listeners[i].updateFinished();
			});
		}

		this.notifyAdded = function(){
			$.each(listeners, function(i){
				listeners[i].addFinished();
			});
		}
		
		
		this.notifyItemDeleted = function(){
			$.each(listeners, function(i){
				listeners[i].deleteFinished();
			});
		}
		
		this.notifyDataLoaded = function(activityData){
			$.each(listeners, function(i){
				listeners[i].dataLoadFinished(activityData);
			});
		}
		
	},
	
	ActivityEditPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			deleteFinished : function() { },
			updateFinished : function() { },
			addFinished : function() { },
			dataLoadFinished : function(activityData) { }
		}, list);
	}
});
	    					