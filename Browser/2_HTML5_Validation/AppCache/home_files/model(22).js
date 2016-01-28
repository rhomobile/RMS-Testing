jQuery.extend({

	AddPartPageModel: function(){
		var updatePartUrl = escape(localStorage.ctx+"/rest/stockMgmt/stockTransaction");
		var self = this;
		var listeners = new Array();		
		var storePartDao = new $.StorePartDao();
		
		
		/** data is pre-loaded on the home page */
		this.loadData = function(storePartId, appointmentId){
			console.log("AddPartPageModel:loadData");
			self.notifyLoadBegin();
			
			
			var storePart = storePartDao.findById(storePartId);
			consoleLog('storePartLoaded:'+storePart.id);
			
			var partCategoryDao = new $.PartCategoryDao();
			var category = partCategoryDao.findById(storePart.catId);
			consoleLog('partCategoryLoaded:'+category.id);
			var quantityUsed = null;
			
			//appointment here only to indicate that we accessing page
			//through appointment page
			if(appointmentId){ 
				consoleLog('appointment loaded:'+appointmentId);
				quantityUsed = getQuantityUsed(storePart.partId);
			}
			
			self.notifyLoadFinish(storePart, category, quantityUsed);
		}	
		
		function getQuantityUsed(partId){
			var quantityUsed = 0;
			var appoitment = getAppointment();
			if(appoitment.costs){			
				for (var x=0; x<costs.length; x++)
				{	
					if (costs[x].partId == partId)
					{
						quantityUsed = costs[x].qty;
						break;
					}
			}
			}
		}
		
		function getAppointment(){
			console.log("AddPartPageModel:getAppointment");
			return AppointmentController.getAppointment();
		}
		
		function updateAppointment(appointment) {
			console.log("AddPartPageModel:updateAppointment");
			AppointmentController.setAppointment(appointment);
			AppointmentController.save();
		}
		
		function createOrUpdateAppointmentCosts(storePart, qtyUsed){			
			var appointment = getAppointment();
			if(!qtyUsed){
				qtyUsed = parseFloat(0).toFixed(2);
			}
			
			
			var sequenceDao = new $.SequenceDao();
			var costIdMobileId = sequenceDao.getNextId();
			var costAutocode = sequenceDao.getAutocode(costIdMobileId);
			
			var cost = {id: costIdMobileId,
						partId: storePart.partId,
						qty: qtyUsed,
						autocode: costAutocode}
			
			// get the jobCost id from the costs array and update quantity
			var costs = appointment.costs;
			costs.push(cost);
			appointment.costs = costs;
			updateAppointment(appointment);
			
			return cost;
		}

		function recordPartPurchase(qtyPurchased, purchaseRef, storePart, addToAppointment){
			//update quantity in local storage
			storePart.qty = parseFloat(parseFloat(storePart.qty) + parseFloat(qtyPurchased)).toFixed(2);
			storePartDao.updateStorePart(storePart);
			var resource = localStorage.getObject('resource');
			
			//update data on the server
			var updateData = {  'type':STOCK_PURCHASE,
								'partId':storePart.partId,
								'fromStoreId':'',
								'toStoreId': resource.storeId,
								'ref':purchaseRef == null ? '' : purchaseRef,
								'qty':qtyPurchased};
			
			//register purchases against the job
			if(addToAppointment){
				updateData.apptId = getAppointment().id;
			}

			//Rest request
			var requestDetails = new $.RequestDetails(updatePartUrl, 'POST', updateData, 'transaction');
			var remoteUpdater = new $.RemoteUpdater();
			// How do we handle errors in the update?
			remoteUpdater.update(requestDetails);
		}
		
		function recordUsage(qtyUsed, storePart, storePartQtyBeforeTran, cost){
			var resource = localStorage.getObject('resource');
			
			//update data on the server
			var updateData = {  'type':STOCK_USAGE,
								'partId':storePart.partId,
								'fromStoreId':'',
								'toStoreId': '',
								'apptId': getAppointment().id,
								'qty':qtyUsed,
								'jobCostId': cost.id,
								'jobCostAutocode': cost.autocode};
			
			if (qtyUsed > 0)
			{
				updateData.fromStoreId = resource.storeId;
				updateData.ref = 'Part usage increase from mobile';  // or leave blank
			}
			else
			{
				updateData.toStoreId = resource.storeId;
				updateData.ref = 'Part usage decrease from mobile';  // or leave blank				
			}
			
			//decrease storePart qty level
			storePart.qty = parseFloat(parseFloat(storePart.qty) - parseFloat(qtyUsed)).toFixed(2);
			storePartDao.updateStorePart(storePart);
			
			var requestDetails = new $.RequestDetails(updatePartUrl, 'POST', updateData,'transaction');
			var remoteUpdater = new $.RemoteUpdater();
			// How do we handle errors in the update?
			remoteUpdater.update(requestDetails);

		}
		
		this.add = function(qtyPurchased, purchaseRef, qtyUsed, storePartId, addToAppointment){
			self.notifyAddBegin();
			var storePart = storePartDao.findById(storePartId);			
			var storePartQtyBeforeTran = parseFloat(storePart.qty).toFixed(2);
			
			if(qtyPurchased && qtyPurchased > 0) //stock purchased? 
			{
				recordPartPurchase(qtyPurchased, purchaseRef, storePart, addToAppointment);
			}
			
			if(addToAppointment) {
				// save appointment costs change
				var cost = createOrUpdateAppointmentCosts(storePart, qtyUsed);
				storePart = storePartDao.findById(storePartId);			
				recordUsage(qtyUsed, storePart, storePartQtyBeforeTran, cost);
			}
			
			self.notifyAddFinish(qtyPurchased, purchaseRef, qtyUsed, storePartId);			
			console.log("AddPartPageModel:update:finished");
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(storePart, category, quantityUsed){
			$.each(listeners, function(i){
				listeners[i].loadFinish(storePart, category, quantityUsed);
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
		
		this.notifyAddBegin = function(){
			$.each(listeners, function(i){
				listeners[i].addBegin();
			});
		}
		
		this.notifyAddFinish = function(qtyPurchased, purchaseRef, qtyUsed, storePartId){
			$.each(listeners, function(i){
				listeners[i].addFinish(qtyPurchased, purchaseRef, qtyUsed, storePartId);
			});
		}
		
	},
	AddPartPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(storePart, category, quantityUsed) { },
			loadFail     : function() { },
			reloadBegin  : function() { },
			reloadFinish : function() { },
			addBegin  : function() { },
			addFinish : function(qtyPurchased, purchaseRef, qtyUsed, storePartId) { }
		}, list);
	}
});
	    					