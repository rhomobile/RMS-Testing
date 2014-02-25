(function(){

var preConditions = [];
describe('NFC Adapter test cases : ', function(){
    beforeEach(function(){
        preConditions = [];
        document.getElementById("verificationResult").innerHTML = "";
    });
    afterEach(function(){
        if(Rho.NFC.Adapter.isActive){
            Rho.NFC.Adapter.stop();
        }
        document.getElementById("verificationResult").innerHTML = "";
    });
    it('NFC - ADAPTER - Activate NFC device', function(){
        displayObjective("VTxxx_001 | NFC - ADAPTER - Activate NFC device");
        displayPrecondition(preConditions);
        dispTestCaseRunning('Activate NFC device ');
        dispExpectedResult('NFC device should get activated successfully.');
        _result.waitToRunTest();
        runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS) dispVerificationStatus("Test case Passed.");
            }
        });
        _result.waitForResponse();
    });
    it('NFC - ADAPTER - Activate NFC device', function(){
        displayObjective("VTxxx_002 | NFC - ADAPTER - Activate NFC device");
        displayPrecondition(preConditions);
        dispTestCaseRunning('Stop/De-activate NFC device.');
        dispExpectedResult('NFC device should get stoped/de-activated successfully.');
        _result.waitToRunTest();
        runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.stop();
                if(result == Rho.NFC.NFC_SUCCESS) dispVerificationStatus("Test case Passed.");
            }
        });
        _result.waitForResponse();
    });
    it('NFC - ADAPTER - Reset NFC configurations to default', function(){
        displayObjective("VTxxx_003 | NFC - ADAPTER - Reset NFC configurations to default");
        displayPrecondition(preConditions);
        dispTestCaseRunning('Reset NFC device configuration settings.');
        dispExpectedResult('NFC device configuration settings should get reset successfully.');
        _result.waitToRunTest();
        runs(function () {
            if(Rho.NFC.Adapter.supported){
                Rho.NFC.Adapter.passkey = "test2";
                var polTiming = Rho.NFC.Adapter.pollingTimeout;
                var passKey = Rho.NFC.Adapter.passkey;
                dispVerificationStatus("NFC property pollingTimeout default value : " + Rho.NFC.Adapter.pollingTimeout);
                dispVerificationStatus("NFC property passkey default value : " + Rho.NFC.Adapter.passkey);
                Rho.NFC.Adapter.pollingTimeout = 30;
                Rho.NFC.Adapter.passkey = "test";
                dispVerificationStatus("NFC propert pollingTimeout changed to : " + Rho.NFC.Adapter.pollingTimeout);
                dispVerificationStatus("NFC property passkey changed to : " + Rho.NFC.Adapter.passkey);
                var result = Rho.NFC.Adapter.reset();
                dispVerificationStatus("NFC property pollingTimeout after reset : " + Rho.NFC.Adapter.pollingTimeout);
                dispVerificationStatus("NFC property passkey after reset : " + Rho.NFC.Adapter.passkey);
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("Reset method returned NFC_SUCCESS : Passed");
                    if(polTiming == Rho.NFC.Adapter.pollingTimeout && passKey == Rho.NFC.Adapter.passkey){
                        dispVerificationStatus("pollingTimeout and passKey got reset successfully : Passed");
                    } else {
                        dispVerificationStatus("pollingTimeout and passKey did not get reset : Failed.");
                    }
                }else {
                    dispVerificationStatus("Test case Failed.");
                }
            }
        });
        _result.waitForResponse();
    });
    it('NFC - ADAPTER - Get NFC details of the device.', function(){
        displayObjective("VTxxx_004 | NFC - ADAPTER - Get NFC details of the device.");
        displayPrecondition(preConditions);
        dispTestCaseRunning('Activate NFC device ');
        dispExpectedResult('NFC device should get activated successfully.');
        _result.waitToRunTest();
        runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.getDeviceInfo();
                if(typeof(result) == "object"){
                    dispVerificationStatus("getDeviceInfo() returned HashObject : Passed");
                    dispVerificationStatus(JSON.stringify(result));
                } else {
                    dispVerificationStatus("getDeviceInfo() returned HashObject : Failed");
                }
            }
        });
        _result.waitForResponse();
    });
    it('NFC - ADAPTER - Tap NFC device on a new NFC tag to trigger the call back function "setTagDetectionHandler()"', function(){
        displayObjective("VTxxx_005 | NFC - ADAPTER - Tap NFC device on a new NFC tag to trigger the call back function \"setTagDetectionHandler()\".");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring empty NFC tag close the the NFC device"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Activate NFC device ');
        dispExpectedResult('Check that "setTagDetectionHandler Triggered : Success" is displayed');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback triggered : Success");
                        dispVerificationStatus("Detected NFC tag ID : " + tagInfo.tagId);
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB); // to detect all type of tags
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - ADAPTER - Tap NFC device on a NFC tag which has message in it to trigger the call back function "setMessageHandler()"', function(){
        displayObjective("VTxxx_006 | NFC - ADAPTER - Tap NFC device on a NFC tag which has message in it to trigger the call back function \"setMessageHandler()\".");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring empty NFC tag close the the NFC device"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Activate NFC device ');
        dispExpectedResult('Check that "setMessageHandler Triggered : Success" is displayed');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var messageCB = function(tagInfo){
                        dispVerificationStatus("setMessageHandler callback triggered : Success");
                    }
                    Rho.NFC.Adapter.setMessageHandler(messageCB);
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - ADAPTER - Check for adapter properties:', function(){
        displayObjective("VTxxx_007 | NFC - ADAPTER - Check for adapter properties");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button to get device details"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('NFC - ADAPTER - Check for adapter properties');
        dispExpectedResult('Check that All properties set with proper values');
        _result.waitToRunTest();
        runs(function(){
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC property test 'supported' : " + Rho.NFC.Adapter.supported);
                    dispVerificationStatus("NFC property test 'isActive' : " + Rho.NFC.Adapter.isActive);
                    dispVerificationStatus("NFC property test 'version' : " + Rho.NFC.Adapter.version);
                    dispVerificationStatus("NFC property test 'pollingTimeout' : " + Rho.NFC.Adapter.pollingTimeout);
                    dispVerificationStatus("NFC property test 'passkey' : " + Rho.NFC.Adapter.passkey);
                }
            }
        });
        _result.waitForResponse();
    });
    it('NFC - ADAPTER - Stop NFC device which is already stopped:', function(){
        displayObjective("VTxxx_008 | NFC - ADAPTER - Stop NFC device which is already stopped:");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button to check multiple stop of NFC device."];
        displayPrecondition(preConditions);
        dispTestCaseRunning('NFC - ADAPTER - Check for multiple stop properties');
        dispExpectedResult('Check that nothing happens or no abnormal behavior seen by performing multiple NFC device stop');
        _result.waitToRunTest();
        runs(function(){
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC property'isActive' before stop method : " + Rho.NFC.Adapter.isActive);
                    Rho.NFC.Adapter.stop();
                    Rho.NFC.Adapter.stop();
                    Rho.NFC.Adapter.stop();
                    dispVerificationStatus("NFC property 'isActive'after 3 times of stop method : " + Rho.NFC.Adapter.isActive);
                    if(Rho.NFC.Adapter.isActive == false) dispVerificationStatus("Multiple call of stop method : Passed");
                }
            }
        });
        _result.waitForResponse();
    });
    it('NFC - ADAPTER - Stop NFC device which is already stopped:', function(){
        displayObjective("VTxxx_009 | NFC - ADAPTER - Stop NFC device which is already stopped:");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button to check multiple stop of NFC device."];
        displayPrecondition(preConditions);
        dispTestCaseRunning('NFC - ADAPTER - Check for multiple stop properties');
        dispExpectedResult('Check that nothing happens or no abnormal behavior seen by performing multiple NFC device activate');
        _result.waitToRunTest();
        runs(function(){
            if(Rho.NFC.Adapter.supported){
                Rho.NFC.Adapter.stop();
                dispVerificationStatus("NFC property'isActive' before activate method : " + Rho.NFC.Adapter.isActive);
                var result = Rho.NFC.Adapter.activate();
                result = Rho.NFC.Adapter.activate();
                result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC property 'isActive'after 3 times of activate method : " + Rho.NFC.Adapter.isActive);
                    if(Rho.NFC.Adapter.isActive == true) dispVerificationStatus("Multiple call of activate method : Passed");
                }
            }
        });
        _result.waitForResponse();
    });
    xit('NFC - ADAPTER - Get NFC details of the device before activating the NFC device', function(){
        displayObjective("VTxxx_010 | NFC - ADAPTER - Get NFC details of the device.");
        displayPrecondition(preConditions);
        dispTestCaseRunning('Get NFC details of the device');
        dispExpectedResult('Getting NFC details of the device before activating the NFC device');
        _result.waitToRunTest();
        runs(function () {
            if(Rho.NFC.Adapter.supported){
                var stopStatus = Rho.NFC.Adapter.stop();
                if(stopStatus == Rho.NFC.NFC_SUCCESS){
                    expect(function () {
                        var result = Rho.NFC.Adapter.getDeviceInfo();
                    }).toThrow();
                }
            }
        });
    });
    it('NFC - ADAPTER - Register for tag detection before activating the NFC device using "setTagDetectionHandler()"', function(){
        displayObjective("VTxxx_011 | NFC - ADAPTER - Register for tag detection before activating the NFC device using \"setTagDetectionHandler()\".");
        preConditions = ["Ensure NFC device is not activated.", "Press 'RunTest' button", "Tap or Bring empty NFC tag close the the NFC device"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Register for tag detection before activating the NFC device using "setTagDetectionHandler()"');
        dispExpectedResult('"setTagDetectionHandler Triggered : Success" is displayed');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.stop();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC de-activation : Success");
                    
                    var tagCB = function(tagInfo){
                        dispVerificationStatus("Test case failed");
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB); // to detect all type of tags
                    
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - ADAPTER - Register for message detection before activating the NFC device using "setMessageHandler()"', function(){
        displayObjective("VTxxx_012 | NFC - ADAPTER - Register for Message detection before activating the NFC device using \"setMessageHandler()\".");
        preConditions = ["Ensure NFC device is not activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the the NFC device"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Register for tag detection before activating the NFC device using "setTagDetectionHandler()"');
        dispExpectedResult('"setTagDetectionHandler Triggered : Success" is displayed');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.stop();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC de-activation : Success");
                    var messageCB = function(tagInfo){
                        dispVerificationStatus("Test case failed");
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setMessageHandler(messageCB);
                }
            }
         });
         _result.waitForResponse();
    });
    xit('NFC - ADAPTER - Check for adapter properties before activating NFC device.', function(){
        displayObjective("VTxxx_013 | NFC - ADAPTER - Check for adapter properties before activating NFC device.");
        preConditions = ["Ensure NFC device is not activated.", "Press 'RunTest' button to get adapter properties"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('NFC - ADAPTER - Check for adapter properties');
        dispExpectedResult('Check that All properties set with proper values');
        _result.waitToRunTest();
        runs(function(){
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.stop();
                if(result == Rho.NFC.NFC_SUCCESS){
                    
                        dispVerificationStatus("NFC property test 'supported' : " + Rho.NFC.Adapter.supported);
                        dispVerificationStatus("NFC property test 'isActive' : " + Rho.NFC.Adapter.isActive);
                    
                    
                        dispVerificationStatus("NFC property test 'version' : " + Rho.NFC.Adapter.version);
                        dispVerificationStatus("NFC property test 'pollingTimeout' : " + Rho.NFC.Adapter.pollingTimeout);
                        dispVerificationStatus("NFC property test 'passkey' : " + Rho.NFC.Adapter.passkey);
                    
                }
            }
        });
        _result.waitForResponse();
    });
    it('NFC - RECORD - Create text record.', function(){
        displayObjective("VTxxx_014 | NFC - RECORD - Create text record.");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button to create text record"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('NFC - RECORD - Create text record object');
        dispExpectedResult('Check that text record object is created successfully');
        _result.waitToRunTest();
        runs(function(){
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    var recordObj = Rho.NFC.Record.create();
                    if(typeof(recordObj) == "object"){
                        recordObj.type = Rho.NFC.Record.NDEF_RTD_TEXT;
                        recordObj.textLanguage = "en";
                        recordObj.payload = "This is text payload";
                        dispVerificationStatus("Text record object creation : Success");
                    } else {
                        dispVerificationStatus("Text record object creation : Failed");
                    }
                }
            }
        });
        _result.waitForResponse();
    });
    it('NFC - RECORD - Create URI record.', function(){
        displayObjective("VTxxx_015 | NFC - RECORD - Create URI record.");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button to create text record"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('NFC - RECORD - Create URI record object');
        dispExpectedResult('Check that URI record object is created successfully');
        _result.waitToRunTest();
        runs(function(){
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    var recordObj = Rho.NFC.Record.create();
                    if(typeof(recordObj) == "object"){
                        recordObj.type = Rho.NFC.Record.NDEF_RTD_URI;
                        recordObj.uriProtocol = 1;
                        recordObj.payload = "google.com";
                        dispVerificationStatus("URI record object creation : Success");
                    } else {
                        dispVerificationStatus("URI record object creation : Failed");
                    }
                }
            }
        });
        _result.waitForResponse();
    });
    it('NFC - RECORD - Check for record object properties', function(){
            displayObjective("VTxxx_017 | NFC - RECORD - Check for record object properties");
            preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the the NFC device to get the record object in it."];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Obtaining record object properties from tag');
            dispExpectedResult('All record object properties retrieved successfully');
            _result.waitToRunTest();
             runs(function () {
                if(Rho.NFC.Adapter.supported){
                    var result = Rho.NFC.Adapter.activate();
                    if(result == Rho.NFC.NFC_SUCCESS){
                        dispVerificationStatus("NFC activation : Success");
                        var messageCB = function(messageObj){
                            dispVerificationStatus("setMessageHandler callback triggered : Success");
                            dispVerificationStatus("Message ID : " + messageObj.messageId);
                            var mssgObj = Rho.NFC.Message.getMessageById(messageObj.messageId);
                            if(typeof(mssgObj) == "object"){
                                dispVerificationStatus("Message object obtained : Success");
                                var recordArray = [];
                                recordArray = mssgObj.getRecords();
                                dispVerificationStatus("RECORD length : " + recordArray.length);
                                for(var i=0; i<recordArray.length;i++){
                                    dispVerificationStatus("Record Object ID : " + recordArray[i].ID);
                                    dispVerificationStatus("Record Object recordId : " + recordArray[i].recordId);
                                    dispVerificationStatus("Record Object type : " + recordArray[i].type);
                                    dispVerificationStatus("Record Object typeName : " + recordArray[i].typeName);
                                    dispVerificationStatus("Record Object tnf : " + recordArray[i].tnf);
                                    dispVerificationStatus("Record Object textLanguage : " + recordArray[i].textLanguage);
                                    dispVerificationStatus("Record Object textCharEncoding : " + recordArray[i].textCharEncoding);
                                    dispVerificationStatus("Record Object uriProtocol : " + recordArray[i].uriProtocol);
                                    dispVerificationStatus("Record Object payload : " + recordArray[i].payload);
                                    recordArray[i].close();
                                }
                                mssgObj.close();
                            }
                        }
                        var supportedTags = [];
                        Rho.NFC.Adapter.setMessageHandler(messageCB);
                    }
                }
             });
             _result.waitForResponse();
        });
    it('NFC - MESSAGE - Create message object.', function(){
        displayObjective("VTxxx_020 | NFC - MESSAGE - Create message object.");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button to create message object"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('NFC - MESSAGE - Create message object.');
        dispExpectedResult('Check that Message object is created successfully');
        _result.waitToRunTest();
        runs(function(){
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    var messageObj = Rho.NFC.Message.create();
                    if(typeof(messageObj) == "object"){
                        dispVerificationStatus("Message object creation : Success");
                    } else {
                        dispVerificationStatus("Message object creation : Failed");
                    }
                }
            }
        });
        _result.waitForResponse();
    });
    it('NFC - MESSAGE - Add a record to message object.', function(){
        displayObjective("VTxxx_021 | NFC - MESSAGE - Add a record to message object.");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button to add a record to message object"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('NFC - MESSAGE - Adding record to message object.');
        dispExpectedResult('Check that Record is added to message object successfully');
        _result.waitToRunTest();
        runs(function(){
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    var recordObj = Rho.NFC.Record.create();
                    var recID = recordObj.ID;
                    recordObj.type = Rho.NFC.Record.NDEF_RTD_TEXT;
                    recordObj.textLanguage = "en";
                    recordObj.payload = "This is text payload";
                    
                    var messageObj = Rho.NFC.Message.create();
                    var msgID = messageObj.ID;
                    if(typeof(messageObj) == "object"){
                        messageObj.addRecord(recordObj.ID);
                        var recordArray = messageObj.getRecords();
                        if(recID == recordArray[0].ID)
                        {
                            dispVerificationStatus("Adding record Object : Success");
                        }else{
                            dispVerificationStatus("Adding record Object : Failed");
                        }
                    } else {
                        dispVerificationStatus("Message object creation : Failed");
                    }
                }
            }
        });
        _result.waitForResponse();
    });
    it('NFC - MESSAGE - Get message object by providing id', function(){
        displayObjective("VTxxx_022 | NFC - MESSAGE - Get message object by providing id");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the the NFC device to get the message object in it."];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Obtaining message object obtained from tag');
        dispExpectedResult('Message object returned successfully !');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var messageCB = function(messageObj){
                        dispVerificationStatus("setMessageHandler callback triggered : Success");
                        dispVerificationStatus("Message ID : " + messageObj.messageId);
                        var mssgObj = Rho.NFC.Message.getMessageById(messageObj.messageId);
                        if(typeof(mssgObj) == "object") {
                            dispVerificationStatus("Message object obtained : Success");
                        }
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setMessageHandler(messageCB);
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - MESSAGE - Get message object by providing id', function(){
        displayObjective("VTxxx_023 and VTxxx_024 | NFC - MESSAGE - Get message object by providing id");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the the NFC device to get the message object in it."];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Obtaining message object obtained from tag');
        dispExpectedResult('Message object returned successfully !');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var messageCB = function(messageObj){
                        dispVerificationStatus("setMessageHandler callback triggered : Success");
                        dispVerificationStatus("Message ID : " + messageObj.messageId);
                        var mssgObj = Rho.NFC.Message.getMessageById(messageObj.messageId);
                        if(typeof(mssgObj) == "object"){
                            dispVerificationStatus("Message object obtained : Success");
                            var recordArray = [];
                            recordArray = mssgObj.getRecords();
                            dispVerificationStatus("RECORD length : " + recordArray.length);
                            for(var i=0; i<recordArray.length;i++){
                                dispVerificationStatus("Message"+i+1+" : " + recordArray[i].payload);
                                recordArray[i].close();
                            }
                            mssgObj.close();
                        }
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setMessageHandler(messageCB);
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - MESSAGE - Check for message object property ID', function(){
            displayObjective("VTxxx_025 | NFC - MESSAGE - Check for message object property ID");
            preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the the NFC device to get the message object in it."];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Obtaining message object obtained from tag and get the property ID of the same');
            dispExpectedResult('Message property ID retrieved successfully !');
            _result.waitToRunTest();
             runs(function () {
                if(Rho.NFC.Adapter.supported){
                    var result = Rho.NFC.Adapter.activate();
                    if(result == Rho.NFC.NFC_SUCCESS){
                        dispVerificationStatus("NFC activation : Success");
                        var messageCB = function(messageObj){
                            dispVerificationStatus("setMessageHandler callback triggered : Success");
                            dispVerificationStatus("Message ID : " + messageObj.messageId);
                            var mssgObj = Rho.NFC.Message.getMessageById(messageObj.messageId);
                            if(typeof(mssgObj) == "object"){
                                dispVerificationStatus("Message object obtained : Success");
                                dispVerificationStatus("Message ID : " + mssgObj.ID);
                                mssgObj.close();
                            }
                        }
                        var supportedTags = [];
                        Rho.NFC.Adapter.setMessageHandler(messageCB);
                    }
                }
             });
             _result.waitForResponse();
        });
    it('NFC - MESSAGE - Close message object and try to use the message object.', function(){
            displayObjective("VTxxx_026 | NFC - MESSAGE - Close message object and try to use the message object.");
            preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the the NFC device which has text written in it."];
            displayPrecondition(preConditions);
            dispTestCaseRunning('Try to use message object after performing close method on message object.');
            dispExpectedResult('Message object should not be in use after performing close method.');
            _result.waitToRunTest();
             runs(function () {
                if(Rho.NFC.Adapter.supported){
                    var result = Rho.NFC.Adapter.activate();
                    if(result == Rho.NFC.NFC_SUCCESS){
                        dispVerificationStatus("NFC activation : Success");
                        var messageCB = function(messageObj){
                            dispVerificationStatus("setMessageHandler callback triggered : Success");
                            dispVerificationStatus("Message ID : " + messageObj.messageId);
                            var mssgObj = Rho.NFC.Message.getMessageById(messageObj.messageId);
                            if(typeof(mssgObj) == "object"){
                                dispVerificationStatus("Message object obtained : Success");
                                var recordArray = [];
                                recordArray = mssgObj.getRecords();
                                dispVerificationStatus("RECORD length : " + recordArray.length);
                                for(var i=0; i<recordArray.length;i++){
                                    dispVerificationStatus("Message"+i+1+" : " + recordArray[i].payload);
                                    recordArray[i].close();
                                }
                                recordArray = null;
                                mssgObj.close();
                                recordArray = mssgObj.getRecords();
                                for(var i=0; i<recordArray.length;i++){
                                    dispVerificationStatus("Message"+i+1+" after close method : " + recordArray[i].payload);
                                    recordArray[i].close();
                                }
                            }
                        }
                        var supportedTags = [];
                        Rho.NFC.Adapter.setMessageHandler(messageCB);
                    }
                }
             });
             _result.waitForResponse();
        });
    it('NFC - TAG - Get tag object, using getTagById method', function(){
        displayObjective("VTxxx_027 | NFC - TAG - Get tag object, using getTagById method.");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the the NFC device to get object of it."];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Getting tag object by passing tag id to getTagById method !');
        dispExpectedResult('Tag Object returned successfully!');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var tagCB = function(tagInfo){
                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            dispVerificationStatus("Tag object obtained : Success");
                        } else {
                            dispVerificationStatus("Tag object retrieval : Failed");
                        }
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB); // to detect all type of tags
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - TAG - Make a Tag ReadOnly', function(){
        displayObjective("VTxxx_028 | NFC - TAG - Make a Tag ReadOnly.");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the the NFC device to make it readOnly"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Make a tag readOnly. Once made readOnly, tag cannot be writable!');
        dispExpectedResult('Check that tag cannot be writeable, and the property isReadOnly is set to true.');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback triggered : Success");
                        dispVerificationStatus("Detected NFC tag ID : " + tagInfo.tagId);

                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            dispVerificationStatus("Tag object obtained : Success");
                            dispVerificationStatus("Tag property 'isReadOnly' status before making it readOnly  : "+ tagObj.isReadOnly);
                           tagObj.makeReadOnly();
                            dispVerificationStatus("Tag property 'isReadOnly' status after making it readOnly  : "+ tagObj.isReadOnly);
                        }
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB); // to detect all type of tags
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - TAG - Format tag to NDEF format', function(){
        displayObjective("VTxxx_029 | NFC - TAG - Format tag to NDEF format");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the the NFC device to make it NDEF format"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Make a tag to NDEF format');
        dispExpectedResult('Check that tag is NDEF formated by checking the property isNdef set to true.');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback triggered : Success");
                        dispVerificationStatus("Detected NFC tag ID : " + tagInfo.tagId);

                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            dispVerificationStatus("Tag object obtained : Success");
                            dispVerificationStatus("Tag property 'isNdef' status before making it formatNDEF  : "+ tagObj.isNdef);
                            tagObj.formatNDEF();
                            dispVerificationStatus("Tag property 'isNdef' status after making it formatNDEF  : "+ tagObj.isNdef);
                        }
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB); // to detect all type of tags
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - TAG - Tap NFC device on a new NFC tag to get details', function(){
        displayObjective("VTxxx_031 | NFC - TAG - Tap NFC device on a new NFC tag to get details");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring empty NFC tag close the the NFC device"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Get Details of tag');
        dispExpectedResult('Check that details of the tag is retrieved.');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback triggered : Success");
                        dispVerificationStatus("Detected NFC tag ID : " + tagInfo.tagId);

                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            dispVerificationStatus("Tag object obtained : Success");
                            dispVerificationStatus("Tag id : "+ tagObj.ID);
                            dispVerificationStatus("Tag type : "+ tagObj.type);
                            dispVerificationStatus("Tag serial Number  : "+ tagObj.serialNumber);
                            dispVerificationStatus("Tag size  : "+ tagObj.size);
                            dispVerificationStatus("Tag free size  : "+ tagObj.freeSize);
                            dispVerificationStatus("Tag isReadOnly  : "+ tagObj.isReadOnly);
                            dispVerificationStatus("Tag isNdef  : "+ tagObj.isNdef);
                            dispVerificationStatus("Tag isConnected  : "+ tagObj.isConnected);
                        }
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB); // to detect all type of tags
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - TAG - Format NDEF tag to NDEF format again', function(){
        displayObjective("VTxxx_033 | NFC - TAG - Format NDEF tag to NDEF format again");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NDEF formated tag close the the NFC device to make it NDEF format again"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Make a NDEF formated tag to NDEF format again');
        dispExpectedResult('Check that tag is NDEF formated by checking the property isNdef set to true.');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback triggered : Success");
                        dispVerificationStatus("Detected NFC tag ID : " + tagInfo.tagId);

                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            dispVerificationStatus("Tag object obtained : Success");
                            dispVerificationStatus("Tag property 'isNdef' status before making it formatNDEF  : "+ tagObj.isNdef);
                            tagObj.formatNDEF();
                            dispVerificationStatus("Tag property 'isNdef' status after making it formatNDEF  : "+ tagObj.isNdef);
                        }
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB); // to detect all type of tags
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - TAG - Write Text message to a NDEF formatted tag.', function(){
        displayObjective("VTxxx_034 | NFC - TAG - Write message to a NDEF formatted tag.");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring empty NFC tag close the the NFC device to write message in it."];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Writing message to a tag.');
        dispExpectedResult('Check that message written successfully.');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback triggered : Success");
                        dispVerificationStatus("Detected NFC tag ID : " + tagInfo.tagId);

                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            var msgID = [];
                            var recID = "";
                            var writeResult="";
                            var recordObj = Rho.NFC.Record.create();
                            if(typeof(recordObj)=="object"){
                                recID = recordObj.ID;
                                recordObj.type = Rho.NFC.Record.NDEF_RTD_TEXT;
                                recordObj.textLanguage = "en";
                                recordObj.payload = "This is text payload";
                                var messageObj = Rho.NFC.Message.create();
                                if(typeof(messageObj)=="object"){
                                    msgID[0] = messageObj.ID;
                                    if(recID!=null || recID!="") messageObj.addRecord(recID);
                                }
                            }
                            if(msgID.length>0) writeResult = tagObj.writeMessage(msgID);
                            dispVerificationStatus("Write message on a Tag  : " + writeResult);
                            
                            // to be enabled once the writeMessage() method gets fixed.

                            /*dispVerificationStatus("Bring same tag near NFC device to confirm the write operation");
                            var messageCB = function(messageObj){
                                dispVerificationStatus("setMessageHandler callback triggered : Success");
                                dispVerificationStatus("Message ID : " + messageObj.messageId);
                                var mssgObj = Rho.NFC.Message.getMessageById(messageObj.messageId);
                                if(typeof(mssgObj) == "object"){
                                    dispVerificationStatus("Message object obtained : Success");
                                    var recordArray = [];
                                    recordArray = mssgObj.getRecords();
                                    dispVerificationStatus("RECORD length : " + recordArray.length);
                                    for(var i=0; i<recordArray.length;i++){
                                        dispVerificationStatus("Message"+i+1+" : " + recordArray[i].payload);
                                        recordArray[i].close();
                                    }
                                    mssgObj.close();
                                }
                            }
                            Rho.NFC.Adapter.setMessageHandler(messageCB);*/
                        }
                        tagObj.close();
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB); // to detect all type of tags
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - TAG - Write URI message to a NDEF formatted tag.', function(){
        displayObjective("VTxxx_035 | NFC - TAG - Write message to a NDEF formatted tag.");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring empty NFC tag close the the NFC device to write message in it."];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Writing message to a tag.');
        dispExpectedResult('Check that message written successfully.');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback triggered : Success");
                        dispVerificationStatus("Detected NFC tag ID : " + tagInfo.tagId);

                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            var msgID = [];
                            var recID = "";
                            var writeResult="";
                            var recordObj = Rho.NFC.Record.create();
                            if(typeof(recordObj)=="object"){
                                recID = recordObj.ID;
                                recordObj.type = Rho.NFC.Record.NDEF_RTD_URI;
                                recordObj.uriProtocol = 1;
                                recordObj.payload = "testdomain.com";
                                var messageObj = Rho.NFC.Message.create();
                                if(typeof(messageObj)=="object"){
                                    msgID[0] = messageObj.ID;
                                    if(recID!=null || recID!=""){
                                        dispVerificationStatus("Record is not null");
                                        messageObj.addRecord(recID);
                                    }
                                }
                            }
                            if(msgID.length>0) writeResult = tagObj.writeMessage(msgID);
                            dispVerificationStatus("Write message on a Tag  : " + writeResult);
                        }
                        tagObj.close();
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB); // to detect all type of tags
                }
            }
         });
         _result.waitForResponse();
    });
    xit('NFC - TAG - Perform Exchange raw to a tag', function(){
        displayObjective("VTxxx_036 | NFC - TAG - Perform Exchange raw to a tag");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring empty NFC tag close the the NFC device to perform Exchange raw to it."];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Perform Exchange raw to a tag.');
        dispExpectedResult('Check that raw data exchange to a tag happens successfully.');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback triggered : Success");
                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj)=="object"){
                            dispVerificationStatus("Obtained Tag object : Success");
                            var resultObj = tagObj.exchangeData("This is exchange data.");
                            if(typeof(resultObj)=="object"){
                                dispVerificationStatus("Obtained result hash : Success");
                                dispVerificationStatus("Returned data : "+resultObj.receiveData);
                                if(resultObj.receiveData == "This is exchange data.") dispVerificationStatus("Test case passed");
                                else dispVerificationStatus("Test case failed");
                            } else {
                                dispVerificationStatus("Obtaining result hash : Failed");
                            }
                        }
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB); // to detect all type of tags
                }
            }
        });
         _result.waitForResponse();
     });
    it('NFC - GENERAL - Read Text message from Tag ( complete flow of reading text from tag - includes tag, record and message object methods)', function(){
            displayObjective("VTxxx_037 | NFC - GENERAL - Read Text message from Tag ( complete flow of reading text from tag - includes tag, record and message object methods)");
            preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the the NFC device which has text written in it."];
            displayPrecondition(preConditions);
            dispExpectedResult('Reading Text message from supported NFC tag is successfull.');
            _result.waitToRunTest();
             runs(function () {
                if(Rho.NFC.Adapter.supported){
                    var result = Rho.NFC.Adapter.activate();
                    if(result == Rho.NFC.NFC_SUCCESS){
                        dispVerificationStatus("NFC activation : Success");
                        var messageCB = function(messageObj){
                            dispVerificationStatus("setMessageHandler callback triggered : Success");
                            dispVerificationStatus("Message ID : " + messageObj.messageId);
                            var mssgObj = Rho.NFC.Message.getMessageById(messageObj.messageId);
                            if(typeof(mssgObj) == "object"){
                                var recordArray = [];
                                recordArray = mssgObj.getRecords();
                                for(var i=0; i<recordArray.length;i++){
                                    dispVerificationStatus("Message"+i+1+" : " + recordArray[i].payload);
                                    recordArray[i].close();
                                }
                                recordArray = null;
                                mssgObj.close();
                            }
                        }
                        var supportedTags = [];
                        Rho.NFC.Adapter.setMessageHandler(messageCB);
                    }
                }
             });
             _result.waitForResponse();
        });
    it('NFC - GENERAL - Read URI message from Tag ( complete flow of reading URI from tag - includes tag, record and message object methods)', function(){
            displayObjective("VTxxx_038 | NFC - GENERAL - Read URI message from Tag ( complete flow of reading URI from tag - includes tag, record and message object methods)");
            preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the the NFC device which has URI written in it."];
            displayPrecondition(preConditions);
            dispExpectedResult('Reading URI message from supported NFC tag is successfull.');
            _result.waitToRunTest();
             runs(function () {
                if(Rho.NFC.Adapter.supported){
                    var result = Rho.NFC.Adapter.activate();
                    if(result == Rho.NFC.NFC_SUCCESS){
                        dispVerificationStatus("NFC activation : Success");
                        var messageCB = function(messageObj){
                            dispVerificationStatus("setMessageHandler callback triggered : Success");
                            dispVerificationStatus("Message ID : " + messageObj.messageId);
                            var mssgObj = Rho.NFC.Message.getMessageById(messageObj.messageId);
                            if(typeof(mssgObj) == "object"){
                                var recordArray = [];
                                recordArray = mssgObj.getRecords();
                                for(var i=0; i<recordArray.length;i++){
                                    dispVerificationStatus("Message"+i+1+" : " + recordArray[i].payload);
                                    recordArray[i].close();
                                }
                                recordArray = null;
                                mssgObj.close();
                            }
                        }
                        var supportedTags = [];
                        Rho.NFC.Adapter.setMessageHandler(messageCB);
                    }
                }
             });
             _result.waitForResponse();
        });
    it('NFC - GENERAL - Try to Write Text message to the tag, which is already readonly.)', function(){
            displayObjective("VTxxx_039 | NFC - GENERAL - Try to Write Text message to the tag, which is already readonly.");
            preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring read only NFC tag close the NFC device to write Text message in it."];
            displayPrecondition(preConditions);
            dispExpectedResult('Trying to write a read only tag should return proper error message.');
            _result.waitToRunTest();
             runs(function () {
                if(Rho.NFC.Adapter.supported){
                    var result = Rho.NFC.Adapter.activate();
                    if(result == Rho.NFC.NFC_SUCCESS){
                        dispVerificationStatus("NFC activation : Success");
                        var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback triggered : Success");
                        dispVerificationStatus("Detected NFC tag ID : " + tagInfo.tagId);

                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            var msgID = [];
                            var recID = "";
                            var writeResult="";
                            var recordObj = Rho.NFC.Record.create();
                            if(typeof(recordObj)=="object"){
                                recID = recordObj.ID;
                                recordObj.type = Rho.NFC.Record.NDEF_RTD_TEXT;
                                recordObj.textLanguage = "en";
                                recordObj.payload = "This is text payload";
                                var messageObj = Rho.NFC.Message.create();
                                if(typeof(messageObj)=="object"){
                                    msgID[0] = messageObj.ID;
                                    if(recID!=null || recID!=""){
                                        dispVerificationStatus("Record is not null");
                                        messageObj.addRecord(recID);
                                    }
                                }
                            }
                            if(msgID.length>0) writeResult = tagObj.writeMessage(msgID);
                            dispVerificationStatus("Write message on a Tag  : " + writeResult);
                        }
                        tagObj.close();
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB);
                    }
                }
             });
             _result.waitForResponse();
        });
        it('NFC - GENERAL - Read message from the tag, which is not readonly.', function(){
        displayObjective("VTxxx_040 | NFC - GENERAL - Read message from the tag, which is not readonly.");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag (readOnly : false) close to the NFC device."];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Reading message from tag which is not readOnly');
        dispExpectedResult('Message read successfully from tag !');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var messageCB = function(messageObj){
                        dispVerificationStatus("setMessageHandler callback triggered : Success");
                        dispVerificationStatus("Message ID : " + messageObj.messageId);
                        var mssgObj = Rho.NFC.Message.getMessageById(messageObj.messageId);
                        if(typeof(mssgObj) == "object"){
                            dispVerificationStatus("Message object obtained : Success");
                            var recordArray = [];
                            recordArray = mssgObj.getRecords();
                            dispVerificationStatus("RECORD length : " + recordArray.length);
                            for(var i=0; i<recordArray.length;i++){
                                dispVerificationStatus("Message"+i+1+" : " + recordArray[i].payload);
                                recordArray[i].close();
                            }
                            mssgObj.close();
                        }
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setMessageHandler(messageCB);
                }
            }
         });
         _result.waitForResponse();
    });
        it('NFC - GENERAL - Clear the message of the tag, by providing empty text in it.', function(){
            displayObjective("VTxxx_041 | NFC - GENERAL - Try to clear the message of the tag, by providing empty text in it.");
            preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag close the NFC device to write empty string in it."];
            displayPrecondition(preConditions);
            dispExpectedResult('Message in the NFC tag is cleared.');
            _result.waitToRunTest();
             runs(function () {
                if(Rho.NFC.Adapter.supported){
                    var result = Rho.NFC.Adapter.activate();
                    if(result == Rho.NFC.NFC_SUCCESS){
                        dispVerificationStatus("NFC activation : Success");
                        var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback triggered : Success");
                        dispVerificationStatus("Detected NFC tag ID : " + tagInfo.tagId);

                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            var msgID = [];
                            var recID = "";
                            var writeResult="";
                            var recordObj = Rho.NFC.Record.create();
                            if(typeof(recordObj)=="object"){
                                recID = recordObj.ID;
                                recordObj.type = Rho.NFC.Record.NDEF_RTD_TEXT;
                                recordObj.textLanguage = "en";
                                recordObj.payload = "";
                                var messageObj = Rho.NFC.Message.create();
                                if(typeof(messageObj)=="object"){
                                    msgID[0] = messageObj.ID;
                                    if(recID!=null || recID!=""){
                                        dispVerificationStatus("Record is not null");
                                        messageObj.addRecord(recID);
                                    }
                                }
                            }
                            if(msgID.length>0) writeResult = tagObj.writeMessage(msgID);
                            dispVerificationStatus("Write message on a Tag  : " + writeResult);
                        }
                        tagObj.close();
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB);
                    }
                }
             });
             _result.waitForResponse();
        });
        it('NFC - GENERAL - Try to write oversized text message to a tag.', function(){
            displayObjective("VTxxx_042 | NFC - GENERAL - Try to write oversized text message to a tag.");
            preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "oversized message 'This is test message.This is test message.This is test message.This is test message.This is test message.'(105 bytes)", "Tap or Bring NFC tag(46 bytes) close the NFC device to write oversized message (105 bytes) in it."];
            displayPrecondition(preConditions);
            dispExpectedResult('Message in the NFC tag is cleared.');
            _result.waitToRunTest();
             runs(function () {
                if(Rho.NFC.Adapter.supported){
                    var result = Rho.NFC.Adapter.activate();
                    if(result == Rho.NFC.NFC_SUCCESS){
                        dispVerificationStatus("NFC activation : Success");
                        var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback triggered : Success");
                        dispVerificationStatus("Detected NFC tag ID : " + tagInfo.tagId);

                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            var msgID = [];
                            var recID = "";
                            var writeResult="";
                            var recordObj = Rho.NFC.Record.create();
                            if(typeof(recordObj)=="object"){
                                recID = recordObj.ID;
                                recordObj.type = Rho.NFC.Record.NDEF_RTD_TEXT;
                                recordObj.textLanguage = "en";
                                recordObj.payload = "This is test message.This is test message.This is test message.This is test message.This is test message.";
                                var messageObj = Rho.NFC.Message.create();
                                if(typeof(messageObj)=="object"){
                                    msgID[0] = messageObj.ID;
                                    if(recID!=null || recID!=""){
                                        dispVerificationStatus("Record is not null");
                                        messageObj.addRecord(recID);
                                    }
                                }
                            }
                            if(msgID.length>0) writeResult = tagObj.writeMessage(msgID);
                            dispVerificationStatus("Write message on a Tag  : " + writeResult);
                        }
                        tagObj.close();
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB);
                    }
                }
             });
             _result.waitForResponse();
        });
    it('NFC - GENERAL - Try to write a tag which is not supported.', function(){
            displayObjective("VTxxx_043 | NFC - GENERAL - Try to write a tag which is not supported.");
            preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring non supported NFC tag close the NFC device."];
            displayPrecondition(preConditions);
            dispExpectedResult("Call back of 'setTagDetectionHandler' should not be triggered");
            _result.waitToRunTest();
             runs(function () {
                if(Rho.NFC.Adapter.supported){
                    var result = Rho.NFC.Adapter.activate();
                    if(result == Rho.NFC.NFC_SUCCESS){
                        dispVerificationStatus("NFC activation : Success");
                        var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback : triggered");
                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            var msgID = [];
                            var recID = "";
                            var writeResult="";
                            var recordObj = Rho.NFC.Record.create();
                            if(typeof(recordObj)=="object"){
                                recID = recordObj.ID;
                                recordObj.type = Rho.NFC.Record.NDEF_RTD_TEXT;
                                recordObj.textLanguage = "en";
                                recordObj.payload = "Should not write this message for non-supported tags.";
                                var messageObj = Rho.NFC.Message.create();
                                if(typeof(messageObj)=="object"){
                                    msgID[0] = messageObj.ID;
                                    if(recID!=null || recID!=""){
                                        dispVerificationStatus("Record is not null");
                                        messageObj.addRecord(recID);
                                    }
                                }
                            }
                            if(msgID.length>0) writeResult = tagObj.writeMessage(msgID);
                            dispVerificationStatus("Write message on a Tag  : " + writeResult);
                        }
                        tagObj.close();
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB);
                    }
                }
             });
             _result.waitForResponse();
        });
        it('NFC - GENERAL - Detect only the passed supported Tags with the api \'setTagDetectionHandler\'.', function(){
            displayObjective("VTxxx_044 | NFC - GENERAL - Detect only the passed supported Tags with the api 'setTagDetectionHandler'.");
            preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring non supported NFC tag close the NFC device."];
            displayPrecondition(preConditions);
            dispExpectedResult("Test case passed, if you don't see 'setTagDetectionHandler callback : triggered' this.");
            _result.waitToRunTest();
             runs(function () {
                if(Rho.NFC.Adapter.supported){
                    var result = Rho.NFC.Adapter.activate();
                    if(result == Rho.NFC.NFC_SUCCESS){
                        dispVerificationStatus("NFC activation : Success");
                        var tagCB = function(tagInfo){
                        dispVerificationStatus("setTagDetectionHandler callback : triggered");
                        var tagObj = Rho.NFC.Tag.getTagById(tagInfo.tagId);
                        if(typeof(tagObj) == "object") {
                            dispVerificationStatus("Tag type detected : " + tagObj.type);
                            tagObj.close();
                            }
                        }
                    var supportedTags = [4];
                    dispVerificationStatus("Supported tags passed to api : 4");
                    Rho.NFC.Adapter.setTagDetectionHandler(supportedTags, tagCB);
                    }
                }
             });
             _result.waitForResponse();
        });
        it('NFC - GENERAL - Non - NFC device and check for the api properties supported and isActive', function(){
            displayObjective("VTxxx_045 and VTxxx_046| NFC - GENERAL - Non - NFC device and check for the api properties supported and isActive.");
            preConditions = ["Execute this test case non-NFC device.", "Press 'RunTest' button"];
            displayPrecondition(preConditions);
            dispExpectedResult("Test case passed, if you don't see 'setTagDetectionHandler callback : triggered' this.");
            _result.waitToRunTest();
             runs(function () {
                dispVerificationStatus("Rho.NFC.Adapter.supported : " + Rho.NFC.Adapter.supported);
                dispVerificationStatus("Rho.NFC.Adapter.isActive : " + Rho.NFC.Adapter.isActive);
                var result = Rho.NFC.Adapter.activate();
                dispVerificationStatus("activate result : " + result);
                });
             _result.waitForResponse();
        });
        it('NFC - GENERAL - Read message from the tag, which is readonly.', function(){
        displayObjective("VTxxx_047 | NFC - GENERAL - Read message from the tag, which is readonly.");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button", "Tap or Bring NFC tag (readOnly : true) close to the NFC device."];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Reading message from tag which is readOnly');
        dispExpectedResult('Message read successfully from tag !');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var messageCB = function(messageObj){
                        dispVerificationStatus("setMessageHandler callback triggered : Success");
                        dispVerificationStatus("Message ID : " + messageObj.messageId);
                        var mssgObj = Rho.NFC.Message.getMessageById(messageObj.messageId);
                        if(typeof(mssgObj) == "object"){
                            dispVerificationStatus("Message object obtained : Success");
                            var recordArray = [];
                            recordArray = mssgObj.getRecords();
                            dispVerificationStatus("RECORD length : " + recordArray.length);
                            for(var i=0; i<recordArray.length;i++){
                                dispVerificationStatus("Message"+i+1+" : " + recordArray[i].payload);
                                recordArray[i].close();
                            }
                            mssgObj.close();
                        }
                    }
                    var supportedTags = [];
                    Rho.NFC.Adapter.setMessageHandler(messageCB);
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - ADAPTER - Trigger callback of setConfigChangeHandler by changing pollingTimeout', function(){
        displayObjective("VTxxx_048 | NFC - ADAPTER - Trigger callback of setConfigChangeHandler by changing pollingTimeout");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Trigger callback of setConfigChangeHandler by changing pollingTimeout');
        dispExpectedResult('Callback of setConfigChangeHandler triggered successfully on change of pollingTimeout property.');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var configCB = function(){
                        dispVerificationStatus("setCofigChangeHandler callbak triggered : Success");
                    };
                    Rho.NFC.Adapter.setConfigChangeHandler(configCB);
                    Rho.NFC.Adapter.pollingTimeout = 40;
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - ADAPTER - Trigger callback of setConfigChangeHandler by changing passkey', function(){
        displayObjective("VTxxx_049 | NFC - ADAPTER - Trigger callback of setConfigChangeHandler by changing passkey");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Trigger callback of setConfigChangeHandler by changing passkey');
        dispExpectedResult('Callback of setConfigChangeHandler triggered successfully on change of passkey property.');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var configCB = function(){
                        dispVerificationStatus("setCofigChangeHandler callbak triggered : Success");
                    };
                    Rho.NFC.Adapter.setConfigChangeHandler(configCB);
                    Rho.NFC.Adapter.passkey = "TestKey";
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - ADAPTER - Check for the Hash parameter pollingTimeout passed with the callback of setConfigChangeHandler', function(){
        displayObjective("VTxxx_050 | NFC - ADAPTER - Check for the Hash parameter pollingTimeout passed with the callback of setConfigChangeHandler");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Check hash parameter pollingTimeout passed with callback of setConfigChangeHandler');
        dispExpectedResult('Callback of setConfigChangeHandler triggered successfully with pollingTimeout hash parameter.');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var configCB = function(configVal){
                        dispVerificationStatus("setCofigChangeHandler callbak triggered : Success");
                        if(configVal.pollingTimeout == "40"){
                            dispVerificationStatus("Test case passed");
                        } else {
                            dispVerificationStatus("Test case failed");
                        }
                    };
                    Rho.NFC.Adapter.setConfigChangeHandler(configCB);
                    Rho.NFC.Adapter.pollingTimeout = 40;
                }
            }
         });
         _result.waitForResponse();
    });
    it('NFC - ADAPTER - Check for the Hash parameter passkey passed with the callback of setConfigChangeHandler', function(){
        displayObjective("VTxxx_051 | NFC - ADAPTER - Check for the Hash parameter passkey passed with the callback of setConfigChangeHandler");
        preConditions = ["Ensure NFC device is activated.", "Press 'RunTest' button"];
        displayPrecondition(preConditions);
        dispTestCaseRunning('Check hash parameter passkey passed with callback of setConfigChangeHandler');
        dispExpectedResult('Callback of setConfigChangeHandler triggered successfully with passkey hash parameter.');
        _result.waitToRunTest();
         runs(function () {
            if(Rho.NFC.Adapter.supported){
                var result = Rho.NFC.Adapter.activate();
                if(result == Rho.NFC.NFC_SUCCESS){
                    dispVerificationStatus("NFC activation : Success");
                    var configCB = function(configVal){
                        dispVerificationStatus("setCofigChangeHandler callbak triggered : Success");
                        if(configVal.passkey == "testkey"){
                            dispVerificationStatus("Test case passed");
                        } else {
                            dispVerificationStatus("Test case failed");
                        }
                    };
                    Rho.NFC.Adapter.setConfigChangeHandler(configCB);
                    Rho.NFC.Adapter.passkey = "testkey";
                }
            }
         });
         _result.waitForResponse();
    });
});
})();
 