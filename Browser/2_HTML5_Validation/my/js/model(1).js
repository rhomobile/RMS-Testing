jQuery.extend({

	ServicesPageModel: function(){
		
		var self = this;
		var listeners = new Array();
		var serviceDao = new $.ServiceDao();
		
		var serviceAppointmentId = AppointmentController.getAppointment().service.id;
		var clientId = AppointmentController.getAppointment().clientId;
		
		function sortServices(service1, service2){
			 if(service1.id == serviceAppointmentId){
				 return -1;
			 }
			 if(service2.id == serviceAppointmentId){
				 return 1;
			 }
			 var x = service1.description;
			 var y = service2.description;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		this.dataLoaded = function(){
			consoleLog('model:servicesPage:services loaded');
			var services = serviceDao.getAllWithActivities(clientId);
			
			services.sort(sortServices);
			
			consoleLog('model:servicesPage:services loaded:'+services.length);
			self.notifyLoadFinish(services);
		}
		
		this.reloadData = function(){
			self.notifyReloadBegin();
			var dataProvider = new $.ServiceRemoteDataProvider();
			dataProvider.dataLoaded = function(){
				self.notifyReloadFinish();
			}
			dataProvider.downloadData(true);						
		}
		
		/** data is pre-loaded on the home page */
		this.loadData = function(){
			self.notifyLoadBegin();
			self.dataLoaded();
		}
		
		this.reload = function(){
			var dataProvider = new $.ServiceRemoteDataProvider();
			dataProvider.get(self);
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(services){
			$.each(listeners, function(i){
				listeners[i].loadFinish(services);
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
	ServicesPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(list) { },
			loadFail     : function() { },
			reloadBegin : function() { },
			reloadFinish : function() { }
		}, list);
	}
});
	    					