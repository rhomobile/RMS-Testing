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
    preservedProperties.bgColor = Rho.Signature.bgColor;
    //added the if condition because on WM it' faling and saying Invalid compression format
    if (!isWindowsMobilePlatform()){
    preservedProperties.compressionFormat = Rho.Signature.compressionFormat;}
    preservedProperties.fileName = Rho.Signature.fileName;
    preservedProperties.outputFormat = Rho.Signature.outputFormat;
    preservedProperties.penColor = Rho.Signature.penColor;
    preservedProperties.penWidth = Rho.Signature.penWidth;
    preservedProperties.border = Rho.Signature.border;
    preservedProperties.height = Rho.Signature.height;
    preservedProperties.left = Rho.Signature.left;
    preservedProperties.top = Rho.Signature.top;
    preservedProperties.width = Rho.Signature.width;

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
            Rho.Signature.clear();

            // setting the default values after ecah test    
            Rho.Signature.bgColor = preservedProperties.bgColor;
            //added the if condition because on WM it' faling and saying Invalid compression format
            if (!isWindowsMobilePlatform()){
            Rho.Signature.compressionFormat = preservedProperties.compressionFormat;}
            Rho.Signature.fileName = preservedProperties.fileName;
            Rho.Signature.outputFormat = preservedProperties.outputFormat;
            Rho.Signature.penColor = preservedProperties.penColor;
            Rho.Signature.penWidth = preservedProperties.penWidth;
            Rho.Signature.border = preservedProperties.border;
            Rho.Signature.height = preservedProperties.height;
            Rho.Signature.left = preservedProperties.left;
            Rho.Signature.top = preservedProperties.top;
            Rho.Signature.width = preservedProperties.width;            
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
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-001');
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
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
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-002');
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
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
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-004');
                    Rho.Signature.takeFullScreen({}, function (data) {
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
                Rho.Signature.hide();
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
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-005');
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
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
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-006');
                    Rho.Signature.takeFullScreen({}, function (data) {callbackImage(data);});
                    delayForThirtySeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 31000);
            });

            runs(function () {
                Rho.Signature.hide();
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
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-007');
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForThirtySeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 31000);
            });

            runs(function () {
                Rho.Signature.hide();
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
                Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-008');
                Rho.Signature.show();
                delayForFiveSeconds();
            });

            waitsFor(function () {
                //var stat = readFlag || sigCallbackFired;
                return readFlag;
            }, 'wait to callback to fire or timeout', 6000);

            runs(function () {
                Rho.Signature.capture(callbackImage);
                Rho.Signature.hide();            
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
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-010');
                    Rho.Signature.show();
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    //var stat = readFlag || sigCallbackFired;
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {
                Rho.Signature.capture(function (data) {
                    imageCallback(data);
                });
                Rho.Signature.hide();
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
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-011');
                    Rho.Signature.show();
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    //var stat = readFlag || sigCallbackFired;
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {
                Rho.Signature.clear();
                Rho.Signature.capture(function (data) {
                    callbackImage(data);
                });
                Rho.Signature.hide();
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
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-012');
                    Rho.Signature.takeFullScreen({'bgColor': '#FFFF0000', 'penColor': '#FFFFFF00'}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
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
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-013');
                    Rho.Signature.takeFullScreen({'bgColor': '#FF0000FF', 'penColor': '#FFFF00FF', 'penWidth': 1}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
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
                    Rho.Signature.bgColor = '#FF87CEEB';
                    Rho.Signature.penColor = '#FF8B0000';
                    Rho.Signature.penWidth = 5;
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-014');
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
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
                    Rho.Signature.bgColor = '#FF0000';
                    Rho.Signature.penColor = '#0000FF';
                    Rho.Signature.penWidth = 3;
                    var fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-015');
                    Rho.Signature.takeFullScreen({compressionFormat: CONST_JPG, fileName: fileName, outputFormat: 'image'}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
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
                    Rho.Signature.compressionFormat = CONST_PNG;
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-016');
                    Rho.Signature.outputFormat = 'image';
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
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
                        var fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-017');
                        Rho.Signature.takeFullScreen({compressionFormat: 'bmp', fileName: fileName, outputFormat: 'image'}, callbackImage);
                        delayForNineSeconds();
                    });

                    waitsFor(function () {
                        return readFlag || sigCallbackFired;
                    }, 'wait to callback to fire or timeout', 10000);
                });

                runs(function () {
                    Rho.Signature.hide();
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
                        Rho.Signature.bgColor = '#000000';
                        Rho.Signature.penColor = '#FFFFFF';
                        Rho.Signature.penWidth = 3;
                        var fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-018');
                        Rho.Signature.takeFullScreen({compressionFormat: CONST_JPG, fileName: fileName, outputFormat: 'dataUri'}, callbackDataUri);
                        delayForNineSeconds();
                    });

                    waitsFor(function () {
                        return readFlag || sigCallbackFired;
                    }, 'wait to callback to fire or timeout', 10000);
                });

                runs(function () {
                    Rho.Signature.hide();
                    waitsFor(function () {
                        return document.getElementById("actResult").innerHTML != "init";
                    }, "Timed out waiting for tester to respond", 300000);
                    runs(function () {
                        expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                    });
                });
            });
        }

        it("VT299-019 | Call show with bgColor as #FFFF8C00 (ARGB), penColor as #00FF00(RGB), penWidth as 1, and callback |", function () {

            runs(function () {
                setObjective("VT299-019 |Call show with bgColor as #FFFF8C00 (ARGB), penColor as #00FF00(RGB), penWidth as 1, and callback|");
                setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
                setExpected("The signature area should be default area of color darkOrange and pen as green with thin width penline and signature should be saved at return path with name VT299-019.jpg (saved image is rendered for validation)");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    var fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-019');
                    Rho.Signature.show({bgColor: '#FFFF8C00', penColor: '#FF00FF00', penWidth: 1, compressionFormat: CONST_JPG, fileName: fileName, outputFormat: 'image'});
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {
                Rho.Signature.capture(callbackImage);
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-020 | Call show with signame as VT299-020, compressionFormat as png, outputFormat as image and callback |", function () {

            runs(function () {
                setObjective("VT299-020 |Call show with signame as VT299-020, compressionFormat as png, outputFormat as image and callback|");
                setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
                setExpected("The signature area should be nonfullscreen area of color grey and pen as purple with width penline 2(more thick than prev test), signature should be saved as VT299-020.png (saved image is rendered for validation)");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.bgColor = '#C0C0C0';
                    Rho.Signature.penColor = '#FF800080';
                    Rho.Signature.penWidth = 2;
                    var fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-020');
                    Rho.Signature.show({compressionFormat: CONST_PNG, fileName: fileName, outputFormat: 'image'});
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    //var stat = readFlag || sigCallbackFired;
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {
                Rho.Signature.capture(callbackImage);
                Rho.Signature.hide();
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
            it("VT299-021 | Call show with left as 20, top as 70, width as 250 and height as 200, border as false and callback |", function () {

                runs(function () {
                    setObjective("VT299-021 |Call show with left as 20, top as 70, width as 250 and height as 200, border as false and callback|");
                    setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
                    setExpected("The signature area should be nonfullscreen area without border of specified size  left as 20, top as 70, width as 250 and height as 200 with penline width as 3(more thick than prev test), saved image is rendered for validation");
                    delayForNineSeconds();
                });

                runs(function () {
                    waitsFor(function () {
                        return readFlag;
                    }, 'wait for Tester to read', 10000);

                    runs(function () {
                        var fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-021');
                        Rho.Signature.show({bgColor: '#C0C0C0', penColor: '#FF800080', penWidth: 2, left: 20, top: 70, width: 250, height: 200, border: false, compressionFormat: 'bmp', fileName: fileName, outputFormat: 'image'});
                        delayForFiveSeconds();
                    });

                    waitsFor(function () {
                        return readFlag;
                    }, 'wait to callback to fire or timeout', 6000);
                });

                runs(function () {
                    Rho.Signature.capture(callbackImage);
                    Rho.Signature.hide();
                    waitsFor(function () {
                        return document.getElementById("actResult").innerHTML != "init";
                    }, "Timed out waiting for tester to respond", 300000);
                    runs(function () {
                        expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                    });
                });
            });

            it("VT299-022 | Call show with left as 10, top as 50, width as 180 and height as 120, border as false and outputFormat as dataURI|", function () {

                runs(function () {
                    setObjective("VT299-022 |Call show with left as 10, top as 50, width as 180 and height as 120,  border as false and outputFormat as dataURI|");
                    setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
                    setExpected("The signature area should be nonfullscreen area without border of specified size  left as 10, top as 50, width as 180 and height as 120 with penline width as 4(more thick than prev test), signature should be rendered in page as callback returns the dataURI, no path should be retruned");
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.bgColor = '#C0C0C0';
                    Rho.Signature.penColor = '#FF800080';
                    Rho.Signature.penWidth = 2;
                    Rho.Signature.show({left: 10, top: 50, width: 180, height: 120, border: false, outputFormat: 'dataUri'});
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);

                runs(function () {
                    Rho.Signature.capture(callbackDataUri);
                    Rho.Signature.hide();
                    waitsFor(function () {
                        return document.getElementById("actResult").innerHTML != "init";
                    }, "Timed out waiting for tester to respond", 300000);                    
                    runs(function () {
                        expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                    });                    
                });
            });

            it("VT299-023 | Call show after setting all properties and outputFormat as dataURI|", function () {

                runs(function () {
                    setObjective("VT299-023 |Call show after setting all properties and outputFormat as dataURI|");
                    setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
                    setExpected("The signature area should be nonfullscreen area with border of specified size  left as 15, top as 60, width as 200 and height as 150 with penline width as 5(thickest than prev test), signature should be rendered in page as callback returns the dataURI, no path should retrun");
                    delayForNineSeconds();
                });

                runs(function () {
                    waitsFor(function () {
                        return readFlag;
                    }, 'wait for Tester to read', 10000);

                    runs(function () {
                        Rho.Signature.bgColor = '#00FF00';
                        Rho.Signature.penColor = '#FF800000';
                        Rho.Signature.penWidth = 5;
                        Rho.Signature.left = 15;
                        Rho.Signature.top = 60;
                        Rho.Signature.height = 150;
                        Rho.Signature.width = 200;
                        Rho.Signature.outputFormat = 'dataUri';
                        Rho.Signature.border = true;
                        Rho.Signature.show();

                        delayForFiveSeconds();
                    });

                    waitsFor(function () {
                        return readFlag;
                    }, 'wait to callback to fire or timeout', 6000);
                });

                runs(function () {
                    Rho.Signature.capture(callbackDataUri);
                    Rho.Signature.hide();
                    waitsFor(function () {
                        return document.getElementById("actResult").innerHTML != "init";
                    }, "Timed out waiting for tester to respond", 300000);
                    runs(function () {
                        expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                    });
                });
            });
        }

        it("VT299-024 | Call takeFullScreen with left,top,width,height and border|", function () {

            runs(function () {
                setObjective("VT299-024 |Call takeFullScreen with left,top,width,height and border|");
                setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
                setExpected("The signature area should be fullscreen area without considering the area co-ordinates and border,signature should save at returned path");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.bgColor = '#00FF00';
                    Rho.Signature.penColor = '#FF800000';
                    Rho.Signature.penWidth = 5;
                    Rho.Signature.left = 15;
                    Rho.Signature.top = 60;
                    Rho.Signature.height = 150;
                    Rho.Signature.width = 200;
                    Rho.Signature.outputFormat = 'image';
                    Rho.Signature.border = true;
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-024');
                    Rho.Signature.compressionFormat = CONST_JPG;
                    Rho.Signature.takeFullScreen({}, callbackImage);

                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {
                Rho.Signature.hide();
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
            it("VT299-025 | Call setVectorCallback with function callback|", function () {

                runs(function () {
                    setObjective("VT299-025 |Call setVectorCallback with function callback|");
                    setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw a line, check for setVectorCallback to fire ");
                    setExpected("The signature area should be Nonfullscreen area and setVectorCallback callback will be fired after 'pen up' occurs in the signature box.");
                    delayForNineSeconds();
                });

                runs(function () {
                    waitsFor(function () {
                        return readFlag;
                    }, 'wait for Tester to read', 10000);

                    runs(function () {
                        Rho.Signature.bgColor = '#00FF00';
                        Rho.Signature.penColor = '#FF800000';
                        Rho.Signature.penWidth = 5;
                        Rho.Signature.left = 15;
                        Rho.Signature.top = 60;
                        Rho.Signature.height = 150;
                        Rho.Signature.width = 200;
                        Rho.Signature.outputFormat = 'image';
                        Rho.Signature.border = false;
                        Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-025');
                        Rho.Signature.compressionFormat = CONST_JPG;
                        Rho.Signature.setVectorCallback(callbackVector);
                        Rho.Signature.show();

                        delayForFiveSeconds();
                    });

                    waitsFor(function () {
                        return readFlag || sigCallbackFired || vectorCallbackFired;
                    }, 'wait to callback to fire or timeout', 6000);
                });

                runs(function () {
                    Rho.Signature.hide();
                    waitsFor(function () {
                        return document.getElementById("actResult").innerHTML != "init";
                    }, "Timed out waiting for tester to respond", 300000);
                    runs(function () {
                        expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                    });
                });
            });

            it("VT299-026 | Call setVectorCallback with anonymous callback|", function () {

                runs(function () {
                    setObjective("VT299-026 |Call setVectorCallback with anonymous callback|");
                    setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw a 2 lines, check for setVectorCallback to fire");
                    setExpected("2 vectors contains an X, Y coordinate and the beginning / end of the signature should return with callback after ecah 'pen up' occurs in the signature box.");
                    delayForNineSeconds();
                });

                runs(function () {
                    waitsFor(function () {
                        return readFlag;
                    }, 'wait for Tester to read', 10000);

                    runs(function () {
                        Rho.Signature.bgColor = '#00FF00';
                        Rho.Signature.penColor = '#FF800000';
                        Rho.Signature.penWidth = 5;
                        Rho.Signature.left = 15;
                        Rho.Signature.top = 60;
                        Rho.Signature.height = 150;
                        Rho.Signature.width = 200;
                        Rho.Signature.outputFormat = 'image';
                        Rho.Signature.border = false;
                        Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-026');
                        Rho.Signature.compressionFormat = CONST_JPG;
                        Rho.Signature.setVectorCallback(function (data) {
                            vectorCallback(data);
                        });
                        Rho.Signature.show();

                        delayForFiveSeconds();
                    });

                    waitsFor(function () {
                        return readFlag || sigCallbackFired;
                    }, 'wait to callback to fire or timeout', 6000);
                });

                runs(function () {
                    Rho.Signature.hide();
                    waitsFor(function () {
                        return document.getElementById("actResult").innerHTML != "init";
                    }, "Timed out waiting for tester to respond", 300000);
                    runs(function () {
                        expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                    });
                });
            });

            it("VT299-027 | Call setVectorCallback with takeFullScreen|", function () {

                runs(function () {
                    setObjective("VT299-027 |Call setVectorCallback with takeFullScreen|");
                    setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and press capture after drawing");
                    setExpected("Both vector callback and callback of takeFullScreen should fire");
                    delayForNineSeconds();
                });

                runs(function () {
                    waitsFor(function () {
                        return readFlag;
                    }, 'wait for Tester to read', 10000);

                    runs(function () {
                        Rho.Signature.bgColor = '#00FF00';
                        Rho.Signature.penColor = '#FF800000';
                        Rho.Signature.penWidth = 5;
                        Rho.Signature.outputFormat = 'image';
                        Rho.Signature.border = false;
                        Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-027');
                        Rho.Signature.compressionFormat = CONST_JPG;
                        Rho.Signature.setVectorCallback(callbackVector);
                        Rho.Signature.takeFullScreen({}, callbackImage);

                        delayForNineSeconds();
                    });

                    waitsFor(function () {
                        return readFlag || sigCallbackFired;
                    }, 'wait to callback to fire or timeout', 6000);
                });

                runs(function () {
                    Rho.Signature.hide();
                    waitsFor(function () {
                        return document.getElementById("actResult").innerHTML != "init";
                    }, "Timed out waiting for tester to respond", 300000);
                    runs(function () {
                        expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                    });
                });
            });

            it("VT299-028 | Call setVectorCallback with capture and dataURI|", function () {

                runs(function () {
                    setObjective("VT299-028 |Call setVectorCallback with capture and dataURI|");
                    setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and press capture after drawing");
                    setExpected("Both vector callback and callback of capture as datauri should fire, no path only image should render");
                    delayForNineSeconds();
                });

            	waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.bgColor = '#00FF00';
                    Rho.Signature.penColor = '#FF800000';
                    Rho.Signature.penWidth = 5;
                    Rho.Signature.outputFormat = 'dataUri';
                    Rho.Signature.border = false;
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-028');
                    Rho.Signature.compressionFormat = CONST_JPG;
                    Rho.Signature.setVectorCallback(callbackVector);
                    Rho.Signature.show();

                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 6000);

                runs(function ()
                {
                    Rho.Signature.capture(callbackDataUri);
                    Rho.Signature.hide();
                });
                
                waitsFor(function ()
                {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                
                runs(function ()
                {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        }

        it("VT299-029 | Call takeFullScreen with default path |", function () {

            runs(function () {
                setObjective("VT299-029 |Call takeFullScreen with default path|");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and press capture after drawing any signature on signature area");
                setExpected("Path of the captured signature image should be returned which is default, check the image at default path(Image is rendered on page for validation)");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-030 | Call show and capture with default path |", function () {

            runs(function () {
                setObjective("VT299-030 |Call show and capture with default path|");
                setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for capture to call");
                setExpected("Path of the captured signature image should be returned which is default, check the image at default path(Image is rendered on page for validation)");
                delayForNineSeconds();
            });

            waitsFor(function () {
                return readFlag;
            }, 'wait for Tester to read', 10000);

            runs(function () {
                Rho.Signature.show();
                delayForFiveSeconds();
            });

            waitsFor(function () {
                return readFlag;
            }, 'wait to callback to fire or timeout', 6000);

            runs(function () {
                Rho.Signature.capture(callbackImage);
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);  
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });                
            });
        });

        //negative  and edge cases added
        it("VT299-031 | Call show and then call hide and then call show again |", function () {

            runs(function () {
                setObjective("VT299-031 |Call show and then call hide and then call show again|");
                setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for signature box to hide and come again");
                setExpected("the last drawn signature should not be there after signature area shows again with hide");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);
                runs(function () {
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-031');
                    Rho.Signature.show();
                    delayForFiveSeconds();
                });
                waitsFor(function () {
                    //var stat = readFlag || sigCallbackFired;
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {            
                runs(function () {
                    Rho.Signature.hide();
                    delayForFiveSeconds();
                });
                waitsFor(function () {
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {             
                runs(function () {
                    Rho.Signature.show();
                    delayForFiveSeconds();
                });
                waitsFor(function () {
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);            
            });

            runs(function () {             
                Rho.Signature.capture(callbackImage);
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });             
        });

        /* test not correct - see Signature doc. Inline capture and fullScreen capturework with different capture area and inline signature functions do not effect to fullScreen mode !
        it("VT299-032 | Call takeFullScreen and then call hide and then call takeFullScreen again |", function () {

            runs(function () {
                setObjective("VT299-032 |Call takeFullScreen and then call hide and then call takeFullScreen again|");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and press capture after drawing any signature on signature area");
                setExpected("the last drawn signature should not be there after signature window shows again with hide");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-032');
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {
                runs(function () {
                    Rho.Signature.hide();
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);
            });            

            runs(function () {
                runs(function () {
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    return readFlag;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-033 | Call clear with takeFullScreen |", function () {

            runs(function () {
                setObjective("VT299-033 |Call clear with takeFullScreen|");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and wait after drawing any signature on signature area");
                setExpected("The signature area should be cleared after 5 second");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-033');
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 6000);
            });

            runs(function () {
                runs(function () {
                    Rho.Signature.clear();
                    delayForFiveSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 6000);
            });            

            runs(function () {
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });
        */

        it("VT299-034 | Call show and minimize |", function () {

            runs(function () {
                setObjective("VT299-034 |Call show and minimize|");
                setInstruction("Wait for 10 sec for Signature box to comeup and minimize appliaction after drawing any signature on signature area and then restore app after 5 sec");
                setExpected("The application should not behave abruptly and signature windows should be visible on restore");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-034');
                    Rho.Signature.show();
                    delayForThirtySeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 31000);
            });

            runs(function () {
                Rho.Signature.capture(callbackImage);
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-035 | Call show and suspend the device|", function () {

            runs(function () {
                setObjective("VT299-035 |Call show and suspend the device|");
                setInstruction("Wait for 10 sec for Signature box to comeup and suspend the device after drawing any signature on signature area and then resume app after 5 sec");
                setExpected("The application should not behave abruptly and signature windows should be visible on restore");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-035');
                    Rho.Signature.show();
                    delayForThirtySeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 31000);
            });

            runs(function () {
                Rho.Signature.capture(callbackImage);
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-036 | Call show and scroll the page on screen|", function () {

            runs(function () {
                setObjective("VT299-036 |Call show and scroll the page on screen|");
                setInstruction("Wait for 10 sec for Signature box to comeup and scroll the page");
                setExpected("The signature area should not change it's postion with scrolling the page");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.show();
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-037 | Call show and rotate the device|", function () {

            runs(function () {
                setObjective("VT299-037 |Call show and rotate the device|");
                setInstruction("Wait for 10 sec for Signature box to comeup and rotate the device");
                setExpected("The signature area should be visible after rotating the device");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.show();
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-038 | Call takeFullScreen and rotate the device portrait to landscape |", function () {

            runs(function () {
                setObjective("VT299-038 |Call takeFullScreen and rotate the device portrait to landscape|");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and rotate the device");
                setExpected("Signature area with all buttons should be visible after rotation");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-038');
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-039 | Call takeFullScreen and rotate the device landscape to portrait |", function () {

            runs(function () {
                setObjective("VT299-039 |Call takeFullScreen and rotate the device landscape to portrait|");
                setInstruction("keep the device in landcsape, Wait for 10 sec for Fullscreen Signature box to comeup and rotate the device");
                setExpected("Signature area with all buttons should be visible after rotation");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-039');
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForNineSeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 10000);
            });

            runs(function () {
                Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

        it("VT299-040 | Call takeFullScreen with callback as function and wait for timeout |", function () {

            runs(function () {
                setObjective("VT299-040 |Call takeFullScreen with callback as function and wait for timeout|");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and don't press capture , wait for 30 seconds");
                setExpected("The signature window should not hide automatically");
                delayForNineSeconds();
            });

            runs(function () {
                waitsFor(function () {
                    return readFlag;
                }, 'wait for Tester to read', 10000);

                runs(function () {
                    Rho.Signature.fileName = Rho.RhoFile.join(Rho.Application.databaseBlobFolder, 'VT299-036');
                    Rho.Signature.takeFullScreen({}, callbackImage);
                    delayForThirtySeconds();
                });

                waitsFor(function () {
                    return readFlag || sigCallbackFired;
                }, 'wait to callback to fire or timeout', 31000);
            });

            runs(function () {
                //Rho.Signature.hide();
                waitsFor(function () {
                    return document.getElementById("actResult").innerHTML != "init";
                }, "Timed out waiting for tester to respond", 300000);
                runs(function () {
                    expect("pass").toEqual(document.getElementById("actResult").innerHTML);
                });
            });
        });

    });
});	