jQuery.extend({
	ActivityEditPageController: function (model, view){
				
		selfController = this,
		this.activityId = null;
		this.libraryActivityCode = null;
		
		this.activityId = localStorage.activityListPage_activityId;
		this.libraryActivityCode = localStorage.libraryActivityListPage_libraryActivityCode;
		localStorage.removeItem('libraryActivityListPage_libraryActivityCode');
		localStorage.removeItem('activityListPage_activityId');
		/**
		 * Listen to the view
		 */
		var viewListener = $.ActivityEditPageViewListener({
			deleteClicked : function() {
				view.showPageLoading();
				setTimeout(function(){
					model.deleteActivity(selfController.activityId);
				}, 100);
			},
			addUpdateClicked : function(completedQty, totalQty, note, locationId, locationName, categoryId, categoryName) { 
				view.showPageLoading();
				
				
				if(selfController.activityId == null){
					//add activity
					//need to delay call otherwise showPageLoading won't show on android
					setTimeout(function(){
						model.add(completedQty, totalQty, note, locationId, locationName, categoryId, categoryName, selfController.libraryActivityCode);	
					}, 100);
				}else{
					//update activity
					//need to delay call otherwise showPageLoading won't show on android				
					setTimeout(function(){
						model.update(completedQty, totalQty, note, locationId, locationName, categoryId, categoryName, selfController.activityId);	
					}, 100);
				}
				
			}
		});
		view.addListener(viewListener);
		if(this.activityId == null)
		{
			view.addMode();
		}
		var modelListener = $.ActivityEditPageModelListener({
			updateFinished: function(){
				window.history.go(-1);
			},
			addFinished: function(){
				window.history.go(-3);
			},
			dataLoadFinished : function(activityData){
				view.update(activityData);
			},
			deleteFinished : function(){
				window.history.go(-1);
			}
		});
		
		model.addListener(modelListener);
		model.loadData(this.activityId, this.libraryActivityCode);
	}
});