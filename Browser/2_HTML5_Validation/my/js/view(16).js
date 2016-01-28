jQuery.extend({
	/**
	 * Library Activities page contains a lib activities for a selected service
	 * 
	 */
	SearchJobPageView: function(){
		var self = this;
		var listeners = new Array();		
		var $list = $('#searchJobPage #list');
		
		//validation when add button clicked
		function validateBeforeAdd($addButton){
			return true;
		}
		
		function getStartDate(){
			var date = new Date();
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();
			
			var dayStr = day;
			var monthStr = month;
			if(day < 10)
			{
				dayStr = "0" + day;
			}
			if(month < 10)
			{
				monthStr = "0" + month;
			}
			
			return {day: day, month: month, year: year, stringFormat: dayStr+"/"+monthStr+"/"+year};
		}
		
		function getStartTime(){
			var date = new Date();
			var hour = date.getHours();
			var minute = date.getMinutes();
			
			var hourStr = hour;
			var minuteStr = minute;
			if(hour < 10)
			{
				hourStr = "0" + hour;
			}
			if(minute < 10)
			{
				minuteStr = "0" + minute;
			}
			
			return {hour: hour, minute: minute, stringFormat: hourStr + ":" + minuteStr};
		}
		
		//add job button event
		var addButton = $('#searchJobPage a[data-object=add]'); 
		addButton.die('click');		
		addButton.live("click", function() {
			var $addButton = $(this);
			if(validateBeforeAdd($addButton))
			{
				var $container = $addButton.parents('li');
				var duration = $container.attr('data-duration');
				var startDate = getStartDate().stringFormat;					
				var startTime =  getStartTime().stringFormat;
				
				var appData = { 
								jobRef: $container.prev("[data-jobRef]").attr('data-jobRef'), 
								activities : new Array(),
								startDate: startDate,
								startTime: startTime,
								duration: duration
							  };
				
				$.each($container.find("input:checked"), function(index, item){
					var activity = {id: $(item).attr('data-activityId')};
					appData.activities.push(activity)
				});
				
				console.log(JSON.stringify(appData));	
				self.notifyAddClicked(appData);
			}
		});
		
		//search button event
		var searchJobFilter = $('#searchJobPage #searchButton'); 
		searchJobFilter.unbind('click');
		searchJobFilter.bind("click",function() {
			//search
			var filterValue = $('#searchJobPage #searchJobFilter').val();
			if(filterValue && filterValue.length > 0)
			{
				self.notifySearchClicked(filterValue);
			}else{
				showError(getMessage('searchJob.emptySearch', 'Enter search criteria first'));
			}
		});

		//clear search box
		$('#searchJobPage #searchJobFilterForm > div > a').unbind('click');
		$('#searchJobPage #searchJobFilterForm > div > a').bind('click', function(event){
			console.log('reset filter');
			$list.empty();
		});
		
		//event when activity is selected or unselected
		$('#searchJobPage input[type=checkbox]').die('change');
		$('#searchJobPage input[type=checkbox]').live('change', function(){
			var $this = $(this);
			var checkboxDuration = parseFloat($this.attr('data-duration'));
			var isChecked = $this.is(":checked");
			
			//$li - activityList container
			var $activityList = $this.parents('li[data-role=activityList]');
			var currentDuration = $activityList.attr('data-duration');
			currentDuration = parseFloat(currentDuration ? currentDuration : 0);
			var newDuration = 0;
			
			//add button
			var $addButton = $activityList.find('a[data-object=add]');
			
			//add or subtract clicked duration 
			if(isChecked)
			{
				newDuration = currentDuration + checkboxDuration;
				$addButton.removeClass('ui-disabled');
			}else{
				newDuration = currentDuration - checkboxDuration;
				//has any other check box selected?
				console.log('selected:' +$activityList.find('.ui-checkbox-on').length)
				if($activityList.find('.ui-checkbox-on').length <= 1) //current still is checked at this point 
				{
					$addButton.addClass('ui-disabled');
				}
			}
			$activityList.attr('data-duration', newDuration);
		});
		
		//event when job has been clicked
		$('#searchJobPage li[data-jobRef]').die('click');
		$('#searchJobPage li[data-jobRef]').live('click', function(event){
			//show hide activities after job link is clicked
			var $actList = $(this).next("li[data-role=activityList]");
			if(!$actList.is(":visible"))
			{
				$actList.find('[data-plugin=datepicker]').dropdownDatePicker();
				$actList.find('[data-plugin=timepicker]').dropdownTimePicker();
			}
			$actList.toggle(200);
		});
		
		//update list view
		function updateView(jobs, jobList){
			for(var i = 0; i < jobs.length; i++){
				var job = jobs[i];

				var address1 = job.site.address1 ? job.site.address1 : "";
				address1 = address1 + (job.site.address2 ? job.site.address2 + ", " : "");
				
				var address2 = job.site.address3 ? job.site.address3 + ", " : "";
				address2 = address2 + (job.site.address4 ? job.site.address4 : "");
				
				var jobRow = ich.jobRow({	ref:job.ref,
										clientRef: job.clientRef ? " - "+ job.clientRef : "",
										siteName: job.site.name,
										address1: address1,
										address2: address2,
										postcode: job.site.postcode});

				//create list of activities
				var activityList = job.activities;
				var activityContainer = ich.jobActivityContainerRow();
				for(var actIndex in activityList)
				{
					console.log('appending jobs')
					var activity = activityList[actIndex];					
					var jobActivityRow = ich.jobActivityRow({activityId: activity.id, 
															 name: activity.name,
															 duration: activity.duration});
					activityContainer.find('div[data-role="fieldcontain"]').prepend(jobActivityRow);
				}				
				jobList.append(jobRow);
				jobList.append(activityContainer);
			}
		}
		
		this.updateList = function(jobs){
			consoleLog('searchJob:view:updateList:'+jobs.length);
			$list.empty();
			
			updateView(jobs, $list);
						
			$list.trigger('create');
			$list.listview('refresh');
		}
		
		this.showError = function(errorMessageKey, jobRef){
			$.mobile.silentScroll(0);
			showError(getMessage(errorMessageKey, "Unable to add appointment, check if new appointment doesn't conflict with existing one"));
		}
		
		this.showPageLoading = function(msgKey, msg) {
			if(msg)
			{
				showLoadingMessage(getMessage(msgKey, msg));
			}else{
				$.mobile.showPageLoadingMsg();
			}
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
    	
    	this.notifyAddClicked = function(appointmentData){
    		$.each(listeners, function(i){
    			listeners[i].addClicked(appointmentData);
    		});
    	}
    	
    	this.notifySearchClicked = function(text){
    		$.each(listeners, function(i){
    			listeners[i].searchClicked(text);
    		});    		
    	}
	},
	SearchJobPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			addClicked : function() { },
			searchClicked : function(text) { }
		}, list);			
	}

});