/**
 * @description title object
 * @type {Object}
 */
var title = {};

/**
 * @description title back object that holds callback and icon
 * @type {Object}
 */
title.back = {};

/**
 * @description url or base64 of image
 * @type {String}
 */
title.background = {
    '480x602': 'data:image/png;base64,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'
};

title.active = {
    '480x602': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAMAAABG8BK2AAADAFBMVEUEhrwElswEjsQEmtwEisQEltQEirwEkswEntwEmtQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6nIdwAAABdElEQVR4nO1Q25KFIAxrsYL+/w9vL6Cuh92xlPNmkimVmcYU2Leto8UjLrAte0c96z+1bBtMShMPIwIx++TiJHgHPqgFdq4hWZpqGJEtNQMQfRojrPsnR9J00LP+n9PSdHz8mJVmXXe0YawmqP6+ykvdtxh4YV4KxQg1C9rJ/rj6KtwjetepS5lh06V1CcpadNzOVvFxtQlJszarw6M8rsbCaRCrL3Lvl9pBexPE0adBSYOlQmw5kFdoaWTYXkqtau+hAHRBo26KTtqPoQRhZmEbwzds0phHmpcmqVuqUdKQNM3lwjtPbQ4iLuccpDKD8Otr0ISXsoa4iPSgx5XPog3IhWiMdVbSUFRsx29DTWm0SpoGdnXUG+FozeppvWFOmjQlDQXSnIcsRYwsyik7qogbqlfAF/zhlv7ZjOQCMh3uPqWzkzS20ZhsmMwm0zBypdhAZo6JKgEiYY48YGHG0QIFLC5mxgDy8bRRTLCY6vPixYuKHxR8UGyaEcBEAAAAAElFTkSuQmCC'
};

title.back.icon = {
    '480x602': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAn1JREFUeNrsmk1PGkEYx1lFq7bFNL5Fa9qkVWvURA1gOGnWWw+1/QpNemraAuFK9txr6wfwwAGIV76AevDCQbiiiR72shDgooVUWZ8xzyaT7UBwd7qL407yD2SHMPNjnreZQdJ13SdEEwWkzydI80A8EA+kc/M7PJ5k0l3gBLWo9z0PQibej2MOUNZwTallFcbvIAQZaxA0AnqKMGTSf0BXqL9WQWz7CEmonURBPAEFQJOKosiapu2rqrony/IcPHuO/X2UyTmb2buAIL/8M9AMaDWRSHxtNpuXOrZ6vX4Kz5dA4wjTWyAMiLV4PP6NhjBaKpX6Av1TPQdyH4harXYG/SugiZ4CuQ9EpVI5j0Qi7+Ezb0Cj6Evug1AQxHlfdoIol8sXoVBoBz6ziP4xZCv48AIxQcyC1mOx2Pd2EMFg8BM6+SRoGHOM5CoITmAQzeMVKBiNRn84BsFpY0VDvAaFs9nsr0ajcdXGnD5yh+AAYobYyGQyv3VGo3yCP4RNkH8g0un0LguiVCrlw+HwB3TsCe4QNkC6higWiwfQvwV6Z4bgel5g4cuM6BToEmITtAAaM0O4DdKPFew0CbHEsVkQhULhEFdiHiGGzBBug/jRpN7mcrmfLIh8Pn8M/SRjL6M5GclOYlQCroAYZvUimUxusyCq1WoN+kkRuA2aQ+gBFoS3Ip6PCBq1hMkjQmV2oWotoapfcfYjQu0QhdqzC3WKItS5llAnjUKd/baBIYXmsqIonzVNO1FV9UiW5S0M2QE7PnJX70gSv0qBw/1Iy8oATl30kAlf4+sNqOFj31hZL/wcWhF6ZR78HaIx0f/ynxHvnt0D8UAeCcitAAMASGewea35iQUAAAAASUVORK5CYII=',
    '320x240': 'data:image/png;base64,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'
};

title.icon_sep = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAABFCAYAAABg6zfwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTUxNDc5RjA5RjNDMTFFMTkxMzlDQkYzOTIxNDFFNEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTUxNDc5RjE5RjNDMTFFMTkxMzlDQkYzOTIxNDFFNEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNTE0NzlFRTlGM0MxMUUxOTEzOUNCRjM5MjE0MUU0RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNTE0NzlFRjlGM0MxMUUxOTEzOUNCRjM5MjE0MUU0RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PifmOLwAAAAiSURBVHjaYmZgYJjx//9/BiYggxGEQQwwGGWMMqjLAAgwAFAOBCO61OqEAAAAAElFTkSuQmCC';

