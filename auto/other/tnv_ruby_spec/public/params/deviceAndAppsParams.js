var backlightSet = new Array;
var deviceSet = new Array;
var hourglassSet = new Array;
var keylightSet = new Array;
var screenOrientationSet = new Array;
var volumeSet = new Array;
var zoomSet = new Array;
var vibratorSet = new Array;
var beeperSet = new Array;
var ledSet = new Array;

var backlightEvent = new Array;
var notificationEvent = new Array;
var timerEvent = new Array;
var alarmEvent = new Array;
var applicationEvent = new Array;


backlightSet[backlightSet.length] = [["VT187-1394","Backlight-Turn off the screen backlight"],
["backlight","off","method"]
];

backlightSet[backlightSet.length] = [["VT187-1393","Backlight-Turn on the screen backlight"],
["backlight","on","method"]
];


backlightSet[backlightSet.length] = [["VT187-1395","Backlight-set the intensity of screen backlight with valid range"],
["backlight","on","method"],
["backlight","intensity","0"],
["backlight","intensity","1"],
["backlight","intensity","2"],
["backlight","intensity","3"],
["backlight","intensity","4"],
["backlight","intensity","10"],
["backlight","intensity","30"],
["backlight","intensity","75"],
["backlight","intensity","100"]
];

backlightSet[backlightSet.length] = [["VT187-1396","Backlight-set the intensity to 0"],
["backlight","on","method"],
["backlight","intensity","0"],
["backlight","intensity","10"]
];

backlightSet[backlightSet.length] = [["VT187-1398","Backlight-set the intensity of screen backlight with empty value"],
["backlight","on","method"],
["backlight","intensity",""],
];

backlightSet[backlightSet.length] = [["VT187-1399","Backlight-set the intensity of screen backlight with negative value"],
["backlight","on","method"],
["backlight","intensity","-2"],
];

backlightSet[backlightSet.length] = [["VT187-1395","Backlight using JSObject"],
["backlight","on","method"],
["backlight","intensity","5"],
["backlight","intensity","100"]
];

backlightEvent[backlightEvent.length] = [["VT187-1400","Backlight-set backlightSettingsEvent(to check event status while backlight is off)"],
["backlight","backlightSettingsEvent","jsBacklightSettingsEvent('%s',%s,'%s')"],
["backlight","off","method"],
["backlight","getBacklightSettings","method"]
];

backlightEvent[backlightEvent.length] = [["VT187-1400","Backlight-set backlightSettingsEvent"],
["backlight","backlightSettingsEvent","jsBacklightSettingsEvent('%s',%s,'%s')"],
["backlight","on","method"],
["backlight","getBacklightSettings","method"]
];


/*
//Device Module Params (Commented because it can not be resumed automatically)
deviceSet[deviceSet.length] = [["VT187-1413","Device tag with Suspend"],
["device","suspend","method"]
];

deviceSet[deviceSet.length] = [["VT187-1414","Device tag with Calibrate"],
["device","calibrate","method"]
];

deviceSet[deviceSet.length] = [["VT187-1415","Device tag with Suspend and calibrate"],
["device","suspend","method"],
["device","calibrate","method"]
];

deviceSet[deviceSet.length] = [["VT187-1421","Device tag with Suspend and calibrate using JSObject"],
["device","suspend","method"],
["device","calibrate","method"]
];
*/

hourglassSet[hourglassSet.length] = [["VT187-1430","Hourglass Visible"],
["hourglass","visibility","Visible"]
];

hourglassSet[hourglassSet.length] = [["VT187-1431","Hourglass hidden"],
["hourglass","visibility","Hidden"]
];

hourglassSet[hourglassSet.length] = [["VT187-1433","Hourglass left"],
["hourglass","visibility","Visible"],
["hourglass","left","10"]
];

hourglassSet[hourglassSet.length] = [["VT187-1434","Hourglass top"],
["hourglass","visibility","Visible"],
["hourglass","top","20"]
];

