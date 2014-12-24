describe("Camera JS API Test", function() {
	var	enableflag = false;
	var	disableflag = false;
	var getpropertiesdata ='';
	var getpropertydata ='';
    var enumData = Rho.Camera.enumerate();
    var callbackstatus = false;
	var getcallbackdata = '';
	var capturedata = '';
	var capturestatus = '';

    var callbackgetproperties = function (data){
		getpropertiesdata = JSON.stringify(data);
		callbackstatus = true;
	}

	var callbackgetproperty = function (data){
		getpropertydata = data;
		callbackstatus = true;
	}

	var captureCallback = function (data){
		capturedata.status = data.status
		capturedata.imageHeight = data.imageHeight
		capturedata.imageWidth = data.imageWidth
		capturedata.imageFormat = data.imageFormat
		capturedata.message = data.message
		capturedata.imageUri = data.imageUri

		capturestatus = true;
	}

    for (var j = 0;j<enumData.length;j++){

		var arrCAM = getApplicableProperties(enumData[j]);

		(function(enumObject,arrCamera){

			var camname = enumObject.getProperty('cameraType');
			var camtype = enumObject.getProperty('ID');


			describe("Camera property using set/getProperty for "+ camtype +": "+ camname, function() {

				for (var i=0;i<arrCamera.length;i++){

					(function(idx){
						it(arrCamera[idx]['testName'], function() {

							    enumObject.setProperty(arrCamera[idx]['propertyName'],arrCamera[idx]['propertyValue']);
								var data = enumObject.getProperty(arrCamera[idx]['propertyName']);
								expect(data).toEqual(arrCamera[idx]['expectedResult']);
						});

					})(i);

				}
			});

			describe("Camera property Using set/getProperties for "+ camtype +": "+ camname, function() {

				for (var i=0;i<arrCamera.length;i++){

					(function(idx){
						it(arrCamera[idx]['testName'], function() {
						
							var propertyName = arrCamera[idx]['propertyName'];
							var propertyValue = arrCamera[idx]['propertyValue'];

							if (propertyValue == 'true')
								var strProperty = '{"'+propertyName+'" :'+true+'}';
							else if (propertyValue == 'false')
								var strProperty = '{"'+propertyName+'" :'+false+'}';
							else if (!isNaN(propertyValue)){
								propertyValue = parseInt(propertyValue);
								var strProperty = '{"'+propertyName+'" :'+propertyValue+'}';
							}
							else{
								var strProperty = '{"'+propertyName+'" : "'+propertyValue+'"}'
							}

							var objProperty = JSON.parse(strProperty);
						
							enumObject.setProperties(objProperty);

							var strGetProperty = '["'+arrCamera[idx]['propertyName']+'"]';
							var objGetProperty = JSON.parse(strGetProperty);

							var data = enumObject.getProperties(objGetProperty);

			
							data = data[arrCamera[idx]['propertyName']];
							expect(data).toEqual(arrCamera[idx]['expectedResult']);
	
						});
					})(i);
				}
			});

			describe("Camera property setting Directly for "+ camtype +": "+ camname, function() {

				for (var i=0;i<arrCamera.length;i++){

					(function(idx){
						it(arrCamera[idx]['testName'], function() {
							
							var propertyName = arrCamera[idx]['propertyName'];
							var propertyValue = arrCamera[idx]['propertyValue'];

							try{
								if (propertyValue == 'true')
									eval(enumObject)[propertyName] = true;
								else if (propertyValue == 'false')
									eval(enumObject)[propertyName] = false;
								else if (!isNaN(propertyValue)){
									propertyValue = parseInt(propertyValue);
									eval(enumObject)[propertyName] = propertyValue;	
								}
								else{
									eval(enumObject)[propertyName] = propertyValue;
								}

								//var data = enumObject.getProperty(arrCamera[idx]['propertyName']);
								var data = eval(enumObject)[propertyName];
							}
							catch(err){

								var data = err.message;
							}

							expect(data).toEqual(arrCamera[idx]['expectedResult']);

						});
					})(i);
				}
			});

			describe("getProperty and get properties with all combination for "+ camtype +": "+ camname, function() {

				beforeEach(function() {
					getpropertiesdata ='';
					getpropertydata ='';
					callbackstatus = false;
				});

					it("VT285-084 | call getProperties() with sync callback and hash |" + camtype, function() {

						runs(function() {
						    enumObject.setProperties({'compressionFormat':'png','desiredHeight':640,'outputFormat':'dataUri'});
							enumObject.getProperties(['compressionFormat','desiredHeight','outputFormat'],callbackgetproperties);
						});

						waitsFor(function(){
							return callbackstatus;
						});

						runs(function() {							
							expect(getpropertiesdata).toContain('png');
							expect(getpropertiesdata).toContain('640');
							expect(getpropertiesdata).toContain('dataUri');	
						});
					});

					it("VT285-085 | call getProperties() with anonymous callback and hash |" + camtype, function() {

						runs(function() {    
						    enumObject.setProperties({'compressionFormat':'jpg','desiredWidth':480,'outputFormat':'image'});
							enumObject.getProperties(['compressionFormat','desiredWidth','outputFormat'],function(data){getpropertiesdata = JSON.stringify(data);callbackstatus = true;});
						});

						waitsFor(function(){
							return callbackstatus;
						});	

						runs(function() {								
							expect(getpropertiesdata).toContain('480');
							expect(getpropertiesdata).toContain('jpg');
							expect(getpropertiesdata).toContain('image');	
						});							
					});

					it("VT285-086 | call getProperties() without callback |" + camtype, function() {

						    //enumObject.clearAllProperties();
						    enumObject.setProperties({'compressionFormat':'png','desiredHeight':640,'outputFormat':'dataUri'});
							var data = enumObject.getProperties(['compressionFormat','desiredHeight','outputFormat']);
							getpropertiesdata = JSON.stringify(data);
							expect(getpropertiesdata).toContain('png');
							expect(getpropertiesdata).toContain('640');
							expect(getpropertiesdata).toContain('dataUri');						
					});

					it("VT285-087 | call getProperty() with sync callback and property |" + camtype, function() {

						runs(function() {  									    
						    enumObject.setProperty('compressionFormat','jpg');
							enumObject.getProperty("compressionFormat",callbackgetproperty);
						});

						waitsFor(function(){
							return callbackstatus;
						});	
						
						runs(function() {	
							expect(getpropertydata).toEqual('jpg');
						});										
					});

					it("VT285-088 | call getProperty() with anonymous callback and property |" + camtype, function() {

						runs(function() {
						    enumObject.setProperty('compressionFormat','png');
							enumObject.getProperty('compressionFormat',function(data){getpropertydata = data;callbackstatus = true;});
						});

						waitsFor(function(){
							return callbackstatus;
						});	
						
						runs(function() {	
							expect(getpropertydata).toEqual('png');
						});								
					});

					it("VT285-089 | call getProperty() without callback |" + camtype, function() {
		    
						    enumObject.setProperty('compressionFormat','jpg');
							var data = enumObject.getProperty("compressionFormat");
							getpropertydata = data;
							expect(getpropertydata).toEqual('jpg');								
					});

					it("VT285-077 | call getDefault |" + camtype, function() {

						    Rho.Camera.setDefault(enumObject);
						    var defaultobj = Rho.Camera.getDefault();
							expect(camtype).toEqual(defaultobj.getProperty('ID'));
					});

					it("VT285-077A | call Default |" + camtype, function() {

						    //Rho.Camera.setDefaultID( enumObject.getId());
						   	//Rho.Camera.setDefault( enumObject );
						    //var defaultobj = Rho.Camera.getDefault();
							expect(camtype).toEqual(defaultobj.getProperty('ID'));
					});

					it("VT299-090 | check default values of all writeable property |", function() {

						runs(function() {
						    
						    if (isWindowsMobilePlatform())
						    {
							    expect(Rho.Camera.previewHeight).toBeGreaterThan(0);
								expect(Rho.Camera.previewLeft).toBeGreaterThan(0);
								expect(Rho.Camera.previewTop).toBeGreaterThan(0);
								expect(Rho.Camera.previewWidth).toBeGreaterThan(0);
						    }

						    if (isApplePlatform() || isAndroidPlatform())
						    {
							    expect(Rho.Camera.saveToDeviceGallery).toEqual(true);
							    expect(enumObject.colorModel).toEqual('rgb');
						    }

						    if (isApplePlatform())
						    {
						    	expect(Rho.Camera.enableEditing).toEqual(true);
						    }

						    if (isAndroidPlatform())
						    {
						    	expect(Rho.Camera.flashMode).toEqual('off');
						    	expect(Rho.Camera.useSystemViewfinder).toEqual(false);
						    }
                            if (!isWindowsPhone8Platform())
							{
							expect(enumObject.compressionFormat).toEqual('jpg');
                            } 							
							expect(enumObject.desiredHeight).toBeGreaterThan(0);
							expect(enumObject.desiredWidth).toBeGreaterThan(0);						
							expect(Rho.Camera.outputFormat).toEqual('image');
							
						});
					});

					it("VT299-091 | check values of all read only property |", function() {

						runs(function() {						    
						    var type = "back front";
						    var resolution = enumObject.supportedSizeList

							expect(type).toContain(enumObject.cameraType);						
							expect(enumObject.maxHeight).toBeGreaterThan(0);
							expect(enumObject.maxWidth).toBeGreaterThan(0);
							expect(resolution.width).toBeGreaterThan(0);					
							expect(resolution.height).toBeGreaterThan(0);
							
							Rho.Camera.hide();
						});
					});

					it("VT285-1002 | Call getAllProperties with Anonymous callback |" + camtype, function() {

						runs(function() {
						    enumObject.setProperties({'compressionFormat':'jpg','desiredHeight':640,'outputFormat':'dataUri'});
							enumObject.getAllProperties(function(data){getpropertydata = data;callbackstatus = true;});
						});

						waitsFor(function(){
							return callbackstatus;
						});	
						
						runs(function() {	
							expect(getpropertydata).toContain('jpg');
							expect(getpropertydata).toContain(640);
							expect(getpropertydata).toContain('datauri');
						});								
					});

				});

				describe("Call capture method with callback | "+ camtype +": "+ camname, function() {

					beforeEach(function() {
					    capturedata = '';
					    capturestatus = false;
					});

					var data = [{"desiredHeight":360, "desiredWidth":480}, 
					{"compressionFormat":"png"}, {"compressionFormat":"jpg"}, {"outputFormat":"image"}, {"outputFormat":"dataUri"}, 
					{"colorModel":"grayscale"}, {"colorModel":"rgb"},
					{"aimMode":"off"}, {"flashMode":"off"}];

					for(i=0 ; i<data.length ; i++ ){

						it("Call capture method with callback for | " + JSON.stringify(data[i]) , function() {
 
							runs(function() {
							    var props = '';
						    	props = data[i];
						    	enumObject.showPreview(props);

						    	setTimeout(function(){
						    		enumObject.capture(captureCallback);
						    	},5000);
							    
							});

							waitsFor(function(){
								return capturestatus;
							}, 10000);
							
							runs(function() {	
								expect(capturedata.status).toEqual('ok');
								expect(capturedata.message).toEqual('');

								if data[i]['desiredHeight']
									expect(capturedata.imageHeight).toEqual(data[i]['desiredHeight']);
								else
									expect(capturedata.imageHeight).toBeGreaterThan(0);

								if data[i]['desiredWidth']
									expect(capturedata.imageWidth).toEqual(data[i]['desiredWidth']);
								else
									expect(capturedata.imageWidth).toBeGreaterThan(0);

								if (data[i]['outputFormat'] && data[i]['outputFormat'] =! 'dataUri'){
									if (data[i]['compressionFormat'] == 'png' && !(isWindowsMobilePlatform())){
										expect(capturedata.imageUri).toContain('.png');
									else
										expect(capturedata.imageUri).toContain('.jpg');
									};
								else
									expect(capturedata.imageUri).not.toEqual('');
								};
							});		

							enumObject.hidePreview();

						});
					};

					var data = [{"desiredHeight":727, "desiredWidth":1099}, {"desiredHeight":'', "desiredWidth":''}, 
					{"compressionFormat":""}, {"outputFormat":""}, {"colorModel":""}, {"captureSound":""},
					{"previewTop":250, "previewWidth":250 ,"previewLeft":300, "previewHeight":200},
					{"previewTop":-25, "previewWidth":-250 ,"previewLeft":-30, "previewHeight":-200},
					{"previewTop":0, "previewWidth":0 ,"previewLeft":0, "previewHeight":0},
					{"previewTop":10, "previewWidth":20 ,"previewLeft":-10, "previewHeight":-60},
					{"aimMode":""}, {"flashMode":""}]

					for(i=0 ; i<data.length ; i++ ){

						it("Call capture method with callback for | " + JSON.stringify(data[i]) , function() {
 
							runs(function() {
							    var props = '';
						    	props = data[i];
						    	enumObject.showPreview(props);

						    	setTimeout(function(){
						    		enumObject.capture(captureCallback);
						    	},5000);
							    
							});

							waitsFor(function(){
								return capturestatus;
							}, 10000);
							
							runs(function() {	
								expect(capturedata.status).toEqual('ok');
								expect(capturedata.message).toEqual('');
								expect(capturedata.imageHeight).toBeGreaterThan(0);
								expect(capturedata.imageWidth).toBeGreaterThan(0);
								expect(capturedata.imageUri).not.toEqual('');
							});		

							enumObject.hidePreview();

						});
					};

					var datainval = [{"compressionFormat":"invalid"}, {"outputFormat":"invalid"},
					{"colorModel":"invalid"}, {"captureSound":"file://application/alarm.waved"},
					{"previewTop":'10', "previewWidth":'20' ,"previewLeft":'10', "previewHeight":'60'},
					{"aimMode":"invalid"}, {"flashMode":"invalid"}]

					for(i=0 ; i<datainval.length ; i++ ){

						it("Call capture method with callback for invalid values | " + JSON.stringify(datainval[i]) , function() {
 
							runs(function() {
							    var props = '';
						    	props = datainval[i];
						    	enumObject.showPreview(props);

						    	setTimeout(function(){
						    		enumObject.capture(captureCallback);
						    	},5000);
							    
							});

							waitsFor(function(){
								return capturestatus;
							}, 10000);
							
							runs(function() {	
								expect(capturedata.status).toEqual('error');
								expect(capturedata.message).not.toEqual('');
							});		

							enumObject.hidePreview();

						});


					};

					var modelfolder = Rho.Application.modelFolderPath("CameraTest");
					var tempFolder = Rho.RhoFile.join(modelfolder, "tempFolder");

					var fileList = ['cameraimage', 'camera@#$', '_123Image', '12_image', 'QWERTY'];
					
					for(i=0 ; i<fileList.length ; i++ ){

						if (Rho.RhoFile.exists(tempFolder) == false)
							Rho.RhoFile.makeDir(tempFolder);
						var file = Rho.Application.join(tempFolder, fileList[i]);
						if Rho.RhoFile.exists(file)
							Rho.RhoFile.deleteFile(file);

						it("Call capture method with fileName : " + file , function() {
 
							runs(function() {
							    var props = '';
						    	props = data[i];
						    	enumObject.showPreview({'fileName' : file});

						    	setTimeout(function(){
						    		enumObject.capture(captureCallback);
						    	},5000);
							    
							});

							waitsFor(function(){
								return capturestatus;
							}, 10000);
							
							runs(function() {	
								expect(capturedata.status).toEqual('ok');
								expect(capturedata.message).toEqual('');
								expect(capturedata.imageHeight).toBeGreaterThan(0);
								expect(capturedata.imageWidth).toBeGreaterThan(0);
								expect(capturedata.imageUri).toContain(fileList[i]);
							});

							enumObject.hidePreview();

						});
					};


						it("Call capture method with invalid fileName path : " + file , function() {
 
							runs(function() {

						    	enumObject.showPreview({"fileName" : "\\Programfiles\\invalidpath\\camimage"});

						    	setTimeout(function(){
						    		enumObject.capture(captureCallback);
						    	},5000);
							    
							});

							waitsFor(function(){
								return capturestatus;
							}, 10000);
							
							runs(function() {	
								expect(capturedata.status).toEqual('error');
								expect(capturedata.message).not.toEqual('');
							});

							enumObject.hidePreview();

						});

				});
					
				/*it("VT285-1003 | Call takePicture with all string in hash|" + camtype, function() {
					   beforeEach(function() {
					     getcallbackdata ='';
					     callbackstatus = false;
				        });

						runs(function() {
						    enumObject.takePicture({'compressionFormat':'jpg','desiredHeight':'640','outputFormat':'dataUri'},camCallback);
							//enumObject.getAllProperties(function(data){getpropertydata = data;callbackstatus = true;});
						});

						waitsFor(function(){
							return callbackstatus;
						});	
						
						runs(function() {	
							expect(getcallbackdata).toContain('jpg');
							expect(getcallbackdata).toContain('640');
							expect(getcallbackdata).toContain('datauri');
						});								
					});*/

					/*it("VT285-1004 | Call choosePicture with all string in hash|" + camtype, function() {
                        beforeEach(function() {
					     getcallbackdata ='';
					     callbackstatus = false;
				        })
						runs(function() {
						    enumObject.takePicture({'desiredHeight':'480','desiredHeight':'640','outputFormat':'image'},camCallback);
							//enumObject.getAllProperties(function(data){getpropertydata = data;callbackstatus = true;});
						});

						waitsFor(function(){
							return callbackstatus;
						});	
						
						runs(function() {	
							expect(getcallbackdata).toContain('480');
							expect(getcallbackdata).toContain('640');
							expect(getcallbackdata).toContain('image');
						});								
					});
					
					it("VT285-1004 | Call capture with all string in hash|" + camtype, function() {
                        beforeEach(function() {
					     getcallbackdata ='';
					     callbackstatus = false;
				        })
						runs(function() {
						    enumObject.capture({'desiredHeight':'480','desiredHeight':'640','outputFormat':'image'},camCallback);
							//enumObject.getAllProperties(function(data){getpropertydata = data;callbackstatus = true;});
						});

						waitsFor(function(){
							return callbackstatus;
						});	
						
						runs(function() {	
							expect(getcallbackdata).toContain('480');
							expect(getcallbackdata).toContain('640');
							expect(getcallbackdata).toContain('image');
						});								
					}); */
			

			/* describe("Camera property set using takePicture() for "+ camtype +": "+ camname, function() {

				var flag = false;

				beforeEach(function() {
					flag = false;
				});

				afterEach(function() {
					//enumObject.disable();
				});

				for (var i=0;i<arrCamera.length;i++){

					(function(idx){

						it(arrCamera[idx]['testName'], function() {

							runs(function() {

								var propertyName = arrCamera[idx]['propertyName'];
								var propertyValue = arrCamera[idx]['propertyValue'];

								if (propertyValue == 'true')
									var strProperty = '{"'+propertyName+'" :'+true+'}';
								else if (propertyValue == 'false')
									var strProperty = '{"'+propertyName+'" :'+false+'}';
								else if (!isNaN(propertyValue)){
									propertyValue = parseInt(propertyValue);
									var strProperty = '{"'+propertyName+'" :'+propertyValue+'}';
								}
								else{
									var strProperty = '{"'+propertyName+'" : "'+propertyValue+'"}'
								}

								var objProperty = JSON.parse(strProperty);

								enumObject.takePicture(objProperty, camCallback);

								setTimeout(function() {
									flag = true;
								}, ENABLE_TIMEOUT_VALUE);
							});

							waitsFor(function() {
								return flag;
							}, "Waiting for enable", 6000);
								
							runs(function() {

								var strGetProperty = '["'+arrCamera[idx]['propertyName']+'"]';
								var objGetProperty = JSON.parse(strGetProperty);

								var data = enumObject.getProperties(objGetProperty);

								data = data[arrCamera[idx]['propertyName']];
								expect(data).toEqual(arrCamera[idx]['expectedResult']);
							});

						})
					})(i);

				}
			});*/
			
			describe("Properties with constants ", function() {
            it("Should set flashMode to FLASH_ON using direct calling method", function() {
	        enumObject.flashMode = enumObject.FLASH_ON;
	        expect(enumObject.flashMode).toEqual("on");
	        expect(enumObject.flashMode).toEqual(enumObject.FLASH_ON);
	        });
	
           it("Should set flashMode to FLASH_ON using setproperty calling method", function() {
	       enumObject.setProperty('flashMode', enumObject.FLASH_ON);
	       expect(enumObject.flashMode).toEqual("on");
           expect(enumObject.getProperty('flashMode')).toEqual(enumObject.FLASH_ON);
	       });
	
           it("Should set flashMode to FLASH_ON using setproperties calling method", function() {
	       enumObject.setProperties({
                        'flashMode': enumObject.FLASH_ON
                    });
                    var data = enumObject.getProperties(['flashMode']);
                    data = data['flashMode'];
					expect(data).toEqual("on");
                    expect(data).toEqual(enumObject.FLASH_ON);
	        });
	
           it("Should set flashMode to FLASH_OFF using direct calling method", function() {
	       enumObject.flashMode = enumObject.FLASH_OFF;
	       expect(enumObject.flashMode).toEqual("off");
	       expect(enumObject.flashMode).toEqual(enumObject.FLASH_OFF);
	       });
	
           it("Should set flashMode to FLASH_OFF using setproperty calling method", function() {
	       enumObject.setProperty('flashMode', enumObject.FLASH_OFF);
	       expect(enumObject.flashMode).toEqual("off");
           expect(enumObject.getProperty('flashMode')).toEqual(enumObject.FLASH_OFF);
	       });
	
           it("Should set flashMode to FLASH_OFF using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'flashMode': enumObject.FLASH_OFF
                    });
                    var data = enumObject.getProperties(['flashMode']);
                    data = data['flashMode'];
					expect(data).toEqual("off");
                    expect(data).toEqual(enumObject.FLASH_OFF);
	       });
		   
		   it("Should set flashMode to FLASH_AUTO using direct calling method", function() {
	       enumObject.flashMode = enumObject.FLASH_AUTO;
	       expect(enumObject.flashMode).toEqual("auto");
	       expect(enumObject.flashMode).toEqual(enumObject.FLASH_AUTO);
	       });
	
           it("Should set flashMode to FLASH_AUTO using setproperty calling method", function() {
	       enumObject.setProperty('flashMode', enumObject.FLASH_AUTO);
	       expect(enumObject.flashMode).toEqual("auto");
           expect(enumObject.getProperty('flashMode')).toEqual(enumObject.FLASH_AUTO);
	       });
	
           it("Should set flashMode to FLASH_AUTO using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'flashMode': enumObject.FLASH_AUTO
                    });
                    var data = enumObject.getProperties(['flashMode']);
                    data = data['flashMode'];
					expect(data).toEqual("auto");
                    expect(data).toEqual(enumObject.FLASH_AUTO);
	       });
		   
		   it("Should set flashMode to FLASH_RED_EYE using direct calling method", function() {
	       enumObject.flashMode = enumObject.FLASH_RED_EYE;
	       expect(enumObject.flashMode).toEqual("redEye");
	       expect(enumObject.flashMode).toEqual(enumObject.FLASH_RED_EYE);
	       });
	
           it("Should set flashMode to FLASH_RED_EYE using setproperty calling method", function() {
	       enumObject.setProperty('flashMode', enumObject.FLASH_RED_EYE);
	       expect(enumObject.flashMode).toEqual("redEye");
           expect(enumObject.getProperty('flashMode')).toEqual(enumObject.FLASH_RED_EYE);
	       });
	
           it("Should set flashMode to FLASH_RED_EYE using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'flashMode': enumObject.FLASH_RED_EYE
                    });
                    var data = enumObject.getProperties(['flashMode']);
                    data = data['flashMode'];
					expect(data).toEqual("redEye");
                    expect(data).toEqual(enumObject.FLASH_RED_EYE);
	       });
		   
		    it("Should set flashMode to FLASH_TORCH using direct calling method", function() {
	       enumObject.flashMode = enumObject.FLASH_TORCH;
	       expect(enumObject.flashMode).toEqual("torch");
	       expect(enumObject.flashMode).toEqual(enumObject.FLASH_TORCH);
	       });
	
           it("Should set flashMode to FLASH_TORCH using setproperty calling method", function() {
	       enumObject.setProperty('flashMode', enumObject.FLASH_TORCH);
	       expect(enumObject.flashMode).toEqual("torch");
           expect(enumObject.getProperty('flashMode')).toEqual(enumObject.FLASH_TORCH);
	       });
	
           it("Should set flashMode to FLASH_TORCH using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'flashMode': enumObject.FLASH_TORCH
                    });
                    var data = enumObject.getProperties(['flashMode']);
                    data = data['flashMode'];
					expect(data).toEqual("torch");
                    expect(data).toEqual(enumObject.FLASH_TORCH);
	       });
	
           it("Should set aimMode to AIM_ON using direct calling method", function() {
	       enumObject.aimMode = enumObject.AIM_ON;
	       expect(enumObject.aimMode).toEqual("on");
	       expect(enumObject.aimMode).toEqual(enumObject.AIM_ON);
	       });
	
           it("Should set aimMode to AIM_ON using setproperty calling method", function() {
	       enumObject.setProperty('aimMode', enumObject.AIM_ON);
	       expect(enumObject.aimMode).toEqual("on");
           expect(enumObject.getProperty('aimMode')).toEqual(enumObject.AIM_ON);
	       });
	
           it("Should set aimMode to AIM_ON using setproperties calling method", function() {
	       enumObject.setProperties({
                        'aimMode': enumObject.AIM_ON
                    });
                    var data = enumObject.getProperties(['aimMode']);
                    data = data['aimMode'];
					expect(data).toEqual("on");
                    expect(data).toEqual(enumObject.AIM_ON);
	       });
	
           it("Should set aimMode to AIM_OFF using direct calling method", function() {
	       enumObject.aimMode = enumObject.AIM_OFF;
	       expect(enumObject.aimMode).toEqual("off");
	       expect(enumObject.aimMode).toEqual(enumObject.AIM_OFF);
	       });
	
           it("Should set aimMode to AIM_OFF using setproperty calling method", function() {
	       enumObject.setProperty('aimMode', enumObject.AIM_OFF);
	       expect(enumObject.aimMode).toEqual("off");
           expect(enumObject.getProperty('aimMode')).toEqual(enumObject.AIM_OFF);
	       });
	
           it("Should set aimMode to AIM_OFF using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'aimMode': enumObject.AIM_OFF
                    });
                    var data = enumObject.getProperties(['aimMode']);
                    data = data['aimMode'];
					expect(data).toEqual("off");
                    expect(data).toEqual(enumObject.AIM_OFF);
	        });
			
			it("Should set colorModel to rgb using direct calling method", function() {
	       enumObject.colorModel = enumObject.COLOR_MODEL_RGB;
	       expect(enumObject.colorModel).toEqual("rgb");
	       expect(enumObject.colorModel).toEqual(enumObject.COLOR_MODEL_RGB);
	       });
	
           it("Should set colorModel to rgb using setproperty calling method", function() {
	       enumObject.setProperty('colorModel', enumObject.COLOR_MODEL_RGB);
	       expect(enumObject.colorModel).toEqual("rgb");
           expect(enumObject.getProperty('colorModel')).toEqual(enumObject.COLOR_MODEL_RGB);
	       });
	
           it("Should set colorModel to rgb using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'colorModel': enumObject.COLOR_MODEL_RGB
                    });
                    var data = enumObject.getProperties(['colorModel']);
                    data = data['colorModel'];
					expect(data).toEqual("rgb");
                    expect(data).toEqual(enumObject.COLOR_MODEL_RGB);
	        });
			
			it("Should set colorModel to grayscale using direct calling method", function() {
	       enumObject.colorModel = enumObject.COLOR_MODEL_GRAYSCALE;
	       expect(enumObject.colorModel).toEqual("grayscale");
	       expect(enumObject.colorModel).toEqual(enumObject.COLOR_MODEL_GRAYSCALE);
	       });
	
           it("Should set colorModel to grayscale using setproperty calling method", function() {
	       enumObject.setProperty('colorModel', enumObject.COLOR_MODEL_GRAYSCALE);
	       expect(enumObject.colorModel).toEqual("grayscale");
           expect(enumObject.getProperty('colorModel')).toEqual(enumObject.COLOR_MODEL_GRAYSCALE);
	       });
	
           it("Should set colorModel to grayscale using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'colorModel': enumObject.COLOR_MODEL_GRAYSCALE
                    });
                    var data = enumObject.getProperties(['colorModel']);
                    data = data['colorModel'];
					expect(data).toEqual("grayscale");
                    expect(data).toEqual(enumObject.COLOR_MODEL_GRAYSCALE);
	        });
			
			it("Should set outputFormat to image using direct calling method", function() {
	       enumObject.outputFormat = enumObject.OUTPUT_FORMAT_IMAGE;
	       expect(enumObject.outputFormat).toEqual("image");
	       expect(enumObject.outputFormat).toEqual(enumObject.OUTPUT_FORMAT_IMAGE);
	       });
	
           it("Should set outputFormat to image using setproperty calling method", function() {
	       enumObject.setProperty('outputFormat', enumObject.OUTPUT_FORMAT_IMAGE);
	       expect(enumObject.outputFormat).toEqual("image");
           expect(enumObject.getProperty('outputFormat')).toEqual(enumObject.OUTPUT_FORMAT_IMAGE);
	       });
	
           it("Should set outputFormat to image using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'outputFormat': enumObject.OUTPUT_FORMAT_IMAGE
                    });
                    var data = enumObject.getProperties(['outputFormat']);
                    data = data['outputFormat'];
					expect(data).toEqual("image");
                    expect(data).toEqual(enumObject.OUTPUT_FORMAT_IMAGE);
	        });
			
			it("Should set outputFormat to dataUri using direct calling method", function() {
	       enumObject.outputFormat = enumObject.OUTPUT_FORMAT_DATAURI;
	       expect(enumObject.outputFormat).toEqual("dataUri");
	       expect(enumObject.outputFormat).toEqual(enumObject.OUTPUT_FORMAT_DATAURI);
	       });
	
           it("Should set outputFormat to dataUri using setproperty calling method", function() {
	       enumObject.setProperty('outputFormat', enumObject.OUTPUT_FORMAT_DATAURI);
	       expect(enumObject.outputFormat).toEqual("dataUri");
           expect(enumObject.getProperty('outputFormat')).toEqual(enumObject.OUTPUT_FORMAT_DATAURI);
	       });
	
           it("Should set outputFormat to dataUri using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'outputFormat': enumObject.OUTPUT_FORMAT_DATAURI
                    });
                    var data = enumObject.getProperties(['outputFormat']);
                    data = data['outputFormat'];
					expect(data).toEqual("dataUri");
                    expect(data).toEqual(enumObject.OUTPUT_FORMAT_DATAURI);
	        });
			
			it("Should set compressionFormat to jpg using direct calling method", function() {
	       enumObject.compressionFormat = enumObject.COMPRESSION_FORMAT_JPG;
	       expect(enumObject.compressionFormat).toEqual("jpg");
	       expect(enumObject.compressionFormat).toEqual(enumObject.COMPRESSION_FORMAT_JPG);
	       });
	
           it("Should set compressionFormat to jpg using setproperty calling method", function() {
	       enumObject.setProperty('compressionFormat', enumObject.COMPRESSION_FORMAT_JPG);
	       expect(enumObject.compressionFormat).toEqual("jpg");
           expect(enumObject.getProperty('compressionFormat')).toEqual(enumObject.COMPRESSION_FORMAT_JPG);
	       });
	
           it("Should set compressionFormat to jpg using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'compressionFormat': enumObject.COMPRESSION_FORMAT_JPG
                    });
                    var data = enumObject.getProperties(['compressionFormat']);
                    data = data['compressionFormat'];
					expect(data).toEqual("jpg");
                    expect(data).toEqual(enumObject.COMPRESSION_FORMAT_JPG);
	        });
			
			it("Should set compressionFormat to png using direct calling method", function() {
	       enumObject.compressionFormat = enumObject.COMPRESSION_FORMAT_PNG;
	       expect(enumObject.compressionFormat).toEqual("png");
	       expect(enumObject.compressionFormat).toEqual(enumObject.COMPRESSION_FORMAT_PNG);
	       });
	
           it("Should set compressionFormat to png using setproperty calling method", function() {
	       enumObject.setProperty('compressionFormat', enumObject.COMPRESSION_FORMAT_PNG);
	       expect(enumObject.compressionFormat).toEqual("png");
           expect(enumObject.getProperty('compressionFormat')).toEqual(enumObject.COMPRESSION_FORMAT_PNG);
	       });
	
           it("Should set compressionFormat to png using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'compressionFormat': enumObject.COMPRESSION_FORMAT_PNG
                    });
                    var data = enumObject.getProperties(['compressionFormat']);
                    data = data['compressionFormat'];
					expect(data).toEqual("png");
                    expect(data).toEqual(enumObject.COMPRESSION_FORMAT_PNG);
	        });
			
			it("Should set cameraType to back using direct calling method", function() {
	       enumObject.cameraType = enumObject.CAMERA_TYPE_BACK;
	       expect(enumObject.cameraType).toEqual("back");
	       expect(enumObject.cameraType).toEqual(enumObject.CAMERA_TYPE_BACK);
	       });
	
           it("Should set cameraType to back using setproperty calling method", function() {
	       enumObject.setProperty('cameraType', enumObject.CAMERA_TYPE_BACK);
	       expect(enumObject.cameraType).toEqual("back");
           expect(enumObject.getProperty('cameraType')).toEqual(enumObject.CAMERA_TYPE_BACK);
	       });
	
           it("Should set cameraType to back using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'cameraType': enumObject.CAMERA_TYPE_BACK
                    });
                    var data = enumObject.getProperties(['cameraType']);
                    data = data['cameraType'];
					expect(data).toEqual("back");
                    expect(data).toEqual(enumObject.CAMERA_TYPE_BACK);
	        });
			
			it("Should set cameraType to front using direct calling method", function() {
	       enumObject.cameraType = enumObject.CAMERA_TYPE_FRONT;
	       expect(enumObject.cameraType).toEqual("front");
	       expect(enumObject.cameraType).toEqual(enumObject.CAMERA_TYPE_FRONT);
	       });
	
           it("Should set cameraType to front using setproperty calling method", function() {
	       enumObject.setProperty('cameraType', enumObject.CAMERA_TYPE_FRONT);
	       expect(enumObject.cameraType).toEqual("front");
           expect(enumObject.getProperty('cameraType')).toEqual(enumObject.CAMERA_TYPE_FRONT);
	       });
	
           it("Should set cameraType to front using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'cameraType': enumObject.CAMERA_TYPE_FRONT
                    });
                    var data = enumObject.getProperties(['cameraType']);
                    data = data['cameraType'];
					expect(data).toEqual("front");
                    expect(data).toEqual(enumObject.CAMERA_TYPE_FRONT);
	        });
			
			it("Should set cameraType to imager using direct calling method", function() {
	       enumObject.cameraType = enumObject.CAMERA_TYPE_IMAGER;
	       expect(enumObject.cameraType).toEqual("imager");
	       expect(enumObject.cameraType).toEqual(enumObject.CAMERA_TYPE_IMAGER);
	       });
	
           it("Should set cameraType to imager using setproperty calling method", function() {
	       enumObject.setProperty('cameraType', enumObject.CAMERA_TYPE_IMAGER);
	       expect(enumObject.cameraType).toEqual("imager");
           expect(enumObject.getProperty('cameraType')).toEqual(enumObject.CAMERA_TYPE_IMAGER);
	       });
	
           it("Should set cameraType to imager using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'cameraType': enumObject.CAMERA_TYPE_IMAGER
                    });
                    var data = enumObject.getProperties(['cameraType']);
                    data = data['cameraType'];
					expect(data).toEqual("imager");
                    expect(data).toEqual(enumObject.CAMERA_TYPE_IMAGER);
	        });
			
			it("Should set cameraType to color using direct calling method", function() {
	       enumObject.cameraType = enumObject.CAMERA_TYPE_COLOR;
	       expect(enumObject.cameraType).toEqual("color");
	       expect(enumObject.cameraType).toEqual(enumObject.CAMERA_TYPE_COLOR);
	       });
	
           it("Should set cameraType to color using setproperty calling method", function() {
	       enumObject.setProperty('cameraType', enumObject.CAMERA_TYPE_COLOR);
	       expect(enumObject.cameraType).toEqual("color");
           expect(enumObject.getProperty('cameraType')).toEqual(enumObject.CAMERA_TYPE_COLOR);
	       });
	
           it("Should set cameraType to color using setproperties calling method", function() {
	       Rho.Camera.setProperties({
                        'cameraType': enumObject.CAMERA_TYPE_COLOR
                    });
                    var data = enumObject.getProperties(['cameraType']);
                    data = data['cameraType'];
					expect(data).toEqual("color");
                    expect(data).toEqual(enumObject.CAMERA_TYPE_COLOR);
	        });
		   
	
	

	
 	
        });

		})(enumData[j],arrCAM);

    }

});


