//----------------------------------------------------------------------------------------------------------------------
// Oneserve mobile UTILS section
//

// oneserve additional jquery methods

//call to rotate and object to given attribute
$.fn.rotate = function(rotateDeg) { 
	$(this).animate({  borderSpacing:rotateDeg  }, {
		step: function(now, fx) {
			$(this).css('-webkit-transform','rotate('+now+'deg)');
			$(this).css('-moz-transform','rotate('+now+'deg)');
			$(this).css('-ms-transform','rotate('+now+'deg)');
			$(this).css('-o-transform','rotate('+now+'deg)');
			$(this).css('transform','rotate('+now+'deg)');  
		},
		duration:'fast'
	},'linear');
}
function getUrlParameter(url, name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
	if(results){
		return results[1];
	}else{
		return null;
	}
}

/** add contains method to arrays */
function contains(array, obj) {
    var i = array.length;
    while (i--) {
        if (array[i] == obj) {
            return true;
        }
    }
    return false;
}

// convenience method for looking up params
function getClientParam(param) {
	var val = 0;
	var cParams = localStorage.getObject('clientParams');
	if(cParams)
	{
		// loop through array looking for param
		for (x=0;x<cParams.length;x++)
		{
			if (cParams[x][param])
			{
				val = cParams[x][param];
				break;
			}
		}
	}
	return val;
}

function getServerPullDelay(){
	var val = getClientParam('MPSD');
	if(!val || val == 0){
		val = 10000; //default 10 sec
	}
	return val;
}

// gets class: appointment-onTime or appointment-late
function getDateClass(status, plannedStartDate, plannedEndDate, actualStartDate, actualEndDate) {
	  var appClass = "onTime";
	  var now = new Date();
	  var psd = toDateTime(plannedStartDate);
	  var asd = (actualStartDate != '') ? toDateTime(actualStartDate):undefined;
	  var ped = toDateTime(plannedEndDate);
	  var aed = (actualEndDate != '') ? toDateTime(actualEndDate):undefined;
	  
	  if (status == APPT_NOT_STARTED && psd.getTime() < now.getTime())
	  {
		  appClass = "late";
	  }
	  else if ((status != APPT_COMPLETE && status != APPT_COST_COMPLETE) && ped.getTime() < now.getTime())
	  {
		  appClass = "late";
	  }
	  else if (asd != undefined && asd.getTime() > psd.getTime())
	  {
		  appClass = "late";
	  }	 
	  else if (aed != undefined && aed.getTime() > ped.getTime())
	  {
		  appClass = "late";
	  }		  

	return "appointment-"+appClass;
}

// calculates the total localStorage size as it is limited, browser dependent, 5-10MB
function getLocalStorageSize() {
	var size = 0;
    for (i=0; i<localStorage.length; i++)  
    {  
        key = localStorage.key(i);  
        val = localStorage.getItem(key); 
        console.log("Key: "+key+"  , size="+val.length);
        size += roughSizeOfObject(val); //val.length;
    }  
    return size;
} 

function compress (data) {
	//console.log("Original length: "+data.length);
	//remoteLogger("mobile.user","",""+data.length,3);
	//var sTime = new Date();
	// JSON_Minifier.JSON_minify(data);
	
	// very, very basic swap out of large keys for tokenised versions
	data = data.replace(/lookupValues/g,'_lV');
	data = data.replace(/attributeGroups/g,'_aG');
	data = data.replace(/attributes/g,'_aT');	
	data = data.replace(/defaultValue/g,'_dfV');	
	data = data.replace(/minValue/g,'_mnV');	
	data = data.replace(/maxValue/g,'_mxV');	
	data = data.replace(/dataType/g,'_dT');	
	data = data.replace(/libraryAssetID/g,'_laID');	
	data = data.replace(/siteLocationID/g,'_slID');	
	data = data.replace(/conditionID/g,'_cID');	
	data = data.replace(/mandatory/g,'_mY');
	data = data.replace(/sequence/g,'_sQ');	
	data = data.replace(/value/g,'_vL');
	//data = data.replace(/\":\"/g,'\|');	// useful for testing but may not be unique enough on decompression
	//data = data.replace(/\",\"/g,'\@');	
	//data = data.replace(/\},\{/g,'\$');		
	// found a lot in templates
	data = data.replace(/manufacturerID/g,'_mID');
	data = data.replace(/model/g,'_mL');
	// these shouldn't be here but until we can reduce the number of LibraryAssets or their descriptions
	// they are useful - TO BE REMOVED
	data = data.replace(/Cooker/g,'_cK');
	data = data.replace(/Combi Boiler/g,'_cB');	
	data = data.replace(/Boiler/g,'_bL');
	data = data.replace(/Oven\/Hob/g,'_oH');
	data = data.replace(/Gas Fire/g,'_gF');
	data = data.replace(/Carcass/g,'_cS');	
	data = data.replace(/ideal/gi,'_iL');	
	data = data.replace(/poterton/gi,'_pN');
	data = data.replace(/potterton/gi,'_pN');
	data = data.replace(/worcester/gi,'_wR');
	data = data.replace(/greenstar/gi,'_gR');
	data = data.replace(/belling/gi,'_bG');
	data = data.replace(/cannon/gi,'_cN');
	data = data.replace(/electrolux/gi,'_eX');
	data = data.replace(/hotpoint/gi,'_Ht');
	data = data.replace(/indesit/gi,'_It');
	data = data.replace(/newworld/gi,'_nW');
	data = data.replace(/new world/gi,'_nW');
	data = data.replace(/parkinson/gi,'_pS');
	data = data.replace(/robinson willey/gi,'_rW');
	data = data.replace(/junior/gi,'_jR');	
	data = data.replace(/zanussi/gi,'_zI');	
	data = data.replace(/system/gi,'_sY');	
	data = data.replace(/cowan/gi,'_cW');	
	data = data.replace(/gorenje/gi,'_Gj');	
	
	//var eTime = new Date();
	//console.log("Compress time: "+(eTime.getTime()-sTime.getTime()));
	//console.log("Compressed length: "+data.length);
	//remoteLogger("mobile.user","",(eTime.getTime()-sTime.getTime())+" "+data.length,3);
	return data;
}

