describe("Cardreader Module JS Test Starts Here", function() {

	describe("Cardreader Module- Rho.CardReader.open", function() {
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

	describe("Cardreader Module- getProperty Test Starts Here", function() {

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

	describe("Cardreader property GET Using getProperties", function() {

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

	describe("Cardreader Module- Rho.CardReader.close", function() {

		it("Rho.CardReader.close", function() {
		
			Rho.CardReader.close();
		
		});

	});

	describe("Cardreader Module- setProperty/getProperty Test Starts Here", function() {
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



	describe("Cardreader property SET/GET Using setProperties/getProperties", function() {
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

	describe("Cardreader property SET/GET Using Rho.CardReader.open()/getProperties", function() {

		afterEach(function() {
			Rho.CardReader.close();
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

					Rho.CardReader.open(objProperty);

					var strGetProperty = '["'+propertyName+'"]';
					var objGetProperty = JSON.parse(strGetProperty);

					var data = Rho.CardReader.getProperties(objGetProperty);

					expect(data[propertyName]).toEqual(card_setget_property[idx]['expectedResult']);

				});

			})(i);

		}
	});

     describe("Cardreader Module- set/get by seetting directly Test Starts Here", function() {
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

                it("VT286-0073 | Auto enter true", function() {
                    Rho.CardReader.autoEnter = true;
                    expect(Rho.CardReader.getProperty('autoEnter')).toEqual(true);
                });
                it("VT286-0074 | Auto enter false", function() {
                    Rho.CardReader.autoEnter = false;
                    expect(Rho.CardReader.getProperty('autoEnter')).toEqual(false);
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
                });*/
                it("VT286-0078 | Auto Tab true", function() {
                    Rho.CardReader.autoTab = true;
                    expect(Rho.CardReader.getProperty('autoTab')).toEqual(true);
                });
                it("VT286-0079 | Auto Tab false", function() {
                    Rho.CardReader.autoTab = false;
                    expect(Rho.CardReader.getProperty('autoTab')).toEqual(false);
                });
             /* it("VT286-0080 | Auto Tab to 0", function() {
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
                });*/
                it("VT286-0083 | pinEntry true", function() {
                    Rho.CardReader.pinEntry = true;
                    expect(Rho.CardReader.getProperty('pinEntry')).toEqual(true);
                });
                it("VT286-0084 | pinEntry false", function() {
                    Rho.CardReader.pinEntry = false;
                    expect(Rho.CardReader.getProperty('pinEntry')).toEqual(false);
                });
             /* it("VT286-0085 | pinEntry to 0", function() {
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
                });*/
                it("VT286-0088 | pinTimeout to valide 60000", function() {
                    Rho.CardReader.pinTimeout = 60000;
                    expect(Rho.CardReader.getProperty('pinTimeout')).toEqual(60000);
                });/*
                it("VT286-0089 | pinTimeout to 0", function() {
                    Rho.CardReader.pinTimeout = 0;
                    expect(Rho.CardReader.getProperty('pinTimeout')).toEqual(0);
                });
              it("VT286-0090 | pinTimeout to negative  value", function() {
                    Rho.CardReader.pinTimeout = -30000;
                    expect(Rho.CardReader.getProperty('pinTimeout')).toEqual(false);
                });*/
                it("VT286-0091 | moduleName to msr9000", function() {
                    Rho.CardReader.moduleName = "msr9000";
                    expect(Rho.CardReader.getProperty('moduleName')).toEqual('msr9000');
                });
                it("VT286-0092 | panData to 1234567891234567", function() {
                    Rho.CardReader.panData = 1234567891234567;
                    expect(Rho.CardReader.getProperty('panData')).toEqual(1234567891234567);
                });
             /* it("VT286-0093 | panData to invalid", function() {
                    Rho.CardReader.panData = 12345;
                    expect(Rho.CardReader.getProperty('panData')).toEqual(12345);
                });*/
                it("Rho.CardReader.close", function() {
                                Rho.CardReader.close();
                });
    });

});