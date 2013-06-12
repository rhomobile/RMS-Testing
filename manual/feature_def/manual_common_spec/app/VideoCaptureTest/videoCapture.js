function startVideoCaptureWithoutCallback()
{
	Rho.Videocapture.start();
}

function startVideoCaptureWithCallback()
{
	alert("test");
	Rho.Videocapture.start(mysaveevent);
}

function mysaveevent(params)
{
	
	var data = "Save params: "+params+
					"Result is "+params['transferResult']+"Name is "+params['fileName']+"Size is "params['size'])
	$("#Rho_startVideoCaptureWithCallback span.result").text($.toJSON(data));
					
}