describe("Intent JS API Test", function() {
	var getpropertiesdata ='';
    var callbackstatus = false;

    var callbackgetproperties = function (data){
		getpropertiesdata = data;
		callbackstatus = true;
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
			"id":"VT_ID_001",
			"description":"Check for callback while starting an activity from target appliaction",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":"",
			"intentAppName":"com.smap.targetapp",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_002",
			"description":"Check for callback while starting an activity from target appliaction which is running in the background",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":"",
			"intentAppName":"com.smap.targetapp",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_003",
			"description":"Check for callback while starting an activity from target application using targetClass",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":"",
			"intentAppName":"com.smap.targetapp",
			"intentTargetClass":"com.smap.targetapp.MainActivity",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_004",
			"description":"Check for callback while launching browser from test application",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":["CATEGORY_APP_BROWSER"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_005",
			"description":"Check for callback while launching browser from test application",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":["CATEGORY_APP_MUSIC"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_006",
			"description":"Check for callback while launching browser from test application",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":["CATEGORY_APP_CALCULATOR"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_007",
			"description":"Check for callback while launching browser from test application",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":["CATEGORY_APP_CALENDAR"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_008",
			"description":"Check for callback while launching browser from test application",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":["CATEGORY_APP_CONTACTS"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_009",
			"description":"Check for callback while launching browser from test application",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":["CATEGORY_APP_EMAIL"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_010",
			"description":"Check for callback while launching browser from test application",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":["CATEGORY_APP_GALLERY"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_011",
			"description":"Check for callback while launching browser from test application",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":["CATEGORY_APP_MESSAGING"],
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
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
		if(isAndroidPlatform()){
			it(testCase[j].id +" | "+testCase[j].description, function() {
				runs(function(){
					Rho.Intent.send(paramArray[j], getpropertiesdata);
				});
				waitsFor(function(){
					return callbackstatus;
				}, '30sec Wait before move to next test', 30000);
				runs(function(){
					Rho.Application.restore();
					expect(paramArray[j]).toEqual(getpropertiesdata);
				});
			});
		}
	}
	if(isAndroidPlatform()){
		it('appName - Try to Launch non-existing Application via \'appName\' from test application.', function () {
	        var parameters = {intentType: Rho.Intent.START_ACTIVITY, action: 'ACTION_MAIN', appName: 'nonExistingApp'}
	        expect(function () {
	            Rho.Intent.send(parameters)
	        }).toThrow();
	    });
	    it('intentType - StartActivity: Try to launch target appilcation by \'className\', which is not installed.', function () {
		    var parameters = {intentType: Rho.Intent.START_ACTIVITY, action: 'ACTION_MAIN', appName: 'com.notInstalled', targetClass: 'dummyClass'}
		    expect(function () {
		        Rho.Intent.send(parameters)
		    }).toThrow();
	    });
		it('Start activity of absent application should raise exception', function () {
		    var parameters = {intentType: Rho.Intent.START_ACTIVITY, action: 'ACTION_MAIN', appName: 'com.notInstalled'}
		    expect(function () {
		        Rho.Intent.send(parameters)
		    }).toThrow();
		});
	}
    it('Sending Intent with null parameter should raise error', function(){
        expect(function () {
            Rho.Intent.send()
        }).toThrow();
    });
    it('Sending Intent with intent parameter Object with null values should raises error', function(){
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
    it('Sending Intent with callback which does\'n handle the input argument shouldn\'t raise error', function(){
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
    it('Sending Intent with variable in place of callback function', function(){
        var parameters = { intentType: Rho.Intent.START_ACTIVITY, action: 'ACTION_MAIN', appName: 'com.smap.targetapp' };
        var successCB = "This is not a call back function!";
        expect(function () {
            Rho.Intent.send(parameters, successCB);
        }).toThrow();
    });
    it('Broad cast with callback', function () {
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
        }).toThrow();
	});
    it('Start Listening to the background intents with empty callback', function () {

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
});