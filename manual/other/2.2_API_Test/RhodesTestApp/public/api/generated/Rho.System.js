(function ($, rho, rhoUtil) {
    'use strict';

    var module = null;

    var apiReq = rhoUtil.apiReqFor('Rho.System');

    // === System class definition ===

    function System(id) {
        if (!(this instanceof System)) return new System(id);

        this.getId = function () {
            return id;
        };
    };

    // === System instance members ===

    

    // === System static members ===

    
            System.PLATFORM_WM_CE = 'WINDOWS';
        
    
            System.PLATFORM_ANDROID = 'ANDROID';
        
    
            System.PLATFORM_IOS = 'APPLE';
        
    
            System.PLATFORM_WP8 = 'WP8';
        
    
            System.PLATFORM_WINDOWS_DESKTOP = 'WINDOWS_DESKTOP';
        
    
            System.SCREEN_PORTRAIT = 'portrait';
        
    
            System.SCREEN_LANDSCAPE = 'landscape';
        
    

    
        System['platform'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'platform',
                valueCallbackIndex: 0
            });
        };
    
        System['hasCamera'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasCamera',
                valueCallbackIndex: 0
            });
        };
    
        System['screenWidth'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenWidth',
                valueCallbackIndex: 0
            });
        };
    
        System['screenHeight'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenHeight',
                valueCallbackIndex: 0
            });
        };
    
        System['realScreenWidth'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'realScreenWidth',
                valueCallbackIndex: 0
            });
        };
    
        System['realScreenHeight'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'realScreenHeight',
                valueCallbackIndex: 0
            });
        };
    
        System['screenOrientation'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenOrientation',
                valueCallbackIndex: 0
            });
        };
    
        System['ppiX'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'ppiX',
                valueCallbackIndex: 0
            });
        };
    
        System['ppiY'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'ppiY',
                valueCallbackIndex: 0
            });
        };
    
        System['phoneNumber'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'phoneNumber',
                valueCallbackIndex: 0
            });
        };
    
        System['deviceOwnerEmail'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'deviceOwnerEmail',
                valueCallbackIndex: 0
            });
        };
    
        System['deviceOwnerName'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'deviceOwnerName',
                valueCallbackIndex: 0
            });
        };
    
        System['devicePushId'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'devicePushId',
                valueCallbackIndex: 0
            });
        };
    
        System['phoneId'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'phoneId',
                valueCallbackIndex: 0
            });
        };
    
        System['deviceName'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'deviceName',
                valueCallbackIndex: 0
            });
        };
    
        System['osVersion'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'osVersion',
                valueCallbackIndex: 0
            });
        };
    
        System['locale'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'locale',
                valueCallbackIndex: 0
            });
        };
    
        System['country'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'country',
                valueCallbackIndex: 0
            });
        };
    
        System['isEmulator'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'isEmulator',
                valueCallbackIndex: 0
            });
        };
    
        System['hasCalendar'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasCalendar',
                valueCallbackIndex: 0
            });
        };
    
        System['isMotorolaDevice'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'isMotorolaDevice',
                valueCallbackIndex: 0
            });
        };
    
        System['oemInfo'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'oemInfo',
                valueCallbackIndex: 0
            });
        };
    
        System['uuid'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'uuid',
                valueCallbackIndex: 0
            });
        };
    
        System['applicationIconBadge'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'applicationIconBadge',
                valueCallbackIndex: 0
            });
        };
    
        System['applicationIconBadge='] = function(/* int */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'applicationIconBadge=',
                valueCallbackIndex: 1
            });
        };
    
        System['httpProxyURI'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'httpProxyURI',
                valueCallbackIndex: 0
            });
        };
    
        System['httpProxyURI='] = function(/* const rho::String& */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'httpProxyURI=',
                valueCallbackIndex: 1
            });
        };
    
        System['lockWindowSize'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'lockWindowSize',
                valueCallbackIndex: 0
            });
        };
    
        System['lockWindowSize='] = function(/* bool */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'lockWindowSize=',
                valueCallbackIndex: 1
            });
        };
    
        System['showKeyboard'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'showKeyboard',
                valueCallbackIndex: 0
            });
        };
    
        System['showKeyboard='] = function(/* bool */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'showKeyboard=',
                valueCallbackIndex: 1
            });
        };
    
        System['localServerPort'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'localServerPort',
                valueCallbackIndex: 0
            });
        };
    
        System['localServerPort='] = function(/* int */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'localServerPort=',
                valueCallbackIndex: 1
            });
        };
    
        System['freeServerPort'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'freeServerPort',
                valueCallbackIndex: 0
            });
        };
    
        System['screenAutoRotate'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenAutoRotate',
                valueCallbackIndex: 0
            });
        };
    
        System['screenAutoRotate='] = function(/* bool */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenAutoRotate=',
                valueCallbackIndex: 1
            });
        };
    
        System['hasTouchscreen'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasTouchscreen',
                valueCallbackIndex: 0
            });
        };
    
        System['securityTokenNotPassed'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'securityTokenNotPassed',
                valueCallbackIndex: 0
            });
        };
    
        System['webviewFramework'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'webviewFramework',
                valueCallbackIndex: 0
            });
        };
    
        System['screenSleeping'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenSleeping',
                valueCallbackIndex: 0
            });
        };
    
        System['screenSleeping='] = function(/* bool */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'screenSleeping=',
                valueCallbackIndex: 1
            });
        };
    
        System['hasNetwork'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasNetwork',
                valueCallbackIndex: 0
            });
        };
    
        System['hasWifiNetwork'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasWifiNetwork',
                valueCallbackIndex: 0
            });
        };
    
        System['hasCellNetwork'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasCellNetwork',
                valueCallbackIndex: 0
            });
        };
    
        System['hasSqlite'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'hasSqlite',
                valueCallbackIndex: 0
            });
        };
    
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
    
        System['setRegistrySetting'] = function(/* int */ hive, /* int */ type, /* const rho::String& */ subKey, /* const rho::String& */ setting, /* const rho::String& */ value, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setRegistrySetting',
                valueCallbackIndex: 5
            });
        };
    
        System['getRegistrySetting'] = function(/* int */ hive, /* const rho::String& */ subKey, /* const rho::String& */ setting, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getRegistrySetting',
                valueCallbackIndex: 3
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
    
        System['isBlobAttr'] = function(/* const rho::String& */ partition, /* int */ sourceID, /* const rho::String& */ attrName, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'isBlobAttr',
                valueCallbackIndex: 3
            });
        };
    
        System['updateBlobAttribs'] = function(/* const rho::String& */ partition, /* int */ sourceID, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'updateBlobAttribs',
                valueCallbackIndex: 2
            });
        };
    
        System['get_locale'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'get_locale',
                valueCallbackIndex: 0
            });
        };
    
        System['setPushNotification'] = function(/* const rho::String& */ url, /* const rho::String& */ url_params, /* const rho::String& */ push_client, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setPushNotification',
                valueCallbackIndex: 3
            });
        };
    
        System['setScreenRotationNotification'] = function(/* const rho::String& */ url, /* const rho::String& */ url_params, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setScreenRotationNotification',
                valueCallbackIndex: 2
            });
        };
    
        System['exit'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'exit',
                valueCallbackIndex: 0
            });
        };
    
        System['set_sleeping'] = function(/* bool */ enable, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'set_sleeping',
                valueCallbackIndex: 1
            });
        };
    
        System['startTimer'] = function(/* int */ interval, /* const rho::String& */ url, /* const rho::String& */ url_params, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'startTimer',
                valueCallbackIndex: 3
            });
        };
    
        System['stopTimer'] = function(/* const rho::String& */ url, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'stopTimer',
                valueCallbackIndex: 1
            });
        };
    
        System['setNetworkStatusNotify'] = function(/* const rho::String& */ url, /* int */ poll_interval, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'setNetworkStatusNotify',
                valueCallbackIndex: 2
            });
        };
    
        System['clearNetworkStatusNotify'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'clearNetworkStatusNotify',
                valueCallbackIndex: 0
            });
        };
    
        System['set_http_proxy_url'] = function(/* const rho::String& */ proxyURI, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'set_http_proxy_url',
                valueCallbackIndex: 1
            });
        };
    
        System['unset_http_proxy'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'unset_http_proxy',
                valueCallbackIndex: 0
            });
        };
    
        System['set_application_icon_badge'] = function(/* int */ badgeNumber, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'set_application_icon_badge',
                valueCallbackIndex: 1
            });
        };
    
        System['runApplication'] = function(/* const rho::String& */ appName, /* const rho::String& */ params, /* bool */ blockingCall, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'runApplication',
                valueCallbackIndex: 3
            });
        };
    
        System['getProperty'] = function(/* const rho::String& */ propertyName, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getProperty',
                valueCallbackIndex: 1
            });
        };
    
        System['getProperties'] = function(/* const rho::Vector<rho::String>& */ arrayofNames, /* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getProperties',
                valueCallbackIndex: 1
            });
        };
    
        System['getAllProperties'] = function(/* optional function */ oResult) {
            return apiReq({
                instanceId: '0',
                args: arguments,
                method: 'getAllProperties',
                valueCallbackIndex: 0
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

    

    rhoUtil.namespace('Rho.System', System);

})(jQuery, Rho, Rho.util);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               