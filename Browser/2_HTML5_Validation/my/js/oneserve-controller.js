//
// Application controllers
//


// APPOINTMENT LIST Controller
function ListController() {
	this.activeList;

}

ListController.prototype.getCurrentAppointment = function() {

}

ListController.prototype.getAppointment = function(apptId) {
	//consoleLog('getAppointment: '+apptId);
	var data = localStorage.getObject('apptList');
	var appts = data.appointments;

	if (appts)
	{
		for (var x=0;x<appts.length;x++)
		{
			//consoleLog(appts[x].id + ' == ' + apptId);
			if (appts[x].id == apptId)
			{
				return appts[x];
			}
		}
	}
	return null;
}

ListController.prototype.getActiveList = function() {
	  //consoleLog("Get active list");
	  var data = localStorage.getObject('apptList');
	  var appts;
	  
	  try
	  {
		  if (localStorage.apptType == LIST_MY_APPTS || localStorage.apptType == undefined)
		  {
			  appts = data.appointments;  //appt object array
		  }
		  else if (localStorage.apptType == LIST_TEAM_APPTS)
		  {
			  appts = data.teamAppointments;
		  }
		  else
		  {
			  appts = data.alerts;
		  }
	  } catch (e)
	  {
		  consoleLog("Error: "+e);
	  }
	  
	return appts;
}

ListController.prototype.storeLists = function(listData) {
	//consoleLog("Stored lists");
	  localStorage.setObject('apptList',listData);
}

ListController.prototype.checkForRemovedAppointment = function() {
	console.log("Check any active appt is still in the list");
	var found = true;
	if (localStorage.apptActive && localStorage.apptActive > 0)
	{
		found = false;
		console.log("Check appt "+localStorage.apptActive+" is still in the list");
		var appts = localStorage.getObject('apptList');
		if (appts && appts.appointments)
		{
			for (var x=0;x<appts.appointments.length;x++)
			{
				if (appts.appointments[x].id == localStorage.apptActive)
				{
					found = true;
					break;
				}
			}
		}
	}
	return found;
}

ListController.prototype.checkForInProgress = function() {
	var data = localStorage.getObject('apptList');
	var appts;
	var inProgress = false;
	
	try
	{
		  if (localStorage.apptType == LIST_MY_APPTS)
		  {
			  appts = data.appointments;  //appt object array
		  }
		  else if (localStorage.apptType == LIST_TEAM_APPTS)
		  {
			  appts = data.teamAppointments;
		  }
		  else
		  {
			  appts = data.alerts;
		  }
	} catch (e)
	{
		  consoleLog("Error: "+e);
	}

	// see if we select the In Progress list on entry
	if (appts)
	{
		for (var x=0;x<appts.length;x++)
		{
			if (appts[x].statusId == APPT_IN_PROGRESS)
			{
				inProgress = true;
				//if appt was started and we re-login then apptActive = 0
				//so have to mark the appointment
				if((!localStorage.apptActive || localStorage.apptActive == "0") && appts[x].workState != 0){
					localStorage.setItem('apptActive', appts[x].id);
					break;
				}
			}
		}
	}
	return inProgress;
}

ListController.prototype.updateActiveList = function(appts) {
	  var data = localStorage.getObject('apptList');
	  
	  if (localStorage.apptType == LIST_MY_APPTS)
	  {
		  data.appointments = appts;
	  }
	  else if (localStorage.apptType == LIST_TEAM_APPTS)
	  {
		  data.teamAppointments = appts;
	  }
	  else
	  {
		  data.alerts = appts;
	  }

	  // update local storage
	  localStorage.setObject('apptList',data);
}

ListController.prototype.updateCurrentAppointmentInList = function(appt) {
	  // get the correct list
	  var appts = this.getActiveList();
	  
	  // loop through list for required appt
	  var x = 0;
	  for (var x=0;x<appts.length;x++)
	  {	
		  if (appts[x].id == appt.id)
		  {
			  appts[x] = appt;
			  this.updateActiveList(appts);
			  consoleLog("Updated " + appt.id + " in appt list");
			  break;
		  }
	  }	
}



