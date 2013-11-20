describe("RSM JS API", function() {
	var	enableflag = false;
	var	disableflag = false;
	var bluetoothStatusdata ='';
	var getpropertydata ='';
    var enumData = Rho.Barcode.enumerate();
    var callbackstatus = false;
	var j = enumData.length -1;
	var BTstatus = "";
	
    var bluetoothStatus = function (data){
		bluetoothStatusdata = JSON.stringify(data);
		callbackstatus = true;
		BTstatus = data.status;
	}
	
	var callbackgetproperties = function (data){
		getpropertiesdata = JSON.stringify(data);
		callbackstatus = true;
	}

	var callbackgetproperty = function (data){
		getpropertydata = data;
		callbackstatus = true;
	}
	var arrSCN = getApplicableProperties(enumData[j]);
	var arrReadSCN = getApplicableReadOnlyProperties(enumData[j]);
	
	(function(enumObject,arrScanner,arrReadScanner){
	
		var scnid = enumObject.getProperty('ID');
		var scntype = enumObject.getProperty('scannerType');
		var scnname = enumObject.getProperty('friendlyName');
	
		describe("Enable Scanner ", function() {
			beforeEach(function() {
				enableflag = false;
				callbackstatus = false;
				//bluetoothStatusdata = ""
			});
			
			it("Enable" + scnid +scnname, function() {		
				runs(function() {
					enumObject.connectionIdleTimeout = 30;
					enumObject.disconnectBtOnDisable = false;
					enumObject.displayBtAddressBarcodeOnEnable = true;
					enumObject.disableScannerDuringNavigate = false;
					enumObject.registerBluetoothStatus(bluetoothStatus);
					enumObject.enable();
				});
				
				waitsFor(function(){
					return callbackstatus;
				});
				
				runs(function() {							
					expect(bluetoothStatusdata).toContain('BluetoothConnected');
				});			
	
			});
		});
//		if (BTstatus == "BluetoothConnected")
//		{
/*
			describe("RSM property using set/getProperty for "+ scnid +": "+ scnname, function() {

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
*/			
			describe("RSM Read Only property using getProperty for "+ scnid +": "+ scnname, function() {

				for (var i=0;i<arrReadScanner.length;i++){
				
					(function(idx){
						it(arrReadScanner[idx]['testName'], function() {
								//enumObject.setProperty(arrScanner[idx]['propertyName'],arrScanner[idx]['propertyValue']);
								var data = enumObject.getProperty(arrReadScanner[idx]['propertyName']);
								expect(data).not.toBe(null);
						});

					})(i);
				}
			});
/*			
			describe("RSM property Using set/getProperties for "+ scnid +": "+ scnname, function() {

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

			describe("RSM property setting Directly for "+ scnid +": "+ scnname, function() {

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
*/			
			describe("getProperty and get properties with all combination for "+ scnid +": "+ scnname, function() {

				beforeEach(function() {
					getpropertiesdata ='';
					getpropertydata ='';
					callbackstatus = false;
				});

					it("VT400-2001 | call getProperties() with sync callback and hash |" + scnid, function() {

						runs(function() {
							enumObject.setProperties({'rsmBluetoothEncryption':'true','rsmBluetoothPinCode':'12345','rsmBluetoothPinCodeType':'useStored'});
							enumObject.getProperties(['rsmBluetoothEncryption','rsmBluetoothPinCode','rsmBluetoothPinCodeType'],callbackgetproperties);
						});

						waitsFor(function(){
							return callbackstatus;
						});

						runs(function() {							
							expect(getpropertiesdata).toContain('true');
							expect(getpropertiesdata).toContain('12345');
							expect(getpropertiesdata).toContain('useStored');	
						});
					});


					it("VT400-2002 | call getProperties() with anonymous callback and hash |" + scnid, function() {

						runs(function() {    
							enumObject.setProperties({'rsmBluetoothEncryption':'true','rsmBluetoothPinCode':'12345','rsmBluetoothPinCodeType':'useStored'});
							enumObject.getProperties(['rsmBluetoothEncryption','rsmBluetoothPinCode','rsmBluetoothPinCodeType'],function(data){getpropertiesdata = JSON.stringify(data);callbackstatus = true;});
						});

						waitsFor(function(){
							return callbackstatus;
						});	

						runs(function() {								
							expect(getpropertiesdata).toContain('true');
							expect(getpropertiesdata).toContain('12345');
							expect(getpropertiesdata).toContain('useStored');	
						});							
					});

					it("VT400-2000 | call getProperties() without callback |" + scnid, function() {

							//enumObject.clearAllProperties();
							enumObject.setProperties({'rsmBluetoothEncryption':'true','rsmBluetoothPinCode':'12345','rsmBluetoothPinCodeType':'useStored'});
							var data = enumObject.getProperties(['rsmBluetoothEncryption','rsmBluetoothPinCode','rsmBluetoothPinCodeType']);
							getpropertiesdata = JSON.stringify(data);
							expect(getpropertiesdata).toContain('true');
							expect(getpropertiesdata).toContain('12345');
							expect(getpropertiesdata).toContain('useStored');								
					});


					it("VT400-2004 | call getProperty() with sync callback and property |" + scnid, function() {

						runs(function() {  									    
							enumObject.setProperty('rsmBluetoothEncryption','true');
							enumObject.getProperty("rsmBluetoothEncryption",callbackgetproperty);
						});

						waitsFor(function(){
							return callbackstatus;
						});	
						
						runs(function() {	
							expect(getpropertydata).toEqual('true');
						});										
					});

					it("VT400-2005 | call getProperty() with anonymous callback and property |" + scnid, function() {

						runs(function() {
							enumObject.setProperty('rsmBluetoothPinCode','12345');
							enumObject.getProperty('rsmBluetoothPinCode',function(data){getpropertydata = data;callbackstatus = true;});
						});

						waitsFor(function(){
							return callbackstatus;
						});	
						
						runs(function() {	
							expect(getpropertydata).toEqual('12345');
						});								
					});


					it("VT400-2006 | call getProperty() without callback |" + scnid, function() {
			
							enumObject.setProperty('rsmBluetoothEncryption','true');
							var data = enumObject.getProperty("rsmBluetoothEncryption");
							getpropertydata = data;
							expect(getpropertydata).toEqual('true');								
					});
					
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

//		}
		
	})(enumData[j],arrSCN,arrReadSCN);
	
	
});	
	