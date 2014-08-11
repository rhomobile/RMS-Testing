describe('Signature specs', function () {
    var defaultBorderValue = EB.System.platform != 'APPLE';

    var preservedProperties;
    var getPropertiesData
    var getPropertyData;
    var callbackStatus;
    var flag;
    var callbackWasCalled;
    var delayTimeout;
    var delayHideTimeout;
    
    var callbackGetProperties = function (data) {
        getPropertiesData = JSON.stringify(data);
        callbackStatus = true;
    }
    var callbackGetProperty = function (data) {
        getPropertyData = data;
        callbackStatus = true;
    }

    function delayCall() {
        flag = false;
        delayTimeout = setTimeout(function() {
            flag = true;
        }, ENABLE_TIMEOUT_VALUE);
    }

    function delayHideCall() {
        flag = false;
        delayHideTimeout = setTimeout(function() {
            flag = true;
        }, HIDE_TIMEOUT_VALUE);
    }

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


    beforeEach(function () {

        flag = false;
        callbackWasCalled = false;
        getPropertiesData = '';
        getPropertyData = '';
        callbackStatus = false;

    });

    afterEach(function () {

        if(delayTimeout)
        {
            window.clearTimeout(delayTimeout);
            delayTimeout = null;
        } 

        if(delayHideTimeout)
        {
            window.clearTimeout(delayHideTimeout);
            delayHideTimeout = null;
        }   

        //EB.Signature.hide();
    });

    describe('Signature specs with default value of properties', function () {

        it("Default value of bgColor should be '#FFFFFFFF'", function () {
            expect(EB.Signature.bgColor).toEqual('#FFFFFFFF');
        });

        it("Default value of compressionFormat should be 'png'", function () {
            expect(EB.Signature.compressionFormat).toEqual('png');
        });

        it("Default value of fileName should be 'signature'", function () {
            expect(EB.Signature.fileName).toEqual('signature');
        });

        it("Default value of outputFormat should be 'image'", function () {
            expect(EB.Signature.outputFormat).toEqual('image');
        });

        it("Default value of penColor should be '#FF000000'", function () {
            expect(EB.Signature.penColor).toEqual('#FF000000');
        });

        it("Default value of penWidth should be 3", function () {
            expect(EB.Signature.penWidth).toEqual(3);
        });

        it("Default value of border should be " + defaultBorderValue, function () {
            expect(EB.Signature.border).toEqual(defaultBorderValue);
        });

        it("Default value of height should be 150", function () {
            expect(EB.Signature.height).toEqual(150);
        });

        it("Default value of left should be 15", function () {
            expect(EB.Signature.left).toEqual(15);
        });

        it("Default value of top should be 60", function () {
            expect(EB.Signature.top).toEqual(60);
        });

        it("Default value of width should be 200", function () {
            expect(EB.Signature.width).toEqual(200);
        });
    });

    describe('Signature specs with show() and takeFullScreen() functions', function () {

        afterEach(function () {            
            EB.Signature.hide();

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

        it("VT299-2006 | call show() with all string |", function () {

            EB.Signature.show({bgColor: '#FF0000', border: 'true', penWidth: '2'});

            delayCall();
            waitsFor(function() {
                return flag;
            }, "delay before expect", ENABLE_TIMEOUT_VALUE1);

            runs(function () {
                expect(EB.Signature.bgColor).toEqual('#FF0000');
                expect(EB.Signature.border).toEqual(defaultBorderValue);
                expect(EB.Signature.penWidth).toEqual(2);
            });
        });

        it("VT299-2007 | call takeFullScreen() with all string |", function () {
                    
            runs(function() {
                delayHideCall();
            });

            waitsFor(function() {
                return flag;
            }, "delay before expect", HIDE_TIMEOUT_VALUE1);

            runs(function() {
                EB.Signature.takeFullScreen({'bgColor': '#FF0000', 'outputFormat': 'image', 'penWidth': '1'}, sigCallback);
                delayCall();
            });

            waitsFor(function() {
                return flag;
            }, "delay before expect", ENABLE_TIMEOUT_VALUE1);

            runs(function() {
                expect(EB.Signature.bgColor).toEqual('#FF0000');
                expect(EB.Signature.border).toEqual(defaultBorderValue);
                expect(EB.Signature.outputFormat).toEqual('image');
                expect(EB.Signature.penWidth).toEqual(1);
            });
        });

        it("VT299-2010 | Call takeFullScreen() to check default values of all property |", function () {

            runs(function() {
                delayHideCall();
            });

            waitsFor(function() {
                return flag;
            }, "delay before expect", HIDE_TIMEOUT_VALUE1);

            runs(function() {
                EB.Signature.takeFullScreen({}, function (data) {
                });
                delayCall();
            });

            waitsFor(function() {
                return flag;
            }, "delay before expect", ENABLE_TIMEOUT_VALUE1);

            runs(function() {
                expect(EB.Signature.bgColor).toEqual('#FFFFFFFF');
                expect(EB.Signature.compressionFormat).toEqual('png');
                expect(EB.Signature.fileName).toEqual('signature');
                expect(EB.Signature.outputFormat).toEqual('image');
                expect(EB.Signature.penColor).toEqual('#FF000000');
                expect(EB.Signature.penWidth).toEqual(3);
            });
        });

        it("VT299-2011 | call show() to check default values of all property |", function () {

            EB.Signature.show();

            delayCall();
            waitsFor(function() {
                return flag;
            }, "delay before expect", ENABLE_TIMEOUT_VALUE1);

            runs(function() {
                expect(EB.Signature.bgColor).toEqual('#FFFFFFFF');
                expect(EB.Signature.compressionFormat).toEqual('png');
                expect(EB.Signature.fileName).toEqual('signature');
                expect(EB.Signature.outputFormat).toEqual('image');
                expect(EB.Signature.penColor).toEqual('#FF000000');
                expect(EB.Signature.penWidth).toEqual(3);
                expect(EB.Signature.border).toEqual(defaultBorderValue);
                expect(EB.Signature.height).toEqual(150);
                expect(EB.Signature.left).toEqual(15);
                expect(EB.Signature.top).toEqual(60);
                expect(EB.Signature.width).toEqual(200);
            });
        });

        it("VT299-2008| call show() with required data types |", function () {

            EB.Signature.show({'bgColor': '#FF0000', 'border': false, 'penWidth': 1});

            delayCall();
            waitsFor(function() {
                return flag;
            }, "delay before expect", ENABLE_TIMEOUT_VALUE1);

            runs(function() {
                expect(EB.Signature.bgColor).toEqual('#FF0000');
                expect(EB.Signature.border).toEqual(false);
                expect(EB.Signature.penWidth).toEqual(1);
            });
        });

        it("VT299-2009 | call takeFullScreen() with required data types |", function() {

            runs(function() {
                delayHideCall();
            });
            waitsFor(function() {
                return flag;
            }, "delay before expect", HIDE_TIMEOUT_VALUE1);

            runs(function() {
                EB.Signature.takeFullScreen({'bgColor': '#FF0000', 'outputFormat': 'image', 'penWidth': 3}, sigCallback);
                delayCall();
            });

            waitsFor(function() {
                return flag;
            }, "delay before expect", ENABLE_TIMEOUT_VALUE1);

            runs(function() {
                expect(EB.Signature.bgColor).toEqual('#FF0000');
                expect(EB.Signature.outputFormat).toEqual('image');
                expect(EB.Signature.penWidth).toEqual(3);
            });
        });
    });

    var arrSIGshow = getApplicablePropertiesShow();
    var arrSIGtake = getApplicablePropertiesFullScreen();
    (function (showSpecArray, takeFullScreenSpecArray) {

        /*
        //propertybag is not supported in signatur
        xdescribe("set/get Property and set/get properties with all combination", function () {


            xit("VT299-2001 | call getProperties() with sync callback and hash |", function () {

                runs(function () {
                    EB.Signature.setProperties({'bgColor': '#FF0000', 'border': 'true', 'penWidth': '2'});
                    EB.Signature.getProperties(['bgColor', 'border', 'penWidth'], callbackGetProperties);
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
                    EB.Signature.setProperties({'bgColor': '#FFFF00', 'border': false, 'penWidth': 1});
                    EB.Signature.getProperties(['bgColor', 'border', 'penWidth'], function (data) {
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

                //EB.Signature.clearAllProperties();
                EB.Signature.setProperties({'bgColor': '#FFFFFF', 'border': true, 'penWidth': 3});
                var data = EB.Signature.getProperties(['compressionFormat', 'desiredHeight', 'outputFormat']);
                getPropertiesData = JSON.stringify(data);
                expect(getPropertiesData).toContain('#FFFFFF');
                expect(getPropertiesData).toContain(true);
                expect(getPropertiesData).toContain(3);
            });
            xit("VT299-2004 | call getProperty() with sync callback and property |", function () {

                runs(function () {
                    EB.Signature.setProperty('compressionFormat', 'jpg');
                    EB.Signature.getProperty("compressionFormat", callbackGetProperty);
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
                    EB.Signature.setProperty('penWidth', '5');
                    EB.Signature.getProperty('penWidth', function (data) {
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

                EB.Signature.setProperty('penWidth', 4);
                var data = EB.Signature.getProperty("penWidth");
                getPropertyData = data;
                expect(getPropertyData).toEqual(4);
            });
        });

        //property bag is not supported in Signature
        xdescribe("Signature property using set/getProperty", function() {

            for (var i=0;i<showSpecArray.length;i++){

                (function(idx){
                    it(showSpecArray[idx]['testName'], function() {

                            EB.Signature.setProperty(showSpecArray[idx]['propertyName'],showSpecArray[idx]['propertyValue']);
                            var data = EB.Signature.getProperty(showSpecArray[idx]['propertyName']);
                            expect(data).toEqual(showSpecArray[idx]['expectedResult']);
                    });

                })(i);
            }
        });

        xdescribe("Signature property Using set/getProperties ", function() {

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
                    
                        EB.Signature.setProperties(objProperty);

                        var strGetProperty = '["'+showSpecArray[idx]['propertyName']+'"]';
                        var objGetProperty = JSON.parse(strGetProperty);

                        var data = EB.Signature.getProperties(objGetProperty);

        
                        data = data[arrSignatureshow[idx]['propertyName']];
                        expect(data).toEqual(arrSignatureshow[idx]['expectedResult']);

                    });
                })(i);
            }
        });
        */

        describe("Signature property setting Directly", function () {
            afterEach(function () {
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

            for (var i = 0; i < showSpecArray.length; i++) {
                (function (idx) {
                    it(showSpecArray[idx]['testName'], function () {
                        var propertyName = showSpecArray[idx]['propertyName'];
                        var propertyValue = showSpecArray[idx]['propertyValue'];
                        try {
                            if (propertyValue == 'true')
                                eval(EB.Signature)[propertyName] = true;
                            else if (propertyValue == 'false')
                                eval(EB.Signature)[propertyName] = false;
                            else if (!isNaN(propertyValue)) {
                                propertyValue = parseInt(propertyValue);
                                eval(EB.Signature)[propertyName] = propertyValue;
                            }
                            else {
                                eval(EB.Signature)[propertyName] = propertyValue;
                            }

                            var data = eval(EB.Signature)[showSpecArray[idx]['propertyName']];
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

            afterEach(function() {
                EB.Signature.hide();

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

            for (var i = 0; i < showSpecArray.length; i++) {
                (function (idx) {
                    it(showSpecArray[idx]['testName'], function () {

                        runs(function() {                        
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

                            EB.Signature.show(objProperty);

                            delayCall();
                        });

                        waitsFor(function() {
                            return flag;
                        }, "delay before expect", ENABLE_TIMEOUT_VALUE1);

                        runs(function () {
                            var data = eval(EB.Signature)[showSpecArray[idx]['propertyName']];
                            expect(data).toEqual(showSpecArray[idx]['expectedResult']);
                        });
                    });
                })(i);
            }
        });

        describe("Signature property set using takeFullScreen()", function () {

            beforeEach(function() {
                flag = false;
            });

            afterEach(function() {
                EB.Signature.hide();

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

            for (var i = 0; i < takeFullScreenSpecArray.length; i++) {
                (function (idx) {
                it(takeFullScreenSpecArray[i]['testName'], function () {

                    runs(function() {
                        delayHideCall();
                    }); 

                    waitsFor(function() {
                        return flag;
                    }, "delay before expect", HIDE_TIMEOUT_VALUE1);

                    runs(function() {                   
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

                        EB.Signature.takeFullScreen(objProperty, sigCallback);

                        delayCall();
                    });

                    waitsFor(function() {
                        return flag;
                    }, "delay before expect", ENABLE_TIMEOUT_VALUE1);

                    runs(function() {
                        var data = eval(EB.Signature)[takeFullScreenSpecArray[idx]['propertyName']];
                        expect(data).toEqual(takeFullScreenSpecArray[idx]['expectedResult']);
                    });
                });
                })(i);
            }
        });
    })(arrSIGshow, arrSIGtake);
});

