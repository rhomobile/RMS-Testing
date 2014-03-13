describe("Cardreader JS API", function() {
	
	if(Rho.System.platform == "ANDROID" && Rho.System.oemInfo == 'TC55')
	{
		describe("Rho.CardReader not available on this device", function() {
			it("does nothing", function() {
				expect(null).toBe(null);
			});
		});
		return;
	}
	
	describe("Rho.CardReader.open", function() {
		var flag = false;

		it("Rho.CardReader.open", function() {

			runs(function() {
				Rho.CardReader.open();
				setTimeout(function() {
					flag = true;
	 			}, 3000);
			});

			waitsFor(function() {
				return flag;
			}, "Waiting for enable", 4000);

		});

	});

	describe("getProperty", function() {

		for (var i=0;i<card_get_property.length;i++){
			(function(idx){
				it(card_get_property[idx]['testName'], function() {

					var data = Rho.CardReader.getProperty(card_get_property[idx]['propertyName']);
					displayResult(card_get_property[idx]['testName'],data);
					expect(data).toEqual(card_get_property[idx]['expectedResult']);

				});
			})(i);
		}
	});

	describe("getProperties", function() {

		for (var i=0;i<card_get_property.length;i++){
			(function(idx){
				it(card_get_property[idx]['testName'], function() {

					var propertyName = card_get_property[idx]['propertyName'];

					var strGetProperty = '["'+propertyName+'"]';
					var objGetProperty = JSON.parse(strGetProperty);

					var data = Rho.CardReader.getProperties(objGetProperty);

					expect(data[propertyName]).toEqual(card_get_property[idx]['expectedResult']);

				});
			})(i);
		}
	});

	describe("getProperty using instance", function() {
	var obj=Rho.CardReader.getDefault();
		for (var i=0;i<card_get_property_instance.length;i++){
			(function(idx){
				it(card_get_property_instance[idx]['testName'], function() {

					var data = obj.getProperty(card_get_property_instance[idx]['propertyName']);
					displayResult(card_get_property_instance[idx]['testName'],data);
					expect(data).toEqual(card_get_property_instance[idx]['expectedResult']);

				});
			})(i);
		}
	});

	describe("getproperties using instance", function() {
		var flag = false;

		it("Rho.CardReader.open", function() {
						
			runs(function() {
				Rho.CardReader.open();
				setTimeout(function() {
					flag = true;
				}, 5000);
			});

			waitsFor(function() {
			   return flag;
			}, "Waiting for enable", 6000);
																						
		});

		it("VT286-0213 | get Auto enter default value as true", function() {
			var obj=Rho.CardReader.getDefault();
			  myvar = obj.getProperties(['autoEnter']);
			  expect(myvar["autoEnter"]).toEqual("false");
		});

		it("VT286-0214 | get Auto Tab default value as true", function() {
			var obj=Rho.CardReader.getDefault();
			myvar = obj.getProperties(['autoTab']);
			 expect(myvar["autoTab"]).toEqual("false");
		});

		if(isWindowsMobilePlatform() && Rho.CardReader.moduleName == "dcr7000")
		{
			it("VT286-0215 | get pinentry default value as false", function() {
				var obj=Rho.CardReader.getDefault();
				myvar = obj.getProperties(['pinEntry']);
			 	expect(myvar["pinEntry"]).toEqual("false");
			});

			it("VT286-0216 | get pintimout default value as 30000", function() {
				var obj=Rho.CardReader.getDefault();
				myvar = obj.getProperties(['pinTimeout']);
			 	expect(myvar["pinTimeout"]).toEqual("30000");
			});
			it("VT286-0217 | get patndata default value as empty", function() {
				var obj=Rho.CardReader.getDefault();
				myvar = obj.getProperties(['panData']);
			 	expect(myvar["panData"]).toEqual("");
			});
		}
    });

/*	describe("getProperties using instance", function() {
	var obj=Rho.CardReader.getDefault();
		for (var i=0;i<card_get_property_instance.length;i++){
			(function(idx){
				it(card_get_property_instance[idx]['testName'], function() {

					var data = obj.getProperties(card_get_property_instance[idx]['propertyName']);
					displayResult(card_get_property_instance[idx]['testName'],data);
					expect(data).toEqual(card_get_property_instance[idx]['expectedResult']);

				});
			})(i);
		}
	});*/

	describe("Rho.CardReader.close", function() {

		it("Rho.CardReader.close", function() {

			Rho.CardReader.close();

		});

	});

	describe("setProperty/getProperty", function() {
		var flag = false;

		it("Rho.CardReader.open", function() {
			
			waits(2000);

			runs(function() {
				Rho.CardReader.open();
				setTimeout(function() {
					flag = true;
	 			}, 3000);
			});

			waitsFor(function() {
				return flag;
			}, "Waiting for enable", 4000);

		});

		for (var i=0;i<card_setget_property.length;i++){

			(function(idx){

				it(card_setget_property[idx]['testName'], function() {

					Rho.CardReader.setProperty(card_setget_property[idx]['propertyName'],card_setget_property[idx]['propertyValue'])
					var data = Rho.CardReader.getProperty(card_setget_property[idx]['propertyName']);
					expect(data).toEqual(card_setget_property[idx]['expectedResult']);

				});

			})(i);

		}

		it("Rho.CardReader.close", function() {
			Rho.CardReader.close();
		});
	});

	describe("setProperties/getProperties", function() {
		var flag = false;

		it("Rho.CardReader.open", function() {
			
			waits(2000);

			runs(function() {
				Rho.CardReader.open();
				setTimeout(function() {
					flag = true;
	 			}, 3000);
			});

			waitsFor(function() {
				return flag;
			}, "Waiting for enable", 4000);

		});

		for (var i=0;i<card_setget_property.length;i++){

			(function(idx){

				it(card_setget_property[idx]['testName'], function() {

					var propertyName = card_setget_property[idx]['propertyName'];
					var propertyValue = card_setget_property[idx]['propertyValue'];

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

					Rho.CardReader.setProperties(objProperty);

					var strGetProperty = '["'+propertyName+'"]';
					var objGetProperty = JSON.parse(strGetProperty);

					var data = Rho.CardReader.getProperties(objGetProperty);

					expect(data[propertyName]).toEqual(card_setget_property[idx]['expectedResult']);

				});

			})(i);
		}

		it("Rho.CardReader.close", function() {
			Rho.CardReader.close();
		});

	});

	describe("setProperty/getProperty using instance", function() {
		var flag = false;
		var obj=Rho.CardReader.getDefault();
		it("obj.open", function() {
			
			waits(2000);

			runs(function() {
				obj.open();
				setTimeout(function() {
					flag = true;
	 			}, 3000);
			});

			waitsFor(function() {
				return flag;
			}, "Waiting for enable", 4000);

		});

		for (var i=0;i<card_setget_property_instance.length;i++){

			(function(idx){

				it(card_setget_property_instance[idx]['testName'], function() {

					obj.setProperty(card_setget_property_instance[idx]['propertyName'],card_setget_property_instance[idx]['propertyValue'])
					var data = obj.getProperty(card_setget_property_instance[idx]['propertyName']);
					expect(data).toEqual(card_setget_property_instance[idx]['expectedResult']);

				});

			})(i);

		}

		it("obj.close", function() {
			obj.close();
		});
	});

	describe("setProperties/getProperties using instance", function() {
		var flag = false;
		var obj=Rho.CardReader.getDefault();
		it("obj.open", function() {
			
			waits(2000);

			runs(function() {
				obj.open();
				setTimeout(function() {
					flag = true;
	 			}, 3000);
			});

			waitsFor(function() {
				return flag;
			}, "Waiting for enable", 4000);

		});

		for (var i=0;i<card_setget_property_instance.length;i++){

			(function(idx){

				it(card_setget_property_instance[idx]['testName'], function() {

					var propertyName = card_setget_property_instance[idx]['propertyName'];
					var propertyValue = card_setget_property_instance[idx]['propertyValue'];

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

					obj.setProperties(objProperty);

					var strGetProperty = '["'+propertyName+'"]';
					var objGetProperty = JSON.parse(strGetProperty);

					var data = obj.getProperties(objGetProperty);

					expect(data[propertyName]).toEqual(card_setget_property_instance[idx]['expectedResult']);

				});

			})(i);
		}

		it("obj.close", function() {
			obj.close();
		});

	});

//	describe("Rho.CardReader.open()/getProperties", function() {
//
//		afterEach(function() {
//			Rho.CardReader.close();
//		});
//
//		for (var i=0;i<card_setget_property.length;i++){
//
//			(function(idx){						
//				it(card_setget_property[idx]['testName'], function() {
//
//					var propertyName = card_setget_property[idx]['propertyName'];
//					var propertyValue = card_setget_property[idx]['propertyValue'];
//
//					if (propertyValue == 'true')
//						var strProperty = '{"'+propertyName+'" :'+true+'}';
//					else if (propertyValue == 'false')
//						var strProperty = '{"'+propertyName+'" :'+false+'}';
//					else if (!isNaN(propertyValue)){
//						propertyValue = parseInt(propertyValue);
//						var strProperty = '{"'+propertyName+'" :'+propertyValue+'}';
//					}
//					else{
//						var strProperty = '{"'+propertyName+'" : "'+propertyValue+'"}'
//					}
//
//					var objProperty = JSON.parse(strProperty);
//
//					Rho.CardReader.open(objProperty);
//
//					var strGetProperty = '["'+propertyName+'"]';
//					var objGetProperty = JSON.parse(strGetProperty);
//
//					var data = Rho.CardReader.getProperties(objGetProperty);
//
//					expect(data[propertyName]).toEqual(card_setget_property[idx]['expectedResult']);				});
//
//			})(i);
//
//		}
//	});

    describe("directly accessing properties", function() {
		var flag = false;

		it("Rho.CardReader.open", function() {
			
			waits(2000);
						
			runs(function() {
				Rho.CardReader.open();
				setTimeout(function() {
					flag = true;
				}, 5000);
			});

			waitsFor(function() {
			   return flag;
			}, "Waiting for enable", 6000);
																						
		});

		it("VT286-0073 | Auto enter true", function() {
			Rho.CardReader.autoEnter = true;
			expect(Rho.CardReader.getProperty('autoEnter')).toEqual('true');
		});
		it("VT286-0074 | Auto enter false", function() {
			Rho.CardReader.autoEnter = false;
			expect(Rho.CardReader.getProperty('autoEnter')).toEqual('false');
		});
		it("VT286-0078 | Auto Tab true", function() {
			Rho.CardReader.autoTab = true;
			expect(Rho.CardReader.getProperty('autoTab')).toEqual('true');
		});
		it("VT286-0079 | Auto Tab false", function() {
			Rho.CardReader.autoTab = false;
			expect(Rho.CardReader.getProperty('autoTab')).toEqual('false');
		});
		if(isWindowsMobilePlatform() && Rho.CardReader.moduleName == "dcr7000")
		{
			it("VT286-0083 | pinEntry true", function() {
				Rho.CardReader.pinEntry = true;
				expect(Rho.CardReader.getProperty('pinEntry')).toEqual('true');
			});
			it("VT286-0084 | pinEntry false", function() {
				Rho.CardReader.pinEntry = false;
				expect(Rho.CardReader.getProperty('pinEntry')).toEqual('false');
			});
			it("VT286-0088 | pinTimeout to valid 60000", function() {
				Rho.CardReader.pinTimeout = 60000;
				expect(Rho.CardReader.getProperty('pinTimeout')).toEqual('60000');
			});
			it("VT286-0092 | panData to 1234567891234567", function() {
				Rho.CardReader.panData = 1234567891234567;
				expect(Rho.CardReader.getProperty('panData')).toEqual('1234567891234567');
			});
		}
		it("Rho.CardReader.close", function() {
			Rho.CardReader.close();
		});
	});	
	 /* it("VT286-0075 | Auto enter to 0", function() {
			Rho.CardReader.autoEnter = 0;
			expect(Rho.CardReader.getProperty('autoEnter')).toEqual(false);
		});
		it("VT286-0076 | Auto enter to 1", function() {
			Rho.CardReader.autoEnter = 1;
			expect(Rho.CardReader.getProperty('autoEnter')).toEqual(false);
		});
		it("VT286-0077 | Auto enter to invalid", function() {
			Rho.CardReader.autoEnter = invalid;
			expect(Rho.CardReader.getProperty('autoEnter')).toEqual(false);
		});
		it("VT286-0080 | Auto Tab to 0", function() {
			Rho.CardReader.autoTab = 0;
			expect(Rho.CardReader.getProperty('autoTab')).toEqual(false);
		});
		it("VT286-0081 | Auto Tab to 1", function() {
			Rho.CardReader.autoTab = 1;
			expect(Rho.CardReader.getProperty('autoTab')).toEqual(false);
		});
		it("VT286-0082 | Auto Tab to invalid", function() {
			Rho.CardReader.autoTab = invalid;
			expect(Rho.CardReader.getProperty('autoTab')).toEqual(false);
		});
		it("VT286-0085 | pinEntry to 0", function() {
			Rho.CardReader.pinEntry = 0;
			expect(Rho.CardReader.getProperty('pinEntry')).toEqual(false);
		});
		it("VT286-0086 | pinEntry to 1", function() {
			Rho.CardReader.pinEntry = 1;
			expect(Rho.CardReader.getProperty('pinEntry')).toEqual(false);
		});
		it("VT286-0087 | pinEntry to invalid", function() {
			Rho.CardReader.pinEntry = invalid;
			expect(Rho.CardReader.getProperty('pinEntry')).toEqual(false);
		});
		it("VT286-0089 | pinTimeout to 0", function() {
			Rho.CardReader.pinTimeout = 0;
			expect(Rho.CardReader.getProperty('pinTimeout')).toEqual(0);
		});
		it("VT286-0090 | pinTimeout to negative  value", function() {
			Rho.CardReader.pinTimeout = -30000;
			expect(Rho.CardReader.getProperty('pinTimeout')).toEqual(false);
		});
		it("VT286-0091 | moduleName to msr9000", function() {
			Rho.CardReader.moduleName = "msr9000";
			expect(Rho.CardReader.getProperty('moduleName')).toEqual('msr9000');
		});
		it("VT286-0093 | panData to invalid", function() {
			Rho.CardReader.panData = 12345;
			expect(Rho.CardReader.getProperty('panData')).toEqual(12345);
		});*/


});
