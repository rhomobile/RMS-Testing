describe("Barcode JS API Test", function() {
	var	enableflag = false;
	var	disableflag = false;
	var getpropertiesdata ='';
	var getpropertydata ='';
    var enumData = Rho.Barcode.enumerate();

    var callbackgetproperties = function (data){
		getpropertiesdata = JSON.stringify(data);
	}

	var callbackgetproperty = function (data){
		getpropertydata = data;
	}

    for (var j = 0;j<enumData.length;j++){

		var arrSCN = getApplicableProperties(enumData[j]);

		(function(enumObject,arrScanner){

			var scnname = enumObject.getProperty('friendlyName');
			var scntype = enumObject.getProperty('ID');

			describe("Enable Scanner "+ scntype +": "+ scnname, function() {

				beforeEach(function() {
					enableflag = false;
				});
				
				it("Enable "+ scntype + scnname, function() {
					
					runs(function() {
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


			describe("Barcode property using set/getProperty for "+ scntype +": "+ scnname, function() {

				for (var i=0;i<arrScanner.length;i++){

					(function(idx){
						it(arrScanner[idx]['testName'], function() {

							    enumObject.setProperty(arrScanner[idx]['propertyName'],arrScanner[idx]['propertyValue']);
								var data = enumObject.getProperty(arrScanner[idx]['propertyName']);
								expect(data).toEqual(arrScanner[idx]['expectedResult']);
						});

					})(i);

				}
			});


			describe("Barcode property Using set/getProperties for "+ scntype +": "+ scnname, function() {

				for (var i=0;i<arrScanner.length;i++){

					(function(idx){
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
					})(i);
				}
			});

			describe("Barcode property setting Directly for "+ scntype +": "+ scnname, function() {

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


			describe("getProperty and get properties with all combination for "+ scntype +": "+ scnname, function() {

				beforeEach(function() {
					getpropertiesdata ='';
					getpropertydata ='';
				});

						it("VT282-2001 | call getProperties() with sync callback and hash |" + scntype, function() {

							    //enumObject.clearAllProperties();
							    enumObject.setProperties({'allDecoders':'false','picklistMode':'softwareReticle','code93':'true'});
								enumObject.getProperties(['allDecoders','picklistMode','code93'],callbackgetproperties);
								expect(getpropertiesdata).toContain('true');
								expect(getpropertiesdata).toContain('false');
								expect(getpropertiesdata).toContain('softwareReticle');	
						});


						it("VT282-2002 | call getProperties() with anonymous callback and hash |" + scntype, function() {

							    //enumObject.clearAllProperties();							    
							    enumObject.setProperties({'allDecoders':'false','picklistMode':'softwareReticle','code93':'true'});
								enumObject.getProperties(['allDecoders','picklistMode','code93'],function(data){getpropertiesdata = JSON.stringify(data);});
								expect(getpropertiesdata).toContain('true');
								expect(getpropertiesdata).toContain('false');
								expect(getpropertiesdata).toContain('softwareReticle');								
						});

						it("VT282-2000 | call getProperties() without callback |" + scntype, function() {

							    //enumObject.clearAllProperties();
							    enumObject.setProperties({'allDecoders':'false','picklistMode':'softwareReticle','code93':'true'});
								var data = enumObject.getProperties(['allDecoders','picklistMode','code93']);
								getpropertiesdata = JSON.stringify(data);
								expect(getpropertiesdata).toContain('true');
								expect(getpropertiesdata).toContain('false');
								expect(getpropertiesdata).toContain('softwareReticle');								
						});


						it("VT282-2004 | call getProperty() with sync callback and property |" + scntype, function() {

							    //enumObject.clearAllProperties();							    
							    enumObject.setProperty('allDecoders','true');
								enumObject.getProperty("allDecoders",callbackgetproperty);
								expect(getpropertydata).toEqual('true');								
						});

						it("VT282-2005 | call getProperty() with anonymous callback and property |" + scntype, function() {

							    //enumObject.clearAllProperties();							    
							    enumObject.setProperty('picklistMode','softwareReticle');
								enumObject.getProperty('picklistMode',function(data){getpropertydata = data;});
								expect(getpropertydata).toEqual('true');							
						});


						it("VT282-2003 | call getProperty() without callback |" + scntype, function() {

							    //enumObject.clearAllProperties();							    
							    enumObject.setProperty('allDecoders','true');
								//enumObject.getProperty("allDecoders",callbackgetproperty);
								var data = enumObject.getProperty("allDecoders");
								getpropertydata = data;
								expect(getpropertydata).toEqual('true');								
						});

						it("VT282-2006 | call getDefault |" + scntype, function() {

							    //enumObject.clearAllProperties();
							    //Rho.Barcode.setDefaultID( enumObject.getId() );
							    Rho.Barcode.setDefault(enumObject);
							    var defaultobj = Rho.Barcode.getDefault();
							    alert(defaultobj);						  
								expect(scntype).toEqual(defaultobj.getProperty('ID'));
						});

			});

			describe("Disable Scanner "+ scntype +": "+ scnname, function() {

				beforeEach(function() {
					disableflag = false;
				});

				it("Disable "+ scntype + scnname, function() {
					
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

/*
			describe("Barcode property set using enable() for "+ scntype +": "+ scnname, function() {

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
					 			}, 8000);
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
*/

		})(enumData[j],arrSCN);

    }

});


describe("Enumerate Scanner ", function() {
			
	it("Enumerate Scanner callback as function", function() {
				
		runs(function() {
			Rho.Barcode.enumerate(enumCallback);
			expect(enumCallback).toEqual(true);
		});
	});

	it("Enumerate Scanner with anonymous function as callback", function() {
			
		runs(function() {
			Rho.Barcode.enumerate(function(obj){
				enumCallback(obj);
			});
			expect(enumCallback).toEqual(true);
		});
 	});

	it("Enumerate Scanners without callback (Synchronous Access)", function() {
			
		runs(function() {
			var obj = Rho.Barcode.enumerate();
			expect(enumCallback(obj)).toEqual(true);
		});
 	});
 	
 	/*
	it("Enumerate Scanner with callback as action URL", function() {
	
		runs(function() {
			Rho.Barcode.enumerate(/app/BarcodeTest/getScannerNumber);
			expect(enumCallback).toEqual(true);
		});
	});
	*/
});
