//
// Main Oneserve Mobile script file
//

//
// Global definitions
//
var ApptListController = new ListController();
var AppointmentController = new AppController();
var resource;
var db;
//WorkTime status values and colour settings
var bgcolor = Array('#f0f0f0','#b6d7a8','#9fc5f8','#bfc5f8','#dddddd');
var IDLE = 0;
var NOT_STARTED = 2;
var IN_PROGRESS = 3;
var COMPLETE = 4;
var APPT_NOT_STARTED = 2;
var APPT_IN_PROGRESS = 3;
var APPT_COMPLETE = 4;
var APPT_COST_COMPLETE = 5;
var LIST_MY_APPTS = 1;
var LIST_TEAM_APPTS = 2;
var LIST_ALLERTS = 3;
var COOKIE_NAME = 'OS-Mobile-Session';
var CACHE_IDLE = 1;
var loginTimeout = 30000;
var apptTimeout = 300000;
var searchJobTimeout = 30000;
var addApptTimeout = 300000;
var STOCK_USAGE = 1;
var STOCK_USAGE_UPDATE = 2;
var STOCK_PURCHASE = 3;
var STOCK_TRANSFER = 4;
var MAX_IMAGE_WIDTH = 800;
var MAX_IMAGE_HEIGHT = 600;
var SurveyCompletetionStage = {
	ANYTIME : 1,
	BEFORE_WORKS_STARTS : 2
}

//TODO - this needs to be 'false' for production sites
var debug = true;

// add convenience methods to local storage
// used for handling serialisation/de-serialisation of objects
// not really needed for simple name/value data
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    return this.getItem(key) &&  JSON.parse(this.getItem(key));
}
Storage.prototype.setObjectCompress = function(key, value) {
	var compressed = "";
	//if (navigator.platform == 'Win32' || localStorage.seleniumTest)
	//{
		compressed = compress(JSON.stringify(value));
	//}
	//else
	//{
	//	compressed = lzw_encode(JSON.stringify(value));
	//}
    this.setItem(key, compressed);
}
Storage.prototype.getObjectDecompress = function(key) {
	var uncompressed;
	var cdata = "";
	if (this.getItem(key))
	{
		cdata = this.getItem(key);
		//if (navigator.platform == 'Win32' || localStorage.seleniumTest)
		//{			
			uncompressed = JSON.parse(decompress(cdata));
		//}
		//else
		//{
		//	uncompressed = JSON.parse(lzw_decode(cdata));
		//}		
	}
	return uncompressed;
}

//for all js errors...
window.onerror = function(errorMessage, url, line) {
	//make selenium aware of js errors
	if(debug){
		var errorDiv = "<div id='seleniumError'>" + errorMessage + "</div>";
		$("body").append(errorDiv);
	}
};

// comment this out for normal alert behaviour
window.alert = function(txt) {
	customDialog(txt);
	//createCustomAlert(txt);
}

if(debug){
	//add attribute 'pageChanging' to body tag - this allows selenium tests to wait for page to be completely loaded  
	$(document).bind("pagebeforechange", function () {
		$("body").attr('pageChanging', 'true');
	});
	$(document).bind("pagechange", function () {
		$("body").removeAttr('pageChanging');
	});
}
//
// Default settings
//

// Test bandwidth functions  ==========
$(document).ajaxStart(function() {
	  //consoleLog('Triggered ajaxStart handler.');
	  sessionStorage.setObject('ajaxStartTime',new Date().getTime());
});
$(document).ajaxSuccess(function(resp, status, req) {
	//consoleLog('Triggered ajaxSuccess handler.');
	// if data size is above a threshold we determine a basic bandwidth
	if (typeof resp == 'object')
	{
		var startTs = sessionStorage.getObject('ajaxStartTime');
		var totalTime = sessionStorage.getObject('ajaxTotalTime');
		var totalSize = sessionStorage.getObject('ajaxTotalSize');
		var endTs = new Date().getTime();

		// it is more accurate if we can take out any server processing time
		var ajaxServerTime = 0;
		if (status.responseText.indexOf('{') == 0)
		{
			var data = JSON.parse(status.responseText);
			if (data.duration)
			{
				ajaxServerTime = data.duration;
			}
		}
		
		var responseData = JSON.stringify(status.responseText);

		if (responseData.length > 500 && endTs > (startTs + ajaxServerTime))
		{
			var bandwidth = (responseData.length * 1000) / (endTs - (startTs + ajaxServerTime));
			//consoleLog("Bandwidth: "+bandwidth.toFixed(2)+" B/s");
			totalTime += (endTs - startTs);
			sessionStorage.setObject('ajaxTotalTime',totalTime);
			totalSize += (responseData.length * 1000)
			sessionStorage.setObject('ajaxTotalSize',totalSize);			
		}		
	}
});
// ======================================

$(document).bind("mobileinit", function () {

	//check if login page has been loaded, otherwise redirect to login.jsp
	if (typeof loginPageInitialised == 'undefined'){
		
		var context = localStorage.ctx;
		if(!context){
			//get context using js
			var locationStr = window.location + '';	
			var obj = $.mobile.path.parseUrl(locationStr);
			window.location = obj.directory + 'login.jsp';
		}
		else
		{
			window.location = context + '/mobile/login.jsp';
		}
		return;
	}
	
    // Navigation
	//alert("default settings");
    $.mobile.page.prototype.options.backBtnText = getMessage('back');
    //$.mobile.page.prototype.options.addBackBtn = true;
    
    // NB. when changing the theme also change the 'body, .ui-page' entry in the stylesheet
    $.mobile.page.prototype.options.backBtnTheme  = "c";

    // Page
    $.mobile.page.prototype.options.headerTheme = "c";  // Page header only
    $.mobile.page.prototype.options.contentTheme = "c";
    $.mobile.page.prototype.options.footerTheme = "c";
	$.mobile.page.prototype.options.bodyTheme = "c";

    // Listviews
    $.mobile.listview.prototype.options.headerTheme = "c";  // Header for nested lists
    $.mobile.listview.prototype.options.theme = "c";  // List items / content
    $.mobile.listview.prototype.options.dividerTheme = "c";  // List divider
	$.mobile.listview.prototype.options.bodyTheme = "c";
	
    //$.mobile.listview.prototype.options.splitTheme = "a";
    //$.mobile.listview.prototype.options.countTheme = "a";
    //$.mobile.listview.prototype.options.filterTheme = "a";
    //$.mobile.listview.prototype.options.filterPlaceholder = "Filter data...";
    
    $.mobile.loadingMessage = getMessage('loadingMsg');    
    $.mobile.pageLoadErrorMessage = getMessage('loadingErrorMsg');
    $.mobile.touchOverflowEnabled = true;
    $.extend($.mobile.zoom, {locked:true,enabled:false});    
});
//
// localisation
// go through any element on the page which has data-messageKey set, 
// use the value of it as a key, lookup a message and set the text
//
// NOTE: does not work for templates ICanHaz.js
//
$(document).bind("pagebeforecreate", function () {
	$('[data-messageKey]').each(function(){
		var key = $(this).attr('data-messageKey');
		$(this).text(getMessage(key, $(this).val()));
		$(this).removeAttr('data-messageKey');
	});
});

$(document).bind("pagebeforechange", function (event, ui) {
	
	//consoleLog("TO: "+ui.toPage);
	var currentPage = ($.mobile.activePage != undefined) ? $.mobile.activePage.attr('id'):"";
	//consoleLog("CURRENT: "+currentPage);			
	var sessionCookie = getCookie(COOKIE_NAME);
	//consoleLog("COOKIE: "+sessionCookie);
	//consoleLog("AT: "+activityTimeout());
	if (typeof ui.toPage === "string") // does this twice and the second time this is an object
	{
		if ((sessionCookie == null || activityTimeout()) && currentPage != "" && currentPage != 'login' && ui.toPage != 'login.jsp')
		{		
			consoleLog("Session has expired");
			event.preventDefault();
			clearOnLogout();
			consoleLog("Redirect back to login");		
			$.mobile.changePage( "login.jsp", { showLoadMsg: true, transition: "slide", reverse: true } );
		}
	}

	if($.mobile.activePage != undefined && $.mobile.activePage.attr('id') == 'home'){
		if(localStorage.resource && ui.toPage == '/selenium/mobile/login.jsp'){
			event.preventDefault();
			//$.mobile.changePage( "home.html", { showLoadMsg: false } );
			window.history.forward();
		}
	}
});

$(document).bind("pagebeforeshow", function () {
	
	var hasActivePage = $.mobile.activePage != undefined; 
	var isNotLoginPage = hasActivePage && $.mobile.activePage.attr('id') != 'login';
	var isNotLogutConfirmPage = hasActivePage && $.mobile.activePage.attr('id') != 'logoutConfirmation';
	//if page is not login page
	if(isNotLoginPage && isNotLogutConfirmPage){
		displayStatusHeader();
		var pageId = $.mobile.activePage.attr('id');			
		displayOpenJobHeader(pageId);
		
		//display queue count
		updateUiWithQueueCount(new $.Queue().getAll().length);
		
	}else{ 	//if login page

		hideJobStatus();
		if(!isNotLoginPage){
			//look for app update every time we are on the login page
			var cacheUpdate = new networking.CacheUpdate();
			cacheUpdate.checkForUpdate();
		}
	}
	
	
});


