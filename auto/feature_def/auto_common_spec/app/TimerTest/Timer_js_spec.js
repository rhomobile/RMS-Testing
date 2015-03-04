	//var time_val = 1;
	//var time_handle;
	var onecallbackFired = false;
	var twocallbackFired = false;
	var threecallbackFired = false;

describe("Timer JS API Test", function() {
	
	beforeEach(function() {
		//startTestTimer();
		onecallbackFired = false;
		twocallbackFired = false;
		threecallbackFired = false;
		//displayResult("Output: ","");
		//one.stop();
	});

    afterEach(function () {
		//stopTestTimer();
    });

	var one_callback = function() {
	    //displayResult("Output: First Timer callback fired");
	    //first.innerHTML="First Timer callback fired";
		onecallbackFired = true;
	}

	var two_callback = function() {
	    //displayResult("Output: Second Timer callback fired");
		//second.innerHTML="Second Timer callback fired";
		twocallbackFired = true;
	}

	var three_callback = function() {	
		//displayResult("Output: Third Timer callback fired");
		//third.innerHTML="Third Timer callback fired";
	    threecallbackFired = true;
	}
	

	/* function startTestTimer()
	{
		time_val = 1;
		time_handle = setInterval(function(){document.getElementById('testDuration').textContent = time_val;time_val = time_val + 1;}, 1000);
	}

	function stopTestTimer()
	{
		clearInterval(time_handle);
	} */

	
	it("VTXX-0001 | call isAlive  before 10 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			one.start(10000, one_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(true);
				}, 7000);
			});
				waits(11000);
			runs(function(){
			expect(onecallbackFired).toEqual(true);
			});
	    
	});
	
	it("VTXX-0002 | call isAlive  before 45 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			one.start(45000, one_callback);
			setTimeout(function() {
					expect(one.isAlive).toEqual(true);
				}, 30000);
			});
			waits(16000);
			runs(function(){
			expect(onecallbackFired).toEqual(true);
			});
	    
	});
	
	it("VTXX-0003 | call isAlive after 30 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			one.start(30000, one_callback);
			setTimeout(function() {
					expect(one.isAlive).toEqual(false);
				}, 31000);
			});
			waits(1000);
			runs(function(){
			expect(onecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0004 | call isAlive after 20 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			var two = Rho.Timer.create;
			var three = Rho.Timer.create;
			one.start(20000, one_callback);
			two.start(25000, two_callback);
			three.start(40000, three_callback);
			setTimeout(function() {
					expect(one.isAlive).toEqual(false);
					expect(two.isAlive).toEqual(true);
					expect(three.isAlive).toEqual(true);
				}, 21000);
			});
			waits(20000);
			runs(function(){
			expect(onecallbackFired).toEqual(true);
			expect(twocallbackFired).toEqual(true);
			expect(threecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0005 | call isAlive after 15 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			var two = Rho.Timer.create;
			var three = Rho.Timer.create;
			one.start(5000, one_callback);
			two.start(10000, two_callback);
			three.start(15000, three_callback);
			setTimeout(function() {
					expect(one.isAlive).toEqual(false);
					expect(two.isAlive).toEqual(false);
					expect(three.isAlive).toEqual(false);
				}, 16000);
			});
			waits(1000);
			runs(function(){
			expect(onecallbackFired).toEqual(true);
			expect(twocallbackFired).toEqual(true);
			expect(threecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0006 | call stop before 10 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			one.start(15000, one_callback);
			setTimeout(function() {
					one.stop();
					expect(one.isAlive).toEqual(false);
				}, 9000);
			});
			waits(7000);
			runs(function(){			
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0007 | call stop before 60 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			one.start(60000, one_callback);
			setTimeout(function() {
					one.stop();
					expect(one.isAlive).toEqual(false);
				}, 45000);
			});
			waits(16000);
			runs(function(){			
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0008 | call stop after 20 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			one.start(20000, one_callback);
			setTimeout(function() {
					one.stop();
				}, 21000);
			});
			waits(1000);
			runs(function(){
			expect(one.isAlive).toEqual(false);
			expect(onecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0009 | call stop after 5 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			var two = Rho.Timer.create;
			var three = Rho.Timer.create;
			one.start(15000, one_callback);
			two.start(10000, two_callback);
			three.start(20000, three_callback);
			setTimeout(function() {
					two.stop();
					expect(one.isAlive).toEqual(true);	
					expect(two.isAlive).toEqual(false);
					expect(three.isAlive).toEqual(true);
				}, 6000);
			});
			waits(15000);
			runs(function(){	
			expect(onecallbackFired).toEqual(true);
			expect(twocallbackFired).toEqual(false);
			expect(threecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0010 | call stop after 15 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			var two = Rho.Timer.create;
			var three = Rho.Timer.create;
			one.start(25000, one_callback);
			two.start(30000, two_callback);
			three.start(35000, three_callback);
			setTimeout(function() {
					one.stop();
					two.stop();
					three.stop();
					expect(one.isAlive).toEqual(false);	
					expect(two.isAlive).toEqual(false);
					expect(three.isAlive).toEqual(false);
				}, 16000);
			});
			waits(20000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			expect(twocallbackFired).toEqual(false);
			expect(threecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0011 | call isAlive without calling start |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			var two = Rho.Timer.create;
			var three = Rho.Timer.create;
			one.start(10000, one_callback);
			three.start(15000, three_callback);
			setTimeout(function() {
					expect(one.isAlive).toEqual(true);	
					expect(two.isAlive).toEqual(false);
					expect(three.isAlive).toEqual(true);
				}, 9000);
			});
			waits(6000);
			runs(function(){	
			expect(onecallbackFired).toEqual(true);
			expect(twocallbackFired).toEqual(false);
			expect(threecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0012 | call stop without calling start |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			var two = Rho.Timer.create;
			var three = Rho.Timer.create;
			one.start(10000, one_callback);
			three.start(15000, three_callback);
			setTimeout(function() {
					one.stop();
					two.stop();
					three.stop();
					expect(one.isAlive).toEqual(false);	
					expect(two.isAlive).toEqual(false);
					expect(three.isAlive).toEqual(false);
				}, 12000);
			});
			waits(4000);
			runs(function(){	
			expect(onecallbackFired).toEqual(true);
			expect(twocallbackFired).toEqual(false);
			expect(threecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0013 | call start with 100 ms |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			one.start(100, one_callback);
			setTimeout(function() {
					expect(one.isAlive).toEqual(true);	
				}, 1000);
			});
			waits(1000);
			runs(function(){	
			expect(onecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0014 | call start with 0 ms |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			one.start(0, one_callback);
			setTimeout(function() {
					expect(one.isAlive).toEqual(false);	
				}, 1000);
			});
			waits(1000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0015 | call start with -10000 ms |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			one.start(-10000, one_callback);
			setTimeout(function() {
					expect(one.isAlive).toEqual(false);	
				}, 1000);
			});
			waits(1000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0016 | call start without param and callback |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			one.start();
			setTimeout(function() {
					expect(one.isAlive).toEqual(false);	
				}, 1000);
			});
			waits(1000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0017 | call start only with callback |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			one.start(one_callback);
			setTimeout(function() {
					expect(one.isAlive).toEqual(false);	
				}, 1000);
			});
			waits(1000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0018 | call start only with interval |", function() {
		runs(function(){
			var one = Rho.Timer.create;
			one.start(10000);
			setTimeout(function() {
					expect(one.isAlive).toEqual(false);	
				}, 11000);
			});
			waits(1000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	
});
