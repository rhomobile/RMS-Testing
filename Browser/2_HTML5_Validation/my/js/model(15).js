jQuery.extend({

	AssetAttributePageModel: function(){

		var self = this;
		var listeners = new Array();
		var survey = null;
		var siteSurveyId = null;
		var updateSurveyUrl = escape(localStorage.ctx+"/rest/assetmgmt/survey/updateSurvey/");
		
		this.dataLoaded = function(){
			consoleLog('model:assetAttributePage:dataLoaded:1');
			var siteSurveyId = sessionStorage.siteSurveyId;
			var siteSurveyAssetId = sessionStorage.siteSurveyAssetId;
			var assetAttributeGroupId = sessionStorage.siteSurveyAssetAttributeGroupId;
			consoleLog("model:assetAttributePage:2:" + siteSurveyId + "," + siteSurveyAssetId +","+assetAttributeGroupId);
			
			//var siteSurveys = jQuery.parseJSON(localStorage.getItemDecompress('surveyDetails'));
			var siteSurveys = localStorage.getObjectDecompress('surveyDetails');
			consoleLog("model:assetAttributePage:looking for survey:"+siteSurveyId);
			var siteSurvey = getSurvey(siteSurveyId);
			consoleLog("model:assetAttributePage:survey found: " + siteSurvey);
			self.notifyLoadFinish(siteSurvey,siteSurveyAssetId,assetAttributeGroupId);
			consoleLog('model:assetAttributePage:dataLoaded:3');
		}
		
		this.reloadData = function(){
			self.notifyReloadBegin();
		}
		
		this.updateSurvey = function(attributes){
			  consoleLog("updateSurvey");
			  
			  // update local survey and generate an update request for just the fields that have changed
			  var res = localStorage.getObject('resource');
			  var newSurvey = {"performedOn":getFormattedDate(new Date()), "performedBy":res.id, "status":"2"};

			  var newAsset = new Array();
			  newSurvey.attributes = new Array();
			  newSurvey.assets = new Array();
			  
			  // get the original attributes
			  var siteSurveyId = sessionStorage.siteSurveyId;
			  //var siteSurveys = jQuery.parseJSON(localStorage.getItem('surveyDetails'));
			  var siteSurveys = localStorage.getObjectDecompress('surveyDetails');			  
			  var siteSurvey = null;
			  var assetAttributeGroupId = sessionStorage.siteSurveyAssetAttributeGroupId; // required group
			  var siteSurveyStatus = null;
			  var sequenceDao = new $.SequenceDao();
			  
			  // update survey with changes
			  for (var a=0;a<siteSurveys.length;a++)
			  {
				    siteSurvey = siteSurveys[a];
					if (siteSurvey.id == siteSurveyId)
					{				
						var newAttributes = new Array();
						siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
						var siteSurveyAssetId = sessionStorage.siteSurveyAssetId;
						var siteSurveyAssets = siteSurvey.siteSurveyAssets;
						for (var x=0;x<siteSurveyAssets.length;x++)
						{
							if (siteSurveyAssets[x].id == siteSurveyAssetId || (siteSurveyAssets[x].localId == siteSurveyAssetId))
							{
								consoleLog("Found siteSurveyAssets with id: "+siteSurveyAssetId);
								var siteSurveyAsset = siteSurveyAssets[x];
								//console.log("SiteSurveyAsset: "+JSON.stringify(siteSurveyAsset));
								
								// update new
								newAsset = {"ref":siteSurveyAsset.ref,
											"conditionID":siteSurveyAsset.conditionID,
											"status":siteSurveyAsset.status};
								if (siteSurveyAsset.id < 0)
								{
									newAsset.autocode= sequenceDao.getAutocode(siteSurveyAsset.id);
								}
								else
								{
									newAsset.id=siteSurveyAsset.id;
								}
								if (siteSurveyAsset.siteLocationID < 0)
								{
									newAsset.siteLocationAutocode = sequenceDao.getAutocode(siteSurveyAsset.siteLocationID);
								}
								else
								{
									newAsset.siteLocationID = siteSurveyAsset.siteLocationID;
								}
								  
								var assetAttributeGroups = siteSurveyAsset.attributeGroups;
								//assetAttributeGroups are required here only if we have newly added asset 
								//as later attributes returned from server need to be match against those
								//in the localStorage
								//if(siteSurveyAsset.id < 0){
								//	newAsset.assetAttributeGroups = assetAttributeGroups;
								//}
								
								
								for (var y=0;y<assetAttributeGroups.length;y++)
								{
								  if (assetAttributeGroups[y].id == assetAttributeGroupId)
								  {
									  consoleLog("Found assetAttributeGroup: "+assetAttributeGroupId);
									  assetAttributes = assetAttributeGroups[y].attributes;
									  // compare new with old to find changes to update
									  for (var z=0;z<attributes.length;z++)
									  {
										  var currData = siteSurveyStatus.getAssetAttribute(attributes[z].id,siteSurveyAssetId,assetAttributeGroupId);
										  // see if this value has changed
										  for (var i=0;i<assetAttributes.length;i++)
										  {
											  if (assetAttributes[i].id == attributes[z].id && assetAttributes[i].value != currData.value)
											  {
												  assetAttributes[i].value = currData.value;
												  //assetTypeAttributeId is required here only if we have newly added asset as later attributes returned
												  //from server need to be match against those
												  //if(siteSurveyAsset.id < 0){
												  if(currData.id < 0){													  
													  //newAttributes.push({"id":currData.id, "value":currData.value, "assetTypeAttributeId": attributes[z].assetTypeAttributeId});
													  var autocode = sequenceDao.getAutocode(currData.id);
													  newAttributes.push({"autocode":autocode, "value":currData.value});
												  }else{
													  newAttributes.push({"id":currData.id, "value":currData.value});
												  }
											  }
										  }
									  }	

									  // update local survey
									  siteSurveys[a].siteSurveyAssets[x].attributeGroups[y].attributes = assetAttributes;
									  localStorage.setObjectCompress('surveyDetails',siteSurveys);
								  }
								}
							}
						}
						
					  // add data to update request json
					  newAsset.attributes = newAttributes;
					  newSurvey.assets.push(newAsset);
					  consoleLog("updateSurvey data: "+JSON.stringify(newSurvey));
					  
					  // add survey to the update queue
					  // NB. we still send even if nothing changed so we get the performedOn/performedBy entries
					  var requestDetails = new $.RequestDetails(updateSurveyUrl + siteSurveyId, 'POST', newSurvey);
					  var remoteUpdater = new $.RemoteUpdater();
					  remoteUpdater.update(requestDetails);			
					  
					  // update the survey status in the local storage
					  var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
					  siteSurveyStatus.updateAssetAttributeGroupStatus(assetAttributeGroupId);
						  
					  break; // survey loop
					}
				}

				
			  // tidy up
			  sessionStorage.removeItem("siteSurveyAssetAttributes");
			  consoleLog("End of updateSurvey");
		}

		/** data is pre-loaded on the home page... so fireup dataLoaded event  */
		this.loadData = function(){
			consoleLog('assetAttributesPage:model:loadData');
			self.notifyLoadBegin();
			consoleLog('assetAttributesPage:model:loadData:2');
			self.dataLoaded();
			consoleLog('assetAttributesPage:model:loadData:3');
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(siteSurvey,siteSurveyAssetId,assetAttributeGroupId){
			$.each(listeners, function(i){
				listeners[i].loadFinish(siteSurvey,siteSurveyAssetId,assetAttributeGroupId);
			});
		}
		
		this.notifyLoadFail = function(){
			$.each(listeners, function(i){
				listeners[i].loadFail();
			});
		}
		
		
		this.notifyReloadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].reloadBegin();
			});
		}
		
		this.notifyReloadFinish = function(){
			$.each(listeners, function(i){
				listeners[i].reloadFinish();
			});
		}
	},
	AssetAttributePageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(siteSurvey,siteSurveyAssetId,assetAttributeGroupId) { },
			loadFail     : function() { },
			reloadBegin : function() { },
			reloadFinish : function() { }
		}, list);
	}
});



    					