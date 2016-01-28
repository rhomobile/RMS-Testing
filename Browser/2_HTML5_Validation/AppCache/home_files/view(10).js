jQuery.extend({
	/**
	 * AssetTypes page contains a list of types
	 * for a job
	 */
	AssetTypeListPageView: function(){
		var self = this;
		var listeners = new Array();
		var PENDING = 1;
		var IN_PROGRESS = 2;
		var COMPLETE = 3;
		var	APPROVED = 4;
		var	REJECTED = 5;
		
		function bindLinks()
		{
		    $('a.assetTypeLink').click(function(event) {
		    	$('a.assetTypeLink').unbind('click');
				var assetTypeId = $(this).jqmData('identifier');
				consoleLog('assetTypeId clicked:'+assetTypeId);
				self.notifyItemClicked(assetTypeId);
			});			
		}

		$('#refreshAssetTypeList').die('vclick');
		$('#refreshAssetTypeList').live('vclick', function(event){
			consoleLog('refreshAssetTypeList');
			self.notifyRefreshClicked();
		});
	    
		/** updates page layout */
		this.updateLayout = function(){
			$('#list').trigger('updatelayout');
		}
		
		this.updateList = function(types){
			consoleLog('assetTypeListPage:view:updateList:length:'+types.length);
			var assetTypeList = $('#assetTypeList');
			assetTypeList.empty();
			for(var i = 0; i < types.length; i++){
				var assetType = types[i];
				var row = ich.assetTypeRow(assetType);
				assetTypeList.append(row);
			}
			assetTypeList.listview('refresh');
			bindLinks();
			consoleLog('assetTypeListPage:view:updateList:refreshed');
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyItemClicked = function(assetTypeId){
    		$.each(listeners, function(i){
    			listeners[i].itemClicked(assetTypeId);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
	},
	AssetTypeListPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			itemClicked : function(assetTypeId) { },
			refreshClicked : function() { }
		}, list);			
	}

});
