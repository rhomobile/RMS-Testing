describe("Scanner Test", function() {
	var	enableflag = false;
	var	disableflag = false;
    var enumData = Rho.Barcode.enumerate();

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

							var objProperty = jQuery.parseJSON(strProperty);
						
							enumObject.setProperties(objProperty);

							var strGetProperty = '["'+arrScanner[idx]['propertyName']+'"]';
							var objGetProperty = jQuery.parseJSON(strGetProperty);

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

			describe("Disable Scanner "+ scntype +": "+ scnname, function() {

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

								var strGetProperty = '["'+arrScanner[idx]['propertyName']+'"]';
								var objGetProperty = jQuery.parseJSON(strGetProperty);

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