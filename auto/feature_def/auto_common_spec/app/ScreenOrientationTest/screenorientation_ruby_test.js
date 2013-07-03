var currentOrientation;

function enable(value)
{
	var returnedValue = false;
	jQuery.ajax({
         url:    '/app/ScreenOrientationTest/enable',
         data:	{enabled:value},
         success: function(result) 	{
			returnedValue = result == 'true';
         },		
         async:   false
	});
	return returnedValue;	
}

function normal()
{
	jQuery.ajax({
         url:    '/app/ScreenOrientationTest/normal',		
         async:   false	
	});
}

function upsideDown()
{
	jQuery.ajax({
         url:    '/app/ScreenOrientationTest/upside_down',		
         async:   false
	});
}

function leftHanded()
{
	jQuery.ajax({
         url:    '/app/ScreenOrientationTest/left_handed',		
         async:   false	
	});
}

function rightHanded()
{
	jQuery.ajax({
         url:    '/app/ScreenOrientationTest/right_handed',		
         async:   false	
	});
}

function setCallback()
{
	jQuery.ajax({
         url:    '/app/ScreenOrientationTest/set_callback',
         async:   false	
	});
}

function resetCallback()
{
	jQuery.ajax({
         url:    '/app/ScreenOrientationTest/reset_callback',
         async:   false	
	});
}

// function getAllProperties()
// {
	// var returnedValue = "";
	// jQuery.ajax({
         // url:    '/app/ScreenOrientationTest/get_all_properties',
         // success: function(result) 	{
         	// alert(result);
			// returnedValue = result;
         // },		
         // async:   false	
	// });
	// return returnedValue;
// }

function getAllProperties()
{
	return Rho.ScreenOrientation.getAllProperties();
}

function useSetProperty(value)
{
	var returnedValue = "";
	jQuery.ajax({
         url:    '/app/ScreenOrientationTest/use_set_property',
         data:	{enabled:value},
         success: function(result) 	{
					returnedValue = result;
                  },		
         async:   false	
	});
	return returnedValue;
}

function onScreenOrientation(orientationEvent)
{
	document.getElementById('output').innerHTML = orientationEvent.currentOrientation;
}
