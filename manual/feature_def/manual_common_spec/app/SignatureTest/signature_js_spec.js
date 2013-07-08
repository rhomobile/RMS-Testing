describe("Signature Manual Test", function() {
	
	var ENABLE9K = 9000;
	var ENABLE5K = 5000;
	var timeoutFlag = false;
	var ReadFlag = false;
	var takecallbackfired = false;
	var decodedata = '';
	
	var callbacktake = function (data){
		//takecallbackdata(JSON.stringify(data));
		takecallbackdata(data);
		takecallbackfired = true;
	}

	var callbackUri = function (data){
		//URIcallbackdata(JSON.stringify(data));
		URIcallbackdata(data);
		takecallbackfired = true;
	}

	var callbackVector = function (data){
		//vectorcallbackdata(JSON.stringify(data));
		vectorcallbackdata(data);
		takecallbackfired1 = true;
	}

	describe("Signature Test " , function() {

		beforeEach(function() {
			timeoutFlag = false;
			ReadFlag = false;
			nulldata ='';
			document.getElementById("actResult").innerHTML = "init";
			takecallbackdata(nulldata);
			URIcallbackdata(nulldata);
			vectorcallbackdata(nulldata);
			takecallbackfired = false;
			takecallbackfired1 = false;

		});

		afterEach(function() {
			//Rho.Signature.clearAllProperties();
		});

			it("VT299-001 | Call takeFullScreen with callback as function and returned status OK |", function() {

				runs(function()
				{
					setObjective("VT299-001 |Call takeFullScreen with callback as function and returned status OK|");
					setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and press capture after drawing any signature on signature area");
					setExpected("The returned status should be OK and URI of the captured signature image should be returned");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.takeFullScreen({},callbacktake);
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE9K);
					});

					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-002 | Call takeFullScreen with callback as function and returned status cancel |", function() {

				runs(function()
				{
					setObjective("VT299-001 |Call takeFullScreen with callback as function and returned status cancel |");
					setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and press cancel after drawing any signature on signature area");
					setExpected("The returned status should be cancel and no URI of the signature image should be returned");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.takeFullScreen({},callbacktake);
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE9K);
					});

					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-004 | Call takeFullScreen with callback as anonymous function |", function() {

				runs(function()
				{
					setObjective("VT299-003 |Call takeFullScreen with callback as anonymous function|");
					setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and press capture after drawing any signature on signature area");
					setExpected("The returned status should be OK and URI of the captured signature image should be returned");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.takeFullScreen({},function(data){takecallbackdata(data);takecallbackfired = true;});
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE9K);
					});

					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-006 | Call takeFullScreen with callback as function and minimize |", function() {

				runs(function()
				{
					setObjective("VT299-006 |Call takeFullScreen with callback as function and minimize|");
					setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and minimize appliaction after drawing any signature on signature area and then restore app after 5 sec");
					setExpected("The signature are should be visible after restore.Callback should fire with ok after pressing capture");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.takeFullScreen({},function(data){callbacktake(data);});
					setTimeout(function() {
						timeoutFlag = true;
					}, 20000);
					});

					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 21000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-007 | Call takeFullScreen with callback as function and suspend the device |", function() {

				runs(function()
				{
					setObjective("VT299-007 |Call takeFullScreen with callback as function and suspend the device|");
					setInstruction("Wait for 10 sec for Fullscreen Signature box to comeup and suspend the device after drawing any signature on signature area and then resume device after 5 sec");
					setExpected("The signature are should be visible after restore.Callback should fire with ok after pressing capture");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.takeFullScreen({},callbacktake);
					setTimeout(function() {
						timeoutFlag = true;
					}, 20000);
					});

					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 21000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-008 | Call capture with callback as function and returned status OK |", function() {

				runs(function()
				{
					setObjective("VT299-008 |Call capture with callback as function and returned status OK|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for");
					setExpected("The returned status should be OK and URI of the captured signature image should be returned");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.show();
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						//var stat = timeoutFlag || takecallbackfired;
						return timeoutFlag;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.capture(callbacktake);
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-010 | Call capture with callback as anonymous function |", function() {

				runs(function()
				{
					setObjective("VT299-010 |Call capture with callback as anonymous function|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for");
					setExpected("The returned status should be OK and URI of the captured signature image should be returned");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.show();
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						//var stat = timeoutFlag || takecallbackfired;
						return timeoutFlag;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.capture(function(data){takecallbackdata(data);});
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-011 | Call capture and press clear |", function() {

				runs(function()
				{
					setObjective("VT299-011 |Call capture with callback as anonymous function|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw any signature on signature area and wait for claer to call");
					setExpected("The signature area should be clear after clear has been called and a clear signature image will be saved at returned URI");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.show();
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						//var stat = timeoutFlag || takecallbackfired;
						return timeoutFlag;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.clear();
					Rho.Signature.capture(function(data){callbacktake(data);});
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-012 | Call takeFullScreen with bgColor as #0000FF(RGB), penColor as #FFFFFF00 and callback |", function() {

				runs(function()
				{
					setObjective("VT299-012 |Call takeFullScreen with bgColor as #0000FF(RGB), penColor as #FFFFFF00 and callback|");
					setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
					setExpected("The signature area should be red colored fullscreen and pen color yellow, the same signature should be saved at return URI");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.takeFullScreen({'bgColor':'#FF0000FF','penColor':'#FFFF00'},callbacktake);
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE9K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-013 | Call takeFullScreen with bgColor as #FF0000FF (ARGB), penColor as #FF00FF(RGB), penWidth as 1 and callback |", function() {

				runs(function()
				{
					setObjective("VT299-013 |Call takeFullScreen with bgColor as #FF0000FF (ARGB), penColor as #FF00FF(RGB), penWidth as 1 and callback|");
					setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
					setExpected("The signature area should be blue colored fullscreen, pen color pink and thin width penline, the same signature should be saved at return URI");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.takeFullScreen({'bgColor':'#FFFFFF00','penColor':'#FF00FF','penWidth':1},callbacktake);
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE9K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-014 | Call takeFullScreen after setting bgColor as #FF87CEEB, penColor as #FF8B0000 and penWidth as 5 |", function() {

				runs(function()
				{
					setObjective("VT299-014 |Call takeFullScreen after setting bgColor as #FF87CEEB, penColor as #FF8B0000 and penWidth as 5|");
					setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
					setExpected("The signature area should be skyblue colored fullscreen, pen color darkred and thick width penline, the same signature should be saved at return URI");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.bgColor = '#FF87CEEB';
					Rho.Signature.penColor = '#FF8B0000';
					Rho.Signature.penWidth = 5;
					Rho.Signature.takeFullScreen({},callbacktake);
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE9K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-015 | Call takeFullScreen with setting compressionFormat as jpg, fileName as TestSig and outputFormat as Image |", function() {

				runs(function()
				{
					setObjective("VT299-015 |Call takeFullScreen with setting compressionFormat as jpg, fileName as TestSig and outputFormat as Image|");
					setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
					setExpected("The format of saved image should be jpg with name TestSig and Image should be saved at retrurned URI");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.bgColor = '#FF0000';
					Rho.Signature.penColor = '#0000FF';
					Rho.Signature.penWidth = 3;
					Rho.Signature.takeFullScreen({compressionFormat:'jpg',fileName:'TestSig',outputFormat:'image'},callbacktake);
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE9K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-016 | Call takeFullScreen after setting compressionFormat as png, fileName as Sig_123 and outputFormat as Image |", function() {

				runs(function()
				{
					setObjective("VT299-016 |Call takeFullScreen after setting compressionFormat as png, fileName as Sig_123 and outputFormat as Image|");
					setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
					setExpected("The format of saved image should be png with name Sig_123 and Image should be saved at retrurned URI");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.compressionFormat = 'png';
					Rho.Signature.fileName = 'Sig_123';
					Rho.Signature.outputFormat = 'image';
					Rho.Signature.takeFullScreen({},callbacktake);
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE9K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-017 | Call takeFullScreen with compressionFormat as bmp, fileName as 12345 and outputFormat as Image |", function() {

				runs(function()
				{
					setObjective("VT299-017 |Call takeFullScreen with setting compressionFormat as bmp, fileName as 12345 and outputFormat as Image|");
					setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
					setExpected("The format of saved image should be bmp with name 12345 and Image should be saved at retrurned URI");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.takeFullScreen({compressionFormat:'bmp',fileName:'12345',outputFormat:'image'},);
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE9K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-018 | Call takeFullScreen with compressionFormat as jpg, fileName as Test and outputFormat as dataUri |", function() {

				runs(function()
				{
					setObjective("VT299-018 |Call takeFullScreen with compressionFormat as jpg, fileName as Test and outputFormat as dataUri|");
					setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
					setExpected("The saved signature should be rendered in page as callback returns datauri and image should be black signature area with white normal pen");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.bgColor = '#000000';
					Rho.Signature.penColor = '#FFFFFF';
					Rho.Signature.penWidth = 3;
					Rho.Signature.takeFullScreen({compressionFormat:'bmp',fileName:'TC18',outputFormat:'dataUri'},callbackUri);
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE9K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-019 | Call show with bgColor as #FFFF8C00 (ARGB), penColor as #00FF00(RGB), penWidth as 1, and callback |", function() {

				runs(function()
				{
					setObjective("VT299-019 |Call show with bgColor as #FFFF8C00 (ARGB), penColor as #00FF00(RGB), penWidth as 1, and callback|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
					setExpected("The signature area should be default area of color darkOrange and pen as green with thin width penline and signature should be saved at return URI with name TC19sig.jpg");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.show({bgColor:'#FFFF8C00',penColor:'#00FF00',penWidth:1,compressionFormat:'jpg',fileName:'TC19sig',outputFormat:'image'});
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						//var stat = timeoutFlag || takecallbackfired;
						return timeoutFlag;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.capture(callbacktake);
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-020 | Call show with signame as TC20_Sig, compressionFormat as png, outputFormat as image and callback |", function() {

				runs(function()
				{
					setObjective("VT299-020 |Call show with signame as TC20_Sig, compressionFormat as png, outputFormat as image and callback|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
					setExpected("The signature area should be nonfullscreen area of color grey and pen as purple with width penline 2(more thick than prev test), signature should be saved as TC20_Sig.png");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.bgColor='#C0C0C0';
					Rho.Signature.penColor ='#FF800080';
					Rho.Signature.penWidth = 2;
					Rho.Signature.show({compressionFormat:'png',fileName:'TC20_Sig',outputFormat:'image'});
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						//var stat = timeoutFlag || takecallbackfired;
						return timeoutFlag;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.capture(callbacktake);
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-021 | Call show with left as 20, top as 70, width as 250 and height as 200, border as false and callback |", function() {

				runs(function()
				{
					setObjective("VT299-021 |Call show with left as 20, top as 70, width as 250 and height as 200, border as false and callback|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
					setExpected("TThe signature area should be nonfullscreen area without border of specified size  left as 20, top as 70, width as 250 and height as 200 with penline width as 3(more thick than prev test), signature should be saved as TC21_Sig.bmp");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.show({bgColor:'#C0C0C0',penColor:'#FF800080',penWidth:2,left:20,top:70,width:250,height:200,border:false,compressionFormat:'bmp',fileName:'TC21_Sig',outputFormat:'image'});
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						//var stat = timeoutFlag || takecallbackfired;
						return timeoutFlag;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.capture(callbacktake);
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-022 | Call show with left as 10, top as 50, width as 180 and height as 120, border as false and outputFormat as dataURI|", function() {

				runs(function()
				{
					setObjective("VT299-022 |Call show with left as 10, top as 50, width as 180 and height as 120,  border as false and outputFormat as dataURI|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
					setExpected("The signature area should be nonfullscreen area without border of specified size  left as 10, top as 50, width as 180 and height as 120 with penline width as 4(more thick than prev test), signature should be rendered in page as callback returns the dataURI");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.bgColor='#C0C0C0';
					Rho.Signature.penColor ='#FF800080';
					Rho.Signature.penWidth = 2;
					Rho.Signature.show({left:10,top:50,width:180,height:120,border:false,outputFormat:'dataUri'});
					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						//var stat = timeoutFlag || takecallbackfired;
						return timeoutFlag;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.capture(callbackUri);
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-023 | Call show after setting all properties and outputFormat as dataURI|", function() {

				runs(function()
				{
					setObjective("VT299-023 |Call show after setting all properties and outputFormat as dataURI|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and wait after drawing, check the image at returned URI");
					setExpected("The signature area should be nonfullscreen area without border of specified size  left as 15, top as 60, width as 200 and height as 150 with penline width as 5(thickest than prev test), signature should be rendered in page as callback returns the dataURI");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.bgColor='#00FF00';
					Rho.Signature.penColor ='#FF800000';
					Rho.Signature.penWidth = 5;
					Rho.Signature.left = 15;
					Rho.Signature.top = 60;
					Rho.Signature.height = 150;
					Rho.Signature.width = 200;
					Rho.Signature.outputFormat = 'dataUri';
					Rho.Signature.border = true;
					Rho.Signature.show();

					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						//var stat = timeoutFlag || takecallbackfired;
						return timeoutFlag;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.capture(callbackUri);
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-024 | Call takeFullScreen with left,top,width,height and border|", function() {

				runs(function()
				{
					setObjective("VT299-024 |Call takeFullScreen with left,top,width,height and border|");
					setInstruction("Wait for 10 sec for Signature box(FullScreen) to comeup and press capture after drawing, check the image at returned URI");
					setExpected("The signature area should be fullscreen area without considering the area co-ordimates and border,signature should save at returned URI");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.bgColor='#00FF00';
					Rho.Signature.penColor ='#FF800000';
					Rho.Signature.penWidth = 5;
					Rho.Signature.left = 15;
					Rho.Signature.top = 60;
					Rho.Signature.height = 150;
					Rho.Signature.width = 200;
					Rho.Signature.outputFormat = 'image';
					Rho.Signature.border = false;
					Rho.Signature.fileName = 'TC24_Sig';
					Rho.Signature.compressionFormat = 'jpg';
					Rho.Signature.takeFullScreen({},callbacktake);

					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 10000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-025 | Call setVectorCallback with function callback|", function() {

				runs(function()
				{
					setObjective("VT299-025 |Call setVectorCallback with function callback|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw a line, check for setVectorCallback to fire ");
					setExpected("The signature area should be Nonfullscreen area and setVectorCallback callback will be fired after 'pen up' occurs in the signature box.");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.bgColor='#00FF00';
					Rho.Signature.penColor ='#FF800000';
					Rho.Signature.penWidth = 5;
					Rho.Signature.left = 15;
					Rho.Signature.top = 60;
					Rho.Signature.height = 150;
					Rho.Signature.width = 200;
					Rho.Signature.outputFormat = 'image';
					Rho.Signature.border = false;
					Rho.Signature.fileName = 'TC25_Sig';
					Rho.Signature.compressionFormat = 'jpg';
					Rho.Signature.show();
					Rho.Signature.setVectorCallback(callbackVector);

					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired || takecallbackfired1;
						return stat;
					}, 'wait to callback to fire or timeout', 6000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-026 | Call setVectorCallback with anonymous callback|", function() {

				runs(function()
				{
					setObjective("VT299-026 |Call setVectorCallback with anonymous callback|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and draw a 2 lines, check for setVectorCallback to fire");
					setExpected("2 vectors contains an X, Y coordinate and the beginning / end of the signature should return with callback after ecah 'pen up' occurs in the signature box.");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.bgColor='#00FF00';
					Rho.Signature.penColor ='#FF800000';
					Rho.Signature.penWidth = 5;
					Rho.Signature.left = 15;
					Rho.Signature.top = 60;
					Rho.Signature.height = 150;
					Rho.Signature.width = 200;
					Rho.Signature.outputFormat = 'image';
					Rho.Signature.border = false;
					Rho.Signature.fileName = 'TC24_Sig';
					Rho.Signature.compressionFormat = 'jpg';
					Rho.Signature.show();
					Rho.Signature.setVectorCallback(function(data){vectorcallbackdata(data);});

					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 6000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-027 | Call setVectorCallback with takeFullScreen|", function() {

				runs(function()
				{
					setObjective("VT299-027 |Call setVectorCallback with takeFullScreen|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and press capture after drawing");
					setExpected("Both vector callback and callback of takeFullScreen should fire");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.bgColor='#00FF00';
					Rho.Signature.penColor ='#FF800000';
					Rho.Signature.penWidth = 5;
					Rho.Signature.outputFormat = 'image';
					Rho.Signature.border = false;
					Rho.Signature.fileName = 'TC27_Sig';
					Rho.Signature.compressionFormat = 'jpg';
					Rho.Signature.setVectorCallback(callbackVector);
					Rho.Signature.takeFullScreen({},callbacktake);

					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE9K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 6000);
				});

				runs(function()
				{
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

			it("VT299-028 | Call setVectorCallback with capture and dataURI|", function() {

				runs(function()
				{
					setObjective("VT299-028 |Call setVectorCallback with capture and dataURI|");
					setInstruction("Wait for 10 sec for Signature box(NonFullScreen) to comeup and press capture after drawing");
					setExpected("Both vector callback and callback of capture as datauri should fire");
					setTimeout(function() {
						ReadFlag = true;
					}, ENABLE9K);
				});

				runs(function()
				{									
					waitsFor(function()
					{
						return ReadFlag;
					}, 'wait to callback to fire or timeout', 10000);

					runs(function() {
					Rho.Signature.bgColor='#00FF00';
					Rho.Signature.penColor ='#FF800000';
					Rho.Signature.penWidth = 5;
					Rho.Signature.outputFormat = 'dataUri';
					Rho.Signature.border = false;
					Rho.Signature.fileName = 'TC27_Sig';
					Rho.Signature.compressionFormat = 'jpg';
					Rho.Signature.show();
					Rho.Signature.setVectorCallback(callbackVector);

					setTimeout(function() {
						timeoutFlag = true;
					}, ENABLE5K);
					});
										
					waitsFor(function()
					{
						var stat = timeoutFlag || takecallbackfired;
						return stat;
					}, 'wait to callback to fire or timeout', 6000);
				});

				runs(function()
				{
					Rho.capture(callbackUri);
					Rho.Signature.hide();
					waitsFor(function() {
					return document.getElementById("actResult").innerHTML != "init";
					}, "Timed out waiting for tester to respond", 300000);
					runs(function() {
					expect("pass").toEqual(document.getElementById("actResult").innerHTML);
					});
				});
			});

	});	
});	