function decompress (data) {
	// very, very basic swap out of tokenised versions for larger keys
	//var sTime = new Date();
	// JSON_Minifier.JSON_revert(data);
	
	data = data.replace(/_lV/g,'lookupValues');
	data = data.replace(/_aG/g,'attributeGroups');
	data = data.replace(/_aT/g,'attributes');	
	data = data.replace(/_dfV/g,'defaultValue');	
	data = data.replace(/_mnV/g,'minValue');	
	data = data.replace(/_mxV/g,'maxValue');	
	data = data.replace(/_dT/g,'dataType');	
	data = data.replace(/_laID/g,'libraryAssetID');	
	data = data.replace(/_slID/g,'siteLocationID');	
	data = data.replace(/_cID/g,'conditionID');	
	data = data.replace(/_mY/g,'mandatory');
	data = data.replace(/_sQ/g,'sequence');	
	data = data.replace(/_vL/g,'value');
	//data = data.replace(/\|/g,'\":\"');		
	//data = data.replace(/\@/g,'\",\"');	
	//data = data.replace(/\$/g,'\},\{');		
	// found a lot in templates
	data = data.replace(/_mID/g,'manufacturerID');
	data = data.replace(/_mL/g,'model');
	// these shouldn't be here but until we can reduce the number of LibraryAssets or their descriptions
	// they are useful - TO BE REMOVED	
	data = data.replace(/_cK/g,'Cooker');
	data = data.replace(/_bL/g,'Boiler');	
	data = data.replace(/_oH/g,'Oven\/Hob');	
	data = data.replace(/_gF/g,'Gas Fire');		
	data = data.replace(/_cS/g,'Carcass');	
	data = data.replace(/_cB/g,'Combi Boiler');		
	data = data.replace(/_iL/g,'Ideal');	
	data = data.replace(/_pN/g,'Potterton');
	data = data.replace(/_wR/g,'Worcester');
	data = data.replace(/_gR/g,'greenstar');
	data = data.replace(/_bG/g,'Belling');
	data = data.replace(/_cN/g,'Cannon');
	data = data.replace(/_eX/g,'Electrolux');
	data = data.replace(/_Ht/g,'Hotpoint');
	data = data.replace(/_It/g,'Indesit');
	data = data.replace(/_nW/g,'Newworld');
	data = data.replace(/_nW/g,'New World');
	data = data.replace(/_pS/g,'Parkinson');
	data = data.replace(/_rW/g,'Robinson Willey');
	data = data.replace(/_jR/g,'junior');	
	data = data.replace(/_zI/g,'Zanussi');	
	data = data.replace(/_sY/g,'system');	
	data = data.replace(/_cW/g,'Cowan');	
	data = data.replace(/_Gj/g,'Gorenje');	
	
	//var eTime = new Date();
	//console.log("Decompress time: "+(eTime.getTime()-sTime.getTime()));
	return data;
}

//LZW-compress a string
// much more compact than the compress/decompress functions but takes 20-100 times longer
// does this actual save in localStorage as expected?, sometimes decode not working
function lzw_encode(s) {
	//console.log("lzw_encode");
	var sTime = new Date();
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
	var eTime = new Date();
	console.log("Encode time: "+(eTime.getTime()-sTime.getTime()));
    return out.join("");
}

// Decompress an LZW-encoded string
//much more compact than the compress/decompress functions but takes 20-100 times longer
function lzw_decode(s) {
	//console.log("lzw_decode");
	var sTime = new Date();
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
	var eTime = new Date();
	console.log("Decode time: "+(eTime.getTime()-sTime.getTime()));
    return out.join("");
}

function getFormattedDate(dt) {
	var seconds = dt.getSeconds();
	if (seconds < 10)
		seconds = "0"+seconds;
	var minutes = dt.getMinutes();
	if (minutes < 10)
		minutes = "0"+minutes;
	var hours = dt.getHours();
	if (hours < 10)
		hours = "0"+hours;
	var month = dt.getMonth()+1;
	if (month < 10)
		month = "0"+month;	
	var date = dt.getDate() + "/" + month + "/" + dt.getFullYear() + " " 
				+ hours + ":" + minutes + ":" + seconds;
	return date;
}

