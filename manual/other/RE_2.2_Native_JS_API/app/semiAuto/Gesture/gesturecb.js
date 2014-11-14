var myPage = "";
var backToTest = function(){
	gesture.delete();
	document.getElementById('mainBlock').innerHTML = myPage;
};

	// callback function
var EventCounter = 1;
function onGesture(id,count){
	document.getElementById("actualResult").innerHTML = "Gesture detected for "+EventCounter+"th time.<br>Gesture ID: " + id + ", Count: " + count;
    EventCounter++;  
}