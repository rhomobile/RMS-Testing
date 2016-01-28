jQuery.extend({
	StorePartListPageController: function (model, view){
		
		controllerSelf = this;
		
		var addPartToAppointment = false;
		if(sessionStorage.addPartToAppointment)
		{
			addPartToAppointment = true;
		}
		
		var partCategoryId = sessionStorage.partCategoryId;
		if(partCategoryId == 'null' || partCategoryId == 'undefined')
		{
			//we selected all part categories
			partCategoryId = null;
		}
		
		this.PAGE_SIZE = 20;
		this.listStart = 0;
		this.filterText = null;

		//list with all results
		this.storePartList = new Array();
		
		//filtered list
		this.filteredList = new Array();
		this.hasMore = false;
		
		function displayList(text){
			var result = filterList(text);
			var filteredList = result.list;
			
			var appendToResults = result.append;			
			
			if(appendToResults){
				for(var i in filteredList){
					controllerSelf.filteredList.push(filteredList[i]);
				}
				view.appendList(filteredList);
			}else{
				controllerSelf.filteredList = filteredList;
				view.updateList(controllerSelf.filteredList);				
			}
			
			
			view.setShowMoreVisible(controllerSelf.hasMore);
		}
		
		/**
		 * @returns {Boolean} - true if item matches the filter, false if should be filtered
		 */
		function filter(text, storePart){
			if(text == null || text == ''){
				return true;
			}
			text = text.toLowerCase();
			
			if(storePart.pn.toLowerCase().indexOf(text) >= 0 || 
					storePart.desc.toLowerCase().indexOf(text) >= 0){
				return true;
			}
			return false;
		}
		
		this.append = false;
		
		function filterList(text){
			var storePartList = controllerSelf.storePartList;
			
			//indicates if returned list contains all entries or just partial results
			//so it should be appended at the end of the current results
			var append = controllerSelf.append;
			
			//new filter text set reset the filter values
			if(text != controllerSelf.filterText || !append){	
				controllerSelf.filteredList = new Array();
				controllerSelf.listStart = 0;
				controllerSelf.filterText = text;
				append = false;
			}

			var filteredList = new Array();
			
			//filter list, also check if we should display 'Show more button...'
			var listLimit = false;
			controllerSelf.hasMore = false;
			
			for(var i = controllerSelf.listStart; i < storePartList.length; i++){
				var storePart = storePartList[i];
				
				if(filter(text, storePart)){
					if(listLimit){
						controllerSelf.hasMore = true;
						break;
					}
					filteredList.push(storePart);
				}
				
				//don't show more results then page size
				if(filteredList.length >= controllerSelf.PAGE_SIZE){
					listLimit = true;
				}

				controllerSelf.listStart++;
			}
			return {list: filteredList, append: append};
		}
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.StorePartListPageViewListener({
			refreshClicked : function(){
				view.showPageLoading();
				model.reloadData();
			},
			showMoreClicked : function(){
				controllerSelf.append = true;
				displayList(controllerSelf.filterText);
			},
			
			filterSet : function(text){
				displayList(text);
			},
			itemClicked : function(storePartId){
				//create new part data in sessionStorage used by addPart.html
				sessionStorage.setObject("addPartData", {storePartId: storePartId, 
														 addPartToAppointment: addPartToAppointment
														 });

				$.mobile.changePage( "addPart.html", { showLoadMsg: true, transition: "slide"} );
			}
		});
		view.addListener(viewListener);
		
		
		if(addPartToAppointment){
			view.addPartToAppointmentMode();
		}
		
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.StorePartListPageModelListener({
			loadBegin    : function() { 
				view.showPageLoading();
			},
			loadFinish   : function(storePartList, partCategoryId) {
				
				controllerSelf.storePartList = storePartList;
				displayList(controllerSelf.filterText);
				if(partCategoryId == null){
				}else{
					view.updateSubheader(model.getPartCategoryDescription(partCategoryId));
				}
				view.hidePageLoading();
			},
			loadFail     : function() { 

			},
			reloadBegin : function() {
				view.showPageLoading();
				controllerSelf.append = false;
			},
			reloadFinish : function() {
				model.loadData(partCategoryId ? partCategoryId : null, addPartToAppointment);
				view.hidePageLoading();
			},
		});
		model.addListener(modelListener);
		model.loadData(partCategoryId ? partCategoryId : null, addPartToAppointment);
	}
});