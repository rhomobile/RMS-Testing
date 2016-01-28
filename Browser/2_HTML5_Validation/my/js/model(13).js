jQuery.extend({	

	NewAssetModelPageModel: function(){
		var self = this;
		var listeners = new Array();

		this.addModel = function(assetName) {
			
			var newAsset = sessionStorage.getObject('newAsset');
			
			var sequenceDao = new $.SequenceDao();			
			newAsset.libraryAssetID = sequenceDao.getNextId();
			newAsset.libraryAssetName = assetName;
			
			sessionStorage.setObject('newAsset', newAsset);
			self.notifyModelAdded();
		}

		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyModelAdded = function(){
			$.each(listeners, function(i){
				listeners[i].modelAdded();
			});
		}
		
	},
	
	NewAssetModelPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			modelAdded    : function() { }
		}, list);
	}
});
	    					