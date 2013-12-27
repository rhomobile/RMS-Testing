describe("DPX feature definition tests", function () {

    it("Should capture document from file system", function () {
        var processedForm;
        var dpxInstance = Rho.DPX.init();
        dpxInstance.inputSource = Rho.DPX.FILE; // or dpxInstance.setFileSource(); dpxInstance.setFileSource(fileName);
        dpxInstance.inputSourceFilename = 'image.jpg';
        dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstance.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedForm = dpxEvent.processedForm;
            }
        });

        waitsFor(function(){
            return processedForm !== undefined;
        }, 5000);

        runs(function(){
            //TODO: Need add additional expect
            expect(processedForm.template).toEqual(dpxInstance.template);
        });

        //TODO: Is it valid place for call release method in async tests?
        dpxInstance.close();
    });


    it("Should capture document from camera", function () {
        var processedForm;
        var dpxInstance = Rho.DPX.init();
        dpxInstance.inputSource = Rho.DPX.CAMERA;
        dpxInstance.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstance.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedForm = dpxEvent.processedForm;
            }
        });

        waitsFor(function(){
            return processedForm !== undefined;
        }, 5000);

        runs(function(){
            //TODO: Need add additional expect
            expect(processedForm.template).toEqual(dpxInstance.template);
        });

        //TODO: Is it valid place for call release method in async tests?
        dpxInstance.close();
    });

    it("Starting two dpx engine and capture document from file system", function () {

    });


    it("Should capture two document from two files simultaneously", function () {
        var processedFormA;
        var processedFormB;
        var dpxInstanceA = Rho.DPX.init();
        var dpxInstanceB = Rho.DPX.init();
        dpxInstanceA.inputSource = Rho.DPX.FILE; // or dpxInstance.setFileSource(); dpxInstance.setFileSource(fileName);
        dpxInstanceA.inputSourceFilename = 'image.jpg';
        dpxInstanceA.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstanceB.inputSource = Rho.DPX.FILE; // or dpxInstance.setFileSource(); dpxInstance.setFileSource(fileName);
        dpxInstanceB.inputSourceFilename = 'anotherImage.jpg';
        dpxInstanceB.template = Rho.RhoFile.join(Rho.Application.AppBundleFolder, 'template.xml');

        dpxInstanceA.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedFormA = dpxEvent.processedForm;
            }
        });

        dpxInstanceB.captureDocument(function(dpxEvent){
            if (dpxEvent == Rho.DPX.FORM_DECODED) {
                processedFormB = dpxEvent.processedForm;
            }
        });


        waitsFor(function(){
            return (processedFormA !== undefined) && (processedFormB !== undefined);
        }, 5000);

        runs(function(){
            //TODO: Need add additional expect
            expect(processedFormA.template).toEqual(dpxInstanceA.template);
            // ...
            expect(processedFormB.template).toEqual(dpxInstanceA.template);
        });

        //TODO: Is it valid place for call release method in async tests?
        dpxInstanceA.close();
        dpxInstanceB.close();

    });

})




