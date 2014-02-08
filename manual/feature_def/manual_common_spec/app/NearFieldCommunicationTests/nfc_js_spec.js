describe('Near Field Communication Tests', function () {

    describe('NFC Tag tests', function () {
         beforeEach(function () {
            Rho.NFC.Adapter.activate();
        });

        beforeEach(function () {
            Rho.NFC.Adapter.stop();
        });


        it('Tag reading', function () {
            var flag = false;
            var test = new ManualTest();
            test.addGoal("Check work of setTagDetectionHandler");
            test.addPrecondition("Smart tag");
            test.addStep('Press "Start test" button');
            test.addStep('Touch tag to device');
            test.addExpectation("Status should be OK and tag information should be displayed");
            test.displayScenario();
            test.waitForSpecStart();

            Rho.NFC.Adapter.setTagDetectionHandler([], function (status, tagID) {
                test.addResult('Status', status);
                var tag = Rho.NFC.Tag.getTagById(tagID);
                test.addResult('Tag ID', tag.ID);
                test.addResult('Tag type', tag.type);
                test.addResult('Tag serialNumber', tag.serialNumber);
                test.addResult('Tag size', tag.size);
                test.addResult('Tag freeSize', tag.freeSize);
                test.addResult('Tag isReadOnly', tag.isReadOnly);
                test.addResult('Tag isNdef', tag.isNdef);
                flag = true;
            });

            waitsFor(function () {
                return flag;
            }, "Callback hasn't called for in ten seconds", 10000);

            runs(function () {
                test.displayResult();
                test.waitForUserAction();
            });

        });

        it('Message reading', function () {
            var flag = false;
            var test = new ManualTest();
            test.addGoal("Check work of setMessageHandler");
            test.addPrecondition("Another NFC device");
            test.addStep('Press "Start test" button');
            test.addStep('Touch another NFC device to device');
            test.addExpectation("Status should be OK and message information should be displayed");
            test.displayScenario();
            test.waitForSpecStart();

            Rho.NFC.Adapter.setMessageHandler(0, [], function (status, messageID) {
                test.addResult('Status', status);
                var message = Rho.NFC.Message.getMeessageById(messageID);
                test.addResult('Message ID', message.ID);
                message.getRecords().forEach(function(each){
                    var record = Rho.NFC.Record.getRecordById(each);
                    test.addResult('Record ID', record.ID);
                    test.addResult('Record type', record.TNF);
                    test.addResult('Record type', record.type);
                    test.addResult('Record payload', record.payloadAsString);
                })
                flag = true;
            });

            waitsFor(function () {
                return flag;
            }, "Callback hasn't called for in ten seconds", 10000);

            runs(function () {
                test.displayResult();
                test.waitForUserAction();
            });

        });

    });
});