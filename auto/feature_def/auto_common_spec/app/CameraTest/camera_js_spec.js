describe("Camera JS API Test", function() {
	var	enableflag = false;
	var	disableflag = false;
	var getpropertiesdata ='';
	var getpropertydata ='';
    var enumData = Rho.Camera.enumerate();
    var callbackstatus = false;
	var getcallbackdata = '';
	var defaultobj;
    var callbackgetproperties = function (data){
		getpropertiesdata = JSON.stringify(data);
		callbackstatus = true;
	};
	var callbackgetproperty = function (data){
		getpropertydata = data;
		callbackstatus = true;
	};

    for (var j = 0;j<enumData.length;j++){
		var arrCAM = getApplicableProperties(enumData[j]);
		(function(enumObject,arrCamera){
			var camname = enumObject.getProperty('cameraType');
			var camtype = enumObject.getProperty('ID');
		
			describe("Camera default check", function() {
				it("Call getDefault |" + camtype, function() {
				    Rho.Camera.setDefault(enumObject);
				    defaultobj = Rho.Camera.getDefault();
					expect(camtype).toEqual(defaultobj.getProperty('ID'));
				});
				it("Check default values of all writeable property |", function() {
					runs(function() {
					    if(isWindowsMobilePlatform()){
						    expect(defaultobj.previewLeft).toBeGreaterThan(0);
							expect(defaultobj.previewTop).toBeGreaterThan(0);
							expect(defaultobj.previewWidth).toBeGreaterThan(0);
							expect(defaultobj.previewHeight).toBeGreaterThan(0);
					    };
					    if(isApplePlatform()){
					    	expect(defaultobj.saveToDeviceGallery).toEqual(false);
					    	expect(defaultobj.colorModel).toEqual('rgb');
					    	expect(defaultobj.enableEditing).toEqual(true);
					    };
					    if(isAndroidPlatform()){
					    	expect(defaultobj.saveToDeviceGallery).toEqual(false);
					    	expect(defaultobj.colorModel).toEqual('rgb');
					    	expect(defaultobj.useSystemViewfinder).toEqual(false);
					    };
					    //expect(defaultobj.flashMode).toEqual('off');
						expect(defaultobj.compressionFormat).toEqual('jpg');
						//expect(defaultobj.desiredHeight).toBeGreaterThan(0);
						//expect(defaultobj.desiredWidth).toBeGreaterThan(0);
						expect(defaultobj.outputFormat).toEqual('image');
					});
				});
				it("Check values of all read only property |", function() {
					runs(function() {
						if(isWindowsMobilePlatform()){
							var type = "imager color";
						}else{
							var type = "back front";						
						};
						expect(type).toContain(enumObject.cameraType);
					    if(enumObject.cameraType != 'imager'){
					    	expect(enumObject.maxHeight).toBeGreaterThan(0);
							expect(enumObject.maxWidth).toBeGreaterThan(0);
					    	if(!isApplePlatform()){
						    	var resolution = enumObject.supportedSizeList;
								expect(resolution.length).toBeGreaterThan(0);
								expect(resolution[0].width).toBeGreaterThan(0);
								expect(resolution[0].height).toBeGreaterThan(0);
							};
						};
					});
				});
           	});

	    	if(isWindowsMobilePlatform()){
				describe("Call capture method with callback | "+ camtype +": "+ camname, function() {
					var capturedata = {};
					var capturestatus = false;
					enumObject.previewTop = 20;
					enumObject.previewLeft = 20;
					enumObject.previewWidth = 100;
					enumObject.previewHeight = 100;
					var captureCallback = function (data){
						capturedata.status = data.status;
						capturedata.imageHeight = data.imageHeight;
						capturedata.imageWidth = data.imageWidth;
						capturedata.imageFormat = data.imageFormat;
						capturedata.message = data.message;
						capturedata.imageUri = data.imageUri;
						capturestatus = true;
					};

					beforeEach(function() {
					    capturedata = {};
					    capturestatus = false;
					});

					var data1 = [{"compressionFormat":"png"}, {"compressionFormat":"jpg"}, {"outputFormat":"image"}, {"outputFormat":"dataUri"}, 
					{"aimMode":"off"}, {"flashMode":"off"}];

					for(i=0 ; i<data1.length ; i++ ){
						it("Call capture method with callback for | " + JSON.stringify(data1[i]) , function() {
							runs(function() {
						    	var props = data1[i];
						    	for (var property in props){
						    		enumObject.showPreview({property:props[property]});	
						    	};
						    	setTimeout(function(){
						    		enumObject.capture(captureCallback);
						    	},6000);
							});
							waitsFor(function(){
								return capturestatus;
							},"waiting for callback data", 12000);
							runs(function() {	
								expect(capturedata.status).toEqual('ok');
								expect(capturedata.message).toEqual('');
								expect(capturedata.imageHeight).toBeGreaterThan(0);
								expect(capturedata.imageWidth).toBeGreaterThan(0);
								if ((data1[i]['outputFormat']) && (data1[i]['outputFormat'] != 'dataUri')){
									if ((data1[i]['compressionFormat']) == 'png' && (isApplePlatform())){
										expect(capturedata.imageUri).toContain('.png');}
									else{
										expect(capturedata.imageUri).toContain('.jpg');
									};
								}else{
									expect(capturedata.imageUri).not.toEqual('');
								};
								enumObject.hidePreview();
							});
						});
					};

					var data2 = [{"compressionFormat":""}, {"outputFormat":""}, {"captureSound":""},
					{"aimMode":""}, {"flashMode":""},{"desiredHeight":""},{"desiredWidth":""}];

					for(i=0 ; i<data2.length ; i++ ){
						it("Call capture method with callback for | " + JSON.stringify(data2[i]) , function() {
							runs(function() {
						    	var props = data2[i];
								for (var property in props){
						    		enumObject.showPreview({property:props[property]});	
						    	};
						    	setTimeout(function(){
						    		enumObject.capture(captureCallback);
						    	},6000);
							});
							waitsFor(function(){
								return capturestatus;
							},"waiting for callback data", 12000);
							runs(function() {	
								expect(capturedata.status).toEqual('ok');
								expect(capturedata.message).toEqual('');
								expect(capturedata.imageHeight).toBeGreaterThan(0);
								expect(capturedata.imageWidth).toBeGreaterThan(0);
								expect(capturedata.imageUri).not.toEqual('');
								enumObject.hidePreview();
							});
						});
					};

					var datainval = [{"compressionFormat":"invalid"}, {"outputFormat":"invalid"},
					{"captureSound":"file://application/alarm.waved"},
					{"previewTop":'10'}, {"previewWidth":'20'} ,{"previewLeft":'10'}, {"previewHeight":'60'},
					{"aimMode":"invalid"}, {"flashMode":"invalid"}];

					for(i=0 ; i<datainval.length ; i++ ){
						it("Call capture method with callback for invalid values | " + JSON.stringify(datainval[i]) , function() {
							runs(function() {
						    	var props = datainval[i];
						    	for (var property in props){
						    		enumObject.showPreview({property:props[property]});	
						    	};
						    	setTimeout(function(){
						    		enumObject.capture(captureCallback);
						    	},6000);
							});
							waitsFor(function(){
								return capturestatus;
							},"waiting for callback data", 12000);
							runs(function() {	
								expect(capturedata.status).toEqual('ok');
								expect(capturedata.message).toEqual('');
								expect(capturedata.imageHeight).toBeGreaterThan(0);
								expect(capturedata.imageWidth).toBeGreaterThan(0);
								expect(capturedata.imageUri).not.toEqual('');
								expect('jpg png').toContain(capturedata.imageFormat);
								enumObject.hidePreview();
							});
						});
					};

					var data3 = [{"previewTop":250, "previewWidth":250 ,"previewLeft":300, "previewHeight":200},
					{"previewTop":-25, "previewWidth":-250 ,"previewLeft":-30, "previewHeight":-200},
					{"previewTop":0, "previewWidth":0 ,"previewLeft":0, "previewHeight":0},
					{"previewTop":10, "previewWidth":20 ,"previewLeft":-10, "previewHeight":-60}];

					for(i=0 ; i<data3.length ; i++ ){
						it("Call capture method with callback for | " + JSON.stringify(data3[i]) , function() {
							runs(function() {
						    	var props = data3[i];
						    	var obj = {};
						    	for (var property in props){
						    		obj.property = props[property];
						    	};
								enumObject.showPreview(obj);
						    	setTimeout(function(){
						    		enumObject.capture(captureCallback);
						    	},6000);
							});
							waitsFor(function(){
								return capturestatus;
							},"waiting for callback data", 12000);
							runs(function() {	
								expect(capturedata.status).toEqual('ok');
								expect(capturedata.message).toEqual('');
								expect(capturedata.imageHeight).toBeGreaterThan(0);
								expect(capturedata.imageWidth).toBeGreaterThan(0);
								expect(capturedata.imageUri).not.toEqual('');
								enumObject.hidePreview();
							});
						});
					};					

					var modelfolder = Rho.Application.modelFolderPath("CameraTest");
					var tempFolder = Rho.RhoFile.join(modelfolder, "tempFolder");
					var fileList = ['cameraimage', 'camera@#$', '_123Image', '12_image', 'QWERTY'];
					for(i=0 ; i<fileList.length ; i++ ){
						if (Rho.RhoFile.exists(tempFolder) == false){
							Rho.RhoFile.makeDir(tempFolder);
						};
						var file = Rho.RhoFile.join(tempFolder, fileList[i]);
						var camefile = fileList[i];
						if(Rho.RhoFile.exists(file) == true){
							Rho.RhoFile.deleteFile(file);
						};

						it("Call capture method with fileName : " + file , function() {
							runs(function() {
						    	enumObject.showPreview({'outputFormat' : 'image', 'fileName' : file});

						    	setTimeout(function(){
						    		enumObject.capture(captureCallback);
						    	},6000);
							});
							waitsFor(function(){
								return capturestatus;
							},"waiting for callback data", 12000);
							runs(function() {	
								expect(capturedata.status).toEqual('ok');
								expect(capturedata.message).toEqual('');
								expect(capturedata.imageHeight).toBeGreaterThan(0);
								expect(capturedata.imageWidth).toBeGreaterThan(0);
								expect(capturedata.imageUri).toContain(camefile);
								enumObject.hidePreview();
							});
						});
					};

					it("Call capture method with invalid fileName path : " + file , function() {
						runs(function() {
					    	enumObject.showPreview({"fileName" : "\\Programfiles\\invalidpath\\camimage"});
					    	setTimeout(function(){
					    		enumObject.capture(captureCallback);
					    	},6000);
						});
						waitsFor(function(){
							return capturestatus;
						},"waiting for callback data", 12000);
						runs(function() {	
							expect(capturedata.status).toEqual('error');
							expect(capturedata.message).not.toEqual('');
							enumObject.hidePreview();
						});
					});
				});
			};

			describe("Camera property using set/getProperty for "+ camtype +": "+ camname, function() {
				for (var i=0;i<arrCamera.length;i++){
					(function(idx){
						it(arrCamera[idx]['testName'], function() {
						    enumObject.setProperty(arrCamera[idx]['propertyName'],arrCamera[idx]['propertyValue']);
							var data = enumObject.getProperty(arrCamera[idx]['propertyName']);
							expect(data).toEqual(arrCamera[idx]['expectedResult']);
						});
					})(i);
				};
			});

			describe("Camera property Using set/getProperties for "+ camtype +": "+ camname, function() {
				for (var i=0;i<arrCamera.length;i++){
					(function(idx){
						it(arrCamera[idx]['testName'], function() {
							var propertyName = arrCamera[idx]['propertyName'];
							var propertyValue = arrCamera[idx]['propertyValue'];
							if (propertyValue == 'true')
								var strProperty = '{"'+propertyName+'" : '+true+'}';
							else if (propertyValue == 'false')
								var strProperty = '{"'+propertyName+'" : '+false+'}';
							else if (!isNaN(propertyValue)){
								propertyValue = parseInt(propertyValue);
								var strProperty = '{"'+propertyName+'" :'+propertyValue+'}';
							}
							else{
								var strProperty = '{"'+propertyName+'" : "'+propertyValue+'"}'
							};
							var objProperty = JSON.parse(strProperty);
							enumObject.setProperties(objProperty);
							var strGetProperty = '["'+arrCamera[idx]['propertyName']+'"]';
							var objGetProperty = JSON.parse(strGetProperty);
							var data = enumObject.getProperties(objGetProperty);
							data = data[arrCamera[idx]['propertyName']];
							expect(data).toEqual(arrCamera[idx]['expectedResult']);
						});
					})(i);
				};
			});

			describe("Camera property setting Directly for "+ camtype +": "+ camname, function() {

				for (var i=0;i<arrCamera.length;i++){
					(function(idx){
						it(arrCamera[idx]['testName'], function() {
							var propertyName = arrCamera[idx]['propertyName'];
							var propertyValue = arrCamera[idx]['propertyValue'];
							var result;
							try{
								if (propertyValue == 'true'){
									eval(enumObject)[propertyName] = true;
									result = true;
								}else if (propertyValue == 'false'){
									eval(enumObject)[propertyName] = false;
									result = false;
								}else if (!isNaN(propertyValue)){
									propertyValue = parseInt(propertyValue);
									eval(enumObject)[propertyName] = propertyValue;	
									 result = parseInt(arrCamera[idx]['expectedResult']);
								}
								else{
									eval(enumObject)[propertyName] = propertyValue;
									result = arrCamera[idx]['expectedResult'];
								};
								//var data = enumObject.getProperty(arrCamera[idx]['propertyName']);
								var data = eval(enumObject)[propertyName];
							}
							catch(err){
								var data = err.message;
							}
							expect(data).toEqual(result);
						});
					})(i);
				};
			});

			describe("set/getProperty and set/getProperties with all combination for "+ camtype +": "+ camname, function() {

				beforeEach(function() {
					getpropertiesdata ='';
					getpropertydata ='';
					callbackstatus = false;
				});

				it("Call getProperties() with sync callback and hash |" + camtype, function() {
					runs(function() {
					    enumObject.setProperties({'compressionFormat':'png','desiredHeight':120,'outputFormat':'dataUri'});
						enumObject.getProperties(['compressionFormat','desiredHeight','outputFormat'],callbackgetproperties);
					});
					waitsFor(function(){
						return callbackstatus;
					},500);
					runs(function() {
						if(isApplePlatform()){
							expect(getpropertiesdata).toContain('png');	
						}else{
							expect(getpropertiesdata).toContain('jpg');
						};
						expect(getpropertiesdata).toContain('120');
						expect(getpropertiesdata).toContain('dataUri');	
					});
				});
				it("Call getProperties() with anonymous callback and hash |" + camtype, function() {
					runs(function() {    
					    enumObject.setProperties({'compressionFormat':'jpg','desiredWidth':480,'outputFormat':'image'});
						enumObject.getProperties(['compressionFormat','desiredWidth','outputFormat'],function(data){getpropertiesdata = JSON.stringify(data);callbackstatus = true;});
					});
					waitsFor(function(){
						return callbackstatus;
					},500);	
					runs(function() {								
						//expect(getpropertiesdata).toContain('480');
						expect(getpropertiesdata).toContain('jpg');
						expect(getpropertiesdata).toContain('image');	
					});							
				});
				it("Call getProperties() without callback |" + camtype, function() {
					    //enumObject.clearAllProperties();
					    enumObject.setProperties({'compressionFormat':'png','desiredHeight':640,'outputFormat':'dataUri'});
						var data = enumObject.getProperties(['compressionFormat','desiredHeight','outputFormat']);
						getpropertiesdata = JSON.stringify(data);
						if(isApplePlatform()){
							expect(getpropertiesdata).toContain('png');
						}else{
							expect(getpropertiesdata).toContain('jpg');
						};
						//expect(getpropertiesdata).toContain('640');
						expect(getpropertiesdata).toContain('dataUri');						
				});
				it("Call getProperty() with sync callback and property |" + camtype, function() {
					runs(function() {  									    
					    enumObject.setProperty('compressionFormat','jpg');
						enumObject.getProperty("compressionFormat",callbackgetproperty);
					});
					waitsFor(function(){
						return callbackstatus;
					},500);		
					runs(function() {	
						expect(getpropertydata).toEqual('jpg');
					});										
				});
				it("Call getProperty() with anonymous callback and property |" + camtype, function() {
					runs(function() {
					    enumObject.setProperty('compressionFormat','png');
						enumObject.getProperty('compressionFormat',function(data){getpropertydata = data;callbackstatus = true;});
					});
					waitsFor(function(){
						return callbackstatus;
					},500);		
					runs(function() {	
						if(isApplePlatform()){
							expect(getpropertydata).toEqual('png');
						}else{
							expect(getpropertydata).toEqual('jpg')
						};
					});								
				});
				it("Call getProperty() without callback |" + camtype, function() {
				    enumObject.setProperty('compressionFormat','jpg');
					var data = enumObject.getProperty("compressionFormat");
					getpropertydata = data;
					expect(getpropertydata).toEqual('jpg');								
				});
				it("Call getAllProperties with Anonymous callback |" + camtype, function() {
					runs(function() {
					    enumObject.setProperties({'compressionFormat':'jpg','desiredHeight':640,'outputFormat':'dataUri'});
						enumObject.getAllProperties(function(data){
							getpropertydata = JSON.stringify(data);
							callbackstatus = true;
						});
					});
					waitsFor(function(){
						return callbackstatus;
					},2000);	
					runs(function(){
						expect(getpropertydata).toContain('jpg');
						//expect(getpropertydata).toContain(640);
						expect(getpropertydata).toContain('dataUri');
					});								
				});
			});

			describe("Properties with constants ", function() {
				it("Should set flashMode to FLASH_ON using direct calling method", function() {
				    enumObject.flashMode = Rho.Camera.FLASH_ON;
				    expect(enumObject.flashMode).toEqual("on");
				    expect(enumObject.flashMode).toEqual(Rho.Camera.FLASH_ON);
				});
				it("Should set flashMode to FLASH_ON using setproperty calling method", function() {
				   enumObject.setProperty('flashMode', Rho.Camera.FLASH_ON);
				   expect(enumObject.flashMode).toEqual("on");
				   expect(enumObject.getProperty('flashMode')).toEqual(Rho.Camera.FLASH_ON);
				});
				it("Should set flashMode to FLASH_ON using setproperties calling method", function() {
					enumObject.setProperties({
				        'flashMode': Rho.Camera.FLASH_ON
				    });
				    var data = enumObject.getProperties(['flashMode']);
				    data = data['flashMode'];
					expect(data).toEqual("on");
				    expect(data).toEqual(Rho.Camera.FLASH_ON);
				});
				it("Should set flashMode to FLASH_OFF using direct calling method", function() {
				   enumObject.flashMode = Rho.Camera.FLASH_OFF;
				   expect(enumObject.flashMode).toEqual("off");
				   expect(enumObject.flashMode).toEqual(Rho.Camera.FLASH_OFF);
				});
				it("Should set flashMode to FLASH_OFF using setproperty calling method", function() {
					enumObject.setProperty('flashMode', Rho.Camera.FLASH_OFF);
					expect(enumObject.flashMode).toEqual("off");
					expect(enumObject.getProperty('flashMode')).toEqual(Rho.Camera.FLASH_OFF);
				});
				it("Should set flashMode to FLASH_OFF using setproperties calling method", function() {
					Rho.Camera.setProperties({
			            'flashMode': Rho.Camera.FLASH_OFF
			        });
			        var data = enumObject.getProperties(['flashMode']);
			        data = data['flashMode'];
					expect(data).toEqual("off");
			        expect(data).toEqual(Rho.Camera.FLASH_OFF);
				});
				if(!isWindowsMobilePlatform()){
					it("Should set flashMode to FLASH_AUTO using direct calling method", function() {
						enumObject.flashMode = Rho.Camera.FLASH_AUTO;
						expect(enumObject.flashMode).toEqual("auto");
						expect(enumObject.flashMode).toEqual(Rho.Camera.FLASH_AUTO);
					});
					it("Should set flashMode to FLASH_AUTO using setproperty calling method", function() {
						enumObject.setProperty('flashMode', Rho.Camera.FLASH_AUTO);
						expect(enumObject.flashMode).toEqual("auto");
						expect(enumObject.getProperty('flashMode')).toEqual(Rho.Camera.FLASH_AUTO);
					});
					it("Should set flashMode to FLASH_AUTO using setproperties calling method", function() {
						Rho.Camera.setProperties({
				            'flashMode': Rho.Camera.FLASH_AUTO
				        });
				        var data = enumObject.getProperties(['flashMode']);
				        data = data['flashMode'];
						expect(data).toEqual("auto");
				        expect(data).toEqual(Rho.Camera.FLASH_AUTO);
					});
					if(!isApplePlatform()){
						it("Should set flashMode to FLASH_RED_EYE using direct calling method", function() {
							enumObject.flashMode = Rho.Camera.FLASH_RED_EYE;
							expect(enumObject.flashMode).toEqual("redEye");
							expect(enumObject.flashMode).toEqual(Rho.Camera.FLASH_RED_EYE);
						});
						it("Should set flashMode to FLASH_RED_EYE using setproperty calling method", function() {
							enumObject.setProperty('flashMode', Rho.Camera.FLASH_RED_EYE);
							expect(enumObject.flashMode).toEqual("redEye");
							expect(enumObject.getProperty('flashMode')).toEqual(Rho.Camera.FLASH_RED_EYE);
						});
						it("Should set flashMode to FLASH_RED_EYE using setproperties calling method", function() {
							Rho.Camera.setProperties({
					            'flashMode': Rho.Camera.FLASH_RED_EYE
					        });
					        var data = enumObject.getProperties(['flashMode']);
					        data = data['flashMode'];
							expect(data).toEqual("redEye");
					        expect(data).toEqual(Rho.Camera.FLASH_RED_EYE);
						});
						if(!isWindowsPhone8Platform()){
							it("Should set flashMode to FLASH_TORCH using direct calling method", function() {
								enumObject.flashMode = Rho.Camera.FLASH_TORCH;
								expect(enumObject.flashMode).toEqual("torch");
								expect(enumObject.flashMode).toEqual(Rho.Camera.FLASH_TORCH);
							});
							it("Should set flashMode to FLASH_TORCH using setproperty calling method", function() {
								enumObject.setProperty('flashMode', Rho.Camera.FLASH_TORCH);
								expect(enumObject.flashMode).toEqual("torch");
								expect(enumObject.getProperty('flashMode')).toEqual(Rho.Camera.FLASH_TORCH);
							});
							it("Should set flashMode to FLASH_TORCH using setproperties calling method", function() {
								Rho.Camera.setProperties({
						            'flashMode': Rho.Camera.FLASH_TORCH
						        });
						        var data = enumObject.getProperties(['flashMode']);
						        data = data['flashMode'];
								expect(data).toEqual("torch");
						        expect(data).toEqual(Rho.Camera.FLASH_TORCH);
							});
						};
					};
				};

				if(isWindowsMobilePlatform() && enumObject.cameraType == 'imager'){
					it("Should set aimMode to AIM_ON using direct calling method", function() {
						enumObject.aimMode = Rho.Camera.AIM_ON;
						expect(enumObject.aimMode).toEqual("on");
						expect(enumObject.aimMode).toEqual(Rho.Camera.AIM_ON);
					});
					it("Should set aimMode to AIM_ON using setproperty calling method", function() {
						enumObject.setProperty('aimMode', Rho.Camera.AIM_ON);
						expect(enumObject.aimMode).toEqual("on");
						expect(enumObject.getProperty('aimMode')).toEqual(Rho.Camera.AIM_ON);
					});
					it("Should set aimMode to AIM_ON using setproperties calling method", function() {
						enumObject.setProperties({
				            'aimMode': Rho.Camera.AIM_ON
				        });
				        var data = enumObject.getProperties(['aimMode']);
				        data = data['aimMode'];
						expect(data).toEqual("on");
				        expect(data).toEqual(Rho.Camera.AIM_ON);
					});
					it("Should set aimMode to AIM_OFF using direct calling method", function() {
						enumObject.aimMode = Rho.Camera.AIM_OFF;
						expect(enumObject.aimMode).toEqual("off");
						expect(enumObject.aimMode).toEqual(Rho.Camera.AIM_OFF);
					});
					it("Should set aimMode to AIM_OFF using setproperty calling method", function() {
						enumObject.setProperty('aimMode', Rho.Camera.AIM_OFF);
						expect(enumObject.aimMode).toEqual("off");
						expect(enumObject.getProperty('aimMode')).toEqual(Rho.Camera.AIM_OFF);
					});
					it("Should set aimMode to AIM_OFF using setproperties calling method", function() {
						Rho.Camera.setProperties({
				            'aimMode': Rho.Camera.AIM_OFF
				        });
				        var data = enumObject.getProperties(['aimMode']);
				        data = data['aimMode'];
						expect(data).toEqual("off");
				        expect(data).toEqual(Rho.Camera.AIM_OFF);
					});
				};
				if (isAndroidPlatform() || isApplePlatform()){
					it("Should set colorModel to COLOR_MODEL_RGB using direct calling method", function() {
						enumObject.colorModel = Rho.Camera.COLOR_MODEL_RGB;
						expect(enumObject.colorModel).toEqual("rgb");
						expect(enumObject.colorModel).toEqual(Rho.Camera.COLOR_MODEL_RGB);
					});
					it("Should set colorModel to COLOR_MODEL_RGB using setproperty calling method", function() {
						enumObject.setProperty('colorModel', Rho.Camera.COLOR_MODEL_RGB);
						expect(enumObject.colorModel).toEqual("rgb");
						expect(enumObject.getProperty('colorModel')).toEqual(Rho.Camera.COLOR_MODEL_RGB);
					});
					it("Should set colorModel to COLOR_MODEL_RGB using setproperties calling method", function() {
						Rho.Camera.setProperties({
				            'colorModel': Rho.Camera.COLOR_MODEL_RGB
				        });
				        var data = enumObject.getProperties(['colorModel']);
				        data = data['colorModel'];
						expect(data).toEqual("rgb");
				        expect(data).toEqual(Rho.Camera.COLOR_MODEL_RGB);
					});
					it("Should set colorModel to COLOR_MODEL_GRAYSCALE using direct calling method", function() {
						enumObject.colorModel = Rho.Camera.COLOR_MODEL_GRAYSCALE;
						expect(enumObject.colorModel).toEqual("grayscale");
						expect(enumObject.colorModel).toEqual(Rho.Camera.COLOR_MODEL_GRAYSCALE);
					});
					it("Should set colorModel to COLOR_MODEL_GRAYSCALE using setproperty calling method", function() {
						enumObject.setProperty('colorModel', Rho.Camera.COLOR_MODEL_GRAYSCALE);
						expect(enumObject.colorModel).toEqual("grayscale");
						expect(enumObject.getProperty('colorModel')).toEqual(Rho.Camera.COLOR_MODEL_GRAYSCALE);
					});
					it("Should set colorModel to COLOR_MODEL_GRAYSCALE using setproperties calling method", function() {
						Rho.Camera.setProperties({
				            'colorModel': Rho.Camera.COLOR_MODEL_GRAYSCALE
				        });
				        var data = enumObject.getProperties(['colorModel']);
				        data = data['colorModel'];
						expect(data).toEqual("grayscale");
				        expect(data).toEqual(Rho.Camera.COLOR_MODEL_GRAYSCALE);
					});
				};
				it("Should set outputFormat to OUTPUT_FORMAT_IMAGE using direct calling method", function() {
					enumObject.outputFormat = Rho.Camera.OUTPUT_FORMAT_IMAGE;
					expect(enumObject.outputFormat).toEqual("image");
					expect(enumObject.outputFormat).toEqual(Rho.Camera.OUTPUT_FORMAT_IMAGE);
				});
				it("Should set outputFormat to OUTPUT_FORMAT_IMAGE using setproperty calling method", function() {
					enumObject.setProperty('outputFormat', Rho.Camera.OUTPUT_FORMAT_IMAGE);
					expect(enumObject.outputFormat).toEqual("image");
					expect(enumObject.getProperty('outputFormat')).toEqual(Rho.Camera.OUTPUT_FORMAT_IMAGE);
				});
				it("Should set outputFormat to OUTPUT_FORMAT_IMAGE using setproperties calling method", function() {
					Rho.Camera.setProperties({
			            'outputFormat': Rho.Camera.OUTPUT_FORMAT_IMAGE
			        });
			        var data = enumObject.getProperties(['outputFormat']);
			        data = data['outputFormat'];
					expect(data).toEqual("image");
			        expect(data).toEqual(Rho.Camera.OUTPUT_FORMAT_IMAGE);
				});
				it("Should set outputFormat to OUTPUT_FORMAT_DATAURI using direct calling method", function() {
					enumObject.outputFormat = Rho.Camera.OUTPUT_FORMAT_DATAURI;
					expect(enumObject.outputFormat).toEqual("dataUri");
					expect(enumObject.outputFormat).toEqual(Rho.Camera.OUTPUT_FORMAT_DATAURI);
				});
				it("Should set outputFormat to OUTPUT_FORMAT_DATAURI using setproperty calling method", function() {
					enumObject.setProperty('outputFormat', Rho.Camera.OUTPUT_FORMAT_DATAURI);
					expect(enumObject.outputFormat).toEqual("dataUri");
					expect(enumObject.getProperty('outputFormat')).toEqual(Rho.Camera.OUTPUT_FORMAT_DATAURI);
				});
				it("Should set outputFormat to OUTPUT_FORMAT_DATAURI using setproperties calling method", function() {
					Rho.Camera.setProperties({
			            'outputFormat': Rho.Camera.OUTPUT_FORMAT_DATAURI
			        });
			        var data = enumObject.getProperties(['outputFormat']);
			        data = data['outputFormat'];
					expect(data).toEqual("dataUri");
			        expect(data).toEqual(Rho.Camera.OUTPUT_FORMAT_DATAURI);
				});
				it("Should set compressionFormat to COMPRESSION_FORMAT_JPG using direct calling method", function() {
					enumObject.compressionFormat = Rho.Camera.COMPRESSION_FORMAT_JPG;
					expect(enumObject.compressionFormat).toEqual("jpg");
					expect(enumObject.compressionFormat).toEqual(Rho.Camera.COMPRESSION_FORMAT_JPG);
				});
				it("Should set compressionFormat to COMPRESSION_FORMAT_JPG using setproperty calling method", function() {
					enumObject.setProperty('compressionFormat', Rho.Camera.COMPRESSION_FORMAT_JPG);
					expect(enumObject.compressionFormat).toEqual("jpg");
					expect(enumObject.getProperty('compressionFormat')).toEqual(Rho.Camera.COMPRESSION_FORMAT_JPG);
				});
				it("Should set compressionFormat to COMPRESSION_FORMAT_JPG using setproperties calling method", function() {
					Rho.Camera.setProperties({
			            'compressionFormat': Rho.Camera.COMPRESSION_FORMAT_JPG
			        });
			        var data = enumObject.getProperties(['compressionFormat']);
			        data = data['compressionFormat'];
					expect(data).toEqual("jpg");
			        expect(data).toEqual(Rho.Camera.COMPRESSION_FORMAT_JPG);
				});
				if (isApplePlatform()){
					it("Should set compressionFormat to COMPRESSION_FORMAT_PNG using direct calling method", function() {
						enumObject.compressionFormat = Rho.Camera.COMPRESSION_FORMAT_PNG;
						expect(enumObject.compressionFormat).toEqual("png");
						expect(enumObject.compressionFormat).toEqual(Rho.Camera.COMPRESSION_FORMAT_PNG);
					});
					it("Should set compressionFormat to COMPRESSION_FORMAT_PNG using setproperty calling method", function() {
						enumObject.setProperty('compressionFormat', Rho.Camera.COMPRESSION_FORMAT_PNG);
						expect(enumObject.compressionFormat).toEqual("png");
						expect(enumObject.getProperty('compressionFormat')).toEqual(Rho.Camera.COMPRESSION_FORMAT_PNG);
					});
					it("Should set compressionFormat to COMPRESSION_FORMAT_PNG using setproperties calling method", function() {
						Rho.Camera.setProperties({
				            'compressionFormat': Rho.Camera.COMPRESSION_FORMAT_PNG
				        });
				        var data = enumObject.getProperties(['compressionFormat']);
				        data = data['compressionFormat'];
						expect(data).toEqual("png");
				        expect(data).toEqual(Rho.Camera.COMPRESSION_FORMAT_PNG);
					});
				};
        	});
		})(enumData[j],arrCAM);
    };
});

