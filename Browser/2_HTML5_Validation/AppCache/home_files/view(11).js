jQuery.extend({
	/**
	 * AssetManufacturers page contains a list of manufacturers
	 * for a job
	 */
	AssetManufacturerListPageView: function(){
		var self = this;
		var listeners = new Array();
		
		
		function bindLinks()
		{
			$('a.assetManufacturerLink').click(function(event, ui) {
				$('a.assetManufacturerLink').unbind('click');
				var assetManufacturerId = $(this).jqmData('identifier');
				consoleLog('assetManufacturerId clicked'+assetManufacturerId);
				self.notifyItemClicked(assetManufacturerId);
			});
		}
		
		$('#refreshAssetManufacturerList').die('vclick');
		$('#refreshAssetManufacturerList').live('vclick', function(event){
			consoleLog('refreshAssetManufacturerList');			
			self.notifyRefreshClicked();
		});
	    
		/** updates page layout */
		this.updateLayout = function(){
			$('#list').trigger('updatelayout');
		}
		
		this.updateList = function(manufacturers){
			consoleLog('assetManufacturerListPage:view:updateList:length:'+manufacturers.length);
			var assetManufacturerList = $('#assetManufacturerList');
			assetManufacturerList.empty();
			for(var i = 0; i < manufacturers.length; i++){
				var assetManufacturer = manufacturers[i];
				var row = ich.assetManufacturerRow(assetManufacturer);
				assetManufacturerList.append(row);
			}
			assetManufacturerList.listview('refresh');
			bindLinks();
			consoleLog('assetManufacturerListPage:view:updateList:refreshed');
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyItemClicked = function(assetManufacturerId){
    		$.each(listeners, function(i){
    			listeners[i].itemClicked(assetManufacturerId);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
	},
	AssetManufacturerListPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			itemClicked : function(assetManufacturerId) { },
			refreshClicked : function() { }
		}, list);			
	}

});
