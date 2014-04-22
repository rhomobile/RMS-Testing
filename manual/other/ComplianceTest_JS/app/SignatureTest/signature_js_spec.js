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

        if (isAnyButApplePlatform()) 
        {
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

        if (isAnyButApplePlatform()) 
        {
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

 
    });
});	