title.option_icon = {
    '480x602': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmpJREFUeNrsWE2O0zAYrWOnlAADDIuy7mLEAtQdh2DbG3CHLsoBZtMzcIRuOQQbaGHFoluIWvEzAyHTOPF8rl4laxbUbeyAgp/0ZLVK8vnF3/c9x51OQEBAQEBAQIcdcR074L5joUDzd20h+poIFEQOMo8iSlASK1DVFaIFxMRbxNtgDDE+oAUUxN/gFX5XdYUITP7eeDx+OhgMzrIs60kpuVLK6aowxpQQokySJF8ul5+m0+lH+vsSgmTd53eJj4hPSMBn1RB0LB0TsbsuakSn1ANin54/b7QTMTakISV+R4r9Mf9tUO3LUU+wjissH6bzM1ssFq/7/f7zsix5VVWRj5lHUVRxzss0Td/qmEbnqp1aHDmaEE+Id4g9y5dwDPTEc+Iv4gXEbNDNavsIR8vtghxp6dpLFN5+iclv0HpLFz7CjHpixujTEJVhgpWNux8qhN8Q5KvAzZVxKkQgpXoYY89CCqRVjlG6EMIh4C7xPsbdNsUHdtuTn8QfGPN9xW7r7KfEs9Vq9a4pZ9exdEzEdubseiUe/yVn/4KVceLs/zwiy3a4Nan1ev2+qYkhVm5T6K0q9v+q/bbKEFuzRWnFprE12/gYnerhfD5/1eSH1XA4PKe/vqFzFS6c/QTf7B8advZn+Ga/cOXskcdzrH1pHdlO0Pbkb5NlWdqUAsTa2BT6IYcPelkvJ5PJy9Fo9EIIcVoUxfZeV4d0+nBuW5BxLAlfZ7PZGxzOXbk6fNgdmfbQsRLUjfDUfiUmn6Fz5R1HR6bMqJEYAoRnZ5dgYbh7bR8xr2Oetyc3tynKxtUDAgICAgICgGsBBgAcyt8/c4WzUgAAAABJRU5ErkJggg==',
    '320x240': 'data:image/png;base64,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'
};

/**
 * @description all css styles for titles elements
 * @type {Object}
 */
title.css = {
    '480x602': {
        body: {
            position: "absolute",
            top: "70px",
            bottom: '0',
            overflow : "visible",
            "-webkit-box-sizing": "border-box",
            margin: "0",
            float: "left",
            width: "100%"
        },
        container: {
            position: 'fixed',
            height: "70px",
            top: "0",
            right: "0",
            left: "0",
            "z-index": "9999"
        },
        titlepanel: {
            display: "-webkit-box",
            height: '100%',
            "-webkit-box-flex": "1",
            "-webkit-box-orient": "horizontal",
            'font-family': 'Tahoma',
            background: "url("+title.background['480x602']+") 50% 50% repeat-x",
            "-webkit-box-shadow": "0 0 6px 2px rgba(0, 0, 0, 0.5)"
        },
        backButtonWrap: {
            "-webkit-box-flex": "1",
            display: "-webkit-box",
            "-webkit-box-pack": "start",
            "-webkit-box-align": "center",
            position: "relative",
            "z-index": "1"
        },
        backButton: {
            display: "block",
            "width": "71px",
            height: "70px",
            background: 'url("' + title.back.icon['480x602'] + '") 50% 50% no-repeat, url("' + title.icon_sep + '") right top no-repeat'
        },
        optionsButtonWrap: {
            "-webkit-box-flex": "1",
            display: "-webkit-box",
            "-webkit-box-pack": "end",
            "-webkit-box-align": "center",
            position: "relative",
            "z-index": "1"      
        },
        optionsButton: {
            display: "block",
            "width": "71px",
            height: "70px",
            background: 'url("' + title.option_icon['480x602'] + '") 50% 50% no-repeat, url("' + title.icon_sep + '") left top no-repeat'
        },
        topLabelWrap:{
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            display: "-webkit-box",
            "-webkit-box-pack": "center",
            "-webkit-box-align": "center",
            'font-size': '28px',
            'font-weight': 'bold',
            color: '#ffffff'
        },
        topLabel:{
            "text-overflow" : 'ellipsis',
            width : '338px',
            overflow:'hidden',
            "white-space":'nowrap',
            "text-align":'center'
        }
    },
    '320x240': {
        body: {
            position: "absolute",
            top: "0",
            bottom: '0',
            overflow : "visible",
            "-webkit-box-sizing": "border-box",
            margin: "0",
            float: "left",
            width: "100%"
        },
        container: {
            position: "relative",
            height: "40px",
            top: "0",
            right: "0",
            left: "0",
            "z-index": "9999"
        },
        titlepanel: {
            display: "-webkit-box",
            height: '100%',
            "-webkit-box-flex": "1",
            "-webkit-box-orient": "horizontal",
            'font-family': 'Tahoma',
            background: "#000000"
        },
        backButtonWrap: {
            "-webkit-box-flex": "1",
            display: "-webkit-box",
            "-webkit-box-pack": "start",
            "-webkit-box-align": "center",
            position: "relative",
            "z-index": "1"
        },
        backButton: {
            display: "block",
            "width": "45px",
            height: "40px",
            background: 'url("' + title.back.icon['320x240'] + '") left top no-repeat' 
        },
        optionsButtonWrap: {
            "-webkit-box-flex": "1",
            display: "-webkit-box",
            "-webkit-box-pack": "end",
            "-webkit-box-align": "center",
            position: "relative",
            "z-index": "1"      
        },
        optionsButton: {
            display: "block",
            "width": "45px",
            height: "40px",
            background: 'url("' + title.option_icon['320x240'] + '") left top no-repeat'
        },
        topLabelWrap:{
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            display: "-webkit-box",
            "-webkit-box-pack": "center",
            "-webkit-box-align": "center",
            'font-size': '18px',
            'font-weight': 'bold',
            color: '#ffffff'
        },
        topLabel:{
            "text-overflow" : 'ellipsis',
            width : '230px',
            overflow:'hidden',
            "white-space":'nowrap',
            "text-align":'center'
        }
    }
}; 

