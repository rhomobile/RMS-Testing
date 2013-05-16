var signatureSet = new Array;
var signatureTransfer = new Array;
var signatureVector = new Array;
var signatureTransferN = new Array;
var signatureDataUri = new Array;

signatureSet[signatureSet.length] = [["VT187-0815","SignatureCapture Visible"],
["signatureCapture","visibility","Visible"]
];

signatureSet[signatureSet.length] = [["VT187-0816","SignatureCapture hidden"],
["signatureCapture","visibility","Hidden"]
];

signatureSet[signatureSet.length] = [["VT187-0818","SignatureCapture with empty content"],
["signatureCapture","visibility",""]
];

//TODO: Enable SIP and Capture Screen
signatureSet[signatureSet.length] = [["VT187-0819","SignatureCapture with SIP"],
["signatureCapture","visibility","Visible"]
];

signatureSet[signatureSet.length] = [["VT187-0820","SignatureCapture default left and top values i.e. left = 15 and top = 60"],
["signatureCapture","visibility","Visible"]
];

signatureSet[signatureSet.length] = [["VT187-0821","SignatureCapture left"],
["signatureCapture","visibility","Visible"],
["signatureCapture","left","20"]
];

signatureSet[signatureSet.length] = [["VT187-0823","SignatureCapture top"],
["signatureCapture","visibility","Visible"],
["signatureCapture","top","20"]
];

signatureSet[signatureSet.length] = [["VT187-0827","SignatureCapture invalid position -negative values"],
["signatureCapture","visibility","Visible"],
["signatureCapture","left","-20"],
["signatureCapture","top","-70"],
];

signatureSet[signatureSet.length] = [["VT187-0828","SignatureCapture default height and default values i.e. height = 150 & width = 200"],
["signatureCapture","visibility","Visible"]
];

signatureSet[signatureSet.length] = [["VT187-0829","SignatureCapture height"],
["signatureCapture","visibility","Visible"],
["signatureCapture","left","20"],
["signatureCapture","top","20"],
["signatureCapture","height","20"]
];

signatureSet[signatureSet.length] = [["VT187-0830","SignatureCapture width"],
["signatureCapture","visibility","Visible"],
["signatureCapture","width","30"]
];

signatureSet[signatureSet.length] = [["VT187-0832","SignatureCapture with height and width content as blank"],
["signatureCapture","visibility","Visible"],
["signatureCapture","width",""],
["signatureCapture","height",""]
];

signatureSet[signatureSet.length] = [["VT187-0833","SignatureCapture with negative height and width"],
["signatureCapture","visibility","Visible"],
["signatureCapture","width","-30"],
["signatureCapture","height","-20"]
];

