var scannerManualParams = new Array;

scannerManualParams[scannerManualParams.length] = [["VT282-297","call setproperty with Auspostal true","11,01234567,63 59 52 57"],
["Barcode","codabarMaxLength","0"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","ausPostal","true"],
["Barcode","getProperty","method","'ausPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-298","call setproperty withAuspostal false","Auspostal Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","ausPostal","false"],
["Barcode","getProperty","method","'ausPostal'|returnGetProperty","sync"]
]
/*
scannerManualParams[scannerManualParams.length] = [["VT282-299","call setproperty with canPostal true","1300112031112322022100200000001030301322131011011113,0,0"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","canPostal","true"],
["Barcode","getProperty","method","'canPostal'|returnGetProperty","sync"],
]

scannerManualParams[scannerManualParams.length] = [["VT282-300","call setproperty with canPostal false","Canpostal Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","canPostal","false"],
["Barcode","getProperty","method","'canPostal'|returnGetProperty","sync"],
]
*/
//Codabar
scannerManualParams[scannerManualParams.length] = [["VT282-301","call setproperty with codabar true","A12345678901234567890122B"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","codabar","true"],
["Barcode","getProperty","method","'codabar'|returnGetProperty","sync"],
]

scannerManualParams[scannerManualParams.length] = [["VT282-302","call setproperty with codabar false","Codabar should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","getProperty","method","'allDecoders'|returnGetProperty","sync"],
["Barcode","codabar","false"],
["Barcode","getProperty","method","'codabar'|returnGetProperty","sync"],
]

// DOUBT: All codabar is getting scanned
scannerManualParams[scannerManualParams.length] = [["VT282-303","call setproperty with codabarClsiEditing true","0 1234 56789 0123"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarClsiEditing","true"],
["Barcode","getProperty","method","'codabarClsiEditing'|returnGetProperty","sync"]
]

// DOUBT: All codabar is getting scanned
scannerManualParams[scannerManualParams.length] = [["VT282-304","call setproperty with codabarClsiEditing false","A01234567890123B"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarClsiEditing","false"],
["Barcode","getProperty","method","'codabarClsiEditing'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-305","call setproperty with Codabar Lengths to 0","A12345678901234567890122B"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarMaxLength","0"],
["Barcode","getProperty","method","'codabarMaxLength'|returnGetProperty","sync"],
["Barcode","codabarMinLength","0"],
["Barcode","getProperty","method","'codabarMinLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-306","call setproperty with codabarMaxLength to 12","Barcode of length more than 12 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarMaxLength","12"],
["Barcode","getProperty","method","'codabarMaxLength'|returnGetProperty","sync"],
["Barcode","codabarMinLength","1"],
["Barcode","getProperty","method","'codabarMinLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-307","call setproperty with codabarMinLength to 5","A123456-B"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarMinLength","5"],
["Barcode","getProperty","method","'codabarMinLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-308","call setproperty with codabarMinLength to 10","Barcode of length less than 10 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarMinLength","10"],
["Barcode","getProperty","method","'codabarMinLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-309","call setproperty with Codabar-MaxLength to 0","Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarMaxLength","0"],
["Barcode","getProperty","method","'codabarMaxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-310","call setproperty with codabarNotisEditing true","1234567890123:"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarNotisEditing","true"],
["Barcode","getProperty","method","'codabarNotisEditing'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-311","call setproperty with codabarNotisEditing false","A1234567890123:B"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarNotisEditing","false"],
["Barcode","getProperty","method","'codabarNotisEditing'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-312","call setproperty with codabarRedundancy true","A50105090$B"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarRedundancy","true"],
["Barcode","getProperty","method","'codabarRedundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-313","call setproperty with codabarRedundancy false","A50105090$B"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","codabar","true"],
["Barcode","codabarRedundancy","false"],
["Barcode","getProperty","method","'codabarRedundancy'|returnGetProperty","sync"]
]

//Code11
scannerManualParams[scannerManualParams.length] = [["VT282-314","call setproperty with code11 true","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","getProperty","method","'code11'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-315","call setproperty with code11 false","Code11 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","code11","false"],
["Barcode","getProperty","method","'code11'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-316","call setproperty with code11checkDigitCount to none","12345678901"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11checkDigitCount","none"],
["Barcode","getProperty","method","'code11checkDigitCount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-317","call setproperty with code11checkDigitCount to one","12345678901"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11checkDigitCount","one"],
["Barcode","getProperty","method","'code11checkDigitCount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-318","call setproperty with code11checkDigitCount to two","123456789019"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11checkDigitCount","two"],
["Barcode","getProperty","method","'code11checkDigitCount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-319","call setproperty with code11redundancy true","1234567890"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11redundancy","true"],
["Barcode","getProperty","method","'code11redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-320","call setproperty with code11redundancy false","1234567890"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11redundancy","false"],
["Barcode","getProperty","method","'code11redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-321","call setproperty with code11reportCheckDigit true","12345678901"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11checkDigitCount","one"],
["Barcode","getProperty","method","'code11checkDigitCount'|returnGetProperty","sync"],
["Barcode","code11reportCheckDigit","true"],
["Barcode","getProperty","method","'code11reportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-322","call setproperty with code11reportCheckDigit false","1234567890"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11checkDigitCount","one"],
["Barcode","getProperty","method","'code11checkDigitCount'|returnGetProperty","sync"],
["Barcode","code11reportCheckDigit","false"],
["Barcode","getProperty","method","'code11reportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-323","call setproperty with code11maxLength to 0","1234567890"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11maxLength","0"],
["Barcode","getProperty","method","'code11maxLength'|returnGetProperty","sync"],
["Barcode","code11minLength","0"],
["Barcode","getProperty","method","'code11minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-324","call setproperty with code11maxLength to 10","Barcode of length greater than 10 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11maxLength","10"],
["Barcode","getProperty","method","'code11maxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-325","call setproperty with code11minLength to 8","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11minLength","8"],
["Barcode","getProperty","method","'code11minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-326","call setproperty with code11minLength to 10","Barcode of length less than not should not decode"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11minLength","10"],
["Barcode","getProperty","method","'code11minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-327","call setproperty with code11maxLength to 10 and code11minLength to 7","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code11","true"],
["Barcode","code11maxLength","10"],
["Barcode","getProperty","method","'code11maxLength'|returnGetProperty","sync"],
["Barcode","code11minLength","7"],
["Barcode","getProperty","method","'code11minLength'|returnGetProperty","sync"]
]

//Code128
scannerManualParams[scannerManualParams.length] = [["VT282-328","call setproperty with true","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","getProperty","method","'code128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-329","call setproperty with code128 false","code128 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","code128","false"],
["Barcode","getProperty","method","'code128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-330","call setproperty with code128ean128 true","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128ean128","true"],
["Barcode","getProperty","method","'code128ean128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-331","call setproperty with code128ean128 false","EAN128 subtype Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128ean128","false"],
["Barcode","getProperty","method","'code128ean128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-332","call setproperty with code128isbt128 true","=G1517006000014"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128isbt128","true"],
["Barcode","getProperty","method","'code128isbt128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-333","call setproperty with code128isbt128 false","isbt128 subtype Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128isbt128","false"],
["Barcode","getProperty","method","'code128isbt128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-334","call setproperty with code128maxLength to 0","1234567890123456789012"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128maxLength","0"],
["Barcode","getProperty","method","'code128maxLength'|returnGetProperty","sync"],
["Barcode","code128minLength","0"],
["Barcode","getProperty","method","'code128minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-335","call setproperty with code128maxLength to 20","code128 of length more than 20 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128maxLength","20"],
["Barcode","getProperty","method","'code128maxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-336","call setproperty with code128minLength to 8","12345"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128minLength","8"],
["Barcode","getProperty","method","'code128minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-337","call setproperty with code128minLength to 10","code128 of length less than 10 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128minLength","10"],
["Barcode","getProperty","method","'code128minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-338","call setproperty with code128other128 true with Non EAN/ISBT","1234567890"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128other128","true"],
["Barcode","getProperty","method","'code128other128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-339","call setproperty with code128other128 true with EAN","other (non EAN or ISBT) 128 subtype Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128other128","true"],
["Barcode","getProperty","method","'code128other128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-340","call setproperty with code128other128 true with ISBT",""],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128other128","true"],
["Barcode","getProperty","method","'code128other128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-341","call setproperty with code128other128 false","other (non EAN or ISBT) 128 subtype Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128other128","false"],
["Barcode","getProperty","method","'code128other128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-342","call setproperty with code128redundancy true","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128redundancy","true"],
["Barcode","getProperty","method","'code128redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-343","call setproperty with code128redundancy false","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128redundancy","false"],
["Barcode","getProperty","method","'code128redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-344","call setproperty with code128isbt128ConcatMode to Never","W12340312345600"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128isbt128ConcatMode","never"],
["Barcode","getProperty","method","'code128isbt128ConcatMode'|returnGetProperty","sync"],
["Barcode","code128isbt128","true"],
["Barcode","getProperty","method","'code128isbt128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-345","call setproperty with code128isbt128ConcatMode to always","=W12340312345600=<E1234A00"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128isbt128ConcatMode","always"],
["Barcode","getProperty","method","'code128isbt128ConcatMode'|returnGetProperty","sync"],
["Barcode","code128isbt128","true"],
["Barcode","getProperty","method","'code128isbt128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-346","call setproperty with code128isbt128ConcatMode to auto","=W12340312345600=<E1234A00"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128isbt128ConcatMode","auto"],
["Barcode","getProperty","method","'code128isbt128ConcatMode'|returnGetProperty","sync"],
["Barcode","code128isbt128","true"],
["Barcode","getProperty","method","'code128isbt128'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-347","call setproperty with code128checkIsBtTable true","All the Pair barcodes of ISBT table should decode (commonly concatenated pair)"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128isbt128ConcatMode","always"],
["Barcode","code128isbt128","true"],
["Barcode","code128checkIsBtTable","true"],
["Barcode","getProperty","method","'code128checkIsBtTable'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-348","call setproperty with code128checkIsBtTable false","other pair(not commonly concatenated) also can decode"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128isbt128ConcatMode","always"],
["Barcode","code128isbt128","true"],
["Barcode","code128checkIsBtTable","false"],
["Barcode","getProperty","method","'code128checkIsBtTable'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-349","call setproperty with code128securityLevel to 0","CODE 128"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128securityLevel","0"],
["Barcode","getProperty","method","'code128securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-350","call setproperty with code128securityLevel to 1","CODE 128"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128securityLevel","1"],
["Barcode","getProperty","method","'code128securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-351","call setproperty with code128securityLevel to 2","CODE 128"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128securityLevel","2"],
["Barcode","getProperty","method","'code128securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-352","call setproperty with code128securityLevel to 3","CODE 128"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","code128securityLevel","3"],
["Barcode","getProperty","method","'code128securityLevel'|returnGetProperty","sync"]
]

//Code39
scannerManualParams[scannerManualParams.length] = [["VT282-353","call setproperty with code39 true","50105090K"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","getProperty","method","'code39'|returnGetProperty","sync"]
]


scannerManualParams[scannerManualParams.length] = [["VT282-354","call setproperty with code39 false","code39 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","false"],
["Barcode","getProperty","method","'code39'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-355","call setproperty with code39code32Prefix true","A012354650"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39code32Prefix","true"],
["Barcode","getProperty","method","'code39code32Prefix'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-356","call setproperty with code39code32Prefix false","012354650"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39code32Prefix","false"],
["Barcode","getProperty","method","'code39code32Prefix'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-357","call setproperty with code39convertToCode32 true","012354650"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39convertToCode32","true"],
["Barcode","getProperty","method","'code39convertToCode32'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-358","call setproperty with code39convertToCode32 false","0CT12U"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39convertToCode32","false"],
["Barcode","getProperty","method","'code39convertToCode32'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-359","call setproperty with code39fullAscii true","$ %/"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39fullAscii","true"],
["Barcode","getProperty","method","'code39fullAscii'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-360","call setproperty with code39fullAscii false","/D /E/O"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39fullAscii","false"],
["Barcode","getProperty","method","'code39fullAscii'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-361","call setproperty with code39maxLength to 0","123456789012345H"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39maxLength","0"],
["Barcode","getProperty","method","'code39maxLength'|returnGetProperty","sync"],
["Barcode","code39minLength","0"],
["Barcode","getProperty","method","'code39minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-362","call setproperty with code39maxLength to 20","code39 Barcode of length greater than 14 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39maxLength","20"],
["Barcode","getProperty","method","'code39maxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-363","call setproperty with code39minLength to 8","123456L"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39minLength","8"],
["Barcode","getProperty","method","'code39minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-364","call setproperty with code39minLength to 20","code39 Barcode of length less than 10 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39minLength","20"],
["Barcode","getProperty","method","'code39minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-365","call setproperty with code39redundancy true","50105090K"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39redundancy","true"],
["Barcode","getProperty","method","'code39redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-366","call setproperty with code39redundancy false","50105090K"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39redundancy","false"],
["Barcode","getProperty","method","'code39redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-367","call setproperty with code39reportCheckDigit true","50105090K"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39reportCheckDigit","true"],
["Barcode","getProperty","method","'code39reportCheckDigit'|returnGetProperty","sync"],
["Barcode","code39verifyCheckDigit","true"],
["Barcode","getProperty","method","'code39verifyCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-368","call setproperty with code39reportCheckDigit false","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39reportCheckDigit","false"],
["Barcode","getProperty","method","'code39reportCheckDigit'|returnGetProperty","sync"],
["Barcode","code39verifyCheckDigit","true"],
["Barcode","getProperty","method","'code39verifyCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-369","call setproperty with code39verifyCheckDigit true","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39verifyCheckDigit","true"],
["Barcode","getProperty","method","'code39verifyCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-370","call setproperty with code39verifyCheckDigit false","50105090K"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39verifyCheckDigit","false"],
["Barcode","getProperty","method","'code39verifyCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-371","call setproperty with code39securityLevel to 0","50105090K"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39securityLevel","0"],
["Barcode","getProperty","method","'code39securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-372","call setproperty with code39securityLevel to 1","50105090K"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39securityLevel","1"],
["Barcode","getProperty","method","'code39securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-373","call setproperty with code39securityLevel to 2","50105090K"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39securityLevel","2"],
["Barcode","getProperty","method","'code39securityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-374","call setproperty with code39securityLevel to 3","50105090K"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code39","true"],
["Barcode","code39securityLevel","3"],
["Barcode","getProperty","method","'code39securityLevel'|returnGetProperty","sync"]
]


//code93
scannerManualParams[scannerManualParams.length] = [["VT282-375","call setproperty with code93 true","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","getProperty","method","'code93'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-376","call setproperty with code93 false","code93 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","code93","false"],
["Barcode","getProperty","method","'code93'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-377","call setproperty with code93maxLength 0","1234567890123456789012"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","code93maxLength","0"],
["Barcode","getProperty","method","'code93maxLength'|returnGetProperty","sync"],
["Barcode","code93minLength","0"],
["Barcode","getProperty","method","'code93minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-378","call setproperty with code93maxLength 20","Barcode of length grater than 20 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","code93maxLength","20"],
["Barcode","getProperty","method","'code93maxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-379","call setproperty with code93minLength 8","12345"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","code93minLength","8"],
["Barcode","getProperty","method","'code93minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-380","call setproperty with code93minLength 10","Barcode of length less than 10  should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","code93minLength","10"],
["Barcode","getProperty","method","'code93minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-381","call setproperty with code93redundancy true","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","code93redundancy","true"],
["Barcode","getProperty","method","'code93redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-382","call setproperty with code93redundancy false","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code93","true"],
["Barcode","code93redundancy","false"],
["Barcode","getProperty","method","'code93redundancy'|returnGetProperty","sync"]
]

//compositeAB
scannerManualParams[scannerManualParams.length] = [["VT282-383","call setproperty with compositeAb true","010064141499721012345678914"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","getProperty","method","'compositeAb'|returnGetProperty","sync"],
["Barcode","UPCA","true"],
["Barcode","getProperty","method","'UPCA'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-384","call setproperty with compositeAb false","compositeAb Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","compositeAb","false"],
["Barcode","getProperty","method","'compositeAb'|returnGetProperty","sync"],
["Barcode","UPCA","false"],
["Barcode","getProperty","method","'UPCA'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-385","call setproperty with compositeAbUseUpcPreambleCheckDigitRules as true","10064141499721012345678914"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","compositeAbUseUpcPreambleCheckDigitRules","true"],
["Barcode","getProperty","method","'compositeAbUseUpcPreambleCheckDigitRules'|returnGetProperty","sync"],
["Barcode","compositeAbUccLinkMode","always"],
["Barcode","getProperty","method","'compositeAbUccLinkMode'|returnGetProperty","sync"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","none"],
["Barcode","getProperty","method","'upcaPreamble'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-386","call setproperty with compositeAbUseUpcPreambleCheckDigitRules as false","010064141499721012345678914"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","compositeAbUseUpcPreambleCheckDigitRules","false"],
["Barcode","getProperty","method","'compositeAbUseUpcPreambleCheckDigitRules'|returnGetProperty","sync"],
["Barcode","compositeAbUccLinkMode","always"],
["Barcode","getProperty","method","'compositeAbUccLinkMode'|returnGetProperty","sync"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","none"],
["Barcode","getProperty","method","'upcaPreamble'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-387","call setproperty with compositeAbUccLinkMode always","010064141499721012345678914"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","compositeAbUccLinkMode","always"],
["Barcode","getProperty","method","'compositeAbUccLinkMode'|returnGetProperty","sync"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","none"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-388","call setproperty with compositeAbUccLinkMode auto","100641414997 or 010064141499721012345678914"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","compositeAbUccLinkMode","auto"],
["Barcode","getProperty","method","'compositeAbUccLinkMode'|returnGetProperty","sync"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","none"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-389","call setproperty with compositeAbUccLinkMode never","100641414997"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","compositeAb","true"],
["Barcode","compositeAbUccLinkMode","never"],
["Barcode","getProperty","method","'compositeAbUccLinkMode'|returnGetProperty","sync"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","none"]
]

//compositeC
scannerManualParams[scannerManualParams.length] = [["VT282-390","call setproperty with compositeC true","0191234567890121310100035510ABC123%1D90"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","compositeC","true"],
["Barcode","getProperty","method","'compositeC'|returnGetProperty","sync"],
["Barcode","code128","true"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-391","call setproperty with compositeC false","compositeC Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","compositeC","false"],
["Barcode","getProperty","method","'compositeC'|returnGetProperty","sync"]
]

//D2of5
scannerManualParams[scannerManualParams.length] = [["VT282-392","call setproperty with d2of5 true","501050900"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","d2of5","true"],
["Barcode","getProperty","method","'d2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-393","call setproperty with d2of5 false","d2of5 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","d2of5","false"],
["Barcode","getProperty","method","'d2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-394","call setproperty with d2of5maxLength to 20","d2of5Barcode of length greater than 20 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","d2of5","true"],
["Barcode","d2of5maxLength","20"],
["Barcode","getProperty","method","'d2of5maxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-395","call setproperty with d2of5minLength to 10","1234565"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","d2of5","true"],
["Barcode","d2of5minLength","10"],
["Barcode","getProperty","method","'d2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-396","call setproperty with d2of5minLength to 8","1234565"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","d2of5","true"],
["Barcode","d2of5maxLength","20"],
["Barcode","getProperty","method","'d2of5maxLength'|returnGetProperty","sync"],
["Barcode","d2of5minLength","8"],
["Barcode","getProperty","method","'d2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-397","call setproperty with d2of5maxLength to 0","d2of5Barcode of length less than 10 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","d2of5","true"],
["Barcode","d2of5maxLength","0"],
["Barcode","getProperty","method","'d2of5maxLength'|returnGetProperty","sync"],
["Barcode","d2of5minLength","0"],
["Barcode","getProperty","method","'d2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-398","call setproperty with d2of5redundancy true","501050900"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","d2of5redundancy","true"],
["Barcode","getProperty","method","'d2of5redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-399","call setproperty with d2of5redundancy false","501050900"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","d2of5redundancy","false"],
["Barcode","getProperty","method","'d2of5redundancy'|returnGetProperty","sync"]
]

//datamatrix
scannerManualParams[scannerManualParams.length] = [["VT282-400","call setproperty with datamatrix true","0123456789ABCDEFGHIJKLMNOPQRST"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","datamatrix","true"],
["Barcode","getProperty","method","'datamatrix'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-401","call setproperty with datamatrix false","DataMatrix Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","datamatrix","false"],
["Barcode","getProperty","method","'datamatrix'|returnGetProperty","sync"]
]

//DutchPostal
scannerManualParams[scannerManualParams.length] = [["VT282-402","call setproperty with dutchPostal true","1230AA156XHUIS"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","dutchPostal","true"],
["Barcode","getProperty","method","'dutchPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-403","call setproperty with dutchPostal false","DutchPostal Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","dutchPostal","false"],
["Barcode","getProperty","method","'dutchPostal'|returnGetProperty","sync"]
]

//Ean13
scannerManualParams[scannerManualParams.length] = [["VT282-404","call setproperty with ean13 true","9780201546101"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","ean13","true"],
["Barcode","getProperty","method","'ean13'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-405","call setproperty with ean13 false","ean13 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","ean13","false"],
["Barcode","getProperty","method","'ean13'|returnGetProperty","sync"]
]

//Ean8
scannerManualParams[scannerManualParams.length] = [["VT282-406","call setproperty with ean8 true","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","ean8","true"],
["Barcode","getProperty","method","'ean8'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-407","call setproperty with ean8 false","ean8 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","ean8","false"],
["Barcode","getProperty","method","'ean8'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-408","call setproperty with ean8convertToEan13 true","0000050105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","ean8","true"],
["Barcode","ean8convertToEan13","true"],
["Barcode","getProperty","method","'ean8convertToEan13'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-409","call setproperty with ean8convertToEan13 false","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","ean8","true"],
["Barcode","ean8convertToEan13","false"],
["Barcode","getProperty","method","'ean8convertToEan13'|returnGetProperty","sync"]
]

//i2of5
scannerManualParams[scannerManualParams.length] = [["VT282-410","call setproperty with i2of5 true","0501050900"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","getProperty","method","'i2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-411","call setproperty with i2of5 false","i2of5 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","i2of5","false"],
["Barcode","getProperty","method","'i2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-412","call setproperty with i2of5convertToEan13 true","5000328748054"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5convertToEan13","true"],
["Barcode","getProperty","method","'i2of5convertToEan13'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-413","call setproperty with i2of5convertToEan13 false","05000328748054"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5convertToEan13","false"],
["Barcode","getProperty","method","'i2of5convertToEan13'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-414","call setproperty with i2of5maxLength to 0","0123456789012343"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5maxLength","0"],
["Barcode","getProperty","method","'i2of5maxLength'|returnGetProperty","sync"],
["Barcode","i2of5minLength","0"],
["Barcode","getProperty","method","'i2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-415","call setproperty with i2of5maxLength to 13","i2of5 Barcode of length greater than 13 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5maxLength","13"],
["Barcode","getProperty","method","'i2of5maxLength'|returnGetProperty","sync"],
["Barcode","i2of5minLength","0"],
["Barcode","getProperty","method","'i2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-416","call setproperty with i2of5minLength to 6","1234567895"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5maxLength","20"],
["Barcode","getProperty","method","'i2of5maxLength'|returnGetProperty","sync"],
["Barcode","i2of5minLength","6"],
["Barcode","getProperty","method","'i2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-417","call setproperty with i2of5minLength to 12","i2of5 Barcode of length less than 12 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5maxLength","20"],
["Barcode","getProperty","method","'i2of5maxLength'|returnGetProperty","sync"],
["Barcode","i2of5minLength","12"],
["Barcode","getProperty","method","'i2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-418","call setproperty with i2of5redundancy true","0501050900"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5redundancy","true"],
["Barcode","getProperty","method","'i2of5redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-419","call setproperty with i2of5redundancy false","0501050900"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5redundancy","false"],
["Barcode","getProperty","method","'i2of5redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-420","call setproperty with i2of5reportCheckDigit true and i2of5verifyCheckDigit to OPCC","01234566"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5reportCheckDigit","true"],
["Barcode","getProperty","method","'i2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","i2of5verifyCheckDigit","OPCC"],
["Barcode","getProperty","method","'i2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","i2of5minLength","1"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-421","call setproperty with i2of5reportCheckDigit false and i2of5verifyCheckDigit to OPCC","0123456"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5reportCheckDigit","false"],
["Barcode","getProperty","method","'i2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","i2of5verifyCheckDigit","OPCC"],
["Barcode","getProperty","method","'i2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","i2of5minLength","1"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-422","call setproperty with i2of5reportCheckDigit true and i2of5verifyCheckDigit to none","50105095"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5verifyCheckDigit","none"],
["Barcode","getProperty","method","'i2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","i2of5reportCheckDigit","true"],
["Barcode","getProperty","method","'i2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","i2of5minLength","0"],
["Barcode","i2of5maxLength","0"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-423","call setproperty with i2of5reportCheckDigit true and i2of5verifyCheckDigit to USS","46421548"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5verifyCheckDigit","USS"],
["Barcode","getProperty","method","'i2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","i2of5reportCheckDigit","true"],
["Barcode","getProperty","method","'i2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","i2of5minLength","0"],
["Barcode","i2of5maxLength","0"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-424","call setproperty with i2of5reportCheckDigit false and i2of5verifyCheckDigit to USS","4642154"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","i2of5","true"],
["Barcode","i2of5reportCheckDigit","false"],
["Barcode","getProperty","method","'i2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","i2of5verifyCheckDigit","USS"],
["Barcode","getProperty","method","'i2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","i2of5minLength","0"],
["Barcode","i2of5maxLength","0"]
]

//JapPostal
scannerManualParams[scannerManualParams.length] = [["VT282-425","call setproperty with japPostal true","1698790135"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","japPostal","true"],
["Barcode","getProperty","method","'japPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-426","call setproperty with japPostal false","JapPostal Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","japPostal","false"],
["Barcode","getProperty","method","'japPostal'|returnGetProperty","sync"]
]

//MacroMicroPDF
scannerManualParams[scannerManualParams.length] = [["VT282-427","call setproperty with macroMicroPdf true","THE GETTYSBURG ADDRESS:%0D%0A%0D%0AFour score and seven years ago our fathers brought forth on this%0D%0Acontinent a new nation, conc"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroMicroPdf","true"],
["Barcode","getProperty","method","'macroMicroPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-428","call setproperty with macroMicroPdf false","MacroMicroPDF Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","macroMicroPdf","false"],
["Barcode","getProperty","method","'macroMicroPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-429","call setproperty with macroMicroPdfBufferLabels to true","barcode data will appear only after decoding complete MacroMicroPDF sequence"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","true"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","macroMicroPdfReportAppendInfo","false"],
["Barcode","getProperty","method","'macroMicroPdfReportAppendInfo'|returnGetProperty","sync"],
]

scannerManualParams[scannerManualParams.length] = [["VT282-430","call setproperty with macroMicroPdfBufferLabels to false","barcode data will appear after each decode of MacroMicroPDF sequence"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","false"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-431","call setproperty with macroMicroPdfReportAppendInfo to true","decode should successful"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfReportAppendInfo","true"],
["Barcode","getProperty","method","'macroMicroPdfReportAppendInfo'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-432","call setproperty with macroMicroPdfExclusive to true","decode should successful after decoding complete MacroMicroPDF sequence"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","true"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","macroMicroPdfExclusive","true"],
["Barcode","getProperty","method","'macroMicroPdfExclusive'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-433","call setproperty with macroMicroPdfExclusive to false","decode should successful after decoding complete MacroMicroPDF sequence"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","true"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","macroMicroPdfExclusive","false"],
["Barcode","getProperty","method","'macroMicroPdfExclusive'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-434","call setproperty with macroMicroPdfConvertToMicroPdf to true","Decode should successful and source should be of MicroPDF type"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","false"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","macroMicroPdfConvertToMicroPdf","true"],
["Barcode","getProperty","method","'macroMicroPdfConvertToMicroPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-435","call setproperty with macroMicroPdfConvertToMicroPdf to false","Decode should successful and source should be of MicroPDF type"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroMicroPdf","true"],
["Barcode","macroMicroPdfBufferLabels","false"],
["Barcode","getProperty","method","'macroMicroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","macroMicroPdfConvertToMicroPdf","false"],
["Barcode","getProperty","method","'macroMicroPdfConvertToMicroPdf'|returnGetProperty","sync"]
]

//MacroPDF
scannerManualParams[scannerManualParams.length] = [["VT282-436","call setproperty with macroPdf true","012345,<.>/?kla&*()'~-_=+\ABCDEFghijklmnoPQRSTUVWXYZabcdefGHI"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroPdf","true"],
["Barcode","getProperty","method","'macroPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-437","call setproperty with macroPdf false","MacroPDF Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","macroPdf","false"],
["Barcode","getProperty","method","'macroPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-438","call setproperty with macroPdfBufferLabels to true","barcode data will appear only after decoding complete MacroPDF sequence"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","true"],
["Barcode","getProperty","method","'macroPdfBufferLabels'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-439","call setproperty with macroPdfBufferLabels to false","barcode data will appear after each decode of MacroPDF sequence"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","false"],
["Barcode","getProperty","method","'macroPdfBufferLabels'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-440","call setproperty with macroPdfExclusive to true","barcode data will appear only after decoding complete MacroPDF sequence"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","true"],
["Barcode","macroPdfExclusive","true"],
["Barcode","getProperty","method","'macroPdfExclusive'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-441","call setproperty with macroPdfExclusive to false","barcode data will appear only after decoding complete MacroPDF sequence"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","true"],
["Barcode","macroPdfExclusive","false"],
["Barcode","getProperty","method","'macroPdfExclusive'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-442","call setproperty with macroPdfConvertToPdf417 to true","Decode should successful and source should be of PDF417 type"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","false"],
["Barcode","getProperty","method","'macroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","macroPdfConvertToPdf417","true"],
["Barcode","getProperty","method","'macroPdfConvertToPdf417'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-443","call setproperty with macroPdfConvertToPdf417 to false","Decode should successful and source should be of MACROPDF type"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","macroPdf","true"],
["Barcode","macroPdfBufferLabels","false"],
["Barcode","getProperty","method","'macroPdfBufferLabels'|returnGetProperty","sync"],
["Barcode","macroPdfConvertToPdf417","false"],
["Barcode","getProperty","method","'macroPdfConvertToPdf417'|returnGetProperty","sync"]
]

//MaxiCode
scannerManualParams[scannerManualParams.length] = [["VT282-444","call setproperty with maxiCode true","431991111%1D420%1D196%1D6759 Port Road GroveportOH"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","maxiCode","true"],
["Barcode","getProperty","method","'maxiCode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-445","call setproperty with maxiCode false","MaxiCode Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","maxiCode","false"],
["Barcode","getProperty","method","'maxiCode'|returnGetProperty","sync"]
]

//MicroPDF
scannerManualParams[scannerManualParams.length] = [["VT282-446","call setproperty with microPdf true","Symbol PocketBrowser"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","microPdf","true"],
["Barcode","getProperty","method","'microPdf'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-447","call setproperty with microPdf false","MicroPDF Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","microPdf","false"],
["Barcode","getProperty","method","'microPdf'|returnGetProperty","sync"]
]

//msi
scannerManualParams[scannerManualParams.length] = [["VT282-448","call setproperty with msi true","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","getProperty","method","'msi'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-449","call setproperty with msi false","msi Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"]
["Barcode","allDecoders","true"],
["Barcode","msi","false"],
["Barcode","getProperty","method","'msi'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-450","call setproperty with msiCheckDigits with one and msiCheckDigitScheme with Mod10","20205977"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msiCheckDigits","one"],
["Barcode","getProperty","method","'msiCheckDigits'|returnGetProperty","sync"],
["Barcode","msiCheckDigitScheme","mod10"],
["Barcode","getProperty","method","'msiCheckDigitScheme'|returnGetProperty","sync"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-451","call setproperty with msiCheckDigits with two and msiCheckDigitScheme with mod11","11882276584"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msiCheckDigits","two"],
["Barcode","getProperty","method","'msiCheckDigits'|returnGetProperty","sync"],
["Barcode","msiCheckDigitScheme","mod11"],
["Barcode","getProperty","method","'msiCheckDigitScheme'|returnGetProperty","sync"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-452","call setproperty with msiCheckDigits with one and msiCheckDigitScheme with Mod11","11882276584"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msiCheckDigits","one"],
["Barcode","getProperty","method","'msiCheckDigits'|returnGetProperty","sync"],
["Barcode","msiCheckDigitScheme","mod11"],
["Barcode","getProperty","method","'msiCheckDigitScheme'|returnGetProperty","sync"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-453","call setproperty with msiCheckDigits with two and msiCheckDigitScheme with Mod11","4131216667"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msiCheckDigits","two"],
["Barcode","getProperty","method","'msiCheckDigits'|returnGetProperty","sync"],
["Barcode","msiCheckDigitScheme","mod11"],
["Barcode","getProperty","method","'msiCheckDigitScheme'|returnGetProperty","sync"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-454","call setproperty with msiMaxLength to 0","1234567890123456789012"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msimaxLength","0"],
["Barcode","getProperty","method","'msimaxLength'|returnGetProperty","sync"],
["Barcode","msiminLength","0"],
["Barcode","getProperty","method","'msiminLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-455","call setproperty with msiMaxLength to 13","msi Barcode of length greater than 13 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msimaxLength","13"],
["Barcode","getProperty","method","'msimaxLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-456","call setproperty with msiMaxLength to 13 and msiminLength to 8","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msimaxLength","13"],
["Barcode","getProperty","method","'msimaxLength'|returnGetProperty","sync"],
["Barcode","msiminLength","8"],
["Barcode","getProperty","method","'msiminLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-457","call setproperty with msiMaxLength to 10","msi Barcode of length less than 10 should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msiminLength","10"],
["Barcode","getProperty","method","'msiminLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-458","call setproperty with msiredundancy true","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msiredundancy","true"],
["Barcode","getProperty","method","'msiredundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-459","call setproperty with msiredundancy false","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msiredundancy","false"],
["Barcode","getProperty","method","'msiredundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-460","call setproperty with msiReportCheckDigit true","501050900"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msiReportCheckDigit","true"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-461","call setproperty with msiReportCheckDigit false","50105090"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","msi","true"],
["Barcode","msiReportCheckDigit","false"],
["Barcode","getProperty","method","'msiReportCheckDigit'|returnGetProperty","sync"]
]

//PDF417
scannerManualParams[scannerManualParams.length] = [["VT282-462","call setproperty with pdf417 true","ABCDEFGHIJK"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","pdf417","true"],
["Barcode","getProperty","method","'pdf417'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-463","call setproperty with pdf417 false","PDF417 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","pdf417","false"],
["Barcode","getProperty","method","'pdf417'|returnGetProperty","sync"]
]

//Qrcode
scannerManualParams[scannerManualParams.length] = [["VT282-464","call setproperty with qrCode true","0123456789abcdefghijklmnop"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","qrCode","true"],
["Barcode","getProperty","method","'qrCode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-465","call setproperty with qrCode false","Qrcode Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","qrCode","false"],
["Barcode","getProperty","method","'qrCode'|returnGetProperty","sync"]
]

//tlc39
scannerManualParams[scannerManualParams.length] = [["VT282-466","call setproperty with tlc39 true","[)>%1D06%1D6P123456%1DSABCD12345678901234%1D%1D"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","tlc39","true"],
["Barcode","getProperty","method","'tlc39'|returnGetProperty","sync"],
["Barcode","code39","true"],
["Barcode","PDF417","true"],
["Barcode","getProperty","method","'PDF417'|returnGetProperty","sync"],
["Barcode","MicroPDF","true"],
["Barcode","getProperty","method","'MicroPDF'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-467","call setproperty with tlc39 false","tlc39 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","tlc39","false"],
["Barcode","getProperty","method","'tlc39'|returnGetProperty","sync"]
]

//trioptic39
scannerManualParams[scannerManualParams.length] = [["VT282-468","call setproperty with trioptic39 true","Y10345"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","trioptic39","true"],
["Barcode","getProperty","method","'trioptic39'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-469","call setproperty with trioptic39 false","Trioptic39 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","trioptic39","false"],
["Barcode","getProperty","method","'trioptic39'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-470","call setproperty with trioptic39redundancy true","Y10345"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","trioptic39","true"],
["Barcode","trioptic39redundancy","true"],
["Barcode","getProperty","method","'trioptic39redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-471","call setproperty with trioptic39redundancy false","Y10345"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","trioptic39","true"],
["Barcode","trioptic39redundancy","false"],
["Barcode","getProperty","method","'trioptic39redundancy'|returnGetProperty","sync"]
]

//ukPostal
scannerManualParams[scannerManualParams.length] = [["VT282-472","call setproperty with ukPostal true","N211QT"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","ukPostal","true"],
["Barcode","getProperty","method","'ukPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-473","call setproperty with ukPostal false","UKPostal Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","ukPostal","false"],
["Barcode","getProperty","method","'ukPostal'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-474","call setproperty with ukPostalReportCheckDigit with True","N211QTR"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","ukPostal","true"],
["Barcode","ukPostalReportCheckDigit","true"],
["Barcode","getProperty","method","'ukPostalReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-475","call setproperty with ukPostalReportCheckDigit with False","N211QT"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","ukPostal","true"],
["Barcode","ukPostalReportCheckDigit","false"],
["Barcode","getProperty","method","'ukPostalReportCheckDigit'|returnGetProperty","sync"]
]

//upca-ean
scannerManualParams[scannerManualParams.length] = [["VT282-476","call setproperty with upcEanBookland true","0201608375"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","ean13","true"],
["Barcode","upcEanBookland","true"],
["Barcode","getProperty","method","'upcEanBookland'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-477","call setproperty with upcEanBookland false","9780201608373"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","ean13","true"],
["Barcode","upcEanBookland","false"],
["Barcode","getProperty","method","'upcEanBookland'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-478","call setproperty with upcEanBooklandFormat to isbn10","0201608375"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcEanBookland","true"],
["Barcode","upcEanBooklandFormat","isbn10"],
["Barcode","getProperty","method","'upcEanBooklandFormat'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-479","call setproperty with upcEanBooklandFormat to isbn13","0911261095"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcEanBookland","true"],
["Barcode","upcEanBooklandFormat","isbn13"],
["Barcode","getProperty","method","'upcEanBooklandFormat'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-480","call setproperty with upcEanCoupon True","5446000005538100093619"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcEanCoupon","true"],
["Barcode","getProperty","method","'upcEanCoupon'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-481","call setproperty with upcEanCoupon false","544600000553"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","code128","true"],
["Barcode","upcEanCoupon","false"],
["Barcode","getProperty","method","'upcEanCoupon'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-482","call setproperty with upcEanLinearDecode True","037812345678"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcEanLinearDecode","true"],
["Barcode","getProperty","method","'upcEanLinearDecode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-483","call setproperty with upcEanLinearDecode false","037812345678"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcEanLinearDecode","false"],
["Barcode","getProperty","method","'upcEanLinearDecode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-484","call setproperty with upcEanRandomWeightCheckDigit True","037812345678"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcEanRandomWeightCheckDigit","true"],
["Barcode","getProperty","method","'upcEanRandomWeightCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-485","call setproperty with upcEanRandomWeightCheckDigit false","037812345678"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcEanRandomWeightCheckDigit","false"],
["Barcode","getProperty","method","'upcEanRandomWeightCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-486","call setproperty with upcEanRetryCount to 2","09781234567212"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","auto"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceanretrycount","2"],
["Barcode","getProperty","method","'upceanretrycount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-487","call setproperty with upcEanRetryCount to 10","09781234567212"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","auto"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceanretrycount","10"],
["Barcode","getProperty","method","'upceanretrycount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-488","call setproperty with upcEanRetryCount to 20","01234567890512345"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","auto"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceanretrycount","20"],
["Barcode","getProperty","method","'upceanretrycount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-489","call setproperty with upcEanRetryCount Property to 21(invalid)","09781234567212"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","auto"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceanretrycount","21"],
["Barcode","getProperty","method","'upceanretrycount'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-490","call setproperty with upcEanSecurityLevel to 0","09781234567212"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upcEanSecurityLevel","0"],
["Barcode","getProperty","method","'upcEanSecurityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-491","call setproperty with upcEanSecurityLevel to 1","09781234567212"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upcEanSecurityLevel","1"],
["Barcode","getProperty","method","'upcEanSecurityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-492","call setproperty with upcEanSecurityLevel to 2","01234567890599"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upcEanSecurityLevel","2"],
["Barcode","getProperty","method","'upcEanSecurityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-493","call setproperty with upcEanSecurityLevel to 3","01234567890599"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upcEanSecurityLevel","3"],
["Barcode","getProperty","method","'upcEanSecurityLevel'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-494","call setproperty with upcEanSupplemental2 true","09781234567212"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upcEanSupplemental2","true"],
["Barcode","getProperty","method","'upcEanSupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-495","call setproperty with upcEanSupplemental2 false","Supplemental2 Barcodes should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upcEanSupplemental2","false"],
["Barcode","getProperty","method","'upcEanSupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-496","call setproperty with upcEanSupplemental5 true","09781234567212345"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upcEanSupplemental5","true"],
["Barcode","getProperty","method","'upcEanSupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-497","call setproperty with upcEanSupplemental5 false","Supplemental5 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upcEanSupplemental5","false"],
["Barcode","getProperty","method","'upcEanSupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-498","call setproperty with upcEanSupplementalMode None","097812345672"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upceansupplementalmode","none"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-499","call setproperty with upcEanSupplementalMode always","09781234567212"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","always"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-500","call setproperty with upcEanSupplementalMode auto","09781234567212 or 097812345672"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","auto"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-501","call setproperty with upcEanSupplementalMode smart with scan 978","097812345672"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","smart"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-502","call setproperty with upcEanSupplementalMode smart with scan 378"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","smart"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-503","call setproperty with upcEanSupplementalMode smart with scan 0378"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","smart"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-504","call setproperty with upcEanSupplementalMode to 978or979","9791234567896"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","978or979"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-505","call setproperty with upcEanSupplementalMode to 978or979 with suppl2","979123456789612"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","978or979"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceansupplemental2","true"],
["Barcode","getProperty","method","'upceansupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-506","call setproperty with upcEanSupplementalModeto 978or979 with suppl5","979123456789612345"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","978or979"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceansupplemental5","true"],
["Barcode","getProperty","method","'upceansupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-507","call setproperty with upcEanSupplementalMode to 978or979 with scan non 978/979","037812345678"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","978or979"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-508","call setproperty with upcEanSupplementalMode to 977 with scan No suppl","9771234567898"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","977"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-509","call setproperty with upcEanSupplementalMode to 977 with scan suppl2","977123456789812"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","977"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceansupplemental2","true"],
["Barcode","getProperty","method","'upceansupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-510","call setproperty with upcEanSupplementalMode to 977 with scan suppl5","977123456789812345"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","977"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceansupplemental5","true"],
["Barcode","getProperty","method","'upceansupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-511","call setproperty with upcEanSupplementalMode to 977 with scan non 977","4391234567893"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","977"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-512","call setproperty with upcEanSupplementalMode to 414or419or434or439 with scan No suppl","4141234567894"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","414or419or434or439"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-513","call setproperty with upcEanSupplementalMode to 414or419or434or439 with scan suppl2","414123456789412"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","414or419or434or439"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceansupplemental2","true"],
["Barcode","getProperty","method","'upceansupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-514","call setproperty with upcEanSupplementalMode to 414or419or434or439 with scan suppl5","414123456789412345"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","414or419or434or439"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceansupplemental5","true"],
["Barcode","getProperty","method","'upceansupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-515","call setproperty with upcEanSupplementalMode to 414or419or434or439 with scan non 414","9781234567897"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","414or419or434or439"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-516","call setproperty with upcEanSupplementalMode to 378or379 with scan No suppl","3781234567893"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","378or379"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-517","call setproperty with upcEanSupplementalMode to 378or379 with scan suppl2","378123456789312"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","378or379"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceansupplemental2","true"],
["Barcode","getProperty","method","'upceansupplemental2'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-518","call setproperty with upcEanSupplementalMode to 378or379 with scan suppl5","378123456789312345"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","378or379"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"],
["Barcode","upceansupplemental5","true"],
["Barcode","getProperty","method","'upceansupplemental5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-519","call setproperty with upcEanSupplementalMode to 378or379 with scan non 378or379","9771234567898"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upceansupplementalmode","378or379"],
["Barcode","getProperty","method","'upceansupplementalmode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-520","call setproperty with upcEanConvertGs1dataBarToUpcEan to true","Decode should be successful and souce should be of UPC/EAN type."],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","Gs1dataBar","true"],
["Barcode","getProperty","method","'Gs1dataBar'|returnGetProperty","sync"]
["Barcode","upcEanConvertGs1dataBarToUpcEan","true"],
["Barcode","getProperty","method","'upcEanConvertGs1dataBarToUpcEan'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-521","call setproperty with upcEanConvertGs1dataBarToUpcEan to false","Decode should be successful and souce should be of type RSS14"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","Gs1dataBar","true"],
["Barcode","getProperty","method","'Gs1dataBar'|returnGetProperty","sync"]
["Barcode","upcEanConvertGs1dataBarToUpcEan","false"],
["Barcode","getProperty","method","'upcEanConvertGs1dataBarToUpcEan'|returnGetProperty","sync"]
]

//UPCA
scannerManualParams[scannerManualParams.length] = [["VT282-522","call setproperty with upca true","100864216736"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","getProperty","method","'upca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-523","call setproperty with upca false","upca Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","false"],
["Barcode","getProperty","method","'upca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-524","call setproperty with upcaPreamble to None","00864216736"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","none"],
["Barcode","getProperty","method","'upcaPreamble'|returnGetProperty","sync"],
["Barcode","upcaReportCheckDigit","true"],
["Barcode","getProperty","method","'upcaReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-525","call setproperty with upcaPreamble to systemChar","100864216736"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","systemChar"],
["Barcode","getProperty","method","'upcaPreamble'|returnGetProperty","sync"],
["Barcode","upcaReportCheckDigit","true"],
["Barcode","getProperty","method","'upcaReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-526","call setproperty with upcaPreamble to countryAndSystemChars","0100864216736"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcaPreamble","countryAndSystemChars"],
["Barcode","getProperty","method","'upcaPreamble'|returnGetProperty","sync"],
["Barcode","upcaReportCheckDigit","true"],
["Barcode","getProperty","method","'upcaReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-527","call setproperty with upcaReportCheckDigit true","100864216736"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcaReportCheckDigit","true"],
["Barcode","getProperty","method","'upcaReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-528","call setproperty with upcaReportCheckDigit false","10086421673"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","UPCA","true"],
["Barcode","upcaReportCheckDigit","false"],
["Barcode","getProperty","method","'upcaReportCheckDigit'|returnGetProperty","sync"]
]

//upce0
scannerManualParams[scannerManualParams.length] = [["VT282-529","call setproperty with upce0 true","173559"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","getProperty","method","'upce0'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-530","call setproperty with upce0 false","upce0 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","upce0","false"],
["Barcode","getProperty","method","'upce0'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-531","call setproperty with upce0convertToUpca true","017355000098"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0convertToUpca","true"],
["Barcode","getProperty","method","'upce0convertToUpca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-532","call setproperty with upce0convertToUpca false","173559"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0convertToUpca","false"],
["Barcode","getProperty","method","'upce0convertToUpca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-533","call setproperty with upce0Preamble to None","1735598"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0Preamble","none"],
["Barcode","getProperty","method","'upce0Preamble'|returnGetProperty","sync"],
["Barcode","upce0ReportCheckDigit","true"],
["Barcode","getProperty","method","'upce0ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-534","call setproperty with upce0Preamble to systemChar","01735598"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0Preamble","systemChar"],
["Barcode","getProperty","method","'upce0Preamble'|returnGetProperty","sync"],
["Barcode","upce0ReportCheckDigit","true"],
["Barcode","getProperty","method","'upce0ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-535","call setproperty with upce0Preamble to countryAndSystemChars","001735598"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0Preamble","countryAndSystemChars"],
["Barcode","getProperty","method","'upce0Preamble'|returnGetProperty","sync"],
["Barcode","upce0ReportCheckDigit","true"],
["Barcode","getProperty","method","'upce0ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-536","call setproperty with upce0ReportCheckDigit true","1735598"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0ReportCheckDigit","true"],
["Barcode","getProperty","method","'upce0ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-537","call setproperty with upce0ReportCheckDigit false","00173559"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce0","true"],
["Barcode","upce0ReportCheckDigit","false"],
["Barcode","getProperty","method","'upce0ReportCheckDigit'|returnGetProperty","sync"]
]

//upce1
scannerManualParams[scannerManualParams.length] = [["VT282-538","call setproperty with upce1 true","234567"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","getProperty","method","'upce1'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-539","call setproperty with upce1 false","upce1 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","upce1","false"],
["Barcode","getProperty","method","'upce1'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-540","call setproperty with upce1convertToUpca true","123456000070"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1convertToUpca","true"],
["Barcode","getProperty","method","'upce1convertToUpca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-245","call setproperty with upce1convertToUpca false","234567"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1convertToUpca","false"],
["Barcode","getProperty","method","'upce1convertToUpca'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-246","call setproperty with upce1Preamble to None","2345670"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1Preamble","none"],
["Barcode","getProperty","method","'upce1Preamble'|returnGetProperty","sync"],
["Barcode","upce1ReportCheckDigit","true"],
["Barcode","getProperty","method","'upce1ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-247","call setproperty with upce1Preamble to systemChar","12345670"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1Preamble","systemChar"],
["Barcode","getProperty","method","'upce1Preamble'|returnGetProperty","sync"],
["Barcode","upce1ReportCheckDigit","true"],
["Barcode","getProperty","method","'upce1ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-248","call setproperty with upce1Preamble to countryAndSystemChars","012345670"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1Preamble","countryAndSystemChars"],
["Barcode","getProperty","method","'upce1Preamble'|returnGetProperty","sync"],
["Barcode","upce1ReportCheckDigit","true"],
["Barcode","getProperty","method","'upce1ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-249","call setproperty with upce1ReportCheckDigit true","2345670"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1ReportCheckDigit","true"],
["Barcode","getProperty","method","'upce1ReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-250","call setproperty with upce1ReportCheckDigit false","01234567"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","upce1","true"],
["Barcode","upce1ReportCheckDigit","false"],
["Barcode","getProperty","method","'upce1ReportCheckDigit'|returnGetProperty","sync"]
]

//usplanet
scannerManualParams[scannerManualParams.length] = [["VT282-251","call setproperty with usPlanet true","041235"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","usPlanet","true"],
["Barcode","getProperty","method","'usPlanet'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-252","call setproperty with usPlanet false","usplanet Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","usPlanet","false"],
["Barcode","getProperty","method","'usPlanet'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-253","call setproperty with usPlanetReportCheckDigit with True",""],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","usPlanet","true"],
["Barcode","usPlanetReportCheckDigit","true"],
["Barcode","getProperty","method","'usPlanetReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-254","call setproperty with usPlanetReportCheckDigit with False",""],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","usPlanet","true"],
["Barcode","usPlanetReportCheckDigit","false"],
["Barcode","getProperty","method","'usPlanetReportCheckDigit'|returnGetProperty","sync"]
]

//uspostnet
scannerManualParams[scannerManualParams.length] = [["VT282-255","call setproperty with usPostNet true","11784"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","usPostNet","true"],
["Barcode","getProperty","method","'usPostNet'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-256","call setproperty with usPostNet false","uspostnet Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","usPostNet","false"],
["Barcode","getProperty","method","'usPostNet'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-257","usPostNetReportCheckDigit with True",""],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","usPostNet","true"],
["Barcode","usPostNetReportCheckDigit","true"],
["Barcode","getProperty","method","'usPostNetReportCheckDigit'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-258","usPostNetReportCheckDigit with False",""],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","usPostNet","true"],
["Barcode","usPostNetReportCheckDigit","false"],
["Barcode","getProperty","method","'usPostNetReportCheckDigit'|returnGetProperty","sync"]
]

//Webcode
scannerManualParams[scannerManualParams.length] = [["VT282-259","call setproperty with webcode true","1234"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","webcode","true"],
["Barcode","getProperty","method","'webcode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-260","call setproperty with webcode false","Webcode Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","webcode","false"],
["Barcode","getProperty","method","'webcode'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-261","call setproperty with webcodeDecodeGtSubtype True","1234"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","webcode","true"],
["Barcode","webcodeDecodeGtSubtype","true"],
["Barcode","getProperty","method","'webcodeDecodeGtSubtype'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-262","call setproperty with webcodeDecodeGtSubtype False","1234"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","webcode","true"],
["Barcode","webcodeDecodeGtSubtype","false"],
["Barcode","getProperty","method","'webcodeDecodeGtSubtype'|returnGetProperty","sync"]
]

//aztec 
scannerManualParams[scannerManualParams.length] = [["VT282-263","call setproperty with aztec true","http://elevateprinting.com"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","aztec","true"],
["Barcode","getProperty","method","'aztec'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-264","call setproperty with aztec false","aztec Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","aztec","false"],
["Barcode","getProperty","method","'aztec'|returnGetProperty","sync"]
]

//chinese2of5
scannerManualParams[scannerManualParams.length] = [["VT282-265","call setproperty with chinese2of5 true","45454545454"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","chinese2of5","true"],
["Barcode","getProperty","method","'chinese2of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-266","call setproperty with chinese2of5 false","chinese2of5 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","chinese2of5","false"],
["Barcode","getProperty","method","'chinese2of5'|returnGetProperty","sync"]
]

//korean3of5
scannerManualParams[scannerManualParams.length] = [["VT282-267","call setproperty with korean3of5 true","131000"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","getProperty","method","'korean3of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-268","call setproperty with korean3of5 false","korean3of5 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","korean3of5","false"],
["Barcode","getProperty","method","'korean3of5'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-269","call setproperty with korean3of5redundancy true","131000"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","getProperty","method","'korean3of5'|returnGetProperty","sync"]
["Barcode","korean3of5redundancy","true"],
["Barcode","getProperty","method","'korean3of5redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-270","call setproperty with korean3of5redundancy false","131000"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","korean3of5redundancy","false"],
["Barcode","getProperty","method","'korean3of5redundancy'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-271","call setproperty with korean3of5maxLength to 0","131000"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","korean3of5maxLength","0"],
["Barcode","getProperty","method","'korean3of5maxLength'|returnGetProperty","sync"],
["Barcode","korean3of5minLength","0"],
["Barcode","getProperty","method","'korean3of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-272","call setproperty with korean3of5maxLength to 13","Barcode of length greater than 13 should not decode"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","korean3of5maxLength","13"],
["Barcode","getProperty","method","'korean3of5maxLength'|returnGetProperty","sync"],
["Barcode","korean3of5minLength","1"],
["Barcode","getProperty","method","'korean3of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-273","call setproperty with korean3of5minLength to 6","131000"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","korean3of5maxLength","20"],
["Barcode","getProperty","method","'korean3of5maxLength'|returnGetProperty","sync"],
["Barcode","korean3of5minLength","6"],
["Barcode","getProperty","method","'korean3of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-274","call setproperty with korean3of5minLength to 12","Barcode of length less than 12 should not decode"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","korean3of5","true"],
["Barcode","korean3of5maxLength","20"],
["Barcode","getProperty","method","'korean3of5maxLength'|returnGetProperty","sync"],
["Barcode","korean3of5minLength","12"],
["Barcode","getProperty","method","'korean3of5minLength'|returnGetProperty","sync"]
]

//microqr
scannerManualParams[scannerManualParams.length] = [["VT282-275","call setproperty with microQr true","Example"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","microQr","true"],
["Barcode","getProperty","method","'microQr'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-276","call setproperty with microQr false","microqr Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","microQr","false"],
["Barcode","getProperty","method","'microQr'|returnGetProperty","sync"]
]

//us4state
scannerManualParams[scannerManualParams.length] = [["VT282-277","call setproperty with us4state true","9476543210012345678998690955102"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","us4state","true"],
["Barcode","getProperty","method","'us4state'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-278","call setproperty with us4state false","us4state Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","us4state","false"],
["Barcode","getProperty","method","'us4state'|returnGetProperty","sync"]
]

//us4stateFics
scannerManualParams[scannerManualParams.length] = [["VT282-279","call setproperty with us4stateFics true","J18CUSA81EN100400401870T"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","us4stateFics","true"],
["Barcode","getProperty","method","'us4stateFics'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-280","call setproperty with us4stateFics false","us4stateFics Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","us4stateFics","false"],
["Barcode","getProperty","method","'us4stateFics'|returnGetProperty","sync"]
]

//matrix2of5
scannerManualParams[scannerManualParams.length] = [["VT282-281","call setproperty with matrix2of5 true","09080706055"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","getProperty","method","'matrix2of5'|returnGetProperty","sync"]
["Barcode","matrix2of5maxLength","20"],
["Barcode","matrix2of5minLength","1"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-282","call setproperty with matrix2of5 false","Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","matrix2of5","false"],
["Barcode","getProperty","method","'matrix2of5'|returnGetProperty","sync"]
["Barcode","matrix2of5maxLength","20"],
["Barcode","matrix2of5minLength","1"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-283","call setproperty with matrix2of5maxLength 0 and matrix2of5minLength 0","Barcode should not Scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5maxLength","0"],
["Barcode","getProperty","method","'matrix2of5maxLength'|returnGetProperty","sync"],
["Barcode","matrix2of5minLength","0"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-284","call setproperty with matrix2of5maxLength 20","09080706055"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5maxLength","20"],
["Barcode","getProperty","method","'matrix2of5maxLength'|returnGetProperty","sync"],
["Barcode","matrix2of5minLength","1"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-285","call setproperty with matrix2of5minLength 10","Barcode of length less than 10 should not decode"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5maxLength","20"],
["Barcode","getProperty","method","'matrix2of5maxLength'|returnGetProperty","sync"],
["Barcode","matrix2of5minLength","10"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-286","call setproperty with matrix2of5minLength 5","09080706055"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5maxLength","15"],
["Barcode","getProperty","method","'matrix2of5maxLength'|returnGetProperty","sync"],
["Barcode","matrix2of5minLength","5"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-287","call setproperty with matrix2of5reportCheckDigit to true and matrix2of5verifyCheckDigit to true",""],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5verifyCheckDigit","true"],
["Barcode","getProperty","method","'matrix2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","matrix2of5reportCheckDigit","true"],
["Barcode","getProperty","method","'matrix2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","matrix2of5maxLength","20"],
["Barcode","matrix2of5minLength","5"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-288","call setproperty with matrix2of5reportCheckDigit to false and matrix2of5verifyCheckDigit to true",""],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5verifyCheckDigit","true"],
["Barcode","getProperty","method","'matrix2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","matrix2of5reportCheckDigit","false"],
["Barcode","getProperty","method","'matrix2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","matrix2of5maxLength","20"],
["Barcode","matrix2of5minLength","5"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-289","call setproperty with matrix2of5reportCheckDigit to false and matrix2of5verifyCheckDigit to false",""],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","matrix2of5","true"],
["Barcode","matrix2of5verifyCheckDigit","false"],
["Barcode","getProperty","method","'matrix2of5verifyCheckDigit'|returnGetProperty","sync"],
["Barcode","matrix2of5reportCheckDigit","false"],
["Barcode","getProperty","method","'matrix2of5reportCheckDigit'|returnGetProperty","sync"],
["Barcode","matrix2of5maxLength","20"],
["Barcode","matrix2of5minLength","5"],
["Barcode","getProperty","method","'matrix2of5minLength'|returnGetProperty","sync"]
]

//gs1dataBar
scannerManualParams[scannerManualParams.length] = [["VT282-290","call setproperty with gs1dataBar true","0120012345678909"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","gs1dataBar","true"],
["Barcode","getProperty","method","'gs1dataBar'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-291","call setproperty with gs1dataBar false","GS1dataBar14 Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","gs1dataBar","false"],
["Barcode","getProperty","method","'gs1dataBar'|returnGetProperty","sync"]
]

//gs1dataBarExpanded
scannerManualParams[scannerManualParams.length] = [["VT282-292","call setproperty with gs1dataBarExpanded true","0198898765432106320201234515991231"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","gs1dataBarExpanded","true"],
["Barcode","getProperty","method","'gs1dataBarExpanded'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-293","call setproperty with gs1dataBarExpanded false","GS1dataBarexp Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","gs1dataBarExpanded","false"],
["Barcode","getProperty","method","'gs1dataBarExpanded'|returnGetProperty","sync"]
]

//gs1dataBarLimited
scannerManualParams[scannerManualParams.length] = [["VT282-294","call setproperty with gs1dataBarLimited true","0115012345678907"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","gs1dataBarLimited","true"],
["Barcode","getProperty","method","'gs1dataBarLimited'|returnGetProperty","sync"]
]

scannerManualParams[scannerManualParams.length] = [["VT282-295","call setproperty with gs1dataBarLimited false","GS1dataBarlim Barcode should not scan"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","true"],
["Barcode","gs1dataBarLimited","false"],
["Barcode","getProperty","method","'gs1dataBarLimited'|returnGetProperty","sync"]
]

//code128 with %
scannerManualParams[scannerManualParams.length] = [["VT282-296","Code128 Decoder with % data"],
["Barcode","enable","method","{}, url_for(:action => :scanDecodeCallback)","async"],
["Barcode","allDecoders","false"],
["Barcode","code128","true"],
["Barcode","getProperty","method","'code128'|returnGetProperty","sync"]
]
