jQuery.extend({
	/**
	 * Page for signatures
	 */
	AppointmentSigPageView: function(){
		var self = this;
		var listeners = new Array();

		//unregister if we were on this page before
		//$('#refreshAppointmentSig').die('vclick');
		//$('#refreshAppointmentSig').live('vclick', function(event){
		//	self.notifyRefreshClicked();
		//});
					 
		this.update = function(appointment, viewOnly){
			//consoleLog("view.update");								
			$('#saveSig').die('vclick');
			$('#saveSig').live('vclick', function(event){
				self.notifySaveClicked($('#sigdata').val());
			});	
			$('#clearSig').die('vclick');
			$('#clearSig').live('vclick', function(event){
				self.notifyClearClicked();
			});				
		}
		
		this.showPageLoading = function() {
			$.mobile.showPageLoadingMsg();						
		}
		
		this.hidePageLoading = function() {
			$.mobile.hidePageLoadingMsg();
		}		
		
		this.signatureWarning = function() {
			showError("Signature too short");
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}

    	this.notifySaveClicked = function(signatureData){
    		//consoleLog("view.notifySaveClicked: "+signatureData);
    		$.each(listeners, function(i){
    			listeners[i].saveClicked(signatureData);
    		});
    	}
    	
    	this.notifyClearClicked = function(){
    		//consoleLog("view.notifyClearClicked");    		
    		$.each(listeners, function(i){
    			listeners[i].clearClicked();
    		});
    	}    	
	},
	
	AppointmentSigPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			saveClicked : function(signatureData) {},
			clearClicked : function() {}
		}, list);			
	}

});
