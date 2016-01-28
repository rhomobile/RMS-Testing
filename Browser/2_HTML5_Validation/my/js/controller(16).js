jQuery.extend({
	SearchJobPageController: function (model, view){
		
		controllerSelf = this;
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.LibraryActivitiesPageViewListener({
			addClicked : function(appointmentData) {
				view.showPageLoading('searchJob.addingAppointment', 'Adding appointment');
				//delay to allow dialog above to show (bug in jquery mobile?)
				setTimeout(function(){					
			    	model.addAppointment(appointmentData);
				}, 100);	    
			},
			
			searchClicked : function(text){
				model.loadData(text);
			}
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.LibraryActivitiesPageModelListener({
			loadBegin    : function() { 
				view.showPageLoading('searchJob.loadingResults', 'Loading results');
			},
			loadFinish   : function(activitiesList, serviceId) {
				view.updateList(activitiesList);
				view.hidePageLoading();
			},
			loadFail     : function() { 
				view.hidePageLoading();
				view.showError('searchJob.searchTimeout');
			},
			appointmentAdded : function(newAppointmentId){
				sessionStorage.newAppointmentId = newAppointmentId;
				
				//reload count then reload appointment list
				loadApptSummary(true);
				window.history.go(-1);
			},
			appointmentAddError : function(error, jobRef){
				view.hidePageLoading();
				view.showError(error, jobRef);
			},
			addBegin : function() {
				//do nothing we have already a message in addClicked
			}
			
		});
		model.addListener(modelListener);
	}
});