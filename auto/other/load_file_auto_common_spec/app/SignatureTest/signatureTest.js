var signatureTest = {};

signatureTest.empty100sq = new Image();
signatureTest.empty100sq.src = "img/empty100sq.png";
signatureTest.empty100sqRed = new Image();
signatureTest.empty100sqRed.src = "img/empty100sqRed.png";
signatureTest.box100sq = new Image();
signatureTest.box100sq.src = "img/box100sq.png";
signatureTest.box100sqPen3 = new Image();
signatureTest.box100sqPen3.src = "img/box100sqPen3.png";
signatureTest.box100sqAlpha = new Image();
signatureTest.box100sqAlpha.src = "img/box100sqAlpha.png";
signatureTest.box100sqAlphaPen = new Image();
signatureTest.box100sqAlphaPen.src = "img/box100sqAlphaPen.png";
signatureTest.box100sqBlue = new Image();
signatureTest.box100sqBlue.src = "img/box100sqBlue.png";
signatureTest.box100sqRedPen = new Image();
signatureTest.box100sqRedPen.src = "img/box100sqRedPen.png";
signatureTest.box200150 = new Image();
signatureTest.box200150.src = "img/box200150.png";
signatureTest.cross100sq = new Image();
signatureTest.cross100sq.src = "img/cross100sq.png";
signatureTest.rim100sq = new Image();
signatureTest.rim100sq.src = "img/rim100sq.png";
signatureTest.nonSym100sq = new Image();
signatureTest.nonSym100sq.src = "img/nonSym100sq.png";

signatureTest.MOUSE_DOWN = 0;
signatureTest.MOUSE_MOVE = 1;
signatureTest.MOUSE_UP = 2;

//TODO non sym

signatureTest.loadEvent = function()
{
	signatureTest.screenWidth = Rho.System.screenWidth;
	signatureTest.screenHeight = Rho.System.screenHeight;
	signatureTest.platform = Rho.System.platform;
	//TODO reset when rotated
};
window.addEventListener('DOMContentLoaded',signatureTest.loadEvent);

signatureTest.compareImages = function(image1, image2)
{
	if((image1.width != image2.width) || (image1.height != image2.height))
	{
		return false;
	}
	
	var canvas1 = document.createElement('canvas');
	var canvas2 = document.createElement('canvas');
	canvas1.width = image1.width;
	canvas2.width = image2.width;
	var context1 = canvas1.getContext('2d');
	var context2 = canvas2.getContext('2d');
	context1.drawImage(image1, 0,0);
	context2.drawImage(image2, 0,0);
	var imgdata1 = context1.getImageData(0, 0, canvas1.width, canvas1.height).data;
	var imgdata2 = context1.getImageData(0, 0, canvas2.width, canvas1.height).data;

	// Loop over each pixel and check they match
	for (var i = 0; i < imgdata1.length; i++)
	{
		if(imgdata1[i] != imgdata2[i])
		{
			return false;
		}
	}
	return true;
};

