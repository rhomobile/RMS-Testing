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

//TODO non sym

signatureTest.loadEvent = function()
{
	signatureTest.screenWidth = Rho.system.screenWidth;
	signatureTest.screenHeight = Rho.system.screenHeight;
	signatureTest.platform = Rho.system.platform;
	//TODO reset when rotated
};
window.addEventListener('DOMContentLoaded',signatureTest.loadEvent);

signatureTest.ajax = function(url)
{
	var ajax = new XMLHttpRequest();
	//ajax.onreadystatechange = function () {} //Async call
	ajax.open("GET", url, false); //Sync Call
	ajax.send();
	return ajax.responseText;
};

signatureTest.deleteFile = function(url)
{
	signatureTest.ajax('/app/SignatureTest/delete_file?' + encodeURIComponent(url));
};

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
signatureTest.statusCallback = function(status, imgUri)
{
	signatureTest.callbackStatus = status;
	signatureTest.callbackFired = true;
};
signatureTest.callbackImageOnload = function()
{
	signatureTest.callbackImageLoaded = true;
};
signatureTest.drawBox = function ()
{
	signatureTest.ajax('/app/SignatureTest/draw_box?20&20&60&60');
};
signatureTest.drawDefaultBox = function ()
{
	signatureTest.ajax('/app/SignatureTest/draw_box?35&80&195&190');
};
signatureTest.drawCross = function ()
{
	signatureTest.ajax('/app/SignatureTest/draw_line?20&20&80&80');
	signatureTest.ajax('/app/SignatureTest/draw_line?20&80&80&20');
};
signatureTest.drawRim = function ()
{
	signatureTest.ajax('/app/SignatureTest/draw_box?0&0&99&99');
};
signatureTest.drawNonSym = function()
{
	signatureTest.ajax('/app/SignatureTest/draw_line?20&20&20&50');
};
signatureTest.simulateNavigation = function(){signatureTest.ajax('/app/SignatureTest/simulate_navigation')};
signatureTest.emptyCallback = function() {/*Do Nothing*/};