hourglassSet[hourglassSet.length] = [["VT187-1436","Hourglass position with empty value"],
["hourglass","visibility","Visible"],
["hourglass","left",""],
["hourglass","top",""]
];

hourglassSet[hourglassSet.length] = [["VT187-1440","Hourglass with JSObject"],
["hourglass","visibility","Visible"],
["hourglass","left","200"],
["hourglass","top","300"],
["hourglass","visibility","Hidden"]
];


// KeyLight Module

keylightSet[keylightSet.length] = [["VT187-1443","Keylight with Off"],
["keylight","off","method"]
];

keylightSet[keylightSet.length] = [["VT187-1442","Keylight with On"],
["keylight","on","method"]
];

keylightSet[keylightSet.length] = [["VT187-1444","Keylight with Intensity to 2"],
["keylight","on","method"],
["keylight","intensity","2"]
];

keylightSet[keylightSet.length] = [["VT187-1446","Keylight with empty Intensity value"],
["keylight","on","method"],
["keylight","intensity",""]
];

keylightSet[keylightSet.length] = [["VT187-1452","Keylight with JSObject"],
["keylight","on","method"],
["keylight","intensity","0"]
];

/*
//Notification Module
//TODO
notificationEvent[notificationEvent.length] = [["VT187-1454","Enumerate Notification by using EnumNotificationsEvent - JS"],
["notification","enumNotificationsEvent","jsEnumNotificationsEvent(%s)"],
["notification","enumerate","method"]
];
*/

//Screen Orientation Module

screenOrientationSet[screenOrientationSet.length] = [["VT187-2257","ScreenOrientation RightHanded"],
["screenOrientation","screenOrientationEvent","jsScreenOrientationEvent('%s')"],
["screenOrientation","rightHanded","method"]
];

screenOrientationSet[screenOrientationSet.length] = [["VT187-2258","ScreenOrientation Left Handed"],
["screenOrientation","screenOrientationEvent","jsScreenOrientationEvent('%s')"],
["screenOrientation","leftHanded","method"]
];

screenOrientationSet[screenOrientationSet.length] = [["VT187-2259","ScreenOrientation Upside Down"],
["screenOrientation","screenOrientationEvent","jsScreenOrientationEvent('%s')"],
["screenOrientation","upsideDown","method"]
];

screenOrientationSet[screenOrientationSet.length] = [["VT187-2260","ScreenOrientation with Normal"],
["screenOrientation","screenOrientationEvent","jsScreenOrientationEvent('%s')"],
["screenOrientation","normal","method"]
];

screenOrientationSet[screenOrientationSet.length] = [["VT187-2261","autoRotate Enabled"],
["screenOrientation","screenOrientationEvent","jsScreenOrientationEnableEvent('%s')"],
["screenOrientation","autoRotate","Enabled"]
];

screenOrientationSet[screenOrientationSet.length] = [["VT187-2273","ScreenOrientation using JSObject"],
["screenOrientation","screenOrientationEvent","jsScreenOrientationEvent('%s')"],
["screenOrientation","autoRotate","Enabled"]
];
/*
screenOrientationSet[screenOrientationSet.length] = [["VT187-2262","ScreenOrientation with Normal"],
["screenOrientation","screenOrientationEvent","jsScreenOrientationEvent('%s')"],
["screenOrientation","autoRotate","Disabled"]
];

screenOrientationSet[screenOrientationSet.length] = [["VT187-2263","Set autoRotate value to empty"],
["screenOrientation","screenOrientationEvent","jsScreenOrientationEvent('%s')"],
["screenOrientation","autoRotate",""]
];

applicationEvent[applicationEvent.length] = [["VT187-1382","Version Event(java script)"],
["application","versionEvent","fnVer('%s',%s,%s);"],
["application","getVersion","method"],
];

*/

//Volume Module

volumeSet[volumeSet.length] = [["VT187-2338","Volume with zero"],
["MediaPlayer","filename","url('http://192.168.6.18:80/NEON/ReceivedFiles/audio/song1.wav');"],
["MediaPlayer","type","audio"],
["MediaPlayer","start","method"],
["volume","setVolume","0x0000"],
["MediaPlayer","stop","method"]
];

