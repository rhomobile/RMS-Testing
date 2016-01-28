//
// Common functions for Survey handling
//
var dataType = new Array("char","int","decimal","money","date","time","datetime","boolean");
var ASSET_DELETED = 3;
var updateSurveyUrl = escape(localStorage.ctx+"/rest/assetmgmt/survey/updateSurvey/");
var completeSurveyUrl = escape(localStorage.ctx+"/rest/assetmgmt/survey/completeSurvey/");
var SURVEY_PENDING = 1;
var SURVEY_IN_PROGRESS = 2;
var SURVEY_COMPLETE = 3;
var SURVEY_APPROVED = 4;
var SURVEY_REJECTED = 5;

// DISPLAY
/** sets up the selector values for the templates */
function setDataType(data, attr) {			
			
		// localised?
		var booleanVal1 = new Array("TRUE","ON","YES","1","OPEN");
		var booleanVal2 = new Array("FALSE","OFF","NO","0","CLOSED");
		
		var val = data.value;

		// set template type
		if (attr.dataType == 0) data.char = true;
		else if (attr.dataType == 1) data.int = true;	
		else if (attr.dataType == 2) data.decimal = true;
		else if (attr.dataType == 3) data.money = true;
		// date handling
		else if (attr.dataType == 4)
		{
			data.date = true;
			// we can't render a null date
			if(data.value == 'null/null/null')
			{
				data.value = null;
			}
			var dt = toDate(data.value);
			// we can't render a null date
			consoleLog("Date: "+dt);
			this.getDateArrays(data, dt);				
		}
		// time handling
		else if (attr.dataType == 5)
		{
			data.time = true;
			var dt = toTime(data.value);
			// we can't render a null date
			if (dt == null)
			{
				//dt = new Date();
			}
			consoleLog("Time: "+dt);
			this.getTimeArrays(data, dt);				
		}
		// datetime handling
		else if (attr.dataType == 6) 
		{
			data.datetime = true;				
			var dt = toDateTime(data.value);
			// we can't render a null date
			if (dt == null)
			{
				//dt = new Date();
			}
			consoleLog("Date/time: "+dt);
			this.getDateArrays(data, dt);	
			this.getTimeArrays(data, dt);
		}
		// boolean radio handling
		// if we have no values set then it defaults to true/false
		// otherwise find the matching value for the one we have
		else if (attr.dataType == 7) 
		{
			data.boolean = true;
			var radio = new Array();
			if (val == undefined || val === "")
			{
				// default to true/false
				radio.push({'id':'0','value':'TRUE','checked':'checked'});
				radio.push({'id':'1','value':'FALSE','checked':''});
			}
			else
			{
				for (var x=0; x<booleanVal1.length;x++)
				{
					console.log("val="+booleanVal1[x])
					if (val.toUpperCase() == booleanVal1[x])
					{
						radio.push({'id':'0', 'value':booleanVal1[x],'checked':'checked'});
						radio.push({'id':'1','value':booleanVal2[x],'checked':''});
						break;
					}
					if (val.toUpperCase() == booleanVal2[x])
					{
						radio.push({'id':'0', 'value':booleanVal2[x],'checked':'checked'});
						radio.push({'id':'1','value':booleanVal1[x],'checked':''});
						break;
					}						
				}
			}
			data.radio = radio;
			data.group = new Date().getTime();  // a random radio group to keep each separate
		}

		// set any lookup values
		if (attr.lookupValues != undefined)
		{
			attr.lookupValues.sort(sortLookupValues);
			
			data.useLookup = 'true';
			var lookup = new Array();
			var selected = false;
			for (var x=0;x<attr.lookupValues.length;x++)
			{
				var lookupValue = attr.lookupValues[x];
				var select = 'noselect';
				//consoleLog(val+" <=> "+lookupValue.id);
				if (val == lookupValue.id)
				{
					select = 'selected';
					selected = true;
				}
				lookup.push({'id':lookupValue.id, 'value':lookupValue.value, 'selected':select});
			}
			// if mandatory and none selected we add a "- please select -" option at the top
			consoleLog(selected+","+attr.mandatory);
			if (!selected && attr.mandatory)
			{
				lookup.unshift({'id':-999, 'value':getMessage("survey.please.select","- please select -"), 'selected':'selected'});
				consoleLog("Adding 'please select' option");
			}			
			data.lookup = lookup;
		}
		
	}

function sortLookupValues(att1, att2){
	var x = parseInt(att1.sequence, 10);
	var y = parseInt(att2.sequence, 10);
	var sort = ((x < y) ? -1 : ((x > y) ? 1 : 0));
	return sort; 
}

function getDateArrays(data,dt){
	var days = new Array();
	var month = new Array();
	var years = new Array();
	if(!dt)
	{
		days.push({'id':'null', 'value':'-', 'selected':'selected'});
		month.push({'id':'null', 'value':'-', 'selected':'selected'});
		years.push({'id':'null', 'value':'-', 'selected':'selected'});
	}
	for (var x=1;x<=31;x++)
	{
		var selected = "noselect";
		if (dt && x == dt.getDate()){
			selected = 'selected';
		}
		days.push({'id':x, 'value':x, 'selected':selected});
	}
	data.days = days;
	//consoleLog("DAYS: "+JSON.stringify(data.days));
	
	for (var x=1;x<=12;x++)
	{
		var selected = 'noselect';
		if (dt && x == (dt.getMonth()+1))
		{
			selected = 'selected';
		}
		var zid = (x<10) ? "0"+x : ""+x;
		month.push({'id':zid, 'value':months[x-1], 'selected':selected});
	}
	data.months = month; 
	
	// plus/minus five years from current date
	var now = new Date();
	for (var x=now.getFullYear()-4;x<=now.getFullYear()+5;x++)
	{
		var selected = 'noselect';
		if (dt && x == dt.getFullYear())
		{
			selected = 'selected';
		}
		years.push({'id':x, 'value':x, 'selected':selected});
	}
	data.years = years;			
}

function getTimeArrays(data,dt){
	var hours = new Array();
	for (var x=0;x<=23;x++)
	{
		var selected = 'noselect';
		if (x == dt.getHours())
			selected = 'selected';
		hours.push({'id':x, 'value':x, 'selected':selected});
	}
	data.hours = hours;
	
	var minutes = new Array();
	for (var x=0;x<=45;x+=15)
	{
		var selected = 'noselect';
		if (x == dt.getMinutes())
			selected = 'selected';
		minutes.push({'id':x, 'value':x, 'selected':selected});
	}
	data.minutes = minutes;			
}