describe('Signature', function() {
	describe('Exception specs', function() {
		describe("should exception when signature capture coordinates are incorrect", function() {
			it("exceptions when left coordinate is negative", function () {
				expect(function() {
					Rho.signature.take({
						left:-1,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when top coordinate is negative", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:-1,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when left coordinate is off the right of the screen", function () {
				expect(function() {
					Rho.signature.take({
						left:Number.MAX_VALUE,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
					
			it("exceptions when top coordinate is off the bottom of the screen", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:Number.MAX_VALUE,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
		
			it("exceptions when left coordinate is null", function () {
				expect(function() {
					Rho.signature.take({
						left:null,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when top coordinate is null", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:null,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
				
			it("exceptions when left coordinate is NaN", function () {
				expect(function() {
					Rho.signature.take({
						left:Number.NaN,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when top coordinate is NaN", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:Number.NaN,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when left coordinate is text", function () {
				expect(function() {
					Rho.signature.take({
						left:"MyText!",
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when top coordinate is text", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:"MyText!",
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when left coordinate is a function", function () {
				expect(function() {
					Rho.signature.take({
						left:function(){alert('hi!')},
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when top coordinate is a function", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:function(){alert('hi!')},
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			afterEach(function() {
				Rho.signature.hide();
				signatureTest.simulateNavigation();
			});
		});
		
		describe("should exception when signature capture dimensions are incorrect", function() {
			it("exceptions when width dimension is negative", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:-1,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when height dimension is negative", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:-1,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when width dimension is 0", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:0,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
	
			it("exceptions when height dimension is 0", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:0,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when width dimension is off the right of the screen", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:Number.MAX_VALUE,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
					
			it("exceptions when height dimension is off the bottom of the screen", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:Number.MAX_VALUE,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
				
			it("exceptions when width dimension is only just off the right of the screen", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:signatureCapture.screenWidth,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
					
			it("exceptions when height dimension is only just off the bottom of the screen", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:signatureCapture.screenHeight,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
		
			it("exceptions when width dimension is null", function () {
				expect(function() {
					Rho.signature.take({
						left:null,
						top:0,
						width:null,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when height dimension is null", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:null,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
				
			it("exceptions when width dimension is NaN", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:Number.NaN,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when height dimension is NaN", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:Number.NaN,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when width dimension is text", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:"Im a text",
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when height dimension is text", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:"Im a text",
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when width dimension is a function", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:function(){alert('hi!')},
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when height dimension is a function", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:function(){alert('hi!')},
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the background colour is incorrect", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the background colour is not a RGBA/RGB string", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "Hello",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the background colour is a function", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: function (){},
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the pen colour is incorrect", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000F",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the pen colour is not a RGBA/RGB string", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "Hello",
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the pen colour is a function", function () {
				expect(function() {
					Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: function (){},
						setFullscreen: false,
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});	
			afterEach(function() {
				Rho.signature.hide();
				signatureTest.simulateNavigation();
			});
		});
	});
	
	describe('BMP File Capture specs', function() {
		beforeEach(function() {
			signatureTest.callbackImage = new Image();
			signatureTest.callbackImage.onload = signatureTest.callbackImageOnload;
			signatureTest.callbackImageLoaded = false;
		});
		
		it('should capture an empty signature capture', function() {
			runs(function ()
			{
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp'
				}, signatureTest.imageCompareCallback);
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FF0000FF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp'
				}, signatureTest.imageCompareCallback);
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 3,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#0000FFFF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawCross();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawCross();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawNonSym();
				Rho.signature.capture();
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
			signatureTest.deleteFile(signatureTest.callbackImage.src);
			signatureTest.simulateNavigation();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png'
				}, signatureTest.imageCompareCallback);
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FF0000FF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png'
					}, signatureTest.imageCompareCallback);
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 3,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFF00",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#0000FFFF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#00000080",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'png'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawCross();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawCross();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'image',
						compressionFormat: 'png'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawNonSym();
				Rho.signature.capture();
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
			signatureTest.deleteFile(signatureTest.callbackImage.src);
			signatureTest.simulateNavigation();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				}, signatureTest.imageCompareCallback);
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FF0000FF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				}, signatureTest.imageCompareCallback);
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FF0000",
					penColor: "#000000",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				}, signatureTest.imageCompareCallback);
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 3,
					border: false,
					outputFormat: 'dataUri'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFF00",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#0000FFFF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFF",
						penColor: "#0000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#00000080",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri',
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawCross();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawCross();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawNonSym();
				Rho.signature.capture();
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
			signatureTest.simulateNavigation();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#0000FFFF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawNonSym();
				Rho.signature.setProperty({penColor: '#000000FF'});
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFF00FF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawNonSym();
				Rho.signature.setProperty({bgColor: '#FFFFFFFF'});
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawNonSym();
				Rho.signature.clear();
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:99,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawNonSym();
				Rho.signature.setProperty({height: 100});
				signatureTest.drawBox();
				Rho.signature.capture();
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
				Rho.signature.take({
						left:0,
						top:0,
						width:99,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawNonSym();
				Rho.signature.setProperty({width: 100});
				signatureTest.drawBox();
				Rho.signature.capture();
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
			signatureTest.simulateNavigation();
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
				Rho.signature.take({
					left:1,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.setProperty({left: 0});
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:1,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.setProperty({top: 0});
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: true,
					outputFormat: 'dataUri'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.setProperty({border: false});
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: true,
					outputFormat: 'dataUri',
					imageFormat: 'png'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.setProperty({imageFormat: 'bmp'});
				Rho.signature.capture();
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
			signatureTest.simulateNavigation();
		});
	});
	
	describe('String parameters arent case sensitive', function() {
		beforeEach(function() {
			signatureTest.callbackImage = new Image();
			signatureTest.callbackImage.onload = signatureTest.callbackImageOnload;
			signatureTest.callbackImageLoaded = false;
		});
		
		it('captures the signature capture area when the pencolor is set to red using different letter case', function () {
			runs(function ()
			{
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#fF0000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.box100sqRedPen, signatureTest.callbackImage)).toBe(true);
			});
		});
		
		it('captures the signature capture area when the bgColor is set to blue using different letter case', function () {
			runs(function ()
			{
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#0000fFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.signature.capture();
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
		
		it('should capture an empty signature capture when the output format is iMaGe and using differing letter case', function() {
			runs(function ()
			{
				Rho.signature.take({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						setFullscreen: false,
						penWidth: 1,
						border: false,
						outputFormat: 'iMaGe',
						compressionFormat: 'bmp'
					}, signatureTest.imageCompareCallback);
				Rho.signature.capture();
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.empty100sq, signatureTest.callbackImage)).toBe(true);
				signatureTest.deleteFile(signatureTest.callbackImage.src);
			});
		});
	
		it('should capture an empty signature capture when the compression format is bMp and using differing letter case', function() {
			runs(function ()
			{
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bMp'
				}, signatureTest.imageCompareCallback);
				Rho.signature.capture();
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.empty100sq, signatureTest.callbackImage)).toBe(true);
				signatureTest.deleteFile(signatureTest.callbackImage.src);
			});
		});
	
		it('should capture an empty signature capture when the compression format is PnG and using differing letter case', function() {
			runs(function ()
			{
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'PnG'
				}, signatureTest.imageCompareCallback);
				Rho.signature.capture();
			});
			
			waitsFor(function ()
			{
				return signatureTest.callbackImageLoaded;
			}, "the take callback didnt fire", 750);
			
			runs(function ()
			{
				expect(signatureTest.compareImages(signatureTest.empty100sq, signatureTest.callbackImage)).toBe(true);
				signatureTest.deleteFile(signatureTest.callbackImage.src);
			});
		});
	
		it('should capture an empty signature capture when the outputFormat is DATaUrI and using differing letter case', function() {
			runs(function ()
			{
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'DATaUrI'
				}, signatureTest.imageCompareCallback);
				Rho.signature.capture();
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
		
		
		afterEach(function() {
			signatureTest.simulateNavigation();
		});
	});
	
	describe('Fullscreen Tests', function() {
		beforeEach(function() {
			signatureTest.callbackFired = false;
		});
		
		it('Sends an \'ok\' status when fullscreen signature is captured using the capture function', function() {
			runs(function ()
			{
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: true,
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				}, signatureTest.statusCallback);
				Rho.signature.capture();
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
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: true,
					penWidth: 1,
					border: false,
					outputFormat: 'dataUri'
				}, signatureTest.statusCallback);
				Rho.signature.hide();
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
		
		//TODO more tests which compare fullscreen captures. Requires detecting screen/image size.
		//TODO tests that press the full screen buttons
		
		afterEach(function() {
			signatureTest.simulateNavigation();
		});
	});
	
	describe('Defaults Tests', function() {
		beforeEach(function() {
			signatureTest.callbackFired = false;
		});
		
		it('Doesnt exception if take is given an empty parameter object', function(){
			runs(function ()
			{
				Rho.signature.take({}, signatureTest);
				Rho.signature.hide();
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
				Rho.signature.take({}, signatureTest);
				signatureTest.drawDefaultBox();
				Rho.signature.capture();
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
				Rho.signature.take({outputFormat:'dataUri'}, signatureTest);
				signatureTest.drawDefaultBox();
				Rho.signature.capture();
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
			signatureTest.simulateNavigation();
		});	
	});
	
	describe('Navigation Tests', function() {
		var timedout = false;
	
		beforeEach(function() {
			signatureTest.callbackImage = new Image();
			signatureTest.callbackImage.onload = signatureTest.callbackImageOnload;
			signatureTest.callbackImageLoaded = false;
		});
		
		it('Clears the signature capture area when navigating', function() {
			runs(function(){
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					setFullscreen: false,
					penWidth: 1,
					border: false,
					outputFormat: 'image',
					compressionFormat: 'bmp'
				}, signatureTest.imageCompareCallback);
				signatureTest.drawNonSym();
				signatureTest.simulateNavigation();
				Rho.signature.capture();
				setTimeout(function(){
					timedout = true;
				},600);
			});
	
			waitsFor(function ()
			{
				return timedout;
			}, "the setTimeout didnt fire", 750);
	
			runs(function ()
			{
				expect(signatureTest.callbackImageLoaded).toBe(false);
			});
		});
		
		it('Clears all parameters on navigation', function() {
			runs(function(){
				Rho.signature.take({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#AAAAAAFF",
					penColor: "#000AA0FF",
					setFullscreen: false,
					penWidth: 20,
					border: false,
					outputFormat: 'dataUri',
					compressionFormat: 'bmp'
				}, signatureTest.imageCompareCallback);
				signatureTest.simulateNavigation();
				Rho.signature.take({
					setFullscreen: false
				}, signatureTest.imageCompareCallback);
				signatureTest.drawDefaultBox();
				Rho.signature.capture();
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
		
		afterEach(function() {
			signatureTest.simulateNavigation();
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