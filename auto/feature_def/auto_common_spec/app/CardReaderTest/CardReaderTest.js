function getCardReader()
{
	var expectedResult = "autoTab:- TRUE autoEnter:- TRUE";	
	var actualResult = "";
	jQuery.ajax({
         url:    '/app/CardReaderTest/funget',	
		 success: function(result) {
			actualResult = result;			
			},
         async:   false	
	});	
	return actualResult;
}

function getAllCardReader()
{
	var expectedResult = "timeout:- 30000 entry:- FALSE panData:-  tab:- TRUE enter:- TRUE module:-";	
	var actualResult = "";
	jQuery.ajax({
        url:    '/app/CardReaderTest/fungetall',	
		success: function(result) {
			actualResult = result;						
			},		 
         async:   false	
	});
	return actualResult;
}
function openCardReader()
{
	var expectedResult = "true";	
	var actualResult = "";
	jQuery.ajax({
         url:    '/app/CardReaderTest/funopen',
		 success: function(result) {
			actualResult = result;						
			},		 
         async:   false	
	});
	return actualResult;
}

function closeCardReader()
{
	var expectedResult = "true";	
	var actualResult = "";
	jQuery.ajax({
         url:    '/app/CardReaderTest/funclose',
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

