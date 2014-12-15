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

            runs(function () {
                setObjective("VT299-001 |Call takeFullScreen with callback as function and returned status OK|");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and press capture after drawing any signature on signature area");
                setExpected("The returned status should be OK and path of the captured signature image should be returned (Image should be rendered on page)");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-001');
                    EB.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-002 | Call takeFullScreen with callback as function and returned status cancel |", function () {

            runs(function () {
                setObjective("VT299-002 |Call takeFullScreen with callback as function and returned status cancel |");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and press cancel after drawing any signature on signature area");
                setExpected("The returned status should be cancel and no path of the signature image should be returned");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-002');
                    EB.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-004 | Call takeFullScreen with callback as anonymous function |", function () {

            runs(function () {
                setObjective("VT299-003 |Call takeFullScreen with callback as anonymous function|");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and press capture after drawing any signature on signature area");
                setExpected("The returned status should be OK and path of the captured signature image should be returned (Image should be rendered on page)");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-004');
                    EB.Signature.takeFullScreen({}, function (data) {
                        imageCallback(data);
                        sigCallbackFired = true;
                    });
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-005 | Call takeFullScreen and call clear |", function () {

            runs(function () {
                setObjective("VT299-005 | Call takeFullScreen and call clear |");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and press clear after drawing any signature on signature area");
                setExpected("The signature area should be clear after pressing button clear");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-005');
                    EB.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-006 | Call takeFullScreen with callback as function and minimize |", function () {

            runs(function () {
                setObjective("VT299-006 |Call takeFullScreen with callback as function and minimize|");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and minimize appliaction after drawing any signature on signature area and then restore app after 5 sec");
                setExpected("The application should not behave abruptly and callback should retrun as cancel if capture screen is not visible on restore");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-006');
                    EB.Signature.takeFullScreen({}, function (data) {callbackImage(data);});
                    delayForThirtySeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 31000);
            });

            runs(function () {
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-007 | Call takeFullScreen with callback as function and suspend the device |", function () {

            runs(function () {
                setObjective("VT299-007 |Call takeFullScreen with callback as function and suspend the device|");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and suspend the device after drawing any signature on signature area and then resume device after 5 sec");
                setExpected("The application should not behave abruptly and callback should retrun as cancel if capture screen is not visible on resume");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-007');
                    EB.Signature.takeFullScreen({}, callbackImage);
                    delayForThirtySeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 31000);
            });

            runs(function () {
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-008 | Call capture with callback as function and returned status OK |", function () {

            runs(function () {
                setObjective("VT299-008 |Call capture with callback as function and returned status OK|");
                setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for");
                setExpected("The returned status should be OK and path of the captured signature image should be returned (Image should be rendered on page)");
                delayForNineSeconds();
            });

            waitsFor(function () {
                return readFlag;
            }, 'wait for Tester to read', 10000);

            runs(function () {
                EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-008');
                EB.Signature.show();
                delayForFiveSeconds();
            });

            waitsFor(function () {
                //var stat = readFlag || sigCallbackFired;
                return readFlag;
            }, 'wait to callback to fire or timeout', 6000);

            runs(function () {
                EB.Signature.capture(callbackImage);
                EB.Signature.hide();            
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });            

        });

        it("VT299-010 | Call capture with callback as anonymous function |", function () {

            runs(function () {
                setObjective("VT299-010 |Call capture with callback as anonymous function|");
                setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for");
                setExpected("The returned status should be OK and path of the captured signature image should be returned (Image should be rendered on page)");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-010');
                    EB.Signature.show();
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    //var stat = readFlag || sigCallbackFired;
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {
                EB.Signature.capture(function (data) {
                    imageCallback(data);
                });
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-011 | Call capture and call clear |", function () {

            runs(function () {
                setObjective("VT299-011 |Call capture and call clear|");
                setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for clear to call");
                setExpected("The signature area should be clear after clear has been called and a clear signature image should be saved at returned path");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-011');
                    EB.Signature.show();
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    //var stat = readFlag || sigCallbackFired;
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {
                EB.Signature.clear();
                EB.Signature.capture(function (data) {
                    callbackImage(data);
                });
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-012 | Call takeFullScreen with bgColor as #0000FF(RGB), penColor as #FFFFFF00 and callback |", function () {

            runs(function () {
                setObjective("VT299-012 |Call takeFullScreen with bgColor as #FFFF0000(RGB), penColor as #FFFFFF00 and callback|");
                setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
                setExpected("The signature area should be red colored fullscreen and pen color yellow, the same signature should be saved at return path (saved image is rendered for validation)");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-012');
                    EB.Signature.takeFullScreen({'bgColor': '#FFFF0000', 'penColor': '#FFFFFF00'}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-013 | Call takeFullScreen with bgColor as #FFFFFF00 (ARGB), penColor as #FF00FF(RGB), penWidth as 1 and callback |", function () {

            runs(function () {
                setObjective("VT299-013 |Call takeFullScreen with bgColor as #FF0000FF (ARGB), penColor as #FFFF00FF(RGB), penWidth as 1 and callback|");
                setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
                setExpected("The signature area should be blue colored fullscreen, pen color magenta and thin width penline, the same signature should be saved at return path (saved image is rendered for validation)");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-013');
                    EB.Signature.takeFullScreen({'bgColor': '#FF0000FF', 'penColor': '#FFFF00FF', 'penWidth': 1}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-014 | Call takeFullScreen after setting bgColor as #FF87CEEB, penColor as #FF8B0000 and penWidth as 5 |", function () {

            runs(function () {
                setObjective("VT299-014 |Call takeFullScreen after setting bgColor as #FF87CEEB, penColor as #FF8B0000 and penWidth as 5|");
                setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
                setExpected("The signature area should be skyblue colored fullscreen, pen color darkred and thick width penline, the same signature should be saved at return path(saved image is rendered for validation)");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.bgColor = '#FF87CEEB';
                    EB.Signature.penColor = '#FF8B0000';
                    EB.Signature.penWidth = 5;
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-014');
                    EB.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-015 | Call takeFullScreen with setting compressionFormat as jpg, fileName as VT299-015 and outputFormat as Image |", function () {

            runs(function () {
                setObjective("VT299-015 |Call takeFullScreen with setting compressionFormat as jpg, fileName as VT299-015 and outputFormat as Image|");
                setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
                setExpected("The format of saved image should be jpg with name VT299-015 and Image should be saved at retrurned path (saved image is rendered for validation)");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

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
            });

            runs(function () {
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-016 | Call takeFullScreen after setting compressionFormat as png, fileName as VT299-016 and outputFormat as Image |", function () {

            runs(function () {
                setObjective("VT299-016 |Call takeFullScreen after setting compressionFormat as png, fileName as VT299-016 and outputFormat as Image|");
                setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
                setExpected("The format of saved image should be png with name VT299-016 and Image should be saved at retrurned path (saved image is rendered for validation)");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    EB.Signature.compressionFormat = CONST_PNG;
                    EB.Signature.fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-016');
                    EB.Signature.outputFormat = 'image';
                    EB.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                EB.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        if (isAnyButApplePlatform()) 
        {
            it("VT299-017 | Call takeFullScreen with compressionFormat as bmp, fileName as VT299-017 and outputFormat as Image |", function () {

                runs(function () {
                    setObjective("VT299-017 |Call takeFullScreen with setting compressionFormat as bmp, fileName as VT299-017 and outputFormat as Image|");
                    setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
                    setExpected("The format of saved image should be bmp with name VT299-017 and Image should be saved at retrurned path(saved image is rendered for validation)");
                    delayForNineSeconds();
                });

                runs(function () {
                    waitsFor(function () {
                        return readFlag;
                    }, 'wait for Tester to read', 10000);

                    runs(function () {
                        var fileName = EB.RhoFile.join(EB.Application.databaseBlobFolder, 'VT299-017');
                        EB.Signature.takeFullScreen({compressionFormat: 'bmp', fileName: fileName, outputFormat: 'image'}, callbackImage);
                        delayForNineSeconds();
                    });

                    waitsFor(function () {
                        return readFlag || sigCallbackFired;
                    }, 'wait to callback to fire or timeout', 10000);
                });

                runs(function () {
                    EB.Signature.hide();
                    waitsFor(function () {
                        return document.getElementById("actResult").innerHTML != "init";
                    }, "Timed out waiting for tester to respond", 300000);
                    runs(function () {
                        expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                    });
                });
            });

            it("VT299-018 | Call takeFullScreen with compressionFormat as jpg, fileName as VT299-018 and outputFormat as dataUri |", function () {

                runs(function () {
                    setObjective("VT299-018 |Call takeFullScreen with compressionFormat as jpg, fileName as VT299-018 and outputFormat as dataUri|");
                    setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
                    setExpected("The signature should be rendered in page as callback returns datauri (no path of image) and image should be black signature area with white normal pen");
                    delayForNineSeconds();
                });

                runs(function () {
                    waitsFor(function () {
                        return readFlag;
                    }, 'wait for Tester to read', 10000);

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
                });

                runs(function () {
                    EB.Signature.hide();
                    waitsFor(function () {
                        return document.getElementById("actResult").innerHTML != "init";
                    }, "Timed out waiting for tester to respond", 300000);
                    runs(function () {
                        expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                    });
                });
            });
        }

 
    });
});	