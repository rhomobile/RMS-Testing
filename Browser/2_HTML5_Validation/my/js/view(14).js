jQuery.extend({

	NewAssetLocationPageView: function(){
		var self = this;
		var listeners = new Array();
		
		$('#newAssetLocationOk').die('vclick');
		$('#newAssetLocationOk').live('vclick', function refresh(){
			var locationName = $('#locationName').val();
			
			if(!validate(locationName)){
				return;
			}
			
			notifyAddLocationClicked(locationName);
		});

		/**
		 * returns true if valid otherwise false
		 */
		function validate(locationName){
			if(locationName == undefined || locationName == null){
				showError(getMessage('locationName.required', 'Location name is required'));
				return false;
			}
			if(locationName.length > 200){
				showError(getMessage('locationName.toLong', 'Name can only be 200 characters long'));
				return false;
			}
			
			var newAsset = sessionStorage.getObject('newAsset');
			var siteSurveyId = newAsset.siteSurveyID;
			var surveyDetailsDao = new $.SurveyDetailsDao();
			var assetLocations = surveyDetailsDao.findSiteLocationsBySiteSurveyId(siteSurveyId);

			for(var i in assetLocations)
			{
				consoleLog("Existing location: "+assetLocations[i].name.toLowerCase());
				if(assetLocations[i].name.toLowerCase() == locationName.toLowerCase()){
					showError(getMessage('assetLocationExists', 'Location already exists'));
					return false;
				}
			}
			return true;
		}	 
		
    	function notifyAddLocationClicked(locationName){
    		$.each(listeners, function(i){
    			listeners[i].addLocationClicked(locationName);
    		});
    	}
    	
		this.addListener = function(list){
			listeners.push(list);
		}
	},
	NewAssetLocationPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			addLocationClicked : function(locationName) { }
		}, list);			
	}

});