describe("Intent JS API Test", function() {
	var getpropertiesdata ='';
    var callbackstatus = false;
    var callbackgetproperties = function (data){
        getpropertiesdata = data;
        callbackstatus = true;
        Rho.Application.restore();
	};
	var parameters = function (intentType, action, categories, appName, targetClass, uri, mimeType, data) {
    	var result = {};
	    if (intentType != "") result.intentType = intentType;
	    if (action != "") result.action = action;
	    if (categories != "") result.categories = categories;
	    if (appName != "") result.appName = appName;
	    if (targetClass != "") result.targetClass = targetClass;
	    if (uri != "") result.uri = uri;
	    if (mimeType != "") result.mimeType = mimeType;
	    if (data != "") result.data = data;
	    return result;
	};
	
		
	var testCase = [
		{
			"id":"VT328_47",
			"description":"Check for callback while starting an activity from target appliaction",
			"intentType":Rho.Intent.START_ACTIVITY,
			"intentAction":"android.intent.action.MAIN",
			"intentCategories":"",
			"intentAppName":"com.smap.targetapp",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"reply":"intent reply"}
		},
		{
			"id":"VT328_48",
			"description":"Check for callback while starting an activity from target appliaction which is running in the background",
			"intentType":Rho.Intent.START_ACTIVITY,
			"intentAction":"android.intent.action.MAIN",
			"intentCategories":"",
			"intentAppName":"com.smap.targetapp",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"reply":"intent reply"}
		},
		{
			"id":"VT328_49",
			"description":"Check for callback while starting an activity from target application using targetClass",
			"intentType":Rho.Intent.START_ACTIVITY,
			"intentAction":"android.intent.action.MAIN",
			"intentCategories":"",
			"intentAppName":"com.smap.targetapp",
			"intentTargetClass":"com.smap.targetapp.MainActivity",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"reply":"intent reply"}
		},
		{
			"id":"VT328_50",
			"description":"Check for callback while launching browser from test application",
			"intentType":Rho.Intent.START_ACTIVITY,
			"intentAction":"android.intent.action.MAIN",
			"intentCategories":["CATEGORY_APP_BROWSER"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"reply":"intent reply"}
		},
		{
			"id":"VT328_51",
			"description":"Check for callback while launching music player from test application",
			"intentType":Rho.Intent.START_ACTIVITY,
			"intentAction":"android.intent.action.MAIN",
			"intentCategories":["CATEGORY_APP_MUSIC"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"reply":"intent reply"}
		},
		{
			"id":"VT328_52",
			"description":"Check for callback while launching calculator from test application",
			"intentType":Rho.Intent.START_ACTIVITY,
			"intentAction":"android.intent.action.MAIN",
			"intentCategories":["CATEGORY_APP_CALCULATOR"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"reply":"intent reply"}
		},
		{
			"id":"VT328_53",
			"description":"Check for callback while launching calendar from test application",
			"intentType":Rho.Intent.START_ACTIVITY,
			"intentAction":"android.intent.action.MAIN",
			"intentCategories":["CATEGORY_APP_CALENDAR"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"reply":"intent reply"}
		},
		{
			"id":"VT328_54",
			"description":"Check for callback while launching contacts from test application",
			"intentType":Rho.Intent.START_ACTIVITY,
			"intentAction":"android.intent.action.MAIN",
			"intentCategories":["CATEGORY_APP_CONTACTS"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"reply":"intent reply"}
		},
		{
			"id":"VT328_55",
			"description":"Check for callback while launching email from test application",
			"intentType":Rho.Intent.START_ACTIVITY,
			"intentAction":"android.intent.action.MAIN",
			"intentCategories":["CATEGORY_APP_EMAIL"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"reply":"intent reply"}
		},
		{
			"id":"VT328_56",
			"description":"Check for callback while launching gallery from test application",
			"intentType":Rho.Intent.START_ACTIVITY,
			"intentAction":"android.intent.action.MAIN",
			"intentCategories":["CATEGORY_APP_GALLERY"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"reply":"intent reply"}
		},
		{
			"id":"VT328_57",
			"description":"Check for callback while launching messaging from test application",
			"intentType":Rho.Intent.START_ACTIVITY,
			"intentAction":"android.intent.action.MAIN",
			"intentCategories":["CATEGORY_APP_MESSAGING"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"reply":"intent reply"}
		}
	];

	var paramArray = [];

	for (var i=0; i<testCase.length; i++){
		var params = new parameters(testCase[i].intentType,testCase[i].intentAction,testCase[i].intentCategories,testCase[i].intentAppName,testCase[i].intentTargetClass,testCase[i].intentUri,testCase[i].intentMimeType,testCase[i].intentData);
		paramArray.push(params);
		console.log("params : " + JSON.stringify(params));
	}
	beforeEach(function(){
		console.log("This is before each ");
		var getpropertiesdata ='';
    	var callbackstatus = false;
	});
	for (var j=0; j<paramArray.length; j++){
		var i = 0;
		if(isAndroidPlatform()){
			it(testCase[j].id +" | "+testCase[j].description, function() {
				runs(function(){
					Rho.Intent.send(paramArray[i], callbackgetproperties);
				});
				waitsFor(function(){
					return callbackstatus;
				}, '30sec Wait before move to next test', 30000);
				runs(function(){
                    expect(callbackstatus).toEqual(true);
                    expect(paramArray[i].data["reply"]).toEqual(getpropertiesdata.data["reply"]);
					i++;
				});
			});
		}
	}
	it('VT328_58 | appName - Try to Launch non-existing Application via \'appName\' from test application.', function () {
        var parameters = {intentType: Rho.Intent.START_ACTIVITY, action: 'android.intent.action.MAIN', appName: 'nonExistingApp'}
        expect(function () {
            Rho.Intent.send(parameters)
        }).toThrow();
    });
	if(isAndroidPlatform()){
	    it('VT328_59 | intentType - StartActivity: Try to launch target appilcation by \'className\', which is not installed.', function () {
		    var parameters = {intentType: Rho.Intent.START_ACTIVITY, action: 'android.intent.action.MAIN', appName: 'com.notInstalled', targetClass: 'dummyClass'}
		    expect(function () {
		        Rho.Intent.send(parameters)
		    }).toThrow();
	    });
		it('VT328_60 | Start activity of absent application should raise exception', function () {
		    var parameters = {intentType: Rho.Intent.START_ACTIVITY, action: 'android.intent.action.MAIN', appName: 'com.notInstalled'}
		    expect(function () {
		        Rho.Intent.send(parameters)
		    }).toThrow();
		});
	}
    it('VT328_61 | Sending Intent with null parameter should raise error', function(){
        expect(function () {
            Rho.Intent.send()
        }).toThrow();
    });
    it('VT328_62 | Sending Intent with intent parameter Object with null values should raises error', function(){
        var parameters = {
            intentType: null,
            action: null,
            categories: null,
            appName: null,
            targetClass: null,
            uri: null,
            mimeType: null,
            data: null}
        expect(function () {
            Rho.Intent.send(parameters)
        }).toThrow();
    });
    it('VT328_63 | Sending Intent with callback which does\'n handle the input argument shouldn\'t raise error', function(){
        var parameters = {
            intentType: null,
            action: null,
            categories: null,
            appName: null,
            targetClass: null,
            uri: null,
            mimeType: null,
            data: null}
        expect(function () {
            Rho.Intent.send(parameters, function(){})
        }).not.toThrow();

    });
    it('VT328_64 | Sending Intent with variable in place of callback function', function(){
        var parameters = { intentType: Rho.Intent.START_ACTIVITY, action: 'android.intent.action.MAIN', appName: 'com.smap.targetapp' };
        var successCB = "This is not a call back function!";
        expect(function () {
            Rho.Intent.send(parameters, successCB);
        }).toThrow();
    });
    if(isAndroidPlatform()){
	    it('VT328_65 | Broad cast with callback', function () {
	        var data = {
	            "myData":"This is broad cast data 2!"
	        };
	        var params = new parameters(Rho.Intent.BROADCAST,"","com.rhomobile.BROADCAST",["com.rhomobile.manual_common_spec"],"","","","",data);
	        var receiveCB = function(intent){
	            if(intent.data.myData == "This is broad cast data 2!")
	            {
	                alert("Test case passed !");
	            }
	        };
	        expect(function () {
	        	Rho.Intent.send(params, receiveCB);
	        }).not.toThrow();
		});
    }
    it('VT328_66 | Start Listening to the background intents with empty callback', function () {

        var parameters;
        if (isAndroidPlatform()) {
            parameters = {intentType: Rho.Intent.BROADCAST, action: "com.rhomobile.BROADCAST", appName: "com.rhomobile.manual_common_spec", data: {myData: "This is broad cast data!" } };
        }
        if (isApplePlatform()) {
            parameters = {intentType: Rho.Intent.BROADCAST, action: "com.rhomobile.BROADCAST", appName: "testapp", data: {myData: "This is broad cast data!" } };
        }
        if (isAnyWindowsFamilyPlatform()) {
            parameters = {intentType: Rho.Intent.BROADCAST, appName: "rhomobile TestApp/TestApp.exe", data: {myData: "This is broad cast data!" } };
        }

        expect(function () {
            Rho.Intent.startListening();
            Rho.Intent.send(parameters);
        }).toThrow();
    });
    
    if ( isAndroidPlatform() ) {
        it('VT328_66 | Pass intent data array with unsupported type', function() {
            var parameters = { intentType:Rho.Intent.START_ACTIVITY, action:"ACTION_SEND", data:{"EXTRA_EMAIL":[0.1,0.2,0.3]} };
           
            expect(function () {
                Rho.Intent.send(parameters);
            }).toThrow();
        });
    }
});