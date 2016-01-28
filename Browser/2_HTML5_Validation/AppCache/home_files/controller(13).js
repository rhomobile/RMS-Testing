jQuery.extend({
	NewAssetModelPageController: function (model, view){
		
		selfConntroler = this;
		
		/**
		 * Listen to the view
		 */
		var viewListener = $.NewAssetModelPageViewListener({
			addModelClicked : function(modelRef) { 
				model.addModel(modelRef);
			}
		});
		view.addListener(viewListener);
		
		var modelListener = $.NewAssetModelPageModelListener({
			modelAdded: function(){
				//go back to addAsset.html
				window.history.go(-1);
			}
		});
		
		model.addListener(modelListener);
	}
});