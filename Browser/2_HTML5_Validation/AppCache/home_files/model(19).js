jQuery.extend({

	StorePartListPageModel: function(){
		var self = this;
		var listeners = new Array();
		var storePartDao = new $.StorePartDao();
		var partCategoryDao = new $.PartCategoryDao();
		var partCategoryId = null;
		var includeUsageQty = false;
		
		function sortStoreParts(storePart1, storePart2){
			 var x = storePart1.desc;
			 var y = storePart2.desc;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		this.dataLoaded = function(){
			var storePartList = null;
			if(self.partCategoryId){
				storePartList = storePartDao.findByPartCategory(self.partCategoryId);
			}else{
				storePartList = storePartDao.getAll();
			}
			if(self.includeUsageQty){
				
				var costs = getAppointment().costs;
				for(var i=0; i < storePartList.length; i++)
				{						
					var storePart = storePartList[i];
					storePart.usedQty = parseFloat(0).toFixed(2);
					if (costs)
					{
						for (var x=0; x < costs.length; x++)
						{
							var cost = costs[x];						
							if(storePart.partId == cost.partId){
								storePart.usedQty = parseFloat(cost.qty).toFixed(2);
								break;
							}
						}
					}
				}
			}
			
			storePartList.sort(sortStoreParts);
			consoleLog('storePartList:dataLoaded:found:'+storePartList.length);
			self.notifyLoadFinish(storePartList, self.partCategoryId);
		}
		
		/** data is pre-loaded on the home page */
		this.loadData = function(partCategoryId, includeUsageQty){
			consoleLog('storePartList:loadData:partCategoryId:'+partCategoryId);
			self.partCategoryId = partCategoryId;
			self.includeUsageQty = includeUsageQty;
			self.notifyLoadBegin();
			self.dataLoaded();
		}
		
		this.reloadData = function(){
			self.notifyReloadBegin();
			var dataProvider = new $.LibraryActivityRemoteDataProvider();
			dataProvider.downloadData(true);
			
			dataProvider.dataLoaded = function(){
				self.notifyReloadFinish();
			}
		}
		
		this.getPartCategoryDescription = function(partCategoryId){
			return partCategoryDao.findById(partCategoryId).name;
		}		
		
		function getAppointment(){
			return AppointmentController.getAppointment();
		}
		
		function updateAppointment(appointment) {
			AppointmentController.setAppointment(appointment);
			AppointmentController.save();
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(storeParts, partCategoryId){
			$.each(listeners, function(i){
				listeners[i].loadFinish(storeParts, partCategoryId);
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
	},
	StorePartListPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(list, partCategoryId) { },
			loadFail     : function() { },
			reloadBegin : function() { },
			reloadFinish : function() { }
		}, list);
	}
});
	    					