function getFormattedDateForUrl(dt) {
	var date = getFormattedDate(dt);
	return date.replace(/\//g,"-");
}

// do these need to be localised?
var months = new Array("Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep","Oct", "Nov", "Dec");

function toDate(dateStr) {
	var date = null;
	if(dateStr){
		var regexDate = /^(\d{1,2})\/(\d{1,2})\/(\d{4})/;
		var regexVals = dateStr.match(regexDate);
		date = new Date(regexVals[3] +'/'+ regexVals[2] +'/'+ regexVals[1]);
		
		// validate 
		date = checkDateValid(date, parseInt(regexVals[2], 10), parseInt(regexVals[3]));
		if (date == null)
		{
			consoleLog("Date " + dateStr + " has a day or month value out of range");
		}
	}
	return date;
}

function toDateTime(dateStr) {
	var date = null;
	if(dateStr){
		var regexDate = /^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{1,2})/;
		var regexVals = dateStr.match(regexDate);
		date = new Date(regexVals[3] +'/'+ regexVals[2] +'/'+ regexVals[1] +" "+ regexVals[4] + ":" + regexVals[5]);
		
		// validate 
		date = checkDateValid(date, parseInt(regexVals[2], 10), parseInt(regexVals[3]));
		if (date == null)
		{
			consoleLog("Date " + dateStr + " has a day or month value out of range");
		}		
	}
	return date;
}

function toTime(dateStr) {
	var date = null;
	if(dateStr){
		var regexDate = /^(\d{1,2}):(\d{1,2})/;
		var regexVals = dateStr.match(regexDate);
		//date = new Date(regexVals[3] +'/'+ regexVals[2] +'/'+ regexVals[1] +" "+ regexVals[4] + ":" + regexVals[5]);
		date = new Date();
		date.setHours(regexVals[1]);
		date.setMinutes(regexVals[2]);
	}
	return date;
}

function checkDateValid(date, month, year){
	
	// check for invalid dates eg. 31/02/yyyy will roll over into March
	if ((date.getMonth()+1) != month)
	{
		date = null;
	}
	
	if (date != null)
	{
		// check for invalid dates eg. 01/13/yyyy will roll over into next year
		if (date.getFullYear() != year)
		{
			date = null;
		}	
	}
	return date;
}

/** @param dateStr = '2011/12/05 12:23'*/
function getShortDate(dateStr) {
	var str = null;
	if(dateStr){
		var date = toDate(dateStr);
		str =  date.getDate();		
		str +=  ' ' + months[date.getMonth()];
	}
	return str;
}
/** @param dateStr = '2011/12/05 12:23'*/
function getShortTime(dateStr) {
	var str = null;
	if(dateStr){
		var spaceIndex = dateStr.indexOf(' ');
		str = dateStr.substr(spaceIndex+1, dateStr.length);
	}
	return str;
}

function offline() {	
	//we are offline if we have scheduled the online/offline check
	return getOnlineCheckScheduledFor() != undefined;
}

function online() {	
	//we are online if we haven't scheduled the online/offline check
	return getOnlineCheckScheduledFor() == undefined;
}

function isValidDouble(str) {
	var pattern = /^-?\d+\.?\d*$/;
	return str.match(pattern) != null;
}

function logError(errorMessage, url, line) {
	var res = localStorage.getObject('resource');
	var parameters = "[]version=" + localStorage.version
				  + "    description=" + errorMessage
				  + "[]url=" + url
				  + "[]line=" + line				  
			      //+ "\nparent_url=" + document.location.href
			      + "[]user_agent=" + navigator.userAgent
	parameters = parameters.replace(',','.');
	// send to remote logging thread
	if (res)
	{
		remoteLogger(res.user, res.pass, parameters,3);
	}else{
		remoteLogger('unknown', 'unknown', parameters,3);
	}
}


function simplePopup(message, fadeOut) {
	var width = $(window).width();
	var pWidth = width * 0.9;
    $("<div class='ui-loader ui-overlay-shadow ui-body-b ui-corner-all'><h1 style='font-size:16px; width:auto; text-align:center'>" + message + "</h1></div>")
        .css({
            display: "block",
            opacity: 0.96,
            left: (width-pWidth)/2,
            top: window.pageYOffset+100,
            width: pWidth
        })
        .appendTo("body").delay(800)
        .fadeOut(fadeOut, function(){
            $(this).remove();
        });
}

function cleanErrors()
{
	$('#errors').remove();
}
function showError(message, delay)
{
	var delayTime = 4000;
	if (delay)
	{
		delayTime = delay;
	}
	var errors = $('#errors');
	//if errors element not found then add it
	if(!errors.length){
		errors = $("<ul id='errors'></ul>");
		$('[data-role=content]').prepend(errors);
	}
	
	var error = $('<li class="error">' + message + '</li>');
	error.fadeIn("slow").delay(delayTime).fadeOut("slow", function(){
		$(this).remove();
		if($('#errors').children().size() == 0){
			errors.hide();
			$('#errors').hide().remove();
		}
	});
	errors.prepend(error);
	errors.show();
}
// TEST - For ensuring that Ajax returned data is an object
// TEST - External site often returns text/plain which doesn't decode properly
function getResponseObject(responseData) {
	//alert(responseData);
	if (typeof responseData === 'object')
	{
		return responseData;
	}
	else
	{
		//return eval('(' + responseData + ')');
		return jQuery.parseJSON(responseData);
	}	
}

var messageStorage = null;
/**
 * Returns message for given key, if not found returns key
 */
function getMessage(key, defaultMessage) {
	if(!key){
		return null;
	}
	if(!messageStorage){
		messageStorage = new $.MessageDao();
	}
	var entry = messageStorage.findByKey(key);
	if(!entry)
	{
		consoleLog('message not found for key:'+key);
	}
	if (!entry && !defaultMessage)
	{
		return null;
	}
	if (!entry && defaultMessage)
	{
		return defaultMessage;
	}
	return entry.message;
}

