jQuery.extend({
	AddPartPageController: function (model, view){
		
		selfController = this;
		var addPartData = sessionStorage.getObject('addPartData');
		
		var addPartToAppointment = false;
		if(sessionStorage.addPartToAppointment)
		{
			addPartToAppointment = true;
		}
		
		this.refresh = function() {
			console.log("AddPartPageModel:refresh");
			view.showPageLoading();
		}
		
		/**
		 * Listen to the view events
		 */
		var viewListener = $.AddPartPageViewListener({
			refreshClicked : function(){
				selfController.refresh();
			},
			updateClicked : function(qtyPurchased, purchaseRef, qtyUsed) {
				model.add(qtyPurchased, purchaseRef, qtyUsed, addPartData.storePartId, addPartToAppointment);
			}
		});
		if(addPartToAppointment){
			view.addPartToAppointmentMode();
		}
		view.addListener(viewListener);
		
		
		/**
		 * Listen to the model events
		 */
		var modelListener = $.AddPartPageModelListener({
			loadBegin    : function() {
				console.log("AddPartPageController:loadBegin");
				view.showPageLoading();
			},
			loadFinish   : function(storePart, category, quantityUsed) {
				console.log("AddPartPageController:loadFinish");
				view.update(storePart, category, quantityUsed);
				$.mobile.hidePageLoadingMsg();
			},
			addBegin : function() {
				console.log("AddPartPageController:updateBegin");
				view.showPageLoading();
			},
			addFinish : function(qtyPurchased, purchaseRef, qtyUsed, storePartId) {
				var cameThroughCategoryPage = sessionStorage.partCategoryId == 'null' || sessionStorage.partCategoryId == 'undefined';
				var goBackPages = -2;
				if(cameThroughCategoryPage){
					goBackPages = -3;	
				}
				if(addPartToAppointment){
					goBackPages--;			
				}
				history.go(goBackPages);
				
				//view.showMessagePartPurchased();
				//reload screen
				//model.loadData(addPartData.storePartId, addPartData.appointmentId);
			}
		});
		model.addListener(modelListener);
		model.loadData(addPartData.storePartId, addPartData.appointmentId);
	}
});