// APPOINTMENT Controller
function AppController() {

	// this is likely to be the json representation rather than an object, not sure yet
	this.appointment;
	
    this.setAppointment = function(appointment) {
    	this.appointment = appointment;
    } 
	
    this.getAppointment = function() {
    	if(!this.appointment){
    		this.appointment = localStorage.getObject('currentAppointment');
    	}
    	return this.appointment;
    } 
    
    this.save = function(appt) {
    	if (appt != undefined)
    	{
    		this.appointment = appt;
    	}
    	if (this.appointment)
    	{
	    	consoleLog("Saving appointment: "+this.appointment.id);
	    	localStorage.setObject('currentAppointment',this.appointment);
	    	// do we also need to add back to the full appt list here?
	    	ApptListController.updateCurrentAppointmentInList(this.appointment);
    	}
    	else
    	{
    		console.log("Cannot save undefined appointment");
    	}
    }
    

    this.addAppointmentCallback = function (params) 
    {
    	consoleLog("addAppointmentCallback:Params: "+JSON.stringify(params));
    	
		// first stop the existing work state if necessary
    	var appt = AppointmentController.getCurrentAppointment(params.appointmentId);
		if (appt.workState != IDLE)
		{
			consoleLog('Stopping existing work state');
			AppointmentController.updateWorkState(2);
		}		
		var now = new Date();
		var date = getFormattedDateForUrl(now);
		// add to queue rather than send directly
		var data = {'sigEventCode':'RA', 'appointmentId':appt.id, 'noteId':params.noteId, 'note':params.note, 'date':date};
		var url = escape(localStorage.ctx+"/rest/workflow/job/addEvent/"+appt.jobRef);
		var requestDetails = new $.RequestDetails(url, 'POST', data,'event','');
		var remoteUpdater = new $.RemoteUpdater();			
		remoteUpdater.update(requestDetails);	 
		
		// now complete the current appointment
		var error = AppointmentController.completeAppointment(params.noteId);
		if (!error)
		{
			consoleLog("No errors, updating appointment");
			appt.statusId = APPT_COMPLETE;
			appt.workState = 0;	
			localStorage.apptActive = 0;
		}  	
		AppointmentController.save(appt);
		
		history.back();
    }
    
    this.completionCallback = function (params) 
    {
    	consoleLog("Params: "+JSON.stringify(params));		
    	var appt = AppointmentController.getCurrentAppointment(params.appointmentId);
		consoleLog("Completing appointment: "+params.appointmentId+","+appt.id);
    	consoleLog("Work_state: "+appt.workState);
		// first stop the existing work state if necessary
		if (appt.workState != IDLE)
		{
			consoleLog('Stopping existing work state');
			AppointmentController.updateWorkState(2);
		}		
		AppointmentController.completeAppointment(params.noteId);
		appt.statusId = APPT_COMPLETE;
		appt.workState = 0;	
		localStorage.apptActive = 0;
		
		AppointmentController.save(appt);
		
		// force a reload of the appointment
		displayAppointment();
    }    
}

/*
AppController.prototype.isRescheduled = function () {
	//alert(getMessage('appointment.rescheduled'));
	//simplePopup(localStorage.rescheduled,5000);
	//$( "#dialog-modal" ).dialog({
	//	height: 140,
	//	modal: true
	//});
	$.mobile.changePage( "appointmentList.html", { showLoadMsg: false } );
}
*/

AppController.prototype.updateWorkState = function (action){
	var res = localStorage.getObject('resource');
	// AJAX call to REST updateWorkState API
	// we need to know which workState/status value we are updating
	
	// create new record for either sending or queueing
	var now = new Date();
	var timestamp = getFormattedDate(now);
	var updateData = {"resourceRef":res.resourceId, "appointmentId":this.appointment.id, "workStateAction":action, "newWorkState":this.appointment.workState, "resourceRef":res.resourceId,"stateChangeDateTime": timestamp};
	var updateWorkStateUrl = escape(localStorage.ctx+"/rest/rs/resource/"+res.resourceId+"/workState");
	
	// add to queueing mechanism
	var requestDetails = new $.RequestDetails(updateWorkStateUrl, 'POST', updateData, 'workstate');
	var remoteUpdater = new $.RemoteUpdater();
	remoteUpdater.update(requestDetails);
	logUserAction("WorkState "+this.appointment.workState+" for appt: "+this.appointment.id);
}

