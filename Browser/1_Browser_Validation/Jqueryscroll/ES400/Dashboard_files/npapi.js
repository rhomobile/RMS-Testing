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
            _scanner.enable();
        },
        /**
         * Disables the currently enabled scanner. This reverts the scanner to its default state and flushes any current decoder settings.
         */
        disable : function() {
            asl.prv.scannerWasEnabled = false;
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
            _generic.Log(param, flag);
        },
        LaunchProcess : function(fileName, commandline) {
            _generic.LaunchProcess(fileName, commandline);
        },
        LaunchProcessNonBlocking : function(fileName, commandline) {
            _generic.LaunchProcessNonBlocking(fileName, commandline);
        },
        CloseProcess : function(param) {
            _generic.CloseProcess(param);
        },
        GetProcessExitCode : function(param) {
            _generic.GetProcessExitCode(param);
        },
        WaitProcess : function(param, timeout) {
            _generic.WaitProcess(param, timeout);
        },
        SetRegistrySetting : function(hive, type, key, subkey, setting) {
            _generic.SetRegistrySetting(hive, type, key, subkey, setting);
        },
        GetRegistrySetting : function(hive, subkey, setting) {
            _generic.GetRegistrySetting(hive, subkey, setting);
        },
        PlayWave : function(filename, flags) {
            _generic.PlayWave(filename, flags);
        },
        ReadConfigSetting : function(setting, name) {
            _generic.ReadConfigSetting(setting, name);
        },
        WriteConfigSetting : function(setting, value, name) {
            _generic.WriteConfigSetting(setting, value, name);
        },
        ReadUserSetting : function(setting) {
            _generic.ReadUserSetting(setting);
        },
        WriteUserSetting : function(setting, value) {
            _generic.WriteUserSetting(setting, value);
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
    
    return obj;
})();