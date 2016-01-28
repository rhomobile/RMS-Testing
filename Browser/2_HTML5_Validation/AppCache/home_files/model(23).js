jQuery.extend({	

	ImagePageModel: function(){
		var self = this;
		var listeners = new Array();
	    var appointmentImageUrl = escape(localStorage.ctx+"/rest/rs/appointmentImage/");
	    	
		this.uploadImageClicked = function(image,scale,scaled,rotated,newname){
			console.log("model:uploadImageClicked: "+image);
			
			// call REST API to upload
			var appointment = AppointmentController.getAppointment();
			var appointmentId = (appointment) ? appointment.id:0;  // should never be 0 but useful in dev
			var updateData = {"filename":image.name,
								"image":image.src,
								"scale":scale,
								"scaled":scaled,
								"rotated":rotated,
								"newname":newname}

			//Rest request
			//consoleLog(type+",  "+JSON.stringify(updateData));
			var requestDetails = new $.RequestDetails(appointmentImageUrl + appointmentId, 'POST', updateData);
			var remoteUpdater = new $.RemoteUpdater();
			
			// set uploaded flag on appointment  (at present cleared by any appointment refresh)
			appointment.imageUploaded = true;
			AppointmentController.save(appointment);
			
			//called onError
			var hasError = false;
			//override onError function
			remoteUpdater.onError = function(status, request, response, requestDetails){ 
				consoleLog("Upload image error: "+JSON.stringify(response));
				hasError = true;					
				requestDetails.success = true;		
			}
			if (!hasError)
			{
				var message = getMessage('image.uploaded','Image uploaded');
				if (scaled)
				{
					message += getMessage('image.scaled',' but has been scaled to approx '+MAX_IMAGE_WIDTH+'x'+MAX_IMAGE_HEIGHT);
				}
				showError(message,500);
			}
			
			$.mobile.showPageLoadingMsg();
			remoteUpdater.update(requestDetails);
			$.mobile.hidePageLoadingMsg();			
			
			//self.notifyUploadFinished(appointmentId, image);
		}				
		
		this.dataLoaded = function(){

			self.notifyLoadFinish();
		}
		
		this.loadData = function(){
			self.notifyLoadBegin();
			self.dataLoaded();
		}
		
		//this.sendLocalStorageToLogs = function() {
		//	sendToServer();
		//}
		
		//this.sendLogsToServer = function() {
		//	sendLogDataToServer();
		//}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(lastOffline, lastOnline, queuedItems, lastOfflineCheck){
			$.each(listeners, function(i){
				listeners[i].loadFinish(lastOffline, lastOnline, queuedItems, lastOfflineCheck);
			});
		}
		
		this.notifyQueueSent = function(){
			$.each(listeners, function(i){
				listeners[i].localStorageSent();
			});
		}		
	},
	ImagePageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			localStorageSent    : function() { },
			loadBegin    : function() { },
			loadFinish   : function(lastOffline, lastOnline, queuedItems) { }
		}, list);
	}
});
	    					