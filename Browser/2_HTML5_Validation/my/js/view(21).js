jQuery.extend({
	/**
	 */
	AppointmentEditPartPageView: function(){
		var self = this;
		var listeners = new Array();	
	    
		//unregister if we were on this page before
		$('#refreshAppointmentEditPart').die('vclick');
		$('#refreshAppointmentEditPart').live('vclick', function(event){
			self.notifyRefreshClicked();
		});
		
		// part update button handler
		$('#updatePart').die('vclick');
		$('#updatePart').live('vclick', function(event){
            var partData = JSON.parse(sessionStorage.partData);
			var noAvail = Number($('#appointmentEditPart #noavail').text());
			var newQty = Number($('#appointmentEditPart #qty').val());
			var noUsed = Number(partData.noUsed);
			// validate new quantity
			if (!validateBeforeUpdate(newQty, noAvail, noUsed))
			{
				return;
			}
			// update store amount on page
			noAvail = noAvail - (newQty - noUsed);
			
			// determine the change in qty
			var changeQuantity = (newQty - noUsed);
			
			// update stored part data
			partData.noUsed = Number(newQty).toFixed(1);		
			partData.noAvail = Number(noAvail).toFixed(1);	
			sessionStorage.partData = JSON.stringify(partData);
			
			$('#appointmentEditPart #noavail').text(noAvail);
			self.notifyUpdateClicked(partData,changeQuantity);
		});
		
		// part delete button handler
		$('#deletePart').die('vclick');
		$('#deletePart').live('vclick', function(event){
			var newQty = $('#appointmentEditPart #qty').val();
            var partData = JSON.parse(sessionStorage.partData);
			console.log("Delete part id: "+partData.partId+" ?");
			// confirmation screen
			var confMsg = getMessage('appointmentEditPart.delete.confirm','Are you sure you want to delete this part?');
			customDialog(getMessage('appointmentPartEdit.confirmDelete', confMsg), function(){
				self.notifyDeleteClicked(partData);
			});
		});
		
		this.update = function(){
			console.log("AppointmentEditPartPageView:update");
            var partData = JSON.parse(sessionStorage.partData);
			//console.log("Part id: "+partData.partId);
			//console.log("Used: "+partData.noUsed);
			//console.log("Available: "+partData.noAvail);	
			
			$('#appointmentEditPart #name').text(partData.name);
			$('#appointmentEditPart #partno').text(partData.partNo);
			$('#appointmentEditPart #desc').text(partData.desc);			
			$('#appointmentEditPart #noavail').text(getDisplayValue(partData.noAvail));
			$('#appointmentEditPart #qty').val(getDisplayValue(partData.noUsed));
			
			//add select text on click
			$('#appointmentEditPart input').click(function(){				
				this.setSelectionRange(0, 99);
			});
		}
		
		/**
		 * returns true if valid otherwise false
		 */
		function validateBeforeUpdate(newQty, storeQuantity, oldQuantity){
			console.log("Validating: "+newQty+","+storeQuantity+","+oldQuantity);
			cleanErrors();
			var valid = true;
			if(!newQty){ //fields empty?
				showError('Quantity field required');
				return false;
			}
			if (!isValidDouble(""+newQty)){
				showError('Quantity must be a valid number');
				return false;
			}
			if(newQty == 0){ //wrong button
				showError('Use the Delete button rather than setting the quantity to zero');
				return false;
			}			
			if(newQty < 0){ //any of less then zero?
				showError('Quantity cannot be less than zero');
				return false;
			}
			console.log(storeQuantity + oldQuantity);
			if(newQty > (storeQuantity + oldQuantity)){
				showError('Not enough parts in store');
				return false;
			}			
			return true;
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
    	
    	this.notifyUpdateClicked = function(part,changeQuantity){
    		console.log("notifyUpdateClicked: "+JSON.stringify(part));
    		$.each(listeners, function(i){
    			listeners[i].updateClicked(part,changeQuantity);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
    	
    	this.notifyDeleteClicked = function(part){
    		$.each(listeners, function(i){
    			listeners[i].deleteClicked(part);
    		});
    	}    	
	},
	AppointmentEditPartPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			updateClicked : function(part) { },
			refreshClicked : function() { },
			deleteClicked : function(part) { }			
		}, list);			
	}

});
