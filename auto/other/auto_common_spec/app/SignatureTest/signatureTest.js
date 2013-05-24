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

signatureTest.loadEvent = function()
{
	signatureTest.screenWidth = Rho.system.screenWidth;
	signatureTest.screenHeight = Rho.system.screenHeight;
	signatureTest.platform = Rho.system.platform;
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
signatureTest.callbackImageOnload = function()
{
	signatureTest.callbackImageLoaded = true;
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
signatureTest.deleteFile = function(url)
{
	Rho.Instrumentation.delete_file(url);
};
signatureTest.emptyCallback = function() {/*Do Nothing*/};

describe('Signature', function() {
	describe('Exception specs', function() {
		describe("should exception when signature capture coordinates are incorrect", function() {
			it("exceptions when left coordinate is negative", function () {
				expect(function() {
					Rho.Signature.show({
						left:-1,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when top coordinate is negative", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:-1,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when left coordinate is off the right of the screen", function () {
				expect(function() {
					Rho.Signature.show({
						left:Number.MAX_VALUE,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
					
			it("exceptions when top coordinate is off the bottom of the screen", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:Number.MAX_VALUE,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
		
			it("exceptions when left coordinate is null", function () {
				expect(function() {
					Rho.Signature.show({
						left:null,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when top coordinate is null", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:null,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
				
			it("exceptions when left coordinate is NaN", function () {
				expect(function() {
					Rho.Signature.show({
						left:Number.NaN,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when top coordinate is NaN", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:Number.NaN,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when left coordinate is text", function () {
				expect(function() {
					Rho.Signature.show({
						left:"MyText!",
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when top coordinate is text", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:"MyText!",
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when left coordinate is a function", function () {
				expect(function() {
					Rho.Signature.show({
						left:function(){alert('hi!')},
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when top coordinate is a function", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:function(){alert('hi!')},
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			afterEach(function() {
				Rho.Signature.hide();
				signatureTest.simulateNavigation();
			});
		});
		
		describe("should exception when signature capture dimensions are incorrect", function() {
			it("exceptions when width dimension is negative", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:-1,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when height dimension is negative", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:-1,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when width dimension is 0", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:0,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
	
			it("exceptions when height dimension is 0", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:0,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when width dimension is off the right of the screen", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:Number.MAX_VALUE,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
					
			it("exceptions when height dimension is off the bottom of the screen", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:Number.MAX_VALUE,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
				
			it("exceptions when width dimension is only just off the right of the screen", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:signatureCapture.screenWidth,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
					
			it("exceptions when height dimension is only just off the bottom of the screen", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:signatureCapture.screenHeight,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
		
			it("exceptions when width dimension is null", function () {
				expect(function() {
					Rho.Signature.show({
						left:null,
						top:0,
						width:null,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when height dimension is null", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:null,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
				
			it("exceptions when width dimension is NaN", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:Number.NaN,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when height dimension is NaN", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:Number.NaN,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when width dimension is text", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:"Im a text",
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when height dimension is text", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:"Im a text",
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when width dimension is a function", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:function(){alert('hi!')},
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when height dimension is a function", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:function(){alert('hi!')},
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the background colour is incorrect", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the background colour is not a RGBA/RGB string", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "Hello",
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the background colour is a function", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: function (){},
						penColor: "#000000FF",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the pen colour is incorrect", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000F",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the pen colour is not a RGBA/RGB string", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "Hello",
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});
			
			it("exceptions when the pen colour is a function", function () {
				expect(function() {
					Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: function (){},
						penWidth: 1,
						border: true,
						outputFormat: 'image',
						compressionFormat: 'bmp'
					}, signatureTest.emptyCallback);
				}).toThrow();
			});	
			afterEach(function() {
				Rho.Signature.hide();
				Rho.Signature.clear();
			});
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
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#fF0000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.Signature.capture();
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
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#0000fFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						outputFormat: 'dataUri'
					}, signatureTest.imageCompareCallback);
				signatureTest.drawBox();
				Rho.Signature.capture();
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
				Rho.Signature.show({
						left:0,
						top:0,
						width:100,
						height:100,
						bgColor: "#FFFFFFFF",
						penColor: "#000000FF",
						penWidth: 1,
						border: false,
						fileName: 'hello',
						outputFormat: 'iMaGe',
						compressionFormat: 'bmp'
					}, signatureTest.imageCompareCallback);
				Rho.Signature.capture();
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
					compressionFormat: 'bMp'
				}, signatureTest.imageCompareCallback);
				Rho.Signature.capture();
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
					compressionFormat: 'PnG'
				}, signatureTest.imageCompareCallback);
				Rho.Signature.capture();
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
				Rho.Signature.show({
					left:0,
					top:0,
					width:100,
					height:100,
					bgColor: "#FFFFFFFF",
					penColor: "#000000FF",
					penWidth: 1,
					border: false,
					outputFormat: 'DATaUrI'
				}, signatureTest.imageCompareCallback);
				Rho.Signature.capture();
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
			Rho.Signature.clear();
			Rho.Signature.hide();
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