/*describe("Camera choosePicture() JS API Test", function() {
	var	enableflag = false;
	var	disableflag = false;
	var getpropertiesdata ='';
	var getpropertydata ='';
    var enumData = Rho.Camera.enumerate();
    var callbackstatus = false;

    var callbackgetproperties = function (data){
		getpropertiesdata = JSON.stringify(data);
		callbackstatus = true;
	}

	var callbackgetproperty = function (data){
		getpropertydata = data;
		callbackstatus = true;
	}

    for (var j = 0;j<enumData.length;j++){

		var arrCAM = getApplicableProperties(enumData[j]);

		(function(enumObject,arrCamera){

			var camname = enumObject.getProperty('cameraType');
			var camtype = enumObject.getProperty('ID');

			Rho.Camera.setDefault(enumObject);

			describe("Camera property set using choosePicture() for "+ camtype +": "+ camname, function() {

				var flag = false;

				beforeEach(function() {
					flag = false;
				});

				afterEach(function() {
					//enumObject.disable();
				});

				for (var i=0;i<arrCamera.length;i++){

					(function(idx){

						it(arrCamera[idx]['testName'], function() {

							runs(function() {

								var propertyName = arrCamera[idx]['propertyName'];
								var propertyValue = arrCamera[idx]['propertyValue'];

								if (propertyValue == 'true')
									var strProperty = '{"'+propertyName+'" :'+true+'}';
								else if (propertyValue == 'false')
									var strProperty = '{"'+propertyName+'" :'+false+'}';
								else if (!isNaN(propertyValue)){
									propertyValue = parseInt(propertyValue);
									var strProperty = '{"'+propertyName+'" :'+propertyValue+'}';
								}
								else{
									var strProperty = '{"'+propertyName+'" : "'+propertyValue+'"}'
								}

								var objProperty = JSON.parse(strProperty);

								Rho.Camera.choosePicture(objProperty, camCallback);

								setTimeout(function() {
									flag = true;
								}, ENABLE_TIMEOUT_VALUE);
							});

							waitsFor(function() {
								return flag;
							}, "Waiting for enable", 6000);
								
							runs(function() {

								var strGetProperty = '["'+arrCamera[idx]['propertyName']+'"]';
								var objGetProperty = JSON.parse(strGetProperty);

								var data = Rho.Camera.getProperties(objGetProperty);

								data = data[arrCamera[idx]['propertyName']];
								expect(data).toEqual(arrCamera[idx]['expectedResult']);
							});

						});
					})(i);

				}
			});
		

	  })(enumData[j],arrCAM);

    }

});*/


describe("Enumerate Camera ", function() {
	var enumObjCount = false;

	var enumCallback = function (enumobj){

		enumobj.length>0 ? enumObjCount=true : enumObjCount=false

	};

	beforeEach(function() {
		enumObjCount = false;
	});

	it("VT285-014: Enumerate Camera callback as function", function() {
				
		runs(function() {
			Rho.Camera.enumerate(enumCallback);
		});
		waitsFor(function(){
			return enumObjCount;
		});
		runs(function(){
			expect(enumObjCount).toEqual(true);
		});
	});

	it("VT285-016: Enumerate Camera with anonymous function as callback", function() {
			
		runs(function() {
			Rho.Camera.enumerate(function(obj){
				enumCallback(obj);
			});
		});
		waitsFor(function(){
			return enumObjCount;
		});
		runs(function(){
			expect(enumObjCount).toEqual(true);
		});
 	});

	it("VT285-017: Enumerate Camera without callback (Synchronous Access)", function() {
			
		runs(function() {
			var obj = Rho.Camera.enumerate();
			callBackfired = enumCallback(obj);
			expect(enumObjCount).toEqual(true);
		});
 	});
 	
});


