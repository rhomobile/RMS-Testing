function getsignalwlanStatus()
{
	data = Rho.Signal.wlanStatus();
	$("#Rho_Signal_wlanStatus span.result").text(JSON.stringify(data));
}
