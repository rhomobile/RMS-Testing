//
// Contains classes related to downloading data from remote server
//
jQuery.extend({

	ServiceRemoteDataProvider: function(){		
		var self = this;
		var resourceId = localStorage.getObject('resource').resourceId;
		var servicesUrl = escape(localStorage.ctx+"/rest/workflow/getClientServices/" + resourceId);
		
		var DAY =  86400000;
		var WEEK = 7 * DAY;
		var SERVICE_LIST_REFRESH_INTERVAL = WEEK;
		
		var remoteUpdateDao = new $.RemoteUpdateDao();
		var serviceDao = new $.ServiceDao();
		
		/** sort alphabetically */
		function sortServices(service1, service2){

			 var x = service1.description;
			 var y = service2.description;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		/**
		 * model - null or object with dataLoaded method
		 */
		this.downloadData = function(async){
			consoleLog("ServiceRemoteDataProvider: sendRequest:" + servicesUrl);
			
			var resource = localStorage.getObject('resource');
			$.ajax({
				url: servicesUrl,
				type: 'GET',
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				dataType: 'json',
				async: async,
				data: '',
				contentType: "application/json",
				success: function(resp, status, req){
					//resp = getResponseObject(resp);
					if(resp.services)
					{
						consoleLog("services request successful: records found:" + resp.services.length);
						//sort services
						resp.services.sort(sortServices);
						serviceDao.removeAll();
						serviceDao.addAll(resp.services);
						remoteUpdateDao.updateTimestamp('service');
						consoleLog("loading data - done");
						self.dataLoaded();
					}
				},
				// Error handler
				error: function(req, status, err){
					processGetRequestError(req, status, err);
				}
			  });
		}	
		/**
		 * Callback function after successful data download
		 */
		this.dataLoaded = function(){
			
		}
		
		this.requiresUpdate = function(){
			var lastUpdate = serviceDao.getLastUpdateTS();
			var remoteLoadRequired = true;
			if(lastUpdate != null){
				var milisecondsFromLastUpdate = new Date().getTime() - lastUpdate;
				
				if(milisecondsFromLastUpdate < SERVICE_LIST_REFRESH_INTERVAL){					
					remoteLoadRequired = false;					
				}else{
					consoleLog('data refresh required:' + milisecondsFromLastUpdate);
				}
			}
			return remoteLoadRequired;
		}
	},
	
	LibraryActivityRemoteDataProvider: function(){		
		var self = this;
		var resourceId = localStorage.getObject('resource').resourceId;
		var libActivityUrl = escape(localStorage.ctx+"/rest/workflow/activity/getClientLibraryActivities/" + resourceId);
		
		var DAY =  86400000;
		var WEEK = 7 * DAY;
		var SERVICE_LIST_REFRESH_INTERVAL = WEEK;
		
		var remoteUpdateDao = new $.RemoteUpdateDao();
		var libActivityDao = new $.LibraryActivityDao();
		
		/** sort alphabetically */
		function sortActivities(act1, act2){

			 var x = act1.name;
			 var y = act2.name;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		/**
		 * model - null or object with dataLoaded method
		 */
		this.downloadData = function(async){
			consoleLog("LibraryActivityRemoteDataProvider: sendRequest:" + libActivityUrl);
			
			var resource = localStorage.getObject('resource');
			$.ajax({
				url: libActivityUrl,
				type: 'GET',
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				dataType: 'json',
				async: async,
				data: '',
				contentType: "application/json",
				success: function(resp, status, req){
					if(resp.libraryActivities)
					{
						//sort activities
						resp.libraryActivities.sort(sortActivities);
						libActivityDao.removeAll();
						libActivityDao.addAll(resp.libraryActivities);					
						remoteUpdateDao.updateTimestamp('libraryActivity');
					
						consoleLog("loading data - done");
						self.dataLoaded();
					}
				},
				// Error handler
				error: function(req, status, err){
					processGetRequestError(req, status, err);
				}
			  });
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.dataLoaded = function(){
			
		}
		
		this.requiresUpdate = function(){
			var lastUpdate = libActivityDao.getLastUpdateTS();
			var remoteLoadRequired = true;
			if(lastUpdate != null){
				var milisecondsFromLastUpdate = new Date().getTime() - lastUpdate;
				
				if(milisecondsFromLastUpdate < SERVICE_LIST_REFRESH_INTERVAL){					
					remoteLoadRequired = false;					
				}else{
					consoleLog('data refresh required:' + milisecondsFromLastUpdate);
				}
			}
			return remoteLoadRequired;
		}
	},

	ActivityCategoryRemoteDataProvider: function(){		
		var self = this;
		var clientGroupId = localStorage.getObject('resource').clientGroupId;
		var activityCatUrl = escape(localStorage.ctx+"/rest/workflow/activity/category/" + clientGroupId);
		
		var DAY =  86400000;
		var WEEK = 7 * DAY;
		var ACTIVITY_CATEGORY_LIST_REFRESH_INTERVAL = WEEK;
		
		var remoteUpdateDao = new $.RemoteUpdateDao();
		var activityCategoryDao = new $.ActivityCategoryDao();
		
		/** sort alphabetically */
		function sortActivityCategory(act1, act2){

			 var x = act1.name;
			 var y = act2.name;
			 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		}
		
		/**
		 * model - null or object with dataLoaded method
		 */
		this.downloadData = function(async){
			consoleLog("ActivityCategoryRemoteDataProvider: sendRequest:" + activityCatUrl);
			var resource = localStorage.getObject('resource');
			$.ajax({
				url: activityCatUrl,
				type: 'GET',
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				dataType: 'json',
				async: async,
				data: '',
				contentType: "application/json",
				success: function(resp, status, req){
					if(resp.activityCategories)
					{
						//sort activities
						resp.activityCategories.sort(sortActivityCategory);
						activityCategoryDao.removeAll();
						activityCategoryDao.addAll(resp.activityCategories);					
						remoteUpdateDao.updateTimestamp('activityCategories');
					
						consoleLog("loading data - done");
						self.dataLoaded();
					}
				},
				// Error handler
				error: function(req, status, err){
					processGetRequestError(req, status, err);
				}
			  });
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.dataLoaded = function(){
			
		}
		
		this.requiresUpdate = function(){
			var lastUpdate = activityCategoryDao.getLastUpdateTS();
			var remoteLoadRequired = true;
			if(lastUpdate != null){
				var milisecondsFromLastUpdate = new Date().getTime() - lastUpdate;
				
				if(milisecondsFromLastUpdate < ACTIVITY_CATEGORY_LIST_REFRESH_INTERVAL){					
					remoteLoadRequired = false;					
				}else{
					consoleLog('data refresh required:' + milisecondsFromLastUpdate);
				}
			}
			return remoteLoadRequired;
		}
	},

	
	SurveyDetailsRemoteDataProvider: function(){		
		var selfRDP = this;
		var resourceId = localStorage.getObject('resource').resourceId;
		var surveyDetailsUrl = localStorage.ctx+"/rest/assetmgmt/survey/surveyDetails/";
		
		/**
		 * jobRefs - jobs for which surveys need to be downloaded
		 * timeout - connection timeout
		 * asynch - should run in async mode?
		 * 
		 * extended version that gets templates as well as details
		 */
		this.downloadFullData = function(async, jobRefs, timeout){
			var surveyDetailsUrl = localStorage.ctx+"/rest/assetmgmt/survey/surveyDetailsAndTemplates/";
			if(!timeout){
				timeout = 30000;
			}
			
			var resource = localStorage.getObject('resource');
			var surveyDetailsDao = new $.SurveyDetailsDao();
			
			// jobrefs should be unique so if the survey list starts out empty we shouldn't
			// need the removeByJobRef call
			var removeCheck = false;
			var surveys = localStorage.getObjectDecompress('surveyDetails');
			if (surveys != undefined && surveys != null && surveys.length > 0)
			{
				removeCheck = true;
				console.log("Remove check enabled");
			}
			
			var surveyTemplateDao = new $.SurveyTemplateDao();
			
			/*
			 * This won't work - OSD-1282
			both have to be downloaded: templates and details, otherwise 
			when looking up for assetType we get null pointers
			
			see if we have any existing templates 
			
			var templates = surveyTemplateDao.getAllIds();
			var templateList = "";
			for (var x=0;x<templates.length;x++)
			{
				if (x > 0)
					templateList += ",";
				templateList += templates[x];
			}
			console.log("Existing templates: "+templateList);
			*/
			
			/* list call version */
			var jobRefList = "";
			for (var x=0;x<jobRefs.length;x++)
			{
				if (x > 0)
					jobRefList += ",";
				jobRefList += jobRefs[x];
			}
			var start = new Date();
			console.log(escape(surveyDetailsUrl + jobRefList));
			
			$.ajax({
				url: escape(surveyDetailsUrl + jobRefList),
				timeout: timeout,
				type: 'GET',
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				dataType: 'json',
				//both have to be downloaded templates and details, other
				//wise when looking up for assetType in templates we get out of sync
				//data: 'excludeTemplateIds='+templateList,
				processData: false,  					// to stop it becoming part of the url on GET
				async: async,
				contentType: "application/json",
				success: function(resp, status, req){				    
					// save details
					if (removeCheck)
					{
						//surveyDetailsDao.removeByJobRef(jobRef);
						console.log("Remove existing surveys");
						surveyDetailsDao.removeByJobRefList(jobRefs);
					}
					try
					{
						// save templates - override current templates
						surveyTemplateDao.addAll(resp.surveyTemplates);
						// save existing survey data
						showLoadingMessage("Processing surveys");
						surveyDetailsDao.addAll(resp.siteSurveys);
					}
					catch (e)
					{
						console.log("Error saving surveys: "+e);
					}
					
					selfRDP.dataLoaded();					
					//surveyTemplateDao.dataLoaded();
					
					hideLoadingMessage();
				},
				// Error handler
				error: function(req, status, err){
					logAjaxError("SurveyDetailsRemoteDataProvider.download error: "+err);
					processGetRequestError(req, status, err);
					selfRDP.onError(req, status, err);
					hideLoadingMessage();
				}
			  });
			var end = new Date();
			console.log("Survey details downloadData time="+(end.getTime() - start.getTime())+" msecs");
		}
		
		/**
		 * jobRefs - jobs for which surveys need to be downloaded
		 * timeout - connection timeout
		 * asynch - should run in async mode?
		 */
		this.downloadData = function(async, jobRefs, timeout){
			if(!timeout){
				timeout = 30000;
			}
			
			var resource = localStorage.getObject('resource');
			var surveyDetailsDao = new $.SurveyDetailsDao();
			
			// jobrefs should be unique so if the survey list starts out empty we shouldn't
			// need the removeByJobRef call
			var removeCheck = false;
			var surveys = localStorage.getObjectDecompress('surveyDetails');
			if (surveys != undefined && surveys != null && surveys.length > 0)
			{
				removeCheck = true;
				console.log("Remove check enabled");
			}
			
			/* list call version */
			var jobRefList = "";
			for(var x=0;x<jobRefs.length;x++)
			{
				if (x > 0)
					jobRefList += ",";
				jobRefList += jobRefs[x];
			}
			var start = new Date();
			console.log(escape(surveyDetailsUrl + jobRefList));
			
			$.ajax({
				url: escape(surveyDetailsUrl + jobRefList),
				timeout: timeout,
				type: 'GET',
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				dataType: 'json',
				async: async,
				contentType: "application/json",
				success: function(resp, status, req){
					if (removeCheck)
					{
						//surveyDetailsDao.removeByJobRef(jobRef);
						surveyDetailsDao.removeByJobRefList(jobRefs);
					}
					surveyDetailsDao.addAll(resp.siteSurveys);
					selfRDP.dataLoaded();
					hideLoadingMessage();
				},
				// Error handler
				error: function(req, status, err){
					logAjaxError("SurveyDetailsRemoteDataProvider.download error: "+err);
					processGetRequestError(req, status, err);
					selfRDP.onError(req, status, err);
					hideLoadingMessage();
				}
			  });
			var end = new Date();
			console.log("Survey details downloadData time="+(end.getTime() - start.getTime()));
		}
		
		/**
		 * Callback function after unsuccessful data download
		 */
		this.onError = function(response, status, err){

		}
		
		/**
		 * Callback function after successful data download
		 */
		this.dataLoaded = function(){
			
		}
	},
	
	SurveyTemplateRemoteDataProvider: function(){		
		var selfTRDP = this;
		var resourceId = localStorage.getObject('resource').resourceId;
		var url = localStorage.ctx+"/rest/assetmgmt/survey/surveyTemplates/";
		
		/**
		 * surveyIds - jobs for which surveys need to be downloaded
		 * timeout - connection timeout
		 * asynch - should run in async mode?
		 */
		this.downloadData = function(async, surveyTemplateIdList, timeout){
			if(!timeout){
				timeout = 10000;
			}
			var resource = localStorage.getObject('resource');
			var surveyTemplateDao = new $.SurveyTemplateDao();
			var surveyDetailsDao = new $.SurveyDetailsDao();
			
			/* list call version */
			var templateIdList = "";
			var templatesRequired = false;
			for(var x=0;x<surveyTemplateIdList.length;x++)
			{
				//make sure we don't download the survey template more then once
				var template = surveyTemplateDao.findById(surveyTemplateIdList[x]);
				if (template != null)
					continue;
				if (x > 0)
					templateIdList += ",";
				templateIdList += surveyTemplateIdList[x];
				templatesRequired = true;
			}
			console.log("Template list: "+templateIdList);
			
			if (templatesRequired)
			{
				var start = new Date();
				$.ajax({
					url: escape(url + templateIdList),
					timeout: timeout,
					type: 'GET',
					headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
					dataType: 'json',
					async: async,
					contentType: "application/json",
					success: function(resp, status, req){
						var surveyTemplates = resp.surveyTemplates;
						surveyTemplateDao.addAll(surveyTemplates);
						selfTRDP.dataLoaded();
					},
					// Error handler
					error: function(req, status, err){
						processGetRequestError(req, status, err);
						selfTRDP.onError(req, status, err);
					}
				  });
				var end = new Date();
				console.log("Survey templates downloadData time="+(end.getTime() - start.getTime()));
			}
			
			/* single id version
			for(var index in surveyTemplateIdList)
			{				
				var templateId = surveyTemplateIdList[index];
				//make sure we don't download the survey template more then once
				var template = surveyTemplateDao.findById(templateId);
				
				if(template == null) {
					consoleLog("SurveyTemplateRemoteDataProvider: sendRequest:" + url + templateId);
					$.ajax({
						url: escape(url + templateId),
						timeout: timeout,
						type: 'GET',
						headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
						dataType: 'json',
						async: async,
						contentType: "application/json",
						success: function(resp, status, req){
							//dataType: 'json' - should do it for us, but for some reason it doesn't
							//so parse object manually
							var surveyTemplates = resp.surveyTemplates; //$.parseJSON(resp.surveyTemplates);
							var surveyTemplate = surveyTemplates[0];
							surveyTemplateDao.add(surveyTemplate);
							//surveyTemplateDao.addAll(surveyTemplates); // TODO
							selfTRDP.dataLoaded();
						},
						// Error handler
						error: function(req, status, err){
							processGetRequestError(req, status, err);
							selfTRDP.onError(req, status, err);
						}
					  });
				}
			}
			*/

		}
		
		/**
		 * Callback function after successful data download
		 */
		this.onError = function(response, status, err){
			
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.dataLoaded = function(){
			
		}
	},
	
	AssetManufacturerRemoteDataProvider: function(){		
		var selfAMRDP = this;
		var resourceId = localStorage.getObject('resource').resourceId;
		//1 as this actually can be anything rest does not care always
		//returns full list of manufaturers
		var url = localStorage.ctx+"/rest/assetmgmt/assetManufacturers/1";
		var assetManufacturerDao = new $.AssetManufacturerDao();
		var DAY =  86400000;
		var WEEK = 7 * DAY;
		var ASSET_MANUFACTURER_REFRESH_INTERVAL = WEEK;
		
		/**
		 * timeout - connection timeout
		 * asynch - should run in async mode?
		 */
		this.downloadData = function(async, timeout){
			if(!timeout){
				timeout = 10000;
			}
			var resource = localStorage.getObject('resource');
			

			consoleLog("AssetManufacturerRemoteDataProvider: sendRequest:" + url);
			$.ajax({
				url: escape(url),
				timeout: timeout,
				type: 'GET',
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				dataType: 'json',
				async: async,
				contentType: "application/json",
				success: function(resp, status, req){
					var manufactures = $.parseJSON(resp.assetManufacturers);
					assetManufacturerDao.removeAll();
					assetManufacturerDao.addAll(manufactures);
					selfAMRDP.dataLoaded();
				},
				// Error handler
				error: function(req, status, err){
					processGetRequestError(req, status, err);
					selfAMRDP.onError(req, status, err);
				}
			});
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.onError = function(response, status, err){
			
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.dataLoaded = function(){
			
		}
		
		this.requiresUpdate = function(){
			var lastUpdate = assetManufacturerDao.getLastUpdateTS();
			var remoteLoadRequired = true;
			if(lastUpdate != null){
				var milisecondsFromLastUpdate = new Date().getTime() - lastUpdate;
				
				if(milisecondsFromLastUpdate < ASSET_MANUFACTURER_REFRESH_INTERVAL){					
					remoteLoadRequired = false;					
				}else{
					consoleLog('data refresh required:' + milisecondsFromLastUpdate);
				}
			}
			return remoteLoadRequired;
		}
	},
	
	AssetConditionRemoteDataProvider: function(){		
		var selfACRDP = this;
		var resourceId = localStorage.getObject('resource').resourceId;
		//1 as this actually can be anything rest does not care always
		//returns full list of conditions
		var url = localStorage.ctx+"/rest/assetmgmt/assetConditions/1";
		var assetConditionDao = new $.AssetConditionDao();
		var DAY =  86400000;
		var WEEK = 7 * DAY;
		var ASSET_MANUFACTURER_REFRESH_INTERVAL = WEEK;
		
		/**
		 * timeout - connection timeout
		 * asynch - should run in async mode?
		 */
		this.downloadData = function(async, timeout){
			if(!timeout){
				timeout = 10000;
			}
			var resource = localStorage.getObject('resource');
			

			consoleLog("AssetConditionRemoteDataProvider: sendRequest:" + url);
			$.ajax({
				url: escape(url),
				timeout: timeout,
				type: 'GET',
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				dataType: 'json',
				async: async,
				contentType: "application/json",
				success: function(resp, status, req){
					var conditions = $.parseJSON(resp.assetConditions);
					assetConditionDao.removeAll();
					assetConditionDao.addAll(conditions);
					selfACRDP.dataLoaded();
				},
				// Error handler
				error: function(req, status, err){
					processGetRequestError(req, status, err);
					selfACRDP.onError(req, status, err);
				}
			});
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.onError = function(response, status, err){
			
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.dataLoaded = function(){
			
		}
		
		this.requiresUpdate = function(){
			var lastUpdate = assetConditionDao.getLastUpdateTS();
			var remoteLoadRequired = true;
			if(lastUpdate != null){
				var milisecondsFromLastUpdate = new Date().getTime() - lastUpdate;
				
				if(milisecondsFromLastUpdate < ASSET_MANUFACTURER_REFRESH_INTERVAL){					
					remoteLoadRequired = false;					
				}else{
					consoleLog('data refresh required:' + milisecondsFromLastUpdate);
				}
			}
			return remoteLoadRequired;
		}
	},
	
	StorePartRemoteDataProvider: function(){		
		var selfSPRDP = this;
		var resourceId = localStorage.getObject('resource').resourceId;
		var url = localStorage.ctx+"/rest/stockMgmt/getStoreParts/" + resourceId;
		var storePartDao = new $.StorePartDao();
		var DAY =  86400000;
		var WEEK = 7 * DAY;
		var STORE_PART_REFRESH_INTERVAL = WEEK;
		
		/**
		 * timeout - connection timeout
		 * asynch - should run in async mode?
		 */
		this.downloadData = function(async, timeout){
			if(!timeout){
				timeout = 10000;
			}
			var resource = localStorage.getObject('resource');			
			consoleLog("StorePartRemoteDataProvider: sendRequest:" + url);
			$.ajax({
				url: escape(url),
				timeout: timeout,
				type: 'GET',
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				dataType: 'json',
				async: async,
				contentType: "application/json",
				success: function(resp, status, req){
					var storeParts = resp.storeParts;
					storePartDao.removeAll();
					if(storeParts && storeParts.length > 0)
					{
						storePartDao.addAll(storeParts);
					}
					selfSPRDP.dataLoaded();
				},
				// Error handler
				error: function(req, status, err){
					processGetRequestError(req, status, err);
					selfSPRDP.onError(req, status, err);
				}
			});
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.onError = function(response, status, err){
			
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.dataLoaded = function(){
			
		}
		
		this.requiresUpdate = function(){
			var lastUpdate = storePartDao.getLastUpdateTS();
			var remoteLoadRequired = true;
			if(lastUpdate != null){
				var milisecondsFromLastUpdate = new Date().getTime() - lastUpdate;
				
				if(milisecondsFromLastUpdate < STORE_PART_REFRESH_INTERVAL){					
					remoteLoadRequired = false;					
				}else{
					consoleLog('data refresh required:' + milisecondsFromLastUpdate);
				}
			}
			return remoteLoadRequired;
		}
	},
	
	PartCategoryRemoteDataProvider: function(){		
		var selfPCRDP = this;
		var resourceId = localStorage.getObject('resource').resourceId;
		//important space at the and so we get all part categories
		var url = localStorage.ctx+"/rest/stockMgmt/getPartCategories/ ";
		var partCategoryDao = new $.PartCategoryDao();
		var DAY =  86400000;
		var WEEK = 7 * DAY;
		var PART_CATEGORY_REFRESH_INTERVAL = WEEK;
		
		/**
		 * timeout - connection timeout
		 * asynch - should run in async mode?
		 */
		this.downloadData = function(async, timeout){
			if(!timeout){
				timeout = 10000;
			}
			var resource = localStorage.getObject('resource');			
			consoleLog("PartCategoryRemoteDataProvider: sendRequest:" + url);
			$.ajax({
				url: escape(url),
				timeout: timeout,
				type: 'GET',
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				dataType: 'json',
				async: async,
				contentType: "application/json",
				success: function(resp, status, req){
					var partCategories = resp.partCategories;
					partCategoryDao.removeAll();
					if(partCategories && partCategories.length > 0)
					{
						partCategoryDao.addAll(partCategories);
					}
					selfPCRDP.dataLoaded();
				},
				// Error handler
				error: function(req, status, err){
					processGetRequestError(req, status, err);
					selfPCRDP.onError(req, status, err);
				}
			});
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.onError = function(response, status, err){
			
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.dataLoaded = function(){
			
		}
		
		this.requiresUpdate = function(){
			var lastUpdate = partCategoryDao.getLastUpdateTS();
			var remoteLoadRequired = true;
			if(lastUpdate != null){
				var milisecondsFromLastUpdate = new Date().getTime() - lastUpdate;
				
				if(milisecondsFromLastUpdate < PART_CATEGORY_REFRESH_INTERVAL){					
					remoteLoadRequired = false;					
				}else{
					consoleLog('data refresh required:' + milisecondsFromLastUpdate);
				}
			}
			return remoteLoadRequired;
		}
	},
	
	WorkTimeTypeRemoteDataProvider: function(){		
		var selfWTTRDP = this;
		var resourceId = localStorage.getObject('resource').resourceId;
		//important space at the and so we get all part categories
		var url = localStorage.ctx+"/rest/rs/workTimeTypes";
		var workTimeTypeDao = new $.WorkTimeTypeDao();
		var DAY =  86400000;
		var WEEK = 7 * DAY;
		var WORK_TIME_TYPE_REFRESH_INTERVAL = WEEK;
		
		/**
		 * timeout - connection timeout
		 * asynch - should run in async mode?
		 */
		this.downloadData = function(async, timeout){
			if(!timeout){
				timeout = 10000;
			}
			var resource = localStorage.getObject('resource');			
			consoleLog("PartCategoryRemoteDataProvider: sendRequest:" + url);
			$.ajax({
				url: escape(url),
				timeout: timeout,
				type: 'GET',
				headers: getHeaders(resource.user, resource.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
				dataType: 'json',
				async: async,
				contentType: "application/json",
				success: function(resp, status, req){
					var workTimeTypes = resp.workTimeTypes;
					workTimeTypeDao.removeAll();
					if(workTimeTypes && workTimeTypes.length > 0)
					{
						workTimeTypeDao.addAll(workTimeTypes);
					}
					selfWTTRDP.dataLoaded();
				},
				// Error handler
				error: function(req, status, err){
					processGetRequestError(req, status, err);
					selfWTTRDP.onError(req, status, err);
				}
			});
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.onError = function(response, status, err){
			
		}
		
		/**
		 * Callback function after successful data download
		 */
		this.dataLoaded = function(){
			
		}
		
		this.requiresUpdate = function(){
			var lastUpdate = workTimeTypeDao.getLastUpdateTS();
			var remoteLoadRequired = true;
			if(lastUpdate != null){
				var milisecondsFromLastUpdate = new Date().getTime() - lastUpdate;
				
				if(milisecondsFromLastUpdate < WORK_TIME_TYPE_REFRESH_INTERVAL){					
					remoteLoadRequired = false;					
				}else{
					consoleLog('data refresh required:' + milisecondsFromLastUpdate);
				}
			}
			return remoteLoadRequired;
		}
	},
});