(function(){
	var main = function(){
		var mainObj = {};
		var r1List = [];
		var r2List = [];
		var r3List = [];
		var testArray = [];
		var index = 0;
		var count = 0;
		var choice = "";
		var passCount = 0;
		var failCount = 0;
		var noRunCount = 0;
		mainObj.init = function(){
			for(key in pbTest.testCases){
				if(pbTest.testCases[key].RegLevel == "R1"){
					r1List.push(pbTest.testCases[key]);
				}else if(pbTest.testCases[key].RegLevel == "R2"){
					r2List.push(pbTest.testCases[key]);
				}else if(pbTest.testCases[key].RegLevel == "R3"){
					r3List.push(pbTest.testCases[key]);
				}
			}
		};
		mainObj.loadArrayList = function(data, eleId){
			var retData = "";
			if(eleId == "preCondition"){
				retData = "<br><span class='heading'>PreConditions:</span>";
			}else if(eleId == "steps"){
				retData = "<br><span class='heading'>Steps:</span>";
			}if(data.length>0){
				retData += "<ul>";
		        for (var i=0; i<data.length;i++){
		            retData = retData + "<li>"+data[i]+"</li>"
		        }
		        retData = retData + "</ul>";
		    }
			
		    document.getElementById(eleId).innerHTML = retData;
		}
		mainObj.onPageLoad = function(){
			this.onRegLevelChange();
		};
		mainObj.loadTest = function(){
			var vtElement = "";
            var selectElement = "<select id='vtSelect' onchange='main.onVTIDChange()'></select>";
            document.getElementById('vtsection').innerHTML = selectElement;
            var selectList = document.getElementById('vtSelect');
			for(key in testArray){
				var option = document.createElement("OPTION");
				option.text = testArray[key].VTID;
				option.value = key;
				selectList.add(option);
			}
			this.loadSingleTest(index);
		};
		mainObj.displayFinalResult = function(){
			retHTMLData = "<table><tr><td class='title'>" + choice +" Test summay :</td></tr><tr><td class='block'><ul>";
			for(key in testArray){
				if(testArray[key].FinalResult=="Pass"){
					passCount++;
					retHTMLData = retHTMLData + "<li style='color:green'>" + testArray[key].Description + "</li>";	
				}else if(testArray[key].FinalResult=="Fail"){
					failCount++;
					retHTMLData = retHTMLData + "<li style='color:red'>" + testArray[key].Description + "</li>";
				}else{
					noRunCount++;
					retHTMLData = retHTMLData + "<li style='color:red;background:yellow'>" + testArray[key].Description + "</li>";
				}
			}
			resultSummary = "<table class='block'><tr><td colspan=2 class='title'>Summary for "+choice+" cases</td></tr><tr><td>Pass</td><td style='color:green;font-weight:bold'>"+passCount+"</td></tr><tr><td>Fail</td><td style='color:red;font-weight:bold'>"+failCount+"</td></tr><tr><td>NoRun</td><td style='color:blue;font-weight:bold'>"+noRunCount+"</td></tr><tr style='color:black;font-weight:bold'><td>Total</td><td>"+parseInt(passCount+failCount+noRunCount)+"</td></tr></table>";
			retHTMLData = retHTMLData + "</ul></td></tr></table><br><a href='index.html'>Home</a>";
			retHTMLData = resultSummary + retHTMLData;
			document.getElementById('mainBlock').innerHTML = retHTMLData;
		};
		mainObj.loadSingleTest = function(index){
			document.getElementById('vtid').innerHTML = testArray[index].VTID;
			document.getElementById('desc').innerHTML = testArray[index].Description;
			this.loadArrayList(testArray[index].PreCondition, "preCondition");
			this.loadArrayList(testArray[index].Steps, "steps");
			this.loadArrayList(testArray[index].ExpectedOutcome, "expected");
			document.getElementById('actualResult').innerHTML = "";
			var selectElement = document.getElementById('vtSelect');
			selectElement.value = index;
			pbTest.afterEach();
		};
		mainObj.runThisTest = function(){
			testArray[index].testToPerform();
		};
		mainObj.passThisTest = function(){
			testArray[index].FinalResult = "Pass";
			this.nextTest();
		};
		mainObj.failThisTest = function(){
			testArray[index].FinalResult = "Fail";
			this.nextTest();
		}
		mainObj.nextTest = function(){
			pbTest.afterEach();
			if(index<(count-1)){
				index++;
				this.loadSingleTest(index);
			}else{
				this.displayFinalResult();
			}
		};
		mainObj.prevTest = function(){
			pbTest.afterEach();
			if(index>0){
				index--;
				this.loadSingleTest(index);
			}else{
				alert("No previous test cases to run");
			}
		};
		mainObj.onVTIDChange = function(){
			myVtIdChoice = document.getElementById("vtSelect").value;
			index = myVtIdChoice;
			this.loadSingleTest(myVtIdChoice);
		};
		mainObj.onRegLevelChange = function(){
			var myChoice = document.getElementById("regLevel").value;
			choice = myChoice;
			document.getElementById('vtsection').innerHTML = "";

			if(myChoice=="All"){
				testArray = pbTest.testCases;
				count = testArray.length;
			}else if(myChoice=="R1"){
				testArray=r1List;
				count = testArray.length;
			}else if(myChoice=="R2"){
				testArray=r2List;
				count = testArray.length;
			}else if(myChoice=="R3"){
				testArray=r3List;
				count = testArray.length;
			}
			index = 0;
			passCount = 0;
			failCount = 0;
			noRunCount = 0;
			if(count>0){
				this.loadTest();
			}else{
				document.getElementById("regLevel").value = "All";
				this.onRegLevelChange();
				alert("No Tests for the level selected");
			}
		};
		mainObj.displayResult = function(res){
			document.getElementById('actualResult').innerHTML = res;
		};
		return mainObj;
	}
	window.main = main();
})();