signatureTest.imageCompareCallback = function(status, imgUri)
{
	if(status == "ok")
	{
		signatureTest.callbackImage.src = imageUri;
	}
};
signatureTest.vectorCallback = function(vectorArray)
{
	signatureTest.vectorCallbackData = vectorArray;
	signatureTest.vectorCallbackFired = true;
};
signatureTest.statusCallback = function(status, imgUri)
{
	signatureTest.callbackStatus = status;
	signatureTest.callbackFired = true;
};
signatureTest.callbackImageOnload = function()
{
	signatureTest.callbackImageLoaded = true;
};
signatureTest.deleteFile = function(url)
{
	Rho.Instrumentation.delete_file(url);
};
signatureTest.doDrawLine = function(x1, y1, x2, y2)
{
	Rho.Instrumentation.simulate_touch_event(signatureTest.MOUSE_DOWN, x1, y1);
	Rho.Instrumentation.simulate_touch_event(signatureTest.MOUSE_MOVE, x2, y2);
	Rho.Instrumentation.simulate_touch_event(signatureTest.MOUSE_UP, left, top);
};
signatureTest.doDrawBox = function(top, left, width, height)
{
	Rho.Instrumentation.simulate_touch_event(signatureTest.MOUSE_DOWN, left, top);
	Rho.Instrumentation.simulate_touch_event(signatureTest.MOUSE_MOVE, left, top + height);
	Rho.Instrumentation.simulate_touch_event(signatureTest.MOUSE_MOVE, left + width, top + height);
	Rho.Instrumentation.simulate_touch_event(signatureTest.MOUSE_MOVE, left + width, top);
	Rho.Instrumentation.simulate_touch_event(signatureTest.MOUSE_MOVE, left, top);
	Rho.Instrumentation.simulate_touch_event(signatureTest.MOUSE_UP, left, top);
};
signatureTest.drawBox = function ()
{
	signatureTest.doDrawBox(20, 20, 60, 60);
};
signatureTest.drawDefaultBox = function ()
{
	signatureTest.doDrawBox(35, 80, 195, 190);
};
signatureTest.drawCross = function ()
{
	signatureTest.doDrawLine(20,20,80,80);
	signatureTest.doDrawLine(20,80,80,20);
};
signatureTest.drawRim = function ()
{
	signatureTest.doDrawBox(0,0,99,99);
};
signatureTest.drawNonSym = function()
{
	signatureTest.doDrawLine(20,20,20,50);
};

//signatureTest.simulateNavigation = function(){signatureTest.ajax('/app/SignatureTest/simulate_navigation')};
signatureTest.emptyCallback = function() {/*Do Nothing*/};

