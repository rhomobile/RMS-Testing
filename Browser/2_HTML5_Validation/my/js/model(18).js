jQuery.extend({

	PartCategoryListPageModel: function(){
		
		var self = this;
		var listeners = new Array();
		var categoryDao = new $.PartCategoryDao();
		
		
		
		function sortCategorys(category1, category2){
			 var x = category1.name;
			 var y = category2.name;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		this.dataLoaded = function(partServiceId){
			consoleLog('model:partCategoryList:categories loaded');
			var categories = null;
			if(partServiceId){
				categories = categoryDao.findByServiceId(partServiceId);
			}else{
				categories = categoryDao.getAll();
			}
			
			categories.sort(sortCategorys);
			
			consoleLog('model:partCategoryList:categories loaded:'+categories.length);
			self.notifyLoadFinish(categories);
		}
		
		this.reloadData = function(){
			self.notifyReloadBegin();
			var dataProvider = new $.PartCategoryRemoteDataProvider();
			dataProvider.dataLoaded = function(){
				self.notifyReloadFinish();
			}
			dataProvider.downloadData(true);						
		}
		
		/** data is pre-loaded on the home page */
		this.loadData = function(partServiceId){
			self.notifyLoadBegin();
			self.dataLoaded(partServiceId);
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(categories){
			$.each(listeners, function(i){
				listeners[i].loadFinish(categories);
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
	PartCategoryListPageModelListener: function(list) {
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
	    					