/**
 * @description back callback object holds date (function or link in string format) and type (function/string)
 * @type {Ovject}
 */
title.back.callback = {
	data: '',
	type: null
};

/**
 * @description title label text
 * @type {String}
 */
title.text = "";

/**
 * @description array of all option objects
 * @type {Array}
 */
title.options = null;

/**
 * @description holds all DOM elements for title
 * @type {Object}
 */
title.elements = {};

/**
 * @function
 * @description set style for DOM element by name in title.elements or object and particular style
 * @param {String|Object} elname name of element in title.elements or DOM Element
 * @param {Object} [style] particular style object
 * @return DOM Element
 */
title.setStyle = function(elname, style){

	var el,style;
	if (elname instanceof Object){
		el = elname;
		style = style;
	}else {
		style = this.css[asl.prv.resolution][elname];
		el = this.elements[elname];
	}
    if(!el) throw "Not el"
	for (var i in style)
		el.style[i] = style[i];
	return el;
};

title.removeStyle = function(elname, style){
	return options.removeStyle.call(this, elname, style);
};

/**
 * @function
 * @description update Label text
 * @param {String} text new Label text
 * @return void
 */
title.setText = function(text){
	this.text = text;
	this.elements.topLabel.innerText = this.text;
};

/**
 * @function
 * @description update back button options(callback and image)
 * @param {Object} callback callback object contain function/url and type
 * @param {String} img base64/url of image
 * @return void
 */
title.setBack = function(callback, img){

	if (callback == null){
		this.back.callback.data = null;
	}else {
		this.back.callback = callback;
	}

	if (!this.back.callback.data)
		this.elements.backButton.style.display = "none";
	else
		this.elements.backButton.style.display = "-webkit-box";
	if (img){
		this.back.icon = img;
		this.elements.backButton.style.background = img;
	}
};

/**
 * @function
 * @description update options and options button
 * @param {Array} opt options array
 * @return void
 */
title.setOptions = function(opt){
	this.options = opt;
	if (this.options.length <= 0) {
		this.elements.optionsButton.style.display = "none";
	}
	else {
		this.elements.optionsButton.style.display = "-webkit-box";
	}

	for(var i = 0, length = this.options.length; i < length; i++) {
        if(!options.elements.items[i])options.addOption();
		options.elements.items[i].firstChild.innerText = this.options[i].title;

		if(this.options[i].type == 'radio'){
			if (this.options[i].checked)
				this.setStyle(options.elements.items[i].firstChild, options.css[asl.prv.resolution].radioOn);
			else
				this.setStyle(options.elements.items[i].firstChild, options.css[asl.prv.resolution].radioOff);
		}else {
			this.removeStyle(options.elements.items[i].firstChild, options.css[asl.prv.resolution].radioOn);
		}
		options.elements.items[i]['data-id'] = i;
		options.elements.items[i].style.removeProperty('visibility');
	}
};

/**
 * @function
 * @description open Options window
 * @return void
 */
title.openOptions = function(){
	options.show();
};

/**
 * @function
 * @description load title information from string provided by localStorage
 * @param {String} text json object in string format
 * @return void
 */
title.load = function(text){
	if (!text){
        this.setOptions(this.options ? this.options : []);
        return;
    }

	var json = JSON.parse(text);

	if (json.back.callback.data != '' && this.back.callback.data == '') {
		this.back.callback = json.back.callback && json.back.callback.data != this.back.callback.data ? json.back.callback : this.back.callback;
		this.back.icon = json.back.img && json.back.img != this.back.icon ? json.back.img : this.back.icon;
		this.setBack(this.back.callback, this.back.icon);
	}
	if (json.title && !this.text){
		this.setText(this.text = json.title);
	}
	
	if (!this.options && json.options && json.options.length > 0){
		this.setOptions(json.options);
	}else {
        this.setOptions(this.options ? this.options : []);
    }
};

/**
 * @function
 * @description create clean title object and prepare string that will be saved in localStorage
 * @return {String}
 */
title.toString = function(){
	var result = {
		back: {
			callback: this.back.callback,
			img: this.back.icon
		},
		title: this.text,
		options: this.options
	};
	
	return JSON.stringify(result);
};

/**
 * @function 
 * @description redesing the title bar, called when we have differences between the window dimensions and the one received from the sys 
 */
