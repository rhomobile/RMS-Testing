
function MyTransferEvent(Msg)
{
//FileDiv.innerHTML="TransferEvent fired for "+StressCount+"th time.TransferMessage:-"+Msg;
//StressCount++;
document.getElementById('actualResult').innerHTML ="TransferResult= " + Msg;
}

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		function onCaptured(response){
			main.displayResult("video save event response: " + response);
		}
		pbTestObj.testCases = [
		{
						"VTID":"VT366-0287",
						"RegLevel":"R1",
						"Description":"HTTP Server to device FileTransfer",
						"PreCondition":[],
						"Steps":["1. Set Source to any valid HTTP address.","2. Set Destination to valid Device Folder.","3. Attach the TransferEvent","4. Call Transfer method."],
						"ExpectedOutcome":["File should be copied from HTTP location to Device folder successfully.","Destination server message should be returned as Transfer Result in Transferevent. "],
						"testToPerform":function(){
							fileTransfer.source = "url('http://10.233.85.82/FileCollections/myfile.txt')";
							fileTransfer.destination = "url('file://\\Temp\\myfolderfromFTP\\filefromHTTP.txt')";
							fileTransfer.createFolders = true;
							fileTransfer.overWrite = true;
							fileTransfer.transferEvent ="MyTransferEvent('%s');";
							fileTransfer.transfer();
						},

						"FinalResult":""
					},{
						"VTID":"VT366-0288",
						"RegLevel":"R1",
						"Description":"Device File System to FTP Server File Transfer(Make sure myfile.txt is there in application folder)",
						"PreCondition":[],
						"Steps":["1. Set Source to any valid Device File System address.","2. Set Destination to valid FTP address.","3. Attach the TransferEvent","4. Call Transfer method."],
						"ExpectedOutcome":["File should be copied from Device location to FTP successfully.","Destination server message should be returned as Transfer Result in Transferevent."],
						"testToPerform":function(){
							fileTransfer.source = "url('file://\\Application\\FileCollections\\myfile.txt')";
							fileTransfer.destination = "url('ftp://10.233.85.82/Received/myfilefrmdevice.txt')";
							fileTransfer.username = 'ftpadmin';
							fileTransfer.password = 'ftpadmin';
							fileTransfer.createFolders = true;
							fileTransfer.overWrite = true;
							fileTransfer.transferEvent ="MyTransferEvent('%s');";
							fileTransfer.transfer();
						},

						"FinalResult":""
					}];
		pbTestObj.afterEach = function(){
			
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();

/*var deleteFile = function(destFileName){
			var deleteFile = EB.File.is_exist(fileName);
			if( true == deleteFile){
				EB.File.do_delete(fileName);
			}
		}*/