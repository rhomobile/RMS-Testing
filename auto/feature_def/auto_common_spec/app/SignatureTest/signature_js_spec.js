describe('Signature', function() {
	describe('BMP File Capture specs', function() {
		beforeEach(function() {
			signatureTest.callbackImage = document.createElement('img');
			document.body.insertBefore(signatureTest.callbackImage, document.body.firstChild);
			signatureTest.callbackImage.onload = signatureTest.callbackImageOnload;
			signatureTest.callbackImageLoaded = false;
			signatureTest.myFileName = signatureTest.dataPath +  Math.floor((Math.random() * 10000000)) + '';
		});
		
		//capture
		it('should capture an empty signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp',
					fileName: signatureTest.myFileName
				});
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the capture callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.empty100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		//bgcolor
		it('should capture an empty signature capture with a colored background', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FF0000FF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp',
					fileName: signatureTest.myFileName
				});
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the capture callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.empty100sqRed, signatureTest.callbackImage)).toBe(true);
			});
		});
	
		it('should draw a simple box on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the capture callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple box with pen width 3 on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 3,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the capture callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqPen3, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple blue box on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF00FF00",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the capture callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqBlue, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple cross on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawCross();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 500);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the capture callback didnt fire", 1000);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.cross100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a rim on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawCross();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 500);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the capture callback didnt fire", 1000);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.rim100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a non symmetrical line on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#FF000000",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'bmp',
						fileName: signatureTest.myFileName
					});
				signatureTest.drawNonSym();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the capture callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.nonSym100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should capture a file with the specified name', function() {
			signatureTest.myFileName = signatureTest.dataPath +  Math.floor((Math.random() * 10000000)) + '';
			signatureTest.myFileNameNExt = signatureTest.myFileName + '.bmp';
			
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp',
					fileName: signatureTest.myFileName
				});
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the capture callback didnt fire", 750);
			
			runs(function ()
			{
				//Expects to end with
				expect(signatureTest.callbackImage.src.indexOf(myFileNameNExt, signatureTest.callbackImage.src.length - signatureTest.myFileNameNExt.length)).not.toEqual(-1);
				expect(Rho.Instrumentation.file_exists(signatureTest.callbackImage.src)).toBe(true);
			});
		});
		
		afterEach(function() {
			signatureTest.deleteFile(signatureTest.callbackImage.src);
			signatureTest.callbackImage.parentElement.removeChild(callbackImage);
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});
	});
	
	describe('PNG File Capture specs', function() {
		beforeEach(function() {
			signatureTest.callbackImage = document.createElement('img');
			document.body.insertBefore(signatureTest.callbackImage, document.body.firstChild);
			signatureTest.callbackImage.onload = signatureTest.callbackImageOnload;
			signatureTest.callbackImageLoaded = false;
			signatureTest.myFileName = signatureTest.dataPath +  Math.floor((Math.random() * 10000000)) + '';
		});
		
		it('should capture an empty signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png',
					fileName: signatureTest.myFileName
				});
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the capture callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.empty100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should capture an empty signature capture with a colored background', function() {
			runs(function ()
			{
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FF0000FF",
						penColor: "#FF000000",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png',
						fileName: signatureTest.myFileName
					});
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.empty100sqRed, signatureTest.callbackImage)).toBe(true);
			});
		});
	
		it('should draw a simple box on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple box with pen width 3 on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 3,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqPen3, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple box with a transparent background on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFF00",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqAlpha, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple blue box on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#FF00FF00",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png',
						fileName: signatureTest.myFileName
					});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqBlue, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple semi-transparent box on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#80000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqAlphaPen, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple cross on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawCross();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 500);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1000);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.cross100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a rim on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawCross();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 500);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1000);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.rim100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a non symmetrical line on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawNonSym();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.nonSym100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should capture a file with the specified name', function() {
			signatureTest.myFileName = signatureTest.dataPath +  Math.floor((Math.random() * 10000000)) + '';
			signatureTest.myFileNameNExt = signatureTest.myFileName + '.png';
			
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png',
					fileName: signatureTest.myFileName
				});
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				//Expects to end with
				expect(signatureTest.callbackImage.src.indexOf(myFileNameNExt, signatureTest.callbackImage.src.length - signatureTest.myFileNameNExt.length)).not.toEqual(-1);
				expect(Rho.Instrumentation.file_exists(signatureTest.callbackImage.src)).toBe(true);
			});
		});
		
		afterEach(function() {
			signatureTest.deleteFile(signatureTest.callbackImage.src);
			signatureTest.callbackImage.parentElement.removeChild(callbackImage);
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});
	});
	
	describe('DataUri Capture specs', function() {
		beforeEach(function() {
			signatureTest.callbackImage = document.createElement('img');
			document.body.insertBefore(signatureTest.callbackImage, document.body.firstChild);
			signatureTest.callbackImage.onload = signatureTest.callbackImageOnload;
			signatureTest.callbackImageLoaded = false;
		});
		
		it('should capture an empty signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.empty100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should capture an empty signature capture with a ARGB colored background', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FF0000FF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.empty100sqRed, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should capture an empty signature capture with a RGB colored background', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FF0000",
					penColor: "#000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.empty100sqRed, signatureTest.callbackImage)).toBe(true);
			});
		});
	
		it('should draw a simple box on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#FF000000",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple box with pen width 3 on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 3,
					border: false,
					outputFormat: 'dataUri'
				});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqPen3, signatureTest.callbackImage)).toBe(true);
			});
		});
	
		it('should draw a simple box with a transparent background on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFF00",
						penColor: "#FF000000",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqAlpha, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple ARGB blue box on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF0000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqBlue, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple RGB blue box on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFF",
					penColor: "#0000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqBlue, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple semi-transparent box on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#80000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri',
				});
				signatureTest.drawBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqAlphaPen, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple cross on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#FF000000",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawCross();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 500);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1000);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.cross100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a rim on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#FF000000",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawCross();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 500);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1000);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.rim100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a non symmetrical line on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#FF000000",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawNonSym();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.nonSym100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		afterEach(function() {
			signatureTest.callbackImage.parentElement.removeChild(callbackImage);
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});
	});
	
	describe('Parameters that clear the signature area', function() {
		beforeEach(function() {
			signatureTest.callbackImage = document.createElement('img');
			document.body.insertBefore(signatureTest.callbackImage, document.body.firstChild);
			signatureTest.callbackImage.onload = signatureTest.callbackImageOnload;
			signatureTest.callbackImageLoaded = false;
			signatureTest.myFileName = signatureTest.dataPath +  Math.floor((Math.random() * 10000000)) + '';
		});
		
	
		it('clears the signature capture area when penColor is set after drawing', function () {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF00FF00",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawNonSym();
				setTimeout(function(){
					Rho.Signature.penColor = '#FF000000';
					signatureTest.drawBox();
					setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
				}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 2000);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('clears the signature capture area when bgColor is set after drawing', function () {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFF00FF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawNonSym();
				setTimeout(function(){
					Rho.Signature.bgColor = '#FFFFFFFF';
					signatureTest.drawBox();
					setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
				}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 2000);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('clears the signature capture area when clear is called', function () {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawNonSym();
				setTimeout(function(){
					Rho.Signature.clear();
					signatureTest.drawBox();
					setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
				}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 2000);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('clears the signature capture area when height is changed', function () {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:99,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawNonSym();
				setTimeout(function(){
					Rho.Signature.height = 100;
					signatureTest.drawBox();
					setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
				}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 2000);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('clears the signature capture area when width is changed', function () {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:99,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawNonSym();
				setTimeout(function(){
					Rho.Signature.width = 100;
					signatureTest.drawBox();
					setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
				}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 2000);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		afterEach(function() {
			signatureTest.callbackImage.parentElement.removeChild(callbackImage);
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});
		
		//TODO Pen Width
	});
	
	describe('Parameters that shouldnt clear the signature area', function() {
		beforeEach(function() {
			signatureTest.callbackImage = document.createElement('img');
			document.body.insertBefore(signatureTest.callbackImage, document.body.firstChild);
			signatureTest.callbackImage.onload = signatureTest.callbackImageOnload;
			signatureTest.callbackImageLoaded = false;
			signatureTest.myFileName = signatureTest.dataPath +  Math.floor((Math.random() * 10000000)) + '';
		});
		
		it('doesnt clear the signature capture area when left is changed', function () {
			runs(function ()
			{
				Rho.Signature.show({
					left:1,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawBox();
				Rho.Signature.left = 0;
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('doesnt clear the signature capture area when top is changed', function () {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:1,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawBox();
				Rho.Signature.top = 0;
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
	
		it('doesnt clear the signature capture area when border is changed', function () {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: true,
					outputFormat: 'dataUri',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawBox();
				Rho.Signature.border = false;
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('doesnt clear the signature capture area when imageFormat is changed', function () {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: true,
					outputFormat: 'dataUri',
					imageFormat: 'png',
					fileName: signatureTest.myFileName
				});
				signatureTest.drawBox();
				Rho.Signature.imageFormat = 'bmp';
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 750);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 1500);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		afterEach(function() {
			signatureTest.callbackImage.parentElement.removeChild(callbackImage);
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});
	});

	describe('Fullscreen Tests', function() {
		beforeEach(function() {
			signatureTest.callbackFired = false;
		});
		
		it('Sends an \'ok\' status when fullscreen signature is captured using the capture function', function() {
			runs(function ()
			{
				Rho.Signature.takeFullScreen({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				}, signatureTest.statusCallback);
				Rho.Signature.capture(signatureTest.statusCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackFired;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.callbackStatus).toEqual('ok');
			});
		});
		
		it('Sends a \'cancel\' status when fullscreen signature is closed using the hide function', function() {
			runs(function ()
			{
				Rho.Signature.takeFullScreen({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				}, signatureTest.statusCallback);
				Rho.Signature.hide();
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackFired;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.callbackStatus).toEqual('cancel');
			});
		});

		
		afterEach(function() {
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});
	});
	
	describe('Vector Tests', function() {
		beforeEach(function() {
			signatureTest.vectorCallbackFired = false;
			signatureTest.vectorCallbackData = null;
		});
		
		it('should get vectors for a vertical line', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				Rho.Signature.setVectorCallback(signatureTest.vectorCallback);
				signatureTest.doDrawLine(20,20,20,60);
			});
			
			waitsFor(function ()
			{
				return signatureTest.vectorCallbackFired;
			}, "the vectorCallback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.vectorCallbackData).toEqual([20,20,20,60,65535,65535]);
			});
		});
			
		it('should get vectors for a horizontal line', function() {
			runs(function ()
			{
				Rho.Signature.setVectorCallback(signatureTest.vectorCallback);
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				signatureTest.doDrawLine(20,20,60,20);
			});
			
			waitsFor(function ()
			{
				return signatureTest.vectorCallbackFired;
			}, "the vectorCallback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.vectorCallbackData).toEqual([20,20,60,20,65535,65535]);
			});
		});
		
//		it('should get vectors for a box', function() {
//			runs(function ()
//			{
//				Rho.Signature.setVectorCallback(signatureTest.vectorCallback);
//				Rho.Signature.show({
//					left:0,
//					top:0,
//					width:100,
//					height:100,
//					bgColor: "#FFFFFFFF",
//					penColor: "#FF000000",
//					penWidth: 1,
//					border: false,
//					outputFormat: 'dataUri'
//				});
//				signatureTest.drawBox();
//			});
//			
//			waitsFor(function ()
//			{
//				return signatureTest.vectorCallbackFired;
//			}, "the vectorCallback didnt fire", 750);
//			
//			runs(function ()
//			{
//				expect(signatureTest.vectorCallbackData).toEqual([20,20,20,60,60,60,60,20,20,20,65535,65535]);
//			});
//		}); //Instrumentation cannot do multi vector lines, so this is very difficult to test.
		
		it('should receive two separate vector events for two separate lines', function() {
			runs(function ()
			{
				Rho.Signature.setVectorCallback(signatureTest.vectorCallback);
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#FF000000",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				signatureTest.doDrawLine(20,20,20,60);
			});
			
			waitsFor(function ()
			{
				return signatureTest.vectorCallbackFired;
			}, "the vectorCallback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.vectorCallbackData).toEqual([20,20,20,60,65535,65535]);
				signatureTest.vectorCallbackFired = false;
				signatureTest.doDrawLine(30,30,30,60);
			});
			
						
			waitsFor(function ()
			{
				return signatureTest.vectorCallbackFired;
			}, "the vectorCallback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.vectorCallbackData).toEqual([30,30,30,60,65535,65535]);
			});
			
		});
			
		afterEach(function() {
			Rho.Signature.setVectorCallback(null);
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});
	});
	
	describe('Defaults Tests', function() {
		beforeEach(function() {
			signatureTest.callbackFired = false;
			signatureTest.myFileName = signatureTest.dataPath +  Math.floor((Math.random() * 10000000)) + '';
		});
		
		it('Doesnt exception if take is given an empty parameter object', function(){
			runs(function ()
			{
				Rho.Signature.takeFullScreen({}, signatureTest.imageCompareCallback);
				Rho.Signature.hide();
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackFired;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.callbackStatus).toEqual('cancel');
			});
		});
	
		it('Captures using default values if take is given an empty parameter object', function(){
			runs(function ()
			{
				Rho.Signature.show({
					fileName: signatureTest.myFileName
				});
				signatureTest.drawDefaultBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box200150, signatureTest.callbackImage)).toBe(true);
				signatureTest.deleteFile(signatureTest.callbackImage.src);
			});
		});
		
		it('Captures using default values if take is given an parameter object with only one parameter', function(){
			runs(function ()
			{
				Rho.Signature.show({outputFormat:'dataUri'});
				signatureTest.drawDefaultBox();
				setTimeout(function(){Rho.Signature.capture(signatureTest.imageCompareCallback);}, 100);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box200150, signatureTest.callbackImage)).toBe(true);
			});
		});
	
		afterEach(function() {
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});	
	});
});