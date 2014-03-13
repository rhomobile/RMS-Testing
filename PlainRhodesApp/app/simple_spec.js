describe("ATSTestChecker examples: ", function() {
  it("Attempt to call the ATSTestChecker", function() {
  	// To get Device name, use the following function Rho.System.deviceName
  	// Developer will know test name and testId
  	var canRun = false;
  	$.ajax({
  		url : "http://192.168.1.115:8080/ATSTestChecker/canRunTest?device=MC55&testName=Barcode&testId=DOESNOTEXIST",
  		dataType : 'json',
  		async : false,
  		success : function(data) {
  			canRun = data.yes;
  		}
  	});

    expect(canRun).toBe(true);
  });

  it("Call VT282-2001 with Device MC55 and Test name Barcode, will pass", function() {
  	var canRun = false;

  	$.ajax({
  		url : "http://192.168.1.115:8080/ATSTestChecker/canRunTest?device=MC55&testName=Barcode&testId=VT282-2001",
  		dataType : 'json',
  		async : false,
  		success : function(data) {
  			canRun = data.yes;
  		}
  	});

    expect(canRun).toBe(true);
  });

	it("Call VT282-2001 with Device MC67 and Test name Barcode, will fail", function() {
  	var canRun = false;

  	$.ajax({
  		url : "http://192.168.1.115:8080/ATSTestChecker/canRunTest?device=MC67&testName=Barcode&testId=VT282-2001",
  		dataType : 'json',
  		async : false,
  		success : function(data) {
  			canRun = data.yes;
  		}
  	});

    expect(canRun).toBe(true);
  });  
});