describe('Signature', function() {
	describe('BMP File Capture specs', function() {
		beforeEach(function() {
			signatureTest.callbackImage = new Image();
			signatureTest.callbackImage.onload = signatureTest.callbackImageOnload;
			signatureTest.callbackImageLoaded = false;
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
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp'
				});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp'
				});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp'
				});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
					penColor: "#000000FF",
					penWidth: 3,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp'
				});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#0000FFFF",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					});
				signatureTest.drawCross();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					});
				signatureTest.drawCross();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					});
				signatureTest.drawNonSym();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
			var myFileName = Math.floor((Math.random() * 10000000)) + '';
			var myFileNameNExt = myFileName + '.bmp';
			
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp',
					fileName: myFileName
				});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				//Expects to end with
				expect(signatureTest.callbackImage.src.indexOf(myFileNameNExt, signatureTest.callbackImage.src.length - myFileNameNExt.length)).not.toEqual(-1);
				expect(Rho.Instrumentation.file_exists(signatureTest.callbackImage.src)).toBe(true);
			});
		});
		
		afterEach(function() {
			signatureTest.deleteFile(signatureTest.callbackImage.src);
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});
	});
	
	describe('PNG File Capture specs', function() {
		beforeEach(function() {
			signatureTest.callbackImage = new Image();
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
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png'
				});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
		
		it('should capture an empty signature capture with a colored background', function() {
			runs(function ()
			{
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FF0000FF",
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png'
					});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png'
				});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
					penColor: "#000000FF",
					penWidth: 3,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png'
				});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png'
				});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#0000FFFF",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png'
					});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
					penColor: "#00000080",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png'
				});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png'
					});
				signatureTest.drawCross();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png'
					});
				signatureTest.drawCross();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png'
					});
				signatureTest.drawNonSym();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
			var myFileName = Math.floor((Math.random() * 10000000)) + '';
			var myFileNameNExt = myFileName + '.png';
			
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png',
					fileName: myFileName
				});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				//Expects to end with
				expect(signatureTest.callbackImage.src.indexOf(myFileNameNExt, signatureTest.callbackImage.src.length - myFileNameNExt.length)).not.toEqual(-1);
				expect(Rho.Instrumentation.file_exists(signatureTest.callbackImage.src)).toBe(true);
			});
		});
		
		afterEach(function() {
			signatureTest.deleteFile(signatureTest.callbackImage.src);
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});
	});
	
	describe('DataUri Capture specs', function() {
		beforeEach(function() {
			signatureTest.callbackImage = new Image();
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
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
		
		it('should capture an empty signature capture with a RGBA colored background', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FF0000FF",
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
					penColor: "#000000FF",
					penWidth: 3,
					border: false,
					outputFormat: 'dataUri'
				});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqAlpha, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('should draw a simple RGBA blue box on the signature capture', function() {
			runs(function ()
			{
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#0000FFFF",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
					penColor: "#00000080",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri',
				});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawCross();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawCross();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawNonSym();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});
	});
	
	describe('Parameters that clear the signature area', function() {
		beforeEach(function() {
			signatureTest.callbackImage = new Image();
			signatureTest.callbackImage.onload = signatureTest.callbackImageOnload;
			signatureTest.callbackImageLoaded = false;
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
						penColor: "#0000FFFF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawNonSym();
				Rho.Signature.setProperty({penColor: '#000000FF'});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawNonSym();
				Rho.Signature.setProperty({bgColor: '#FFFFFFFF'});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawNonSym();
				Rho.Signature.clear();
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawNonSym();
				Rho.Signature.setProperty({height: 100});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					});
				signatureTest.drawNonSym();
				Rho.Signature.setProperty({width: 100});
				signatureTest.drawBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		afterEach(function() {
			Rho.Signature.hide();
			Rho.Signature.clear();
			//signatureTest.simulateNavigation();
		});
	});
	
	describe('Parameters that shouldnt clear the signature area', function() {
		beforeEach(function() {
			signatureTest.callbackImage = new Image();
			signatureTest.callbackImage.onload = signatureTest.callbackImageOnload;
			signatureTest.callbackImageLoaded = false;
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
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				signatureTest.drawBox();
				Rho.Signature.setProperty({left: 0});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				signatureTest.drawBox();
				Rho.Signature.setProperty({top: 0});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
					penColor: "#000000FF",
					penWidth: 1,
					border: true,
					outputFormat: 'dataUri'
				});
				signatureTest.drawBox();
				Rho.Signature.setProperty({border: false});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
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
					penColor: "#000000FF",
					penWidth: 1,
					border: true,
					outputFormat: 'dataUri',
					imageFormat: 'png'
				});
				signatureTest.drawBox();
				Rho.Signature.setProperty({imageFormat: 'bmp'});
				Rho.Signature.capture(signatureTest.imageCompareCallback);
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sq, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		afterEach(function() {
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
				Rho.Signature.takeFullscreen({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
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
				Rho.Signature.takeFullscreen({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
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
				Rho.Signature.setVectorCallback(signatureTest.vectorCallback);
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
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
					penColor: "#000000FF",
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
		
		it('should get vectors for a box', function() {
			runs(function ()
			{
				Rho.Signature.setVectorCallback(signatureTest.vectorCallback);
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				});
				signatureTest.drawBox();
			});
			
			waitsFor(function ()
			{
				return signatureTest.vectorCallbackFired;
			}, "the vectorCallback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.vectorCallbackData).toEqual([20,20,20,60,60,60,60,20,20,20,65535,65535]);
			});
		});
		
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
					penColor: "#000000FF",
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
				eexpect(signatureTest.vectorCallbackData).toEqual([20,20,20,60,65535,65535]);
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
		});
		
		it('Doesnt exception if take is given an empty parameter object', function(){
			runs(function ()
			{
				Rho.Signature.show({}, signatureTest);
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
				Rho.Signature.show({});
				signatureTest.drawDefaultBox();
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
				Rho.Signature.capture(signatureTest.imageCompareCallback);
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
//Q. What happens on device rotate?

////INVALID cases
//Bad compression
//invalid compression for platform
//bad output format

//MULTIPLE Cases
// multiple draw
// multiple set of all params

////SCREENSHOT cases
// Check ARGB

//Get param tests
//border on 0,0