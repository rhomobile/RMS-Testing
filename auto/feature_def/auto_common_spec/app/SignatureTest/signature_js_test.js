var signatureTest = {};

signatureTest.MOUSE_DOWN = 0;
signatureTest.MOUSE_MOVE = 1;
signatureTest.MOUSE_UP = 2;

//TODO non sym

signatureTest.loadEvent = function()
{
//	signatureTest.localWebPath = Rho.LocalServer.enable({port:0, path:"/"});
	signatureTest.packagePath = 'com.rhomobile.auto_common_spec';
	//signatureTest.dataPath = 'file:///data/data/' + signatureTest.packagePath + '/rho/rho/apps/';
	signatureTest.dataPath = 'file:///data/data/' + signatureTest.packagePath + '/';
	//signatureTest.dataPath = 'http://localhost:31416/';
	signatureTest.imageUrlRoot = 'http://localhost:31416/';
	signatureTest.empty100sq = document.createElement('img');
	signatureTest.empty100sqRed = document.createElement('img');
	signatureTest.box100sq = document.createElement('img');
	signatureTest.box100sqPen3 = document.createElement('img');
	signatureTest.box100sqAlpha = document.createElement('img');
	signatureTest.box100sqAlphaPen = document.createElement('img');
	signatureTest.box100sqBlue = document.createElement('img');
	signatureTest.box100sqRedPen = document.createElement('img');
	signatureTest.box200150 = document.createElement('img');
	signatureTest.cross100sq = document.createElement('img');
	signatureTest.rim100sq = document.createElement('img');
	signatureTest.nonSym100sq = document.createElement('img');
	
	signatureTest.empty100sq.src = "/public/app/signatureImg/empty100sq.png";
	signatureTest.empty100sqRed.src = "/public/app/signatureImg/empty100sqRed.png";
	signatureTest.box100sq.src = "/public/app/signatureImg/box100sq.png";
	signatureTest.box100sqPen3.src = "/public/app/signatureImg/box100sqPen3.png";
	signatureTest.box100sqAlpha.src = "/public/app/signatureImg/box100sqAlpha.png";
	signatureTest.box100sqAlphaPen.src = "/public/app/signatureImg/box100sqAlphaPen.png";
	signatureTest.box100sqBlue.src = "/public/app/signatureImg/box100sqBlue.png";
	signatureTest.box100sqRedPen.src = "/public/app/signatureImg/box100sqRedPen.png";
	signatureTest.box200150.src = "/public/app/signatureImg/box200150.png";
	signatureTest.cross100sq.src = "/public/app/signatureImg/cross100sq.png";
	signatureTest.rim100sq.src = "/public/app/signatureImg/rim100sq.png";
	signatureTest.nonSym100sq.src = "/public/app/signatureImg/nonSym100sq.png";
	
	signatureTest.empty100sq.style.zoom = 0.1;
	signatureTest.empty100sqRed.style.zoom = 0.1;
	signatureTest.box100sq.style.zoom = 0.1;
	signatureTest.box100sqPen3.style.zoom = 0.1;
	signatureTest.box100sqAlpha.style.zoom = 0.1;
	signatureTest.box100sqAlphaPen.style.zoom = 0.1;
	signatureTest.box100sqBlue.style.zoom = 0.1;
	signatureTest.box100sqRedPen.style.zoom = 0.1;
	signatureTest.box200150.style.zoom = 0.1;
	signatureTest.cross100sq.style.zoom = 0.1;
	signatureTest.rim100sq.style.zoom = 0.1;
	signatureTest.nonSym100sq.style.zoom = 0.1;
	
	document.body.appendChild(signatureTest.box100sqAlphaPen);
	document.body.appendChild(signatureTest.box100sqAlpha);
	document.body.appendChild(signatureTest.box100sqPen3);
	document.body.appendChild(signatureTest.box100sq);
	document.body.appendChild(signatureTest.empty100sq);
	document.body.appendChild(signatureTest.empty100sqRed);
	document.body.appendChild(signatureTest.box100sqBlue);
	document.body.appendChild(signatureTest.box100sqRedPen);
	document.body.appendChild(signatureTest.box200150);
	document.body.appendChild(signatureTest.cross100sq);
	document.body.appendChild(signatureTest.rim100sq);
	document.body.appendChild(signatureTest.nonSym100sq);
	
	
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
	var imgdata2 = context2.getImageData(0, 0, canvas2.width, canvas1.height).data;

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

signatureTest.imageCompareCallback = function(result)
{
	console.log('MOTODEBUG imageCompareCallback+');
	console.log('MOTODEBUG imageCompareCallback status: ' + result.status);
	if(result.status == "ok")
	{
		console.log('MOTODEBUG imageCompareCallback ok!');
		//var newSrc = "file:///data/data/" + signatureTest.packagePath + "/rhodata/public/signature.img";
		//var result = Rho.File.copy(result.imageUri, newSrc);
		//Rho.File.deleteFile(result.imageUri);
//		console.log('MOTODEBUG result.imageUri: ' + result.imageUri);
//		var newSrc = result.imageUri.replace("file://", signatureTest.localWebPath);
//		signatureTest.callbackImage.src = newSrc;
//		console.log('MOTODEBUG newSrc: ' + signatureTest.localWebPath);
		//signatureTest.callbackImage.src = newSrc;
		if(result.imageUri.indexOf('data') != 0)
		{
			Rho.File.copy(result.imageUri, dataPath + 'rho/rho/apps/');
			var parts = result.imageUri.split('/');
			signatureTest.callbackImage.src = signatureTest.imageUrlRoot + parts[parts.length -1];
			console.log('MOTODEBUG ' + signatureTest.imageUrlRoot + parts[parts.length -1]);
		}
		else
		{
			Rho.File.copy(result.imageUri, dataPath + 'rho/rho/apps/');
			signatureTest.callbackImage.src = result.imageUri;
		}
	}
	console.log('MOTODEBUG imageCompareCallback-');
};
signatureTest.vectorCallback = function(vectorArray)
{
	signatureTest.vectorCallbackData = vectorArray;
	signatureTest.vectorCallbackFired = true;
};
signatureTest.statusCallback = function(result)
{
	signatureTest.callbackStatus = result.status;
	signatureTest.callbackFired = true;
};
signatureTest.callbackImageOnload = function()
{
	console.log('MOTODEBUG callbackImageOnload');
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
	Rho.Instrumentation.simulate_touch_event(signatureTest.MOUSE_UP, x2, y2);
};
signatureTest.doDrawBox = function(top, left, width, height)
{
	signatureTest.doDrawLine(left, top, left, top+height);
	signatureTest.doDrawLine(left, top+height, left + width, top+height);
	signatureTest.doDrawLine(left+width, top+height, left + width, top);
	signatureTest.doDrawLine(left + width, top, left, top);
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