describe('Near Field Communication Tests', function () {

    describe("Adapter specs for basic properties and", function () {

        it('Property \"supported\" should return true if NFC supported on this device', function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addExpectation("Property \"supported\" should return \"true\" if device supports NFC feature");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            spec.addResult("Property \"supported\"", Rho.NFC.Adapter.supported);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
        });

        it('Property \"version\" should return version of the NFC engine', function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addPrecondition("Device with NFC feature");
            spec.addExpectation("Property \"version\" should return string with version of NFC engine");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            spec.addResult("Property \"version\"", Rho.NFC.Adapter.version);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
        });

        it('Method \"activate\" should activate NFC engine', function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addPrecondition("Device with NFC feature");
            spec.addExpectation("Result of method activate should be \"OK\" if NFC engine activated successfully");
            spec.addExpectation("Property \"isActive\" should return true if NFC engine activated successfully");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            spec.addResult("Result of executing method \"activate\"", Rho.NFC.Adapter.activate());
            spec.addResult("Property \"isActive\"", Rho.NFC.Adapter.isActive);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
        });

        it('Method \"stop\" should deactivate NFC engine', function () {
            var spec = new ManualSpec(jasmine, window.document);
            spec.addGoal(jasmine.getEnv().currentSpec.description);
            spec.addPrecondition("Device with NFC feature");
            spec.addExpectation("Result of method stop should be \"OK\" if NFC engine deactivated successfully");
            spec.addExpectation("Property \"isActive\" should return false if NFC engine deactivated successfully");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            Rho.NFC.Adapter.activate();
            spec.addResult("Result of executing method \"stop\"", Rho.NFC.Adapter.stop());
            spec.addResult("Property \"isActive\"", Rho.NFC.Adapter.isActive);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
        });
    });

    describe('Adapter specs for handlers', function () {

        beforeEach(function () {
            Rho.NFC.Adapter.activate();
        });

        beforeEach(function () {
            Rho.NFC.Adapter.stop();
        });

        it('Tag reading', function () {
            var flag;
            var spec = new ManualSpec();
            spec.addGoal("Check work of setTagDetectionHandler");
            spec.addPrecondition("Smart tag");
            spec.addStep('Press "Start test" button');
            spec.addStep('Touch tag to device');
            spec.addExpectation("Status should be OK and tag information should be displayed");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            Rho.NFC.Adapter.setTagDetectionHandler([], function (status, tagID) {
                spec.addResult('Status', status);
                var tag = Rho.NFC.Tag.getTagById(tagID);
                try {
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
            }, "WaitsFor timeout", 10000);

            runs(function () {
                spec.displayResults();
                spec.waitForResponse();
            });
        });

        it('Message reading', function () {
            var flag;
            var spec = new ManualSpec();
            spec.addGoal("Check work of setMessageHandler");
            spec.addPrecondition("Smart tag");
            spec.addStep('Press "Start test" button');
            spec.addStep('Touch tag to device');
            spec.addExpectation("Status should be OK and message information should be displayed");
            spec.displayScenario();
            spec.waitForButtonPressing("Run test");

            Rho.NFC.Adapter.setMessageHandler(0, [], function (status, messageID) {
                spec.addResult('Status', status);
                var message = Rho.NFC.Message.getMeessageById(messageID);
                try {
                    spec.addResult('Message.ID', message.ID);
                    message.getRecords().forEach(function (each) {
                        var record = Rho.NFC.Record.getRecordById(each);
                        try {
                            spec.addResult('Record.ID', record.ID);
                            spec.addResult('Record.TNF', record.TNF);
                            spec.addResult('Record.type', record.type);
                            spec.addResult('Record.payloadAsString', record.getPayloadAsString());
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
            var spec = new ManualSpec();
            spec.addGoal("Check message writing");
            spec.addPrecondition("Smart tag");
            spec.addStep('Press "Reading tag" button and touch tag to device');
            spec.addStep('Press "Writing tag" button and touch tag to device');
            spec.addStep('Press "Reading tag" button and touch tag to device');
            spec.addExpectation("Status should be OK and message information should be displayed");
            spec.displayScenario();
            spec.waitForButtonPressing("Reading tag");

            var tagID;

            Rho.NFC.Adapter.setTagDetectionHandler([], function (status, ID) {
                tagID = ID;
            });

            waitsFor(function () {
                return tagID != undefined;
            }, "WaitsFor timeout", 60000);

            runs(function () {

                var tag = Rho.NFC.Tag.getTagById(tagID);
                var message = Rho.NFC.Message.create();
                var record = Rho.NFC.Record.createText("en", "Some text");
                message.addRecord(record.ID);
                tag.formatNDEF();
                tag.writeMessage(message.ID);
                tag.transceive();

                record.close();
                message.close();

                tag.close();
                tagID = undefined;
                spec.waitForButtonPressing("Writing tag");
            });

            waitsFor(function () {
                return tagID != undefined;
            }, "WaitsFor timeout", 60000);

            runs(function () {
                tagID = undefined;
                spec.waitForButtonPressing("Reading tag");
                var messageHandlerFlag;
                Rho.NFC.Adapter.setMessageHandler(0, [], function (status, messageID) {
                    spec.addResult('Status', status);
                    var message = Rho.NFC.Message.getMeessageById(messageID);
                    try {
                        spec.addResult('Message.ID', message.ID);
                        message.getRecords().forEach(function (each) {
                            var record = Rho.NFC.Record.getRecordById(each);
                            try {
                                spec.addResult('Record.ID', record.ID);
                                spec.addResult('Record.TNF', record.TNF);
                                spec.addResult('Record.type', record.type);
                                spec.addResult('Record.payloadAsString', record.getPayloadAsString());
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
});