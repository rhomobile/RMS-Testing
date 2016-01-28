jQuery.extend({

	NewAssetModelPageView: function(){
		var self = this;
		var listeners = new Array();
		
		$('#newAssetModelOk').die('vclick');
		$('#newAssetModelOk').live('vclick', function refresh(){
		
			var modelRef = $('#modelRef').val();
			
			if(!validate(modelRef)){
				return;
			}
			
			notifyAddModelClicked(modelRef);
		});

		/**
		 * returns true if valid otherwise false
		 */
		function validate(modelRef){
			if(modelRef == undefined || modelRef == null){
				showError(getMessage('modelRef.required', 'Model ref is required'));
				return false;
			}
			if(modelRef.length > 200){
				showError(getMessage('assetModel.toLong', 'Model can only be 200 characters long'));
				return false;
			}
			var newAsset = sessionStorage.getObject('newAsset');
			
			var assetTypeId = newAsset.assetType;
			var assetManufacturerId = newAsset.manufacturer;
			var surveyTemplateId = newAsset.templateSurveyId; 
			
			var surveyTemplateDao = new $.SurveyTemplateDao();
			var assetModels = surveyTemplateDao.getAssetModelListByAssetTypeAndTemplateSurveyId(assetManufacturerId, 
																							assetTypeId, 
																							surveyTemplateId);
			for(var i in assetModels)
			{
				if(assetModels[i].model.toLowerCase() == modelRef.toLowerCase()){
					showError(getMessage('assetModelExists', 'Model already exists'));
					return false;
				}
			}
			return true;
		}		
		
    	function notifyAddModelClicked(modelRef){
    		$.each(listeners, function(i){
    			listeners[i].addModelClicked(modelRef);
    		});
    	}
    	
		this.addListener = function(list){
			listeners.push(list);
		}
	},
	NewAssetModelPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			addModelClicked : function(name) { }
		}, list);			
	}

});