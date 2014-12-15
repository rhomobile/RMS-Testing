
function callBackFunc(param) {
	       var sig = document.getElementById("actualResult"); 
	       sig.innerHTML = "Param: "+ param;
}

(function(){
	var pbTest = function(){
		var pbTestObj = {};
		pbTestObj.testCases = [
		{
				"VTID":"VT056-1149",
				"RegLevel":"R3",
				"Description":"Indicators <br/> Signal visible.",
				"PreCondition":[],
				"Steps":["Test Signal state functionality with Content='Visibility:visible'.","Check whether Signal is persistent across pages."],
				"ExpectedOutcome":["WLAN Signal state button should be shown in the pocket browser.","MinimizeButton should be persistent across pages.","Signal icon shown should be white in color."],
				"testToPerform":function(){
					generic.InvokeMETAFunction('Signal', 'Visibility:Visible');
				},
				"FinalResult":""
			},{
				"VTID":"VT056-1150",
				"RegLevel":"R3",
				"Description":"Indicators <br/> Signal hidden.",
				"PreCondition":[],
				"Steps":["Test Signal state functionality with Content='Visibility:hidden'"],
				"ExpectedOutcome":["WLAN Signal state button should not be shown in the pocket browser"],
				"testToPerform":function(){
					generic.InvokeMETAFunction('Signal', 'Visibility:Hidden');
				},
				"FinalResult":""
			}];
		pbTestObj.afterEach = function(){
			
		}
		return pbTestObj;
	}
	window.pbTest = pbTest();
})();