jQuery.extend({

	ImagePageView: function(){
		var self = this;
		var listeners = new Array();
		
		// add listener to the INPUT field
		$('#fileElem').change(function (e) {handleFiles(e);});
				 
		// actual select button
		$('#fileSelect').die('vclick');
		$('#fileSelect').live('vclick', function select(e){
			console.log("fileSelect clicked");
			$('#fileElem').click(); // drives the hidden INPUT field
		});		
		
		/*
		 *  Called when the select link clicked to view available files
		 *  Limited in the html to 'image/*' mime types and allows multiple selection
		 */
		function handleFiles(e) 
		{
		  console.log("Handle files: "+e);
		  var platform = navigator.platform; // this needs testing on iPad and other devices
		  var fileList = e.currentTarget.files;
		  //console.log("List: "+JSON.stringify(fileList));
		  
		  var imageList = $('#imagelist');
		  imageList.empty();
		  //var imageListObj = document.getElementById('imagelist');
		  //console.log(imageList);
		  
		  // update the list for all selected images
		  showLoadingMessage(getMessage("image.loading","Loading thumbnails"));
		  for (var x=0;x<fileList.length;x++)
		  {
			  var file = fileList[x];
			  console.log("File: "+file.name+","+file.type+","+file.size);
			  //console.log("File source: "+file.src);
			  
			  // double-check it's an image (Android 4 issue not supplying type here)
			  //var imageType = /image.*/;			 
			  //if (!file.type.match(imageType)) {
			  //  continue;
			  //}
			 
			  var id = (x+1);
			  // template version
			  // we turn off the rotate buttons for iPhone etc
			  var ios = (platform == 'iPhone' || platform == 'iPad') ? true:false;
			  var filebase = getFileName(file.name);
			  var rowdata = {'thumbid':'p'+id,'thumbsrc':'','filename':file.name,'filebase':filebase,
					  		'fullid':'f'+id,'fullsrc':'','upid':'u'+id,'rrid':'rr'+id,'rlid':'rl'+id,'inputid':'n'+id, 'notios':!ios};

			  var row = ich.imageTemplate(rowdata);
			  imageList.append(row);
			  var image1 = $('#p'+id);
			  // loads the thumbnail data
			  var treader = new FileReader();
			  treader.onload = (
					function(aImg) { 
						  return function(e) 
						  { 
							  aImg.src = e.target.result;	// reads in the Base64 file data
						  };
		  			})(image1.get(0));		  
			  treader.readAsDataURL(file);
			  // loads the full image (hidden) so we can determine the real size
			  // this slows the process down but we need it to determine scaling and rotation
			  var image2 = $('#f'+id);
			  var freader = new FileReader();		  
			  freader.onload = (
					function(aImg, counter, count) { 
						  return function(e) 
						  { 
							  if (ios)
							  {
								  aImg.style.display = "block";
							  }
							  aImg.src = e.target.result;	// reads in the Base64 file data
							  if (counter >= (count-1))
							  {
								  hideLoadingMessage();
							  }
							  aImg.addEventListener('load', function() {
								  //console.log("Image "+aImg.id+" loaded: "+aImg.width+"x"+aImg.height);
								  // add aspect ratio to corresponding thumbnail
								  resizeThumbnail(aImg);
								  }, false);
						  };
		  			})(image2.get(0), x, fileList.length);
			  freader.readAsDataURL(file);			  
		  }

		  imageList.listview('refresh');
		}
		
		// on click of any upload link
		$('.imageUpload').die('vclick');
		$('.imageUpload').live('vclick', function select(e){
			console.log("image upload");
			var platform = navigator.platform; // this needs testing on iPad and other devices
			//remoteLogger("mobile.user","",platform,3);
			
			var id = "";
			var rotated = false;
			var rotation = 0;
			
			var button = e.srcElement;		// WebKit
			if (!button)
				button = e.currentTarget;	// FireFox
			
			// see which icon clicked
			//console.log("Button clicked: "+button.src);
			if (button.src.indexOf('rotate-left.png') != -1)
			{
				id = button.id.substring(2);
				rotation = -2;
				rotated = true;
				console.log("Rotate left clicked");
			}
			else if (button.src.indexOf('rotate-right.png') != -1)
			{
				id = button.id.substring(2);
				rotation = 2;
				rotated = true;	
				console.log("Rotate right clicked");
			}
			else
			{
				id = button.id.substring(1);
				console.log("Upload clicked");
			}
			console.log("image id="+id);
			
			var image = document.getElementById("f"+id);
			var imageHolder = document.getElementById('imageHolder');
			var imageType = "image/png";
			var extension = getFileExtension(image.name);
			if (extension == 'gif') 
				imageType = "image/gif";
			if (extension == 'jpg' || extension == 'jpeg')
				imageType = "image/jpeg";
			var height = $('#f'+id).height();
			var width = $('#f'+id).width();
		
			var scale = 1.0;
			console.log("Dimensions: "+width + " x " + height);
			//remoteLogger("mobile.user","","Dimensions: "+width + " x " + height,3);
			
			var scaled = false;
			// limit size for now
			if (height > MAX_IMAGE_HEIGHT || width > MAX_IMAGE_WIDTH)
			{
				if (height > width)
				{
					scale = MAX_IMAGE_WIDTH / height;
				}
				else
				{
					scale = MAX_IMAGE_WIDTH / width;			
				}
				scaled = true;
			}
			
		    //scale = 0.84;
			console.log("Scaling factor: "+scale);
			//remoteLogger("mobile.user","","Scaling factor: "+scale,3);
			
			// can we test that if portait on iPhone/iPad then we need to rotate?			
		    if ((platform == 'iPhone' || platform == 'iPad') && height > width)
		    {
		    	rotated = true;
		    	rotation = 2;		    		
		    }
		    
		    // if the dimensions are too big we resize and possibly rotate
		    var canvas = document.getElementById('imageCanvas');
		    
		    if (rotated)
		    {
			    if (platform == 'iPhone' || platform == 'iPad')
			    {
			    	height = image.height;
			    	width = image.width;
			    	
			    	// for iPhone/iPad we put the scaling into a known band so we can apply a fixed multiplier
			    	// this is for an iOS6 subsampling issue which causes squashed images on megapixel images
			    	// so we have hacked hard-coded values that need removing at some point
				    var multi = 1;
				    if (height * width > 1024000) // is 1MB accurate enough?
				    {
					    var scales = new Array(0,0.25,0.5,0.75,1.0);
					    var multiplier = new Array(2.05,2.0,1.95,1.9,1.85);
	
					    for (var x=0;x<=scales.length;x++)
					    {
					    	if (scale > scales[x] && scale <= scales[x+1])
					    	{
					    		scale = scales[x+1];
					    		multi = multiplier[x+1];
					    		break;
					    	}
					    }
				    }
				    var aspectRatio = height/width;
					//remoteLogger("mobile.user","","Scaling factor rotated iPhone/iPad: "+scale+", "+multi,3);
				    canvas.width = width*scale;
				    canvas.height = height*scale;
				    console.log("Canvas: "+canvas.width+" x "+canvas.height);
					//remoteLogger("mobile.user","","Canvas: "+canvas.width+" x "+canvas.height,3);
				    var context = canvas.getContext('2d');
				    context.save();
				    context.scale(scale,scale);
				    var mHeight = Math.round(height * multi);
			    	context.translate(height/2, width/2);	    	
			    	context.rotate(Math.PI / rotation);
				    //remoteLogger("mobile.user","","Draw params rotated: "+width+","+height+","+width+","+mHeight,3);
			    	context.drawImage(image, 0, 0, width, height, -width/(1.5*aspectRatio), -height/(3*aspectRatio), width*aspectRatio, mHeight);	
				    image.src = canvas.toDataURL(imageType);  // returns the correct type if supported		
					console.log("Image data size: "+image.src.length);
			    	context.restore();					
			    }
			    else
			    {
				    canvas.width = height*scale;
				    canvas.height = width*scale;
				    console.log("Canvas: "+canvas.width+" x "+canvas.height);
					//remoteLogger("mobile.user","","Canvas: "+canvas.width+" x "+canvas.height,3);
				    var context = canvas.getContext('2d');
				    context.save();
				    context.scale(scale,scale);
			    	context.translate(height/2, width/2);	    	
			    	context.rotate(Math.PI / rotation);
			    	context.drawImage(image, -width/2, -height/2);		 
				    image.src = canvas.toDataURL(imageType);  // returns the correct type if supported		
					console.log("Image data size: "+image.src.length);
			    	context.restore();
			    }
		    }	
		    else
		    {
		    	//remoteLogger("mobile.user","","No rotation",3);	    	
				//remoteLogger("mobile.user","","Canvas: "+canvas.width+" x "+canvas.height,3);
			    if (platform == 'iPhone' || platform == 'iPad')
			    {
			    	height = image.height;
			    	width = image.width;
			    	
			    	// for iPhone/iPad we put the scaling into a known band so we can apply a fixed multiplier
			    	// this is for an iOS6 subsampling issue which causes squashed images on megapixel images
			    	// so we have hacked hard-coded values that need removing at some point
				    var multi = 1;
				    if (height * width > 1024000) // is 1MB accurate enough?
				    {
					    var scales = new Array(0,0.25,0.5,0.75,1.0);
					    var multiplier = new Array(2.1,2.05,2.0,1.95,1.9);
	
					    for (var x=0;x<=scales.length;x++)
					    {
					    	if (scale > scales[x] && scale <= scales[x+1])
					    	{
					    		scale = scales[x+1];
					    		multi = multiplier[x+1];
					    		break;
					    	}
					    }
				    }
					//remoteLogger("mobile.user","","Scaling factor iPhone: "+scale+", "+multi,3);
			    	//remoteLogger("mobile.user","","iPhone specific settings",3);
				    console.log("Image: "+width+" x "+height);	
					//remoteLogger("mobile.user","","Image: "+width+" x "+height,3);
					//console.log("Image data size: "+image.src.length);
				    canvas.height = height * scale;
				    canvas.width = width * scale;
					//remoteLogger("mobile.user","","Canvas scaled: "+canvas.width+" x "+canvas.height,3);
					
				    var context = canvas.getContext('2d');
				    context.save();				    
				    console.log("Canvas: "+canvas.width+" x "+canvas.height);	
				    context.scale(scale,scale);
				    // params, image, src info, dest info
				    //remoteLogger("mobile.user","","Draw params: "+width+","+height+","+width+","+Math.round(height * multi),3);
			    	context.drawImage(image, 0, 0, width, height, 0, 0, width, Math.round(height * multi));
				    // now get the data we are sending from the hidden canvas
				    image.src = canvas.toDataURL(imageType);  // returns the correct type if supported		
					console.log("Image data size: "+image.src.length);
			    	context.restore();
			    }
			    else
			    {
				    canvas.height = height*scale;
				    canvas.width = width*scale;
				    var context = canvas.getContext('2d');
				    context.save();				    
				    console.log("Canvas: "+canvas.width+" x "+canvas.height);	
			    	//remoteLogger("mobile.user","","Generic settings",3);
				    context.scale(scale,scale);
			    	context.drawImage(image, 0, 0);
				    // now get the data we are sending from the hidden canvas
				    image.src = canvas.toDataURL(imageType);  // returns the correct type if supported		
					console.log("Image data size: "+image.src.length);
			    	context.restore();	
			    }    	
		    }
		    
			//remoteLogger("mobile.user","","Image data size: "+image.src.length,3);
			
			// get name from input field to see if it has changed
			var nameElement = $("#n"+id);			

			// change the upload image to signify done and disable others
			$('#u'+id).attr("src","images/tick.png");
			$('#u'+id).removeClass("imageUpload");
			$('#u'+id).addClass("imageUploaded");
		    if (platform != 'iPhone' && platform != 'iPad')
		    {
				$('#rr'+id).css('display','none');
				$('#rl'+id).css('display','none');
		    }
			
		    notifyUploadImageClicked(image,scale,scaled,rotated,nameElement.val());
		});	
		
		function resizeThumbnail(img) {
			  var id = img.id.substring(1);
			  console.log(id);
			  var pv = $('#p'+id);
			  var ar = 1;
			  if (img.width > img.height)
			  {
				  ar = img.width / img.height;
				  pv.css("width",100+"px");
				  pv.css("height",100/ar+"px");
			  }
			  else
			  {
				  ar = img.height / img.width;
				  pv.css("width",100/ar+"px");
				  pv.css("height",100+"px");
			  }
			  console.log(pv);
		}
		
		function getFileName(fname) {
			var f = fname.substring(0,fname.lastIndexOf('.'));
			return f;
		}
		
		function getFileExtension(fname) {
			var f = fname.substring(fname.lastIndexOf('.')+1);
			return f;
		}
		
		this.update = function(lastOffline, lastOnline, queuedItems,averageBandwidth){
		
		}
		
    	function notifyUploadImageClicked(image,scale,scaled,rotated,newname){
    		$.each(listeners, function(i){
    			listeners[i].uploadImageClicked(image,scale,scaled,rotated,newname);
    		});
    	}
    	
		this.addListener = function(list){
			listeners.push(list);
		}
	},
	ImagePageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			uploadImageClicked : function(src) { }
		}, list);			
	}

});