//------------------------------------------------------------------------------------
// Load init data called after user has logged in
function onAfterLogin(){
	consoleLog('onAfterLogin()');

	var workTimeTypeDataProvider = new $.WorkTimeTypeRemoteDataProvider();
	if(workTimeTypeDataProvider.requiresUpdate()){
		workTimeTypeDataProvider.downloadData(false);
	}
	
	// check we have Notes stored (for Additional Appointment)
	getNotes();
	
	
	//get activities
	var libActivityDataProvider = new $.LibraryActivityRemoteDataProvider();
	if(libActivityDataProvider.requiresUpdate()){
		libActivityDataProvider.downloadData(false);
	}
	
	var activityCategoryDataProvider = new $.ActivityCategoryRemoteDataProvider();
	if(activityCategoryDataProvider.requiresUpdate()){
		activityCategoryDataProvider.downloadData(false);
	}
	
	//get services
	var serviceDataProvider = new $.ServiceRemoteDataProvider();
	if(serviceDataProvider.requiresUpdate()){
		serviceDataProvider.downloadData(false);
	}

	//get asset manufactures
	var assetManufacturerdataProvider = new $.AssetManufacturerRemoteDataProvider();
	//register callback
	if(assetManufacturerdataProvider.requiresUpdate()){
		assetManufacturerdataProvider.downloadData(false);
	}
	
	//get asset condition
	var assetConditionProvider = new $.AssetConditionRemoteDataProvider();
	//register callback
	if(assetConditionProvider.requiresUpdate()){
		assetConditionProvider.downloadData(false);
	}
	
	//parts
	//download data only if user has PARMO right
	if(hasRight('PARMO'))
	{
		var storePartProvider = new $.StorePartRemoteDataProvider();
		var partCategoryProvider = new $.PartCategoryRemoteDataProvider();
		//register callback
		if(storePartProvider.requiresUpdate()){
			storePartProvider.downloadData(false);
		}
		//register callback
		if(partCategoryProvider.requiresUpdate()){
			partCategoryProvider.downloadData(false);
		}
	}
}

//
// Page initialisation/leave events eg. REST call on page show
//

//
// LOAD HOME PAGE
//
$("div[id='home']").live('pageinit', function(event, ui) {
	var res = jQuery.parseJSON(localStorage.resource);
	$('#pageTitle').text(localStorage.title);
	if (res && res.user) 
	{				
		$('#username').text(res.name);
		$('#supplier').text(res.supplier);
	}
	else
	{
		consoleLog('resource not found in localStorage, redirect to login page');
		//window.location.href = "login.jsp";
		$.mobile.changePage( "login.jsp", { showLoadMsg: false } );
	}
});
$("div[id='login']").live('pageshow', function(event, ui) {
	$('#pass').removeClass('ui-focus');
	$('#user').focus();
});

$("div[id='logoutConfirmation']").live('pageshow', function(event, ui) {
	$('#logoutConfirmOk').click(function(event, ui){
		var loginPageInitialised = false;
		var loginUrl = '';
		var context = localStorage.ctx;
		if(!context){
			//get context using js
			var locationStr = window.location + '';	
			var obj = $.mobile.path.parseUrl(locationStr);
			loginUrl = obj.directory + 'login.jsp';
		}
		else
		{
			loginUrl = context + '/mobile/login.jsp';
		}
		clearOnLogout();
		//$.mobile.changePage( "login.jsp", { showLoadMsg: false, transition: "slide", reverse: true } );
		window.location = loginUrl;
	});
});

$("div[id='home']").live('pageshow', function(event, ui) {
	// set up the db if required
	/*
	//db = localStorage.db;
	if (isDatabaseSupported() && !db)
	{
		createDatabase();
		if (db)
		{
			//localStorage.db = db;
			initDatabase();		
		}
	}	
	if (db)
	{
		// see if we need to download the SORs  
		//downloadSORs();	// this works just leaving out for now
	}
	*/
	
	// default list values on entry to My Appointments
	if (localStorage.apptType == undefined)
	{
		localStorage.apptType = LIST_MY_APPTS;
	}
	// set our Appt in_progress flag on first entry
	if (localStorage.apptActive == undefined)
	{
		localStorage.apptActive = 0;
	}
	
	loadApptSummary(false);				
	
	$('#refreshList').click(function refresh() {
		//this.throwAnError(); // for testing the error reporting
		consoleLog("Refresh appointment counts");
		loadApptSummary(true);
	});	

	//kick the offline-online check which will cause the queue mechanism if any entry is found there
	//on home.html not on login screen, as this can be interrupted by application cache update	
	checkOnlineStatus(true);	
});

// to handle params on list click from home page
$('div[id="home"] ul[id="apptsummarylist" data-role="listview"] a').live("click", function() {  
    var dataurl = $(this).attr("data-url");
    localStorage.apptType = dataurl; //dataurl.substring(dataurl.length-1); 
    logUserAction("Appointment count clicked");
});  

//to handle params on list click from appointment list
$('div[id="appts"] ul[data-role="listview"] a').live("click", function() {  
    var dataurl = $(this).attr("data-url");
    consoleLog("Appt id: "+dataurl);
    localStorage.setObject('currentAppointment',AppointmentController.getCurrentAppointment(dataurl));
    logUserAction("Appointment "+dataurl+" clicked");
});

//
// LOAD APPOINTMENTS LIST PAGE
//
//check if user has right, in pagebeforeshow, to avoid 'flicking' the button
$("#appts").live('pagebeforeshow', function(event, ui) {
	if(hasRight('CMA'))
	{
		$(this).find('#addAppointment').show();
	}else{
		$(this).find('#addAppointment').hide();
	}
});

$("#appts").live('pageshow', function(event, ui) {

	//jqm adds ui-btn-hover-c to a li element on scroll, but doesn't remove it
    $('#apptlist > li').unbind('vmouseout blur vmousecancel vmouseup');
    $('#apptlist > li').bind('vmouseout blur vmousecancel vmouseup', function(){
		$(this).removeClass('ui-btn-hover-c');
	});
	
	var force = false;
	if(sessionStorage.forceAppointmentListReload){
		//we have succefully refreshed counts on home page
		//so must refresh appointment list otherwise they can differ
		force = true;
		sessionStorage.removeItem('forceAppointmentListReload');
	}
	if(sessionStorage.newAppointmentId)
	{
		//check if we were redirected just after new appointment has been created
		//if so:
		//- show 'Not started' list (this only will work if we don't have an app in progress)
		//- highlight new appointment
		localStorage.apptListStatus = NOT_STARTED;
		loadApptList(true); //force appointment list reload
		var appId = sessionStorage.newAppointmentId;
		sessionStorage.removeItem('newAppointmentId');
		
		setTimeout(function(){
			var $elem = $('[href="appointment.html"][data-url=' + appId +  ']').parents('li');
			$elem.addClass('highlight');
			if($elem.offset() && $elem.offset().top)
			{
				$.mobile.silentScroll($elem.offset().top);
			}
			//highlight new appointment row
			setTimeout(function(){
				$elem.removeClass('highlight');
			}, 1000);
		}, 500);
	}else if (ui.prevPage.attr('id') != 'appointment')
	//if we came here NOT from the appointment details page
	{
		setApptTitle();	
		if (!localStorage.apptListStatus)
		{
			localStorage.apptListStatus = 2;
		}
		loadApptList(force);
	}else
	{
		setAppts(localStorage.apptListStatus);
	}

	
	$('#refreshList').click(function refresh() {
		consoleLog("Refresh appointment lists");
		// check that we have nothing in the queue or we could overwrite
		// something not yet sent to the server
		if (refreshSafe())
		{
			$('#status2 span span').removeClass('activeListButton');		
			$('#status3 span span').removeClass('activeListButton');
			$('#status4 span span').removeClass('activeListButton');		
			loadApptList(true);
		}
	    logUserAction("Refresh appointment lists");
	});	

	$('#status2 span span').text(getMessage('notStarted'));
	$('#status2').click(function refresh() {
		$('#status2 span span').removeClass('activeListButton');		
		$('#status3 span span').removeClass('activeListButton');
		$('#status4 span span').removeClass('activeListButton');		
		setAppts(NOT_STARTED);
	});	
	
	$('#status3 span span').text(getMessage('inProgress'));	
	$('#status3').click(function refresh() {
		$('#status2 span span').removeClass('activeListButton');
		$('#status3 span span').removeClass('activeListButton');
		$('#status4 span span').removeClass('activeListButton');	
		setAppts(IN_PROGRESS);
	});	
	
	$('#status4 span span').text(getMessage('completed'));
	$('#status4').click(function refresh() {
		$('#status2 span span').removeClass('activeListButton');
		$('#status3 span span').removeClass('activeListButton');
		$('#status4 span span').removeClass('activeListButton');
		setAppts(COMPLETE); // Completed - also 5 tested in function
	});	 

});

