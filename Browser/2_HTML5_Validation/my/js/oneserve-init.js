/** code to be executed on the login page as soon as page is loaded */

// Adds custom formatting to the normal Date class
// see the console logging for an example
Date.prototype.customFormat=function(formatString){ 
	   var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,dMod,th;
	   YY = ((YYYY=this.getFullYear())+"").substr(2,2);
	   MM = (M=this.getMonth()+1)<10?('0'+M):M;
	   MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substr(0,3);
	   DD = (D=this.getDate())<10?('0'+D):D;
	   DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substr(0,3);
	   th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
	   formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
	   h=(hhh=this.getHours());
	   if (h==0) h=24;
	   if (h>12) h-=12;
	   hh = h<10?('0'+h):h;
	   ampm=hhh<12?'am':'pm';
	   mm=(m=this.getMinutes())<10?('0'+m):m;
	   ss=(s=this.getSeconds())<10?('0'+s):s;
	   return formatString.replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm);
} 

/* ==============  Really for live debugging as we can capture useful info ============ */
// circular log of any ajax errors eg.added by callback error function
function logJsError(error) {
	circularLog(error, 500, 'jsErrors');
}
function logAjaxError(error) {
	circularLog(error, 100, 'ajaxErrors');
}

// circular log of use actions eg. back button, list refresh
function logUserAction(action) {
	circularLog(action, 200, 'userActions');
}

//circular log of console 
function logConsoleStorage(action) {
	circularLog(action, 250, 'consoleInfo');
}

function logNavigation(msg){
	circularLog(msg, 250, 'navigationLog');
}

function circularLog(msg, maxLogs, logStorageName){
	if(msg){
		var logStorage = localStorage.getObject(logStorageName);
		if (logStorage == undefined){
			logStorage = new Array();
		}
		if (logStorage.length > maxLogs)     // rotate limit
		{
			logStorage.shift();
		}		
		var now = new Date();
		var ts = now.customFormat('#YYYY#-#MM#-#DD# #hhh#:#mm#:#ss#');
		logStorage.push(ts + "-" + msg + "\n");
		localStorage.setObject(logStorageName, logStorage);
	}
}
/* ================================================================================= */

//remote logger sends data to remote server and puts the message in the logs
function remoteLogger(user,pass,data,level) {
	consoleLog("REMOTE LOGGER: "+data);
	logConsoleStorage(data);
    data = data.replace(/&/g," and "); 
	var url = localStorage.ctx+'/mobile/logger.jsp';  // same as value in logger.js
	url = url + '?user='+user;
	if (level != undefined)
	{
		// 0=debug, 1=info, 2=warn, 3=error, 4-error with stacktrace
		url = url + '&level='+level;
	}
	$.ajax({
		type: 'POST',
		url: url,
		async: true,
		headers: getHeaders(user,pass,'OS-REST-AUTH-TOKEN',getGpsLocation()),
		data: {logdata: data},
		success: function(response, status, req){
			//console.log("Upload successful");
		},
		error: function(req, status, err){
			console.log(status+","+err);
		}
	  });
}

//as not all browsers support console logging we can put a wrapper
//here and silently ignore the unsupported ones
function consoleLog(data) {
	var isSupported = true;  // TODO test browser type for support
	if (isSupported)
	{		
		try
		{
			var now = new Date;
			var ts = now.customFormat('#YYYY#-#MM#-#DD# #hhh#:#mm#:#ss#');			
			//console.log(ts+": "+data);
			// for dev really but may be useful short term live
			logConsoleStorage(ts+": "+data);
		} catch(e) {}		
	}	
}

/** 
 * Setup ajax calls
 * 
 * The issue occurs only on Andorid, from the post below seems like 
 * its happening for the iPhone too
 * Looks like the s.isLocal in jquery*.js is set to false even if the page loaded via ajax (jquery-mobile)
 * comes from cache, and the response status = 0 
 * 
 * https://github.com/jquery/jquery-mobile/issues/1579
 * this function is called before every ajax call
 */
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
	
	//no other request then page request should be cached
	options.cache = false; 
	//if page request (so html or jsp)
	if(options.url && (options.url.indexOf('html') > 0 || options.url.indexOf('jsp') > 0)){
		options.cache = true;
			
		var ac = applicationCache ? '1' : '0'; 
		ac += ':' + (applicationCache.status != applicationCache.UNCACHED ? '1' : '0')
		ac += ':' + (applicationCache.status != applicationCache.OBSOLETE ? '1' : '0')
			
		if (applicationCache &&
				applicationCache.status != applicationCache.UNCACHED &&
		        applicationCache.status != applicationCache.OBSOLETE) 
		{
		    options.isLocal = true;			        	
		}
		if(options.url.indexOf('/') != -1)
		{
			var url = options.url.substring(options.url.lastIndexOf("/"), options.url.length)
			logNavigation(url + ", cached:"+options.cache)
		}
	}
});

if (navigator.userAgent.match(/iPhone/i)) {
	$('body').addClass('iphone');
}else{
	$('body').addClass('android');
}
/**
 * Error handling lib, catches all javascript errors and generates stacktrace
 */
TraceKit.report.subscribe(function(stackInfo) { 
	var stackString = JSON.stringify(stackInfo);
	var res = localStorage.getObject('resource');
	var user = 'unknown';
	var pass = 'unknown';
	if(res){
		user = res.user;
		pass = res.pass;
	}
	logJsError(stackString);	
	remoteLogger(user, pass, stackString, 4);
});
