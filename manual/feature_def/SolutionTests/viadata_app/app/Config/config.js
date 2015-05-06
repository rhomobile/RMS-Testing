var enumData;
var objSCN;
var callbackData;
var checkstring='';

var selectstringconfig = function(){
	var w = document.getElementById('stringconfig').selectedIndex;
	checkstring = document.getElementById('stringconfig').options[w].value;
} 

var isExists =  function(){
	var ispropertyExists = Rho.Config.isPropertyExists(checkstring);
	document.getElementById("result").innerHTML = checkstring +" Property Exists=" +ispropertyExists;
	alert("Property Exists =" +ispropertyExists);
}

var setString =  function(){
	var text = document.getElementById('txtValue').value;
	//alert(text);
	//Rho.Config.setPropertyString(checkstring,"/app/myindex.html",false);
	Rho.Config.setPropertyString(checkstring,text,false);
	document.getElementById("result").innerHTML = "Setting " +checkstring +" to " +text;
	alert("setting " +checkstring +" to " +text +" !!!");
}

var getString =  function(){
	var isstring = Rho.Config.getPropertyString(checkstring);
	document.getElementById("result").innerHTML = isstring;
	alert(isString);
}

var setInt =  function(){
	var inttemp = document.getElementById('txtValue').value;
	var intValue = parseInt(inttemp);
	Rho.Config.setPropertyInt(checkstring,intValue,true);
	document.getElementById("result").innerHTML = "Setting " +checkstring +"to value" +intValue;
	alert("Setting " +checkstring +"to value " +intValue);
}

var getInt =  function(){
	var isInt = Rho.Config.getPropertyInt(checkstring);
	document.getElementById("result").innerHTML = checkstring +" value = " +isInt;
	alert(checkstring +"value = " +isInt);
}

var setBool =  function(){
	var boolvalue = document.getElementById('txtValue').value;
	if(boolvalue == 'true'){
	Rho.Config.setPropertyBool(checkstring,true,false);
	}else{
	Rho.Config.setPropertyBool(checkstring,false,false);
	}
	document.getElementById("result").innerHTML = "Setting " +checkstring +"to value" +boolvalue;
	alert("Setting " +checkstring +"to value " +boolvalue);
}

var getBool =  function(){
	var isBool = false;
	isBool = Rho.Config.getPropertyBool(checkstring);
	document.getElementById("result").innerHTML = isBool;
	alert(checkstring +"value = " +isBool);
}

var loadFromFile =  function(){
	Rho.Config.configPath = 'rho/apps/app/rhoconfig.txt'
	Rho.Config.loadFromFile();
	document.getElementById("result").innerHTML = "clicking on Home button should navigate to myindex"
}
var remProperty =  function(){
	var ispropertyExists;
	Rho.Config.removeProperty(checkstring, false);
	ispropertyExists = Rho.Config.isPropertyExists(checkstring);
	alert(checkstring +" Property removed = " +ispropertyExists);
	document.getElementById("result").innerHTML = "property has been removed temporarly!";
	alert("property removed temporarly ! Quit and Launch app again");
}