//
// LOAD APPOINTMENT DETAILS PAGE
//
$("div[id='appointment']").live('pageshow', function(event, ui) {
	consoleLog("Entering appointment page");
	displayAppointment();
});

//
//LOAD APPOINTMENT DESCRIPTION PAGE
//
$("div[id*='apptDesc']").live('pageshow', function(event, ui) {

	displayAppointmentDescription();
});

//
//LOAD APPOINTMENT ACTIVITIES PAGE
//
/**
 * Activities page contains a list of activates
 * both for appointment and the job.
 */ 
$("div[id='apptActivities']").live('pagebeforeshow', function(event, ui) {
	
	//initialise mvc
	var model = new $.ActivitiesPageModel();
    var view = new $.ActivitiesPageView();
    new $.ActivitiesPageController(model, view);
});

/**
 * Activity Edit page contains editable details of an activity.
 * 
 * What out pagebeforeshow is only triggered when you enter the page
 * but not when you navigate back to it
 */
$("div[id='activityEditPage']").live('pagebeforeshow', function(event, ui) {	
	//initialise mvc
	var model = new $.ActivityEditPageModel();
	var view = new $.ActivityEditPageView();
	new $.ActivityEditPageController(model, view);
});
//
//SERVICES PAGE
//
/**
* Service list page
*/ 
$("div[id='serviceList']").live('pagebeforeshow', function(event, ui) {
  //initialise mvc	
  var model = new $.ServicesPageModel();
  var view = new $.ServicesPageView();
  var controller = new $.ServicesPageController(model, view);
  console.log('mvc:initialised:'+ (new Date()).getTime());
});
//
//LIBRARY ACTIVITY LIST PAGE
//
/**
* Activities page contains a list of activates
* both for appointment and the job.
*/ 
$("div[id*='libraryActivitiesList']").live('pagebeforeshow', function(event, ui) {
	
	//initialise mvc
	var model = new $.LibraryActivitiesPageModel();
	var view = new $.LibraryActivitiesPageView();
	var controller = new $.LibraryActivitiesPageController(model, view);
});
//
//APPOINTMENT NOTES PAGE
//
/**
* Appointment notes page contains a notes for appointment
*/ 
$("div[id='appointmentNotes']").live('pageshow', function(event, ui) {
	
	//initialise mvc
	var model = new $.AppointmentNotesPageModel();
	var view = new $.AppointmentNotesPageView();
	new $.AppointmentNotesPageController(model, view);
});

//
//APPOINTMENT SIGNATURE SELECT PAGE
//
/**
* Page allows for signature type selection
*/ 
$("div[id='appointmentSigSelect']").live('pageshow', function(event, ui) {
	consoleLog("Entering appointmentSigSelect page");
	signatureSelect();
});
$('div[id="appointmentSigSelect"] ul[data-role="listview"] a').live("click", function() {  
    var dataurl = $(this).attr("data-url");
	consoleLog("Saving signature selection param: "+dataurl);
    localStorage.setObject('signatureSelect',dataurl);
});
//
//APPOINTMENT SIGNATURE PAGE
//
/**
* Page allows for signature input
*/ 
$("div[id='appointmentSignature']").live('pageshow', function(event, ui) {
	consoleLog("Entering signature page");
	
	$(window).bind('orientationchange', function(event) {
		logUserAction("orientationchange");
	    if ($('#signaturePad') !== undefined)
	    {
	    	console.log("Set orientation change for signature canvas");
	    	//setTimeout("clearSignature()", 500);  // hack for versions that fire event before orientation finished
	    }    	
	});
	
	var type = localStorage.getObject('signatureSelect');
	clearSignature();
	drawSignature(type);	

	$('#signatureTitle').text(getMessage('signature.type'+type,'')+" "+getMessage('signature.title'));
	$('#signatureTitle').trigger('refresh');
	
	//initialise mvc
	var model = new $.AppointmentSigPageModel();
	var view = new $.AppointmentSigPageView();
	new $.AppointmentSigPageController(model, view);
});
$("div[id='appointmentSignature']").live('pagehide', function(event, ui) {
	consoleLog("Leaving signature page");	
	$(window).unbind('orientationchange');
});

//
//APPOINTMENT PARTS PAGE
//
/**
* Appointment parts list
*/ 
$("div[id='appointmentParts']").live('pageshow', function(event, ui) {
	
	//initialise mvc
	var model = new $.AppointmentPartsPageModel();
	var view = new $.AppointmentPartsPageView();
	new $.AppointmentPartsPageController(model, view);
});

//
//APPOINTMENT EDIT PART PAGE
//
/**
* Appointment edit part
*/ 
$("div[id='appointmentEditPart']").live('pageshow', function(event, ui) {
	
	//initialise mvc
	var model = new $.AppointmentEditPartPageModel();
	var view = new $.AppointmentEditPartPageView();
	new $.AppointmentEditPartPageController(model, view);
});

//
// SURVEY LIST PAGE
//
$("div[id='surveyListPage']").live('pageshow', function(event, ui) {
	
	//initialise mvc
  var model = new $.SurveyListPageModel();
  var view = new $.SurveyListPageView();
  var controller = new $.SurveyListPageController(model, view);
});
//
//ASSET TYPE LIST PAGE
//
$("div[id='assetTypeListPage']").live('pageshow', function(event, ui) {
	
	//initialise mvc
  var model = new $.AssetTypeListPageModel();
  var view = new $.AssetTypeListPageView();
  var controller = new $.AssetTypeListPageController(model, view);
});

//
// ASSET MANUFACTURER LIST PAGE
//
$("div[id='assetManufacturerListPage']").live('pageshow', function(event, ui) {
	
  //initialise mvc
  var model = new $.AssetManufacturerListPageModel();
  var view = new $.AssetManufacturerListPageView();
  var controller = new $.AssetManufacturerListPageController(model, view);
});

//
// ADD ASSET PAGE
//
$("div[id='addAssetPage']").live('pageshow', function(event, ui) {
	//initialise mvc
	var model = new $.AddAssetPageModel();
	var view = new $.AddAssetPageView();
	var controller = new $.AddAssetPageController(model, view);
});

// NEW ASSET MODEL dialog/page
$("div[id='newAssetLocationPage']").live('pageshow', function(event, ui) {
	//initialise mvc
	var model = new $.NewAssetLocationPageModel();
	var view = new $.NewAssetLocationPageView();
	new $.NewAssetLocationPageController(model, view);
});

// NEW ASSET LOCATION dialog/page
$("div[id='newAssetModelPage']").live('pageshow', function(event, ui) {
	//initialise mvc
	var model = new $.NewAssetModelPageModel();
	var view = new $.NewAssetModelPageView();
	new $.NewAssetModelPageController(model, view);
});

//
// SURVEY PAGE
//
$("div[id='survey']").live('pageshow', function(event, ui) {
	//initialise mvc
	consoleLog("Loading survey page");
	var model = new $.SurveyPageModel();
	var view = new $.SurveyPageView();
	var controller = new $.SurveyPageController(model, view);
});

//
//SURVEY ATTRIBUTES PAGE
//
$("div[id='surveyAttributePage']").live('pageshow', function(event, ui) {
	//initialise mvc
	consoleLog("Loading survey attributes MVC for survey");
	var model = new $.SurveyAttributePageModel();
	var view = new $.SurveyAttributePageView();
	var controller = new $.SurveyAttributePageController(model, view);
	var $surveyAttributePage = $(this);
	
	// these should be in the model but don't seem to work there
	/*
	$('.ui-slider').bind('click', function() {
		  // a bit of a hack as clicking on the slider gives an error and causes a logout
		  // we need to fix the underlying event handling that causes it
		  //consoleLog('User clicked on "slider"');
		  event.preventDefault();
		  return false;
	});
	*/
	
	$('input[type="radio"]', $surveyAttributePage).bind('change', function() {
		console.log("Radio button change");
		var attributeId = $(this).parents('[id*=attribute]').attr('id');
		var newval = $(this).val();
		console.log("Attribute "+attributeId+" changed to "+newval);	
		logUserAction("Attribute select changed "+attributeId);
		$('#'+attributeId).val(newval);
		//console.log("saved val "+$('#'+attributeId).val());
		view.validate(attributeId);
		//console.log("After validate");
		//event.preventDefault();
		//return false;
	});	
	
	$('select').bind('change', function() {
		var attributeId = $(this).attr('id');
		if (attributeId == undefined)
		{
			attributeId = $(this).parent().attr('id');
		}
		//consoleLog("Attribute select changed "+attributeId);
		logUserAction("Attribute select changed "+attributeId);
		view.validate(attributeId);
	});		

	$('input[type!="radio"]').bind('change', function() {
		  //consoleLog("Attribute input changed "+$(this).attr('id'));
		  logUserAction("Attribute input changed "+$(this).attr('id'));
		  view.validate($(this).attr('id'));		  
	});	
});

