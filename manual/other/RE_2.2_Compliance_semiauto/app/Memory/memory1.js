
//	<script type="text/javascript" src="http://10.233.85.82/src/elements.js"></script>
//	<script type="text/javascript">
var callbackcaaled =false;
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT187-2805",
				"RegLevel":"R1",
				"Description":"Memory <br/> lowMemThreshold with 5000 KB",
				"PreCondition":[],
				"Steps":["Attach memoryEvent","call getMemoryStats to check the available memory","set lowMemThreshold to 5000 KB (can be set as per available meory)","wait for event to fire"],
				"ExpectedOutcome":["memoryEvent should fire after available Memory drops below the 50000 KB","event should fire once if drops below 5000 KB, further drops event will not fire"],
				"testToPerform":function(){
					var thresholddefault = memory.lowMemThreshold;
					alert(thresholddefault);
					memory.memoryEvent="memoryEventjsFunction('%s','%s');";
					memory.getMemoryStats();
					if(callbackcalled = true)
					memory.lowMemThreshold = thresholddefault;
					sig.innerHTML = "Memory Value is " ;

				
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2807",
				"RegLevel":"R1",
				"Description":"Memory <br/> memoryEvent return values",
				"PreCondition":[],
				"Steps":["Attach memoryEvent","call method getMemoryStatus","check for the return memory values"],
				"ExpectedOutcome":["memoryEvent should fire and return the available memory and totalMemory of the device"],
				"testToPerform":function(){
					memory.memoryEvent="memoryEventjsFunction('%s','%s');";
					memory.getMemoryStats();
					
				},
				"FinalResult":""
			},{
				"VTID":"VT187-2810",
				"RegLevel":"R1",
				"Description":"Memory <br/> memoryEvent with JSON",
				"PreCondition":[],
				"Steps":["Attach memoryEvent with JSON Implementation","call method getMemoryStatus","check for the return memory values"],
				"ExpectedOutcome":["memoryEvent should fire and return the available memory and totalMemory of the device"],
				"testToPerform":function(){
					memory.memoryEvent="memoryEventjsonFunction(%json);";
					memory.getMemoryStats();
					
				},
				"FinalResult":""
			
			}];
		pbTestObj.afterEach = function(){
			callbackcalled = false;
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();
function memoryEventjsFunction(totalMemory,availMemory)
	{
		var theOutput = "<BR><BR><B>memoryEvent  </B>" + "<BR>";
		var sig = document.getElementById("actualResult"); 
        theOutput = theOutput + "totalMemory(KB): "+totalMemory + "<BR>";        
        theOutput = theOutput + "availMemory(KB): " + availMemory  + "<BR>"; 
        memory.lowMemThreshold = availMemory-10; 
        callbackcalled = true;
        sig.innerHTML = theOutput;
	}
	function memoryEventjsonFunction(jsonObject)
	{
		var theOutput = "<BR><BR><B>memoryEvent  </B>" + "<BR>";  
		var sig = document.getElementById("actualResult");      
        theOutput = theOutput + "totalMemory(KB): "+jsonObject.totalMemory + "<BR>";        
        theOutput = theOutput + "availMemory(KB): " + jsonObject.availMemory  + "<BR>";
        sig.innerHTML = theOutput;
	}
