
<html>
<head>
<script>
  
    function Navigatetovisiblenpage() 
      {
          location.href='get.html';

      }

 </script>
 <head>
 <body <body onload="setTimeout('Navigatetovisiblenpage()',3000)">
 <?php
echo "<pre>";
print_r($_GET);
?>
 </body>
 </html>