//
// SURVEY ASSETS
//
$("div[id='surveyAssetsPage']").live('pageshow', function(event, ui) {
	//initialise mvc
	//consoleLog("Loading survey assets MVC for survey");
	var model = new $.SurveyAssetPageModel();
	var view = new $.SurveyAssetPageView();
	var controller = new $.SurveyAssetPageController(model, view);
	var $surveyAssetsPage = $(this);
	
	$('select', $surveyAssetsPage).bind('change', function() {
		var id = $(this).attr('id');
		if (id == undefined)
		{
			id = $(this).parent().attr('id');
		}
		var val = $('#'+id).val();
		//consoleLog("Asset select changed "+id+"="+val);
		logUserAction("Asset select changed "+id+"="+val);
		view.saveAssetChange(id,val);
	});		

	$("input", $surveyAssetsPage).bind('change', function() {
		var id = $(this).attr('id');
		var val = $('#'+id).val();
		//consoleLog("Asset ref changed = "+val);
		logUserAction("Asset ref changed = "+val);
		view.saveAssetChange(id,val);
	});		
});

$("div[id='removeAssetSelect']").live('pageshow', function(event, ui) {
	$('#stockRemove').click(function(event, ui){
		//consoleLog("Remove asset to stock");
		logUserAction("Remove asset to stock");
		removeAsset(true);
		removeAssetRemote(true);
		window.history.go(-2);
	});
	$('#fullRemove').click(function(event, ui){
		//consoleLog("Remove asset completely");
		logUserAction("Remove asset completely");
		removeAsset(false);
		removeAssetRemote(false);
		window.history.go(-2);
	});	
});

$("div[id='restoreAssetLocation']").live('pageshow', function(event, ui) {
	
	// build location select list
	var locations = sessionStorage.getObject('siteSurveyAssetLocations');
	var locationList = $('#locationList');
	locationList.empty();
	var rowData = new Array();
	for (var x=0;x<locations.length;x++)
	{
		var selected = (x==0) ?'selected':'noselect';
		var data = {"id":locations[x].id,"name":locations[x].name,"index":x, "selected":selected};
		rowData.push(data);
	}
	var options = {"options":rowData};
	var html = ich.assetLocation(options);
	locationList.append(html);
	locationList.listview('refresh');
	locationList.trigger('create');
	
	$('#ok').click(function(event, ui){		
		var index = $('#locationSelect')[0].selectedIndex;
		var value = $('#locationId_'+index);
		//consoleLog("restoreAssetLocation "+index+" "+value.val());
		logUserAction("restoreAssetLocation "+index+" "+value.val());
		sessionStorage.restoreLocationId = value.val();
		var siteSurveyId = sessionStorage.siteSurveyId;
		var assetId = sessionStorage.siteSurveyAssetId;
		restoreAsset(siteSurveyId,assetId,value.val());
		restoreAssetRemote(siteSurveyId,assetId,value.val());
	});
});

//
// ASSET ATTRIBUTES
//
$("div[id='surveyAssetAttributePage']").live('pageshow', function(event, ui) {
	//initialise mvc
	consoleLog("Loading survey assets MVC for survey");
	var model = new $.AssetAttributePageModel();
	var view = new $.AssetAttributePageView();
	var controller = new $.AssetAttributePageController(model, view);
	var $surveyAssetAttributePage = $(this);
	
	// these should be in the model but don't seem to work there
	/*
	$('.ui-slider', $surveyAssetAttributePage).bind('click', function() {
		  // a bit of a hack as clicking on the slider gives an error and causes a logout
		  // we need to fix the underlying event handling that causes it
		  //consoleLog('User clicked on "slider"');
		  event.preventDefault();
		  return false;
	});
	*/
	
	$('input[type="radio"]', $surveyAssetAttributePage).bind('change', function() {
		console.log("Radio button change");
		var attributeId = $(this).parents('[id*=asset_attribute]').attr('id');
		var newval = $(this).val();
		console.log("Attribute "+attributeId+" changed to "+newval);	
		logUserAction("Attribute select changed "+attributeId);
		$('#'+attributeId).val(newval);
		//console.log("saved val "+$('#'+attributeId).val());
		view.validate(attributeId,'asset_');
		//console.log("After validate");
		//event.preventDefault();
		//return false;
	});	
	
	$('select', $surveyAssetAttributePage).bind('change', function() {
		var attributeId = $(this).attr('id');
		if (attributeId == undefined)
		{
			attributeId = $(this).parent().attr('id');
		}
		//consoleLog("Attribute select changed "+attributeId);	
		logUserAction("Attribute select changed "+attributeId);
		view.validate(attributeId,'asset_');
	});		

	$('input[type!="radio"]', $surveyAssetAttributePage).bind('change', function() {
		  //consoleLog("Attribute input changed "+$(this).attr('id'));
		  logUserAction("Attribute input changed "+$(this).attr('id'));
		  view.validate($(this).attr('id'),'asset_');		  
	});		
});
/**
* Activities page contains a list of activates
* both for appointment and the job.
*/ 
$("div[id='searchJobPage']").live('pageshow', function(event, ui) {
	
	//initialise mvc
	var model = new $.SearchJobPageModel();
	var view = new $.SearchJobPageView();
	var controller = new $.SearchJobPageController(model, view);
});
//
//TOOLS PAGE
//
$("div[id='toolsPage']").live('pageshow', function(event, ui) {
	var model = new $.ToolsPageModel();
	var view = new $.ToolsPageView();
	new $.ToolsPageController(model, view);
});

//
//IMAGE PAGE
//
$("div[id='imagePage']").live('pageshow', function(event, ui) {
	var model = new $.ImagePageModel();
	console.log("Model: "+model);
	var view = new $.ImagePageView();
	console.log("View: "+view);
	new $.ImagePageController(model, view);
});

//
// POSTCODE MAP
//
$("div[id='postcodeMap']").live('pageshow', function(event, ui) {
	var model = new $.PostcodeMapPageModel();
	var view = new $.PostcodeMapPageView();
	var controller = new $.PostcodeMapPageController(model, view);
});

/**
* Service list page
*/ 
$("div[id='partServiceList']").live('pagebeforeshow', function(event, ui) {
  //initialise mvc	
  var model = new $.PartServiceListPageModel();
  var view = new $.PartServiceListPageView();
  var controller = new $.PartServiceListPageController(model, view);
});

$("div[id='partCategoryList']").live('pagebeforeshow', function(event, ui) {
	  //initialise mvc	
	  var model = new $.PartCategoryListPageModel();
	  var view = new $.PartCategoryListPageView();
	  var controller = new $.PartCategoryListPageController(model, view);
});

$("div[id='storePartListPage']").live('pagebeforeshow', function(event, ui) {
	  //initialise mvc	
	  var model = new $.StorePartListPageModel();
	  var view = new $.StorePartListPageView();
	  var controller = new $.StorePartListPageController(model, view);
});

$("div[id='addPartPage']").live('pagebeforeshow', function(event, ui) {
	  //initialise mvc	
	  var model = new $.AddPartPageModel();
	  var view = new $.AddPartPageView();
	  var controller = new $.AddPartPageController(model, view);
});


//Clear up after page gets hidden
$('[data-role=page],[data-role=dialog]').live("pagehide", function(){
	//unbind all binded events (click, change etc)
	$('*', this).unbind();
});

// ------------------------------------------------------------------------------------------


//
// background db updaters
//
/*
var sorWorker = new Worker('../js/mobile/db-loader.js');
sorWorker.onmessage = function(event) {
	var d = event.data;
	if (d)
	{
		var data = jQuery.parseJSON(d);
		bulkInsertSOR(data);
	}
};
*/

//------------------------------------------------------------------------------------------

