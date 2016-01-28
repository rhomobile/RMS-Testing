jQuery.extend({
	AppointmentNotesPageController: function (model, view){
		
		selfConntroler = this;
		
		this.appointmentUpdated = function(){
			consoleLog('currentAppointmentUpdated');
			model.loadData();
			view.hidePageLoading();
		}
		
		this.refresh = function() {
			view.showPageLoading();
			//pass itself to be notified when we get the appointment back
			loadApptList(true, true, selfConntroler.appointmentUpdated);	
		}
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.AppointmentNotesPageViewListener({
			refreshClicked : function(){
				selfConntroler.refresh();
			},
			updateClicked : function(notesText) {
				model.update(notesText);
			}
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.AppointmentNotesPageModelListener({
			loadBegin    : function() { 
				view.showPageLoading();
			},
			loadFinish   : function(appointment) {
				var appointmentComplete = false;
				var viewOnly = false;
				if (appointment.statusId == APPT_COMPLETE || appointment.statusId == APPT_COST_COMPLETE)
				{
					appointmentComplete = true;
				}
				if(appointmentComplete || localStorage.apptActive != appointment.id 
						|| appointment.workState == IDLE){
					viewOnly = true;
				}
				
				view.update(appointment, viewOnly);				
				$.mobile.hidePageLoadingMsg();
			},
			updateBegin : function() {
				view.showPageLoading();
			},
			updateFinish : function(app) {
				view.hidePageLoading();
				showError(getMessage('notesUpdated'));
			}
		});
		model.addListener(modelListener);
		model.loadData();
	}
});