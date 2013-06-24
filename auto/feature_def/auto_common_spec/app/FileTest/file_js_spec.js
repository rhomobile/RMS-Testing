describe("FILE JS API", function () {

	var myvar = Rho.Application.userFolder;
	var fileName = "rholog.txt"
	var path = myvar + fileName
	var invalidpath = "/programFiles/Test/rholog.txt"
	var isRead = false
	var destPath = Rho.Application.publicFolder + "/"
	var destFilePath = destPath + fileName
	
	
	beforeEach(function () {
			
	});

	// this function will execute after each of test case execution i.e it function
	afterEach(function () {
			
	});

	// Get basename of file
	it("VT295-001 : get basename of file | 1", function() {
		runs(function(){

						
			var baseName =Rho.RhoFile.basename(path)
			expect(baseName).toEqual(fileName);
			Rho.Log.info("Test1", "VT290-001");
			Rho.Log.info(Rho.Application.userFolder, "VT290-001");
			Rho.Log.info(Rho.Application.publicFolder, "VT290-001");

		});
	});
	
	var f = []
	
	
	// file exists 
	it("VT295-031 : is File Exists | true ", function() {
			
		expect(Rho.RhoFile.exists(path)).toEqual(true)
			
	});	
	
	// file exists 
	it("VT295-032 : is File Exists | false", function() {
			
		expect(Rho.RhoFile.exists(invalidpath)).toEqual(false)
			
	});
	
	// open file
	it("Open File", function() {
				
		f = new Rho.RhoFile(path,2);
		expect(typeof(f)).toEqual('object');	
	});	
	
	
	// isOpen File when opened
	it("VT295-044 : is opened ? | true",function(){
		expect(f.isOpened()).toEqual(true);
	});
	
	// Read File with path
	it("Read",function(){
		var data = Rho.RhoFile.read(path)
		if(data.length)
			isRead = true
		else
			isRead = false;
		expect(isRead).toEqual(true);
	});
	
	// close with valid path	
	it("VT295-003 : is close ? | true",function(){
		f.close()
		expect(typeof(f)).toEqual('object');
	});
	
	//close when file not opened
	it("VT295-004 : is close ? | false",function(){
		
		f.close()
		expect(typeof(f)).toEqual('object');
	});
	
	// is Open File when not opened
	it("VT295-045 : is opened ? | false",function(){
		expect(f.isOpened()).toEqual(false);
	});
	
	// copy from and to with valid path
	it("VT295-006 : Copy with valid parameters | true",function(){
		var result = Rho.RhoFile.copy(path,destPath)
		expect(result).toEqual(0);
		Rho.Log.info(path, "VT290-001");
		Rho.Log.info(destPath, "VT290-001");
		expect(Rho.RhoFile.exists(destFilePath)).toEqual(true)
	});
	
	// mkdir with valid
	it("VT295-054 : make directory | true",function(){
		
		Rho.RhoFile.makeDir(path+"RMS4")		
		expect(Rho.RhoFile.isDir(path+"RMS4")).toEqual(true)
	});
	
	// mkdir with invalid path when top level directories not exists
	it("VT295-055 : make directory | false",function(){
		var wrongPath = path + "Testing"
		Rho.RhoFile.makeDir(wrongPath+"RMS4")		
		expect(Rho.RhoFile.isDir(wrongPath+"RMS4")).toEqual(false)
	});
	
	
	
	
	
	
	
	
		
		
		
		
		
		
		
		
	




});