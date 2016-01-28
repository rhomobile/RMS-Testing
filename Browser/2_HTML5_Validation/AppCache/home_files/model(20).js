jQuery.extend({

	AppointmentPartsPageModel: function(){
		//var updateAppointmentUrl = escape(localStorage.ctx+"/rest/rs/appointment/");
		var self = this;
		var listeners = new Array();		
		
		/** data is pre-loaded on the home page */
		this.loadData = function(){
			self.notifyLoadBegin();
			self.notifyLoadFinish(getAppointment());
		}	
		
		function getAppointment(){
			return AppointmentController.getAppointment();
		}
		
		function updateAppointment(appointment) {
			AppointmentController.setAppointment(appointment);
			AppointmentController.save();
		}
		
		function updateLocalData(){
			var appointment = getAppointment();
			//appointment.resolutionNotes = notesText;
			updateAppointment(appointment);
		}
		
		this.update = function(notesText){
			/*
			self.notifyUpdateBegin();
			
			updateLocalData(notesText);
			
			var appointment = getAppointment();
			var appointmentId = appointment.id;
			
			var updateData = { 
					  		  "resolutionNotes":notesText
					 		 };			
			
			//Rest request
			var requestDetails = new $.RequestDetails(updateAppointmentUrl + appointmentId, 'POST', updateData);
			var remoteUpdater = new $.RemoteUpdater();
			remoteUpdater.update(requestDetails);
			
			self.notifyUpdateFinish(appointment);
			*/
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(appointment){
			$.each(listeners, function(i){
				listeners[i].loadFinish(appointment);
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
		
		this.notifyUpdateBegin = function(){
			$.each(listeners, function(i){
				listeners[i].updateBegin();
			});
		}
		
		this.notifyUpdateFinish = function(){
			$.each(listeners, function(i){
				listeners[i].updateFinish(getAppointment());
			});
		}
	},
	AppointmentPartsPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(appointment) { },
			loadFail     : function() { },
			reloadBegin  : function() { },
			reloadFinish : function() { },
			updateBegin  : function() { },
			updateFinish : function(appointemnt) { }
		}, list);
	}
});
	    					