// VALIDATION
/** validation entry point */
function validate(attributeId, prefix) {
	console.log("Validating attribute: "+attributeId);

	var id = attributeId;
	var ind = attributeId.indexOf("attribute"); // parse out any prefix for dates/times
	if (ind != -1)
		id = attributeId.substring(10+ind);
	ind = attributeId.indexOf("radio"); // parse out any prefix for radio buttons
	if (ind != -1)
		id = attributeId.substring(6+ind);
	
	//console.log("Id: "+id);
	//var entry = validMap[x];
	var val = $('#'+attributeId).val();
	//consoleLog("New value: "+val);
	var validate = "";
	var minValue = "";
	var maxValue = "";
	var surveyValid = true;
	
	// if not defined on the immediate select/input tag then
	// try the parent fieldset eg. dates
	var dataType = $('#'+attributeId).attr("data-datatype");
	var mandatory = $('#'+attributeId).attr("data-mandatory");			
	//console.log("dataType="+dataType);
	if (dataType == undefined)
	{
		dataType = $('#'+attributeId).parents("fieldset").attr("data-datatype");
		mandatory = $('#'+attributeId).parents("fieldset").attr("data-mandatory");
	}
	//console.log("dataType="+dataType+", mandatory="+mandatory);
	if (dataType == undefined) // extra check back for radio buttons
	{
		dataType = $('#'+attributeId).parents("div").parents("fieldset").attr("data-datatype");
		mandatory = $('#'+attributeId).parents("div").parents("fieldset").attr("data-mandatory");
	}	
	//console.log("dataType="+dataType+", mandatory="+mandatory);
	
	// check dataType for dates/times
	var dateTime = false;
	if (dataType == 4 || dataType == 5 || dataType == 6) dateTime = true;
	
	if (dateTime)
	{
		minValue = $('#'+attributeId).parents("fieldset").attr("data-minvalue");
		maxValue = $('#'+attributeId).parents("fieldset").attr("data-maxvalue");
		validate = $('#'+attributeId).parents("fieldset").attr("data-validate");
		// if undefined then we are using a lookup selection
		if (validate != undefined)
		{
			// get the other fields that make up the date or time
			if (dataType == 4)
			{
				val = $('#day_attribute_'+id).val() + "/" + $('#month_attribute_'+id).val() + "/" + $('#year_attribute_'+id).val();
			}
			else if (dataType == 5)
			{
				val = $('#hour_attribute_'+id).val() + ":" + $('#minute_attribute_'+id).val();
			}
			else if (dataType == 6)
			{
				val = $('#day_attribute_'+id).val() + "/" + $('#month_attribute_'+id).val() + "/" + $('#year_attribute_'+id).val()
				+ " " + $('#hour_attribute_'+id).val() + ":" + $('#minute_attribute_'+id).val();
			}
		}
		else
		{
			validate = $('#'+attributeId).attr("data-validate");
		}
		//consoleLog("Value: "+val);
	}
	else
	{
		minValue = $('#'+attributeId).attr("data-minvalue");
		maxValue = $('#'+attributeId).attr("data-maxvalue");
		validate = $('#'+attributeId).attr("data-validate");
	}
	
	//consoleLog("Validate = "+validate);
	// see if we actually need to validate (ie. radio or simple lookup list)
	if (validate == 'false')
	{
		consoleLog("This type of attribute doesn't require validation");
		var validFlag = true;
		if (val == -999)
		{
			validFlag = false;
			consoleLog("Attempt to return to 'please select' option");
			$('#'+attributeId).parents('li').removeClass('complete');
			if (mandatory == 'true') // it should only be on mandatory elements we get this -999 value anyway
			{
				$('#'+attributeId).parents('li').addClass('pending');
			}
			else
			{
				$('#'+attributeId).parents('li').addClass('pendingNotRequired');
			}
			return;
		}
		else
		{			
			$('#'+attributeId).parents('li').removeClass('pending pendingNotRequired');
			$('#'+attributeId).parents('li').addClass('complete');
		}
		// update stored value 
		updateStoredValue(id,val,prefix,validFlag);
		return;
	}								
	consoleLog("Found attribute and checking min/max values: "+minValue+","+maxValue);					

	if (dataType == 0 && this.isValid(val,minValue,maxValue,dataType))						
	{
		$('#'+attributeId).parents('li').removeClass('pending pendingNotRequired surveyInvalid');
		$('#'+attributeId).parents('li').addClass('complete');
		//consoleLog("Char and valid");
	}
	else if (dataType == 0 && !this.isValid(val,minValue,maxValue,dataType))						
	{
		$('#'+attributeId).parents('li').removeClass('pending pendingNotRequired surveyInvalid');
		$('#'+attributeId).parents('li').addClass('complete');
		$('#'+attributeId).parents('li').addClass('surveyInvalid');		
		surveyValid = false;
		//consoleLog("Char and invalid");
	}			
	else if (!dateTime && this.isValid(val*1,minValue*1,maxValue*1,dataType))						
	{
		$('#'+attributeId).parents('li').removeClass('pending pendingNotRequired surveyInvalid');
		$('#'+attributeId).parents('li').addClass('complete');
		//consoleLog("Numeric and valid");
	}
	else if (!dateTime && !this.isValid(val*1,minValue*1,maxValue*1,dataType))						
	{
		$('#'+attributeId).parents('li').removeClass('pending pendingNotRequired surveyInvalid');
		$('#'+attributeId).parents('li').addClass('complete');
		$('#'+attributeId).parents('li').addClass('surveyInvalid');	
		surveyValid = false;
		//consoleLog("Numeric and invalid");
	}			
	else if (dateTime && this.isValidDate(val,minValue,maxValue,dataType))
	{
		$('#'+attributeId).parents('li').removeClass('pending pendingNotRequired surveyInvalid');
		$('#'+attributeId).parents('li').addClass('complete');
		//consoleLog("Date and valid");
	}
	else if (dateTime && !this.isValidDate(val,minValue,maxValue,dataType))
	{
		console.log(val);
		$('#'+attributeId).parents('li').removeClass('pending pendingNotRequired surveyInvalid');
		$('#'+attributeId).parents('li').addClass('complete');
		if(val == 'null/null/null')
		{
			if(mandatory == 'true')
			{
				surveyValid = false;
				$('#'+attributeId).parents('li').addClass('pending');
				$('#'+attributeId).parents('li').removeClass('complete');
			}else{
				$('#'+attributeId).parents('li').addClass('pendingNotRequired');
			}
			val = "";
		}else{
			$('#'+attributeId).parents('li').addClass('surveyInvalid');
			surveyValid = false;
		}
		
	}			
	else
	{
		consoleLog("Invalid");
	}
	
	if (!surveyValid)
	{
		$('#acceptSurvey,#surveyAssetAccept,#acceptAssetSurvey').addClass('ui-disabled');
	}
	else
	{
		$('#acceptSurvey,#surveyAssetAccept,#acceptAssetSurvey').removeClass('ui-disabled');
		// update the stored value
		updateStoredValue(id,val,prefix);
	}

}

