jQuery.extend({
	/**
	 * PartCategries page contains a list of partCategories
	 * for a client
	 */
	PartCategoryListPageView: function(){
		var self = this;
		var listeners = new Array();

		//unregister if we were on this page before
		$('a.partCategoryLink').die('vclick');
	    $('a.partCategoryLink').live('vclick', function(event, ui) {
	        event.preventDefault();
	    	consoleLog('click:partCategory link');
			var partCategoryId = $(this).jqmData('identifier');
			consoleLog('partCategoryId clicked'+partCategoryId);
			self.notifyItemClicked(partCategoryId);
		});
		
		$('#refreshPartCategoryList').die('vclick');
		$('#refreshPartCategoryList').live('vclick', function(event){
			consoleLog('refreshPartCategoryList');
			self.notifyRefreshClicked();
		});
	    
		/** updates page layout */
		this.updateLayout = function(){
			$('#partCategoryList #list').trigger('updatelayout');
		}
		
		this.updateList = function(partCategories){
			consoleLog('partCategories:view:updateList:'+partCategories.length);
			var partCategoriesList = $('#partCategoryList #list');			
			partCategoriesList.empty();
			
			for(var i = 0; i < partCategories.length; i++){
				var row = ich.partCategory(partCategories[i]);
				partCategoriesList.append(row);
			}
			partCategoriesList.listview('refresh');
			consoleLog('partCategories:view:updateList:refreshed');
		}
		
		this.updateHeader = function(serviceName){
			var assetHeader = $('#partCategoryListHeader');
			assetHeader.empty();
			var headerContent = ich.partCategoryListHeaderTempl({service: serviceName});
			assetHeader.append(headerContent);
			assetHeader.trigger('create');
			assetHeader.listview('refresh');
		}
		
		this.addPartToAppointmentMode = function(){
			displayOpenJobHeader("partCategoryList", true);
			displayStatusHeader();
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyItemClicked = function(partCategoryId){
    		$.each(listeners, function(i){
    			listeners[i].itemClicked(partCategoryId);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
	},
	PartCategoryListPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			itemClicked : function(partCategoryId) { },
			refreshClicked : function() { }
		}, list);			
	}

});
