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


			describe("Barcode property set using take() for "+ scntype +": "+ scnname, function() {

				var flag = false;

				beforeEach(function() {
					flag = false;
				});

				afterEach(function() {
					//enumObject.disable();
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

								enumObject.take(objProperty, scanCallback);

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

		})(enumData[j],arrSCN);

    }

});