AppController.prototype.completeAppointment = function (noteId) {
	consoleLog("completeAppointment");
	var now = new Date();
	var noteID = (noteId == undefined) ? 0: noteId;
	var date = getFormattedDateForUrl(now);
	// add to queue rather than send directly
	var url = escape(localStorage.ctx+"/rest/rs/completeAppointment/"+this.appointment.id+"/"+noteID+"/"+date);
	var requestDetails = new $.RequestDetails(url, 'POST', '','','');
	var remoteUpdater = new $.RemoteUpdater();
	logUserAction("Complete appt: "+this.appointment.id);
	
	var hasError = false;
	var errMsg = '';
	//override onError function
	remoteUpdater.onError = function(status, response, request, requestDetails)
	{
		  hasError = true;
		  errMsg = response.responseText;
		  requestDetails.success = true; // this is to remove from queue
		  var result = jQuery.parseJSON(response.responseText);
		  //check status
		  if(result.result_msg == 'REST0010')
		  {
			  alert(getMessage('appointment.rescheduled'));
			  $.mobile.changePage( "appointmentList.html", { showLoadMsg: false } );
	      }	
		  else
		  {			  
			  alert(getMessage('error')+"  "+result.result_msg);
		  }		  
	}
	$.mobile.showPageLoadingMsg();
	remoteUpdater.update(requestDetails);
	$.mobile.hidePageLoadingMsg();
	
	if(hasError)
	{
		consoleLog("Appointment completion failed for "+this.appointment.id+ " : "+errMsg);
	}

	return hasError;
}

AppController.prototype.appStateChange = function (id,action,noteId) {
	consoleLog("appStateChange: "+id+","+action);
	var workTimeTypeDao = new $.WorkTimeTypeDao();
	if (action == 'start')
	{
		// stop any existing work state first
		if (this.appointment.workState != IDLE)
		{
			this.updateWorkState(2);
		}
		this.appointment.workState = id;
		// check if action makes Appointment In Progress
		if (this.appointment.statusId != APPT_IN_PROGRESS && workTimeTypeDao.isProductive(id))
		{
			this.appointment.statusId = APPT_IN_PROGRESS;
			// set flag that we have an in_progress appointment so we can't start another
			//localStorage.apptActive = this.appointment.id;
		}
		// set flag that we have an in_progress appointment so we can't start another
		localStorage.apptActive = this.appointment.id;
		this.updateWorkState(1);
	}
	else if (action == 'stop')
	{	
		// check if action makes Appointment not In Progress
		// how do we know which status to update the appointment to here?
		if (this.appointment.statusId == APPT_IN_PROGRESS && !workTimeTypeDao.isProductive(id))
		{
			this.appointment.statusId = 4; // is this correct?
			// clear flag that we have an in_progress appointment so we can start another
			//localStorage.apptActive = 0;
		}	
		// clear flag that we have an in_progress appointment so we can start another
		localStorage.apptActive = 0;
		this.updateWorkState(2);
		this.appointment.workState = 0;	
	}
	else if (action == 'complete')
	{
		var params = {'appointmentId':this.appointment.id, 'noteId':noteId};
		var ans = customDialog(getMessage('appt.completeCheck'), this.completionCallback, params);
	}
	else {}
	this.save();
}

AppController.prototype.getCurrentAppointment = function (appId) {
	  // get the correct list
	  var appts = ApptListController.getActiveList();
	  
	  // loop through list for required appt
	  var x = 0;
	  for (x=0;x<appts.length;x++)
	  {	
		  if (appts[x].id == appId)
		  {
			  break;
		  }
	  }	
	  return appts[x];
}

