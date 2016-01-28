jQuery.extend({
	AppointmentEditPartPageController: function (model, view){
		
		selfController = this;
		
		//this.appointmentUpdated = function(){
		//	//consoleLog('currentAppointmentUpdated');
		//	model.loadData();
		//	view.hidePageLoading();
		//}
		
		this.refresh = function() {
			console.log("AppointmentEditPartPageModel:refresh");
			view.showPageLoading();
			//pass itself to be notified when we get the appointment back
			//loadApptList(true, true, selfController.appointmentUpdated);	
		}
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.AppointmentEditPartPageViewListener({
			refreshClicked : function(){
				selfController.refresh();
			},
			updateClicked : function(part,changeQuantity) {
				model.update(part,changeQuantity);
			},
			deleteClicked : function(part) {
				model.delete(part);
				$.mobile.changePage( "apptPartsList.html", { showLoadMsg: true, transition: "slide"});
			}			
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.AppointmentEditPartPageModelListener({
			loadBegin    : function() {
				console.log("AppointmentEditPartPageController:loadBegin");
				view.showPageLoading();
			},
			loadFinish   : function(part) {
				console.log("AppointmentEditPartPageController:loadFinish");
				view.update();
				$.mobile.hidePageLoadingMsg();
			},
			updateBegin : function() {
				console.log("AppointmentEditPartPageController:updateBegin");
				view.showPageLoading();
			},
			updateFinish : function(appointment,part) {
				console.log("AppointmentEditPartPageController:updateFinish");
				view.hidePageLoading();
				history.go(-1);
			}
		});
		model.addListener(modelListener);
		model.loadData();
	}
});