function clearOnLogout() {
	consoleLog("Clearing down on logout or end of session");
	try
	{
		// we need to keep any localisation, context etc but remove resource
		// related data
		localStorage.removeItem('resource');
		localStorage.removeItem('notes');
		localStorage.removeItem('apptsummary');
		localStorage.removeItem('apptList');
		localStorage.removeItem('currentAppointment');
		localStorage.removeItem('clientParams');
		localStorage.removeItem('db_resourceDatabase'); // all data?
		localStorage.removeItem('apptType');
		localStorage.removeItem('lastApptType');
		localStorage.removeItem('apptActive');
		localStorage.removeItem('apptListStatus');
		localStorage.removeItem('version');
		localStorage.removeItem('requestInProgress');
	    localStorage.removeItem('timeout');
		localStorage.removeItem('lastTimestamp');
		localStorage.removeItem('surveyTemplate');
		localStorage.removeItem('surveyDetails');
		localStorage.removeItem('autocodePrefix');	
		
		if (localStorage.gps !== undefined)
		{
			localStorage.removeItem('gps');
			localStorage.removeItem('longitude');
			localStorage.removeItem('latitude');
		}
		localStorage.lastTimestamp = undefined;
		deleteCookie('OS-REST-AUTH-TOKEN');  // remove the authentication token
	} 
	catch (e)
	{
		localStorage.resource = undefined;
	}	
}

function getContactForAppointment(appt){
	var apptContact = '';
	if(appt.workLog.sal){
		apptContact += appt.workLog.sal + ' ';
	}
	if(appt.workLog.forename){
		apptContact += appt.workLog.forename + ' ';
	}
	if(appt.workLog.surname){
		apptContact += appt.workLog.surname + ' ';
	}
	if(apptContact == ''){
		apptContact = null;
	}
	return apptContact;
}

function getAddressForList1Line(workLog,sep) {
	
	var address = workLog.address1;
	if (workLog.address2 != '')
	{
		address += sep+workLog.address2;
	}	
	if (workLog.address3 != '')
	{
		address += sep+workLog.address3;
	}	
	return address;
}

function getAddressForList2Line(workLog,sep) {
	var address = null;
	if (workLog.address4 != '')
	{
		address = workLog.address4;
	}
	if (workLog.postCode != '')
	{
		if(address){
			address += sep+workLog.postCode;
		}else{
			address = workLog.postCode;
		}
	}
	return address;
}

//alternative to a session cookie
//checks/resets timestamp on page change rather than mouse/touch event
function activityTimeout() {
	var now = new Date();
	var lastTimestamp = localStorage.lastTimestamp;
	if (lastTimestamp == undefined)
	{
		localStorage.lastTimestamp = now.getTime();
		return false;
	}
	if ((now.getTime() - lastTimestamp) > localStorage.timeout * 1000) // default 24 hours
	{
		return true;
	}
	localStorage.lastTimestamp = now.getTime();
	return false;
}

// TO BE REPLACED BY JQUERY PLUGIN
function setCookie(name,value,hours) {
	var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime()+(hours*60*60*1000));
        //date.setTime(date.getTime()+(1*60*1000)); // 1 min for testing
        expires = "; expires="+date.toGMTString();
    }
    consoleLog("Cookie: "+name+"="+value+expires+"; path="+localStorage.ctx);
    document.cookie = name+"="+value+expires+"; path="+localStorage.ctx;
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
	consoleLog("Delete cookie: "+name);
    setCookie(name,"",-1);
}

// Read the cache.manifest file (out of the applicationCache)
// and get the latest version
function getManifestVersion() {
	//consoleLog("getManifestVersion");
	var version = (localStorage.version != undefined) ? localStorage.version : "0.0";
	
	$.ajax({
		url: 'cache.manifest',
		dataType: 'text',
		async: false,
		cache: true,
		// Callback (onsuccess)			
		success: function(response, status, request){
			//consoleLog("Success - version "+response);
			var versionReg = /.*version.*(\d+)/;
			var regexVals = response.match(versionReg);
			var vals = regexVals[0].split(' ');
			version = vals[vals.length-1];
			localStorage.version = version;
			//$('#ls').append(regexVals[0]);
		},
		// Error handler
		error: function(response, status, request){
		  consoleLog(status+","+JSON.stringify(response)+","+JSON.stringify(request)+","+response.status);
		  if (response.status > 0)
		  {
			  alert(getMessage("check.version.error","Connection error ") + " " + response.status)
		  }
		}
	  });

    
	//consoleLog("Version: "+version);
	return version;
}

//convenience method for looking up notes
function getNote(noteId) {
	var val = '';
	var notes = localStorage.getObject('notes');
	// loop through array looking for id
	for (x=0;x<notes.length;x++)
	{
		if (notes[x].id == noteId)
		{
			val = notes[x].note;
			break;
		}
	}
	return val;
}


