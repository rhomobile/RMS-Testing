describe("RMS 4.0 File JS API", function () {
	
	beforeEach(function() {
		timeout = false;
	});
	
	// open file
	it("Open File - true", function() {
			runs(function()
			{
				Ruby.call('Filelist','openFile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});

			waitsFor(function(){
				if(timeout == true){
					return true;
				}
			}, 'Wait for 1 sec ajax call to happen', 1000);

			runs(function(){
				expect(Ruby.getReturnedValue()).toBe(true);
			});
	});
	
	// close with valid path
	it("VT288-003 : Close File - isOpened() should return false",function(){ //VT288-003 : is close ? | true
		runs(function()
			{
				Ruby.call('Filelist','closeFile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(false);
		});
		
	});
	
});




describe("RMS 4.1 : [SPB] Fix File reading errors in Ruby", function () {
		var description;
		var expectString = "Could not open file: '/programFiles/Test/rholog.txt'"
		var expectString1 = "Could not read file: '/programFiles/Test/rholog.txt'"
		var timeout = false;
		beforeEach(function() {
			timeout = false;
		});
		it("VT288-087 :Raises exception while opening nonexistent file in OPEN_FOR_READ mode", function () {
			runs(function()
				{
					Ruby.call('Filelist','read_nonexistfile');	
					// Time to wait ajax to be happen
					setTimeout(function() {
						timeout = true;
					}, 500);
				});

				waitsFor(function(){
					if(timeout == true){
						return true;
					}
				}, 'Wait for 1 sec ajax call to happen', 1000);

				runs(function(){
					expect(Ruby.getReturnedValue()).toBe(expectString);
				});
				 
	    });
		
	
	    it("VT288-088 :Raises exception while opening nonexistent file in OPEN_FOR_READ_WRITE mode", function () {
	    	runs(function()
				{
					Ruby.call('Filelist','readwrite_nonexistfile');	
					// Time to wait ajax to be happen
					setTimeout(function() {
						timeout = true;
					}, 500);
				});

				waitsFor(function(){
					if(timeout == true){
						return true;
					}
				}, 'Wait for 1 sec ajax call to happen', 1000);

				runs(function(){
					expect(Ruby.getReturnedValue()).toBe(expectString);
				});
				
	    });
	
	    it("VT288-089 :Don't Raises exception while opening nonexistent file in OPEN_FOR_APPEND mode", function () {
	    	runs(function()
				{
					Ruby.call('Filelist','append_nonexistfile');	
					// Time to wait ajax to be happen
					setTimeout(function() {
						timeout = true;
					}, 500);
				});

				waitsFor(function(){
					if(timeout == true){
						return true;
					}
				}, 'Wait for 1 sec ajax call to happen', 1000);

				runs(function(){
					expect(Ruby.getReturnedValue()).toBe('');
				});
	    });

	    it("VT288-090 :Don't Raises exception while opening non existent file in OPEN_FOR_WRITE mode", function () {
	    	runs(function()
				{
					Ruby.call('Filelist','write_nonexistfile');	
					// Time to wait ajax to be happen
					setTimeout(function() {
						timeout = true;
					}, 500);
				});

				waitsFor(function(){
					if(timeout == true){
						return true;
					}
				}, 'Wait for 1 sec ajax call to happen', 1000);

				runs(function(){
					expect(Ruby.getReturnedValue()).toBe('');
				});
	    });
	
		it("VT288-091 :Raises exception when Read call with non existing file", function () {
			
			runs(function()
				{
					Ruby.call('Filelist','readcall_nonexistfile');	
					// Time to wait ajax to be happen
					setTimeout(function() {
						timeout = true;
					}, 500);
				});

				waitsFor(function(){
					if(timeout == true){
						return true;
					}
				}, 'Wait for 1 sec ajax call to happen', 1000);

				runs(function(){
					expect(Ruby.getReturnedValue()).toBe(expectString1);
				});
	    });
		
	
	    it("VT288-092 :Doesn't raises exception while reading empty file", function () {
	    	runs(function()
				{
					Ruby.call('Filelist','read_emptyfile');	
					// Time to wait ajax to be happen
					setTimeout(function() {
						timeout = true;
					}, 500);
				});

				waitsFor(function(){
					if(timeout == true){
						return true;
					}
				}, 'Wait for 1 sec ajax call to happen', 1000);

				runs(function(){
					expect(Ruby.getReturnedValue()).toBe('');
				});
	    });
	   
		it("VT288-093 :Doesn't raises exception while reading CR LF", function () {
			runs(function()
				{
					Ruby.call('Filelist','readCRLF');	
					// Time to wait ajax to be happen
					setTimeout(function() {
						timeout = true;
					}, 500);
				});

				waitsFor(function(){
					if(timeout == true){
						return true;
					}
				}, 'Wait for 1 sec ajax call to happen', 1000);

				runs(function(){
					expect(Ruby.getReturnedValue()).toBe("\r\n");
				});
	    });
	
	    it("VT288-094 :Doesn't raises exception while loading file without double quote", function () {
	    	runs(function()
				{
					Ruby.call('Filelist','loadfile_withoutdq');	
					// Time to wait ajax to be happen
					setTimeout(function() {
						timeout = true;
					}, 500);
				});

				waitsFor(function(){
					if(timeout == true){
						return true;
					}
				}, 'Wait for 1 sec ajax call to happen', 1000);

				runs(function(){
					expect(Ruby.getReturnedValue()).toBe('ab');
				});
	    });
    });
