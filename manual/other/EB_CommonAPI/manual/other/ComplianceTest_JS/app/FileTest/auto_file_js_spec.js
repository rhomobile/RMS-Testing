describe("File JS API", function () {

	var userFolder = EB.Application.userFolder;
	var publicFolder = EB.RhoFile.join(EB.Application.publicFolder);
	var fileName = "rhoconfig.txt";
	var testReadPath = EB.RhoFile.join(EB.Application.appsBundleFolder, "rhoconfig.txt");
	var invalidpath = "/programFiles/Test/rholog.txt";
	var dirName = EB.RhoFile.join(userFolder,"RMS4");
	var destFileName = EB.RhoFile.join(userFolder,"testing_copy.txt");
	var destFilePath = EB.RhoFile.join(publicFolder,fileName);
	var invalidDir = "/programFiles/Test/";
	var path = EB.RhoFile.join(EB.Application.userFolder, "testFile.txt");
	var dirToDelete = EB.RhoFile.join(userFolder,"TestDelete");
	var dirinDelete = EB.RhoFile.join(dirToDelete,"InDelete");
	var openTestFile = EB.RhoFile.join(dirName, "testing.txt");
	var fileMode1 = EB.RhoFile.join(dirName, "Mode1.txt");
	var fileMode2 = EB.RhoFile.join(dirName, "Mode2.txt");
	var fileMode3 = EB.RhoFile.join(dirName, "Mode3.txt");
	var fileMode4 = EB.RhoFile.join(dirName, "Mode4.txt");
	var fileMode5 = EB.RhoFile.join(dirName, "Mode5.txt");

	var Text1 = "This is RMS4.0 File Testing.";
	var Text2 = "Thank you.";
	var Text3 = "This is from File Open mode 4\n";

	var expectedText = Text1+Text2;
	var Text4 = EB.RhoFile.join(Text1,Text3);
	var Text5 = EB.RhoFile.join(Text4,Text2);

	String.prototype.overwrite = function (index, string) {
		var strlen = string.length;
		var curlen = this.length;
		if (index >= 0 && strlen > 0)
			if (index + strlen < curlen)
				return this.substring(0, index) + string + this.substring(index+strlen, this.length)
			else {
				if (index <= curlen)
					return this.substring(0, index) + string;
				else
					return this.substring(0, index) + Array(index-curlen+1).join("\0") + string;
			}
		else
			return string;
	};


	beforeEach(function () {
		var flag = false;
	});

	// this function will execute after each of test case execution i.e it function
	afterEach(function () {

	});


	it("Basic test - before all",function(){
		// cleanup before global run
		var filesToDelete = [fileMode1, fileMode2, fileMode3, fileMode4, fileMode5, path];
		for (var idx = 0; idx < filesToDelete.length; ++idx)
		{
			var file = filesToDelete[idx];
			if (EB.RhoFile.exists(file))
			{
				EB.RhoFile.deleteFile(file);
			}
		}

		var fWrite = new EB.RhoFile(path,EB.RhoFile.OPEN_FOR_READ_WRITE);
		fWrite.write(Text5);
		fWrite.close();

		var fOpen = new EB.RhoFile(path,EB.RhoFile.OPEN_FOR_READ);
		var data = fOpen.readAll();
		expect(!!data && !!data.length && data.length > 0).toEqual(true);
		expect(data).toEqual(Text5);
		fOpen.close();

		// cleanup for each run
		var dirsToDelete = ["VT295052","/\\:*?<>|","Test!@#"];
		for (var idx = 0; idx < dirsToDelete.length; ++idx)
		{
			var dir = EB.RhoFile.join(dirName, dirsToDelete[idx]);
			if (EB.RhoFile.exists(dir))
			{
				EB.RhoFile.deleteDir(dir);
			}
		}
	});

	// Get basename of file
	it("VT295-001 : get basename of file | 1", function() {
		runs(function(){


			var baseName =EB.RhoFile.basename(testReadPath);
			expect(baseName).toEqual(fileName);
			EB.Log.info("Test1", "VT290-001");
			EB.Log.info(EB.Application.userFolder, "VT290-001");
			EB.Log.info(EB.Application.publicFolder, "VT290-001");

		});
	});


	var f = [];

	// open file
	it("Open File", function() {

		f = new EB.RhoFile(path,EB.RhoFile.OPEN_FOR_READ);
		expect(typeof(f)).toEqual('object');
		expect(f.isOpened()).toEqual(true);
	});

	// close with valid path
	it("VT295-003 : is close ? | true",function(){
		expect(f.isOpened()).toEqual(true);
		f.close();
		expect(typeof(f)).toEqual('object');
		expect(f.isOpened()).toEqual(false);
	});

	//close when file not opened
	it("VT295-004 : is close ? | false",function(){

		f.close();
		expect(f.isOpened()).toEqual(false);
		expect(typeof(f)).toEqual('object');
		expect(f.isOpened()).toEqual(false);
	});



	// copy from and to with valid path
	it("VT295-005 : Copy with valid parameters | true",function(){
		//var dirName = EB.RhoFile.join(path,"RMS4")
		EB.RhoFile.deleteRecursive(dirName);

		EB.RhoFile.makeDir(dirName);
		var fromPath = EB.RhoFile.join(userFolder, "testing.txt");
		var fOpen = new EB.RhoFile(fromPath,EB.RhoFile.OPEN_FOR_APPEND);
		expect(EB.RhoFile.exists(fromPath)).toEqual(true);
		fOpen.close();
		var toPath = EB.RhoFile.join(dirName, "testing.txt");
		var result = EB.RhoFile.copy(fromPath,toPath);
		expect(result).toEqual(0);
		EB.Log.info(fromPath, "VT290-005");
		EB.Log.info(dirName, "VT290-005");
		expect(EB.RhoFile.exists(dirName)).toEqual(true);
	});

	// copy from and to with same path
	it("VT295-006 : Copy to same folder | false",function(){
		//var dirName = EB.RhoFile.join(path,"RMS4")
		var fromPath = EB.RhoFile.join(userFolder, "testing.txt");
		var result = EB.RhoFile.copy(fromPath,userFolder);
		expect(result).toEqual(-1);
		EB.Log.info(fromPath, "VT290-006");
		EB.Log.info(userFolder, "VT290-006");
		expect(EB.RhoFile.exists(dirName)).toEqual(true);
	});


/* Negative test
	// copy from and to with invalid source path
	it("VT295-008 : Copy with invalid source path | false",function(){

		EB.RhoFile.makeDir(dirName);
		var fromPath = EB.RhoFile.join(userFolder, "invalidtesting.txt");
		var result = EB.RhoFile.copy(fromPath,destFileName);
		expect(result).toEqual(-1);
	});
*/
	// copy without parameters
	it("VT295-011 : Copy without parameters | false",function(){

		EB.RhoFile.makeDir(dirName);
		var fromPath = EB.RhoFile.join(userFolder, "invalidtesting.txt");
		var result = EB.RhoFile.copy(null,null);
		expect(result).toEqual(-1);
	});

			// Delete recursive with leave root true
	it("VT295-022 : Delete recursive with leave root true | true",function(){


		EB.RhoFile.makeDir(dirToDelete);
		var file = EB.RhoFile.join(dirToDelete, "delete.txt");
		var fOpen = new EB.RhoFile(file,EB.RhoFile.OPEN_FOR_APPEND);
		fOpen.close();
		EB.RhoFile.makeDir(dirinDelete);
		expect(EB.RhoFile.isDir(dirinDelete)).toEqual(true);
		expect(EB.RhoFile.exists(file)).toEqual(true);
		EB.RhoFile.deleteRecursive(dirToDelete,true);
		expect(EB.RhoFile.isDir(dirToDelete)).toEqual(true);
		expect(EB.RhoFile.isDir(dirinDelete)).toEqual(false);
		expect(EB.RhoFile.exists(file)).toEqual(false);

	});

	// Delete recursive with leave root false
	it("VT295-023 : Delete recursive with leave root false | true",function(){

		EB.RhoFile.makeDir(dirToDelete);
		var file = EB.RhoFile.join(dirToDelete, "delete.txt");
		var fOpen = new EB.RhoFile(file,EB.RhoFile.OPEN_FOR_APPEND);
		fOpen.close();
		EB.RhoFile.makeDir(dirinDelete);
		expect(EB.RhoFile.isDir(dirinDelete)).toEqual(true);
		expect(EB.RhoFile.exists(file)).toEqual(true);
		EB.RhoFile.deleteRecursive(dirToDelete,false);
		expect(EB.RhoFile.isDir(dirToDelete)).toEqual(false);
		expect(EB.RhoFile.isDir(dirinDelete)).toEqual(false);
		expect(EB.RhoFile.exists(file)).toEqual(false);

	});

	// Delete recursive without leave root
	it("VT295-024 : Delete recursive without leave root  | true",function(){

		EB.RhoFile.makeDir(dirToDelete);
		var file = EB.RhoFile.join(dirToDelete, "delete.txt");
		var fOpen = new EB.RhoFile(file,EB.RhoFile.OPEN_FOR_APPEND);
		fOpen.close();
		EB.RhoFile.makeDir(dirinDelete);
		expect(EB.RhoFile.isDir(dirinDelete)).toEqual(true);
		expect(EB.RhoFile.exists(file)).toEqual(true);
		EB.RhoFile.deleteRecursive(dirToDelete);
		expect(EB.RhoFile.isDir(dirToDelete)).toEqual(false);
		expect(EB.RhoFile.isDir(dirinDelete)).toEqual(false);
		expect(EB.RhoFile.exists(file)).toEqual(false);

	});



	// Delete directory without contents
	it("VT295-012 : Delete directory without contents | true",function(){
		EB.RhoFile.deleteRecursive(dirToDelete);

		EB.RhoFile.makeDir(dirToDelete);
		expect(EB.RhoFile.isDir(dirToDelete)).toEqual(true);
		expect(EB.RhoFile.deleteDir(dirToDelete)).toEqual(0);
		expect(EB.RhoFile.isDir(dirToDelete)).toEqual(false)

	});

	// Delete directory with contents
	it("VT295-013 : Delete directory with contents | false",function(){
		EB.RhoFile.deleteRecursive(dirToDelete);

		EB.RhoFile.makeDir(dirToDelete);
		expect(EB.RhoFile.isDir(dirToDelete)).toEqual(true);
		var file = EB.RhoFile.join(dirToDelete, "delete.txt");
		var fOpen = new EB.RhoFile(file,EB.RhoFile.OPEN_FOR_APPEND);
		fOpen.close();
		expect(EB.RhoFile.exists(file)).toEqual(true);
		expect(EB.RhoFile.deleteDir(dirToDelete)).toEqual(-1);
		expect(EB.RhoFile.isDir(dirToDelete)).toEqual(true);
		expect(EB.RhoFile.exists(file)).toEqual(true);

	});

	// Delete directory with invalid path
	it("VT295-014 : Delete directory with invalid path | path",function(){

		expect(EB.RhoFile.deleteDir(invalidDir)).toEqual(-1);
	});

	// Delete directory without parameters
	it("VT295-015 : Delete directory without parameters | false",function(){

		expect(EB.RhoFile.deleteDir(null)).toEqual(-1);

	});

	// Delete directory with contents folder and files
	it("VT295-017 : Delete directory with contents folders and files | false",function(){
		EB.RhoFile.deleteRecursive(dirToDelete);

		EB.RhoFile.makeDir(dirToDelete);
		expect(EB.RhoFile.isDir(dirToDelete)).toEqual(true);
		var file = EB.RhoFile.join(dirToDelete, "delete.txt");
		var fOpen = new EB.RhoFile(file,EB.RhoFile.OPEN_FOR_APPEND);
		fOpen.close();
		EB.RhoFile.makeDir(dirinDelete);
		expect(EB.RhoFile.isDir(dirinDelete)).toEqual(true);
		expect(EB.RhoFile.exists(file)).toEqual(true);
		expect(EB.RhoFile.deleteDir(dirToDelete)).toEqual(-1);
	});

	// delete file with path
	it("VT295-018 : Delete file with valid path| true",function(){

		var fOpen = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_APPEND);
		fOpen.close();
		expect(EB.RhoFile.exists(fileMode1)).toEqual(true);
		expect(EB.RhoFile.deleteFile(fileMode1)).toEqual(0);
		expect(EB.RhoFile.exists(fileMode1)).toEqual(false);


	});

	// delete file with invalid file path
	it("VT295-019 : Delete file with invalid file path | false",function(){

		//var file = EB.RhoFile.join(dirToDelete, "delete.txt")
		var deleteFile = EB.RhoFile.join(userFolder, "testing2.txt");
		EB.Log.info(deleteFile, "VT290-019");
		expect(EB.RhoFile.deleteFile(deleteFile)).toEqual(-1);
		expect(EB.RhoFile.exists(deleteFile)).toEqual(false);

	});

	// delete file without parameter
	it("VT295-020 : Delete file without parameter | false",function(){

		//var file = EB.RhoFile.join(dirToDelete, "delete.txt")
		var deleteFile = EB.RhoFile.join(userFolder, "testing2.txt");
		EB.Log.info(deleteFile, "VT290-020");
		expect(EB.RhoFile.deleteFile(null)).toEqual(-1);
		expect(EB.RhoFile.exists(deleteFile)).toEqual(false);

	});



	// return directory name of directory
	it("VT295-026: get directory name   | true",function(){

		var name = EB.RhoFile.dirname(dirName);
		name = EB.RhoFile.join(name, "/");
		expect(name).toEqual(userFolder);

	});

	// file exists
	it("VT295-027 : is File Exists | true ", function() {

		expect(EB.RhoFile.exists(testReadPath)).toEqual(true);

	});

	// file exists
	it("VT295-028 : is File Exists | false", function() {

		expect(EB.RhoFile.exists(invalidpath)).toEqual(false);

	});

	// get File Size with valid path
	it("VT295-030: get file size   | true",function(){

		var size = EB.RhoFile.getFileSize(testReadPath);
		expect(size > 0).toEqual(true);
	});

	// get File Size with valid directory path
	it("VT295-031: get file size with valid directory path   | false",function(){

		var size = EB.RhoFile.getFileSize(userFolder);
		expect(size > 0).toEqual(false);
	});

	// get File Size with invalid  path
	it("VT295-032: get file size with invalid  path   | false",function(){

		var size = EB.RhoFile.getFileSize(invalidpath);
		expect(size > 0).toEqual(false);
	});

	// isDir with valid path
	it(" VT295-033 : is directory present with valid path| true",function(){

		expect(EB.RhoFile.isDir(dirName)).toEqual(true);
	});

	// is dir with valid filename
	it("VT295-034: is directory with valid filename  | false",function(){

		expect(EB.RhoFile.isDir(testReadPath)).toEqual(false);
	});

	// isDir with invalid path
	it(" VT295-035 : is directory present with invalid path| false",function(){

		expect(EB.RhoFile.isDir(invalidDir)).toEqual(false);
	});

	// is file with valid file path
	it("VT295-046: isFile with valid filepath  | true",function(){

		expect(EB.RhoFile.isFile(testReadPath)).toEqual(true);
	});

	// is file with valid directory
	it("VT295-037: isFile with valid directory  | false",function(){


		expect(EB.RhoFile.isFile(userFolder)).toEqual(false);
	});

	// is file with invalid file path
	it("VT295-038: isFile with invalid filepath  | false",function(){

		expect(EB.RhoFile.isFile(invalidpath)).toEqual(false);

	});


	// isOpen File when opened
	it("VT295-039 : is opened ? | true",function(){

		f = new EB.RhoFile(path,2);
		expect(f.isOpened()).toEqual(true);
		f.close();

	});

	// is Open File when not opened
	it("VT295-040 : is opened ? | false",function(){


		expect(f.isOpened()).toEqual(false);

	});

	// is Open with invalid file descriptor
	it("VT295-041 : is opened ? | false",function(){

		var fInvalid = new EB.RhoFile(invalidpath,EB.RhoFile.OPEN_FOR_READ);
		expect(fInvalid.isOpened()).toEqual(false);

		fInvalid.close();

	});


	// Join operation
	it("VT295-042 : Join operation | true",function(){

		var actualString = userFolder + "RMS4";
		var dirName = EB.RhoFile.join(userFolder,"RMS4");
		expect(dirName).toEqual(actualString);
	});

	// Join operation
	it("VT295-043 : Join operation with spaces| true",function(){

		var actualString = userFolder + "RMS4";
		var expectedName = EB.RhoFile.join(userFolder,"  RMS4");
		expect(expectedName).not.toMatch(actualString);
	});


	// lisDir of path
	it("VT295-044 : listDir | true",function(){

		var file = EB.RhoFile.join(dirName, "Hello.txt");
		var fOpen = new EB.RhoFile(file,EB.RhoFile.OPEN_FOR_APPEND);
		fOpen.close();
		var FileAPI = EB.RhoFile.join(dirName, "TestFile");
		EB.RhoFile.makeDir(FileAPI);
		expect(EB.RhoFile.exists(file)).toEqual(true);

		var dirs = EB.RhoFile.listDir(dirName);
		expect(dirs && dirs.length && dirs.length > 0).toEqual(true);

		var length = dirs.length;
		// some files could be created during previous tests runs
		// just test that all files listed below are in directory
		var expected = ['.','..','Hello.txt','TestFile','testing.txt'];
		var count = 0;
		for(var j = 0; j < length; j++)
		{
			if (expected.indexOf(dirs[j]) > -1)
			{
				count++;
			}
		}
		expect(count).toEqual(expected.length);

	});

	// lisDir with invalid path
	it("VT295-045 : listDir with invalid path | false",function(){

		var dirs = EB.RhoFile.listDir(invalidpath);
		expect(dirs).toEqual(null);

	});


	// mkdir with valid
	it("VT295-046: make directory and is directory present| true",function(){

		var testDirName = EB.RhoFile.join(dirName, "VT295052");
		EB.RhoFile.makeDir(testDirName);
		expect(EB.RhoFile.isDir(testDirName)).toEqual(true);
	});

	// mkdir with invalid path when all top level directories not exists
	it("VT295-047: make directory with invalid path | false",function(){

		EB.RhoFile.makeDir(invalidDir);
		expect(EB.RhoFile.isDir(invalidDir)).toEqual(false)
	});

	// mkdir with invalid path when some of top level directories not exists
	it("VT295-048 : make directory with some of toplevel directories not present | false",function(){

		var testDirName = EB.RhoFile.join(dirName, "VT295053/TestingDir");
		EB.RhoFile.makeDir(testDirName);
		expect(EB.RhoFile.isDir(testDirName)).toEqual(false);
	});


	// mkdirs with valid
	it("VT295-051: make directory with mkdirs | true",function(){

		var testDirName = EB.RhoFile.join(dirName, "VT295058");
		EB.RhoFile.makeDirs(testDirName);
		expect(EB.RhoFile.isDir(testDirName)).toEqual(true);
	});

	
	// mkdirs with invalid path when all top level directories not exists
	it("VT295-052: makedirs with invalid path | true",function(){

		var testDirName = "K:/RaghavendraKC/Testing";
		EB.RhoFile.makeDirs(testDirName);
		expect(EB.RhoFile.isDir(testDirName)).toEqual(false);
	});

	// mkdir with invalid path when top level directories not exists
	it("VT295-053 : make directory with toplevel directories not present | true",function(){

		var testDirName = EB.RhoFile.join(dirName, "VT295060/TestingDir");
		EB.RhoFile.makeDirs(testDirName);
		expect(EB.RhoFile.isDir(testDirName)).toEqual(true);
	});

	// mkdirs with valid characters
	it("VT295-054: make directory and is directory present| true",function(){

		var testDirName = EB.RhoFile.join(dirName, "VT295058");
		EB.RhoFile.makeDirs(testDirName);
		expect(EB.RhoFile.isDir(testDirName)).toEqual(true);
	});

	//open file with mode 1 on file which does not exists
	it("VT295-056 : open file with mode 1 on file not exists | true",function(){


		var fOpen = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_APPEND);
		expect(EB.RhoFile.exists(fileMode1)).toEqual(true);
		var writeValue = fOpen.write(Text1);
		fOpen.close();

	});

	// open file with mode 1 on file which exists
	it("VT295-057 : open file with mode 1 on file exists| true",function(){

		var fOpen = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_APPEND);
		expect(EB.RhoFile.exists(fileMode1)).toEqual(true);
		var writeValue = fOpen.write(Text2);
		fOpen.close();

	});


	//open file with mode 2 on file which does not exists
	it("VT295-058 : open file with mode 2 on file not exists | true",function(){


		var fOpen = new EB.RhoFile(fileMode2,EB.RhoFile.OPEN_FOR_READ);
		expect(EB.RhoFile.exists(fileMode2)).toEqual(false);
		fOpen.close();

	});

	// open file with mode 2 on file which exists
	it("VT295-059 : open file with mode 2 on file exists| true",function(){

		var fOpen = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_READ);
		expect(EB.RhoFile.exists(fileMode1)).toEqual(true);
		var actual = fOpen.readAll();
		//EB.Log.info(actual, "VT290-065");
		fOpen.close();

	});


	//open file with mode 4 on file which does not exists
	it("VT295-062 : open file with mode 4 on file not exists | true",function(){


		var fOpen = new EB.RhoFile(fileMode4,EB.RhoFile.OPEN_FOR_READ_WRITE);
		expect(EB.RhoFile.exists(fileMode4)).toEqual(true);
		fOpen.close();

	});

	// open file with mode 4 on file which exists
	it("VT295-063 : open file with mode 4 on file exists| false",function(){

		var fWrite = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_WRITE);
		fWrite.flush();
		fWrite.close();

		var fWrite = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_READ_WRITE);
		var fRead = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_READ_WRITE);
		expect(EB.RhoFile.exists(fileMode1)).toEqual(true);
		var writeValue = fWrite.write(Text1);
		fWrite.close();

		var actual = fRead.readAll();
		expect(actual).toEqual(Text1);
		EB.Log.info(actual, "VT290-071");
		fRead.close();

	});

	//open file with mode 3 on file which does not exists
	it("VT295-060 : open file with mode 3 on file not exists | true",function(){


		var fWrite = new EB.RhoFile(fileMode3,EB.RhoFile.OPEN_FOR_WRITE);
		expect(EB.RhoFile.exists(fileMode3)).toEqual(true);
		var written = fWrite.write(Text1);
		fWrite.close();

		var fRead = new EB.RhoFile(fileMode3,EB.RhoFile.OPEN_FOR_READ);
		var actualString = fRead.readAll();
		expect(actualString).toEqual(Text1);
		fRead.close();

	});


	// open file with mode 3 on file which exists
	it("VT295-061 : open file with mode 3 on file exists| true",function(){

		var fOpen = new EB.RhoFile(fileMode3,EB.RhoFile.OPEN_FOR_WRITE);
		expect(EB.RhoFile.exists(fileMode3)).toEqual(true);
		fOpen.close();

	});

	// Read File with path
	it("VT295-064 : Read contents with path| true",function(){
		var data = EB.RhoFile.read(testReadPath);
		expect(data.length != 0).toEqual(true);
		EB.Log.info(data, "VT290-072");
	});

	// Read File with invalid path
	it("VT295-065 : Read contents with invalid path| false",function(){
		var data = EB.RhoFile.read(invalidpath);
		expect(data.length == 0).toEqual(true);
		EB.Log.info(data, "VT290-073");
	});

	// Read with specified size
	it("VT295-066 : Read contents with specified size| true",function(){
		var fOpen = new EB.RhoFile(testReadPath,EB.RhoFile.OPEN_FOR_READ);
		var data = fOpen.read(20);
		expect(!!data && !!data.length && data.length > 0).toEqual(true);
		EB.Log.info(data, "VT290-074");
		fOpen.close();
	});


	// Read with specified size with mentioned position
	it("VT295-067 : Read contents with specified size with mentioned position| true",function(){

		var fOpen = new EB.RhoFile(testReadPath,EB.RhoFile.OPEN_FOR_READ_WRITE);
		fOpen.seek(20);
		var data = fOpen.read(20);
		expect(!!data && !!data.length && data.length > 0).toEqual(true);
		EB.Log.info(data, "VT290-075");
		fOpen.close();
	});

	// Read with specified size more than the file size
	it("VT295-068 : Read with specified size more than the file size true",function(){

		var fileMode6 = EB.RhoFile.join(dirName, "Mode6.txt");
		var fwrite = new EB.RhoFile(fileMode6,EB.RhoFile.OPEN_FOR_WRITE);
		var data1 = fwrite.write(Text1);
		var expectedString = Text1;
		fwrite.close();
		var fOpen = new EB.RhoFile(fileMode6,EB.RhoFile.OPEN_FOR_READ);
		var data = fOpen.read(40);
		expect(!!data && !!data.length && data.length > 0).toEqual(true);
		expect(data).toEqual(expectedString);
		EB.Log.info(data, "VT290-074");
		fOpen.close();
	});

	// Read with specified size with invalid filename
	it("VT295-069 : Read with specified size with invalid filename| false",function(){
		var fOpen = new EB.RhoFile(invalidpath,EB.RhoFile.OPEN_FOR_READ);
		var data = fOpen.read(20);
		expect(!!data && !!data.length && data.length == 0).toEqual(false);
		fOpen.close();
	});


	// ReadAll with valid file path
	it("VT295-070 : ReadAll with valid file path| true",function(){
		var fOpen = new EB.RhoFile(testReadPath,EB.RhoFile.OPEN_FOR_READ);
		var data = fOpen.readAll();
		expect(!!data && !!data.length && data.length > 0).toEqual(true);
		EB.Log.info(data, "VT290-078");
		fOpen.close();
	});

	// ReadAll with invalid file path
	it("VT295-071 : ReadAll with invalid file path| false",function(){
		var fOpen = new EB.RhoFile(invalidpath,EB.RhoFile.OPEN_FOR_READ);
		var data = fOpen.readAll();
		expect(data.length == 0).toEqual(true);
		EB.Log.info(data, "VT290-079");
		fOpen.close();
	});


	// rename with valid source and destination path
	it("VT295-072 : rename with valid source and destination path| true",function(){

		f = new EB.RhoFile(fileMode4,EB.RhoFile.OPEN_FOR_APPEND);
		f.close();
		expect(EB.RhoFile.exists(fileMode4)).toEqual(true);
		var newName = EB.RhoFile.join(userFolder,"Rename.txt");
		expect(EB.RhoFile.rename(fileMode4, newName)).toEqual(0);
		expect(EB.RhoFile.exists(newName)).toEqual(true);
		expect(EB.RhoFile.deleteFile(newName)).toEqual(0);

	});

	// rename with valid source and destination path
	it("VT295-073 : rename with valid source and destination path| true",function(){

		var oldName = EB.RhoFile.join(userFolder,"same.txt");
		f = new EB.RhoFile(oldName,EB.RhoFile.OPEN_FOR_APPEND);
		f.close();
		var newName = EB.RhoFile.join(userFolder,"Changed.txt");
		expect(EB.RhoFile.rename(oldName, newName)).toEqual(0);
		expect(EB.RhoFile.exists(newName)).toEqual(true);
		expect(EB.RhoFile.deleteFile(newName)).toEqual(0);

	});

	// rename with invalid source name and valid destination path
	it("VT295-074 : rename with invalid source name and valid destination path| false",function(){

		var oldName = EB.RhoFile.join(invalidpath,"invalid.txt");
		var newName = EB.RhoFile.join(userFolder,"updated.txt");
		expect(EB.RhoFile.rename(oldName, newName)).toEqual(-1);
		expect(EB.RhoFile.exists(newName)).toEqual(false);

	});

	// rename with valid source name and invalid destination path
	it("VT295-075 : rename withvalid source name and invalid destination path| false",function(){

		var oldName = EB.RhoFile.join(userFolder,"Changed.txt");
		var newName = EB.RhoFile.join(invalidpath,"invalid.txt");
		expect(EB.RhoFile.rename(oldName, newName)).toEqual(-1);
		expect(EB.RhoFile.exists(newName)).toEqual(false);

	});

	// rename without parameters
	it("VT295-077 : rename without parameters| false",function(){

		expect(EB.RhoFile.rename(null,null)).toEqual(-1);


	});


	// seek with value 10
	it("VT295-078 : seek value 10| true",function(){

		if (EB.RhoFile.exists(fileMode1))
			EB.RhoFile.deleteFile(fileMode1);

		var fOpen = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_READ_WRITE);
		expect(EB.RhoFile.exists(fileMode1)).toEqual(true);
		var writeValue = fOpen.write(Text1);
		var writeValue = fOpen.write(Text2);
		fOpen.seek(10);
		fOpen.write("Test");
		fOpen.close();

		var fOpen = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_READ);
		var content = fOpen.readAll();
		fOpen.close();
		var result = (Text1 + Text2).overwrite(10,"Test");
		expect(content).toEqual(result);
		EB.Log.info(content, "VT290-078");
	});



	// file size
	it("VT295-082 : file size | true",function(){

		var fOpen = new EB.RhoFile(testReadPath,EB.RhoFile.OPEN_FOR_READ);
		var fileSize = fOpen.size();
		expect(fileSize > 2500).toEqual(true);
		EB.Log.info("size:" + fileSize, "VT290-092");
		fOpen.close();

	});

	// file size on empty file
	it("VT295-083 : file size on empty file | true",function(){
		if (EB.RhoFile.exists(fileMode1))
			EB.RhoFile.deleteFile(fileMode1);
		var fCln = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_WRITE);
		fCln.close();

		var fOpen = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_READ_WRITE);
		var fileSize = fOpen.size();
		expect(fileSize == 0).toEqual(true);
		EB.Log.info("size:" + fileSize, "VT290-093");
		fOpen.close()
	});


	// Write beginning
	it("VT295-084 : Write beginning | true",function(){

		if (EB.RhoFile.exists(fileMode5))
			EB.RhoFile.deleteFile(fileMode5);

		var fWrite = new EB.RhoFile(fileMode5,EB.RhoFile.OPEN_FOR_READ_WRITE);
		var fRead = new EB.RhoFile(fileMode5,EB.RhoFile.OPEN_FOR_READ_WRITE);
		expect(EB.RhoFile.exists(fileMode5)).toEqual(true);
		var written = fWrite.write(Text1);
		fWrite.close();
		var content = fRead.readAll();
		expect(content).toEqual(Text1);
		EB.Log.info(written + ":" + content, "VT290-094");

		fRead.close();

	});


	// Write at the end
	it("VT295-085 : Write end | true",function(){

		var fWrite = new EB.RhoFile(fileMode5,EB.RhoFile.OPEN_FOR_APPEND);
		var fRead = new EB.RhoFile(fileMode5,EB.RhoFile.OPEN_FOR_READ_WRITE);
		expect(EB.RhoFile.exists(fileMode5)).toEqual(true);
		var written = fWrite.write(Text2);
		fWrite.close();
		var content = fRead.readAll();
		expect(content).toEqual(expectedText);
		EB.Log.info(written + ":" + content, "VT290-094");

		fRead.close();

	});


	// Write in between
	it("VT295-086 : Write in between  | true",function(){

		var fWrite = new EB.RhoFile(fileMode5,EB.RhoFile.OPEN_FOR_READ_WRITE);
		var fRead = new EB.RhoFile(fileMode5,EB.RhoFile.OPEN_FOR_READ_WRITE);
		expect(EB.RhoFile.exists(fileMode5)).toEqual(true);
		fWrite.seek(8);
		data = "the ";
		var written = fWrite.write(data);
		fWrite.close();
		var expectedString = expectedText.overwrite(8,data);
		var content = fRead.readAll();
		expect(content).toEqual(expectedString);
		EB.Log.info(written + ":" + content, "VT290-094");

		fRead.close();

	});

	// Flush
	it("VT295-029 : flush | true",function(){
		if (EB.RhoFile.exists(fileMode5))
			EB.RhoFile.deleteFile(fileMode5);

		data = 'mydata-that-should-be-written';

		var fileForWrite = new EB.RhoFile(fileMode5,EB.RhoFile.OPEN_FOR_WRITE);

		fileForWrite.write(data);
		fileForWrite.flush();

		var fRead = new EB.RhoFile(fileMode5,EB.RhoFile.OPEN_FOR_READ);

		var actual = fRead.readAll();
		EB.Log.info(actual, "VT290-097");
		expect(actual).toEqual(data);

		fRead.close();
		fileForWrite.close();
	});

	// those tests are platform specific
	/*
	describe("Edge cases", function () {
		// copy from and to with valid path with source file opened
		it("VT295-007 : Copy with valid parameters with source file opened | false",function(){

			var fromPath = EB.RhoFile.join(userFolder, "testing.txt")
			var fcopy = new EB.RhoFile(fromPath,EB.RhoFile.OPEN_FOR_READ);
			expect(fcopy.isOpened()).toEqual(true);
			var result = EB.RhoFile.copy(fromPath,destFileName)
			expect(result).toEqual(-1);
			fcopy.close();
		});

		// Delete recursive without parameters
		it("VT295-025 : Delete recursive without parameters  | false",function(){
			EB.RhoFile.makeDir(dirToDelete);
			var file = EB.RhoFile.join(dirToDelete, "delete.txt")
			var fOpen = new EB.RhoFile(file,EB.RhoFile.OPEN_FOR_APPEND);
			fOpen.close();
			EB.RhoFile.makeDir(dirinDelete)

			EB.RhoFile.deleteRecursive()
			expect(EB.RhoFile.isDir(dirToDelete)).toEqual(true)
			expect(EB.RhoFile.exists(file)).toEqual(true)
		});


		// mkdir with invalid characters
		it("VT295-049: make directory and special characters | false",function(){

			var testDirName = EB.RhoFile.join(dirName, "/\:*?<>|")
			EB.RhoFile.makeDir(testDirName)
			expect(EB.RhoFile.isDir(testDirName)).toEqual(false)
		});

		// mkdir with special characters
		it("VT295-050: make directory with special characters| true",function(){

			var testDirName = EB.RhoFile.join(dirName, "Test!@#")
			EB.RhoFile.makeDir(testDirName)
			expect(EB.RhoFile.isDir(testDirName)).toEqual(false)
		});

		// mkdir with special characters
		it("VT295-055: make directory with special characters| true",function(){

			var testDirName = EB.RhoFile.join(dirName, "Test!@#$")
			EB.RhoFile.makeDirs(testDirName)
			expect(EB.RhoFile.isDir(testDirName)).toEqual(false)
		});

		// seek with value out of size
		it("VT295-079 : seek value out of size | true",function(){
			if (EB.RhoFile.exists(fileMode1))
				EB.RhoFile.deleteFile(fileMode1)

			var fOpen = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_READ_WRITE);
			expect(EB.RhoFile.exists(fileMode1)).toEqual(true)
			var writeValue = fOpen.write(Text1)
			var writeValue = fOpen.write(Text2)
			fOpen.seek(100)
			fOpen.write("Test")
			fOpen.close()

			var fOpen = new EB.RhoFile(fileMode1,EB.RhoFile.OPEN_FOR_READ);
			var content = fOpen.readAll()
			fOpen.close()
			EB.Log.info(content, "VT290-079");
			var result = (Text1 + Text2).overwrite(100,"Test");
			expect(content).toEqual(result)
			EB.Log.info(result, "VT290-079");
		});
	});
	*/
});
