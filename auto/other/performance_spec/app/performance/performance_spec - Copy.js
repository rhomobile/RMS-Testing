describe("Performance Tests", function () {
	
	beforeEach(function() {
			var el = document.getElementById("frameContainer");
			el.innerHTML = "";
		});
	
	xdescribe ("JQuery List Performance Test", function () {
		var isPageLoaded = false;
		var myiframe;	
		beforeEach(function() {
				isPageLoaded = false;
				var el = document.getElementById("frameContainer");
				el.innerHTML = "<iframe id=\"myiframe\"></iframe>";
				myiframe = document.getElementById("myiframe");
				myiframe.onload = function() {
					isPageLoaded = true;	
					//console.log("myiframe onload()");
				};
			});
					
		
		it("renders a JQuery list of 25 items", function () {
			startTime = new Date().getTime();
			console.log("startTime: " + startTime);
			runs(function () {
				myiframe.src = "../app/test_pages/List/small.html";
			});
			waitsFor(function () {
				//console.log("waiting...isPageLoaded:" + isPageLoaded);
				return isPageLoaded;
			}, "it took too long to load", 30000);
			
			runs(function() {
				endTime = new Date().getTime();
				console.log("endTime: " + endTime);
				expect(endTime - startTime).not.toBeGreaterThan(30000);
			});
		});
		
		it("renders a JQuery list of 270 items", function () {
			startTime = new Date().getTime();
			console.log("startTime: " + startTime);
			runs(function () {
				myiframe.src = "../app/test_pages/List/index.html";
			});
			waitsFor(function () {
				//console.log("waiting...isPageLoaded:" + isPageLoaded);
				return isPageLoaded;
			}, "it took too long to load", 30000);
			
			runs(function() {
				endTime = new Date().getTime();
				console.log("endTime: " + endTime);
				expect(endTime - startTime).not.toBeGreaterThan(30000);
			});
		});
	});
	
	describe ("Barcode Performance Test", function () {
		var counter;
	
		function scan_received(params)
		{
		    if (params["status"]=="ok")
		    {
				counter++;
				console.log('Barcode counter: ' + counter);
		    } 
		    else
		    {
		    	console.log('Barcode scanning aborted');
		    }
		}

		beforeEach(function() {
			var enableflag = false;
				counter = 0;
				Rho.Barcode.enable({}, scan_received)
				setTimeout(function() {
					enableflag = true;
				}, 5000);
				waitsFor(function () {
					return enableflag;
				}, "Scanner is not enabled", 10000);
			});
			
		afterEach(function() {
			Rho.Barcode.stop();
		});
					
		it("scans a barcode 30 times", function () {
			startTime = new Date().getTime();
			console.log("startTime: " + startTime);
			runs(function () {
				for (var i=0; i<=30; i++)
				{
					Rho.Barcode.start();
				}
			});
			waitsFor(function () {
				//console.log("waiting...isPageLoaded:" + isPageLoaded);
				return counter == 30;
			}, "it took too long to scan", 60000);
			
			runs(function() {
				endTime = new Date().getTime();
				console.log("endTime: " + endTime);
				expect(endTime - startTime).not.toBeGreaterThan(60000);
			});
		});
	});
});	

