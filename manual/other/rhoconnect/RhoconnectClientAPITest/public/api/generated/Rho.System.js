
(function ($, rho, rhoUtil) {
    'use strict';

    var moduleNS = 'Rho.System';
    var apiReq = rhoUtil.apiReqFor(moduleNS);

    // === System class definition ===

    function System() {
        var id = null;
        this.getId = function () {return id;};

        if (1 == arguments.length && arguments[0][rhoUtil.rhoIdParam()]) {
            if (moduleNS != arguments[0][rhoUtil.rhoClassParam()]) {
                throw "Wrong class instantiation!";
            }
            id = arguments[0][rhoUtil.rhoIdParam()];
        } else {
            id = rhoUtil.nextId();
            // constructor methods are following:
            
        }
    };

    // === System instance properties ===

    

    // === System instance methods ===

    

    // === System constants ===

    
            System.PLATFORM_WM_CE = 'WINDOWS';
        
    
            System.PLATFORM_ANDROID = 'ANDROID';
        
    
            System.PLATFORM_IOS = 'APPLE';
        
    
            System.PLATFORM_WP8 = 'WP8';
        
    
            System.PLATFORM_WINDOWS_DESKTOP = 'WINDOWS_DESKTOP';
        
    
            System.SCREEN_PORTRAIT = 'portrait';
        
    
            System.SCREEN_LANDSCAPE = 'landscape';
        
    
            System.KEYBOARD_SHOWN = 'shown';
        
    
            System.KEYBOARD_HIDDEN = 'hidden';
        
    
            System.KEYBOARD_AUTOMATIC = 'automatic';
        
    

    // === System static properties ===

    
        
        
        System['getPlatform'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'platform',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getHasCamera'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasCamera',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getScreenWidth'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenWidth',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getScreenHeight'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenHeight',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getRealScreenWidth'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'realScreenWidth',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getRealScreenHeight'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'realScreenHeight',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getScreenOrientation'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenOrientation',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getPpiX'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'ppiX',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getPpiY'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'ppiY',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getPhoneNumber'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'phoneNumber',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getDeviceOwnerEmail'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'deviceOwnerEmail',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getDeviceOwnerName'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'deviceOwnerName',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getDevicePushId'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'devicePushId',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getPhoneId'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'phoneId',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getDeviceName'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'deviceName',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getOsVersion'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'osVersion',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getLocale'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'locale',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getCountry'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'country',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getIsEmulator'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'isEmulator',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getIsRhoSimulator'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'isRhoSimulator',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getHasCalendar'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasCalendar',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getIsMotorolaDevice'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'isMotorolaDevice',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getOemInfo'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'oemInfo',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getUuid'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'uuid',
                valueCallbackIndex: 0
            });
        };
        
    
        
        System['setApplicationIconBadge'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'applicationIconBadge=',
                valueCallbackIndex: 1
            });
        };
        
        
        System['getApplicationIconBadge'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'applicationIconBadge',
                valueCallbackIndex: 0
            });
        };
        
    
        
        System['setHttpProxyURI'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'httpProxyURI=',
                valueCallbackIndex: 1
            });
        };
        
        
        System['getHttpProxyURI'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'httpProxyURI',
                valueCallbackIndex: 0
            });
        };
        
    
        
        System['setLockWindowSize'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'lockWindowSize=',
                valueCallbackIndex: 1
            });
        };
        
        
        System['getLockWindowSize'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'lockWindowSize',
                valueCallbackIndex: 0
            });
        };
        
    
        
        System['setKeyboardState'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'keyboardState=',
                valueCallbackIndex: 1
            });
        };
        
        
        System['getKeyboardState'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'keyboardState',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getLocalServerPort'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'localServerPort',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getFreeServerPort'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'freeServerPort',
                valueCallbackIndex: 0
            });
        };
        
    
        
        System['setScreenAutoRotate'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenAutoRotate=',
                valueCallbackIndex: 1
            });
        };
        
        
        System['getScreenAutoRotate'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenAutoRotate',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getHasTouchscreen'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasTouchscreen',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getSecurityTokenNotPassed'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'securityTokenNotPassed',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getWebviewFramework'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'webviewFramework',
                valueCallbackIndex: 0
            });
        };
        
    
        
        System['setScreenSleeping'] = function(/* any valid value */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenSleeping=',
                valueCallbackIndex: 1
            });
        };
        
        
        System['getScreenSleeping'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenSleeping',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getHasNetwork'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasNetwork',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getHasWifiNetwork'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasWifiNetwork',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getHasCellNetwork'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasCellNetwork',
                valueCallbackIndex: 0
            });
        };
        
    
        
        
        System['getHasSqlite'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasSqlite',
                valueCallbackIndex: 0
            });
        };
        
    

    // === System static methods ===

    
        System['applicationInstall'] = function(/* const rho::String& */ applicationUrl, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'applicationInstall',
                
                valueCallbackIndex: 1
            });
        };
    
        System['isApplicationInstalled'] = function(/* const rho::String& */ applicationName, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'isApplicationInstalled',
                
                valueCallbackIndex: 1
            });
        };
    
        System['applicationUninstall'] = function(/* const rho::String& */ applicationName, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'applicationUninstall',
                
                valueCallbackIndex: 1
            });
        };
    
        System['getStartParams'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getStartParams',
                
                valueCallbackIndex: 0
            });
        };
    
        System['openUrl'] = function(/* const rho::String& */ url, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'openUrl',
                
                valueCallbackIndex: 1
            });
        };
    
        System['unzipFile'] = function(/* const rho::String& */ localPathToZip, /* const rho::String& */ password, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'unzipFile',
                
                valueCallbackIndex: 2
            });
        };
    
        System['zipFile'] = function(/* const rho::String& */ localPathToZip, /* const rho::String& */ localPathToFile, /* const rho::String& */ password, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'zipFile',
                
                valueCallbackIndex: 3
            });
        };
    
        System['zipFiles'] = function(/* const rho::String& */ localPathToZip, /* const rho::String& */ basePath, /* const rho::Vector<rho::String>& */ filePathsToZip, /* const rho::String& */ password, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'zipFiles',
                
                valueCallbackIndex: 4
            });
        };
    
        System['setRegistrySetting'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setRegistrySetting',
                
                valueCallbackIndex: 1
            });
        };
    
        System['getRegistrySetting'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getRegistrySetting',
                
                valueCallbackIndex: 1
            });
        };
    
        System['deleteRegistrySetting'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'deleteRegistrySetting',
                
                valueCallbackIndex: 1
            });
        };
    
        System['setWindowFrame'] = function(/* int */ x, /* int */ y, /* int */ width, /* int */ height, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setWindowFrame',
                
                valueCallbackIndex: 4
            });
        };
    
        System['setWindowPosition'] = function(/* int */ x, /* int */ y, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setWindowPosition',
                
                valueCallbackIndex: 2
            });
        };
    
        System['setWindowSize'] = function(/* int */ width, /* int */ height, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setWindowSize',
                
                valueCallbackIndex: 2
            });
        };
    
        System['bringToFront'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'bringToFront',
                
                valueCallbackIndex: 0
            });
        };
    
        System['replaceCurrentBundle'] = function(/* const rho::String& */ pathToBundle, /* const rho::Hashtable<rho::String, rho::String>& */ params, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'replaceCurrentBundle',
                
                valueCallbackIndex: 2
            });
        };
    
        System['deleteFolder'] = function(/* const rho::String& */ pathToFolder, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'deleteFolder',
                
                valueCallbackIndex: 1
            });
        };
    
        System['setDoNotBackupAttribute'] = function(/* const rho::String& */ pathToFile, /* bool */ doNotBackup, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setDoNotBackupAttribute',
                
                valueCallbackIndex: 2
            });
        };
    
        System['getProperty'] = function(/* const rho::String& */ propertyName, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getProperty',
                persistentCallbackIndex: 1,
                valueCallbackIndex: 3
            });
        };
    
        System['getProperties'] = function(/* const rho::Vector<rho::String>& */ arrayofNames, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getProperties',
                persistentCallbackIndex: 1,
                valueCallbackIndex: 3
            });
        };
    
        System['getAllProperties'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getAllProperties',
                persistentCallbackIndex: 0,
                valueCallbackIndex: 2
            });
        };
    
        System['setProperty'] = function(/* const rho::String& */ propertyName, /* const rho::String& */ propertyValue, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setProperty',
                
                valueCallbackIndex: 2
            });
        };
    
        System['setProperties'] = function(/* const rho::Hashtable<rho::String, rho::String>& */ propertyMap, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setProperties',
                
                valueCallbackIndex: 1
            });
        };
    
        System['clearAllProperties'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'clearAllProperties',
                
                valueCallbackIndex: 0
            });
        };
    

    // === System default instance support ===

    

    rhoUtil.namespace(moduleNS, System);

})(jQuery, Rho, Rho.util);
