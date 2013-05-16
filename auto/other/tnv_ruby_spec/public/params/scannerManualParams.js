var scannerManualParams = new Array;

/*
scannerManualParams[scannerManualParams.length] = [["VT282-000","set allDecoders true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","allDecoders","true"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
]

scannerManualParams[scannerManualParams.length] = [["VT282-001","set Auspostal true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","allDecoders","false"],
["Barcode","ausPostal","true"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'ausPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-001","set Auspostal true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","allDecoders","false"],
["Barcode","ausPostal","true"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'ausPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-002","set Auspostal false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","allDecoders","true"],
["Barcode","ausPostal","false"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","getProperty","method","'ausPostal'|returnGetProperty","sync"],
]

scannerManualParams[scannerManualParams.length] = [["VT282-003","set canPostal true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","allDecoders","false"],
["Barcode","canPostal","true"],
["Barcode","getProperty","method","'canPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-004","set canPostal false"],
["Barcode","allDecoders","true"],
["Barcode","canPostal","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperty","method","'canPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-005","set codabar true"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","getProperty","method","'codabar'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-006","set codabar false"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-007","set codabarClsiEditing true"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarClsiEditing","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-008","set codabarClsiEditing false"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarClsiEditing","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-010","Set Codabar Lengths to 0"],
["Barcode","codabar","true"],
["Barcode","codabarMaxLength","0"],
["Barcode","codabarMinLength","0"],
["Barcode","codabarClsiEditing","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-011","Set codabarMinLength to 5"],
["Barcode","codabar","true"],
["Barcode","codabarMinLength","5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-012","Set codabarMinLength to 10"],
["Barcode","codabar","true"],
["Barcode","codabarMinLength","10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-013","Set Codabar-MaxLength to 0"],
["Barcode","codabar","true"],
["Barcode","codabarMaxLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-014","set codabarNotisEditing true"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarNotisEditing","true"],
["Barcode","codabarMaxLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-015","set codabarNotisEditing false"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarNotisEditing","false"],
["Barcode","codabarMaxLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-016","set codabarRedundancy true"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarRedundancy","true"],
["Barcode","codabarMaxLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-017","set codabarRedundancy false"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarRedundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-018","set code11 true"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","codabarRedundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-019","set code11 false"],
["Barcode","allDecoders","false"],
["Barcode","setProperty","method","'code11', 'false'"],
["Barcode","codabarRedundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-020","Set code11checkDigitCount to 0"],
["Barcode","code11","true"],
["Barcode","code11checkDigitCount","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-021","Set code11checkDigitCount to 1"],
["Barcode","code11","true"],
["Barcode","code11checkDigitCount","1"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-022","Set code11checkDigitCount to 2"],
["Barcode","code11","true"],
["Barcode","code11checkDigitCount","2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-023","set code11redundancy true"],
["Barcode","code11","true"],
["Barcode","code11redundancy","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-024","set code11redundancy false"],
["Barcode","code11","true"],
["Barcode","code11redundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-025","set code11reportCheckDigit true"],
["Barcode","code11","true"],
["Barcode","code11reportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-026","set code11reportCheckDigit false"],
["Barcode","code11","true"],
["Barcode","code11checkDigitCount","1"],
["Barcode","code11reportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-027","Set code11maxLength to 0"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11maxLength","0"],
["Barcode","code11minLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-028","Set code11maxLength to 10"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11maxLength","10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-029","Set code11minLength to 8"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11minLength","8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-030","Set code11minLength to 10"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11minLength","10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-031","Set code11maxLength to 10 and code11minLength to 7"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11maxLength","10"],
["Barcode","code11minLength","7"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-032","set code128 true"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-033","set code128 false"],
["Barcode","allDecoders","true"],
["Barcode","code128","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-034","set code128ean128 true"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128ean128","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-035","set code128ean128 false"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128ean128","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-036","set code128isbt128 true"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128isbt128","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-037","set code128isbt128 false"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128isbt128","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-038","Set code128maxLength to 0"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128maxLength","0"],
["Barcode","code128minLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-039","Set code128maxLength to 20"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128maxLength","20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-040","Set code128minLength to 8"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128minLength","8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-041","Set code128minLength to 10"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128minLength","10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-042","set code128other128 true with Non EAN/ISBT"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128other128","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-043","set code128other128 true with EAN"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128other128","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-044","set code128other128 true with ISBT"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128other128","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-045","set code128other128 false"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128other128","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-046","set code128redundancy true"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128redundancy","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-047","set code128redundancy false"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128redundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-048","set code128isbt128ConcatMode to Never"],
["Barcode","code128","true"],
["Barcode","code128isbt128ConcatMode","never"],
["Barcode","code128isbt128","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-049","set code128isbt128ConcatMode to always"],
["Barcode","code128","true"],
["Barcode","code128isbt128ConcatMode","always"],
["Barcode","code128isbt128","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-050","set code128isbt128ConcatMode to auto"],
["Barcode","code128","true"],
["Barcode","code128isbt128ConcatMode","auto"],
["Barcode","code128isbt128","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-051","set code128checkIsBtTable true"],
["Barcode","code128","true"],
["Barcode","code128isbt128ConcatMode","always"],
["Barcode","code128isbt128","true"],
["Barcode","code128checkIsBtTable","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-052","set code128checkIsBtTable false"],
["Barcode","code128","true"],
["Barcode","code128isbt128ConcatMode","always"],
["Barcode","code128isbt128","true"],
["Barcode","code128checkIsBtTable","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-053","set code128securityLevel to 0"],
["Barcode","code128","true"],
["Barcode","code128securityLevel","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-054","set code128securityLevel to 1"],
["Barcode","code128","true"],
["Barcode","code128securityLevel","1"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-055","set code128securityLevel to 2"],
["Barcode","code128","true"],
["Barcode","code128securityLevel","2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-056","set code128securityLevel to 3"],
["Barcode","code128","true"],
["Barcode","code128securityLevel","3"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-057","set code39 true"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-058","set code39 false"],
["Barcode","allDecoders","false"],
["Barcode","code39","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-059","set code39code32Prefix true"],
["Barcode","allDecoders","false"],
["Barcode","code39","false"],
["Barcode","code39code32Prefix","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-060","set code39code32Prefix false"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39code32Prefix","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-061","set code39convertToCode32 true"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39convertToCode32","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-062","set code39convertToCode32 false"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39convertToCode32","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-063","set code39fullAscii true"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39fullAscii","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-064","set code39fullAscii false"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39fullAscii","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-065","Set code39maxLength to 0"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39maxLength","0"],
["Barcode","code39minLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-066","Set code39maxLength to 20"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39maxLength","20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-067","Set code39minLength to 8"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39minLength","8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-068","Set code39minLength to 20"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39minLength","20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-069","set code39redundancy true"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code39redundancy","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-070","set code39redundancy false"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code39redundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-071","set code39reportCheckDigit true"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code39reportCheckDigit","true"],
["Barcode","code39verifyCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-072","set code39reportCheckDigit false"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code39reportCheckDigit","false"],
["Barcode","code39verifyCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-073","set code39verifyCheckDigit true"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code39verifyCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-074","set code39verifyCheckDigit false"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code39verifyCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-075","set code39securityLevel to 0"],
["Barcode","code39","true"],
["Barcode","code39securityLevel","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-076","set code39securityLevel to 1"],
["Barcode","code39","true"],
["Barcode","code39securityLevel","1"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-077","set code39securityLevel to 2"],
["Barcode","code39","true"],
["Barcode","code39securityLevel","2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-078","set code39securityLevel to 3"],
["Barcode","code39","true"],
["Barcode","code39securityLevel","3"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-079","set code93 true"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-080","set code93 false"],
["Barcode","allDecoders","false"],
["Barcode","code93","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-081","Set code93maxLength 0"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","code93maxLength","0"],
["Barcode","code93minLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-082","Set code93maxLength 0"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","code93maxLength","20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-083","Set code93minLength 8"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","code93minLength","8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-084","Set code93minLength 10"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","code93minLength","10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-085","set code93redundancy true"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code93redundancy","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-086","set code93redundancy false"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code93redundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-087","set compositeAb true"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","UPCA","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-088","set compositeAb false"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-089","set compositeAbUseUpcPreambleCheckDigitRules as true"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","compositeAbUseUpcPreambleCheckDigitRules","true"],
["Barcode","compositeAbUccLinkMode","always"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-090","set compositeAbUseUpcPreambleCheckDigitRules as false"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","compositeAbUseUpcPreambleCheckDigitRules","false"],
["Barcode","compositeAbUccLinkMode","always"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-091","Set compositeAbUccLinkMode always"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","compositeAbUccLinkMode","always"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-092","Set compositeAbUccLinkMode auto"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","compositeAbUccLinkMode","auto"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-093","Set compositeAbUccLinkMode never"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","compositeAbUccLinkMode","never"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-094","set compositeC true"],
["Barcode","allDecoders","false"],
["Barcode","compositeC","true"],
["Barcode","code128","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-095","set compositeC false"],
["Barcode","allDecoders","true"],
["Barcode","compositeC","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-096","set d2of5 true"],
["Barcode","allDecoders","false"],
["Barcode","d2of5","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-097","set d2of5 false"],
["Barcode","allDecoders","true"],
["Barcode","d2of5","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-098","Set d2of5maxLength to 20"],
["Barcode","allDecoders","false"],
["Barcode","d2of5","true"],
["Barcode","d2of5maxLength","20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-099","Set d2of5minLength to 10"],
["Barcode","allDecoders","false"],
["Barcode","d2of5","true"],
["Barcode","d2of5minLength","10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-100","Set d2of5minLength to 8"],
["Barcode","allDecoders","false"],
["Barcode","d2of5","true"],
["Barcode","d2of5maxLength","20"],
["Barcode","d2of5minLength","8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-101","Set d2of5maxLength to 0"],
["Barcode","allDecoders","false"],
["Barcode","d2of5","true"],
["Barcode","d2of5maxLength","0"],
["Barcode","d2of5minLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-102","set d2of5redundancy true"],
["Barcode","allDecoders","false"],
["Barcode","d2of5redundancy","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-103","set d2of5redundancy false"],
["Barcode","allDecoders","true"],
["Barcode","d2of5redundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-104","set datamatrix true"],
["Barcode","allDecoders","false"],
["Barcode","datamatrix","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-105","set datamatrix false"],
["Barcode","allDecoders","true"],
["Barcode","datamatrix","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-106","set dutchPostal true"],
["Barcode","allDecoders","false"],
["Barcode","dutchPostal","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-107","set dutchPostal false"],
["Barcode","allDecoders","true"],
["Barcode","dutchPostal","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-108","set ean13 true"],
["Barcode","allDecoders","false"],
["Barcode","ean13","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-109","set ean13 false"],
["Barcode","allDecoders","true"],
["Barcode","ean13","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-110","set ean8 true"],
["Barcode","allDecoders","false"],
["Barcode","ean8","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-111","set ean8 false"],
["Barcode","allDecoders","true"],
["Barcode","ean8","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-112","set ean8convertToEan13 true"],
["Barcode","allDecoders","false"],
["Barcode","ean8","true"],
["Barcode","ean8convertToEan13","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-113","set ean8convertToEan13 false"],
["Barcode","allDecoders","false"],
["Barcode","ean8","true"],
["Barcode","ean8convertToEan13","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-114","set i2of5 true"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-115","set i2of5 false"],
["Barcode","allDecoders","true"],
["Barcode","i2of5","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-116","set i2of5convertToEan13 true"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5convertToEan13","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-117","set i2of5convertToEan13 false"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5convertToEan13","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-118","Set i2of5maxLength to 0"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5maxLength","0"],
["Barcode","i2of5minLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-119","Set i2of5maxLength to 13"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5maxLength","13"],
["Barcode","i2of5minLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-120","Set i2of5minLength to 6"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5maxLength","20"],
["Barcode","i2of5minLength","6"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-121","Set i2of5minLength to 12"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5maxLength","20"],
["Barcode","i2of5minLength","12"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-122","set i2of5redundancy true"],
["Barcode","allDecoders","false"],
["Barcode","i2of5redundancy","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-123","set i2of5redundancy false"],
["Barcode","allDecoders","false"],
["Barcode","i2of5redundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-124","set i2of5reportCheckDigit true and i2of5verifyCheckDigit to OPCC"],
["Barcode","i2of5redundancy","false"],
["Barcode","i2of5reportCheckDigit","true"],
["Barcode","i2of5verifyCheckDigit","OPCC"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-124","set i2of5reportCheckDigit true and i2of5verifyCheckDigit to OPCC"],
["Barcode","i2of5redundancy","false"],
["Barcode","i2of5reportCheckDigit","true"],
["Barcode","i2of5verifyCheckDigit","OPCC"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-125","set i2of5reportCheckDigit false and i2of5verifyCheckDigit to OPCC"],
["Barcode","i2of5redundancy","false"],
["Barcode","i2of5reportCheckDigit","false"],
["Barcode","i2of5verifyCheckDigit","OPCC"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-126","set i2of5reportCheckDigit true and i2of5verifyCheckDigit to none"],
["Barcode","i2of5redundancy","false"],
["Barcode","i2of5reportCheckDigit","true"],
["Barcode","i2of5verifyCheckDigit","none"],
["Barcode","i2of5MinLength","1"],
["Barcode","i2of5maxlength","20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-127","set i2of5reportCheckDigit true and i2of5verifyCheckDigit to USS"],
["Barcode","i2of5redundancy","false"],
["Barcode","i2of5reportCheckDigit","true"],
["Barcode","i2of5verifyCheckDigit","USS"],
["Barcode","i2of5MinLength","1"],
["Barcode","i2of5maxlength","20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-128","set i2of5reportCheckDigit false and i2of5verifyCheckDigit to USS"],
["Barcode","i2of5redundancy","false"],
["Barcode","i2of5reportCheckDigit","false"],
["Barcode","i2of5verifyCheckDigit","USS"],
["Barcode","i2of5MinLength","1"],
["Barcode","i2of5maxlength","20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-129","set japPostal true"],
["Barcode","allDecoders","false"],
["Barcode","japPostal","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-130","set japPostal false"],
["Barcode","allDecoders","true"],
["Barcode","japPostal","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-131","set macroMicroPdf true"],
["Barcode","allDecoders","false"],
["Barcode","macroMicroPdf","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-132","set macroMicroPdf false"],
["Barcode","allDecoders","true"],
["Barcode","macroMicroPdf","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-133","Set macroMicroPdfBufferLabels to true."],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","true"],
["Barcode","macroMicroPdfReportAppendInfo","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-134","Set macroMicroPdfBufferLabels to false"],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","false"],
["Barcode","macroMicroPdfReportAppendInfo","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-135","Set macroMicroPdfReportAppendInfo to true."],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","false"],
["Barcode","macroMicroPdfReportAppendInfo","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-136","Set macroMicroPdfExclusive to true."],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","true"],
["Barcode","macroMicroPdfExclusive","true"],
["Barcode","macroMicroPdfReportAppendInfo","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-137","Set macroMicroPdfExclusive to false."],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","true"],
["Barcode","macroMicroPdfExclusive","false"],
["Barcode","macroMicroPdfReportAppendInfo","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-138","Set macroMicroPdfConvertToMicroPdf to true"],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","false"],
["Barcode","macroMicroPdfConvertToMicroPdf","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-139","Set macroMicroPdfConvertToMicroPdf to false"],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","false"],
["Barcode","macroMicroPdfConvertToMicroPdf","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-140","set macroPdf true"],
["Barcode","allDecoders","false"],
["Barcode","macroPdf","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-141","set macroPdf false"],
["Barcode","allDecoders","true"],
["Barcode","macroPdf","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-142","Set macroPdfBufferLabels to true."],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-143","Set macroPdfBufferLabels to false"],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-144","Set macroPdfExclusive to true."],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","true"],
["Barcode","macroPdfExclusive","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-145","Set macroPdfExclusive to false."],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","true"],
["Barcode","macroPdfExclusive","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-146","Set macroPdfConvertToPdf417 to true"],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","false"],
["Barcode","macroPdfConvertToPdf417","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-147","Set macroPdfConvertToPdf417 to false"],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","false"],
["Barcode","macroPdfConvertToPdf417","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-148","set maxiCode true"],
["Barcode","allDecoders","false"],
["Barcode","maxiCode","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-149","set maxiCode false"],
["Barcode","allDecoders","true"],
["Barcode","maxiCode","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-150","set microPdf true"],
["Barcode","allDecoders","false"],
["Barcode","microPdf","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-151","set microPdf false"],
["Barcode","allDecoders","true"],
["Barcode","microPdf","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-152","set msi true"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-153","set msi false"],
["Barcode","allDecoders","true"],
["Barcode","msi","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-154","set msiCheckDigits with one and msiCheckDigitScheme with Mod10"],
["Barcode","allDecoders","true"],
["Barcode","msi","false"],
["Barcode","msiCheckDigits","one"],
["Barcode","msiCheckDigitScheme","mod10"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-155","set msiCheckDigits with two and msiCheckDigitScheme with Mod10"],
["Barcode","allDecoders","true"],
["Barcode","msi","false"],
["Barcode","msiCheckDigits","two"],
["Barcode","msiCheckDigitScheme","mod10"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-156","set msiCheckDigits with one and msiCheckDigitScheme with Mod11"],
["Barcode","allDecoders","true"],
["Barcode","msi","false"],
["Barcode","msiCheckDigits","one"],
["Barcode","msiCheckDigitScheme","mod11"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-157","set msiCheckDigits with two and msiCheckDigitScheme with Mod11"],
["Barcode","allDecoders","true"],
["Barcode","msi","false"],
["Barcode","msiCheckDigits","two"],
["Barcode","msiCheckDigitScheme","mod11"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-158","Set msiMaxLength to 0"],
["Barcode","allDecoders","true"],
["Barcode","msi","true"],
["Barcode","msimaxLength","0"],
["Barcode","msiminLength","0"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-159","Set msiMaxLength to 13"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msimaxLength","13"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-160","Set msiMaxLength to 13 and msiminLength to 8"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msimaxLength","13"],
["Barcode","msiminLength","8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-161","Set msiMaxLength to 10"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msiminLength","10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-162","set msiredundancy true"],
["Barcode","allDecoders","false"],
["Barcode","msiredundancy","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-163","set msiredundancy false"],
["Barcode","allDecoders","false"],
["Barcode","msiredundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-164","set msiReportCheckDigit true"],
["Barcode","allDecoders","false"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-165","set msiReportCheckDigit false"],
["Barcode","allDecoders","false"],
["Barcode","msiReportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-166","set pdf417 true"],
["Barcode","allDecoders","false"],
["Barcode","pdf417","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-167","set pdf417 false"],
["Barcode","allDecoders","false"],
["Barcode","pdf417","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-168","set qrCode true"],
["Barcode","allDecoders","false"],
["Barcode","qrCode","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-169","set qrCode false"],
["Barcode","allDecoders","true"],
["Barcode","qrCode","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-170","set tlc39 true"],
["Barcode","allDecoders","false"],
["Barcode","tlc39","true"],
["Barcode","Code39","true"],
["Barcode","PDF417","true"],
["Barcode","MicroPDF","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-171","set tlc39 false"],
["Barcode","allDecoders","true"],
["Barcode","tlc39","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-172","set trioptic39 true"],
["Barcode","allDecoders","false"],
["Barcode","trioptic39","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-173","set trioptic39 false"],
["Barcode","allDecoders","true"],
["Barcode","trioptic39","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-174","set trioptic39redundancy true"],
["Barcode","allDecoders","false"],
["Barcode","trioptic39redundancy","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-175","set trioptic39redundancy false"],
["Barcode","allDecoders","false"],
["Barcode","trioptic39redundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-176","set ukPostal true"],
["Barcode","allDecoders","false"],
["Barcode","ukPostal","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-177","set ukPostal false"],
["Barcode","allDecoders","true"],
["Barcode","ukPostal","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-178","set ukPostalReportCheckDigit with True"],
["Barcode","allDecoders","false"],
["Barcode","ukPostal","true"],
["Barcode","ukPostalReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-179","set ukPostalReportCheckDigit with False"],
["Barcode","allDecoders","false"],
["Barcode","ukPostal","true"],
["Barcode","ukPostalReportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-180","set upcEanBookland true"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","upcEanBookland","true"],
["Barcode","ukPostalReportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-181","set upcEanBookland false"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","upcEanBookland","false"],
["Barcode","ukPostalReportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-182","Set upcEanBooklandFormat to isbn10"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","upcEanBookland","true"],
["Barcode","upcEanBooklandFormat","isbn10"],
["Barcode","ukPostalReportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-183","Set upcEanBooklandFormat to isbn13"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","upcEanBookland","true"],
["Barcode","upcEanBooklandFormat","isbn13"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-184","set upcEanCoupon True"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","upcEanCoupon","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-185","set upcEanCoupon false"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","code128","true"],
["Barcode","upcEanCoupon","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-186","set upcEanLinearDecode True"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","upcEanLinearDecode","true"],
["Barcode","upcEanCoupon","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-187","set upcEanLinearDecode false"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","code128","true"],
["Barcode","upcEanLinearDecode","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-188","set upcEanRandomWeightCheckDigit True"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","upcEanRandomWeightCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-189","set upcEanRandomWeightCheckDigit false"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","code128","true"],
["Barcode","upcEanRandomWeightCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-190","set upcEanRetryCount to 2"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","code128","true"],
["Barcode","upceansupplementalmode","auto"],
["Barcode","upceanretrycount","2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-191","set upcEanRetryCount to 10"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","code128","true"],
["Barcode","upceansupplementalmode","auto"],
["Barcode","upceanretrycount","10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-192","set upcEanRetryCount to 20"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","code128","true"],
["Barcode","upceansupplementalmode","auto"],
["Barcode","upceanretrycount","20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-193","Set upcEanRetryCount Property to 21(invalid)"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","Ean13","true"],
["Barcode","code128","true"],
["Barcode","upceansupplementalmode","auto"],
["Barcode","upceanretrycount","21"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-194","set upcEanSecurityLevel to 0"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","upcEanSecurityLevel","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-195","set upcEanSecurityLevel to 1"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","upcEanSecurityLevel","1"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-196","set upcEanSecurityLevel to 2"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","upcEanSecurityLevel","2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-197","set upcEanSecurityLevel to 3"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","upcEanSecurityLevel","3"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-198","set upcEanSupplemental2 true"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","upcEanSupplemental2","true"],
["Barcode","upcEanSecurityLevel","3"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-199","set upcEanSupplemental2 false"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","upcEanSupplemental2","false"],
["Barcode","upcEanSecurityLevel","3"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-200","set upcEanSupplemental5 true"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","upcEanSupplemental5","true"],
["Barcode","upcEanSecurityLevel","3"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-201","set upcEanSupplemental5 false"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","upcEanSupplemental5","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-202","set upcEanSupplementalMode None"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-203","set upcEanSupplementalMode always"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-204","set upcEanSupplementalMode auto"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","auto"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-205","set upcEanSupplementalMode smart with scan 978"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","smart"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-206","set upcEanSupplementalMode smart with scan 378"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","smart"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-207","set upcEanSupplementalMode smart with scan 0378"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","smart"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-208","Set upcEanSupplementalMode to 978or979."],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","978or979"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-209","Set upcEanSupplementalMode to 978or979 with suppl2"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","978or979"],
["Barcode","upceansupplemental2","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-210","Set upcEanSupplementalModeto 978or979 with suppl5"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","978or979"],
["Barcode","upceansupplemental5","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-211","Set upcEanSupplementalMode to 978or979 with scan non 978/979"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","978or979"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-212","Set upcEanSupplementalMode to 977 with scan No suppl"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","977"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-213","Set upcEanSupplementalMode to 977 with scan suppl2"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","977"],
["Barcode","upceansupplemental2","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-214","Set upcEanSupplementalMode to 977 with scan suppl5"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","977"],
["Barcode","upceansupplemental5","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-215","Set upcEanSupplementalMode to 977 with scan non 977"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","977"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-216","Set upcEanSupplementalMode to 414or419or434or439 with scan No suppl"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","414or419or434or439"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-217","Set upcEanSupplementalMode to 414or419or434or439 with scan suppl2"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","414or419or434or439"],
["Barcode","upceansupplemental2","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-218","Set upcEanSupplementalMode to 414or419or434or439 with scan suppl5"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","414or419or434or439"],
["Barcode","upceansupplemental5","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-219","Set upcEanSupplementalMode to 414or419or434or439 with scan non 414"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","414or419or434or439"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-220","Set upcEanSupplementalMode to 378or379 with scan No suppl"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","378or379"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-221","Set upcEanSupplementalMode to 378or379 with scan suppl2"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","378or379"],
["Barcode","upceansupplemental2","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-222","Set upcEanSupplementalMode to 378or379 with scan suppl5"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","378or379"],
["Barcode","upceansupplemental5","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-223","Set upcEanSupplementalMode to 378or379 with scan non 378or379"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upceansupplementalmode","378or379"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-224","set upcEanConvertGs1dataBarToUpcEan to true."],
["Barcode","allDecoders","true"],
["Barcode","upca","true"],
["Barcode","Gs1dataBar","true"],
["Barcode","upcEanConvertGs1dataBarToUpcEan","true"],
["Barcode","upceansupplementalmode","378or379"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-225","set upcEanConvertGs1dataBarToUpcEan to false."],
["Barcode","allDecoders","true"],
["Barcode","upca","true"],
["Barcode","Gs1dataBar","true"],
["Barcode","upcEanConvertGs1dataBarToUpcEan","false"],
["Barcode","upceansupplementalmode","378or379"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-226","set upca true"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-227","set upca false"],
["Barcode","allDecoders","true"],
["Barcode","upca","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-228","set upcaPreamble to None"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upcaPreamble","none"],
["Barcode","upcaReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-229","set upcaPreamble to systemChar"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upcaPreamble","systemChar"],
["Barcode","upcaReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-230","set upcaPreamble to countryAndSystemChars"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upcaPreamble","countryAndSystemChars"],
["Barcode","upcaReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-231","set upcaReportCheckDigit true"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upcaReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-232","set upcaReportCheckDigit false"],
["Barcode","allDecoders","false"],
["Barcode","upca","true"],
["Barcode","upcaReportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-233","set upce0 true"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upcaReportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-234","set upce0 false"],
["Barcode","allDecoders","true"],
["Barcode","upce0","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-235","set upce0convertToUpca true"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0convertToUpca","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-236","set upce0convertToUpca false"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0convertToUpca","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-237","set upce0Preamble to None"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0Preamble","none"],
["Barcode","upce0ReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-238","set upce0Preamble to systemChar"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0Preamble","systemChar"],
["Barcode","upce0ReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-239","set upce0Preamble to countryAndSystemChars"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0Preamble","countryAndSystemChars"],
["Barcode","upce0ReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-240","set upce0ReportCheckDigit true"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0ReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-241","set upce0ReportCheckDigit false"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0ReportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-242","set upce1 true"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-243","set upce1 false"],
["Barcode","allDecoders","true"],
["Barcode","upce1","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-244","set upce1convertToUpca true"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1convertToUpca","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-245","set upce1convertToUpca false"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1convertToUpca","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-246","set upce1Preamble to None"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1Preamble","none"],
["Barcode","upce1ReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-247","set upce1Preamble to systemChar"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1Preamble","systemChar"],
["Barcode","upce1ReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-248","set upce1Preamble to countryAndSystemChars"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1Preamble","countryAndSystemChars"],
["Barcode","upce1ReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-249","set upce1ReportCheckDigit true"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1ReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-250","set upce1ReportCheckDigit false"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1ReportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-251","set usPlanet true"],
["Barcode","allDecoders","false"],
["Barcode","usPlanet","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-252","set usPlanet false"],
["Barcode","allDecoders","true"],
["Barcode","usPlanet","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-253","set usPlanetReportCheckDigit with True"],
["Barcode","allDecoders","false"],
["Barcode","usPlanet","true"],
["Barcode","usPlanetReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-254","set usPlanetReportCheckDigit with False"],
["Barcode","allDecoders","false"],
["Barcode","usPlanet","true"],
["Barcode","usPlanetReportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-255","set usPostNet true"],
["Barcode","allDecoders","false"],
["Barcode","usPostNet","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-256","set usPostNet false"],
["Barcode","allDecoders","true"],
["Barcode","usPostNet","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-257","usPostNetReportCheckDigit with True"],
["Barcode","allDecoders","false"],
["Barcode","usPostNet","true"],
["Barcode","usPostNetReportCheckDigit","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-258","usPostNetReportCheckDigit with False"],
["Barcode","allDecoders","false"],
["Barcode","usPostNet","true"],
["Barcode","usPostNetReportCheckDigit","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-259","set webcode true"],
["Barcode","allDecoders","false"],
["Barcode","webcode","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-260","set webcode false"],
["Barcode","allDecoders","true"],
["Barcode","webcode","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-261","set webcodeDecodeGtSubtype True"],
["Barcode","allDecoders","false"],
["Barcode","webcode","true"],
["Barcode","webcodeDecodeGtSubtype","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-262","set webcodeDecodeGtSubtype True"],
["Barcode","allDecoders","false"],
["Barcode","webcode","true"],
["Barcode","webcodeDecodeGtSubtype","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-263","set aztec true"],
["Barcode","allDecoders","false"],
["Barcode","aztec","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-264","set aztec false"],
["Barcode","allDecoders","true"],
["Barcode","aztec","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-265","set chinese2of5 true"],
["Barcode","allDecoders","false"],
["Barcode","chinese2of5","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-266","set chinese2of5 false"],
["Barcode","allDecoders","true"],
["Barcode","chinese2of5","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-267","set korean3of5 true"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-268","set korean3of5 false"],
["Barcode","allDecoders","true"],
["Barcode","korean3of5","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-269","set korean3of5redundancy true"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","korean3of5redundancy","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-270","set korean3of5redundancy false"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","korean3of5redundancy","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-271","Set korean3of5maxLength to 0"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","korean3of5maxLength","0"],
["Barcode","korean3of5minLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-272","Set korean3of5maxLength to 13"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","korean3of5maxLength","13"],
["Barcode","korean3of5minLength","1"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-273","Set korean3of5minLength to 6"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","korean3of5maxLength","20"],
["Barcode","korean3of5minLength","6"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-274","set korean3of5minLength to 12"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","korean3of5maxLength","20"],
["Barcode","korean3of5minLength","12"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-275","set microQr true"],
["Barcode","allDecoders","false"],
["Barcode","microQr","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-276","set microQr false"],
["Barcode","allDecoders","true"],
["Barcode","microQr","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-277","set us4state true"],
["Barcode","allDecoders","false"],
["Barcode","us4state","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-278","set us4state false"],
["Barcode","allDecoders","true"],
["Barcode","us4state","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-279","set us4stateFics true"],
["Barcode","allDecoders","false"],
["Barcode","us4stateFics","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-280","set us4stateFics false"],
["Barcode","allDecoders","true"],
["Barcode","us4stateFics","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-281","set matrix2of5 true"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-282","set matrix2of5 false"],
["Barcode","allDecoders","true"],
["Barcode","matrix2of5","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-283","set matrix2of5maxLength 0 and matrix2of5minLength 0"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5maxLength","0"],
["Barcode","matrix2of5minLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-284","set matrix2of5maxLength 20"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5maxLength","20"],
["Barcode","matrix2of5minLength","1"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-285","set matrix2of5minLength 10"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5maxLength","20"],
["Barcode","matrix2of5minLength","10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-286","set matrix2of5minLength 5"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5maxLength","15"],
["Barcode","matrix2of5minLength","5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-287","Set matrix2of5reportCheckDigit to true and matrix2of5verifyCheckDigit to true"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5verifyCheckDigit","true"],
["Barcode","matrix2of5reportCheckDigit","true"],
["Barcode","matrix2of5minLength","5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-288","Set matrix2of5reportCheckDigit to false and matrix2of5verifyCheckDigit to true"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5verifyCheckDigit","true"],
["Barcode","matrix2of5reportCheckDigit","false"],
["Barcode","matrix2of5minLength","5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-289","Set matrix2of5reportCheckDigit to false and matrix2of5verifyCheckDigit to false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5verifyCheckDigit","false"],
["Barcode","matrix2of5reportCheckDigit","false"],
["Barcode","matrix2of5minLength","5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-290","set gs1dataBar true"],
["Barcode","allDecoders","false"],
["Barcode","gs1dataBar","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-291","set gs1dataBar false"],
["Barcode","allDecoders","true"],
["Barcode","gs1dataBar","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-292","set gs1dataBarExpanded true"],
["Barcode","allDecoders","false"],
["Barcode","gs1dataBarExpanded","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-293","set gs1dataBarExpanded false"],
["Barcode","allDecoders","true"],
["Barcode","gs1dataBarExpanded","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-294","set gs1dataBarLimited true"],
["Barcode","allDecoders","false"],
["Barcode","gs1dataBarLimited","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-295","set gs1dataBarLimited false"],
["Barcode","allDecoders","true"],
["Barcode","gs1dataBarLimited","false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-296","Code128 Decoder with % data"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
]
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////                                                                     /////////////////////////////
////////////////////////////////  SETPROPERTY TEST CASES STARTS FROM HERE                            /////////////////////////////
////////////////////////////////                                                                     /////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
/*
scannerManualParams[scannerManualParams.length] = [["VT282-297","call setproperty with Auspostal true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","setProperty","method","'ausPostal', 'true'"],
["Barcode","getProperty","method","'ausPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-298","call setproperty withAuspostal false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","setProperty","method","'ausPostal', 'false'"],
["Barcode","getProperty","method","'ausPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-299","call setproperty with canPostal true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","setProperty","method","'canPostal', 'true'"],
["Barcode","getProperty","method","'canPostal'|returnGetProperty","sync"],
]

scannerManualParams[scannerManualParams.length] = [["VT282-300","call setproperty with canPostal false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","setProperty","method","'canPostal', 'false'"],
["Barcode","getProperty","method","'canPostal'|returnGetProperty","sync"],
]

scannerManualParams[scannerManualParams.length] = [["VT282-301","call setproperty with codabar true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","getProperty","method","'codabar'|returnGetProperty","sync"],
]

scannerManualParams[scannerManualParams.length] = [["VT282-302","call setproperty with codabar false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","setProperty","method","'codabar', 'false'"],
["Barcode","getProperty","method","'codabar'|returnGetProperty","sync"],
]

// DOUBT: All codabar is getting scanned
scannerManualParams[scannerManualParams.length] = [["VT282-303","call setproperty with codabarClsiEditing true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","setProperty","method","'codabarClsiEditing', 'true'"],
["Barcode","getProperty","method","'codabarClsiEditing'|returnGetProperty","sync"]
]

// DOUBT: All codabar is getting scanned
scannerManualParams[scannerManualParams.length] = [["VT282-304","call setproperty with codabarClsiEditing false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","setProperty","method","'codabarClsiEditing', 'false'"],
["Barcode","getProperty","method","'codabarClsiEditing'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-305","call setproperty with Codabar Lengths to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","setProperty","method","'codabarMaxLength', '0'"],
["Barcode","getProperty","method","'codabarMaxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'codabarMinLength', '0'"],
["Barcode","getProperty","method","'codabarMinLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-306","call setproperty with codabarMaxLength to 12"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","setProperty","method","'codabarMaxLength', '12'"],
["Barcode","getProperty","method","'codabarMaxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'codabarMinLength', '1'"],
["Barcode","getProperty","method","'codabarMinLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-307","call setproperty with codabarMinLength to 5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","setProperty","method","'codabarMinLength', '5'"],
["Barcode","getProperty","method","'codabarMinLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-308","call setproperty with codabarMinLength to 10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","setProperty","method","'codabarMinLength', '10'"],
["Barcode","getProperty","method","'codabarMinLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-309","call setproperty with Codabar-MaxLength to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","setProperty","method","'codabarMaxLength', '0'"],
["Barcode","getProperty","method","'codabarMaxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-310","call setproperty with codabarNotisEditing true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","setProperty","method","'codabarNotisEditing', 'true'"],
["Barcode","getProperty","method","'codabarNotisEditing'|returnGetProperty","sync"]
]

//Failing
scannerManualParams[scannerManualParams.length] = [["VT282-311","call setproperty with codabarNotisEditing false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","setProperty","method","'codabarNotisEditing', 'false'"],
["Barcode","getProperty","method","'codabarNotisEditing'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-312","call setproperty with codabarRedundancy true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","setProperty","method","'codabarRedundancy', 'true'"],
["Barcode","getProperty","method","'codabarRedundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-313","call setproperty with codabarRedundancy false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'codabar', 'true'"],
["Barcode","setProperty","method","'codabarRedundancy', 'false'"],
["Barcode","getProperty","method","'codabarRedundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-314","call setproperty with code11 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","getProperty","method","'code11'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-315","call setproperty with code11 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'code11', 'false'"],
["Barcode","getProperty","method","'code11'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-316","call setproperty with code11checkDigitCount to none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11checkDigitCount', 'none'"],
["Barcode","getProperty","method","'code11checkDigitCount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-317","call setproperty with code11checkDigitCount to one"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11checkDigitCount', 'one'"],
["Barcode","getProperty","method","'code11checkDigitCount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-318","call setproperty with code11checkDigitCount to two"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11checkDigitCount', 'two'"],
["Barcode","getProperty","method","'code11checkDigitCount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-319","call setproperty with code11redundancy true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11redundancy', 'true'"],
["Barcode","getProperty","method","'code11redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-320","call setproperty with code11redundancy false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11redundancy', 'false'"],
["Barcode","getProperty","method","'code11redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-321","call setproperty with code11reportCheckDigit true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11checkDigitCount', 'one'"],
["Barcode","getProperty","method","'code11checkDigitCount'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code11reportCheckDigit', 'true'"],
["Barcode","getProperty","method","'code11reportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-322","call setproperty with code11reportCheckDigit false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11checkDigitCount', 'one'"],
["Barcode","getProperty","method","'code11checkDigitCount'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code11reportCheckDigit', 'false'"],
["Barcode","getProperty","method","'code11reportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-323","call setproperty with code11maxLength to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11maxLength', '0'"],
["Barcode","getProperty","method","'code11maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code11minLength', '0'"],
["Barcode","getProperty","method","'code11minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-324","call setproperty with code11maxLength to 10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11maxLength', '10'"],
["Barcode","getProperty","method","'code11maxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-325","call setproperty with code11minLength to 8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11minLength', '8'"],
["Barcode","getProperty","method","'code11minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-326","call setproperty with code11minLength to 10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11minLength', '10'"],
["Barcode","getProperty","method","'code11minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-327","call setproperty with code11maxLength to 10 and code11minLength to 7"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code11', 'true'"],
["Barcode","setProperty","method","'code11maxLength', '10'"],
["Barcode","getProperty","method","'code11maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code11minLength', '7'"],
["Barcode","getProperty","method","'code11minLength'|returnGetProperty","sync"]
]
*/
scannerManualParams[scannerManualParams.length] = [["VT282-328","call setproperty with   true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","getProperty","method","'code128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-329","call setproperty with code128 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'code128', 'false'"],
["Barcode","getProperty","method","'code128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-330","call setproperty with code128ean128 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128ean128', 'true'"],
["Barcode","getProperty","method","'code128ean128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-331","call setproperty with code128ean128 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128ean128', 'false'"],
["Barcode","getProperty","method","'code128ean128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-332","call setproperty with code128isbt128 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128isbt128', 'true'"],
["Barcode","getProperty","method","'code128isbt128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-333","call setproperty with code128isbt128 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128isbt128', 'false'"],
["Barcode","getProperty","method","'code128isbt128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-334","call setproperty with code128maxLength to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128maxLength', '0'"],
["Barcode","getProperty","method","'code128maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code128minLength', '0'"],
["Barcode","getProperty","method","'code128minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-335","call setproperty with code128maxLength to 20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128maxLength', '20'"],
["Barcode","getProperty","method","'code128maxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-336","call setproperty with code128minLength to 8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128minLength', '8'"],
["Barcode","getProperty","method","'code128minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-337","call setproperty with code128minLength to 10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128minLength', '10'"],
["Barcode","getProperty","method","'code128minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-338","call setproperty with code128other128 true with Non EAN/ISBT"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128other128', 'true'"],
["Barcode","getProperty","method","'code128other128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-339","call setproperty with code128other128 true with EAN"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128other128', 'true'"],
["Barcode","getProperty","method","'code128other128'|returnGetProperty","sync"]

]

scannerManualParams[scannerManualParams.length] = [["VT282-340","call setproperty with code128other128 true with ISBT"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128other128', 'true'"],
["Barcode","getProperty","method","'code128other128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-341","call setproperty with code128other128 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128other128', 'false'"],
["Barcode","getProperty","method","'code128other128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-342","call setproperty with code128redundancy true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128redundancy', 'true'"],
["Barcode","getProperty","method","'code128redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-343","call setproperty with code128redundancy false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128redundancy', 'false'"],
["Barcode","getProperty","method","'code128redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-344","call setproperty with code128isbt128ConcatMode to Never"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128isbt128ConcatMode', 'never'"],
["Barcode","getProperty","method","'code128isbt128ConcatMode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code128isbt128', 'true'"],
["Barcode","getProperty","method","'code128isbt128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-345","call setproperty with code128isbt128ConcatMode to always"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128isbt128ConcatMode', 'always'"],
["Barcode","getProperty","method","'code128isbt128ConcatMode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code128isbt128', 'true'"],
["Barcode","getProperty","method","'code128isbt128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-346","call setproperty with code128isbt128ConcatMode to auto"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128isbt128ConcatMode', 'auto'"],
["Barcode","getProperty","method","'code128isbt128ConcatMode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code128isbt128', 'true'"],
["Barcode","getProperty","method","'code128isbt128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-347","call setproperty with code128checkIsBtTable true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128isbt128ConcatMode', 'always'"],
["Barcode","setProperty","method","'code128isbt128', 'true'"],
["Barcode","setProperty","method","'code128checkIsBtTable', 'true'"],
["Barcode","getProperty","method","'code128checkIsBtTable'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-348","call setproperty with code128checkIsBtTable false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128isbt128ConcatMode', 'always'"],
["Barcode","setProperty","method","'code128isbt128', 'true'"],
["Barcode","setProperty","method","'code128checkIsBtTable', 'true'"],
["Barcode","getProperty","method","'code128checkIsBtTable'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-349","call setproperty with code128securityLevel to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128securityLevel', '0'"],
["Barcode","getProperty","method","'code128securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-350","call setproperty with code128securityLevel to 1"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128securityLevel', '1'"],
["Barcode","getProperty","method","'code128securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-351","call setproperty with code128securityLevel to 2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128securityLevel', '2'"],
["Barcode","getProperty","method","'code128securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-352","call setproperty with code128securityLevel to 3"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'code128securityLevel', '3'"],
["Barcode","getProperty","method","'code128securityLevel'|returnGetProperty","sync"]
]



/*

//NOT TESTED





//WORK
scannerManualParams[scannerManualParams.length] = [["VT282-353","call setproperty with code39 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","getProperty","method","'code39'|returnGetProperty","sync"]
]

//WORK
scannerManualParams[scannerManualParams.length] = [["VT282-354","call setproperty with code39 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'false'"],
["Barcode","getProperty","method","'code39'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-355","call setproperty with code39code32Prefix true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39code32Prefix', 'true'"],
["Barcode","getProperty","method","'code39code32Prefix'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-356","call setproperty with code39code32Prefix false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39code32Prefix', 'false'"],
["Barcode","getProperty","method","'code39code32Prefix'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-357","call setproperty with code39convertToCode32 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39convertToCode32', 'true'"],
["Barcode","getProperty","method","'code39convertToCode32'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-358","call setproperty with code39convertToCode32 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39convertToCode32', 'false'"],
["Barcode","getProperty","method","'code39convertToCode32'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-359","call setproperty with code39fullAscii true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39fullAscii', 'true'"],
["Barcode","getProperty","method","'code39fullAscii'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-360","call setproperty with code39fullAscii false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39fullAscii', 'false'"],
["Barcode","getProperty","method","'code39fullAscii'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-361","call setproperty with code39maxLength to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39maxLength', '0'"],
["Barcode","getProperty","method","'code39maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code39minLength', '0'"],
["Barcode","getProperty","method","'code39minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-362","call setproperty with code39maxLength to 20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39maxLength', '20'"],
["Barcode","getProperty","method","'code39maxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-363","call setproperty with code39minLength to 8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39minLength', '8'"],
["Barcode","getProperty","method","'code39minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-364","call setproperty with code39minLength to 20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39minLength', '20'"],
["Barcode","getProperty","method","'code39minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-365","call setproperty with code39redundancy true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39redundancy', 'true'"],
["Barcode","getProperty","method","'code39redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-366","call setproperty with code39redundancy false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39redundancy', 'false'"],
["Barcode","getProperty","method","'code39redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-367","call setproperty with code39reportCheckDigit true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39reportCheckDigit', 'true'"],
["Barcode","getProperty","method","'code39reportCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code39verifyCheckDigit', 'true'"],
["Barcode","getProperty","method","'code39verifyCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-368","call setproperty with code39reportCheckDigit false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39reportCheckDigit', 'false'"],
["Barcode","getProperty","method","'code39reportCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code39verifyCheckDigit', 'true'"],
["Barcode","getProperty","method","'code39verifyCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-369","call setproperty with code39verifyCheckDigit true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39verifyCheckDigit', 'true'"],
["Barcode","getProperty","method","'code39verifyCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-370","call setproperty with code39verifyCheckDigit false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39verifyCheckDigit', 'false'"],
["Barcode","getProperty","method","'code39verifyCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-371","call setproperty with code39securityLevel to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39securityLevel', '0'"],
["Barcode","getProperty","method","'code39securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-372","call setproperty with code39securityLevel to 1"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39securityLevel', '1'"],
["Barcode","getProperty","method","'code39securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-373","call setproperty with code39securityLevel to 2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39securityLevel', '2'"],
["Barcode","getProperty","method","'code39securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-374","call setproperty with code39securityLevel to 3"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'code39securityLevel', '3'"],
["Barcode","getProperty","method","'code39securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-375","call setproperty with code93 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code93', 'true'"],
["Barcode","getProperty","method","'code93'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-376","call setproperty with code93 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'code93', 'false'"],
["Barcode","getProperty","method","'code93'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-377","call setproperty with code93maxLength 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code93', 'true'"],
["Barcode","setProperty","method","'code93maxLength', '0'"],
["Barcode","getProperty","method","'code93maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code93minLength', '0'"],
["Barcode","getProperty","method","'code93minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-378","call setproperty with code93maxLength 20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code93', 'true'"],
["Barcode","setProperty","method","'code93maxLength', '20'"],
["Barcode","getProperty","method","'code93maxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-379","call setproperty with code93minLength 8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code93', 'true'"],
["Barcode","setProperty","method","'code93minLength', '8'"],
["Barcode","getProperty","method","'code93minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-380","call setproperty with code93minLength 10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code93', 'true'"],
["Barcode","setProperty","method","'code93minLength', '10'"],
["Barcode","getProperty","method","'code93minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-381","call setproperty with code93redundancy true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code93', 'true'"],
["Barcode","setProperty","method","'code93redundancy', 'true'"],
["Barcode","getProperty","method","'code93redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-382","call setproperty with code93redundancy false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code93', 'true'"],
["Barcode","setProperty","method","'code93redundancy', 'false'"],
["Barcode","getProperty","method","'code93redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-383","call setproperty with compositeAb true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'compositeAb', 'true'"],
["Barcode","getProperty","method","'compositeAb'|returnGetProperty","sync"],
["Barcode","setProperty","method","'UPCA', 'true'"],
["Barcode","getProperty","method","'UPCA'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-384","call setproperty with compositeAb false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'compositeAb', 'false'"],
["Barcode","getProperty","method","'compositeAb'|returnGetProperty","sync"],
["Barcode","setProperty","method","'UPCA', 'false'"],
["Barcode","getProperty","method","'UPCA'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-385","call setproperty with compositeAbUseUpcPreambleCheckDigitRules as true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'compositeAb', 'true'"],
["Barcode","setProperty","method","'compositeAbUseUpcPreambleCheckDigitRules', 'true'"],
["Barcode","getProperty","method","'compositeAbUseUpcPreambleCheckDigitRules'|returnGetProperty","sync"],
["Barcode","setProperty","method","'compositeAbUccLinkMode', 'always'"],
["Barcode","getProperty","method","'compositeAbUccLinkMode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'UPCA', 'true'"],
["Barcode","setProperty","method","'upcaPreamble', 'none'"],
["Barcode","getProperty","method","'upcaPreamble'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-386","call setproperty with compositeAbUseUpcPreambleCheckDigitRules as false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'compositeAb', 'true'"],
["Barcode","setProperty","method","'compositeAbUseUpcPreambleCheckDigitRules', 'false'"],
["Barcode","getProperty","method","'compositeAbUseUpcPreambleCheckDigitRules'|returnGetProperty","sync"],
["Barcode","setProperty","method","'compositeAbUccLinkMode', 'always'"],
["Barcode","getProperty","method","'compositeAbUccLinkMode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'UPCA', 'true'"],
["Barcode","setProperty","method","'upcaPreamble', 'none'"],
["Barcode","getProperty","method","'upcaPreamble'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-387","call setproperty with compositeAbUccLinkMode always"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'compositeAb', 'true'"],
["Barcode","setProperty","method","'compositeAbUccLinkMode', 'always'"],
["Barcode","getProperty","method","'compositeAbUccLinkMode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'UPCA', 'true'"],
["Barcode","setProperty","method","'upcaPreamble', 'none'"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-388","call setproperty with compositeAbUccLinkMode auto"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'compositeAb', 'true'"],
["Barcode","setProperty","method","'compositeAbUccLinkMode', 'auto'"],
["Barcode","getProperty","method","'compositeAbUccLinkMode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'UPCA', 'true'"],
["Barcode","setProperty","method","'upcaPreamble', 'none'"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-389","call setproperty with compositeAbUccLinkMode never"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'compositeAb', 'true'"],
["Barcode","setProperty","method","'compositeAbUccLinkMode', 'never'"],
["Barcode","getProperty","method","'compositeAbUccLinkMode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'UPCA', 'true'"],
["Barcode","setProperty","method","'upcaPreamble', 'none'"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-390","call setproperty with compositeC true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'compositeC', 'true'"],
["Barcode","getProperty","method","'compositeC'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code128', 'true'"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-391","call setproperty with compositeC false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'compositeC', 'false'"],
["Barcode","getProperty","method","'compositeC'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-392","call setproperty with d2of5 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'d2of5', 'true'"],
["Barcode","getProperty","method","'d2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-393","call setproperty with d2of5 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'d2of5', 'false'"],
["Barcode","getProperty","method","'d2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-394","call setproperty with d2of5maxLength to 20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'d2of5', 'true'"],
["Barcode","setProperty","method","'d2of5maxLength', '20'"],
["Barcode","getProperty","method","'d2of5maxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-395","call setproperty with d2of5minLength to 10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'d2of5', 'true'"],
["Barcode","setProperty","method","'d2of5minLength', '10'"],
["Barcode","getProperty","method","'d2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-396","call setproperty with d2of5minLength to 8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'d2of5', 'true'"],
["Barcode","setProperty","method","'d2of5maxLength', '20'"],
["Barcode","getProperty","method","'d2of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'d2of5minLength', '8'"],
["Barcode","getProperty","method","'d2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-397","call setproperty with d2of5maxLength to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'d2of5', 'true'"],
["Barcode","setProperty","method","'d2of5maxLength', '0'"],
["Barcode","getProperty","method","'d2of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'d2of5minLength', '0'"],
["Barcode","getProperty","method","'d2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-398","call setproperty with d2of5redundancy true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'d2of5redundancy', 'true'"],
["Barcode","getProperty","method","'d2of5redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-399","call setproperty with d2of5redundancy false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'d2of5redundancy', 'false'"],
["Barcode","getProperty","method","'d2of5redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-400","call setproperty with datamatrix true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'datamatrix', 'true'"],
["Barcode","getProperty","method","'datamatrix'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-401","call setproperty with datamatrix false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'datamatrix', 'false'"],
["Barcode","getProperty","method","'datamatrix'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-402","call setproperty with dutchPostal true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'dutchPostal', 'true'"],
["Barcode","getProperty","method","'dutchPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-403","call setproperty with dutchPostal false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'dutchPostal', 'false'"],
["Barcode","getProperty","method","'dutchPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-404","call setproperty with ean13 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'ean13', 'true'"],
["Barcode","getProperty","method","'ean13'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-405","call setproperty with ean13 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'ean13', 'false'"],
["Barcode","getProperty","method","'ean13'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-406","call setproperty with ean8 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'ean8', 'true'"],
["Barcode","getProperty","method","'ean8'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-407","call setproperty with ean8 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'ean8', 'false'"],
["Barcode","getProperty","method","'ean8'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-408","call setproperty with ean8convertToEan13 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'ean8', 'true'"],
["Barcode","setProperty","method","'ean8convertToEan13', 'true'"],
["Barcode","getProperty","method","'ean8convertToEan13'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-409","call setproperty with ean8convertToEan13 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'ean8', 'true'"],
["Barcode","setProperty","method","'ean8convertToEan13', 'false'"],
["Barcode","getProperty","method","'ean8convertToEan13'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-410","call setproperty with i2of5 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","getProperty","method","'i2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-411","call setproperty with i2of5 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'i2of5', 'false'"],
["Barcode","getProperty","method","'i2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-412","call setproperty with i2of5convertToEan13 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5convertToEan13', 'true'"],
["Barcode","getProperty","method","'i2of5convertToEan13'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-413","call setproperty with i2of5convertToEan13 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5convertToEan13', 'false'"],
["Barcode","getProperty","method","'i2of5convertToEan13'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-414","call setproperty with i2of5maxLength to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5maxLength', '0'"],
["Barcode","getProperty","method","'i2of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5minLength', '0'"],
["Barcode","getProperty","method","'i2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-415","call setproperty with i2of5maxLength to 13"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5maxLength', '13'"],
["Barcode","getProperty","method","'i2of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5minLength', '0'"],
["Barcode","getProperty","method","'i2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-416","call setproperty with i2of5minLength to 6"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5maxLength', '20'"],
["Barcode","getProperty","method","'i2of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5minLength', '6'"],
["Barcode","getProperty","method","'i2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-417","call setproperty with i2of5minLength to 12"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5maxLength', '20'"],
["Barcode","getProperty","method","'i2of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5minLength', '12'"],
["Barcode","getProperty","method","'i2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-418","call setproperty with i2of5redundancy true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5redundancy', 'true'"],
["Barcode","getProperty","method","'i2of5redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-419","call setproperty with i2of5redundancy false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5redundancy', 'false'"],
["Barcode","getProperty","method","'i2of5redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-420","call setproperty with i2of5reportCheckDigit true and i2of5verifyCheckDigit to OPCC"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5reportCheckDigit', 'true'"],
["Barcode","getProperty","method","'i2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5verifyCheckDigit', 'OPCC'"],
["Barcode","getProperty","method","'i2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5minLength', '1'"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-421","call setproperty with i2of5reportCheckDigit false and i2of5verifyCheckDigit to OPCC"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5reportCheckDigit', 'false'"],
["Barcode","getProperty","method","'i2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5verifyCheckDigit', 'OPCC'"],
["Barcode","getProperty","method","'i2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5minLength', '1'"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-422","call setproperty with i2of5reportCheckDigit true and i2of5verifyCheckDigit to none"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5verifyCheckDigit', 'none'"],
["Barcode","getProperty","method","'i2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5reportCheckDigit', 'true'"],
["Barcode","getProperty","method","'i2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5minLength', '0'"],
["Barcode","setProperty","method","'i2of5maxLength', '0'"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-423","call setproperty with i2of5reportCheckDigit true and i2of5verifyCheckDigit to USS"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5verifyCheckDigit', 'USS'"],
["Barcode","getProperty","method","'i2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5reportCheckDigit', 'true'"],
["Barcode","getProperty","method","'i2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5minLength', '0'"],
["Barcode","setProperty","method","'i2of5maxLength', '0'"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-424","call setproperty with i2of5reportCheckDigit false and i2of5verifyCheckDigit to USS"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'i2of5', 'true'"],
["Barcode","setProperty","method","'i2of5reportCheckDigit', 'false'"],
["Barcode","getProperty","method","'i2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5verifyCheckDigit', 'USS'"],
["Barcode","getProperty","method","'i2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'i2of5minLength', '0'"],
["Barcode","setProperty","method","'i2of5maxLength', '0'"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-425","call setproperty with japPostal true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'japPostal', 'true'"],
["Barcode","getProperty","method","'japPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-426","call setproperty with japPostal false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'japPostal', 'false'"],
["Barcode","getProperty","method","'japPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-427","call setproperty with macroMicroPdf true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroMicroPdf', 'true'"],
["Barcode","getProperty","method","'macroMicroPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-428","call setproperty with macroMicroPdf false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'macroMicroPdf', 'false'"],
["Barcode","getProperty","method","'macroMicroPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-429","call setproperty with macroMicroPdfBufferLabels to true."],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroMicroPdf', 'true'"],
["Barcode","setProperty","method","'macroMicroPdfBufferLabels', 'true'"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","setProperty","method","'macroMicroPdfReportAppendInfo', 'false'"],
["Barcode","getProperty","method","'macroMicroPdfReportAppendInfo'|returnGetProperty","sync"],
]

scannerManualParams[scannerManualParams.length] = [["VT282-430","call setproperty with macroMicroPdfBufferLabels to false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroMicroPdf', 'true'"],
["Barcode","setProperty","method","'macroMicroPdfBufferLabels', 'false'"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-431","call setproperty with macroMicroPdfReportAppendInfo to true."],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroMicroPdf', 'true'"],
["Barcode","setProperty","method","'macroMicroPdfReportAppendInfo', 'true'"],
["Barcode","getProperty","method","'macroMicroPdfReportAppendInfo'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-432","call setproperty with macroMicroPdfExclusive to true."],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroMicroPdf', 'true'"],
["Barcode","setProperty","method","'macroMicroPdfBufferLabels', 'true'"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","setProperty","method","'macroMicroPdfExclusive', 'true'"],
["Barcode","getProperty","method","'macroMicroPdfExclusive'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-433","call setproperty with macroMicroPdfExclusive to false."],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroMicroPdf', 'true'"],
["Barcode","setProperty","method","'macroMicroPdfBufferLabels', 'true'"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","setProperty","method","'macroMicroPdfExclusive', 'false'"],
["Barcode","getProperty","method","'macroMicroPdfExclusive'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-434","call setproperty with macroMicroPdfConvertToMicroPdf to true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroMicroPdf', 'true'"],
["Barcode","setProperty","method","'macroMicroPdfBufferLabels', 'false'"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","setProperty","method","'macroMicroPdfConvertToMicroPdf', 'true'"],
["Barcode","getProperty","method","'macroMicroPdfConvertToMicroPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-435","call setproperty with macroMicroPdfConvertToMicroPdf to false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroMicroPdf', 'true'"],
["Barcode","setProperty","method","'macroMicroPdfBufferLabels', 'false'"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","setProperty","method","'macroMicroPdfConvertToMicroPdf', 'false'"],
["Barcode","getProperty","method","'macroMicroPdfConvertToMicroPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-436","call setproperty with macroPdf true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroPdf', 'true'"],
["Barcode","getProperty","method","'macroPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-437","call setproperty with macroPdf false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'macroPdf', 'false'"],
["Barcode","getProperty","method","'macroPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-438","call setproperty with macroPdfBufferLabels to true."],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroPdf', 'true'"],
["Barcode","setProperty","method","'macroPdfBufferLabels', 'true'"],
["Barcode","getProperty","method","'macroPdfBufferLabels'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-439","call setproperty with macroPdfBufferLabels to false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroPdf', 'true'"],
["Barcode","setProperty","method","'macroPdfBufferLabels', 'false'"],
["Barcode","getProperty","method","'macroPdfBufferLabels'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-440","call setproperty with macroPdfExclusive to true."],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroPdf', 'true'"],
["Barcode","setProperty","method","'macroPdfBufferLabels', 'true'"],
["Barcode","setProperty","method","'macroPdfExclusive', 'true'"],
["Barcode","getProperty","method","'macroPdfExclusive'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-441","call setproperty with macroPdfExclusive to false."],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroPdf', 'true'"],
["Barcode","setProperty","method","'macroPdfBufferLabels', 'true'"],
["Barcode","setProperty","method","'macroPdfExclusive', 'false'"],
["Barcode","getProperty","method","'macroPdfExclusive'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-442","call setproperty with macroPdfConvertToPdf417 to true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroPdf', 'true'"],
["Barcode","setProperty","method","'macroPdfBufferLabels', 'false'"],
["Barcode","getProperty","method","'macroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","setProperty","method","'macroPdfConvertToPdf417', 'true'"],
["Barcode","getProperty","method","'macroPdfConvertToPdf417'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-443","call setproperty with macroPdfConvertToPdf417 to false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'macroPdf', 'true'"],
["Barcode","setProperty","method","'macroPdfBufferLabels', 'false'"],
["Barcode","getProperty","method","'macroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","setProperty","method","'macroPdfConvertToPdf417', 'false'"],
["Barcode","getProperty","method","'macroPdfConvertToPdf417'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-444","call setproperty with maxiCode true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'maxiCode', 'true'"],
["Barcode","getProperty","method","'maxiCode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-445","call setproperty with maxiCode false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'maxiCode', 'false'"],
["Barcode","getProperty","method","'maxiCode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-446","call setproperty with microPdf true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'microPdf', 'true'"],
["Barcode","getProperty","method","'microPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-447","call setproperty with microPdf false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'microPdf', 'false'"],
["Barcode","getProperty","method","'microPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-448","call setproperty with msi true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","getProperty","method","'msi'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-449","call setproperty with msi false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"]
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'msi', 'false'"],
["Barcode","getProperty","method","'msi'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-450","call setproperty with msiCheckDigits with one and msiCheckDigitScheme with Mod10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msiCheckDigits', 'one'"],
["Barcode","getProperty","method","'msiCheckDigits'|returnGetProperty","sync"],
["Barcode","setProperty","method","'msiCheckDigitScheme', 'mod10'"],
["Barcode","getProperty","method","'msiCheckDigitScheme'|returnGetProperty","sync"],
["Barcode","setProperty","method","'msiReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-451","call setproperty with msiCheckDigits with two and msiCheckDigitScheme with mod11"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msiCheckDigits', 'two'"],
["Barcode","getProperty","method","'msiCheckDigits'|returnGetProperty","sync"],
["Barcode","setProperty","method","'msiCheckDigitScheme', 'mod11'"],
["Barcode","getProperty","method","'msiCheckDigitScheme'|returnGetProperty","sync"],
["Barcode","setProperty","method","'msiReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-452","call setproperty with msiCheckDigits with one and msiCheckDigitScheme with Mod11"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msiCheckDigits', 'one'"],
["Barcode","getProperty","method","'msiCheckDigits'|returnGetProperty","sync"],
["Barcode","setProperty","method","'msiCheckDigitScheme', 'mod11'"],
["Barcode","getProperty","method","'msiCheckDigitScheme'|returnGetProperty","sync"],
["Barcode","setProperty","method","'msiReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-453","call setproperty with msiCheckDigits with two and msiCheckDigitScheme with Mod11"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msiCheckDigits', 'two'"],
["Barcode","getProperty","method","'msiCheckDigits'|returnGetProperty","sync"],
["Barcode","setProperty","method","'msiCheckDigitScheme', 'mod11'"],
["Barcode","getProperty","method","'msiCheckDigitScheme'|returnGetProperty","sync"],
["Barcode","setProperty","method","'msiReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-454","call setproperty with msiMaxLength to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msimaxLength', '0'"],
["Barcode","getProperty","method","'msimaxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'msiminLength', '0'"],
["Barcode","getProperty","method","'msiminLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-455","call setproperty with msiMaxLength to 13"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msimaxLength', '13'"],
["Barcode","getProperty","method","'msimaxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-456","call setproperty with msiMaxLength to 13 and msiminLength to 8"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msimaxLength', '13'"],
["Barcode","getProperty","method","'msimaxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'msiminLength', '8'"],
["Barcode","getProperty","method","'msiminLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-457","call setproperty with msiMaxLength to 10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msiminLength', '10'"],
["Barcode","getProperty","method","'msiminLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-458","call setproperty with msiredundancy true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msiredundancy', 'true'"],
["Barcode","getProperty","method","'msiredundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-459","call setproperty with msiredundancy false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msiredundancy', 'false'"],
["Barcode","getProperty","method","'msiredundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-460","call setproperty with msiReportCheckDigit true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msiReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-461","call setproperty with msiReportCheckDigit false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'msi', 'true'"],
["Barcode","setProperty","method","'msiReportCheckDigit', 'false'"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-462","call setproperty with pdf417 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'pdf417', 'true'"],
["Barcode","getProperty","method","'pdf417'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-463","call setproperty with pdf417 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'pdf417', 'false'"],
["Barcode","getProperty","method","'pdf417'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-464","call setproperty with qrCode true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'qrCode', 'true'"],
["Barcode","getProperty","method","'qrCode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-465","call setproperty with qrCode false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'qrCode', 'false'"],
["Barcode","getProperty","method","'qrCode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-466","call setproperty with tlc39 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'tlc39', 'true'"],
["Barcode","getProperty","method","'tlc39'|returnGetProperty","sync"],
["Barcode","setProperty","method","'code39', 'true'"],
["Barcode","setProperty","method","'PDF417', 'true'"],
["Barcode","getProperty","method","'PDF417'|returnGetProperty","sync"],
["Barcode","setProperty","method","'MicroPDF', 'true'"],
["Barcode","getProperty","method","'MicroPDF'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-467","call setproperty with tlc39 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'tlc39', 'false'"],
["Barcode","getProperty","method","'tlc39'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-468","call setproperty with trioptic39 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'trioptic39', 'true'"],
["Barcode","getProperty","method","'trioptic39'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-469","call setproperty with trioptic39 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'trioptic39', 'false'"],
["Barcode","getProperty","method","'trioptic39'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-470","call setproperty with trioptic39redundancy true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'trioptic39', 'true'"],
["Barcode","setProperty","method","'trioptic39redundancy', 'true'"],
["Barcode","getProperty","method","'trioptic39redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-471","call setproperty with trioptic39redundancy false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'trioptic39', 'true'"],
["Barcode","setProperty","method","'trioptic39redundancy', 'false'"],
["Barcode","getProperty","method","'trioptic39redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-472","call setproperty with ukPostal true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'ukPostal', 'true'"],
["Barcode","getProperty","method","'ukPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-473","call setproperty with ukPostal false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'ukPostal', 'false'"],
["Barcode","getProperty","method","'ukPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-474","call setproperty with ukPostalReportCheckDigit with True"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'ukPostal', 'true'"],
["Barcode","setProperty","method","'ukPostalReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'ukPostalReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-475","call setproperty with ukPostalReportCheckDigit with False"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'ukPostal', 'true'"],
["Barcode","setProperty","method","'ukPostalReportCheckDigit', 'false'"],
["Barcode","getProperty","method","'ukPostalReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-476","call setproperty with upcEanBookland true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'ean13', 'true'"],
["Barcode","setProperty","method","'upcEanBookland', 'true'"],
["Barcode","getProperty","method","'upcEanBookland'|returnGetProperty","sync"]

]

scannerManualParams[scannerManualParams.length] = [["VT282-477","call setproperty with upcEanBookland false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'ean13', 'true'"],
["Barcode","setProperty","method","'upcEanBookland', 'false'"],
["Barcode","getProperty","method","'upcEanBookland'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-478","call setproperty with upcEanBooklandFormat to isbn10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcEanBookland', 'true'"],
["Barcode","setProperty","method","'upcEanBooklandFormat', 'isbn10'"],
["Barcode","getProperty","method","'upcEanBooklandFormat'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-479","call setproperty with upcEanBooklandFormat to isbn13"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcEanBookland', 'true'"],
["Barcode","setProperty","method","'upcEanBooklandFormat', 'isbn13'"],
["Barcode","getProperty","method","'upcEanBooklandFormat'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-480","call setproperty with upcEanCoupon True"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcEanCoupon', 'true'"],
["Barcode","getProperty","method","'upcEanCoupon'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-481","call setproperty with upcEanCoupon false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","setProperty","method","'upcEanCoupon', 'false'"],
["Barcode","getProperty","method","'upcEanCoupon'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-482","call setproperty with upcEanLinearDecode True"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcEanLinearDecode', 'true'"],
["Barcode","getProperty","method","'upcEanLinearDecode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-483","call setproperty with upcEanLinearDecode false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcEanLinearDecode', 'false'"],
["Barcode","getProperty","method","'upcEanLinearDecode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-484","call setproperty with upcEanRandomWeightCheckDigit True"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcEanRandomWeightCheckDigit', 'true'"],
["Barcode","getProperty","method","'upcEanRandomWeightCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-485","call setproperty with upcEanRandomWeightCheckDigit false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcEanRandomWeightCheckDigit', 'false'"],
["Barcode","getProperty","method","'upcEanRandomWeightCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-486","call setproperty with upcEanRetryCount to 2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'auto'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceanretrycount', '2'"],
["Barcode","getProperty","method","'upceanretrycount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-487","call setproperty with upcEanRetryCount to 10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'auto'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceanretrycount', '10'"],
["Barcode","getProperty","method","'upceanretrycount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-488","call setproperty with upcEanRetryCount to 20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'auto'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceanretrycount', '20'"],
["Barcode","getProperty","method","'upceanretrycount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-489","call setproperty with upcEanRetryCount Property to 21(invalid)"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'auto'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceanretrycount', '21'"],
["Barcode","getProperty","method","'upceanretrycount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-490","call setproperty with upcEanSecurityLevel to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'always'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upcEanSecurityLevel', '0'"],
["Barcode","getProperty","method","'upcEanSecurityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-491","call setproperty with upcEanSecurityLevel to 1"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'always'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upcEanSecurityLevel', '1'"],
["Barcode","getProperty","method","'upcEanSecurityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-492","call setproperty with upcEanSecurityLevel to 2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'always'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upcEanSecurityLevel', '2'"],
["Barcode","getProperty","method","'upcEanSecurityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-493","call setproperty with upcEanSecurityLevel to 3"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'always'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upcEanSecurityLevel', '3'"],
["Barcode","getProperty","method","'upcEanSecurityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-494","call setproperty with upcEanSupplemental2 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'always'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upcEanSupplemental2', 'true'"],
["Barcode","getProperty","method","'upcEanSupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-495","call setproperty with upcEanSupplemental2 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'always'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upcEanSupplemental2', 'false'"],
["Barcode","getProperty","method","'upcEanSupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-496","call setproperty with upcEanSupplemental5 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'always'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upcEanSupplemental5', 'true'"],
["Barcode","getProperty","method","'upcEanSupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-497","call setproperty with upcEanSupplemental5 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'always'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upcEanSupplemental5', 'false'"],
["Barcode","getProperty","method","'upcEanSupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-498","call setproperty with upcEanSupplementalMode None"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'none'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-499","call setproperty with upcEanSupplementalMode always"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'always'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-500","call setproperty with upcEanSupplementalMode auto"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'auto'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-501","call setproperty with upcEanSupplementalMode smart with scan 978"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'smart'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-502","call setproperty with upcEanSupplementalMode smart with scan 378"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'smart'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-503","call setproperty with upcEanSupplementalMode smart with scan 0378"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', 'smart'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-504","call setproperty with upcEanSupplementalMode to 978or979."],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '978or979'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-505","call setproperty with upcEanSupplementalMode to 978or979 with suppl2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '978or979'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceansupplemental2', 'true'"],
["Barcode","getProperty","method","'upceansupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-506","call setproperty with upcEanSupplementalModeto 978or979 with suppl5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '978or979'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceansupplemental5', 'true'"],
["Barcode","getProperty","method","'upceansupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-507","call setproperty with upcEanSupplementalMode to 978or979 with scan non 978/979"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '978or979'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-508","call setproperty with upcEanSupplementalMode to 977 with scan No suppl"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '977'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-509","call setproperty with upcEanSupplementalMode to 977 with scan suppl2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '977'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceansupplemental2', 'true'"],
["Barcode","getProperty","method","'upceansupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-510","call setproperty with upcEanSupplementalMode to 977 with scan suppl5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '977'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceansupplemental5', 'true'"],
["Barcode","getProperty","method","'upceansupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-511","call setproperty with upcEanSupplementalMode to 977 with scan non 977"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '977'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-512","call setproperty with upcEanSupplementalMode to 414or419or434or439 with scan No suppl"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '414or419or434or439'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-513","call setproperty with upcEanSupplementalMode to 414or419or434or439 with scan suppl2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '414or419or434or439'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceansupplemental2', 'true'"],
["Barcode","getProperty","method","'upceansupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-514","call setproperty with upcEanSupplementalMode to 414or419or434or439 with scan suppl5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '414or419or434or439'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceansupplemental5', 'true'"],
["Barcode","getProperty","method","'upceansupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-515","call setproperty with upcEanSupplementalMode to 414or419or434or439 with scan non 414"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '414or419or434or439'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-516","call setproperty with upcEanSupplementalMode to 378or379 with scan No suppl"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '378or379'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-517","call setproperty with upcEanSupplementalMode to 378or379 with scan suppl2"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '378or379'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceansupplemental2', 'true'"],
["Barcode","getProperty","method","'upceansupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-518","call setproperty with upcEanSupplementalMode to 378or379 with scan suppl5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '378or379'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upceansupplemental5', 'true'"],
["Barcode","getProperty","method","'upceansupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-519","call setproperty with upcEanSupplementalMode to 378or379 with scan non 378or379"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upceansupplementalmode', '378or379'"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-520","call setproperty with upcEanConvertGs1dataBarToUpcEan to true."],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'Gs1dataBar', 'true'"],
["Barcode","getProperty","method","'Gs1dataBar'|returnGetProperty","sync"]
["Barcode","setProperty","method","'upcEanConvertGs1dataBarToUpcEan', 'true'"],
["Barcode","getProperty","method","'upcEanConvertGs1dataBarToUpcEan'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-521","call setproperty with upcEanConvertGs1dataBarToUpcEan to false."],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'Gs1dataBar', 'true'"],
["Barcode","getProperty","method","'Gs1dataBar'|returnGetProperty","sync"]
["Barcode","setProperty","method","'upcEanConvertGs1dataBarToUpcEan', 'false'"],
["Barcode","getProperty","method","'upcEanConvertGs1dataBarToUpcEan'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-522","call setproperty with upca true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","getProperty","method","'upca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-523","call setproperty with upca false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'false'"],
["Barcode","getProperty","method","'upca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-524","call setproperty with upcaPreamble to None"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcaPreamble', 'none'"],
["Barcode","getProperty","method","'upcaPreamble'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upcaReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upcaReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-525","call setproperty with upcaPreamble to systemChar"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcaPreamble', 'systemChar'"],
["Barcode","getProperty","method","'upcaPreamble'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upcaReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upcaReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-526","call setproperty with upcaPreamble to countryAndSystemChars"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcaPreamble', 'countryAndSystemChars'"],
["Barcode","getProperty","method","'upcaPreamble'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upcaReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upcaReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-527","call setproperty with upcaReportCheckDigit true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcaReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upcaReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-528","call setproperty with upcaReportCheckDigit false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upca', 'true'"],
["Barcode","setProperty","method","'upcaReportCheckDigit', 'false'"],
["Barcode","getProperty","method","'upcaReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-529","call setproperty with upce0 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce0', 'true'"],
["Barcode","getProperty","method","'upce0'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-530","call setproperty with upce0 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'upce0', 'false'"],
["Barcode","getProperty","method","'upce0'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-531","call setproperty with upce0convertToUpca true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce0', 'true'"],
["Barcode","setProperty","method","'upce0convertToUpca', 'true'"],
["Barcode","getProperty","method","'upce0convertToUpca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-532","call setproperty with upce0convertToUpca false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce0', 'true'"],
["Barcode","setProperty","method","'upce0convertToUpca', 'false'"],
["Barcode","getProperty","method","'upce0convertToUpca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-533","call setproperty with upce0Preamble to None"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce0', 'true'"],
["Barcode","setProperty","method","'upce0Preamble', 'none'"],
["Barcode","getProperty","method","'upce0Preamble'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upce0ReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upce0ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-534","call setproperty with upce0Preamble to systemChar"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce0', 'true'"],
["Barcode","setProperty","method","'upce0Preamble', 'systemChar'"],
["Barcode","getProperty","method","'upce0Preamble'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upce0ReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upce0ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-535","call setproperty with upce0Preamble to countryAndSystemChars"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce0', 'true'"],
["Barcode","setProperty","method","'upce0Preamble', 'countryAndSystemChars'"],
["Barcode","getProperty","method","'upce0Preamble'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upce0ReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upce0ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-536","call setproperty with upce0ReportCheckDigit true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce0', 'true'"],
["Barcode","setProperty","method","'upce0ReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upce0ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-537","call setproperty with upce0ReportCheckDigit false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce0', 'true'"],
["Barcode","setProperty","method","'upce0ReportCheckDigit', 'false'"],
["Barcode","getProperty","method","'upce0ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-538","call setproperty with upce1 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce1', 'true'"],
["Barcode","getProperty","method","'upce1'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-539","call setproperty with upce1 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'upce1', 'false'"],
["Barcode","getProperty","method","'upce1'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-540","call setproperty with upce1convertToUpca true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce1', 'true'"],
["Barcode","setProperty","method","'upce1convertToUpca', 'true'"],
["Barcode","getProperty","method","'upce1convertToUpca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-245","call setproperty with upce1convertToUpca false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce1', 'true'"],
["Barcode","setProperty","method","'upce1convertToUpca', 'false'"],
["Barcode","getProperty","method","'upce1convertToUpca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-246","call setproperty with upce1Preamble to None"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce1', 'true'"],
["Barcode","setProperty","method","'upce1Preamble', 'none'"],
["Barcode","getProperty","method","'upce1Preamble'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upce1ReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upce1ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-247","call setproperty with upce1Preamble to systemChar"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce1', 'true'"],
["Barcode","setProperty","method","'upce1Preamble', 'systemChar'"],
["Barcode","getProperty","method","'upce1Preamble'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upce1ReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upce1ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-248","call setproperty with upce1Preamble to countryAndSystemChars"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce1', 'true'"],
["Barcode","setProperty","method","'upce1Preamble', 'countryAndSystemChars'"],
["Barcode","getProperty","method","'upce1Preamble'|returnGetProperty","sync"],
["Barcode","setProperty","method","'upce1ReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upce1ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-249","call setproperty with upce1ReportCheckDigit true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce1', 'true'"],
["Barcode","setProperty","method","'upce1ReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'upce1ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-250","call setproperty with upce1ReportCheckDigit false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'upce1', 'true'"],
["Barcode","setProperty","method","'upce1ReportCheckDigit', 'false'"],
["Barcode","getProperty","method","'upce1ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-251","call setproperty with usPlanet true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'usPlanet', 'true'"],
["Barcode","getProperty","method","'usPlanet'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-252","call setproperty with usPlanet false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'usPlanet', 'false'"],
["Barcode","getProperty","method","'usPlanet'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-253","call setproperty with usPlanetReportCheckDigit with True"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'usPlanet', 'true'"],
["Barcode","setProperty","method","'usPlanetReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'usPlanetReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-254","call setproperty with usPlanetReportCheckDigit with False"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'usPlanet', 'true'"],
["Barcode","setProperty","method","'usPlanetReportCheckDigit', 'false'"],
["Barcode","getProperty","method","'usPlanetReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-255","call setproperty with usPostNet true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'usPostNet', 'true'"],
["Barcode","getProperty","method","'usPostNet'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-256","call setproperty with usPostNet false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'usPostNet', 'false'"],
["Barcode","getProperty","method","'usPostNet'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-257","usPostNetReportCheckDigit with True"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'usPostNet', 'true'"],
["Barcode","setProperty","method","'usPostNetReportCheckDigit', 'true'"],
["Barcode","getProperty","method","'usPostNetReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-258","usPostNetReportCheckDigit with False"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'usPostNet', 'true'"],
["Barcode","setProperty","method","'usPostNetReportCheckDigit', 'false'"],
["Barcode","getProperty","method","'usPostNetReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-259","call setproperty with webcode true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'webcode', 'true'"],
["Barcode","getProperty","method","'webcode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-260","call setproperty with webcode false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'webcode', 'false'"],
["Barcode","getProperty","method","'webcode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-261","call setproperty with webcodeDecodeGtSubtype True"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'webcode', 'true'"],
["Barcode","setProperty","method","'webcodeDecodeGtSubtype', 'true'"],
["Barcode","getProperty","method","'webcodeDecodeGtSubtype'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-262","call setproperty with webcodeDecodeGtSubtype True"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'webcode', 'true'"],
["Barcode","setProperty","method","'webcodeDecodeGtSubtype', 'false'"],
["Barcode","getProperty","method","'webcodeDecodeGtSubtype'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-263","call setproperty with aztec true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'aztec', 'true'"],
["Barcode","getProperty","method","'aztec'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-264","call setproperty with aztec false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'aztec', 'false'"],
["Barcode","getProperty","method","'aztec'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-265","call setproperty with chinese2of5 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'chinese2of5', 'true'"],
["Barcode","getProperty","method","'chinese2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-266","call setproperty with chinese2of5 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'chinese2of5', 'false'"],
["Barcode","getProperty","method","'chinese2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-267","call setproperty with korean3of5 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'korean3of5', 'true'"],
["Barcode","getProperty","method","'korean3of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-268","call setproperty with korean3of5 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'korean3of5', 'false'"],
["Barcode","getProperty","method","'korean3of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-269","call setproperty with korean3of5redundancy true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'korean3of5', 'true'"],
["Barcode","getProperty","method","'korean3of5'|returnGetProperty","sync"]
["Barcode","setProperty","method","'korean3of5redundancy', 'true'"],
["Barcode","getProperty","method","'korean3of5redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-270","call setproperty with korean3of5redundancy false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'korean3of5', 'true'"],
["Barcode","setProperty","method","'korean3of5redundancy', 'false'"],
["Barcode","getProperty","method","'korean3of5redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-271","call setproperty with korean3of5maxLength to 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'korean3of5', 'true'"],
["Barcode","setProperty","method","'korean3of5maxLength', '0'"],
["Barcode","getProperty","method","'korean3of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'korean3of5minLength', '0'"],
["Barcode","getProperty","method","'korean3of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-272","call setproperty with korean3of5maxLength to 13"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'korean3of5', 'true'"],
["Barcode","setProperty","method","'korean3of5maxLength', '13'"],
["Barcode","getProperty","method","'korean3of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'korean3of5minLength', '1'"],
["Barcode","getProperty","method","'korean3of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-273","call setproperty with korean3of5minLength to 6"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'korean3of5', 'true'"],
["Barcode","setProperty","method","'korean3of5maxLength', '20'"],
["Barcode","getProperty","method","'korean3of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'korean3of5minLength', '6'"],
["Barcode","getProperty","method","'korean3of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-274","call setproperty with korean3of5minLength to 12"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'korean3of5', 'true'"],
["Barcode","setProperty","method","'korean3of5maxLength', '20'"],
["Barcode","getProperty","method","'korean3of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'korean3of5minLength', '12'"],
["Barcode","getProperty","method","'korean3of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-275","call setproperty with microQr true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'microQr', 'true'"],
["Barcode","getProperty","method","'microQr'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-276","call setproperty with microQr false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'microQr', 'false'"],
["Barcode","getProperty","method","'microQr'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-277","call setproperty with us4state true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'us4state', 'true'"],
["Barcode","getProperty","method","'us4state'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-278","call setproperty with us4state false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'us4state', 'false'"],
["Barcode","getProperty","method","'us4state'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-279","call setproperty with us4stateFics true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'us4stateFics', 'true'"],
["Barcode","getProperty","method","'us4stateFics'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-280","call setproperty with us4stateFics false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'us4stateFics', 'false'"],
["Barcode","getProperty","method","'us4stateFics'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-281","call setproperty with matrix2of5 true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'matrix2of5', 'true'"],
["Barcode","getProperty","method","'matrix2of5'|returnGetProperty","sync"]

]

scannerManualParams[scannerManualParams.length] = [["VT282-282","call setproperty with matrix2of5 false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'matrix2of5', 'false'"],
["Barcode","getProperty","method","'matrix2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-283","call setproperty with matrix2of5maxLength 0 and matrix2of5minLength 0"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'matrix2of5', 'true'"],
["Barcode","setProperty","method","'matrix2of5maxLength', '0'"],
["Barcode","getProperty","method","'matrix2of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'matrix2of5minLength', '0'"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-284","call setproperty with matrix2of5maxLength 20"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'matrix2of5', 'true'"],
["Barcode","setProperty","method","'matrix2of5maxLength', '20'"],
["Barcode","getProperty","method","'matrix2of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'matrix2of5minLength', '1'"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-285","call setproperty with matrix2of5minLength 10"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'matrix2of5', 'true'"],
["Barcode","setProperty","method","'matrix2of5maxLength', '20'"],
["Barcode","getProperty","method","'matrix2of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'matrix2of5minLength', '10'"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-286","call setproperty with matrix2of5minLength 5"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'matrix2of5', 'true'"],
["Barcode","setProperty","method","'matrix2of5maxLength', '15'"],
["Barcode","getProperty","method","'matrix2of5maxLength'|returnGetProperty","sync"],
["Barcode","setProperty","method","'matrix2of5minLength', '5'"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-287","call setproperty with matrix2of5reportCheckDigit to true and matrix2of5verifyCheckDigit to true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'matrix2of5', 'true'"],
["Barcode","setProperty","method","'matrix2of5verifyCheckDigit', 'true'"],
["Barcode","getProperty","method","'matrix2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'matrix2of5reportCheckDigit', 'true'"],
["Barcode","getProperty","method","'matrix2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'matrix2of5minLength', '5'"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-288","call setproperty with matrix2of5reportCheckDigit to false and matrix2of5verifyCheckDigit to true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'matrix2of5', 'true'"],
["Barcode","setProperty","method","'matrix2of5verifyCheckDigit', 'true'"],
["Barcode","getProperty","method","'matrix2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'matrix2of5reportCheckDigit', 'false'"],
["Barcode","getProperty","method","'matrix2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'matrix2of5minLength', '5'"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-289","call setproperty with matrix2of5reportCheckDigit to false and matrix2of5verifyCheckDigit to false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'matrix2of5', 'true'"],
["Barcode","setProperty","method","'matrix2of5verifyCheckDigit', 'false'"],
["Barcode","getProperty","method","'matrix2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'matrix2of5reportCheckDigit', 'false'"],
["Barcode","getProperty","method","'matrix2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","setProperty","method","'matrix2of5minLength', '5'"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-290","call setproperty with gs1dataBar true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'gs1dataBar', 'true'"],
["Barcode","getProperty","method","'gs1dataBar'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-291","call setproperty with gs1dataBar false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'gs1dataBar', 'false'"],
["Barcode","getProperty","method","'gs1dataBar'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-292","call setproperty with gs1dataBarExpanded true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'gs1dataBarExpanded', 'true'"],
["Barcode","getProperty","method","'gs1dataBarExpanded'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-293","call setproperty with gs1dataBarExpanded false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'gs1dataBarExpanded', 'false'"],
["Barcode","getProperty","method","'gs1dataBarExpanded'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-294","call setproperty with gs1dataBarLimited true"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'gs1dataBarLimited', 'true'"],
["Barcode","getProperty","method","'gs1dataBarLimited'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-295","call setproperty with gs1dataBarLimited false"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'true'"],
["Barcode","setProperty","method","'gs1dataBarLimited', 'false'"],
["Barcode","getProperty","method","'gs1dataBarLimited'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-296","Code128 Decoder with % data"],
["Barcode","enable","method","{}, url_for(:action => :scanCallbackCommon)","async"],
["Barcode","setProperty","method","'allDecoders', 'false'"],
["Barcode","setProperty","method","'code128', 'true'"],
["Barcode","getProperty","method","'code128'|returnGetProperty","sync"]
]

*/