//TODO: Need to draw automatic in signature pad
signatureSet[signatureSet.length] = [["VT187-0835","SignatureCapture - draw multiple times"],
["signatureCapture","height","100"],
["signatureCapture","width","100"],
["signatureCapture","top","20"],
["signatureCapture","left","20"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["Automate","drawline","method","100,100,200,100"]
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0836","SignatureCapture default Penwidth and pen color"],
["signatureCapture","height","100"],
["signatureCapture","width","100"],
["signatureCapture","top","20"],
["signatureCapture","left","20"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method"]
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0837","SignatureCapture Penwidth 3"],
["signatureCapture","height","100"],
["signatureCapture","width","100"],
["signatureCapture","top","20"],
["signatureCapture","left","20"],
["signatureCapture","penWidth","3"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"]
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0839","SignatureCapture Penwidth 0"],
["signatureCapture","height","100"],
["signatureCapture","width","100"],
["signatureCapture","top","20"],
["signatureCapture","left","20"],
["signatureCapture","penWidth","0"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"]
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0840","SignatureCapture Penwidth set to negative value"],
["signatureCapture","height","100"],
["signatureCapture","width","100"],
["signatureCapture","top","20"],
["signatureCapture","left","20"],
["signatureCapture","penWidth","-5"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"]
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0841","SignatureCapture Penwidth set to blank"],
["signatureCapture","height","100"],
["signatureCapture","width","100"],
["signatureCapture","top","20"],
["signatureCapture","left","20"],
["signatureCapture","penWidth",""],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"]
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0843","SignatureCapture default Pen color"],
["signatureCapture","height","200"],
["signatureCapture","width","200"],
["signatureCapture","top","20"],
["signatureCapture","left","20"],
["signatureCapture","penWidth","2"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"]
];


//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0844","SignatureCapture Pen color"],
["signatureCapture","height","200"],
["signatureCapture","width","200"],
["signatureCapture","top","20"],
["signatureCapture","left","20"],
["signatureCapture","penWidth","2"],
["signatureCapture","penColor","#FF0000"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"]
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0845","SignatureCapture with same pencolor and background color"],
["signatureCapture","penColor","#FFFF00"],
["signatureCapture","bgColor","#000000"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"]
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0846","SignatureCapture Pencolor with content as blank"],
["signatureCapture","penColor",""],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"]
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0848","SignatureCapture default BGColor"],
["signatureCapture","visibility","Visible"],
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0849","SignatureCapture with same pencolor and background color"],
["signatureCapture","bgColor","#0000FF"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"]
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0851","SignatureCapture BGColor with content as blank"],
["signatureCapture","bgColor",""],
["signatureCapture","visibility","Visible"]
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0852","SignatureCapture Clear"],
["signatureCapture","height","200"],
["signatureCapture","width","200"],
["signatureCapture","top","20"],
["signatureCapture","left","20"],
["signatureCapture","penWidth","2"],
["signatureCapture","penColor","#FF0000"],
["signatureCapture","bgColor","#0000FF"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","clear","method"],
];

//TODO: Need to draw automatic in signature pad 
signatureSet[signatureSet.length] = [["VT187-0853","SignatureCapture Capture"],
["signatureCapture","name","Motorola853"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
];

//TODO: Need to draw and capture two times
signatureSet[signatureSet.length] = [["VT187-0854","SignatureCapture Capture Overwrite"],
["signatureCapture","name","Motorola854"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"],
["Automate","drawline","method","100,200,200,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

//TODO: Not possible to automate
signatureSet[signatureSet.length] = [["VT187-0855","SignatureCapture Capture Overwrite with file opened"],
["signatureCapture","name","Motorola855"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureSet[signatureSet.length] = [["VT187-0856","SignatureCapture Name"],
["signatureCapture","height","200"],
["signatureCapture","width","200"],
["signatureCapture","top","20"],
["signatureCapture","left","20"],
["signatureCapture","penWidth","2"],
["signatureCapture","penColor","#FF0000"],
["signatureCapture","bgColor","#0000FF"],
["signatureCapture","name","Motorola856"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureSet[signatureSet.length] = [["VT187-0858","SignatureCapture Name with blank character"],
["signatureCapture","name",""],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureTransfer[signatureTransfer.length] = [["VT187-0859","SignatureCapture Destination(ftp) JS"],
["signatureCapture","height","200"],
["signatureCapture","width","200"],
["signatureCapture","top","20"],
["signatureCapture","left","20"],
["signatureCapture","penWidth","2"],
["signatureCapture","penColor","#FF0000"],
["signatureCapture","bgColor","#0000FF"],
["signatureCapture","name","Signature859"],
["signatureCapture","destination","url('ftp://192.168.6.18/Received/siginQFTP859.bmp')"],
["signatureCapture","username","ftpadmin"],
["signatureCapture","password","ftpadmin"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureTransfer[signatureTransfer.length] = [["VT187-0864","SignatureCapture Destination(http)"],
["signatureCapture","name","Motorola864"],
["signatureCapture","destination","url('http://192.168.6.18/NEON/secure/Upload.aspx')"],
["signatureCapture","username","admin"],
["signatureCapture","password","Motorola@123"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureTransfer[signatureTransfer.length] = [["VT187-0865","SignatureCapture Destination(http) overwrite"],
["signatureCapture","name","Motorola865"],
["signatureCapture","destination","url('http://192.168.6.18/NEON/secure/Upload.aspx')"],
["signatureCapture","username","admin"],
["signatureCapture","password","Motorola@123"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"],
["Automate","drawline","method"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureTransfer[signatureTransfer.length] = [["VT187-0867","SignatureCapture Destination(http) with user name and password in url"],
["signatureCapture","name","Motorola867"],
["signatureCapture","destination","url('http://admin:Motorola@123@192.168.6.18:80/NEON/secure/Upload.aspx')"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureTransfer[signatureTransfer.length] = [["VT187-0873","SignatureCapture Destination Filesystem"],
["signatureCapture","destination","url('file://\\\\Temp\\\\CapturedSigTemp873.bmp')"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureTransfer[signatureTransfer.length] = [["VT187-0878","SignatureCapture Destination(ftp) fully qualified url with userid and password"],
["signatureCapture","destination","url('ftp://ftpadmin:ftpadmin@192.168.6.18/Received/siginQFTP878.bmp')"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureTransfer[signatureTransfer.length] = [["VT187-0879","SignatureSaveEvent Destination(http)"],
["signatureCapture","name","Motorola0879"],
["signatureCapture","destination","url('http://192.168.6.18:80/NEON/ReceivedFiles/Upload.aspx')"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureTransfer[signatureTransfer.length] = [["VT187-2717","signatureCaptureEvent and signatureSaveEvent with local path"],
["signatureCapture","destination","url('file://\\\\Temp\\\\CapturedSigTemp2717.bmp')"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","signatureCaptureEvent","onSignatureCapture(%json)"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureTransfer[signatureTransfer.length] = [["VT187-2718","signatureCaptureEvent and signatureSaveEvent with HTTP"],
["signatureCapture","name","Motorola2718"],
["signatureCapture","destination","url('http://192.168.6.18:80/NEON/ReceivedFiles/Upload.aspx')"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","signatureCaptureEvent","onSignatureCapture(%json)"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureTransfer[signatureTransfer.length] = [["VT187-2719","signatureCaptureEvent and signatureSaveEvent with FTP"],
["signatureCapture","destination","url('ftp://192.168.6.18/Received/siginQFTP2719.bmp')"],
["signatureCapture","username","ftpadmin"],
["signatureCapture","password","ftpadmin"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","signatureCaptureEvent","onSignatureCapture(%json)"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];	

signatureVector[signatureVector.length] = [["VT187-0882","Vector Event During Signature Capture JS"],
["signatureCapture","vectorEvent","Jsvectoryarray(%s)"],
["signatureCapture","name","Motorola0882"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"],
];

signatureVector[signatureVector.length] = [["VT187-0888","Vector Event During Signature Capture JSON"],
["signatureCapture","vectorEvent","Jsvectoryarray(%s)"],
["signatureCapture","name","Motorola0888"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

//Negative Test Case

signatureTransferN[signatureTransferN.length] = [["VT187-0866","SignatureCapture Destination(http) without file name"],
["signatureCapture","name","Motorola0866"],
["signatureCapture","destination","url('http://192.168.6.18/')"],
["signatureCapture","username","admin"],
["signatureCapture","password","Motorola@123"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureTransferN[signatureTransferN.length] = [["VT187-0868","SignatureCapture Destination(http) with invalid user name and password in url"],
["signatureCapture","name","Motorola0868"],
["signatureCapture","destination","url('http://aaaaa:aaaaa@192.168.6.18:80/NEON/secure/Upload.aspx')"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

//TODO: Not a Valid -ve test case
signatureTransferN[signatureTransferN.length] = [["VT187-0869","SignatureCapture Destination(http) with blank user name and password in url"],
["signatureCapture","name","Motorola0869"],
["signatureCapture","destination","url('http://:aaaaa@192.168.6.18:80/NEON/secure/Upload.aspx')"],
["signatureCapture","signatureSaveEvent","JSSigtranseferEvent('%s')"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];


signatureDataUri[signatureDataUri.length] = [["VT187-2704","signatureCaptureEvent Data URI"],
["signatureCapture","signatureCaptureEvent","onSignatureCapture(%json)"],
["signatureCapture","name","Motorola2704"],
["signatureCapture","visibility","Visible"],
["signatureCapture","capture","method"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","clear","method"]
];

signatureDataUri[signatureDataUri.length] = [["VT187-2705","signatureCaptureEvent returns imageData"],
["signatureCapture","signatureCaptureEvent","onSignatureCapture(%json)"],
["signatureCapture","name","Motorola2705"],
["signatureCapture","visibility","Visible"],
["signatureCapture","capture","method"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","clear","method"]
];

signatureDataUri[signatureDataUri.length] = [["VT187-2706","signatureCaptureEvent and display the signature"],
["signatureCapture","signatureCaptureEvent","onSignatureCapture(%json)"],
["signatureCapture","name","Motorola2706"],
["signatureCapture","visibility","Visible"],
["signatureCapture","capture","method"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","clear","method"]
];

signatureDataUri[signatureDataUri.length] = [["VT187-2711","display the captured signature after setting Bgcolor and pencolor"],
["signatureCapture","signatureCaptureEvent","onSignatureCapture(%json)"],
["signatureCapture","bgColor","#0000FF"],
["signatureCapture","penColor","#FF0000"],
["signatureCapture","name","Motorola2711"],
["signatureCapture","visibility","Visible"],
["signatureCapture","capture","method"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","clear","method"]
];

signatureDataUri[signatureDataUri.length] = [["VT187-2712","display the captured signature after setting penwidth and border"],
["signatureCapture","signatureCaptureEvent","onSignatureCapture(%json)"],
["signatureCapture","penWidth","3"],
["signatureCapture","border","2"],
["signatureCapture","name","Motorola2712"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];

signatureDataUri[signatureDataUri.length] = [["VT187-2713","display the captured signature after setting co-ordinates of rectangular"],
["signatureCapture","signatureCaptureEvent","onSignatureCapture(%json)"],
["signatureCapture","height","200"],
["signatureCapture","width","200"],
["signatureCapture","name","Motorola2713"],
["signatureCapture","visibility","Visible"],
["Automate","drawline","method","100,100,100,200"],
["signatureCapture","capture","method"],
["signatureCapture","clear","method"]
];