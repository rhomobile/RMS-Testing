describe("Cardreader JS API", function() {
	
	if(EB.System.platform == "ANDROID" && EB.System.oemInfo == 'TC55')
	{
		describe("EB.CardReader not available on this device", function() {
			it("does nothing", function() {
				expect(null).toBe(null);
			});
		});
		return;
	}
	
	describe("EB.CardReader.open", function() {
		var flag = false;

		it("EB.CardReader.open", function() {

			runs(function() {
				EB.CardReader.open();
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

					var data = EB.CardReader.getProperty(card_get_property[idx]['propertyName']);
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

					var data = EB.CardReader.getProperties(objGetProperty);

					expect(data[propertyName]).toEqual(card_get_property[idx]['expectedResult']);

				});
			})(i);
		}
	});

	describe("getProperty using instance", function() {
	var obj=EB.CardReader.getDefault();
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

		it("EB.CardReader.open", function() {
						
			runs(function() {
				EB.CardReader.open();
				setTimeout(function() {
					flag = true;
				}, 5000);
			});

			waitsFor(function() {
			   return flag;
			}, "Waiting for enable", 6000);
																						
		});

		it("VT286-0213 | get Auto enter default value as true", function() {
			var obj=EB.CardReader.getDefault();
			  myvar = obj.getProperties(['autoEnter']);
			  expect(myvar["autoEnter"]).toEqual("false");
		});

		it("VT286-0214 | get Auto Tab default value as true", function() {
			var obj=EB.CardReader.getDefault();
			myvar = obj.getProperties(['autoTab']);
			 expect(myvar["autoTab"]).toEqual("false");
		});

		if(isWindowsMobilePlatform() && EB.CardReader.moduleName == "dcr7000")
		{
			it("VT286-0215 | get pinentry default value as false", function() {
				var obj=EB.CardReader.getDefault();
				myvar = obj.getProperties(['pinEntry']);
			 	expect(myvar["pinEntry"]).toEqual("false");
			});

			it("VT286-0216 | get pintimout default value as 30000", function() {
				var obj=EB.CardReader.getDefault();
				myvar = obj.getProperties(['pinTimeout']);
			 	expect(myvar["pinTimeout"]).toEqual("30000");
			});
			it("VT286-0217 | get patndata default value as empty", function() {
				var obj=EB.CardReader.getDefault();
				myvar = obj.getProperties(['panData']);
			 	expect(myvar["panData"]).toEqual("");
			});
		}
    });

/*	describe("getProperties using instance", function() {
	var obj=EB.CardReader.getDefault();
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

	describe("EB.CardReader.close", function() {

		it("EB.CardReader.close", function() {

			EB.CardReader.close();

		});

	});

	describe("setProperty/getProperty", function() {
		var flag = false;

		it("EB.CardReader.open", function() {
			
			waits(2000);

			runs(function() {
				EB.CardReader.open();
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

					EB.CardReader.setProperty(card_setget_property[idx]['propertyName'],card_setget_property[idx]['propertyValue'])
					var data = EB.CardReader.getProperty(card_setget_property[idx]['propertyName']);
					expect(data).toEqual(card_setget_property[idx]['expectedResult']);

				});

			})(i);

		}

		it("EB.CardReader.close", function() {
			EB.CardReader.close();
		});
	});

	describe("setProperties/getProperties", function() {
		var flag = false;

		it("EB.CardReader.open", function() {
			
			waits(2000);

			runs(function() {
				EB.CardReader.open();
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

					EB.CardReader.setProperties(objProperty);

					var strGetProperty = '["'+propertyName+'"]';
					var objGetProperty = JSON.parse(strGetProperty);

					var data = EB.CardReader.getProperties(objGetProperty);

					expect(data[propertyName]).toEqual(card_setget_property[idx]['expectedResult']);

				});

			})(i);
		}

		it("EB.CardReader.close", function() {
			EB.CardReader.close();
		});

	});

	describe("setProperty/getProperty using instance", function() {
		var flag = false;
		var obj=EB.CardReader.getDefault();
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
		var obj=EB.CardReader.getDefault();
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

//	describe("EB.CardReader.open()/getProperties", function() {
//
//		afterEach(function() {
//			EB.CardReader.close();
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
//					EB.CardReader.open(objProperty);
//
//					var strGetProperty = '["'+propertyName+'"]';
//					var objGetProperty = JSON.parse(strGetProperty);
//
//					var data = EB.CardReader.getProperties(objGetProperty);
//
//					expect(data[propertyName]).toEqual(card_setget_property[idx]['expectedResult']);				});
//
//			})(i);
//
//		}
//	});

    describe("directly accessing properties", function() {
		var flag = false;

		it("EB.CardReader.open", function() {
			
			waits(2000);
						
			runs(function() {
				EB.CardReader.open();
				setTimeout(function() {
					flag = true;
				}, 5000);
			});

			waitsFor(function() {
			   return flag;
			}, "Waiting for enable", 6000);
																						
		});

		it("VT286-0073 | Auto enter true", function() {
			EB.CardReader.autoEnter = true;
			expect(EB.CardReader.getProperty('autoEnter')).toEqual('true');
		});
		it("VT286-0074 | Auto enter false", function() {
			EB.CardReader.autoEnter = false;
			expect(EB.CardReader.getProperty('autoEnter')).toEqual('false');
		});
		it("VT286-0078 | Auto Tab true", function() {
			EB.CardReader.autoTab = true;
			expect(EB.CardReader.getProperty('autoTab')).toEqual('true');
		});
		it("VT286-0079 | Auto Tab false", function() {
			EB.CardReader.autoTab = false;
			expect(EB.CardReader.getProperty('autoTab')).toEqual('false');
		});
		if(isWindowsMobilePlatform() && EB.CardReader.moduleName == "dcr7000")
		{
			it("VT286-0083 | pinEntry true", function() {
				EB.CardReader.pinEntry = true;
				expect(EB.CardReader.getProperty('pinEntry')).toEqual('true');
			});
			it("VT286-0084 | pinEntry false", function() {
				EB.CardReader.pinEntry = false;
				expect(EB.CardReader.getProperty('pinEntry')).toEqual('false');
			});
			it("VT286-0088 | pinTimeout to valid 60000", function() {
				EB.CardReader.pinTimeout = 60000;
				expect(EB.CardReader.getProperty('pinTimeout')).toEqual('60000');
			});
			it("VT286-0092 | panData to 1234567891234567", function() {
				EB.CardReader.panData = 1234567891234567;
				expect(EB.CardReader.getProperty('panData')).toEqual('1234567891234567');
			});
		}
		it("EB.CardReader.close", function() {
			EB.CardReader.close();
		});
	});	
	 /* it("VT286-0075 | Auto enter to 0", function() {
			EB.CardReader.autoEnter = 0;
			expect(EB.CardReader.getProperty('autoEnter')).toEqual(false);
		});
		it("VT286-0076 | Auto enter to 1", function() {
			EB.CardReader.autoEnter = 1;
			expect(EB.CardReader.getProperty('autoEnter')).toEqual(false);
		});
		it("VT286-0077 | Auto enter to invalid", function() {
			EB.CardReader.autoEnter = invalid;
			expect(EB.CardReader.getProperty('autoEnter')).toEqual(false);
		});
		it("VT286-0080 | Auto Tab to 0", function() {
			EB.CardReader.autoTab = 0;
			expect(EB.CardReader.getProperty('autoTab')).toEqual(false);
		});
		it("VT286-0081 | Auto Tab to 1", function() {
			EB.CardReader.autoTab = 1;
			expect(EB.CardReader.getProperty('autoTab')).toEqual(false);
		});
		it("VT286-0082 | Auto Tab to invalid", function() {
			EB.CardReader.autoTab = invalid;
			expect(EB.CardReader.getProperty('autoTab')).toEqual(false);
		});
		it("VT286-0085 | pinEntry to 0", function() {
			EB.CardReader.pinEntry = 0;
			expect(EB.CardReader.getProperty('pinEntry')).toEqual(false);
		});
		it("VT286-0086 | pinEntry to 1", function() {
			EB.CardReader.pinEntry = 1;
			expect(EB.CardReader.getProperty('pinEntry')).toEqual(false);
		});
		it("VT286-0087 | pinEntry to invalid", function() {
			EB.CardReader.pinEntry = invalid;
			expect(EB.CardReader.getProperty('pinEntry')).toEqual(false);
		});
		it("VT286-0089 | pinTimeout to 0", function() {
			EB.CardReader.pinTimeout = 0;
			expect(EB.CardReader.getProperty('pinTimeout')).toEqual(0);
		});
		it("VT286-0090 | pinTimeout to negative  value", function() {
			EB.CardReader.pinTimeout = -30000;
			expect(EB.CardReader.getProperty('pinTimeout')).toEqual(false);
		});
		it("VT286-0091 | moduleName to msr9000", function() {
			EB.CardReader.moduleName = "msr9000";
			expect(EB.CardReader.getProperty('moduleName')).toEqual('msr9000');
		});
		it("VT286-0093 | panData to invalid", function() {
			EB.CardReader.panData = 12345;
			expect(EB.CardReader.getProperty('panData')).toEqual(12345);
		});*/


});