// LOGIN
function doLogin(user,pass){

	  var loginUrl = localStorage.ctx+escape("/rest/auth/loginMobile");
	  var result = false;
	  var $auth = $("#auth");
	  $auth.addClass('login-auth').removeClass("login-fail");
	  $auth.text(getMessage('authmsg'));
	  $('#loginButton').addClass('ui-disabled');
	  
	  // Do the ajax call
	  showLoadingMessage(getMessage("loader.login","Logging in..."));
	  
	  $.ajax({
		url: loginUrl,
		async: true,
		cache: false,
		//headers: getHeaders(user, pass, 'OS-REST-AUTH-TOKEN',""),
		headers: getHeaders(user, pass, 'DUMMY-AUTH-TOKEN',""), // force password use
		dataType: 'json',
		statusCode: {
    		401: function() {
      			onFailedLogin(getMessage('loginfail'));
    		}
  		},
  		timeout:loginTimeout,
		// Callback (onsuccess)
		success: function(resp, status, req){
		  var response = resp;
		  // successful login
		  if (response && response['userid'] > 0)
		  {
			  //OSD-1152 - processing below can fail with parseerror
			  try {
				consoleLog('login ok');
				$auth.text("Signing in, please wait");
				// store the successful user/pass as a user object
				var resource = new Resource(response['userid'], response['firstName'] + " " + response['lastName']);
				resource.setUser(user);
				resource.setPass(pass);
				resource.setClient(response['clientname']);
				resource.setSupplier(response['suppliername']);			
				resource.setResourceId(response['resourceid']);
				resource.setGps(response['gps']);
				resource.setOffline(response['offline']);
				resource.setContext(localStorage.ctx);
				resource.setRights(response['rights']);
				resource.setClientGroup(response['clientGroup']);
				//if (response['storeid'])
				//{
					resource.setStoreId(response['storeid']);
				//}
				localStorage.setObject('resource',resource);
				// don't user setObject here as it is an array
				localStorage.clientParams = response['clientParams'];
				
				// uncomment below to start sending of GPS data
				if (response['gps'] == 'true')
				{
					localStorage.gps = 'true';
					var params = {enableHighAccuracy:true, maximumAge:300000, timeout:30000};
					var watchID = navigator.geolocation.watchPosition(function(position) {  
						  setGpsLocation(position.coords.latitude, position.coords.longitude);  
						},null,params);  
				}
	
				// store session cookie
				setCookie(COOKIE_NAME,'res-'+response['resourceid'],24);  // 24 hours			
				
	 			// store new object autocode prefix
				setAutocode();
				
				// save version info
				consoleLog("Setting app version: "+$('label#appversion').text());
				localStorage.version = $('label#appversion').text();		
				
				// set session timeout value and store last page change time
				localStorage.timeout = 24 * 3600;  // 24 hours (parameterise?)
				localStorage.lastTimestamp = new Date().getTime();  // avoid double login 
				
				onAfterLogin();			
				
				hideLoadingMessage(); // hide before we redirect
				
				// go to homepage
				consoleLog('redirect to home.html');
				$.mobile.changePage( "home.html", { showLoadMsg: true } );		
				result = true;			

				$auth.removeClass('login-auth').removeClass('login-fail');
				$auth.text("");
				$('#loginButton').removeClass('ui-disabled');
			  }catch(e){
				  console.error(e);
				  logAjaxError(e);
				  clearOnLogout(); //clear all data and try again
				  onFailedLogin(getMessage('login-unexpectedError'));
			  }
		  }
		  else
		  {
			  onFailedLogin(getMessage('loginfail'));
		  }
		},
		// Error handler
		error: function(req, status, err){
			var msg = getMessage('timeout');
			if (err && err != '' && err != 'timeout')
			{
				msg = err; 
			}		
			onFailedLogin(msg);
			consoleLog("Error logging in: "+status+","+err+","+msg);
			logAjaxError(err);
		}
	  });
	  return result;
}			
function onFailedLogin(msg) {
	$("#auth").addClass("login-fail").removeClass("login-auth");
	$('#loginButton').removeClass('ui-disabled');
	$("#auth").text(msg);
	hideLoadingMessage();
}

