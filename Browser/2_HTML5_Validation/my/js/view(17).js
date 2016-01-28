jQuery.extend({

	ActivityEditPageView: function(){
		var self = this;
		var listeners = new Array();
		var $page = $('#activityEditPage');
		
		
		$('#deleteActivity', $page).click(function(){
			customDialog(getMessage('activityEdit.confirmDelete', 'Are you sure you want to delete this activity?'), function(){
				notifyDeleteClicked();
			});
		});
		$('#cancelActivity', $page).click(function(){
			notifyCancelClicked();
		});
		
		$('#updateActivity', $page).click(function(){
			$(this).addClass('ui-disabled');
			$('#deleteActivity, #cancelActivity', $page).addClass('ui-disabled');
			
			var note = $('#activityEditPage #notes').val();
			var completedQty = $('#activityEditPage #completedQuantity').val();
			var totalQty = $('#activityEditPage #totalQuantity').val();
			var locationId = $("option:selected", $("#activityEditPage #locationSelect")).val();
			var categoryId = $("option:selected", $("#activityEditPage #categorySelect")).val();
			var locationName = null;
			var categoryName = null;
			if(locationId == 0)
			{
				locationId = null;
			}else{
				locationName = $("option:selected", $("#activityEditPage #locationSelect")).text();
			}
			if(categoryId == 0)
			{
				categoryId = null;
			}else{
				categoryName = $("option:selected", $("#activityEditPage #categorySelect")).text();
			}
			
			if(!validateBeforeUpdate(completedQty, totalQty, note, locationId, categoryId)){
				$(this).removeClass('ui-disabled');
				$('#deleteActivity, #cancelActivity', $page).removeClass('ui-disabled');
				return;
			}
			
			notifyAddUpdateClicked(parseFloat(completedQty).toFixed(2), parseFloat(totalQty).toFixed(2), note, locationId, locationName, categoryId, categoryName);
		});

		//on click select all text in the quantity boxes
		$('input', $page).click(function(){				
			this.setSelectionRange(0, 99);
		});
		
		function updateSubheader(subHeaderText){
			if(subHeaderText){
				var subheaderUI = $('#activityEditPage #subheader');
				subheaderUI.html('<li data-role="list-divider">'+subHeaderText+'</li>');
				subheaderUI.trigger('create');
				subheaderUI.listview('refresh');
				subheaderUI.show();
			}
		}
		/**
		 * returns true if valid otherwise false
		 */
		function validateBeforeUpdate(completedQty, totalQty, note, locationId, categoryId){
			cleanErrors();
			var valid = true;
			if(!completedQty || !totalQty){ //fields empty?
				showError('Both quantity fields are required');
				return false;
			}
			if (!isValidDouble(completedQty) || !isValidDouble(totalQty)){
				showError('Quantity must be a valid number');
				return false;
			}
			completedQty = parseFloat(completedQty);
			totalQty = parseFloat(totalQty);
			if(totalQty <= 0){ //less then zero?
				showError('Total quantity must be greater than zero');
				return false;
			}
			
			if(completedQty < 0){ //any of less then zero?
				showError('Completed quantity cannot be less than zero');
				return false;
			}else{
				if(completedQty > totalQty){
					showError('Total quantity cannot be less than complete quantity');
					return false;
				}
			}
			return true;
		}


		function updateLocationDropDown(locationList, selectedId){
			var locationSelect = $('#activityEditPage #locationSelect');
			locationSelect.empty();
			
			var emptyOption = ich.selectOption({id: 0, label: getMessage('activityEdit.emptyLocation')})
			locationSelect.append(emptyOption);
			if(selectedId == null){
				//add empty entry
				emptyOption.attr('selected', 'selected');
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
		
		function updateCategoryDropDown(categoryList, selectedId){
			var categorySelect = $('#activityEditPage #categorySelect');
			categorySelect.empty();
			
			var emptyOption = ich.selectOption({id: 0, label: getMessage('activityEdit.emptyCategory')})
			categorySelect.append(emptyOption);
			if(selectedId == null){
				//add empty entry
				emptyOption.attr('selected', 'selected');
			}
			
			
			//render
			for(var i in categoryList){
				var category = categoryList[i];
				var option = ich.selectOption({id: category.id, label: category.name})
				if(category.id == selectedId){
					option.attr('selected', 'selected');
				}
				categorySelect.append(option);
			}
			categorySelect.selectmenu('refresh');
		}
		
		
		this.update = function(activityData){
			updateLocationDropDown(activityData.locationList, activityData.selectedLocationId);
			updateCategoryDropDown(activityData.categoryList, activityData.selectedCategoryId);
			updateSubheader(activityData.description);
			//textarea 'autogrows' but not when its created with text
			//emulate that we have pressed the key to achieve the autogrow effect
			$('#activityEditPage #notes').val(activityData.notes).keyup()
			$('#activityEditPage #completedQuantity').val(activityData.completeQty);
			$('#activityEditPage #totalQuantity').val(activityData.totalQty);
		}
		
		this.addMode = function(){
			$('#updateActivity .ui-btn-text', $page).text('Add');
			$('#deleteActivity', $page).hide();
			$('#cancelActivity', $page).show();
			$('#title', $page).text(getMessage('activityEdit.titleAdd', 'Add Activity'));
		}
		
    	function notifyAddUpdateClicked(completedQty, totalQty, note, locationId, locationName, categoryId, categoryName){
    		$.each(listeners, function(i){
    			listeners[i].addUpdateClicked(completedQty, totalQty, note, locationId, locationName, categoryId, categoryName);
    		});
    	}
    	
    	function notifyDeleteClicked(){
    		$.each(listeners, function(i){
    			listeners[i].deleteClicked();
    		});
    	}
    	
    	function notifyCancelClicked(){
    		$.each(listeners, function(i){
    			listeners[i].cancelClicked();
    		});
    	}
    	
		this.addListener = function(list){
			listeners.push(list);
		}
		
		this.showPageLoading = function() {
			$.mobile.showPageLoadingMsg();						
		}
		
		this.hidePageLoading = function() {
			$.mobile.hidePageLoadingMsg();
		}
		
	},
	ActivityEditPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			addUpdateClicked : function(completedQty, totalQty, note, locationId, locationName, categoryId, categoryName) { },
			deleteClicked : function(){},
			cancelClicked : function(){}
		}, list);			
	}

});