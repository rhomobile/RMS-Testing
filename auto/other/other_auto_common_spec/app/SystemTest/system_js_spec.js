describe("System module JS test starts here", function () {
	describe("System module - setting directly test starts here", function () {
		//if (isWindowsMobilePlatform() || isWindowsDesktopPlatform()) {
		    it("VT300-199 | call setRegistry with key as null hive as HKLM, type as Binary, subkey as null, setting as Rhoelements, value as 11111| false", function () {
		       var description;
		        try{
			        Rho.System.setRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: null, setting: 'RhoElements', value: '11111'});
	                var data = Rho.System.getRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: null, setting: 'RhoElements', value: '11111'});
	                displayResult("VT300-199 | call setRegistry with key as null hive as HKLM, type as Binary, subkey as null, setting as Rhoelements, value as 11111| false",data);
				}catch (e) {
		            description = e.description;
		            displayResult("VT300-199 | Error: ",description);
		        }
	               // expect(data).toEqual(false);

            });
      //  }

     //  	if (isWindowsMobilePlatform() || isWindowsDesktopPlatform()) {
		    it("VT300-200 | call set registry with setting as null hive as HKLM, type as Binary, subkey as Software, setting as null, value as 11111| false", function () {
		        var description;
		        try{
			        Rho.System.setRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: 'Software', setting: null, value: '11111'});
	                var data = Rho.System.getRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: 'Software', setting: null, value: '11111'});
	                displayResult("VT300-200 | call set registry with setting as null hive as HKLM, type as Binary, subkey as Software, setting as null, value as 11111| false",data);
	            }catch (e) {
	            	description = e.description;
		            displayResult("VT300-200 | Error: ",description);
	            }
               // expect(data).toEqual(false);

            });
     //   }

     //   if (isWindowsMobilePlatform() || isWindowsDesktopPlatform()) {
		    it("VT300-201 | call set resgistry with invalid persitent value hive as HKLM, type as Binary, subkey as Software, setting as Rhoelements, value as 11111, Persistent :boo| false", function () {
		        var description;
		        try{
			        Rho.System.setRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: 'Software', setting: 'Rhoelements', value: '11111', Persistent: 'boo'});
	                var data = Rho.System.getRegistrySetting({hive: 'HKLM', type: 'Binary', subkey: 'Software', setting: 'Rhoelements', value: '11111', Persistent: 'boo'});
	                displayResult("VT300-201 | call set resgistry with invalid persitent value hive as HKLM, type as Binary, subkey as Software, setting as Rhoelements, value as 11111, Persistent :boo| false",data);
					}catch (e) {
		            	description = e.description;
			            displayResult("VT300-201 | Error: ",description);
	            }
                //expect(data).toEqual(false);

            });
     //   }

       // if (isApplePlatform()) {
            it("VT300-202 | Set applicationIconBadge as null or empty", function () {
                
                var description;
		        try{
		            Rho.System.applicationIconBadge = null;
		        } catch (e) {
		            description = e.description;
		            displayResult("VT300-203 | Set applicationIconBadge as -10000 | ",description);
		        }
		        //expect(description).toEqual('');
            });
      
     
            it("VT300-203 | Set applicationIconBadge as -10000", function () {
                
                var description;
		        try{
		            Rho.System.applicationIconBadge = -10000;
		        } catch (e) {
		            description = e.description;
		            displayResult("VT300-203 | Set applicationIconBadge as -10000 | ",description);
		        }
		        //expect(description).toEqual('');
            });

      //  }

      	//if (isAnyWindowsFamilyPlatform()) {
            it("VT300-206/VT300-207 | call set and get Property with httpProxyURI with Null parameter| ", function () {
            	var description;
		        try{
		            Rho.System.httpProxyURI = null;
                	var data = Rho.System.getProperty('httpProxyURI');
               
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-203 | Set applicationIconBadge as -10000 | ",description);
		        }
		        //expect(description).toEqual('');
               

            });
      //  }
      		it("VT300-210| Call localServerPort to invalid value Null| ", function () {
            	var description;
		        try{
		             
                	var data = Rho.System.localServerPort(null);
                	displayResult("VT300-210| Call localServerPort to invalid value Null|  ",data);
               
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-210| Error: |  ",description);
		        }
		        //expect(description).toEqual('');
               

            });

      		it("VT300-211| set lockWindowSize as Null| ", function () {
            	var description;
		        try{
		             
                	var data = Rho.System.localServerPort(null);
                	displayResult("VT300-210| Call localServerPort to invalid value Null|  ",data);
               
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-210| Error: |  ",description);
		        }
		        //expect(description).toEqual('');
               

            });

			it("VT300-211| set lockWindowSize as Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.lockWindowSize = null;
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-211| set lockWindowSize as Null |  ",description);
		        }
		        //expect(description).toEqual('');
               

            });

            it("VT300-214| set screenAutoRotate as null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.screenAutoRotate = null;
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-214| set screenAutoRotate as null|  ",description);
		        }
		        //expect(description).toEqual('');
               

            });


            it("VT300-217| set screenSleeping as NULL call getProperty with screenSleeping| ", function () {
            	var description;
		        try{
		             
                	Rho.System.screenSleeping = null;
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-217| set screenSleeping as NULL call getProperty with screenSleeping|  ",description);
		        }
		        //expect(description).toEqual('');

            });              

            it("VT300-220| call set property with keyboardState as null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.keyboardState = null;
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-220| call set property with keyboardState as null|  ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-223| call applicationInstall with Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.applicationInstall(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-223| call applicationInstall with Null|  ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-224| call isApplicationInstalled() with Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.isApplicationInstalled(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-224| call isApplicationInstalled() with Null|  ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-225| call deleteFolder with Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.deleteFolder(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-225| call deleteFolder with Null| ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-226| call openUrl() with Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.openUrl(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-226| call openUrl() with Null| ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-227| call replaceCurrentBundle() with Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.replaceCurrentBundle(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-227| call replaceCurrentBundle() with Null|",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-228| call setDoNotBackupAttribute with Null path doNotBackup as Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.setDoNotBackupAttribute(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-228| call setDoNotBackupAttribute with Null path doNotBackup as Null| ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-229| call setWindowFrame() with Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.setWindowFrame(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-229| call setWindowFrame() with Null| ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-230| call setWindowPosition() with Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.setWindowPosition(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-230| call setWindowPosition() with Null| ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-231| call setWindowSize() with Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.setWindowSize(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-231| call setWindowSize() with Null| ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-232| call unzipFile() with Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.unzipFile(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-232| call unzipFile() with Null| ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-233| call zipFile() with Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.zipFile(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-233| call zipFile() with Null| ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-234| call zipFiles() with Null| ", function () {
            	var description;
		        try{
		             
                	Rho.System.zipFiles(null);
                	
		        } catch (e){
		            description = e.description;
		            displayResult("VT300-234| call zipFiles() with Null| ",description);
		        }
		        //expect(description).toEqual('');
            });

            it("VT300-235 | call set registry with null|", function () {
		       var description;
		        try{
			        Rho.System.setRegistrySetting({null});
	                var data = Rho.System.getRegistrySetting({null});
	                displayResult("VT300-199 | call setRegistry with null| ",data);
				}catch (e) {
		            description = e.description;
		            displayResult("VT300-235 | Error: ",description);
		        }
	               // expect(data).toEqual(false);

            });

	});
    describe("System module - setProperty / getProperty tests starts Here", function () {

        for (var i = 0; i < sys_setget_property.length; i++) {
            (function (idx) {

                var record = sys_setget_property[i];
                var testName = record['testName'];
                var suitablePlatforms = record['osType'];
                var propertyName = record['propertyName'];
                var stringValue = record['propertyValue'];
               
                if (isTestApplicable(suitablePlatforms)) {
                    it(testName, function () {
	                   var description;
		        		try{ 	
                       		Rho.System.setProperty(propertyName, stringValue)
	                        var actual = Rho.System.getProperty(propertyName);
	                    }catch (e){
		            		description = e.description;
		            		displayResult(testName,description);
		       			}
                        
                    });
                }
            })(i);
        }
    });

    describe("System module - setProperties / getProperties test starts here", function () {

        for (var i = 0; i < sys_setget_properties.length; i++) {
            (function (idx) {

                var record = sys_setget_property[i];
                var testName = record['testName'];
                var suitablePlatforms = record['osType'];
                var propertyName = record['propertyName'];
                var stringValue = record['propertyValue'];
                
                if (isTestApplicable(suitablePlatforms)) {
                    it(sys_setget_properties[idx]['testName'], function () {

                        var propertyValue = stringValue;
                        if (["true", "false"].indexOf(stringValue) != -1) {
                            propertyValue = (stringValue == "true" ? true : false);
                        }
                        if (/^\d+$/.test(stringValue)) {
                            propertyValue = parseInt(stringValue);
                        }
                        var obj = {};
                        obj[propertyName] = propertyValue;
                        var description;
		        		try{ 
                       		Rho.System.setProperties(obj);
                        	var readedObj =  Rho.System.getProperties([propertyName]);
                        }catch (e){
		            		description = e.description;
		            		displayResult(testName,description);
		       			}
                        	
                    });
                }
            })(i);
        }
    });
	
});

