var scannerparams = new Array;

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////   Testcases To Check Functionality By Setting using SetProperties   ///////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

scannerparams[scannerparams.length] = [["VT282-2015","call setproperty with rastermode:none","none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'rasterMode'=>'none'}"],
["Barcode","getProperties","method","['rasterMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2016","call setproperty with rastermode:openAlways","openAlways"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'rasterMode'=>'openAlways'}"],
["Barcode","getProperties","method","['rasterMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2018","call setproperty with rastermode:cyclone","cyclone"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'rasterMode'=>'cyclone'}"],
["Barcode","getProperties","method","['rasterMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2019","call setproperty with rasterHeight to 50","50"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'rasterMode'=>'openAlways', 'rasterHeight'=>50}"],
["Barcode","getProperties","method","['rasterMode','rasterHeight']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2020","call setproperty with rasterHeight to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'rasterMode'=>'openAlways', 'rasterHeight'=>0}"],
["Barcode","getProperties","method","['rasterMode','rasterHeight']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2021","call setproperty with rasterHeight to 100","100"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'rasterMode'=>'openAlways', 'rasterHeight'=>100}"],
["Barcode","getProperties","method","['rasterMode','rasterHeight']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2022","call setproperty with aimMode as none","none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimMode'=>'none'}"],
["Barcode","getProperties","method","['aimMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2023","call setproperty with aimMode as dot","dot"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimMode'=>'dot'}"],
["Barcode","getProperties","method","['aimMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2024","call setproperty with aimMode as slab","slab"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimMode'=>'slab'}"],
["Barcode","getProperties","method","['aimMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2025","call setproperty with aimMode as reticle","reticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimMode'=>'reticle'}"],
["Barcode","getProperties","method","['aimMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2026","call setproperty with dpmMode as true","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'dpmMode'=>true}"],
["Barcode","getProperties","method","['dpmMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2027","call setproperty with dpmMode as false","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'dpmMode'=>false}"],
["Barcode","getProperties","method","['dpmMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2028","call setproperty with focusMode to Fixed","fixed"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'focusMode'=>'fixed'}"],
["Barcode","getProperties","method","['focusMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2029","call setproperty with focusMode to auto","auto"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'focusMode'=>'auto'}"],
["Barcode","getProperties","method","['focusMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2030","call setproperty with illuminationMode to auto","auto"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'illuminationMode'=>'auto'}"],
["Barcode","getProperties","method","['illuminationMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2031","call setproperty with illuminationMode to alwaysOff","alwaysOff"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'illuminationMode'=>'alwaysOff'}"],
["Barcode","getProperties","method","['illuminationMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2032","call setproperty with illuminationMode to alwaysOn","alwaysOn"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'illuminationMode'=>'alwaysOn'}"],
["Barcode","getProperties","method","['illuminationMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2033","call setproperty with illuminationMode to alwaysOff after alwaysOn"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'illuminationMode'=>'alwaysOn'}"],
["Barcode","getProperties","method","['illuminationMode']|returnGetProperty","sync"],
["Barcode","setProperties","method","{'illuminationMode'=>'alwaysOff'}"],
["Barcode","getProperties","method","['illuminationMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2034","call setproperty with illumination mode to alwaysOn after alwaysOff"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'illuminationMode'=>'alwaysOff'}"],
["Barcode","getProperties","method","['illuminationMode']|returnGetProperty","sync"],
["Barcode","setProperties","method","{'illuminationMode'=>'alwaysOn'}"],
["Barcode","getProperties","method","['illuminationMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2035","call setproperty with inverse1dMode to enabled","enabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'inverse1dMode'=>'enabled'}"],
["Barcode","getProperties","method","['inverse1dMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2036","call setproperty with inverse1dMode to disabled","disabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'inverse1dMode'=>'disabled'}"],
["Barcode","getProperties","method","['inverse1dMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2037","call setproperty with inverse1dMode to auto","auto"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'inverse1dMode'=>'auto'}"],
["Barcode","getProperties","method","['inverse1dMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2038","call setproperty with linearSecurityLevel to redundancyAndLength","redundancyAndLength"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'linearSecurityLevel'=>'redundancyAndLength'}"],
["Barcode","getProperties","method","['linearSecurityLevel']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2039","call setproperty with linearSecurityLevel to shortOrCodabar","shortOrCodabar"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'linearSecurityLevel'=>'shortOrCodabar'}"],
["Barcode","getProperties","method","['linearSecurityLevel']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2040","call setproperty with linearSecurityLevel to longAndShort","longAndShort"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'linearSecurityLevel'=>'longAndShort'}"],
["Barcode","getProperties","method","['linearSecurityLevel']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2041","call setproperty with linearSecurityLevel to allTwice","allTwice"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'linearSecurityLevel'=>'allTwice'}"],
["Barcode","getProperties","method","['linearSecurityLevel']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2042","call setproperty with linearSecurityLevel to allThrice","allThrice"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'linearSecurityLevel'=>'allThrice'}"],
["Barcode","getProperties","method","['linearSecurityLevel']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2043","call setproperty with picklistMode as disabled","disabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'picklistMode'=>'disabled'}"],
["Barcode","getProperties","method","['picklistMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2044","call setproperty with picklistMode as hardwareReticle","hardwareReticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'picklistMode'=>'hardwareReticle'}"],
["Barcode","getProperties","method","['picklistMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2045","call setproperty with picklistMode as softwareReticle","softwareReticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'picklistMode'=>'softwareReticle'}"],
["Barcode","getProperties","method","['picklistMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2046","call setproperty with picklistMode as disabled after softwareReticle","disabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'picklistMode'=>'softwareReticle'}"],
["Barcode","getProperties","method","['picklistMode']|returnGetProperty","sync"],
["Barcode","setProperties","method","{'picklistMode'=>'disabled'}"],
["Barcode","getProperties","method","['picklistMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2047","call setproperty with poorQuality1dMode to true","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'poorQuality1dMode'=>true}"],
["Barcode","getProperties","method","['poorQuality1dMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2048","call setproperty with poorQuality1dMode to false","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'poorQuality1dMode'=>false}"],
["Barcode","getProperties","method","['poorQuality1dMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2049","call setproperty with viewfinderMode disabled","disabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderMode'=>'disabled'}"],
["Barcode","getProperties","method","['viewfinderMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2050","call setproperty with viewfinderMode enabled","enabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderMode'=>'enabled'}"],
["Barcode","getProperties","method","['viewfinderMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2051","call setproperty with viewfinderMode staticReticle","staticReticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderMode'=>'staticReticle'}"],
["Barcode","getProperties","method","['viewfinderMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2052","call setproperty with viewfinderMode dynamicReticle","dynamicReticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderMode'=>'dynamicReticle'}"],
["Barcode","getProperties","method","['viewfinderMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2053","call setproperty with viewfinderMode to staticReticle and viewfinderFeedback to Reticle","reticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderMode'=>'staticReticle', 'viewfinderFeedback'=>'reticle','viewfinderFeedbackTime'=>3000}"],
["Barcode","getProperties","method","['viewfinderMode','viewfinderFeedback','viewfinderFeedbackTime']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2054","call setproperty with viewfinderMode to dynamicReticle and viewfinderFeedback to Reticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderMode'=>'dynamicReticle', 'viewfinderFeedback'=>'reticle','viewfinderFeedbackTime'=>3000}"],
["Barcode","getProperties","method","['viewfinderMode','viewfinderFeedback','viewfinderFeedbackTime']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2055","call setproperty with viewfinderMode to staticReticle and viewfinderFeedback  enabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderMode'=>'staticReticle', 'viewfinderFeedback'=>'enabled','viewfinderFeedbackTime'=>5000}"],
["Barcode","getProperties","method","['viewfinderMode','viewfinderFeedback','viewfinderFeedbackTime']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2056","call setproperty with viewfinderMode to dynamicReticle and viewfinderFeedback enabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderMode'=>'dynamicReticle', 'viewfinderFeedback'=>'enabled','viewfinderFeedbackTime'=>5000}"],
["Barcode","getProperties","method","['viewfinderMode','viewfinderFeedback','viewfinderFeedbackTime']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2063","call setproperty with viewfinderMode to viewfinderFeedback disabled","disabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderFeedback'=>'disabled'}"],
["Barcode","getProperties","method","['viewfinderFeedback']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2064","call setproperty with viewfinderFeedback as enabled","enabled"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderFeedback'=>'enabled'}"],
["Barcode","getProperties","method","['viewfinderFeedback']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2065","call setproperty with viewfinderFeedback as reticle","reticle"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderFeedback'=>'reticle'}"],
["Barcode","getProperties","method","['viewfinderFeedback']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2066","call setproperty with viewfinderFeedbackTime to 5sec","5000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderFeedback'=>'enabled','viewfinderFeedbackTime'=>5000}"],
["Barcode","getProperties","method","['viewfinderFeedback','viewfinderFeedbackTime']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2067","call setproperty with viewfinderFeedbackTime to 10000msec","5000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderFeedback'=>'reticle','viewfinderFeedbackTime'=>10000}"],
["Barcode","getProperties","method","['viewfinderFeedback','viewfinderFeedbackTime']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2068","call setproperty with viewfinderFeedbackTime to -5000",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'viewfinderFeedback'=>'enabled','viewfinderFeedbackTime'=>-5000}"],
["Barcode","getProperties","method","['viewfinderFeedback','viewfinderFeedbackTime']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2069","call setproperty with scanTimeout to 3 sec","3000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'scanTimeout'=>3000}"],
["Barcode","getProperties","method","['scanTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2070","call setproperty with scanTimeout to 10sec","10000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'scanTimeout'=>10000}"],
["Barcode","getProperties","method","['scanTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2071","don't call setproperty with scanTimeout (default)",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperties","method","['scanTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2072","call setproperty with bidirectionalRedundancy to true","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'bidirectionalRedundancy'=>true}"],
["Barcode","getProperties","method","['bidirectionalRedundancy']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2073","call setproperty with bidirectionalRedundancy to false","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'bidirectionalRedundancy'=>false}"],
["Barcode","getProperties","method","['bidirectionalRedundancy']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2074","call setproperty with klasseEins to true","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'klasseEins'=>true}"],
["Barcode","getProperties","method","['klasseEins']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2075","call setproperty with klasseEins to false","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'klasseEins'=>false}"],
["Barcode","getProperties","method","['klasseEins']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2076","default sameSymbolTimeout and differentSymbolTimeout","continuousRead"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'continuousRead'}"],
["Barcode","getProperties","method","['aimType']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2077","call setproperty with valid sameSymbolTimeout and differentSymbolTimeout",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'continuousRead', 'sameSymbolTimeout'=>5000, 'differentSymbolTimeout'=>2000}"],
["Barcode","getProperties","method","['aimType','sameSymbolTimeout','differentSymbolTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2078","call setproperty with negative sameSymbolTimeout and differentSymbolTimeout",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'continuousRead', 'sameSymbolTimeout'=>-5000, 'differentSymbolTimeout'=>-2000}"],
["Barcode","getProperties","method","['aimType','sameSymbolTimeout','differentSymbolTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2079","call setproperty with 0 for sameSymbolTimeout and differentSymbolTimeout",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'continuousRead', 'sameSymbolTimeout'=>0, 'differentSymbolTimeout'=>0}"],
["Barcode","getProperties","method","['aimType','sameSymbolTimeout','differentSymbolTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2080","sameSymbolTimeout and differentSymbolTimeout with aimtype trigger",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'trigger', 'sameSymbolTimeout'=>1000, 'differentSymbolTimeout'=>1000}"],
["Barcode","getProperties","method","['aimType','sameSymbolTimeout','differentSymbolTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2081","call setproperty with adaptiveScanning to false.","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'adaptiveScanning'=>false}"],
["Barcode","getProperties","method","['adaptiveScanning']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2082","call setproperty with adaptiveScanning to True.","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'adaptiveScanning'=>true}"],
["Barcode","getProperties","method","['adaptiveScanning']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2083","call setproperty with dbpMode to normal","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'dbpMode'=>'normal'}"],
["Barcode","getProperties","method","['dbpMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2084","call setproperty with dbpMode to composite","composite"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'dbpMode'=>'composite'}"],
["Barcode","getProperties","method","['dbpMode']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2085","call setproperty with timedAimDuration to 4sec with aimType:timedHold",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'timedHold', 'timedAimDuration'=>4000}"],
["Barcode","getProperties","method","['aimType','timedAimDuration']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2086","call setproperty with timedAimDuration to 3 secwith aimType:timedRelease",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'timedRelease', 'timedAimDuration'=>3000}"],
["Barcode","getProperties","method","['aimType','timedAimDuration']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2087","call setproperty with timedAimDuration to 7 sec with aimType:timedRelease",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'timedRelease', 'timedAimDuration'=>7000, 'scanTimeout'=>10000}"],
["Barcode","getProperties","method","['aimType','timedAimDuration','scanTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2088","call setproperty with aimtype:timedHold","timedHold"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'timedHold'}"],
["Barcode","getProperties","method","['aimType']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2089","call setproperty with aimtype:timedRelease","timedRelease"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'timedRelease'}"],
["Barcode","getProperties","method","['aimType']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2090","call setproperty with aimtype::presentation","presentation"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'presentation'}"],
["Barcode","getProperties","method","['aimType']|returnGetProperty","sync"]

]

scannerparams[scannerparams.length] = [["VT282-2091","call setproperty with aimtype::pressAndRelease","pressAndRelease"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'pressAndRelease'}"],
["Barcode","getProperties","method","['aimType']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2092","call setproperty with aimtype::pressAndRelease with valid scantimeout",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'pressAndRelease', 'scanTimeout'=>8000}"],
["Barcode","getProperties","method","['aimType','scanTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2093","call setproperty with aimtype::continuousRead","continuousRead"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'continuousRead'}"],
["Barcode","getProperties","method","['aimType']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2094","call setproperty with aimtype::trigger","trigger"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'aimType'=>'trigger'}"],
["Barcode","getProperties","method","['aimType']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2095","call setproperty with beamWidth to normal","normal"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'beamWidth'=>'normal'}"],
["Barcode","getProperties","method","['beamWidth']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2096","call setproperty with beamWidth  to narrow","narrow"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'beamWidth'=>'narrow'}"],
["Barcode","getProperties","method","['beamWidth']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2097","call setproperty with beamWidth  to wide","wide"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'beamWidth'=>'wide'}"],
["Barcode","getProperties","method","['beamWidth']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2098","call setproperty with connectionIdleTimeout to 10 sec","10000"],
["BarcodeApi","makeSCN3Default","method"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'connectionIdleTimeout'=>10000}"],
["Barcode","getProperties","method","['connectionIdleTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2099","call setproperty with connectionIdleTimeout to 20 sec","20000"],
["BarcodeApi","makeSCN3Default","method"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'connectionIdleTimeout'=>20000}"],
["Barcode","getProperties","method","['connectionIdleTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2109","call setproperty with barcodeDataFormat as binary",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'signature'=>true, 'barcodeDataFormat'=>'binary'}"],
["Barcode","getProperties","method","['signature','barcodeDataFormat']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2110","call setproperty with barcodeDataFormat as text",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'signature'=>true, 'barcodeDataFormat'=>'text', 'dataBufferSize'=>20000}"],
["Barcode","getProperties","method","['signature','barcodeDataFormat','dataBufferSize']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2111","call setproperty with barcodeDataFormat as binary and scan other than signature barcode",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'signature'=>false, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000}"],
["Barcode","getProperties","method","['signature','barcodeDataFormat','dataBufferSize']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2112","call setproperty with barcodeDataFormat as text",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'code128'=>true, 'barcodeDataFormat'=>'text', 'dataBufferSize'=>20000}"],
["Barcode","getProperties","method","['code128','barcodeDataFormat','dataBufferSize']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2113","call setproperty with barcodeDataFormat as test (invalid value)",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>true, 'barcodeDataFormat'=>'text', 'dataBufferSize'=>20000}"],
["Barcode","getProperties","method","['alldecoders','barcodeDataFormat','dataBufferSize']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2114","call setproperty with barcodeDataFormat as empty data",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>true, 'barcodeDataFormat'=>'', 'dataBufferSize'=>20000}"],
["Barcode","getProperties","method","['alldecoders','barcodeDataFormat','dataBufferSize']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2115","call setproperty with barcodeDataFormat as empty data",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>50000}"],
["Barcode","getProperties","method","['alldecoders','barcodeDataFormat','dataBufferSize']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2116","call setproperty with dataBufferSize as 20000",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000}"],
["Barcode","getProperties","method","['alldecoders','barcodeDataFormat','dataBufferSize']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2117","call setproperty with dataBufferSize as 0",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>0}"],
["Barcode","getProperties","method","['alldecoders','barcodeDataFormat','dataBufferSize']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2118","call setproperty with dataBufferSize as -1",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>-1}"],
["Barcode","getProperties","method","['alldecoders','barcodeDataFormat','dataBufferSize']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2119","call setproperty with Signature as true",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2120","call setproperty with Signature as false",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>true, 'signature'=>false, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2121","call setproperty with signatureImageHeight to 300","300"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageHeight'=>300}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageHeight']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2122","call setproperty with signatureImageHeight to 50","50"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageHeight'=>50}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageHeight']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2123","call setproperty with signatureImageHeight to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageHeight'=>0}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageHeight']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2124","call setproperty with signatureImageHeight to -100",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageHeight'=>-100}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageHeight']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2125","call setproperty with signatureImageWidth to 300",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageWidth'=>300}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageWidth']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2126","call setproperty with signatureImageWidth to 50",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageWidth'=>50}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageWidth']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2127","call setproperty with signatureImageWidth to 0",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageWidth'=>0}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageWidth']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2128","call setproperty with signatureImageWidth to  -100",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageWidth'=>-100}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageWidth']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2129","call setproperty with signatureImageQuality to 50","50"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageQuality'=>50}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageQuality']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2130","call setproperty with signatureImageQuality to 95","95"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageQuality'=>95}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageQuality']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2131","call setproperty with signatureImageQuality to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageQuality'=>0}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageQuality']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2132","call setproperty with signatureImageQuality to -20",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageQuality'=>-20}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageQuality']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2133","decode signature barcode with all parameter after setting using setproperty",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>false, 'signature'=>true, 'barcodeDataFormat'=>'binary', 'dataBufferSize'=>20000, 'signatureImageHeight'=>250,'signatureImageWidth'=>150, 'signatureImageQuality'=>50}"],
["Barcode","getProperties","method","['alldecoders','signature','barcodeDataFormat','dataBufferSize','signatureImageHeight','signatureImageWidth','signatureImageQuality']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2134","call setproperty with decodeDuration to 5000","5000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'decodeDuration'=>5000}"],
["Barcode","getProperties","method","['decodeDuration']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2136","call setproperty with decodeDuration to 2000","2000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'decodeDuration'=>2000}"],
["Barcode","getProperties","method","['decodeDuration']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2137","don't call setproperty with decodeDuration","250"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperties","method","['decodeDuration']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2138","call setproperty with decodeFrequency to 65535","65535"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'decodeFrequency'=>65535}"],
["Barcode","getProperties","method","['decodeFrequency']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2139","call setproperty with decodeFrequency to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'decodeFrequency'=>65535}"],
["Barcode","getProperties","method","['decodeFrequency']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2140","don't call setproperty with decodeFrequency","3000"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperty","method","'decodeFrequency'|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2141","call setproperty with invalidDecodeFrequency to 65535","65535"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'invalidDecodeFrequency'=>65535}"],
["Barcode","getProperties","method","['invalidDecodeFrequency']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2142","call setproperty with invalidDecodeFrequency to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'invalidDecodeFrequency'=>0}"],
["Barcode","getProperties","method","['invalidDecodeFrequency']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2143","call setproperty with invalidDecodeFrequency to 0","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'invalidDecodeFrequency'=>0}"],
["Barcode","getProperties","method","['invalidDecodeFrequency']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2143","don't call setproperty with invalidDecodeFrequency","2500"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperties","method","['invalidDecodeFrequency']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2144","call setproperty with decodeSound to local wave file path","2500"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'decodeSound'=>'file://\\\\Application\\\\Alaram5.wav'}"],
["Barcode","getProperties","method","['decodeSound']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2145","call setproperty with decodeSound to invalid path",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'decodeSound'=>'file://\\\\Application\\\\'}"],
["Barcode","getProperties","method","['decodeSound']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2146","call setproperty with invalidDecodeSound to local wave file path",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'invalidDecodeSound'=>'file://\\\\Application\\\\Alaram5.wav'}"],
["Barcode","getProperties","method","['invalidDecodeSound']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2147","call setproperty with invalidDecodeSound to invalid path",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'invalidDecodeSound'=>'file://\\\\Application\\\\'}"],
["Barcode","getProperties","method","['invalidDecodeSound']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2148","call setproperty with decodeVolume to 1",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'decodeVolume'=>1}"],
["Barcode","getProperties","method","['decodeVolume']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2149","call setproperty with decodeVolume to 0",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'decodeVolume'=>1}"],
["Barcode","getProperties","method","['decodeVolume']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2150","don't call setproperty with decodeVolume","5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperties","method","['decodeVolume']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2152","call setproperty with decodeVolume to 0",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'decodeVolume'=>0}"],
["Barcode","getProperties","method","['decodeVolume']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2159","clearAllProperties() with setting  reader params using setproperties",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'picklistMode'=>'softwareReticle', 'scanTimeout'=>7000}"],
["Barcode","getProperties","method","['picklistMode','scanTimeout']|returnGetProperty","sync"],
["Barcode","clearAllProperties","method"],
["Barcode","getProperties","method","['picklistMode','scanTimeout']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2160","clearAllProperties() with decode params using setproperties",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>true, 'code128'=>false}"],
["Barcode","getProperties","method","['alldecoders','code128']|returnGetProperty","sync"],
["Barcode","clearAllProperties","method"],
["Barcode","getProperties","method","['alldecoders','code128']|returnGetProperty","sync"]
]

scannerparams[scannerparams.length] = [["VT282-2161","call getAllProperties() after calling setproperty with reader param",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'picklistMode'=>'softwareReticle', 'scanTimeout'=>7000}"],
["Barcode","getAllProperties","method"]
]

scannerparams[scannerparams.length] = [["VT282-2162","call getAllProperties() after calling setproperty with  decode param",""],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperties","method","{'alldecoders'=>true, 'code93'=>false}"],
["Barcode","getAllProperties","method"]
]
/*





*/
alert(scannerparams.length);

/*









*/