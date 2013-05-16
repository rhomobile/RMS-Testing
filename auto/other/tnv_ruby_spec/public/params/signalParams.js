var signalSet = new Array;
var signalEvent = new Array;

signalSet[signalSet.length] = [["VT187-0758","Signal visible"],
["signal","visibility","visible"]
];

signalSet[signalSet.length] = [["VT187-0759","Signal hidden"],
["signal","visibility","hidden"]
];

signalSet[signalSet.length] = [["VT187-0761","Signal left 40"],
["signal","visibility","visible"],
["signal","left","40"]
];

signalSet[signalSet.length] = [["VT187-0762","Signal top 30"],
["signal","visibility","visible"],
["signal","top","30"]
];

signalSet[signalSet.length] = [["VT187-0769","Signal with Layout Left"],
["signal","visibility","visible"],
["signal","layout","Left"]
];

signalSet[signalSet.length] = [["VT187-0770","Signal with Layout Right"],
["signal","visibility","visible"],
["signal","layout","Right"]
];

signalSet[signalSet.length] = [["VT187-0771","Signal with Layout Up"],
["signal","visibility","visible"],
["signal","layout","Up"]
];

signalSet[signalSet.length] = [["VT187-0772","Signal with Layout Down"],
["signal","visibility","visible"],
["signal","layout","Down"]
];

signalSet[signalSet.length] = [["VT187-0775","Signal with RGB color format"],
["signal","visibility","visible"],
["signal","color","#0000FF"]
];

signalSet[signalSet.length] = [["VT187-0776","Signal with RGB color format"],
["signal","visibility","visible"],
["signal","color","#FF0000"]
];


signalEvent[signalEvent.length] = [["VT187-0778","Signalevent JS"],
["signal","visibility","visible"],
["signal","signalEvent","jsSignalEventCallBack('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s');"],
];

signalEvent[signalEvent.length] = [["VT187-0779","Signalevent JSON"],
["signal","visibility","visible"],
["signal","signalEvent","jsonSignalEventCallBack(%json);"],
];