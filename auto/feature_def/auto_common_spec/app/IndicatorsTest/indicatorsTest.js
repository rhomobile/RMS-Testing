//  

function outputToPage(theOutput, theText)
{
	document.getElementById(theOutput).innerHTML=theText;
}


function getIndicatorStatus(rubyFunc, trigger, refreshInterval, whatToReturn)
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    rubyFunc,
		 data: {theTrigger:trigger,theRefreshInterval:refreshInterval,theReturnVal:whatToReturn},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	return returnedValue;
}

function getDeviceType()
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    '/app/IndicatorsTest/get_device_type',
		 data: {},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	return returnedValue;
}

function changeRefresh(rubyFunc, milliseconds)
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    rubyFunc,
		 data: {refreshMilliseconds:milliseconds},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	return returnedValue;
}

function showIcon(rubyFunc, left, top, layout, colour)
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    rubyFunc,
		 data: {iconLeft:left,iconTop:top, iconLayout:layout, iconColour:colour},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	return returnedValue;
}

function hideIcon(rubyFunc)
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    rubyFunc,
		 data: {},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	return returnedValue;
}

function smartBattery(rubyFunc, returnVal)
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    rubyFunc,
		 data: {theReturnVal:returnVal},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	return returnedValue;
}

function keyStateFunc(rubyFunc, right, top, width, height)
{
	var returnedValue = "umbrella";	//  Function is asynchronous so this should not be returned
	jQuery.ajax({
         url:    rubyFunc,
		 data: {iconRight:right,iconTop:top, iconWidth:width, iconHeight:height},
         success: function(result) 	{
					returnedValue = result;
                  },
         async:   false
    });  
	return returnedValue;
}
