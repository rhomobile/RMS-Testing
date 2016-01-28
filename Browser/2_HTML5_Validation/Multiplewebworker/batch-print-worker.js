self.addEventListener("message", function(event) {
  var eids = event.data.eids; // array of the survey id numbers
  var msg = {};

  for (var i = 0, len = eids.length; i < len; i++) {
    var http = new XMLHttpRequest();
    var url = "survey_page_url" + eids[i]; // url of the specific survey

    // tell the main thread what survey is being processed
    msg.type = "status";
    msg.text = "Processing evaluation " + (i + 1) + " of " + len + "<hr />";
    self.postMessage(msg);

    // make the AJAX call and return the HTML to the main thread
    http.open("GET", url, false);
    http.send(null);
    msg.type = "survey";
    msg.text = http.responseText;
    self.postMessage(msg);
  }

  // tell the main thread that we're done and close
  msg.type = "done";
  msg.text = "";
  self.postMessage(msg);
  self.close();
});