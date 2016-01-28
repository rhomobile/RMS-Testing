jQuery.extend({
	NewAssetLocationPageController: function (model, view){
		
		selfConntroler = this;
		
		/**
		 * Listen to the view
		 */
		var viewListener = $.NewAssetLocationPageViewListener({
			addLocationClicked : function(locationName) { 
				model.addLocation(locationName);
			}
		});
		view.addListener(viewListener);
		
		var modelListener = $.ActivitiesPageModelListener({			
			locationAdded: function(){
				//go back to addAsset.html
				window.history.go(-1);
			}
		});
		
		model.addListener(modelListener);
	}
});