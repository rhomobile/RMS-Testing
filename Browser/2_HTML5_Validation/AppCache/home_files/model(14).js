jQuery.extend({	

	NewAssetLocationPageModel: function(){
		var siteLocationUrl = escape(localStorage.ctx+"/rest/assetmgmt/addSiteLocation/");
		var self = this;
		var listeners = new Array();
		var surveyDetailsDao = new $.SurveyDetailsDao();
		
		this.addLocation = function(locationName) {
			var newAsset = sessionStorage.getObject('newAsset');
			
			var sequenceDao = new $.SequenceDao();
			var mobileId = sequenceDao.getNextId();
			var autocode = sequenceDao.getAutocode(mobileId);

			addLocalLocation(mobileId, locationName, newAsset.siteSurveyID);
			
			addRemoteLocation(autocode, locationName, newAsset.siteSurveyID);
			
			self.notifyLocationAdded();
		}
		
		function getAppointment(){
			return AppointmentController.getAppointment();
		}
		
		function addRemoteLocation(autocode, locationName, siteSurveyId){
			
			var siteSurvey = surveyDetailsDao.findById(siteSurveyId);
			var addSiteLocationUrl = siteLocationUrl + siteSurvey.siteId;
			//Rest request
			var requestDetails = new $.RequestDetails(	addSiteLocationUrl, 
														'POST', 
														{
														 name: locationName,
														 autocode: autocode
														});
			var remoteUpdater = new $.RemoteUpdater();
			remoteUpdater.update(requestDetails);
		}
		
		
		function addLocalLocation(mobileId, locationName, siteSurveyId){
			surveyDetailsDao.addLocation(mobileId, locationName, siteSurveyId);
			var newAsset = sessionStorage.getObject('newAsset');
			newAsset.location = mobileId;
			sessionStorage.setObject('newAsset', newAsset);
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLocationAdded = function(){
			$.each(listeners, function(i){
				listeners[i].locationAdded();
			});
		}		
	},
	NewAssetLocationPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			locationAdded    : function() { }
		}, list);
	}
});
