describe("Signature JS API Test", function() {
	var getpropertiesdata ='';
	var getpropertydata ='';
    var callbackstatus = false;

    var callbackgetproperties = function (data){
		getpropertiesdata = JSON.stringify(data);
		callbackstatus = true;
	}

	var callbackgetproperty = function (data){
		getpropertydata = data;
		callbackstatus = true;
	}

		var arrSIGshow = getApplicablePropertiesShow();
		var arrSIGtake = getApplicablePropertiesFullScreen();

		(function(arrSignatureshow,arrSignaturetake){

            /* vmusulainen - I have not found any expect at each test */
			describe("set/get Property and set/get properties with all combination", function() {

				beforeEach(function() {
					getpropertiesdata ='';
					getpropertydata ='';
					callbackstatus = false;
					flag = false;
				});

				it("VT299-2010 | call takeFullScreen() to check default values of all property |", function() {

					runs(function() {
					    EB.Signature.takeFullScreen({},sigCallback);

						expect(EB.Signature.bgColor).toEqual('#FFFFFFFF');
						expect(EB.Signature.compressionFormat).toEqual('png');						
						expect(EB.Signature.fileName).toEqual('signature');
						expect(EB.Signature.outputFormat).toEqual('image');
						expect(EB.Signature.penColor).toEqual('#FF000000');
						expect(EB.Signature.penWidth).toEqual(3);

						setTimeout(function()
						{
							flag = true;
						}, HIDE_TIMEOUT_VALUE);
					});
					
					waitsFor(function() {
						return flag;
					}, "Waiting to hide", 2000);
					
					runs(function() {
						EB.Signature.hide();
						flag = false;
						setTimeout(function()
						{
							flag = true;
						}, HIDE_TIMEOUT_VALUE);
					});
					
					waitsFor(function() {
						return flag;
					}, "Waiting to hide", 2000);
				});

				it("VT299-2011 | call show() to check default values of all property |", function() {

					runs(function() {
					    EB.Signature.show();

						expect(EB.Signature.bgColor).toEqual('#FFFFFFFF');
						expect(EB.Signature.compressionFormat).toEqual('png');						
						expect(EB.Signature.fileName).toEqual('signature');
						expect(EB.Signature.outputFormat).toEqual('image');
						expect(EB.Signature.penColor).toEqual('#FF000000');
						expect(EB.Signature.penWidth).toEqual(3);
						expect(EB.Signature.border).toEqual(true);
						expect(EB.Signature.height).toEqual(150);
						expect(EB.Signature.left).toEqual(15);	
						expect(EB.Signature.top).toEqual(60);
						expect(EB.Signature.width).toEqual(200);
						
						EB.Signature.hide();
					});
				});				

//propertybag is not supported in signature
				xit("VT299-2001 | call getProperties() with sync callback and hash |", function() {

					runs(function() {
					    EB.Signature.setProperties({'bgColor':'#FF0000','border':'true','penWidth':'2'});
						EB.Signature.getProperties(['bgColor','border','penWidth'],callbackgetproperties);
					});

					waitsFor(function(){
						return callbackstatus;
					});

					runs(function() {							
						expect(getpropertiesdata).toContain('#FF0000');
						expect(getpropertiesdata).toContain('true');
						expect(getpropertiesdata).toContain('2');
					});
				});

				xit("VT299-2002 | call getProperties() with anonymous callback and hash |", function() {

					runs(function() {    
					    EB.Signature.setProperties({'bgColor':'#FFFF00','border':false,'penWidth':1});
						EB.Signature.getProperties(['bgColor','border','penWidth'],function(data){getpropertiesdata = JSON.stringify(data);callbackstatus = true;});
					});

					waitsFor(function(){
						return callbackstatus;
					});	

					runs(function() {								
						expect(getpropertiesdata).toContain('#FFFF00');
						expect(getpropertiesdata).toContain(false);
						expect(getpropertiesdata).toContain(1);
					});							
				});

				xit("VT299-2000 | call getProperties() without callback |", function() {

					    //EB.Signature.clearAllProperties();
					    EB.Signature.setProperties({'bgColor':'#FFFFFF','border':true,'penWidth':3});
						var data = EB.Signature.getProperties(['compressionFormat','desiredHeight','outputFormat']);
						getpropertiesdata = JSON.stringify(data);
						expect(getpropertiesdata).toContain('#FFFFFF');
						expect(getpropertiesdata).toContain(true);
						expect(getpropertiesdata).toContain(3);
				});

				xit("VT299-2004 | call getProperty() with sync callback and property |", function() {

					runs(function() {  									    
					    EB.Signature.setProperty('compressionFormat','jpg');
						EB.Signature.getProperty("compressionFormat",callbackgetproperty);
					});

					waitsFor(function(){
						return callbackstatus;
					});	
					
					runs(function() {	
						expect(getpropertydata).toEqual('jpg');
					});										
				});

				xit("VT299-2005 | call getProperty() with anonymous callback and property |", function() {

					runs(function() {
					    EB.Signature.setProperty('penWidth','5');
						EB.Signature.getProperty('penWidth',function(data){getpropertydata = data;callbackstatus = true;});
					});

					waitsFor(function(){
						return callbackstatus;
					});	
					
					runs(function() {	
						expect(getpropertydata).toEqual('5');
					});								
				});

				xit("VT299-2003 | call getProperty() without callback |", function() {
	    
					    EB.Signature.setProperty('penWidth',4);
						var data = EB.Signature.getProperty("penWidth");
						getpropertydata = data;
						expect(getpropertydata).toEqual(4);
				});

				it("VT299-2006 | call show() with all string |", function() {

					runs(function() {
					    EB.Signature.show({'bgColor':'#FF0000','border':'true','penWidth':'2'});
							
						expect(EB.Signature.bgColor).toEqual('#FF0000');
						expect(EB.Signature.border).toEqual(true);
						expect(EB.Signature.penWidth).toEqual(2);
						EB.Signature.hide();
					});
				});

				it("VT299-2007 | call takeFullScreen() with all string |", function() {

					runs(function() {
					    EB.Signature.takeFullScreen({'bgColor':'#FF0000','outputFormat':'image','penWidth':'1'},sigCallback);
							
						expect(EB.Signature.bgColor).toEqual('#FF0000');
						expect(EB.Signature.border).toEqual(true);
						expect(EB.Signature.penWidth).toEqual(1);
						setTimeout(function()
						{
							flag = true;
						}, HIDE_TIMEOUT_VALUE);
					});
					
					waitsFor(function() {
						return flag;
					}, "Waiting to hide", 2000);
					
					runs(function() {
						EB.Signature.hide();
						flag = false;
						setTimeout(function()
						{
							flag = true;
						}, HIDE_TIMEOUT_VALUE);
					});
					
					waitsFor(function() {
						return flag;
					}, "Waiting to hide", 2000);
				});

				it("VT299-2008| call show() with required data types |", function() {

					runs(function() {
					    EB.Signature.show({'bgColor':'#FF0000','border':false,'penWidth':1});
							
						expect(EB.Signature.bgColor).toEqual('#FF0000');
						expect(EB.Signature.border).toEqual(false);
						expect(EB.Signature.penWidth).toEqual(1);
						EB.Signature.hide();
					});
				});

				it("VT299-2009 | call takeFullScreen() with required data types |", function() {

					runs(function() {
					    EB.Signature.takeFullScreen({'bgColor':'#FF0000','outputFormat':'image','penWidth':3},sigCallback);

						
						expect(EB.Signature.bgColor).toEqual('#FF0000');
						expect(EB.Signature.outputFormat).toEqual('image');
						expect(EB.Signature.penWidth).toEqual(3);
						setTimeout(function()
						{
							flag = true;
						}, HIDE_TIMEOUT_VALUE);
					});
						
					waitsFor(function() {
						return flag;
					}, "Waiting to hide", 2000);
					
					runs(function() {
						EB.Signature.hide();
						flag = false;
						setTimeout(function()
						{
							flag = true;
						}, HIDE_TIMEOUT_VALUE);
					});
					
					waitsFor(function() {
						return flag;
					}, "Waiting to hide", 2000);
				});
			});
/*
//property bag is not supported in Signature
			describe("Signature property using set/getProperty", function() {

				for (var i=0;i<arrSignatureshow.length;i++){

					(function(idx){
						it(arrSignatureshow[idx]['testName'], function() {

							    EB.Signature.setProperty(arrSignatureshow[idx]['propertyName'],arrSignatureshow[idx]['propertyValue']);
								var data = EB.Signature.getProperty(arrSignatureshow[idx]['propertyName']);
								expect(data).toEqual(arrSignatureshow[idx]['expectedResult']);
						});

					})(i);
				}
			});

			describe("Signature property Using set/getProperties ", function() {

				for (var i=0;i<arrSignatureshow.length;i++){

					(function(idx){
						it(arrSignatureshow[idx]['testName'], function() {
						
							var propertyName = arrSignatureshow[idx]['propertyName'];
							var propertyValue = arrSignatureshow[idx]['propertyValue'];

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
						
							EB.Signature.setProperties(objProperty);

							var strGetProperty = '["'+arrSignatureshow[idx]['propertyName']+'"]';
							var objGetProperty = JSON.parse(strGetProperty);

							var data = EB.Signature.getProperties(objGetProperty);

			
							data = data[arrSignatureshow[idx]['propertyName']];
							expect(data).toEqual(arrSignatureshow[idx]['expectedResult']);
	
						});
					})(i);
				}
			});
*/
			describe("Signature property setting Directly", function() {

				for (var i=0;i<arrSignatureshow.length;i++){

					(function(idx){
						it(arrSignatureshow[idx]['testName'], function() {
							
							var propertyName = arrSignatureshow[idx]['propertyName'];
							var propertyValue = arrSignatureshow[idx]['propertyValue'];

							try{
								if (propertyValue == 'true')
									eval(EB.Signature)[propertyName] = true;
								else if (propertyValue == 'false')
									eval(EB.Signature)[propertyName] = false;
								else if (!isNaN(propertyValue)){
									propertyValue = parseInt(propertyValue);
									eval(EB.Signature)[propertyName] = propertyValue;	
								}
								else{
									eval(EB.Signature)[propertyName] = propertyValue;
								}

								var data = eval(EB.Signature)[arrSignatureshow[idx]['propertyName']];
							}
							catch(err){

								var data = err.message;
							}

							expect(data).toEqual(arrSignatureshow[idx]['expectedResult']);

						});
					})(i);
				}
			});

            describe("Signature property set using show()", function () {

                var flag = false;

                beforeEach(function () {
                    flag = false;
                });

                afterEach(function () {
                    EB.Signature.hide();
                });

                for (var i = 0; i < arrSignatureshow.length; i++) {

                    (function (idx) {

                        it(arrSignatureshow[idx]['testName'], function () {

                            runs(function () {

                                var propertyName = arrSignatureshow[idx]['propertyName'];
                                var propertyValue = arrSignatureshow[idx]['propertyValue'];

                                if (propertyValue == 'true')
                                    var strProperty = '{"' + propertyName + '" :' + true + '}';
                                else if (propertyValue == 'false')
                                    var strProperty = '{"' + propertyName + '" :' + false + '}';
                                else if (!isNaN(propertyValue)) {
                                    propertyValue = parseInt(propertyValue);
                                    var strProperty = '{"' + propertyName + '" :' + propertyValue + '}';
                                }
                                else {
                                    var strProperty = '{"' + propertyName + '" : "' + propertyValue + '"}'
                                }

                                var objProperty = JSON.parse(strProperty);

                                EB.Signature.show(objProperty);

                                setTimeout(function () {
                                    flag = true;
                                }, ENABLE_TIMEOUT_VALUE);
                            });

                            waitsFor(function () {
                                return flag;
                            }, "Waiting for enable", 2000);

                            runs(function () {

                                var data = eval(EB.Signature)[arrSignatureshow[idx]['propertyName']];
                                expect(data).toEqual(arrSignatureshow[idx]['expectedResult']);
                            });

                        });
                    })(i);

                }
            });

			describe("Signature property set using takeFullScreen()", function() {

				var flag = false;

				beforeEach(function() {
					flag = false;
				});

				afterEach(function() {
					EB.Signature.hide();
				});

				for (var i=0;i<arrSignaturetake.length;i++){

					(function(idx){

						it(arrSignaturetake[idx]['testName'], function() {
							runs(function() {
								setTimeout(function()
								{
									flag = true;
								}, HIDE_TIMEOUT_VALUE);
							});
						
							waitsFor(function() {
								return flag;
							}, "Waiting for hide to complete", 2000);
							
							runs(function() {

								var propertyName = arrSignaturetake[idx]['propertyName'];
								var propertyValue = arrSignaturetake[idx]['propertyValue'];

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

								EB.Signature.takeFullScreen(objProperty, sigCallback);

								flag = false;
								setTimeout(function() {
									flag = true;
								}, ENABLE_TIMEOUT_VALUE);
							});

							waitsFor(function() {
								return flag;
							}, "Waiting for enable", 2000);
								
							runs(function() {

								var data = eval(EB.Signature)[arrSignaturetake[idx]['propertyName']];
								expect(data).toEqual(arrSignaturetake[idx]['expectedResult']);
								flag = false;
								setTimeout(function()
								{
									flag = true;
								}, HIDE_TIMEOUT_VALUE);
							});
						
							waitsFor(function() {
								return flag;
							}, "Waiting to hide", 2000);

						});
					})(i);

				}
			});

		})(arrSIGshow,arrSIGtake);

});
