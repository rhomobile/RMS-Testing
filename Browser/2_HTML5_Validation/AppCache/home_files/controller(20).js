jQuery.extend({
	AppointmentPartsPageController: function (model, view){
		
		selfController = this;
		
		this.appointmentUpdated = function(){
			consoleLog('currentAppointmentUpdated');
			model.loadData();
			view.hidePageLoading();
		}
		
		this.refresh = function() {
			view.showPageLoading();
			//pass itself to be notified when we get the appointment back
			loadApptList(true, true, selfController.appointmentUpdated);	
		}
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.AppointmentPartsPageViewListener({
			itemClicked : function(partId, noUsed, noAvail){
				var storePartDao = new $.StorePartDao();
				var partCategoryDao = new $.PartCategoryDao();
			    // get part details from store
				var partData = storePartDao.findByPartId(partId);
				// get part category by id
				var partCategory = partCategoryDao.findById(partData.catId);			
			    var part = {"id":partId,
			    			"name":partCategory.name,
			    			"partNo":partData.pn,
			    			"desc":partData.desc,
			    			"noUsed":noUsed, 
			    			"noAvail":noAvail};
				sessionStorage.partData = JSON.stringify(part);
				//sessionStorage.saveObject('partData',part);
				$.mobile.changePage( "apptPartEdit.html", { showLoadMsg: true, transition: "slide"});
			},
			refreshClicked : function(){
				selfController.refresh();
			},
			updateClicked : function(notesText) {
				model.update(notesText);
			},
			addPartClicked : function() {
				sessionStorage.setObject('addPartToAppointment', true);
				$.mobile.changePage( "partCategoryList.html", { showLoadMsg: true, transition: "slide"});
			}
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.AppointmentPartsPageModelListener({
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
				//showError(getMessage('notesUpdated'));
			}
		});
		model.addListener(modelListener);
		model.loadData();
	}
});