var fileModule = new Array;
var fileModuleN = new Array;

/////////////////////////////////
// LIST OF POSITIVE TEST CASES //
/////////////////////////////////


fileModule[fileModule.length] = [["VT187-0306","HTTP Server to device FileTransfer"],
	["fileTransfer","source","url('http://192.168.6.18/NEON/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\HTTPDEVICE\\file306.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0307","Device File System to HTTP Server FileTransfer"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile.txt')"],
	["fileTransfer","destination","url('http://192.168.6.18:80/NEON/ReceivedFiles/Upload.aspx')"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0308","FTP Server to device FileTransfer"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\FTPDEVICE\\myfile308.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0309","Device File System to FTP Server File Transfer"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile.txt')"],
	["fileTransfer","destination","url('ftp://192.168.6.18/Received/myfile309.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0310","Device File System to Device File System File Transfer"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile.txt')"],
	["fileTransfer","destination","url('file://\\Application\\DD\\myfile310.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

// TODO: Need To Check Relative

fileModule[fileModule.length] = [	["VT187-0314","Test Relative URL for HTTP File Transfer(same directory)"],
	["fileTransfer","source","url('./test314.txt')"],
	["fileTransfer","destination","url('file://\\Application\\Relative\\httpfile314.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];


fileModule[fileModule.length] = [	["VT187-0315","Test Relative URL for HTTP File Transfer (one level up of current directory)"],
	["fileTransfer","source","url('./myHTTPFolder/test315.txt')"],
	["fileTransfer","destination","url('file://\\Application\\Relative\\httpfile315.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [	["VT187-0316","Test Relative URL for HTTP File Transfer (one level down of current directory)"],
	["fileTransfer","source","url('../test316.txt')"],
	["fileTransfer","destination","url('file://\\Application\\Relative\\httpfile316.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0317","File Transfer with Fully qualified HTTP URL to device"],
	["fileTransfer","source","url('http://bhakta:bhakta@192.168.6.27/rhodes/secure/screen.jpg')"],
	["fileTransfer","destination","url('file://\\Temp\\HTTPDEVICE\\screen317.jpg')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0318","File Transfer with Fully qualified FTP URL to device"],
	["fileTransfer","source","url('ftp://ftpadmin:ftpadmin@192.168.6.18:21/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\FTPDEVICE\\myfile318.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0319","File Transfer from device to fully qualified HTTP URL"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile319.txt')"],
	["fileTransfer","destination","url('http://192.168.6.18:80/NEON/ReceivedFiles/Upload.aspx')"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0320","File Transfer from device to fully qualified FTP URL"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile320.txt')"],
	["fileTransfer","destination","url('ftp://ftpadmin:ftpadmin@192.168.6.18:21/Received/FULLQLprt21320.txt')"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0341","HTTP Server to device with valid username and password"],
	["fileTransfer","source","url('http://192.168.6.27:80/rhodes/secure/screen.jpg')"],
	["fileTransfer","destination","url('file://\\Temp\\HTTPDEVICE\\screendwnld341.jpg')"],
	["fileTransfer","username","bhakta"],
	["fileTransfer","password","bhakta"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];
/*// TODO: Need to Pass UserId and Password in Ajax Call
fileModule[fileModule.length] = [ ["VT187-0342","Device to HTTP Server with valid username and password"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile342.txt')"],
	["fileTransfer","destination","url('http://192.168.6.18/NEON/secure/Upload.aspx')"],
	["fileTransfer","username","admin"],
	["fileTransfer","password","Motorola@123"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];*/

fileModule[fileModule.length] = [ ["VT187-0344","FTP Server to Device File System with valid username and password"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\FTPDEVICE\\myfile344.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0355","CreateFolder set to true"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\createTRUE\\myfile355.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0356","CreateFolder set to false"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\myfile356.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","createFolders","false"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0360","Overwrite set to true"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\overwrite\\myFile360.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [	["VT187-0366","Deregister TranferEvent"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile366.txt')"],
	["fileTransfer","destination","url('ftp://192.168.6.18/Received/deregisterevent.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transferEvent",""],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0367","TranferEvent with empty value"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile367.txt')"],
	["fileTransfer","destination","url('ftp://192.168.6.18/Received/withoutevent.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","transferEvent",""],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0375","HTTP Server to device-large file(4 mb)"],
	["fileTransfer","source","url('http://192.168.6.18/NEON/FileCollections/4m.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\HTTPLARGE\\filefromHTTP.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0376","Device File System to HTTP Server-Large File(4 mb)"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\4mb.txt')"],
	["fileTransfer","destination","url('http://192.168.6.18/NEON/ReceivedFiles/Upload.aspx')"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0378","Device File System to FTP Server-Large File(4 mb)"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\4mb.txt')"],
	["fileTransfer","destination","url('ftp://192.168.6.18/Received/myfilefrmdevice.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModule[fileModule.length] = [ ["VT187-0379","Device File System to FTP Server non Default port(Port 20)"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile379.txt')"],
	["fileTransfer","destination","url('ftp://192.168.6.18:20/Received/nondefault.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];


/////////////////////////////////
// LIST OF NEGATIVE TEST CASES //
/////////////////////////////////


//Error Code: IO Exception
fileModuleN[fileModuleN.length] = [["VT187-0321","File transfer from http server to device with no file in source path."],
	["fileTransfer","source","url('http://tandv.wtgdev.net/')"],
	["fileTransfer","destination","url('file://\\Temp\\MyHTTPfolder\\invalidsource.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 12007
fileModuleN[fileModuleN.length] = [ ["VT187-0325","File transfer from FTP server to device with Invalid souce url."],
	["fileTransfer","source","url('ftp://tandv.wtgdev.net')"],
	["fileTransfer","destination","url('file://\\Temp\\myfolderfromFTP\\invalidsourcefilefromftp.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];
//Error Code: 2
fileModuleN[fileModuleN.length] = [ ["VT187-0327","File transfer local on device with Invalid souce url"],
	["fileTransfer","source","url('file:///')"],
	["fileTransfer","destination","url('file://\\Application\\NewFileCollections\\mynewfile.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModuleN[fileModuleN.length] = [ ["VT187-0329","File transfer with empty source url"],
	["fileTransfer","source",""],
	["fileTransfer","destination","url('file://\\Application\\NewFileCollections\\mynewfile.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModuleN[fileModuleN.length] = [ ["VT187-0330","File transfer with empty source url : url('') "],
	["fileTransfer","source","url('')"],
	["fileTransfer","destination","url('file://\\Application\\NewFileCollections\\mynewfile.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: IO Exception
fileModuleN[fileModuleN.length] = [ ["VT187-0331","File transfer from device to http server with Invalid destination url 1"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile.txt')"],
	["fileTransfer","destination","url('http://tandv.wtgdev.net/file.txt')"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: IO Exception
fileModuleN[fileModuleN.length] = [ ["VT187-0334","File transfer from device to ftp server with no file in destination path."],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile.txt')"],
	["fileTransfer","destination","url('ftp://tandv.wtgdev.net/filemanagement')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 12007
fileModuleN[fileModuleN.length] = [ ["VT187-0335","File transfer from device to ftp server with Invalid destination url 1"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile.txt')"],
	["fileTransfer","destination","url('ftp://tandv.wtgdev.net')"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 2
fileModuleN[fileModuleN.length] = [ ["VT187-0337","File transfer local on device with Invalid destination url 1"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile1.txt')"],
	["fileTransfer","destination","url('file:///tandv.wtgdev.net')"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModuleN[fileModuleN.length] = [ ["VT187-0339","File transfer with empty destination url 1"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile339.txt')"],
	["fileTransfer","destination",""],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

fileModuleN[fileModuleN.length] = [ ["VT187-0340","File transfer with empty destination url: url('')"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile1.txt')"],
	["fileTransfer","destination","url('')"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 3
fileModuleN[fileModuleN.length] = [ ["VT187-0345","HTTP Server to device with incorrect username and correct password"],
	["fileTransfer","source","url('http://192.168.6.18/NEON/secure/test.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\HTTPDEVICE\\myfile346.txt')"],
	["fileTransfer","username","xyz"],
	["fileTransfer","password","Motorola%123"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 3
fileModuleN[fileModuleN.length] = [ ["VT187-0346","Device to HTTP Server with incorrect username and correct password"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile346.txt')"],
	["fileTransfer","destination","url('http://192.168.6.18/NEON/secure/Upload.aspx')"],
	["fileTransfer","username","xyz"],
	["fileTransfer","password","Motorola%123"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: IO Exceotion
fileModuleN[fileModuleN.length] = [ ["VT187-0348","FTP Server to Device File System with incorrect username and correct password"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\FTPDEVICE\\myfile348.txt')"],
	["fileTransfer","username","xyz"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 12014
fileModuleN[fileModuleN.length] = [ ["VT187-0351","Device File System to FTP Server with incorrect username and correct password"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile.txt')"],
	["fileTransfer","destination","url('ftp://192.168.6.18/Received/myfilefrmdevice347.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","aaaaa"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 12014
fileModuleN[fileModuleN.length] = [ ["VT187-0353","Device File System to FTP Server with empty username and empty password"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile.txt')"],
	["fileTransfer","destination","url('ftp://192.168.6.18/Received/myfilefrmdevice347.txt')"],
	["fileTransfer","username",""],
	["fileTransfer","password",""],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 2
fileModuleN[fileModuleN.length] = [ ["VT187-0354","CreateFolder with Default value"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\createDEFAULT\\myfile354.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 2
fileModuleN[fileModuleN.length] = [ ["VT187-0356","CreateFolder set to false"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\NONEXIST\\myfile356.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","createFolders","false"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 2
fileModuleN[fileModuleN.length] = [ ["VT187-0357","CreateFolder set to empty value."],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\folder357\\myfile357.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","createFolders",""],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 2
fileModuleN[fileModuleN.length] = [ ["VT187-0358","CreateFolder set to invalid value."],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\folder358\\myfile358.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","createFolders","aaaaa"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error: File Exists
fileModuleN[fileModuleN.length] = [ ["VT187-0359","Overwrite set to Default"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\overwrite\\myFile.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error: File Exists
fileModuleN[fileModuleN.length] = [ ["VT187-0361","Overwrite set to false"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\overwrite\\myFile.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","overWrite","false"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error: File Exists	
fileModuleN[fileModuleN.length] = [ ["VT187-0363","Overwrite set to empty"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\overwrite\\myFile.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","overWrite",""],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error: File Exists
fileModuleN[fileModuleN.length] = [ ["VT187-0364","Overwrite set to Invalid"],
	["fileTransfer","source","url('ftp://192.168.6.18/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\overwrite\\myFile.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","overWrite","aaaaa"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 12029
fileModuleN[fileModuleN.length] = [ ["VT187-0380","Device File System to HTTP Server non Default port(Port 8080)"],
	["fileTransfer","source","url('file://\\Application\\FileCollections\\myfile.txt')"],
	["fileTransfer","destination","url('http://192.168.6.18:8080/NEON/ReceivedFiles/Upload.aspx')"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 3
fileModuleN[fileModuleN.length] = [ ["VT187-0381","FTP server to Device File System non Default port(Port 19)"],
	["fileTransfer","source","url('ftp://192.168.6.18:19/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\myfolderfromFTP\\mynewfilefromftp.txt')"],
	["fileTransfer","username","ftpadmin"],
	["fileTransfer","password","ftpadmin"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];

//Error Code: 12029
fileModuleN[fileModuleN.length] = [ ["VT187-0382","HTTP server to Device File System non Default port(81)"],
	["fileTransfer","source","url('http://192.168.6.18:81/NEON/FileCollections/myfile.txt')"],
	["fileTransfer","destination","url('file://\\Temp\\MyHTTPFolder\\DWNLD382.txt')"],
	["fileTransfer","createFolders","true"],
	["fileTransfer","overWrite","true"],
	["fileTransfer","transferEvent","jsFileTransferEvent('%s');"],
	["fileTransfer","transfer","method"]
];
