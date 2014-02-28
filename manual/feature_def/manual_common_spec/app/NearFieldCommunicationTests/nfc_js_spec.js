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
                Rho.NFC.Adapter.passKey = "123456";
                Rho.NFC.Adapter.reset();
                spec.addResult("Property \"pollingTimeout\"", Rho.NFC.Adapter.pollingTimeout);
                spec.addResult("Property \"passKey\"", Rho.NFC.Adapter.passkey);
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
                Rho.NFC.Adapter.passKey = "123456";
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
                Rho.NFC.btConnect(function (object) {
                    spec.addResult('Device name', object.btName);
                    spec.addResult('Device MAC address', object.btAddress);
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
            spec.addStep('Press "Start test" button');
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

        it('Message writing', function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal("Check message writing");
            spec.addPrecondition("Smart tag");
            spec.addStep('Press "Writing tag" button and touch tag to device');
            spec.addStep('Press "Reading tag" button and touch tag to device');
            spec.addExpectation("Status should be OK and message information should be displayed");
            spec.displayScenario();
            spec.waitForButtonPressing("Writing tag");

            var tagID;

            Rho.NFC.Adapter.setTagDetectionHandler([], function (anObject) {
                tagID = anObject["tagId"];
            });

            waitsFor(function () {
                return tagID != undefined;
            }, "WaitsFor timeout", 60000);

            runs(function () {

                var tag = Rho.NFC.Tag.getTagById(tagID);
                if(tag.isNdef == false) {tag.formatNDEF();}
                var message = Rho.NFC.Message.create();
                var record = Rho.NFC.Record.create();
                record.type = 1;
                record.textLanguage = "en";
                record.payload = "some text";
                message.addRecord(record.ID);
                var messages;
                messages[0] = message.ID;
                tag.writeMessage(messages);

                record.close();
                message.close();
                tag.close();
                tagID = undefined;
            });

            runs(function () {
                tagID = undefined;
                spec.waitForButtonPressing("Reading tag");
                var messageHandlerFlag;
                Rho.NFC.Adapter.setMessageHandler(function (anObject) {
                    spec.addResult('Status', anObject.status);
                    var message = Rho.NFC.Message.getMessageById(anObject.messageID);
                    try {
                        spec.addResult('Message.ID', message.ID);
                        message.getRecords().forEach(function (each) {
                            var record = Rho.NFC.Record.getRecordById(each);
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

                messageHandlerFlag = false;
            });
            waitsFor(function () {
                return messageHandlerFlag;
            }, "WaitsFor timeout", 60000);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
        });


    });
})
;
