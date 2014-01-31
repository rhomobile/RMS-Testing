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
			"description":"Check for callback while starting service of target application",
			"intentType":"Rho.Intent.START_ACTIVITY",
			"intentAction":"ACTION_MAIN",
			"intentCategories":"",
			"intentAppName":"com.smap.targetapp",
			"intentTargetClass":"com.smap.targetapp.MyFirstService",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_005",
			"description":"Check for callback while starting service of target application which is running in the background",
			"intentType":"Rho.Intent.START_SERVICE",
			"intentAction":"ACTION_MAIN",
			"intentCategories":"",
			"intentAppName":"com.smap.targetapp",
			"intentTargetClass":"com.smap.targetapp.MyFirstService",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":""
		},
		{
			"id":"VT_ID_006",
			"description":"Check for callback while starting service of test application",
			"intentType":"Rho.Intent.START_SERVICE",
			"intentAction":"ACTION_MAIN",
			"intentCategories":"",
			"intentAppName":"com.rhomobile.manual_common_spec",
			"intentTargetClass":"com.rhomobile.rhodes.RhodesService",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"message":"Message to service"}
		},
		{
			"id":"VT_ID_007",
			"description":"Check for callback while broadcasting data from test to target application",
			"intentType":"Rho.Intent.BROADCAST",
			"intentAction":"com.smap.targetapp.mySecondAction",
			"intentCategories":"",
			"intentAppName":"",
			"intentTargetClass":"",
			"intentUri":"",
			"intentMimeType":"",
			"intentData":{"toast":"Target - Test case passed if you see this in Android Toast !"}
		},
		{
			"id":"VT_ID_008",
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
			"id":"VT_ID_009",
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
			"id":"VT_ID_010",
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
			"id":"VT_ID_011",
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
			"id":"VT_ID_012",
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
			"id":"VT_ID_013",
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
			"id":"VT_ID_014",
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
			"id":"VT_ID_015",
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
});