title.reDesign = function() {
    this.setStyle('optionsButtonWrap');
    this.setStyle('optionsButton');
    this.setStyle('topLabelWrap');
    this.setStyle('topLabel');
    this.setStyle('backButton');
    this.setStyle('backButtonWrap');
    this.setStyle('titlepanel');
    this.setStyle('container');
    
    if (!this.back.callback.data)
        this.elements.backButton.style.display = "none";
    
    if (this.options && this.options.length <= 0)
        this.elements.optionsButton.style.display = "none";

    title.setStyle(document.body, this.css[asl.prv.resolution].body);
    title.setStyle(document.getElementsByTagName('html')[0], this.css[asl.prv.resolution].html);
};

/**
 * @function
 * @description prepare all DOM Elements and add Event Listeners
 * @return void
 */
title.create = function(){
	this.elements.container = document.createElement('div');
	this.elements.titlepanel = document.createElement('div');
	this.elements.backButtonWrap = document.createElement('div');
	this.elements.backButton = document.createElement('a');
	this.elements.backButton.className = 'btn_back';
	this.elements.topLabelWrap = document.createElement('div');
	this.elements.topLabel = document.createElement('div');
	this.elements.optionsButtonWrap = document.createElement('div');
	this.elements.optionsButton = document.createElement('a');
	this.elements.optionsButton.className = 'btn_option';

	this.elements.backButton.addEventListener('click', function(){
		asl.prv.back(title.back.callback);
		asl.events.fire(asl.events.types.backPressed);
	}, false);
	this.elements.optionsButton.addEventListener('click', function(){
		if (title.options.length > 0)
			title.openOptions();
	}, false);
};

/**
 * @function
 * @description insert all DOM Elements in document.body and set Styles
 * @return void
 */
title.init = function(){
	this.setStyle('optionsButtonWrap').appendChild(this.setStyle('optionsButton'));
	this.setStyle('topLabelWrap').appendChild(this.setStyle('topLabel'));
	this.setStyle('backButton');
	this.setStyle('backButtonWrap').appendChild(this.elements.backButton);
	this.setStyle('titlepanel').appendChild(this.elements.backButtonWrap);
	this.elements.titlepanel.appendChild(this.elements.topLabelWrap);
	this.elements.titlepanel.appendChild(this.elements.optionsButtonWrap);
	this.setStyle('container').appendChild(this.elements.titlepanel);
	this.setStyle('topLabel');

    title.setStyle(document.body, this.css[asl.prv.resolution].body).insertBefore(this.elements.container, document.body.childNodes[0]);
    title.setStyle(document.getElementsByTagName('html')[0], this.css[asl.prv.resolution].html);

	if(!this.back.callback.data && !this.options && !this.text ) {
	    this.elements.container.style.setProperty('display', 'none');
        document.body.style.top = '0';
	}

	if (!this.back.callback.data)
		this.elements.backButton.style.display = "none";
    
	if (this.options && this.options.length <= 0)
		this.elements.optionsButton.style.display = "none";
	

	//title.elements.backButton.style.background = 'url("' + title.back.icon[asl.prv.resolution] + '") left top no-repeat';
};

/**
 * @description create options object
 * @type {Object}
 */
var options = {};

/**
 * @description object that hold all option icons
 * @type {Object}
 */