volumeSet[volumeSet.length] = [["VT187-2339","Volume with Maxmium"],
["MediaPlayer","filename","url('http://192.168.6.18:80/NEON/ReceivedFiles/audio/song1.wav');"],
["MediaPlayer","start","method"],
["volume","setVolume","0xFFFF"],
["MediaPlayer","stop","method"]
];
/*
volumeSet[volumeSet.length] = [["VT187-2340","Volume with 0x00AA"],
["MediaPlayer","filename","url('http://192.168.6.18:80/NEON/ReceivedFiles/audio/song1.wav');"],
["MediaPlayer","start","method"],
["volume","setVolume","0x00AA"]
["MediaPlayer","stop","method"]
];
*/
volumeSet[volumeSet.length] = [["VT187-2341","Volume with empty value"],
["MediaPlayer","filename","url('http://192.168.6.18:80/NEON/ReceivedFiles/audio/song1.wav');"],
["MediaPlayer","start","method"],
["volume","setVolume","0xFFFF"],
["volume","setVolume",""],
["MediaPlayer","stop","method"]
];

volumeSet[volumeSet.length] = [["VT187-2344","Volume with JSObject"],
["MediaPlayer","filename","url('http://192.168.6.18:80/NEON/ReceivedFiles/audio/song1.wav');"],
["MediaPlayer","start","method"],
["volume","setVolume","0xFFFF"],
["MediaPlayer","stop","method"]
];

//Zoom Module

zoomSet[zoomSet.length] = [["VT187-2348","Zoom- text parameter to 0"],
["zoom","text","0"]
];

zoomSet[zoomSet.length] = [["VT187-2349","Zoom- text parameter to 1"],
["zoom","text","1"]
];

zoomSet[zoomSet.length] = [["VT187-2350","Zoom- text parameter to 2"],
["zoom","text","2"]
];

zoomSet[zoomSet.length] = [["VT187-2351","Zoom- text parameter to 3"],
["zoom","text","3"]
];

zoomSet[zoomSet.length] = [["VT187-2352","Zoom- text parameter to 4"],
["zoom","text","4"]
];

zoomSet[zoomSet.length] = [["VT187-2353","Zoom- text parameter to 10"],
["zoom","text","10"]
];

zoomSet[zoomSet.length] = [["VT187-2354","Zoom- page parameter value to 2"],
["zoom","page","2"]
];

zoomSet[zoomSet.length] = [["VT187-2355","Zoom- page parameter value to 3, 1"],
["zoom","page","3"],
["zoom","page","1"]
];

zoomSet[zoomSet.length] = [["VT187-1500","Zoom- page parameter value less than 1"],
["zoom","page","1"],
["zoom","page","0"]
];

zoomSet[zoomSet.length] = [["VT187-1501","Zoom- page parameter value to -10"],
["zoom","page","-10"],
["zoom","page","1"],
];

// Timer Module

timerEvent[timerEvent.length] = [["VT187-2320","Timer(Default) with start method"],
["timer","timeout","jsTimeout('%s')"],
["timer","start","method"]
];

timerEvent[timerEvent.length] = [["VT187-2321","Timer(Default) with start method"],
["timer","timeout","jsTimeout('%s')"],
["timer","interval","5000"],
["timer","start","method"]
];

timerEvent[timerEvent.length] = [["VT187-2322","Timer with interval less than 500 ms(100)"],
["timer","timeout","jsTimeout('%s')"],
["timer","interval","100"],
["timer","start","method"]
];
/*
timerEvent[timerEvent.length] = [["VT187-2323","Timer with stop method"],
["timer","timeout","jsTimeout('%s')"],
["timer","interval","60000"],
["timer","start","method"],
["timer","stop","method"]
];*/

