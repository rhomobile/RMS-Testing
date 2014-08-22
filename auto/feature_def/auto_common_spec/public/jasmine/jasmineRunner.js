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

    network_server = null;

    if (network_server !== null && network_server.length > 0) {
		var remoteReporter = new jasmine.NetworkReporter(network_server);
		jasmineEnv.addReporter(remoteReporter);
	}

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
                    fileReporter.saveResultsToLog();
                    Rho.Log.info('***Terminated','APP');
					setTimeout(function() {
						// give some time app to put all the log
						Rho.Application.quit();
					}, 5000);
                    return;
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
				// Bangalore Jenkins Directly replacing rhoconfig.txt on wm and ce devices by pointing start_path=/app/module_name/specRunner.html
				// Added this line to quit appliction automatically.
				Rho.Log.info('***Terminated','APP');
				setTimeout(function() {
					// give some time app to put all the log
					Rho.Application.quit();
				}, 5000);
				return;
			}
		};
		jasmineEnv.execute();
	}

})();
