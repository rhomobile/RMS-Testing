describe("Timer JS API Test", function() {
	
	beforeEach(function() {
		document.getElementById('cbevent1').innerHTML = 'false';
		document.getElementById('cbevent2').innerHTML = 'false';
		document.getElementById('cbevent3').innerHTML = 'false';
		document.getElementById('alivestatus1').innerHTML = 'false';
		document.getElementById('alivestatus2').innerHTML = 'false';
		document.getElementById('alivestatus3').innerHTML = 'false';
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
			}, 7000);
		});
		waits(11000);
		runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('true');
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('true');
		});
	});
	
	it("VTXX-0002 | call isAlive  before 45 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=45000');
			setTimeout(function() {
				Ruby.call('Timertest','timer_isalive_one');
				waits(500);
			}, 30000);
		});
		waits(46000);
		runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('true');
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('true');
		});    
	});
	
	it("VTXX-0003 | call isAlive after 30 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=30000');
			setTimeout(function() {
				Ruby.call('Timertest','timer_isalive_one');
				waits(500);
				
			}, 31000);
		});
		waits(35000);
		runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('true');
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
				
			}, 21000);
		});
		waits(42000);
		runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');			
			expect("isAlive2: "+document.getElementById('alivestatus2').innerHTML).toContain('true');
			expect("isAlive3: "+document.getElementById('alivestatus3').innerHTML).toContain('true');
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('true');
			expect("Callback event2: "+document.getElementById('cbevent2').innerHTML).toContain('true');
			expect("Callback event3: "+document.getElementById('cbevent3').innerHTML).toContain('true');
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
				
			}, 16000);
		});
		waits(20000);
		runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');		
			expect("isAlive2: "+document.getElementById('alivestatus2').innerHTML).toContain('false');
			expect("isAlive3: "+document.getElementById('alivestatus3').innerHTML).toContain('false');
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('true');
			expect("Callback event2: "+document.getElementById('cbevent2').innerHTML).toContain('true');
			expect("Callback event3: "+document.getElementById('cbevent3').innerHTML).toContain('true');
		});	
	});
	
	it("VTXX-0006 | call stop before 10 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=15000');
			setTimeout(function() {
					Ruby.call('Timertest','timer_stop_one');
					waits(500);
					Ruby.call('Timertest','timer_isalive_one');
					waits(500);
					
				}, 9000);
			});
			waits(20000);
			runs(function(){
				expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');	
				expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('false');			
			});	

	});
	
	it("VTXX-0007 | call stop before 60 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=60000');
			setTimeout(function() {
					Ruby.call('Timertest','timer_stop_one');
					waits(500);
					Ruby.call('Timertest','timer_isalive_one');
					waits(500);
						
				}, 45000);
			});
			waits(61000);
			runs(function(){	
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('false');		
			});	

	});
	
	it("VTXX-0008 | call stop after 20 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=20000');
			setTimeout(function() {
					Ruby.call('Timertest','timer_stop_one');
					waits(500);
				}, 21000);
			});
			waits(22000);
			runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');	
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('true');	
			});	

	});
	
	it("VTXX-0009 | call stop after 5 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=15000');
			Ruby.call('Timertest','timer_start_two?time=10000');
			Ruby.call('Timertest','timer_start_three?time=20000');
			setTimeout(function() {
					Ruby.call('Timertest','timer_stop_two');
					waits(500);
					Ruby.call('Timertest','timer_isalive_one');
					Ruby.call('Timertest','timer_isalive_two');
					Ruby.call('Timertest','timer_isalive_three');
					waits(500);
					
				}, 6000);
			});
			waits(21000);
			runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('true');		
			expect("isAlive2: "+document.getElementById('alivestatus2').innerHTML).toContain('false');
			expect("isAlive3: "+document.getElementById('alivestatus3').innerHTML).toContain('true');			
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('true');
			expect("Callback event2: "+document.getElementById('cbevent2').innerHTML).toContain('false');
			expect("Callback event3: "+document.getElementById('cbevent3').innerHTML).toContain('true');
			});	

	});
	
	it("VTXX-0010 | call stop after 15 seconds |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=25000');
			Ruby.call('Timertest','timer_start_two?time=30000');
			Ruby.call('Timertest','timer_start_three?time=35000');
			setTimeout(function() {
					Ruby.call('Timertest','timer_stop_one');
					Ruby.call('Timertest','timer_stop_two');
					Ruby.call('Timertest','timer_stop_three');
					waits(500);
					Ruby.call('Timertest','timer_isalive_one');
					Ruby.call('Timertest','timer_isalive_two');
					Ruby.call('Timertest','timer_isalive_three');
					waits(500);
					
				}, 16000);
			});
			waits(40000);
			runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');		
			expect("isAlive2: "+document.getElementById('alivestatus2').innerHTML).toContain('false');
			expect("isAlive3: "+document.getElementById('alivestatus3').innerHTML).toContain('false');
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('false');
			expect("Callback event2: "+document.getElementById('cbevent2').innerHTML).toContain('false');
			expect("Callback event3: "+document.getElementById('cbevent3').innerHTML).toContain('false');
			});	

	});
	
	it("VTXX-0011 | call isAlive without calling start |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=10000');
			Ruby.call('Timertest','timer_create_two');
			Ruby.call('Timertest','timer_start_three?time=10000');
			setTimeout(function() {
					Ruby.call('Timertest','timer_isalive_one');
					Ruby.call('Timertest','timer_isalive_two');
					Ruby.call('Timertest','timer_isalive_three');
					waits(500);
					
				}, 9000);
			});
			waits(16000);
			runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('true');		
			expect("isAlive2: "+document.getElementById('alivestatus2').innerHTML).toContain('false');
			expect("isAlive3: "+document.getElementById('alivestatus3').innerHTML).toContain('true');
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('true');
			expect("Callback event2: "+document.getElementById('cbevent2').innerHTML).toContain('false');
			expect("Callback event3: "+document.getElementById('cbevent3').innerHTML).toContain('true');
			});	

	});
	
	it("VTXX-0012 | call stop without calling start |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=10000');
			Ruby.call('Timertest','timer_create_two');
			Ruby.call('Timertest','timer_start_three?time=15000');
			setTimeout(function() {
					Ruby.call('Timertest','timer_stop_one');
					Ruby.call('Timertest','timer_stop_two');
					Ruby.call('Timertest','timer_stop_three');
					waits(500);
					Ruby.call('Timertest','timer_isalive_one');
					Ruby.call('Timertest','timer_isalive_two');
					Ruby.call('Timertest','timer_isalive_three');
					waits(500);
					
				}, 12000);
			});
			waits(16000);
			runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');		
			expect("isAlive2: "+document.getElementById('alivestatus2').innerHTML).toContain('false');
			expect("isAlive3: "+document.getElementById('alivestatus3').innerHTML).toContain('false');
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('true');
			expect("Callback event2: "+document.getElementById('cbevent2').innerHTML).toContain('false');
			expect("Callback event3: "+document.getElementById('cbevent3').innerHTML).toContain('false');
			
			});	

	});
	
	it("VTXX-0013 | call start with 100 ms |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=100');
			setTimeout(function() {
					Ruby.call('Timertest','timer_isalive_one');
					waits(500);
					
				}, 1000);
			});
			waits(2000);
			runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');				
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('true');
			});	

	});
	
	it("VTXX-0014 | call start with 0 ms |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=0');
			setTimeout(function() {
					Ruby.call('Timertest','timer_isalive_one');
					waits(500);
					
				}, 1000);
			});
			waits(2000);
			runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');	
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('false');
			});	

	});
	
	it("VTXX-0015 | call start with -10000 ms |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_start_one?time=-10000');
			setTimeout(function() {
					Ruby.call('Timertest','timer_isalive_one');
					waits(500);
					
				}, 1000);
			});
			waits(2000);
			runs(function(){	
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');	
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('false');
			});	

	});
	
	it("VTXX-0016 | call start without param and callback |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_without_param');
			setTimeout(function() {
					Ruby.call('Timertest','timer_isalive_one');
					waits(500);
					
				}, 1000);
			});
			waits(2000);
			runs(function(){	
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');	
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('false');
			});	

	});
	
	it("VTXX-0017 | call start only with callback |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_with_callback');
			setTimeout(function() {
					Ruby.call('Timertest','timer_isalive_one');
					waits(500);
					
				}, 1000);
			});
			waits(2000);
			runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');				
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('false');
			});	

	});
	
	it("VTXX-0018 | call start only with interval |", function() {
		runs(function(){
			Ruby.call('Timertest','timer_with_interval?time=-10000');
			setTimeout(function() {
					Ruby.call('Timertest','timer_isalive_one');
					waits(500);
					
				}, 11000);
			});
			waits(12000);
			runs(function(){
			expect("isAlive1: "+document.getElementById('alivestatus1').innerHTML).toContain('false');				
			expect("Callback event1: "+document.getElementById('cbevent1').innerHTML).toContain('false');
			});	

	});
	
	
});
