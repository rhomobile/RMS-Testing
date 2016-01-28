//
// Database contains DAO with data specific to the resource
// Hides implementation details, where and how the data is stored
// at the moment uses local storage and localstoragedb.js
//
jQuery.extend({

	/**
	 * Object wrapping access to the database
	 */
	ResourceDatabase: function() {
		this.instance = function() {
			if($.ResourceDatabase.db == undefined){
				$.ResourceDatabase.db = new localStorageDB("resourceDatabase");
				if($.ResourceDatabase.db.isNew()){
					var dataDB = $.ResourceDatabase.db;
					//console.log('ResourceDatabase:new database');
					
					//service table
					dataDB.createTable('service', ["id", "code", "description", "icon", "activityCount"]);
					dataDB.commit();
					
					dataDB.createTable('remoteUpdate', ["tableName", "timestamp"]);
					dataDB.commit();
					
					//lib activity table
					//data clients is an array
					dataDB.createTable('libraryActivity', ["id", "code", "name", "quantity", "serviceId", "groupId", "clients"]);
					dataDB.commit();
					
					dataDB.createTable('activityCategory', ["id", "name"]);
					dataDB.commit();
					
					dataDB.createTable('sequence', ["mobileId", "autocode"]);
					dataDB.commit();
					dataDB.insert('sequence', {"mobileId": "0"});
					dataDB.commit();

					dataDB.createTable('message', ["key", "message"]);
					dataDB.commit();

					dataDB.createTable('assetManufacturer', ["id", "name"]);
					dataDB.commit();
					
					dataDB.createTable('assetCondition', ["id", "name"]);
					dataDB.commit();
					
					dataDB.createTable('storePart', ["id", "catId", "partId", "pn", "desc", "qty", "services"]);
					dataDB.commit();
					
					dataDB.createTable('partCategory', ["id", "name"]);
					dataDB.commit();
					
					dataDB.createTable('workTimeType', ["id", "name", "isProductive", "isAvailableWhenApptInProgress", "startApptWork"]);
					dataDB.commit();
					
					console.log('ResourceDatabase:database created');
				}
			}
			return $.ResourceDatabase.db;
		}
	},
	

	/**
	 * Table contains records indicating last update from the server
	 */
	RemoteUpdateDao: function() {
		var resourceDb = new $.ResourceDatabase();
		var REMOTE_UPDATE_TABLE = 'remoteUpdate';
		
		/** 
		 * update or inserts new record with current timestamp 
		 * indicating when the table was last time updated from
		 * remote server 
		 */
		this.updateTimestamp = function(table){
			var db = resourceDb.instance();
			
			if(db.query(REMOTE_UPDATE_TABLE, {tableName: table}).length == 0){
				//consoleLog('RemoteUpdateDao:record added for: ' + table);
				db.insert(REMOTE_UPDATE_TABLE, {tableName: table, timestamp: new Date().getTime()});
			}else{
				db.update(REMOTE_UPDATE_TABLE, function(row){
					if(row.tableName == table){
						//consoleLog('RemoteUpdateDao:record updated for: ' + table);
						row.timestamp = new Date().getTime();
					}
					return row;
				});
			}
			db.commit();
		}
		
		/**
		 * Returns timestamp when table was last updated or null
		 */
		this.getLastUpdateTS = function(table){
			var db = resourceDb.instance();
			var remoteUpdateRecord = db.query(REMOTE_UPDATE_TABLE, {tableName: table});
			return remoteUpdateRecord.length == 0 ? null : remoteUpdateRecord[0].timestamp;
		} 
	},
	
	/**
	 * Access to service stored 
	 */
	ServiceDao: function() {
		var resourceDb = new $.ResourceDatabase();
		var TABLE = 'service';
		var selfServiceDao = this;
		/**
		 * Returns all records from db
		 */
		this.getAll = function(){
			return resourceDb.instance().query(TABLE);
		}
		
		/**
		 * Returns all records where activityCount is not zero
		 */
		this.getAllWithActivities = function(clientId){
			var services = resourceDb.instance().query(TABLE, function(service){
				var hasActivity = false;
				if(service.activityCount && service.activityCount.length > 0){
					for(var index in service.activityCount)
					{
						var activityCount = service.activityCount[index];
						if(activityCount.clientId == clientId && activityCount.activityCount > 0)
						{
							//console.log("activityCount:"+activityCount+" clientId:"+activityCount.clientId );
							hasActivity = true;
							break;
						}
					}
				}
				
				return hasActivity;
			});
			console.log('found services:' + services.length)
			return services;
		}
		this.removeAll = function(){
			resourceDb.instance().deleteRows(TABLE);
			resourceDb.instance().commit();
		}
		/** 
		 * Returns service by id
		 */
		this.findById = function(lookupServiceId){
			//consoleLog('ServiceDao:findById:'+ lookupServiceId);
			var list = resourceDb.instance().query(TABLE, {id: lookupServiceId});
			return list.length > 0 ? list[0] : null;
		}
		/**
		 * Saves service into the database
		 */
		this.addAll = function(list){
			var libraryActivityDao = new $.LibraryActivityDao();
			for(var i = 0; i < list.length; i++){
				resourceDb.instance().insert(TABLE, list[i]);
			}
			resourceDb.instance().commit();
			selfServiceDao.updateLibraryActivityCount();
		}
		
		/** 
		 * update an activity count on all service records
		 */
		this.updateLibraryActivityCount = function(){
			var startTime = new Date();
			var libraryActivityDao = new $.LibraryActivityDao();
			
			//create a count per service, for every activity for every client
			//distinct list of all clients for from activities
			var clientIdList = new Array();
			var libActivities = libraryActivityDao.getAll();
			for(var libActIndex in libActivities)
			{
				var libActivity = libActivities[libActIndex];
				for(var clientIdIndex in libActivity.clients)
				{
					var clientId = libActivity.clients[clientIdIndex];
					if(!contains(clientIdList, clientId))
					{
						clientIdList.push(clientId);
					}
				}
			}
			var list = resourceDb.instance().query(TABLE);
			for(var i = 0; i < list.length; i++){
				var service = list[i];				
				
				var activityCountArray = new Array();
				for(var clientIndex in clientIdList)
				{
					var clientId = clientIdList[clientIndex];
					//var activityCount = libraryActivityDao.findByServiceIdAndClientId(service.id, clientId).length;
					//OSS-4669 - Issue cropped up when Gilmartins had lots of clients all associated to all activities
					//and above call is just to expensive to run
					var activityCount = 1;
					activityCountArray.push({clientId: clientId, activityCount: activityCount});
				}
				
				resourceDb.instance().update(TABLE, {id: service.id}, function(row){
					if(row.id == service.id){
						row.activityCount = activityCountArray;
						return row;
					}
				});
			}
			resourceDb.instance().commit();
			
			var took = new Date().getTime() - startTime.getTime();
			console.log('updateLibraryActivityCount:took:' + took + '[ms]')
		}
		
		this.getLastUpdateTS = function(){
			return new $.RemoteUpdateDao().getLastUpdateTS(TABLE);
		}
	},
	
	/**
	 * Access to library activity stored 
	 */
	LibraryActivityDao: function() {
		var resourceDb = new $.ResourceDatabase();
		var TABLE = 'libraryActivity';

		/**
		 * Returns all records from db
		 */
		this.getAll = function(){
			return resourceDb.instance().query(TABLE);
		}
		this.findByServiceId = function(lookupServiceId){
			//consoleLog('LibraryActivityDao:findByServiceId:'+ lookupServiceId);
			return resourceDb.instance().query(TABLE, {serviceId: lookupServiceId});
		}
		
		this.findByServiceIdAndClientId = function(lookupServiceId, clientId){
			
			var list = resourceDb.instance().query(TABLE, function(row){
				if(row.serviceId == lookupServiceId && contains(row.clients, clientId)){
					return true;
				}else{
					return false;
				}
			});
			return list;
		}
		
		this.findByClientId = function(clientId){
			return resourceDb.instance().query(TABLE, function(row){
				if(contains(row.clients, clientId)){
					return true;
				}else{
					return false;
				}
			});
		}
		
		this.findByCode = function(lookupCode){
			//consoleLog("LibraryActivityDao:findByCode:"+lookupCode);
			var list = resourceDb.instance().query(TABLE, {code: lookupCode});
			return list.length > 0 ? list[0] : null;
		}

		this.removeAll = function(){
			resourceDb.instance().deleteRows(TABLE);
			resourceDb.instance().commit();
		}
		/**
		 * Saves service into the database
		 */
		this.addAll = function(list){
			for(var i = 0; i < list.length; i++){
				resourceDb.instance().insert(TABLE, list[i]);
			}
			resourceDb.instance().commit();
		}
		
		this.getLastUpdateTS = function(){
			return new $.RemoteUpdateDao().getLastUpdateTS(TABLE);
		}
	},

	/**
	 * Access to library activity stored 
	 */
	ActivityCategoryDao: function() {
		var resourceDb = new $.ResourceDatabase();
		var TABLE = 'activityCategory';

		/**
		 * Returns all records from db
		 */
		this.getAll = function(){
			return resourceDb.instance().query(TABLE);
		}

		this.removeAll = function(){
			resourceDb.instance().deleteRows(TABLE);
			resourceDb.instance().commit();
		}
		/**
		 * Saves service into the database
		 */
		this.addAll = function(list){
			for(var i = 0; i < list.length; i++){
				resourceDb.instance().insert(TABLE, list[i]);
			}
			resourceDb.instance().commit();
		}
		
		this.getLastUpdateTS = function(){
			return new $.RemoteUpdateDao().getLastUpdateTS(TABLE);
		}
	},
	
	/**
	 * Sequence - generates unique id
     * with use of the local storage
	 */
	SequenceDao: function() {
		var resourceDb = new $.ResourceDatabase();
		var TABLE = 'sequence';
		
		/**
		 * Returns next not used local id
		 */
		this.getNextId = function() {
			var db = resourceDb.instance();
			
			var results = db.query(TABLE);
			var lastRow = results[results.length - 1];
			var newId = (lastRow.mobileId - 1);
			db.insert(TABLE, {"mobileId": newId});
			db.commit();
			
			return newId;
		},
		
		/**
		 * creates autocode if doesn't exists or existing one for given mobile id 
		 */
		this.getAutocode = function(id) {
			var db = resourceDb.instance();
			var results = db.query(TABLE, function(row){
				if(row.mobileId == id)
				{
					return true
				}else{
					return false;
				}
			});
			
			if(results.length == 0)
			{
				throw "unable to find sequence with mobileId = " + id;
			}
			
			var entry = results[0];
			if(entry.autocode){
				return entry.autocode;
			}else{
				var autocode = generateAutocode(entry.mobileId);
				db.update(TABLE, {mobileId : entry.mobileId}, function(row){
					row.autocode = autocode;
					return row;
				});
				db.commit;
				return autocode;
			}
		}
		
		function generateAutocode(id)
		{
			var prefix = localStorage.autocodePrefix;
			//make id positive
			var zlast = leftPad((id * -1), 4, 0);
			return prefix + zlast;
		}
	},
	
	/**
	 * Access to library activity stored 
	 */
	MessageDao: function() {
		var resourceDb = new $.ResourceDatabase();
		var TABLE = 'message';
		/**
		 * Returns all records from db
		 */
		this.getAll = function(){
			return resourceDb.instance().query(TABLE);
		}
		this.findByKey = function(keyLookup){
			var list = resourceDb.instance().query(TABLE, {key: keyLookup});
			return list.length > 0 ? list[0] : null;
		}
		this.removeAll = function(){
			resourceDb.instance().deleteRows(TABLE);
			resourceDb.instance().commit();
		}
		/**
		 * Saves messages into the database
		 */
		this.addAll = function(list){
			resourceDb.instance().deleteRows(TABLE);
			for(var i = 0; i < list.length; i++){
				resourceDb.instance().insert(TABLE, {key : list[i].key, message:list[i].message});
			}
			resourceDb.instance().commit();
		}
	},
	
	/**
	 * Access to survey details
	 * It can be easier in this case to use local storage directly instead db
	 */
	SurveyDetailsDao: function() {
		var PENDING = 1;
		var IN_PROGRESS = 2;
		var COMPLETE = 3;
		var	APPROVED = 4;
		var	REJECTED = 5;
		var selfSDD = this;

		this.getStatusCount = function(surveys){
			var countObject = {incompletedCount: 0, completedCount: 0, totalCount: surveys.length}; 
			for(var i = 0; i < surveys.length; i++){
				var status = surveys[i].status;
				if(status == PENDING || status == IN_PROGRESS){
					countObject.incompletedCount++; 
				}else{
					countObject.completedCount++; 
				}
			}
			
			return countObject;
		}
		
		/**
		 * returns surveys list where 'appointmentId' is null or where 'appointmentId' is the same as passed in 'apptId'
		 * and survey process is null or survey process is the same as this one passed in
		 */
		this.findByAppointment = function(appointment) {
			var surveys = selfSDD.getAll();
			var apptSurveys = new Array();
			var apptId = appointment.id;
			var processId = appointment.currentProcess;
			var jobRef = appointment.jobRef;
			
			for(var i = 0; i < surveys.length; i++){
				var survey = surveys[i];
				
				if(survey.jobRef == jobRef)
				{
					//OSD-1619 - survey linking to appointments
					if((survey.appointmentId == null || survey.appointmentId == apptId)
							&& (survey.processId == null || survey.processId == processId))
					{
						apptSurveys.push(survey);
					}else{
					    //console.log('survey filtered, open appId: ' + apptId + ', surveyAppt: ' + survey.appointmentId);
   					    //console.log('                 open appId process: ' + processId + ', surveyProcess: ' + survey.processId);
					}
				}
			}
			return apptSurveys;
		}
		
		this.hasUncompletedSurveyWithCompletionStage = function(appointment, completionStage) {
			var surveys = this.findByAppointment(appointment);
			for(var i = 0; i < surveys.length; i++)
			{
				var survey = surveys[i];
				if(parseInt(survey.completionStage, 10) == completionStage)
				{
					if(survey.status == PENDING || survey.status == IN_PROGRESS){
						return true;
					}
				}
			}
			return false;
		}
		
		/** 
		 * returns status count for given job ref
		 * contains: incompletedCount, completedCount, totalCount of all surveys associated to job
		 */
		this.getStatusCountByAppointment = function(appt){
			var surveys = this.findByAppointment(appt);
			return this.getStatusCount(surveys);
		}		
		/**
		 * returns all surveys for given job ref
		 */
		this.findByJobRef = function(jobRef){
			var surveys = selfSDD.getAll();
			var arr = new Array();
			for(var i = 0; i < surveys.length; i++){
				if(surveys[i].jobRef == jobRef)
				{
					arr.push(surveys[i]);
				}
			}
			return arr;
		}

		this.findById = function(siteSurveyId){
			consoleLog('SurveyDetailsDao:findById:'+siteSurveyId);
			var surveys = selfSDD.getAll();
			var siteSurvey = null;
			for(var i = 0; i < surveys.length; i++){
				if(surveys[i].id == siteSurveyId)
				{
					siteSurvey = surveys[i];
					break;
				}
			}
			consoleLog('SurveyDetailsDao:findById:result:'+siteSurvey);
			return siteSurvey;
		}

		this.canComplete = function(surveyObject) {			
			if(surveyObject.status == PENDING || surveyObject.status == IN_PROGRESS){
				return false;
			}
			
			for(var index in surveyObject.attributeGroups){
				var attrGroup = surveyObject.attributeGroups[index];
				for(var index2 in attrGroup.attributes){
					var attr = attrGroup.attributes[index2];
					
					if(attr.mandatory && (!attr.value || attr.value == ""))
					{
						return false;
					}
				}
			}
			for(var index in surveyObject.siteSurveyAssets){
				var siteAsset = surveyObject.siteSurveyAssets[index];
				for(var index2 in siteAsset.attributeGroups){
					var attrGroup = surveyObject.attributeGroups[index2];
					for(var index3 in attrGroup.attributes){
						var attr = attrGroup.attributes[index3];
						
						if(attr.mandatory && (!attr.value || attr.value == ""))
						{
							return false;
						}
					}
				}
			}
			return true;
		}
		
		// remove multiple job refs
		this.removeByJobRefList = function(jobRefList){
			consoleLog("Removing entries for jobs: "+JSON.stringify(jobRefList));
			var surveys = selfSDD.getAll();
			var newArr = new Array();

			for(var i = 0; i < surveys.length; i++){
				if ($.inArray(surveys[i].jobRef, jobRefList) == -1)
				{
					console.log("Not removing: "+surveys[i].jobRef);
					newArr.push(surveys[i]);
				}
			}
			consoleLog('Remaining entries: '+newArr.length);
			localStorage.setObjectCompress('surveyDetails', newArr);
		}
		
		this.removeByJobRef = function(jobRef){

			var surveys = selfSDD.getAll();
			//consoleLog('Initial survey count: '+surveys.length);
			//var start = new Date();

			var newArr = new Array();
			for(var i = 0; i < surveys.length; i++){
				if(surveys[i].jobRef != jobRef)
				{
					newArr.push(surveys[i]);
				}
			}
			localStorage.setObjectCompress('surveyDetails', newArr);			
			consoleLog('Removed survey by job ref ' + jobRef + ', remaining: '+newArr.length);
			
			//var end = new Date();
			//console.log("removeByJobRef time="+(end.getTime() - start.getTime()));
		}
		
		/**
		 * removes all surveys for all appointments
		 */
		this.removeAll = function(){
			localStorage.removeItem('surveyDetails');
		}
		/**
		 * Saves surveys into the storage
		 */
		this.addAll = function(list){
			var siteSurveys = selfSDD.getAll();
			console.log('Initial survey count: '+siteSurveys.length);
			// do the addition to local storage in chunks, that way if it fails we still have some,
			// the free space is greater and we can notify how many
			for (var x=0;x<list.length;x+=5)
			{
				var z=0;
				for (z=0;z<5 && (x+z)<list.length;z++)
				{
					siteSurveys.push(list[x+z]);
				}
				
				try
				{
					console.log("Storing "+(x+z)+" surveys");
					localStorage.setObjectCompress('surveyDetails', siteSurveys);
				}
				catch (e)
				{
					console.log("LocalStorage size on survey error: "+getLocalStorageSize()+" "+e); // so we get to see it in any log upload
					alert("Survey data too big for local storage, some/all surveys disabled, "+(x)+" saved");
					break;
				}
				console.log("Added survey "+list[x].id);
				
			}
			//localStorage.setObjectCompress('surveyDetails', siteSurveys);
			console.log('Final survey count: '+siteSurveys.length);
		}
		
		/**
		 * Returns list of all ids
		 */
		this.getAllIds = function(){
			var ids = new Array();
			var surveys = selfSDD.getAll();
			for(var i = 0; i < surveys.length; i++){
				ids.push(surveys[i].id);
			}
			
			return ids;
		}
		
		/**
		 * Returns distinct list of template ids
		 */
		this.getUniqueTemplateIds = function(){
			var ids = new Array();			
			var surveys = selfSDD.getAll();
			
			for(var i = 0; i < surveys.length; i++){
				var templateId = surveys[i].surveyID;
				if($.inArray(templateId,ids) == -1){
					ids.push(templateId);
				}
			}
			
			return ids;
		}
		
		this.getAll = function() {
			var list = localStorage.getObjectDecompress('surveyDetails');
			if (list == undefined)
	   		{
				list = new Array();
	   		}
			return list;
		}
		
		/**
		 * List of site locations associated site survey
		 */
		this.findSiteLocationsBySiteSurveyId = function(siteSurveyId){
			var siteSurvey = selfSDD.findById(siteSurveyId);
			var siteLocations = new Array();
			for(var i in siteSurvey.siteLocations){
				var siteLocation = siteSurvey.siteLocations[i];
				siteLocations.push(siteLocation);
			}
			return siteLocations;
		}
		
		this.updateSiteSurvey = function(siteSurvey) {
			var surveys = selfSDD.getAll();
			for(var i = 0; i < surveys.length; i++){
				if(surveys[i].id == siteSurvey.id)
				{
					surveys[i] = siteSurvey;
					break;
				}
			}
			consoleLog("Removing old surveys");
			selfSDD.removeAll();
			consoleLog("Adding updated surveys");
			selfSDD.addAll(surveys);
		}
		
		/**
		 * Add location to site survey (changes all site surveys for site associated to given siteSurveyId)
		 */
		this.addLocation = function(locationId, locationName, siteSurveyId){
			var siteSurveyTemp = selfSDD.findById(siteSurveyId);
			var siteId = siteSurveyTemp.siteId;
			
			var siteSurveyList = selfSDD.getAll();
			for(var i in siteSurveyList){
				var siteSurvey = siteSurveyList[i];
				if(siteSurvey.siteId == siteId){
					var siteLocations = null;
					if(siteSurvey.siteLocations){
						siteLocations = siteSurvey.siteLocations; 
					}else{
						siteLocations = new Array();
					}
					siteLocations.push({id: locationId, name: locationName})
					siteSurvey.siteLocations = siteLocations; 
					siteSurveyList[i] = siteSurvey;
				}				
			}
			
			selfSDD.removeAll();
			selfSDD.addAll(siteSurveyList);
		}
		
		/**
		 * Update site location for a site (changes all site surveys for site associated to given siteSurveyId)
		 * 
		 */		
		this.updateSiteLocationId = function(oldSiteLocationId, newSiteLocationId, siteSurveyId){
			var siteSurveyTemp = selfSDD.findById(siteSurveyId);
			var siteId = siteSurveyTemp.siteId;
			
			var siteSurveyList = selfSDD.getAll();
			for(var i in siteSurveyList){
				var siteSurvey = siteSurveyList[i];
				if(siteSurvey.siteId == siteId){
					//update siteLocations
					for(var j in siteSurvey.siteLocations){
						if(siteSurvey.siteLocations[j].id == oldSiteLocationId){
							siteSurvey.siteLocations[j].id = newSiteLocationId;
							break;
						}
					}					
					//update siteSurveyAssets as they linked to location too
					for(var k in siteSurvey.siteSurveyAssets){
						if(siteSurvey.siteSurveyAssets[k].siteLocationID == oldSiteLocationId){
							siteSurvey.siteSurveyAssets[k].siteLocationID = newSiteLocationId;
						}
					}
					
					siteSurveyList[i] = siteSurvey;
				}				
			}
			selfSDD.removeAll();
			selfSDD.addAll(siteSurveyList);
		}

		
		/**
		 * adds site survey asset to given site survey
		 */
		this.addSiteSurveyAsset = function(siteSurveyAsset, siteSurveyId){
			var siteSurvey = selfSDD.findById(siteSurveyId);
			var siteSurveyAssets = null;
			if(siteSurvey.siteSurveyAssets){
				siteSurveyAssets = siteSurvey.siteSurveyAssets;
			}else{				
				siteSurveyAssets = new Array();
			}
			siteSurveyAssets.push(siteSurveyAsset);
			siteSurvey.siteSurveyAssets = siteSurveyAssets;
			selfSDD.updateSiteSurvey(siteSurvey);
		}
		
		this.findSiteSurveyAsset = function(siteSurveyId, surveyAssetId){
			var siteSurvey = selfSDD.findById(siteSurveyId);
			var siteSurveyAsset = null;
			for(var i in siteSurvey.siteSurveyAssets){
				var tempSiteSurveyAsset =  siteSurvey.siteSurveyAssets[i];
				if(surveyAssetId == tempSiteSurveyAsset.id){
					siteSurveyAsset = tempSiteSurveyAsset;
					break;
				}
			}
			
			return siteSurveyAsset;
		}
		
		this.findAssetDescription = function(asset, siteSurveyId){
			var surveyTemplateDao = new $.SurveyTemplateDao();
			var assetManufacturerDao = new $.AssetManufacturerDao();
			
			var assetType = surveyTemplateDao.getAssetTypeByLibraryAssetIdAndTemplateSurveyId(asset.libraryAssetID, siteSurveyId);
			
			var libraryAsset = null;
			for (var x=0; x<assetType.libraryAssets.length; x++)
			{
				if (assetType.libraryAssets[x].id == asset.libraryAssetID)
				{
					libraryAsset = assetType.libraryAssets[x];
					break;
				}
			}
			var make = assetManufacturerDao.findById(libraryAsset.manufacturerID);
			//var assetName = assetType.name;
			var assetDesc = make.name + " " + libraryAsset.model;
			return make.name + " " + libraryAsset.model + " - " + asset.ref;
		}
		
		this.findSiteSurveyAssets = function(siteSurveyId){
			var siteSurveyAssets = null;
			var siteSurvey = selfSDD.findById(siteSurveyId);
			if (siteSurvey != null)
			{
				siteSurveyAssets = siteSurvey.siteSurveyAssets;
			}
			return siteSurveyAssets;
		}
		
		/**
		 * replaces siteSurveyAsset with given entry
		 */
		this.overrideSiteSurveyAsset = function(siteSurveyId, siteSurveyAsset, siteSurveyAssetId){
			var siteSurvey = selfSDD.findById(siteSurveyId);
			for(var i in siteSurvey.siteSurveyAssets){
				var tempSiteSurveyAsset =  siteSurvey.siteSurveyAssets[i];
				if(siteSurveyAssetId == tempSiteSurveyAsset.id){
					siteSurvey.siteSurveyAssets[i] = siteSurveyAsset;
					break;
				}
			}
			selfSDD.updateSiteSurvey(siteSurvey);
		}
	},
	
	/**
	 * Access to survey details
	 * It can be easier in this case to use local storage directly instead db
	 */
	SurveyTemplateDao: function() {
		var selfSTD = this;

		/**
		 * removes all surveys for all appointments
		 */
		this.removeAll = function(){
			localStorage.removeItem('surveyTemplate');
		}
		/**
		 * Saves surveys into the storage
		 */
		this.addAll = function(list){
			localStorage.setObjectCompress('surveyTemplate', list);
		}
		
		this.findById = function(templateId){
			var template = null;
			var all = selfSTD.getAll();
			for(var index in all){
				if(all[index].id == templateId){
					template = all[index];
					break;
				}
			}
			return template;
		}
		
		this.removeById = function(templateId){
			var all = selfSTD.getAll();
			var toRemoveIndex = -1;
			for(var index in all){
				if(all[index].id == templateId){
					toRemoveIndex = index;
					break;
				}
			}
			
			if(toRemoveIndex != -1) {
				all.splice(toRemoveIndex, 1);
				selfSTD.removeAll();
				selfSTD.addAll(all); 
			}
		}
		
		this.add = function(template){
			var all = selfSTD.getAll();
			all.push(template);
			selfSTD.addAll(all);
		}

		this.getAll = function() {
			var list = localStorage.getObjectDecompress('surveyTemplate');
			if (list == undefined)
	   		{
				list = new Array();
	   		}
			return list;
		}

		this.getAllIds = function() {
			var all = selfSTD.getAll();
			var list = new Array();
			for(var templateId in all){
				var template = all[templateId];
				list.push(template.id);
			}			
			return list;
		}
		
		/**
		 * @param surveyTemplateId - Survey.id
		 * returns list of asset type objects as returned by rest API
		 */
		this.getAssetTypesByTemplateSurveyId = function(surveyTemplateId) {
			var assetTypes = new Array();
			var assetTypeIds = new Array();
			
			var surveyTemp = selfSTD.findById(surveyTemplateId);

			// check all asset types and make sure no duplicates is added
			for(var index in surveyTemp.assetTypes){
				var assetType = surveyTemp.assetTypes[index];
				if($.inArray(assetTypeIds, assetType.id) == -1){ // already added?
					assetTypes.push(assetType)
					assetTypeIds.push(assetType.id);
				}
			}
			return assetTypes;
		}
		
		/**
		 * @param surveyTemplateId - Survey.id
		 * @param assetTypeId - asset type id
		 * returns asset type from given survey template
		 */
		this.getAssetTypeByIdAndTemplateSurveyId = function(assetTypeId, surveyTemplateId) {
			var surveyTemp = selfSTD.findById(surveyTemplateId);
			var assetType = null;
			// check all asset types and make sure no duplicates is added
			for(var index in surveyTemp.assetTypes){
				var tempAssetType = surveyTemp.assetTypes[index];
				if(tempAssetType.id == assetTypeId){
					assetType = tempAssetType;
					break;
				}
			}
			return assetType;
		}
		
		/**
		 * Updates asset type on given surveyTemplateId
		 */
		this.updateAssetType = function(assetType, surveyTemplateId) {
			var surveyTemp = selfSTD.findById(surveyTemplateId);
			// check all asset types and make sure no duplicates is added
			for(var index in surveyTemp.assetTypes){
				var tempAssetType = surveyTemp.assetTypes[index];
				if(tempAssetType.id == assetType.id){
					surveyTemp.assetTypes[index] = assetType;
					break;
				}
			}
			selfSTD.updateSurveyTemplate(surveyTemp);
		}

		/**
		 * updates matching (by id) surveyTemplate with given template
		 */
		this.updateSurveyTemplate = function(surveyTemplate){
			var surveyTempList = selfSTD.getAll();
			for(var i = 0; i < surveyTempList.length; i++){
				if(surveyTempList[i].id == surveyTemplate.id)
				{
					surveyTempList[i] = surveyTemplate;
					break;
				}
			}
			selfSTD.removeAll();
			selfSTD.addAll(surveyTempList);
		}
		
		/**
		 * @param surveyTemplateId - Survey.id
		 * @param libraryAssetId - LibraryAsset id
		 * returns asset type from given survey template
		 */
		this.getAssetTypeByLibraryAssetIdAndTemplateSurveyId = function(libraryAssetId, surveyTemplateId) {
			var surveyTemp = selfSTD.findById(surveyTemplateId);
			var assetType = null;
			for(var index in surveyTemp.assetTypes){
				var tempAssetType = surveyTemp.assetTypes[index];
				//consoleLog("AssetType: "+JSON.stringify(tempAssetType)+"\n\n");
				for (var index2 in tempAssetType.libraryAssets)
				{
					var tempLibraryAsset = tempAssetType.libraryAssets[index2];
					if (tempLibraryAsset.id == libraryAssetId)
					{
						assetType = tempAssetType;
						break;
					}
				}
				if (assetType != null)
					break;
			}
			return assetType;
		}
		
		/**
		 * @param assetTypeId
		 * returns name for given asset type id
		 */
		this.getAssetTypeName = function(assetTypeId, surveyTemplateId) {
			var surveyTemp = selfSTD.findById(surveyTemplateId);

			var assetTypeName = "";
			// check all asset types and make sure no duplicates is added
			for(var index in surveyTemp.assetTypes){
				var assetType = surveyTemp.assetTypes[index];
				if(assetTypeId == assetType.id){
					assetTypeName = assetType.name;
					break;
				}
			}
			return assetTypeName;
		}
		
		/**
		 * @param assetTypeId - asset type id
		 * @param templateSurveyId - Survey.id
		 * returns list of libraryAssets (asset models)
		 */
		this.getAssetModelListByAssetTypeAndTemplateSurveyId = function(manufacturerId, assetTypeId, surveyTemplateId) {
			var assetMakes = new Array();
			var assetMakeIds = new Array();
			consoleLog('getAssetModelListByAssetTypeAndTemplateSurveyId: '+manufacturerId+","+assetTypeId+","+surveyTemplateId);
			var surveyTemp = selfSTD.findById(surveyTemplateId);
			// check all asset types and make sure no duplicates is added
			for(var index in surveyTemp.assetTypes){
				var assetType = surveyTemp.assetTypes[index];
				if(assetType.id == assetTypeId){ //is asset type correct
					//consoleLog("Found asset type");
					//consoleLog(JSON.stringify(assetType.libraryAssets));
					for(var index2 in assetType.libraryAssets){
						var libAsset = assetType.libraryAssets[index2];
						if(manufacturerId == libAsset.manufacturerID){ //is manufacturer correct
							//consoleLog("Found manufacturer");
							//if($.inArray(assetMakeIds, libAsset.id) == -1){ // already added?
							if($.inArray(libAsset.id, assetMakeIds) == -1){ // already added?								
								assetMakes.push(libAsset)
								assetMakeIds.push(libAsset.id);
							}
						}
					}
				}
			}
			return assetMakes;
		}
		
		/**
		 * Creates new libraryAsset in mobile
		 */
		this.addLibraryAsset = function(libraryAssetID, libraryAssetName, templateSurveyId, assetTypeId, manufacturerId){
			var libAsset = {id: libraryAssetID, 
							localId: libraryAssetID, 
							model: libraryAssetName, 
							manufacturerID: manufacturerId};
			var assetType = selfSTD.getAssetTypeByIdAndTemplateSurveyId(assetTypeId, templateSurveyId);
			
			var libraryAssets = null;
			if(assetType.libraryAssets){
				libraryAssets = assetType.libraryAssets; 
			}else{
				libraryAssets = new Array();
			}
			var count = libraryAssets.length;
			libraryAssets.push(libAsset);
			assetType.libraryAssets = libraryAssets;
			selfSTD.updateAssetType(assetType, templateSurveyId);
		}
		
		/**
		 * Update library asset id to new value
		 */
		this.updateLibraryAssetId = function(libraryAssetID, newlibraryAssetID, templateSurveyId, assetTypeId){
			var assetType = selfSTD.getAssetTypeByIdAndTemplateSurveyId(assetTypeId, templateSurveyId);
			for(var i in assetType.libraryAssets){
				if(assetType.libraryAssets[i].id == libraryAssetID){
					assetType.libraryAssets[i].id = newlibraryAssetID;
					break;
				}
			}
			selfSTD.updateAssetType(assetType, templateSurveyId);
		}
	},
	
	/**
	 * Access to asset manufacturers details
	 */
	AssetManufacturerDao: function() {
		var resourceDb = new $.ResourceDatabase();
		var TABLE = 'assetManufacturer';

		/**
		 * Returns all records from db
		 */
		this.getAll = function(){
			return resourceDb.instance().query(TABLE);
		}

		this.removeAll = function(){
			resourceDb.instance().deleteRows(TABLE);
			resourceDb.instance().commit();
		}
		/** 
		 * Returns assetManufacturer by id
		 */
		this.findById = function(lookupId){
			//consoleLog('ServiceDao:findById:'+ lookupServiceId);
			var list = resourceDb.instance().query(TABLE, {id: lookupId});
			return list.length > 0 ? list[0] : null;
		}
		/**
		 * Saves list of assetManufacturers into the database
		 */
		this.addAll = function(list){
			for(var i = 0; i < list.length; i++){
				var manufacturer = list[i];				
				resourceDb.instance().insert(TABLE, manufacturer);
			}
			resourceDb.instance().commit();
		}
		
		this.getLastUpdateTS = function(){
			return new $.RemoteUpdateDao().getLastUpdateTS(TABLE);
		}
		
		/** 
		 * Returns assetManufacturers by asset type
		 */
		this.getByAssetType = function(surveyTemplateId, assetTypeId){
			var manufacturers = new Array();
			//consoleLog('getByAssetType: '+surveyTemplateId+","+assetTypeId);
			var surveyTemplateDao = new $.SurveyTemplateDao();
			var surveyTemp = surveyTemplateDao.findById(surveyTemplateId);
			
			// find asset type
			for(var index in surveyTemp.assetTypes){
				var assetType = surveyTemp.assetTypes[index];
				if(assetType.id == assetTypeId){
					for(var index2 in assetType.libraryAssets){
						var libAsset = assetType.libraryAssets[index2];
						// $.inArray doesn't seem to work here
						var found = false;
						for (var x=0;x<manufacturers.length;x++)
						{
							if (manufacturers[x].id == libAsset.manufacturerID)
							{
								found = true;
								break;
							}
						}
						if (!found)
						{
							manufacturers.push(this.findById(libAsset.manufacturerID));
						}
					}
				}
			}
			return manufacturers;
		}
	},

	/**
	 * Access to asset conditions details
	 */
	AssetConditionDao: function() {
		var resourceDb = new $.ResourceDatabase();
		var TABLE = 'assetCondition';

		/**
		 * Returns all records from db
		 */
		this.getAll = function(){
			return resourceDb.instance().query(TABLE);
		}

		this.removeAll = function(){
			resourceDb.instance().deleteRows(TABLE);
			resourceDb.instance().commit();
		}
		/** 
		 * Returns assetCondition by id
		 */
		this.findById = function(lookupId){
			//consoleLog('ServiceDao:findById:'+ lookupServiceId);
			var list = resourceDb.instance().query(TABLE, {id: lookupId});
			return list.length > 0 ? list[0] : null;
		}
		/**
		 * Saves list of assetConditions into the database
		 */
		this.addAll = function(list){
			for(var i = 0; i < list.length; i++){
				var condition = list[i];				
				resourceDb.instance().insert(TABLE, condition);
			}
			resourceDb.instance().commit();
		}
		
		this.getLastUpdateTS = function(){
			return new $.RemoteUpdateDao().getLastUpdateTS(TABLE);
		}
	},
	
	/**
	 * Access to store parts
	 */
	StorePartDao: function() {
		var resourceDb = new $.ResourceDatabase();
		var TABLE = 'storePart';
		adsdsad = this;
		/**
		 * Returns all records from db
		 */
		this.getAll = function(){
			return resourceDb.instance().query(TABLE);
		}

		this.removeAll = function(){
			resourceDb.instance().deleteRows(TABLE);
			resourceDb.instance().commit();
		}
		/** 
		 * Returns object by id
		 */
		this.findById = function(lookupId){
			var list = resourceDb.instance().query(TABLE, {id: lookupId});
			return list.length > 0 ? list[0] : null;
		}

		/** 
		 * Returns object by part id
		 */
		this.findByPartId = function(partId){
			var list = resourceDb.instance().query(TABLE, {partId: partId});
			return list.length > 0 ? list[0] : null;
		}		
		
		this.findByPartCategory = function(partCategoryId){
			var list = resourceDb.instance().query(TABLE, {catId: partCategoryId});
			return list;
		}
		
		/**
		 * Saves list into the database
		 */
		this.addAll = function(list){
			for(var i = 0; i < list.length; i++){
				var obj = list[i];
				resourceDb.instance().insert(TABLE, obj);
			}
			resourceDb.instance().commit();
		}
		/**
		 * Update store part to new value
		 */
		this.updateStorePart = function(storePart){
			var db = resourceDb.instance();
			db.update(TABLE, {partId : storePart.partId}, function(row){
				row.qty = storePart.qty;
				return row;
			});
			db.commit;	
		}
		
		this.getLastUpdateTS = function(){
			return new $.RemoteUpdateDao().getLastUpdateTS(TABLE);
		}
	},
	
	/**
	 * Session storage as opposed to Local storage is unlimitted so use it as a cache
	 * - all here is stored under the same sessionStorage key = 'cache' (at least at the moment)
	 */	
	CacheManager: function() {
		var cacheManagerSelf = this;
		
		//don't use put and get outside this class		
		
		this.getStorePartServices = function(){
			return get('storePartServices');
		},
		
		this.putStorePartServices = function(values){
			return put('storePartServices', values);
		},
		
		this.getStorePartCategories = function(){
			return get('storePartCategories');
		},
		
		//part categories with associated services
		this.putStorePartCategories = function(values){
			return put('storePartCategories', values);
		},
		
		/**
		 * Cache part category
		 * which contains parts categories and for each associated service
		 */
		this.loadPartCategoryCache = function()
		{
			//this is loaded via serviceCache
			cacheManagerSelf.loadPartServiceCache();
		},
		
		/**
		 * Cache list of services with part-service record
		 * also in the same time (performace gain) cache part category
		 * which contains parts categories and for each associated service
		 */
		this.loadPartServiceCache = function()
		{
			var partCategoryDao = new $.PartCategoryDao();
			var storePartDao = new $.StorePartDao();
			var serviceDao = new $.ServiceDao();
			var storeParts = storePartDao.getAll();
			consoleLog('serviceDao - storeParts found: ' + storeParts.length);
			
			var services = new Array();
			var cachedServiceIdList = new Array();
			var partCategories = new Array();
			var cachedPartCategoryIdList = new Array();
			
			for(var ind in storeParts)
			{
				var store = storeParts[ind];
				
				//service
				var serviceIdList = store.services;					
				for(var i = 0; i < serviceIdList.length; i++)
				{
					var serviceId = serviceIdList[i];
					if(cachedServiceIdList.indexOf(serviceId) == -1)
					{
						var service = serviceDao.findById(serviceId);
						cachedServiceIdList.push(serviceId);
						if(service)
						{
							services.push(service);
						}
					}
				}
				
				//part category
				var partCatIndex = cachedPartCategoryIdList.indexOf(store.catId);
				if(partCatIndex == -1)
				{
					var category = partCategoryDao.findById(store.catId);
					cachedPartCategoryIdList.push(store.catId);
					if(category)
					{
						//add services to part categories as we need to filter by them
						category.services = store.services;
						partCategories.push(category);
					}
				}else{
					var category = partCategories[partCatIndex];
					if(!category.services)
					{
						category.services = new Array();
					}
					//otherwise makes sure we have only unique services
					for(var i = 0; i < store.services.length; i++)
					{
						var serviceId = store.services[i];
						category.services.push(serviceId);
					}
				}
			}
			consoleLog('serviceDao - update cache services found: ' + services.length);
			cacheManagerSelf.putStorePartServices(services);
			cacheManagerSelf.putStorePartCategories(partCategories);
		},
		
		
		//private methods
		put = function(key, value) {
			var cache = sessionStorage.getObject('cache') || {};
			cache[key] = value;
			sessionStorage.setObject('cache', cache);
		},
		
		get = function(key) {
			if(sessionStorage.cache)
			{
				return sessionStorage.getObject('cache')[key];
			}
			return null;
		}
	},
	
	
	/**
	 * Access to store parts
	 */
	PartCategoryDao: function() {
		var resourceDb = new $.ResourceDatabase();
		var TABLE = 'partCategory';

		/**
		 * Returns all records from db
		 */
		this.getAll = function(){
			return resourceDb.instance().query(TABLE);
		}

		this.removeAll = function(){
			resourceDb.instance().deleteRows(TABLE);
			resourceDb.instance().commit();
		}
		/** 
		 * Returns object by id
		 */
		this.findById = function(lookupId){
			var list = resourceDb.instance().query(TABLE, {id: lookupId});
			return list.length > 0 ? list[0] : null;
		}
		/** 
		 * Returns object filtering by given service id
		 */
		this.findByServiceId = function(serviceId){
			//this is cached
			var cache = new $.CacheManager();
			
			//get cached partCategories - they additionally contain services linked to each other
			var categories = cache.getStorePartCategories();
			if(!categories)
			{
				consoleLog('PartCategoryDao - cache empty - loading data');
				cache.loadPartCategoryCache();
				categories = cache.getStorePartCategories();				
			}else{
				consoleLog('PartCategoryDao - findByServiceId - using cache');	
			}
			consoleLog('PartCategoryDao - found: ' + categories.length);
			
			var filtered = new Array();
			if(categories)
			{
				var filteredIdList = new Array();
				//filter by service id
				for(var i = 0; i < categories.length; i++)
				{
					var cat = categories[i];
					//not already added & has service
					if(filteredIdList.indexOf(cat.id) == -1 && cat.services && cat.services.indexOf(parseInt(serviceId, 10)) != -1)
					{
						filtered.push(cat);
						filteredIdList.push(cat.id);
					}
				}
			}
			consoleLog('PartCategoryDao - filtered by service: ' + filtered.length);
			return filtered;
		}
		/**
		 * Saves list into the database
		 */
		this.addAll = function(list){
			for(var i = 0; i < list.length; i++){
				var obj = list[i];				
				resourceDb.instance().insert(TABLE, obj);
			}
			resourceDb.instance().commit();
		}
		
		this.getLastUpdateTS = function(){
			return new $.RemoteUpdateDao().getLastUpdateTS(TABLE);
		}
	},
	
	/**
	 * Access to library activity stored 
	 */
	WorkTimeTypeDao: function() {
		var resourceDb = new $.ResourceDatabase();
		var TABLE = 'workTimeType';

		/**
		 * Returns all records from db
		 */
		this.getAll = function(){
			return resourceDb.instance().query(TABLE);
		}

		this.removeAll = function(){
			resourceDb.instance().deleteRows(TABLE);
			resourceDb.instance().commit();
		}
		/** 
		 * Returns object by id
		 */
		this.findById = function(lookupId){
			var list = resourceDb.instance().query(TABLE, {id: lookupId});
			return list.length > 0 ? list[0] : null;
		}
		
		this.findProductive = function(){
			return resourceDb.instance().query(TABLE, {isProductive: "true"});
		}
		
		this.isProductive = function(id){
			return this.findById(id).isProductive == "true";
		}
		/**
		 * returns all workTimeTypes which can be used when appointment is in progress 
		 */
		this.findForAppointmentInProgress = function(){
			return resourceDb.instance().query(TABLE, function(row){
				return row.isProductive == "true" && row.isAvailableWhenApptInProgress == "true";
			});
		}
		
		this.shouldTriggerBeforeWorksStartsSurvey = function(id){
			if(id){
				return this.findById(id).startApptWork == "true";
			}else{
				return false;
			}
		}
	
		/**
		 * Saves service into the database
		 */
		this.addAll = function(list){
			for(var i = 0; i < list.length; i++){
				resourceDb.instance().insert(TABLE, list[i]);
			}
			resourceDb.instance().commit();
		}
		
		this.getLastUpdateTS = function(){
			return new $.RemoteUpdateDao().getLastUpdateTS(TABLE);
		}
	}

});