//used to override the default window.alert function and as a confirm replacement
function customDialog(txt, callback, params, btn1, btn2) {
	
     if ($('#dialogDiv').length > 0) return; // Only ever show one popup at a time
     
     // The modal div to block out the rest of the document whilst the popup is shown
     var modalDiv = $('<div></div>').attr('id', 'modalDiv');
     
     // The dialog container
     var dialogDiv = $('<div class="dialogDiv customDialog"></div>').attr('id', 'dialogDiv');
     
     // The alert title
     var title = $('<div class="ui-corner-top ui-overlay-shadow ui-header ui-bar-c header"></div>');
     var titleText = $('<h1 class="ui-title"></h1>');
     if (callback != undefined) {
    	 titleText.text('Please confirm');
     }else{
    	 titleText.text('Oneserve');
     }
     title.append(titleText);
     
     // The alert text to display
     var mainText = $('<p class="mainContent"></p>');
     mainText.html(txt);

     // X button - will remove/close the alert on click
     var closeBtn = $('<img src="images/warn.png">');
     closeBtn.addClass('alert-close');
     
     
     // OK button - will remove/confirm on click
     var okText = 'OK';
     if (btn1 != undefined)
     {
    	 okText = btn1;
     }
     var okButtonHtml = "<a data-role='button' href='#' id='confirmOkButton' data-theme='c' class='ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c' style='margin:0 5px'>" +
					  	"<span class='ui-btn-inner ui-btn-corner-all' aria-hidden='true' style='padding:0.6em 0px'>" +
					  		"<span class='ui-btn-text'>" + okText + "</span>" +
					  	"</span>" + 
					  "</a>";
     var okBtn = $(okButtonHtml);
 	
     // Cancel button - will remove/cancel on click
     var cancelText = "Cancel";
     if (btn2 != undefined)
     {
    	 cancelText = btn2;
     }
     var cancelButtonHtml = "<a data-role='button' href='#' id='confirmCancelButton' data-theme='c' class='ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c' style='margin:0 5px'>" +
	  	"<span class='ui-btn-inner ui-btn-corner-all' aria-hidden='true' style='padding:0.6em 0px'>" +
	  		"<span class='ui-btn-text'>" + cancelText + "</span>" +
	  	"</span>" + 
	  "</a>";     
     var cancelBtn = $(cancelButtonHtml);
     // Append elements to div body
     dialogDiv.append(title);
     dialogDiv.append(mainText);
     
     // configure as alert or confirm dialog
     if (callback != undefined) // confirm
     {
    	 var btnSpan = $('<span></span>').attr('id', 'btnSpan');
    	 btnSpan.append(okBtn);
    	 btnSpan.append('&nbsp;&nbsp;');
    	 btnSpan.append(cancelBtn);
    	 btnSpan.append('<br>');    	 
    	 dialogDiv.append(btnSpan);
    	 $('#btnSpan').css('left', ($(dialogDiv).width()/2) - ($('#btnSpan').width()/2)+'px');    	 
     }
     else // alert
     {
    	 title.append(closeBtn);
     }
     
     $('body').append(modalDiv);
     $('body').append(dialogDiv);
     
     $('#modalDiv').addClass('modalDiv');
     //set display to block and opacity to 0 so we can use fadeTo  
     $('#modalDiv').css({ 'display' : 'block', opacity : 0, height: $(document).height()});  
     //fade in the mask to opacity 0.8  
     $('#modalDiv').fadeTo(500,0.8);
     
     // Centre alert on page
     $('#dialogDiv').css('top', ($(window).height()/2) - ($('#dialogDiv').height()/2)+'px');
     $('#dialogDiv').css('left', ($(window).width()/2) - ($('#dialogDiv').width()/2)+'px');
     $('#dialogDiv').dialog({modal:true, bgiframe:false});
     $('#dialogDiv').removeClass('ui-dialog'); // take out the default
     //consoleLog($(document).scrollTop(10));
     consoleLog($(window).scrollTop(10));
     //consoleLog($("html").scrollTop(10));
     
      //show the modal window  
     $('#dialogDiv').fadeIn(200);  
     
     // Bind button(s) to ok of confirm
 	$('#dialogDiv #confirmOkButton').bind('click', function(e) {
 		callback(params);
        $('#dialogDiv').fadeOut(500);
        $('#modalDiv').fadeOut(500);
        $('#dialogDiv').remove();
        $('#modalDiv').remove(); 
         e.preventDefault();
 	});	      
    // Bind button(s) to close/cancel
     $('#dialogDiv #confirmCancelButton, #dialogDiv .alert-close').bind('click', function(e) {  
         $('#dialogDiv').fadeOut(500);
         $('#modalDiv').fadeOut(500);
         $('#dialogDiv').remove();
         $('#modalDiv').remove();            
         e.preventDefault();
     });
     setTimeout(function(){
    	 $.mobile.silentScroll(0); 
     }, 50);
}

var appointmentStatusArray = null;
function getAppointmentStatusDesc(appointmentStatusId){
	if(!appointmentStatusArray){
		appointmentStatusArray = new Array(	getMessage('appointmentStatus0', 'New'),
											getMessage('appointmentStatus1', 'Rescheduled (NC)'),
											getMessage('appointmentStatus2', 'Pending'),
											getMessage('appointmentStatus3', 'In Progress'),
											getMessage('appointmentStatus4', 'Complete'),
											getMessage('appointmentStatus5', 'Cost Complete'),
											getMessage('appointmentStatus6', 'Being Rescheduled'),
											getMessage('appointmentStatus7', 'Deleted (NC)'),
											getMessage('appointmentStatus8', 'Rescheduled'),
											getMessage('appointmentStatus9', 'Cancelled'),
											getMessage('appointmentStatus10', 'Holding')
										);
	}
	return appointmentStatusArray[appointmentStatusId];
}