AppController.prototype.getNotes = function (url,res) {
	  consoleLog("getting notes");
	  $.ajax({
			url: url,
			headers: getHeaders(res.user, res.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
			dataType: 'json',
			success: function(resp, status, req){
				localStorage.setObject('notes',resp.notes);
			},
			// Error handler
			error: function(req, status, err){
			  processGetRequestError(req, status, err);
			}
		  });
}

AppController.prototype.buttonClick = function(source) {
	$.mobile.showPageLoadingMsg();
	setTimeout(function(){
		var workTimeTypeId = $(source).attr('data-worktype');
		var action = $(source).attr('data-workaction');
		AppointmentController.appStateChange(workTimeTypeId, action);
		//having clicked 'Start work' check if we have before works starts surveys
		//and if the button should trigger user to complete them first
		if(action == 'start' && AppointmentController.needsToCompleteSurveyBeforeAnyWork(workTimeTypeId)){
			//navigate to surveyList page
			$.mobile.changePage( "surveyList.html", { showLoadMsg: true, transition: "slide"} );
			return;
		}else{
			displayAppointment();
		}
		$.mobile.hidePageLoadingMsg();
	}, 100);
	
}

AppController.prototype.needsToCompleteSurveyBeforeAnyWork = function(workTimeTypeId)
{
	var workTimeTypeDao = new $.WorkTimeTypeDao();
	if(workTimeTypeDao.shouldTriggerBeforeWorksStartsSurvey(workTimeTypeId))
	{
		var surveyDetailsDao = new $.SurveyDetailsDao();
		var status = SurveyCompletetionStage.BEFORE_WORKS_STARTS;
		return surveyDetailsDao.hasUncompletedSurveyWithCompletionStage(this.appointment, status);
	}
	return false;
}

AppController.prototype.addApptClick = function(source) {
	
	var AAPMA = getClientParam('AAPMA');
	var note = $('#addApptNote').val();
	if (AAPMA == 1 && note.length == 0)
	{
		$.mobile.silentScroll(0);
		showError(getMessage('addAppt.reasonRequired'));
	}
	else
	{
		AppointmentController.addAppointment($(source).attr('data-note'));
	}
	
	//alert('Additional Appointment done');
}

// determine if all the activities on the current appointment have been completed
AppController.prototype.checkActivitiesComplete = function () {
	var appointment = localStorage.getObject('currentAppointment');
	consoleLog("Checking for activity completion");
	var complete = true;
	var res = this.incompleteActivityCount();
	if (res.incompletedCount > 0)
	{
		complete = false;
	}
	return complete;
}

AppController.prototype.getSurveyStatusObjectCount = function () {
	var surveyDetailsDao = new $.SurveyDetailsDao();
	var appt = localStorage.getObject('currentAppointment');
	return surveyDetailsDao.getStatusCountByAppointment(appt);
}

//determine how many activities on the current appointment have still to be completed
AppController.prototype.incompleteActivityCount = function () {
	var appointment = localStorage.getObject('currentAppointment');
	consoleLog("Getting incomplete activity count");
	var incompletedCount = 0;
	var completedCount = 0;
	if (appointment.activities != undefined)
	{
		for (var x=0; x<appointment.activities.length; x++)
		{
			var activity = appointment.activities[x];
			//consoleLog("'"+activity.completedQuantity+"', '"+activity.totalQuantity+"', "+activity.appointmentId);
			// we have to check for all activities complete but ignoring job activities
			if(activity.appointmentId != ""){
				if (activity.completedQuantity != activity.totalQuantity)
				{			
					incompletedCount++;
				}else{
					completedCount++;
				}
			}
		}
	}
	
	return {incompletedCount:incompletedCount, completedCount:completedCount};
}


AppController.prototype.addAppointment = function (noteId) {
	consoleLog("addAppointment: "+noteId);
	var note = getNote(noteId)+": "+$('#addApptNote').val();
	consoleLog("Additional appointment: "+getNote(noteId));
	var params = {'appointmentId':this.appointment.id, 'noteId':noteId, 'note':note, 'appointmentJobRef':this.appointment.jobRef};
	customDialog(getMessage('addAppointmentMsg'), this.addAppointmentCallback, params);
}

