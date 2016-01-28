jQuery.extend({	

	ToolsPageModel: function(){
		var self = this;
		var listeners = new Array();
	    var sendTimeout = 15000;
	    var user = "unknown";
	    
		function sendToServer(){
			var loggerUrl = "logger.jsp";
			var res = localStorage.getObject('resource');
			if (res)
			{
				user = res.user;
			}
	        var storageStr = "Local storage dump created: " + new Date() + "\n";
	        var storage = window.localStorage; 
	        for(var s in storage){
	        	if (s == 'getObject' || s == 'setObject' || s == 'getObjectDecompress' || s == 'setObjectCompress') continue;
	        	storageStr += s + ':  ' + storage[s] + '\n';
	        }
	        var lSize = getLocalStorageSize();
	        storageStr += '\nLocal storage size: ' + lSize;
	        console.log("Local storage size on upload: "+lSize);
	        storageStr += '\nSession storage: \n';
	        var sStorage = window.sessionStorage; 
	        for(var s in sStorage){
	        	if (s == 'getObject' || s == 'setObject' || s == 'getObjectDecompress' || s == 'setObjectCompress') continue;
	        	storageStr += s + ':  ' + sStorage[s] + '\n';
	        }	      
	        storageStr = storageStr.replace(/&/g,'and');
	        //storageStr = encodeURI(storageStr.replace(/&/g,'and'));
	        // split into smaller chunks
	        var chunks = storageStr.length / 512000;
	        for (var x=0;x<chunks;x++)
	        {
	        	var data = storageStr.substr(x*512000, 512000);
		        var logdata = "logdata='" + encodeURI(data) + "'";
		        console.log("Sending logdata ("+logdata.length+")");
		        $.ajax({
					  type: 'POST',
					  url: loggerUrl,
					  headers: {'user':user},
					  data: logdata,  
					  dataType: 'text',
				  	  timeout: sendTimeout,
					  // Error handler
					  error: function(req, status, err){
						alert("Error uploading data: "+err);
						consoleLog("Error uploading local storage dump: "+err);
					  }
		        });
	        }
	        showError('Data uploaded to server', 1000);
		}
		
		
		function sendLogDataToServer(){
			var loggerUrl = "logger.jsp";
			var res = localStorage.getObject('resource');
			if (res)
			{
				user = res.user;
			}
	        var storageStr = "Local logs dump created: " + new Date() + "\n";
	        storageStr += 'userActions:'+JSON.stringify(localStorage.getObject('userActions'))+'\n';
	        storageStr += 'ajaxErrors:'+JSON.stringify(localStorage.getObject('ajaxErrors'))+'\n';
	        storageStr += 'consoleInfo:'+JSON.stringify(localStorage.getObject('consoleInfo'));
	        var logdata = "logdata='" + storageStr + "'";	        
	        $.ajax({
				  type: 'POST',
				  url: loggerUrl,
				  headers: {'user':user},
				  data: logdata,  
				  dataType: 'text',
			  	  timeout: sendTimeout,
				  error: function(req, status, err){
					consoleLog("Error uploading log dump: "+err);
				  }
	        });
	        showError('Log data uploaded to server', 1000);
		}
		
		function formatDate(date){
			if(date == undefined){
				return 'NA';
			}
			var date = new Date(parseInt(localStorage.lastOnlineTime, 10));	
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds();
			if(hours < 10) {
				hours = "0" + hours;
			}
			if (minutes < 10) {
				  minutes = "0" + minutes;
			}
			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			return hours + ":" + minutes + ":" + seconds;
		}
		
		this.dataLoaded = function(){
			var lastOffline = formatDate(localStorage.lastOfflineTime);
			var lastOnlineTime = formatDate(localStorage.lastOnlineTime);
			var remoteUpdater = new $.RemoteUpdater();
			var queuedItems = remoteUpdater.getQueueSize();
			var totalTime = sessionStorage.getObject('ajaxTotalTime');
			var totalSize = sessionStorage.getObject('ajaxTotalSize');
			var averageBandwidth = 0;
			if (totalTime != undefined && totalSize != undefined)
			{
				averageBandwidth = totalSize / (totalTime*1000);
			}
			self.notifyLoadFinish(lastOffline, lastOnlineTime, queuedItems,averageBandwidth.toFixed(2));
		}
		
		this.loadData = function(){
			self.notifyLoadBegin();
			self.dataLoaded();
		}
		
		this.sendLocalStorageToLogs = function() {
			sendToServer();
		}
		
		this.sendLogsToServer = function() {
			sendLogDataToServer();
		}
		
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.notifyLoadBegin = function(){
			$.each(listeners, function(i){
				listeners[i].loadBegin();
			});
		}
		
		this.notifyLoadFinish = function(lastOffline, lastOnline, queuedItems, lastOfflineCheck){
			$.each(listeners, function(i){
				listeners[i].loadFinish(lastOffline, lastOnline, queuedItems, lastOfflineCheck);
			});
		}
		
		this.notifyQueueSent = function(){
			$.each(listeners, function(i){
				listeners[i].localStorageSent();
			});
		}		
	},
	ToolsPageModelListener: function(list) {
		if(!list) list = {};
		return $.extend({
			localStorageSent    : function() { },
			loadBegin    : function() { },
			loadFinish   : function(lastOffline, lastOnline, queuedItems) { }
		}, list);
	}
});
	    					