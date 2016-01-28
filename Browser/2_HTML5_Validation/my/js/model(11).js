jQuery.extend({

	AssetManufacturerListPageModel: function(){
		
		var self = this;
		var listeners = new Array();
		var assetManufacturerDao = new $.AssetManufacturerDao();
		
		function sortManufacturers(type1, type2){
			 var x = type1.name;
			 var y = type2.name;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		this.dataLoaded = function(){
			consoleLog('model:assetManufacturerListPage:survey loaded');			
			var newAsset = sessionStorage.getObject('newAsset');
			var manufacturers = assetManufacturerDao.getByAssetType(newAsset.templateSurveyId, newAsset.assetType);			
			manufacturers.sort(sortManufacturers);			
			consoleLog('model:assetManufacturerListPage:loaded:'+manufacturers.length);
			self.notifyLoadFinish(manufacturers);
		}
		
		this.reloadData = function(){
			self.notifyReloadBegin();			
			
			var dataProvider = new $.AssetManufacturerRemoteDataProvider();
			
			//register callback
			dataProvider.dataLoaded = function(){
				self.notifyReloadFinish();
			}
			dataProvider.downloadData(true);	
		}
		
		/** data is pre-loaded on the home page... so fireup dataLoaded event  */
		this.loadData = function(){
			self.notifyLoadBegin();
			self.dataLoaded();
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(manufacturers){
			$.each(listeners, function(i){
				listeners[i].loadFinish(manufacturers);
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
	AssetManufacturerListPageModelListener: function(list) {
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
	    					