timerEvent[timerEvent.length] = [["VT187-2324","Timer with start/stop/start method"],
["timer","timeout","jsTimeout('%s')"],
["timer","interval","60000"],
["timer","start","method"],
["timer","stop","method"],
["timer","start","method"]
];

timerEvent[timerEvent.length] = [["VT187-2325","Timer with interval value to empty"],
["timer","timeout","jsTimeout('%s')"],
["timer","interval",""],
["timer","start","method"]
];

timerEvent[timerEvent.length] = [["VT187-2334","Timer with JSObject"],
["timer","timeout","jsTimeout('%s')"],
["timer","interval","5000"],
["timer","start","method"]
];

/*
alarmEvent[alarmEvent.length] = [["VT187-1346","Set the alarm with valid value of interval param"],
["alarm","alarmTriggered","doAlarm(%json)"],
["alarm","set","method"]
];

alarmEvent[alarmEvent.length] = [["VT187-1347","Set the alarm with delay less than 30 seconds of interval param"],
["alarm","alarmTriggered","doAlarm(%json)"],
["alarm","interval","00-00-15"],
["alarm","set","method"]
];


alarmEvent[alarmEvent.length] = [["VT187-1349","Set the alarm with Repeat value to true"],
["alarm","alarmTriggered","doAlarm(%json)"],
["alarm","interval","00-00-30"],
["alarm","repeat","true"],
["alarm","set","method"]
];


alarmEvent[alarmEvent.length] = [["VT187-1350","Set the alarm with repeat to false"],
["alarm","alarmTriggered","doAlarm(%json)"],
["alarm","interval","00-00-30"],
["alarm","repeat","false"],
["alarm","set","method"]
];

alarmEvent[alarmEvent.length] = [["VT187-1351","Set the alarm with repeat value to empty/invalid"],
["alarm","alarmTriggered","doAlarm(%json)"],
["alarm","interval","00-00-30"],
["alarm","repeat",""],
["alarm","set","method"]
];


alarmEvent[alarmEvent.length] = [["VT187-1352","Set the alarm with repeat value to empty/invalid"],
["alarm","alarmTriggered","doAlarm(%json)"],
["alarm","interval","00-00-30"],
["alarm","repeat",""],
["alarm","set","method"]
];


applicationEvent[applicationEvent.length] = [["VT187-1369","Minimize with ApplicationEvent JS"],
["application","applicationEvent","doStatejsFunction('%s')"],
["application","minimize","method"]
];

applicationEvent[applicationEvent.length] = [["VT187-1370","Restore with ApplicationEvent JS"],
["application","applicationEvent","doStatejsFunction('%s')"],
["application","restore","method"]
];
*/

/*
var getLEDParams = function (index){

	ledSet[ledSet.length] = [["VT187-1458","LED StateOn Notification"],
	["notification","stateOn",index]
	];

	ledSet[ledSet.length] = [["VT187-1459","LED StateOff Notification"],
	["notification","stateOff",index]
	];

	ledSet[ledSet.length] = [["VT187-1460","LED StateCycle Notification with default values"],
	["notification","stateCycle",index]
	];

}


var getBeeperParams = function (index){

	beeperSet[beeperSet.length] = [["VT187-1464","Beeper StateOn"],
	["notification","stateOn",index]
	];

	beeperSet[beeperSet.length] = [["VT187-1465","Beeper StateOff"],
	["notification","stateOff",index]
	];

	beeperSet[beeperSet.length] = [["VT187-1468","Beeper StateCycle with Default Values"],
	["notification","setBeeperVolume","4"],
	["notification","stateCycle",index]
	];

}

var getVibratorParams = function (index){

	vibratorSet[vibratorSet.length] = [["VT187-1471","Vibrator StateOn"],
	["notification","stateOn",index]
	];

	vibratorSet[vibratorSet.length] = [["VT187-1472","Vibrator StateOff"],
	["notification","stateOff",index]
	];

	vibratorSet[vibratorSet.length] = [["VT187-1473","Vibrator StateCycle with Default Values"],
	["notification","stateCycle",index]
	];

}

*/