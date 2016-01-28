jQuery.extend({
	/**
	 * Services page contains a list of services
	 * for a client
	 */
	AppointmentNotesPageView: function(){
		var self = this;
		var listeners = new Array();

		//unregister if we were on this page before
		$('#refreshAppointmentNotes').die('vclick');
		$('#refreshAppointmentNotes').live('vclick', function(event){
			self.notifyRefreshClicked();
		});
					    
		this.update = function(appointment, viewOnly){
			var template = ich.notesTemplate(appointment);
			if(viewOnly){
				$('#notesText', template).addClass('ui-disabled');
				$('#updateNotes', template).addClass('ui-disabled');
			}
			template.trigger('create');
			$('#contentList').empty().append(template);			
			
			
			$('#updateNotes').die('vclick');
			$('#updateNotes').live('vclick', function(event){
				self.notifyUpdateClicked($('#notesText').val());
			});
			
		}
		
		this.showPageLoading = function() {
			$.mobile.showPageLoadingMsg();						
		}
		
		this.hidePageLoading = function() {
			$.mobile.hidePageLoadingMsg();
		}		
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyUpdateClicked = function(notesText){
    		$.each(listeners, function(i){
    			listeners[i].updateClicked(notesText);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
	},
	AppointmentNotesPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			updateClicked : function(notesText) { },
			refreshClicked : function() { }
		}, list);			
	}

});
