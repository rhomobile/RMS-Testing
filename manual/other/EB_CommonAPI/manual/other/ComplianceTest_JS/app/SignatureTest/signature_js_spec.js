describe("Signature Manual Test", function () {
    var readFlag = false;
    var sigCallbackFired = false;
    var vectorCallbackFired = false;
    var nulldata;
    var preservedProperties;
    
    var thirtySecTimeout;
    var nineSecTimeout;
    var fiveSecTimeout;

    function delayForThirtySeconds() {
    	readFlag = false;
        thirtySecTimeout = setTimeout(function () {
            readFlag = true;
        }, 30000);
    }

    function delayForNineSeconds() {
    	readFlag = false;
    	nineSecTimeout = setTimeout(function () {
            readFlag = true;
        }, 9000);
    }

    function delayForFiveSeconds() {
    	readFlag = false;
    	fiveSecTimeout = setTimeout(function () {
            readFlag = true;
        }, 5000);
    }

    var callbackImage = function (data) {
        //imageCallback(JSON.stringify(data));
        imageCallback(data);
        sigCallbackFired = true;
    };

    var callbackDataUri = function (data) {
        //dataUriCallback(JSON.stringify(data));
        dataUriCallback(data);
        sigCallbackFired = true;
    };

    var callbackVector = function (data) {
    	
        //vectorCallback(JSON.stringify(data));
        vectorCallback(data);
        vectorCallbackFired = true;
    };

    //Added to preserve the default values of signature
    preservedProperties = {};
    preservedProperties.bgColor = EB.Signature.bgColor;
    //added the if condition because on WM it' faling and saying Invalid compression format
    if (!isWindowsMobilePlatform()){
    preservedProperties.compressionFormat = EB.Signature.compressionFormat;}
    preservedProperties.fileName = EB.Signature.fileName;
    preservedProperties.outputFormat = EB.Signature.outputFormat;
    preservedProperties.penColor = EB.Signature.penColor;
    preservedProperties.penWidth = EB.Signature.penWidth;
    preservedProperties.border = EB.Signature.border;
    preservedProperties.height = EB.Signature.height;
    preservedProperties.left = EB.Signature.left;
    preservedProperties.top = EB.Signature.top;
    preservedProperties.width = EB.Signature.width;

    describe("Signature Spec for Show and takeFullScreen ", function () {

        beforeEach(function () {
            readFlag = false;
            nulldata = '';
            document.getElementById("actResult").innerHTML = "init";
            imageCallback(nulldata);
            dataUriCallback(nulldata);
            vectorCallback(nulldata);
            sigCallbackFired = false;
            vectorCallbackFired = false;

        });

        afterEach(function () {
        	if(thirtySecTimeout)
        	{
        		window.clearTimeout(thirtySecTimeout);
        		thirtySecTimeout = null;
        	}
        	if(nineSecTimeout)
        	{
        		window.clearTimeout(nineSecTimeout);
        		nineSecTimeout = null;
        	}
        	if(fiveSecTimeout)
        	{
        		window.clearTimeout(fiveSecTimeout);
        		fiveSecTimeout = null;
        	}
        	//noinspection JSUnresolvedVariable
            EB.Signature.clear();

            // setting the default values after ecah test    
            EB.Signature.bgColor = preservedProperties.bgColor;
            //added the if condition because on WM it' faling and saying Invalid compression format
            if (!isWindowsMobilePlatform()){
            EB.Signature.compressionFormat = preservedProperties.compressionFormat;}
            EB.Signature.fileName = preservedProperties.fileName;
            EB.Signature.outputFormat = preservedProperties.outputFormat;
            EB.Signature.penColor = preservedProperties.penColor;
            EB.Signature.penWidth = preservedProperties.penWidth;
            EB.Signature.border = preservedProperties.border;
            EB.Signature.height = preservedProperties.height;
            EB.Signature.left = preservedProperties.left;
            EB.Signature.top = preservedProperties.top;
            EB.Signature.width = preservedProperties.width;            
        });

        it("VT299-001 | Call takeFullScreen with callback as function and returned status OK |", function () {

            displayObjective("VT299-001 |Call takeFullScreen with callback as function and returned status OK|");
            dispTestSteps("Wait for 10 sec for Fullscreen Signature box to comeup and press capture after drawing any signature on signature area");
            dispExpectedResult("The returned status should be OK and path of the captured signature image should be returned (Image should be rendered on page)");
            _result.waitToRunTest();

            runs(function () {
                EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-001');
                EB.Signature.takeFullScreen({}, callbackImage);
                delayForNineSeconds();
            });
            waitsFor(function () {
                return readFlag || sigCallbackFired;
            }, 'wait to callback to fire or timeout', 10000);

            runs(function () {
                EB.Signature.hide();
                _result.waitForResponse();
            });
        });

        it("VT299-002 | Call takeFullScreen with callback as function and returned status cancel |", function () {

            displayObjective("VT299-002 |Call takeFullScreen with callback as function and returned status cancel |");
            dispTestSteps("Wait for 10 sec for Fullscreen Signature box to comeup and press cancel after drawing any signature on signature area");
            dispExpectedResult("The returned status should be cancel and no path of the signature image should be returned");
            _result.waitToRunTest();

            runs(function () {
                EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-002');
                EB.Signature.takeFullScreen({}, callbackImage);
                delayForNineSeconds();
            });
            waitsFor(function () {
                return readFlag || sigCallbackFired;
            }, 'wait to callback to fire or timeout', 10000);

            runs(function () {
                EB.Signature.hide();
                _result.waitForResponse();
            });
        });

        it("VT299-010 | Call capture with callback as anonymous function |", function () {

            displayObjective("VT299-010 |Call capture with callback as anonymous function|");
            dispTestSteps("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for");
            dispExpectedResult("The returned status should be OK and path of the captured signature image should be returned (Image should be rendered on page)");
            _result.waitToRunTest();

            runs(function () {
                EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-010');
                EB.Signature.show();
                delayForFiveSeconds();
            });
            waitsFor(function () {
               return readFlag;
            }, 'wait to callback to fire or timeout', 6000);

            runs(function () {
                EB.Signature.capture(function (data) {
                    imageCallback(data);
                });
                EB.Signature.hide();
                _result.waitForResponse();
            });
        });

        it("VT299-011 | Call capture and call clear |", function () {

            displayObjective("VT299-011 |Call capture and call clear|");
            dispTestSteps("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for clear to call");
            dispExpectedResult("The signature area should be clear after clear has been called and a clear signature image should be saved at returned path");
            _result.waitToRunTest();

            runs(function () {
                EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-011');
                EB.Signature.show();
                delayForFiveSeconds();
            });
            waitsFor(function () {
                return readFlag;
            }, 'wait to callback to fire or timeout', 6000);

            runs(function () {
                EB.Signature.clear();
                EB.Signature.capture(function (data) {
                    callbackImage(data);
                });
                EB.Signature.hide();
                _result.waitForResponse();
            });
        });

        it("VT299-015 | Call takeFullScreen with setting compressionFormat as jpg, fileName as VT299-015 and outputFormat as Image |", function () {

            displayObjective("VT299-015 |Call takeFullScreen with setting compressionFormat as jpg, fileName as VT299-015 and outputFormat as Image|");
            dispTestSteps("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
            dispExpectedResult("The format of saved image should be jpg with name VT299-015 and Image should be saved at retrurned path (saved image is rendered for validation)");
            _result.waitToRunTest();

            runs(function () {
                EB.Signature.bgColor = '#FF0000';
                EB.Signature.penColor = '#0000FF';
                EB.Signature.penWidth = 3;
                var fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-015');
                EB.Signature.takeFullScreen({compressionFormat: CONST_JPG, fileName: fileName, outputFormat: 'image'}, callbackImage);
                delayForNineSeconds();
            });

            waitsFor(function () {
                return readFlag || sigCallbackFired;
            }, 'wait to callback to fire or timeout', 10000);

            runs(function () {
                EB.Signature.hide();
                _result.waitForResponse();
            });
        });

        if (isAnyButApplePlatform()) 
        {
            it("VT299-018 | Call takeFullScreen with compressionFormat as jpg, fileName as VT299-018 and outputFormat as dataUri |", function () {

                displayObjective("VT299-018 |Call takeFullScreen with compressionFormat as jpg, fileName as VT299-018 and outputFormat as dataUri|");
                dispTestSteps("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
                dispExpectedResult("The signature should be rendered in page as callback returns datauri (no path of image) and image should be black signature area with white normal pen");
                _result.waitToRunTest();

                runs(function () {
                    EB.Signature.bgColor = '#000000';
                    EB.Signature.penColor = '#FFFFFF';
                    EB.Signature.penWidth = 3;
                    var fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-018');
                    EB.Signature.takeFullScreen({compressionFormat: CONST_JPG, fileName: fileName, outputFormat: 'dataUri'}, callbackDataUri);
                    delayForNineSeconds();
                });
                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);

                runs(function () {
                    EB.Signature.hide();
                    _result.waitForResponse();
                });
            });
        }

        it("VT299-019 | Call show with bgColor as #FFFF8C00 (ARGB), penColor as #00FF00(RGB), penWidth as 1, and callback |", function () {

            displayObjective("VT299-019 |Call show with bgColor as #FFFF8C00 (ARGB), penColor as #00FF00(RGB), penWidth as 1, and callback|");
            dispTestSteps("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
            dispExpectedResult("The signature area should be default area of color darkOrange and pen as green with thin width penline and signature should be saved at return path with name VT299-019.jpg (saved image is rendered for validation)");
            _result.waitToRunTest();

            runs(function () {
                var fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-019');
                EB.Signature.show({bgColor: '#FFFF8C00', penColor: '#FF00FF00', penWidth: 1, compressionFormat: CONST_JPG, fileName: fileName, outputFormat: 'image'});
                delayForFiveSeconds();
            });
            waitsFor(function () {
                return readFlag;
            }, 'wait to callback to fire or timeout', 6000);

            runs(function () {
                EB.Signature.capture(callbackImage);
                EB.Signature.hide();
                _result.waitForResponse();
            });
        });

        if (isAnyButApplePlatform()) 
        {
            it("VT299-023 | Call show after setting all properties and outputFormat as dataURI|", function () {

                displayObjective("VT299-023 |Call show after setting all properties and outputFormat as dataURI|");
                dispTestSteps("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
                dispExpectedResult("The signature area should be nonfullscreen area with border of specified size  left as 15, top as 60, width as 200 and height as 150 with penline width as 5(thickest than prev test), signature should be rendered in page as callback returns the dataURI, no path should retrun");
                _result.waitToRunTest();

                runs(function () {
                    EB.Signature.bgColor = '#00FF00';
                    EB.Signature.penColor = '#FF800000';
                    EB.Signature.penWidth = 5;
                    EB.Signature.left = 15;
                    EB.Signature.top = 60;
                    EB.Signature.height = 150;
                    EB.Signature.width = 200;
                    EB.Signature.outputFormat = 'dataUri';
                    EB.Signature.border = true;
                    EB.Signature.show();

                    delayForFiveSeconds();
                });
                waitsFor(function () {
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);

                runs(function () {
                    EB.Signature.capture(callbackDataUri);
                    EB.Signature.hide();
                    _result.waitForResponse();
                });
            });

            it("VT299-025 | Call setVectorCallback with function callback|", function () {

                displayObjective("VT299-025 |Call setVectorCallback with function callback|");
                dispTestSteps("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw a line, check for setVectorCallback to fire ");
                dispExpectedResult("The signature area should be Nonfullscreen area and setVectorCallback callback will be fired after 'pen up' occurs in the signature box.");
                _result.waitToRunTest();

                runs(function () {
                    EB.Signature.bgColor = '#00FF00';
                    EB.Signature.penColor = '#FF800000';
                    EB.Signature.penWidth = 5;
                    EB.Signature.left = 15;
                    EB.Signature.top = 60;
                    EB.Signature.height = 150;
                    EB.Signature.width = 200;
                    EB.Signature.outputFormat = 'image';
                    EB.Signature.border = false;
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-025');
                    EB.Signature.compressionFormat = CONST_JPG;
                    EB.Signature.setVectorCallback(callbackVector);
                    EB.Signature.show();

                    delayForFiveSeconds();
                });
                waitsFor(function () {
                    return readFlag || sigCallbackFired || vectorCallbackFired;
                }, 'wait to callback to fire or timeout', 6000);

                runs(function () {
                    EB.Signature.hide();
                    _result.waitForResponse();
                });
            });
        }

        it("VT299-037 | Call show and rotate the device|", function () {

            displayObjective("VT299-037 |Call show and rotate the device|");
            dispTestSteps("Wait for 10 sec for Signature box to comeup and rotate the device");
            dispExpectedResult("The signature area should be visible after rotating the device");
            _result.waitToRunTest();

            runs(function () {
                EB.Signature.show();
                delayForNineSeconds();
            });

            waitsFor(function () {
                return readFlag;
            }, 'wait to callback to fire or timeout', 10000);

            runs(function () {
                EB.Signature.hide();
                _result.waitForResponse();
            });
        });

        it("VT299-038 | Call takeFullScreen and rotate the device portrait to landscape |", function () {

            displayObjective("VT299-038 |Call takeFullScreen and rotate the device portrait to landscape|");
            dispTestSteps("Wait for 10 sec for Fullscreen Signature box to comeup and rotate the device");
            dispExpectedResult("Signature area with all buttons should be visible after rotation");
            _result.waitToRunTest();

            runs(function () {
                EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-038');
                EB.Signature.takeFullScreen({}, callbackImage);
                delayForNineSeconds();
            });

            waitsFor(function () {
                return readFlag || sigCallbackFired;
            }, 'wait to callback to fire or timeout', 10000);

            runs(function () {
                EB.Signature.hide();
                _result.waitForResponse();
            });
        });
 
    });
});	