var prevkeycode;
var prevevent;

document.onkeyup= checkKeycodeup
  function checkKeycodeup(e) {
  
  window.console.log("JDP-Keyup");
  
  	var keycode;
  	if (window.event) 
  	keycode = window.event.keyCode;
  	else if (e)
  	keycode = e.which;

	window.console.log("JDP Keyup--"+keycode);

    if(prevkeycode==17){
      if((prevevent=="keyup")||(prevevent=="keydown")){
        
	    if(keycode==65){
		window.console.log("JDP CTRL+A");
      	document.getElementById('key').innerHTML = "CTRL+A pressed";
		window.console.log("after div CTRL+A");
      }	
		if(keycode==81){
        document.getElementById('key').innerHTML = "CTRL+Q pressed";
      }
		
  	 }
	}

	prevkeycode=keycode;
	prevevent="keyup";
}

document.onkeydown= checkKeycodedown
function checkKeycodedown(e) {

window.console.log("JDP-Keydown");

  var keycode;
  if (window.event) 
    keycode = window.event.keyCode;
  else if (e)
    keycode = e.which;

    window.console.log("JDP Keydown--"+keycode);
	
	
	if(prevkeycode==17){
    if(prevevent=="keydown"){
	
	
	if(keycode==48){
      	 document.getElementById('key').innerHTML = "CTRL+0 pressed";
      	}    		
      	if(keycode==49){
		window.console.log("JDP CTRL+1");
      	 document.getElementById('key').innerHTML = "CTRL+1 pressed";
		 window.console.log("after div CTRL+1");
      	}
      	if(keycode==50){
		window.console.log("JDP CTRL+2");
      	 document.getElementById('key').innerHTML = "CTRL+2 pressed";
		 window.console.log("after div CTRL+2");
      	}
      	if(keycode==51){
      	 document.getElementById('key').innerHTML = "CTRL+3 pressed";
      	}
      	if(keycode==52){
      	 document.getElementById('key').innerHTML = "CTRL+4 pressed";
      	}
      	if(keycode==53){
      	 document.getElementById('key').innerHTML = "CTRL+5 pressed";
      	}
      	if(keycode==54){
      	 document.getElementById('key').innerHTML = "CTRL+6 pressed";
      	}
      	if(keycode==55){
      	 document.getElementById('key').innerHTML = "CTRL+7 pressed";
      	}
      	if(keycode==56){
      	 document.getElementById('key').innerHTML = "CTRL+8 pressed";
      	}
      	if(keycode==57){
      	 document.getElementById('key').innerHTML = "CTRL+9 pressed";
      	}
	 	
    	if(keycode==66){
		window.console.log("JDP CTRL+B");
	    document.getElementById('key').innerHTML = "CTRL+B pressed";
		 window.console.log("after div CTRL+B");
    	}
    	if(keycode==67){
        document.getElementById('key').innerHTML = "CTRL+C pressed";
    	}
    	if(keycode==68){
        document.getElementById('key').innerHTML = "CTRL+D pressed";
    	}
    	if(keycode==69){
        document.getElementById('key').innerHTML = "CTRL+E pressed";
    	}
    	if(keycode==70){
        document.getElementById('key').innerHTML = "CTRL+F pressed";
    	}
    	if(keycode==71){
        document.getElementById('key').innerHTML = "CTRL+G pressed";
    	}
    	if(keycode==72){
        document.getElementById('key').innerHTML = "CTRL+H pressed";
    	}
      if(keycode==73){
        document.getElementById('key').innerHTML = "CTRL+I pressed";
      }
      if(keycode==74){
        document.getElementById('key').innerHTML = "CTRL+J pressed";
      }
      if(keycode==75){
        document.getElementById('key').innerHTML = "CTRL+K pressed";
      }
      if(keycode==76){
        document.getElementById('key').innerHTML = "CTRL+L pressed";
      }
      if(keycode==77){
        document.getElementById('key').innerHTML = "CTRL+M pressed";
      }
      if(keycode==78){
        document.getElementById('key').innerHTML = "CTRL+N pressed";
      }
      if(keycode==79){
        document.getElementById('key').innerHTML = "CTRL+O pressed";
      }
      if(keycode==80){
        document.getElementById('key').innerHTML = "CTRL+P pressed";
      }
   
      if(keycode==82){
        document.getElementById('key').innerHTML = "CTRL+R pressed";
      }
      if(keycode==83){
        document.getElementById('key').innerHTML = "CTRL+S pressed";
      }
      if(keycode==84){
        document.getElementById('key').innerHTML = "CTRL+T pressed";
      }
      if(keycode==85){
        document.getElementById('key').innerHTML = "CTRL+U pressed";
      }
      if(keycode==86){
        document.getElementById('key').innerHTML = "CTRL+V pressed";
      }
      if(keycode==87){
        document.getElementById('key').innerHTML = "CTRL+W pressed";
      }
      if(keycode==88){
        document.getElementById('key').innerHTML = "CTRL+X pressed";
      }
      if(keycode==89){
        document.getElementById('key').innerHTML = "CTRL+Y pressed";
      }
      if(keycode==90){
        document.getElementById('key').innerHTML = "CTRL+Z pressed";
      }
    }
	}

	prevkeycode=keycode;
	prevevent="keydown";
}