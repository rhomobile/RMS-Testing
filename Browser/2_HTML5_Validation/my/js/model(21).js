jQuery.extend({

	AppointmentEditPartPageModel: function(){
		var updatePartUrl = escape(localStorage.ctx+"/rest/stockMgmt/stockTransaction");
		var self = this;
		var listeners = new Array();		
		
		/** data is pre-loaded on the home page */
		this.loadData = function(){
			console.log("AppointmentEditPartPageModel:loadData");
			self.notifyLoadBegin();
			self.notifyLoadFinish(getAppointment());
		}	
		
		function getAppointment(){
			console.log("AppointmentEditPartPageModel:getAppointment");
			return AppointmentController.getAppointment();
		}
		
		function updateAppointment(appointment) {
			console.log("AppointmentEditPartPageModel:updateAppointment");
			AppointmentController.setAppointment(appointment);
			AppointmentController.save();
		}
		
		function updateLocalData(){
			console.log("AppointmentEditPartPageModel:updateLocalData");
			var appointment = getAppointment();
			//appointment.resolutionNotes = notesText;
			updateAppointment(appointment);
		}
		
		this.update = function(part, changeQuantity){
			console.log("AppointmentEditPartPageModel:update:  partId="+part.id);
			var appointment = getAppointment();
			
			// get the jobCost id from the costs array and update quantity
			var costs = appointment.costs;
			console.log("Original costs: "+JSON.stringify(appointment.costs));
			var jobCostId = 0;
			var jobCostAutocode = null;
			for (var x=0;x<costs.length;x++)
			{	
				if (costs[x].partId == part.id)
				{
					jobCostId = costs[x].id;
					costs[x].qty = part.noUsed;
					jobCostAutocode = costs[x].autocode;
					break;
				}
			}
			appointment.costs = costs;
			console.log("New costs: "+JSON.stringify(appointment.costs));
			// save appointment costs change
			updateAppointment(appointment);
			
			// get storeId for resource
			var res = localStorage.getObject('resource');
			
			// update data
			var updateData = {'type':STOCK_USAGE_UPDATE,
								'partId':part.id,
								'fromStoreId':'',
								'toStoreId':'',
								'ref':'',
								'apptId':appointment.id,
								'qty':0,
								'jobCostId':jobCostId};
			
			if (changeQuantity > 0)
			{
				updateData.fromStoreId = res.storeId;
				updateData.ref = 'Part usage increase from mobile';  // or leave blank
			}
			else
			{
				updateData.toStoreId = res.storeId;
				updateData.ref = 'Part usage decrease from mobile';  // or leave blank				
			}
			
			//if jobCostId added in offline will have negative id, so then send autocode
			if(jobCostId < 0)
			{
				updateData.jobCostAutocode = jobCostAutocode;
			}
			
			console.log(changeQuantity);
			changeQuantity = changeQuantity.toFixed(1);
			console.log(changeQuantity);			
			updateData.qty = Math.abs(changeQuantity);
			
			console.log("Cost usage_update data: "+JSON.stringify(updateData));
			//Rest request
			var requestDetails = new $.RequestDetails(updatePartUrl, 'POST', updateData,'transaction');
			var remoteUpdater = new $.RemoteUpdater();
			// How do we handle errors in the update?
			remoteUpdater.update(requestDetails);
			
			// update local store count 
			var storePartDao = new $.StorePartDao();
			var storePart = storePartDao.findByPartId(part.id);
			var qty = part.noAvail;
			storePart.qty = qty; //.toFixed(2);
			storePartDao.updateStorePart(storePart);
			
			self.notifyUpdateFinish(appointment,part);
			console.log("AppointmentEditPartPageModel:update:finished");
		}
		
		this.delete = function(part){
			console.log("AppointmentEditPartPageModel:delete");
			console.log("Deleting part: "+part.id);
			var appointment = getAppointment();
			
			// get the jobCost id from the costs array and update quantity
			console.log("Original costs: "+JSON.stringify(appointment.costs));
			var costs = appointment.costs;
			var newcosts = new Array();
			var jobCostId = 0;
			var jobCostAutocode = null;
			var changeQuantity = 0;
			for (x=0;x<costs.length;x++)
			{	
				if (costs[x].partId == part.id)
				{
					jobCostId = costs[x].id;
					changeQuantity = part.noUsed;
					jobCostAutocode = costs[x].autocode;
				}
				else
				{
					newcosts.push(costs[x]);
				}
			}
			// add back costs with this part removed
			appointment.costs = newcosts;
			console.log("New costs: "+JSON.stringify(appointment.costs));
			// save appointment
			
			// get storeId for resource
			var res = localStorage.getObject('resource');
			
			// update data for delete call
			var updateData = {'type':STOCK_USAGE_UPDATE,
								'partId':part.id,
								'fromStoreId':'',
								'toStoreId':res.storeId,
								'ref':'Part deleted from mobile',
								'apptId':appointment.id,
								'qty':0,
								'jobCostId':jobCostId,
								'jobCostAutocode':jobCostAutocode};

			// reverse the quantity so the server value goes to zero
			console.log(changeQuantity);
			changeQuantity = changeQuantity.toFixed(1);
			console.log(changeQuantity);			
			updateData.qty = Math.abs(changeQuantity);
			
			console.log("Cost usage_update data: "+JSON.stringify(updateData));
			//Rest request
			var requestDetails = new $.RequestDetails(updatePartUrl, 'POST', updateData,'transaction');
			var remoteUpdater = new $.RemoteUpdater();
			// How do we handle errors in the update?
			remoteUpdater.update(requestDetails);
			
			// TODO update store count 
			
			//self.notifyDeleteFinish(appointment,part);	
			console.log("AppointmentEditPartPageModel:delete:finished");
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
		
		this.notifyUpdateFinish = function(appointment,part){
			$.each(listeners, function(i){
				listeners[i].updateFinish(appointment,part);
			});
		}
		
		this.notifyDeleteFinish = function(appointment,part){
			$.each(listeners, function(i){
				listeners[i].deleteFinish(appointment,part);
			});
		}		
	},
	AppointmentEditPartPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(appointment) { },
			loadFail     : function() { },
			reloadBegin  : function() { },
			reloadFinish : function() { },
			updateBegin  : function() { },
			updateFinish : function(appointment,part) { },
			deleteFinish : function(appointment,part) { }			
		}, list);
	}
});
	    					