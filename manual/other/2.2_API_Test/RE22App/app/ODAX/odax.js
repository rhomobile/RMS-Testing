
//	<script type="text/javascript" src="/public/re1/elements.js"></script>
//	<script type="text/javascript">
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}
function getsettingsjsFunction(a)
	{
		alert("Event JSfired");
		var theOutput = "<BR><BR><B>LightSensorValue  </B>";     
		var sig = document.getElementById("actualResult");    
        theOutput = theOutput + "LightSensorValue: " + a + "<BR>";
		sig.innerHTML = "JSObject"+theOutput;
	}
	function getsettingsjsonFunction(jsonObject)
	{
		alert("Event Josnfired");
		var theOutput = "<BR><BR><B>LightSensorValue  </B>";   
		var sig = document.getElementById("actualResult");      
        theOutput = theOutput + "LightSensorValue: " + jsonObject.LightSensorValue + "<BR>";
        sig.innerHTML = "JSON"+theOutput;
}
function DoInsert() {
        var FieldValue1 = ODAXForm.Field1Value.value;
        var FieldValue2 = ODAXForm.Field2Value.value;
        var FieldValue3 = ODAXForm.Field3Value.value;

        if (FieldValue1.length < 1 || FieldValue2.length < 1 || FieldValue3.length < 1) {
            //alert("Please enter a valid value for all three fields");
            result.innerHTML= "Please enter a valid value for all three fields";
        }
        else {
            var QueryString = 'INSERT INTO \'\\application\\test.xml\' (field1,field2,field3) VALUES (';
            QueryString += '\'' + FieldValue1 + '\',';
            QueryString += '\'' + FieldValue2 + '\',';
            QueryString += '\'' + FieldValue3 + '\');';
            //alert(QueryString);
            var count = odax.Execute(QueryString, 0, ',', false);
            //alert(count + " Record(s) Inserted");
            var sig = document.getElementById("actualResult"); 
            sig.innerHTML= count + " Record(s) Inserted";
        }
    }
    
(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT187-0534",
				"RegLevel":"R1",
				"Description":"MoveNext Method - ODAX",
				"PreCondition":[],
				"Steps":["Call select method to read the records from file [total count]","Call Movenext method to move the pointer to the next record in the result set",
						"Retrieve the colum value of the record using get() method. "],
				"ExpectedOutcome":["Movenext method moves the pointer to the next record in the result set record value should return when get() method is called"],
				"testToPerform":function(){
					  var srcFileName = '\\application\\test.xml';
   					  var destFileName = '\\windows\\test.xml';

					odax.Select('SELECT * FROM \'\\application\\test.xml\';', ',', false);
					odax.MoveNext();
					var colval = odax.Get("field1");
        			ODAXForm.ColumnData.value = colval;

					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-0536",
				"RegLevel":"R1",
				"Description":"Execute Method - Insert parameter - ODAX",
				"PreCondition":[],
				"Steps":["Call execute(INSERT, format, delimiter, firstrow) method to insert the record.","Check the number of records now"],
				"ExpectedOutcome":["The INSERT operation should insert the record in the file number of records should be increased by 1"],
				"testToPerform":function(){
					var srcFileName = '\\application\\test.xml';
   					  var destFileName = '\\windows\\test.xml';

				DoInsert();
					
				},
				"FinalResult":""
		
		
			},{
				"VTID":"VT187-0542",
				"RegLevel":"R1",
				"Description":"Copy and Delete Method - ODAX",
				"PreCondition":[],
				"Steps":["Call Fileexist method to check whether the file exists in the location or not","Call the copy() method to copy the file from one location to other location.",
						"Check the file in other location.","Call delete method to delete the specific file and Call FileExist() method with same file path to verify it"],
				"ExpectedOutcome":["The Fileexist method should return true if the file exists and false if not in the specifed path",
									"The file should be copied to the destination location and should exist there","The file should be deleted and FileExist() should return false."],
				"testToPerform":function(){

					var srcFileName = '\\application\\test.xml';
   					  var destFileName = '\\windows\\test.xml';

   					  if( true == odax.FileExists(srcFileName))
   						{
      						alert("File: "+ srcFileName + " Exists!");
   						}
   						var status1 = odax.Copy(srcFileName, destFileName);

   						if( true == odax.FileExists(destFileName))
   						{
      						alert("File: "+ destFileName + " Exists!");
   						}
   						 var status3 = odax.Delete(destFileName);
   						if( true == odax.FileExists(destFileName))
   						{
      						alert("File: "+ destFileName + " Exists!");
   						}
   						else
   						{
   							alert("File: "+ destFileName + " Not Exists!");
   						} 
				},
				"FinalResult":""	
			
				
			}];
		pbTestObj.afterEach = function(){
			
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();
//
//	<script type="text/javascript">
//		var count = 0;
//		function doAlarm(){
//			var resultDiv = document.getElementById("actualResult");
//			count++;
//        	resultDiv.innerHTML = 'Alarm Triggered';
 //       	resultDiv.innerHTML += "\nCount = "+count;
//		}
//	</script>
//<!--<script type="text/javascript" src="js/myMain.js"></script>-->
//	<script type="text/javascript">
//		main.init();
//	</script>