jQuery.extend({
	LibraryActivitiesPageController: function (model, view){
		
		controllerSelf = this;
		var clientId = AppointmentController.getAppointment().clientId;
		
		
		this.PAGE_SIZE = 20;
		this.listStart = 0;
		this.filterText = null;

		//list with all results
		//if lib activity is filtered by service this contains only activities associated with the service
		this.activitiesList = new Array();
		
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
		function filter(text, activity){
			if(text == null || text == ''){
				return true;
			}
			text = text.toLowerCase();
			
			if(activity.code.toLowerCase().indexOf(text) >= 0 || 
					activity.name.toLowerCase().indexOf(text) >= 0){
				return true;
			}
			return false;
		}
		
		this.append = false;
		
		function filterList(text){
			var activitiesList = controllerSelf.activitiesList;
			
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
			
			for(var i = controllerSelf.listStart; i < activitiesList.length; i++){
				var activity = activitiesList[i];
				
				if(filter(text, activity)){
					if(listLimit){
						controllerSelf.hasMore = true;
						break;
					}
					filteredList.push(activity);
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
		var viewListener = $.LibraryActivitiesPageViewListener({
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
			itemClicked : function(libraryActivityCode){
				localStorage.removeItem('libraryActivityListPage_libraryActivityCode');
				localStorage.removeItem('activityListPage_activityId');
				localStorage.libraryActivityListPage_libraryActivityCode = libraryActivityCode;
				$.mobile.changePage( "activityEdit.html", { showLoadMsg: true, transition: "slide"} );
			}
		});
		view.addListener(viewListener);
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.LibraryActivitiesPageModelListener({
			loadBegin    : function() { 
				view.showPageLoading();
			},
			loadFinish   : function(activitiesList, serviceId) {
				
				controllerSelf.activitiesList = activitiesList;
				displayList(controllerSelf.filterText);

				if(serviceId == null){
				}else{
					view.updateSubheader(model.getServiceDescription(serviceId));
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
				if(sessionStorage.serviceId == 'undefined'){	
					model.loadData(clientId, null);
				}else{
					model.loadData(clientId, sessionStorage.serviceId);
				}
				view.hidePageLoading();
			},
		});
		model.addListener(modelListener);
		if(sessionStorage.serviceId == 'undefined'){	
			model.loadData(clientId, null);
		}else{
			model.loadData(clientId, sessionStorage.serviceId);
		}
	}
});