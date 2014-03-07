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

 
    });
});	