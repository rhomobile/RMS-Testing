/**
 * asl is the main object of the Library. It wraps all the functions that will be presented through this module.
 * @type Object 
 */
var asl = {};

/**
 * asl.prv object contains all the functions and variables that must not be accessed directly through Client Applications
 * @type Object 
 */
asl.prv = {};

/**
 * @description will be true if application was close
 * @type {Boolean}
 */
asl.prv.quit = false;

/**
 * asl.prv.inputs array of all tracked inputs in the Client application document that were added to the keyboard application.
 * @type Object 
 */
asl.prv.inputs = {};

/**
 *Stores the current resolution of the device
 * @type String 
 */
asl.prv.resolution = window.innerWidth + 'x' + window.innerHeight;

/**
 * The number of the list items 
 */
asl.prv.listItemsByPage = 7;

/**
 * asl.prv.regx stores all Regular expressions
 */
asl.prv.regx = {
    hasFunction: /^\w+\(.+\)/,
    getFunctionName: /^([^(]+).+/
};

/**
 * @description hold the message information
 * @type {Object}
 */
asl.msgs = {};

/**
 * @description Private property to track the state of the scanner
 * @type {Boolean}
 */
asl.prv.scannerWasEnabled = false;

/**
 * @description Private property totrack the state of the signatureCapture
 * @type {Boolean}
 */
asl.prv.signatureCaptureWasVisible = false;

/**
 * @description Private property totrack the state of the signal icon
 * @type {Boolean}
 */
asl.prv.signalWasVisible = false;

/**
 * @description asl.msgs.types object contains all the functions and variables that must not be accessed directly through Client Applications
 * @type Object 
 */
asl.msgs.types = {
    hi : -1,
    auth : 0,
    notify : 1,
    evt : 2,
    back : 3,
    title : 4,
    options : 5,
    minimize : 6,
    npapi : 7,
    keyboard : 8,
    apps : 9,
    badge: 10,
    profile: 11
};

/**
 * @description asl.event object contains wraps all the system functions for managing Events in the Client Application
 * @type Object 
 */
asl.events = {};

/**
 * @description asl.events._listerners contains all mappings between event types and event callback functions.
 * @type Object 
 */
asl.events._listerners = {};

/**
 * @description check if has any listener for this event
 * @param {asl.events.types} evt
 * @return {Boolean}
 */
asl.events.hasListerner = function(evt){
	if(asl.events._listerners[evt]){
		return true;
	}
	return false;
};

/**
 * @function 
 * @description private function that subscribes a callback function for an event.
 * @param {string} event type of the event; asl.events.types can be used to avoid typing mistakes.
 * @param {function} callback the callback function that will be executed after the event occurs. 
 */
asl.events.subscribe = function(event, callback) {
    var evt = event.toLowerCase();
    var list = asl.events._listerners[evt] || (asl.events._listerners[evt] = []);
    list.push(callback);
};

/**
 * @function 
 * @description private function that removes all listener functions for an event.
 * @param {string} event type of the event; asl.events.types can be used to avoid typing mistakes.
 */
asl.events.unbsubscribe = function(event) {
    var evt = event.toLowerCase();
    asl.events._listerners[evt] = [];
};

/**
 * @function 
 * @description private function that fires the event and all the listerens will be executed.
 * @param {String} event type of the event; asl.events.types can be used to avoid typing mistakes.
 * @param {Object} args specific data can be provided to a listener after the event occurs. 
 */
asl.events.fire = function(event, args) {
    var evt = event.toLowerCase();
    if(asl.events._listerners[evt]) {
        for(var i = 0, length = asl.events._listerners[evt].length; i < length; i++) {
            asl.events._listerners[evt][i].apply(this, args instanceof Array ? args : [args]);
        }
	}
};

/**
 * @description asl.events.types contains all the possible events that can occur in TSD environment.
 * @type Object
 */
asl.events.types = {
    focus : "onfocus",
    focusOut : "onfocusout",
    scanTo : "onscanto",
    backPressed : "onbackpressed",
    optionSelected : "onoptionselected",
    rotate : "onrotate",
    cradleInsert : "oncradleinsert",
    cradleRemove : "oncradleremove",
    lowBattery : "onlowbattery",
    criticalBattery : "oncriticalbattery",
    signal : "onsignal",
    signalLost : "onsignallost",
    signalRestored : "onsignalrestored",
    lock : 'onlock',
    kill : "onkill",
    exit : "onexit",
    error : "onerror",
    authFailed : "onAuthFailed",
    loaded : 'onloaded'
};

/**
 * @description notification types
 * @type {Object}
 */
asl.notifications = {
    system: 'system',
    application: 'application',
    thick: 'thick',
    server: 'server'
};

//TODO isn't use for now
/**
 * @description notification priority
 * @type {Object}
 */
asl.priority = {
    urgent: 'urgent',
    high: 'high',
    normal: 'normal',
    low: 'low'
};

asl.debug = false;

/**
 * asl.prv.shell holds the address of the Shell application; this is dynamically set on application page load.
 * @type String
 */
asl.prv.shell = null;

/**
 * asl.prv.msgStack holds the messages that has been sent before hiAccepted message from the sys module.
 * @type Array
 */
asl.prv.msgStack = [];

/**
 * asl.prv.msgStack holds the messages that has been sent before hiAccepted message from the sys module.
 * @type Array
 */
asl.prv.titleStack = [];

/**
 * @function
 * @description private function that use HTML 5 postMessage protocol to process messages between iframe client and the host document.
 * @param {Object} data keeps specific information for the exchanged message like type, address and params; params can be used to exchange specific information like id, names, message content etc..
 */
asl.prv.processMessage = function(data){
	switch(data.type){
		case -1 : asl.prv.hiAccepted(data.params); break;
		case 0 : asl.prv.auth(data.params); break;
		case 1 : asl.prv.notify(data.params); break;
		case 2 : asl.prv.evt(data.params); break;
		case 3 : asl.prv.back(data.params); break;
		case 4 : asl.prv.title(data.params); break;
		case 5 : asl.prv.options(data.params); break;
		case 6 : asl.prv.minimize(data.params); break;
		case 7 : asl.prv.npapi(data.params); break;
		case 8 : asl.prv.keyboard(data.params); break;
		case 9 : asl.prv.apps(data.params); break;

		default: alert("Message does not have type and cannot be processed.");break;
	}
};

/**
 * @function
 * @description private function that prepares an asl message for sending through HTML5 postMessage protocol.
 * @param {String} type holds the type of the message; possible types can be found in asl.msgs.types enumeration.
 * @param {Object} params specific data that is exchanged depending on the message and application; params holds the Client Application specific data.
 */
asl.prv.message = function(type, params){
    if(asl.prv.loaded) {
        if(asl.prv.shell){
            params.id = asl.prv.id;
            msg = {"type": type, "params": params};
            parent.postMessage(msg, asl.prv.shell);
        } else {
            throw "The application cannot connect to the Central Shell. The Shell URI is missing.";
        }
    } else {
		params.id = asl.prv.id;
		if(type == asl.msgs.types.back || type == asl.msgs.types.title || type == asl.msgs.types.options){
			asl.prv.titleStack.push({"type": type, "params": params});        
		}
		else{
			asl.prv.msgStack.push({"type": type, "params": params});        
		}
    }
};

/**
 * @function
 * @description private function that is called after the Application document has been loaded, received hiAccepted message from Shell and it need to execute all messages that are on the queue.
 */
asl.prv.execMsgStack = function(){
	while(asl.prv.msgStack.length > 0){
		var m = asl.prv.msgStack.shift();

		asl.prv.message(m.type, m.params);
	}
};

/**
 * @function
 * @description private function that is called after the Shell instantiate a connection with the application for the first time.
 * @param {Object} params system data that is passed to the application by the Shell like Shell address, Shell application name, etc.
 */
asl.prv.hiAccepted = function(params){
    if(!asl.debug){
        asl.prv.shell = params.shell;
        asl.prv.name = params.name;
        asl.prv.id = params.id;
        asl.prv.data = params.data ? params.data : {};

        if(params.resolution != asl.prv.resolution) {
            //asl.prv.resolution = params.resolution;
            //TODO
            //title.reDesign();
        }
        asl.prv.listItemsByPage = params.listItemsByPage;

        asl.prv.user = params.user;

        asl.prv.loaded = true;

        asl.prv.lockTimeOut = params.timer ? params.timer : 0;

        asl.prv.message(asl.msgs.types.hi, { status: asl.prv.loaded, name: window.document.title });
    }


    //Stylize the options bar
    options.create();
    options.init();

    title.load(asl.fn.store.load('title'));

	if(asl.prv.optionsCollection) {
	    title.setOptions(asl.prv.optionsCollection);
	}

    options.scroll.calculate();

    asl.events.fire(asl.events.types.loaded, asl.prv.data);
};

/**
 * @function
 * @description private function that process all npapi requests
 * @param {Object} params contains which object method or property is wanted to be executed and some custom data
 */
asl.prv.npapi = function(params) {
    //shortcut of the NPAPI object for convinience
    var object = window[params.data.object];

    //special case for the push module
    if(params.data.object == 'push') {
        if(object[params.data.method]) {
            
            var props = [];
            for(var i in params.data.data) {
                props.push(params.data.data[i]);
            }
            
            if(object[params.data.method].match(asl.prv.regx.hasFunction)) {
                //call the functions assigned to the event
                var callback = window[object[params.data.method].replace(asl.prv.regx.getFunctionName, '$1')];
                if(object[params.data.method].indexOf('%s') != -1) {
                    callback.apply(this, props);
                }
                else if(object[params.data.method].indexOf('%json') != -1){
                    callback(params.data.data);
                }
            }
            else {
                //@TODO we don't send a json to external address
                //Redirect to the url address with the specific data
                var address = object[params.data.method];
                //var props = object.getEventResponseProperties(params.data.method);
                var i = 0;
                
                while(address.indexOf('%s') != -1) {
                    address = address.replace('%s', params.data.data[props[i++]]);
                }
                
                window.location = address;
            }
        }
    }
    //Process all NPAPI events events
    else {

        if(object[params.data.method]) {
			if(object[params.data.method].match(asl.prv.regx.hasFunction)) {
                //call the functions assigned to the event
                //var callback = eval(object[params.data.method].replace(asl.prv.regx.getFunctionName, '$1'));
                var callback = window[object[params.data.method].replace(asl.prv.regx.getFunctionName, '$1')];
                if(object[params.data.method].indexOf('%s') != -1) {
                    callback.apply(this, object.getEventResponseProperties(params.data.method).map(function(val){return params.data.data[val]}).slice(0, object[params.data.method].count('%s')));
                }
                else if(object[params.data.method].indexOf('%json') != -1){
                    callback(params.data.data);
                }
            }
            else {
                //@TODO we don't send a json to external address
                //Redirect to the url address with the specific data
                var address = object[params.data.method];
                var props = object.getEventResponseProperties(params.data.method);
                var i = 0;
                
                while(address.indexOf('%s') != -1) {
                    address = address.replace('%s', params.data.data[props[i++]]);
                }
                
                window.location = address;
            }
        }
    }
};

/**
 * @function
 * @description private function that processes and distributes events coming from external sources e.g. Shell.
 * @param {Object} params holds event specific information like event type, event parameters or some custom defined parameters.
 */
asl.prv.evt = function(params){
	if(params.evt){
		asl.events.fire(params.evt, params.data);
	}
	else{
		throw "No event is received.";
	}
};

/**
 * @function
 * @description private function that processes and distributes events coming from external sources e.g. Shell.
 * @param {Object} params holds event specific information like event type, event parameters or some custom defined parameters.
 */
asl.prv.keyboard = function(params){
	asl.kbdOn = false;
    asl.prv.resetTimer();
    asl.events.fire(asl.events.types.focus);
    if (params.id) {
	    asl.prv.inputs[params.id].callback(params.id, params.text);
	}
};

/**
 * @function
 * @description parses the document tree to discover text inputs elements and to assign them focus callback that will invoke the keyboard application.
 */
asl.prv.trackDOMInputs = function(){
	var input_list = document.getElementsByTagName('input');

	for(var i=0; i < input_list.length; i++){
		if(input_list[i].type != 'button' && input_list[i].type != 'submit' &&
           input_list[i].type != 'checkbox' && input_list[i].type != 'radio' &&
           input_list[i].type != 'reset' && input_list[i].type != 'file' &&
           input_list[i].type != 'image' && input_list[i].type != 'hidden'){
			var id = input_list[i].id;
			if(!id || id.length == 0){
				id = asl.prv.inputs.getId();

				input_list[i].setAttribute('id', id);
			}

			if(!asl.prv.inputs[id]){
				asl.prv.inputs[id] = {};
				input_list[id].addEventListener('focus', function(e){
					nosip.ShowSIP(true);
				});

				input_list[id].addEventListener('focusout', function(e){
					nosip.ShowSIP(false);
				});

			}
		}
	}
};

/**
 * @function
 * @description private function that processes back message coming from external sources e.g. Shell.
 * @param {Object} params holds information which callback to execute.
 */
asl.prv.back = function(params) {
	var callback = asl.fn.store.restore(params);
	asl.events.fire(asl.events.types.backPressed);

    if(params.type == 'function') {
        callback();
    }
    else {
		window.location.replace(params.data);
    }
};

/**
 * @function
 * @description private function that processes options message coming from external sources e.g. Shell.
 * @param {Object} params holds information which callback to execute when clicked on option.
 */
asl.prv.options = function(params) {
    var callback = asl.fn.store.restore(params.exec);

    asl.events.fire(asl.events.types.optionSelected, params.arrguments);

    if(params.exec.type == 'function') {
        callback.apply(null, params.arrguments);
    }
    else {
		window.location.replace(callback);
    }
};

/**
 * @description execute notification action in asl module
 * @param params
 */
asl.prv.notify = function(params) {
    var fn = asl.fn.store.restore(params.exec);
    if(params.exec ){
    	if(params.exec.type == 'function') {
        	fn(params.arguments);
    	}
	    else {
			window.location.replace(params.exec.data);
    	}
    }
};

/**
 * @function
 * @description reseve callback from other application and execute
 * @param {Object} params hold callback and data
 * @return void
 */
asl.prv.apps = function(params) {
	asl.fn.store.restore(params.callback);
	if(params.callback.type == 'function'){
		params.callback.data(params.data);
	}
	else {
		window.location.replace(params.callback.data+"?"+asl.prv.serialize(params.data));
	}
}

/**
 * @function
 * @description serialize object in query string
 * @param {Object} obj data that will be serialized
 * @return {String} string of serialized object
 */
asl.prv.serialize = function(obj) {
	var str = [];
	for(var p in obj)
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	return str.join("&");
}

/**
 * @function
 * @description subsctibe for kill event and call exit method
 */
asl.events.subscribe(asl.events.types.kill, function(){
	asl.exit();
});

/**
 * @function
 * @description public function that forces the application to quitl; notifies the Shell for the application quit.
 * @param {Bool} wait if true the exit function will fire an event but will not quit; the event callback should contain asl.exit(false) to force quitting.
 */
asl.exit = function(data, skip) {
	if(!skip)
		if(asl.events.hasListerner(asl.events.types.exit)) {
			asl.events.fire(asl.events.types.exit);
			asl.exit( data ? data : {},true);
            return;
		}else {
            asl.exit( data ? data : {},true);
        }

	var params = {};

	params.evt = asl.events.types.exit;
	params.data = data;

    asl.prv.quit = true;

	asl.prv.message(asl.msgs.types.evt, params);
};

/**
 * @function
 * @description private function created for convenience; used in asl.back function
 */
asl.prv.processBack = function(callback, imgUrl) {
    var params = {};
    params.imgUrl = imgUrl;

	if(callback !== undefined) {
        params.callback = asl.fn.store.stringify(callback);

    } else {
        params.callback = null;
    }

	title.setBack(params.callback, params.imgUrl);
};

/**
 * @description Assign a callback to the Back button, or hide it
 * @param {Function} callback
 * @param {String} imgUrl
 */
asl.back = function(callback, imgUrl) {
    if(imgUrl) {
        imgUrl = asl.fn.store.storeImage(imgUrl, function(imageUrl) {
			asl.prv.processBack(callback, imageUrl);
        });
    } else {
		asl.prv.processBack(callback, null);
    }
};

/**
 * @description Change the title of the application
 * @param {String} text
 */
asl.title = function(text) {
	title.setText(text);
};

/**
 * @description Set an options for the application
 * @param {Array} opts
 */
asl.options = function(opts) {
	var options = [];
	if (opts){
		for(var i= 0; i < opts.length; i++){
			opts[i].callback = asl.fn.store.stringify(opts[i].callback);
			options.push(opts[i]);
		}
	}
	
	asl.prv.optionsCollection = options;
};

/**
 * @function
 * @description public function that sets the application in Fullscreen mode i.e. disable the Title bar.
 * @param {Object} param
 */
asl.fullscreen = function(param) {
    asl.prv.message(asl.msgs.types.title, { "fullscreen": param });
};

/**
 * @function
 * @description public function that send notification to the shell or another app.
 * @param {asl.notifications} type
 * @param {asl.priority} priority
 * @param {String} title
 * @param {String} message
 * @param {Array} [buttons]
 * @param {Array} [actions]
 * @param {Number} [timeout]
 */
asl.notify = function(type, priority, title, message, buttons, actions, timeout, iconPath) {
    var appName = asl.prv.name || sessionStorage.getItem("name");
    var params = {
        type: type,
        priority: priority,
        title: title,
        message: message,
        buttons: buttons,
        actions: [],
        timeout: timeout,
		iconPath: iconPath
    }
    
    for(var i = 0, length = actions.length; i < length; i++) {
        if(actions[i]){
			params.actions.push(asl.fn.store.stringify(actions[i]));
		}
		else{
			params.actions.push(null);
		}
    }

    asl.prv.message(asl.msgs.types.notify, params);
};

/**
 * @function
 * @description public function that returns information for the currently logged user.
 */
asl.getUserData = function(){
	return asl.prv.user;
};

/**
 * @function
 * @description public function that returns information for the currently logged user.
 */
asl.keyboard = function(el, callback, text){
	var params = {};
	asl.kbdOn = true;
	
	asl.prv.stopTimer();

	var id = "";
	
	if(el) id = el.id; 
	else{
	 	id = asl.prv.id;
		asl.prv.inputs[id] = {};
	}
	
	asl.prv.inputs[id].callback = function(id, value){
		
		if(callback && typeof callback === 'function'){
			callback(id, value);
		}
	};
	
	//TODO: save callback function in the fn store and assign it an id; then use the id for params array
	params.inputId = id;
	params.title = el && el.getAttribute('title') ? el.getAttribute('title') : "";
	params.type = text ? "text" : el.getAttribute('type');
	
	params.value = text ? text : el.getAttribute('value');
	
	params.maxLength = el && el.getAttribute('maxlength') ? el.getAttribute('maxlength') : 0;

    asl.events.fire(asl.events.types.focusOut);
	asl.prv.message(asl.msgs.types.keyboard, params);
};

asl.profile = function(object) {
    asl.prv.message(asl.msgs.types.profile, object);
};

asl.badge = function(url) {
    asl.prv.message(asl.msgs.types.badge, {url:url});
};

/**
 * @description holds the methods that save and restore (function, images and objects)
 * @type {Object}
 */
asl.fn = {};
asl.fn.store = {
    /**
     * @description Store the data in persistant storage
     * @param {Object} data
     * @return {Object}
     */
    stringify: function(data) {
        var result = {};
        if(data instanceof Function) {
            result.type = 'function';
            result.data = this.toString(data);
        }
        else {
            result.type = 'string';
            result.data = data;
        }

        return result;
    },

    /**
     * @description Get data by key from persistant storage
     * @param {Object} obj
     */
    restore: function(obj) {
        if(obj && obj.type == 'function') {
            eval('var tmp = ' + obj.data);
            return tmp;
        }
    },

    /**
     * @description return the function in string format
     * @param {Function} func
     * @return {*}
     */
    toString: function(func) {
        var res = func.toString();
        res = res.replace(/^function(\s\w+)\(/, 'function(');
        
        return res;
    },

    /**
     * @description return Base64 encode a PNG image
     * @param {String} imgUrl
     * @param {Function} callback
     */
    storeImage: function(imgUrl, callback) {
        
        var img = new Image();
        img.src = imgUrl;
        
        img.onload = function() {
            // Create an empty canvas element
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            // Copy the image contents to the canvas
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            
            // Get the data-URL formatted image
            // Firefox supports PNG and JPEG. You could check img.src to
            // guess the original format, but be aware the using "image/jpg"
            // will re-encode the image.
            var dataURL = canvas.toDataURL("image/png");
            callback(dataURL);
        }
    },
    /**
     * @description save the json string in localStorage by key (application id and type or record)
     * @param {String} type
     * @param {String} string
     */
	save: function(type, string){
		localStorage.setItem(asl.prv.id+"-"+type, string);
	},
    /**
     * @description get record form localStroage by provided key
     * @param {String} type
     * @return {*}
     */
	load: function(type){
		return localStorage.getItem(asl.prv.id+"-"+type);
	},
    /**
     * @description delete record form localStroage by provided key
     * @param {String} type
     * @return {*}
     */
    remove: function(type){
        return localStorage.removeItem(asl.prv.id+"-"+type);
    }
};

/**
 * @description time after that the screen will be locked
 * this property is set by sys module
 * @type {Number}
 */
asl.prv.lockTimeOut = 0;

/**
 * @description hold the timer that send locked message to sys module
 * @type {*}
 */
asl.prv.locktimer = null;

/**
 * @description stot asl.prv.locktimer timer and start it again
 * @return void
 */
asl.prv.resetTimer = function(){
	//check if there is a timeout for lock screen at all:
	if(!asl.prv.lockTimeOut) return;
	//stops the timer if it exists
	asl.prv.stopTimer();
	
	//if the keyboard is not visible, then activate a timer
	if(!asl.kbdOn){
	    asl.prv.locktimer = setTimeout(function(){
	        var params = {};
	        params.evt = asl.events.types.lock;
	        asl.prv.message(asl.msgs.types.evt, params);
	    }, asl.prv.lockTimeOut);
	}
};

/**
 * @description just stop asl.prv.locktimer timer
 * @return void
 */
asl.prv.stopTimer = function(){
	if(asl.prv.locktimer)
        window.clearTimeout(asl.prv.locktimer);
	
	asl.prv.locktimer = null;
	delete asl.prv.locktimer;
};

//TODO what is this used for?
asl.prv.lockscreen = function(){
	if(!asl.prv.lockTimeOut) return;
	asl.prv.stopTimer();
	
	if(!asl.kbdOn){
	    asl.prv.locktimer = setTimeout(function(){
	        var params = {};
	        params.evt = asl.events.types.lock;
	        asl.prv.message(asl.msgs.types.evt, params);
	    }, asl.prv.lockTimeOut);
	}
};

/**
 * @description is used to say on sys module that user is loged in or not and send some information about it
 * @param {Boolean} status
 * @param {Object} data
 * @return void
 */
asl.auth = function(status, data){
    var params = {};
    params.status = status;
    params.data = data;
    asl.prv.message(asl.msgs.types.auth, params);
};

/**
 * @function
 * @description Function that can run other application
 * @param {String} url name of installed app or url address
 * @param {Object} [data] holds the data that will be send to application
 * @param {Function|String} [callback] function or url that will be used for callback
 */
asl.run = function(url, data, callback){
	var params = {};
	params.url = url;

	if (data instanceof Function){
		params.callback = asl.fn.store.stringify(data);
	}else if (data instanceof Object){
		params.data = data;
		if (callback){
			params.callback = asl.fn.store.stringify(callback);
		}
	}else if (data) {
		params.callback = asl.fn.store.stringify(data);
	}else if (callback) {
		params.callback = asl.fn.store.stringify(callback);
	}
    asl.events.fire(asl.events.types.focusOut);
	asl.prv.message(asl.msgs.types.apps, params);
};

/**
 * @ignore 
 */	
window.addEventListener("message", function(e){
	if(!asl.prv.shell && e.data && e.data.type == asl.msgs.types.hi){
		asl.prv.processMessage(e.data);
	}
	else {
		var origin = e.origin[e.origin.length - 1] == '/' ? e.origin.slice(0, e.origin.length-1) : e.origin;
		var shell = asl.prv.shell[asl.prv.shell.length - 1] == '/' ? asl.prv.shell.slice(0, asl.prv.shell.length-1) : asl.prv.shell;

		if (shell && shell.indexOf( origin ) == 0)
			asl.prv.processMessage(e.data);
	}
}, false);

/**
 * @ignore 
 */
window.addEventListener("load", function(){
	asl.prv.trackDOMInputs();
}, false);

window.addEventListener("unload", function(){
    if (asl.prv.quit){
        asl.fn.store.remove('title');
        return;
    }
    asl.fn.store.save('title', title.toString());
}, false);

//TODO: THIS IS ONLY FIX FOR DESKTOP: define keypress only when keyCapture is not available e.g. not RhoElements
window.addEventListener("keypress", function(e){
	try{
		if(!keyCapture){
			//enter
			if(e.keyCode == 13){
				var params = {};
				
				asl.prv.message(asl.msgs.types.minimize, params);
			}
		}
	}
	catch(ex){
		//enter
		if(e.keyCode == 13){
			var params = {};
			
			asl.prv.message(asl.msgs.types.minimize, params);
		}
	}
}, false);

window.addEventListener("mousedown", function(e){
    asl.prv.stopTimer();
});

window.addEventListener("mouseup", function(e){
    asl.prv.resetTimer();
});

window.addEventListener("DOMContentLoaded", function(){
    if(asl.debug)
        asl.prv.hiAccepted();
});

document.addEventListener("DOMNodeInserted", function(){
	asl.prv.trackDOMInputs();
});

/**
 * Subscribe for the Focus event
 */
asl.events.subscribe(asl.events.types.focus, function() {
    asl.prv.resetTimer();
    try {
        //Scanner
        if(asl.prv.scannerWasEnabled) {
            scanner.enable();
        }
        
        for(var i in scanner.getChangedProperties()) {
            scanner[i] = scanner[i];
        }
        
        //SignatureCapture
        for(var i in signatureCapture) {
            if( typeof signatureCapture[i] != 'function' && (i.toLowerCase() != 'visibility') ) {
                //we reassign the object propeties, or we can assign them to the asl.prv.signatureCapture object
                signatureCapture[i] = signatureCapture[i];
            }
        }
        
        //reassign the last state of the signatureCapture before the focusOut event
        if(asl.prv.signatureCaptureWasVisible) {
            signatureCapture.visibility = 'visible';
        }
        
        if(asl.prv.signalWasVisible) {
            signal.visibility = 'Visible';

			for(var i in signal) {
	            if( typeof signal[i] != 'function' && (i.toLowerCase() != 'visibility') && (i.toLowerCase() != 'signalEvent') ) {
	                //we reassign the object propeties, or we can assign them to the asl.prv.signal object
	                signal[i] = signal[i];
	            }
	        }
        }

        //AudioCapture
        for(var i in audioCapture) {
            if( typeof audioCapture[i] != 'function' ) {
                //we reassign the object propeties, or we can assign them to the asl.prv.audioCapture object
                audioCapture[i] = audioCapture[i];
            }
        }
    } catch(e) {}
});

asl.events.subscribe(asl.events.types.focusOut, function() {
	asl.prv.stopTimer();

    try {
        //if the scanner was enabled we disabled it and save the last state
        if(asl.prv.scannerWasEnabled) {
            //scanner.disable();
            asl.prv.scannerWasEnabled = true;
        }
        
        //hide the signatureCapture if it's visible
        //we don't change the overwrited object, because on focus we have to set the signatureCapture to the last state
        if(asl.prv.signatureCaptureWasVisible) {
            signatureCapture.visibility = 'hidden';
            asl.prv.signatureCaptureWasVisible = true;
        }

        if(asl.prv.signalWasVisible) {
            signal.visibility = 'Hidden';
			asl.prv.signalWasVisible = true
        }
        
        //cancel the audioCapture
        audioCapture.cancel();
    } catch(e) {}
});

asl.events.subscribe(asl.events.types.signal, function(data) {
	if(data.type == 'lost'){
		asl.events.fire(asl.events.types.signalLost);
	}
	
	if(data.type == 'restored'){
		asl.events.fire(asl.events.types.signalRestored);
	}

	if(signal.signalEvent){
		window[signal.signalEvent](data.json);
	}
});

asl.events.subscribe(asl.events.types.loaded, function(data) {
    try {
        //Only send message to disable the scanner, without changing the asl.prv.scannerEnabled
        scanner.disable();
        
        //parse the EMML tags
        var elements = document.getElementsByTagName('meta');
        for(var i = 0, length = elements.length; i < length; i++) {
            generic.InvokeMETAFunction(elements[i].getAttribute('http-equiv'), elements[i].getAttribute('content'));	
        }
    } catch(e) {}

    asl.prv.resetTimer();
    asl.prv.execMsgStack();
    asl.prv.parseEMML();
});

asl.prv.parseEMML = function(){
	//parse the EMML tags
    var elements = document.getElementsByTagName('meta');
    for(var i = 0, length = elements.length; i < length; i++) {
        try{
			generic.InvokeMETAFunction(elements[i].getAttribute('http-equiv'), elements[i].getAttribute('content'));
		}
		catch(e){}
    }
};

String.prototype.count = function (srch) {
    return this.split(srch).length - 1;
};