jQuery.extend({
	/**
	 * Activities page contains a list of activates
	 * both for appointment and the job.
	 * 
	 * Page has two mode: view and edit this is defined by data-mode parameter
	 */
	ActivitiesPageView: function(){
		var self = this;
		var activities = new Array(); //list activities
		var listeners = new Array();
		
		//unregister if we were on this page before
		$('#refreshActivityList').click(function(){
			self.notifyRefreshClicked();
		});
		
		function bindLinks()
		{
			$('#apptActivities a[data-identifier]').click(function(event, ui) {
				$('#apptActivities a[data-identifier]').unbind('click');
				var activityId = $(this).jqmData('identifier');
				consoleLog('activityId clicked'+activityId);
				self.notifyItemClicked(activityId);
			});
		}
		
		this.readOnlyMode = function(){
			$('#apptActivities #apptActivityList').addClass('ui-disabled');
			$('#apptActivities #addButton').remove();
		}
	
		this.showPageLoading = function() {
			$.mobile.showPageLoadingMsg();						
		}
		
		this.hidePageLoading = function() {
			$.mobile.hidePageLoadingMsg();
		}
		
		/** updates page layout */
		this.updateLayout = function(){
			$('#apptActivities').trigger('updatelayout');
		}
		
		this.updateList = function(activities){
			self.activities = activities;
			console.log('activities:view:updateList');
			var activityList = $('#apptActivityList');
			activityList.empty();
			for(var i = 0; i < activities.length; i++){
				var row = ich.activityRow(activities[i]);
				if(activities[i].activityType == 'job')
				{
					row.addClass('ui-disabled');
				}
				activityList.append(row);				
			}
			activityList.listview('refresh');
			bindLinks();
		}
    	this.notifyItemClicked = function(activityId){
    		$.each(listeners, function(i){
    			listeners[i].itemClicked(activityId);
    		});
    	}
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}    	
	},
	ActivitiesPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			refreshClicked : function() { },
			itemClicked : function(activityId) { }
		}, list);			
	}

});