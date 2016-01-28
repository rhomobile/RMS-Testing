jQuery.extend({
	/**
	 * Library Activities page contains a lib activities for a selected service
	 * 
	 */
	LibraryActivitiesPageView: function(){
		var self = this;
		var listeners = new Array();		
		
		//unregister if we were on this page before
		$('#refreshLibraryActivityList').click(function(event){
			consoleLog('refreshLibActivities');
			self.notifyRefreshClicked();
		});
		
		//unregister if we were on this page before
		$('#showMore').die('vclick');
		$('#showMore').live('vclick', function(event){
			//on iphone & andoird not having this one here causes automatic
			//click on next shown activity
			$('#libraryActivitiesList a[data-identifier]').unbind('click');
			consoleLog('showMoreClicked');
			self.notifyShowMoreClicked();
		});
		
		//function to delay the activity filter while typing
		var delay = (function(){
			  var timer = 0;
			  return function(callback, ms){
			    clearTimeout (timer);
			    timer = setTimeout(callback, ms);
			  };
		})();
		
		function bindLinks()
		{
			console.log('bindLinks()');
			$('#libraryActivitiesList a[data-identifier]').click(function(event, ui) {
				$('#libraryActivitiesList a[data-identifier]').unbind('click');
				var libraryActivityCode = $(this).attr('data-identifier');
				consoleLog('libraryActivityCode clicked'+libraryActivityCode);
				self.notifyItemClicked(libraryActivityCode);
			});
		}
		
		var libActivityFilter = $('#libActivityFilter'); 
		libActivityFilter.unbind('keyup change');
		libActivityFilter.bind("keyup change",function() {
			
			//delay search by 750ms
			delay(function(){
				var filterValue = $('#libActivityFilter').val();
				consoleLog('view:filterValue:'+filterValue);
				self.notifyFilterSet(filterValue);
				$('#libActivityFilterForm a').show();		
			}, 750);
		});

		$('#libActivityFilterForm a').unbind('vclick click');
		$('#libActivityFilterForm a').bind('vclick click', function(event){
			console.log('reset filter');
			self.notifyFilterSet(null);
		});
		
		this.setShowMoreVisible = function(visible){
			if(visible){
				$('#showMoreList').show();
			}else{
				$('#showMoreList').hide();
			}
		}
		
		/** updates page layout */
		this.updateLayout = function(){
			$('#libraryActivitiesList #list').trigger('updatelayout');
		}
		
		this.updateSubheader = function(subHeaderText){
			if(subHeaderText){
				var subheaderUI = $('#libraryActivitiesList #subheader');
				subheaderUI.html(ich.divider({text: subHeaderText}));
				subheaderUI.trigger('create');
				subheaderUI.listview('refresh');
				subheaderUI.show();
			}
		}
		
		function updateView(activities, lastLetter){
			var activitiesList = $('#libraryActivitiesList #list');
			
			for(var i = 0; i < activities.length; i++){
				var activity = activities[i];
				//if new character then add break entry
				var firstLetter = activity.name.charAt(0).toUpperCase();
				if(firstLetter != lastLetter){
					activitiesList.append(ich.divider({text: firstLetter}));
					lastLetter = firstLetter;
				}			
				var row = ich.libActivityRow(activities[i]);
				activitiesList.append(row);
			}
			setTimeout(function(){bindLinks()}, 750);
			
		}
		
		this.appendList = function(activities){
			var activitiesList = $('#libraryActivitiesList #list');
			//find last letter
			var lastLetter = $('#libraryActivitiesList #list > li.ui-li-divider').last().text();
			updateView(activities, lastLetter);
			
			activitiesList.trigger('create');
			activitiesList.listview('refresh');
		}
		
		this.updateList = function(activities){
			consoleLog('libActivities:view:updateList:'+activities.length);
			var activitiesList = $('#libraryActivitiesList #list');
			activitiesList.empty();
			
			var lastLetter = null;
			updateView(activities, lastLetter);
						
			activitiesList.trigger('create');
			activitiesList.listview('refresh');
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
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
    	
    	this.notifyShowMoreClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].showMoreClicked();
    		});
    	}
    	
    	this.notifyFilterSet = function(text){
    		$.each(listeners, function(i){
    			listeners[i].filterSet(text);
    		});    		
    	}
    	
    	this.notifyItemClicked = function(libActivityCode){
    		$.each(listeners, function(i){
    			listeners[i].itemClicked(libActivityCode);
    		});
    	}
	},
	LibraryActivitiesPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			refreshClicked : function() { },
			showMoreClicked : function() { },
			filterSet : function(text) { },
			itemClicked: function(libActivityCode){}
		}, list);			
	}

});