// save changes locally 
function updateStoredValue(id,val,prefix,flag){
	if (flag == null)
		flag = true;
	var currData = "";
	var storageId = null;
	var siteSurveyId = sessionStorage.getItem('siteSurveyId');
	var siteSurveyStatus = new $.SiteSurveyStatus(getCurrentSurvey());
	
	if (prefix == undefined)
	{
		currData = siteSurveyStatus.getAttribute(id);
		consoleLog("Current value: "+JSON.stringify(currData));
		var tmp = {"id":id,"value":val,"mandatory":currData.mandatory,"valid":flag};
		siteSurveyStatus.saveAttribute(tmp);
	}
	else
	{
		currData = siteSurveyStatus.getAssetAttribute(id);
		consoleLog("Current value: "+JSON.stringify(currData));			
		var tmp = {"id":id,"value":val,"mandatory":currData.mandatory,"valid":flag};
		if (id < 0)
		{
			var sequenceDao = new $.SequenceDao();
			tmp.autocode = sequenceDao.getAutocode(id);
		}
		siteSurveyStatus.saveAssetAttribute(tmp);
	}
}

// validate non-date values
function isValid(val, minValue, maxValue,dataType) {
	//consoleLog(val+","+minValue+","+maxValue);
	var valid = true;
	if (dataType == 0 && val == "")
	{
		//consoleLog("No value");
		valid = false;
	}
	else 
	{				
		if (dataType != 0 && isNaN(val))
		{
			//consoleLog("value: '" + val + "' is not a number");
			valid = false;
		}
		else
		{
			if (minValue != undefined && minValue != "" && val < minValue)
			{
				//consoleLog("Min ["+minValue+"]");
				valid = false;
			}
			if (maxValue != undefined && maxValue != "" && val > maxValue)
			{
				//consoleLog("Max ["+maxValue+"]");
				valid = false;
			}
			// check decimal places on decimal/money fields
			if (valid && (dataType == 2 || dataType == 3))
			{
				if (dataType == 2)
				{
					//consoleLog("Validating decimal for max 6 decimal places");
					valid = /^[-+]?\d+(\.\d{1,6})?$/.test(val);
				}
				if (dataType == 3)
				{
					//consoleLog("Validating money for max 2 decimal places");
					valid = /^[-+]?\d+(\.\d{1,2})?$/.test(val);
				}						
			}
		}
	}
	return valid;
}

// validate date/time ranges
function isValidDate(val, minValue, maxValue, dataType) {
	var valid = true;
	var valDate = "";
	var valMinDate = "";
	var valMaxDate = "";
	if (val == "" || val.indexOf("null") > -1)
	{
		valid = false;
	}
	else
	{
		if (dataType == 4)
		{
			valDate = toDate(val);
			valMinDate = toDate(minValue);
			valMaxDate = toDate(maxValue);
		}
		else if (dataType == 5)
		{
			valDate = toTime(val);
			valMinDate = toTime(minValue);
			valMaxDate = toTime(maxValue);				
		}
		else
		{
			valDate = toDateTime(val);
			valMinDate = toDateTime(minValue);
			valMaxDate = toDateTime(maxValue);				
		}
		
		// date will be null if day is out of range for the month
		if (valDate == null) // || valMinDate == null || valMaxDate == null)
		{
			valid = false;
		}
		else
		{
			if (minValue != undefined && minValue != "" && valMinDate != null && valDate.getTime() < valMinDate.getTime())
			{
				//consoleLog("Min ["+minValue+"]");
				valid = false;
			}
			if (maxValue != undefined && maxValue != "" && valMaxDate != null && valDate.getTime() > valMaxDate.getTime())
			{
				//consoleLog("Max ["+maxValue+"]");
				valid = false;
			}
		}
	}
	return valid;
}

/** Gets the current siteSurvey from the full survey details */
function getCurrentSurvey(){
	var siteSurveyId = sessionStorage.siteSurveyId;
	return getSurvey(siteSurveyId);
}

/** Gets a particular siteSurvey from the full survey details */
function getSurvey(siteSurveyId){
	consoleLog("Looking for siteSurvey: "+siteSurveyId);
	var siteSurveys = localStorage.getObjectDecompress('surveyDetails');
	var siteSurvey = null;
	for (var x=0;x<siteSurveys.length;x++)
	{		
		if (siteSurveys[x].id == siteSurveyId)
		{
			siteSurvey = siteSurveys[x];
			break;
		}
	}
	return siteSurvey;
}

/** updates the survey to complete at the server */
function completeSurveyRemote(siteSurveyId) {	
	//Rest request
	consoleLog('completeSurveyRemote');
	var url = escape(completeSurveyUrl+siteSurveyId);
	var requestDetails = new $.RequestDetails(url, 'POST', '','','');
	var remoteUpdater = new $.RemoteUpdater();
	remoteUpdater.update(requestDetails);
}

/** updates the local survey status to complete */
function completeSurveyLocal(siteSurveyId) {	
	
	//update local storage
	consoleLog('completeSurveyLocal');
	var surveyDetailsDao = new $.SurveyDetailsDao();
	var siteSurvey = surveyDetailsDao.findById(siteSurveyId);
	siteSurvey.status = SURVEY_COMPLETE;
	surveyDetailsDao.updateSiteSurvey(siteSurvey);
	
	// update status
	var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
	siteSurveyStatus.setReadonly(true);
}

/** updates the local survey status to complete */
function setSurveyInProgress(siteSurveyId) { 
	//update local storage
	consoleLog('setSurveyInProgress');
	var surveyDetailsDao = new $.SurveyDetailsDao();
	var siteSurvey = surveyDetailsDao.findById(siteSurveyId);
	console.log("Current status: "+siteSurvey.status);
	if (siteSurvey.status < SURVEY_IN_PROGRESS)
	{
		siteSurvey.status = SURVEY_IN_PROGRESS;
		surveyDetailsDao.updateSiteSurvey(siteSurvey);
		console.log("Status now In Progress");
	}
}

