var getAppMessage = function (){
	var message = Rho.System.getApplicationMessage();
	//Uncomment below lines to check method is working fine or not
	//message = JSON.parse(message);
	var node=document.createElement("LI");
	if(message.image){
	    var img= new Image(100,100);
	    img.src= "data:image/png;base64, "+message['image'];
		node.appendChild(img);
	}
	else{
		text_message = JSON.stringify(message,null," ");
		var textnode =document.createTextNode(text_message);
		node.appendChild(textnode);
	}
	document.getElementById("myList").appendChild(node);
}

var startNotification = function(){
	Rho.System.startApplicationMessageNotifications(function(message){
		//Type of data should be JSON in JS and HASH in RUBY.
		var node=document.createElement("LI");
		if(message.image){
		    var img= new Image(100,100);
		    img.src= "data:image/png;base64, "+message['image'];
			node.appendChild(img);
		}
		else{
			text_message = JSON.stringify(message,null," ");
			var textnode =document.createTextNode(text_message);
			node.appendChild(textnode);
		}
		document.getElementById("myList2").appendChild(node);
	})
}