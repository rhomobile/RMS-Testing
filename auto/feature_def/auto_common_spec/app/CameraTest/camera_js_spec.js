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
/*

			describe("Enable Camera "+ camtype +": "+ camname, function() {

				beforeEach(function() {
					enableflag = false;
				});
				
				it("Enable "+ camtype + camname, function() {
					
					runs(function() {
						//Rho.Log.info(JSON.stringify(scanObject), "PATRO Enable");
						enumObject.enable();
						setTimeout(function() {
						enableflag = true;
						}, 5000);
					});
					
					waitsFor(function() {
						return enableflag;
					}, "Waiting for enable", 6000);
				
				});
			});


			describe("Barcode property using set/getProperty for "+ camtype +": "+ camname, function() {

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


			describe("Barcode property Using set/getProperties for "+ camtype +": "+ camname, function() {

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

			describe("Barcode property setting Directly for "+ camtype +": "+ camname, function() {

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

								var data = enumObject.getProperty(arrCamera[idx]['propertyName']);
							}
							catch(err){

								var data = err.message;
							}

							expect(data).toEqual(arrCamera[idx]['expectedResult']);

						});
					})(i);
				}
			});

*/
			describe("getProperty and get properties with all combination for "+ camtype +": "+ camname, function() {

				beforeEach(function() {
					getpropertiesdata ='';
					getpropertydata ='';
					callbackstatus = false;
				});

						it("VT282-2001 | call getProperties() with sync callback and hash |" + camtype, function() {

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


						it("VT282-2002 | call getProperties() with anonymous callback and hash |" + camtype, function() {

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

						it("VT282-2000 | call getProperties() without callback |" + camtype, function() {

							    //enumObject.clearAllProperties();
							    enumObject.setProperties({'compressionFormat':'png','desiredHeight':'640','outputFormat':'dataUri'});
								var data = enumObject.getProperties(['compressionFormat','desiredHeight','outputFormat']);
								getpropertiesdata = JSON.stringify(data);
								expect(getpropertiesdata).toContain('png');
								expect(getpropertiesdata).toContain('640');
								expect(getpropertiesdata).toContain('dataUri');						
						});


						it("VT282-2004 | call getProperty() with sync callback and property |" + camtype, function() {

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

						it("VT282-2005 | call getProperty() with anonymous callback and property |" + camtype, function() {

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


						it("VT282-2003 | call getProperty() without callback |" + camtype, function() {
			    
							    enumObject.setProperty('compressionFormat','jpg');
								var data = enumObject.getProperty("compressionFormat");
								getpropertydata = data;
								expect(getpropertydata).toEqual('jpg');								
						});

						it("VT282-2006 | call getDefault |" + camtype, function() {

							    Rho.Camera.setDefault(enumObject);
							    var defaultobj = Rho.Camera.getDefault();						  
								expect(camtype).toEqual(defaultobj.getProperty('ID'));
						});

						it("VT282-2006A | call Default |" + camtype, function() {

							    //enumObject.clearAllProperties();
							    //Rho.Camera.setDefaultID( enumObject.getId() );
							   // Rho.Camera.default = enumObject;
							   // var defaultobj = Rho.Camera.default;
								expect(camtype).toEqual(defaultobj.getProperty('ID'));
						});
			});
/*
			describe("Disable Camera "+ camtype +": "+ camname, function() {

				beforeEach(function() {
					disableflag = false;
				});

				it("Disable "+ camtype + camname, function() {
					
					runs(function() {
						//Rho.Log.info(JSON.stringify(scanObject), "PATRO Disable");
						enumObject.disable();
						setTimeout(function() {
						disableflag = true;
						}, 10000);

					});

					waitsFor(function() {
						return disableflag;
					}, "Waiting for enable", 11000);
				
				});
			});

*/
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

								enumObject.choosePicture(objProperty, camCallback);

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



describe("Enumerate Camera ", function() {
	var enumObjCount = false;

	var enumCallback = function (enumobj){

		enumobj.length>0 ? enumObjCount=true : enumObjCount=false

	};

	beforeEach(function() {
		enumObjCount = false;
	});

	it("Enumerate Camera callback as function", function() {
				
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

	it("Enumerate Camera with anonymous function as callback", function() {
			
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

	it("Enumerate Camera without callback (Synchronous Access)", function() {
			
		runs(function() {
			var obj = Rho.Camera.enumerate();
			callBackfired = enumCallback(obj);
			expect(enumObjCount).toEqual(true);
		});
 	});
 	
});
