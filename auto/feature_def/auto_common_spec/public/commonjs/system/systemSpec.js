describe("System Module Test Starts Here", function() {

	it("VT278-003 : call getProperty with  applicationIconBadge as 1 : 1", function() {
		runs(function(){
			Rho.System.applicationIconBadge = 1;
	    	expect(Rho.System.applicationIconBadge).toEqual(1);
		});
	});
	
	it("VT278-004 : call getProperty with  applicationIconBadge as 0 : 0", function() {
		runs(function(){
			Rho.System.applicationIconBadge = 0;
	    	expect(Rho.System.applicationIconBadge).toEqual(0);
		});
	});
	
	it("VT278-005 : call getProperty with country : US", function() {
		runs(function(){
			Rho.System.applicationIconBadge = 0;
	    	expect(Rho.System.applicationIconBadge).toEqual(0);
		});
	});
	
});