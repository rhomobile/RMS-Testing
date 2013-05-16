var imagerEnum = new Array;
var imagerModuleSet = new Array;
var imageTransfer = new Array;
var imageTransferN = new Array;
var imageDataUri = new Array;
var imageDataUriTransfer = new Array;

var arrImagerType = new Array();
var imagerType = "";


	imagerEnum[imagerEnum.length] = [["VT187-0170","Enumerate Imager"],
		["imager","imagerEnumEvent","JSimagerEnumEvent(%s)"],
		["imager","enumerate","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0175","Enable Imager"],
		["imager","width","300"],
		["imager","height","300"],
		["imager","enabled",""],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0182","Enable First available Imager device"],
		["imager","enable","method"],
		["imager","width","90"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0183","Enable First available Imager device and disable"],
		["imager","enable","method"],
		["imager","disable","method"]
	];

function generateArrayWithImgType(arrImgType){

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0172","Enable Imager"],
		["imager","width","300"],
		["imager","height","300"],
		["imager","enabled",arrImgType],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0176/VT187-0177","Disable Imager"],
		["imager","enabled",arrImgType],
		["imager","disable","method"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0178","Set left to 150"],
		["imager","enabled",arrImgType],
		["imager","left","150"],
		["imager","disable","method"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0179","Set top to 20"],
		["imager","enabled",arrImgType],
		["imager","top","20"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0180","Set height to 70"],
		["imager","enabled",arrImgType],
		["imager","height","70"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0181","Set width to 70"],
		["imager","enabled",arrImgType],
		["imager","width","70"],
		["imager","disable","method"]
	];

		imagerModuleSet[imagerModuleSet.length] = [["VT187-0185","Enable First available Imager device and disable"],
		["imager","enabled",arrImgType],
		["imager","left","80"],
		["imager","left","-20"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0187","Left to empty string"],
		["imager","enabled",arrImgType],
		["imager","top","80"],
		["imager","left",""],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0189","Top to negative value"],
		["imager","enabled",arrImgType],
		["imager","top","80"],
		["imager","top","-20"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0191","Top to empty string"],
		["imager","enabled",arrImgType],
		["imager","top","80"],
		["imager","top",""],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0193","Height to negative value"],
		["imager","enabled",arrImgType],
		["imager","height","80"],
		["imager","height","-20"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0195","Height to empty string"],
		["imager","enabled",arrImgType],
		["imager","height","80"],
		["imager","height",""],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0197","Width to negative value"],
		["imager","enabled",arrImgType],
		["imager","width","80"],
		["imager","width","-20"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0199","Width to empty string"],
		["imager","enabled",arrImgType],
		["imager","width","80"],
		["imager","width",""],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0200","lamp on"],
		["imager","enabled",arrImgType],
		["imager","left","200"],
		["imager","top","20"],
		["imager","height","90"],
		["imager","width","90"],
		["imager","lamp","on"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0201","Lamp off"],
		["imager","enabled",arrImgType],
		["imager","left","200"],
		["imager","top","20"],
		["imager","height","90"],
		["imager","width","90"],
		["imager","lamp","off"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0203","Lamp empty string"],
		["imager","enabled",arrImgType],
		["imager","left","200"],
		["imager","top","20"],
		["imager","height","90"],
		["imager","width","90"],
		["imager","lamp",""],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0204","Aim on"],
		["imager","enabled",arrImgType],
		["imager","left","200"],
		["imager","top","20"],
		["imager","height","90"],
		["imager","width","90"],
		["imager","aim","on"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0205","Aim off"],
		["imager","enabled",arrImgType],
		["imager","left","200"],
		["imager","top","20"],
		["imager","height","90"],
		["imager","width","90"],
		["imager","aim","off"],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0207","Aim off"],
		["imager","enabled",arrImgType],
		["imager","left","200"],
		["imager","top","20"],
		["imager","height","90"],
		["imager","width","90"],
		["imager","aim",""],
		["imager","disable","method"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0241","Enable the Imager and then change the viewfinder positions"],
		["imager","enabled",arrImgType],
		["imager","left","30"]
	];

	imagerModuleSet[imagerModuleSet.length] = [["VT187-0244","Test lamp with autorotate feature"],
		["imager","enabled",arrImgType],
		["imager","lamp","on"]
	];

	// Imager Data URI

	imageDataUri[imageDataUri.length] = [["VT187-2553","ImageCaptureEvent"],
		["imager","enabled",arrImgType],
		["imager","imagerCaptureEvent","onImageCapture(%json)"],
		["imager","capture","method"],
		["imager","disable","method"]
	];

	imageDataUri[imageDataUri.length] = [["VT187-2554","ImageCaptureEvent returns 'imageData'"],

		["imager","enabled",arrImgType],
		["imager","imagerCaptureEvent","onImageCapture(%json)"],
		["imager","capture","method"],
		["imager","disable","method"]
	];

	imageDataUri[imageDataUri.length] = [["VT187-2555","ImageCaptureEvent and display the Image"],

		["imager","enabled",arrImgType],
		["imager","imagerCaptureEvent","onImageCapture(%json)"],
		["imager","capture","method"],
		["imager","disable","method"]
	];

	imageDataUri[imageDataUri.length] = [["VT187-2561","ImageCaptureEvent and display the Image"],

		["imager","enabled",arrImgType],
		["imager","imagerCaptureEvent","onImageCapture(%json)"],
		["imager","sound","url('file://\\\\Application\\\\Alarm5.wav')"],
		["imager","capture","method"],
		["imager","disable","method"]
	];

	imageDataUri[imageDataUri.length] = [["VT187-2562","display the captured Image after setting co-ordinates of viewfinder"],

		["imager","enabled",arrImgType],
		["imager","left","200"],
		["imager","top","20"],
		["imager","height","100"],
		["imager","width","100"],
		["imager","imagerCaptureEvent","onImageCapture(%json)"],
		["imager","sound","url('file://\\\\Application\\\\Alarm5.wav')"],
		["imager","capture","method"],
		["imager","disable","method"]
	];
	
	imageTransfer[imageTransfer.length] = [["VT187-0235","Imager Event of JSON Object type"],
	
		["imager","destination","url('ftp://192.168.6.18/Received/imageinQFTP0235.bmp')"],
		["imager","username","ftpadmin"],
		["imager","password","ftpadmin"],
		["imager","enable","method"],
		["imager","imagerCaptureEvent","onImageCapture(%json)"],
		["imager","capture","method"],
		["imager","disable","method"]
	];

	imageTransfer[imageTransfer.length] = [["VT187-0208","Destnation to file system"],

		["imager","left","200"],
		["imager","top","20"],
		["imager","height","100"],
		["imager","width","100"],
		["imager","lamp","on"],
		["imager","aim","on"],
		["imager","destination","url('file://\\\\Temp\\\\CapturedImageTemp0208.bmp')"],
		["imager","imagerEvent","JSimagerEvent('%s')"],
		["imager","enabled",arrImgType],
		["imager","capture","method"],
		["imager","disable","method"]
	];

	imageTransfer[imageTransfer.length] = [["VT187-0209","Destination to FTP"],
		["imager","left","200"],
		["imager","top","20"],
		["imager","height","100"],
		["imager","width","100"],
		["imager","lamp","on"],
		["imager","aim","on"],
		["imager","destination","url('ftp://192.168.6.18/Received/imageInFTP0209.bmp')"],
		["imager","username","ftpadmin"],
		["imager","password","ftpadmin"],
		["imager","imagerEvent","JSimagerEvent('%s')"],
		["imager","enabled",arrImgType],
		["imager","capture","method"],
		["imager","disable","method"]
	];

	imageTransfer[imageTransfer.length] = [["VT187-0210","Set the destination to HTTP	imager"],

	["imager","left","200"],
	["imager","top","20"],
	["imager","height","100"],
	["imager","width","100"],
	["imager","lamp","on"],
	["imager","aim","on"],
	["imager","destination","url('http://192.168.6.18/NEON/secure/Upload.aspx')"],
	["imager","username","admin"],
	["imager","password","Motorola@123"],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","enabled",arrImgType],
	["imager","capture","method"],
	["imager","disable","method"]
];

imageTransfer[imageTransfer.length] = [["VT187-0219","Destination as fully qualified URL FTP"],
	["imager","left","200"],
	["imager","top","20"],
	["imager","height","100"],
	["imager","width","100"],
	["imager","lamp","on"],
	["imager","aim","on"],
	["imager","destination","url('ftp://ftpadmin:ftpadmin@192.168.6.18:21/Received/imageinQFTP0219.bmp')"],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","enabled",arrImgType],
	["imager","capture","method"],
	["imager","disable","method"]
];

imageTransfer[imageTransfer.length] = [["VT187-0220","Destination as fully qualified URL HTTP"],
	["imager","left","200"],
	["imager","top","20"],
	["imager","height","100"],
	["imager","width","100"],
	["imager","lamp","on"],
	["imager","aim","on"],
	["imager","destination","url('http://admin:Motorola@123@192.168.6.18/NEON/secure/Upload.aspx')"],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","enabled",arrImgType],
	["imager","capture","method"],
	["imager","disable","method"]

];

imageTransfer[imageTransfer.length] = [["VT187-221","Play wav on Image capture"],
	["imager","left","200"],
	["imager","top","20"],
	["imager","height","100"],
	["imager","width","100"],
	["imager","lamp","on"],
	["imager","aim","on"],
	["imager","destination","url('ftp://ftpadmin:ftpadmin@192.168.6.18:21/Received/imageinQFTP221.bmp')"],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","sound","url('file://\\\\Application\\\\Alarm5.wav')"],
	["imager","enabled",arrImgType],
	["imager","capture","method"],
	["imager","disable","method"]
];

imageDataUriTransfer[imageDataUriTransfer.length] = [["VT187-2566","ImageCaptureEvent and imagerEvent with local destination"],
	["imager","enabled",arrImgType],
	["imager","imagerCaptureEvent","onImageCapture(%json)"],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","destination","url('file://\\\\Temp\\\\CapturedImageTemp2566.bmp')"],
	["imager","capture","method"],
	["imager","disable","method"]
];

imageDataUriTransfer[imageDataUriTransfer.length] = [["VT187-2567","ImageCaptureEvent and imagerEvent with http destination"],

	["imager","enabled",arrImgType],
	["imager","imagerCaptureEvent","onImageCapture(%json)"],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","destination","url('http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx')"],
	["imager","capture","method"],
	["imager","disable","method"]

];

imageDataUriTransfer[imageDataUriTransfer.length] = [["VT187-2568","ImageCaptureEvent and imagerEvent with http destination"],

	["imager","enabled",arrImgType],
	["imager","imagerCaptureEvent","onImageCapture(%json)"],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","destination","url('ftp://192.168.6.18/Received/imageInFTP2568.bmp')"],
	["imager","capture","method"],
	["imager","disable","method"]

];

// Negative Test For Image Transfer

imageTransferN[imageTransferN.length] = [["VT187-0211","Set the destination to FTP and wrong username and password"],
	["imager","left","200"],
	["imager","top","20"],
	["imager","height","100"],
	["imager","width","100"],
	["imager","lamp","on"],
	["imager","aim","on"],
	["imager","destination","url('ftp://192.168.6.18/Received/imageInFTP0211.bmp')"],
	["imager","username","aaaa"],
	["imager","password","aaaa"],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","enabled",arrImgType],
	["imager","capture","method"],
	["imager","disable","method"]
];

imageTransferN[imageTransferN.length] = [["VT187-0212","Set the destination to HTTP and wrong username and password"],
	["imager","left","200"],
	["imager","top","20"],
	["imager","height","100"],
	["imager","width","100"],
	["imager","lamp","on"],
	["imager","aim","on"],
	["imager","destination","url('http://192.168.6.18/NEON/secure/Upload.aspx')"],
	["imager","username","aaaaa"],
	["imager","password","aaaaa"],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","enabled",arrImgType],
	["imager","capture","method"],
	["imager","disable","method"]

];

imageTransferN[imageTransferN.length] = [["VT187-0215","Destination to Invalid path FTP"],
	["imager","left","200"],
	["imager","top","20"],
	["imager","height","100"],
	["imager","width","100"],
	["imager","lamp","on"],
	["imager","aim","on"],
	["imager","destination","url('ftp://aaaa')"],
	["imager","username","aaaa"],
	["imager","password","aaaa"],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","enabled",arrImgType],
	["imager","capture","method"],
	["imager","disable","method"]

];

imageTransferN[imageTransferN.length] = [["VT187-0217","Destination:url() to Invalid path empty string	"],
	["imager","left","200"],
	["imager","top","20"],
	["imager","height","100"],
	["imager","width","100"],
	["imager","lamp","on"],
	["imager","aim","on"],
	["imager","destination","url('')"],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","enabled",arrImgType],
	["imager","capture","method"],
	["imager","disable","method"]

];

imageTransferN[imageTransferN.length] = [["VT187-0218","Destination to Invalid path empty string"],
	["imager","left","200"],
	["imager","top","20"],
	["imager","height","100"],
	["imager","width","100"],
	["imager","lamp","on"],
	["imager","aim","on"],
	["imager","destination",""],
	["imager","imagerEvent","JSimagerEvent('%s')"],
	["imager","enabled",arrImgType],
	["imager","capture","method"],
	["imager","disable","method"]

];

}
