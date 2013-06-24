describe("FILE JS API", function () {

	var userFolder = Rho.Application.userFolder;
	var publicFolder = Rho.RhoFile.join(Rho.Application.publicFolder)
	var fileName = "rhoconfig.txt"
	var path = Rho.RhoFile.join(Rho.Application.userFolder, "rhoconfig.txt")	
	var invalidpath = "/programFiles/Test/rholog.txt"
	var dirName = Rho.RhoFile.join(userFolder,"RMS4")		
	var destFilePath = publicFolder + fileName
	var dirToDelete = Rho.RhoFile.join(userFolder,"TestDelete")
	var invalidDir = "/programFiles/Test/"
	var dirinDelete = Rho.RhoFile.join(dirToDelete,"InDelete")
	var openTestFile = Rho.RhoFile.join(dirName, "testing.txt")
	var fileMode1 = Rho.RhoFile.join(dirName, "Mode1.txt")
	var fileMode2 = Rho.RhoFile.join(dirName, "Mode2.txt")
	var fileMode3 = Rho.RhoFile.join(dirName, "Mode3.txt")
	var fileMode4 = Rho.RhoFile.join(dirName, "Mode4.txt")
	var fileMode5 = Rho.RhoFile.join(dirName, "Mode5.txt")
	
	var Text1 = "This is RMS4.0 File Testing."
	var Text2 = "Thank you."
	var Text3 = "This is from File Open mode 4\n"
		
	var expected = Text1+Text2
	var Text4 = Rho.RhoFile.join(Text1,Text3)
	var Text5 = Rho.RhoFile.join(Text4,Text2)
	
	
	beforeEach(function () {
		var flag = false
			
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
	
	// open file
	it("Open File", function() {
				
		f = new Rho.RhoFile(path,Rho.RhoFile.OPEN_FOR_READ);
		expect(typeof(f)).toEqual('object');	
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
	
	
	
	// copy from and to with valid path
	it("VT295-006 : Copy with valid parameters | true",function(){
		//var dirName = Rho.RhoFile.join(path,"RMS4")
		
		Rho.RhoFile.makeDir(dirName)
		var fromPath = Rho.RhoFile.join(userFolder, "testing.txt")
		var fOpen = new Rho.RhoFile(fromPath,Rho.RhoFile.OPEN_FOR_APPEND);
		expect(Rho.RhoFile.exists(fromPath)).toEqual(true)
		fOpen.close()
		var toPath = Rho.RhoFile.join(dirName, "testing.txt")
		var result = Rho.RhoFile.copy(fromPath,toPath)
		expect(result).toEqual(0);
		Rho.Log.info(fromPath, "VT290-006");
		Rho.Log.info(dirName, "VT290-006");
		expect(Rho.RhoFile.exists(dirName)).toEqual(true)
	});
	
	// copy from and to with same path
	it("VT295-009 : Copy to same folder | false",function(){
		//var dirName = Rho.RhoFile.join(path,"RMS4")
		
		Rho.RhoFile.makeDir(dirName)
		var fromPath = Rho.RhoFile.join(userFolder, "testing.txt")
		var result = Rho.RhoFile.copy(fromPath,userFolder)
		expect(result).toEqual(-1);
		Rho.Log.info(fromPath, "VT290-009");
		Rho.Log.info(userFolder, "VT290-009");
		expect(Rho.RhoFile.exists(dirName)).toEqual(true)
	});
	
	// copy from and to with valid path with source file opened
	it("VT295-010 : Copy with valid parameters with source file opened | false",function(){
				
		Rho.RhoFile.makeDir(dirName)
		var fromPath = Rho.RhoFile.join(userFolder, "testing.txt")
		var fcopy = new Rho.RhoFile(fromPath,2);
		expect(fcopy.isOpened()).toEqual(true);
		var result = Rho.RhoFile.copy(fromPath,dirName)
		expect(result).toEqual(-1);
	});	
	
	
	// copy from and to with invalid source path 
	it("VT295-011 : Copy with invalid source path | false",function(){
			
		Rho.RhoFile.makeDir(dirName)
		var fromPath = Rho.RhoFile.join(userFolder, "invalidtesting.txt")
		var result = Rho.RhoFile.copy(fromPath,dirName)
		expect(result).toEqual(-1);
	});
	
	// copy without parameters 
	it("VT295-014 : Copy without parameters | false",function(){
			
		Rho.RhoFile.makeDir(dirName)
		var fromPath = Rho.RhoFile.join(userFolder, "invalidtesting.txt")
		var result = Rho.RhoFile.copy(null,null)
		expect(result).toEqual(-1);
	});	
	
	// Delete directory without contents
	it("VT295-016 : Delete directory without contents | true",function(){
		
		Rho.RhoFile.makeDir(dirToDelete)
		expect(Rho.RhoFile.isDir(dirToDelete)).toEqual(true)		
		expect(Rho.RhoFile.deleteDir(dirToDelete)).toEqual(0);
	});	
	
	// Delete directory without contents
	it("VT295-015 : Delete directory without contents | false",function(){
		
		Rho.RhoFile.makeDir(dirToDelete)
		expect(Rho.RhoFile.isDir(dirToDelete)).toEqual(true)
		var file = Rho.RhoFile.join(dirToDelete, "delete.txt")
		var fOpen = new Rho.RhoFile(file,1);
		expect(Rho.RhoFile.exists(file)).toEqual(true)
		expect(Rho.RhoFile.deleteDir(dirToDelete)).toEqual(-1);
	});	
	
	// Delete directory with invalid path
	it("VT295-017 : Delete directory with invalid path | path",function(){
		
		expect(Rho.RhoFile.deleteDir(invalidDir)).toEqual(-1);
	});

	// Delete directory without parameters
	it("VT295-018 : Delete directory without parameters | false",function(){
		
		expect(Rho.RhoFile.deleteDir(null)).toEqual(-1);
		
	});
	
	// Delete directory with contents folder and files
	it("VT295-020 : Delete directory with contents folders and files | false",function(){
		
		Rho.RhoFile.makeDir(dirToDelete)
		expect(Rho.RhoFile.isDir(dirToDelete)).toEqual(true)
		var file = Rho.RhoFile.join(dirToDelete, "delete.txt")
		var fOpen = new Rho.RhoFile(file,1);
		Rho.RhoFile.makeDir(dirinDelete)
		expect(Rho.RhoFile.isDir(dirinDelete)).toEqual(true)
		expect(Rho.RhoFile.exists(file)).toEqual(true)
		expect(Rho.RhoFile.deleteDir(dirToDelete)).toEqual(-1);
	});	

	// delete file 
	it("VT295-021 : Delete file | true",function(){
		
		var fOpen = new Rho.RhoFile(fileMode1,Rho.RhoFile.OPEN_FOR_APPEND);
		fOpen.close()
		expect(Rho.RhoFile.exists(fileMode1)).toEqual(true)
		expect(Rho.RhoFile.deleteFile(fileMode1)).toEqual(0);
		expect(Rho.RhoFile.exists(fileMode1)).toEqual(false)
		
		
	});
	
	// delete file with invalid file path
	it("VT295-022 : Delete file with invalid file path | false",function(){
		
		//var file = Rho.RhoFile.join(dirToDelete, "delete.txt")
		var deleteFile = Rho.RhoFile.join(userFolder, "testing2.txt")
		Rho.Log.info(deleteFile, "VT290-022");
		expect(Rho.RhoFile.deleteFile(deleteFile)).toEqual(-1);
		expect(Rho.RhoFile.exists(deleteFile)).toEqual(false)
		
	});
	
	// delete file without parameter
	it("VT295-023 : Delete file without parameter | false",function(){
		
		//var file = Rho.RhoFile.join(dirToDelete, "delete.txt")
		var deleteFile = Rho.RhoFile.join(userFolder, "testing2.txt")
		Rho.Log.info(deleteFile, "VT290-023");
		expect(Rho.RhoFile.deleteFile(null)).toEqual(-1);
		expect(Rho.RhoFile.exists(deleteFile)).toEqual(false)	
		
	});	
	
	// Delete recursive with leave root true
	it("VT295-025 : Delete recursive with leave root true | true",function(){
		
		var file = Rho.RhoFile.join(dirToDelete, "delete.txt")
		var fOpen = new Rho.RhoFile(file,1);
		Rho.RhoFile.makeDir(dirinDelete)
		expect(Rho.RhoFile.isDir(dirinDelete)).toEqual(true)
		expect(Rho.RhoFile.exists(file)).toEqual(true)
		Rho.RhoFile.deleteRecursive(dirToDelete,true)
		expect(Rho.RhoFile.isDir(dirToDelete)).toEqual(true)
		expect(Rho.RhoFile.exists(file)).toEqual(false)
		
	});	
	
	// Delete recursive with leave root false
	it("VT295-026 : Delete recursive with leave root false | true",function(){
		
		var file = Rho.RhoFile.join(dirToDelete, "delete.txt")
		var fOpen = new Rho.RhoFile(file,1);
		Rho.RhoFile.makeDir(dirinDelete)
		expect(Rho.RhoFile.isDir(dirinDelete)).toEqual(true)
		expect(Rho.RhoFile.exists(file)).toEqual(true)
		Rho.RhoFile.deleteRecursive(dirToDelete,false)
		expect(Rho.RhoFile.isDir(dirToDelete)).toEqual(false)
		expect(Rho.RhoFile.exists(file)).toEqual(false)
		
	});	
	
	// Delete recursive without leave root
	it("VT295-027 : Delete recursive without leave root  | true",function(){
		
		var file = Rho.RhoFile.join(dirToDelete, "delete.txt")
		var fOpen = new Rho.RhoFile(file,1);
		Rho.RhoFile.makeDir(dirinDelete)
		expect(Rho.RhoFile.isDir(dirinDelete)).toEqual(true)
		expect(Rho.RhoFile.exists(file)).toEqual(true)
		Rho.RhoFile.deleteRecursive(dirToDelete)
		expect(Rho.RhoFile.isDir(dirToDelete)).toEqual(true)
		expect(Rho.RhoFile.exists(file)).toEqual(false)
		
	});	
	
	// Delete recursive without parameters
	it("VT295-028 : Delete recursive without parameters  | false",function(){
		
		var file = Rho.RhoFile.join(dirToDelete, "delete.txt")
		Rho.RhoFile.deleteRecursive(dirToDelete)
		expect(Rho.RhoFile.isDir(dirToDelete)).toEqual(true)
		expect(Rho.RhoFile.exists(file)).toEqual(true)
		
	});
	
	// return directory name of directory
	it("VT295-029: get directory name   | true",function(){
		
		var name = Rho.RhoFile.dirname(dirName)
		name = Rho.RhoFile.join(name, "/")
		expect(name).toEqual(userFolder)
		
	});
	
	// file exists 
	it("VT295-031 : is File Exists | true ", function() {
			
		expect(Rho.RhoFile.exists(path)).toEqual(true)
			
	});	
	
	// file exists 
	it("VT295-032 : is File Exists | false", function() {
			
		expect(Rho.RhoFile.exists(invalidpath)).toEqual(false)
			
	});	
	
	// get File Size with valid path
	it("VT295-034: get file size   | true",function(){
		
		var size = Rho.RhoFile.getFileSize(path);
		if(size>0)
			flag = true
		else
			flag = false			
		expect(flag).toEqual(true)
	});
	
	// get File Size with valid directory path
	it("VT295-035: get file size with valid directory path   | false",function(){
		
		var size = Rho.RhoFile.getFileSize(userFolder);
		if(size>0)
			flag = true
		else
			flag = false			
		expect(flag).toEqual(false)
	});
	
	// get File Size with invalid  path
	it("VT295-036: get file size with invalid  path   | false",function(){
		
		var size = Rho.RhoFile.getFileSize(invalidpath);
		if(size>0)
			flag = true
		else
			flag = false			
		expect(flag).toEqual(false)
	});
	
	// isDir with valid path
	it(" VT295-037 : is directory present with valid path| true",function(){
		
		expect(Rho.RhoFile.isDir(dirName)).toEqual(true)
	});
	
	// is dir with valid filename
	it("VT295-038: is directory with valid filename  | false",function(){
		
		expect(Rho.RhoFile.isDir(path)).toEqual(false)
	});	
	
	// isDir with invalid path
	it(" VT295-039 : is directory present with invalid path| false",function(){
		
		expect(Rho.RhoFile.isDir(invalidDir)).toEqual(false)
	});
	
	// is file with valid file path
	it("VT295-040: isFile with valid filepath  | true",function(){
		
		expect(Rho.RhoFile.isFile(path)).toEqual(true)
	});
	
	// is file with valid directory
	it("VT295-041: isFile with valid directory  | false",function(){
		
		
		expect(Rho.RhoFile.isFile(userFolder)).toEqual(false)
	});
	
	// is file with invalid file path
	it("VT295-042: isFile with invalid filepath  | false",function(){
		
		
		expect(Rho.RhoFile.isFile(invalidpath)).toEqual(false)
		
	});	
	
	
	// isOpen File when opened
	it("VT295-044 : is opened ? | true",function(){
		
		f = new Rho.RhoFile(path,2);
		expect(f.isOpened()).toEqual(true);
		f.close()
		
	});
	
	// is Open File when not opened
	it("VT295-045 : is opened ? | false",function(){
		
		
		expect(f.isOpened()).toEqual(false);
		
	});
	
	// is Open with invalid file descriptor
	it("VT295-046 : is opened ? | false",function(){
		
		var fInvalid = new Rho.RhoFile(invalidpath,2);
		expect(fInvalid.isOpened()).toEqual(false);
		
	});
	
	
	// Join operation 
	it("VT295-047 : Join operation | true",function(){
		
		var actualString = userFolder + "RMS4"
		var dirName = Rho.RhoFile.join(userFolder,"RMS4")		
		expect(dirName).toEqual(actualString)
	});
	
	// Join operation 
	it("VT295-048 : Join operation with spaces| true",function(){
		
		var actualString = userFolder + "RMS4"
		var expectedName = Rho.RhoFile.join(userFolder,"  RMS4")		
		expect(expectedName).toEqual(actualString)
	});
	
	// lisDir of path
	it("VT295-049 : listDir | true",function(){
		
		var file = Rho.RhoFile.join(dirName, "Hello.txt")
		var fOpen = new Rho.RhoFile(file,1);
		var FileAPI = Rho.RhoFile.join(dirName, "TestFile")
		Rho.RhoFile.makeDir(FileAPI)
		expect(Rho.RhoFile.exists(file)).toEqual(true)
						
		var dirs = Rho.RhoFile.listDir(dirName);
		var length = dirs.length;
		if(dirs.length)
			flag = true
		else
			flag = false
		expect(flag).toEqual(true)
		expect(dirs).toEqual(['.','..','Hello.txt','TestFile','testing.txt'])
		
	});
	
	// lisDir with invalid path
	it("VT295-051 : listDir with invalid path | false",function(){
		
		var dirs = Rho.RhoFile.listDir(invalidpath);
		expect(dirs).toEqual(null)
		
	});
	
	
	// mkdir with valid
	it("VT295-052: make directory and is directory present| true",function(){
		
		var VT295052 = Rho.RhoFile.join(dirName, "VT295052")
		Rho.RhoFile.makeDir(VT295052)		
		expect(Rho.RhoFile.isDir(VT295052)).toEqual(true)
	});
	
	// mkdir with invalid path when all top level directories not exists
	it("VT295-053: make directory with invalid path | false",function(){
		
		Rho.RhoFile.makeDir(invalidDir)	
		expect(Rho.RhoFile.isDir(invalidDir)).toEqual(false)
	});
	
	// mkdir with invalid path when top level directories not exists
	it("VT295-054 : make directory with toplevel directories not present | false",function(){
		
		var VT295053 = Rho.RhoFile.join(dirName, "VT295053/TestingDir")
		Rho.RhoFile.makeDir(VT295053)		
		expect(Rho.RhoFile.isDir(VT295053)).toEqual(false)
	});
	
	// mkdir with invalid characters
	it("VT295-056: make directory and is directory present| false",function(){
		
		var VT295056 = Rho.RhoFile.join(dirName, "/\:*?<>|")
		Rho.RhoFile.makeDir(VT295056)
		expect(Rho.RhoFile.isDir(VT295056)).toEqual(false)
	});
	
	// mkdir with special characters
	it("VT295-057: make directory with special characters| true",function(){
		
		var VT295057 = Rho.RhoFile.join(dirName, "Test!@#")
		Rho.RhoFile.makeDir(VT295057)		
		expect(Rho.RhoFile.isDir(VT295057)).toEqual(true)
	});
	
	// mkdirs with valid
	it("VT295-058: make directory with mkdirs | true",function(){
		
		var VT295058 = Rho.RhoFile.join(dirName, "VT295058")
		Rho.RhoFile.makeDirs(VT295058)		
		expect(Rho.RhoFile.isDir(VT295058)).toEqual(true)
	});
	
	// mkdirs with invalid path when all top level directories not exists
	it("VT295-059: makedirs with invalid path | true",function(){
		
		var VT295059 = "C:/RaghavendraKC/Testing"
		Rho.RhoFile.makeDirs(VT295059)	
		expect(Rho.RhoFile.isDir(VT295059)).toEqual(true)
	});
	
	// mkdir with invalid path when top level directories not exists
	it("VT295-060 : make directory with toplevel directories not present | true",function(){
		
		var VT295060 = Rho.RhoFile.join(dirName, "VT295060/TestingDir")
		Rho.RhoFile.makeDirs(VT295060)		
		expect(Rho.RhoFile.isDir(VT295060)).toEqual(true)
	});
	
	// mkdir with invalid characters
	it("VT295-062: make directory and is directory present| false",function(){
		
		var VT295062 = Rho.RhoFile.join(dirName, "/\:*?<>|")
		Rho.RhoFile.makeDirs(VT295062)
		expect(Rho.RhoFile.isDir(VT295062)).toEqual(false)
	});
	
	// mkdir with special characters
	it("VT295-063: make directory with special characters| true",function(){
		
		var VT295063 = Rho.RhoFile.join(dirName, "Test!@#$")
		Rho.RhoFile.makeDirs(VT295063)		
		expect(Rho.RhoFile.isDir(VT295063)).toEqual(true)
	});	
		
	
	//open file with mode 1 on file which does not exists
	it("VT295-064 : open file with mode 1 on file not exists | true",function(){
		
		
		var fOpen = new Rho.RhoFile(fileMode1,1);
		expect(Rho.RhoFile.exists(fileMode1)).toEqual(true)
		var writeValue = fOpen.write(Text1)
		fOpen.close();
		
	});
	
	// open file with mode 1 on file which exists
	it("VT295-065 : open file with mode 1 on file exists| true",function(){
		
		var fOpen = new Rho.RhoFile(fileMode1,1);
		expect(Rho.RhoFile.exists(fileMode1)).toEqual(true)
		var writeValue = fOpen.write(Text2)
		fOpen.close();
		
	});
	
	
	//open file with mode 2 on file which does not exists
	it("VT295-066 : open file with mode 2 on file not exists | true",function(){
		
		
		var fOpen = new Rho.RhoFile(fileMode2,2);
		expect(Rho.RhoFile.exists(fileMode2)).toEqual(false)
		fOpen.close();
		
	});
	
	// open file with mode 2 on file which exists
	it("VT295-067 : open file with mode 2 on file exists| true",function(){
		
		var fOpen = new Rho.RhoFile(fileMode1,Rho.RhoFile.OPEN_FOR_READ);
		expect(Rho.RhoFile.exists(fileMode1)).toEqual(true)
		var actual = fOpen.readAll();
		//Rho.Log.info(actual, "VT290-065");
		fOpen.close();
		
	});
	
	
	//open file with mode 4 on file which does not exists
	it("VT295-070 : open file with mode 4 on file not exists | true",function(){
		
		
		var fOpen = new Rho.RhoFile(fileMode4,Rho.RhoFile.OPEN_FOR_READ_WRITE);
		expect(Rho.RhoFile.exists(fileMode4)).toEqual(false)
		fOpen.close();
		
	});
	
	// open file with mode 4 on file which exists
	it("VT295-071 : open file with mode 4 on file exists| false",function(){
		
		var fOpen = new Rho.RhoFile(fileMode1,Rho.RhoFile.OPEN_FOR_READ_WRITE);
		expect(Rho.RhoFile.exists(fileMode1)).toEqual(true)
		var writeValue = fOpen.write(Text4)
		var actual = fOpen.readAll();
		Rho.Log.info(actual, "VT290-071");
		fOpen.close();
		
	});
	
	//open file with mode 3 on file which does not exists
	it("VT295-068 : open file with mode 3 on file not exists | true",function(){
		
		
		var fOpen = new Rho.RhoFile(fileMode3,Rho.RhoFile.OPEN_FOR_WRITE);
		expect(Rho.RhoFile.exists(fileMode3)).toEqual(true)
		fOpen.close();
		
	});
	
	// open file with mode 3 on file which exists
	it("VT295-069 : open file with mode 2 on file exists| true",function(){
		
		var fOpen = new Rho.RhoFile(fileMode3,Rho.RhoFile.OPEN_FOR_WRITE);
		expect(Rho.RhoFile.exists(fileMode3)).toEqual(true)
		fOpen.close();
		
	});	
	
	// Read File with path
	it("VT295-072 : Read contents with path| true",function(){
		var data = Rho.RhoFile.read(path)
		if(data.length)
			flag = true
		else
			flag = false;
		expect(flag).toEqual(true);
		Rho.Log.info(data, "VT290-072");
	});
	
	// Read File with invalid path
	it("VT295-073 : Read contents with invalid path| false",function(){
		var data = Rho.RhoFile.read(invalidpath)
		if(data.length)
			flag = false
		else
			flag = true;
		expect(flag).toEqual(true);
		Rho.Log.info(data, "VT290-073");
	});
	
	// Read with specified size 
	it("VT295-074 : Read contents with specified size| true",function(){
		
		var fOpen = new Rho.RhoFile(path,Rho.RhoFile.OPEN_FOR_READ);
		var data = fOpen.read(20)
		if(data.length)
			flag = true
		else
			flag = false;
		expect(flag).toEqual(true);
		Rho.Log.info(data, "VT290-074");
		fOpen.close()
	});
	
	
	// Read with specified size with mentioned position
	it("VT295-075 : Read contents with specified size with mentioned position| true",function(){
		var fOpen = new Rho.RhoFile(path,Rho.RhoFile.OPEN_FOR_READ);
		fOpen.seek(20)
		var data = fOpen.read(20)
		if(data.length)
			flag = true
		else
			flag = false;
		expect(flag).toEqual(true);
		Rho.Log.info(data, "VT290-075");
		fOpen.close()
	});
	
	// Read with specified size with invalid filename 
	it("VT295-077 : Read with specified size with invalid filename| false",function(){
		var fOpen = new Rho.RhoFile(invalidpath,2);
		var data = fOpen.read(20)
		if(data.length)
			flag = false
		else
			flag = true;
		expect(flag).toEqual(true);	
		fOpen.close()
	});
	
	
	// ReadAll with valid file path
	it("VT295-078 : ReadAll with valid file path| true",function(){
		var fOpen = new Rho.RhoFile(path,Rho.RhoFile.OPEN_FOR_READ);
		var data = fOpen.readAll()
		if(data.length)
			flag = true
		else
			flag = false;
		expect(flag).toEqual(true);
		Rho.Log.info(data, "VT290-078");
		fOpen.close()
	});
	
	// ReadAll with invalid file path
	it("VT295-079 : ReadAll with invalid file path| false",function(){
		var fOpen = new Rho.RhoFile(invalidpath,Rho.RhoFile.OPEN_FOR_READ);
		var data = fOpen.readAll()
		if(data.length)
			flag = false
		else
			flag = true
		expect(flag).toEqual(true);
		Rho.Log.info(data, "VT290-079");
		fOpen.close()
	});
	
	
	// rename with valid source and destination path
	it("VT295-080 : rename with valid source and destination path| true",function(){
		
		f = new Rho.RhoFile(fileMode4,Rho.RhoFile.OPEN_FOR_APPEND);
		f.close();
		expect(Rho.RhoFile.exists(fileMode4)).toEqual(true)
		var newName = Rho.RhoFile.join(userFolder,"Rename.txt")			
		expect(Rho.RhoFile.rename(fileMode4, newName)).toEqual(0)	
		expect(Rho.RhoFile.exists(newName)).toEqual(true)
		expect(Rho.RhoFile.deleteFile(newName)).toEqual(0)	
		
	});	
	
	// rename with valid source and destination path
	it("VT295-084 : rename with valid source and destination path| true",function(){
		
		var oldName = Rho.RhoFile.join(userFolder,"same.txt")	
		f = new Rho.RhoFile(oldName,Rho.RhoFile.OPEN_FOR_APPEND);
		f.close();
		var newName = Rho.RhoFile.join(userFolder,"Changed.txt")		
		expect(Rho.RhoFile.rename(oldName, newName)).toEqual(0)
		expect(Rho.RhoFile.exists(newName)).toEqual(true)	
		expect(Rho.RhoFile.deleteFile(newName)).toEqual(0)
		
	});	
	
	// rename with invalid source name and valid destination path
	it("VT295-085 : rename with invalid source name and valid destination path| false",function(){
		
		var oldName = Rho.RhoFile.join(invalidpath,"invalid.txt")	
		var newName = Rho.RhoFile.join(userFolder,"updated.txt")	
		expect(Rho.RhoFile.rename(oldName, newName)).toEqual(-1)
		expect(Rho.RhoFile.exists(newName)).toEqual(false)		
		
	});	
	
	// rename with invalid source name and valid destination path
	it("VT295-086 : rename with invalid source name and valid destination path| false",function(){
		
		var oldName = Rho.RhoFile.join(userFolder,"Changed.txt")	
		var newName = Rho.RhoFile.join(invalidpath,"invalid.txt")	
		expect(Rho.RhoFile.rename(oldName, newName)).toEqual(-1)
		expect(Rho.RhoFile.exists(newName)).toEqual(false)		
		
	});	
	
	// rename without parameters
	it("VT295-087 : rename without parameters| false",function(){
		
		expect(Rho.RhoFile.rename(null,null)).toEqual(-1)
		
		
	});	
	
	
	// seek with value 10
	it("VT295-089 : seek value 10| true",function(){
		
		var fOpen = new Rho.RhoFile(fileMode1,Rho.RhoFile.OPEN_FOR_READ_WRITE);
		expect(Rho.RhoFile.exists(fileMode1)).toEqual(true)
		var writeValue = fOpen.write(Text1)
		var writeValue = fOpen.write(Text2)		
		fOpen.seek(10)
		fOpen.write("Test")
		var content = fOpen.readAll()
		Rho.Log.info(content, "VT290-078");	
		fOpen.close()
	});
	
	// seek with value out of size
	it("VT295-090 : seek value out of size | true",function(){
		
		var fOpen = new Rho.RhoFile(fileMode1,Rho.RhoFile.OPEN_FOR_READ_WRITE);
		expect(Rho.RhoFile.exists(fileMode1)).toEqual(true)
		var writeValue = fOpen.write(Text1)
		var writeValue = fOpen.write(Text2)		
		fOpen.seek(100)
		fOpen.write("Test")
		var content = fOpen.readAll()
		Rho.Log.info(content, "VT290-090");	
		fOpen.close()
	});
	
	// file size
	it("VT295-092 : file size | true",function(){
		
		var fOpen = new Rho.RhoFile(path,Rho.RhoFile.OPEN_FOR_READ)
		var fileSize = fOpen.size()
		if(fileSize > 2500)
			flag = true
		else
			flag = false
		expect(flag).toEqual(true)
		Rho.Log.info("size:" + fileSize, "VT290-092");
		fOpen.close()
		
	});
	
	// file size on empty file
	it("VT295-093 : file size on empty file | true",function(){
		
		var fOpen = new Rho.RhoFile(fileMode1,Rho.RhoFile.OPEN_FOR_READ_WRITE)
		var fileSize = fOpen.size()
		if(fileSize)
			flag = true
		else
			flag = false
		expect(flag).toEqual(true)
		Rho.Log.info("size:" + fileSize, "VT290-093");	
		fOpen.close()
		
	});
	
	
	// Write beginning
	it("VT295-094 : Write beginning | true",function(){
		
		if (Rho.RhoFile.exists(fileMode5))
			Rho.RhoFile.deleteFile(fileMode5)
			
		var fWrite = new Rho.RhoFile(fileMode5,Rho.RhoFile.OPEN_FOR_READ_WRITE);
		var fRead = new Rho.RhoFile(fileMode5,Rho.RhoFile.OPEN_FOR_READ_WRITE);
		expect(Rho.RhoFile.exists(fileMode5)).toEqual(true)
		var written = fWrite.write(Text1)
		fWrite.close()
		var content = fRead.readAll()
		expect(content).toEqual(Text1)
		//Rho.Log.info(written + ":" + content, "VT290-094");
		
		fRead.close()
		
	});


	// Write at the end
	it("VT295-095 : Write end | true",function(){
		
		var fWrite = new Rho.RhoFile(fileMode5,Rho.RhoFile.OPEN_FOR_APPEND);
		var fRead = new Rho.RhoFile(fileMode5,Rho.RhoFile.OPEN_FOR_READ_WRITE);
		expect(Rho.RhoFile.exists(fileMode5)).toEqual(true)
		var written = fWrite.write(Text2)
		fWrite.close()
		var content = fRead.readAll()
		expect(content).toEqual(expected)
		//Rho.Log.info(written + ":" + content, "VT290-094");
		
		fRead.close()
		
	});


	// Write in between
	it("VT295-096 : Write in between  | true",function(){
		
		var fWrite = new Rho.RhoFile(fileMode5,Rho.RhoFile.OPEN_FOR_READ_WRITE);
		var fRead = new Rho.RhoFile(fileMode5,Rho.RhoFile.OPEN_FOR_READ_WRITE);
		expect(Rho.RhoFile.exists(fileMode5)).toEqual(true)
		fWrite.seek(8)
		data = "the "
		var written = fWrite.write(data)
		fWrite.close()
		var expectedString = "This is the RMS4.0 File Testing.Thank you."
		var content = fRead.readAll()
		expect(content).toEqual(expected)
		//Rho.Log.info(written + ":" + content, "VT290-094");
		
		fRead.close()
		
	});

	// Flush
	it("VT295-097 : flush | true",function(){
		
		
		data = 'mydata';
		
		var fileForRead = new Rho.RhoFile(fileMode5,Rho.RhoFile.OPEN_FOR_READ);
		var fileForWrite = new Rho.RhoFile(fileMode5,Rho.RhoFile.OPEN_FOR_WRITE);

		fileForWrite.write(data);
		fileForWrite.close();
		var actual = fileForRead.readAll()
		Rho.Log.info(actual, "VT290-097");
		expect(actual).toEqual(data);

		fileForRead.close();
		
	});
	
	
	
	
	
		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		
		
		
		
		
		
		
		
	




});