/*
describe("DPX", function () {
    beforeEach(function () {

    });

    afterEach(function () {

    });

    describe("testing boolean properties with valid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("able to configure the audioFeedback parameter", function() {
            runs(function(){
                //  todo : Set the audioFeedback parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the hapticFeedback parameter", function() {
            runs(function(){
                //  todo : Set the hapticFeedback parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the ledFeedback parameter", function() {
            runs(function(){
                //  todo : Set the ledFeedback parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the flash parameter", function() {
            runs(function(){
                //  todo : Set the flash parameter to true and false, the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

    });


    describe("testing string properties with valid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("able to configure the template parameter", function() {
            runs(function(){
                //  todo : Set the template parameter to a valid value (pointing to an xml), the retrieved parameter
                //  should match the value just set.  Repeat this with very long and very short valid values
                expect(true);
            });
        });

        it("able to configure the inputSourceFileUri parameter", function() {
            runs(function(){
                //  todo : Set the inputSourceFileUri parameter to a valid value (pointing to an image file), the retrieved parameter
                //  should match the value just set.  Repeat this with very long and very short valid values
                expect(true);
            });
        });

        it("able to configure the inputSource parameter", function() {
            runs(function(){
                //  todo : Set the inputSource parameter to a valid value (camera, file), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("able to configure the returnedPictureFormat parameter", function() {
            runs(function(){
                //  todo : Set the returnedPictureFormat parameter to a valid value (png, jpg, bmp), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

    });

    describe("testing string properties with invalid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("unable to configure the template parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the template parameter to an invalid value (not pointing to an xml or a malformed path), the retrieved parameter
                //  should not match the value just set.
                expect(true);
            });
        });

        it("unable to configure the inputSourceFileUri parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the inputSourceFileUri parameter to an invalid value (not pointing to an image file), the retrieved parameter
                //  should not match the value just set.
                expect(true);
            });
        });

        it("unable to configure the inputSource parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the inputSource parameter to a valid value (NOT camera or file), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

        it("unable to configure the returnedPictureFormat parameter with invalid input", function() {
            runs(function(){
                //  todo : Set the returnedPictureFormat parameter to a valid value (NOT one of: png, jpg, bmp), the retrieved parameter
                //  should match the value just set.
                expect(true);
            });
        });

    });

    describe("testing integer properties with valid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("able to configure the identificationTimeout parameter", function() {
            runs(function(){
                //  todo : Set the identificationTimeout parameter to a valid value (positive integer including a huge value and 0), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

        it("able to configure the processingTimeout parameter", function() {
            runs(function(){
                //  todo : Set the processingTimeout parameter to a valid value (positive integer including a huge value and 0), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

    });

    describe("testing integer properties with invalid input", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("unable to configure the identificationTimeout parameter to an invalid value", function() {
            runs(function(){
                //  todo : Set the identificationTimeout parameter to an invalid value (negative integer), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

        it("unable to configure the processingTimeout parameter to an invalid value", function() {
            runs(function(){
                //  todo : Set the processingTimeout parameter to an invalid value (negative integer), the retrieved parameter
                //  should match the value just set.  Repeat this with a number of valid values
                expect(true);
            });
        });

    });


    describe("testing read only properties", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("unable to configure the version parameter", function() {
            runs(function(){
                //  todo : Set the version parameter to any String.  The version should not be changed and should return
                //  a valid version string (not blank)
                expect(true);
            });
        });

    });


    describe("capturing a document", function () {

        beforeEach(function () {});
        afterEach(function () {});

        //  todo : For each provided sample image and associated sample template capture and process that document.
        //         The returned regions will obviously be different for each document but should match the values
        //         (OCR / barcodes / OMR etc.) specified in the templates.  All returned values in the callback
        //         should be checked to ensure they are correct.  The callback will be called asynchronously so this
        //         test should take account of that.
        //         Whilst testing, ensure all values of 'returnedPictureFormat' are tested and verified.

        it("able to capture and process a document from a provided image", function() {
            runs(function(){
                //  todo : Each sample image / template should be tested within an it(), i.e. put this in a loop.
                expect(true);
            });
        });

    });

    describe("capturing a document is fault tolerant", function () {

        beforeEach(function () {});
        afterEach(function () {});

        it("will return a sensible error if an invalid template is provided", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing an invalid template (not an XML or corrupt xml).
                //         A callback with an error should be returned.  That error should make sense to the user.
                expect(true);
            });
        });

        it("will return a sensible error if an invalid image is provided", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing an invalid image (e.g. image not found).
                //         A callback with an error should be returned.  That error should make sense to the user.
                expect(true);
            });
        });

        it("will re-use the previously specified fileURI if not specified for a file capture", function() {
            runs(function(){
                //  todo : try and perform a capture from a file but do not specify the fileURI in the captureDocument propertyMap.
                //         Specify the fileURI previously through setProperty.  The document should be successfully captured.
                expect(true);
            });
        });

        it("will timeout if a non-matching template provided", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing a template not associated with that image.
                //         A callback with a timeout should be returned.
                expect(true);
            });
        });

        it("will timeout if the document cannot be processed quickly enough", function() {
            runs(function(){
                //  todo : try and capture one of the sample images providing the correct template but set the processing time
                //         too low to allow the processing to complete.
                //         A callback with a timeout should be returned.
                expect(true);
            });
        });

        it("will timeout if the user does not interact with the camera", function() {
            runs(function(){
                //  todo : try and capture with the camera.  Because this is an unmanned automated test there will be no interaction
                //         with the camera.  A callback with a timeout should be returned.
                expect(true);
            });
        });

    });

});
*/
