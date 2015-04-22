describe('Ruby Extension Tests', function () {

	var timeout = false;

	beforeEach(function(){
		timeout = false;
		document.getElementById('result').innerHTML = '';
	});

	it('Should support ruby URI extension', function () {
		var result = '';
	   	runs(function(){
	        Ruby.call('Rubyextensions','uri_extension');
			setTimeout(function() {
				timeout = true;
			}, 500);
		});
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		},'Wait for 1 sec ajax call to happen', 1000);
		runs(function(){
			var result = document.getElementById('result').innerHTML
            expect(result).toEqual('http');
    	});
	});

	it('Should support ruby JSON extension', function () {
		var result = '';
	   	runs(function(){
            Ruby.call('Rubyextensions','json_extension');
            setTimeout(function() {
				timeout = true;
			}, 500);
    	});
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		},'Wait for 1 sec ajax call to happen', 1000);
		runs(function(){
			var result = document.getElementById('result').innerHTML
            expect(result).toEqual('{"make":"bmw","year":"2003"}');
    	});			
	});

	it('Should support ruby Digest/SHA1 extension', function () {
		var result = '';
	   	runs(function(){
            Ruby.call('Rubyextensions','digestsha1_extension');
            setTimeout(function() {
				timeout = true;
			}, 500);
    	});
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		},'Wait for 1 sec ajax call to happen', 1000);
		runs(function(){
			var result = document.getElementById('result').innerHTML
            expect(result).toEqual('0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33');
    	});
	});

	it('Should support ruby Digest/MD5 extension', function () {
		var result = '';
	   	runs(function(){
            Ruby.call('Rubyextensions','digestmd5_extension');
            setTimeout(function() {
				timeout = true;
			}, 500);
    	});
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		},'Wait for 1 sec ajax call to happen', 1000);
		runs(function(){
			var result = document.getElementById('result').innerHTML
            expect(result).toEqual('b10a8db164e0754105b7a99be72e3fe5');
    	});		
	});	

    
});