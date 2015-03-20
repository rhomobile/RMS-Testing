describe("Timer JS API Test", function() {
	
	beforeEach(function() {
		document.getElementById('cbevent1').innerHTML = '';
		document.getElementById('cbevent2').innerHTML = '';
		document.getElementById('cbevent3').innerHTML = '';
		document.getElementById('alivestatus1').innerHTML = '';
		document.getElementById('alivestatus2').innerHTML = '';
		document.getElementById('alivestatus3').innerHTML = '';
	});

    afterEach(function () {
		//stopTestTimer();
    });

	
	it("VTXX-0001 | call isAlive  before 10 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one');
			setTimeout(function() {
				Ruby.call('Timertest','timer_isalive_one');
				waits(500);
				expect(document.getElementById('alivestatus1').innerHTML).toEqual('true');
			}, 7000);
		});
		waits(11000);
		runs(function(){
			expect(document.getElementById('cbevent').innerHTML).toEqual('true');
		});
	});
	
	it("VTXX-0002 | call isAlive  before 45 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=45000');
			setTimeout(function() {
				Ruby.call('Timertest','timer_isalive_one');
				waits(500);
				expect(document.getElementById('alivestatus1').innerHTML).toEqual('true');
			}, 30000);
		});
		waits(46000);
		runs(function(){
			expect(document.getElementById('cbevent1').innerHTML).toEqual('true');
		});    
	});
	
	it("VTXX-0003 | call isAlive after 30 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=30000');
			setTimeout(function() {
				Ruby.call('Timertest','timer_isalive_one');
				waits(500);
				expect(document.getElementById('alivestatus1').innerHTML).toEqual('false');
			}, 31000);
		});
		waits(35000);
		runs(function(){
			expect(document.getElementById('cbevent1').innerHTML).toEqual('true');
		});	
	});
	
	it("VTXX-0004 | call isAlive after 20 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=20000');
			Ruby.call('Timertest','timer_start_two?time=25000');
			Ruby.call('Timertest','timer_start_three?time=40000');
			setTimeout(function() {
				Ruby.call('Timertest','timer_isalive_one');
				Ruby.call('Timertest','timer_isalive_two');
				Ruby.call('Timertest','timer_isalive_three');
				waits(500);
				expect(document.getElementById('alivestatus1').innerHTML).toEqual('false');			
				expect(document.getElementById('alivestatus2').innerHTML).toEqual('true');
				expect(document.getElementById('alivestatus3').innerHTML).toEqual('true');
			}, 21000);
		});
		waits(42000);
		runs(function(){
			expect(document.getElementById('cbevent1').innerHTML).toEqual('true');
			expect(document.getElementById('cbevent2').innerHTML).toEqual('true');
			expect(document.getElementById('cbevent3').innerHTML).toEqual('true');
		});	
	});
	
	it("VTXX-0005 | call isAlive after 15 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=5000');
			Ruby.call('Timertest','timer_start_two?time=10000');
			Ruby.call('Timertest','timer_start_three?time=15000');
			setTimeout(function() {
				Ruby.call('Timertest','timer_isalive_one');
				Ruby.call('Timertest','timer_isalive_two');
				Ruby.call('Timertest','timer_isalive_three');
				waits(500);
				expect(document.getElementById('alivestatus1').innerHTML).toEqual('false');		
				expect(document.getElementById('alivestatus2').innerHTML).toEqual('false');
				expect(document.getElementById('alivestatus3').innerHTML).toEqual('false');
			}, 16000);
		});
		waits(20000);
		runs(function(){
			expect(document.getElementById('cbevent1').innerHTML).toEqual('true');
			expect(document.getElementById('cbevent2').innerHTML).toEqual('true');
			expect(document.getElementById('cbevent3').innerHTML).toEqual('true');
		});	
	});
	
	it("VTXX-0006 | call stop before 10 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			one.start(15000, one_callback);
			setTimeout(function() {
					one.stop();
					expect(one.isAlive()).toEqual(false);
				}, 9000);
			});
			waits(20000);
			runs(function(){			
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0007 | call stop before 60 seconds |", function() {
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

	});
	
	it("VTXX-0008 | call stop after 20 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			one.start(20000, one_callback);
			setTimeout(function() {
					one.stop();
				}, 21000);
			});
			waits(22000);
			runs(function(){
			expect(one.isAlive()).toEqual(false);
			expect(onecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0009 | call stop after 5 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			var two = Rho.Timer.create();
			var three = Rho.Timer.create();
			one.start(15000, one_callback);
			two.start(10000, two_callback);
			three.start(20000, three_callback);
			setTimeout(function() {
					two.stop();
					expect(one.isAlive()).toEqual(true);	
					expect(two.isAlive()).toEqual(false);
					expect(three.isAlive()).toEqual(true);
				}, 6000);
			});
			waits(21000);
			runs(function(){	
			expect(onecallbackFired).toEqual(true);
			expect(twocallbackFired).toEqual(false);
			expect(threecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0010 | call stop after 15 seconds |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			var two = Rho.Timer.create();
			var three = Rho.Timer.create();
			one.start(25000, one_callback);
			two.start(30000, two_callback);
			three.start(35000, three_callback);
			setTimeout(function() {
					one.stop();
					two.stop();
					three.stop();
					expect(one.isAlive()).toEqual(false);	
					expect(two.isAlive()).toEqual(false);
					expect(three.isAlive()).toEqual(false);
				}, 16000);
			});
			waits(40000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			expect(twocallbackFired).toEqual(false);
			expect(threecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0011 | call isAlive without calling start |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			var two = Rho.Timer.create();
			var three = Rho.Timer.create();
			one.start(10000, one_callback);
			three.start(15000, three_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(true);	
					expect(two.isAlive()).toEqual(false);
					expect(three.isAlive()).toEqual(true);
				}, 9000);
			});
			waits(16000);
			runs(function(){	
			expect(onecallbackFired).toEqual(true);
			expect(twocallbackFired).toEqual(false);
			expect(threecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0012 | call stop without calling start |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			var two = Rho.Timer.create();
			var three = Rho.Timer.create();
			one.start(10000, one_callback);
			three.start(15000, three_callback);
			setTimeout(function() {
					one.stop();
					two.stop();
					three.stop();
					expect(one.isAlive()).toEqual(false);	
					expect(two.isAlive()).toEqual(false);
					expect(three.isAlive()).toEqual(false);
				}, 12000);
			});
			waits(16000);
			runs(function(){	
			expect(onecallbackFired).toEqual(true);
			expect(twocallbackFired).toEqual(false);
			expect(threecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0013 | call start with 100 ms |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			one.start(100, one_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(false);	
				}, 1000);
			});
			waits(2000);
			runs(function(){	
			expect(onecallbackFired).toEqual(true);
			});	

	});
	
	it("VTXX-0014 | call start with 0 ms |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			one.start(0, one_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(false);	
				}, 1000);
			});
			waits(2000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0015 | call start with -10000 ms |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			one.start(-10000, one_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(false);	
				}, 1000);
			});
			waits(2000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0016 | call start without param and callback |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			one.start();
			setTimeout(function() {
					expect(one.isAlive()).toEqual(false);	
				}, 1000);
			});
			waits(2000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0017 | call start only with callback |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			one.start(one_callback);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(false);	
				}, 1000);
			});
			waits(2000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	it("VTXX-0018 | call start only with interval |", function() {
		runs(function(){
			var one = Rho.Timer.create();
			one.start(10000);
			setTimeout(function() {
					expect(one.isAlive()).toEqual(false);	
				}, 11000);
			});
			waits(12000);
			runs(function(){	
			expect(onecallbackFired).toEqual(false);
			});	

	});
	
	
});
