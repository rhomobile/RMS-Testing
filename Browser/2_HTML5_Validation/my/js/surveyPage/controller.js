jQuery.extend({
	ActivitiesPageController: function (model, view){
		
		console.log('ActivitiesPageController')
		selfConntroler = this;
		
		this.appointmentUpdated = function(){
			consoleLog('currentAppointmentUpdated');
			var app = localStorage.getObject('currentAppointment');
			model.getAll();
			view.hidePageLoading();
		}
		
		this.refresh = function() {
			view.showPageLoading();
			//pass itself to be notified when we get the appointment back
			loadApptList(true, true, selfConntroler.appointmentUpdated);
		}
		
		/**
		 * Listen to the view
		 */
		var viewListener = $.ActivitiesPageViewListener({
			refreshClicked : function(){
				//refresh all appointments
				selfConntroler.refresh();
			},
			itemClicked : function(activityId){
				localStorage.removeItem('libraryActivityListPage_libraryActivityCode');
				localStorage.removeItem('activityListPage_activityId');
				localStorage.activityListPage_activityId = activityId;
				$.mobile.changePage( "activityEdit.html", { showLoadMsg: true, transition: "slide"} );
			}
		});
		view.addListener(viewListener);
		
		var modelListener = $.ActivitiesPageModelListener({
			loadBegin    : function() { 

			},
			loadFinish   : function(appointment, list) {
				//read only if appointment complete or if appointment is not in progress
				var appointmentComplete = false;
				
				if (appointment.statusId == APPT_COMPLETE || appointment.statusId == APPT_COST_COMPLETE)
				{
					appointmentComplete = true;
				}
				if(appointmentComplete || localStorage.apptActive != appointment.id || appointment.workState == IDLE){
					view.readOnlyMode();
				}
				view.updateList(list);
			},			
			loadFail     : function() { 
			}
		});
		
		model.addListener(modelListener);
		model.getAll();
	}
});