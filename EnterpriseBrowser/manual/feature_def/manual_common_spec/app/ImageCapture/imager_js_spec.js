describe("Image Capture Tests", function () {
  
    var genericObj = new ActiveXObject("PocketBrowser.Generic");

    (function(){
    $('#imager_type').empty();
      var imagers = genericObj.InvokeMETAFunction('Imager', 'Enumerate');
    
      for (var i = 0; i < imagers.length; i++) {
        $('#imager_type').append($('<option />', {
            value: imagers[i],
            text : imagers[i] 
        }));
      }
   })();

    beforeEach(function () {
    });

    afterEach(function () {
    });


    it("VT056-1122 | Enumerate Imager |", function(){

      dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
      dispExpectedResult("Enumerate should return a list of imagers present on the device via imagerEnumevent. imagerEnumevent tag will be actioned immediately");
      
      _result.waitToRunTest();

      runs(function() {
        var result = genericObj.InvokeMETAFunction('Imager', 'Enumerate');
        displayResult(jasmine.getEnv().currentSpec.description, JSON.stringify(result));
      });

      _result.waitForResponse();

    });

    it("VT056-1123 | Enable:[Value] with imager |", function(){

      dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
      dispExpectedResult("Imager should be enabled</br>Image should be captured from PB and should be sent to either ftp or http location");
      
      _result.waitToRunTest();

      runs(function() {
        var result = genericObj.InvokeMETAFunction('Imager', 'Enumerate');
        displayResult(jasmine.getEnv().currentSpec.description, JSON.stringify(result));
      });

      _result.waitForResponse();

    });

    it("VT056-1124 | Enable:[Value] with camera |", function(){

      dispTestCaseRunning(jasmine.getEnv().currentSpec.description);
      dispExpectedResult("Enumerate should return a list of imagers present on the device via imagerEnumevent. imagerEnumevent tag will be actioned immediately");
      
      _result.waitToRunTest();

      runs(function() {
        var result = genericObj.InvokeMETAFunction('Imager', 'Enumerate');
        displayResult(jasmine.getEnv().currentSpec.description, JSON.stringify(result));
      });

      _result.waitForResponse();

    });
    

});