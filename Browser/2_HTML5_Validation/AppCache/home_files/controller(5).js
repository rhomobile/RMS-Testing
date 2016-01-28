jQuery.extend({
	AppointmentSigPageController: function (model, view){
		
		selfControler = this;
		
		this.appointmentUpdated = function(){
			consoleLog('currentAppointmentSigned');
			model.loadData();
			view.hidePageLoading();
		}
		
		this.refresh = function() {
			view.showPageLoading();
			//pass itself to be notified when we get the appointment back
			//loadApptList(true, true, selfControler.appointmentUpdated);	
		}
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.AppointmentSigPageViewListener({
			saveClicked : function(signature) {
				var sigObject = JSON.parse(signature);
				consoleLog('controller.saveClicked, length='+sigObject.length);
				
				if (sigObject.length < SIG_MIN_LENGTH)
				{
					consoleLog("Signature too short");
					view.signatureWarning();
				}
				else
				{
					model.save(signature);
				}
			},	
			clearClicked : function() {
				consoleLog('controller.clearClicked');
				model.clear();
			}				
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.AppointmentSigPageModelListener({
			loadBegin    : function() { 
				view.showPageLoading();
			},
			loadFinish   : function(appointment) {
				var viewOnly = false;
				view.update(appointment, viewOnly);				
				$.mobile.hidePageLoadingMsg();
			},
			updateBegin : function() {
				view.showPageLoading();
			},
			updateFinish : function(app) {
				view.hidePageLoading();
				showError(getMessage('signatureError'));
			}
		});
		model.addListener(modelListener);
		model.loadData();
	}
});