/** Removes an asset to either Stock or out of survey */
function removeAsset(toStock){
	var siteSurveyId = sessionStorage.siteSurveyId;
	var assetId = sessionStorage.siteSurveyAssetId;
	consoleLog("Removing asset: "+assetId);
	var surveyDetailsDao = new $.SurveyDetailsDao();
	var siteSurvey = surveyDetailsDao.findById(siteSurveyId);
	var siteSurveyAssets = siteSurvey.siteSurveyAssets;
	for(var i = 0; i < siteSurveyAssets.length; i++)
	{
		var asset = siteSurveyAssets[i];
		if (asset.id == assetId || (asset.localId && asset.localId == assetId))
		{
			//consoleLog("Saving asset: "+JSON.stringify(asset));
			// save entry for any later restore
			var delAsset = {"siteSurveyId":siteSurveyId, 
							"assetId":asset.id,
							"assetAutocode":asset.autocode,
							"assetLocalId": asset.localId, //pass local id in case we have one for the lookup of newly created assets
							"ref":asset.ref,
							"status":asset.status, 
							"siteLocationID":asset.siteLocationID,
							"siteLocationAutocode":asset.siteLocationAutocode,
							"conditionID":asset.conditionID};
			var deleted = localStorage.getObject('siteSurveyAssetDeletions');
			if (deleted == undefined)
			{
				deleted = new Array();
			}
			var added = false;
			for (var x=0;x<deleted.length;x++)
			{
				if (deleted[x].siteSurveyId == siteSurveyId && deleted[x].assetId == assetId)
				{
					deleted[x] = delAsset;
					added = true;
					break;
				}			
			}
			if (!added)
				deleted.push(delAsset);
			localStorage.setObject('siteSurveyAssetDeletions',deleted);
			
			// RETURN TO STOCK
			if (toStock)
			{		
				asset.siteLocationID = "";
				asset.siteLocationAutocode = "";
			}	
			// REMOVE COMPLETELY
			else
			{				
				// set status to deleted and call updateSurvey
				asset.status = ASSET_DELETED;
			}			
			break;
		}
	}
	// save changes
	surveyDetailsDao.updateSiteSurvey(siteSurvey);
}

/** Removes an asset to either Stock or out of survey */
function removeAssetRemote(toStock){
	consoleLog('removeAssetRemote');
	var siteSurveyId = sessionStorage.siteSurveyId;
	var assetId = sessionStorage.siteSurveyAssetId;
	var delAsset = getAssetRestoreDetails(siteSurveyId, assetId);
	var url = escape(updateSurveyUrl+siteSurveyId);
	var res = localStorage.getObject('resource');
	var data = {"performedOn":getFormattedDate(new Date()), "performedBy":res.id, "status":"2"};
	var sequenceDao = new $.SequenceDao();
	data.attributes = new Array();
	data.assets = new Array();

	  var newAsset = {	"ref":delAsset.ref,
						"conditionID":delAsset.conditionID,
						"status":delAsset.status};	
	  
	  if (assetId < 0)
	  {
		  newAsset.autocode = sequenceDao.getAutocode(assetId);
	  }
	  else
	  {
		  newAsset.id = assetId;
	  }
	  
	  if (delAsset.siteLocationID < 0)
	  {
		  newAsset.siteLocationAutocode = sequenceDao.getAutocode(delAsset.siteLocationID);
	  }
	  else
	  {
		  newAsset.siteLocationID = delAsset.siteLocationID;
	  }
	  
	if (toStock)
	{
		newAsset.siteLocationID = "";
		newAsset.siteLocationAutocode = "";
		data.assets.push(newAsset);
	}
	else
	{
		newAsset.status = ASSET_DELETED;
		data.assets.push(newAsset);
	}
	consoleLog(JSON.stringify(data));
	var requestDetails = new $.RequestDetails(url, 'POST', data);
	var remoteUpdater = new $.RemoteUpdater();
	remoteUpdater.update(requestDetails);
}

/** restores a session deleted asset */
function restoreAsset(siteSurveyId,assetId,locationId){
	//var siteSurveyId = sessionStorage.siteSurveyId;
	//var assetId = sessionStorage.siteSurveyAssetId;
	consoleLog("Restoring asset: "+assetId);
	var surveyDetailsDao = new $.SurveyDetailsDao();
	var siteSurvey = surveyDetailsDao.findById(siteSurveyId);
	var siteSurveyAssets = siteSurvey.siteSurveyAssets;
	var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
	
	for(var i = 0; i < siteSurveyAssets.length; i++)
	{
		var asset = siteSurveyAssets[i];
		if (asset.id == assetId)
		{
			// RETURN FROM STOCK
			//consoleLog("Asset: "+JSON.stringify(asset));
			if (asset.siteLocationID == '')
			{		
				asset.siteLocationID = locationId;
			}	
			// RESTORE 
			else
			{
				// get old status 				
				var delAsset = getAssetRestoreDetails(siteSurveyId, assetId);
				if (delAsset != null)
				{
					consoleLog("Previously deleted asset: "+JSON.stringify(delAsset));
					asset.status = delAsset.status;
					consoleLog("Status restored to "+asset.status);
				}
			}
			siteSurveyStatus.updateAssetDeletionList(siteSurveyId, asset.id);
			break;
		}
	}
	// save changes	
	surveyDetailsDao.updateSiteSurvey(siteSurvey);	
	siteSurveyStatus.saveAsset(asset);
}

/** restores a session deleted asset */
function restoreAssetRemote(siteSurveyId,assetId,locationId){
	var url = escape(updateSurveyUrl+siteSurveyId);
	var res = localStorage.getObject('resource');
	var data = {"performedOn":getFormattedDate(new Date()), "performedBy":res.id, "status":"2"};
	data.attributes = new Array();
	data.assets = new Array();

	var surveyDetailsDao = new $.SurveyDetailsDao();
	var sequenceDao = new $.SequenceDao();
	
	var siteSurvey = surveyDetailsDao.findById(siteSurveyId);
	var siteSurveyAssets = siteSurvey.siteSurveyAssets;
	for(var i = 0; i < siteSurveyAssets.length; i++)
	{
		var asset = siteSurveyAssets[i];
		if (asset.id == assetId)
		{			
			  var newAsset = {	"ref":asset.ref,
								"conditionID":asset.conditionID,
								"status":asset.status};	
	  
			  // add ids or autocodes
			  if (assetId < 0)
			  {
				  newAsset.autocode = sequenceDao.getAutocode(assetId);
			  }
			  else
			  {
				  newAsset.id = assetId;
			  }
			  
			  if (asset.siteLocationID < 0)
			  {
				  newAsset.siteLocationAutocode = sequenceDao.getAutocode(asset.siteLocationID);
				  newAsset.siteLocationID = "";
			  }
			  else
			  {
				  newAsset.siteLocationID = asset.siteLocationID;
			  }			
			
			// RETURN FROM STOCK
			if (asset.siteLocationID == "")
			{		
				newAsset.siteLocationID = locationId;
				newAsset.siteLocationAutocode = asset.locationAutocode;
			}
			else
			{
				newAsset.status = 2;  // ?
			}
			break;
		}
	}
	
	data.assets.push(newAsset);
	consoleLog(JSON.stringify(data));
	var requestDetails = new $.RequestDetails(url, 'POST', data);
	var remoteUpdater = new $.RemoteUpdater();
	remoteUpdater.update(requestDetails);
}

