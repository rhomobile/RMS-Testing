jQuery.extend({
	/**
	 * Services page contains a list of services
	 * for a client
	 */
	AppointmentPartsPageView: function(){
		var self = this;
		var listeners = new Array();

		$('#addPart').die('vclick');
		$('#addPart').live('vclick', function(event, ui) {
			self.notifyAddPartClicked();
		});
		
		//unregister if we were on this page before
		$('a.apptPartLink').die('vclick');
	    $('a.apptPartLink').live('vclick', function(event, ui) {
	        event.preventDefault();
	    	//consoleLog('AppointmentPartsPageView:click:apptPartLink');
			partId = $(this).jqmData('identifier');
			//console.log("Part id: "+partId);
			noUsed = $(this).jqmData('used');
			//console.log("Used: "+noUsed);
			noAvail = $(this).jqmData('available');
			//console.log("Available: "+noAvail);	
			self.notifyItemClicked(partId,noUsed,noAvail);
		});
	    
		//unregister if we were on this page before
		$('#refreshAppointmentParts').die('vclick');
		$('#refreshAppointmentParts').live('vclick', function(event){
			self.notifyRefreshClicked();
		});
					
		
		this.update = function(appointment, viewOnly){
			if(viewOnly){
				$('#appointmentParts #addPart').addClass('ui-disabled');
			}
			
			consoleLog('apptParts:view:updateList ' + new Date().getTime());
			var apptParts = $('#appointmentParts #apptParts');
			apptParts.empty();			
			//console.log("COSTS: "+appointment.costs);		
			var costs = appointment.costs;
			
			var storePartDao = new $.StorePartDao();
			var partCategoryDao = new $.PartCategoryDao();
			console.log("StoreParts "+storePartDao.getAll());
			if (costs)
			{
				for (var x=0;x<costs.length;x++)
				{				
					// get part by partId
					var partData = storePartDao.findByPartId(costs[x].partId);
					console.log(JSON.stringify(partData));
					// get part category by id
					var partCategory = partCategoryDao.findById(partData.catId);
					console.log(partCategory);
					console.log(partCategoryDao.getAll());
					var part = {
							"partId":costs[x].partId,
							"name":partCategory.name,
							"partNo":partData.pn,
							"desc":partData.desc,
							"noUsed":getDisplayValue(costs[x].qty), 
							"noAvail":getDisplayValue(partData.qty)};
					
					var partHtml = ich.partsList(part);
					apptParts.append(partHtml);
				}
			}
			apptParts.listview('refresh');
			consoleLog('apptParts:view:updateList:refreshed ' + new Date().getTime());
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
    	
    	this.notifyItemClicked = function(partId, noUsed, noAvail){
    		$.each(listeners, function(i){
    			listeners[i].itemClicked(partId, noUsed, noAvail);
    		});
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
    	
    	this.notifyAddPartClicked = function() {
    		$.each(listeners, function(i){
    			listeners[i].addPartClicked();
    		});
    	}
	},
	AppointmentPartsPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			itemClicked : function(partId, noUsed, noAvail) { },
			updateClicked : function() { },
			refreshClicked : function() { },
			addPartClicked : function() {}
		}, list);			
	}

});
