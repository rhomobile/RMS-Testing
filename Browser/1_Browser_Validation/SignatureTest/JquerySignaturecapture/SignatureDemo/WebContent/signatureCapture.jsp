<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<title>Please sign</title>
		<link rel="stylesheet" type="text/css" href="css/jquery.mobile-1.0.min.css" />
		<link rel="stylesheet" href="css/jquery.signaturepad.css">
		
		<script type="text/javascript" src="commonJS/jquery-1.6.4.min.js"></script>
		<script type="text/javascript" src="commonJS/jquery.mobile-1.0.min.js"></script>
		<script type="text/javascript" src="commonJS/jquery.signaturepad.min.js"></script>
		
	</head>
	<body>
		<div data-role="page" data-dom-cache="false">
		 	<form method=post action="#" class=sigPad>
		 		<ul class=sigNav>
					<li class=clearButton><a href="#clear">Clear</a></li>
				</ul>
				<div class="sig sigWrapper">
					<div class=typed></div>
					<canvas class=pad width=279 height=380></canvas>
					<input type=hidden name=output class=output>
					<!--<input type="hidden" name="signCaptured" id="signCaptured" value="" />-->
					<input type="" name="output" class="output" id="signCaptureds"/>
				</div>
				
				<div id="signAcceptDiv" data-position="inline" data-theme="b" ><br />
					<a href="#" data-role="button" id="signAccept" data-theme="c">Accept</a>
				</div>
		 		<script type="text/javascript">
					$(document).ready(function () {
					  $('.sigPad').signaturePad({drawOnly:true});
					});

					function SignCaptureController(){
						window.document.forms[0].action = "index1.jsp";
						window.document.forms[0].submit();
					}
					
					function signatureCaptured(action){
						document.getElementById('signCaptured').value = action;
						SignCaptureController();
					}
				    $("#signAccept").bind('click', function (event) {
				    	alert("accept");
				       	signatureCaptured('Yes');
		            });				       

				</script>
			</form>
	 	</div>
	</body>
</html>