jQuery.extend({
	/**
	 */
	AddPartPageView: function(){
		var self = this;
		var listeners = new Array();
		var quantityUsed = null;
		var addPartToAppointment = false;

		// part update button handler
		$('#updatePart').die('vclick');
		$('#updatePart').live('vclick', function(event){
			
            var purchaseRef = $('#purchaseRef').val();
            var qtyPurchased = $('#qtyPurchased').val();
            var qtyInStore = $('label.qty-instock').text()
            var qtyUsed = null;
            
            if(addPartToAppointment)
            {
            	qtyUsed = $('#qtyUsed').val();
            }
            
			// validate new quantity
			if (!validateBeforeUpdate(qtyPurchased, purchaseRef, qtyUsed, qtyInStore))
			{
				return;
			}
			cleanErrors();
			var qtyUsedFloat = addPartToAppointment ? parseFloat(qtyUsed).toFixed(2) : null;
			var qtyPurchasedFloat = qtyPurchased ? parseFloat(qtyPurchased).toFixed(2) : null;
			
			self.notifyUpdateClicked(qtyPurchasedFloat, purchaseRef, qtyUsedFloat);
		});
		
		this.update = function(storePart, category, quantityUsed){
			self.quantityUsed = quantityUsed;
			console.log("AddPartPageView:update");
			
			var qty = storePart.qty ? storePart.qty : 0;
			qty = parseFloat(qty).toFixed(2);
			
			var partRenderDetails = 
				{	partCategory:  category.name,
					partNumber: storePart.pn,
					partDescription: storePart.desc,
					currentQuantity: parseFloat(qty).toFixed(2),
					qtyUsed: quantityUsed,
					addPartToAppointment: true
				};
			if(!addPartToAppointment)
			{
				delete partRenderDetails.addPartToAppointment;
			}
			var details = ich.partDetails(partRenderDetails);
			details.trigger('create');
			
			$('#addPartContent #partDetailsContent').empty().append(details);
			
			
			$('#addPartPage input').click(function(){				
				this.setSelectionRange(0, 99);
			});			
		}

		/**
		 * returns true if valid otherwise false
		 */
		function validateBeforeUpdate(qtyPurchased, purchaseRef, qtyUsed, qtyInStore){
			cleanErrors();
			var valid = true;
			
			if(addPartToAppointment)
			{
				//at least one must be defined
				if(!qtyUsed)
				{
					showError(getMessage("addPart.usedQuantityRequired", "Used Quantity is required"));
					return false;
				}
				if (!isValidDouble(qtyUsed)){
					showError(getMessage('addPart.usedQuantityValidNumber', 'Used Quantity must be valid number'));
					return false;
				}
				if(parseFloat(qtyUsed) <= 0){
					showError(getMessage("addPart.usedQuantityGreaterThenZero", "Used Quantity must be greater then zero"));
					return false;
				}
				
				var availableQty = parseFloat(qtyInStore) - parseFloat(qtyUsed);
				
				if(qtyPurchased) //its optional but if set must be valid
				{
					if (!isValidDouble(qtyPurchased)){
						showError(getMessage('addPart.purchasedQuantityValidNumber', 'Purchased Quantity must be valid number'));
						return false;
					}
					if(parseFloat(qtyPurchased) < 0){
						showError(getMessage("addPart.purchasedQuantityGreaterThenZero", "Purchased Quantity must be greater then zero"));
						return false;
					}
					
					availableQty = availableQty + parseFloat(qtyPurchased); 
				}
				
				if(availableQty < 0){
					showError(getMessage("addPart.notEnoughStock", "Not enough parts in store"));
					return false;	
				}
				
			}else{
				if(!qtyPurchased){ 
					showError(getMessage('addPart.purchasedQuantityRequired', 'Purchased Quantitiy is required'));
					return false;
				}
				if (!isValidDouble(qtyPurchased)){
					showError(getMessage('addPart.purchasedQuantityValidNumber', 'Purchased Quantity must be valid number'));
					return false;
				}
				if(parseFloat(qtyPurchased) <= 0){
					showError(getMessage("addPart.purchasedQuantityGreaterThenZero", "Purchased Quantity must be greater then zero"));
					return false;
				}
			}

			return true;
		}
		
		this.showPageLoading = function() {
			$.mobile.showPageLoadingMsg();						
		}
		
		this.hidePageLoading = function() {
			$.mobile.hidePageLoadingMsg();
		}		
		
		this.showMessagePartPurchased = function() {
			showError(getMessage("addPart.partAdded", "Part has been added"));
		}
		
		this.addPartToAppointmentMode = function(){
			displayOpenJobHeader("addPartPage", true);
			displayStatusHeader();
			addPartToAppointment = true;
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyUpdateClicked = function(qtyPurchased, purchaseRef, qtyUsed){
    		$.each(listeners, function(i){
    			listeners[i].updateClicked(qtyPurchased, purchaseRef, qtyUsed);
    		});
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
	},
	AddPartPageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			updateClicked : function(qtyPurchased, purchaseRef, qtyUsed) { },
			refreshClicked : function() { },
		}, list);			
	}

});
