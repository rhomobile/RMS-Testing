jQuery.extend({

	AddAssetPageModel: function(){
		var addAssetUrl = escape(localStorage.ctx+"/rest/assetmgmt/survey/addAsset");
		var self = this;
		var listeners = new Array();
		var surveyTemplateDao = new $.SurveyTemplateDao();
		var surveyDetailsDao = new $.SurveyDetailsDao();
		var assetManufacturerDao = new $.AssetManufacturerDao();
		var assetConditionDao = new $.AssetConditionDao();
		
		function sortAssetModels(model1, model2){
			 var x = model1.model;
			 var y = model2.model;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		function sortSiteLocations(loc1, loc2){
			 var x = loc1.name;
			 var y = loc2.name;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		this.dataLoaded = function(manufacturerId, assetTypeId, surveyTemplateId, siteSurveyId, newAsset){
			consoleLog('model:addAssetPage:survey loaded');

			var assetModels = surveyTemplateDao.getAssetModelListByAssetTypeAndTemplateSurveyId(manufacturerId, assetTypeId, surveyTemplateId);
			assetModels.sort(sortAssetModels);
			//check if we have new model on the newAsset object, if so add it to the list
			if(newAsset.libraryAssetID != null){
				assetModels.push({id: newAsset.libraryAssetID, 
								  model: newAsset.libraryAssetName, 
								  manufacturerID: manufacturerId});
			}
			//consoleLog("Asset models: "+JSON.stringify(assetModels));
			var siteLocations = surveyDetailsDao.findSiteLocationsBySiteSurveyId(siteSurveyId);
			siteLocations.sort(sortSiteLocations);
			
			var assetTypeName = surveyTemplateDao.getAssetTypeName(assetTypeId, surveyTemplateId);
			var manufacturerName = assetManufacturerDao.findById(manufacturerId).name;
			
			var conditionList = assetConditionDao.getAll();
			
			consoleLog('model:addAssetPage:loaded:'+assetModels.length);
			self.notifyLoadFinish(assetTypeName, manufacturerName, assetModels, siteLocations, conditionList);
		}
		
		this.reloadData = function(){
			self.notifyReloadBegin();			
			
			var dataProvider = new $.SurveyDetailsRemoteDataProvider();
			
			var jobRef = AppointmentController.getAppointment().jobRef;
			var jobRefs = new Array();
			jobRefs.push(jobRef);
			
			//register callback
			dataProvider.dataLoaded = function(){
				self.notifyReloadFinish();
			}
			dataProvider.downloadData(false, jobRefs);			
		}
		
		/** data is pre-loaded on the home page... so fireup dataLoaded event  */
		this.loadData = function(newAsset){
			self.notifyLoadBegin();

			var siteSurveyId = newAsset.siteSurveyID;
			var assetTypeId = newAsset.assetType;
			var manufacturerId = newAsset.manufacturer;
			var surveyTemplateId = newAsset.templateSurveyId; 
			
			self.dataLoaded(manufacturerId, assetTypeId, surveyTemplateId, siteSurveyId, newAsset);
		}
		
		this.addAsset = function(newAsset){			
			var localData = addLocalAsset(newAsset);
			addRemoteAsset(newAsset, localData);
			self.notifyAssetAdded();
		}
		
		function addRemoteAsset(newAsset, localData) {
			var surveyAssetMobileId = localData.surveyAssetMobileId; 
			
			var sequenceDao = new $.SequenceDao();
			var locationAutocode = null;
			var libraryAssetAutocode = null;
			if(newAsset.location < 0)
			{
				locationAutocode = sequenceDao.getAutocode(newAsset.location);
			}
			if(newAsset.libraryAssetID < 0)
			{
				libraryAssetAutocode = sequenceDao.getAutocode(newAsset.libraryAssetID); 
			}
			var siteSurveyAssetAutocode = sequenceDao.getAutocode(surveyAssetMobileId);
			
			//prepare attribute groups and attributes to send
			var requestAttributes = new Array();
			for(var attrGroupIndex in localData.attributeGroups){
				var attributeGroup = localData.attributeGroups[parseInt(attrGroupIndex, 10)];
				for(var attributeIndex in attributeGroup.attributes){
					//localAttribute.id < 0
					var localAttribute = attributeGroup.attributes[attributeIndex];
					requestAttributes.push({assetTypeAttributeId: localAttribute.assetTypeAttributeId,
											autocode: localAttribute.autocode});
											//autocode: sequenceDao.getAutocode(localAttribute.id)})
				}
			}
			
			var data = {
				    "siteSurveyID":newAsset.siteSurveyID,  
				    "assetType":newAsset.assetType,
				    "autocode": siteSurveyAssetAutocode,
				    "manufacturer":newAsset.manufacturer,
				    "libraryAssetID":newAsset.libraryAssetID,
				    "libraryAssetAutocode": libraryAssetAutocode,
				    "libraryAssetName":newAsset.libraryAssetName,
				    "ref":newAsset.ref,    
				    "location": newAsset.location,
				    "locationAutocode": locationAutocode,
				    "condition":newAsset.condition,
				    "attributes": requestAttributes
				};
			//send location or locationAutocode not both
			if(locationAutocode == null)
			{
				delete data.locationAutocode;
			}else{
				delete data.location;
			}
			//send libraryAssetID or libraryAssetAutocode not both
			if(libraryAssetAutocode == null)
			{
				delete data.libraryAssetAutocode;
			}else{
				delete data.libraryAssetID;
			}
			
			//Rest request
			var requestDetails = new $.RequestDetails(	addAssetUrl, 
														'POST', 
														data);
			var remoteUpdater = new $.RemoteUpdater();
			remoteUpdater.update(requestDetails);
		}
		
		
		function addLocalAsset(newAsset){
			/*
			var newAsset = {
					assetType: assetTypeId,
					siteSurveyID: sessionStorage.siteSurveyId, 
					templateSurveyId: templateSurveyId,
					manufacturer: null, //manufacturer id
					+libraryAssetID: null,
					+libraryAssetName: null,
					+ref: null,
					+location: null,
					+condition: null
			};*/
			var assetTypeId = newAsset.assetType;
			var surveyTemplateDao = new $.SurveyTemplateDao();
			var assetType = surveyTemplateDao.getAssetTypeByIdAndTemplateSurveyId(assetTypeId, newAsset.templateSurveyId);
			
			//convert object from template to siteSurveyAttribute
			//update all required values from new asset
			
			var sequenceDao = new $.SequenceDao();
			var surveyAssetMobileId = sequenceDao.getNextId();	
			var surveyAssetAutocode = sequenceDao.getAutocode(surveyAssetMobileId);
			//consoleLog("newAsset.libraryAssetID: "+newAsset.libraryAssetID);
			var siteSurveyAsset = {
				id: 				surveyAssetMobileId,
				localId: 			surveyAssetMobileId,
				autocode: 			surveyAssetAutocode,
				ref: 				newAsset.ref,
				//libraryAssetID can be negative here, if new model was added
				libraryAssetID: 	newAsset.libraryAssetID,
				libraryAssetName: 	newAsset.libraryAssetName,
				//siteLocationID can be < 0 if new location was added
				siteLocationID: 	newAsset.location,
				conditionID:		newAsset.condition,
				status:				2 //siteSurveyAsset.status = ACTIVE
			};
			//consoleLog("siteSurveyAsset: "+JSON.stringify(siteSurveyAsset));
			var newAttributeGroups = new Array();
			var newAttributes = new Array();
			//copy group attributes and attributes
			for(var i in assetType.attributeGroups){
				var attributeGroup = assetType.attributeGroups[i];
				var newAttributeGroup = attributeGroup;
				//consoleLog("New attribute group: "+newAttributeGroup.id);
				for(var j in newAttributeGroup.attributes){
					var attribute = newAttributeGroup.attributes[j];
					var newAttribute = attribute;
					newAttribute.assetTypeAttributeId = attribute.id;
					newAttribute.id = sequenceDao.getNextId();
					newAttribute.autocode = sequenceDao.getAutocode(newAttribute.id);
					newAttributeGroup.attributes[j] = newAttribute;
				}
				newAttributeGroups.push(newAttributeGroup);
			}
			siteSurveyAsset.attributeGroups = newAttributeGroups;
			var surveyDetailsDao = new $.SurveyDetailsDao();
			surveyDetailsDao.addSiteSurveyAsset(siteSurveyAsset, newAsset.siteSurveyID);
			
			//add library asset to survey template if new library asset is required
			if(newAsset.libraryAssetID < 0){
				surveyTemplateDao.addLibraryAsset(newAsset.libraryAssetID, 
												  newAsset.libraryAssetName, 
												  newAsset.templateSurveyId,
												  newAsset.assetType,
												  newAsset.manufacturer);
			}
			
			
			return {surveyAssetMobileId: surveyAssetMobileId, attributeGroups: newAttributeGroups};
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyAssetAdded = function(){
			$.each(listeners, function(i){
				listeners[i].assetAdded();
			});
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(assetTypeName, assetManufacturerName, assetModels, siteLocationList, conditionList){
			$.each(listeners, function(i){
				listeners[i].loadFinish(assetTypeName, assetManufacturerName, assetModels, siteLocationList, conditionList);
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
	AddAssetPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			loadBegin    : function() { },
			loadFinish   : function(assetTypeName, assetManufacturerName, assetModels, siteLocationList, conditionList) { },
			loadFail     : function() { },
			reloadBegin : function() { },
			reloadFinish : function() { }
		}, list);
	}
});
	    					