describe("Scanner SET-GET Starts", function() {
	
	describe("Scanner property SET-GET Using setProperty", function() {
		var k = -1;
		var displayflag = false;

		beforeEach(function() {
			Rho.Barcode.disable();
			displayflag = false;
			k++;
		});

		for (var i=0;i<bar_setget_scanner_property.length;i++){
										
			it(bar_setget_scanner_property[i]['testName'], function() {
		
				runs(function() {
					Rho.Barcode.enable();
					setTimeout(function() {
						displayflag = true;
		 			}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Waiting for enable", 6000);
					
				runs(function() {

					Rho.Barcode.setProperty(bar_setget_scanner_property[k]['propertyName'],bar_setget_scanner_property[k]['propertyValue']);
					var data = Rho.Barcode.getProperty(bar_setget_scanner_property[k]['propertyName']);

					expect(data).toEqual(bar_setget_scanner_property[k]['expectedResult']);
				});

			});
			
		}
	});
	
	describe("Scanner property SET-GET Using setProperty", function() {
		var k = -1;
		var displayflag = false;

		beforeEach(function() {
			Rho.Barcode.disable();
			displayflag = false;
			k++;
		});

		for (var i=0;i<bar_setget_decoder_property.length;i++){
										
			it(bar_setget_decoder_property[i]['testName'], function() {
		
				runs(function() {
					Rho.Barcode.enable();
					setTimeout(function() {
						displayflag = true;
		 			}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Waiting for enable", 6000);
					
				runs(function() {

					Rho.Barcode.setProperty(bar_setget_decoder_property[k]['propertyName'],bar_setget_decoder_property[k]['propertyValue']);
					var data = Rho.Barcode.getProperty(bar_setget_decoder_property[k]['propertyName']);

					expect(data).toEqual(bar_setget_decoder_property[k]['expectedResult']);
				});

			});
			
		}
	});
	
});	



