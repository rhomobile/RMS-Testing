function quit()
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","/app/Settings/quitApp", false);
	xmlhttp.send();
}

(function ()
{
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);

    var rhologReporter = new jasmine.RhologReporter();
    jasmineEnv.addReporter(rhologReporter);

    var fileReporter = new jasmine.FileReporter("failedSpecs.txt");
    jasmineEnv.addReporter(fileReporter);

    // var remoteReporter = new jasmine.NetworkReporter('http://192.168.1.239:8081/upload_test_log');
    // jasmineEnv.addReporter(remoteReporter);

	//var junitReporter = new jasmine.JUnitXmlReporter();
	//junitReporter.useDotNotation = false


	jasmineEnv.addReporter(new jasmine.JUnitXmlReporter('.\\', true, true));
	jasmineEnv.specFilter = function (spec) {
		return htmlReporter.specFilter(spec);
	};

	var currentWindowOnload = window.onload;
	window.onload = function () {
		if (currentWindowOnload) {
			currentWindowOnload();
		}
		execJasmine();
	};

	function execJasmine()
	{
		var oldCallback = jasmineEnv.currentRunner().finishCallback;
		jasmineEnv.currentRunner().finishCallback = function()
		{
			try
			{
				oldCallback.apply(this, arguments);
			}
			catch(e)
			{
				console.log('Could not send results: ' + e);
			}
			var getParams = window.location.search.replace( "?", "" );
			if(getParams.length > 0)
			{
				var decodedParams = decodeURIComponent(getParams);
				var decodedArray = JSON.parse(decodedParams);
				var nextPageUrl = '../' + decodedArray[0];
				if(decodedArray.length == 0)
				{
                    			var contents = Rho.RhoFile.read(fileReporter.path());
                    			Rho.Log.info( "\r\n" + contents, "FailedSpecs summary");
                    			Rho.Application.quit();
				}
				else if(decodedArray.length == 1)
				{
					window.location.href = nextPageUrl + "?" + encodeURIComponent("[]");
					return;
				}
				var newArray = decodedArray.slice(1,decodedArray.length);
				var encodedArray = encodeURIComponent(JSON.stringify(newArray));
				window.location.href = nextPageUrl + '?' + encodedArray;
			}
			else
			{
				//Running locally. Ignore
			}
		};
		jasmineEnv.execute();
	}

})();