function getWorkTypeClass(workType){
	var productiveClass = workType.isProductive ? ' productive' : '';
	var workTimeClass = workType.workTimeClass ? ' workTime' : '';
	
	var simpleName = workType.name.toLowerCase();
	//use only first part as css class
	if(simpleName.indexOf(' ') > 0){
		simpleName = simpleName.substring(0, simpleName.indexOf(' '));
	}
	
	return 'workTypeTime-' + simpleName + productiveClass + workTimeClass;
}

// simple method to return gps location 
// returns an empty string if not enabled
function getGpsLocation() {
	var coords = "";
	if (localStorage.longitude != undefined && localStorage.latitude != undefined)
	{
		coords = localStorage.longitude+","+localStorage.latitude;
		//consoleLog("Location: "+coords);
	}
    return coords;
}

// as the geolocation is async with callback this is the callback method for the position watcher
function setGpsLocation(latitude, longitude) {
	localStorage.latitude = latitude;
	localStorage.longitude = longitude;
}

//
// allows us to use the cookie/user only if defined, user/pass otherwise
//
function getHeaders(user, pass, token, gps) {
	var headers = "";
	var currentPage = $.mobile.activePage.attr('id');
	var version = (localStorage.version != undefined) ? $.trim(localStorage.version) : "0.0";

	if (getCookie(token) == null)
	{
		headers = {'username': user,'password': pass, 'gpslocation': gps, 'mobilepage': currentPage, 'version': version};
	}
	else
	{
		headers = {'username': user, 'gpslocation': gps, 'mobilepage': currentPage, 'version': version};
	}

	return headers;
}


/**
 * checks online status and if online attempts to send any items from the queue
 */
function checkOnlineStatus(async){
	consoleLog("Online/offline - status check");
	
	//online/offline check already scheduled - skip
	if(getOnlineCheckScheduledFor() != undefined)
	{
		consoleLog("INFO: Online check already scheduled for " + localStorage.pullServerScheduled + " ms");
		return;
	}
	
	var ns = new networking.NetworkStatus();
	if (async === undefined)
	{
		async = true;
	}
	
	//define callback
	ns.setOnline = function(isOnline){
		consoleLog("Online status: "+isOnline);
		var remoteUpdater = new $.RemoteUpdater();
		if(isOnline){
			//value used on the tools page
			localStorage.lastOnlineTime = new Date().getTime();
			
			// send online/offline timing back to server
			if (localStorage.offlineTime != undefined)
			{
				var res = localStorage.getObject('resource');
				var offdate = new Date();
				consoleLog("offline stored time: "+localStorage.offlineTime);
				offdate.setTime(localStorage.offlineTime);
				var data = "logdata=Last offline:" + offdate + ", back online:" + new Date();
				remoteLogger(res.user, res.pass, data,1);
				localStorage.removeItem('offlineTime');
			}
			// send queue
			remoteUpdater.sendQueue();
			localStorage.removeItem('pullServerScheduled');
		}else{
			//value used on the tools page
			localStorage.lastOfflineTime = new Date().getTime();
			
			// save offline time
			if (localStorage.offlineTime == undefined)
			{
				localStorage.offlineTime = new Date().getTime();
				localStorage.lastOfflineTime = localStorage.offlineTime;
				consoleLog("offline time: "+localStorage.offlineTime);
			}
		    //run online check every - clientParam 'MPSD'ms
		    var pullDelay = getServerPullDelay();
		    if(pullDelay && !remoteUpdater.isQueueEmpty()){
		    	localStorage.pullServerScheduled = new Date().getTime() + parseInt(pullDelay);
		    	consoleLog('Online check scheduled at:' + localStorage.pullServerScheduled );
		    	
		    	setTimeout(function(){
		    		localStorage.removeItem('pullServerScheduled');
		    		checkOnlineStatus(true);
		    	}, pullDelay);
		    }
		}
	};
	
	ns.checkStart = function(){
		//check if we have header
		if($('#userStatusHeader').length == 0){
			displayStatusHeader();
		}
		$('#userStatusHeader .connectionStatus').text(getMessage('offlineChecking'));
	}
	
	ns.checkFinish = function(){
		if($('#userStatusHeader').length == 0){
			displayStatusHeader();
		}
		$('#userStatusHeader .connectionStatus').text(getConnectionStatusText());
	}
	
	ns.checkNetworkStatus(async);
	ns = null;
}

function getOnlineCheckScheduledFor() {
	return localStorage.getItem('pullServerScheduled');
}

// we have to be careful with the offline behaviour that entries on the queue
// get back to the server before we refresh appointments locally as it can cause
// the local status values to revert
function refreshSafe() {
	var safe = false;
	var remoteUpdater = new $.RemoteUpdater();
	if (remoteUpdater.isQueueEmpty())
	{
		safe = true;
	}
	else
	{
		consoleLog("Attempt to refresh appointments when the update queue is not empty");
		simplePopup(getMessage("refreshNotSafe","Refresh disabled until queued updates have been processed"), 3000);
	}
	return safe;
}

function isUpdateRequestInProgress()
{
	//flag to indicate if we have any requests in the queue
	return localStorage.getObject('requestInProgress') == null ? false : localStorage.getObject('requestInProgress');
}

function setUpdateRequestInProgress(queueSize)
{
	localStorage.setObject('requestInProgress', true);
	updateUiWithQueueCount(queueSize);
}