describe("Camera JS edge API Test", function() {
	var	enableflag = false;
	var	disableflag = false;
	var getpropertiesdata ='';
	var getpropertydata ='';
    var enumData = Rho.Camera.enumerate();
    var callbackstatus = false;
	var getcallbackdata = '';
    var callbackgetproperties = function (data){
		getpropertiesdata = JSON.stringify(data);
		callbackstatus = true;
	}
	var callbackgetproperty = function (data){
		getpropertydata = data;
		callbackstatus = true;
	}

    for (var j = 0;j<enumData.length;j++){
		var arrCAM = getApplicableInvalidProperties(enumData[j]);
		(function(enumObject,arrCamera){
			var camname = enumObject.getProperty('cameraType');
			var camtype = enumObject.getProperty('ID');

			describe("Camera property using set/getProperty for "+ camtype +": "+ camname, function() {
				for (var i=0;i<arrCamera.length;i++){
					(function(idx){
						it(arrCamera[idx]['testName'], function() {
                            enumObject.setProperty(arrCamera[idx]['propertyName'],arrCamera[idx]['DefaultValue']);
						    enumObject.setProperty(arrCamera[idx]['propertyName'],arrCamera[idx]['propertyValue']);	
							var data = enumObject.getProperty(arrCamera[idx]['propertyName']);
							expect(data).toEqual(arrCamera[idx]['expectedResult']);
						});
					})(i);
				};
			});

			describe("Camera property Using set/getProperties for "+ camtype +": "+ camname, function() {
				for (var i=0;i<arrCamera.length;i++){
					(function(idx){
						it(arrCamera[idx]['testName'], function() {
							var propertyName = arrCamera[idx]['propertyName'];
							var propertyValue = arrCamera[idx]['DefaultValue'];
							propertyValue = arrCamera[idx]['propertyValue'];
                            if(propertyValue == ""){
								var strProperty = {propertyName :""};
							}
							else if (propertyValue == 'true')
								var strProperty = '{"'+propertyName+'" : '+true+' }';
							else if (propertyValue == 'false')
								var strProperty = '{"'+propertyName+'" : '+false+' }';
							else if (!isNaN(propertyValue)){
								propertyValue = parseInt(propertyValue);
								var strProperty = '{"'+propertyName+'" :'+propertyValue+'}';
							}
							else{
								var strProperty = '{"'+propertyName+'" : "'+propertyValue+'"}';
							};
							var objProperty;
							if(propertyValue != ""){
							 objProperty = JSON.parse(strProperty);
							};
							enumObject.setProperties(objProperty);
							var strGetProperty = '["'+arrCamera[idx]['propertyName']+'"]';
							var objGetProperty = JSON.parse(strGetProperty);
							var data = enumObject.getProperties(objGetProperty);
							data = data[arrCamera[idx]['propertyName']];
							expect(data).toEqual(arrCamera[idx]['expectedResult']);
						});
					})(i);
				};
			});
		})(enumData[j],arrCAM);
    };
});

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
		},5000);
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
		},5000);
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