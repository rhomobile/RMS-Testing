
//	<script type="text/javascript" src="http://10.233.85.82/src/elements.js"></script>
//	<script type="text/javascript">
/*function callBackFunc() {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
	       if (movPtr == 0){
	       	sig.innerHTML = "MoveNext returned 0 and no error occured"
	       }
	       else
	       {
	       	sig.innerHTML = odax.GetLastErrorString();
	       }
}*/

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT187-0277",
				"RegLevel":"R1",
				"Description":"MoveNext Method - ODAX",
				"PreCondition":[],
				"Steps":["Call select method to read the records from file [total count]","Call Movenext method to move the pointer to the next record in the result set",
						"Retrieve the colum value of the record using get() method. "],
				"ExpectedOutcome":["Movenext method moves the pointer to the next record and it should return value. in the result set record value should return when get() method is called"],
				"testToPerform":function(){
				    resultset;
					FieldValue1 = 'Red';
                    FieldValue2 = 'Green';
                    FieldValue3 = 'Blue';
                    DoInsert();
                    DoInsert();
                   // alert("1");
					odax.Select('SELECT * FROM \'\\application\\test.xml\';', ',', false);
					//alert("2");
					resultset += "  MoveNext returns " + odax.MoveNext().toString();
					resultset += " Column Value of the record using get method is " + odax.Get("field1").toString();
					//alert(resultset);
					//alert(colval);
					main.displayResult(resultset);
        			

					
				},
				"FinalResult":""
			},{
				"VTID":"VT366-0278",
				"RegLevel":"R1",
				"Description":"Copy and Delete Method - ODAX",
				"PreCondition":[],
				"Steps":["Call Fileexist method to check whether the file exists in the location or not","Call the copy() method to copy the file from one location to other location.",
						"Check the file in other location.","Call delete method to delete the specific file and Call FileExist() method with same file path to verify it"],
				"ExpectedOutcome":["The Fileexist method should return true if the file exists and false if not in the specifed path",
									"The file should be copied to the destination location and should exist there","The file should be deleted and FileExist() should return false."],
				"testToPerform":function(){

					var srcFilename = "\\application\\test.xml";
				    var destFilename = "\\application\\test1.xml";
				    resultset = "File Exists at Source: " + odax.FileExists(srcFilename).toString();
				    if (odax.FileExists(destFilename) == true){
					odax.Delete(destFilename);
				    }
				     
				    resultset += ";\nCopy Status: " + odax.Copy(srcFilename, destFilename).toString();				
				   
				    resultset += ";\nFile Exists at Destination: " + odax.FileExists(destFilename).toString();
				    
				    resultset += ";\nFile Delete Status of Destination: " + odax.Delete(destFilename).toString();
				    
				    resultset += ";\nFile Exists at Destination: " + odax.FileExists(destFilename).toString();
				    main.displayResult(resultset);
				 },
				"FinalResult":""	
			
				
			}];
		pbTestObj.afterEach = function(){
			resultset = '';
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