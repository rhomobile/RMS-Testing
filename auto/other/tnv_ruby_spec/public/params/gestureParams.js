var gestureevent = new Array;

//Default Test Cases Goes Here
/*
gestureevent[gestureevent.length] = [["VT187-0013","Linear Gesture Preset Default","VT187-0013"],
["gesture","type","Linear"],
["gesture","id","VT187-0013"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0005","Linear gesture Default Diagonstic Value","VT187-0786"],
["gesture","type","Linear"],
["gesture","id","VT187-0786"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0006","Linear gesture Diagonstic False	","VT187-0006"],
["gesture","type","Linear"],
["gesture","id","VT187-0006"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","false"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0007","Linear gesture Diagonstic true	","VT187-0007"],
["gesture","type","Linear"],
["gesture","id","VT187-0007"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0009","Linear gesture Diagonstic Empty String","VT187-0009"],
["gesture","type","Linear"],
["gesture","id","VT187-0009"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics",""],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0011","Gesture type empty string","VT187-0011"],
["gesture","type",""],
["gesture","id","VT187-0009"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0012","ID Empty string",""],
["gesture","type","Linear"],
["gesture","id",""],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];
*/


//VERIFIED
gestureevent[gestureevent.length] = [["VT187-0013","Linear Gesture Preset Default","linear-left-right"],
["gesture","type","Linear"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0014","preset Right-left","linear-right-left"],
["gesture","type","Linear"],
["gesture","id","VT187-0014"],
["gesture","preset","right-left"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","900,260,100,260"]
];

gestureevent[gestureevent.length] = [["VT187-0015","preset left-right","linear-left-right"],
["gesture","type","Linear"],
["gesture","preset","left-right"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0016","preset top-bottom","linear-top-bottom"],
["gesture","type","Linear"],
["gesture","preset","top-bottom"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","450,100,500,500"]
];

gestureevent[gestureevent.length] = [["VT187-0017","preset bottom-top","linear-bottom-top"],
["gesture","type","Linear"],
["gesture","preset","bottom-top"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","500,500,500,50"]
];

gestureevent[gestureevent.length] = [["VT187-0019","Linear gesture Empty preset","linear-left-right"],
["gesture","type","Linear"],
["gesture","preset",""],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0020","Linear Gesture Default start and end co ordinates","VT187-0020"],
["gesture","type","Linear"],
["gesture","id","VT187-0020"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];


gestureevent[gestureevent.length] = [["VT187-0021","start-x :10,start-y:200,end-x:150,end-y:200","VT187-0021"],
["gesture","type","Linear"],
["gesture","id","VT187-0021"],
["gesture","startX","10"],
["gesture","startY","200"],
["gesture","endX","150"],
["gesture","endY","200"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","10,200,150,200"]
];

// Duplicate Test Case
gestureevent[gestureevent.length] = [["VT187-0022","start-x :10,start-y:200,end-x:150,end-y:200","VT187-0022"],
["gesture","type","Linear"],
["gesture","id","VT187-0022"],
["gesture","startX","10"],
["gesture","startY","200"],
["gesture","endX","150"],
["gesture","endY","200"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0023","start-x :10,start-y:200,end-x:0,end-y:0","VT187-0023"],
["gesture","type","Linear"],
["gesture","id","VT187-0023"],
["gesture","startX","0"],
["gesture","startY","0"],
["gesture","endX","10"],
["gesture","endY","200"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","50,50,60,250"]
];

gestureevent[gestureevent.length] = [["VT187-0024","start-x :-80,start-y:-20,end-x:250,end-y:250","VT187-0024"],
["gesture","type","Linear"],
["gesture","id","VT187-0024"],
["gesture","startX","80"],
["gesture","startY","20"],
["gesture","endX","250"],
["gesture","endY","250"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,100,250,250"]
];

gestureevent[gestureevent.length] = [["VT187-0031","start-x :empty string,start-y:-empty string,end-x:150,end-y:200	","VT187-0031"],
["gesture","type","Linear"],
["gesture","id","VT187-0031"],
["gesture","startX",""],
["gesture","startY",""],
["gesture","endX","150"],
["gesture","endY","200"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","50,50,200,250"]
];

//Issue Bottom to up Event is not firing.
gestureevent[gestureevent.length] = [["VT187-0032","start-x :10start-y:-200,end-x:empty string,end-y:-empty string","VT187-0032"],
["gesture","type","Linear"],
["gesture","id","VT187-0032"],
["gesture","startX","10"],
["gesture","startY","200"],
["gesture","endX",""],
["gesture","endY",""],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","50,250,0,20"]
];

gestureevent[gestureevent.length] = [["VT187-0033","Test overriding preset value","VT187-0033"],
["gesture","type","Linear"],
["gesture","preset","right-left"],
["gesture","id","VT187-0033"],
["gesture","startX","10"],
["gesture","startY","200"],
["gesture","endX","150"],
["gesture","endY","200"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","50,200,150,200"]
];

gestureevent[gestureevent.length] = [["VT187-0034","Linear gesture Tolerance Default value","VT187-0034"],
["gesture","type","Linear"],
["gesture","id","VT187-0034"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureeventN[gestureeventN.length] = [["VT187-0034","Linear gesture Tolerance Default value","VT187-0034"],
["gesture","type","Linear"],
["gesture","id","VT187-0034"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0035","Linear Gesture Tolerance 50","VT187-0035"],
["gesture","type","Linear"],
["gesture","id","VT187-0035"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","tolerance","50"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureeventN[gestureeventN.length] = [["VT187-0035","Linear Gesture Tolerance 50","VT187-0035"],
["gesture","type","Linear"],
["gesture","id","VT187-0035"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","tolerance","50"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

// Event Should Not Be Fired
gestureevent[gestureevent.length] = [["VT187-0036","Linear Gesture Tolerance 1","VT187-0036"],
["gesture","type","Linear"],
["gesture","id","VT187-0035"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","tolerance","1"],
["gesture","create","method"],
["Automate","drawline","method","110,285,900,285"]
];

gestureevent[gestureevent.length] = [["VT187-0037","Linear Gesture Tolerance 2000 Outside the screen","VT187-0037"],
["gesture","type","Linear"],
["gesture","id","VT187-0037"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","tolerance","2000"],
["gesture","sensitivity","0"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

// Negative Test Case
gestureevent[gestureevent.length] = [["VT187-0038","Linear gesture tolerance -50","VT187-0038"],
["gesture","type","Linear"],
["gesture","id","VT187-0038"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","tolerance","-50"],
["gesture","sensitivity","0"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

// Negative Test Case
gestureevent[gestureevent.length] = [["VT187-0041","Linear Gesture Tolerance empty string","VT187-0041"],
["gesture","type","Linear"],
["gesture","id","VT187-0041"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","tolerance",""],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0058","Linear gesture Default Region Width","VT187-0058"],
["gesture","type","Linear"],
["gesture","id","VT187-0058"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0059","Linear Gesture Region width 20","VT187-0059"],
["gesture","type","Linear"],
["gesture","id","VT187-0059"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","regionWidth","20"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0061","Linear Gesture Default Sensitivity","VT187-0061"],
["gesture","type","Linear"],
["gesture","id","VT187-0061"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0062","Linear Gesture Sensitivity 80","VT187-0062"],
["gesture","type","Linear"],
["gesture","id","VT187-0062"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","sensitivity","80"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];


gestureevent[gestureevent.length] = [["VT187-0063","Linear Gesture Sensitivity 100","VT187-0063"],
["gesture","type","Linear"],
["gesture","id","VT187-0063"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","regionWidth","40"],
["gesture","sensitivity","100"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,930,260"]
];

gestureevent[gestureevent.length] = [["VT187-0064","Linear Gesture Sensitivity 0","VT187-0064"],
["gesture","type","Linear"],
["gesture","id","VT187-0064"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","regionWidth","40"],
["gesture","sensitivity","0"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,150,260"]
];


/*

gestureevent[gestureevent.length] = [["VT187-0042","Linear Gesture default Skew (20 degree)","VT187-0042"],
["gesture","type","Linear"],
["gesture","id","VT187-0042"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,400,500,250"]
];   

gestureevent[gestureevent.length] = [["VT187-0043","Linear Gesture Skew 15","VT187-0043"],
["gesture","type","Linear"],
["gesture","id","VT187-0043"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","skew","15"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"],
["Automate","drawline","method","100,260,900,260"]
];    

gestureevent[gestureevent.length] = [["VT187-0044","Linear Gesture Skew 0","VT187-0044"],
["gesture","type","Linear"],
["gesture","id","VT187-0043"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","skew","0"],
["gesture","sensitivity","0"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"],
["Automate","drawline","method","100,260,900,260"]
];   

gestureevent[gestureevent.length] = [["VT187-0045","Linear Gesture Skew 90","VT187-0045"],
["gesture","type","Linear"],
["gesture","id","VT187-0043"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","skew","90"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"],
["Automate","drawline","method","100,260,900,260"]
];   

gestureevent[gestureevent.length] = [["VT187-0046","Linear Gesture Skew -1(Negative)","VT187-0045"],
["gesture","type","Linear"],
["gesture","id","VT187-0043"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","skew","-1"],
["gesture","sensitivity","0"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"],
["Automate","drawline","method","100,260,900,260"]
];  

gestureevent[gestureevent.length] = [["VT187-0049","Linear Gesture skew empty string","VT187-0049"],
["gesture","type","Linear"],
["gesture","id","VT187-0049"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","skew",""],
["gesture","sensitivity","0"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"],
["Automate","drawline","method","100,260,900,260"]
]; 

gestureevent[gestureevent.length] = [["VT187-0050","Linear Gesture Default deviation","VT187-0050"],
["gesture","type","Linear"],
["gesture","id","VT187-0050"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0050","Linear Gesture Default deviation","VT187-0050"],
["gesture","type","Linear"],
["gesture","id","VT187-0050"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0051","Linear Gesture deviation 10","VT187-0051"],
["gesture","type","Linear"],
["gesture","id","VT187-0051"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","deviation","10"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];	

gestureevent[gestureevent.length] = [["VT187-0052","Linear Gesture Deviation 0","VT187-0052"],
["gesture","type","Linear"],
["gesture","id","VT187-0052"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","deviation","0"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];	

gestureevent[gestureevent.length] = [["VT187-0053","Linear Gesture Deviation 100","VT187-0053"],
["gesture","type","Linear"],
["gesture","id","VT187-0052"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","deviation","100"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0054","Linear Gesture Deviation -30(Negative)","VT187-0054"],
["gesture","type","Linear"],
["gesture","id","VT187-0054"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","deviation","100"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["VT187-0057","Linear Gesture Deviation Empty string","VT187-0057"],
["gesture","type","Linear"],
["gesture","id","VT187-0054"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","deviation",""],
["gesture","sensitivity","0"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];

gestureevent[gestureevent.length] = [["","Linear Gesture Deviation Empty string",""],
["gesture","type","Linear"],
["gesture","id","VT187-0054"],
["gesture","detected","onGestureJSON(%json);"],
["gesture","deviation",""],
["gesture","sensitivity","0"],
["gesture","diagnostics","true"],
["gesture","create","method"],
["Automate","drawline","method","100,260,900,260"]
];


*/