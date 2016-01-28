jQuery.extend({

	AppointmentSigPageModel: function(){
		var signAppointmentUrl = escape(localStorage.ctx+"/rest/rs/appointment/");
		var self = this;
		var listeners = new Array();		
		
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
		
		function updateLocalData(signature){
			var appointment = getAppointment();
			var appointmentId = appointment.id;
			var updateData = {};
			var type = localStorage.getObject('signatureSelect');
			
			if (type == 0) // operative
			{
				appointment.operSig = signature;	
			}
			else // customer
			{
				appointment.custSig = signature;		
			}	
			updateAppointment(appointment);
		}
		
		this.save = function (signature){
			//consoleLog("model.save: "+signature);
			updateLocalData(signature);
			
			var appointment = getAppointment();
			var appointmentId = appointment.id;
			var updateData;
			var type = localStorage.getObject('signatureSelect');
			
			if (type == 0) // operative
			{
				updateData = {"operative_signature":signature};		
			}
			else // customer
			{
				updateData = {"customer_signature":signature};		
			}				
			
			//Rest request
			//consoleLog(type+",  "+JSON.stringify(updateData));
			var requestDetails = new $.RequestDetails(signAppointmentUrl + appointmentId, 'POST', updateData);
			var remoteUpdater = new $.RemoteUpdater();
			
			//called onError
			var hasError = false;
			//override onError function
			remoteUpdater.onError = function(status, request, response, requestDetails){ 
				consoleLog("Update Signature error: "+JSON.stringify(response));
				hasError = true;					
				requestDetails.success = true;		
			}
			if (!hasError)
			{
				showError(getMessage('signature.saved','Signature saved'),1000);
			}
			
			$.mobile.showPageLoadingMsg();
			remoteUpdater.update(requestDetails);
			$.mobile.hidePageLoadingMsg();			
			
			self.notifyUpdateFinish(appointment);
		}
		
		this.clear = function (){
			//consoleLog("model.clear");	
			clearSignature();
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
				listeners[i].signFinish(getAppointment());
			});
		}
	},
	AppointmentSigPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(appointment) { },
			loadFail     : function() { },
			reloadBegin  : function() { },
			reloadFinish : function() { },
			updateBegin  : function() { },
			signFinish : function(appointment) { }
		}, list);
	}
});
	    					