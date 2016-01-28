 jQuery.extend({
	/**
	 * 
	 */
	SurveyPageView: function(){
		var self = this;
		var listeners = new Array();

		function locationSort(asset1, asset2){
			 var x = asset1.siteLocationID;
			 var y = asset2.siteLocationID;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		//unregister if we were on this page before
		$('a.attributeGroupLink').die('vclick');
	    $('a.attributeGroupLink').live('vclick', function(event, ui) {
	    	event.preventDefault();
	        var siteSurveyId = sessionStorage.siteSurveyId;
			sessionStorage.siteSurveyAttributeGroupId = $(this).attr('data-attributeGroupId');  
			consoleLog('siteSurveyId clicked: '+siteSurveyId);
			logUserAction("Attribute group link for "+siteSurveyId+":"+sessionStorage.siteSurveyAttributeGroupId+":clicked");
			self.notifyAttributeItemClicked(siteSurveyId);
		});
	    
		$('a.assetLink').die('vclick');
	    $('a.assetLink').live('vclick', function(event, ui) {
	        event.preventDefault();
	        var siteSurveyId = sessionStorage.siteSurveyId;
			sessionStorage.siteSurveyAssetId = $(this).attr('data-assetId');  
			consoleLog('siteSurveyId clicked: '+siteSurveyId);
			logUserAction("Asset link for "+siteSurveyId+":"+sessionStorage.siteSurveyAssetId+" clicked");
			self.notifyAssetItemClicked(siteSurveyId);
		});
	    
		$('a.assetRestore').die('vclick');
	    $('a.assetRestore').live('vclick', function(event, ui) {
	        event.preventDefault();
	        var siteSurveyId = sessionStorage.siteSurveyId;
			var assetId = $(this).attr('data-assetId');  
			sessionStorage.siteSurveyAssetId = $(this).attr('data-assetId');  
			consoleLog('assetId restore clicked: '+assetId);
			logUserAction("Asset restore for "+siteSurveyId+":"+assetId+": clicked");
			if ($(this).attr('data-stock') == 'true')
			{
				$.mobile.changePage('restoreAssetLocation.html', {transition: 'pop', role: 'dialog'});
			}
			else
			{
				self.notifyAssetRestoreClicked(siteSurveyId, assetId);
			}			
		});
	    
		$('#surveyComplete').die('vclick');
	    $('#surveyComplete').live('vclick', function(event, ui) {
	        event.preventDefault();
	        var siteSurveyId = sessionStorage.siteSurveyId;
			//sessionStorage.siteSurveyAssetId = $(this).attr('data-identifier');  
			consoleLog('surveyComplete clicked: '+siteSurveyId);
			logUserAction("Survey complete for "+siteSurveyId+" clicked");
			self.notifyCompleteClicked(siteSurveyId);
		});	    
	    
		/** updates page layout */
		this.updateLayout = function(){
			$('#list').trigger('updatelayout');
		}
		
		this.updateSurveyName = function(surveyName){
			$('#surveyName').text(surveyName);
		}		
		
		this.updateList = function(siteSurvey){
			var DELETED = 3;
			//consoleLog('SurveyPage:view:updateList: '+siteSurvey);
			var attributeGroups = siteSurvey.attributeGroups;
			//consoleLog("attributeGroups: "+JSON.stringify(attributeGroups));
			var siteSurveyAssets = siteSurvey.siteSurveyAssets;
			//consoleLog("siteSurveyAssets: "+JSON.stringify(siteSurveyAssets));
			
			// ATTRIBUTES GROUPS
			var attributeGroupList = $('#attributeGroupList');
			attributeGroupList.empty();
			var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
			var readonly = siteSurveyStatus.isReadonly();
			var siteSurveyStatusData = siteSurveyStatus.siteSurveyStatusData;
			
			//consoleLog("siteSurveyStatus: "+siteSurveyStatus);
			
			var attrClass = "pending";
			
			for(var i = 0; i < attributeGroups.length; i++){
				attrClass = "pending";
				var group = attributeGroups[i];
				consoleLog("SurveyPage:siteSurveyStatus: "+siteSurveyStatus);
				if (siteSurveyStatusData != undefined)
				{
					consoleLog("attributeGroupsStatus: "+siteSurveyStatusData.attributeGroupsStatus);
					//consoleLog("attributeGroupStatus: "+siteSurveyStatus.attributeGroupstatus['attributeGroupId']);
					for (var z=0;z<siteSurveyStatusData.attributeGroupsStatus.length;z++)
					{
						if (siteSurveyStatusData.attributeGroupsStatus[z]['attributeGroupId'] == group.id)
						{
							attrClass = "complete";
							break;
						}
					}
				}
				// readonly override
				if (readonly)
					attrClass = "readonly";
				
				var groupData = {"attributeGroupId":group.id,
								"attributeGroupName":group.name,
								"attributeClass":attrClass};				
				var row = ich.attributeGroup(groupData);
				attributeGroupList.append(row);
			}
			attributeGroupList.listview('refresh');

			// ASSETS
			var assetList = $('#assetList');
			assetList.empty();
			var surveyDetailsDao = new $.SurveyDetailsDao();
			var surveyTemplateDao = new $.SurveyTemplateDao();
			var assetManufacturerDao = new $.AssetManufacturerDao();
			var oldLocationId = -99;
			
			//consoleLog("Survey: "+JSON.stringify(survey));
			//consoleLog("Asset count: "+siteSurveyAssets.length);
			
			// sort by location id to allow proper display grouping
			// this will put any 'removed to stock' assets at the top
			siteSurveyAssets.sort(locationSort);
			
			for(var i = 0; i < siteSurveyAssets.length; i++){
				var asset = siteSurveyAssets[i];
				var assetClass = "pending";
				
				// if readonly and asset has been deleted entirely then don't show
				if (readonly && asset.status == DELETED)
				{
					consoleLog("Skipping deleted asset "+asset.id+" after survey complete");
					continue;
				}				

				var tmpAsset = siteSurveyStatus.getAsset(asset.id);
				if (tmpAsset != undefined)
				{
					asset.ref = tmpAsset.ref;
					// don't override if an 'in stock' item
					if (asset.siteLocationID != '')
						asset.siteLocationID = tmpAsset.siteLocationID;
					asset.conditionID = tmpAsset.conditionID;
				}				
				
				//consoleLog("Asset: "+JSON.stringify(asset));
				//consoleLog(asset.id+","+asset.ref);
				//consoleLog(asset.libraryAssetID+","+siteSurvey.surveyID);
				
				var assetType = surveyTemplateDao.getAssetTypeByLibraryAssetIdAndTemplateSurveyId(asset.libraryAssetID,siteSurvey.surveyID);
				//consoleLog("Asset type: "+JSON.stringify(assetType));
				var locations = surveyDetailsDao.findSiteLocationsBySiteSurveyId(siteSurvey.id);
				//consoleLog("Locations: "+JSON.stringify(locations));
				var siteLocation = null;
				for (var x=0;x<locations.length;x++)
				{
					//consoleLog(locations[x].id+" <=> "+asset.siteLocationID);
					if (locations[x].id == asset.siteLocationID)
					{
						siteLocation = locations[x];
						break;
					}
				}
				//consoleLog("Site location: "+JSON.stringify(siteLocation));
				var libraryAssets = assetType.libraryAssets;
				//consoleLog("LibraryAssets: "+JSON.stringify(libraryAssets));
				var libraryAsset = null;
				for (var x=0; x<libraryAssets.length; x++)
				{
					//consoleLog(libraryAssets[x].id+" <=> "+asset.libraryAssetID);
					if (libraryAssets[x].id == asset.libraryAssetID)
					{
						libraryAsset = libraryAssets[x];
						break;
					}
				}
				
				if (siteSurveyStatusData != undefined)
				{
					//consoleLog("assetsStatus: "+siteSurveyStatus.assetsStatus);
					//consoleLog("attributeGroupStatus: "+siteSurveyStatus.attributeGroupstatus['attributeGroupId']);
					for (var z=0;z<siteSurveyStatusData.assetsStatus.length;z++)
					{
						if (siteSurveyStatusData.assetsStatus[z]['assetId'] == asset.id)
						{
							assetClass = "complete";
							break;
						}
					}
				}
				
				// check for deleted assets
				var deleted = false;
				var stock = false;
				consoleLog("Asset status: "+asset.status);
				consoleLog("Asset location: "+asset.siteLocationID);
				if (asset.status == DELETED || asset.siteLocationID == '')
				{
					assetClass = "notRequired";
					deleted = true;
					if (asset.siteLocationID == '')
					{
						stock = true;
					}
				}
				var make = assetManufacturerDao.findById(libraryAsset.manufacturerID);
				var assetDesc = make.name + " " + libraryAsset.model;
				
				// readonly override
				if (readonly)
					assetClass = "readonly";
				
				// display assets grouped by location
				
				// add a divider if the location changes
				if (asset.siteLocationID != oldLocationId)
				{
					var assetDivider = {"assetLocation":(siteLocation != null) ? siteLocation.name:getMessage('survey.asset.stock','Stock')};
					var rowDiv = ich.assetRowDivider(assetDivider);
					assetList.append(rowDiv);
				}
				
				// add asset info
				var assetData = {"assetName":assetType.name,
								"assetDesc":assetDesc,
								"assetRef":asset.ref,
								"assetId":asset.id,
								"assetClass":assetClass,
								"deleted":deleted,
								"stock":stock};				
				var row = ich.assetRow(assetData);
				assetList.append(row);
				
				oldLocationId = asset.siteLocationID;
			}
			assetList.listview('refresh');
			assetList.trigger('create');
			
			// check for enabling the Complete button
			var status = new $.SiteSurveyStatus(siteSurvey);
			if (readonly)
			{
				$('#surveyComplete').hide();
			}
			else
			{
				var sOptional = status.isSurveyOptional(siteSurvey.id);
				var sComplete = status.isSurveyComplete(siteSurvey.id);
				console.log("Survey optional: "+sOptional);
				console.log("Survey complete: "+sComplete);				
				if (sOptional || sComplete)
				{
					$('#surveyComplete').removeClass('ui-disabled');				
				}
			}
			
			consoleLog('SurveyPage:view:updateList:refreshed');
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyAttributeItemClicked = function(siteSurveyId){
    		$.each(listeners, function(i){
    			listeners[i].attributeItemClicked(siteSurveyId);
    		});
    	}
    
    	this.notifyAssetItemClicked = function(siteSurveyId){
    		$.each(listeners, function(i){
    			listeners[i].assetItemClicked(siteSurveyId);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
    	
    	this.notifyCompleteClicked = function(siteSurveyId){
    		$.each(listeners, function(i){
    			listeners[i].completeClicked(siteSurveyId);
    		});
    	}
    	
    	this.notifyAssetRestoreClicked = function(siteSurveyId,assetId){
    		$.each(listeners, function(i){
    			listeners[i].assetRestoreClicked(siteSurveyId,assetId);
    		});
    	}
	},
	SurveyPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			attributeItemClicked : function(siteSurveyId) { },
			assetItemClicked : function(siteSurveyId) { },			
			refreshClicked : function() { },
			completeClicked : function(siteSurveyId) { },
			assetRestoreClicked : function(siteSurveyId,assetId) { }
		}, list);			
	}

});
