jQuery.extend({
	/**
	 * AssetTypes page contains a list of types
	 * for a job
	 */
	AddAssetPageView: function(){
		var self = this;
		var listeners = new Array();	
	    var PENDING = 1;
	    
	    $('#saveAssetLink').bind('click', function(event, ui) {
	    	$(this).addClass('ui-disabled');
	    	consoleLog('#saveAssetLink:clicked');
	    	var newAsset = getNewAsset();
	    	consoleLog("New asset1: "+JSON.stringify(newAsset));
	    	newAsset.ref = $('#assetRef').val();
	    	newAsset.status = PENDING;
	    	if(!validate(newAsset)){
	    		$(this).removeClass('ui-disabled');
			    consoleLog('#saveAssetLink:clicked:validation-failed');
	    		return;
	    	}
	    	//kill current bind to the button
	    	$('#saveAssetLink').unbind('click');
	    	
	    	updateNewAsset(newAsset);
	    	consoleLog("New asset2: "+JSON.stringify(newAsset));
			self.notifySaveClicked(newAsset);
		});
		
	    function isEmpty(obj){
	    	return obj == undefined || obj == null || obj == '';
	    }
	    
	    function validate(newAsset){
	    	if(isEmpty(newAsset.ref)){
				showError(getMessage('assetRef.required', 'Ref is required'));
				return false;
			}

	    	if(!(/^\s*([0-9a-zA-Z:._\s-+\/\\]*)\s*$/.test(newAsset.ref))){
	    		showError(getMessage('assetRef.invalidCharacters', 'Some of the Ref characters are not allowed'));
	    		return false;
			}
	    	if(newAsset.ref.length > 100){
	    		showError(getMessage('assetRef.toLong', 'Ref can only be 100 characters long'));
	    		return false;
	    	}
	    	if(isEmpty(newAsset.location)){
	    		showError(getMessage('assetLocation.required', 'Location is required'));
				return false;
	    	}
	    	if(isEmpty(newAsset.libraryAssetID)){
	    		showError(getMessage('assetModel.required', 'Model is required'));
				return false;
	    	}
	    	if(isEmpty(newAsset.condition)){
	    		showError(getMessage('assetCondition.required', 'Condition is required'));
				return false;
	    	}
	    	return true;
	    }
	    
	    
		$('#refreshAddAsset').die('vclick');
		$('#refreshAddAsset').live('vclick', function(event){
			consoleLog('refreshAddAsset');
			self.notifyRefreshClicked();
		});
	    
		//store assert ref of 'focus lost' otherwise we can lose it if user opens
		//popup for new location etc
		$('#assetRef').die('blur');
		$('#assetRef').live('blur', function(event){
			var newAsset = getNewAsset();
			if (newAsset != null)
				newAsset.ref = $('#assetRef').val();
			updateNewAsset(newAsset);
		});
		
		function updateHeader(assetTypeName, assetManufacturerName){
			//asset header
			var assetHeader = $('#addAssetHeader');
			assetHeader.empty();
			var headerContent = ich.addAssetHeaderTempl({assetType: assetTypeName, assetManufacturer: assetManufacturerName});
			assetHeader.append(headerContent);
			assetHeader.trigger('create');
			assetHeader.listview('refresh');	
		}
		
		function updateModelDropDown(modelList, selectedId){
			var modelSelect = $('#modelSelect');			
			modelSelect.empty();
			
			//need to store value on change as if not opening 
			//ie dialog to add new location will make it to 'forget' the value
			modelSelect.change(function() {
				var selectedOption = $("option:selected", $(this));
				var modelId = selectedOption.val();
				var newAsset = getNewAsset();
				newAsset.libraryAssetID = modelId;
				newAsset.libraryAssetName = selectedOption.text();
				updateNewAsset(newAsset);
			});
			
			//if we don't specified the selected value, select first one from the drop down
			if(selectedId == null && modelList.length > 0){
				selectedId = modelList[0].id;
				var newAsset = getNewAsset();
				newAsset.libraryAssetID = selectedId;
				newAsset.libraryAssetName = modelList[0].model;
				updateNewAsset(newAsset);
			}
			
			//render options
			for(var i in modelList){
				var model = modelList[i];
				var option = ich.selectOption({id: model.id, label: model.model});
				
				if(model.id == selectedId){
					option.attr('selected', 'selected');
				}
				modelSelect.append(option);
			}
			modelSelect.selectmenu('refresh');
		}
		
		function updateLocationDropDown(locationList, selectedId){
			var locationSelect = $('#locationSelect');
			locationSelect.empty();
			//need to store value on change as if not opening 
			//ie dialog to add new model will make it to 'forget' the value
			locationSelect.change(function() {
				var selectedOption = $("option:selected", $(this));
				var locationId = selectedOption.val();
				var newAsset = getNewAsset();
				newAsset.location = locationId;
				updateNewAsset(newAsset);
			});
			
			//if we don't specified the selected value, select first one from the drop down
			if(selectedId == null && locationList.length > 0){
				selectedId = locationList[0].id;
				var newAsset = getNewAsset();
				newAsset.location = selectedId;
				updateNewAsset(newAsset);
			}
			
			//render
			for(var i in locationList){
				var location = locationList[i];
				var option = ich.selectOption({id: location.id, label: location.name})
				if(location.id == selectedId){
					option.attr('selected', 'selected');
				}
				locationSelect.append(option);
			}
			locationSelect.selectmenu('refresh');
		}
		
		function updateConditionDropDown(conditionList, selectedId){
			var conditionSelect = $('#conditionSelect');
			conditionSelect.empty();
			
			//need to store value on change as if not opening 
			//ie dialog to add new model will make it to 'forget' the value
			conditionSelect.change(function() {
				var selectedOption = $("option:selected", $(this));
				var conditionId = selectedOption.val();
				var newAsset = getNewAsset();
				newAsset.condition = conditionId;
				updateNewAsset(newAsset);
			});
			
			//if we don't specified the selected value, select first one from the drop down
			if(selectedId == null && conditionList.length > 0){
				selectedId = conditionList[0].id;
				var newAsset = getNewAsset();
				newAsset.condition = selectedId;
				updateNewAsset(newAsset);
			}
			
			for(var i in conditionList){
				var condition = conditionList[i];
				var option = ich.selectOption({id: condition.id, label: condition.name});
				if(condition.id == selectedId){
					option.attr('selected', 'selected');
				}
				conditionSelect.append(option);
			}
			conditionSelect.selectmenu('refresh');
		}
		
		this.update = function(assetTypeName, assetManufacturerName, modelList, siteLocationList, conditionList, newAsset){
			consoleLog('addAssetPage:view:update');
			updateHeader(assetTypeName, assetManufacturerName);
			consoleLog('addAssetPage:view:update:done');
			updateModelDropDown(modelList, newAsset.libraryAssetID);
			updateLocationDropDown(siteLocationList, newAsset.location);
			updateConditionDropDown(conditionList, newAsset.condition);
			$('#assetRef').val(getNewAsset().ref);			
		}
		
		function getNewAsset(){
			return sessionStorage.getObject('newAsset');
		}
		
		function updateNewAsset(newAsset){
			sessionStorage.setObject('newAsset', newAsset);
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifySaveClicked = function(newAsset){
    		$.each(listeners, function(i){
    			listeners[i].saveClicked(newAsset);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
	},
	AddAssetPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			refreshClicked : function() { },
			saveClicked : function(newAsset) { }
		}, list);			
	}

});
