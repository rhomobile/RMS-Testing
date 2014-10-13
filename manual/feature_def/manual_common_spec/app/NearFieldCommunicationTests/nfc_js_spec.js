describe('Near Field Communication Tests', function () {

    describe("Adapter specs without engine activation", function () {

        it("Property \"supported\" should return true if NFC supported on this device", function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addExpectation("Property \"supported\" should return \"true\" if device supports NFC feature");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            runs(function () {
                spec.addResult("Property \"supported\"", Rho.NFC.Adapter.supported);
                spec.displayResults();
                spec.waitForResponse();
            });
        });

        it("Property \"version\" should return version of the NFC engine", function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addPrecondition("Device with NFC feature");
            spec.addExpectation("Property \"version\" should return string with version of NFC engine");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            runs(function () {
                spec.addResult("Property \"version\"", Rho.NFC.Adapter.version);
                spec.displayResults();
                spec.waitForResponse();
            });
        });

        it("Method \"activate\" should activate NFC engine", function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addPrecondition("Device with NFC feature");
            spec.addExpectation("Result of method activate should be \"OK\" if NFC engine activated successfully");
            spec.addExpectation("Property \"isActive\" should return true if NFC engine activated successfully");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            runs(function () {
                Rho.NFC.Adapter.activate();
                spec.addResult("Property \"isActive\"", Rho.NFC.Adapter.isActive);
                spec.displayResults();
                spec.waitForResponse();
            });
        });

        it("Method \"stop\" should deactivate NFC engine", function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addPrecondition("Device with NFC feature");
            spec.addExpectation("Result of method stop should be \"OK\" if NFC engine deactivated successfully");
            spec.addExpectation("Property \"isActive\" should return false if NFC engine deactivated successfully");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            runs(function () {
                Rho.NFC.Adapter.activate();
                Rho.NFC.Adapter.stop();
                spec.addResult("Property \"isActive\"", Rho.NFC.Adapter.isActive);
                spec.displayResults();
                spec.waitForResponse();
            });
        });
    });

    describe("Adapter specs with engine activation", function () {

        beforeEach(function () {
            Rho.NFC.Adapter.activate();
        });

        afterEach(function () {
            Rho.NFC.Adapter.stop();
        });
        
        it("Method \"reset\" should reset configuration of NFC engine", function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addPrecondition("Device with NFC feature");
            spec.addExpectation("Value of \"pollingTimeout\" property should be 90");
            spec.addExpectation("Value of \"passKey\" property should be empty string");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            runs(function () {
                Rho.NFC.Adapter.pollingTimeout = 10;
                Rho.NFC.Adapter.passkey = "123456";
                Rho.NFC.Adapter.reset();
                spec.addResult("Property \"pollingTimeout\"", Rho.NFC.Adapter.pollingTimeout);
                spec.addResult("Property \"passKey\"", Rho.NFC.Adapter.passkey);
                spec.displayResults();
                spec.waitForResponse();
            });
        });

        it("Get device capabilities", function () {
            var flag;
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("Check get device information");
            spec.addPrecondition("Device with NFC feature");
            spec.addExpectation("Some capabilities will displayed");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            runs(function () {
                var capabilities = Rho.NFC.Adapter.getDeviceInfo();
                for (var property in capabilities) {
                    if (capabilities.hasOwnProperty(property)) {
                        spec.addResult(property, capabilities[property]);
                    }
                }
                flag = true;
            });

            waitsFor(function () {
                return flag;
            }, "WaitsFor timeout", 20000);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });

        });


        it("ConfigChangeHandler should fires on pollingTimeout changing", function () {
            var flag;
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("Check work of configChangeHandler and incoming arguments");
            spec.addExpectation("ConfigChangeHandler should be called and incoming arguments pollingTimeout should be equal 10 sec");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            Rho.NFC.Adapter.setConfigChangeHandler(function (anObject) {
                spec.addResult('PollingTimeout', anObject.pollingTimeout);
                flag = true;
            });

            runs(function () {
                flag = false;
                Rho.NFC.Adapter.pollingTimeout = 10;
            });

            waitsFor(function () {
                return flag;
            }, "WaitsFor timeout", 20000);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
        });

        it("ConfigChangeHandler should fires on passKey changing", function () {
            var flag;
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("Check work of passKey and incoming arguments");
            spec.addExpectation("ConfigChangeHandler should be called and incoming argument \"passKey\" should be equal \"123456\"");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            Rho.NFC.Adapter.setConfigChangeHandler(function (anObject) {
                spec.addResult("PassKey", anObject.passKey);
                flag = true;
            });

            runs(function () {
                flag = false;
                Rho.NFC.Adapter.passkey = "123456";
            });

            waitsFor(function () {
                return flag;
            }, "WaitsFor timeout", 20000);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
        });


        it("Pairing devices via Bluetooth", function () {

            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("Check connection to a bluetooth device to obtain device properties");
            spec.addPrecondition("Another bluetooth device");
            spec.addStep("Set bluetooth password as \"123456\"");
            spec.addStep("Place both devices close");
            spec.addExpectation("It should display name and MAC address of pairing device");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var flag;
            runs(function () {
                flag = false;
                Rho.NFC.Adapter.passkey = "123456";
                Rho.NFC.Adapter.btConnect(function (object) {
                    spec.addResult('Device name', object["btName"]);
                    spec.addResult('Device MAC address', object["btAddress"]);
                    flag = true;
            });

            waitsFor(function () {
                return flag;
            }, "WaitsFor timeout", 60000);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
            
            
            });
        });

        it('Tag reading', function () {
            var flag;
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("Check work of setTagDetectionHandler");
            spec.addPrecondition("Smart tag");
            spec.addStep('Press "Start test" button');
            spec.addStep('Touch tag to device');
            spec.addExpectation("Status should be OK and tag information should be displayed");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            Rho.NFC.Adapter.setTagDetectionHandler([], function (anObject) {
                try {
                    var tag = Rho.NFC.Tag.getTagById(anObject["tagId"]);
                    spec.addResult('Tag.ID', tag.ID);
                    spec.addResult('Tag.type', tag.type);
                    spec.addResult('Tag.serialNumber', tag.serialNumber);
                    spec.addResult('Tag.size', tag.size);
                    spec.addResult('Tag.freeSize', tag.freeSize);
                    spec.addResult('Tag.isReadOnly', tag.isReadOnly);
                    spec.addResult('Tag.isNdef', tag.isNdef);
                    spec.addResult('Tag.isConnected', tag.isConnected);
                }
                finally {
                    tag.close();
                }
                flag = true;
            });

            flag = false;
            waitsFor(function () {
                return flag;
            }, "WaitsFor timeout", 20000);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
        });

        it('Message reading', function () {
            var flag;
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("Check work of setMessageHandler");
            spec.addPrecondition("Smart tag");
            spec.addStep('Press "Run test" button');
            spec.addStep('Touch tag to device');
            spec.addExpectation("Status should be OK and message information should be displayed");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            Rho.NFC.Adapter.setMessageHandler(function (anObject) {
                var message = Rho.NFC.Message.getMessageById(anObject["messageId"]);
                try {
                    spec.addResult('Message.ID', message.ID);
                    message.getRecords().forEach(function (each) {
                        var record = each;
                        try {
                            spec.addResult('Record.ID', record.ID);
                            spec.addResult('Record.tnf', record.tnf);
                            spec.addResult('Record.recordId', record.recordId);
                            spec.addResult('Record.type', record.type);
                            spec.addResult('Record.typeName', record.typeName);
                            spec.addResult('Record.textLanguage', record.textLanguage);
                            spec.addResult('Record.textCharEncoding', record.textCharEncoding);
                            spec.addResult('Record.uriProtocol', record.uriProtocol);
                            spec.addResult('Record.payload', record.payload);
                        }
                        finally {
                            record.close();
                        }
                    });
                }
                finally {
                    message.close();
                }
                flag = true;
            });

            flag = false;
            waitsFor(function () {
                return flag;
            }, "WaitsFor timeout", 10000);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
        });
        
        it("Method \"exchangeData\" should exchnage data with Tag", function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("Check data exchange");
            spec.addPrecondition("Smart tag");
            spec.addStep('Press "Run test" button');
            spec.addStep('Touch tag to device');
            spec.addExpectation("Value of \"receiveData\" property should be displayed");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            
            var tagID;

            Rho.NFC.Adapter.setTagDetectionHandler([], function (anObject) {
                tagID = anObject["tagId"];
            });

            waitsFor(function () {
                return tagID != undefined;
            }, "WaitsFor timeout", 60000);

            runs(function () {
                var tag = Rho.NFC.Tag.getTagById(tagID);
                // if tag.isReadOnly == false
                //if (tag.isNdef == false) { tag.formatNDEF(); }
                tag.exchangeData("testdata");
                var result = tag.exchangeData("");
                spec.addResult("Property \"receiveData\"", result["receiveData"]);
                spec.displayResults();
                spec.waitForResponse();
            });
        });
        
        it("Method \"makeReadOnly\" should make Tag read only", function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("make Tag read only");
            spec.addPrecondition("Smart tag");
            spec.addStep('Press "Run test" button');
            spec.addStep('Touch tag to device');
            spec.addExpectation("Value of \"isReadOnly\" property should be displayed");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            
            var tagID;

            Rho.NFC.Adapter.setTagDetectionHandler([], function (anObject) {
                tagID = anObject["tagId"];
            });

            waitsFor(function () {
                return tagID != undefined;
            }, "WaitsFor timeout", 60000);

            runs(function () {
                var tag = Rho.NFC.Tag.getTagById(tagID);
                // if tag.isReadOnly == false
                //if(tag.isNdef == false) {tag.formatNDEF();}
                tag.makeReadOnly();
                spec.addResult("Property \"isReadOnly\"", tag.isReadOnly);
                spec.displayResults();
                spec.waitForResponse();
            });
        });

        it('Message writing', function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("Check message writing");
            spec.addPrecondition("Smart tag");
            spec.addStep('Press "Run test" button');
            spec.addStep('Touch tag to device');
            spec.addStep('Take out tag');
            spec.addStep('Touch tag to device');
            spec.addExpectation("Status should be OK and message information should be displayed");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            var tagID;

            Rho.NFC.Adapter.setTagDetectionHandler([], function (anObject) {
                tagID = anObject["tagId"];
            });

            waitsFor(function () {
                return tagID != undefined;
            }, "WaitsFor timeout", 60000);

            runs(function () {

                var tag = Rho.NFC.Tag.getTagById(tagID);
                // if tag.isReadOnly == false
                if(tag.isNdef == false) {tag.formatNDEF();}
                var message = Rho.NFC.Message.create();
                var record = Rho.NFC.Record.create();
                record.type = 1;
                record.textLanguage = "en";
                record.payload = "text";
                message.addRecord(record.ID);
                var messages = [];
                messages[0] = message.ID;
                tag.writeMessage(messages);

                record.close();
                message.close();
                tag.close();
                tagID = undefined;

                var messageHandlerFlag;
                Rho.NFC.Adapter.setMessageHandler(function (anObject) {
                    var message = Rho.NFC.Message.getMessageById(anObject["messageId"]);
                    try {
                        spec.addResult('Message.ID', message.ID);
                        message.getRecords().forEach(function (each) {
                            var record = each;
                            try {
                                spec.addResult('Record.ID', record.ID);
                                spec.addResult('Record.TNF', record.tnf);
                                spec.addResult('Record.type', record.type);
                                spec.addResult('Record.payload', record.payload);
                            }
                            finally {
                                record.close();
                            }
                        });
                    }
                    finally {
                        message.close();
                    }
                    messageHandlerFlag = true;
                });
            });
            
            messageHandlerFlag = false;
            waitsFor(function () {
                return messageHandlerFlag;
            }, "WaitsFor timeout", 60000);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
        });
        
        it('NFC - GENERAL - Detect only the passed supported Tags with the api \"setTagDetectionHandler\".', function(){
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("Check for detecting only supported tags with 'setTagDetectionHandler'.");
            spec.addPrecondition("Tap or Bring non supported NFC tag close the NFC device.");
            spec.addStep("Press 'Run Test' button");
            spec.addStep("Bring NFC tag of type other than 4.");
            spec.addExpectation("Test case passed, if you don't see 'setTagDetectionHandler callback = triggered'.");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var tagID;
            var supportedTags = [4];
            Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, function(tagInfo){
        		tagID = tagInfo["tagId"];
                spec.addResult("setTagDetectionHandler callback", "triggered");
                var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                spec.addResult("Tag type detected ", tagObj.type);
                tagObj.close();
                });
            waitsFor(function () {
                return tagID != undefined;
            },"WaitsFor timeout", 6000);
             runs(function () {
                spec.displayResults();
                spec.waitForResponse();
             });
        });
        it('NFC - ADAPTER - Stop NFC device which is already stopped:', function(){
        	var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal('NFC - ADAPTER - Check for multiple stop method');
            spec.addPrecondition("Ensure NFC device is activated.");
            spec.addSteps("Press 'RunTest' button to check multiple stop of NFC device.");
            spec.addExpectation('Check that No abnormal behavior is seen by performing multiple NFC device stop');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            runs(function(){
                spec.addResult("'isActive' before stop method " , Rho.NFC.Adapter.isActive);
                Rho.NFC.Adapter.stop();
                Rho.NFC.Adapter.stop();
                Rho.NFC.Adapter.stop();
                spec.addResult("'isActive'after 3 times of stop method ", Rho.NFC.Adapter.isActive);
                spec.displayResults();
                spec.waitForResponse();
            });
        });
        it('NFC - ADAPTER - Activate NFC device which is already Active', function(){
        	var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal('NFC - ADAPTER - Check for multiple activate method');
            spec.addStep("Press 'RunTest' button to check multiple stop of NFC device.");
            spec.addExpectation('Check that No abnormal behavior is seen by performing multiple NFC activate');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            runs(function(){
            	Rho.NFC.Adapter.stop();
                spec.addResult("'isActive' before activate method " , Rho.NFC.Adapter.isActive);
                Rho.NFC.Adapter.activate();
                Rho.NFC.Adapter.activate();
                Rho.NFC.Adapter.activate();
                spec.addResult("'isActive'after 3 times of activate method ", Rho.NFC.Adapter.isActive);
                spec.displayResults();
                spec.waitForResponse();
            });
        });
        it('NFC - ADAPTER - Get NFC details of the device before activating the NFC device', function(){
        	var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("NFC - ADAPTER - Get NFC Device info before NFC engine activation.");
            spec.addExpectation('Getting NFC Device info should not be possible before activating the NFC engine');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var errThrown;
            runs(function () {
                Rho.NFC.Adapter.stop();
                try{
                    var result = Rho.NFC.Adapter.getDeviceInfo();
                    spec.addResult("FirmwareVersion", result.firmwareVersion);
                    spec.addResult("Formating Tags", result.formattingTagsSupported);
                    spec.addResult("Operation Modes", result.operatingModesSupported);
                    spec.addResult("Tags Supported", result.tagsSupported);
                    spec.addResult("Write Protected Tags", result.writeProtectedTagsSupported);
                }
                catch(err){
        			errThrown = err;
        			alert(err);
        		}
        		waitsFor(function(){
        			return errThrown != undefined;
        		},"waitsFor timeout", 6000);
        		
        		expect(errThrown).toEqual("NFC stack is not activated");
            });
            
        });
        it('NFC - ADAPTER - Register for tag detection before activating the NFC device using "setTagDetectionHandler()"', function(){
            var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("NFC - ADAPTER - Register for tag detection before activating the NFC device using \"setTagDetectionHandler()\".");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Tap or Bring any supported NFC tag close the NFC device");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            Rho.NFC.Adapter.stop();
            var wait;
            var tagDetectionHandler = {
            	tagCB: function(tagInfo){
            		throw new Error("Tag detection Handler Triggered!")
                }
            };
            spyOn(tagDetectionHandler,'tagCB');
            var supportedTags = [];
            Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagDetectionHandler.tagCB);
            waitsFor(function(){
            	 setTimeout(function(){ wait=true;}, 5000);
            	 return wait == true;
            },"waitsFor timeout",7000);
            runs(function(){
            	expect(tagDetectionHandler.tagCB).not.toHaveBeenCalled();
            });
        });
        it('NFC - ADAPTER - Register for message detection before activating the NFC device using "setMessageHandler()"', function(){
            var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("NFC - ADAPTER - Register for message detection before activating the NFC device using \"setMessageHandler()\".");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Tap or Bring any supported NFC tag close the NFC device");
            spec.addExpectation('This is Semi- Auto case !.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            Rho.NFC.Adapter.stop();
            var wait;
            var messageHandler = {
            	messageCB: function(tagInfo){
            		throw new Error("Message Handler Triggered!");
                }
            };
            spyOn(messageHandler,'messageCB');
            var supportedTags = [];
            Rho.NFC.Adapter.setMessageHandler(messageHandler.messageCB);
            waitsFor(function(){
            	 setTimeout(function(){ wait=true;}, 5000);
            	 return wait == true;
            },"waitsFor timeout",7000);
            runs(function(){
            	expect(messageHandler.messageCB).not.toHaveBeenCalled();
            });
        });
        it('NFC - ADAPTER - Check for adapter properties before activating NFC device.', function(){
        	var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("NFC - ADAPTER - Check for adapter properties before activating NFC device.");
        	spec.addExpectation("Adapter properties should not be accessible before activating NFC engine.");
        	spec.displayScenario();
        	spec.waitForButtonPressing("Run test");
        	Rho.NFC.Adapter.stop();
        	var errThrown;
        	runs(function(){
        		try {
        			spec.addResult("supported", Rho.NFC.Adapter.supported);
            		spec.addResult("isActive", Rho.NFC.Adapter.isActive);
            		spec.addResult("version", Rho.NFC.Adapter.version);
            		spec.addResult("pollingTimeout", Rho.NFC.Adapter.pollingTimeout);
                    Rho.NFC.Adapter.passkey = "Failed_If_You_See_This";
                    spec.addResult("passkey", Rho.NFC.Adapter.passkey);
        		}
        		catch(err){
        			errThrown = err;
        		}
        		waitsFor(function(){
        			return errThrown != undefined;
        		},"waitsFor timeout", 6000);
        		
        		expect(errThrown).toEqual("NFC stack is not activated");
        	});
        });
        it('NFC - TAG - Format tag to NDEF format', function(){
        	var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("VTxxx_029 | NFC - TAG - Format tag to NDEF format");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Tap or Bring NFC tag close the the NFC device to make it NDEF format");
            spec.addExpectation('Check that tag is NDEF formated by checking the property isNdef set to true.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");
            var tagID;
            var supportedTags = [];
            Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, function(tagInfo){
                spec.addResult("setTagDetectionHandler callback", "triggered");
                var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                spec.addResult("'isNdef' status before formatNDEF", tagObj.isNdef);
                tagObj.formatNDEF();
                spec.addResult("'isNdef' status after formatNDEF", tagObj.isNdef);
                tagID = tagInfo["tagId"];
                });
            waitsFor(function () {
                return tagID != undefined;
            },"WaitsFor timeout", 6000);
             runs(function () {
                spec.displayResults();
                spec.waitForResponse();
             });
        });
        it('NFC - TAG - Write URI message to a NDEF formatted tag.', function(){
        	var spec = new ManualSpec(jasmine, window.document);
        	spec.addGoal("NFC - TAG - Write URI message to a NDEF formatted tag.");
        	spec.addStep("Press 'RunTest' button");
        	spec.addStep("Tap or Bring supported NFC tag close the the NFC device to write URI message in it.");
        	spec.addExpectation("Test case passed if URI message \"testdomain.com\" is displayed with the result");
        	spec.displayScenario();
        	spec.waitForButtonPressing("Run test");
        	var tagID;
        	Rho.NFC.Adapter.setTagDetectionHandler([], function(tagInfo){
        		var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                var msgID = [];
                var recID = "";
                var recordObj = Rho.NFC.Record.create();
                recID = recordObj.ID;
                recordObj.type = Rho.NFC.Record.NDEF_RTD_URI;
                recordObj.uriProtocol = 1;
                recordObj.payload = "testdomain.com";
                var messageObj = Rho.NFC.Message.create();
                msgID[0] = messageObj.ID;
                if(recID!=null || recID!=""){
                   messageObj.addRecord(recID);
                }
                tagObj.writeMessage(msgID);
                spec.addResult("Message written to Tag with message ID", msgID);
                tagID = tagInfo["tagId"];
        	});
        	waitsFor(function(){
        		return tagID != undefined;
        	}, "waitsFor timeout", 6000);
        	runs(function(){
        		spec.displayResults();
        		spec.waitForResponse();
        	});
        });
        it('NFC - GENERAL - Clear the message of the tag, by providing empty text in it.', function(){
        	var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("NFC - GENERAL - Try to clear the message of the tag, by providing empty text in it.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Tap or Bring NFC tag close the NFC device to write empty string in it.");
            spec.addExpectation('Message in the NFC tag is cleared.');
            spec.displayScenario();
            spec.waitForButtonPressing("Run tests");
            var tagID;
            var supportedTags = [];
            Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, function(tagInfo){
                var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                var msgID = [];
                var recID = "";
                var recordObj = Rho.NFC.Record.create();
                recID = recordObj.ID;
                recordObj.type = Rho.NFC.Record.NDEF_RTD_TEXT;
                recordObj.textLanguage = "en";
                recordObj.payload = "";
                var messageObj = Rho.NFC.Message.create();
                msgID[0] = messageObj.ID;
                if(recID!=null || recID!=""){
                    messageObj.addRecord(recID);
                }
                tagObj.writeMessage(msgID);
                spec.addResult("Message written to Tag with message ID", msgID);
                tagID = tagInfo["tagId"];
                });
            waitsFor(function(){
            	return tagID != undefined;
            },"waitsFor timeout", 6000);
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
        });
        it('NFC - GENERAL - Try to write oversized text message to a tag.', function(){
        	var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("NFC - GENERAL - Try to write oversized text message to a tag.");
            spec.addStep("Press 'RunTest' button");
            spec.addStep("Tap or Bring NFC tag close the NFC device to write oversized string in it.");
            spec.addExpectation('No abnormal behaviour is seen with the application');
            spec.displayScenario();
            spec.waitForButtonPressing("Run tests");
            var tagID;
            var supportedTags = [];
            Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, function(tagInfo){
                var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                var msgID = [];
                var recID = "";
                var recordObj = Rho.NFC.Record.create();
                recID = recordObj.ID;
                recordObj.type = Rho.NFC.Record.NDEF_RTD_TEXT;
                recordObj.textLanguage = "en";
                recordObj.payload = "This is test message.This is test message.This is test message.This is test message.This is test message.";
                var messageObj = Rho.NFC.Message.create();
                msgID[0] = messageObj.ID;
                if(recID!=null || recID!=""){
                    messageObj.addRecord(recID);
                }
                tagObj.writeMessage(msgID);
                spec.addResult("Message written to Tag with message ID", msgID);
                tagID = tagInfo["tagId"];
                });
            waitsFor(function(){
            	return tagID != undefined;
            },"waitsFor timeout", 6000);
            
			runs(function(){
				spec.displayResults();
				spec.waitForResponse();
			});
        });
});

});
