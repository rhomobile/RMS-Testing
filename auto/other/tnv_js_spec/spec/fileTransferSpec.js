var objectname = "";
var paramormethodname = "";
var paramvalue = "";

var checkMethod = "destination";
var checkDestination = "";
var checkSource = "";
var destinationPath = "";
var fileExist = false;
var eventFired = false;
var fileExistMsg = "";


var startFileModulePositive = function (arrFile){


	describe("File Transfer Module Test(Positive) Starts Here", function() {

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){
		
			beforeEach(function() {

		    fileTransfer.createFolders = "";
		    fileTransfer.overWrite = "";
		    fileTransfer.transferEvent = "";
		    eventFired = false;
		    eventOutput = "";
		    fileExist = false;
		    fileExistMsg = "";
			m = 1;

			});

			it("Display TestCase/Set Params wait callback to be fired with OK/Check File Is At Destination", function() {

				runs(function(){
					fillDetailsDiv(arrFile);
					setTimeout(function() {
						displayflag = true;
					}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Interval after Div Updates", 6000);

				for (var k = 1; k < arrFile.length; k++){

					runs(function() {

						//Common Method to Set the Parameters
						setParams(arrFile[m]);
						flag = false;
						setTimeout(function() {
						flag = true;
						}, 4000);
						m++;
					});

					waitsFor(function() {
						dispCurrentProcess(arrFile[m-1]+" Executed");
						return flag;
					}, "Interval Between Each API Call", 5000);

				}

				runs(function(){

				});

				waitsFor(function() {
					if (eventFired){
						return true;}
					else{
						dispCurrentProcess("Waiting For Event To Be Fired!!!");
						return false;
					}
				}, "Event Should Get Fired After Waiting 60 Secs", 60000);

				runs(function(){
					expect(eventOutput).toMatch(/ok/i);
					window.scrollTo(0,document.body.scrollHeight);
				});

				runs(function(){
					flag = false;
					setTimeout(function() {
					flag = true;
					}, 10000);
				});

				waitsFor(function() {
					dispCurrentProcess("A Time Wait (80 secs) Before File Existence Check");
					return flag;
				}, "Waiting Some Time To Allow the FileTransfer Happens Before Check", 11000);

				runs(function(){
					//Check File Exist Or Not
					checkFileExist();
				});

				waitsFor(function() {
					dispCurrentProcess("Checking File Exist Or Not");
					return fileExist;
				}, "File Not Exist!! Kindly Check Manually At Location" + destinationPath, 20000);

				runs(function(){
					expect(fileExistMsg).toMatch(/OK: File Exist/i);
					fileExistMsg = "";
				});
			});
		});
	});

}


var startFileModuleNegative = function (arrFile){

	describe("File Transfer Module Test(Negative) Starts Here", function() {

		describe(arrFile[0][0] + " - " + arrFile[0][1],function(){
			beforeEach(function() {
				eventOutput = "";
				eventFired = "";
				fileTransfer.createFolders = "";
				fileTransfer.overWrite = "";
				fileTransfer.transferEvent = "";
				m = 1;
			});

			it("Display TestCase/Set Params wait callback to be fired with Error", function() {

				runs(function(){
					fillDetailsDiv(arrFile);
					setTimeout(function() {
						displayflag = true;
					}, 5000);
				});

				waitsFor(function() {
					return displayflag;
				}, "Interval after Div Updates", 6000);

				for (var k = 1; k < arrFile.length; k++){

					runs(function() {

						//Common Method to Set the Parameters
						setParams(arrFile[m]);
						flag = false;
						setTimeout(function() {
						flag = true;
						}, 2000);
						m++;
					});

					waitsFor(function() {
						dispCurrentProcess(arrFile[m-1]+" Executed");
						return flag;
					}, "Interval Between Each API Call", 5000);
				}

				runs(function(){

				});

				waitsFor(function() {
					if (eventFired){
						return true;}
					else{
						dispCurrentProcess("Waiting Event To be Fired");
						return false;
					}
				}, "Event Should Get Fired After Waiting 30 Secs", 30000);

				runs(function(){
					var node=document.createElement("LI");
					var textnode =document.createTextNode(arrFile[0][0] + " - " + arrFile[0][1]);
					node.appendChild(textnode);
					document.getElementById("myList").appendChild(node);
					node=document.createElement("LI");
					var output = "Output:"+ '<br/>' + eventOutput;
					textnode=document.createTextNode(output);
					node.appendChild(textnode);
					document.getElementById("myList").appendChild(node);
					expect(eventOutput).toMatch(/error/i);
				});

			});

		});

	});

}

//Callback Methods

function jsFileTransferEvent(transferResult)
{
	//resultdiv.innerHTML ="TransferResult= " + transferResult;
	eventOutput = "";
	eventOutput = transferResult ;
	eventFired  = true ;
}

function jsonFileTransferEvent(myjsonobject)
{
	//resultdiv.innerHTML = "JSON TransferResult= " + myjsonobject.transferResult;
	eventOutput = "";
	eventOutput = myjsonobject.transferResult ;
	eventFired  = true ;
}