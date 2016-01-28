jQuery.extend({
	/**
	 * 
	 */
	AssetAttributePageView: function(){
		var self = this;
		var listeners = new Array();
	    
		$('#acceptAssetSurvey').click(function() {
			  consoleLog("Accept clicked - check values");
			  // to get here any changed values have been validated but 
			  // we need to check that all mandatory fields actually have data
			  // as they won't have been validated unless a change is made
			  var siteSurvey = getCurrentSurvey();
			  console.log("Status before Accept: "+siteSurvey.status);
			  var siteSurveyAssetAttributeGroupId = sessionStorage.siteSurveyAssetAttributeGroupId;
			  var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
			  // load up original survey to get attribute id list
			  var attributes = jQuery.parseJSON(sessionStorage.siteSurveyAssetAttributes);
			  consoleLog("Attributes: "+attributes.length);
			  logUserAction("surveyAssetAttributes Accept button clicked");
			  var errFlag = false;
			  var errMsg = "";
			  for (var x=0;x<attributes.length;x++)
			  {
				  var currData = siteSurveyStatus.getAssetAttribute(attributes[x].id);
				  consoleLog("CurrData: "+currData);
				  consoleLog(currData.mandatory+",'"+currData.value+"'");
				  //if (currData.mandatory == 'true' && (currData.value == undefined || currData.value == ""))
				  //{
					//  consoleLog("Missing data on mandatory field: "+attributes[x].name);
					//  alert("Missing data on mandatory field: "+attributes[x].name);
					//  return;
				  //}
				  if (currData.mandatory == 'true' && (currData.value == undefined || currData.value == "" || currData.value == "[ ? ]"))
				  {
					  errMsg += "<br>"+attributes[x].name;
					  errFlag = true;
				  }		
			  }	
			  if (errFlag)
			  {
				  alert("Missing data on mandatory field(s): "+errMsg);
				  return;
			  }
			  
			  // if here then all valid ready for updating the survey
			  consoleLog("Survey asset attribute data valid");
			  siteSurveyStatus.updateAssetAttributeGroupStatus(siteSurveyAssetAttributeGroupId);
			  
			  // possibly set to In Progress if not already
			  setSurveyInProgress(siteSurveyStatus.siteSurveyId)
				
			  // test only
			  siteSurvey = getCurrentSurvey();		
			  console.log("Status after Accept: "+siteSurvey.status);
				
			  self.notifyUpdateSurvey(attributes);
			  // redirect back to survey page			    
			  window.history.go(-1);
		});
		
		/** updates page layout */
		this.updateLayout = function(){
			$('#list').trigger('updatelayout');
		}
		
		this.updateSurveyName = function(surveyName){
			$('#surveyName').text(surveyName);
		}
		
		/** validation entry point */
		this.validate = function(attributeId,prefix) {
			var siteSurveyStatus = new $.SiteSurveyStatus(getCurrentSurvey());
			if (!siteSurveyStatus.isReadonly())
				validate(attributeId,prefix);						
		}
		
		this.updateList = function(siteSurvey,siteSurveyAssetId,assetAttributeGroupId){
			consoleLog('SurveyAssetAttributePage:view:updateList: '+assetAttributeGroupId);
			var siteSurveyAssets = siteSurvey.siteSurveyAssets;		
			var asset = null;
			var assetAttributeGroup = null;
			var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
			var readonly = siteSurveyStatus.isReadonly();
			var allowAccept = true;
			
			// find our chosen assetAttribute
			for(var i = 0; i < siteSurveyAssets.length; i++){
				asset = siteSurveyAssets[i];
				if (asset.id == siteSurveyAssetId || (asset.localId && asset.localId == siteSurveyAssetId))
				{
					// apply any local asset changes
					var tmpAsset = siteSurveyStatus.getAsset(siteSurveyAssetId);
					if (tmpAsset != undefined)
					{
						//consoleLog("tmpAsset: "+JSON.stringify(tmpAsset));
						consoleLog("Apply local asset changes");
						asset.ref = tmpAsset.ref;
						asset.siteLocationID = tmpAsset.siteLocationID;
						asset.conditionID = tmpAsset.conditionID;
						//consoleLog("AA Asset: "+JSON.stringify(asset));
					}
					var attributeGroups = asset.attributeGroups;
					//consoleLog("AssetAttributeGroups: "+JSON.stringify(attributeGroups));
					for (var z=0;z<attributeGroups.length;z++)
					{
						if (attributeGroups[z].id == assetAttributeGroupId)
						{
							consoleLog("Found asset attribute group: "+ assetAttributeGroupId);
							assetAttributeGroup = attributeGroups[z];
							$('#siteSurveyAssetAttributeGroup').text(attributeGroups[z].name);
							sessionStorage.siteSurveyAssetAttributes = JSON.stringify(attributeGroups[z].attributes);
							sessionStorage.siteSurveyAssetAttributeGroup = JSON.stringify(assetAttributeGroup);
							break;
						}
					}
					if (assetAttributeGroup != null)
					{
						break;
					}
				}
			}
			var surveyDetailsDao = new $.SurveyDetailsDao();
			var assetName = surveyDetailsDao.findAssetDescription(asset, siteSurvey.surveyID);					
			$('#surveyAssetName').text(assetName);
			
			// SURVEY ASSET ATTRIBUTES GROUPS
			//var attributeGroups = asset.attributeGroups;
			var attributesList = $('#surveyAssetAttributesList');
			attributesList.empty();

			var attributes = new Array();
			if (assetAttributeGroup.attributes)
			{
				attributes = assetAttributeGroup.attributes;
			}
			attributes.sort(self.sortAttributes);
			
			for (var x=0;x<attributes.length;x++)
			{
				var attribute = attributes[x];
				var tmpAttribute = siteSurveyStatus.getAssetAttribute(attribute.id);
				var dType = dataType[attribute.dataType];
				
				// set starting class for coloured bar
				var attrClass = "pendingNotRequired";  // grey
				if (attribute.mandatory == 'true')
				{				
					consoleLog("Temp attribute: "+JSON.stringify(tmpAttribute));
					if (tmpAttribute != undefined && tmpAttribute.valid)
					{						
						attrClass = 'complete'; // green
					}
					else
					{
						attrClass = 'pending';  // red
						allowAccept = false;
					}
				}

				// readonly override
				if (readonly)
				{
					attrClass = "readonly";
				}
				
				// set value from current, default or first available lookup
				var valid = false;
				var val = attribute.value;
				if (tmpAttribute != undefined)
				{
					val = tmpAttribute.value;
					if (tmpAttribute.valid != undefined && tmpAttribute.valid)
						valid = true;
				}
				if (val == "")
					val = attribute.defaultValue;
				//if (val == "" && attribute.lookupValues != undefined)
				//	val = attribute.lookupValues[0].id;
				
				// set main non datatype specific values
				var rowData = { 
								'attributeid':"asset_attribute_"+attribute.id,
								'id':attribute.id,
								'question':attribute.name, 
								'type':attribute.type,
								'attrClass':attrClass,
								'dataType':attribute.dataType,
								'minValue':attribute.minValue,
								'maxValue':attribute.maxValue,
								'value':val,
								'mandatory':attribute.mandatory
								};
				// add the datatype specific values
				setDataType(rowData,attribute);
				// save current values to local storage
				var tmp = {"id":attribute.id,"value":val,'mandatory':attribute.mandatory,"valid":valid,"autocode":attribute.autocode};
				siteSurveyStatus.saveAssetAttribute(tmp);
				
				//consoleLog("Adding row: "+JSON.stringify(rowData));
				var row = ich.attributeRow(rowData);
				attributesList.append(row);
			}
			if (readonly)
			{
				$('#acceptAssetSurvey').hide();
			}else{
				$('#acceptAssetSurvey').removeClass('hidden');
				if (allowAccept)
					$('#acceptAssetSurvey').removeClass('ui-disabled');
			}
			consoleLog('SurveyAssetAttributePage:view:updateList:refreshed');
			
			attributesList.listview('refresh');
			attributesList.trigger('create');	
		}
		
		this.sortAttributes = function(att1, att2){
			var x = parseInt(att1.sequence, 10);
			var y = parseInt(att2.sequence, 10);
			var sort = ((x < y) ? -1 : ((x > y) ? 1 : 0));
			return sort; 
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyItemClicked = function(surveyId){
    		$.each(listeners, function(i){
    			listeners[i].itemClicked(surveyId);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
    	
    	this.notifyUpdateSurvey = function(attributes){
    		//consoleLog("AssetAttributePageView:notifyUpdateSurvey");
    		$.each(listeners, function(i){
    			listeners[i].updateSurvey(attributes);
    		});
    	}    	
	},
	AssetAttributePageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			itemClicked : function(surveyId) { },
			refreshClicked : function() { }
		}, list);			
	}

});
