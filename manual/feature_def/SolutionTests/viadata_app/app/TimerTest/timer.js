var timer;
var timersec = 5000;

var timerInterval = function(value){
	timersec = value;
}
var timercallback = function(){
	var d = new Date();
    	alert("Date = " +d);
    	document.getElementById("result").innerHTML = d;
    }
var createTimer = function(){
    	timer = Rho.Timer.create();
    	//alert("created instance for Timer");
    	document.getElementById("result").innerHTML = "Timer created";
    }
    
var startTimer =  function(){
		document.getElementById("result").innerHTML = "Timer started ! please wait for " +timersec +" ms";
    	timer.start(timersec,timercallback);
    }
    
var stopTimer =  function(){
     	timer.stop();
     	document.getElementById("result").innerHTML = "Timer stopped";
    }
    
var isaliveTimer =  function(){
     var checkTimer = timer.isAlive();
     	alert(checkTimer);
     	document.getElementById("result").innerHTML = "Timer Status: " +checkTimer;
    }