// APPOINTMENT SUMMARY COUNT
function loadApptSummary(forceRefresh){

	  var res = localStorage.getObject('resource');
	  var PDHAP = getClientParam('PDHAP'); // PDHAP param def= 4 days
	  var PDFAP = getClientParam('PDFAP'); // PDFAP param def= 4 days
	  var now = new Date();
	  var future = new Date(now.getTime()+(PDFAP*86400000));
	  var historic = new Date(now.getTime()-(PDHAP*86400000));
	  var startDate = historic.getDate() + "-" + (historic.getMonth()+1) + "-" + historic.getFullYear();	
	  var endDate = future.getDate() + "-" + (future.getMonth()+1) + "-" + future.getFullYear();	  
	  var statusList = "2,3,4,5"; // include complete
	  //var statusList = "2,3" // exclude complete;
	  var resourceId = res.resourceId;
	  var apptSummaryUrl = localStorage.ctx+escape("/rest/rs/resource/"+resourceId+"/appointmentCount/"+startDate+"/"+endDate+"/"+statusList);
	  var result = false;

	  if (localStorage.apptsummary == null || forceRefresh)
	  {
		  //$.mobile.showPageLoadingMsg();
		  showLoadingMessage(getMessage("loader.appointment.count","Getting appointment counts"));
		  
		  // Do the ajax call
		  $.ajax({
			url: apptSummaryUrl,
			headers: getHeaders(res.user, res.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
			dataType: 'json',
	  		timeout:apptTimeout,
			// Callback (onsuccess)			
			success: function(resp, status, req){
			  //resp = getResponseObject(resp);
			  localStorage.apptsummary = JSON.stringify(resp);			
			  setApptsSummary();
			  hideLoadingMessage();
			  
			  //we have succefully refreshed counts on home page
			  //so must refresh appointment list otherwise they can differ
			  sessionStorage.forceAppointmentListReload = true;
			},
			// Error handler
			error: function(req, status, err){
				consoleLog("Error downloading appointment summary: "+err);
				processGetRequestError(req, status, err);
				hideLoadingMessage();
			}
		  });		  
	  }
	  else
	  {
		setApptsSummary();
	  }
	  
}

// populate the summary list view and then refresh it
function setApptsSummary() {
	  var data = jQuery.parseJSON(localStorage.apptsummary);
	  
	  // needed for the conditional check in the template
	  var row1 = {'label':getMessage('myappts'), 'image':'images/myappts.png', 'incCount':data['resourceApptIncompleteCount'],'count':data['resourceApptCount'], 'type': '1', 'link':true};
	  var row2 = {'label':getMessage('teamappts'), 'image':'images/teamappts.png',  'incCount':data['teamApptIncompleteCount'],'count':data['teamApptCount'], 'type': '2', 'link':true};
	  var row3 = {'label':getMessage('alerts'), 'image':'images/alerts-red.png', 'count':data['alertCount'], 'type': '3', 'link':true};
	  
	  // change the conditional flag if no link required
	  if (data['resourceApptCount'] == 0)
	  {
		  row1.link = true;
	  }
	  if (data['teamApptCount'] == 0)
	  {
		  row2.link = false;
	  }
	  if (data['alertCount'] == 0)
	  {
		  row3.link = false;
	  }	  

	  
	  // add each row via the template
	  var asl = $('#apptsummarylist');
	  //make sure that the home page is shown
	  if(asl.length > 0)
	  {
		  asl.empty();
		  var homeListHtml = ich.homeList(row1);
		  asl.append(homeListHtml);
		  // disable the Team Appoints and Alerts for now
		  /*
		  homeListHtml = ich.homeList(row2);
		  asl.append(homeListHtml);
		  homeListHtml = ich.homeList(row3);
		  asl.append(homeListHtml);
		  */
		  if(hasRight('PARMO')){
			  var myparts = ich.myPartLink();
			  asl.append(myparts);
		  }
		  
		  asl.listview('refresh');
	  }
  }

// APPOINTMENT LIST
function setApptTitle() {
	if (localStorage.apptType == 1)
	{
		$('#appsPageTitle').text(getMessage('myappts'));
	}
	else if (localStorage.apptType == 2)
	{
		$('#appsPageTitle').text(getMessage('teamappts'));		
	}
	else
	{
		$('#appsPageTitle').text(getMessage('alerts'));		
	}
}

function downloadSurveys(appList){
	consoleLog("Downloading surveys");
	var jobRefs = new Array();
	//var bailout = 0; // DEV	
	
	for(var index in appList){
		//if (bailout++ > 2) break; // DEV
		var hasSurveys = appList[index].jobHasSurveys;
		if(hasSurveys != false && hasSurveys != 'false' && $.inArray(appList[index].jobRef,jobRefs) == -1){
			jobRefs.push(appList[index].jobRef);
		}
	}
	consoleLog("Jobs with survey: " + jobRefs.length);
	var message = getMessage("loader.surveys.list","Getting {0} surveys");
	message = message.replace(/\{0\}/g,jobRefs.length);
	//message = message.replace('0',jobRefs.length);
	showLoadingMessage(message);
	
	// save list of jobs for later appointment up-to-date check
	localStorage.setObject("jobs",jobRefs);
	
	if(jobRefs.length > 0) 
	{
		var dataProvider = new $.SurveyDetailsRemoteDataProvider();
		dataProvider.onError = function() {
			alert(getMessage('survey.download.error','Error downloading survey details, survey functionality will be impaired'));
		};
		
		dataProvider.downloadFullData(false, jobRefs, apptTimeout); // including templates
		
		/*
		//find all unique template ids
		var surveyTemplateIdList = new $.SurveyDetailsDao().getUniqueTemplateIds();
		
		dataProvider = new $.SurveyTemplateRemoteDataProvider();
		dataProvider.onError = function() {
			alert('Error downloading survey templates');
		};
		dataProvider.downloadData(false, surveyTemplateIdList, apptTimeout);
		*/
		
	}
	// update local status for any added assets (moved from dao method so only done once)
	updateLocalSurveyStatus();
	
	consoleLog("Downloading surveys - done");
}

function loadApptList(forceRefresh, updateCurrentAppointment, callback){				  

	var res = localStorage.getObject('resource');
	var PDHAP = getClientParam('PDHAP'); // PDHAP param def= 4 days
	var PDFAP = getClientParam('PDFAP'); // PDFAP param def= 4 days
	var now = new Date();
	var future = new Date(now.getTime()+(PDFAP*86400000));
	var historic = new Date(now.getTime()-(PDHAP*86400000));
	var startDate = historic.getDate() + "-" + (historic.getMonth()+1) + "-" + historic.getFullYear();	
	var endDate = future.getDate() + "-" + (future.getMonth()+1) + "-" + future.getFullYear();	  
	var resourceId = res.resourceId;
	  
	var apptListUrl = escape(localStorage.ctx+"/rest/rs/resource/"+resourceId+"/appointments/"+startDate+"/"+endDate);	
	var result = false;
	var res = jQuery.parseJSON(localStorage.resource);

	if (localStorage.apptList == null || forceRefresh || localStorage.apptType != localStorage.lastApptType)
	{
		  localStorage.lastApptType = localStorage.apptType;
		  if (forceRefresh == true || localStorage.apptList == null)
		  {
				showLoadingMessage(getMessage("loader.appointment.list","Getting appointments and surveys"));
				$('#refreshList').parent().addClass('ui-disabled');
				$('#backButton').addClass('ui-disabled');
		  }
			  
		  // Do the ajax call
		  $.ajax({
			url: apptListUrl,
			headers: getHeaders(res.user, res.pass, 'OS-REST-AUTH-TOKEN',getGpsLocation()),
			dataType: 'json',
	  		timeout:apptTimeout,
			// Callback (onsuccess)
			success: function(resp, status, req){
			  //resp = getResponseObject(resp);
			  ApptListController.storeLists(resp);
			  
			  downloadSurveys(resp.appointments);
			  // OSD-1473 see if the download still has any appointment we think is 'in progress' on the mobile
			  // eg. job cancelled in UI can stop the download of an appt we are working on
			  if (!ApptListController.checkForRemovedAppointment())
			  {
				  hideLoadingMessage();
				  
				  alert(getMessage("appointment.noLongerExists","Current appointment no longer found in the refreshed data. You will be returned to the appointment list."));
				  
				  // stop the work state if required
				  var currAppt = localStorage.getObject('currentAppointment');	
				  if (currAppt.workState > 0)
				  {
					  AppointmentController.appStateChange(currAppt.workState,'stop');
					  console.log("Appt "+localStorage.apptActive+" state changed and settings cleared");
				  }
				  
				  // go to list page if not refreshed from there
				  var currentPage = ($.mobile.activePage != undefined) ? $.mobile.activePage.attr('id'):"";
				  if (currentPage != 'appts')
				  {
					  $.mobile.changePage( "appointmentList.html", { showLoadMsg: true, transition: "slide", reverse: true } );
				  }

			  }	
			  
			  
			  // do we have any In Progress
			  if (ApptListController.checkForInProgress())
			  {				  
				  localStorage.apptListStatus = IN_PROGRESS;
			  }
			  setAppts(localStorage.apptListStatus);
			  if(updateCurrentAppointment){
				  //update current appointment if set
				  if(localStorage.getObject('currentAppointment')){
					  var appointment = AppointmentController.getCurrentAppointment(AppointmentController.getAppointment().id);
					  AppointmentController.setAppointment(appointment);
					  AppointmentController.save();
					  
					  if(callback){						  
						  callback();
					  }
				  }				  
			  }			  
			  hideLoadingMessage();
			  $('#refreshList').parent().removeClass('ui-disabled');
			  $('#backButton').removeClass('ui-disabled');
			  localStorage.setObject('apptListUpdated', new Date().getTime());
			},
			// Error handler
			error: function(req, status, err){
				hideLoadingMessage();
				processGetRequestError(req, status, err);
				$('#refreshList').parent().removeClass('ui-disabled');
				$('#backButton').removeClass('ui-disabled');	
			}
		  });		  
	}
	else
	{
		setAppts(localStorage.apptListStatus);
	}	
}

function setAppts(status) {
	  $('.activeListButton').removeClass('activeListButton');
	  $('#status'+status+' span span').addClass('activeListButton');
	  
	  //var lidata = "";
	  var rows = new Array();
		
	  // get the correct list
	  var appts = ApptListController.getActiveList();
	  // display job status
	  displayStatusHeader();
	  
	  // loop through list
	  localStorage.apptListStatus = status; // set the stored value for if/when we return from an appointment
	  consoleLog("List status: "+status);
	  for (var x=0;x<appts.length;x++)
	  {		  
		// only show selected list status def=Not started
		if (status == NOT_STARTED && appts[x].statusId != APPT_NOT_STARTED)
			continue;		  
		if (status == IN_PROGRESS && appts[x].statusId != APPT_IN_PROGRESS)
			continue;
		if (status == COMPLETE && appts[x].statusId != APPT_COMPLETE && appts[x].statusId != APPT_COST_COMPLETE)
			continue;	

		// change colours etc
		var workStateClass = '';
		var workTimeTypeDao = new $.WorkTimeTypeDao(); 
		var workType = workTimeTypeDao.findById(appts[x].workState);
		if(workType){
			workStateClass = getWorkTypeClass(workType);
		}		

		var appointmentDateClass = getDateClass(appts[x].statusId, appts[x].plannedStartDate, appts[x].plannedEndDate,
				appts[x].actualStartDate, appts[x].actualEndDate);
	
		var address1 = getAddressForList1Line(appts[x].workLog,', ');
		var address2 = getAddressForList2Line(appts[x].workLog,', ');

		var plannedStartDate 	= getShortDate(appts[x].plannedStartDate);		
		var plannedStartTime 	= getShortTime(appts[x].plannedStartDate);
		var plannedEndTime 		= getShortTime(appts[x].plannedEndDate);
		
		var actualStartDate = getShortDate(appts[x].actualStartDate);
		var actualStartTime = getShortTime(appts[x].actualStartDate);
		var actualEndTime 	= getShortTime(appts[x].actualEndDate);
		
		//set contact to display
		var apptContact = getContactForAppointment(appts[x]);

		var jobClient = appts[x].workLog.client;
		var jobClientRef = appts[x].jobClientRef;
		if(appts[x].jobRef == jobClientRef){
			jobClientRef = '';
		}
		// data for template
		var rowData = {'appointmentClass':appointmentDateClass + ' ' + workStateClass,
						'apptId':appts[x].id,
						'apptServiceIcon':'images/'+appts[x].service.icon,
						'apptJobRef':appts[x].jobRef,
						'apptResName':appts[x].resource.name,
						'apptContact':apptContact,
						'apptAddress1':address1,
						'apptAddress2':address2,
						'apptPlannedStartTime':plannedStartTime,
						'apptPlannedEndTime':plannedEndTime,
						'apptPlannedStartDate':plannedStartDate,
						'apptActualStartTime':actualStartTime,
						'apptActualEndTime':actualEndTime,
						'apptActualStartDate':actualStartDate,
						'apptJobClientRef':jobClientRef,
						'apptJobClient':jobClient
						};
		rows.push(rowData);
	  }
	  
	  //consoleLog(ich);
	  var apptList = $('#apptlist');
	  //this function can be called from diff screen so refresh the apptList only if found
	  if(apptList.length){
		  apptList.empty();
		  if (rows.length > 0)
		  {
			  apptList.empty();
			  for(var i in rows)
			  {
					var html = ich.apptList(rows[i]);
					apptList.append(html);
			  }
		  }
		  else
		  {
			  apptList.append('<li>'+getMessage('noAppts')+'</li>');
		  }
		  apptList.listview('refresh');
	  }
	  
}

//
// APPOINTMENT DETAILS
//
function displayAppointment() {

	  var lidata = "";
	  // load up current appointment
	  var currAppt = localStorage.getObject('currentAppointment');	  
	  AppointmentController.setAppointment(currAppt);
	  $('#aPageTitle').text(currAppt.jobRef);
	  
	  var plannedStartDate 	= getShortDate(currAppt.plannedStartDate);		
	  var plannedStartTime 	= getShortTime(currAppt.plannedStartDate);
	  var plannedEndTime 		= getShortTime(currAppt.plannedEndDate);
		
	  var actualStartDate = getShortDate(currAppt.actualStartDate);
	  var actualStartTime = getShortTime(currAppt.actualStartDate);
	  var actualEndTime 	= getShortTime(currAppt.actualEndDate);
	  
	  //var workStateClass = "workTypeTime" + currAppt.workState;	
	  var status = localStorage.apptListStatus;
	  
	  var appointmentDateClass = getDateClass(currAppt.statusId, currAppt.plannedStartDate, currAppt.plannedEndDate,
			  currAppt.actualStartDate, currAppt.actualEndDate);

	  var hasConsiderations = currAppt.considerations ? $.trim(currAppt.considerations) != "" : false;
	  var warningClass = hasConsiderations ? ' warning' : '';
	  
	  var workTimeTypeDao = new $.WorkTimeTypeDao(); 
	  var workState = workTimeTypeDao.findById(currAppt.workState);	  
	  
	  var workStateName = workState == null ? '' : workState.name;
	  var apptContact = getContactForAppointment(currAppt);
	  var jobClient = currAppt.workLog.client;
		
	  // data for template
	  var rowData = {	'appointmentClass':appointmentDateClass + warningClass,
						'apptId':currAppt.id,
						'apptServiceIcon':'images/'+currAppt.service.icon,
						'apptServiceDesc':currAppt.service.description,
						'apptJobRef':currAppt.jobRef,
						'apptContact':apptContact,
						'apptAddress1':currAppt.workLog.address1,
						'apptAddress2':currAppt.workLog.address2,
						'apptAddress3':currAppt.workLog.address3,
						'apptAddress4':currAppt.workLog.address4,
						'apptPostcode':currAppt.workLog.postCode,
						'apptPlannedStartTime':plannedStartTime,
						'apptPlannedEndTime':plannedEndTime,
						'apptPlannedStartDate':plannedStartDate,
						'apptActualStartTime':actualStartTime,
						'apptActualEndTime':actualEndTime,
						'apptActualStartDate':actualStartDate,
						'contactNo':currAppt.workLog.contact1,
						'jobClientRef':currAppt.jobClientRef,
						'jobDescription':currAppt.jobDescription,
						'hasConsiderations': hasConsiderations,
						'workState': workStateName,
						'jobClient':jobClient
						};
		
	  	// add each row via the template
	  	var appt = $('#appt');
	  	appt.empty();
	  	var apptHtml = ich.appointment(rowData);
	  	appt.append(apptHtml);

	    // enable/disable Parts mgmt
	  	if (!hasRight("PARMO"))
	  	{
	  		// make sure the button isn't displayed
	  		//console.log("No PARMO");
	  		$('#partsDiv').hide();
	  	}
	  	else
	  	{
	  		// set the button grid to five rather than four buttons
	  		//console.log("PARMO");
	  		$('#apptButtonDiv').removeClass('ui-grid-c').addClass('ui-grid-d');
	  	}
	  	
		// dynamic display of buttons
	  	var additionalApptDiv = $('#additionalApptDiv').hide();
	    var apptButtons = $('#apptButtons', appt).empty();
	    var apptCompleteContainer = $('#apptComplete', appt).hide().empty();
		$('.apptChange').hide();
			 
		var apptActive = localStorage.apptActive;
		var activitiesComplete = AppointmentController.checkActivitiesComplete();
		var surveyCountObj = AppointmentController.getSurveyStatusObjectCount();
		
		// - just to make sure
		var surveysComplete = surveyCountObj.completedCount >= surveyCountObj.totalCount;
		var signaturesComplete = areSignaturesComplete(currAppt);
		var apptComplete = currAppt.statusId == APPT_COMPLETE || currAppt.statusId == APPT_COST_COMPLETE;

		//
		//create appointment related buttons - 'start working', pause etc
		//
		
		//only if active appointment is the currently open one
		if(currAppt.id == apptActive){
			if (imageUploadedIfRequired(currAppt))
			{
				createCompleteButton(apptCompleteContainer, currAppt, activitiesComplete, surveysComplete, signaturesComplete);
			}
			createPauseButton(apptButtons, currAppt, apptComplete);
		}
		//start buttons only if active appointment is the currently open or there is no active appt
		if(currAppt.id == apptActive || apptActive == 0){
			createStartApptButtons(apptButtons, currAppt, apptComplete, apptActive);
		}
		if(currAppt.id == apptActive){
			createAdditionalApptButtons(additionalApptDiv, currAppt, apptComplete);
		}
		
		// show activity count
		var actCountObj = AppointmentController.incompleteActivityCount();
		var activityLinkText = $('#activityLink > span > span.ui-btn-text');
		activityLinkText.text(actCountObj.completedCount + ' / ' + (actCountObj.incompletedCount + actCountObj.completedCount));

		//show survey count
		var surveyLink = $('#surveyLink');
		var surveyLinkText = $('.ui-btn-text', surveyLink);
		surveyLinkText.text(surveyCountObj.completedCount + ' / ' + surveyCountObj.totalCount);
		if(surveyCountObj.totalCount > 0 && currAppt.statusId == APPT_IN_PROGRESS && currAppt.workState != IDLE){
			surveyLink.parent().removeClass('ui-disabled');
		}
		else
		{
			surveyLink.parent().addClass('ui-disabled');
		}


		$('#refresh').click(function refresh() {
			consoleLog("Refresh appointment counts");
			if (refreshSafe())
			{
				loadApptList(true, true, displayAppointment);
			}
		});	
		
		// display job status
		displayStatusHeader();
		var pageId = $.mobile.activePage.attr('id');
		displayOpenJobHeader(pageId);		
		
		// check for signature requirements
		if (currAppt.statusId == APPT_IN_PROGRESS && currAppt.workState != IDLE && isSignatureRequired(currAppt))
		{
			consoleLog("Enable signature button");
			$('#sigButton').parent().removeClass('ui-disabled');
			if (sigCount(currAppt) == 1)
			{
				// ignore selection page if we only need one
				$('#sigButton').attr('href','signature.html');
				var type = (currAppt.reqCustomerSig == 'true') ? 1:0;
				$('#sigButton').attr('data-url',type);
				localStorage.setObject('signatureSelect',type);				
			}
		}
		else
		{
			$('#sigButton').parent().addClass('ui-disabled');
		}
		var sigLinkText = $('#sigButton > span > span.ui-btn-text');			
		sigLinkText.text(sigCompleted(currAppt) + ' / ' + sigCount(currAppt));
		
		// do we enable the image upload
		if (!apptComplete && hasImageUploadSupport())

		{
			var imageLink = $('#imageLink');
			// change the images based on optional, mandatory, uploaded or not
			if (imageRequired())
			{
				if (currAppt.imageUploaded == true)
					$('#imageSrc').attr("src","images/camera-mand-done.png");
				else
					$('#imageSrc').attr("src","images/camera-mand.png");
			}
			else
			{				
				$('#imageSrc').attr("src","images/camera.png");
			}
			imageLink.show();
		}
		//disable all 'appt' related header buttons apart of surveys if appointment
		//requires survey to be completed before work starts
		if(currAppt.id == apptActive){
			var surveyCompleteRequired = needsToCompleteSurveyBeforeAnyWork(currAppt, apptComplete, surveysComplete);
			if(surveyCompleteRequired){
				$('#surveyButtonContainer')
										.removeClass('ui-disabled')
										.addClass('beforeWorkSurveyRequired')
										.siblings('div').addClass('ui-disabled');
			}
		}
}

function needsToCompleteSurveyBeforeAnyWork(currAppt, apptComplete, suveysComplete)
{
	//check we we need to complete surveys before work, 
	if(!apptComplete || !surveysComplete){
		var surveyDetailsDao = new $.SurveyDetailsDao();
		return surveyDetailsDao.hasUncompletedSurveyWithCompletionStage(currAppt, SurveyCompletetionStage.BEFORE_WORKS_STARTS);			
	}
	return false;
}

function createCompleteButton($buttonContainer, currentAppt, activitiesComplete, surveysComplete, signaturesComplete)
{
	// 'Work Complete' button
	if (currentAppt.workState != IDLE && signaturesComplete)
	{	
		if (currentAppt.requireCompletionOfActivites == 'false' || (surveysComplete && activitiesComplete))
		{
			consoleLog("Show work complete button");
			var button = {'label':getMessage('workComplete'), 'action':'complete', 'id':0, 'name':''};
			var buttonHtml = ich.apptButton(button);
			$buttonContainer.append(buttonHtml);
			$buttonContainer.trigger('create');
			$buttonContainer.show();
		}	
	}
}

//determine the 'Pause' button
//open appointment has to be started and not complete
function createPauseButton($buttonContainer, currentAppt, apptComplete)
{
	//if appointment has workState set > 0 then show pause button
	if(!apptComplete && currentAppt.workState && currentAppt.workState > 0){
		consoleLog("Show pause button");
		var button = {'label':'Pause', 'action':'stop', 'id':currentAppt.workState , 'name':''};
		var buttonHtml = ich.apptButton(button);
		$buttonContainer.append(buttonHtml);
	}
}

function createStartApptButtons($apptButtons, currentAppt, apptComplete, activeApptId)
{
	var workTimeTypeDao = new $.WorkTimeTypeDao(); 
	var workTimeTypes = workTimeTypeDao.findProductive();
	

	// add the remaining 'Start' buttons
	//open appointment has to be started and not complete
	if(currentAppt.statusId == APPT_IN_PROGRESS){
		workTimeTypes = workTimeTypeDao.findForAppointmentInProgress();
	}
	if (workTimeTypes != null && !apptComplete && (currentAppt.id == activeApptId || activeApptId == 0))
	{
		for (var x=0;x<workTimeTypes.length;x++)
		{		
			// enable all buttons other Start buttons						
			if (currentAppt.workState != workTimeTypes[x].id )						
			{
				var button = {'label':'Start', 'action':'start', 'id':workTimeTypes[x].id , 'name':workTimeTypes[x].name};
				var buttonHtml = ich.apptButton(button);
				$apptButtons.append(buttonHtml);
			}					
		}
	}		
	$apptButtons.trigger('create');
}

function createAdditionalApptButtons($buttonContainer, currentAppt, apptComplete){
	$buttonContainer.hide();
	// additional appointment
	if (!apptComplete && currentAppt.workState != IDLE)
	{
	    var additionalAppt = $('#additionalAppt', $buttonContainer); //ul
	    additionalAppt.empty();
		var notes = localStorage.getObject('notes');
		for (var x=0;x<notes.length;x++)
		{				
			additionalAppt.append(ich.addAppt({'id':notes[x].id, 'label':notes[x].note}));
		}
		$('h3', $buttonContainer).click(function scroll() {
			consoleLog("Scroll down div");				
			// browser dependent behaviour - not sure about webkit
			var position = $('#bottomDiv').position();
			$.mobile.silentScroll(position.top);
		});
		additionalAppt.listview('refresh');
		$buttonContainer.show();
	}
}

function getNotes()
{
	consoleLog("checking notes at login");
	if (localStorage.notes == undefined)
	{
		var res = localStorage.getObject('resource');
		var url = escape(localStorage.ctx+"/rest/workflow/job/getNotes/4");
		AppointmentController.getNotes(url,res);	
	}
}


function displayAppointmentDescription() {

	var appt = localStorage.getObject('currentAppointment');

	if (appt != null)
	{
		
		  var plannedStartDate 	= getShortDate(appt.plannedStartDate);		
		  var plannedStartTime 	= getShortTime(appt.plannedStartDate);
		  var plannedEndTime 	= getShortTime(appt.plannedEndDate);
			
		  var actualStartDate = getShortDate(appt.actualStartDate);
		  var actualStartTime = getShortTime(appt.actualStartDate);
		  var actualEndTime	  = getShortTime(appt.actualEndDate);		  
		
		var rowData = {	'description' : appt.jobDescription,
						'workDesc' : appt.jobWorkDescription,
						'notes'    : appt.notes,
						'jobRef'  : appt.jobRef,
						'consideration' : appt.considerations,
						'status' : getAppointmentStatusDesc(appt.statusId),
						'contact':appt.workLog.sal + ' ' + appt.workLog.forename + ' ' + appt.workLog.surname,
						'address1':appt.workLog.address1,
						'address2':appt.workLog.address2,
						'address3':appt.workLog.address3,
						'address4':appt.workLog.address4,
						'postcode':appt.workLog.postCode,
						'service':appt.service.description,
						'apptServiceIcon':'images/'+appt.service.icon,
						'apptPlannedStartTime':plannedStartTime,
						'apptPlannedEndTime':plannedEndTime,
						'apptPlannedStartDate':plannedStartDate,
						'apptActualStartTime':actualStartTime,
						'apptActualEndTime':actualEndTime,
						'apptActualStartDate':actualStartDate
					  }
		var tdHtml = ich.apptDesc(rowData);		
		$('#appDesc').append(tdHtml);			
	}
}

function hideJobStatus(){
	$('.user-status-header').remove();
}

var PAGES_WITH_JOB_HEADER = new Array('appointment', 
									  'apptActivities',
									  'apptDesc',
									  'serviceList',
									  'libraryActivitiesList',
									  'appointmentNotes',
									  'appointmentParts',
									  'appointmentEditPart',
									  'appointmentSigSelect',
									  'appointmentSignature',
									  'surveyListPage',
									  'survey',
									  'surveyAttributePage',
									  'surveyAssetsPage',
									  'surveyAssetAttributePage',
									  'activityEditPage');

/**
 * Creates header with job ref, client job ref and status of appointment
 * under main header
 */
function displayOpenJobHeader(pageId, force) {
	if(PAGES_WITH_JOB_HEADER.indexOf(pageId) != -1 || force){
		var currAppt = localStorage.getObject('currentAppointment');
	
		var jobClientRef = currAppt.jobClientRef ? ' - ' + currAppt.jobClientRef : '';
		if(currAppt.jobClientRef == currAppt.jobRef){
			jobClientRef = '';
		}
		var text = currAppt.jobRef + jobClientRef + ' - ' + getAppointmentStatusDesc(currAppt.statusId);
		var html = 
			'<div class="open-job-header row-content">' +
				'<span id="jobStatusHeader" data-open-appt-id="' + currAppt.id + '">' + text + '</span>' +					
			'</div>';
		
		$('.open-job-header').remove();
		$('#' +pageId + ' [data-role=header]').append(html);
	}
}

function getActivePageId(){
	var hasActivePage = $.mobile.activePage != undefined; 
	var activePageId = hasActivePage ? $.mobile.activePage.attr('id') : null;
	return activePageId;
}

/** creates the top header bar */
function displayStatusHeader() {
	$('.user-status-header').remove();
	
	var activePageId = getActivePageId();
	if(activePageId != null)
	{
		var ignoredPages = new Array();
		ignoredPages.push('logoutConfirmation');
		ignoredPages.push('login');
		if($.inArray(activePageId, ignoredPages) > -1){ //if found
			return;
		}
		
		//ignore any dialogs
		if($('#' + activePageId + '[data-role=dialog]').length > 0){
			return;
		}
	}
	
	var classes = "user-status-header row-content ";
	var jobStatusText = '';
	//if we have active appointment
	if (localStorage.apptActive > 0)
	{
		var colour = 0;
		var ipAppt = ApptListController.getAppointment(localStorage.apptActive);
		if (ipAppt && ipAppt.workState && ipAppt.workState > 0)
		{
			var workStateClass = "";
			
			jobStatusText = ipAppt.jobRef;
			
			var workTimeTypeDao = new $.WorkTimeTypeDao();
			var workType = workTimeTypeDao.findById(ipAppt.workState);
			
			if(workType){
				jobStatusText += ' - ' + workType.name;
				workStateClass = getWorkTypeClass(workType);
			}
			classes = classes + workStateClass;			
		}	
	}

	var connStatus = getConnectionStatusText();
	//if status is empty don't show it
	if(jobStatusText == '' && connStatus == ''){
		return;
	}
	
	//check if not already there otherwise throws exception
	if(!ich.templates['statusHeaderTmpl']){
		var templ = '<div id="userStatusHeader" class="{{classes}}">' +
		  				'<span class="jobStatus">{{jobStatusText}}</span>' +
		  				'<span class="connectionStatus">{{connStatusText}}</span>' +
		  				'<div class="clear"></div>' +
		  			'</div>';
		ich.addTemplate('statusHeaderTmpl', templ);
	}
	var data = {classes: classes, jobStatusText: jobStatusText, connStatusText: connStatus};
	
	var html = ich.statusHeaderTmpl(data);
	
	//each as some page can be hidden by jquery mobile
	$('[data-role=header]').each(function() {
		$(this).prepend(html);
	});
}

function getConnectionStatusText(){
	var msg = '';
	//are we offline?
	if(offline()){
		var lastCheck = getOnlineCheckScheduledFor() - getServerPullDelay();
		if(lastCheck < 0){ //getOnlineCheckScheduledFor() - if return 0
			return '';
		}
		var lastCheckDate = new Date(lastCheck);
		var hours = lastCheckDate.getHours();
		var minutes = lastCheckDate.getMinutes();
		var seconds = lastCheckDate.getSeconds();
		if(hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			  minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		var time = ' ' + hours + ":" + minutes + ":" + seconds;
		msg = getMessage('offlineHeader') + ' ' + getMessage('offlineLastCheck') + time;
	}
	
	return msg;
}

function updateUiWithQueueCount(queueSize) {
	var refreshLink = $('a[data-icon=refresh]');
	var linkIcon = $('.ui-icon', refreshLink);
	if(queueSize > 0){
		linkIcon.text(queueSize);
		linkIcon.addClass('hideIcon');
		refreshLink.addClass('ui-disabled');
	}else{
		linkIcon.removeClass('hideIcon');
		linkIcon.text("");
		refreshLink.removeClass('ui-disabled');
	}
}