options.icons = {
    '480x602' : {
        up: {
            enabled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA2CAYAAAC8yXv8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTZBQTZFRjY5RjY1MTFFMUEzOEJFRUVCRjk2RTJDNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTZBQTZFRjc5RjY1MTFFMUEzOEJFRUVCRjk2RTJDNjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNkFBNkVGNDlGNjUxMUUxQTM4QkVFRUJGOTZFMkM2OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNkFBNkVGNTlGNjUxMUUxQTM4QkVFRUJGOTZFMkM2OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqxiB7MAAADySURBVHja7NjRCYMwEIBhLR2gI1joABnFbuAI7QS6gSN0hHaDdpBCO0I3sAncg0gpSTxDhP/gCGiMH3pJxHIYhmJNsSlWFoABAwYMGDBgwIABAwa8XGxDOh+qvW/Xnc3e5tnmx+eC5/ulDw6Ii81a4MfcS6ITbCFtlzO4sdlOjrVyPDuwkbr9Fb2czwbsavUubcz5pGBfjApaAxzyuv+VTRLwKWJCNXJdcnA942n1o6UvCdjI5jB3czEpwG7SXBVmfNQ4MWB3k0ppOaxkvGU+fkZ191DeId24N5+OJX/gAQMGDBgwYMCAAQMGDHi14K8AAwAoICDZH+8C0AAAAABJRU5ErkJggg==',
            disabled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA2CAYAAAC8yXv8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjY4N0MyMUM5RjY1MTFFMTlDN0M4NjY5MzZDRkY1RUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjY4N0MyMUQ5RjY1MTFFMTlDN0M4NjY5MzZDRkY1RUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNjg3QzIxQTlGNjUxMUUxOUM3Qzg2NjkzNkNGRjVFRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyNjg3QzIxQjlGNjUxMUUxOUM3Qzg2NjkzNkNGRjVFRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpbOpx8AAADwSURBVHja7NjbCYMwFIDhKB2gIziCo1iw747QTqAbZAQHqNBu0I7UDWwCpyCltEmIGuE/cAjk5ge5KGbjOKotRa42FoABAwYMGDBgwIABAwY8X+xcO16GwbXr3qQ2eTb5dBlwrOv4YI/oTVYCP6S+JTrBKim7lMGNyfajrpX65MCl7NtvoaU9GbDdq3cpQ9oXB7tg3ujVwb3HcpfSfzXwKeBANTJucXD145D9Cz25+hYBx1jaPvTmyANuhGuEEx88jy/YPqSIdKUWMt88Hz+TffeI/La1895cO2f8gQcMGDBgwIABAwYMGDDgzYJfAgwAEI8g2cYrcdQAAAAASUVORK5CYII='
        },
        down: {
            enabled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA2CAYAAAC8yXv8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDk4NTkyMDk5RjY1MTFFMTlGODhCQjAxMDg3RUI4QjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDk4NTkyMEE5RjY1MTFFMTlGODhCQjAxMDg3RUI4QjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOTg1OTIwNzlGNjUxMUUxOUY4OEJCMDEwODdFQjhCMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOTg1OTIwODlGNjUxMUUxOUY4OEJCMDEwODdFQjhCMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnU6EDgAAAD6SURBVHja7NjRCcIwEIDhVhxEwUF0Ax2hE0g2sBvoBh2hIzhCBxDMCN2gpnAPIqJJekkp/AehtDTpB8ldQsthGIolxapYWAAGDBgwYMCAAQMGDBhwulj7vrjbbI/uck5guD3ss1UHu2gFvFfE3mXcZEvi5JpVwloZL+ka7uUj/URs9DgxSde5Vk0EVzJOtioxrjsT2deErlutsnZ1rQns00i/2eqwCZjabsKsqIHHpDl4JI/ve1l2un8YNazm1vxruk1sRUh9lhgTqv54VkckZtbDz+WtZLVyP8/hJ3BT6DUqwrco+QMPGDBgwIABAwYMGDBgwIsFvwQYAMtcL+7v043UAAAAAElFTkSuQmCC',
            disabled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA2CAYAAAC8yXv8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUE4NUEyODQ5RjY1MTFFMUI0RjM4M0VDQ0MzNzI2NTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUE4NUEyODU5RjY1MTFFMUI0RjM4M0VDQ0MzNzI2NTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QTg1QTI4MjlGNjUxMUUxQjRGMzgzRUNDQzM3MjY1MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QTg1QTI4MzlGNjUxMUUxQjRGMzgzRUNDQzM3MjY1MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps+9YEoAAAD4SURBVHja7NjdDYIwEMBxMA6mG2iCAzCBYQPZQDfgXR46giMwAiN0g1qSezAmKv1Ekv8ljZHQ8jPcXRtLY0yxptgUKwvAgAEDBgwYMGDAgAEDThdbl5vvfX+wH+cEjtupqlR0sA0l4F1E7EPWTZYSRzvGSNhR1kuaw1oeogOxXuv4Ft1gRx0IrmWdbF1iyrvGc27jkrcx29rVjs5xTifzFuvDLq82OJVibRz7GcWj5b6/2On0D7Se+aOybs3DlyJsfDpCjrPEVFDt27XWozCzHn4uLy1LyfdlDj+OnUMH9OmPUfIPPGDAgAEDBgwYMGDAgAGvFvwUYABl6y3uvQTYuAAAAABJRU5ErkJggg=='
        },
        radio: {
            on: "data:image/png;base64,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",
            off: "data:image/png;base64,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"
        },
        item: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzkxRTZBNDM5RjZBMTFFMUFBMDdDQTkwODIwODRBMzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzkxRTZBNDQ5RjZBMTFFMUFBMDdDQTkwODIwODRBMzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3OTFFNkE0MTlGNkExMUUxQUEwN0NBOTA4MjA4NEEzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3OTFFNkE0MjlGNkExMUUxQUEwN0NBOTA4MjA4NEEzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoLXSXgAAAdCSURBVHjaxJlbTFRH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",
        itembgr: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAABLCAMAAACfpqQ+AAADAFBMVEXk5uT08vTs7uz8+vzs6uz09vQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABzv7jXAAACkUlEQVR4nO1W227sIAw0Dvz/Lx98Y9l01Ye2EcfWzAxmklAJaTBbusblGF7GBZPNRHb+bnidM13bilvYMEnM2MstSbJ3e4HJZbb59iCkV49DGWXT+8v9aXXw8Z1CP9KHtn17S9cAC/G6ZT8QcCHepKTjuwJ/zShfpVe0LhpXWw5z3vmmeUWba7EEI+n4HLFe0dq6TWYwKy3Ar5IO9lYGU7NdHzQ/aMAza6AmrkY+gyWpHYz+rYs2/8k6fcjAJzno9BkDngW1AVYmOrg46PgRAx8lrujitA42tfBgRoqWMT9lHazyj21ftf4U5r830/Ew456noelZ33Br5mFym7G85EoaOK/jYAdAzwVMLuPpebCRJfHw3NuMOc6AOZhcxgK0lKfjuKLNNB6+uDWYlCaCjaCbhOod3FgvautgmJzGWtg7WBJdHdzsgra1MJlNxMnxili6VwdUScOm2cFq+DXBlDFSaH+CymjF7B18fkfQH8snCRgsTDq+A/BRooNrchkLuMuQqb8efQF8Ls8uDZTtiuZuIz72tQo+m2eN2vMWEVvwK96+Gfh8Pm7j6GuSa7mzwq9ojNRDk7QiOdOK1kLuPlCzVstS85RCeoV3b9/XQUBNW9l+l6WZu3TwtJJ5Z6iGZp7mJFm/olnbuHnYUGqtLDXY2cFvBApgD5S++wjm5A767iOQE3ue9yu6A/mx54nf4IJ462BNFf1bC/eACcmWBZ3eAPAk9DcYqAwib2LUYpVs3q5oe0CtUiPVPXDUSjUKeb5QOdkcHqzGNwHlEI17+pyBIPhDUvTv6Y2AD1DC3R7AYlQZuheoknx0Kx0Rl9Srdc/vBfpbUVzWpuP7gZ7Q3sNQPZH9+AIAAAAAAAAAAACBfzYoX8nerAFXAAAAAElFTkSuQmCC"
    },
    '320x240' : {
        up: {
            enabled: 'data:image/png;base64,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',
            disabled: 'data:image/png;base64,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'
        },
        down: {
            enabled: 'data:image/png;base64,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',
            disabled: 'data:image/png;base64,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'
        },
        radio: {
            on: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAyCAYAAADImlLUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAc5JREFUeNrsmNFtwjAQQF+q/pcNYikDwAhhAmCC0glKJ4BMAGyQTgBMACPAAJbsDegE9OdSWYhKcaihEb6vU+S7PF/uzuckp9OJtskTLZQIHaEjdISO0BE6QrcW+tlncZIktdZlqcorXVuzq2PjM7glXot/gc5SpYAxMACOwB74Al6AHtABNkCprTF3h85SNQNegQJYa2uOF9Z0gCEwBT61NbO7QAvIFti4EFmqqshWctTW7M82OQD67gaDQzvAS21NKc/GEkl1wdQAxdnadxf8FtAriXApG1gBeQ0XO2CkrTkK+EBbM/KF9m55WaqG0hVKJ+J5TfMc2Gap6jhRH96iT0+BD0fvedr3xA7xMw0KLUVmtDVG2tyk4fkwyVKlpP0Z8Rss0rn0W6SQrpHKfuORXo2gu3Jw0CAtLqUJ4q8bElq5PfcvRPypOOWdHxK+RVO3uENCH85y8Rpxa+MQEnoncwPA8kroyn4gfsNAV0Xj9NhFQ+CF0+u9i7tJIRbA3NH3DdKiEH3u6OGgtTXralKTCa3v8Xl31WQnA9OPv2DXLUfeZPBBBp9+09G0ycsf5xLQ2utWqy+2//4XQvzDFKEjdISO0BE6QkfoR4T+HgADfA6/5ebfswAAAABJRU5ErkJggg==",
            off: "data:image/png;base64,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"
        }
    }
};

