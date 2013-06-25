Object.prototype.equals = function(b) {
	var act = this;
	for(item in act) {  
		if(typeof b[item] == 'undefined') {
			return false;
		}
		if(typeof b[item] == 'object') {
			if(!b[item].equals(act[item])) {
				return false;
			}
		}
		if(b[item] != act[item]) {
			return false;
		}
	}
	for(item in b) {
		if(typeof act[item] == 'undefined') {
			return false;
		}
		if(typeof act[item] == 'object') {
			if(!act[item].equals(b[item])) {
				return false;
			}
		}
		if(act[item] != b[item]) {
			return false;
		}
	} 
	return true;
}

describe("Video Capture module JS test starts here", function () {
	describe("Video Capture Test", function() {
		var callbackstatus = false;
		beforeEach(function(){
			callbackstatus = false;
		});
		afterEach(function() {
			/* ... Tear it down ... */
		});

		 var callbackgetproperties = function (data){
			getpropertiesdata = JSON.stringify(data);
			callbackstatus = true;
		}
		var callbackgetproperty = function (data){
			getpropertydata = data;
			callbackstatus = true;
		}
		//if (isAndroidPlatform() || isApplePlatform() || isWindowsMobilePlatform()) {
			it("VT281-0650 | Call getProperty method with call back videocapture|", function() {
				var data = Rho.Videocapture.getProperty("duration", callbackgetproperty);
				expect(callbackstatus).toEqual(true);
				expect(data).toEqual(5000);
			});
		
			it("VT281-0651 | Call getProperty method without callback for duration videocapture|", function() {
				var data = Rho.Videocapture.getProperty("duration");
				expect(data).toEqual(5000);
			});	
		//}	

		//if (isAndroidPlatform() || isWindowsMobilePlatform()) {
			it("VT281-0652 | Call getProperty method for saveToGallery videocapture|", function() {
				var data = Rho.Videocapture.getProperty("saveToGallery");
				expect(data).toEqual(false);
			});
		
			it("VT281-0653 | Call getProperty method for resolution videocapture|", function() {
				var data = Rho.Videocapture.getProperty("resolution");
				expect(data).toEqual("high");
			});	
		//}
		//if (isAndroidPlatform() || isApplePlatform() || isWindowsMobilePlatform()) {
			it("VT281-0654 | Call getProperty method for filename videocapture|", function() {
				var data = Rho.Videocapture.getProperty("filename");
				expect(data).toEqual("videocapture");
			});
		//}	
		
		
		it("VT281-0655 | Call getProperties method for filename,resolution, saveToGallery and duration videocapture|", function() {
			var data = Rho.Videocapture.getProperties(['filename', 'resolution', 'saveToGallery', 'duration']);
			var actual = {'filename': 'videocapture', 'resolution': 'high', 'saveToGallery': 'false', 'duration': '5000'};
			expect(data.equals(actual)).toEqual(true);
		});	
		
		it("VT281-0656 | Call setProperties method for filename,resolution, saveToGallery and duration videocapture|", function() {
			Rho.Videocapture.setProperties({'filename':'/Temp/Rhovideocapture', 'resolution':'low', 'saveToGallery': 'true', 'duration': '10000'});
			var data = Rho.Videocapture.getProperties(['filename', 'resolution', 'saveToGallery', 'duration']);
			var actual = {'filename':'/Temp/Rhovideocapture', 'resolution':'low', 'saveToGallery': 'true', 'duration': '10000'};
			expect(data.equals(actual)).toEqual(true);
		});	

		it("VT281-0657 | Call getAllProperties method videocapture|", function() {
			Rho.Videocapture.setProperties({'filename':'/Temp/Rhovideocapture', 'resolution':'low', 'saveToGallery': 'true', 'duration': '10000'});
			var data = Rho.Videocapture.getAllProperties();
			var actual = {'filename':'/Temp/Rhovideocapture', 'resolution':'low', 'saveToGallery': 'true', 'duration': '10000'};
			expect(data.equals(actual)).toEqual(true);
		});	

		it("VT281-0658 | Call clearAllProperties method videocapture|", function() {
			Rho.Videocapture.setProperties({'filename':'/Temp/Rhovideocapture', 'resolution':'low', 'saveToGallery': true, 'duration': '10000'});
			Rho.Videocapture.clearAllProperties();
			var data = Rho.Videocapture.getAllProperties();
			var actual = {'filename': 'videocapture', 'resolution': 'high', 'saveToGallery': 'false', 'duration': '5000'};
			expect(data.equals(actual)).toEqual(true);
		});		
		
		
	});

	describe("Videocapture module - setProperty / getProperty tests starts Here", function () {

        for (var i = 0; i < video_setget_property.length; i++) {
            (function (idx) {

                var record = video_setget_property[i];
                var testName = record['testName'];
                var suitablePlatforms = record['osType'];
                var propertyName = record['propertyName'];
                var stringValue = record['propertyValue'];
                var expectedValue = record['expectedResult'];

                if (isTestApplicable(suitablePlatforms)) {
                    it(testName, function () {
                        Rho.Videocapture.setProperty(propertyName, stringValue)

                        var actual = Rho.Videocapture.getProperty(propertyName);
                        expect(actual).toEqual(expectedValue);
                    });
                }
            })(i);
        }
	});

    describe("Videocapture module - setProperties / getProperties test starts here", function () {

        for (var i = 0; i < video_setget_properties.length; i++) {
            (function (idx) {

                var record = video_setget_properties[i];
                var testName = record['testName'];
                var suitablePlatforms = record['osType'];
                var propertyName = record['propertyName'];
                var stringValue = record['propertyValue'];
                var expectedValue = record['expectedResult'];

                if (isTestApplicable(suitablePlatforms)) {
                    it(video_setget_properties[idx]['testName'], function () {

                        var propertyValue = stringValue;
                        if (["true", "false"].indexOf(stringValue) != -1) {
                            propertyValue = (stringValue == "true" ? true : false);
                        }
                        if (/^\d+$/.test(stringValue)) {
                            propertyValue = parseInt(stringValue);
                        }
                        var obj = {};
                        obj[propertyName] = propertyValue;
                        Rho.Videocapture.setProperties(obj);

                        var readedObj =  Rho.Videocapture.getProperties([propertyName]);
                        expect(readedObj[propertyName]).toEqual(expectedValue);
                    });
                }
            })(i);
        }
    });
});