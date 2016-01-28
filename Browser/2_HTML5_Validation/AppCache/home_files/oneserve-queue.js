/**
 * dependancies libs:
 * - jquery.js
 */
jQuery.extend({
	
	queueListeners : new Array(),
	
	/**
	 * user/pass so that queue entries are persistent across login/logout
	 * url - url request
	 * type - type of request - 'POST', 'DELETE'
	 * objData - object to be send in the request
	 * successCallback - a string used invoked on eval function arguments available: 
	 * - response
	 * - requestData 
	 * ie. : new $.UI.callback() or new new $.UI.callback(response, requestData)
	 *   
	 * errorCallback - a string used invoked on eval function arguments available:
	 * - error
	 * - status
	 * 
	 * localData - data which can be read on the callback, ie can contain local(mobile) id so relevant
	 * local data can be updated
	 */
	RequestDetails: function(url, type, objData, paramName, successCallback, errorCallback, localData) {
		self = this;
		var resource = localStorage.getObject('resource');
		this.user = resource.user;
		this.pass = resource.pass;
		this.url = url;
		this.type = type;
		this.data = JSON.stringify(objData);
		this.paramName = paramName;
		this.successCallback = successCallback;
		this.errorCallback = errorCallback;
		this.location = "";
		this.localData = localData;
		if (localStorage.gps == 'true')
		{
			this.location = getGpsLocation();
		}		
	},
	
	/**
	 * Queue object hides underlying storage
	 */
	Queue: function() {
		var self = this;
		var QUEUE_NAME = 'updateQueue';
		
		function get(){
			var queue = localStorage.getObject(QUEUE_NAME);
			if (queue == undefined)
	   		{
	   			queue = new Array();
	   		}
			return queue;
		}
		
		function save(queue){
			localStorage.setObject(QUEUE_NAME, queue);
		}
		
		/**
		 * adds object at the end of the queue
		 */
		this.add = function(object){
			consoleLog("Queue add request to: " + object.url);
	   		var queue = get(); 
    		queue.push(object);    		
	   		save(queue);
	   		consoleLog("Queue updated: " + object.url);
    		consoleLog("Queue size: " + queue.length);
		}
		/**
		 * add item on the front of the queue
		 */
		this.addFirst = function(object){
			var queue = get();
			queue.unshift(object);
			save(queue);
		}
		this.override = function(queue){
			save(queue);
		}
		this.getAll = function(){
			return get();
		}
		this.hasNext = function(){
			return get().length > 0;
		}
		this.isEmpty = function(){
			return get().length == 0;
		}
		/** 
		 * Removes the oldest item from the queue and returns it
		 */
		this.pop = function(){
			var queue = get();
			var removed = queue.shift();
			save(queue);
			return removed;
		}
		
		this.clear = function(){
			save(new Array());
		}
	},
		
	/**
	 * Send rest request if possible otherwise adds to the queue 
	 * usage example:
	 * var requestDetails = new $.RequestDetails(deleteActivityUrl + activityId + "/" + activityVersion, 'DELETE', null);
	 * var remoteUpdater = new $.RemoteUpdater();			
	 * remoteUpdater.update(requestDetails);
	 */
	RemoteUpdater: function(){
		var self = this;
		var updateQueue = new $.Queue();
		
		this.isQueueEmpty = function(){
			return updateQueue.isEmpty();
		}
		
		this.getQueueSize = function(){
			return updateQueue.getAll().length;
		}
		
		this.sendRequest = function(requestDetails, async){			
			consoleLog("RemoteUpdater: sendRequest:" + requestDetails.url+"  async="+async);
			var requestData =  requestDetails.data == undefined ? '' : requestDetails.data;
			var paramName = requestDetails.paramName == undefined ? '' : requestDetails.paramName+"=";
			
			// we need a flag to indicate if a request is in progress
			// as they are asynchronous so they don't block UI
			// But requests have to go in order, so date on the server is keep in the correct state
			setUpdateRequestInProgress(self.getQueueSize());
			$.ajax({
				url: requestDetails.url,
				type: requestDetails.type,
				headers: getHeaders(requestDetails.user,requestDetails.pass,'OS-REST-AUTH-TOKEN',requestDetails.location),
				async: async,
				data: paramName+requestData,
				contentType: "application/json",
				success: function(response, status, request)
				{
					//
					//NOTE: 
					// make sure you don't change names of: 'response', 'status', 'request' and
					//'requestDetails' variables as they can be used in the callback methods 
					//
					consoleLog("request successful");
					if(requestDetails.successCallback){
						consoleLog("call callback:"+requestDetails.successCallback);
						eval(requestDetails.successCallback);
					}

					requestDetails.success = true;
					
					setUpdateRequestNotInProgress(self.getQueueSize());
					//this request is complete, its safe to send next one
					self.sendQueue();					
				},
				// Error handler
				error: function(resp, status, req)
				{
					//set flag so we will retry the request
					requestDetails.success = false;
					
					//genuine response from the server, if 404 or timeout we won't get this value					
					if (resp.status > 401)
					{
						// log for later 
						consoleLog("Error response: "+JSON.stringify(resp));
					}
					if(resp.responseText)
					{
						try { //json conversion may fail here make sure it doesn't
							  //ie when tomcat returns 404
							if($.parseJSON(resp.responseText).result){
								//so make sure we won't try again
								requestDetails.success = true;
							}
						}catch(e){
							consoleLog("Got queue error response: "+JSON.stringify(resp));
						}
					}
					  
					if(requestDetails.errorCallback){
						eval(requestDetails.errorCallback);
					}
					//why we need this and the callback above?
					//well above is a 'static method' call which doesn't have access to ui as such

					consoleLog("Error processing request: " +status + ", "
															+ JSON.stringify(resp) + "," 
															+ JSON.stringify(req));
				 
 					//and on error can be overridden
 					//THIS doesn't work with asyc queue - OSD-1075
					//self.onError(status, resp, req, requestDetails);
				 
					//if request was unsuccesful due to ie network problem
					//add it back
					if(!requestDetails.success){
						updateQueue.addFirst(requestDetails);
						setUpdateRequestNotInProgress(self.getQueueSize());
						//check offline/online status, this will also trigger send queue
						// added delay so that we don't get a fast loop eg. 403/404/405 etc
						setTimeout(checkOnlineStatus,5000);
					}else{
						setUpdateRequestNotInProgress(self.getQueueSize());
				  	  	//finished with the request send next on
						self.sendQueue();
					}				  
				}
			  });
		}
		
		/**
		 * Called just before element is added to the queue
		 * if returns true element will be added otherwise won't
		 */
		this.onBeforeAddToQueue = function(queue, requestDetails){
			consoleLog('onBeforeAddToQueue:superclass');
			return true;
		}
		
		/**
		 * queue given request and triggers send  
		 */
		this.update = function(requestDetails){			
			consoleLog("RemoteUpdater: update:" + updateQueue);
			
			var hasRequestPending = self.isQueueEmpty();
			
			var addToQueue = self.onBeforeAddToQueue(updateQueue, requestDetails);
			
			if(addToQueue){
				consoleLog("Online status: " + !offline());
				consoleLog("RemoteUpdater: queue updated");
				updateQueue.add(requestDetails);
			}else{
				consoleLog("RemoteUpdater: queue not updated");
			}
			updateUiWithQueueCount(self.getQueueSize());
			
			//triggers online - check which in order send queued items
			//Only trigger if queue was empty (before we added item to the queue), 
			//as at the end of each request
			//queue will attempt to send any items left in the queue
			if(hasRequestPending){
				checkOnlineStatus(true);
			}
		}
		
		this.sendQueue = function(){
			//check if we have a update request in progress 
			//(update request are sent through the queue)
			//if we do abort send, as item has been added to the queue
			//it will be send after current request
			if(isUpdateRequestInProgress())
			{
				consoleLog('update in progress: abort sendQueue');
				return;
			}
			
			if(!offline()){
				var currentRequestDetails = null;
				var updateQueue = new $.Queue();
				
				//check if we have anything to send if so send
				if(updateQueue.hasNext() && !isUpdateRequestInProgress()){
					currentRequestDetails = updateQueue.pop();
					this.sendRequest(currentRequestDetails, true);
				}
				consoleLog("Queue processing done, items left:" + updateQueue.getAll().length);
			}else{
				consoleLog('offline: abort sendQueue, checking online');
				checkOnlineStatus(true);
			}
		}
	}	
	
});