/**
 * @description options Css Styles
 * @type {Object}
 */
options.css = {
    '480x602': {
        container: {
            position: "fixed",
            bottom: "0",
            top: "0",
            right: "0",
            left: "0",
            "z-index": "9999",
            display: 'none'
        },
        scrolled: {
            width: "100%"
        },
        titlepanel: {
            display: "-webkit-box",
            "-webkit-box-flex": "1",
            "-webkit-box-orient": "horizontal",
            'font-family': 'Tahoma',
            position: 'relative',
            'z-index': '10',
            background: "url("+title.background['480x602']+") 50% 50% repeat-x",
            "-webkit-box-shadow": "0 0 6px 2px rgba(0, 0, 0, 0.5)"
        },
        bottomContainer: {
            position: 'absolute',
            top: '70px',
            bottom: '0',
            width: '100%',
            background: "#fff",
            "-webkit-user-select": "none"
        },
        listContainer: {
            display: '-webkit-box',
            '-webkit-box-flex': '1',
            height: '100%'
        },
        item: {
            display: '-webkit-box',
            "-webkit-box-pack": "center",
            '-webkit-box-sizing': 'border-box',
            'height': '76px',
            '-webkit-box-orient' : 'vertical',
            padding: "0 20px",
            'font-family': 'Tahoma',
            "font-size": "25px",
            "font-weight": "bold",
            color: "#000000",
            background: "url("+options.icons['480x602'].item+") 95% 50% no-repeat, url("+options.icons['480x602'].itembgr+") 50% 50% repeat-x"
        },
        itemSpan: {
            display: 'block',
            width: '100%',
            overflow: 'hidden',
            height: '30px',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap'
        },
        paging: {
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            "-webkit-box-align": "center",
            "-webkit-box-pack": "justify",
            width: "44px",
            padding: "10px 0",
            'border-left': '1px solid #000000',
            '-webkit-box-shadow': '0 0 6px 2px rgba(0, 0, 0, 0.5)',
            background: '#eeeeee'
        },
        pagingCount: {
            'font-family': 'Tahoma',
            'font-size': '19px',
            'color': '#777777'
        },
        pagingTop: {
            display: "block",
            height: "54px",
            width: "44px",
            background: "url(" + options.icons['480x602'].up.disabled + ") left top no-repeat"
        },
        pagingBottom: {
            display: "block",
            height: "54px",
            width: "44px",
            background: "url(" + options.icons['480x602'].down.enabled + ") left top no-repeat"
        },
        list: {
            display: '-webkit-box',
            "-webkit-box-orient": "vertical",
            margin: "0",
            padding: "0",
            width: "100%",
            height: '100%',
            background: '#ffffff'
        },
        radioOff: {
            "padding-left": "40px",
            background: "url("+options.icons['480x602'].radio.off+") -8px 50% no-repeat"
        },
        radioOn: {
            "padding-left": "40px",
            background: "url("+options.icons['480x602'].radio.on+") -8px 50% no-repeat"
        }
    },
    '320x240': {
        container: {
            position: "fixed",
            bottom: "0",
            top: "0",
            right: "0",
            left: "0",
            "z-index": "9999",
            display: 'none'
        },
        titlepanel: {
            display: "-webkit-box",
            "-webkit-box-flex": "1",
            "-webkit-box-orient": "horizontal",
            'font-family': 'Tahoma',
            background: "#000000",
            position: 'relative'
        },
        bottomContainer: {
            display: '-webkit-box',
            position: 'absolute',
            top: '40px',
            bottom: '0',
            width: '100%'
        },
        listContainer: {
            display: '-webkit-box',
            '-webkit-box-flex': '1',
            height: '100%'
        },
        item: {
            display: '-webkit-box',
            "-webkit-box-align": "center",
            '-webkit-box-sizing': 'border-box',
            height: "25%",
            padding: "0 10px",
            "border-bottom": "1px solid #040707",
            'font-family': 'Tahoma',
            "font-size": "18px",
            "font-weight": "bold",
            color: "#000000"
        },
        itemSpan: {
            display: 'block',
            width: '100%',
            overflow: 'hidden',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap'
        },
        paging: {
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            "-webkit-box-align": "center",
            "-webkit-box-pack": "justify",
            width: "59px",
            padding: "10px 0",
            'border-left': '1px solid #000000',
            background: '#eeeeee'
        },
        pagingCount: {
            'font-family': 'Tahoma',
            'font-size': '14px',
            'font-weight': 'bold'
        },
        pagingTop: {
            display: "block",
            height: "80px",
            width: "45px",
            background: "url(" + options.icons['320x240'].up.disabled + ") left top no-repeat"
        },
        pagingBottom: {
            display: "block",
            height: "80px",
            width: "45px",
            background: "url(" + options.icons['320x240'].down.enabled + ") left top no-repeat"
        },
        list: {
            margin: "0",
            padding: "0",
            width: "100%",
            height: '100%',
            background: '#ffffff'
        },
        radioOff: {
            "padding-left": "40px",
            background: "url(" + options.icons['320x240'].radio.off + ") 0 50% no-repeat"
        },
        radioOn: {
            "padding-left": "40px",
            background: "url(" + options.icons['320x240'].radio.on + ") 0 50% no-repeat"
        }
    }
};

