//
// GPS sender
//
// Will send back GPS position every n minutes. Gets kicked off after login and then 
// needs no further messages.
//
// In a worker thread we have to use the underlying XMLHttpRequest rather than any jQuery call
// Also there is no access to localStorage or the DOM. All data transfer is via messages
//
var uploadGPSUrl;
var username;
var password;
var resourceId;

self.onmessage = function(event) {
	var params = event.data.split(",");
	username = params[0];
	password = params[1];
	uploadGPSUrl = escape(params[2]+"/mobile/gps.jsp");
	resourceId = params[3];
	sendGPS(); // send once for just after login
	setInterval("sendGPS()", 1800000);
	self.postMessage('GPS started');
	//self.postMessage(event.data);
};


function sendGPS() {	  
	var result;
    try {
		if (navigator.geolocation) {
	
		        xhr = new XMLHttpRequest();        
		        xhr.open('POST', uploadGPSUrl, false);
		        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		        xhr.setRequestHeader("username", username);
		        xhr.setRequestHeader("password", password);
		        // to make life simple at the server end just put the data in the headers
		        xhr.setRequestHeader("resourceid", resourceId);
		        navigator.geolocation.getCurrentPosition(function(position) {
			        xhr.setRequestHeader("latitude", position.coords.latitude);
			        xhr.setRequestHeader("longitude", position.coords.longitude);
		        });
		        
		        xhr.onreadystatechange = function () {
		            if (xhr.readyState == 4) {
		                if (xhr.status == 200) {
		                	result = xhr.responseText;
		                }
		            }
		        };
		        xhr.send('');
	
		}
		else
		{
			self.postMessage("No geolocation available");
		}
	
    } catch (e) {
        self.postMessage(e);
    }	
}


/*  Google Map link up?
navigator.geolocation.getCurrentPosition(function(position) {
var latLng = new google.maps.LatLng(
    position.coords.latitude, position.coords.longitude);
var marker = new google.maps.Marker({position: latLng, map: map});
map.setCenter(latLng);
}, errorHandler);
*/
