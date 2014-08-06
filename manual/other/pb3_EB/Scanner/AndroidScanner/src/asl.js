var res = [];
res["en-US"] = {};
res["en-US"] = {
	AlertTitle : "Alert",
	ConfirmTitle : "Confirm",
	ConfirmCancel : "Cancel",
	ConfirmOK : "OK",
	AlertOK : "OK",
	Options : "Options"
};

var addressBar = {
    left : "",
    top : "",
    width : "",
    visibility : ""
};
var alarm = {
    clear : function() {
    },
    set : function() {
    },
    interval : "",
    repeat : "",
    time : "",
    alarmTriggered : "//This Property gets an callback"
};
var application = {
    quit : function() {
    },
    minimize : function() {
    },
    restore : function() {
    },
    getVersion : function() {
    },
    applicationEvent : "//This Property gets an callback",
    versionEvent : "//This Property gets an callback"
};
var appSwitcher = {
    visibility : ""
};
var backButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageUp : "",
    imageDown : "",
    visibility : ""
};
var backlight = {
    on : function() {
    },
    off : function() {
    },
    getBacklightSettings : function() {
    },
    intensity : "",
    backlightSettingsEvent : "//This Property gets an callback"
};
var bottomCommandArea = {
    visibility : "",
    height : "",
    color : "",
    image : ""
};
var cardReader = {
    open : function() {
    },
    close : function() {
    },
    pinTimeout : "",
    pinEntry : "",
    panData : "",
    autoTab : "",
    autoEnter : "",
    moduleName : "",
    readEvent : "//This Property gets an callback"
};
var comm = {
    open : function() {
    },
    close : function() {
    },
    baudRate : "",
    dataBits : "",
    stopBits : "",
    parity : "",
    handshake : "",
    port : "",
    chars : "",
    endChar : "",
    time : "",
    writeBytes : "",
    writeString : "",
    writeFile : "",
    autoEnter : "",
    autoTab : "",
    commEvent : "//This Property gets an callback"
};
var device = {
    suspend : function() {
    },
    calibrate : function() {
    },
	powerOff : function(){
	}
};
var emmlProfile = {
    name : "",
    importProfile : "",
    clear : "",
    apply : ""
};
var forwardButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageUp : "",
    imageDown : "",
    visibility : ""
};
var gesture = {
    create : function() {
    },
    'delete' : function() {
    },
    type : "",
    id : "",
    preset : "",
    diagnostics : "",
    startX : "",
    startY : "",
    endX : "",
    endY : "",
    skew : "",
    deviation : "",
    regionWidth : "",
    centerX : "",
    centerY : "",
    radius : "",
    start : "",
    end : "",
    tolerance : "",
    sensitivity : "",
    delay : "",
    interval : "",
    detected : "//This Property gets an callback"
};
var goButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageUp : "",
    imageDown : "",
    visibility : ""
};
var homeButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageUp : "",
    imageDown : "",
    visibility : ""
};
var hourglass = {
    visibility : "",
    left : "",
    top : ""
};
var imager = {
    enable : function() {
    },
    disable : function() {
    },
    capture : function() {
    },
    enumerate : function() {
    },
    enabled : "",
    left : "",
    top : "",
    width : "",
    height : "",
    lamp : "",
    aim : "",
    username : "",
    password : "",
    sound : "",
    destination : "",
    deviceId : "",
    imagerEvent : "//This Property gets an callback",
    imagerEnumEvent : "//This Property gets an callback"
};
var ioAnalog = {
    invokeGeneralVoltage1 : function() {
    },
    invokeGeneralVoltage2 : function() {
    },
    invokeBatteryVoltage : function() {
    },
    invokeBatteryCurrent : function() {
    },
    invokeAmbientTemperature : function() {
    },
    invokeHeaterTemperature : function() {
    },
    generalVoltage1 : "",
    generalVoltage1MaximumThreshold : "",
    generalVoltage1MinimumThreshold : "",
    generalVoltage1Debounce : "",
    generalVoltage2 : "",
    generalVoltage2MaximumThreshold : "",
    generalVoltage2MinimumThreshold : "",
    generalVoltage2Debounce : "",
    BatteryVoltage : "",
    BatteryVoltageMaximumThreshold : "",
    BatteryVoltageMinimumThreshold : "",
    BatteryVoltageDebounce : "",
    BatteryCurrent : "",
    BatteryCurrentMaximumThreshold : "",
    BatteryCurrentMinimumThreshold : "",
    BatteryCurrentDebounce : "",
    AmbientTemperature : "",
    AmbientTemperatureMaximumThreshold : "",
    AmbientTemperatureMinimumThreshold : "",
    AmbientTemperatureDebounce : "",
    HeaterTemperature : "",
    HeaterTemperatureMaximumThreshold : "",
    HeaterTemperatureMinimumThreshold : "",
    HeaterTemperatureDebounce : "",
    portEvent : "//This Property gets an callback"
};
var ioDigital = {
    InvokeDigital1 : function() {
    },
    InvokeDigital2 : function() {
    },
    InvokeDigital3 : function() {
    },
    InvokeDigital4 : function() {
    },
    InvokeDigital5 : function() {
    },
    InvokeDigital6 : function() {
    },
    InvokeDigital7 : function() {
    },
    InvokeDigital8 : function() {
    },
    input1 : "",
    outputState1 : "",
    outputWarmBootState1 : "",
    outputColdBootState1 : "",
    input2 : "",
    outputState2 : "",
    outputWarmBootState2 : "",
    outputColdBootState2 : "",
    input3 : "",
    outputState3 : "",
    outputWarmBootState3 : "",
    outputColdBootState3 : "",
    input4 : "",
    outputState4 : "",
    outputWarmBootState4 : "",
    outputColdBootState4 : "",
    input5 : "",
    outputState5 : "",
    outputWarmBootState5 : "",
    outputColdBootState5 : "",
    input6 : "",
    outputState6 : "",
    outputWarmBootState6 : "",
    outputColdBootState6 : "",
    input7 : "",
    outputState7 : "",
    outputWarmBootState7 : "",
    outputColdBootState7 : "",
    input8 : "",
    outputState8 : "",
    outputWarmBootState8 : "",
    outputColdBootState8 : "",
    PortEvent : "//This Property gets an callback"
};
var ioSystem = {
    invokeIgnition : function() {
    },
    invokePowerSource : function() {
    },
    ignition : "",
    powerSource : "",
    portEvent : "//This Property gets an callback"
};

var keylight = {
    on : function() {
    },
    off : function() {
    },
    intensity : ""
};
var keyState = {
    right : "",
    left : "",
    top : "",
    height : "",
    width : "",
    visibility : ""
};
var Memory = {
    getMemoryStats : function() {
    },
    lowMemThreshold : "",
    memoryEvent : "//This Property gets an callback"
};
var minimizeButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageUp : "",
    imageDown : "",
    visibility : ""
};
var network = {
    start : function() {
    },
    stop : function() {
    },
    disconnectWan : function() {
    },
    host : "",
    port : "",
    networkPollInterval : "",
    connectionTimeout : "",
    connectWan : "",
    networkEvent : "//This Property gets an callback",
    wanStatusEvent : "//This Property gets an callback"
};
var notification = {
    enumerate : function() {
    },
    setLEDOnDuration : "",
    setLEDOffDuration : "",
    setLEDNumberOfCycles : "",
    setBeeperFrequency : "",
    setBeeperVolume : "",
    setBeeperDuration : "",
    setVibrateDuration : "",
    stateOn : "",
    stateOff : "",
    stateCycle : "",
    enumNotificationsEvent : "//This Property gets an callback"
};
var zoomInPageButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageup : "",
    imagedown : "",
    visibility : ""
};
var zoomOutPageButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageup : "",
    imagedown : "",
    visibility : ""
};
var powerOn = {
    powerOnEvent : "//This Property gets an callback"
};
var quitButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageUp : "",
    imageDown : "",
    visibility : ""
};
var reboot = {
    bootType : ""
};
var registry = {
    'delete' : function() {
    },
    hive : "",
    key : "",
    setting : "",
    type : "",
    persistent : "",
    value : ""
};
var reloadButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageUp : "",
    imageDown : "",
    visibility : ""
};
var rsm = {
    markForRetrievalModelNumber : function() {
    },
    markForRetrievalSerialNumber : function() {
    },
    markForRetrievalDateOfManufacture : function() {
    },
    markForRetrievalDateOfService : function() {
    },
    markForRetrievalBluetoothAddress : function() {
    },
    markForRetrievalFirmwareVersion : function() {
    },
    markForRetrievalDeviceClass : function() {
    },
    markForRetrievalBatteryStatus : function() {
    },
    markForRetrievalBatteryCapacity : function() {
    },
    markForRetrievalBatteryId : function() {
    },
    markForRetrievalBluetoothAuthentication : function() {
    },
    markForRetrievalBluetoothEncryption : function() {
    },
    markForRetrievalBluetoothPinCode : function() {
    },
    markForRetrievalBluetoothPinCodeType : function() {
    },
    markForRetrievalBluetoothReconnectAttempts : function() {
    },
    markForRetrievalBluetoothBeepOnReconnectAttempt : function() {
    },
    markForRetrievalBluetoothHidAutoReconnect : function() {
    },
    markForRetrievalBluetoothFriendlyName : function() {
    },
    markForRetrievalBluetoothInquiryMode : function() {
    },
    markForRetrievalBluetoothAutoReconnect : function() {
    },
    markForRetrievalForceSavePairingBarcode : function() {
    },
    markForRetrievalLowBatteryIndication : function() {
    },
    markForRetrievalLowBatteryIndicationCycle : function() {
    },
    markForRetrievalScanLineWidth : function() {
    },
    markForRetrievalGoodScansDelay : function() {
    },
    markForRetrievalDecodeFeedback : function() {
    },
    markForRetrievalIgnoreCode128Usps : function() {
    },
    markForRetrievalScanTriggerWakeup : function() {
    },
    markForRetrievalMems : function() {
    },
    markForRetrievalProximityEnable : function() {
    },
    markForRetrievalProximityContinuous : function() {
    },
    markForRetrievalProximityDistance : function() {
    },
    markForRetrievalPagingEnable : function() {
    },
    markForRetrievalPagingBeepSequence : function() {
    },
    bluetoothDisconnect : function() {
    },
    bluetoothUnpair : function() {
    },
    bluetoothAuthentication : "",
    bluetoothEncryption : "",
    bluetoothPinCode : "",
    bluetoothPinCodeType : "",
    bluetoothReconnectAttempts : "",
    bluetoothBeepOnReconnectAttempt : "",
    bluetoothHidAutoReconnect : "",
    bluetoothFriendlyName : "",
    bluetoothInquiryMode : "",
    bluetoothAutoReconnect : "",
    forceSavePairingBarcode : "",
    lowBatteryIndication : "",
    lowBatteryIndicationCycle : "",
    scanLineWidth : "",
    goodScansDelay : "",
    decodeFeedback : "",
    ignoreCode128Usps : "",
    scanTriggerWakeup : "",
    mems : "",
    proximityEnable : "",
    proximityContinuous : "",
    proximityDistance : "",
    pagingEnable : "",
    pagingBeepSequence : "",
    pagingActivate : "",
    rsmGetEvent : "//This Property gets an callback"
};

