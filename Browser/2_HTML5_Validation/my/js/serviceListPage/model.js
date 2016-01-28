jQuery.extend({	

	ActivitiesPageModel: function(){
		var updateActivityUrl = escape(localStorage.ctx+"/rest/workflow/activity/updateActivity");
		var deleteActivityUrl = escape(localStorage.ctx+"/rest/workflow/activity/deleteActivity/");
		var self = this;
		var listeners = new Array();
	
		this.getAppointment = function(){
			return AppointmentController.getAppointment();
		}
		
		this.updateAppointment = function(appointment) {
			AppointmentController.setAppointment(appointment);
			AppointmentController.save();
		}
		
		this.sortActivities = function(act1, act2){
			 var x = act1.activityType;
			 var y = act2.activityType;
			 var sort = ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 if(sort == 0){
				var a = act1.activityCode;
				var b = act2.activityCode;
				sort = ((a < b) ? -1 : ((a > b) ? 1 : 0));
			 }
			 if(sort == 0){
				 var a = act1.completedQty;
				 var b = act2.completedQty;
				 sort = ((a < b) ? -1 : ((a > b) ? 1 : 0)); 
			 }
			 return sort;
		}
		
		//list use in view.js/html
		this.getAll = function(){			
			self.notifyLoadBegin();
			var appointment = self.getAppointment();
			var activitiesRaw = appointment.activities;
			
			var activities = new Array();
			for(var index =0; index < activitiesRaw.length; index++){
				var activityRaw = activitiesRaw[index];
				var activity = new Object();
				
				activity.activityId = activityRaw.activityId;
				activity.activityType = (activityRaw.appointmentId) ? 'appointment' : 'job';
				
				activity.completedQty = parseFloat(activityRaw.completedQuantity).toFixed(2);
				activity.totalQty 	  = parseFloat(activityRaw.totalQuantity).toFixed(2);
				activity.activityStatus =  (activity.completedQty == activity.totalQty ? 'complete' : '');
				activity.progressPercent = (activity.completedQty == activity.totalQty ? null : (parseInt(activity.completedQty * 100 / activity.totalQty, 10)) + '%');
				activity.activityCode = activityRaw.code;
				activity.activityDescription = activityRaw.description;
				activity.activityNote = activityRaw.note;
				if(activityRaw.siteLocation){
					activity.locationName = activityRaw.siteLocation.name;
					activity.locationId = activityRaw.siteLocation.id;
				}
				activities.push(activity);
			}
			activities.sort(self.sortActivities);
			
	        self.notifyLoadFinish(appointment, activities);
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(appointment, list){
			$.each(listeners, function(i){
				listeners[i].loadFinish(appointment, list);
			});
		}
		
		this.notifyLoadFail = function(){
			$.each(listeners, function(i){
				listeners[i].loadFail();
			});
		}
		
	},
	ActivitiesPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(list) { },
			loadFail     : function() { }
		}, list);
	}//end ActivitiesPageModelListener
});
	    					