
var scannerTest = function (objScanner){

	var enumObject = objScanner;
	var	enableflag = false;
	var	disableflag = false;
	var scnname = enumObject.getProperty('friendlyName');
	var scntype = enumObject.getProperty('ID');
	
	//Rho.Log.info($.toJSON(scanObject), "PATRO Begin");
describe("Scanner Test", function() {
	describe("Enable Scanner "+ scntype + scnname, function() {
		
		beforeEach(function() {
			enableflag = false;
		});
		
		it("Enable "+ scntype + scnname, function() {
			
			runs(function() {
				//Rho.Log.info($.toJSON(scanObject), "PATRO Enable");
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
	
	
	describe("Scanner property SET-GET Using setProperty "+ scntype + scnname, function() {
		var k = 0;

		for (var i=0;i<bar_setget_scanner_property.length;i++){
										
			it(bar_setget_scanner_property[i]['testName'], function() {

				    enumObject.setProperty(bar_setget_scanner_property[k]['propertyName'],bar_setget_scanner_property[k]['propertyValue']);
					var data = enumObject.getProperty(bar_setget_scanner_property[k]['propertyName']);
					expect(data).toEqual(bar_setget_scanner_property[k]['expectedResult']);
					k++;
			});
			
		}
	});
	
	describe("Decoder property SET-GET Using setProperty "+ scntype + scnname, function() {
		var k = 0;

		for (var i=0;i<bar_setget_decoder_property.length;i++){
										
			it(bar_setget_decoder_property[i]['testName'], function() {

				    enumObject.setProperty(bar_setget_decoder_property[k]['propertyName'],bar_setget_decoder_property[k]['propertyValue']);
					var data = enumObject.getProperty(bar_setget_decoder_property[k]['propertyName']);
					expect(data).toEqual(bar_setget_decoder_property[k]['expectedResult']);
					k++;
			});
			
		}
	});

	describe("Scanner property SET-GET Using setProperties "+ scntype + scnname, function() {
		var k = 0;

		for (var i=0;i<bar_setget_scanner_property.length;i++){
										
			it(bar_setget_scanner_property[i]['testName'], function() {
						
					var propertyName = bar_setget_scanner_property[k]['propertyName'];
					var propertyValue = bar_setget_scanner_property[k]['propertyValue'];

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

					var objProperty = jQuery.parseJSON(strProperty);
				
					enumObject.setProperties(objProperty);

					var strGetProperty = '["'+bar_setget_scanner_property[k]['propertyName']+'"]';
					var objGetProperty = jQuery.parseJSON(strGetProperty);

					var data = enumObject.getProperties(objGetProperty);

					//displayResult(strGetProperty,$.toJSON(data));
					data = data[bar_setget_scanner_property[k]['propertyName']];
					expect(data).toEqual(bar_setget_scanner_property[k]['expectedResult']);
					k++;
			});
			
		}
	});

	describe("Decoder property SET-GET Using setProperties "+ scntype + scnname, function() {
		var k = 0;

		for (var i=0;i<bar_setget_decoder_property.length;i++){
										
			it(bar_setget_decoder_property[i]['testName'], function() {
							
					var propertyName = bar_setget_decoder_property[k]['propertyName'];
					var propertyValue = bar_setget_decoder_property[k]['propertyValue'];

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

					var objProperty = jQuery.parseJSON(strProperty);
				
					enumObject.setProperties(objProperty);

					var strGetProperty = '["'+bar_setget_decoder_property[k]['propertyName']+'"]';
					var objGetProperty = jQuery.parseJSON(strGetProperty);

					var data = enumObject.getProperties(objGetProperty);

					data = data[bar_setget_decoder_property[k]['propertyName']];
					expect(data).toEqual(bar_setget_decoder_property[k]['expectedResult']);
					k++;
			});
			
		}
	});


	
	describe("Scanner property SET-GET setting Directly", function() {
		var k = 0;
		//var objectname = "enumObject";

		for (var i=0;i<bar_setget_scanner_property.length;i++){
										
			it(bar_setget_scanner_property[i]['testName'], function() {
						
				var propertyName = bar_setget_scanner_property[k]['propertyName'];
				var propertyValue = bar_setget_scanner_property[k]['propertyValue'];

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

					var data = enumObject.getProperty(bar_setget_scanner_property[k]['propertyName']);
				}
				catch(err){

					var data = err.message;
				}

				expect(data).toEqual(bar_setget_scanner_property[k]['expectedResult']);
				k++;

			});
			
		}
	});

	describe("Decoder property SET-GET setting Directly", function() {
		var k = 0;
		//var objectname = "enumObject";

		for (var i=0;i<bar_setget_decoder_property.length;i++){
										
			it(bar_setget_decoder_property[i]['testName'], function() {
						
				var propertyName = bar_setget_decoder_property[k]['propertyName'];
				var propertyValue = bar_setget_decoder_property[k]['propertyValue'];

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

					var data = enumObject.getProperty(bar_setget_decoder_property[k]['propertyName']);
				}
				catch(err){
					var data = err.message;
				}

				var data = enumObject.getProperty(bar_setget_decoder_property[k]['propertyName']);

				expect(data).toEqual(bar_setget_decoder_property[k]['expectedResult']);
				k++;
			});
			
		}
	});

	describe("Disable Enabled Scanner", function() {

		beforeEach(function() {
			disableflag = false;
		});

		it("Disable "+ scntype + scnname, function() {
			
			runs(function() {
				//Rho.Log.info($.toJSON(scanObject), "PATRO Disable");
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


	describe("Scanner property SET-GET Using Enable", function() {
		var k = -1;
		var flag = false;

		beforeEach(function() {
			flag = false;
			k++;
		});

		afterEach(function() {
			enumObject.disable();
		});

		for (var i=0;i<bar_setget_scanner_property.length;i++){
										
			it(bar_setget_scanner_property[i]['testName'], function() {
		
				runs(function() {

					var propertyName = bar_setget_scanner_property[k]['propertyName'];
					var propertyValue = bar_setget_scanner_property[k]['propertyValue'];

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

					var objProperty = jQuery.parseJSON(strProperty);

					enumObject.enable(objProperty, scanCallback);

					setTimeout(function() {
						flag = true;
		 			}, 8000);
				});

				waitsFor(function() {
					return flag;
				}, "Waiting for enable", 9000);
					
				runs(function() {

					var strGetProperty = '["'+bar_setget_scanner_property[k]['propertyName']+'"]';
					var objGetProperty = jQuery.parseJSON(strGetProperty);

					var data = enumObject.getProperties(objGetProperty);

					//displayResult(strGetProperty,$.toJSON(data));
					data = data[bar_setget_scanner_property[k]['propertyName']];
					expect(data).toEqual(bar_setget_scanner_property[k]['expectedResult']);
				});

			});
			
		}
	});

	describe("Decoder property SET-GET Using Enable", function() {
		var k = -1;
		var flag = false;

		beforeEach(function() {
			flag = false;
			k++;
		});

		afterEach(function() {
			enumObject.disable();
		});

		for (var i=0;i<bar_setget_decoder_property.length;i++){
										
			it(bar_setget_decoder_property[i]['testName'], function() {
		
				runs(function() {

					var propertyName = bar_setget_decoder_property[k]['propertyName'];
					var propertyValue = bar_setget_decoder_property[k]['propertyValue'];

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

					var objProperty = jQuery.parseJSON(strProperty);
					enumObject.enable(objProperty, scanCallback);
					setTimeout(function() {
						flag = true;
		 			}, 5000);
				});

				waitsFor(function() {
					return flag;
				}, "Waiting for enable", 6000);
					
				runs(function() {

					var strGetProperty = '["'+bar_setget_decoder_property[k]['propertyName']+'"]';
					var objGetProperty = jQuery.parseJSON(strGetProperty);

					var data = enumObject.getProperties(objGetProperty);

					data = data[bar_setget_decoder_property[k]['propertyName']];
					expect(data).toEqual(bar_setget_decoder_property[k]['expectedResult']);
				});

			});
			
		}
	});

});	

}