function setUpdateRequestNotInProgress(queueSize)
{
	localStorage.setObject('requestInProgress', false);
	updateUiWithQueueCount(queueSize);
}

/**
 * Generic way of dealing with an error .. shows it to a user
 */
function processGetRequestError(xhr, textStatus, errorThrown){
	//we can do with some logic here, but all get request should just work,
	//the only errors we should ever get is timeout
	consoleLog("Error processing get request: "+textStatus+","+errorThrown+","+JSON.stringify(xhr));
	logAjaxError(errorThrown);
	//copied from jquery mobile
	// Remove loading message.
	$.mobile.hidePageLoadingMsg();
	$window = $( window );
	var msg = getMessage("timeout", "It's taking too long to retrieve your data. Please check your signal and try again.")
	//show error message
	$( "<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h4>"+ msg +"</h4></div>" )
		.css({ "display": "block", "opacity": 0.96, "top": $window.scrollTop() + 100, "font-size":"13px",
				"width":"300px",
				"margin-left":"-150px",
				"padding":"10px"})
		.appendTo( $.mobile.pageContainer )
		.delay( 5500 )
		.fadeOut( 400, function() {
			$( this ).remove();
	});
}

// loading message wrappers
function showLoadingMessage(msgText)
{
	consoleLog("Loading message with text: "+msgText);
	$.mobile.showPageLoadingMsg();	
	if ($('.ui-loader h1') != undefined && msgText != undefined && msgText != "")
	{
		$('.ui-loader h1').text(msgText);
		$('.ui-loader h1').trigger('refresh');
		consoleLog("Setting message text");
	}
	
}

function hideLoadingMessage()
{
	//$('.ui-loader h1').text(getMessage('loadingMsg'));
	$.mobile.hidePageLoadingMsg();
}

// sets the prefix for all new objects created eg. locations, assets
function setAutocode() {
	var auth = getCookie('JSESSIONID');
	localStorage.autocodePrefix='MB-'+auth.substring(0,16)+'-';
}

// left pad with the z character, default = 0
function leftPad(n, width, z) {
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



	
function hasRight(right)
{
	var resource = localStorage.getObject('resource');
	if(resource && resource.rights)
	{
		var rights = resource.rights.split(',');
		for (var x=0;x<rights.length;x++)
		{
			if (right == rights[x])
			{
				return true;
			}
		}
	}
	return false;
}

function getDisplayValue (value) {
	// display 0 decimal points if we can else 1
	console.log(value+",  "+(parseFloat(value) == parseInt(value)));
	if((parseFloat(value) == parseInt(value)) && !isNaN(value))
	{
	      return Number(value).toFixed(0);			  
	} else 
	{
	      return Number(value).toFixed(1);			  
	} 

}

function hasImageUploadSupport() {
	var support = false;
	
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) 
	{
		support = true;
		if (window.URL && window.requestFileSystem)
		{
		  // all ok
		console.log("All required File APIs supported");
		}
		else
		{
			  //alert('The FileSystem APIs are not fully supported in this browser.');
			console.log('The FileSystem APIs are not fully supported in this browser.');
		}
	} 
	else 
	{
		//alert('The general File APIs are not fully supported in this browser.');
		console.log('The general File APIs are not fully supported in this browser.');
	}
	
	return support;
}

function roughSizeOfObject( value, level ) {
    if(level == undefined) level = 0;
    var bytes = 0;

    if ( typeof value === 'boolean' ) {
        bytes = 4;
    }
    else if ( typeof value === 'string' ) {
        bytes = value.length * 2;
    }
    else if ( typeof value === 'number' ) {
        bytes = 8;
    }
    else if ( typeof value === 'object' ) {
        if(value['__visited__']) return 0;
        value['__visited__'] = 1;
        for( i in value ) {
            bytes += i.length * 2;
            bytes+= 8; // an assumed existence overhead
            bytes+= roughSizeOfObject( value[i], 1 )
        }
    }

    if(level == 0){
        clear__visited__(value);
    }
    return bytes;
}

function clear__visited__(value){
    if(typeof value == 'object'){
        delete value['__visited__'];
        for(var i in value){
            clear__visited__(value[i]);
        }
    }
}

function imageRequired() {
	var cp = getClientParam("MPREQ");
	if (cp != undefined && cp == 1)
	{
		//console.log("Images mandatory");
		return true;
	}
	//console.log("Images optional");
	return false;
}

function imageUploadedIfRequired(appt) {
	var cp = getClientParam("MPREQ");
	//console.log("cp: "+cp);
	if (cp != undefined && cp == 1)
	{
		if (appt.imageUploaded == true)
		{
			console.log("Image(s) uploaded");
			return true; // required and flag set
		}
		console.log("Image still required");
		return false;
	}
	return true;  // image not required
}

/** 
 * JQuery plugin to create dropdown date picker (3 drop downs).
 *  Example usage: $('div').dropdownDatePicker();
 *  where div has to contain 3 select elements which will then be converted 
 *  in order to:
 *  day, month and year drop down
 *  
 *  Options:
 *  preselectDate - date to be set as when dropdown is rendered, if left null
 *  will be set to current date 
 */
