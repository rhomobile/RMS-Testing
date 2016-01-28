<html>
<head>
<title>Canvas Test</title>
</head>
<body>
<br /><br /><br />
<div id = "canvasdiv">
<?php

$id_max=88;
$id_min=0;

$canvas_index=array(
"saverestore.html", "scale.html", "rotation.html", "translate.html", "transform.html",
"textaligncombined.html", "drawline.html", "drawline_changewidth.html", "drawline_width_return.html", "linecap.html", 
"linejoin.html", "miterlimitcombined.html", "defaultmeterlimit.html", "fontarial.html", "defaultfontsetting.html",
"textaligncombined.html", "defaulttextalign.html", "textBaseline.html", "defaulttextBaseline.html", "movePath.html",
"closePath.html", "drawquadraticcurve.html", "drawquadraticcurve_cp1x.html", "drawbezier.html", "drawdrawbezier_cp1x.html",
"arcTo.html", "arcTo_x1.html", "arcTo_y1.html", "arcTo_x2.html", "arcTo_y2.html",
"arcTo_r.html", "drawarc.html", "drawarc_x.html", "drawarc_y.html", "drawarc_r.html",
"drawarc_sAngle.html", "drawarc_eAngle.html", "drawarc_clockwise.html", "drawrect.html", "drawrect_x.html",
"drawrect_y.html", "drawrect_width.html", "drawrect_height.html", "fillstyle.html", "fillstyle_color.html",
"defaultfillstyle.html", "strokestyle.html", "strokestyle_color.html", "drawfill.html", "drawclip.html",
"ispointInpath.html", "ispointInpath_1.html", "clearRect.html", "clearRect_x.html", "clearRect_y.html",
"clearRect_width.html", "clearRect_height.html", "filltext.html", "filltext_text.html", "filltext_x.html",
"filltext_y.html", "filltext_maxWidth.html", "stroketext.html", "stroketext_text.html", "stroketext_x.html",
"stroketext_y.html", "stroketext_maxwidth.html", "measureText.html", "measureText_text.html", "drawImage.html",
"drawImage_x.html", "drawImage_y.html", "drawImage_width.html", "drawImage_height.html", "drawImage_dx.html",
"drawImage_dy.html", "drawImage_dwidth.html", "drawImage_dheight.html", "globalalpha.html", "globalalpha_0and1.html",
"globalcompositeoperation.html", "composition.html", "shadowblur.html", "shadowcolor.html", "shadowoffsetx.html",
"shadowoffsety.html", "animate.html", "colortoshape.html"	
);
if($_GET!=null){
$id = $_GET['i'];
$cur_id=$id;

	if ($id >$id_min)
	{
		$id--;
		Echo "<br /><a href=canvas_index.php?i=$id>Prev</a>";
		$id++;
	}
	$id++;
	Echo "<a href=canvas_index.php>&nbsp;&nbsp;&nbsp;&nbsp;Index</a>";
	if($id <$id_max){
	Echo "<br /><br /><a href=canvas_index.php?i=$id>&nbsp;&nbsp;&nbsp;&nbsp;Next</a><br />";
	}
	Echo "<b>$canvas_index[$cur_id]</b><br />";
	include($canvas_index[$cur_id]); 
}
else
{
	for($i=0;$i<88;$i++)
	{
		Echo "<a href=$canvas_index[$i]>$canvas_index[$i]</a><br />";
	}
}
?>
</div>
</body>
</html>