var signal = (function() {
    var _signal = signal;
    var obj = {};
    
    var visibility = '';
    Object.defineProperty(obj, 'visibility', {
        get : function(){ return visibility; },  
        set : function(value){ 
            visibility = value;
            
            if(value.toLowerCase() == 'visible'){
                asl.prv.signalWasVisible = true;
            }else{
                asl.prv.signalWasVisible = false;
            }

            _signal.visibility = visibility;
        },  
        enumerable : true,  
        configurable : true
    });

    var left = '';
    Object.defineProperty(obj, 'left', {
        get : function(){ return left; },  
        set : function(value){ 
            left = value;
            _signal.left = left;
        },  
        enumerable : true,  
        configurable : true
    });

    var top = '';
    Object.defineProperty(obj, 'top', {
        get : function(){ return top; },  
        set : function(value){ 
            top = value;
            _signal.top = top;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var layout = '';
    Object.defineProperty(obj, 'layout', {
        get : function(){ return layout; },  
        set : function(value){ 
            layout = value;
            _signal.layout = layout;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var color = '';
    Object.defineProperty(obj, 'color', {
        get : function(){ return color; },  
        set : function(value){ 
            color = value;
            _signal.color = color;  
        },  
        enumerable : true,  
        configurable : true
    });
    
    var signalEvent = '';
    Object.defineProperty(obj, 'signalEvent', {
        get : function(){ return signalEvent; },  
        set : function(value){ 
            signalEvent = value.slice(0, value.indexOf('('));
        },  
        enumerable : true,  
        configurable : true
    });
    
    return obj;
})();

var sip = {
    manual : function() {
    },
    automatic : function() {
    },
    left : "",
    top : ""
};
var sipButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageUp : "",
    imageDown : "",
    visibility : ""
};
var sntp = {
    serverIp : ""
};
var stopButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageUp : "",
    imageDown : "",
    visibility : ""
};
var stylus = {
    enable : function() {
    },
    disable : function() {
    }
};
var telemetry = {
    invoke : function() {
    },
    queryFrequency : "",
    enabled : "",
    disabled : "",
    telemetryDataEvent : "//This Property gets an callback",
    telemetryArrayEvent : "//This Property gets an callback"
};
var timer = {
    start : function() {
    },
    stop : function() {
    },
    interval : "",
    timeout : "//This Property gets an callback"
};
var topCommandArea = {
    visibility : "",
    height : "",
    color : "",
    image : ""
};
var volume = {
    setVolume : ""
};
var zoom = {
    text : "",
    page : ""
};
var zoomTextButton = {
    left : "",
    top : "",
    height : "",
    width : "",
    imageUp : "",
    imageDown : "",
    visibility : ""
};

/**
 * NPAPI Objects
 */
/*************** Scanner Methods ****************/
var scanner = (function() {
    var _scanner = scanner;
    var _changedProperties = {};

    var obj = {
        /**
         * Enables the default scanner if no scanner is currently enabled.
         */
        enable : function() {
            asl.prv.scannerWasEnabled = true;
            asl.prv.message(asl.msgs.types.npapi, {
                object : 'scanner',
                method : 'enable'
            });

            _scanner.enable();
        },
        /**
         * Disables the currently enabled scanner. This reverts the scanner to its default state and flushes any current decoder settings.
         */
        disable : function() {
            asl.prv.scannerWasEnabled = false;

            asl.prv.message(asl.msgs.types.npapi, {
                object : 'scanner',
                method : 'disable'
            });

            _scanner.disable();
        },
        /**
         * Return a list of scanners present on the device via EnumScannerEvent. This tag will be actioned immediately and should be called via JavaScript.
         */
        enumerate : function() {
            _scanner.enumerate();
        },
        /**
         * Performs a soft trigger start. If the scan does not result in a decode it is necessary to perform a soft stop before another soft start.
         */
        start : function() {
            _scanner.start();
        },
        /**
         * Performs a soft trigger stop
         */
        stop : function() {
            _scanner.stop();
        },
        /**
         * @param evt {String} event name
         * @description return an array with the properties of the event response object
         * @return array
         */
        getEventResponseProperties : function(evt) {
            switch(evt) {
                case 'decodeEvent':
                    return ['data', 'source', 'type', 'time', 'length', 'event'];
                case 'bluetoothStatusEvent':
                    return ['status'];
                case 'enumScannerEvent':
                    return ['scannerArray'];
            }
        },
        getChangedProperties : function() {
            return _changedProperties;
        }
    };

    var allDecoders = '';
    Object.defineProperty(obj, 'allDecoders', {
        get : function() {
             return allDecoders; 
        },
        set : function(value){ 
            allDecoders = value;
            _scanner.allDecoders = _changedProperties.allDecoders = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var ausPostal = '';
    Object.defineProperty(obj, 'ausPostal', {
        get : function() {
             return ausPostal; 
        },
        set : function(value){ 
            ausPostal = value;
            _scanner.ausPostal = _changedProperties.ausPostal = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var aztec = '';
    Object.defineProperty(obj, 'aztec', {
        get : function() {
             return aztec; 
        },
        set : function(value){ 
            aztec = value;
            _scanner.aztec = _changedProperties.aztec = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var canPostal = '';
    Object.defineProperty(obj, 'canPostal', {
        get : function() {
             return canPostal; 
        },
        set : function(value){ 
            canPostal = value;
            _scanner.canPostal = _changedProperties.canPostal = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var chinese2of5 = '';
    Object.defineProperty(obj, 'chinese2of5', {
        get : function() {
             return chinese2of5; 
        },
        set : function(value){ 
            chinese2of5 = value;
            _scanner.chinese2of5 = _changedProperties.chinese2of5 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var codabar = '';
    Object.defineProperty(obj, 'codabar', {
        get : function() {
             return codabar; 
        },
        set : function(value){ 
            codabar = value;
            _scanner.codabar = _changedProperties.codabar = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var codabarClsiEditing = '';
    Object.defineProperty(obj, 'codabarClsiEditing', {
        get : function() {
             return codabarClsiEditing; 
        },
        set : function(value){ 
            codabarClsiEditing = value;
            _scanner.codabarClsiEditing = _changedProperties.codabarClsiEditing = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var codabarMaxLength = '';
    Object.defineProperty(obj, 'codabarMaxLength', {
        get : function() {
             return codabarMaxLength; 
        },
        set : function(value){ 
            codabarMaxLength = value;
            _scanner.codabarMaxLength = _changedProperties.codabarMaxLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var codabarMinLength = '';
    Object.defineProperty(obj, 'codabarMinLength', {
        get : function() {
             return codabarMinLength; 
        },
        set : function(value){ 
            codabarMinLength = value;
            _scanner.codabarMinLength = _changedProperties.codabarMinLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var codabarNotisEditing = '';
    Object.defineProperty(obj, 'codabarNotisEditing', {
        get : function() {
             return codabarNotisEditing; 
        },
        set : function(value){ 
            codabarNotisEditing = value;
            _scanner.codabarNotisEditing = _changedProperties.codabarNotisEditing = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var codabarRedundancy = '';
    Object.defineProperty(obj, 'codabarRedundancy', {
        get : function() {
             return codabarRedundancy; 
        },
        set : function(value){ 
            codabarRedundancy = value;
            _scanner.codabarRedundancy = _changedProperties.codabarRedundancy = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code11 = '';
    Object.defineProperty(obj, 'code11', {
        get : function() {
             return code11; 
        },
        set : function(value){ 
            code11 = value;
            _scanner.code11 = _changedProperties.code11 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code11checkDigitCount = '';
    Object.defineProperty(obj, 'code11checkDigitCount', {
        get : function() {
             return code11checkDigitCount; 
        },
        set : function(value){ 
            code11checkDigitCount = value;
            _scanner.code11checkDigitCount = _changedProperties.code11checkDigitCount = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code11maxLength = '';
    Object.defineProperty(obj, 'code11maxLength', {
        get : function() {
             return code11maxLength; 
        },
        set : function(value){ 
            code11maxLength = value;
            _scanner.code11maxLength = _changedProperties.code11maxLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code11minLength = '';
    Object.defineProperty(obj, 'code11minLength', {
        get : function() {
             return code11minLength; 
        },
        set : function(value){ 
            code11minLength = value;
            _scanner.code11minLength = _changedProperties.code11minLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code11redundancy = '';
    Object.defineProperty(obj, 'code11redundancy', {
        get : function() {
             return code11redundancy; 
        },
        set : function(value){ 
            code11redundancy = value;
            _scanner.code11redundancy = _changedProperties.code11redundancy = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code11reportCheckDigit = '';
    Object.defineProperty(obj, 'code11reportCheckDigit', {
        get : function() {
             return code11reportCheckDigit; 
        },
        set : function(value){ 
            code11reportCheckDigit = value;
            _scanner.code11reportCheckDigit = _changedProperties.code11reportCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code128 = '';
    Object.defineProperty(obj, 'code128', {
        get : function() {
             return code128; 
        },
        set : function(value){ 
            code128 = value;
            _scanner.code128 = _changedProperties.code128 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code128checkIsBtTable = '';
    Object.defineProperty(obj, 'code128checkIsBtTable', {
        get : function() {
             return code128checkIsBtTable; 
        },
        set : function(value){ 
            code128checkIsBtTable = value;
            _scanner.code128checkIsBtTable = _changedProperties.code128checkIsBtTable = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code128Ean128 = '';
    Object.defineProperty(obj, 'code128Ean128', {
        get : function() {
             return code128Ean128; 
        },
        set : function(value){ 
            code128Ean128 = value;
            _scanner.code128Ean128 = _changedProperties.code128Ean128 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code128isBt128 = '';
    Object.defineProperty(obj, 'code128isBt128', {
        get : function() {
             return code128isBt128; 
        },
        set : function(value){ 
            code128isBt128 = value;
            _scanner.code128isBt128 = _changedProperties.code128isBt128 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code128isBt128ConcatMode = '';
    Object.defineProperty(obj, 'code128isBt128ConcatMode', {
        get : function() {
             return code128isBt128ConcatMode; 
        },
        set : function(value){ 
            code128isBt128ConcatMode = value;
            _scanner.code128isBt128ConcatMode = _changedProperties.code128isBt128ConcatMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code128maxLength = '';
    Object.defineProperty(obj, 'code128maxLength', {
        get : function() {
             return code128maxLength; 
        },
        set : function(value){ 
            code128maxLength = value;
            _scanner.code128maxLength = _changedProperties.code128maxLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code128minLength = '';
    Object.defineProperty(obj, 'code128minLength', {
        get : function() {
             return code128minLength; 
        },
        set : function(value){ 
            code128minLength = value;
            _scanner.code128minLength = _changedProperties.code128minLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code128other128 = '';
    Object.defineProperty(obj, 'code128other128', {
        get : function() {
             return code128other128; 
        },
        set : function(value){ 
            code128other128 = value;
            _scanner.code128other128 = _changedProperties.code128other128 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code128redundancy = '';
    Object.defineProperty(obj, 'code128redundancy', {
        get : function() {
             return code128redundancy; 
        },
        set : function(value){ 
            code128redundancy = value;
            _scanner.code128redundancy = _changedProperties.code128redundancy = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code128securityLevel = '';
    Object.defineProperty(obj, 'code128securityLevel', {
        get : function() {
             return code128securityLevel; 
        },
        set : function(value){ 
            code128securityLevel = value;
            _scanner.code128securityLevel = _changedProperties.code128securityLevel = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code39 = '';
    Object.defineProperty(obj, 'code39', {
        get : function() {
             return code39; 
        },
        set : function(value){ 
            code39 = value;
            _scanner.code39 = _changedProperties.code39 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code39code32prefix = '';
    Object.defineProperty(obj, 'code39code32prefix', {
        get : function() {
             return code39code32prefix; 
        },
        set : function(value){ 
            code39code32prefix = value;
            _scanner.code39code32prefix = _changedProperties.code39code32prefix = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code39concatenation = '';
    Object.defineProperty(obj, 'code39concatenation', {
        get : function() {
             return code39concatenation; 
        },
        set : function(value){ 
            code39concatenation = value;
            _scanner.code39concatenation = _changedProperties.code39concatenation = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code39convertToCode32 = '';
    Object.defineProperty(obj, 'code39convertToCode32', {
        get : function() {
             return code39convertToCode32; 
        },
        set : function(value){ 
            code39convertToCode32 = value;
            _scanner.code39convertToCode32 = _changedProperties.code39convertToCode32 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code39FullAscii = '';
    Object.defineProperty(obj, 'code39FullAscii', {
        get : function() {
             return code39FullAscii; 
        },
        set : function(value){ 
            code39FullAscii = value;
            _scanner.code39FullAscii = _changedProperties.code39FullAscii = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code39maxLength = '';
    Object.defineProperty(obj, 'code39maxLength', {
        get : function() {
             return code39maxLength; 
        },
        set : function(value){ 
            code39maxLength = value;
            _scanner.code39maxLength = _changedProperties.code39maxLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code39minLength = '';
    Object.defineProperty(obj, 'code39minLength', {
        get : function() {
             return code39minLength; 
        },
        set : function(value){ 
            code39minLength = value;
            _scanner.code39minLength = _changedProperties.code39minLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code39redundancy = '';
    Object.defineProperty(obj, 'code39redundancy', {
        get : function() {
             return code39redundancy; 
        },
        set : function(value){ 
            code39redundancy = value;
            _scanner.code39redundancy = _changedProperties.code39redundancy = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code39reportCheckDigit = '';
    Object.defineProperty(obj, 'code39reportCheckDigit', {
        get : function() {
             return code39reportCheckDigit; 
        },
        set : function(value){ 
            code39reportCheckDigit = value;
            _scanner.code39reportCheckDigit = _changedProperties.code39reportCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code39securityLevel = '';
    Object.defineProperty(obj, 'code39securityLevel', {
        get : function() {
             return code39securityLevel; 
        },
        set : function(value){ 
            code39securityLevel = value;
            _scanner.code39securityLevel = _changedProperties.code39securityLevel = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code39verifyCheckDigit = '';
    Object.defineProperty(obj, 'code39verifyCheckDigit', {
        get : function() {
             return code39verifyCheckDigit; 
        },
        set : function(value){ 
            code39verifyCheckDigit = value;
            _scanner.code39verifyCheckDigit = _changedProperties.code39verifyCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code93 = '';
    Object.defineProperty(obj, 'code93', {
        get : function() {
             return code93; 
        },
        set : function(value){ 
            code93 = value;
            _scanner.code93 = _changedProperties.code93 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code93maxLength = '';
    Object.defineProperty(obj, 'code93maxLength', {
        get : function() {
             return code93maxLength; 
        },
        set : function(value){ 
            code93maxLength = value;
            _scanner.code93maxLength = _changedProperties.code93maxLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code93minLength = '';
    Object.defineProperty(obj, 'code93minLength', {
        get : function() {
             return code93minLength; 
        },
        set : function(value){ 
            code93minLength = value;
            _scanner.code93minLength = _changedProperties.code93minLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var code93redundancy = '';
    Object.defineProperty(obj, 'code93redundancy', {
        get : function() {
             return code93redundancy; 
        },
        set : function(value){ 
            code93redundancy = value;
            _scanner.code93redundancy = _changedProperties.code93redundancy = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var compositeAbUccLinkMode = '';
    Object.defineProperty(obj, 'compositeAbUccLinkMode', {
        get : function() {
             return compositeAbUccLinkMode; 
        },
        set : function(value){ 
            compositeAbUccLinkMode = value;
            _scanner.compositeAbUccLinkMode = _changedProperties.compositeAbUccLinkMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var compositeAbUseUpcPreambleCheckDigitRules = '';
    Object.defineProperty(obj, 'compositeAbUseUpcPreambleCheckDigitRules', {
        get : function() {
             return compositeAbUseUpcPreambleCheckDigitRules; 
        },
        set : function(value){ 
            compositeAbUseUpcPreambleCheckDigitRules = value;
            _scanner.compositeAbUseUpcPreambleCheckDigitRules = _changedProperties.compositeAbUseUpcPreambleCheckDigitRules = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var compositeAb = '';
    Object.defineProperty(obj, 'compositeAb', {
        get : function() {
             return compositeAb; 
        },
        set : function(value){ 
            compositeAb = value;
            _scanner.compositeAb = _changedProperties.compositeAb = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var compositeC = '';
    Object.defineProperty(obj, 'compositeC', {
        get : function() {
             return compositeC; 
        },
        set : function(value){ 
            compositeC = value;
            _scanner.compositeC = _changedProperties.compositeC = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var d2of5 = '';
    Object.defineProperty(obj, 'd2of5', {
        get : function() {
             return d2of5; 
        },
        set : function(value){ 
            d2of5 = value;
            _scanner.d2of5 = _changedProperties.d2of5 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var d2of5maxLength = '';
    Object.defineProperty(obj, 'd2of5maxLength', {
        get : function() {
             return d2of5maxLength; 
        },
        set : function(value){ 
            d2of5maxLength = value;
            _scanner.d2of5maxLength = _changedProperties.d2of5maxLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var d2of5minLength = '';
    Object.defineProperty(obj, 'd2of5minLength', {
        get : function() {
             return d2of5minLength; 
        },
        set : function(value){ 
            d2of5minLength = value;
            _scanner.d2of5minLength = _changedProperties.d2of5minLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var d2of5redundancy = '';
    Object.defineProperty(obj, 'd2of5redundancy', {
        get : function() {
             return d2of5redundancy; 
        },
        set : function(value){ 
            d2of5redundancy = value;
            _scanner.d2of5redundancy = _changedProperties.d2of5redundancy = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var dataMatrix = '';
    Object.defineProperty(obj, 'dataMatrix', {
        get : function() {
             return dataMatrix; 
        },
        set : function(value){ 
            dataMatrix = value;
            _scanner.dataMatrix = _changedProperties.dataMatrix = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var dutchPostal = '';
    Object.defineProperty(obj, 'dutchPostal', {
        get : function() {
             return dutchPostal; 
        },
        set : function(value){ 
            dutchPostal = value;
            _scanner.dutchPostal = _changedProperties.dutchPostal = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var ean13 = '';
    Object.defineProperty(obj, 'ean13', {
        get : function() {
             return ean13; 
        },
        set : function(value){ 
            ean13 = value;
            _scanner.ean13 = _changedProperties.ean13 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var ean8 = '';
    Object.defineProperty(obj, 'ean8', {
        get : function() {
             return ean8; 
        },
        set : function(value){ 
            ean8 = value;
            _scanner.ean8 = _changedProperties.ean8 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var ean8convertToEan13 = '';
    Object.defineProperty(obj, 'ean8convertToEan13', {
        get : function() {
             return ean8convertToEan13; 
        },
        set : function(value){ 
            ean8convertToEan13 = value;
            _scanner.ean8convertToEan13 = _changedProperties.ean8convertToEan13 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var i2of5 = '';
    Object.defineProperty(obj, 'i2of5', {
        get : function() {
             return i2of5; 
        },
        set : function(value){ 
            i2of5 = value;
            _scanner.i2of5 = _changedProperties.i2of5 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var i2of5convertToEan13 = '';
    Object.defineProperty(obj, 'i2of5convertToEan13', {
        get : function() {
             return i2of5convertToEan13; 
        },
        set : function(value){ 
            i2of5convertToEan13 = value;
            _scanner.i2of5convertToEan13 = _changedProperties.i2of5convertToEan13 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var i2of5maxLength = '';
    Object.defineProperty(obj, 'i2of5maxLength', {
        get : function() {
             return i2of5maxLength; 
        },
        set : function(value){ 
            i2of5maxLength = value;
            _scanner.i2of5maxLength = _changedProperties.i2of5maxLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var i2of5minLength = '';
    Object.defineProperty(obj, 'i2of5minLength', {
        get : function() {
             return i2of5minLength; 
        },
        set : function(value){ 
            i2of5minLength = value;
            _scanner.i2of5minLength = _changedProperties.i2of5minLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var i2of5redundancy = '';
    Object.defineProperty(obj, 'i2of5redundancy', {
        get : function() {
             return i2of5redundancy; 
        },
        set : function(value){ 
            i2of5redundancy = value;
            _scanner.i2of5redundancy = _changedProperties.i2of5redundancy = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var i2of5reportCheckDigit = '';
    Object.defineProperty(obj, 'i2of5reportCheckDigit', {
        get : function() {
             return i2of5reportCheckDigit; 
        },
        set : function(value){ 
            i2of5reportCheckDigit = value;
            _scanner.i2of5reportCheckDigit = _changedProperties.i2of5reportCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var i2Of5verifyCheckDigit = '';
    Object.defineProperty(obj, 'i2Of5verifyCheckDigit', {
        get : function() {
             return i2Of5verifyCheckDigit; 
        },
        set : function(value){ 
            i2Of5verifyCheckDigit = value;
            _scanner.i2Of5verifyCheckDigit = _changedProperties.i2Of5verifyCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var japPostal = '';
    Object.defineProperty(obj, 'japPostal', {
        get : function() {
             return japPostal; 
        },
        set : function(value){ 
            japPostal = value;
            _scanner.japPostal = _changedProperties.japPostal = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var korean3of5maxLength = '';
    Object.defineProperty(obj, 'korean3of5maxLength', {
        get : function() {
             return korean3of5maxLength; 
        },
        set : function(value){ 
            korean3of5maxLength = value;
            _scanner.korean3of5maxLength = _changedProperties.korean3of5maxLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var korean3of5minLength = '';
    Object.defineProperty(obj, 'korean3of5minLength', {
        get : function() {
             return korean3of5minLength; 
        },
        set : function(value){ 
            korean3of5minLength = value;
            _scanner.korean3of5minLength = _changedProperties.korean3of5minLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var korean3of5redundancy = '';
    Object.defineProperty(obj, 'korean3of5redundancy', {
        get : function() {
             return korean3of5redundancy; 
        },
        set : function(value){ 
            korean3of5redundancy = value;
            _scanner.korean3of5redundancy = _changedProperties.korean3of5redundancy = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var korean3of5 = '';
    Object.defineProperty(obj, 'korean3of5', {
        get : function() {
             return korean3of5; 
        },
        set : function(value){ 
            korean3of5 = value;
            _scanner.korean3of5 = _changedProperties.korean3of5 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var macroMicroPdf = '';
    Object.defineProperty(obj, 'macroMicroPdf', {
        get : function() {
             return macroMicroPdf; 
        },
        set : function(value){ 
            macroMicroPdf = value;
            _scanner.macroMicroPdf = _changedProperties.macroMicroPdf = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var macroMicroPdfBufferLabels = '';
    Object.defineProperty(obj, 'macroMicroPdfBufferLabels', {
        get : function() {
             return macroMicroPdfBufferLabels; 
        },
        set : function(value){ 
            macroMicroPdfBufferLabels = value;
            _scanner.macroMicroPdfBufferLabels = _changedProperties.macroMicroPdfBufferLabels = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var macroMicroPdfConvertToMicroPdf = '';
    Object.defineProperty(obj, 'macroMicroPdfConvertToMicroPdf', {
        get : function() {
             return macroMicroPdfConvertToMicroPdf; 
        },
        set : function(value){ 
            macroMicroPdfConvertToMicroPdf = value;
            _scanner.macroMicroPdfConvertToMicroPdf = _changedProperties.macroMicroPdfConvertToMicroPdf = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var macroMicroPdfExclusive = '';
    Object.defineProperty(obj, 'macroMicroPdfExclusive', {
        get : function() {
             return macroMicroPdfExclusive; 
        },
        set : function(value){ 
            macroMicroPdfExclusive = value;
            _scanner.macroMicroPdfExclusive = _changedProperties.macroMicroPdfExclusive = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var macroMicroPdfReportAppendInfo = '';
    Object.defineProperty(obj, 'macroMicroPdfReportAppendInfo', {
        get : function() {
             return macroMicroPdfReportAppendInfo; 
        },
        set : function(value){ 
            macroMicroPdfReportAppendInfo = value;
            _scanner.macroMicroPdfReportAppendInfo = _changedProperties.macroMicroPdfReportAppendInfo = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var macroPdf = '';
    Object.defineProperty(obj, 'macroPdf', {
        get : function() {
             return macroPdf; 
        },
        set : function(value){ 
            macroPdf = value;
            _scanner.macroPdf = _changedProperties.macroPdf = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var macroPdfBufferLabels = '';
    Object.defineProperty(obj, 'macroPdfBufferLabels', {
        get : function() {
             return macroPdfBufferLabels; 
        },
        set : function(value){ 
            macroPdfBufferLabels = value;
            _scanner.macroPdfBufferLabels = _changedProperties.macroPdfBufferLabels = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var macroPdfConvertToPdf417 = '';
    Object.defineProperty(obj, 'macroPdfConvertToPdf417', {
        get : function() {
             return macroPdfConvertToPdf417; 
        },
        set : function(value){ 
            macroPdfConvertToPdf417 = value;
            _scanner.macroPdfConvertToPdf417 = _changedProperties.macroPdfConvertToPdf417 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var macroPdfExclusive = '';
    Object.defineProperty(obj, 'macroPdfExclusive', {
        get : function() {
             return macroPdfExclusive; 
        },
        set : function(value){ 
            macroPdfExclusive = value;
            _scanner.macroPdfExclusive = _changedProperties.macroPdfExclusive = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var matrix2of5 = '';
    Object.defineProperty(obj, 'matrix2of5', {
        get : function() {
             return matrix2of5; 
        },
        set : function(value){ 
            matrix2of5 = value;
            _scanner.matrix2of5 = _changedProperties.matrix2of5 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var matrix2of5maxLength = '';
    Object.defineProperty(obj, 'matrix2of5maxLength', {
        get : function() {
             return matrix2of5maxLength; 
        },
        set : function(value){ 
            matrix2of5maxLength = value;
            _scanner.matrix2of5maxLength = _changedProperties.matrix2of5maxLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var matrix2of5minLength = '';
    Object.defineProperty(obj, 'matrix2of5minLength', {
        get : function() {
             return matrix2of5minLength; 
        },
        set : function(value){ 
            matrix2of5minLength = value;
            _scanner.matrix2of5minLength = _changedProperties.matrix2of5minLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var matrix2of5reportCheckDigit = '';
    Object.defineProperty(obj, 'matrix2of5reportCheckDigit', {
        get : function() {
             return matrix2of5reportCheckDigit; 
        },
        set : function(value){ 
            matrix2of5reportCheckDigit = value;
            _scanner.matrix2of5reportCheckDigit = _changedProperties.matrix2of5reportCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var matrix2of5verifyCheckDigit = '';
    Object.defineProperty(obj, 'matrix2of5verifyCheckDigit', {
        get : function() {
             return matrix2of5verifyCheckDigit; 
        },
        set : function(value){ 
            matrix2of5verifyCheckDigit = value;
            _scanner.matrix2of5verifyCheckDigit = _changedProperties.matrix2of5verifyCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var maxiCode = '';
    Object.defineProperty(obj, 'maxiCode', {
        get : function() {
             return maxiCode; 
        },
        set : function(value){ 
            maxiCode = value;
            _scanner.maxiCode = _changedProperties.maxiCode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var microPdf = '';
    Object.defineProperty(obj, 'microPdf', {
        get : function() {
             return microPdf; 
        },
        set : function(value){ 
            microPdf = value;
            _scanner.microPdf = _changedProperties.microPdf = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var microQr = '';
    Object.defineProperty(obj, 'microQr', {
        get : function() {
             return microQr; 
        },
        set : function(value){ 
            microQr = value;
            _scanner.microQr = _changedProperties.microQr = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var msi = '';
    Object.defineProperty(obj, 'msi', {
        get : function() {
             return msi; 
        },
        set : function(value){ 
            msi = value;
            _scanner.msi = _changedProperties.msi = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var msiCheckDigits = '';
    Object.defineProperty(obj, 'msiCheckDigits', {
        get : function() {
             return msiCheckDigits; 
        },
        set : function(value){ 
            msiCheckDigits = value;
            _scanner.msiCheckDigits = _changedProperties.msiCheckDigits = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var msiCheckDigitScheme = '';
    Object.defineProperty(obj, 'msiCheckDigitScheme', {
        get : function() {
             return msiCheckDigitScheme; 
        },
        set : function(value){ 
            msiCheckDigitScheme = value;
            _scanner.msiCheckDigitScheme = _changedProperties.msiCheckDigitScheme = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var msiMaxlength = '';
    Object.defineProperty(obj, 'msiMaxlength', {
        get : function() {
             return msiMaxlength; 
        },
        set : function(value){ 
            msiMaxlength = value;
            _scanner.msiMaxlength = _changedProperties.msiMaxlength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var msiMinLength = '';
    Object.defineProperty(obj, 'msiMinLength', {
        get : function() {
             return msiMinLength; 
        },
        set : function(value){ 
            msiMinLength = value;
            _scanner.msiMinLength = _changedProperties.msiMinLength = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var msiRedundancy = '';
    Object.defineProperty(obj, 'msiRedundancy', {
        get : function() {
             return msiRedundancy; 
        },
        set : function(value){ 
            msiRedundancy = value;
            _scanner.msiRedundancy = _changedProperties.msiRedundancy = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var msiReportCheckDigit = '';
    Object.defineProperty(obj, 'msiReportCheckDigit', {
        get : function() {
             return msiReportCheckDigit; 
        },
        set : function(value){ 
            msiReportCheckDigit = value;
            _scanner.msiReportCheckDigit = _changedProperties.msiReportCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var pdf417 = '';
    Object.defineProperty(obj, 'pdf417', {
        get : function() {
             return pdf417; 
        },
        set : function(value){ 
            pdf417 = value;
            _scanner.pdf417 = _changedProperties.pdf417 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var qrCode = '';
    Object.defineProperty(obj, 'qrCode', {
        get : function() {
             return qrCode; 
        },
        set : function(value){ 
            qrCode = value;
            _scanner.qrCode = _changedProperties.qrCode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var rss14 = '';
    Object.defineProperty(obj, 'rss14', {
        get : function() {
             return rss14; 
        },
        set : function(value){ 
            rss14 = value;
            _scanner.rss14 = _changedProperties.rss14 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var rssExp = '';
    Object.defineProperty(obj, 'rssExp', {
        get : function() {
             return rssExp; 
        },
        set : function(value){ 
            rssExp = value;
            _scanner.rssExp = _changedProperties.rssExp = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var rssLim = '';
    Object.defineProperty(obj, 'rssLim', {
        get : function() {
             return rssLim; 
        },
        set : function(value){ 
            rssLim = value;
            _scanner.rssLim = _changedProperties.rssLim = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var enabled = 'SCN1';
    Object.defineProperty(obj, 'enabled', {
        get : function() {
             return enabled; 
        },
        set : function(value){ 
            enabled = value;
            _scanner.enabled = _changedProperties.enabled = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var autoEnter = 'Disabled';
    Object.defineProperty(obj, 'autoEnter', {
        get : function() {
             return autoEnter; 
        },
        set : function(value){ 
            autoEnter = value;
            _scanner.autoEnter = _changedProperties.autoEnter = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var autoTab = 'Disabled';
    Object.defineProperty(obj, 'autoTab', {
        get : function() {
             return autoTab; 
        },
        set : function(value){ 
            autoTab = value;
            _scanner.autoTab = _changedProperties.autoTab = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var linearSecurityLevel = '';
    Object.defineProperty(obj, 'linearSecurityLevel', {
        get : function() {
             return linearSecurityLevel; 
        },
        set : function(value){ 
            linearSecurityLevel = value;
            _scanner.linearSecurityLevel = _changedProperties.linearSecurityLevel = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var scanTimeout = '10000';
    Object.defineProperty(obj, 'scanTimeout', {
        get : function() {
             return scanTimeout; 
        },
        set : function(value){ 
            scanTimeout = value;
            _scanner.scanTimeout = _changedProperties.scanTimeout = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var rasterMode = '';
    Object.defineProperty(obj, 'rasterMode', {
        get : function() {
             return rasterMode; 
        },
        set : function(value){ 
            rasterMode = value;
            _scanner.rasterMode = _changedProperties.rasterMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var rasterHeight = '';
    Object.defineProperty(obj, 'rasterHeight', {
        get : function() {
             return rasterHeight; 
        },
        set : function(value){ 
            rasterHeight = value;
            _scanner.rasterHeight = _changedProperties.rasterHeight = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var aimType = '';
    Object.defineProperty(obj, 'aimType', {
        get : function() {
             return aimType; 
        },
        set : function(value){ 
            aimType = value;
            _scanner.aimType = _changedProperties.aimType = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var timedAimDuration = '';
    Object.defineProperty(obj, 'timedAimDuration', {
        get : function() {
             return timedAimDuration; 
        },
        set : function(value){ 
            timedAimDuration = value;
            _scanner.timedAimDuration = _changedProperties.timedAimDuration = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var sameSymbolTimeout = '2500';
    Object.defineProperty(obj, 'sameSymbolTimeout', {
        get : function() {
             return sameSymbolTimeout; 
        },
        set : function(value){ 
            sameSymbolTimeout = value;
            _scanner.sameSymbolTimeout = _changedProperties.sameSymbolTimeout = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var differentSymbolTimeout = '500';
    Object.defineProperty(obj, 'differentSymbolTimeout', {
        get : function() {
             return differentSymbolTimeout; 
        },
        set : function(value){ 
            differentSymbolTimeout = value;
            _scanner.differentSymbolTimeout = _changedProperties.differentSymbolTimeout = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var aimMode = '';
    Object.defineProperty(obj, 'aimMode', {
        get : function() {
             return aimMode; 
        },
        set : function(value){ 
            aimMode = value;
            _scanner.aimMode = _changedProperties.aimMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var picklistMode = '';
    Object.defineProperty(obj, 'picklistMode', {
        get : function() {
             return picklistMode; 
        },
        set : function(value){ 
            picklistMode = value;
            _scanner.picklistMode = _changedProperties.picklistMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var viewfinderMode = '';
    Object.defineProperty(obj, 'viewfinderMode', {
        get : function() {
             return viewfinderMode; 
        },
        set : function(value){ 
            viewfinderMode = value;
            _scanner.viewfinderMode = _changedProperties.viewfinderMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var viewfinderX = '';
    Object.defineProperty(obj, 'viewfinderX', {
        get : function() {
             return viewfinderX; 
        },
        set : function(value){ 
            viewfinderX = value;
            _scanner.viewfinderX = _changedProperties.viewfinderX = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var viewfinderY = '';
    Object.defineProperty(obj, 'viewfinderY', {
        get : function() {
             return viewfinderY; 
        },
        set : function(value){ 
            viewfinderY = value;
            _scanner.viewfinderY = _changedProperties.viewfinderY = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var viewfinderWidth = '';
    Object.defineProperty(obj, 'viewfinderWidth', {
        get : function() {
             return viewfinderWidth; 
        },
        set : function(value){ 
            viewfinderWidth = value;
            _scanner.viewfinderWidth = _changedProperties.viewfinderWidth = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var viewfinderHeight = '';
    Object.defineProperty(obj, 'viewfinderHeight', {
        get : function() {
             return viewfinderHeight; 
        },
        set : function(value){ 
            viewfinderHeight = value;
            _scanner.viewfinderHeight = _changedProperties.viewfinderHeight = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var viewfinderFeedback = '';
    Object.defineProperty(obj, 'viewfinderFeedback', {
        get : function() {
             return viewfinderFeedback; 
        },
        set : function(value){ 
            viewfinderFeedback = value;
            _scanner.viewfinderFeedback = _changedProperties.viewfinderFeedback = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var viewfinderFeedbackTime = '';
    Object.defineProperty(obj, 'viewfinderFeedbackTime', {
        get : function() {
             return viewfinderFeedbackTime; 
        },
        set : function(value){ 
            viewfinderFeedbackTime = value;
            _scanner.viewfinderFeedbackTime = _changedProperties.viewfinderFeedbackTime = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var focusMode = '';
    Object.defineProperty(obj, 'focusMode', {
        get : function() {
             return focusMode; 
        },
        set : function(value){ 
            focusMode = value;
            _scanner.focusMode = _changedProperties.focusMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var illuminationMode = '';
    Object.defineProperty(obj, 'illuminationMode', {
        get : function() {
             return illuminationMode; 
        },
        set : function(value){ 
            illuminationMode = value;
            _scanner.illuminationMode = _changedProperties.illuminationMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var dpmMode = '';
    Object.defineProperty(obj, 'dpmMode', {
        get : function() {
             return dpmMode; 
        },
        set : function(value){ 
            dpmMode = value;
            _scanner.dpmMode = _changedProperties.dpmMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var inverse1dMode = '';
    Object.defineProperty(obj, 'inverse1dMode', {
        get : function() {
             return inverse1dMode; 
        },
        set : function(value){ 
            inverse1dMode = value;
            _scanner.inverse1dMode = _changedProperties.inverse1dMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var poorQuality1dMode = '';
    Object.defineProperty(obj, 'poorQuality1dMode', {
        get : function() {
             return poorQuality1dMode; 
        },
        set : function(value){ 
            poorQuality1dMode = value;
            _scanner.poorQuality1dMode = _changedProperties.poorQuality1dMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var narrowBeam = '';
    Object.defineProperty(obj, 'narrowBeam', {
        get : function() {
             return narrowBeam; 
        },
        set : function(value){ 
            narrowBeam = value;
            _scanner.narrowBeam = _changedProperties.narrowBeam = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var dbpMode = '';
    Object.defineProperty(obj, 'dbpMode', {
        get : function() {
             return dbpMode; 
        },
        set : function(value){ 
            dbpMode = value;
            _scanner.dbpMode = _changedProperties.dbpMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var klasseEins = '';
    Object.defineProperty(obj, 'klasseEins', {
        get : function() {
             return klasseEins; 
        },
        set : function(value){ 
            klasseEins = value;
            _scanner.klasseEins = _changedProperties.klasseEins = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var adaptiveScanning = '';
    Object.defineProperty(obj, 'adaptiveScanning', {
        get : function() {
             return adaptiveScanning; 
        },
        set : function(value){ 
            adaptiveScanning = value;
            _scanner.adaptiveScanning = _changedProperties.adaptiveScanning = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var bidirectionalRedundancy = '';
    Object.defineProperty(obj, 'bidirectionalRedundancy', {
        get : function() {
             return bidirectionalRedundancy; 
        },
        set : function(value){ 
            bidirectionalRedundancy = value;
            _scanner.bidirectionalRedundancy = _changedProperties.bidirectionalRedundancy = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var connectionIdleTimeout = '';
    Object.defineProperty(obj, 'connectionIdleTimeout', {
        get : function() {
             return connectionIdleTimeout; 
        },
        set : function(value){ 
            connectionIdleTimeout = value;
            _scanner.connectionIdleTimeout = _changedProperties.connectionIdleTimeout = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var disconnectBtOnDisable = 'false';
    Object.defineProperty(obj, 'disconnectBtOnDisable', {
        get : function() {
             return disconnectBtOnDisable; 
        },
        set : function(value){ 
            disconnectBtOnDisable = value;
            _scanner.disconnectBtOnDisable = _changedProperties.disconnectBtOnDisable = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var signature = '';
    Object.defineProperty(obj, 'signature', {
        get : function() {
             return signature; 
        },
        set : function(value){ 
            signature = value;
            _scanner.signature = _changedProperties.signature = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var signatureImageHeight = '';
    Object.defineProperty(obj, 'signatureImageHeight', {
        get : function() {
             return signatureImageHeight; 
        },
        set : function(value){ 
            signatureImageHeight = value;
            _scanner.signatureImageHeight = _changedProperties.signatureImageHeight = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var signatureImageQuality = '';
    Object.defineProperty(obj, 'signatureImageQuality', {
        get : function() {
             return signatureImageQuality; 
        },
        set : function(value){ 
            signatureImageQuality = value;
            _scanner.signatureImageQuality = _changedProperties.signatureImageQuality = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var signatureImageSize = '';
    Object.defineProperty(obj, 'signatureImageSize', {
        get : function() {
             return signatureImageSize; 
        },
        set : function(value){ 
            signatureImageSize = value;
            _scanner.signatureImageSize = _changedProperties.signatureImageSize = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var signatureImageWidth = '';
    Object.defineProperty(obj, 'signatureImageWidth', {
        get : function() {
             return signatureImageWidth; 
        },
        set : function(value){ 
            signatureImageWidth = value;
            _scanner.signatureImageWidth = _changedProperties.signatureImageWidth = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var tlc39 = '';
    Object.defineProperty(obj, 'tlc39', {
        get : function() {
             return tlc39; 
        },
        set : function(value){ 
            tlc39 = value;
            _scanner.tlc39 = _changedProperties.tlc39 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var trioptic39 = '';
    Object.defineProperty(obj, 'trioptic39', {
        get : function() {
             return trioptic39; 
        },
        set : function(value){ 
            trioptic39 = value;
            _scanner.trioptic39 = _changedProperties.trioptic39 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var trioptic39redundancy = '';
    Object.defineProperty(obj, 'trioptic39redundancy', {
        get : function() {
             return trioptic39redundancy; 
        },
        set : function(value){ 
            trioptic39redundancy = value;
            _scanner.trioptic39redundancy = _changedProperties.trioptic39redundancy = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var ukPostal = '';
    Object.defineProperty(obj, 'ukPostal', {
        get : function() {
             return ukPostal; 
        },
        set : function(value){ 
            ukPostal = value;
            _scanner.ukPostal = _changedProperties.ukPostal = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var ukPostalreportCheckDigit = '';
    Object.defineProperty(obj, 'ukPostalreportCheckDigit', {
        get : function() {
             return ukPostalreportCheckDigit; 
        },
        set : function(value){ 
            ukPostalreportCheckDigit = value;
            _scanner.ukPostalreportCheckDigit = _changedProperties.ukPostalreportCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upca = '';
    Object.defineProperty(obj, 'upca', {
        get : function() {
             return upca; 
        },
        set : function(value){ 
            upca = value;
            _scanner.upca = _changedProperties.upca = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcaReportCheckDigit = '';
    Object.defineProperty(obj, 'upcaReportCheckDigit', {
        get : function() {
             return upcaReportCheckDigit; 
        },
        set : function(value){ 
            upcaReportCheckDigit = value;
            _scanner.upcaReportCheckDigit = _changedProperties.upcaReportCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcaPreamble = '';
    Object.defineProperty(obj, 'upcaPreamble', {
        get : function() {
             return upcaPreamble; 
        },
        set : function(value){ 
            upcaPreamble = value;
            _scanner.upcaPreamble = _changedProperties.upcaPreamble = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upce0 = '';
    Object.defineProperty(obj, 'upce0', {
        get : function() {
             return upce0; 
        },
        set : function(value){ 
            upce0 = value;
            _scanner.upce0 = _changedProperties.upce0 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upce0convertToUpca = '';
    Object.defineProperty(obj, 'upce0convertToUpca', {
        get : function() {
             return upce0convertToUpca; 
        },
        set : function(value){ 
            upce0convertToUpca = value;
            _scanner.upce0convertToUpca = _changedProperties.upce0convertToUpca = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upce0preamble = '';
    Object.defineProperty(obj, 'upce0preamble', {
        get : function() {
             return upce0preamble; 
        },
        set : function(value){ 
            upce0preamble = value;
            _scanner.upce0preamble = _changedProperties.upce0preamble = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upce0reportCheckDigit = '';
    Object.defineProperty(obj, 'upce0reportCheckDigit', {
        get : function() {
             return upce0reportCheckDigit; 
        },
        set : function(value){ 
            upce0reportCheckDigit = value;
            _scanner.upce0reportCheckDigit = _changedProperties.upce0reportCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upce1 = '';
    Object.defineProperty(obj, 'upce1', {
        get : function() {
             return upce1; 
        },
        set : function(value){ 
            upce1 = value;
            _scanner.upce1 = _changedProperties.upce1 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upce1convertToUpca = '';
    Object.defineProperty(obj, 'upce1convertToUpca', {
        get : function() {
             return upce1convertToUpca; 
        },
        set : function(value){ 
            upce1convertToUpca = value;
            _scanner.upce1convertToUpca = _changedProperties.upce1convertToUpca = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upce1preamble = '';
    Object.defineProperty(obj, 'upce1preamble', {
        get : function() {
             return upce1preamble; 
        },
        set : function(value){ 
            upce1preamble = value;
            _scanner.upce1preamble = _changedProperties.upce1preamble = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upce1reportCheckDigit = '';
    Object.defineProperty(obj, 'upce1reportCheckDigit', {
        get : function() {
             return upce1reportCheckDigit; 
        },
        set : function(value){ 
            upce1reportCheckDigit = value;
            _scanner.upce1reportCheckDigit = _changedProperties.upce1reportCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcEanBookland = '';
    Object.defineProperty(obj, 'upcEanBookland', {
        get : function() {
             return upcEanBookland; 
        },
        set : function(value){ 
            upcEanBookland = value;
            _scanner.upcEanBookland = _changedProperties.upcEanBookland = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcEanBooklandFormat = '';
    Object.defineProperty(obj, 'upcEanBooklandFormat', {
        get : function() {
             return upcEanBooklandFormat; 
        },
        set : function(value){ 
            upcEanBooklandFormat = value;
            _scanner.upcEanBooklandFormat = _changedProperties.upcEanBooklandFormat = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcEanConvertRssToUpcEan = '';
    Object.defineProperty(obj, 'upcEanConvertRssToUpcEan', {
        get : function() {
             return upcEanConvertRssToUpcEan; 
        },
        set : function(value){ 
            upcEanConvertRssToUpcEan = value;
            _scanner.upcEanConvertRssToUpcEan = _changedProperties.upcEanConvertRssToUpcEan = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcEanCoupon = '';
    Object.defineProperty(obj, 'upcEanCoupon', {
        get : function() {
             return upcEanCoupon; 
        },
        set : function(value){ 
            upcEanCoupon = value;
            _scanner.upcEanCoupon = _changedProperties.upcEanCoupon = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcEanLinearDecode = '';
    Object.defineProperty(obj, 'upcEanLinearDecode', {
        get : function() {
             return upcEanLinearDecode; 
        },
        set : function(value){ 
            upcEanLinearDecode = value;
            _scanner.upcEanLinearDecode = _changedProperties.upcEanLinearDecode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcEanRandomWeightCheckDigit = '';
    Object.defineProperty(obj, 'upcEanRandomWeightCheckDigit', {
        get : function() {
             return upcEanRandomWeightCheckDigit; 
        },
        set : function(value){ 
            upcEanRandomWeightCheckDigit = value;
            _scanner.upcEanRandomWeightCheckDigit = _changedProperties.upcEanRandomWeightCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcEanRetryCount = '';
    Object.defineProperty(obj, 'upcEanRetryCount', {
        get : function() {
             return upcEanRetryCount; 
        },
        set : function(value){ 
            upcEanRetryCount = value;
            _scanner.upcEanRetryCount = _changedProperties.upcEanRetryCount = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcEanSecurityLevel = '';
    Object.defineProperty(obj, 'upcEanSecurityLevel', {
        get : function() {
             return upcEanSecurityLevel; 
        },
        set : function(value){ 
            upcEanSecurityLevel = value;
            _scanner.upcEanSecurityLevel = _changedProperties.upcEanSecurityLevel = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcEanSupplemental2 = '';
    Object.defineProperty(obj, 'upcEanSupplemental2', {
        get : function() {
             return upcEanSupplemental2; 
        },
        set : function(value){ 
            upcEanSupplemental2 = value;
            _scanner.upcEanSupplemental2 = _changedProperties.upcEanSupplemental2 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcEanSupplemental5 = '';
    Object.defineProperty(obj, 'upcEanSupplemental5', {
        get : function() {
             return upcEanSupplemental5; 
        },
        set : function(value){ 
            upcEanSupplemental5 = value;
            _scanner.upcEanSupplemental5 = _changedProperties.upcEanSupplemental5 = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var upcEanSupplementalMode = '';
    Object.defineProperty(obj, 'upcEanSupplementalMode', {
        get : function() {
             return upcEanSupplementalMode; 
        },
        set : function(value){ 
            upcEanSupplementalMode = value;
            _scanner.upcEanSupplementalMode = _changedProperties.upcEanSupplementalMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var us4state = '';
    Object.defineProperty(obj, 'us4state', {
        get : function() {
             return us4state; 
        },
        set : function(value){ 
            us4state = value;
            _scanner.us4state = _changedProperties.us4state = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var us4stateFics = '';
    Object.defineProperty(obj, 'us4stateFics', {
        get : function() {
             return us4stateFics; 
        },
        set : function(value){ 
            us4stateFics = value;
            _scanner.us4stateFics = _changedProperties.us4stateFics = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var usPlanet = '';
    Object.defineProperty(obj, 'usPlanet', {
        get : function() {
             return usPlanet; 
        },
        set : function(value){ 
            usPlanet = value;
            _scanner.usPlanet = _changedProperties.usPlanet = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var usPlanetreportCheckDigit = '';
    Object.defineProperty(obj, 'usPlanetreportCheckDigit', {
        get : function() {
             return usPlanetreportCheckDigit; 
        },
        set : function(value){ 
            usPlanetreportCheckDigit = value;
            _scanner.usPlanetreportCheckDigit = _changedProperties.usPlanetreportCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var usPostNet = '';
    Object.defineProperty(obj, 'usPostNet', {
        get : function() {
             return usPostNet; 
        },
        set : function(value){ 
            usPostNet = value;
            _scanner.usPostNet = _changedProperties.usPostNet = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var usPostNetreportCheckDigit = '';
    Object.defineProperty(obj, 'usPostNetreportCheckDigit', {
        get : function() {
             return usPostNetreportCheckDigit; 
        },
        set : function(value){ 
            usPostNetreportCheckDigit = value;
            _scanner.usPostNetreportCheckDigit = _changedProperties.usPostNetreportCheckDigit = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var webcode = '';
    Object.defineProperty(obj, 'webcode', {
        get : function() {
             return webcode; 
        },
        set : function(value){ 
            webcode = value;
            _scanner.webcode = _changedProperties.webcode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var webcodeDecodeGtSubtype = '';
    Object.defineProperty(obj, 'webcodeDecodeGtSubtype', {
        get : function() {
             return webcodeDecodeGtSubtype; 
        },
        set : function(value){ 
            webcodeDecodeGtSubtype = value;
            _scanner.webcodeDecodeGtSubtype = _changedProperties.webcodeDecodeGtSubtype = value;
        },  
        enumerable : true,  
        configurable : true
    });

    return obj;
})();

/****************** GENERIC Object ****************/
var generic = (function() {
    var _generic = generic;

    var obj = {
        InvokeMETAFunction : function(module, content) {
            module = module.substr(0, 1).toLowerCase() + module.substr(1);
            if(['scanner', 'signatureCapture', 'audioCapture', 'fileTransfer', 'push', 'signal'].indexOf(module) !== -1) {
                //var object = eval(module);
                var object = window[module];
                if(content.indexOf(':') === -1) {
                    //execute method
                    var method = content.substr(0, 1).toLowerCase() + content.substr(1);
                    object[method]();
                    /*if(method != 'enabled') {
                     //if the content is actualy the enabled property
                     //execute the enable method
                     object[method]();
                     }
                     else {
                     object.enable();
                     }*/
                } else {
                    //multiple definitions(properties and methods)
                    var properties = content.split(/;(?!\s*['"])/);

                    for(var i = 0, length = properties.length; i < length; i++) {
                        if(properties[i].indexOf('url') != -1) {
                            //The property is an url address or an javascript function
                            var params = properties[i].split(':url');
                            params[0] = params[0].replace(/^\s+|\s+$/g, "");
                            params[1] = params[1].replace(/^\s+|\s+$/g, "");

                            if(!params[1].match(/javascript/i)) {
                                //the property value is an url address
                                //@TODO if the property is scanner event, we don't need to wrap the address with "url()",
                                //but on signatureCapture.destination and maybe on other properties too, we have must wrap it
                                params[1] = "url('" + params[1].replace(/\(['"]{1}(.*)['"]{1}\)/, '$1') + "')";
                            } else {
                                //the property value is javascript function
                                params[1] = params[1].replace(/.*javascript:(.+);.*$/i, '$1');
                            }
                            object[params[0].substr(0, 1).toLowerCase() + params[0].substr(1)] = params[1];
                        } else {
                            if(properties[i].indexOf(':') == -1) {
                                //execute method
                                properties[i] = properties[i].replace(/^\s+|\s+$/g, "");
                                var method = properties[i].substr(0, 1).toLowerCase() + properties[i].substr(1);
                                object[method]();
                                /*if(method != 'enabled') {
                                 //if the content is actualy the enabled property
                                 //execute the enable method
                                 scanner[method]();
                                 }
                                 else {
                                 scanner.enable();
                                 }*/
                            } else {
                                //add property
                                var params = properties[i].split(':');
                                params[0] = params[0].replace(/^\s+|\s+$/g, "");
                                params[1] = params[1].replace(/^\s+|\s+$/g, "");
                                object[params[0].substr(0, 1).toLowerCase() + params[0].substr(1)] = params[1];
                            }
                        }
                    }
                }
            } else {
                try {
                    //@TODO when we have activate the signatureCapture with the InvokeMetaFunction or the META tags, we didn't change the properties of the object and on focus we only return the default ones'
                    _generic.InvokeMETAFunction(module, content);
                } catch(e) {
                }
            }
        },
        Log : function(param, flag) {
			return _generic ? _generic.Log.apply(_generic, arguments) : null;
        },
        LaunchProcess : function(fileName, commandline) {
            return _generic.LaunchProcess.apply(_generic, arguments);
        },
        LaunchProcessNonBlocking : function(fileName, commandline) {
            return _generic.LaunchProcessNonBlocking.apply(_generic, arguments);
        },
        CloseProcess : function(param) {
            _generic.CloseProcess.apply(_generic, arguments);
        },
        GetProcessExitCode : function(param) {
            return _generic.GetProcessExitCode.apply(_generic, arguments);
        },
        WaitProcess : function(param, timeout) {
            return _generic.WaitProcess.apply(_generic, arguments);
        },
        SetRegistrySetting : function(hive, type, key, subkey, setting) {
            _generic.SetRegistrySetting.apply(_generic, arguments);
        },
        GetRegistrySetting : function(hive, subkey, setting) {
            return _generic.GetRegistrySetting.apply(_generic, arguments);
        },
        PlayWave : function(filename, flags) {
            return _generic.PlayWave.apply(_generic, arguments);
        },
        ReadConfigSetting : function(setting, name) {
            return _generic.ReadConfigSetting.apply(_generic, arguments);
        },
        WriteConfigSetting : function(setting, value, name) {
            return _generic.WriteConfigSetting.apply(_generic, arguments);
        },
        ReadUserSetting : function(setting) {
            return _generic.ReadUserSetting.apply(_generic, arguments);
        },
        WriteUserSetting : function(setting, value) {
            return _generic.WriteUserSetting.apply(_generic, arguments);
        },
        OEMInfo : "",
        UUID : ""
    };

    return obj;
})();

/*************** ActiveXObject **************/
var ActiveXObject = function(object) {
    return generic;
};

/*************** SignatureCapture ***********/
var signatureCapture = (function() {
    var _signatureCapture = signatureCapture;

    var obj = {
        capture : function() {
            _signatureCapture.capture();
        },
        clear : function() {
            _signatureCapture.clear();
        },
        signatureSaveEvent : '',
        vectorEvent : '',
        getEventResponseProperties : function(evt) {
            switch(evt) {
                case 'signatureSaveEvent':
                    return ['transferResult'];
                case 'vectorEvent':
                    return ['vectorArray'];
            }
        }
    };

    /**
     * Shows or hides the rectangular capture area
     */
    var visibility = 'hidden';
    Object.defineProperty(obj, 'visibility', {
        get : function() {
            return visibility;
        },
        set : function(value) {
            visibility = value;
            if(value.toLowerCase() == 'visible') {
                asl.prv.signatureCaptureWasVisible = true;
            } else {
                asl.prv.signatureCaptureWasVisible = false;
            }
            _signatureCapture.visibility = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * Shows or hides a border for the rectangular capture area
     */
    var border = 'visible';
    Object.defineProperty(obj, 'border', {
        get : function() {
            return border;
        },
        set : function(value) {
            border = value;
            _signatureCapture.border = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * Sets the width of the rectangular capture area in pixels
     */
    var width = '200';
    Object.defineProperty(obj, 'width', {
        get : function() {
            return width;
        },
        set : function(value) {
            width = value;
            _signatureCapture.width = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * Sets the height of the rectangular capture area in pixels
     */
    var height = '150';
    Object.defineProperty(obj, 'height', {
        get : function() {
            return height;
        },
        set : function(value) {
            height = value;
            _signatureCapture.height = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * Sets the top left horizontal position of the rectangular capture area in pixels
     */
    var left = '15';
    Object.defineProperty(obj, 'left', {
        get : function() {
            return left;
        },
        set : function(value) {
            left = value;
            _signatureCapture.left = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * Sets the top left vertical position of the rectangular capture area in pixels
     */
    var top = '60';
    Object.defineProperty(obj, 'top', {
        get : function() {
            return top;
        },
        set : function(value) {
            top = value;
            _signatureCapture.top = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * Sets the width of the pen line in pixels when using the device's stylus
     */
    var penWidth = '1';
    Object.defineProperty(obj, 'penWidth', {
        get : function() {
            return penWidth;
        },
        set : function(value) {
            penWidth = value;
            _signatureCapture.penWidth = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * RGB value that sets the color of the stylus pen ink using HTML web colors.
     */
    var penColor = '#000000';
    Object.defineProperty(obj, 'penColor', {
        get : function() {
            return penColor;
        },
        set : function(value) {
            penColor = value;
            _signatureCapture.penColor = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * RGB value that sets the background color of the signature capture area
     */
    var bgColor = '#FFFFFF';
    Object.defineProperty(obj, 'bgColor', {
        get : function() {
            return bgColor;
        },
        set : function(value) {
            bgColor = value;
            _signatureCapture.bgColor = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * Sets the destination path and name for the signature bitmap when the 'capture' method is called.
     */
    var destination = '';
    Object.defineProperty(obj, 'destination', {
        get : function() {
            return destination;
        },
        set : function(value) {
            destination = value;
            _signatureCapture.destination = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * The username for the HTTP or FTP server if required
     */
    var username = '';
    Object.defineProperty(obj, 'username', {
        get : function() {
            return username;
        },
        set : function(value) {
            username = value;
            _signatureCapture.username = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * The password for the HTTP or FTP server if required
     */
    var password = '';
    Object.defineProperty(obj, 'password', {
        get : function() {
            return password;
        },
        set : function(value) {
            password = value;
            _signatureCapture.password = value;
        },
        enumerable : true,
        configurable : true
    });

    /**
     * When the 'Capture' method is invoked the contents of the signature capture area are saved in a bitmap in the root directory of the device.
     * This parameter is used to specify the filename when storing the bitmap locally.
     */
    var name = 'Signature';
    Object.defineProperty(obj, 'name', {
        get : function() {
            return name;
        },
        set : function(value) {
            name = value;
            _signatureCapture.name = value;
        },
        enumerable : true,
        configurable : true
    });

    return obj;

})();

/******************* Audio Capture ***************/
var audioCapture = (function() {
    var _audioCapture = audioCapture;

    var obj = {
        start : function() {
            _audioCapture.start();
        },
        stop : function() {
            _audioCapture.stop();
        },
        cancel : function() {
            _audioCapture.cancel();
        },
        audioSaveEvent : '',
        getEventResponseProperties : function(evt) {
            switch(evt) {
                case 'audioSaveEvent':
                    return ['transferResult'];
            }
        }
    };

    var duration = '10000';
    Object.defineProperty(obj, 'duration', {
        get : function() {
            return duration;
        },
        set : function(value) {
            duration = value;
            _audioCapture.duration = value;
        },
        enumerable : true,
        configurable : true
    });

    var destination = '';
    Object.defineProperty(obj, 'destination', {
        get : function() {
            return destination;
        },
        set : function(value) {
            destination = value;
            _audioCapture.destination = value;
        },
        enumerable : true,
        configurable : true
    });

    var username = '';
    Object.defineProperty(obj, 'username', {
        get : function() {
            return username;
        },
        set : function(value) {
            username = value;
            _audioCapture.username = value;
        },
        enumerable : true,
        configurable : true
    });

    var password = '';
    Object.defineProperty(obj, 'password', {
        get : function() {
            return password;
        },
        set : function(value) {
            password = value;
            _audioCapture.password = value;
        },
        enumerable : true,
        configurable : true
    });

    return obj;
})();

/********************* File Transfer ********************/
var fileTransfer = (function() {
    var _fileTransfer = fileTransfer;

    var obj = {
        transfer : function() {
            asl.prv.message(asl.msgs.types.npapi, {
                object : 'fileTransfer',
                method : 'transfer()'
            });
            //_fileTransfer.transfer();
        },
        transferEvent : '',
        getEventResponseProperties : function(evt) {
            switch(evt) {
                case 'transferEvent':
                    return ['transferResult'];
            }
        }
    };

    var destination = '';
    Object.defineProperty(obj, 'destination', {
        get : function() {
            return destination;
        },
        set : function(value) {
            destination = value;
            _fileTransfer.destination = value;
        },
        enumerable : true,
        configurable : true
    });

    var source = '';
    Object.defineProperty(obj, 'source', {
        get : function() {
            return source;
        },
        set : function(value) {
            source = value;
            _fileTransfer.source = value;
        },
        enumerable : true,
        configurable : true
    });

    var username = '';
    Object.defineProperty(obj, 'username', {
        get : function() {
            return username;
        },
        set : function(value) {
            username = value;
            _fileTransfer.username = value;
        },
        enumerable : true,
        configurable : true
    });

    var password = '';
    Object.defineProperty(obj, 'password', {
        get : function() {
            return password;
        },
        set : function(value) {
            password = value;
            _fileTransfer.password = value;
        },
        enumerable : true,
        configurable : true
    });

    var createFolders = 'false';
    Object.defineProperty(obj, 'createFolders', {
        get : function() {
            return createFolders;
        },
        set : function(value) {
            createFolders = value;
            _fileTransfer.createFolders = value;
        },
        enumerable : true,
        configurable : true
    });

    var overWrite = 'false';
    Object.defineProperty(obj, 'overWrite', {
        get : function() {
            return overWrite;
        },
        set : function(value) {
            overWrite = value;
            _fileTransfer.overWrite = value;
        },
        enumerable : true,
        configurable : true
    });

    return obj;
})();

/****************** Push *********************/
var push = (function() {
    var _push = push;

    var obj = {
        start : function() {
            _push.start();
        },
        stop : function() {
            _push.stop();
        },
        detected : '',
        getEventResponseProperties : function(evt) {
            switch(evt) {
                case 'detected':
                    return ['value'];
            }
        }
    };

    var port = '80';
    Object.defineProperty(obj, 'port', {
        get : function() {
            return port;
        },
        set : function(value) {
            port = value;
            _push.port = value;
        },
        enumerable : true,
        configurable : true
    });

    var passKey = '';
    Object.defineProperty(obj, 'passKey', {
        get : function() {
            return passKey;
        },
        set : function(value) {
            passKey = value;
            _push.passKey = value;
        },
        enumerable : true,
        configurable : true
    });

    var response = '';
    Object.defineProperty(obj, 'response', {
        get : function() {
            return response;
        },
        set : function(value) {
            response = value;
            _push.response = value;
        },
        enumerable : true,
        configurable : true
    });

    var path = '';
    Object.defineProperty(obj, 'path', {
        get : function() {
            return path;
        },
        set : function(value) {
            path = value;
            _push.path = value;
        },
        enumerable : true,
        configurable : true
    });

    var unattended = 'disabled';
    Object.defineProperty(obj, 'unattended', {
        get : function() {
            return unattended;
        },
        set : function(value) {
            unattended = value;
            _push.unattended = value;
        },
        enumerable : true,
        configurable : true
    });

    return obj;
})();

/******************* Wlan ***************/
var wlan = (function() {
    var _wlan = wlan;
    
    var obj = {
        enableAdapter: function() {
            _wlan.enableAdapter();
        },
        disableAdapter: function() {
            _wlan.disableAdapter();
        },
        resetToDefault: function() {
            _wlan.resetToDefault();
        },
        deleteProfile: function() {
            _wlan.deleteProfile();
        },
        getAdapterPowerState: function() {
            _wlan.getAdapterPowerState();
        },
        networkLogin: function() {
            _wlan.networkLogin();
        },
        networkLogout: function() {
            _wlan.networkLogout();
        },
        cancelNetworkLogin: function() {
            _wlan.cancelNetworkLogin();
        },
        addProfile: function() {
            _wlan.addProfile();
        },
        connectProfile: function() {
            _wlan.connectProfile();
        },
        importConfig: function() {
            _wlan.importConfig();
        },
		getAllProfiles: function(){
			_wlan.getAllProfiles();
		},
		getCurrentProfile: function(){
			_wlan.getCurrentProfile();
		},
		getConnectionState: function(){
			_wlan.getConnectionState();
		}
    };
    
    var profileGuid = '';
    Object.defineProperty(obj, 'profileGuid', {
        get : function(){ return profileGuid; },  
        set : function(value){ 
            profileGuid = value;
            _wlan.profileGuid = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var networkUsername = '';
    Object.defineProperty(obj, 'networkUsername', {
        get : function(){ return networkUsername; },  
        set : function(value){ 
            networkUsername = value;
            _wlan.networkUsername = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var networkPassword = '';
    Object.defineProperty(obj, 'networkPassword', {
        get : function(){ return networkPassword; },  
        set : function(value){ 
            networkPassword = value;
            _wlan.networkPassword = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var networkDomain = '';
    Object.defineProperty(obj, 'networkDomain', {
        get : function(){ return networkDomain; },  
        set : function(value){ 
            networkDomain = value;
            _wlan.networkDomain = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var selectLoginProfile = '';
    Object.defineProperty(obj, 'selectLoginProfile', {
        get : function(){ return selectLoginProfile; },  
        set : function(value){ 
            selectLoginProfile = value;
            _wlan.selectLoginProfile = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var profileEssid = '';
    Object.defineProperty(obj, 'profileEssid', {
        get : function(){ return profileEssid; },  
        set : function(value){ 
            profileEssid = value;
            _wlan.profileEssid = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var profileName = '';
    Object.defineProperty(obj, 'profileName', {
        get : function(){ return profileName; },  
        set : function(value){ 
            profileName = value;
            _wlan.profileName = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var profilePassphrase = '';
    Object.defineProperty(obj, 'profilePassphrase', {
        get : function(){ return profilePassphrase; },  
        set : function(value){ 
            profilePassphrase = value;
            _wlan.profilePassphrase = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var profileEncryption = '';
    Object.defineProperty(obj, 'profileEncryption', {
        get : function(){ return profileEncryption; },  
        set : function(value){ 
            profileEncryption = value;
            _wlan.profileEncryption = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var profileSecurityMode = '';
    Object.defineProperty(obj, 'profileSecurityMode', {
        get : function(){ return profileSecurityMode; },  
        set : function(value){ 
            profileSecurityMode = value;
            _wlan.profileSecurityMode = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var deleteAfterImport = '';
    Object.defineProperty(obj, 'deleteAfterImport', {
        get : function(){ return deleteAfterImport; },  
        set : function(value){ 
            deleteAfterImport = value;
            _wlan.deleteAfterImport = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var importConfigFromLocation = '';
    Object.defineProperty(obj, 'importConfigFromLocation', {
        get : function(){ return importConfigFromLocation; },  
        set : function(value){ 
            importConfigFromLocation = value;
            _wlan.importConfigFromLocation = value;
        },  
        enumerable : true,  
        configurable : true
    });

    var adapterPowerStateEvent = '';
    Object.defineProperty(obj, 'adapterPowerStateEvent', {
        get : function(){ return adapterPowerStateEvent; },  
        set : function(value){ 
            adapterPowerStateEvent = value;
        },  
        enumerable : true,  
        configurable : true
    });

    var loginResponseEvent = '';
    Object.defineProperty(obj, 'loginResponseEvent', {
       get : function(){ return loginResponseEvent; },  
       set : function(value){ 
           loginResponseEvent = value;
       },  
       enumerable : true,  
       configurable : true
    });

    var logoutResponseEvent = '';
    Object.defineProperty(obj, 'logoutResponseEvent', {
        get : function(){ return logoutResponseEvent; },  
        set : function(value){ 
            logoutResponseEvent = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var cancelLoginResponseEvent = '';
    Object.defineProperty(obj, 'cancelLoginResponseEvent', {
        get : function(){ return cancelLoginResponseEvent; },  
        set : function(value){ 
            cancelLoginResponseEvent = value;
        },  
        enumerable : true,  
        configurable : true
    });

    var loginCandidateProfilesEvent = '';
    Object.defineProperty(obj, 'loginCandidateProfilesEvent', {
        get : function(){ return loginCandidateProfilesEvent; },  
        set : function(value){ 
            loginCandidateProfilesEvent = value;
        },  
        enumerable : true,  
        configurable : true
    });

    var networkLoginEvent = '';
    Object.defineProperty(obj, 'networkLoginEvent', {
        get : function(){ return networkLoginEvent; },  
        set : function(value){ 
            networkLoginEvent = value;
        },  
        enumerable : true,  
        configurable : true
    });

    var networkLoginCloseEvent = '';
    Object.defineProperty(obj, 'networkLoginCloseEvent', {
        get : function(){ return networkLoginCloseEvent; },  
        set : function(value){ 
            networkLoginCloseEvent = value;
        },  
        enumerable : true,  
        configurable : true
   });
   
    var importConfigEvent = '';
    Object.defineProperty(obj, 'importConfigEvent', {
        get : function(){ return importConfigEvent; },  
        set : function(value){ 
            importConfigEvent = value;
        },  
        enumerable : true,  
        configurable : true
    });
    
    var addedProfileEvent = '';
    Object.defineProperty(obj, 'addedProfileEvent', {
        get : function(){ return addedProfileEvent; },  
        set : function(value){ 
            addedProfileEvent = value;
        },  
        enumerable : true,  
        configurable : true
    });
   
    var allProfilesEvent = '';
    Object.defineProperty(obj, 'allProfilesEvent', {
        get : function(){ return allProfilesEvent; },  
        set : function(value){ 
            allProfilesEvent = value;
        },  
        enumerable : true,  
        configurable : true
    });
       
    var currentProfileEvent = '';
    Object.defineProperty(obj, 'currentProfileEvent', {
        get : function(){ return currentProfileEvent; },  
        set : function(value){ 
            currentProfileEvent = value;
        },  
        enumerable : true,  
        configurable : true
    });
       
    var connectionStateEvent = '';
    Object.defineProperty(obj, 'connectionStateEvent', {
        get : function(){ return connectionStateEvent; },  
        set : function(value){ 
            connectionStateEvent = value;
        },  
        enumerable : true,  
        configurable : true
    });
        
    return obj;
})();

/**
 * asl is the main object of the Library. It wraps all the functions that will be presented through this module.
 * @type Object 
 */
var asl = {};

/**
 * asl.prv object contains all the functions and variables that must not be accessed directly through Client Applications
 * @type Object 
 */
asl.prv = {};

/**
 * @description will be true if application was close
 * @type {Boolean}
 */
asl.prv.quit = false;

/**
 * asl.prv.inputs array of all tracked inputs in the Client application document that were added to the keyboard application.
 * @type Object 
 */
asl.prv.inputs = {};

/**
 *Stores the current resolution of the device
 * @type String 
 */
asl.prv.resolution = '320x240';

/**
 * The number of the list items 
 */
asl.prv.listItemsByPage = 4;

/**
 * asl.prv.regx stores all Regular expressions
 */
asl.prv.regx = {
    hasFunction: /^\w+\(.+\)/,
    getFunctionName: /^([^(]+).+/
};

/**
 * @description hold the message information
 * @type {Object}
 */
asl.msgs = {};

/**
 * @description Private property to track the state of the scanner
 * @type {Boolean}
 */
asl.prv.scannerWasEnabled = false;

/**
 * @description Private property totrack the state of the signatureCapture
 * @type {Boolean}
 */
asl.prv.signatureCaptureWasVisible = false;

/**
 * @description Private property totrack the state of the signal icon
 * @type {Boolean}
 */
asl.prv.signalWasVisible = false;

/**
 * @description asl.msgs.types object contains all the functions and variables that must not be accessed directly through Client Applications
 * @type Object 
 */
asl.msgs.types = {
    hi : -1,
    auth : 0,
    notify : 1,
    evt : 2,
    back : 3,
    title : 4,
    options : 5,
    minimize : 6,
    npapi : 7,
    keyboard : 8,
    apps : 9,
    badge: 10,
	profile: 11
};

/**
 * @description asl.event object contains wraps all the system functions for managing Events in the Client Application
 * @type Object 
 */
asl.events = {};

/**
 * @description asl.events._listerners contains all mappings between event types and event callback functions.
 * @type Object 
 */
asl.events._listerners = {};

/**
 * @description check if has any listener for this event
 * @param {asl.events.types} evt
 * @return {Boolean}
 */
asl.events.hasListerner = function(evt){
	if(asl.events._listerners[evt]){
		return true;
	}
	return false;
};

/**
 * @function 
 * @description private function that subscribes a callback function for an event.
 * @param {string} event type of the event; asl.events.types can be used to avoid typing mistakes.
 * @param {function} callback the callback function that will be executed after the event occurs. 
 */
asl.events.subscribe = function(event, callback) {
    var evt = event.toLowerCase();
    var list = asl.events._listerners[evt] || (asl.events._listerners[evt] = []);
    list.push(callback);
};

/**
 * @function 
 * @description private function that removes all listener functions for an event.
 * @param {string} event type of the event; asl.events.types can be used to avoid typing mistakes.
 */
asl.events.unbsubscribe = function(event) {
    var evt = event.toLowerCase();
    asl.events._listerners[evt] = [];
};

/**
 * @function 
 * @description private function that fires the event and all the listerens will be executed.
 * @param {String} event type of the event; asl.events.types can be used to avoid typing mistakes.
 * @param {Object} args specific data can be provided to a listener after the event occurs. 
 */
asl.events.fire = function(event, args) {
    var evt = event.toLowerCase();
    if(asl.events._listerners[evt]) {
        for(var i = 0, length = asl.events._listerners[evt].length; i < length; i++) {
			asl.events._listerners[evt][i].apply(this, [args]);
        }
	}
};

/**
 * @description asl.events.types contains all the possible events that can occur in TSD environment.
 * @type Object
 */
asl.events.types = {
    focus : "onfocus",
    focusOut : "onfocusout",
    scanTo : "onscanto",
    backPressed : "onbackpressed",
    optionSelected : "onoptionselected",
    rotate : "onrotate",
    cradleInsert : "oncradleinsert",
    cradleRemove : "oncradleremove",
    lowBattery : "onlowbattery",
    criticalBattery : "oncriticalbattery",
    signal : "onsignal",
    signalLost : "onsignallost",
    signalRestored : "onsignalrestored",
    lock : 'onlock',
    kill : "onkill",
    exit : "onexit",
    error : "onerror",
    authFailed : "onAuthFailed",
    loaded : 'onloaded'
};

/**
 * @description notification types
 * @type {Object}
 */
asl.notifications = {
    system: 'system',
    application: 'application',
    thick: 'thick',
    server: 'server'
};

//TODO isn't use for now
/**
 * @description notification priority
 * @type {Object}
 */
asl.priority = {
    urgent: 'urgent',
    high: 'high',
    normal: 'normal',
    low: 'low'
};

/**
 * asl.prv.shell holds the address of the Shell application; this is dynamically set on application page load.
 * @type String
 */
asl.prv.shell = null;

/**
 * asl.prv.msgStack holds the messages that has been sent before hiAccepted message from the sys module.
 * @type Array
 */
asl.prv.msgStack = [];

/**
 * asl.prv.msgStack holds the messages that has been sent before hiAccepted message from the sys module.
 * @type Array
 */
asl.prv.titleStack = [];

/**
 * asl.prv.locale holds the locale preference coming from shell and responsible for resource strings.
 * @type Array
 */
asl.prv._locale = 'en-US';
Object.defineProperty(asl.prv, 'locale', {
    get : function() {
        return asl.prv._locale;
    },
    set : function(value) {
        asl.prv._locale = value;
		asl.prv.changeLocale();
    },
    enumerable : true,
    configurable : true
});

asl.prv.changeLocale = function(){
	try{
		if(resources && resources[asl.prv._locale]){
			for(var l in resources){
				if(!res[l]){
					res[l] = {};
				}
				for(var r in res['en-US']){
					if(resources[l][r])
						res[l][r] = resources[l][r];		
				}
			}
		}
	}
	catch(e){}
	
	if(res[asl.prv._locale] && res[asl.prv._locale].Options)
		options.text = res[asl.prv._locale].Options;
};

/**
 * @function
 * @description private function that use HTML 5 postMessage protocol to process messages between iframe client and the host document.
 * @param {Object} data keeps specific information for the exchanged message like type, address and params; params can be used to exchange specific information like id, names, message content etc..
 */
asl.prv.processMessage = function(data){
	switch(data.type){
		case -1 : asl.prv.hiAccepted(data.params); break;
		case 0 : asl.prv.auth(data.params); break;
		case 1 : asl.prv.notify(data.params); break;
		case 2 : asl.prv.evt(data.params); break;
		case 3 : asl.prv.back(data.params); break;
		case 4 : asl.prv.title(data.params); break;
		case 5 : asl.prv.options(data.params); break;
		case 6 : asl.prv.minimize(data.params); break;
		case 7 : asl.prv.npapi(data.params); break;
		case 8 : asl.prv.keyboard(data.params); break;
		case 9 : asl.prv.apps(data.params); break;
		case 10 : asl.prv.badge(data.params); break;

		default: alert("Message does not have type and cannot be processed.");break;
	}
};

/**
 * @function
 * @description private function that prepares an asl message for sending through HTML5 postMessage protocol.
 * @param {String} type holds the type of the message; possible types can be found in asl.msgs.types enumeration.
 * @param {Object} params specific data that is exchanged depending on the message and application; params holds the Client Application specific data.
 */
asl.prv.message = function(type, params){
    if(asl.prv.loaded) {
        if(asl.prv.shell){
            params.id = asl.prv.id;
            msg = {"type": type, "params": params};
            parent.postMessage(msg, asl.prv.shell);
        } else {
            throw "The application cannot connect to the Central Shell. The Shell URI is missing.";
        }
    } else {
		params.id = asl.prv.id;
		if(type == asl.msgs.types.back || type == asl.msgs.types.title || type == asl.msgs.types.options){
			asl.prv.titleStack.push({"type": type, "params": params});        
		}
		else{
			asl.prv.msgStack.push({"type": type, "params": params});        
		}
    }
};

/**
 * @function
 * @description private function that is called after the Application document has been loaded, received hiAccepted message from Shell and it need to execute all messages that are on the queue.
 */
asl.prv.execMsgStack = function(){
	while(asl.prv.msgStack.length > 0){
		var m = asl.prv.msgStack.shift();

		asl.prv.message(m.type, m.params);
	}
};

/**
 * @function
 * @description private function that is called after the Shell instantiate a connection with the application for the first time.
 * @param {Object} params system data that is passed to the application by the Shell like Shell address, Shell application name, etc.
 */
asl.prv.hiAccepted = function(params){
	generic.Log("hi accepted", 1);
	asl.prv.shell = params.shell;
	asl.prv.name = params.name;
	asl.prv.id = params.id;
	asl.prv.locale = params.locale;	
	asl.prv.data = params.data ? params.data : {};
	
	if(params.resolution != asl.prv.resolution) {
	    //asl.prv.resolution = params.resolution;
	    title.reDesign();
	}
	asl.prv.listItemsByPage = params.listItemsByPage;

	asl.prv.user = params.user;

	asl.prv.loaded = true;

    asl.prv.lockTimeOut = params.timer ? params.timer : 0;

	asl.prv.message(asl.msgs.types.hi, { status: asl.prv.loaded, name: window.document.title });
	
	options.create();
	
	if(asl.prv.optionsCollection) {
	    title.setOptions(asl.prv.optionsCollection);
	}
	
	//Stylize the options bar
    options.init();

	title.load(asl.fn.store.load('title'));

    asl.events.fire(asl.events.types.loaded, asl.prv.data);
};

/**
 * @function
 * @description private function that process all npapi requests
 * @param {Object} params contains which object method or property is wanted to be executed and some custom data
 */
asl.prv.npapi = function(params) {
    //shortcut of the NPAPI object for convinience
    var object = window[params.data.object];

    //special case for the push module
    if(params.data.object == 'push') {
        if(object[params.data.method]) {
            
            var props = [];
            for(var i in params.data.data) {
                props.push(params.data.data[i]);
            }
            
            if(object[params.data.method].match(asl.prv.regx.hasFunction)) {
                //call the functions assigned to the event
                var callback = window[object[params.data.method].replace(asl.prv.regx.getFunctionName, '$1')];
                if(object[params.data.method].indexOf('%s') != -1) {
                    callback.apply(this, props);
                }
                else if(object[params.data.method].indexOf('%json') != -1){
                    callback(params.data.data);
                }
            }
            else {
                //@TODO we don't send a json to external address
                //Redirect to the url address with the specific data
                var address = object[params.data.method];
                //var props = object.getEventResponseProperties(params.data.method);
                var i = 0;
                
                while(address.indexOf('%s') != -1) {
                    address = address.replace('%s', params.data.data[props[i++]]);
                }
                
                window.location = address;
            }
        }
    }
    //Process all NPAPI events events
    else {
        if(object[params.data.method]) {
			if(object[params.data.method].match(asl.prv.regx.hasFunction)) {
                //call the functions assigned to the event
                //var callback = eval(object[params.data.method].replace(asl.prv.regx.getFunctionName, '$1'));
                var callback = window[object[params.data.method].replace(asl.prv.regx.getFunctionName, '$1')];
                if(object[params.data.method].indexOf('%s') != -1) {
                    callback.apply(this, object.getEventResponseProperties(params.data.method).map(function(val){return params.data.data[val]}).slice(0, object[params.data.method].count('%s')));
                }
                else if(object[params.data.method].indexOf('%json') != -1){
                    callback(params.data.data);
                }
            }
            else {
                //@TODO we don't send a json to external address
                //Redirect to the url address with the specific data
                var address = object[params.data.method];
                var props = object.getEventResponseProperties(params.data.method);
                var i = 0;
                
                while(address.indexOf('%s') != -1) {
                    address = address.replace('%s', params.data.data[props[i++]]);
                }
                
                window.location = address;
            }
        }
    }
};

/**
 * @function
 * @description private function that processes and distributes events coming from external sources e.g. Shell.
 * @param {Object} params holds event specific information like event type, event parameters or some custom defined parameters.
 */
asl.prv.evt = function(params){
	if(params.evt){
		asl.events.fire(params.evt, params.data);
	}
	else{
		throw "No event is received.";
	}
};

/**
 * @function
 * @description private function that processes and distributes events coming from external sources e.g. Shell.
 * @param {Object} params holds event specific information like event type, event parameters or some custom defined parameters.
 */
asl.prv.keyboard = function(params){
	asl.kbdOn = false;
    asl.prv.resetTimer();
    if (params.id) {
	    asl.prv.inputs[params.id].callback(params.id, params.text);
	    if(document.getElementById(params.id) && document.getElementById(params.id).onchange) document.getElementById(params.id).onchange();
	}
	asl.events.fire(asl.events.types.focus);
};

/**
 * @function
 * @description parses the document tree to discover text inputs elements and to assign them focus callback that will invoke the keyboard application.
 */
asl.prv.trackDOMInputs = function(){
	var input_list = document.getElementsByTagName('input');
	for(var i=0; i < input_list.length; i++){

		if(input_list[i].type != 'button' && input_list[i].type != 'submit' &&
           input_list[i].type != 'checkbox' && input_list[i].type != 'radio' &&
           input_list[i].type != 'reset' && input_list[i].type != 'file' &&
           input_list[i].type != 'image' && input_list[i].type != 'hidden'){
			var id = input_list[i].id;
			if(!id || id.length == 0){
			    //@TODO where is the definition of .getId() !!!
				id = asl.prv.inputs.getId();

				input_list[i].setAttribute('id', id);
			}

			if(!asl.prv.inputs[id]){
				asl.prv.inputs[id] = {};
				input_list[id].addEventListener('focus', function(e){
					asl.keyboard(e.target, function(id, text){
						input_list[id].setAttribute("value",text);
					});
				});
			}
		}
	}
};

/**
 * @function
 * @description private function that processes back message coming from external sources e.g. Shell.
 * @param {Object} params holds information which callback to execute.
 */
asl.prv.back = function(params) {
	var callback = asl.fn.store.restore(params);
    asl.events.fire(asl.events.types.backPressed);

    if(params.type == 'function') {
        callback();
    }
    else {
		window.location.replace(params.data);
    }
};

/**
 * @function
 * @description private function that processes options message coming from external sources e.g. Shell.
 * @param {Object} params holds information which callback to execute when clicked on option.
 */
asl.prv.options = function(params) {
    var callback = asl.fn.store.restore(params.exec);

    asl.events.fire(asl.events.types.optionSelected, params.arrguments);

    if(params.exec.type == 'function') {
        callback.apply(this, params.arrguments);
    }
    else {
		window.location.replace(callback);
    }
};

/**
 * @description execute notification action in asl module
 * @param params
 */
asl.prv.notify = function(params) {
    var fn = asl.fn.store.restore(params.exec);
	
	if(params.exec ){
    	if(params.exec.type == 'function') {
        	fn();
    	}
	    else {
			window.location.replace(params.exec.data);
    	}
    }
};

/**
 * @function
 * @description reseve callback from other application and execute
 * @param {Object} params hold callback and data
 * @return void
 */
asl.prv.apps = function(params) {
	var fn = asl.fn.store.restore(params.callback);
	if(params.callback.type == 'function'){
		fn(params.data);
	}
	else {
		window.location.replace(params.callback.data+"?"+asl.prv.serialize(params.data));
	}
}

/**
 * @function
 * @description serialize object in query string
 * @param {Object} obj data that will be serialized
 * @return {String} string of serialized object
 */
asl.prv.serialize = function(obj) {
	var str = [];
	for(var p in obj)
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	return str.join("&");
}

/**
 * @function
 * @description subsctibe for kill event and call exit method
 */
asl.events.subscribe(asl.events.types.kill, function(){
	asl.exit();
});

/**
 * @function
 * @description public function that forces the application to quitl; notifies the Shell for the application quit.
 * @param {Bool} wait if true the exit function will fire an event but will not quit; the event callback should contain asl.exit(false) to force quitting.
 */
asl.exit = function(data, skip) {
	if(!skip)
		if(asl.events.hasListerner(asl.events.types.exit)) {
			asl.events.fire(asl.events.types.exit);
			asl.exit( data ? data : {},true);
			return;
		}

	var params = {};

	params.evt = asl.events.types.exit;
	params.data = data;

    asl.prv.quit = true;

	asl.prv.message(asl.msgs.types.evt, params);
};

/**
 * @function
 * @description private function created for convenience; used in asl.back function
 */
asl.prv.processBack = function(callback, imgUrl) {
    var params = {};
    params.imgUrl = imgUrl;

	if(callback !== undefined) {
        params.callback = asl.fn.store.stringify(callback);

    } else {
        params.callback = null;
    }
	title.setBack(params.callback, params.imgUrl);
};

/**
 * @description Minimize the current application
 */
asl.minimize = function() {
    asl.events.fire(asl.events.types.focusOut);
    asl.prv.message(asl.msgs.types.minimize, {});  
};

/**
 * @description Assign a callback to the Back button, or hide it
 * @param {Function} callback
 * @param {String} imgUrl
 */
asl.back = function(callback, imgUrl) {
    if(imgUrl) {
		asl.prv.processBack(callback, imgUrl);
    } else {
		asl.prv.processBack(callback, null);
    }
};

/**
 * @description Change the title of the application
 * @param {String} text
 */
asl.title = function(text) {
    if(!title.isShowed) {
        title.show();
    }
	title.setText(text);
};

/**
 * @description Set an options for the application
 * @param {Array} opts
 */
asl.options = function(opts) {
	var options = [];
	if (opts){
		for(var i= 0; i < opts.length; i++){
			opts[i].callback = asl.fn.store.stringify(opts[i].callback);
			options.push(opts[i]);
		}
		
		if(asl.prv.loaded) {
		    title.setOptions(options);
		    
		    if(!title.isShowed) {
                title.show();
            }
		}
	}
	
	asl.prv.optionsCollection = options;
};

/**
 * @function
 * @description public function that sets the application in Fullscreen mode i.e. disable the Title bar.
 * @param {Object} param
 */
asl.fullscreen = function(param) {
    asl.prv.message(asl.msgs.types.title, { "fullscreen": param });
};

/**
 * @function
 * @description public function that send notification to the shell or another app.
 * @param {asl.notifications} type
 * @param {asl.priority} priority
 * @param {String} title
 * @param {String} message
 * @param {Array} [buttons]
 * @param {Array} [actions]
 * @param {Number} [timeout]
 */
asl.notify = function(type, priority, title, message, buttons, actions, timeout, iconPath) {
    var appName = asl.prv.name || sessionStorage.getItem("name");
    var params = {
        type: type,
        priority: priority,
        title: title,
        message: message,
        buttons: buttons,
        actions: [],
        timeout: timeout,
		iconPath: iconPath
    }
    
    for(var i = 0, length = actions.length; i < length; i++) {
        if(actions[i]){
			params.actions.push(asl.fn.store.stringify(actions[i]));
		}
		else{
			params.actions.push(null);
		}
    }

    asl.prv.message(asl.msgs.types.notify, params);
};

/**
 * @function
 * @description public function that returns information for the currently logged user.
 */
asl.getUserData = function(){
	return asl.prv.user;
};

/**
 * @description public function that used to show sui.kbd (Keyboard).
 * @param {String} type Keyboard type
 * @param {Function} callback callback for result
 * @param {String} [text] value for Keyboard
 * @param {String} [title] Keyboard Title
 */
asl.keyboard = function(type, callback, text, title){
	var params = {};
	asl.kbdOn = true;
	
	asl.prv.stopTimer();

	var id = "";
	
	if(type instanceof HTMLInputElement) id = type.id;
	else{
	 	id = asl.prv.id;
		asl.prv.inputs[id] = {};
	}
	
	asl.prv.inputs[id].callback = function(id, value){
		
		if(callback && typeof callback === 'function'){
			callback(id, value);
		}
	};

	//TODO: save callback function in the fn store and assign it an id; then use the id for params array
	params.inputId = id;
	params.type = type instanceof HTMLInputElement ? type.getAttribute('type') : type;

    params.title = type instanceof HTMLInputElement && type.getAttribute('title') ? type.getAttribute('title') : title ? title : params.type+" keyboard";
	
	params.value = type instanceof HTMLInputElement ? type.getAttribute('value') : text ? text : "";
	
	params.maxLength = type instanceof HTMLInputElement ? type.getAttribute('maxlength') : 0;

    asl.events.fire(asl.events.types.focusOut);

	asl.prv.message(asl.msgs.types.keyboard, params);
};

asl.showKeyboard = function(params, callback) {
    asl.events.fire(asl.events.types.focusOut);
    asl.prv.inputs[params.inputId] = {
        callback: callback
    };
    
    asl.prv.message(asl.msgs.types.keyboard, params);
};

asl.profile = function(object) {
    asl.prv.message(asl.msgs.types.profile, object);
};

asl.badge = function(url) {
    asl.prv.message(asl.msgs.types.badge, url);
};

/**
 * @description holds the methods that save and restore (function, images and objects)
 * @type {Object}
 */
asl.fn = {};
asl.fn.store = {
    /**
     * @description Store the data in persistant storage
     * @param {Object} data
     * @return {Object}
     */
    stringify: function(data) {
        var result = {};
        if(data instanceof Function) {
            result.type = 'function';
            result.data = this.toString(data);
        }
        else {
            result.type = 'string';
            result.data = data;
        }

        return result;
    },

    /**
     * @description Get data by key from persistant storage
     * @param {Object} obj
     */
    restore: function(obj) {
        if(obj && obj.type == 'function') {
            eval('var tmp = ' + obj.data);
            return tmp;
        }
    },

    /**
     * @description return the function in string format
     * @param {Function} func
     * @return {*}
     */
    toString: function(func) {
        var res = func.toString();
        res = res.replace(/^function(\s\w+)\(/, 'function(');
        
        return res;
    },

    /**
     * @description return Base64 encode a PNG image
     * @param {String} imgUrl
     * @param {Function} callback
     */
    storeImage: function(imgUrl, callback) {
        
        var img = new Image();
        img.src = imgUrl;
        
        img.onload = function() {
            // Create an empty canvas element
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            // Copy the image contents to the canvas
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            
            // Get the data-URL formatted image
            // Firefox supports PNG and JPEG. You could check img.src to
            // guess the original format, but be aware the using "image/jpg"
            // will re-encode the image.
            var dataURL = canvas.toDataURL("image/png");
            callback(dataURL);
        }
    },
    /**
     * @description save the json string in localStorage by key (application id and type or record)
     * @param {String} type
     * @param {String} string
     */
	save: function(type, string){
		localStorage.setItem(asl.prv.id+"-"+type, string);
	},
    /**
     * @description get record form localStroage by provided key
     * @param {String} type
     * @return {*}
     */
	load: function(type){
		return localStorage.getItem(asl.prv.id+"-"+type);
	},
    /**
     * @description delete record form localStroage by provided key
     * @param {String} type
     * @return {*}
     */
    remove: function(type){
        return localStorage.removeItem(asl.prv.id+"-"+type);
    }
};

/**
 * @description time after that the screen will be locked
 * this property is set by sys module
 * @type {Number}
 */
asl.prv.lockTimeOut = 0;

/**
 * @description hold the timer that send locked message to sys module
 * @type {*}
 */
asl.prv.locktimer = null;

/**
 * @description stot asl.prv.locktimer timer and start it again
 * @return void
 */
asl.prv.resetTimer = function(){
	//check if there is a timeout for lock screen at all:
	if(!asl.prv.lockTimeOut) return;
	//stops the timer if it exists
	asl.prv.stopTimer();
	
	//if the keyboard is not visible, then activate a timer
	if(!asl.kbdOn){
	    asl.prv.locktimer = setTimeout(function(){
	        var params = {};
	        params.evt = asl.events.types.lock;
	        asl.prv.message(asl.msgs.types.evt, params);
	    }, asl.prv.lockTimeOut);
	}
};

/**
 * @description just stop asl.prv.locktimer timer
 * @return void
 */
asl.prv.stopTimer = function(){
	if(asl.prv.locktimer)
        window.clearTimeout(asl.prv.locktimer);
	
	asl.prv.locktimer = null;
	delete asl.prv.locktimer;
};

//TODO what is this used for?
asl.prv.lockscreen = function(){
	if(!asl.prv.lockTimeOut) return;
	asl.prv.stopTimer();
	
	if(!asl.kbdOn){
	    asl.prv.locktimer = setTimeout(function(){
	        var params = {};
	        params.evt = asl.events.types.lock;
	        asl.prv.message(asl.msgs.types.evt, params);
	    }, asl.prv.lockTimeOut);
	}
};

/**
 * @description is used to say on sys module that user is loged in or not and send some information about it
 * @param {Boolean} status
 * @param {Object} data
 * @return void
 */
asl.auth = function(status, data){
    var params = {};
    params.status = status;
    params.data = data;
    asl.prv.message(asl.msgs.types.auth, params);
};

/**
 * @function
 * @description Function that can run other application
 * @param {String} url name of installed app or url address
 * @param {Object} [data] holds the data that will be send to application
 * @param {Function|String} [callback] function or url that will be used for callback
 */
asl.run = function(url, data, callback){
	var params = {};
	params.url = url;

	if (data instanceof Function){
		params.callback = asl.fn.store.stringify(data);
	}else if (data instanceof Object){
		params.data = data;
		if (callback){
			params.callback = asl.fn.store.stringify(callback);
		}
	}else if (data) {
		params.callback = asl.fn.store.stringify(data);
	}else if (callback) {
		params.callback = asl.fn.store.stringify(callback);
	}
    asl.events.fire(asl.events.types.focusOut);
	asl.prv.message(asl.msgs.types.apps, params);
};

/**
 * @ignore 
 */	
window.addEventListener("message", function(e){
	if(!asl.prv.shell && e.data && e.data.type == asl.msgs.types.hi){
		asl.prv.processMessage(e.data);
	}
	else {
		generic.Log('shell address: ' + asl.prv.shell, 1);
		var origin = e.origin[e.origin.length - 1] == '/' ? e.origin.slice(0, e.origin.length-1) : e.origin;
		var shell = asl.prv.shell[asl.prv.shell.length - 1] == '/' ? asl.prv.shell.slice(0, asl.prv.shell.length-1) : asl.prv.shell;

		if (shell && shell.indexOf( origin ) == 0)
			asl.prv.processMessage(e.data);
	}
}, false);

/**
 * @ignore 
 */
window.addEventListener("load", function(){
	asl.prv.trackDOMInputs();
}, false);

window.addEventListener("unload", function(){
    if (asl.prv.quit){
        asl.fn.store.remove('title');
        return;
    }
    asl.fn.store.save('title', title.toString());
}, false);

//TODO: THIS IS ONLY FIX FOR DESKTOP: define keypress only when keyCapture is not available e.g. not RhoElements
window.addEventListener("keypress", function(e){
	generic.Log('enter is presed', 1);
	try{
		if(!keyCapture){
			//enter
			if(e.keyCode == 13){
				var params = {};
				asl.prv.message(asl.msgs.types.minimize, params);
			}
		}
	}
	catch(ex){
		//enter
		if(e.keyCode == 13){
			var params = {};
			
			asl.prv.message(asl.msgs.types.minimize, params);
		}
	}
}, false);

window.addEventListener("click", function(e){
	asl.prv.resetTimer();
}, false);

document.addEventListener("DOMNodeInserted", function(){
	asl.prv.trackDOMInputs();
});

/**
 * Subscribe for the Focus event
 */
asl.events.subscribe(asl.events.types.focus, function() {
    asl.prv.resetTimer();
    try {
        //Scanner
        if(asl.prv.scannerWasEnabled) {
            scanner.enable();
        }
        
        for(var i in scanner.getChangedProperties()) {
            scanner[i] = scanner[i];
        }
        
        //SignatureCapture
        for(var i in signatureCapture) {
            if( typeof signatureCapture[i] != 'function' && (i.toLowerCase() != 'visibility') ) {
                //we reassign the object propeties, or we can assign them to the asl.prv.signatureCapture object
                signatureCapture[i] = signatureCapture[i];
            }
        }
        
        //reassign the last state of the signatureCapture before the focusOut event
        if(asl.prv.signatureCaptureWasVisible) {
            signatureCapture.visibility = 'visible';
        }
        
        if(asl.prv.signalWasVisible) {
            signal.visibility = 'Visible';

			for(var i in signal) {
	            if( typeof signal[i] != 'function' && (i.toLowerCase() != 'visibility') && (i.toLowerCase() != 'signalEvent') ) {
	                //we reassign the object propeties, or we can assign them to the asl.prv.signal object
	                signal[i] = signal[i];
	            }
	        }
        }

        //AudioCapture
        for(var i in audioCapture) {
            if( typeof audioCapture[i] != 'function' ) {
                //we reassign the object propeties, or we can assign them to the asl.prv.audioCapture object
                audioCapture[i] = audioCapture[i];
            }
        }
    } catch(e) {}
});

asl.events.subscribe(asl.events.types.focusOut, function() {
	asl.prv.stopTimer();
    try {
        //if the scanner was enabled we disabled it and save the last state
        if(asl.prv.scannerWasEnabled) {
            //scanner.disable();
            asl.prv.scannerWasEnabled = true;
        }
        
        //hide the signatureCapture if it's visible
        //we don't change the overwrited object, because on focus we have to set the signatureCapture to the last state
        if(asl.prv.signatureCaptureWasVisible) {
            signatureCapture.visibility = 'hidden';
            asl.prv.signatureCaptureWasVisible = true;
        }

        if(asl.prv.signalWasVisible) {
            signal.visibility = 'Hidden';
			asl.prv.signalWasVisible = true
        }
        
        //cancel the audioCapture
        audioCapture.cancel();
    } catch(e) {}
});

asl.events.subscribe(asl.events.types.signal, function(data) {
	if(data.type == 'lost'){
		asl.events.fire(asl.events.types.signalLost);
	}
	
	if(data.type == 'restored'){
		asl.events.fire(asl.events.types.signalRestored);
	}

	if(signal.signalEvent){
		if(window[signal.signalEvent] && typeof window[signal.signalEvent] === 'function')
			window[signal.signalEvent](data.json);
	}
});

asl.events.subscribe(asl.events.types.loaded, function(data) {
    try {
        //Only send message to disable the scanner, without changing the asl.prv.scannerEnabled
        //@FIXME When we are enabling the scanner directly(witout user iteraction), the loaded event is fired after this and stop the scanner
        //scanner.disable();
        
        //parse the EMML tags
        var elements = document.getElementsByTagName('meta');
        for(var i = 0, length = elements.length; i < length; i++) {
            generic.InvokeMETAFunction(elements[i].getAttribute('http-equiv'), elements[i].getAttribute('content'));	
        }
    } catch(e) {}

    asl.prv.resetTimer();
    asl.prv.execMsgStack();
    asl.prv.parseEMML();
});

asl.prv.parseEMML = function(){
	//parse the EMML tags
    var elements = document.getElementsByTagName('meta');
    for(var i = 0, length = elements.length; i < length; i++) {
        try{
			generic.InvokeMETAFunction(elements[i].getAttribute('http-equiv'), elements[i].getAttribute('content'));
		}
		catch(e){}
    }
};

String.prototype.count = function (srch) {
    return this.split(srch).length - 1;
};

var _alert = window.alert, _confirm = window.confirm;
var _ = {};
(function() {
    var resolution = window.innerWidth + 'x' + window.innerHeight;
    var result = false, callback = null;
    var style = {
        '320x240': {
            container: 'position: absolute;top: 0;bottom: 0;width: 100%;z-index: 9999;display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center; font-family: Tahoma; background: rgba(0, 0, 0, 0.5);',
            boxWrapper: 'width: 306px;height: 226px;padding: 0 8px 8px 7px;-webkit-box-sizing: border-box;border-top: 2px solid white;border-left: 2px solid white;border-right: 2px solid black;border-bottom: 2px solid black;border-radius: 5px;background: #6D6F72;',
            box: 'display: -webkit-box;width: 100%;height: 100%;-webkit-box-orient: vertical;text-align: center',
            messageContainer: 'display: -webkit-box;-webkit-box-flex: 1;-webkit-box-orient: vertical',
            topLabel: 'display: -webkit-box;-webkit-box-pack: center;padding: 10px;background: #eeeeee;font-size: 18px;font-weight: bold; margin: 7px 0;border-radius: 3px;',
            messageWrapper: 'display: -webkit-box;-webkit-box-flex: 1;font-size: 14px;font-weight: bold;-webkit-box-align: center;-webkit-box-pack: center;overflow: hidden',
            message: 'display: block; color: #fff;',
            bottom: 'display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center',
            buttonContainer: 'display: -webkit-box;-webkit-box-align: center;-webkit-box-pack: center; width: 50%;',
            button: 'border: 3px solid black;border-radius: 6px;display: -webkit-box;padding: 2px;-webkit-box-flex: 1;height: 50px;-webkit-box-sizing: border-box;background: white;',
            span: 'border: 1px solid #000;border-radius: 3px;display: block;line-height: 38px;padding: 0 5px;font-size: 18px;font-weight: bold;-webkit-box-flex: 1;text-align: center;overflow: hidden;text-overflow: ellipsis;',
            buttonFalse: '#ffffff',
            spanFalse: '0 none'
        }
    }    
    
    //Create the DOM elements
    var container = document.createElement('div');

    container.style.cssText = style[resolution].container;
    
    var boxWrapper = document.createElement('div');
    boxWrapper.style.cssText = style[resolution].boxWrapper;
    
    var box = document.createElement('div');
    box.style.cssText = style[resolution].box;
    
    var messageContainer = document.createElement('div');
    messageContainer.style.cssText = style[resolution].messageContainer;
    
    var topLabel = document.createElement('span');
    topLabel.innerText = res[asl.prv._locale].AlertTitle;
    topLabel.style.cssText = style[resolution].topLabel;
    
    var messageWrapper = document.createElement('div');
    messageWrapper.style.cssText = style[resolution].messageWrapper;
    
    var message = document.createElement('span');
    message.style.cssText = style[resolution].message;
    
    messageWrapper.appendChild(message);
    messageContainer.appendChild(topLabel);
    messageContainer.appendChild(messageWrapper);

    var bottom = document.createElement('div');
    bottom.style.cssText = style[resolution].bottom;

    var buttonTrueContainer = document.createElement('div');
    buttonTrueContainer.style.cssText = style[resolution].buttonContainer;
    
    var buttonTrue = document.createElement('a');
    buttonTrue.className = 'btn';

    buttonTrue.addEventListener('click', function() {
       result = true; 
       hideWindow(); 
    });
    buttonTrue.style.cssText = style[resolution].button;

    var spanTrue = document.createElement('span');
    spanTrue.innerText = res[asl.prv._locale].AlertOK;
    spanTrue.style.cssText = style[resolution].span;

    buttonTrue.appendChild(spanTrue);
    buttonTrueContainer.appendChild(buttonTrue);

    var buttonFalseContainer = document.createElement('div');
    buttonFalseContainer.style.cssText = style[resolution].buttonContainer;
    
    var buttonFalse = document.createElement('a');
    buttonFalse.className = 'btn';
    buttonFalse.addEventListener('click', function() {
       result = false;
       hideWindow(); 
    });
    buttonFalse.style.cssText = style[resolution].button;
    buttonFalse.style['background'] = style[resolution].buttonFalse;

    var spanFalse = document.createElement('span');
    spanFalse.innerText = res[asl.prv._locale].ConfirmCancel;
    spanFalse.style.cssText = style[resolution].span;
    spanFalse.style.border = style[resolution].spanFalse;

    buttonFalse.appendChild(spanFalse);
    buttonFalseContainer.appendChild(buttonFalse);
    
    bottom.appendChild(buttonTrueContainer);
    bottom.appendChild(buttonFalseContainer);
    
    box.appendChild(messageContainer);
    box.appendChild(bottom);
    boxWrapper.appendChild(box);
    container.appendChild(boxWrapper);
    
    //Private methods
    var showWindow = function(string) {
        message.innerHTML = string;
        
        document.body.appendChild(container);
    };

    var hideWindow = function() {
        document.body.removeChild(container);

        callback(result);
    };
    
    window.alert = _.alert = function(string, clb) {
        callback = clb || function(){};
        buttonFalseContainer.style.display = 'none';
        buttonTrueContainer.style.removeProperty('-webkit-box-flex');
		if(res[asl.prv._locale] && res[asl.prv._locale].AlertTitle)	
        	topLabel.innerText = res[asl.prv._locale].AlertTitle;

		if(res[asl.prv._locale] && res[asl.prv._locale].AlertOK)	
			spanTrue.innerText = res[asl.prv._locale].AlertOK;
        showWindow(string);
    };

    window.confirm = _.confirm = function(string, clb) {
        callback = clb || function(){};
        buttonFalseContainer.style.display = '-webkit-box';
        buttonFalseContainer.style['-webkit-box-flex'] = '1';
        buttonFalseContainer.style['margin-left'] = '10px';
        buttonTrueContainer.style['-webkit-box-flex'] = '1';
		if(res[asl.prv._locale] && res[asl.prv._locale].ConfirmTitle)
        	topLabel.innerText = res[asl.prv._locale].ConfirmTitle;

		if(res[asl.prv._locale] && res[asl.prv._locale].ConfirmOK)
			spanTrue.innerText = res[asl.prv._locale].ConfirmOK;
		
		if(res[asl.prv._locale] && res[asl.prv._locale].ConfirmCancel)	
			spanFalse.innerText = res[asl.prv._locale].ConfirmCancel;		
        showWindow(string);
    };
})();

/**
 * @description title object
 * @type {Object}
 */
var title = {};

title.isShowed = true;

/**
 * @description title back object that holds callback and icon
 * @type {Object}
 */
title.back = {};

/**
 * @description url or base64 of image
 * @type {String}
 */
title.back.icon = {
    '320x240': 'data:image/png;base64,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'
};

title.icon_sep = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABFCAYAAABg6zfwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTUxNDc5RjA5RjNDMTFFMTkxMzlDQkYzOTIxNDFFNEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTUxNDc5RjE5RjNDMTFFMTkxMzlDQkYzOTIxNDFFNEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNTE0NzlFRTlGM0MxMUUxOTEzOUNCRjM5MjE0MUU0RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNTE0NzlFRjlGM0MxMUUxOTEzOUNCRjM5MjE0MUU0RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PifmOLwAAAAiSURBVHjaYmZgYJjx//9/BiYggxGEQQwwGGWMMqjLAAgwAFAOBCO61OqEAAAAAElFTkSuQmCC';

title.option_icon = {
    '320x240': 'data:image/png;base64,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'
};

/**
 * @description all css styles for titles elements
 * @type {Object}
 */
title.css = {
    '320x240': {
        body: {
            position: "absolute",
            top: "0",
            bottom: '0',
            overflow : "visible",
            "-webkit-box-sizing": "border-box",
            margin: "0",
            "float": "left",
            width: "100%"
        },
        container: {
            position: "relative",
            height: "40px",
            top: "0",
            right: "0",
            left: "0",
            "z-index": "9999"
        },
        titlepanel: {
            display: "-webkit-box",
            height: '100%',
            "-webkit-box-flex": "1",
            "-webkit-box-orient": "horizontal",
            'font-family': 'Tahoma',
            background: "#000000"
        },
        backButtonWrap: {
            "-webkit-box-flex": "1",
            display: "-webkit-box",
            "-webkit-box-pack": "start",
            "-webkit-box-align": "center",
            position: "relative",
            "z-index": "1"
        },
        backButton: {
            display: "none",
            "width": "45px",
            height: "40px",
            background: 'url("' + title.back.icon['320x240'] + '") left top no-repeat' 
        },
        optionsButtonWrap: {
            "-webkit-box-flex": "1",
            display: "-webkit-box",
            "-webkit-box-pack": "end",
            "-webkit-box-align": "center",
            position: "relative",
            "z-index": "1"      
        },
        optionsButton: {
            display: "none",
            "width": "45px",
            height: "40px",
            background: 'url("' + title.option_icon['320x240'] + '") left top no-repeat'
        },
        topLabelWrap:{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            display: "-webkit-box",
            "-webkit-box-pack": "center",
            "-webkit-box-align": "center",
            'font-size': '18px',
            'font-weight': 'bold',
            color: '#ffffff'
        },
		topLabel:{
			"text-overflow" : 'ellipsis',
			width : '230px',
			overflow:'hidden',
			"white-space":'nowrap',
			"text-align":'center'
		}
    }
}; 

/**
 * @description back callback object holds date (function or link in string format) and type (function/string)
 * @type {Ovject}
 */
title.back.callback = {
	data: '',
	type: null
};

/**
 * @description title label text
 * @type {String}
 */
title.text = "";

/**
 * @description array of all option objects
 * @type {Array}
 */
title.options = null;

/**
 * @description holds all DOM elements for title
 * @type {Object}
 */
title.elements = {};

title.show = function() {
    this.elements.container.style.setProperty('display', 'block')
};

/**
 * @function
 * @description set style for DOM element by name in title.elements or object and particular style
 * @param {String|Object} elname name of element in title.elements or DOM Element
 * @param {Object} [style] particular style object
 * @return DOM Element
 */
title.setStyle = function(elname, style){
	var el,style;
	if (elname instanceof Object){
		el = elname;
		style = style;
	}else {
		style = this.css[asl.prv.resolution][elname];
		el = this.elements[elname];
	}

	for (var i in style)
		el.style[i] = style[i];
	return el;
};

title.removeStyle = function(elname, style) {
	return options.removeStyle.call(this, elname, style);
};

/**
 * @function
 * @description update Label text
 * @param {String} text new Label text
 * @return void
 */
title.setText = function(text){
	this.text = text;
	this.elements.topLabel.innerHTML = this.text;
};

/**
 * @function
 * @description update back button options(callback and image)
 * @param {Object} callback callback object contain function/url and type
 * @param {String} img base64/url of image
 * @return void
 */
title.setBack = function(callback, img){
	if (callback == null){
		this.back.callback.data = null;
	} else {
		this.back.callback = callback;
	}
    
	if (!this.back.callback.data) {
		this.elements.backButton.style.display = "none";
	}
	else {
	    if(!title.isShowed) {
	        title.show();
	    }
		this.elements.backButton.style.display = "block";
	}

	if (img){
	    this.back.icon[asl.prv.resolution] = img;
	    this.css[asl.prv.resolution].backButton.background = 'url("' + img + '") left top no-repeat'
		this.elements.backButton.style.background = 'url(' + img + ') left top no-repeat';
	}
};

/**
 * @function
 * @description update options and options button
 * @param {Array} opt options array
 * @return void
 */
title.setOptions = function(opt){
	this.options = opt;
	if (this.options.length <= 0) {
		this.elements.optionsButton.style.display = "none";
	}
	else {
		this.elements.optionsButton.style.display = "block";
	}
	
	options.elements.pagingCount.innerText = '1/' + Math.ceil(this.options.length / asl.prv.listItemsByPage);
	options.list.paging = {};
	options.list.paging.info = {
		currentPage: 1,
		totalCount: (this.options.length > 0) ? this.options.length : 1,
		perPage: asl.prv.listItemsByPage,
		options: this.options
	};
	
	for(var i = 0, length = (this.options.length > asl.prv.listItemsByPage) ? asl.prv.listItemsByPage : this.options.length; i < length; i++) {
		options.elements.items[i].firstChild.innerText = options.list.paging.info.options[i].title;
		if(options.list.paging.info.options[i].type == 'radio'){
			if (options.list.paging.info.options[i].checked)
				this.setStyle(options.elements.items[i].firstChild, options.css[asl.prv.resolution].radioOn);
			else
				this.setStyle(options.elements.items[i].firstChild, options.css[asl.prv.resolution].radioOff);
		}else {
			this.removeStyle(options.elements.items[i].firstChild, options.css[asl.prv.resolution].radioOn);
		}
		options.elements.items[i]['data-id'] = i;
		options.elements.items[i].style.removeProperty('visibility');
	}

	if(i < asl.prv.listItemsByPage) {
		for(i; i < asl.prv.listItemsByPage; i++) {
			options.elements.items[i].style.setProperty('visibility', 'hidden');
		}
	}
	
	if( options.list.paging &&  (options.list.paging.info.currentPage == Math.ceil(options.list.paging.info.totalCount / asl.prv.listItemsByPage)) ) {
        options.elements.pagingBottom.style.background = 'url("' + options.icons[asl.prv.resolution].down.disabled + '") left top no-repeat';
    }
};

/**
 * @function
 * @description open Options window
 * @return void
 */
title.openOptions = function(){
	options.show();
};

/**
 * @function
 * @description load title information from string provided by localStorage
 * @param {String} text json object in string format
 * @return void
 */
title.load = function(text){
	if (!text){
        this.setOptions(this.options ? this.options : []);
        return;
    }

	var json = JSON.parse(text);

	if (json.back.callback.data != '' && this.back.callback.data == '') {
		this.back.callback = json.back.callback && json.back.callback.data != this.back.callback.data ? json.back.callback : this.back.callback;
		this.back.icon[asl.prv.resolution] = json.back.img && json.back.img != this.back.icon[asl.prv.resolution] ? json.back.img : this.back.icon[asl.prv.resolution];
		this.setBack(this.back.callback, this.back.icon[asl.prv.resolution]);
	}
	if (json.title && !this.text){
		this.setText(this.text = json.title);
	}
	
	if (!this.options && json.options && json.options.length > 0){
		this.setOptions(json.options);
	}else {
        this.setOptions(this.options ? this.options : []);
    }
};

/**
 * @function
 * @description create clean title object and prepare string that will be saved in localStorage
 * @return {String}
 */
title.toString = function(){
	var result = {
		back: {
			callback: this.back.callback,
			img: this.back.icon[asl.prv.resolution]
		},
		title: this.text,
		options: this.options
	};
	
	return JSON.stringify(result);
};

/**
 * @function 
 * @description redesing the title bar, called when we have differences between the window dimensions and the one received from the sys 
 */
title.reDesign = function() {
    this.setStyle('optionsButtonWrap');
    this.setStyle('optionsButton');
    this.setStyle('topLabelWrap');
    this.setStyle('topLabel');
    this.setStyle('backButton');
    this.setStyle('backButtonWrap');
    this.setStyle('titlepanel');
    this.setStyle('container');
    
    if (this.back.callback.data)
        this.elements.backButton.style.display = "block";
    
    if (this.options && this.options.length > 0)
        this.elements.optionsButton.style.display = "block";

    title.setStyle(document.body, this.css[asl.prv.resolution].body);
    title.setStyle(document.getElementsByTagName('html')[0], this.css[asl.prv.resolution].html);
};

/**
 * @function
 * @description prepare all DOM Elements and add Event Listeners
 * @return void
 */
title.create = function(){
	this.elements.container = document.createElement('div');
	this.elements.titlepanel = document.createElement('div');
	this.elements.backButtonWrap = document.createElement('div');
	this.elements.backButton = document.createElement('a');
	this.elements.backButton.className = 'btn';
	this.elements.topLabelWrap = document.createElement('div');
	this.elements.topLabel = document.createElement('div');
	this.elements.optionsButtonWrap = document.createElement('div');
	this.elements.optionsButton = document.createElement('a');
	this.elements.optionsButton.className = 'btn';

	this.elements.backButton.addEventListener('click', function(){
		asl.prv.back(title.back.callback);
	}, false);
	this.elements.optionsButton.addEventListener('click', function(){
		if (title.options.length > 0)
			title.openOptions();
	}, false);
};

/**
 * @function
 * @description insert all DOM Elements in document.body and set Styles
 * @return void
 */
title.init = function(){
	this.setStyle('optionsButtonWrap').appendChild(this.setStyle('optionsButton'));
	this.setStyle('topLabelWrap').appendChild(this.setStyle('topLabel'));
	this.setStyle('backButton');
	this.setStyle('backButtonWrap').appendChild(this.elements.backButton);
	this.setStyle('titlepanel').appendChild(this.elements.backButtonWrap);
	this.elements.titlepanel.appendChild(this.elements.topLabelWrap);
	this.elements.titlepanel.appendChild(this.elements.optionsButtonWrap);
	this.setStyle('container').appendChild(this.elements.titlepanel);
	this.setStyle('topLabel');
	
	if( !this.back.callback.data && !this.options && !this.text ) {
	    this.isShowed = false;
	    this.elements.container.style.setProperty('display', 'none');
	}

	if (this.back.callback.data)
		this.elements.backButton.style.display = "block";
    
	if (this.options && this.options.length > 0) {
		this.elements.optionsButton.style.display = "block";
    }
	
	title.setStyle(document.body, this.css[asl.prv.resolution].body).insertBefore(this.elements.container, document.body.childNodes[0]);
	title.setStyle(document.getElementsByTagName('html')[0], this.css[asl.prv.resolution].html);
};

/**
 * @description create options object
 * @type {Object}
 */
var options = {};

/**
 * @description object that hold all option icons
 * @type {Object}
 */
options.icons = {
    '320x240' : {
        up: {
            enabled: 'data:image/png;base64,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',
            disabled: 'data:image/png;base64,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'
        },
        down: {
            enabled: 'data:image/png;base64,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',
            disabled: 'data:image/png;base64,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'
        },
        radio: {
            on: "data:image/png;base64,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",
            off: "data:image/png;base64,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"
        }
    }
};

/**
 * @description options Css Styles
 * @type {Object}
 */
options.css = {
    '320x240': {
        container: {
            position: "fixed",
            bottom: "0",
            top: "0",
            right: "0",
            left: "0",
            "z-index": "9999",
            display: 'none'
        },
        titlepanel: {
            display: "-webkit-box",
            "-webkit-box-flex": "1",
            "-webkit-box-orient": "horizontal",
            'font-family': 'Tahoma',
            background: "#000000",
            position: 'relative'
        },
        bottomContainer: {
            display: '-webkit-box',
            position: 'absolute',
            top: '40px',
            bottom: '0',
            width: '100%'
        },
        listContainer: {
            display: '-webkit-box',
            '-webkit-box-flex': '1',
            height: '100%'
        },
        item: {
            display: '-webkit-box',
            "-webkit-box-align": "center",
            '-webkit-box-sizing': 'border-box',
            height: "25%",
            padding: "0 10px",
            "border-bottom": "1px solid #040707",
            'font-family': 'Tahoma',
            "font-size": "18px",
            "font-weight": "bold",
            color: "#000000"
        },
        itemSpan: {
            display: 'block',
            width: '100%',
            overflow: 'hidden',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap'
        },
        paging: {
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            "-webkit-box-align": "center",
            "-webkit-box-pack": "justify",
            width: "59px",
            padding: "10px 0",
            'border-left': '1px solid #000000',
            background: '#eeeeee'
        },
        pagingCount: {
            'font-family': 'Tahoma',
            'font-size': '14px',
            'font-weight': 'bold'
        },
        pagingTop: {
            display: "block",
            height: "80px",
            width: "45px",
            background: "url(" + options.icons['320x240'].up.disabled + ") left top no-repeat"
        },
        pagingBottom: {
            display: "block",
            height: "80px",
            width: "45px",
            background: "url(" + options.icons['320x240'].down.enabled + ") left top no-repeat"
        },
        list: {
            margin: "0",
            padding: "0",
            width: "100%",
            height: '100%',
            background: '#ffffff'
        },
        radioOff: {
            "padding-left": "40px",
            background: "url(" + options.icons['320x240'].radio.off + ") 0 50% no-repeat"
        },
        radioOn: {
            "padding-left": "40px",
            background: "url(" + options.icons['320x240'].radio.on + ") 0 50% no-repeat"
        }
    }
};

/**
 * @description hold options title Label
 * @type {String}
 * @default 'Options'
 */
options.text = res[asl.prv._locale].Options;

/**
 * @function
 * @description call title.setStyle function
 * @return DOM Element
 */
options.setStyle = function(elname, style){
	return title.setStyle.call(this, elname, style);
};

options.removeStyle = function(elname, style){
	var el = elname instanceof Object ? elname : this.elements[elname];

	for (var i in style)
		el.style.removeProperty(i);
	return el;
};

/**
 * @description hold all options DOM Elements
 * @type {Object}
 */
options.elements = {};

/**
 * @description hold information about list and pages
 * @type {Object}
 */
options.list = {};

/**
 * @function
 * @description show prev option page
 * @return void
 */
options.pageUp = function(){
	if(this.list.paging.info.currentPage - 1 > 0){
		this.list.paging.info.currentPage--;
		
		if(this.list.paging.info.currentPage == 1) {
		    this.elements.pagingTop.style.background = 'url("' + options.icons[asl.prv.resolution].up.disabled + '") left top no-repeat';
		}
		
		if( (this.list.paging.info.currentPage + 1) == Math.ceil(this.list.paging.info.totalCount / asl.prv.listItemsByPage)) {
            this.elements.pagingBottom.style.background = 'url("' + options.icons[asl.prv.resolution].down.enabled + '") left top no-repeat';
        }
	}
	else{
		return;
	}

	var start = (this.list.paging.info.currentPage - 1) * asl.prv.listItemsByPage;
	var end = this.list.paging.info.currentPage * asl.prv.listItemsByPage > this.list.paging.info.totalCount ? this.list.paging.info.totalCount : this.list.paging.info.currentPage * asl.prv.listItemsByPage;
	for(var i = start; i < end; i++ ){
		this.elements.items[i - start].firstChild.innerText = this.list.paging.info.options[i].title;
		if(this.list.paging.info.options[i].type == 'radio'){
			if (this.list.paging.info.options[i].checked)
				this.setStyle(options.elements.items[i - start].firstChild, this.css[asl.prv.resolution].radioOn);
			else
				this.setStyle(options.elements.items[i - start].firstChild, this.css[asl.prv.resolution].radioOff);
		}else {
			this.removeStyle(options.elements.items[i - start].firstChild, this.css[asl.prv.resolution].radioOn);
		}
		this.elements.items[i - start]['data-id'] = i;
	}

	for(var i = 0; i <= (asl.prv.listItemsByPage - 1); i++){
		this.elements.items[i].style.setProperty('visibility', 'visible');
	}

	this.elements.pagingCount.innerText = this.list.paging.info.currentPage + '/' + Math.ceil(this.list.paging.info.totalCount / asl.prv.listItemsByPage);
};
/**
 * @function
 * @description show next option page
 * @return void
 */
options.pageDown = function(){
	if(this.list.paging.info.currentPage + 1 <= Math.ceil(this.list.paging.info.totalCount / asl.prv.listItemsByPage)){
		this.list.paging.info.currentPage++;
		
		if(this.list.paging.info.currentPage == Math.ceil(this.list.paging.info.totalCount / asl.prv.listItemsByPage)) {
            this.elements.pagingBottom.style.background = 'url("' + options.icons[asl.prv.resolution].down.disabled + '") left top no-repeat';
        }
        
        if(this.list.paging.info.currentPage == 2) {
            this.elements.pagingTop.style.background = 'url("' + options.icons[asl.prv.resolution].up.enabled + '") left top no-repeat';
        } 
	}
	else{
		return;
	}

	var start = (this.list.paging.info.currentPage - 1) * asl.prv.listItemsByPage;
	var end = this.list.paging.info.currentPage * asl.prv.listItemsByPage > this.list.paging.info.totalCount ? this.list.paging.info.totalCount : this.list.paging.info.currentPage*asl.prv.listItemsByPage;
	for(var i = start + 1; i <= end; i++ ){
		this.elements.items[i - start - 1].firstChild.innerText = this.list.paging.info.options[i - 1].title;
		if(this.list.paging.info.options[i - 1].type == 'radio'){
			if (this.list.paging.info.options[i - 1].checked)
				this.setStyle(options.elements.items[i - start-1].firstChild, this.css[asl.prv.resolution].radioOn);
			else
				this.setStyle(options.elements.items[i - start-1].firstChild, this.css[asl.prv.resolution].radioOff);
		}else {
			this.removeStyle(options.elements.items[i - start-1].firstChild, this.css[asl.prv.resolution].radioOn);
		}
		this.elements.items[i - start - 1]['data-id'] = i - 1;
	}

	if(end - start + 1 < asl.prv.listItemsByPage){
		for(var i = end + 1; i <= Math.ceil(this.list.paging.info.totalCount / asl.prv.listItemsByPage) * asl.prv.listItemsByPage; i++ ){
			this.elements.items[i - start - 1].style.setProperty('visibility', 'hidden');
		}
	}

	this.elements.pagingCount.innerText = this.list.paging.info.currentPage + '/' + Math.ceil(this.list.paging.info.totalCount / asl.prv.listItemsByPage);
};

/**
 * @function
 * @description show options window
 * @return void
 */
options.show = function(){
	this.elements.container.style.display = "block";
};

/**
 * @function
 * @description hide options window
 * @return void
 */
options.hide = function(){
	this.elements.container.style.display = "none";
};

/**
 * @function
 * @description prepare all DOM Elements
 * @return void
 */
options.create = function(){
	this.elements.container = document.createElement('div');
	this.elements.titlepanel = document.createElement('div');
	this.elements.bottomContainer = document.createElement('div');

	this.elements.backButtonWrap = document.createElement('div');
	this.elements.backButton = document.createElement('a');
	this.elements.backButton.className = 'btn';
	//this.elements.backButtonIcon = document.createElement('img');
	this.elements.topLabelWrap = document.createElement('div');
	this.elements.topLabel = document.createElement('div');

	this.elements.listContainer = document.createElement('div');
	this.elements.list = document.createElement('ul');
	this.elements.paging = document.createElement('div');
	this.elements.pagingTop = document.createElement('a');
	this.elements.pagingBottom = document.createElement('a');
	this.elements.pagingCount = document.createElement('span');

	this.elements.items = [];

	for (var i = 0; i < asl.prv.listItemsByPage; i++){
		this.elements.items[i] = document.createElement('li');
		this.elements.items[i].className = 'btn';
		var span = document.createElement('span');
		this.elements.items[i].appendChild(span);
		
		this.elements.items[i].addEventListener('click', function(){

			if (options.list.paging.info.options[this['data-id']].type != 'radio'){
				asl.prv.options({exec : options.list.paging.info.options[this['data-id']].callback, arrguments: [options.list.paging.info.options[this['data-id']].title]});
				options.hide();
				return;
			}

			if (options.list.paging.info.options[this['data-id']].checked = !options.list.paging.info.options[this['data-id']].checked)
				options.setStyle(this.firstChild, options.css[asl.prv.resolution].radioOn);
			else
				options.setStyle(this.firstChild, options.css[asl.prv.resolution].radioOff);

			asl.prv.options({exec : options.list.paging.info.options[this['data-id']].callback, arrguments: [options.list.paging.info.options[this['data-id']].title, options.list.paging.info.options[this['data-id']].checked]});

		}, false);
	}
};

/**
 * @function
 * @description insert all DOM Elements in document.body ,set Styles and add Event Listeners
 * @return void
 */
options.init = function(){
	this.elements.listContainer.appendChild(this.setStyle('list'));

	this.elements.paging.appendChild(this.setStyle('pagingTop'));
	this.elements.paging.appendChild(this.setStyle('pagingCount'));
	this.elements.paging.appendChild(this.setStyle('pagingBottom'));

    var titleCss = title.css[asl.prv.resolution];

	this.elements.titlepanel.appendChild(this.setStyle(this.elements.backButtonWrap, titleCss.backButtonWrap));
	this.elements.backButtonWrap.appendChild(this.setStyle(this.elements.backButton, titleCss.backButton));
	//this.elements.backButton.appendChild(this.elements.backButtonIcon);
	this.elements.backButton.style.display = 'block';

	this.elements.titlepanel.appendChild(this.setStyle(this.elements.topLabelWrap, titleCss.topLabelWrap));
	this.elements.topLabelWrap.appendChild(this.setStyle(this.elements.topLabel, titleCss.topLabel));

    this.elements.bottomContainer.appendChild(this.setStyle('listContainer'));
    this.elements.bottomContainer.appendChild(this.setStyle('paging'));

	this.elements.container.appendChild(this.setStyle('titlepanel'));
	this.elements.container.appendChild(this.setStyle('bottomContainer'));
	this.setStyle('pagingCount');

	this.elements.topLabel.innerText = options.text;

	//this.elements.backButtonIcon.src = title.back.icon[asl.prv.resolution];

	this.elements.backButton.addEventListener('click', function(){
		options.hide();
	}, false);

	this.elements.pagingTop.addEventListener('click', function(){
		options.pageUp();
	},false);

	this.elements.pagingBottom.addEventListener('click', function(){
		options.pageDown();
	},false);

	for (var i = 0; i < this.elements.items.length; i++){
		this.elements.list.appendChild(this.setStyle(this.elements.items[i], options.css[asl.prv.resolution].item));
		
		for(var j in options.css[asl.prv.resolution].itemSpan) {
            this.elements.items[i].childNodes[0].style[j] = options.css[asl.prv.resolution].itemSpan[j];
        }
	}
	
	document.body.appendChild(this.setStyle('container'));
};

//options.create();

title.create();

document.addEventListener('DOMContentLoaded', function(){
	title.init();
}, false);

