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

	
	it("VTXX-0001 | call isAlive  before timeout seconds |", function() {
			var one = Rho.Timer.create();
			one.start(1000, one_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(true);
				}, 500);

            waits(1100);
			runs(function(){
    			expect(onecallbackFired).toEqual(true);
			});
	    
	});
	
/*	it("VTXX-0002 | call isAlive  before 45 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			one.start(45000, one_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(true);
				}, 30000);
			});
			waits(46000);
			runs(function(){
			expect(onecallbackFired).toEqual(true);
			});
	    
	}); */
	
	it("VTXX-0003 | call isAlive after timeout seconds |", function() {
			var one = Rho.Timer.create();
			one.start(500, one_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(false);
				}, 600);
			waits(1000);
			runs(function(){
			    expect(onecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0004 | call isAlive for different timers (1) |", function() {
			var one = Rho.Timer.create();
			var two = Rho.Timer.create();
			var three = Rho.Timer.create();
			one.start(200, one_callback);
			two.start(250, two_callback);
			three.start(400, three_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(false);
					expect(two.isAlive()).toEqual(true);
					expect(three.isAlive()).toEqual(true);
				}, 210);
			waits(500);
			runs(function(){
    			expect(onecallbackFired).toEqual(true);
	    		expect(twocallbackFired).toEqual(true);
		    	expect(threecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0005 | call isAlive for different timers (2) |", function() {
			var one = Rho.Timer.create();
			var two = Rho.Timer.create();
			var three = Rho.Timer.create();
			one.start(200, one_callback);
			two.start(250, two_callback);
			three.start(400, three_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(false);
					expect(two.isAlive()).toEqual(false);
					expect(three.isAlive()).toEqual(false);
				}, 500);
			waits(550);
			runs(function(){
    			expect(onecallbackFired).toEqual(true);
	    		expect(twocallbackFired).toEqual(true);
		    	expect(threecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0006 | call stop before timeout |", function() {
			var one = Rho.Timer.create();
			one.start(500, one_callback);
			setTimeout(function() {
					one.stop();
					expect(one.isAlive()).toEqual(false);
				}, 200);
			waits(550);
			runs(function(){			
			    expect(onecallbackFired).toEqual(false);
			});	

	});
	
/*	it("VTXX-0007 | call stop before 60 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			one.start(60000, one_callback);
			setTimeout(function() {
					one.stop();
					expect(one.isAlive()).toEqual(false);
				}, 45000);
			});
			waits(61000);
			runs(function(){			
			expect(onecallbackFired).toEqual(false);
			});	

	});*/
	
	it("VTXX-0008 | call stop after timeout |", function() {
			var one = Rho.Timer.create();
			one.start(200, one_callback);
			setTimeout(function() {
					one.stop();
				}, 210);
			waits(220);
			runs(function(){
    			expect(one.isAlive()).toEqual(false);
	    		expect(onecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0009 | call stop for one of three timers|", function() {
			var one = Rho.Timer.create();
			var two = Rho.Timer.create();
			var three = Rho.Timer.create();
			one.start(500, one_callback);
			two.start(300, two_callback);
			three.start(600, three_callback);
			setTimeout(function() {
					two.stop();
					expect(one.isAlive()).toEqual(true);	
					expect(two.isAlive()).toEqual(false);
					expect(three.isAlive()).toEqual(true);
				}, 200);
			waits(650);
			runs(function(){	
    			expect(onecallbackFired).toEqual(true);
	    		expect(twocallbackFired).toEqual(false);
		    	expect(threecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0010 | call stop for all timers |", function() {
			var one = Rho.Timer.create();
			var two = Rho.Timer.create();
			var three = Rho.Timer.create();
			one.start(250, one_callback);
			two.start(300, two_callback);
			three.start(350, three_callback);
			setTimeout(function() {
					one.stop();
					two.stop();
					three.stop();
					expect(one.isAlive()).toEqual(false);	
					expect(two.isAlive()).toEqual(false);
					expect(three.isAlive()).toEqual(false);
				}, 160);

			waits(400);
			runs(function(){	
			    expect(onecallbackFired).toEqual(false);
			    expect(twocallbackFired).toEqual(false);
			    expect(threecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0011 | call isAlive without calling start |", function() {
			var one = Rho.Timer.create();
			var two = Rho.Timer.create();
			var three = Rho.Timer.create();
			one.start(200, one_callback);
			three.start(250, three_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(true);	
					expect(two.isAlive()).toEqual(false);
					expect(three.isAlive()).toEqual(true);
				}, 100);
			waits(300);
			runs(function(){	
    			expect(onecallbackFired).toEqual(true);
	    		expect(twocallbackFired).toEqual(false);
		    	expect(threecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0012 | call stop without calling start |", function() {
			var one = Rho.Timer.create();
			var two = Rho.Timer.create();
			var three = Rho.Timer.create();
			one.start(100, one_callback);
			three.start(250, three_callback);
			setTimeout(function() {
					one.stop();
					two.stop();
					three.stop();
					expect(one.isAlive()).toEqual(false);	
					expect(two.isAlive()).toEqual(false);
					expect(three.isAlive()).toEqual(false);
				}, 150);
			waits(300);
			runs(function(){	
    			expect(onecallbackFired).toEqual(true);
	    		expect(twocallbackFired).toEqual(false);
		    	expect(threecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0013 | call start with 100 ms |", function() {
			var one = Rho.Timer.create();
			one.start(100, one_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(false);	
				}, 200);
			waits(210);
			runs(function(){	
    			expect(onecallbackFired).toEqual(true);
			});	
	});
	
	it("VTXX-0014 | call start with 0 ms |", function() {
			var one = Rho.Timer.create();
			expect(function() { one.start(0, one_callback); }).toThrow();
	});
	
	it("VTXX-0015 | call start with -10000 ms |", function() {
			var one = Rho.Timer.create();
			expect(function() { one.start(-10000, one_callback); }).toThrow();
	});
	
	it("VTXX-0016 | call start without param and callback |", function() {
			var one = Rho.Timer.create();
			expect(function() { one.start(); }).toThrow();
	});
	
	it("VTXX-0017 | call start only with callback |", function() {
			var one = Rho.Timer.create();
			expect(function() { one.start(one_callback); }).toThrow();
	});
	
	it("VTXX-0018 | call start only with interval |", function() {
			var one = Rho.Timer.create();
			expect(function() { one.start(10000); }).toThrow();
	});
});