(function($) {
	 //static variables
	 var months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
	
	 $.fn.dropdownDatePicker = function(options) {
		  var opts = $.extend({}, $.fn.dropdownDatePicker.defaults, options);
		  
		  return this.each(function() {
			  var $dateComponent = $(this);
			  
			  
		      var $selects = $dateComponent.find('select');
		      if($selects.length != 3)
		      {
		    	  throw Error('Unable to find 3 select components required by date picker');
		      }
		      var $day = $($selects[0]);
		      var $month = $($selects[1]);
		      var $year = $($selects[2]);
		      $day.empty();
		      $month.empty();
		      $year.empty();
		      var preselectDate = opts.preselectDate;
		      if(preselectDate == null)
		      {
		    	  preselectDate = new Date();
		      }
		      var day = preselectDate.getDate();
		      var month = preselectDate.getMonth() + 1;
		      var year = preselectDate.getFullYear();

		      var years = new Array();
		      var startYear = new Date().getFullYear();
		      for(var i = 0; i < opts.numberOfYears; i++)
		      {
		    	  years.push(startYear + i);
		      }
		      
		      var days = new Array();
		      for(var i = 0; i < 31; i++)
		      {
		    	  var j = (i+1);
		    	  if(j < 10)
		    	  {
		    		  j = "0" + j;
		    	  }
		    	  days.push("" + j);
		      }
		      populateDD(days, day, $day);
		      populateDD(months, month, $month);
		      populateDD(years, year, $year);
		      
		      //add onchange event to validate date
		      $day.change(function(){
		    	  validate($dateComponent, $day, $month, $year);
		      });
		      $month.change(function(){
		    	  validate($dateComponent, $day, $month, $year);
		      });
		  });
		  function validate($dateComponent, $day, $month, $year){
			  if(isValidDate($day, $month, $year))
			  {
	    		  $dateComponent.removeClass('invalid');
	    	  }else{
	    		  console.info('invalid date')
	    		  $dateComponent.addClass('invalid');
	    	  }
		  }
		  
		  function isValidDate($day, $month, $year) {
		      var valid = true;
		      var day = parseInt($day.val(), 10);
		      var month   = parseInt($month.val(), 10);
		      var year  = parseInt($year.val());

		      var d = new Date();
		      d.setDate(day);
		      d.setMonth(month - 1);
		      d.setFullYear(year);
		      
		      valid = (d.getDate() == day && d.getMonth() + 1 == month  && d.getFullYear() == year); 
		      
		      console.info('date d:'+ day + ' m:' + month + ' y:' + year + ' valid:'+valid)
		      return valid;
		  }
		  
		  function populateDD(values, selectedValue, $select){
			  $.each(values, function(index, value){
		    	  if(selectedValue && parseInt(value, 10) == parseInt(selectedValue, 10))
		    	  {
		    		  $select.append('<option value=' + value + ' selected>' + value + '</option>');
		    	  }else{
		    		  $select.append('<option value=' + value + '>' + value + '</option>');
		    	  }
		      });
			  
			  //refresh jquerymobile select component so it show correct selected value
			  if(typeof $select.selectmenu == 'function') { 
				  $select.selectmenu('refresh', true);
			  }
		  }
	  }
	  $.fn.dropdownDatePicker.defaults = {preselectDate: null, numberOfYears: 5}
})(jQuery);

/** 
 * JQuery plugin to create dropdown time picker (2 drop downs).
 *  Example usage: $('div').dropdownTimePicker();
 *  where div has to contain 2 select elements which will then be converted 
 *  in order to:
 *  hour, minute drop down
 *
 *  Options:
 *  preselectTime - Date object to be set as when dropdown is rendered, if left null
 *  will be set to current date
 */
(function($) {
	 //static variables
	 var hours = ["00","01","02","03","04","05","06","07","08","09","10",
	               "11","12","13","14","15","16","17","18","19","20","21","22","23"];
	 var minutes = ["00","05","10","15","20","25","30","35","40","45","50","55"];
	
	 $.fn.dropdownTimePicker = function(options) {
		  var opts = $.extend({}, $.fn.dropdownTimePicker.defaults, options);
		  
		  return this.each(function() {
			  
		      var $selects = $(this).find('select');
		      if($selects.length != 2)
		      {
		    	  throw Error('Unable to find 2 select components required by time picker');
		      }
		      var $hour = $($selects[0]);
		      var $minute = $($selects[1]);
		      $hour.empty();
		      $minute.empty();
		      var preselectTime = opts.preselectTime;
		      if(preselectTime == null)
		      {
		    	  preselectTime = new Date();
		      }
		      var hour = preselectTime.getHours();		      
		      var minute = Math.round(preselectTime.getMinutes()/5)*5;
		      //if we have 13.58 - above will round to 13.00
		      //so add extra hour
		      if(preselectTime.getMinutes() > 55)
		      {
		    	  hour++;
		      }

		      populateDD(hours, hour, $hour);
		      populateDD(minutes, minute, $minute);
		  });
		  
		  function populateDD(values, selectedValue, $select){
			  $.each(values, function(index, value){
		    	  if(selectedValue && parseInt(value, 10) == parseInt(selectedValue, 10))
		    	  {
		    		  $select.append('<option value=' + value + ' selected>' + value + '</option>');
		    	  }else{
		    		  $select.append('<option value=' + value + '>' + value + '</option>');
		    	  }
		      });
			  
			  //refresh jquerymobile select component so it show correct selected value
			  if(typeof $select.selectmenu == 'function') { 
				  $select.selectmenu('refresh', true);
			  }
		  }
	  }
	  $.fn.dropdownTimePicker.defaults = {preselectTime: null}
})(jQuery);

