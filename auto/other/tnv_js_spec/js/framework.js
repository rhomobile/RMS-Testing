describe("FileTransfer TestSuite", function() {

function start(val){
	describe("FileTransfer TestSuite", function() {

		beforeEach(function() {
			
		if(TestCaseArray == ""){
		i = 0;
		alert(i);
		var stringJson = document.getElementById("myhiddenfield").value;
		var dataJson = eval('(' + stringJson + ')');
		var count = Object.keys(dataJson).length + 16;
		
		for (i=16;i< count;i++)
		{
			TestCaseArray[i-16] = new Array();
			for (j=0;j<Object.keys(dataJson[i]).length;j++)
			{
			TestCaseArray[i-16][j]=dataJson[i][j];
			}
			
		}
		i++;
		}
			g_tcindex = val;

			g_tcid			= TestCaseArray[g_tcindex][0];
			g_tcdescription	= TestCaseArray[g_tcindex][1];
			g_tcparam		= TestCaseArray[g_tcindex][2];
			g_tcprocedure	= TestCaseArray[g_tcindex][3];
			g_expres		= TestCaseArray[g_tcindex][4];
			g_vtid			= TestCaseArray[g_tcindex][5];

			g_tcid 			= g_tcid.trim();
			g_tcdescription = g_tcdescription.trim();
			g_tcparam 		= g_tcparam.trim();
			g_tcprocedure 	= g_tcprocedure.trim();
			g_expres		= g_expres.trim();

			txttcid = document.getElementById('txttcid');
			txttcdescription = document.getElementById('txttcdescription');
			txtparam = document.getElementById('txtparam');
			txtprocedure = document.getElementById('txtprocedure');
			txtexpres = document.getElementById('txtexpres');
			
			txttcid.innerHTML 			= g_tcid + " / "+ g_vtid;
			txttcdescription.innerHTML 	= g_tcdescription;
			txtprocedure.innerHTML 		= g_tcprocedure;
			txtexpres.innerHTML			= g_expres;
			txtparam.innerHTML			= g_tcparam;
			
			txtres.value  			= "";
			txtactulres.value		= "";
			result = document.getElementById('resultdiv');
			result.innerHTML = "";

			settingsaftertestexecution();
		});

		afterEach(function() {
			g_tcindex++;
		});

		it ("Decode Test #" + g_tcindex, function() {
			runs(function() {
				executetestcase();
			}, "Running File Transfer Test #:" + g_tcindex);

			waitsFor(function() {
				//return expect(5).toEqual(5);
				return false;
			}, "File Transfer Test #:Bhakta "+g_tcindex+" : "+output+" failed", 1000);
		});

	});
	}
	
	tcindex = 0;
	for (m = 0; m <= 29; m++)
	{
	start(tcindex);
	tcindex++;
	}


});