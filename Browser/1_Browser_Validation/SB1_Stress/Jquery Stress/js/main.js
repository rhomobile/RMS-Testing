(function(){console.log("Self Invoking function");var e=function(){var e={};var t="";e.checkTimer=function(e){if(e.target.id=="start"){console.log("Start button clicked");var n=1;t=setInterval(function(){if(n==1){$("#box1").hide();$("#box2").show();$("#box3").hide();n++}else if(n==2){$("#box1").hide();$("#box2").hide();$("#box3").show();n++}else if(n==3){$("#box1").show();$("#box2").hide();$("#box3").hide();n=1}},3e3);console.log("setInterval Id : "+t)}else if(e.target.id=="stop"){console.log("Stop button clicked");console.log("setInterval Id during stop: "+t);clearInterval(t)}};return e}();window.main=e})();