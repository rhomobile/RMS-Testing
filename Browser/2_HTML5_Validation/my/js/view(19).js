jQuery.extend({
	/**
	 * Library Activities page contains a lib activities for a selected service
	 * 
	 */
	StorePartListPageView: function(){
		var self = this;
		var listeners = new Array();		
		
		//unregister if we were on this page before
		$('#refreshPartList').click(function(event){
			consoleLog('refreshPartList');
			self.notifyRefreshClicked();
		});
		
		//unregister if we were on this page before
		$('#showMore').die('vclick');
		$('#showMore').live('vclick', function(event){
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
			$('#storePartListPage a[data-identifier]').click(function(event, ui) {
				$('#storePartListPage a[data-identifier]').unbind('click');
				var storePartId = $(this).jqmData('identifier');
				self.notifyItemClicked(storePartId);
			});
		}
		
		var storePartFilter = $('#storePartFilter'); 
		storePartFilter.unbind('keyup change');
		storePartFilter.bind("keyup change",function() {
			
			//delay search by 750ms
			delay(function(){
				var filterValue = storePartFilter.val();
				consoleLog('view:filterValue:'+filterValue);
				self.notifyFilterSet(filterValue);
				$('#storePartFilterForm a').show();		
			}, 750);
		});

		$('#storePartFilterForm a').unbind('vclick click');
		$('#storePartFilterForm a').bind('vclick click', function(event){
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
			$('#storePartListPage #list').trigger('updatelayout');
		}
		
		this.updateSubheader = function(subHeaderText){
			if(subHeaderText){
				var subheaderUI = $('#storePartListPage #subheader');
				subheaderUI.html(ich.divider({text: subHeaderText}));
				subheaderUI.trigger('create');
				subheaderUI.listview('refresh');
				subheaderUI.show();
			}
		}
		
		function updateView(storePartList, lastLetter){
			var uiList = $('#storePartListPage #list');
			
			for(var i = 0; i < storePartList.length; i++){
				var storePart = storePartList[i];
				//if new character then add break entry
				var firstLetter = storePart.desc.charAt(0).toUpperCase();
				if(firstLetter != lastLetter){
					uiList.append(ich.divider({text: firstLetter}));
					lastLetter = firstLetter;
				}
				var qty = storePart.qty ? storePart.qty : 0;
				storePart.qty = parseFloat(qty).toFixed(2);
				var row = ich.storePartRow(storePart);
				uiList.append(row);
			}
			bindLinks();
		}
		
		this.appendList = function(storeParts){
			var activitiesList = $('#storePartListPage #list');
			//find last letter
			var lastLetter = $('#storePartListPage #list > li.ui-li-divider').last().text();
			updateView(storeParts, lastLetter);
			
			activitiesList.trigger('create');
			activitiesList.listview('refresh');
		}
		
		this.updateList = function(storePartList){
			consoleLog('storePartList:view:updateList:'+storePartList.length);
			var uiStorePartList = $('#storePartListPage #list');
			uiStorePartList.empty();
			
			var lastLetter = null;
			updateView(storePartList, lastLetter);
						
			uiStorePartList.trigger('create');
			uiStorePartList.listview('refresh');
		}
		
		this.showPageLoading = function() {
			$.mobile.showPageLoadingMsg();						
		}
		
		this.hidePageLoading = function() {
			$.mobile.hidePageLoadingMsg();
		}
		
		this.addPartToAppointmentMode = function(){
			displayOpenJobHeader("storePartListPage", true);
			displayStatusHeader();
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
    	
    	this.notifyItemClicked = function(storePartId){
    		$.each(listeners, function(i){
    			listeners[i].itemClicked(storePartId);
    		});
    	}
	},
	StorePartListPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			refreshClicked : function() { },
			showMoreClicked : function() { },
			filterSet : function(text) { },
			itemClicked: function(storePartId){}
		}, list);			
	}

});