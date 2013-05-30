describe("System Module JS Test Starts Here", function() {
	describe("System Module-Setting Directly Test Starts Here", function() {

		it("VT300-003 | call getProperty with  applicationIconBadge as 1 | 1", function() {
			Rho.System.applicationIconBadge = 1;
		    expect(Rho.System.applicationIconBadge).toEqual(1);
			alert(htmlReporter.focusedSpecName());
		});

		it("VT300-004 | call getProperty with  applicationIconBadge as 0 | 0", function() {
			
			Rho.System.applicationIconBadge = 0;
		    expect(Rho.System.applicationIconBadge).toEqual(0);
			
		});

		it("VT300-022 | call getProperty with httpProxyURI | 'http://wwwgate0.mot.com:1080'", function() {

			Rho.System.httpProxyURI = 'http://wwwgate0.mot.com:1080';
	    	var data =  Rho.System.getProperty('httpProxyURI');
			expect(data).toEqual('http://wwwgate0.mot.com:1080');

		});
	
		it("VT300-027 | set localServerPort | 8081", function() {
			
			Rho.System.localServerPort = 8081;
		    var data =  Rho.System.getProperty('localServerPort');
			expect(data).toEqual(8081);
			
		});
		
		it("VT300-029 | call getProperty with locale | en", function() {
			
			Rho.System.locale = 'en';
		    var data =  Rho.System.getProperty('locale');
			expect(data).toEqual(en);
			
		});
		
		it("VT300-033 | set lockWindowSize as True, call getProperty with lockWindowSize | true", function() {
			
			Rho.System.lockWindowSize = true;
		    var data =  Rho.System.getProperty('lockWindowSize');
			expect(data).toEqual('true');
			
		});

		it("VT300-034 | set lockWindowSize as false, call getProperty with lockWindowSize | false", function() {
			
			Rho.System.lockWindowSize = false;
		    var data =  Rho.System.getProperty('lockWindowSize');
			expect(data).toEqual('false');
			
		});

		it("VT300-046 | set screenAutoRotate as false, call getProperty with screenAutoRotate | false", function() {

				Rho.System.screenAutoRotate = false;
		    	var data =  Rho.System.getProperty('screenAutoRotate');
				expect(data).toEqual('false');
		});

		it("VT300-047 | set screenAutoRotate as true, call getProperty with screenAutoRotate | true", function() {

				Rho.System.screenAutoRotate = true;
		    	var data =  Rho.System.getProperty('screenAutoRotate');
				expect(data).toEqual('true');

		});
		
		
		it("VT300-054 | set screenSleeping as true, call getProperty with screenSleeping | true", function() {

				Rho.System.screenSleeping = true;
		    	var data =  Rho.System.getProperty('screenSleeping');
				expect(data).toEqual('true');

		});
		
		it("VT300-055 | set screenSleeping as false, call getProperty with screenSleeping | false", function() {

				Rho.System.screenSleeping = false;
		    	var data =  Rho.System.getProperty('screenSleeping');
				expect(data).toEqual('false');

		});
		
		it("VT300-070 | call getAllProperties() | ", function() {

		    	var data =  Rho.System.getAllProperties();
				displayResult("VT300-070 | call getAllProperties() | ",$.toJSON(data));

		});
		
		it("VT300-077 | call isApplicationInstalled() with application name which is there in device | ", function() {
			
				var data = Rho.System.isApplicationInstalled('rhomobile nativejasmine');
				displayResult("VT300-077 | call isApplicationInstalled() with application name which is there in device | ",data);
			
		});
		
		it("VT300-077 | call isApplicationInstalled() with application name which is there in device | ", function() {
			
				var data = Rho.System.isApplicationInstalled('com.rhomobile.nativejasmine');
				displayResult("VT300-077 | call isApplicationInstalled() with application name which is there in device | ",data);
			
		});
		
		it("VT300-078 | call isApplicationInstalled() with application name which is not there in device | ", function() {
			
				var data = Rho.System.isApplicationInstalled('RhoElements3');
				displayResult("VT300-078 | call isApplicationInstalled() with application name which is not there in device | ",data);
			
		});

		it("VT300-068 | call clearAllProperties() | false,true,false", function() {
			Rho.System.screenSleeping = false;
			Rho.System.screenAutoRotate = false;
			Rho.System.lockWindowSize = false;

			Rho.System.clearAllProperties();

			var objData = Rho.System.getProperties(['screenSleeping','screenAutoRotate','lockWindowSize'])

			var result = objData['screenSleeping'] +','+ objData['screenAutoRotate'] +','+ objData['lockWindowSize']
			
			expect(result).toEqual('false,true,false');
		});

		it("VT278-187 | call getRegistrySetting with hive as HKLM type as MULTISZ subkey as Software setting as Rhoelements value as hello world , call setRegistrySetting with hive, subkey and setting | hello world", function() {

			Rho.System.setRegistrySetting({hive:'HKLM', type:'MULTISZ', key:'Software', setting:'RhoElementsTest', value:'hello world', persistent:'true'});
			var data = Rho.System.getRegistrySetting({hive:'HKLM', key:'Software', setting:'RhoElementsTest'});
			expect(data).toEqual('hello world');

		});

		it("VT278-189 | call setRegistrySetting with hive, subkey and setting and check the ret value | 10101010", function() {

			Rho.System.setRegistrySetting({hive:'HKLM', type:'Binary', key:'Software', setting:'Rho', value:'10101010', persistent:'false'});
			var data = Rho.System.getRegistrySetting({hive:'HKLM', type:'Binary', key:'Software', setting:'Rho'});
			expect(data).toEqual(10101010);

		});

		it("VT278-190 | call setRegistrySetting with invalid key and check the ret value | 1010101", function() {

			Rho.System.setRegistrySetting({hive:'HKLM', type:'Binary', key:'Honey', setting:'RhoElementsTest', value:'1010101', persistent:'false'});
			var data = Rho.System.getRegistrySetting({hive:'HKLM', type:'Binary', key:'Honey', setting:'RhoElementsTest'});
			expect(data).toEqual(1010101);

		});

		it("VT278-191 | call deleteRegistrySetting  with Persistence  check the return value | Test123", function() {

			Rho.System.setRegistrySetting({hive:'HKCU', type:'String', key:'Software', setting:'RhoElementsTest', value:'Test123', persistent:'true'});
			var data = Rho.System.getRegistrySetting({hive:'HKCU', type:'String', key:'Software', setting:'RhoElementsTest'});
			expect(data).toEqual('Test123');

		});

		it("VT278-192 | call setRegistrySetting with invalid key and check the ret value | false", function() {

			var data = Rho.System.deleteRegistrySetting({hive:'HKLM',key:'Softy', setting:'RhoElementsTest',persistent:'true'});
			expect(data).toEqual('true');

		});

		it("VT278-193 | set and getRegistry setting with HKU and persistence as True and type MultiSZ | hello world", function() {

			Rho.System.deleteRegistrySetting({hive:'HKU', type:'MultiSZ', key:'Software', setting:'RhoElementsTest', value:'hello world', persistent:'true'});
			var data = Rho.System.getRegistrySetting({hive:'HKU', key:'Software', setting:'RhoElementsTest'});
			expect(data).toEqual('hello world');

		});

		it("VT278-194 | set and getRegistry setting with HKCU and persistence as False and Type as String | Test123", function() {

			Rho.System.setRegistrySetting({hive:'HKCU', type:'String', key:'Software', setting:'Motorola', value:'Test123', persistent:'false'});
			var data = Rho.System.getRegistrySetting({hive:'HKCU', key:'Software', setting:'Motorola'});
			expect(data).toEqual('Test123');

		});

		it("VT278-195 | set and getRegistry setting with HKCR and persistence as False and Type as DWORD | 12345", function() {

			Rho.System.setRegistrySetting({hive:'HKCR', type:'DWORD', key:'Software', setting:'Symbol', value:'12345', persistent:'false'});
			var data = Rho.System.getRegistrySetting({hive:'HKCR', key:'Software', setting:'Symbol'});
			expect(data).toEqual('12345');

		});

		it("VT278-196 | set and getRegistry setting with HKLM and persistence True and Type as Binary | 111111", function() {

			Rho.System.setRegistrySetting({hive:'HKLM', type:'Binary', key:'Software', setting:'RhoTnV', value:'111111', persistent:'true'});
			var data = Rho.System.getRegistrySetting({hive:'HKLM', key:'Software', setting:'RhoTnV'});
			expect(data).toEqual('111111');

		});

		it("VT278-197 | set and getRegistry setting with HKLM and persistence False and Type as Binary and key as multilevel path | 111111", function() {

			Rho.System.setRegistrySetting({hive:'HKLM', type:'Binary', key:'Software\Symbol\Audio', setting:'Rhoelement', value:'111111', persistent:'false'});
			var data = Rho.System.getRegistrySetting({hive:'HKLM', key:'Software\Symbol\Audio', setting:'Rhoelement'});
			expect(data).toEqual('111111');

		});

		it("VT278-198 | call getRegistry setting with invalid properties | ", function() {

			var data = Rho.System.getRegistrySetting({hive:'HKLM', key:'Boo', setting:'Rhoelement'});
			expect(data).toEqual('');

		});

	});

	describe("System Module- getProperty Test Starts Here", function() {
		var m = 0;

		for (var i=0;i<sys_get_property.length;i++){

		it(sys_get_property[i]['testName'], function() {

			var data = Rho.System.getProperty(sys_get_property[m]['propertyName']);
			displayResult(sys_get_property[m]['testName'],data);
			m++;
	   		
		});
		
		}
	});


	describe("System Module- setProperty/getProperty Test Starts Here", function() {
		var k =0;

		for (var i=0;i<sys_setget_property.length;i++){
		
		it(sys_setget_property[i]['testName'], function() {
		
			Rho.System.setProperty(sys_setget_property[k]['propertyName'],sys_setget_property[k]['propertyValue'])
			var data = Rho.System.getProperty(sys_setget_property[k]['propertyName']);
			displayResult(sys_setget_property[k]['testName'],data);
			expect(data).toEqual(sys_setget_property[k]['expectedResult']);
			k++;
						
		});
		
		}

		it("VT300-123 | call clearAllProperties() after seeting the properties with setproperty | false,true,false", function() {
			Rho.System.setProperty('screenSleeping','false');
			Rho.System.setProperty('screenAutoRotate','false');
			Rho.System.setProperty('lockWindowSize','false');

			Rho.System.clearAllProperties();

			var objData = Rho.System.getProperties(['screenSleeping','screenAutoRotate','lockWindowSize'])

			var result = objData['screenSleeping'] +','+ objData['screenAutoRotate'] +','+ objData['lockWindowSize']

			expect(result).toEqual('false,true,false');
		});

	});

	describe("System Module- getProperties Test Starts Here", function() {
		var m = 0;

		for (var i=0;i<sys_get_properties.length;i++){

		it(sys_get_properties[i]['testName'], function() {

			var data = Rho.System.getProperties(sys_get_properties[m]['propertyName']);
			displayResult(sys_get_properties[m]['testName'],$.toJSON(data));
			m++;
		});
		
		}

		it("VT300-126 | call getproperties with callback as anonymous function | ", function() {
			var data = '';
			var flag = false;

			runs(function(){
			
				Rho.System.getProperties(['country','deviceName','devicePushId','freeServerPort'],function(objData){
					data = $.toJSON(objData);
					}
				);

				// 1 Sec Wait
				setTimeout(function() {
        			flag = true;
     			}, 1000);
			});

			waitsFor(function() {
    			return flag;
    		}, "1 sec wait", 2000);

    		runs(function(){
				displayResult("VT300-126 | call getproperties with callback as anonymous function | ",data);
			});
		});

		it("VT300-127 | call getproperties with callback as async defined function | ", function() {
			var data = '';
			var flag = false;
			var sysAsyncCallback = function (objData){data = $.toJSON(objData);}

			runs(function(){
			
				Rho.System.getProperties(['country','deviceName','devicePushId','freeServerPort'],sysAsyncCallback);

				// 1 Sec Wait
				setTimeout(function() {
        			flag = true;
     			}, 1000);
			});

			waitsFor(function() {
    			return flag;
    		}, "1 sec wait", 2000);

    		runs(function(){
				displayResult("VT300-127 | call getproperties with callback as anonymous function | ",data);
			});
		});

	});

	describe("System Module- setProperties/getProperties Test Starts Here", function() {
		var k =0;

		for (var i=0;i<sys_setget_properties.length;i++){
		
		it(sys_setget_properties[i]['testName'], function() {
		
			var obj = jQuery.parseJSON(sys_setget_properties[k]['setPropertyName']);
			Rho.System.setProperties(obj);
			var data = Rho.System.getProperties(sys_setget_property[k]['getPropertyName']);
			displayResult(sys_setget_properties[k]['testName'],$.toJSON(data));
			expect(data).toEqual(sys_setget_properties[k]['expectedResult']);
			k++;
		});
		
		}

	});

});