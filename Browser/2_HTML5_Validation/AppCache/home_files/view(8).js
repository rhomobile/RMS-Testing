jQuery.extend({
	/**
	 * SurveyAttribute page contains a list of attributes from a selected
	 * attributeGroup element of a survey
	 */
	SurveyAttributePageView: function(){
		var self = this;
		var listeners = new Array();

		$('#acceptSurvey').click(function() {
			  consoleLog("Accept clicked - check values");
			  // to get here any changed values have been validated but 
			  // we need to check that all mandatory fields actually have data
			  // as they won't have been validated unless a change is made
			  
			  // load up original survey to get attribute id list
			  var attributes = jQuery.parseJSON(sessionStorage.siteSurveyAttributes);
			  var siteSurveyAttributeGroupId = sessionStorage.siteSurveyAttributeGroupId;
			  var siteSurvey = getCurrentSurvey();
			  var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
			  console.log("Status before Accept: "+siteSurvey.status);
				
			  consoleLog("Attributes: "+attributes.length);
			  logUserAction("surveyAttributes Accept button clicked");
			  var errFlag = false;
			  var errMsg = "";
			  var errCount = 0;
			  for (var x=0;x<attributes.length;x++)
			  {
				  var currData = siteSurveyStatus.getAttribute(attributes[x].id);
				  consoleLog("CurrData: "+currData.mandatory+",'"+currData.value+"'");
				  if (currData.mandatory == 'true' && (currData.value == undefined || currData.value == ''))
				  {
					  if (errCount < 10)
					  {
						  // build error message text 
						  errMsg += "<br>"+attributes[x].name;
					  }
					  else if (errCount == 10)
					  {
						  // add generic message when list gets too long
						  errMsg += "<br><br>"+getMessage("survey.attribute.mandatory.overflow","These and more mandatory fields have not been updated");
					  }
					  errCount++;
					  errFlag = true;
				  }		
			  }	
			  if (errFlag)
			  {
				  alert("Missing data on mandatory field(s): "+errMsg);
				  return;
			  }
			  
			  // if here then all valid ready for updating the survey
			  consoleLog("Survey attribute data valid");
			  self.notifyUpdateSurvey(attributes);
			  siteSurveyStatus.updateAttributeGroupStatus(siteSurveyAttributeGroupId);
			  
			  // possibly set to In Progress if not already
			  setSurveyInProgress(siteSurveyStatus.siteSurveyId)
			  
			  // test only
			  siteSurvey = getCurrentSurvey();		
			  console.log("Status after Accept: "+siteSurvey.status);
			
			  // redirect back to survey page			    
			  window.history.go(-1);
		});
		
		/** validation entry point */
		this.validate = function(attributeId) {
			var siteSurveyStatus = new $.SiteSurveyStatus(getCurrentSurvey());
			if (!siteSurveyStatus.isReadonly())
				validate(attributeId);
		}

		/** updates page layout */
		this.updateLayout = function(){
			$('#list').trigger('updatelayout');
		}
		
		this.updateSurveyName = function(surveyName){
			$('#surveyName').text(surveyName);
		}
		
		this.updateList = function(siteSurvey,siteSurveyAttributeGroupId){
			consoleLog('SurveyAttributePage:view:updateList');
			var siteSurveyStatus = new $.SiteSurveyStatus(siteSurvey);
			var readonly = siteSurveyStatus.isReadonly();
			var surveyAttribute = $('#surveyAttributes');
			
			var attributeGroups = siteSurvey.attributeGroups;
			consoleLog("AttributeGroups: " + JSON.stringify(attributeGroups));
			var attributes = new Array();
			for (var x=0;x<attributeGroups.length;x++)
			{
				if (attributeGroups[x].id == siteSurveyAttributeGroupId)
				{
					consoleLog("Found attribute group: "+ siteSurveyAttributeGroupId);
					$('#surveyAttributeGroup').text(attributeGroups[x].name);
					//if (sessionStorage.siteSurveyAttributes == undefined)
					//{
						attributes = attributeGroups[x].attributes;
						consoleLog("Saving sessionStorage.siteSurveyAttributes");
						sessionStorage.setObject('siteSurveyAttributes',attributes);
					//}
					//else
					//{
					//	attributes = sessionStorage.getObject('siteSurveyAttributes');
					//}
					consoleLog("Attributes: "+JSON.stringify(attributes));
					break;
				}
			}

			// add some test attributes =====================================================
			/*
			var decimal = {"id":"40","mandatory":"true","sequence":"4","type":"S","dataType":"2","name":"Energy Efficiency (SAP) Rating %","defaultValue":"50.0","minValue":"","maxValue":"","value":"66.6"};
			attributes.push(decimal);
			var money = {"id":"41","mandatory":"true","sequence":"5","type":"S","dataType":"3","name":"Replacement cost","defaultValue":"25.00","minValue":"","maxValue":"100.00","value":""};
			attributes.push(money);	
			var date = {"id":"42","mandatory":"false","sequence":"6","type":"S","dataType":"4","name":"Replacement date","defaultValue":"","minValue":"01/01/2011","maxValue":"31/12/2012","value":"17/02/2012"};
			attributes.push(date);
			var time = {"id":"43","mandatory":"false","sequence":"6","type":"S","dataType":"5","name":"Replacement time","defaultValue":"","minValue":"08:00","maxValue":"17:00","value":"15:30"};
			attributes.push(time);	
			var datetime = {"id":"44","mandatory":"false","sequence":"6","type":"S","dataType":"6","name":"Replacement datetime","defaultValue":"","minValue":"01/02/2012 00:00","maxValue":"","value":"19/02/2012 14:30"};
			attributes.push(datetime);							
			var boolean = {"id":"45","mandatory":"true","sequence":"7","type":"W","dataType":"7","name":"Asbestos","defaultValue":"","minValue":"","maxValue":"","value":"No"};
			attributes.push(boolean);			
			var testdate = {"id":"46","mandatory":"true","sequence":"8","type":"W","dataType":"4","name":"Date tested?","defaultValue":"","minValue":"","maxValue":"","value":"01/03/2012","lookupValues":[{"id":"1","sequence":"1","value":"01/02/2012"},{"id":"2","sequence":"1","value":"01/03/2012"},{"id":"3","sequence":"3","value":"01/04/2012"}]};
			attributes.push(testdate);
			var blank = {"id":"47","mandatory":"true","sequence":"4","type":"S","dataType":"2","name":"Blank %","defaultValue":"","minValue":"","maxValue":"","value":""};
			attributes.push(blank);
			sessionStorage.siteSurveyAttributes = JSON.stringify(attributes);
			*/
			// ==============================================================================
			
			for (var x=0;x<attributes.length;x++)
			{
				var attribute = attributes[x];
				var dType = dataType[attribute.dataType];
				var tmpAttribute = siteSurveyStatus.getAttribute(attribute.id);
				
				// set starting class for coloured bar
				var attrClass = "pendingNotRequired";  // grey
				if (attribute.mandatory == 'true')
				{				
					consoleLog("Temp attribute: "+JSON.stringify(tmpAttribute));
					if (tmpAttribute != undefined && tmpAttribute.valid)
					{						
						attrClass = 'complete'; // green
					}
					else
					{
						attrClass = 'pending';  // red
					}
				}

				// readonly override
				if (readonly)
				{
					attrClass = "readonly";
				}
				
				// set value from original, stored, default or first available lookup
				var valid = false;
				var val = attribute.value;
				if (tmpAttribute != undefined)
				{
					val = tmpAttribute.value;
					if (tmpAttribute.valid != undefined && tmpAttribute.valid)
						valid = true;
				}	
				else 
				{
					if (val == "")
						val = attribute.defaultValue; // default
					//if (val == "" && attribute.lookupValues != undefined)
					//	val = attribute.lookupValues[0].id; // lookup
				}
				
				// set main non datatype specific values
				var rowData = { 
								'attributeid':"attribute_"+attribute.id,
								'id':attribute.id,
								'question':attribute.name, 
								'type':attribute.type,
								'attrClass':attrClass,
								'dataType':attribute.dataType,
								'minValue':attribute.minValue,
								'maxValue':attribute.maxValue,
								'value':val,
								'mandatory':attribute.mandatory
								};
				// add the datatype specific values
				setDataType(rowData,attribute);
				
				// save current values to local storage
				var tmp = {"id":attribute.id,"value":val,'mandatory':attribute.mandatory,'valid':valid};
				siteSurveyStatus.saveAttribute(tmp);
				
				//consoleLog("Adding row: "+JSON.stringify(rowData));
				var row = ich.attributeRow(rowData);
				surveyAttribute.append(row);
			}

			if (readonly)
			{
				$('#acceptSurvey').hide();
			}else{
				$('#acceptSurvey').removeClass('hidden');
			}
			
			surveyAttribute.listview('refresh');
			surveyAttribute.trigger('create');
			consoleLog('SurveyAttributePage:view:updateList:refreshed');
		}
		
    	/**
    	 * add a listener to this view
    	 */
    	this.addListener = function(list){
    		listeners.push(list);
    	}
    	
    	this.notifyRefreshClicked = function(){
    		$.each(listeners, function(i){
    			listeners[i].refreshClicked();
    		});
    	}
    	
    	this.notifyUpdateSurvey = function(attributes){
    		$.each(listeners, function(i){
    			listeners[i].updateSurvey(attributes);
    		});
    	}
	},
	SurveyAttributePageViewListener: function (list){
		if(!list) list = {};
		return $.extend({
			refreshClicked : function() { },
			updateSurvey : function(attributes) { }
		}, list);			
	}

	
});

