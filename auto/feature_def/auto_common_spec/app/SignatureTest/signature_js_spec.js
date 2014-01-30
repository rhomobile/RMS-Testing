describe('Signature specs', function () {
    var preservedProperties;
    var getPropertiesData
    var getPropertyData;
    var callbackStatus;
    var flag;
    var callbackWasCalled;
    var callbackGetProperties = function (data) {
        getPropertiesData = JSON.stringify(data);
        callbackStatus = true;
    }
    var callbackGetProperty = function (data) {
        getPropertyData = data;
        callbackStatus = true;
    }


    beforeEach(function () {
        preservedProperties = {};
        preservedProperties.bgColor = Rho.Signature.bgColor;
        preservedProperties.compressionFormat = Rho.Signature.compressionFormat;
        preservedProperties.fileName = Rho.Signature.fileName;
        preservedProperties.outputFormat = Rho.Signature.outputFormat;
        preservedProperties.penColor = Rho.Signature.penColor;
        preservedProperties.penWidth = Rho.Signature.penWidth;
        preservedProperties.border = Rho.Signature.border;
        preservedProperties.height = Rho.Signature.height;
        preservedProperties.left = Rho.Signature.left;
        preservedProperties.top = Rho.Signature.top;
        preservedProperties.width = Rho.Signature.width;

        flag = false;
        callbackWasCalled = false;
        getPropertiesData = '';
        getPropertyData = '';
        callbackStatus = false;

    });

    afterEach(function () {
        Rho.Signature.bgColor = preservedProperties.bgColor;
        Rho.Signature.compressionFormat = preservedProperties.compressionFormat;
        Rho.Signature.fileName = preservedProperties.fileName;
        Rho.Signature.outputFormat = preservedProperties.outputFormat;
        Rho.Signature.penColor = preservedProperties.penColor;
        Rho.Signature.penWidth = preservedProperties.penWidth;
        Rho.Signature.border = preservedProperties.border;
        Rho.Signature.height = preservedProperties.height;
        Rho.Signature.left = preservedProperties.left;
        Rho.Signature.top = preservedProperties.top;
        Rho.Signature.width = preservedProperties.width;

        Rho.Signature.hide();
    });

    it("Default value of bgColor should be '#FFFFFFFF'", function () {
        expect(Rho.Signature.bgColor).toEqual('#FFFFFFFF');
    });

    it("Default value of compressionFormat should be 'png'", function () {
        expect(Rho.Signature.compressionFormat).toEqual('png');
    });

    it("Default value of fileName should be 'signature'", function () {
        expect(Rho.Signature.fileName).toEqual('signature');
    });

    it("Default value of outputFormat should be 'image'", function () {
        expect(Rho.Signature.outputFormat).toEqual('image');
    });

    it("Default value of penColor should be '#FF000000'", function () {
        expect(Rho.Signature.penColor).toEqual('#FF000000');
    });

    it("Default value of penWidth should be 3", function () {
        expect(Rho.Signature.penWidth).toEqual(3);
    });

    it("Default value of border should be true", function () {
        expect(Rho.Signature.border).toEqual(true);
    });

    it("Default value of height should be 150", function () {
        expect(Rho.Signature.height).toEqual(150);
    });

    it("Default value of left should be 15", function () {
        expect(Rho.Signature.left).toEqual(15);
    });

    it("Default value of top should be 60", function () {
        expect(Rho.Signature.top).toEqual(60);
    });

    it("Default value of width should be 200", function () {
        expect(Rho.Signature.width).toEqual(200);
    });


    describe('Signature specs with show() and takeFullScreen() functions', function () {

        afterEach(function () {
            Rho.Signature.hide();
        });

        it("VT299-2006 | call show() with all string |", function () {

            Rho.Signature.show({bgColor: '#FF0000', border: 'true', penWidth: '20'});

            setTimeout(function () {
                flag = true
            }, 1000);
            waitsFor(function () {
                return flag;
            }, "Waiting to hide", 2000);

            runs(function () {
                expect(Rho.Signature.bgColor).toEqual('#FF0000');
                expect(Rho.Signature.border).toEqual(true);
                expect(Rho.Signature.penWidth).toEqual(20);
            });
        });

        it("VT299-2007 | call takeFullScreen() with all string |", function () {

            Rho.Signature.takeFullScreen({'bgColor': '#FF0000', 'outputFormat': 'image', 'penWidth': '1'}, sigCallback);

            setTimeout(function () {
                flag = true
            }, 1000);
            waitsFor(function () {
                return flag;
            }, "Waiting to hide", 2000);

            runs(function () {
                expect(Rho.Signature.bgColor).toEqual('#FF0000');
                expect(Rho.Signature.border).toEqual(true);
                expect(Rho.Signature.penWidth).toEqual(1);
            });
        });

        it("VT299-2010 | Call takeFullScreen()  to check default values of all property |", function () {

            Rho.Signature.takeFullScreen({}, function (data) {
            });

            setTimeout(function () {
                flag = true
            }, 1000);
            waitsFor(function () {
                return flag;
            }, "Waiting to hide", 2000);

            runs(function () {
                expect(Rho.Signature.bgColor).toEqual('#FFFFFFFF');
                expect(Rho.Signature.compressionFormat).toEqual('png');
                expect(Rho.Signature.fileName).toEqual('signature');
                expect(Rho.Signature.outputFormat).toEqual('image');
                expect(Rho.Signature.penColor).toEqual('#FF000000');
                expect(Rho.Signature.penWidth).toEqual(3);
            });
        });

        it("VT299-2011 | call show() to check default values of all property |", function () {

            Rho.Signature.show();

            setTimeout(function () {
                flag = true
            }, 1000);
            waitsFor(function () {
                return flag;
            }, "Waiting to hide", 2000);

            runs(function () {
                expect(Rho.Signature.bgColor).toEqual('#FFFFFFFF');
                expect(Rho.Signature.compressionFormat).toEqual('png');
                expect(Rho.Signature.fileName).toEqual('signature');
                expect(Rho.Signature.outputFormat).toEqual('image');
                expect(Rho.Signature.penColor).toEqual('#FF000000');
                expect(Rho.Signature.penWidth).toEqual(3);
                expect(Rho.Signature.border).toEqual(true);
                expect(Rho.Signature.height).toEqual(150);
                expect(Rho.Signature.left).toEqual(15);
                expect(Rho.Signature.top).toEqual(60);
                expect(Rho.Signature.width).toEqual(200);
            });

        });

        it("VT299-2008| call show() with required data types |", function () {

            Rho.Signature.show({'bgColor': '#FF0000', 'border': false, 'penWidth': 1});

            setTimeout(function () {
                flag = true
            }, 1000);
            waitsFor(function () {
                return flag;
            }, "Waiting to hide", 2000);

            runs(function () {
                expect(Rho.Signature.bgColor).toEqual('#FF0000');
                expect(Rho.Signature.border).toEqual(false);
                expect(Rho.Signature.penWidth).toEqual(1);
            });
        });

    });

    var arrSIGshow = getApplicablePropertiesShow();
    var arrSIGtake = getApplicablePropertiesFullScreen();
    (function (showSpecArray, takeFullScreenSpecArray) {

        //propertybag is not supported in signature
        xdescribe("set/get Property and set/get properties with all combination", function () {


            xit("VT299-2001 | call getProperties() with sync callback and hash |", function () {

                runs(function () {
                    Rho.Signature.setProperties({'bgColor': '#FF0000', 'border': 'true', 'penWidth': '2'});
                    Rho.Signature.getProperties(['bgColor', 'border', 'penWidth'], callbackGetProperties);
                });

                waitsFor(function () {
                    return callbackStatus;
                });

                runs(function () {
                    expect(getPropertiesData).toContain('#FF0000');
                    expect(getPropertiesData).toContain('true');
                    expect(getPropertiesData).toContain('2');
                });
            });
            xit("VT299-2002 | call getProperties() with anonymous callback and hash |", function () {

                runs(function () {
                    Rho.Signature.setProperties({'bgColor': '#FFFF00', 'border': false, 'penWidth': 1});
                    Rho.Signature.getProperties(['bgColor', 'border', 'penWidth'], function (data) {
                        getPropertiesData = JSON.stringify(data);
                        callbackStatus = true;
                    });
                });

                waitsFor(function () {
                    return callbackStatus;
                });

                runs(function () {
                    expect(getPropertiesData).toContain('#FFFF00');
                    expect(getPropertiesData).toContain(false);
                    expect(getPropertiesData).toContain(1);
                });
            });
            xit("VT299-2000 | call getProperties() without callback |", function () {

                //Rho.Signature.clearAllProperties();
                Rho.Signature.setProperties({'bgColor': '#FFFFFF', 'border': true, 'penWidth': 3});
                var data = Rho.Signature.getProperties(['compressionFormat', 'desiredHeight', 'outputFormat']);
                getPropertiesData = JSON.stringify(data);
                expect(getPropertiesData).toContain('#FFFFFF');
                expect(getPropertiesData).toContain(true);
                expect(getPropertiesData).toContain(3);
            });
            xit("VT299-2004 | call getProperty() with sync callback and property |", function () {

                runs(function () {
                    Rho.Signature.setProperty('compressionFormat', 'jpg');
                    Rho.Signature.getProperty("compressionFormat", callbackGetProperty);
                });

                waitsFor(function () {
                    return callbackStatus;
                });

                runs(function () {
                    expect(getPropertyData).toEqual('jpg');
                });
            });
            xit("VT299-2005 | call getProperty() with anonymous callback and property |", function () {

                runs(function () {
                    Rho.Signature.setProperty('penWidth', '5');
                    Rho.Signature.getProperty('penWidth', function (data) {
                        getPropertyData = data;
                        callbackStatus = true;
                    });
                });

                waitsFor(function () {
                    return callbackStatus;
                });

                runs(function () {
                    expect(getPropertyData).toEqual('5');
                });
            });
            xit("VT299-2003 | call getProperty() without callback |", function () {

                Rho.Signature.setProperty('penWidth', 4);
                var data = Rho.Signature.getProperty("penWidth");
                getPropertyData = data;
                expect(getPropertyData).toEqual(4);
            });
        });

        /*
         //property bag is not supported in Signature
         describe("Signature property using set/getProperty", function() {

         for (var i=0;i<showSpecArray.length;i++){

         (function(idx){
         it(showSpecArray[idx]['testName'], function() {

         Rho.Signature.setProperty(showSpecArray[idx]['propertyName'],showSpecArray[idx]['propertyValue']);
         var data = Rho.Signature.getProperty(showSpecArray[idx]['propertyName']);
         expect(data).toEqual(showSpecArray[idx]['expectedResult']);
         });

         })(i);
         }
         });

         describe("Signature property Using set/getProperties ", function() {

         for (var i=0;i<showSpecArray.length;i++){

         (function(idx){
         it(showSpecArray[idx]['testName'], function() {

         var propertyName = showSpecArray[idx]['propertyName'];
         var propertyValue = showSpecArray[idx]['propertyValue'];

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

         Rho.Signature.setProperties(objProperty);

         var strGetProperty = '["'+showSpecArray[idx]['propertyName']+'"]';
         var objGetProperty = JSON.parse(strGetProperty);

         var data = Rho.Signature.getProperties(objGetProperty);


         data = data[showSpecArray[idx]['propertyName']];
         expect(data).toEqual(showSpecArray[idx]['expectedResult']);

         });
         })(i);
         }
         });
         */

        describe("Signature property setting Directly", function () {
            for (var i = 0; i < showSpecArray.length; i++) {
                (function (idx) {
                    it(showSpecArray[idx]['testName'], function () {
                        var propertyName = showSpecArray[idx]['propertyName'];
                        var propertyValue = showSpecArray[idx]['propertyValue'];
                        try {
                            if (propertyValue == 'true')
                                eval(Rho.Signature)[propertyName] = true;
                            else if (propertyValue == 'false')
                                eval(Rho.Signature)[propertyName] = false;
                            else if (!isNaN(propertyValue)) {
                                propertyValue = parseInt(propertyValue);
                                eval(Rho.Signature)[propertyName] = propertyValue;
                            }
                            else {
                                eval(Rho.Signature)[propertyName] = propertyValue;
                            }

                            var data = eval(Rho.Signature)[showSpecArray[idx]['propertyName']];
                        }
                        catch (err) {
                            var data = err.message;
                        }
                        expect(data).toEqual(showSpecArray[idx]['expectedResult']);
                    });
                })(i)
            }
        });

        describe("Signature property set using show()", function () {
            for (var i = 0; i < showSpecArray.length; i++) {
                (function (idx) {
                    it(showSpecArray[idx]['testName'], function () {
                        var propertyName = showSpecArray[idx]['propertyName'];
                        var propertyValue = showSpecArray[idx]['propertyValue'];
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

                        Rho.Signature.show(objProperty);

                        setTimeout(function () {
                            flag = true
                        }, ENABLE_TIMEOUT_VALUE);
                        waitsFor(function () {
                            return flag;
                        }, "Waiting for enable", 2000);

                        runs(function () {
                            var data = eval(Rho.Signature)[showSpecArray[idx]['propertyName']];
                            expect(data).toEqual(showSpecArray[idx]['expectedResult']);
                        });
                    });
                })(i);
            }
        });

        describe("Signature property set using takeFullScreen()", function () {
            for (var i = 0; i < takeFullScreenSpecArray.length; i++) {
                (function (idx) {
                it(takeFullScreenSpecArray[i]['testName'], function () {
                    var propertyName = takeFullScreenSpecArray[idx]['propertyName'];
                    var propertyValue = takeFullScreenSpecArray[idx]['propertyValue'];
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

                    Rho.Signature.takeFullScreen(objProperty, sigCallback);

                    setTimeout(function () {
                        flag = true
                    }, ENABLE_TIMEOUT_VALUE);
                    waitsFor(function () {
                        return flag;
                    }, "Waiting for enable", 2000);

                    runs(function () {
                        var data = eval(Rho.Signature)[takeFullScreenSpecArray[idx]['propertyName']];
                        expect(data).toEqual(takeFullScreenSpecArray[idx]['expectedResult']);
                    });
                });
                })(i);
            }
        });

    })(arrSIGshow, arrSIGtake);


});