/** gets the details for a previously deleted asset */
function getAssetRestoreDetails(siteSurveyId, assetId){
	var asset = null;
	var deleted = localStorage.getObject('siteSurveyAssetDeletions');
	if (deleted != undefined)
	{
		for (var x=0;x<deleted.length;x++)
		{
			var delAsset = deleted[x];
			if (delAsset.siteSurveyId == siteSurveyId && (delAsset.assetId == assetId || (delAsset.assetLocalId && assetId)))
			{
				asset = delAsset;
				break;
			}
		}
	}
	return asset;
}

function getAsset(siteSurveyId, assetId){
	var surveyDetailsDao = new $.SurveyDetailsDao();
	var siteSurvey = surveyDetailsDao.findById(siteSurveyId);
	var siteSurveyAssets = siteSurvey.siteSurveyAssets;
	var asset = null;
	for(var i = 0; i < siteSurveyAssets.length; i++)
	{
		if (siteSurveyAssets[i].id == assetId)
		{
			asset = siteSurveyAssets[i];
			break;
		}
	}
	return asset;
}
function toTodayDay(dayId, monthId, yearId){
	var date = new Date();
	$('#'+dayId).val(date.getDate()).selectmenu("refresh",true);
	var month = date.getMonth() + 1;
	if(month < 10)
	{
		month = "0" + month;
	}
	$('#'+monthId).val(month).selectmenu("refresh",true);
	$('#'+yearId).val(date.getFullYear()).selectmenu("refresh",true);
	$('#'+yearId).change();
}

function updateLocalSurveyStatus(){
	console.log("updateLocalSurveyStatus");

	// loop through surveys getting all autocode values into array
	var codeMap = new Object();
	var surveyDetails = localStorage.getObjectDecompress('surveyDetails');
	if (surveyDetails != undefined)
	{		
		traverseSurveys(surveyDetails,codeMap);
		//console.log("CodeMap: "+JSON.stringify(codeMap));
		
		// loop through all survey status records
		var surveyIds = new Array();
		for (var x=0;x<surveyDetails.length;x++)
		{
			var siteSurvey = surveyDetails[x];
			var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
			var siteSurveyStatusData = siteSurveyStatus.siteSurveyStatusData;
			
			//console.log("Site survey status: "+JSON.stringify(siteSurveyStatus));
			var assetIdMap = new Object();
			// do assets in a first pass as we may have to store those changes 
			// for the second pass	
			for (var ky in siteSurveyStatusData)
			{			
				if (ky.substring(0,3) == 'AS_')
				{
					var val = siteSurveyStatusData[ky];
					//console.log(ky+' = '+JSON.stringify(val));
					if (val.autocode != undefined && val.id < 0)
					{
						//console.log(val.autocode+","+codeMap[val.autocode]);
						if (codeMap[val.autocode] != undefined)
						{
							var currAssetId = ky.substring(3);
							assetIdMap[currAssetId] = codeMap[val.autocode];
							// set real id
							val.id = codeMap[val.autocode];
							siteSurveyStatus.saveAsset(val, val.id);
							//console.log("updated: "+JSON.stringify(val));
							// delete old key
							//delete siteSurveyStatusData[ky];
						}
					}
				}
			}
			// assetAttribute pass
			for (var ky in siteSurveyStatusData)
			{
				//console.log("Asset ids: "+JSON.stringify(assetIdMap));
				
				if (ky.substring(0,5) == 'ASAG_')
				{
					var val = siteSurveyStatusData[ky];
					//console.log(ky+' = '+JSON.stringify(val));
					if (val.autocode != undefined)
					{
						//console.log(val.autocode+","+codeMap[val.autocode]);
						if (codeMap[val.autocode] != undefined)
						{
							var ids = ky.split('_');
							var currAssetId = ids[1];
							// add any replacement asset id too
							if (assetIdMap[currAssetId] != undefined)
								currAssetId = assetIdMap[currAssetId]
							var currAssetAttributeGroup = ids[2];
							// set real id
							val.id = codeMap[val.autocode];
							siteSurveyStatus.saveAssetAttribute(val, val.id, currAssetId, currAssetAttributeGroup);
							//console.log("updated: "+JSON.stringify(val));
							// delete old key
							//delete siteSurveyStatusData[ky];
						}
					}
				}
			}
			// assetsStatus and assetAttributeGroupsStatus pass
			for (var ky in siteSurveyStatusData)
			{
				//console.log("Asset ids: "+JSON.stringify(assetIdMap));

				if (ky == 'assetsStatus' || ky == 'assetAttributeGroupsStatus')
				{
					var arr = siteSurveyStatusData[ky];
					for (var y=0;y<arr.length;y++)
					{
						var val = arr[y];
						if (val.autocode != undefined)
						{
							//console.log(val.autocode+","+codeMap[val.autocode]);
							if (codeMap[val.autocode] != undefined && val.assetId < 0)
							{
								var currAssetId = val.assetId;
								// get any replacement asset id
								if (assetIdMap[currAssetId] != undefined)
									currAssetId = assetIdMap[currAssetId]
								// set real id
								val.assetId = codeMap[val.autocode];
								arr[y] = val;
								// delete old key
								//delete siteSurveyStatusData[ky];
							}
						}
						
					}
					siteSurveyStatusData[ky] = arr;
					siteSurveyStatus.saveStatus();
				}				
			}
		}
	}
}

// recursive survey scan
function traverseSurveys(jObject,codeMap) {
    for (i in jObject) {
        if (typeof(jObject[i])=="object") {
            var val = jObject[i];
            if (val.autocode != undefined)
            {
            	codeMap[val.autocode] = val.id;
            }
            traverseSurveys(jObject[i],codeMap);
        }
    }
} 

// =======================  LOCAL STATUS HANDLING =====================================================

// SURVEY STATUS OBJECT DATA
SiteSurveyStatusData = function(siteSurveyId) {
	this.siteSurveyId = siteSurveyId;
	this.readonly = false;
	this.attributeGroupsStatus = new Array();
	this.assetsStatus = new Array();	
	this.assetAttributeGroupsStatus = new Array();	
}