/**
 * @description hold options title Label
 * @type {String}
 * @default 'Options'
 */
options.text = 'Options';

/**
 * @function
 * @description call title.setStyle function
 * @return DOM Element
 */
options.setStyle = function(elname, style){
	return title.setStyle.call(this, elname, style);
};

options.removeStyle = function(elname, style){
	var el = elname instanceof Object ? elname : this.elements[elname];

	for (var i in style)
		el.style.removeProperty(i);
	return el;
};

/**
 * @description hold all options DOM Elements
 * @type {Object}
 */
options.elements = {};

/**
 * @description hold information about list and pages
 * @type {Object}
 */
options.list = {};

/**
 * @function
 * @description show options window
 * @return void
 */
options.show = function(){
	this.elements.container.style.display = "block";
    this.scroll.calculate();
};

/**
 * @function
 * @description hide options window
 * @return void
 */
options.hide = function(){
	this.elements.container.style.display = "none";
};

/**
 * @function
 * @description prepare all DOM Elements
 * @return void
 */
options.create = function(){
	this.elements.container = document.createElement('div');
    this.elements.scrolled = document.createElement('div');
	this.elements.titlepanel = document.createElement('div');
	this.elements.bottomContainer = document.createElement('div');

	this.elements.backButtonWrap = document.createElement('div');
	this.elements.backButton = document.createElement('a');
	this.elements.backButton.className = 'btn_back';
	//this.elements.backButtonIcon = document.createElement('img');
	this.elements.topLabelWrap = document.createElement('div');
	this.elements.topLabel = document.createElement('div');

	this.elements.listContainer = document.createElement('div');
	this.elements.list = document.createElement('ul');
	/*this.elements.paging = document.createElement('div');
	this.elements.pagingTop = document.createElement('a');
	this.elements.pagingBottom = document.createElement('a');
	this.elements.pagingCount = document.createElement('span');*/

	this.elements.items = [];
};

