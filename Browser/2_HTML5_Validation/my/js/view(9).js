jQuery.extend({
	/**
	 * 
	 */
	SurveyAssetPageView: function(){
		var self = this;
		var listeners = new Array();
		
	    function isEmpty(obj){
	    	return obj == undefined || obj == null || obj == '';
	    }
	    
	    function validate(assetRef){
	    	if(isEmpty(assetRef)){
				showError(getMessage('assetRef.required', 'Ref is required'));
				return false;
			}
	    	if(assetRef.length > 100){
	    		showError(getMessage('assetRef.toLong', 'Ref can only be 100 characters long'));
	    		return false;
	    	}
	    	if(!(/^\s*([0-9a-zA-Z:._\s-+\/\\]*)\s*$/.test(assetRef))){  
	    		showError(getMessage('assetRef.invalidCharacters', 'Some of the Ref characters are not allowed'));
	    		return false;
	    	}	    	
	    	return true;
	    }	    
	    
		//unregister if we were on this page before
		$('a.attributeLink').die('vclick');
	    $('a.attributeLink').live('vclick', function(event, ui) {
	    	var siteSurveyId = sessionStorage.siteSurveyId;
	    	var assetAttributeGroupId = $(this).attr('data-assetAttributeGroupId');
	    	consoleLog('SurveyAssetPageView:view:assetAttributeGroupId: '+assetAttributeGroupId+":"+siteSurveyId);
			self.notifyItemClicked(siteSurveyId, assetAttributeGroupId);
		});
		

		$('#surveyAssetAccept').die('vclick');
		$('#surveyAssetAccept').live('vclick', function(event){
			consoleLog('surveyAssetAccept button clicked');
			showLoadingMessage("Saving changes");
			var siteSurvey = getCurrentSurvey();
			var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);			
			var siteSurveyAssetId = sessionStorage.siteSurveyAssetId;
			logUserAction("surveyAssetAccept button clicked for asset: "+siteSurveyAssetId);
			console.log("Status before Accept: "+siteSurvey.status);
			var assetRef = $('#assetRef').val();
			consoleLog(assetRef);
			if (!validate(assetRef))
			{
				return;
			}
			var asset = siteSurveyStatus.getAsset(siteSurveyAssetId);
			asset.ref = assetRef;
			asset.siteLocationID = $("option:selected", $('#siteLocationId')).val();
			asset.conditionID = $("option:selected", $('#conditionId')).val();
			siteSurveyStatus.saveAsset(asset);

			self.notifyUpdateSurvey(asset);
			siteSurveyStatus.updateAssetStatus(siteSurveyAssetId);
			  
			// possibly set to In Progress if not already
			setSurveyInProgress(siteSurveyStatus.siteSurveyId)
			
			// test only
			siteSurvey = getCurrentSurvey();		
			console.log("Status after Accept: "+siteSurvey.status);
			
			hideLoadingMessage();
			// redirect back to survey page			    
			window.history.go(-1);
			  
			consoleLog("Survey asset data valid");
		});
	    
		$('#removeAsset').die('vclick');
		$('#removeAsset').live('vclick', function(event){
			consoleLog('removeAsset button clicked');
			$.mobile.changePage('removeAssetSelect.html', {transition: 'pop', role: 'dialog'});
		});
		
		$('#surveyAssetNewLocationLink').die('vclick');
		$('#surveyAssetNewLocationLink').live('vclick', function(event){
			consoleLog('surveyAssetNewLocationLink button clicked');
			
			// this is a workaround so that we can re-use the addLocation from the addAsset code
			// we save a copy of the existing asset as a fake 'newAsset' for the subsequent code to use
			var siteSurveyStatus = new $.SiteSurveyStatus(getCurrentSurvey());			
			var siteSurveyAssetId = sessionStorage.siteSurveyAssetId;
			var asset = siteSurveyStatus.getAsset(siteSurveyAssetId);
			asset.siteSurveyID = siteSurveyStatus.siteSurveyId;
			sessionStorage.setObject('newAsset',asset);
			$.mobile.changePage("newAssetLocation.html",{role: 'dialog'});
		});
		
		this.removeAsset = function(params){
			consoleLog("Remove asset");
		}
		
		/** updates page layout */
		this.updateLayout = function(){
			$('#list').trigger('updatelayout');
		}
		
		this.updateSurveyName = function(surveyName){
			$('#surveyName').text(surveyName);
		}
		
	    this.saveAssetChange = function(id,val)
	    {	
	    	// keep a local copy of changes
			var siteSurveyStatus = new $.SiteSurveyStatus(getCurrentSurvey());			
			var siteSurveyAssetId = sessionStorage.siteSurveyAssetId;
			var asset = siteSurveyStatus.getAsset(siteSurveyAssetId);
			if (id == 'assetRef')
				asset.ref = val;
			else if (id == 'siteLocationId')
				asset.siteLocationID = val;
			else if (id == 'conditionId')
				asset.conditionID = val;
			siteSurveyStatus.saveAsset(asset);
	    }
	    
		this.updateList = function(siteSurvey,siteSurveyAssetId){
			consoleLog('SurveyAssetPage:view:updateList: '+siteSurveyAssetId);
			
			// make sure button disabled to start with
			$('#surveyAssetAccept').addClass('ui-disabled');
			
			var siteSurveyAssets = siteSurvey.siteSurveyAssets;
			var surveyDetailsDao = new $.SurveyDetailsDao();
			var asset = null;
			
			// find our chosen asset
			for(var i = 0; i < siteSurveyAssets.length; i++){
				asset = siteSurveyAssets[i];
				if (asset.id == siteSurveyAssetId)
				{
					var assetName = surveyDetailsDao.findAssetDescription(asset, siteSurvey.surveyID);
					$('#surveyAssetName').text(assetName);
					break;
				}
			}
			
			//consoleLog("Asset: "+JSON.stringify(asset));
			var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
			var readonly = siteSurveyStatus.isReadonly();
			var siteSurveyStatusData = siteSurveyStatus.siteSurveyStatusData;
			var tmpAsset = siteSurveyStatus.getAsset(asset.id);
			//if (tmpAsset == null)
			//	tmpAsset = asset;
			//consoleLog("Asset: "+JSON.stringify(tmpAsset));
			if (tmpAsset != undefined)
			{
				asset.ref = tmpAsset.ref;
				asset.siteLocationID = tmpAsset.siteLocationID;
				asset.conditionID = tmpAsset.conditionID;
			}
			
			// ASSET DETAILS
			var assetList = $('#assetDataList');
			assetList.empty();
			var assetData = {"assetid":"assetRef",
								"label":getMessage("survey.asset.ref","Ref"),
								"value":asset.ref};				
			var row = ich.assetDataRow(assetData);
			assetList.append(row);

			// lookup for Locations
			var assetLocations = sessionStorage.getObject('siteSurveyAssetLocations');
			var lookup = new Array();
			for (var x=0;x<assetLocations.length;x++)
			{
				var lookupValue = assetLocations[x];
				var select = 'noselect';
				
				//if new location just has been added select it
				var newLocationId = sessionStorage.getObject('newAsset') == null ? "" : sessionStorage.getObject('newAsset').location;
				if(newLocationId != ""){
					if(newLocationId == lookupValue.id)
					{
						select = 'selected';
					}
				}else if (asset.siteLocationID == lookupValue.id)
				{
					select = 'selected';
				}
				lookup.push({'id':lookupValue.id, 'value':lookupValue.name, 'selected':select});
			}
			
			assetData = {"assetValueId":"siteLocationId",
								"label":getMessage("survey.asset.location","Location"),
								"value":"",
								"lookup":lookup,
								"useLookup":"true",
								"surveyAssetNewLocationLink":!readonly};
			row = ich.assetDataRow(assetData);
			assetList.append(row);
			
			// lookup for condition
			var assetConditions = sessionStorage.getObject('siteSurveyAssetConditions');
			lookup = new Array();
			for (var x=0;x<assetConditions.length;x++)
			{
				var lookupValue = assetConditions[x];
				var select = 'noselect';
				//consoleLog(val+" <=> "+lookupValue.id);
				if (asset.conditionID == lookupValue.id)
				{
					select = 'selected';
				}
				lookup.push({'id':lookupValue.id, 'value':lookupValue.name, 'selected':select});
			}
			assetData = {"assetValueId":"conditionId",
								"label":getMessage("survey.asset.condition","Condition"),
								"value":"",
								"lookup":lookup,
								"useLookup":"true"};				
			row = ich.assetDataRow(assetData);
			assetList.append(row);
			
			// hide the 'Remove Asset' and 'Restore Asset' links if readonly
			//$('#removeAsset').hide(); // HIDE COMPLETELY FOR THIS BETA RELEASE
			if (readonly)
			{
				$('#removeAsset').hide();
				$('#restoreAssetLink').hide();
			}
			
			assetList.listview('refresh');
			assetList.trigger('create');
			
			// ASSET ATTRIBUTES GROUPS
			//consoleLog("Asset: "+JSON.stringify(asset));
			var attributeGroups = asset.attributeGroups;
			//consoleLog("attributeGroups: "+JSON.stringify(attributeGroups));
			
			var attributeGroupList = $('#assetAttributeGroupList');
			attributeGroupList.empty();
			
			var attrClass = "pending";
			var complete = false;
			
			if (attributeGroups != undefined)
			{
				var completeCount = 0;
				var reqCount = 0;
				for(var i = 0; i < attributeGroups.length; i++){
					var group = attributeGroups[i];
					
					// check each attribute to see if this group has any mandatory elements
					var attributes = group.attributes;
					var mandatory = false;
					for (var y=0;y<attributes.length;y++)
					{
						if (attributes[y].mandatory == 'true') 
						{
							mandatory = true;
							break;
						}
					}
					if (mandatory) reqCount++;
					
					// check if group has been accepted
					if (siteSurveyStatusData != undefined)
					{
						for (var z=0;z<siteSurveyStatusData.assetAttributeGroupsStatus.length;z++)
						{
							if (siteSurveyStatusData.assetAttributeGroupsStatus[z]['assetId'] == asset.id && 
									siteSurveyStatusData.assetAttributeGroupsStatus[z]['assetAttributeGroupId'] == group.id)
							{
								attrClass = "complete";
								completeCount++;
								break;
							}
						}
					}				
					
					// readonly override
					if (readonly)
					{
						attrClass = "readonly";
					}
					
					var groupData = {"assetAttributeGroupId":group.id,
									"assetAttributeGroupName":group.name,
									"attributeClass":attrClass};				
					var row = ich.assetAttributeGroup(groupData);
					attributeGroupList.append(row);
				}
				attributeGroupList.listview('refresh');
				
				// are all forms complete?
				if(completeCount >= reqCount)
					complete = 'true'
			}
			
			// if all attribute groups complete then enable Accept button?
			if (readonly)
			{
				$('#surveyAssetAccept').hide();
			}
			else
			{
				$('#surveyAssetAccept').removeClass('hidden');
				if (complete)
				{
					$('#surveyAssetAccept').removeClass('ui-disabled');
				}
				else
				{
					$('#surveyAssetAccept').addClass('ui-disabled');
				}
			}
			// save the current status
			siteSurveyStatus.saveAsset(asset);
			
			//remove newAsset which was created for newLocation
			sessionStorage.removeItem('newAsset')
			
			consoleLog('SurveyAssetPage:view:updateList:refreshed');
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyItemClicked = function(siteSurveyId, assetAttributeGroupId){
    		$.each(listeners, function(i){
    			listeners[i].itemClicked(siteSurveyId, assetAttributeGroupId);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
    	
    	this.notifyUpdateSurvey = function(attributes){
    		$.each(listeners, function(i){
    			listeners[i].updateSurvey(attributes);
    		});
    	}
	},
	SurveyAssetPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			itemClicked : function(siteSurveyId, assetAttributeGroupId) { },
			refreshClicked : function() { },
			updateSurvey : function(assetId) { }
		}, list);			
	}

});
