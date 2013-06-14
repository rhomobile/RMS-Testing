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
});