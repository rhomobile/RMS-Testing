var scannerparams = new Array;

//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////   Testcases To Check Functionality By Setting Directly   ///////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

scannerparams[scannerparams.length] = [["VT282-2015","call setproperty with rastermode:none","none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","rasterMode","none"],
["Barcode","getProperty","method","'rasterMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2016","call setproperty with rastermode:openAlways","openAlways"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","rasterMode","openAlways"],
["Barcode","getProperty","method","'rasterMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2018","call setproperty with rastermode:cyclone","cyclone"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","rasterMode","cyclone"],
["Barcode","getProperty","method","'rasterMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2019","call setproperty with rasterHeight to 50","50"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","rasterMode","openAlways"],
["Barcode","rasterHeight","50"],
["Barcode","getProperty","method","'rasterHeight'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2020","call setproperty with rasterHeight to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","rasterMode","openAlways"],
["Barcode","rasterHeight","0"],
["Barcode","getProperty","method","'rasterHeight'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2021","call setproperty with rasterHeight to 100","100"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","rasterMode","openAlways"],
["Barcode","rasterHeight","100"],
["Barcode","getProperty","method","'rasterHeight'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2022","call setproperty with aimMode as none","none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimMode","none"],
["Barcode","getProperty","method","'aimMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2023","call setproperty with aimMode as dot","dot"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimMode","dot"],
["Barcode","getProperty","method","'aimMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2024","call setproperty with aimMode as slab","slab"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimMode","slab"],
["Barcode","getProperty","method","'aimMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2025","call setproperty with aimMode as reticle","reticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimMode","reticle"],
["Barcode","getProperty","method","'aimMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2026","call setproperty with dpmMode as true","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","dpmMode","true"],
["Barcode","getProperty","method","'dpmMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2027","call setproperty with dpmMode as false","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","dpmMode","false"],
["Barcode","getProperty","method","'dpmMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2028","call setproperty with focusMode to Fixed","fixed"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","focusMode","fixed"],
["Barcode","getProperty","method","'focusMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2029","call setproperty with focusMode to auto","auto"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","focusMode","auto"],
["Barcode","getProperty","method","'focusMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2030","call setproperty with illuminationMode to auto","auto"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","illuminationMode","auto"],
["Barcode","getProperty","method","'illuminationMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2031","call setproperty with illuminationMode to alwaysOff","alwaysOff"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","illuminationMode","alwaysOff"],
["Barcode","getProperty","method","'illuminationMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2032","call setproperty with illuminationMode to alwaysOn","alwaysOn"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","illuminationMode","alwaysOn"],
["Barcode","getProperty","method","'illuminationMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2033","call setproperty with illuminationMode to alwaysOff after alwaysOn"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","illuminationMode","alwaysOn"],
["Barcode","getProperty","method","'illuminationMode'|returnGetProperty","sync"],
["Barcode","illuminationMode","alwaysOff"],
["Barcode","getProperty","method","'illuminationMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2034","call setproperty with illumination mode to alwaysOn after alwaysOff"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","illuminationMode","alwaysOff"],
["Barcode","getProperty","method","'illuminationMode'|returnGetProperty","sync"],
["Barcode","illuminationMode","alwaysOn"],
["Barcode","getProperty","method","'illuminationMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2035","call setproperty with inverse1dMode to enabled","enabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","inverse1dMode","enabled"],
["Barcode","getProperty","method","'inverse1dMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2036","call setproperty with inverse1dMode to disabled","disabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","inverse1dMode","disabled"],
["Barcode","getProperty","method","'inverse1dMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2037","call setproperty with inverse1dMode to auto","auto"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","inverse1dMode","auto"],
["Barcode","getProperty","method","'inverse1dMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2038","call setproperty with linearSecurityLevel to redundancyAndLength","redundancyAndLength"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","linearSecurityLevel","redundancyAndLength"],
["Barcode","getProperty","method","'linearSecurityLevel'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2039","call setproperty with linearSecurityLevel to shortOrCodabar","shortOrCodabar"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","linearSecurityLevel","shortOrCodabar"],
["Barcode","getProperty","method","'linearSecurityLevel'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2040","call setproperty with linearSecurityLevel to longAndShort","longAndShort"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","linearSecurityLevel","longAndShort"],
["Barcode","getProperty","method","'linearSecurityLevel'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2041","call setproperty with linearSecurityLevel to allTwice","allTwice"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","linearSecurityLevel","allTwice"],
["Barcode","getProperty","method","'linearSecurityLevel'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2042","call setproperty with linearSecurityLevel to allThrice","allThrice"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","linearSecurityLevel","allThrice"],
["Barcode","getProperty","method","'linearSecurityLevel'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2043","call setproperty with picklistMode as disabled","disabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","picklistMode","disabled"],
["Barcode","getProperty","method","'picklistMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2044","call setproperty with picklistMode as hardwareReticle","hardwareReticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","picklistMode","hardwareReticle"],
["Barcode","getProperty","method","'picklistMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2045","call setproperty with picklistMode as softwareReticle","softwareReticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","picklistMode","softwareReticle"],
["Barcode","getProperty","method","'picklistMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2046","call setproperty with picklistMode as disabled after softwareReticle","disabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","picklistMode","softwareReticle"],
["Barcode","picklistMode","disabled"],
["Barcode","getProperty","method","'picklistMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2047","call setproperty with poorQuality1dMode to true","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","poorQuality1dMode","true"],
["Barcode","getProperty","method","'poorQuality1dMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2048","call setproperty with poorQuality1dMode to false","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","poorQuality1dMode","false"],
["Barcode","getProperty","method","'poorQuality1dMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2049","call setproperty with viewfinderMode disabled","disabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderMode","disabled"],
["Barcode","getProperty","method","'viewfinderMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2050","call setproperty with viewfinderMode enabled","enabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderMode","enabled"],
["Barcode","getProperty","method","'viewfinderMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2051","call setproperty with viewfinderMode staticReticle","staticReticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderMode","staticReticle"],
["Barcode","getProperty","method","'viewfinderMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2052","call setproperty with viewfinderMode dynamicReticle","dynamicReticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderMode","dynamicReticle"],
["Barcode","getProperty","method","'viewfinderMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2053","call setproperty with viewfinderMode to staticReticle and viewfinderFeedback to Reticle","reticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderMode","staticReticle"],
["Barcode","viewfinderFeedback","reticle"],
["Barcode","viewfinderFeedbackTime","3000"],
["Barcode","getProperty","method","'viewfinderFeedback'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2053","call setproperty with viewfinderMode to staticReticle and viewfinderFeedback to Reticle","reticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderMode","staticReticle"],
["Barcode","viewfinderFeedback","reticle"],
["Barcode","viewfinderFeedbackTime","3000"],
["Barcode","getProperty","method","'viewfinderFeedback'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2054","call setproperty with viewfinderMode to dynamicReticle and viewfinderFeedback to Reticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderMode","dynamicReticle"],
["Barcode","getProperty","method","'viewfinderMode'|returnGetProperty","sync"],
["Barcode","viewfinderFeedback","reticle"],
["Barcode","getProperty","method","'viewfinderFeedback'|returnGetProperty","sync"],
["Barcode","viewfinderFeedbackTime","3000"],
["Barcode","getProperty","method","'viewfinderFeedbackTime'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2055","call setproperty with viewfinderMode to staticReticle and viewfinderFeedback  enabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderMode","staticReticle"],
["Barcode","getProperty","method","'viewfinderMode'|returnGetProperty","sync"],
["Barcode","viewfinderFeedback","enabled"],
["Barcode","getProperty","method","'viewfinderFeedback'|returnGetProperty","sync"],
["Barcode","viewfinderFeedbackTime","5000"],
["Barcode","getProperty","method","'viewfinderFeedbackTime'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2056","call setproperty with viewfinderMode to dynamicReticle and viewfinderFeedback enabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderMode","dynamicReticle"],
["Barcode","getProperty","method","'viewfinderMode'|returnGetProperty","sync"],
["Barcode","viewfinderFeedback","enabled"],
["Barcode","getProperty","method","'viewfinderFeedback'|returnGetProperty","sync"],
["Barcode","viewfinderFeedbackTime","5000"],
["Barcode","getProperty","method","'viewfinderFeedbackTime'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2063","call setproperty with viewfinderMode to viewfinderFeedback disabled","disabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderFeedback","disabled"],
["Barcode","getProperty","method","'viewfinderFeedback'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2064","call setproperty with viewfinderFeedback as enabled","enabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderFeedback","enabled"],
["Barcode","getProperty","method","'viewfinderFeedback'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2065","call setproperty with viewfinderFeedback as reticle","reticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderFeedback","reticle"],
["Barcode","getProperty","method","'viewfinderFeedback'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2066","call setproperty with viewfinderFeedbackTime to 5sec","5000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderFeedback","enabled"],
["Barcode","viewfinderFeedbackTime","5000"],
["Barcode","getProperty","method","'viewfinderFeedbackTime'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2067","call setproperty with viewfinderFeedbackTime to 10000msec","5000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderFeedback","reticle"],
["Barcode","viewfinderFeedbackTime","10000"],
["Barcode","getProperty","method","'viewfinderFeedbackTime'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2068","call setproperty with viewfinderFeedbackTime to -5000",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","viewfinderFeedback","enabled"],
["Barcode","viewfinderFeedbackTime","-5000"],
["Barcode","getProperty","method","'viewfinderFeedbackTime'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2069","call setproperty with scanTimeout to 3 sec","3000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","scanTimeout","3000"],
["Barcode","getProperty","method","'scanTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2070","call setproperty with scanTimeout to 10sec","10000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","scanTimeout","10000"],
["Barcode","getProperty","method","'scanTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2071","don't call setproperty with scanTimeout (default)",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperty","method","'scanTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2072","call setproperty with bidirectionalRedundancy to true","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","bidirectionalRedundancy","true"],
["Barcode","getProperty","method","'bidirectionalRedundancy'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2073","call setproperty with bidirectionalRedundancy to false","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","bidirectionalRedundancy","false"],
["Barcode","getProperty","method","'bidirectionalRedundancy'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2074","call setproperty with klasseEins to true","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","klasseEins","true"],
["Barcode","getProperty","method","'klasseEins'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2075","call setproperty with klasseEins to false","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","klasseEins","false"],
["Barcode","getProperty","method","'klasseEins'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2076","default sameSymbolTimeout and differentSymbolTimeout","continuousRead"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","continuousRead"],
["Barcode","getProperty","method","'aimType'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2077","call setproperty with valid sameSymbolTimeout and differentSymbolTimeout",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","continuousRead"],
["Barcode","sameSymbolTimeout","5000"],
["Barcode","differentSymbolTimeout","2000"],
["Barcode","getProperty","method","'sameSymbolTimeout'|returnGetProperty","sync"],
["Barcode","getProperty","method","'differentSymbolTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2078","call setproperty with negative sameSymbolTimeout and differentSymbolTimeout",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","continuousRead"],
["Barcode","sameSymbolTimeout","-5000"],
["Barcode","differentSymbolTimeout","-2000"],
["Barcode","getProperty","method","'sameSymbolTimeout'|returnGetProperty","sync"],
["Barcode","getProperty","method","'differentSymbolTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2079","call setproperty with 0 for sameSymbolTimeout and differentSymbolTimeout",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","continuousRead"],
["Barcode","sameSymbolTimeout","0"],
["Barcode","differentSymbolTimeout","0"],
["Barcode","getProperty","method","'sameSymbolTimeout'|returnGetProperty","sync"],
["Barcode","getProperty","method","'differentSymbolTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2080","sameSymbolTimeout and differentSymbolTimeout with aimtype trigger",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","trigger"],
["Barcode","sameSymbolTimeout","1000"],
["Barcode","differentSymbolTimeout","1000"],
["Barcode","getProperty","method","'sameSymbolTimeout'|returnGetProperty","sync"],
["Barcode","getProperty","method","'differentSymbolTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2081","call setproperty with adaptiveScanning to false.","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","adaptiveScanning","false"],
["Barcode","getProperty","method","'adaptiveScanning'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2082","call setproperty with adaptiveScanning to True.","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","adaptiveScanning","true"],
["Barcode","getProperty","method","'adaptiveScanning'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2083","call setproperty with dbpMode to normal","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","dbpMode","normal"],
["Barcode","getProperty","method","'dbpMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2084","call setproperty with dbpMode to composite","composite"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","dbpMode","composite"],
["Barcode","getProperty","method","'dbpMode'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2085","call setproperty with timedAimDuration to 4sec with aimType:timedHold",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","timedHold"],
["Barcode","timedAimDuration","4000"],
["Barcode","getProperty","method","'aimType'|returnGetProperty","sync"],
["Barcode","getProperty","method","'timedAimDuration'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2086","call setproperty with timedAimDuration to 3 secwith aimType:timedRelease",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","timedRelease"],
["Barcode","timedAimDuration","3000"],
["Barcode","getProperty","method","'aimType'|returnGetProperty","sync"],
["Barcode","getProperty","method","'timedAimDuration'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2087","call setproperty with timedAimDuration to 7 sec with aimType:timedRelease",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","timedRelease"],
["Barcode","timedAimDuration","7000"],
["Barcode","scanTimeout","10000"],
["Barcode","getProperty","method","'aimType'|returnGetProperty","sync"],
["Barcode","getProperty","method","'timedAimDuration'|returnGetProperty","sync"],
["Barcode","getProperty","method","'scanTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2088","call setproperty with aimtype:timedHold","timedHold"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","timedHold"],
["Barcode","getProperty","method","'aimType'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2089","call setproperty with aimtype:timedRelease","timedRelease"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","timedRelease"],
["Barcode","getProperty","method","'aimType'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2090","call setproperty with aimtype::presentation","presentation"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","presentation"],
["Barcode","getProperty","method","'aimType'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2091","call setproperty with aimtype::pressAndRelease","pressAndRelease"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","pressAndRelease"],
["Barcode","getProperty","method","'aimType'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2092","call setproperty with aimtype::pressAndRelease with valid scantimeout",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","pressAndRelease"],
["Barcode","scanTimeout","8000"],
["Barcode","getProperty","method","'aimType'|returnGetProperty","sync"],
["Barcode","getProperty","method","'scanTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2093","call setproperty with aimtype::continuousRead","continuousRead"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","continuousRead"],
["Barcode","getProperty","method","'aimType'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2094","call setproperty with aimtype::trigger","trigger"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","aimType","trigger"],
["Barcode","getProperty","method","'aimType'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2095","call setproperty with beamWidth to normal","normal"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","beamWidth","normal"],
["Barcode","getProperty","method","'beamWidth'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2096","call setproperty with beamWidth  to narrow","narrow"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","beamWidth","narrow"],
["Barcode","getProperty","method","'beamWidth'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2097","call setproperty with beamWidth  to wide","wide"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","beamWidth","wide"],
["Barcode","getProperty","method","'beamWidth'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2098","call setproperty with connectionIdleTimeout to 10 sec","10000"],
["BarcodeApi","makeSCN3Default","method"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","connectionIdleTimeout","10000"],
["Barcode","getProperty","method","'connectionIdleTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2099","call setproperty with connectionIdleTimeout to 20 sec","20000"],
["BarcodeApi","makeSCN3Default","method"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","connectionIdleTimeout","20000"],
["Barcode","getProperty","method","'connectionIdleTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2109","call setproperty with barcodeDataFormat as binary",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","getProperty","method","'signature'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2110","call setproperty with barcodeDataFormat as text",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","text"],
["Barcode","dataBufferSize","20000"],
["Barcode","getProperty","method","'signature'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"],
["Barcode","getProperty","method","'dataBufferSize'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2111","call setproperty with barcodeDataFormat as binary and scan other than signature barcode",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","signature","false"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","getProperty","method","'signature'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"],
["Barcode","getProperty","method","'dataBufferSize'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2112","call setproperty with barcodeDataFormat as text",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","code128","true"],
["Barcode","barcodeDataFormat","text"],
["Barcode","dataBufferSize","20000"],
["Barcode","getProperty","method","'code128'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"],
["Barcode","getProperty","method","'dataBufferSize'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2113","call setproperty with barcodeDataFormat as test (invalid value)",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","true"],
["Barcode","barcodeDataFormat","text"],
["Barcode","dataBufferSize","20000"],
["Barcode","getProperty","method","'alldecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"],
["Barcode","getProperty","method","'dataBufferSize'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2114","call setproperty with barcodeDataFormat as empty data",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","true"],
["Barcode","barcodeDataFormat",""],
["Barcode","dataBufferSize","20000"],
["Barcode","getProperty","method","'alldecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"],
["Barcode","getProperty","method","'dataBufferSize'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2115","call setproperty with barcodeDataFormat as empty data",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","50000"],
["Barcode","getProperty","method","'alldecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"],
["Barcode","getProperty","method","'dataBufferSize'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2116","call setproperty with dataBufferSize as 20000",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","getProperty","method","'alldecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"],
["Barcode","getProperty","method","'dataBufferSize'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2117","call setproperty with dataBufferSize as 0",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","0"],
["Barcode","getProperty","method","'alldecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"],
["Barcode","getProperty","method","'dataBufferSize'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2118","call setproperty with dataBufferSize as -1",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","-1"],
["Barcode","getProperty","method","'alldecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"],
["Barcode","getProperty","method","'dataBufferSize'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2119","call setproperty with Signature as true",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","getProperty","method","'alldecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'signature'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"],
["Barcode","getProperty","method","'dataBufferSize'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2120","call setproperty with Signature as false",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","true"],
["Barcode","signature","false"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","getProperty","method","'alldecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'signature'|returnGetProperty","sync"],
["Barcode","getProperty","method","'barcodeDataFormat'|returnGetProperty","sync"],
["Barcode","getProperty","method","'dataBufferSize'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2121","call setproperty with signatureImageHeight to 300","300"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageHeight","300"],
["Barcode","getProperty","method","'signatureImageHeight'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2122","call setproperty with signatureImageHeight to 50","50"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageHeight","50"],
["Barcode","getProperty","method","'signatureImageHeight'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2123","call setproperty with signatureImageHeight to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageHeight","0"],
["Barcode","getProperty","method","'signatureImageHeight'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2124","call setproperty with signatureImageHeight to -100",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageHeight","-100"],
["Barcode","getProperty","method","'signatureImageHeight'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2125","call setproperty with signatureImageWidth to 300",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageWidth","300"],
["Barcode","getProperty","method","'signatureImageWidth'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2126","call setproperty with signatureImageWidth to 50",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageWidth","50"],
["Barcode","getProperty","method","'signatureImageWidth'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2127","call setproperty with signatureImageWidth to 0",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageWidth","0"],
["Barcode","getProperty","method","'signatureImageWidth'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2128","call setproperty with signatureImageWidth to  -100",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageWidth","-100"],
["Barcode","getProperty","method","'signatureImageWidth'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2129","call setproperty with signatureImageQuality to 50","50"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageQuality","50"],
["Barcode","getProperty","method","'signatureImageQuality'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2130","call setproperty with signatureImageQuality to 95","95"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageQuality","95"],
["Barcode","getProperty","method","'signatureImageQuality'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2131","call setproperty with signatureImageQuality to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageQuality","0"],
["Barcode","getProperty","method","'signatureImageQuality'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2132","call setproperty with signatureImageQuality to -20",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageQuality","-20"],
["Barcode","getProperty","method","'signatureImageQuality'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2133","decode signature barcode with all parameter after setting using setproperty",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","signature","true"],
["Barcode","barcodeDataFormat","binary"],
["Barcode","dataBufferSize","20000"],
["Barcode","signatureImageHeight","250"],
["Barcode","signatureImageWidth","150"],
["Barcode","signatureImageQuality","50"],
["Barcode","getProperty","method","'signatureImageQuality'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2134","call setproperty with decodeDuration to 5000","5000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","decodeDuration","5000"],
["Barcode","getProperty","method","'decodeDuration'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2136","call setproperty with decodeDuration to 2000","2000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","decodeDuration","2000"],
["Barcode","getProperty","method","'decodeDuration'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2137","don't call setproperty with decodeDuration","250"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperty","method","'decodeDuration'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2138","call setproperty with decodeFrequency to 65535","65535"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","decodeFrequency","65535"],
["Barcode","getProperty","method","'decodeFrequency'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2139","call setproperty with decodeFrequency to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","decodeFrequency","0"],
["Barcode","getProperty","method","'decodeFrequency'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2140","don't call setproperty with decodeFrequency","3000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperty","method","'decodeFrequency'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2141","call setproperty with invalidDecodeFrequency to 65535","65535"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","invalidDecodeFrequency","65535"],
["Barcode","getProperty","method","'invalidDecodeFrequency'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2142","call setproperty with invalidDecodeFrequency to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","invalidDecodeFrequency","0"],
["Barcode","getProperty","method","'invalidDecodeFrequency'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2143","call setproperty with invalidDecodeFrequency to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","invalidDecodeFrequency","0"],
["Barcode","getProperty","method","'invalidDecodeFrequency'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2143","don't call setproperty with invalidDecodeFrequency","2500"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperty","method","'invalidDecodeFrequency'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2144","call setproperty with decodeSound to local wave file path","2500"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","decodeSound","file://\\\\Application\\\\Alaram5.wav"],
["Barcode","getProperty","method","'invalidDecodeFrequency'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2145","call setproperty with decodeSound to invalid path",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","decodeSound","file://\\\\Application\\\\"],
["Barcode","getProperty","method","'decodeSound'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2146","call setproperty with invalidDecodeSound to local wave file path",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","invalidDecodeSound","file://\\\\Application\\\\Alaram5.wav"],
["Barcode","getProperty","method","'invalidDecodeSound'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2147","call setproperty with invalidDecodeSound to invalid path",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","invalidDecodeSound","file://\\\\Application\\\\"],
["Barcode","getProperty","method","'invalidDecodeSound'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2148","call setproperty with decodeVolume to 1",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","decodeVolume","1"],
["Barcode","getProperty","method","'decodeVolume'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2149","call setproperty with decodeVolume to 0",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","decodeVolume","0"],
["Barcode","getProperty","method","'decodeVolume'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2150","don't call setproperty with decodeVolume","5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperty","method","'decodeVolume'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2152","call setproperty with decodeVolume to 0",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'decodeVolume', '0'"],
["Barcode","getProperty","method","'decodeVolume'|returnGetProperty","sync"]
]



scannerparams[scannerparams.length] = [["VT282-2159","clearAllProperties() with setting  reader params using setproperties",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","picklistMode","softwareReticle"],
["Barcode","scanTimeout","7000"],
["Barcode","getProperty","method","'picklistMode'|returnGetProperty","sync"],
["Barcode","getProperty","method","'scanTimeout'|returnGetProperty","sync"],
["Barcode","clearAllProperties","method"],
["Barcode","getProperty","method","'picklistMode'|returnGetProperty","sync"],
["Barcode","getProperty","method","'scanTimeout'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2160","clearAllProperties() with decode params using setproperties",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","true"],
["Barcode","code128","false"],
["Barcode","getProperty","method","'alldecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'code128'|returnGetProperty","sync"],
["Barcode","clearAllProperties","method"],
["Barcode","getProperty","method","'alldecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'code128'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2161","call getAllProperties() after calling setproperty with reader param",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","picklistMode","softwareReticle"],
["Barcode","scanTimeout","7000"],
["Barcode","getAllProperties","method"]
]

scannerparams[scannerparams.length] = [["VT282-2162","call getAllProperties() after calling setproperty with  decode param",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","alldecoders","false"],
["Barcode","code93","true"],
["Barcode","getAllProperties","method"]
]

alert(scannerparams.length);

/*









*/