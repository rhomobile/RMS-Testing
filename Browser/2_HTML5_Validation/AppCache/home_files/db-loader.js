//
// Download SOR data
//
// In a worker thread we have to use the underlying XMLHttpRequest rather than any jQuery call
// Also there is no access to localStorage or the DOM. All data transfer is via messages
//
self.onmessage = function(event) {
	  var params = event.data.split(",");
	  var downloadSORUrl = escape(params[2]+"/mobile/sor.jsp");
	  var result;
	  if (true)
	  {
	    try {
	        xhr = new XMLHttpRequest();        
	        xhr.open('GET', downloadSORUrl, false);
	        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	        xhr.setRequestHeader("username", params[0]);
	        xhr.setRequestHeader("password", params[1]);
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState == 4) {
	                if (xhr.status == 200) {
	                	result = xhr.responseText;
	                }
	            }
	        };
	        xhr.send('');
	    } catch (e) {
	        self.postMessage('{}');
	    }
	  }
	  self.postMessage(result);
};