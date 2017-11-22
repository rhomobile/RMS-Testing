var arrConstants = new Array();
arrConstants['Rho.Application'] = [{
  constant: 'Rho.Application.APP_EVENT_ACTIVATED',
  value: 'Activated',
  applicableto: 'js'
}, {
  constant: 'Rho.Application.APP_EVENT_DEACTIVATED',
  value: 'Deactivated',
  applicableto: 'js'
}, {
  constant: 'Rho.Application.APP_EVENT_UICREATED',
  value: 'UICreated',
  applicableto: 'js'
}, {
  constant: 'Rho.Application.APP_EVENT_UIDESTROYED',
  value: 'UIDestroyed',
  applicableto: 'js'
}, {
  constant: 'Rho.Application.APP_EVENT_SCREEN_OFF',
  value: 'ScreenOff',
  applicableto: 'js'
}, {
  constant: 'Rho.Application.APP_EVENT_SCREEN_ON',
  value: 'ScreenOn',
  applicableto: 'js'
}, {
  constant: 'Rho.Application.APP_EVENT_SYNCUSERCHANGED',
  value: 'SyncUserChanged',
  applicableto: 'js'
}, {
  constant: 'Rho.Application.APP_EVENT_CONFIGCONFLICT',
  value: 'ConfigConflict',
  applicableto: 'ruby'
}, {
  constant: 'Rho.Application.APP_EVENT_DBMIGRATESOURCE',
  value: 'DBMigrateSource',
  applicableto: 'ruby'
}];
arrConstants['Rho.AudioCapture'] = [{
  constant: 'Rho.AudioCapture.MIC',
  value: 'mic',
  applicableto: 'js'
},
/*
{
  constant: 'Rho.AudioCapture.CAMCORDER',
  value: 'camcorder',
  applicableto: 'js'
}, {
  constant: 'Rho.AudioCapture.CALL_FULLDUPLEX',
  value: 'call_fullduplex',
  applicableto: 'js'
}, {
  constant: 'Rho.AudioCapture.CALL_DOWNLINK',
  value: 'call_downlink',
  applicableto: 'js'
}, {
  constant: 'Rho.AudioCapture.CALL_UPLINK',
  value: 'call_uplink',
  applicableto: 'js'
}, {
  constant: 'Rho.AudioCapture.ENCODER_AAC_LC',
  value: 'AAC_LC',
  applicableto: 'js'
},
*/
 {
  constant: 'Rho.AudioCapture.ENCODER_AAC',
  value: 'AAC',
  applicableto: 'js'
},
/*
 {
  constant: 'Rho.AudioCapture.ENCODER_AAC_ELD',
  value: 'AAC_ELD',
  applicableto: 'js'
}, {
  constant: 'Rho.AudioCapture.ENCODER_AAC_HE',
  value: 'AAC_HE',
  applicableto: 'js'
},
*/
 {
  constant: 'Rho.AudioCapture.ENCODER_AMR_NB',
  value: 'AMR_NB',
  applicableto: 'js'
}, {
  constant: 'Rho.AudioCapture.ENCODER_AMR_WB',
  value: 'AMR_WB',
  applicableto: 'js'
}];
arrConstants['Rho.Barcode'] = [{
  constant: 'Rho.Barcode.REDUNDANCY_AND_LENGTH',
  value: 'redundancyAndLength',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.SHORT_OR_CODABAR',
  value: 'shortOrCodabar',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.LONG_AND_SHORT',
  value: 'longAndShort',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.ALL_TWICE',
  value: 'allTwice',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.ALL_THRICE',
  value: 'allThrice',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.RASTER_NONE',
  value: 'none',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.RASTER_OPEN_ALWAYS',
  value: 'openAlways',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.RASTER_SMART',
  value: 'smart',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.RASTER_CYCLONE',
  value: 'cyclone',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.AIMTYPE_TRIGGER',
  value: 'trigger',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.AIMTYPE_TIMED_HOLD',
  value: 'timedHold',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.AIMTYPE_TIMED_RELEASE',
  value: 'timedRelease',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.AIMTYPE_PRESENTATION',
  value: 'presentation',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.AIMTYPE_PRESS_AND_RELEASE',
  value: 'pressAndRelease',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.AIMTYPE_CONTINUOUS_READ',
  value: 'continuousRead',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.AIMMODE_NONE',
  value: 'none',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.AIMMODE_DOT',
  value: 'dot',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.AIMMODE_SLAB',
  value: 'slab',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.AIMMODE_RETICLE',
  value: 'reticle',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.PICKLIST_DISABLED',
  value: 'disabled',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.PICKLIST_HARDWARE_RETICLE',
  value: 'hardwareReticle',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.PICKLIST_SOFTWARE_RETICLE',
  value: 'softwareReticle',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.VIEWFINDER_ENABLED',
  value: 'enabled',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.VIEWFINDER_DISABLED',
  value: 'disabled',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.VIEWFINDER_STATIC_RETICLE',
  value: 'staticReticle',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.VIEWFINDER_DYNAMIC_RETICLE',
  value: 'dynamicReticle',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.VF_FEEDBACK_ENABLED',
  value: 'enabled',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.VF_FEEDBACK_DISABLED',
  value: 'disabled',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.VF_FEEDBACK_RETICLE',
  value: 'reticle',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.FOCUS_FIXED',
  value: 'fixed',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.FOCUS_AUTO',
  value: 'auto',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.ILLUMINATION_AUTO',
  value: 'auto',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.ILLUMINATION_ALWAYS_ON',
  value: 'alwaysOn',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.ILLUMINATION_ALWAYS_OFF',
  value: 'alwaysOff',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.INVERSE_ENABLED',
  value: 'enabled',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.INVERSE_DISABLED',
  value: 'disabled',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.INVERSE_AUTO',
  value: 'auto',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.BEAM_NORMAL',
  value: 'normal',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.BEAM_WIDE',
  value: 'wide',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.BEAM_NARROW',
  value: 'narrow',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.DBP_NORMAL',
  value: 'normal',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.DBP_COMPOSITE',
  value: 'composite',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.FORMAT_BINARY',
  value: 'binary',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.FORMAT_TEXT',
  value: 'text',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.CODE11_CHECKDIGIT_NONE',
  value: 'none',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.CODE11_CHECKDIGIT_ONE',
  value: 'one',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.CODE11_CHECKDIGIT_TWO',
  value: 'two',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.CODE128ISBT_NEVER',
  value: 'never',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.CODE128ISBT_ALWAYS',
  value: 'always',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.CODE128ISBT_AUTO',
  value: 'auto',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UCC_NEVER',
  value: 'never',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UCC_ALWAYS',
  value: 'always',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UCC_AUTO',
  value: 'auto',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.I2OF5_VERIFY_NONE',
  value: 'none',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.I2OF5_VERIFY_USS',
  value: 'uss',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.I2OF5_VERIFY_OPCC',
  value: 'opcc',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.MSI_CHECKDIGITS_ONE',
  value: 'one',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.MSI_CHECKDIGITS_TWO',
  value: 'two',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.MSI_CHECKDIGITS_MOD11',
  value: 'mod11',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.MSI_CHECKDIGITS_MOD10',
  value: 'mod10',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.BOOKLAND_ISBN10',
  value: 'isbn10',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.BOOKLAND_ISBN13',
  value: 'isbn13',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCEAN_NONE',
  value: 'none',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCEAN_AUTO',
  value: 'auto',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCEAN_ALWAYS',
  value: 'always',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCEAN_SMART',
  value: 'smart',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCEAN_379',
  value: '378or379',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCEAN_979',
  value: '978or979',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCEAN_439',
  value: '414or419or434or439',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCA_PREAMBLE_NONE',
  value: 'none',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCA_PREAMBLE_SYSTEMCHAR',
  value: 'systemChar',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCA_PREAMBLE_COUNTRY',
  value: 'countryAndSystemChars',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCE0_PREAMBLE_NONE',
  value: 'none',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCE0_PREAMBLE_SYSTEMCHAR',
  value: 'systemChar',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCE0_PREAMBLE_COUNTRY',
  value: 'countryAndSystemChars',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCE1_PREAMBLE_NONE',
  value: 'none',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCE1_PREAMBLE_SYSTEMCHAR',
  value: 'systemChar',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.UPCE1_PREAMBLE_COUNTRY',
  value: 'countryAndSystemChars',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.RSM_AUTORECONNECT_NONE',
  value: 'none',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.RSM_AUTORECONNECT_ON_POWER',
  value: 'onPower',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.RSM_AUTORECONNECT_ON_OUT_OF_RANGE',
  value: 'onOutOfRange',
  applicableto: 'js'
}, {
  constant: 'Rho.Barcode.RSM_AUTORECONNECT_ON_POWER_OUT_OF_RANGE',
  value: 'onPowerOutOfRange',
  applicableto: 'js'
}];
if (Rho.System.isSymbolDevice) {
arrConstants['Rho.CardReader'] = [{
  constant: 'Rho.CardReader.MSR9000',
  value: 'msr9000',
  applicableto: 'js'
}, {
  constant: 'Rho.CardReader.MSR9001',
  value: 'msr9001',
  applicableto: 'js'
}, {
  constant: 'Rho.CardReader.MSR9500',
  value: 'msr9500',
  applicableto: 'js'
}, {
  constant: 'Rho.CardReader.MSRCAMEO',
  value: 'msrcameo',
  applicableto: 'js'
}, {
  constant: 'Rho.CardReader.MSR7000',
  value: 'msr7000',
  applicableto: 'js'
}, {
  constant: 'Rho.CardReader.DCR7000',
  value: 'dcr7000',
  applicableto: 'js'
}, {
  constant: 'Rho.CardReader.MSR55',
  value: 'msr55',
  applicableto: 'js'
}, {
  constant: 'Rho.CardReader.MSR3000',
  value: 'msr3000',
  applicableto: 'js'
}];
}
arrConstants['Rho.Camera'] = [{
  constant: 'Rho.Camera.CAMERA_TYPE_BACK',
  value: 'back',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.CAMERA_TYPE_FRONT',
  value: 'front',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.COMPRESSION_FORMAT_JPG',
  value: 'jpg',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.COMPRESSION_FORMAT_PNG',
  value: 'png',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.OUTPUT_FORMAT_IMAGE',
  value: 'image',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.OUTPUT_FORMAT_DATAURI',
  value: 'dataUri',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.COLOR_MODEL_RGB',
  value: 'rgb',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.COLOR_MODEL_GRAYSCALE',
  value: 'grayscale',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.FLASH_ON',
  value: 'on',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.FLASH_OFF',
  value: 'off',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.FLASH_AUTO',
  value: 'auto',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.FLASH_RED_EYE',
  value: 'redEye',
  applicableto: 'js'
}, {
  constant: 'Rho.Camera.FLASH_TORCH',
  value: 'torch',
  applicableto: 'js'
}];
arrConstants['Rho.Battery'] = [{
  constant: 'Rho.Battery.BATTERY_TRIGGER_PERIODIC',
  value: 'periodic',
  applicableto: 'js'
}, {
  constant: 'Rho.Battery.BATTERY_TRIGGER_SYSTEM',
  value: 'system',
  applicableto: 'js'
}, {
  constant: 'Rho.Battery.SMART_BATTERY_HEALTHY',
  value: 'healthy',
  applicableto: 'js'
}, {
  constant: 'Rho.Battery.SMART_BATTERY_UNHEALTHY',
  value: 'unhealthy',
  applicableto: 'js'
}, {
  constant: 'Rho.Battery.SMART_BATTERY_UNKNOWN',
  value: 'unknown',
  applicableto: 'js'
}, {
  constant: 'Rho.Battery.BATTERY_LAYOUT_LEFT',
  value: 'left',
  applicableto: 'js'
}, {
  constant: 'Rho.Battery.BATTERY_LAYOUT_RIGHT',
  value: 'right',
  applicableto: 'js'
}, {
  constant: 'Rho.Battery.BATTERY_LAYOUT_UP',
  value: 'up',
  applicableto: 'js'
}, {
  constant: 'Rho.Battery.BATTERY_LAYOUT_DOWN',
  value: 'down',
  applicableto: 'js'
}];
/*
arrConstants['Rho.SimulScan'] = [{
  constant: 'Rho.SimulScan.FLASH_OFF',
  value: 'off',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.FLASH_ON',
  value: 'on',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.FLASH_DISABLED',
  value: 'disabled',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.SUCCESS',
  value: 'success',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.FAILURE',
  value: 'failure',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.STOP',
  value: 'stop',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.FAILURE_ERROR',
  value: 'error',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.FAILURE_IDENTIFICATION_TIMEOUT',
  value: 'identificationTimeout',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.FAILURE_PROCESSING_TIMEOUT',
  value: 'processingTimeout',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.PM_OCR',
  value: 'ocr',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.PM_OMR',
  value: 'omr',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.PM_PICTURE',
  value: 'picture',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.PM_BARCODE',
  value: 'barcode',
  applicableto: 'js'
}, {
  constant: 'Rho.SimulScan.SOURCE_CAMERA',
  value: 'camera',
  applicableto: 'js'
}];
arrConstants['Rho.Intent'] = [{
  constant: 'Rho.Intent.BROADCAST',
  value: 'broadcast',
  applicableto: 'js'
}, {
  constant: 'Rho.Intent.START_ACTIVITY',
  value: 'startActivity',
  applicableto: 'js'
}, {
  constant: 'Rho.Intent.START_SERVICE',
  value: 'startService',
  applicableto: 'js'
}];
arrConstants['Rho.Log'] = [{
  constant: 'Rho.Log.LEVEL_TRACE',
  value: '0',
  applicableto: 'js'
}, {
  constant: 'Rho.Log.LEVEL_INFO',
  value: '1',
  applicableto: 'js'
}, {
  constant: 'Rho.Log.LEVEL_WARNING',
  value: '2',
  applicableto: 'js'
}, {
  constant: 'Rho.Log.LEVEL_ERROR',
  value: '3',
  applicableto: 'js'
}, {
  constant: 'Rho.Log.LEVEL_FATAL',
  value: '4',
  applicableto: 'js'
}, {
  constant: 'Rho.Log.DEST_FILE',
  value: 'file',
  applicableto: 'js'
}, {
  constant: 'Rho.Log.DEST_OUTPUT',
  value: 'stdio',
  applicableto: 'js'
}, {
  constant: 'Rho.Log.DEST_URI',
  value: 'uri',
  applicableto: 'js'
}];
*/
arrConstants['Rho.NativeTabbar'] = [];
arrConstants['Rho.NativeToolbar'] = [];
arrConstants['Rho.Network'] = [{
  constant: 'Rho.Network.AUTH_BASIC',
  value: 'basic',
  applicableto: 'js'
}];
arrConstants['Rho.Notification'] = [{
  constant: 'Rho.Notification.TYPE_DIALOG',
  value: 'dialog',
  applicableto: 'js'
}, {
  constant: 'Rho.Notification.TYPE_NOTIFICATION',
  value: 'notification',
  applicableto: 'js'
}, {
  constant: 'Rho.Notification.TYPE_NOTIFICATION_DIALOG',
  value: 'notificationDialog',
  applicableto: 'js'
}, {
  constant: 'Rho.Notification.TYPE_TOAST',
  value: 'toast',
  applicableto: 'js'
}];
arrConstants['Rho.ORM'] = [];
arrConstants['Rho.Push'] = [{
  constant: 'Rho.Push.PUSH_TYPE_RHOCONNECT',
  value: 'rhoconnect-push',
  applicableto: 'js'
}, {
  constant: 'Rho.Push.PUSH_TYPE_NATIVE',
  value: 'native-push',
  applicableto: 'js'
}, {
  constant: 'Rho.Push.PUSH_NOTIFY_NONE',
  value: 'none',
  applicableto: 'js'
}, {
  constant: 'Rho.Push.PUSH_NOTIFY_ALERTS',
  value: 'alert',
  applicableto: 'js'
}, {
  constant: 'Rho.Push.PUSH_NOTIFY_NOTIFICATIONS',
  value: 'notification',
  applicableto: 'js'
}, {
  constant: 'Rho.Push.PUSH_NOTIFY_NOTIFICATIONS_AND_ALERTS',
  value: 'backgroundNotifications',
  applicableto: 'js'
}];
arrConstants['Rho.RhoFile'] = [{
  constant: 'Rho.RhoFile.OPEN_FOR_APPEND',
  value: '1',
  applicableto: 'js'
}, {
  constant: 'Rho.RhoFile.OPEN_FOR_READ',
  value: '2',
  applicableto: 'js'
}, {
  constant: 'Rho.RhoFile.OPEN_FOR_WRITE',
  value: '3',
  applicableto: 'js'
}, {
  constant: 'Rho.RhoFile.OPEN_FOR_READ_WRITE',
  value: '4',
  applicableto: 'js'
}];
arrConstants['Rho.Signature'] = [{
  constant: 'Rho.Signature.COMPRESSION_FORMAT_JPG',
  value: 'jpg',
  applicableto: 'js'
}, {
  constant: 'Rho.Signature.COMPRESSION_FORMAT_PNG',
  value: 'png',
  applicableto: 'js'
}, {
  constant: 'Rho.Signature.COMPRESSION_FORMAT_BMP',
  value: 'bmp',
  applicableto: 'js'
}, {
  constant: 'Rho.Signature.OUTPUT_FORMAT_IMAGE',
  value: 'image',
  applicableto: 'js'
}, {
  constant: 'Rho.Signature.OUTPUT_FORMAT_DATAURI',
  value: 'dataUri',
  applicableto: 'js'
}];
arrConstants['Rho.SignalIndicators'] = [{
  constant: 'Rho.SignalIndicators.SIGNAL_LAYOUT_LEFT',
  value: 'left',
  applicableto: 'js'
}, {
  constant: 'Rho.SignalIndicators.SIGNAL_LAYOUT_RIGHT',
  value: 'right',
  applicableto: 'js'
}, {
  constant: 'Rho.SignalIndicators.SIGNAL_LAYOUT_UP',
  value: 'up',
  applicableto: 'js'
}, {
  constant: 'Rho.SignalIndicators.SIGNAL_LAYOUT_DOWN',
  value: 'down',
  applicableto: 'js'
}];
arrConstants['Rho.System'] = [{
  constant: 'Rho.System.PLATFORM_WM_CE',
  value: 'WINDOWS',
  applicableto: 'js'
}, {
  constant: 'Rho.System.PLATFORM_ANDROID',
  value: 'ANDROID',
  applicableto: 'js'
}, {
  constant: 'Rho.System.PLATFORM_IOS',
  value: 'APPLE',
  applicableto: 'js'
}, {
  constant: 'Rho.System.PLATFORM_WP8',
  value: 'WP8',
  applicableto: 'js'
}, {
  constant: 'Rho.System.PLATFORM_UWP',
  value: 'UWP',
  applicableto: 'js'
}, {
  constant: 'Rho.System.PLATFORM_WINDOWS_DESKTOP',
  value: 'WINDOWS_DESKTOP',
  applicableto: 'js'
}, {
  constant: 'Rho.System.SCREEN_PORTRAIT',
  value: 'portrait',
  applicableto: 'js'
}, {
  constant: 'Rho.System.SCREEN_LANDSCAPE',
  value: 'landscape',
  applicableto: 'js'
}, {
  constant: 'Rho.System.KEYBOARD_SHOWN',
  value: 'shown',
  applicableto: 'js'
}, {
  constant: 'Rho.System.KEYBOARD_HIDDEN',
  value: 'hidden',
  applicableto: 'js'
}, {
  constant: 'Rho.System.KEYBOARD_AUTOMATIC',
  value: 'automatic',
  applicableto: 'js'
}, {
  constant: 'Rho.System.REGKEY_CLASSES_ROOT',
  value: 'HKCR',
  applicableto: 'js'
}, {
  constant: 'Rho.System.REGKEY_CURRENT_USER',
  value: 'HKCU',
  applicableto: 'js'
}, {
  constant: 'Rho.System.REGKEY_LOCAL_MACHINE',
  value: 'HKLM',
  applicableto: 'js'
}, {
  constant: 'Rho.System.REGKEY_USERS',
  value: 'HKU',
  applicableto: 'js'
}, {
  constant: 'Rho.System.REGTYPE_SZ',
  value: 'String',
  applicableto: 'js'
}, {
  constant: 'Rho.System.REGTYPE_BINARY',
  value: 'Binary',
  applicableto: 'js'
}, {
  constant: 'Rho.System.REGTYPE_DWORD',
  value: 'DWORD',
  applicableto: 'js'
}, {
  constant: 'Rho.System.REGTYPE_MULTI_SZ',
  value: 'MultiSZ',
  applicableto: 'js'
}];
arrConstants['Rho.WebView'] = [{
  constant: 'Rho.WebView.SCROLL_NONE',
  value: 'None',
  applicableto: 'js'
}, {
  constant: 'Rho.WebView.SCROLL_SCROLLBARS',
  value: 'Scrollbars',
  applicableto: 'js'
}, {
  constant: 'Rho.WebView.SCROLL_FINGER',
  value: 'FingerScroll',
  applicableto: 'js'
}, {
  constant: 'Rho.WebView.SAVE_FORMAT_JPEG',
  value: 'jpeg',
  applicableto: 'js'
}];
describe('Rho constant test', function () {
  for (var object in arrConstants) {
    (function (objectName, constants) {
      describe(objectName + ' constant check', function () {
        for (var i = 0; i < constants.length; i++) {
          (function (arrConstant) {
            it(arrConstant['constant'] + ' value test', function () {
              if (!isNaN(arrConstant['value'])) {
                arrConstant['value'] = parseInt(arrConstant['value']);
              }
              expect(eval(arrConstant['constant'])).toEqual(arrConstant['value']);
            });
          })(constants[i])
        }
      });
    })(object, arrConstants[object])
  }
});