// SURVEY STATUS HANDLER
jQuery.extend({

	SiteSurveyStatus: function(siteSurvey){
		var self = this;
		this.siteSurveyId = siteSurvey.id;		
		
		//this.siteSurveyStatusData = this.getStatus();
		this.siteSurveyStatusData = localStorage.getObject('siteSurveyStatus_'+this.siteSurveyId);
		if (this.siteSurveyStatusData == undefined)
		{
			// when a siteSurvey is first loaded we get here 
			// the data gets populated as the survey gets displayed and updated
			consoleLog("Creating new SiteSurveyStatusData for siteSurvey: "+this.siteSurveyId);
			this.siteSurveyStatusData = new SiteSurveyStatusData(this.siteSurveyId);
			//consoleLog("Survey status in constructor: "+siteSurvey.status);
			if (siteSurvey.status == SURVEY_COMPLETE || siteSurvey.status == SURVEY_APPROVED || siteSurvey.status == SURVEY_REJECTED)
			{
				this.siteSurveyStatusData.readonly = true;
			}
			localStorage.setObject('siteSurveyStatus_'+this.siteSurveyId,this.siteSurveyStatusData);
		}
		
		this.isReadonly = function(){
			return this.siteSurveyStatusData.readonly;
		}
		
		this.setReadonly = function(val){
			this.siteSurveyStatusData.readonly = val;
			// save status changes
			this.saveStatus();
		}
		
		this.isAttributeGroupComplete = function(){
			consoleLog("Is the attribute group complete?");
			// compare list of attribute groups with array of attribute group statuses
		} 
		
		this.isComplete = function(){
			consoleLog("Is the survey complete?");
			// compare list of attribute groups with array of attribute group statuses
		}
		
		// KEY generators  ====================
		this.generateAttributeKey = function(siteSurveyAttributeGroupId, attributeId){
			return "AG_"+siteSurveyAttributeGroupId+"_"+attributeId;
		}
		
		this.generateAssetKey = function(siteSurveyAssetId){
			return "AS_"+siteSurveyAssetId;
		}
		
		this.generateAssetAttributeKey = function(siteSurveyAssetId, siteSurveyAssetAttributeGroupId, attributeId){
			return "ASAG_"+siteSurveyAssetId+"_"+siteSurveyAssetAttributeGroupId+"_"+attributeId;
		}
		// =====================================
		
		/** gets an attribute from a siteSurvey.attributeGroup */
		this.getAttribute = function(attributeId,siteSurveyAttributeGroupId){
			if (siteSurveyAttributeGroupId == undefined)
				siteSurveyAttributeGroupId = sessionStorage.getItem('siteSurveyAttributeGroupId');
			consoleLog("Getting attribute: "+siteSurveyAttributeGroupId+", "+attributeId);			
			var key = this.generateAttributeKey(siteSurveyAttributeGroupId,attributeId);
			//consoleLog("Key: "+key);
			var attribute = this.siteSurveyStatusData[key];
			//consoleLog("getAttribute: "+JSON.stringify(attribute));
			return attribute;
		}
		
		/** gets an asset from a siteSurvey.siteSurveyAsset */
		this.getAsset = function(assetId){
			//var siteSurveyAssetId = sessionStorage.getItem('siteSurveyAssetId');
			consoleLog("Getting asset: "+assetId);			
			var key = this.generateAssetKey(assetId);
			//consoleLog("Key: "+key);
			var asset = this.siteSurveyStatusData[key];
			//consoleLog("getAsset: "+JSON.stringify(asset));
			return asset;
		}

		/** gets an attribute from a siteSurvey.siteSurveyAsset.attributeGroup */
		this.getAssetAttribute = function(attributeId, siteSurveyAssetId, siteSurveyAssetAttributeGroupId){
			if (siteSurveyAssetId == undefined)
				siteSurveyAssetId = sessionStorage.getItem('siteSurveyAssetId');
			if (siteSurveyAssetAttributeGroupId == undefined)
				siteSurveyAssetAttributeGroupId = sessionStorage.getItem('siteSurveyAssetAttributeGroupId');				
			console.log("Getting assetAttribute: "+siteSurveyAssetId+", "+siteSurveyAssetAttributeGroupId+", "+attributeId);			
			var key = this.generateAssetAttributeKey(siteSurveyAssetId, siteSurveyAssetAttributeGroupId ,attributeId);
			var attribute = this.siteSurveyStatusData[key];
			//console.log("getAssetAttribute: "+JSON.stringify(attribute));
			return attribute;
		}	
		
		/** saves an attribute to a siteSurvey.attributeGroup */
		this.saveAttribute = function(attribute){
			var siteSurveyAttributeGroupId = sessionStorage.getItem('siteSurveyAttributeGroupId');
			consoleLog("Saving attribute: "+siteSurveyAttributeGroupId+","+attribute.id+","+attribute.value);
			var key = this.generateAttributeKey(siteSurveyAttributeGroupId,attribute.id);
			//consoleLog("Key: "+key);
			this.siteSurveyStatusData[key] = attribute;
			this.saveStatus();
		}
		
		/** saves an asset to a siteSurvey.siteSurveyAsset */
		this.saveAsset = function(asset, siteSurveyAssetId){
			if (siteSurveyAssetId == undefined)
				siteSurveyAssetId = sessionStorage.getItem('siteSurveyAssetId');
			consoleLog("Saving asset: "+siteSurveyAssetId);
			var key = this.generateAssetKey(siteSurveyAssetId);
			//consoleLog("Key: "+key);
			// we only need to save the asset details not the attributeGroups/attributes here
			var tmpAsset = asset;
			tmpAsset.attributeGroups = new Array();
			this.siteSurveyStatusData[key] = tmpAsset;
			this.saveStatus();
		}
		
		/** saves an attribute to a siteSurvey.siteSurveyAsset.attributeGroup */
		this.saveAssetAttribute = function(attribute, siteSurveyAssetAttributeId, siteSurveyAssetId, siteSurveyAssetAttributeGroupId){
			if (siteSurveyAssetId == undefined)
				siteSurveyAssetId = sessionStorage.getItem('siteSurveyAssetId');
			if (siteSurveyAssetAttributeGroupId == undefined)
				siteSurveyAssetAttributeGroupId = sessionStorage.getItem('siteSurveyAssetAttributeGroupId');			
			consoleLog("Saving assetAttribute: "+siteSurveyAssetId+", "+siteSurveyAssetAttributeGroupId+", "+attribute.id+","+attribute.value);
			var key = this.generateAssetAttributeKey(siteSurveyAssetId, siteSurveyAssetAttributeGroupId ,attribute.id);
			//consoleLog("Key: "+key);
			this.siteSurveyStatusData[key] = attribute;
			this.saveStatus();
		}
		
		/** updates the status of a siteSurvey.attributeGroup for colour display */
		this.updateAttributeGroupStatus = function(attributeGroupId){
			consoleLog("Updating status for attributeGroup: "+attributeGroupId);
			attributeGroups = siteSurvey.attributeGroups;
			for (var x=0;x<attributeGroups.length;x++)
			{
			  if (attributeGroups[x].id == attributeGroupId)
			  {
				  var status = {"attributeGroupId":attributeGroupId, "status":"complete"};
				  this.siteSurveyStatusData.attributeGroupsStatus.push(status);
				  //consoleLog("Status: "+JSON.stringify(this.siteSurveyStatusData.attributeGroupsStatus));
				  break;
			  }
			}	
			// save status changes			
			this.saveStatus();
		}
		
		/** updates the status of a siteSurvey.siteSurveyAsset for colour display */
		this.updateAssetStatus = function(assetId){
			consoleLog("Updating status for asset: "+assetId);
			//var siteSurveyAssetId = sessionStorage.siteSurveyAssetId;
			var asset = this.findSiteSurveyAsset(assetId);
			var status = {"assetId":assetId, "autocode":asset.autocode, "status":"complete"};
			this.siteSurveyStatusData.assetsStatus.push(status);
			// save status changes
			this.saveStatus();
		}
		
		/** updates the status of a siteSurvey.siteSurveyAsset.attributeGroup for colour display */
		this.updateAssetAttributeGroupStatus = function(assetAttributeGroupId){
			consoleLog("Updating status for assetAttributeGroup: "+assetAttributeGroupId);
			var siteSurveyAssetId = sessionStorage.siteSurveyAssetId;
			var asset = this.findSiteSurveyAsset(siteSurveyAssetId);
			var assetAttributeGroups = asset.attributeGroups;
			//consoleLog("SiteSurveyStatus: assetAttributeGroups: "+JSON.stringify(assetAttributeGroups));
			
			for (var x=0;x<assetAttributeGroups.length;x++)
			{
			  if (assetAttributeGroups[x].id == assetAttributeGroupId)
			  {			  
				  var status = {"assetId":siteSurveyAssetId, "autocode":asset.autocode, "assetAttributeGroupId":assetAttributeGroupId, "status":"complete",};
				  this.siteSurveyStatusData.assetAttributeGroupsStatus.push(status);
				  //consoleLog("Status: "+JSON.stringify(this.siteSurveyStatusData.assetAttributeGroupsStatus));
				  break;
			  }
			}				
			// save status changes
			this.saveStatus();
		}

		
		/** gets the siteSurveyAsset by id */
		this.findSiteSurveyAsset = function(siteSurveyAssetId){
			var siteSurveyAssets = siteSurvey.siteSurveyAssets;
			for (var x=0;x<siteSurveyAssets.length;x++)
			{
				if (siteSurveyAssets[x].id == siteSurveyAssetId || (siteSurveyAssets[x].localId && siteSurveyAssetId))
				{
					consoleLog("Found siteSurveyAssets with id: "+siteSurveyAssetId);
					return siteSurveyAssets[x];
				}
			}
		}
		
		/** save the current object */
		this.saveStatus = function(){
			localStorage.setObject('siteSurveyStatus_'+this.siteSurveyId,this.siteSurveyStatusData);
		}
		
		/** get the current object */
		this.getStatus = function(){
			return localStorage.getObject('siteSurveyStatus_'+this.siteSurveyId);
		}
		
		this.isSurveyComplete = function(){
			var siteSurvey = getCurrentSurvey();
			return this.isSurveyComplete(siteSurvey.id);
		}
		
		this.isSurveyCompleteOLD = function(siteSurveyId){
			consoleLog("Check for survey complete");
			var complete = true;
			
			var siteSurvey = getSurvey(siteSurveyId);
			//consoleLog("SiteSurvey: "+siteSurvey);
			if (siteSurvey == null) return false;  // used by tests
			
			// compare survey attribute group counts with completed
			var attributeGroupsStatus = this.siteSurveyStatusData.attributeGroupsStatus;
			var surveyAttributeGroups = siteSurvey.attributeGroups;
			consoleLog("Attribute groups check");
			if (attributeGroupsStatus.length < surveyAttributeGroups.length)
			{
				consoleLog("Less attributeGroups completed than required: "+attributeGroupsStatus.length+","+surveyAttributeGroups.length);
				complete = false;
			}
			else  // uncomment all these after testing
			{
				//consoleLog("Assets check");
				// compare survey asset counts with completed
				var assetsStatus = this.siteSurveyStatusData.assetsStatus;
				var assetLength = assetsStatus.length;
				var surveyAssets = siteSurvey.siteSurveyAssets;
				var assetDeletions = localStorage.getObject('siteSurveyAssetDeletions');
				//consoleLog("Deletions: "+assetDeletions);
				if (assetDeletions != undefined)
				{
					for (var a=0;a<assetDeletions.length;a++)
					{
						if (assetDeletions[a].siteSurveyId == siteSurveyId)
							assetLength++;
					}
				}
				if (assetLength < surveyAssets.length)
				{
					consoleLog("Less assets completed than required: "+assetLength+","+surveyAssets.length);
					complete = false;
				}			
				else
				{
					//consoleLog("Asset attribute groups check");
					// compare survey asset attribute group counts with completed
					var assetAttributeGroupsStatus = this.siteSurveyStatusData.assetAttributeGroupsStatus;
					for (var x=0;x<siteSurvey.siteSurveyAssets.length;x++)
					{
						var surveyAssetId = siteSurvey.siteSurveyAssets[x].id;
						var deleted = false;
						if (assetDeletions != undefined)
						{
							for (var a=0;a<assetDeletions.length;a++)
							{
								if (assetDeletions[a].siteSurveyId == siteSurveyId && assetDeletions[a].assetId == surveyAssetId)
								{
									deleted = true;
									break;
								}
							}
							if (deleted)
								break;
						}
						var surveyAssetAttributeGroups = siteSurvey.siteSurveyAssets[x].attributeGroups;
						var found = false;
						//consoleLog("> "+surveyAssetId);
						if (surveyAssetAttributeGroups.length == 0)
						{
							found = true;
						}
						else
						{
							for (var z=0;z<surveyAssetAttributeGroups.length;z++)
							{
								var saaGroup = surveyAssetAttributeGroups[z];
								//consoleLog(">> "+surveyAssetId+", "+saaGroup.id);
								for (var y=0;y<assetAttributeGroupsStatus.length;y++)
								{
									var aaStatus = assetAttributeGroupsStatus[y];
									//consoleLog(">>> "+aaStatus.assetId+", "+aaStatus.assetAttributeGroupId);
									if (aaStatus.assetId == surveyAssetId && aaStatus.assetAttributeGroupId == saaGroup.id)
									{
										found = true;
										break;
									}
								}
								if (!found) 
									break;
							}
						}
												
						if (!found)
						{
							consoleLog("Less asset attributeGroups completed than required");
							complete = false;
							break;
						}
					}
				}
			}
			
			return complete;
		}
		
		/**
		 * Alternative isSurveyComplete
		 */
		this.isSurveyComplete = function(siteSurveyId) {
			console.log("isSurveyComplete");
			var siteSurvey = getSurvey(siteSurveyId);
			var siteSurveyAttributeGroups = siteSurvey.attributeGroups;
			for (var x=0;x<siteSurveyAttributeGroups.length;x++)
			{	
				var attributeGroup = siteSurveyAttributeGroups[x];
				if (attributeGroup != undefined)
				{
					console.log("Found attributeGroup: "+attributeGroup.id);
					var attributes = attributeGroup.attributes;
					if (attributes != undefined)
					{
						for (var y=0;y<attributes.length;y++)
						{
							console.log("Found attribute: "+attributes[y].id+","+attributes[y].mandatory.toUpperCase());
							if (attributes[y].mandatory.toUpperCase() == 'TRUE' || attributes[y].mandatory.toUpperCase() == 'Y')
							{
								// do we have a valid local entry
								var lAttribute = this.getAttribute(attributes[y].id, attributeGroup.id);
								//if (lAttribute != undefined)
								//{
								//	if (lAttribute.valid == true)
								//		console.log("TRUE");
								//	else
								//		console.log(lAttribute.valid);
								//}
								if (lAttribute == undefined)
								{
									return false;
								}
								else if (lAttribute.valid && lAttribute.valid != true)
								{
									console.log("Returning false");
									return false;
								}
							}
						}
					}
				}
			}
			var siteSurveyAssets = siteSurvey.siteSurveyAssets;
			for (var x=0;x<siteSurveyAssets.length;x++)
			{
				var siteSurveyAsset = siteSurveyAssets[x];
				if (siteSurveyAsset != undefined)
				{
					console.log("Found siteSurveyAsset with id: "+siteSurveyAsset.id);
					//console.log("Found siteSurveyAsset with location: '"+siteSurveyAsset.siteLocationID+"'");
					// any existing status/location
					if (siteSurveyAsset.status == ASSET_DELETED || siteSurveyAsset.siteLocationID == "")
					{
						console.log("Asset " + siteSurveyAsset.id + " previously deleted");
						continue;
					}
					// any local deletion
					if (this.isAssetDeleted(siteSurveyId, siteSurveyAsset.id))
					{
						console.log("Asset " + siteSurveyAsset.id + " locally deleted");
						continue;
					}
					var assetAttributeGroups = siteSurveyAsset.attributeGroups;
					if (assetAttributeGroups != undefined)
					{
						for (var y=0;y<assetAttributeGroups.length;y++)
						{
							var assetAttributeGroup = assetAttributeGroups[y];
							if (assetAttributeGroup != undefined)
							{
								console.log("Found assetAttributeGroup: "+assetAttributeGroup.id);
								var assetAttributes = assetAttributeGroup.attributes;
								if (assetAttributes != undefined)
								{
									for (var z=0;z<assetAttributes.length;z++)
									{
										console.log("Found assetAttribute: "+assetAttributes[z].id+","+assetAttributes[z].mandatory.toUpperCase());
										if (assetAttributes[z].mandatory.toUpperCase() == 'TRUE' || assetAttributes[z].mandatory.toUpperCase() == 'Y')
										{
											// do we have a valid local entry
											var lAttribute = this.getAssetAttribute(assetAttributes[z].id, siteSurveyAsset.id, assetAttributeGroup.id);
											//if (lAttribute != undefined)
											//{
											//	if (lAttribute.valid == true)
											//		console.log("TRUE");
											//	else
											//		console.log(lAttribute.valid);
											//}
											if (lAttribute == undefined)
											{
												return false;
											}
											else if (lAttribute.valid && lAttribute.valid != true)
											{
												console.log("Returning false");
												return false;
											}											
										}
									}
								}
							}
						}
					}
				}
			}
			return true;
		}		
		
		this.isAssetDeleted = function(siteSurveyId, assetId)
		{
			var deleted = false;
			var assetDeletions = localStorage.getObject('siteSurveyAssetDeletions');
			if (assetDeletions != undefined)
			{
				for (var a=0;a<assetDeletions.length;a++)
				{
					if (assetDeletions[a].siteSurveyId == siteSurveyId && assetDeletions[a].assetId == assetId)
					{
						console.log("Skipping deleted asset: "+assetId);
						deleted = true;
						break;
					}
				}
			}
			return deleted;
		}
		
		this.updateAssetDeletionList = function(siteSurveyId, assetId)
		{
			var newList = new Array();
			var assetDeletions = localStorage.getObject('siteSurveyAssetDeletions');
			if (assetDeletions != undefined)
			{
				for (var a=0;a<assetDeletions.length;a++)
				{
					if (assetDeletions[a].siteSurveyId == siteSurveyId && assetDeletions[a].assetId == assetId)
					{
						continue;
					}
					newList.push(assetDeletions[a]);
				}
			}
			localStorage.setObject('siteSurveyAssetDeletions',newList);
		}
		
		/**
		 * Look for any mandatory attribute otherwise the Site survey is optional
		 */
		this.isSurveyOptional = function(siteSurveyId) {
			console.log("isSurveyOptional");
			var siteSurvey = getSurvey(siteSurveyId);
			var siteSurveyAttributeGroups = siteSurvey.attributeGroups;
			for (var x=0;x<siteSurveyAttributeGroups.length;x++)
			{	
				var attributeGroup = siteSurveyAttributeGroups[x];
				if (attributeGroup != undefined)
				{
					console.log("Found attributeGroup: "+attributeGroup.id);
					var attributes = attributeGroup.attributes;
					if (attributes != undefined)
					{
						for (var y=0;y<attributes.length;y++)
						{
							console.log("Found attribute: "+attributes[y].id+","+attributes[y].mandatory.toUpperCase());
							if (attributes[y].mandatory.toUpperCase() == 'TRUE' || attributes[y].mandatory.toUpperCase() == 'Y')
								return false;
						}
					}
				}
			}
			var siteSurveyAssets = siteSurvey.siteSurveyAssets;
			for (var x=0;x<siteSurveyAssets.length;x++)
			{
				var siteSurveyAsset = siteSurveyAssets[x];
				if (siteSurveyAsset != undefined)
				{
					console.log("Found siteSurveyAsset with id: "+siteSurveyAsset.id);				
					var assetAttributeGroups = siteSurveyAsset.attributeGroups;
					if (assetAttributeGroups != undefined)
					{
						for (var y=0;y<assetAttributeGroups.length;y++)
						{
							var assetAttributeGroup = assetAttributeGroups[y];
							if (assetAttributeGroup != undefined)
							{
								console.log("Found assetAttributeGroup: "+assetAttributeGroup.id);
								var assetAttributes = assetAttributeGroups.attributes;
								if (assetAttributes != undefined)
								{
									for (var z=0;z<assetAttributes.length;z++)
									{
										console.log("Found assetAttribute: "+assetAttributes[z].id+","+assetAttributes[z].mandatory.toUpperCase());
										if (assetAttributes[z].mandatory.toUpperCase() == 'TRUE' || assetAttributes[z].mandatory.toUpperCase() == 'Y')
											return false;
									}
								}
							}
						}
					}
				}
			}
			return true;
		}
	}
});
