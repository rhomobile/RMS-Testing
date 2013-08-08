describe("Camera JS API Test", function() {
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
						    enumObject.setProperties({'compressionFormat':'png','desiredHeight':'640','outputFormat':'dataUri'});
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
						    enumObject.setProperties({'compressionFormat':'jpg','desiredWidth':'480','outputFormat':'image'});
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
						    enumObject.setProperties({'compressionFormat':'png','desiredHeight':'640','outputFormat':'dataUri'});
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
						    enumObject.takePicture(camCallback);

						    if (isWindowsMobilePlatform())
						    {
							    expect(Rho.Signature.previewHeight).toBeGreaterThan(0);
								expect(Rho.Signature.previewLeft).toBeGreaterThan(0);
								expect(Rho.Signature.previewTop).toBeGreaterThan(0);
								expect(Rho.Signature.previewWidth).toBeGreaterThan(0);
						    }

						    if (isApplePlatform() || isAndroidPlatform())
						    {
							    expect(Rho.Signature.saveToDeviceGallery).toEqual(true);
							    expect(enumObject.colorModel).toEqual('rgb');
						    }

						    if (isApplePlatform())
						    {
						    	expect(Rho.Signature.enableEditing).toEqual(true);
						    }

						    if (isAndroidPlatform())
						    {
						    	expect(Rho.Signature.flashMode).toEqual('off');
						    	expect(Rho.Signature.useSystemViewfinder).toEqual(false);
						    }

							expect(enumObject.compressionFormat).toEqual('jpg');						
							expect(enumObject.desiredHeight).toBeGreaterThan(0);
							expect(enumObject.desiredWidth).toBeGreaterThan(0);						
							expect(Rho.Signature.outputFormat).toEqual('image');
							
							Rho.Signature.hide();
						});
					});

					it("VT299-091 | check values of all read only property |", function() {

						runs(function() {
						    enumObject.takePicture(camCallback);
						    var type = "back front";
						    var resolution = enumObject.supportedSizeList

							expect(type).toContain(enumObject.cameraType);						
							expect(enumObject.maxHeight).toBeGreaterThan(0);
							expect(enumObject.maxWidth).toBeGreaterThan(0);
							expect(resolution.width).toBeGreaterThan(0);					
							expect(resolution.height).toBeGreaterThan(0);
							
							Rho.Signature.hide();
						});
					});

					it("VT285-1002 | Call getAllProperties with Anonymous callback |" + camtype, function() {

						runs(function() {
						    enumObject.setProperties({'compressionFormat':'jpg','desiredHeight':'640','outputFormat':'dataUri'});
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

					it("VT285-1003 | Call takePicture with all string in hash|" + camtype, function() {

						runs(function() {
						    enumObject.takePicture({'compressionFormat':'jpg','desiredHeight':'640','outputFormat':'dataUri'},camCallback);
							enumObject.getAllProperties(function(data){getpropertydata = data;callbackstatus = true;});
						});

						waitsFor(function(){
							return callbackstatus;
						});	
						
						runs(function() {	
							expect(getpropertydata).toContain('jpg');
							expect(getpropertydata).toContain('640');
							expect(getpropertydata).toContain('datauri');
						});								
					});

					it("VT285-1004 | Call choosePicture with all string in hash|" + camtype, function() {

						runs(function() {
						    enumObject.takePicture({'desiredHeight':'480','desiredHeight':'640','outputFormat':'image'},camCallback);
							enumObject.getAllProperties(function(data){getpropertydata = data;callbackstatus = true;});
						});

						waitsFor(function(){
							return callbackstatus;
						});	
						
						runs(function() {	
							expect(getpropertydata).toContain('480');
							expect(getpropertydata).toContain('640');
							expect(getpropertydata).toContain('image');
						});								
					});
			});

			describe("Camera property set using takePicture() for "+ camtype +": "+ camname, function() {

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

						});
					})(i);

				}
			});

		})(enumData[j],arrCAM);

    }

});


describe("Camera choosePicture() JS API Test", function() {
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
