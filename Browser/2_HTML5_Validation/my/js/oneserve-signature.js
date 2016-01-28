/*
 * 	Script file for handling signatures
 */
var SIG_MIN_LENGTH = 15; // array elements not json character count

function signatureSelect() {
	consoleLog("Select signature types");
	var appt = localStorage.getObject('currentAppointment');
	var sigList = $('#sigSelectList');
	
	if(sigList.length){
		sigList.empty();
		consoleLog(appt.reqOperativeSig+", "+appt.reqCustomerSig);
		
		if (appt.reqOperativeSig == 'true')
		{
			var statusImage = 'cross';
			consoleLog("Operative signature required");
			if (appt.operSig !== undefined)
			{
				statusImage = 'tick';
			}
			var data = {text:getMessage('signature.operative','Operative Signature'), type:'0', 'statusImage':statusImage};
			var html = ich.sigSelectTemplate(data);
			sigList.append(html);
		}
		if (appt.reqCustomerSig == 'true')
		{
			var statusImage = 'cross';
			consoleLog("Customer signature required");
			if (appt.custSig !== undefined)
			{
				statusImage = 'tick';				
			}			
			var data = {text:getMessage('signature.customer','Customer Signature'), type:'1', 'statusImage':statusImage};		
			var html = ich.sigSelectTemplate(data);
			sigList.append(html);
		}
	}
	sigList.listview('refresh');
	
	// display job status
	displayStatusHeader();

}

function clearSignature() {
	$('.sigPad').signaturePad().clearCanvas();
}

function isSignatureRequired(appt) {
	return (sigCount(appt) != 0) ? true : false;
}

function areSignaturesComplete(appt) {
	return (sigCount(appt) == sigCompleted(appt)) ? true : false;
}

function sigCount(appt) {
	var count = 0;
	if (appt.reqOperativeSig == 'true') count++;
	if (appt.reqCustomerSig == 'true') count++;
	return count;
}

function sigCompleted(appt) {
	var count = 0;
	if (appt.operSig !== undefined) count++;
	if (appt.custSig !== undefined) count++;
	return count;
}

// re-draw any existing signature
function drawSignature(type) {
	
	var appt = localStorage.getObject('currentAppointment');
	
	if (type == 0 && appt.operSig !== undefined) // re-draw operative signature
	{
		$('.sigPad').signaturePad().regenerate(appt.operSig);
	}
	else if (type == 1 && appt.custSig !== undefined)  // re-draw customer signature
	{
		$('.sigPad').signaturePad().regenerate(appt.custSig);
	}
}
