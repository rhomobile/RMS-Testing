function ysm_ad(d1,d2,d3,d4,d5,d6){this.descr=d1;this.unused1=d2;this.clickURL=d3;this.title=d4;this.sitehost=d5;this.unused2=d6;}

function ysm_adjust_descr(d){
	num=44;
	if(d.length>num){
		var ysm_descr_shortened=d.substr(0,num);
		var ysm_descr_array=ysm_descr_shortened.split(" ");
		var ysm_descr_array=ysm_descr_array.slice(0,ysm_descr_array.length-1);
		var ysm_descr=ysm_descr_array.join(" ");
		//var ysm_descr=ysm_descr_array.join(" ")+" ...";
		return ysm_descr;
	}
	else
		return d;
}

function ysm_adjust_title(t){
	num=14;
	if(t.length>num){
		var ysm_title_shortened=t.substr(0,num);
		var ysm_title_array=ysm_title_shortened.split(" ");
		var ysm_title_array=ysm_title_array.slice(0,ysm_title_array.length-1);
		var ysm_title=ysm_title_array.join(" ");
		//var ysm_title=ysm_title_array.join(" ")+" &gt;&gt;";
		return ysm_title;
	}
	else
		return t;
}

function ysm_random_image(p)
{
	if (p == "1")
	{
		var img_group = new Array(3);
		img_group[0] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_1.jpg";
		img_group[1] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_2.jpg";
		img_group[2] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_6.jpg";
		img_group[3] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_11.jpg";
		img_group[4] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_12.jpg";
		img_group[5] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_13.jpg";
		img_group[6] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_14.jpg";
		//img_group[7] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_15.jpg";
		
		var rand_img = img_group[Math.floor(Math.random()*img_group.length)];
		
		return rand_img;
	}
	
	else if (p == "2")
	{
		var img_group = new Array(4);
		img_group[0] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_7.jpg";
		img_group[1] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_8.jpg";
		img_group[2] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_9.jpg";
		img_group[3] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_10.jpg";
		img_group[4] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_19.jpg";
		//img_group[4] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_16.jpg";
		//img_group[5] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_17.jpg";
		//img_group[6] = "http://ads.yimg.com/hb/i/sg/adv/infinity/prom_img_18.jpg";
		
		var rand_img = img_group[Math.floor(Math.random()*img_group.length)];
		
		return rand_img;
	}
	
	else
	{
		return "http://l.yimg.com/a/a/1-/flash/promotions/mx/__testing_only__/090910/50x50mpl.gif";
	}
}

var ysm_img = ysm_random_image(ysm_pos);

function ysm_display(){document.write('<div style="float:left;padding:2px 3px 0 0;"><a href="'+ ysm_rd + ysm_ad_obj[0].clickURL +'" target="_blank"><img src="'+ ysm_img +'" width="50" height="50" border="0" /></a></div><div class="small"><a href="'+ ysm_rd + ysm_ad_obj[0].clickURL +'" target="_blank" style="color:#16387C;"><b>'+ ysm_ad_obj[0].title +'</b><br /><span style="color:#666;">'+ ysm_ad_obj[0].descr +'</span></a>');}

var j=0;
var ysm_ad_obj=new Array();
if(typeof(zSr)!="undefined"){
	if (zSr.length > 6)
	{
		for(i=6;i<12;i=i+6)	{
			desc=ysm_adjust_descr(zSr[i]);
			shortened_title=ysm_adjust_title(zSr[i+3]);		
			ysm_ad_obj[j++] = new ysm_ad(desc,zSr[i+1],zSr[i+2],shortened_title,zSr[i+4],zSr[i+5]);
		}
	}		
	
	else
	{
		ysm_ad_obj[j++] = new ysm_ad(ysm_descr1,"",ysm_clickurl1,ysm_title1,ysm_sitehost1,"");		
	}
}
ysm_ad_obj[j++]=new ysm_ad(ysm_descr1,"",ysm_clickurl1,ysm_title1,ysm_sitehost1,"");
ysm_display();