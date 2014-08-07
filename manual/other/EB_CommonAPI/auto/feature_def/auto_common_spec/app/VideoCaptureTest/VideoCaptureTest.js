function getVideocapture()
{
	var expectedResult = "fileName:- /VideoCaptureATS duration:- 60000 Gallery:- true Resolution:- HIGH";	
	var actualResult = "";
	jQuery.ajax({
         url:    '/app/VideoCaptureTest/funget',	
		 success: function(result) {
			actualResult = result;			
			},
         async:   false	
	});
	return actualResult;
}

function getAllVideocapture()
{
	var expectedResult = "fileName:- duration:- 5000 Gallery:- false Resolution:- HIGH";	
	var actualResult = "";
	jQuery.ajax({
         url:    '/app/VideoCaptureTest/fungetall',	
		success: function(result) {
			actualResult = result;						
			},		 
         async:   false	
	});
	return actualResult;
}
function startVideocapture()
{
	var expectedResult = "true";	
	var actualResult = "";
	jQuery.ajax({
         url:    '/app/VideoCaptureTest/funstart',
		 success: function(result) {
			actualResult = result;						
			},		 
         async:   false	
	});
	return actualResult;	
}

function stopVideocapture()
{
var expectedResult = "true";	
	var actualResult = "";
	jQuery.ajax({
         url:    '/app/VideoCaptureTest/funstop',
		 success: function(result) {
			actualResult = result;						
			},		 
         async:   false	
	});
	return actualResult;
}

function swipedata(data)
{	
	document.getElementById('output').innerHTML = data;
}

