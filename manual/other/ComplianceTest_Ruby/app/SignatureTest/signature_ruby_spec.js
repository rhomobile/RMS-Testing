describe("Signature Manual Test", function () {
    var timeout = false;
    var readFlag = false;
    var sigCallbackFired = false;
    var vectorCallbackFired = false;
    var nulldata;
    var preservedProperties;

    //Added to preserve the default values of signature
    function signature_init() {
        if (!isWindowsMobilePlatform()){
            Ruby.call('SignatureTest','signature_setprops?win=yes');
        } else {
            Ruby.call('SignatureTest','signature_setprops');
        }
    }

    signature_init();    

    describe("Signature Spec for Show and takeFullScreen ", function () {

        beforeEach(function () {
            timeout = false;
            readFlag = false;
            nulldata = "";
            document.getElementById("actResult").innerHTML = "init";
            // imageCallback(nulldata);
            // dataUriCallback(nulldata);
            callbackStatus(nulldata);
            callbackImgpath(nulldata);
            callbackDataURI(nulldata);
            callbackImg(nulldata);
            document.getElementById('sigdiv').innerHTML = '<img src="" id="capturedImage">';
        });

        afterEach(function () {
            if (!isWindowsMobilePlatform()){
                Ruby.call('SignatureTest','signature_setprop_afteach?win=yes')
            } else {
                Ruby.call('SignatureTest','signature_setprop_afteach')
            }
        });

        it("VT299-001 | Call takeFullScreen with callback as function and returned status OK |", function () {

            runs(function () {
                setObjective("VT299-001 |Call takeFullScreen with callback as function and returned status OK|");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and press capture after drawing any signature on signature area");
                setExpected("The returned status should be OK and path of the captured signature image should be returned (Image should be rendered on page)");
            });

            _result.waitToRunTest();

            runs(function () {
                Ruby.call('SignatureTest','signature_fullscr?vtid=VT299-001');
            });

            _result.waitForResponse();

        });

        it("VT299-002 | Call takeFullScreen with callback as function and returned status cancel |", function () {

            runs(function () {
                setObjective("VT299-002 |Call takeFullScreen with callback as function and returned status cancel |");
                setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and press cancel after drawing any signature on signature area");
                setExpected("The returned status should be cancel and no path of the signature image should be returned");
            });

            _result.waitToRunTest();

            runs(function () {
                Ruby.call('SignatureTest','signature_fullscr?vtid=VT299-002');
            });

            _result.waitForResponse();

        });

        it("VT299-010 | Call capture with callback as anonymous function |", function () {

            runs(function () {
                setObjective("VT299-010 |Call capture with callback as anonymous function|");
                setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for");
                setExpected("The returned status should be OK and path of the captured signature image should be returned (Image should be rendered on page)");
                
            });

            _result.waitToRunTest();

            runs(function () {
                Ruby.call('SignatureTest','signature_show?vtid=VT299-010');
                
                setTimeout(function() {
                    timeout = true;
                }, 5000);
            });

            waitsFor(function(){
                if(timeout == true){
                    return true;
                }
            }, 'Wait for 1 sec ajax call to happen', 6000);

            runs(function () {
                Ruby.call('SignatureTest','signature_capture');
            });

            _result.waitForResponse();

            runs(function () {
                Ruby.call('SignatureTest','signature_hide');
            });            

        });

        it("VT299-011 | Call capture and call clear |", function () {

            runs(function () {
                setObjective("VT299-011 |Call capture and call clear|");
                setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for clear to call");
                setExpected("The signature area should be clear after clear has been called and a clear signature image should be saved at returned path");
            });

            _result.waitToRunTest();

            runs(function () {
                Ruby.call('SignatureTest','signature_show?vtid=VT299-011');

                setTimeout(function() {
                    timeout = true;
                }, 5000);
            });

            waitsFor(function(){
                if(timeout == true){
                    return true;
                }
            }, 'Wait for 1 sec ajax call to happen', 6000);

            runs(function () {
                timeout = false;
                Ruby.call('SignatureTest','signature_clear');

                setTimeout(function() {
                    timeout = true;
                }, 2000);
            });

            waitsFor(function(){
                if(timeout == true){
                    return true;
                }
            }, 'Wait for 1 sec ajax call to happen', 3000);
            
            runs(function () {
                Ruby.call('SignatureTest','signature_capture');
            });

            _result.waitForResponse();

            runs(function () {
                Ruby.call('SignatureTest','signature_hide');
            });            
            
        });
    
        it("VT299-015 | Call takeFullScreen with setting compressionFormat as jpg, fileName as VT299-015 and outputFormat as Image |", function () {

            runs(function () {
                setObjective("VT299-015 |Call takeFullScreen with setting compressionFormat as jpg, fileName as VT299-015 and outputFormat as Image|");
                setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
                setExpected("The format of saved image should be jpg with name VT299-015 and Image should be saved at retrurned path (saved image is rendered for validation)");
            });

            _result.waitToRunTest();

            runs(function () {
                Ruby.call('SignatureTest','signature_fullscr_optImage?vtid=VT299-015&const=jpg');
            });

            _result.waitForResponse();

            runs(function () {
                Ruby.call('SignatureTest','signature_hide');
            });            

        });

        if (isAnyButApplePlatform()) 
        {
            it("VT299-018 | Call takeFullScreen with compressionFormat as jpg, fileName as VT299-018 and outputFormat as dataUri |", function () {

                runs(function () {
                    setObjective("VT299-018 |Call takeFullScreen with compressionFormat as jpg, fileName as VT299-018 and outputFormat as dataUri|");
                    setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
                    setExpected("The signature should be rendered in page as callback returns datauri (no path of image) and image should be black signature area with white normal pen");
                });

                _result.waitToRunTest();

                runs(function () {
                    Ruby.call('SignatureTest','signature_fullscr_optUri?vtid=VT299-018&const=jpg');
                });

                _result.waitForResponse();

                runs(function () {
                    Ruby.call('SignatureTest','signature_hide');
                });                
            });
        }

        it("VT299-019 | Call show with bgColor as #FFFF8C00 (ARGB), penColor as #00FF00(RGB), penWidth as 1, and callback |", function () {

            runs(function () {
                setObjective("VT299-019 |Call show with bgColor as #FFFF8C00 (ARGB), penColor as #00FF00(RGB), penWidth as 1, and callback|");
                setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
                setExpected("The signature area should be default area of color darkOrange and pen as green with thin width penline and signature should be saved at return path with name VT299-019.jpg (saved image is rendered for validation)");
            });

            _result.waitToRunTest();

            runs(function () {
                Ruby.call('SignatureTest','signature_show_opt?vtid=VT299-019&const=jpg');

                setTimeout(function() {
                    timeout = true;
                }, 5000);
            });

            waitsFor(function(){
                if(timeout == true){
                    return true;
                }
            }, 'Wait for 1 sec ajax call to happen', 6000);

            runs(function () {
                Ruby.call('SignatureTest','signature_capture');
            });

            _result.waitForResponse();

            runs(function () {
                Ruby.call('SignatureTest','signature_hide');
            });

        });

        if (isAnyButApplePlatform()) 
        {
            it("VT299-023 | Call show after setting all properties and outputFormat as dataURI|", function () {

                runs(function () {
                    setObjective("VT299-023 |Call show after setting all properties and outputFormat as dataURI|");
                    setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
                    setExpected("The signature area should be nonfullscreen area with border of specified size  left as 15, top as 60, width as 200 and height as 150 with penline width as 5(thickest than prev test), signature should be rendered in page as callback returns the dataURI, no path should retrun");
                });

                _result.waitToRunTest();

                runs(function () {
                    Ruby.call('SignatureTest','signature_set_allprops');

                    setTimeout(function() {
                        Ruby.call('SignatureTest','signature_show?vtid=VT299-023');
                    }, 1000);                    
                    
                    setTimeout(function() {
                        timeout = true;
                    }, 6000);
                });

                waitsFor(function(){
                    if(timeout == true){
                        return true;
                    }
                }, 'Wait for 1 sec ajax call to happen', 7000);

                // giving delay of a sec to capture bec in android applying all props takes a bit of time..
                runs(function () {
                    Ruby.call('SignatureTest','signature_capture_datauri');
                });

                _result.waitForResponse();

                runs(function () {
                    Ruby.call('SignatureTest','signature_hide');
                });                

            });
        }

    });

});	