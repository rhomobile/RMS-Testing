<%
 set shell = CreateObject("WScript.Shell")


 t1 = timer()
 sleep(10000)
 t2 = timer()

 response.write "waited "& t2-t1 &" secs"


 function sleep(seconds)
    if seconds>=1 then shell.popup "pausing",seconds,"pause",64
 end function
%>