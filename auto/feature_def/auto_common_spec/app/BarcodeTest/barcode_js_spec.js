describe("Scanner SET-GET Starts", function() {
	
	describe("Scanner property SET-GET Using setProperty", function() {
		var k = -1;
		var displayflag = false;

		beforeEach(function() {
			Rho.Barcode.disable();
			displayflag = false;
			k++;
		});

		for (var i=0;i<bar_setget_scanner_property.length;i++){
										
			it(bar_setget_scanner_property[i]['testName'], function() {
		
				runs(function() {
					Rho.Barcode.enable();
					setTimeout(function() {
						displayflag = true;
		 			}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Waiting for enable", 6000);
					
				runs(function() {

					Rho.Barcode.setProperty(bar_setget_scanner_property[k]['propertyName'],bar_setget_scanner_property[k]['propertyValue']);
					var data = Rho.Barcode.getProperty(bar_setget_scanner_property[k]['propertyName']);

					expect(data).toEqual(bar_setget_scanner_property[k]['expectedResult']);
				});

			});
			
		}
	});
	
	describe("Decoder property SET-GET Using setProperty", function() {
		var k = -1;
		var displayflag = false;

		beforeEach(function() {
			Rho.Barcode.disable();
			displayflag = false;
			k++;
		});

		for (var i=0;i<bar_setget_decoder_property.length;i++){
										
			it(bar_setget_decoder_property[i]['testName'], function() {
		
				runs(function() {
					Rho.Barcode.enable();
					setTimeout(function() {
						displayflag = true;
		 			}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Waiting for enable", 6000);
					
				runs(function() {

					Rho.Barcode.setProperty(bar_setget_decoder_property[k]['propertyName'],bar_setget_decoder_property[k]['propertyValue']);
					var data = Rho.Barcode.getProperty(bar_setget_decoder_property[k]['propertyName']);

					expect(data).toEqual(bar_setget_decoder_property[k]['expectedResult']);
				});

			});
			
		}
	});

	describe("Scanner property SET-GET Using setProperties", function() {
		var k = -1;
		var displayflag = false;

		beforeEach(function() {
			Rho.Barcode.disable();
			displayflag = false;
			k++;
		});

		for (var i=0;i<bar_setget_scanner_property.length;i++){
										
			it(bar_setget_scanner_property[i]['testName'], function() {
		
				runs(function() {
					Rho.Barcode.enable();
					setTimeout(function() {
						displayflag = true;
		 			}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Waiting for enable", 6000);
					
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
				
					Rho.Barcode.setProperties(objProperty);

					var strGetProperty = '["'+bar_setget_scanner_property[k]['propertyName']+'"]';
					var objGetProperty = jQuery.parseJSON(strGetProperty);

					var data = Rho.Barcode.getProperties(objGetProperty);

					//displayResult(strGetProperty,$.toJSON(data));
					data = data[bar_setget_scanner_property[k]['propertyName']];
					expect(data).toEqual(bar_setget_scanner_property[k]['expectedResult']);
				});

			});
			
		}
	});

	describe("Decoder property SET-GET Using setProperties", function() {
		var k = -1;
		var displayflag = false;

		beforeEach(function() {
			Rho.Barcode.disable();
			displayflag = false;
			k++;
		});

		for (var i=0;i<bar_setget_decoder_property.length;i++){
										
			it(bar_setget_decoder_property[i]['testName'], function() {
		
				runs(function() {
					Rho.Barcode.enable();
					setTimeout(function() {
						displayflag = true;
		 			}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Waiting for enable", 6000);
					
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
				
					Rho.Barcode.setProperties(objProperty);

					var strGetProperty = '["'+bar_setget_decoder_property[k]['propertyName']+'"]';
					var objGetProperty = jQuery.parseJSON(strGetProperty);

					var data = Rho.Barcode.getProperties(objGetProperty);

					data = data[bar_setget_decoder_property[k]['propertyName']];
					expect(data).toEqual(bar_setget_decoder_property[k]['expectedResult']);
				});

			});
			
		}
	});

	describe("Scanner property SET-GET Using Enable", function() {
		var k = -1;
		var displayflag = false;

		beforeEach(function() {
			Rho.Barcode.disable();
			displayflag = false;
			k++;
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

					Rho.Barcode.enable(objProperty, scanCallback);

					setTimeout(function() {
						displayflag = true;
		 			}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Waiting for enable", 6000);
					
				runs(function() {

					var strGetProperty = '["'+bar_setget_scanner_property[k]['propertyName']+'"]';
					var objGetProperty = jQuery.parseJSON(strGetProperty);

					var data = Rho.Barcode.getProperties(objGetProperty);

					//displayResult(strGetProperty,$.toJSON(data));
					data = data[bar_setget_scanner_property[k]['propertyName']];
					expect(data).toEqual(bar_setget_scanner_property[k]['expectedResult']);
				});

			});
			
		}
	});

	describe("Decoder property SET-GET Using Enable", function() {
		var k = -1;
		var displayflag = false;

		beforeEach(function() {
			Rho.Barcode.disable();
			displayflag = false;
			k++;
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
					Rho.Barcode.enable(objProperty, scanCallback);
					setTimeout(function() {
						displayflag = true;
		 			}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Waiting for enable", 6000);
					
				runs(function() {

					var strGetProperty = '["'+bar_setget_decoder_property[k]['propertyName']+'"]';
					var objGetProperty = jQuery.parseJSON(strGetProperty);

					var data = Rho.Barcode.getProperties(objGetProperty);

					data = data[bar_setget_decoder_property[k]['propertyName']];
					expect(data).toEqual(bar_setget_decoder_property[k]['expectedResult']);
				});

			});
			
		}
	});


describe("Scanner property SET-GET setting Directly", function() {
		var k = -1;
		var displayflag = false;
		var objectname = "Rho.Barcode";

		beforeEach(function() {
			Rho.Barcode.disable();
			displayflag = false;
			k++;
		});

		for (var i=0;i<bar_setget_scanner_property.length;i++){
										
			it(bar_setget_scanner_property[i]['testName'], function() {
		
				runs(function() {
					Rho.Barcode.enable();
					setTimeout(function() {
						displayflag = true;
		 			}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Waiting for enable", 6000);
					
				runs(function() {

					var propertyName = bar_setget_scanner_property[k]['propertyName'];
					var propertyValue = bar_setget_scanner_property[k]['propertyValue'];

					try{
						if (propertyValue == 'true')
							eval(objectname)[propertyName] = true;
						else if (propertyValue == 'false')
							eval(objectname)[propertyName] = false;
						else if (!isNaN(propertyValue)){
							propertyValue = parseInt(propertyValue);
							eval(objectname)[propertyName] = propertyValue;	
						}
						else{
							eval(objectname)[propertyName] = propertyValue;
						}

						var data = Rho.Barcode.getProperty(bar_setget_scanner_property[k]['propertyName']);
					}
					catch(err){
						alert(err.message);
						var data = err.message;
					}

					expect(data).toEqual(bar_setget_scanner_property[k]['expectedResult']);
				});

			});
			
		}
	});

	describe("Decoder property SET-GET setting Directly", function() {
		var k = -1;
		var displayflag = false;
		var objectname = "Rho.Barcode";

		beforeEach(function() {
			Rho.Barcode.disable();
			displayflag = false;
			k++;
		});

		for (var i=0;i<bar_setget_decoder_property.length;i++){
										
			it(bar_setget_decoder_property[i]['testName'], function() {
		
				runs(function() {
					Rho.Barcode.enable();
					setTimeout(function() {
						displayflag = true;
		 			}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Waiting for enable", 6000);
					
				runs(function() {

					var propertyName = bar_setget_decoder_property[k]['propertyName'];
					var propertyValue = bar_setget_decoder_property[k]['propertyValue'];

					try{
						if (propertyValue == 'true')
							eval(objectname)[propertyName] = true;
						else if (propertyValue == 'false')
							eval(objectname)[propertyName] = false;
						else if (!isNaN(propertyValue)){
							propertyValue = parseInt(propertyValue);
							eval(objectname)[propertyName] = propertyValue;	
						}
						else{
							eval(objectname)[propertyName] = propertyValue;
						}

						var data = Rho.Barcode.getProperty(bar_setget_decoder_property[k]['propertyName']);
					}
					catch(err){
						var data = err.message;
					}

					var data = Rho.Barcode.getProperty(bar_setget_decoder_property[k]['propertyName']);

					expect(data).toEqual(bar_setget_decoder_property[k]['expectedResult']);
				});

			});
			
		}
	});

});	