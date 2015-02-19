describe("Barcode JS API", function() {
	var barcodeNotSupportedDevices = ["VC70"];
	var	enableflag = false;
	var	disableflag = false;
	var getpropertiesdata ='';
	var getpropertydata ='';
    var enumData = Rho.Barcode.enumerate();
    var callbackstatus = false;
    var pickListNotSupportedDevices = ["MC32","MC75A"];
if(barcodeNotSupportedDevices.indexOf(Rho.System.deviceName) == -1){

	var callbackgetproperties = function (data){
		getpropertiesdata = JSON.stringify(data);
		callbackstatus = true;
	}

	var callbackgetproperty = function (data){
		getpropertydata = data;
		callbackstatus = true;
	}

    for (var j = 0;j<enumData.length;j++){

		var arrSCN = getApplicableProperties(enumData[j]);

		(function(enumObject,arrScanner){
			
			if(isAndroid && Rho.System.deviceName.indexOf('Motorola Solutions') == -1)
			{
				return;
			}
	
			var scnname = enumObject.getProperty('friendlyName');
			var scnid = enumObject.getProperty('ID');
			//var scntype = enumObject.getProperty('scannerType');
			var scntype = enumObject.scannerType;
			//alert("scntype" + scntype + "scnname" + scnname);

		    var RETICLE_TYPE = 'softwareReticle';
			if(Rho.System.platform == "ANDROID" && scnname.indexOf("Imager") >= 0)
			{
				RETICLE_TYPE = 'hardwareReticle';
			}
			else
			{
				RETICLE_TYPE = 'softwareReticle';
			}

			describe("Enable Scanner "+ scnid +": "+ scnname + scntype, function() {

				beforeEach(function() {
					enableflag = false;
				});
				
				it("Enable "+ scnid + scnname, function() {
					runs(function() {
						setTimeout(function(){
							enableflag = true;
						}, 5000)
					});
					
					waitsFor(function() {
						return enableflag;
					}, "Waiting for enable", 11000);
					runs(function() {
						enableflag = false;
						//Rho.Log.info(JSON.stringify(scanObject), "PATRO Enable");
						enumObject.enable();
						setTimeout(function() {
						enableflag = true;
						}, 10000);
					});
					
					waitsFor(function() {
						return enableflag;
					}, "Waiting for enable", 11000);
				
				});
			});


			describe("Barcode property using set/getProperty for "+ scnid +": "+ scnname, function() {

				for (var i=0;i<arrScanner.length;i++){

					(function(idx){
						if(scnname.indexOf("Bluetooth") == -1){
							it(arrScanner[idx]['testName'], function() {

								    enumObject.setProperty(arrScanner[idx]['propertyName'],arrScanner[idx]['propertyValue']);
									var data = enumObject.getProperty(arrScanner[idx]['propertyName']);
									expect(data).toEqual(arrScanner[idx]['expectedResult']);
							});
						}
					})(i);

				}
			});


			describe("Barcode property Using set/getProperties for "+ scnid +": "+ scnname, function() {

				for (var i=0;i<arrScanner.length;i++){

					(function(idx){
						if(scnname.indexOf("Bluetooth") == -1){
							it(arrScanner[idx]['testName'], function() {
							
								var propertyName = arrScanner[idx]['propertyName'];
								var propertyValue = arrScanner[idx]['propertyValue'];

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

								var strGetProperty = '["'+arrScanner[idx]['propertyName']+'"]';
								var objGetProperty = JSON.parse(strGetProperty);

								var data = enumObject.getProperties(objGetProperty);

				
								data = data[arrScanner[idx]['propertyName']];
								expect(data).toEqual(arrScanner[idx]['expectedResult']);
		
							});
						}
					})(i);
				}
			});

			describe("Barcode property setting Directly for "+ scnid +": "+ scnname, function() {

				for (var i=0;i<arrScanner.length;i++){

					(function(idx){
						it(arrScanner[idx]['testName'], function() {
							
							var propertyName = arrScanner[idx]['propertyName'];
							var propertyValue = arrScanner[idx]['propertyValue'];

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

								var data = enumObject.getProperty(arrScanner[idx]['propertyName']);
							}
							catch(err){

								var data = err.message;
							}

							expect(data).toEqual(arrScanner[idx]['expectedResult']);

						});
					})(i);
				}
			});


			describe("getProperty and get properties with all combination for "+ scnid +": "+ scnname, function() {

				beforeEach(function() {
					getpropertiesdata ='';
					getpropertydata ='';
					callbackstatus = false;
				});
				if(scnname.indexOf("Bluetooth") == -1){
					if(pickListNotSupportedDevices.indexOf(Rho.System.deviceName) == -1){
						it("VT282-2001 | call getProperties() with sync callback and hash |" + scnid, function() {

							runs(function() {
							    enumObject.setProperties({'allDecoders':'false','picklistMode':RETICLE_TYPE,'code93':'true'});
								enumObject.getProperties(['allDecoders','picklistMode','code93'],callbackgetproperties);
							});

							waitsFor(function(){
								return callbackstatus;
							},"Wait for callback status", 5000);

							runs(function() {							
								expect(getpropertiesdata).toContain('true');
								expect(getpropertiesdata).toContain('false');
								expect(getpropertiesdata).toContain(RETICLE_TYPE);	
							});
						});


						it("VT282-2002 | call getProperties() with anonymous callback and hash |" + scnid, function() {

							runs(function() {    
							    enumObject.setProperties({'allDecoders':'false','picklistMode':RETICLE_TYPE,'code93':'true'});
								enumObject.getProperties(['allDecoders','picklistMode','code93'],function(data){getpropertiesdata = JSON.stringify(data);callbackstatus = true;});
							});

							waitsFor(function(){
								return callbackstatus;
							},"Wait for callback status", 5000);	

							runs(function() {								
								expect(getpropertiesdata).toContain('true');
								expect(getpropertiesdata).toContain('false');
								expect(getpropertiesdata).toContain(RETICLE_TYPE);	
							});							
						});

						it("VT282-2000 | call getProperties() without callback |" + scnid, function() {

							    //enumObject.clearAllProperties();
							    enumObject.setProperties({'allDecoders':'false','picklistMode':RETICLE_TYPE,'code93':'true'});
								var data = enumObject.getProperties(['allDecoders','picklistMode','code93']);
								getpropertiesdata = JSON.stringify(data);
								expect(getpropertiesdata).toContain('true');
								expect(getpropertiesdata).toContain('false');
								expect(getpropertiesdata).toContain(RETICLE_TYPE);								
						});
					}

					it("VT282-2004 | call getProperty() with sync callback and property |" + scnid, function() {

						runs(function() {  									    
						    enumObject.setProperty('allDecoders','true');
							enumObject.getProperty("allDecoders",callbackgetproperty);
						});

						waitsFor(function(){
							return callbackstatus;
						},"Wait for callback status", 5000);	
						
						runs(function() {	
							expect(getpropertydata).toEqual('true');
						});										
					});
					if(pickListNotSupportedDevices.indexOf(Rho.System.deviceName) == -1){
						it("VT282-2005 | call getProperty() with anonymous callback and property |" + scnid, function() {

							runs(function() {
							    enumObject.setProperty('picklistMode',RETICLE_TYPE);
								enumObject.getProperty('picklistMode',function(data){getpropertydata = data;callbackstatus = true;});
							});

							waitsFor(function(){
								return callbackstatus;
							},"Wait for callback status", 5000);	
							
							runs(function() {	
								expect(getpropertydata).toEqual(RETICLE_TYPE);
							});								
						});
					}

					it("VT282-2003 | call getProperty() without callback |" + scnid, function() {
		    
						    enumObject.setProperty('allDecoders','true');
							var data = enumObject.getProperty("allDecoders");
							getpropertydata = data;
							expect(getpropertydata).toEqual('true');								
					});
				}
				
				//  DCC - Removing this test as it is testing for ID property (unsupported)
//						it("VT282-2006 | call getDefault |" + scnid, function() {
//								alert(enumObject);
//							    Rho.Barcode.setDefault(enumObject);
//							    var defaultobj = Rho.Barcode.getDefault();
//								expect(scnid).toEqual(defaultobj.getProperty('ID'));
//						});

				//  DCC - Removing this test as it is testing for ID property (unsupported)
//						it("VT282-2006A | call Default |" + scnid, function() {

//							    //enumObject.clearAllProperties();
//							    //Rho.Barcode.setDefaultID( enumObject.getId() );
//							   // Rho.Barcode.setDefault( enumObject );
//							   // var defaultobj = Rho.Barcode.getDefault();
//								expect(scnid).toEqual(defaultobj.getProperty('ID'));
//						});
			});

			describe("Disable Scanner "+ scnid +": "+ scnname + scntype, function() {

				beforeEach(function() {
					disableflag = false;
				});

				it("Disable "+ scnid + scnname, function() {
					
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

			if(Rho.System.platform == "ANDROID")
			{
				describe("Barcode property set using enable() for "+ scnid +": "+ scnname, function() {

					var flag = false;

					beforeEach(function() {
						flag = false;
					});

					afterEach(function() {
						enumObject.disable();
					});

					for (var i=0;i<arrScanner.length;i++){

						(function(idx){

							it(arrScanner[idx]['testName'], function() {

								runs(function() {

									var propertyName = arrScanner[idx]['propertyName'];
									var propertyValue = arrScanner[idx]['propertyValue'];

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

									enumObject.enable(objProperty, scanCallback);

									setTimeout(function() {
										flag = true;
									}, ENABLE_TIMEOUT_VALUE);
								});

								waitsFor(function() {
									return flag;
								}, "Waiting for enable", 9000);
									
								runs(function() {

									var strGetProperty = '["'+arrScanner[idx]['propertyName']+'"]';
									var objGetProperty = JSON.parse(strGetProperty);

									var data = enumObject.getProperties(objGetProperty);

									data = data[arrScanner[idx]['propertyName']];
									expect(data).toEqual(arrScanner[idx]['expectedResult']);
								});

							});
						})(i);

					}
				});
			}


				describe("Invalid Cases - Should not crash", function() {
					
					it("VT282-1777 | Enable invalid Scanner", function() {
						var invalidBarcodeObj = enumObject;
						invalidBarcodeObj.id = "scanner5";
						runs(function() {
							invalidBarcodeObj.enable();
						});
					});

					it("VT282-1926 | call enable with invalid hash", function(){
						var invalidBarcodeObj = enumObject;
						invalidBarcodeObj.id = "scannerInvalid";
						invalidBarcodeObj.name = "invalidhash";
						invalidBarcodeObj.age = 22;
						invalidBarcodeObj.height = 155;

						runs(function() {
							invalidBarcodeObj.enable();
						});
					});
					it("VT282-1943 | set using Barcode.Propertyname for barcodeDataFormat as test (invalid value)", function(){
						runs(function(){
							var objProperty = {'allDecoders':true,'dataBufferSize':20000, 'barcodeDataFormat':'test'};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					it("VT282-1948 | set using Barcode.Propertyname for dataBufferSize as -1", function(){
						runs(function(){
							var objProperty = {'allDecoders':true,'dataBufferSize':-1, 'barcodeDataFormat':'binary'};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					it("VT282-1954 | set using Barcode.Propertyname for signatureImageHeight to -100 ", function(){
						runs(function(){
							var objProperty = {'allDecoders':false, 'signature':true, 'dataBufferSize':20000, 'barcodeDataFormat':'binary', 'signatureImageHeight':-100};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					it("VT282-1958 | set using Barcode.Propertyname for signatureImageWidth to  -100 ", function(){
						runs(function(){
							var objProperty = {'allDecoders':false, 'signature':true, 'dataBufferSize':20000, 'barcodeDataFormat':'binary', 'signatureImageWidth':-100};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					it("VT282-1962 | set using Barcode.Propertyname for signatureImageQuality to  -20 ", function(){
						runs(function(){
							var objProperty = {'allDecoders':false, 'signature':true, 'dataBufferSize':20000, 'barcodeDataFormat':'binary', 'signatureImageQuality':-20};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					// it("call getProperty() with callback as action URL and no property ", function(){
					// });
					it("VT282-2007 | call getProperty() with sync callback and no property ", function(){
						runs(function(){
							enumObject.enable();
							enumObject.getProperty('',callbackgetproperty);
						});
						waitsFor(function(){
							return callbackstatus;
						});	
						runs(function() {	
							expect(callbackstatus).toEqual(true);
						});	
					});
					it("VT282-2008 | call getProperty() with anonymous callback and no property ", function(){
						runs(function(){
							enumObject.enable();
							enumObject.getProperty('',function(data){getpropertydata = data;callbackstatus = true;});
						});
						waitsFor(function(){
							return callbackstatus;
						});	
						runs(function() {	
							expect(callbackstatus).toEqual(true);
						});	
					});
					// it("call getProperty() with callback as action URL and hash ", function(){
					// });
					it("VT282-2010 | call getProperty() with sync callback hash ", function(){
						runs(function(){
							enumObject.enable();
							enumObject.getProperty(['allDecoders','picklistMode','code93'],callbackgetproperty);
						});
						waitsFor(function(){
							return callbackstatus;
						});	
						runs(function() {	
							expect(callbackstatus).toEqual(true);
						});	
					});
					it("VT282-2011 | call getProperty() with anonymous callback and hash ", function(){
						runs(function(){
							enumObject.enable();
							enumObject.getProperty(['allDecoders','picklistMode','code93'],function(data){getpropertydata = data;callbackstatus = true;});
						});
						waitsFor(function(){
							return callbackstatus;
						});	
						runs(function() {	
							expect(callbackstatus).toEqual(true);
						});	
					});
					// it("call getProperties() with callback as action URL and no hash ", function(){
					// });
					it("VT282-2013 | call getProperties() with sync callback and no hash ", function(){
						runs(function(){
							enumObject.enable();
							enumObject.getProperties([],callbackgetproperties);
						});
						waitsFor(function(){
							return callbackstatus;
						});	
						runs(function() {	
							expect(callbackstatus).toEqual(true);
						});	
					});
					it("VT282-2014 | call getProperties() with anonymous callback and no hash ", function(){
						runs(function(){
							enumObject.enable();
							enumObject.getProperties([],function(data){getpropertydata = data;callbackstatus = true;});
						});
						waitsFor(function(){
							return callbackstatus;
						});	
						runs(function() {	
							expect(callbackstatus).toEqual(true);
						});	
					});
					it("VT282-2068 | call setproperty with viewfinderFeedbackTime to -5000 ", function(){
						runs(function(){
							var objProperty = {'allDecoders':true, 'viewfinderFeedback':'enabled', 'viewfinderFeedbackTime':-5000};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					// it("call setproperty with negative sameSymbolTimeout and differentSymbolTimeout ", function(){
					// });
					// it("sameSymbolTimeout and differentSymbolTimeout with aimtype trigger  ", function(){
					// });
					// it("call setproperty with enableTimeout as 0 second ", function(){
					// });
					it("VT282-2113 | call setproperty with barcodeDataFormat as test (invalid value) ", function(){
						runs(function(){
							var objProperty = {'allDecoders':true, 'barcodeDataFormat':'test', 'dataBufferSize':20000};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					it("VT282-2114 | call setproperty with barcodeDataFormat as empty data ", function(){
						runs(function(){
							var objProperty = {'allDecoders':true, 'barcodeDataFormat':null, 'dataBufferSize':20000};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					it("VT282-2124 | call setproperty with signatureImageHeight to -100 ", function(){
						runs(function(){
							var objProperty = {'allDecoders':false, 'signature':true, 'barcodeDataFormat':'binary','dataBufferSize':20000,'signatureImageHeight':-100};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					// it("call enable with VF coordinates to negative values ", function(){
					// });
					it("VT282-2216 | call enable with viewfinderFeedbackTime to -5000 ", function(){
						runs(function(){
							var objProperty = {'allDecoders':true, 'viewfinderFeedback':'enabled','viewfinderFeedbackTime':-5000};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					// it("call enable with negative sameSymbolTimeout and differentSymbolTimeout ", function(){
					// });
					// it("call enable with sameSymbolTimeout and differentSymbolTimeout with aimtype trigger  ", function(){
					// });
					// it("call enable with enableTimeout as 0 second ", function(){
					// });
					it("VT282-2261 | call enable with barcodeDataFormat as test (invalid value) ", function(){
						runs(function(){
							var objProperty = {'allDecoders':true, 'barcodeDataFormat':'test','dataBufferSize':20000};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					it("VT282-2262 | call enable with barcodeDataFormat as empty data ", function(){
						runs(function(){
							var objProperty = {'allDecoders':true, 'barcodeDataFormat':null,'dataBufferSize':20000};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					it("VT282-2272 | call enable with signatureImageHeight to -100 ", function(){
						runs(function(){
							var objProperty = {'allDecoders':false, 'signature':true, 'barcodeDataFormat':'binary','dataBufferSize':20000,'signatureImageHeight':-100};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});
					it("VT282-2280 | call enable with signatureImageQuality to  -20 ", function(){
						runs(function(){
							var objProperty = {'allDecoders':false, 'signature':true, 'barcodeDataFormat':'binary','dataBufferSize':20000,'signatureImageQuality':-20};
							enumObject.enable(objProperty, scanCallback);
						});
						runs(function(){
							enumObject.start();
							setTimeout(function(){
								enumObject.stop();
							}, 3000)
						});
					});

				});


		})(enumData[j],arrSCN);

    }

	describe("Enumerate Scanner ", function() {
		var enumObjCount = false;
	
		var enumCallback = function (enumobj){
	
			enumobj.length>0 ? enumObjCount=true : enumObjCount=false
	
		};
	
		beforeEach(function() {
			enumObjCount = false;
		});
	
		it("Enumerate Scanner callback as function", function() {
					
			runs(function() {
				Rho.Barcode.enumerate(enumCallback);
			});
			waitsFor(function(){
				return enumObjCount;
			});
			runs(function(){
				expect(enumObjCount).toEqual(true);
			});
		});
	
		it("Enumerate Scanner with anonymous function as callback", function() {
				
			runs(function() {
				Rho.Barcode.enumerate(function(obj){
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
	
		it("Enumerate Scanners without callback (Synchronous Access)", function() {
				
			runs(function() {
				var obj = Rho.Barcode.enumerate();
				callBackfired = enumCallback(obj);
				expect(enumObjCount).toEqual(true);
			});
	 	});
	 	
	});

}else{
	it("This device does not support Barcode feature",function(){
		expect(true).toEqual(true);
	});
}
    
});