options.addOption = function(){
    var last = this.elements.items.push(document.createElement('li'));
    this.elements.items[last-1].className = 'item';
    var span = document.createElement('span');
    this.elements.items[last-1].appendChild(span);

    this.elements.items[last-1].addEventListener('click', function(){

        if (title.options[this['data-id']].type != 'radio'){
            asl.prv.options({exec : title.options[this['data-id']].callback, arrguments: [title.options[this['data-id']].title]});
            options.hide();
            return;
        }

        if (title.options[this['data-id']].checked = !title.options[this['data-id']].checked)
            options.setStyle(this.firstChild, options.css[asl.prv.resolution].radioOn);
        else
            options.setStyle(this.firstChild, options.css[asl.prv.resolution].radioOff);

        asl.prv.options({exec : title.options[this['data-id']].callback, arrguments: [title.options[this['data-id']].title, title.options[this['data-id']].checked]});

    }, false);
    this.elements.list.appendChild(this.setStyle(this.elements.items[last-1], options.css[asl.prv.resolution].item));
};

/**
 * @function
 * @description insert all DOM Elements in document.body ,set Styles and add Event Listeners
 * @return void
 */
options.init = function(){
	this.elements.listContainer.appendChild(this.setStyle('list'));;

    var titleCss = title.css[asl.prv.resolution];

	this.elements.titlepanel.appendChild(this.setStyle(this.elements.backButtonWrap, titleCss.backButtonWrap));
	this.elements.backButtonWrap.appendChild(this.setStyle(this.elements.backButton, titleCss.backButton));
	//this.elements.backButton.appendChild(this.elements.backButtonIcon);

	this.elements.titlepanel.appendChild(this.setStyle(this.elements.topLabelWrap, titleCss.topLabelWrap));
	this.elements.topLabelWrap.appendChild(this.setStyle(this.elements.topLabel, titleCss.topLabel));

    this.elements.scrolled.appendChild(this.setStyle('listContainer'))
    this.elements.bottomContainer.appendChild(this.setStyle('scrolled'));

	this.elements.container.appendChild(this.setStyle('titlepanel'));
	this.elements.container.appendChild(this.setStyle('bottomContainer'));

	this.elements.topLabel.innerText = options.text;

	//this.elements.backButtonIcon.src = title.back.icon[asl.prv.resolution];

	this.elements.backButton.addEventListener('click', function(){
		options.hide();
	}, false);

	for (var i = 0; i < this.elements.items.length; i++){
		for(var j in options.css[asl.prv.resolution].itemSpan) {
            this.elements.items[i].childNodes[0].style[j] = options.css[asl.prv.resolution].itemSpan[j];
        }
	}
	
	document.body.appendChild(this.setStyle('container'));

    this.scrollObj = {};
    this.scrollObj.baseObj = this.elements.bottomContainer;
    this.scrollObj.scroll = {};
    this.scrollObj.scroll.baseObj = this.elements.scrolled;
    this.scroll = new Scroll(this.scrollObj,{indicator:true});
};

//options.create();

title.create();

document.addEventListener('DOMContentLoaded', function(){
	title.init();
	//options.init();
	if(!document.styleSheets[0]) {
        var styleTag = document.createElement("style");
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(styleTag);
    }
    //console.log('.btn_back:active { url("") 50% 50% no-repeat, url("") 50% 50% repeat-x, url("") right top no-repeat; }');
	document.styleSheets[0].insertRule('.btn_back:active { background: url("' + title.back.icon['480x602'] + '") 50% 50% no-repeat, url("' + title.active['480x602'] + '") 50% 50% repeat-x, url("' + title.icon_sep + '") right top no-repeat !important; }', 0);
    document.styleSheets[0].insertRule('.btn_option:active { background: url("' + title.option_icon['480x602'] + '") 50% 50% no-repeat, url("' + title.active['480x602'] + '") 50% 50% repeat-x, url("' + title.icon_sep + '") right top no-repeat !important; }', 0);
    document.styleSheets[0].insertRule('.item:active { background: url('+options.icons['480x602'].item+') 95% 50% no-repeat, -webkit-linear-gradient(top, rgba(0,0,0,0.1), rgba(0,0,0,0.1)),url('+options.icons['480x602'].itembgr+') 50% 50% repeat-x !important; }', 0);
}, false);

