jQuery.extend({

	LibraryActivitiesPageModel: function(){
		var self = this;
		var listeners = new Array();
		var libraryActivityDao = new $.LibraryActivityDao();
		var serviceDao = new $.ServiceDao();
		var serviceId = null;
		var clientId = null;
		
		function sortacts(act1, act2){
			 var x = act1.name;
			 var y = act2.name;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		this.dataLoaded = function(){
			var libraryActivities = null;
			if(self.serviceId){
				libraryActivities = libraryActivityDao.findByServiceIdAndClientId(self.serviceId, self.clientId);
			}else{
				libraryActivities = libraryActivityDao.findByClientId(self.clientId);
			}
			self.notifyLoadFinish(libraryActivities, self.serviceId);
		}
		
		/** data is pre-loaded on the home page */
		this.loadData = function(clientId, serviceId){
			consoleLog('loadData:serviceId:'+serviceId);
			self.serviceId = serviceId;
			self.clientId = clientId;
			self.notifyLoadBegin();
			self.dataLoaded();
		}
		
		this.reloadData = function(){
			self.notifyReloadBegin();
			var dataProvider = new $.LibraryActivityRemoteDataProvider();
			dataProvider.downloadData(true);
			
			dataProvider.dataLoaded = function(){
				//after activity download update count for services
				var serviceDao = new $.ServiceDao();
				serviceDao.updateLibraryActivityCount();
				
				self.notifyReloadFinish();
			}
		}
		
		this.getServiceDescription = function(serviceId){
			return serviceDao.findById(serviceId).description;
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
		
		this.notifyLoadFinish = function(activities, serviceId){
			$.each(listeners, function(i){
				listeners[i].loadFinish(activities, serviceId);
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
	LibraryActivitiesPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(list, serviceId) { },
			loadFail     : function() { },
			reloadBegin : function() { },
			reloadFinish : function() { }
		}, list);
	}
});
	    					