describe("RMS 4.0 File JS API", function () {

	var userFolder = Rho.Application.userFolder;
	
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

	beforeEach(function() {
		timeout = false;
	});



	
	// open file
	it("Open File - true", function() {
			runs(function()
			{
				Ruby.call('Filelist','openFile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});

			waitsFor(function(){
				if(timeout == true){
					return true;
				}
			}, 'Wait for 1 sec ajax call to happen', 1000);

			runs(function(){
				expect(Ruby.getReturnedValue()).toBe(true);
			});
	});
	
	// close with valid path
	it("VT288-003 : Close File - isOpened() should return false",function(){ //VT288-003 : is close ? | true
		runs(function()
			{
				Ruby.call('Filelist','closeFile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(false);
		});
		
	});


	// copy from and to with valid path
	it("VT288-005 : Copy with valid parameters | true",function(){
		
		runs(function()
			{
				Ruby.call('Filelist','copyFile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe('0,true');
		});
	});
	
	// copy from and to with same path
	it("VT288-006 : Copy to same folder | false",function(){
		runs(function()
			{
				Ruby.call('Filelist','copyFile_sameFolder');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe('-1,true');
		});
	});

	// copy without parameters
	it("VT288-011 : Copy without parameters | false",function(){
		runs(function()
			{
				Ruby.call('Filelist','copyFile_withoutParams');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(-1);
		});
	});
	
	// Delete recursive with leave root true
	it("VT288-022 : Delete recursive with leave root true | true",function(){
		runs(function()
			{
				Ruby.call('Filelist','delDirectory_leaveRoot');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe('true,false,false');
		});

	});
	
	// Delete recursive without leave root
	it("VT288-024 : Delete recursive without leave root  | true",function(){
		
		runs(function()
			{
				Ruby.call('Filelist','delDirectory');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe('false,false,false');
		});

	});
	
	// Delete directory without contents
	it("VT288-012 : Delete directory without contents | true",function(){
		
		runs(function()
			{
				Ruby.call('Filelist','deleteEmpty');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe('0,false');
		});

	});
	
	// Delete directory with contents
	it("VT288-013 : Delete directory with contents | false",function(){
		
		runs(function()
			{
				Ruby.call('Filelist','deleteDirConent');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe('-1,true,true');
		});

	});
	
	it("VT288-014 : Delete directory with invalid path | path",function(){

		runs(function()
			{
				Ruby.call('Filelist','deleteInvalid');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(-1);
		});
		
	});

	// Delete directory without parameters
	it("VT288-015 : Delete directory without parameters | false",function(){

		runs(function()
			{
				Ruby.call('Filelist','deleteWithoutParam');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(-1);
		});

	});
	
	// get File Size with valid path
	it("VT288-030: get file size  | true",function(){

		runs(function()
			{
				Ruby.call('Filelist','fileSize');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(true);
		});

	});
	
	// get File Size with valid directory path
	it("VT288-031: get file size with valid directory path   | false",function(){

		runs(function()
			{
				Ruby.call('Filelist','fileSizeDir');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(false);
		});

	});
	
	// get File Size with invalid  path
	it("VT288-032: get file size with invalid  path   | false",function(){

		runs(function()
			{
				Ruby.call('Filelist','fileSizeInvalidDir');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(false);
		});

	});
	
	// isDir with valid path
	it(" VT288-033 : is directory present with valid path| true",function(){

		runs(function()
			{
				Ruby.call('Filelist','isDirValid');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(true);
		});
	
	});
	
	// is dir with valid filename
	it("VT288-034: is directory with valid filename  | false",function(){

		runs(function()
			{
				Ruby.call('Filelist','isDirFile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(false);
		});
		
	});
	
	// isDir with invalid path
	it(" VT288-035 : is directory present with invalid path| false",function(){
		
		runs(function()
			{
				Ruby.call('Filelist','isDirInvalid');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(false);
		});
		
	});

	// is file with valid file path
	it("VT288-046: isFile with valid filepath  | true",function(){
		
		runs(function()
			{
				Ruby.call('Filelist','isFileValid');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(true);
		});
		
	});

	// is file with valid directory
	it("VT288-037: isFile with valid directory  | false",function(){

		runs(function()
			{
				Ruby.call('Filelist','ifFileDir');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(false);
		});
		
	});

	// is file with invalid file path
	it("VT288-038: isFile with invalid filepath  | false",function(){

		runs(function()
			{
				Ruby.call('Filelist','isFileInvalid');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(false);
		});

	});
	
	// Join operation
	it("VT288-042 : Join operation | true",function(){
		
		var actualString = Rho.Application.userFolder + "RMS4";
		runs(function()
			{
				Ruby.call('Filelist','joinOp');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toBe(actualString);
		});
		
	});

	// Join operation
	it("VT288-043 : Join operation with spaces| true",function(){

		var actualString = Rho.Application.userFolder + "RMS4";
		runs(function()
			{
				Ruby.call('Filelist','joinOp_space');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).not.toMatch(actualString);
		});
		
	});
	
	
	// lisDir of path
	it("VT288-044 : listDir | true",function(){

		runs(function()
			{
				Ruby.call('Filelist','listDirs');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			var dirs = Ruby.getReturnedValue();
			expect(dirs && dirs.length && dirs.length > 0).toEqual(true);
			var len = dirs.length;
			// some files could be created during previous tests runs
			// just test that all files listed below are in directory
			var expected = ['.','..','Hello.txt','TestFile','testing.txt'];
			var count = 0;
			for(var j = 0; j < len; j++)
			{
				if (expected.indexOf(dirs[j]) > -1)
				{
					count++;
				}
			}
			expect(count).toEqual(expected.length);
		});
		
	});
	
	// lisDir with invalid path
	it("VT288-045 : listDir with invalid path | false",function(){

		runs(function()
			{
				Ruby.call('Filelist','listDirInvalid');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(null);
		});
		
	});

	// mkdir with valid
	it("VT288-046: make directory and is directory present| true",function(){
		
		runs(function()
			{
				Ruby.call('Filelist','dirMake');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});
		
	});

	// mkdir with invalid path when all top level directories not exists
	it("VT288-047: make directory with invalid path | false",function(){

		runs(function()
			{
				Ruby.call('Filelist','dirMakeInvalid');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(false);
		});
		
	});

	// mkdir with invalid path when some of top level directories not exists
	it("VT288-048 : make directory with some of toplevel directories not present | false",function(){

		runs(function()
			{
				Ruby.call('Filelist','dirMake_notopdir');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(false);
		});
	
	});
	
	// mkdirs with valid
	it("VT288-051: make directory with mkdirs | true",function(){

		runs(function()
			{
				Ruby.call('Filelist','make_dir?validpath=1');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});
		
	});


	// mkdirs with invalid path when all top level directories not exists
	it("VT288-052: makedirs with invalid path | true",function(){

		runs(function()
			{
				Ruby.call('Filelist','make_dir?validpath=2');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(false);
		});
		
	});

	// mkdir with invalid path when top level directories not exists
	it("VT288-053 : make directory with toplevel directories not present | true",function(){

		runs(function()
			{
				Ruby.call('Filelist','make_dir?validpath=3');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});
		
	});
	
	// mkdirs with valid characters
	it("VT288-054: make directory and is directory present| true",function(){

		runs(function()
			{
				Ruby.call('Filelist','make_dir?validpath=');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});
	
	});

	//open file with mode 1 on file which does not exists
	it("VT288-056 : open file with mode 1 on file not exists | true",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_open_mode1?a=1');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});
	
	});

	// open file with mode 1 on file which exists
	it("VT288-057 : open file with mode 1 on file exists| true",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_open_mode1?a=');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});

	});

	// open file with mode 2 on file which exists
	it("VT288-059 : open file with mode 2 on file exists| true",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_open_mode2');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});

	});


	//open file with mode 4 on file which does not exists
	it("VT288-062 : open file with mode 4 on file not exists | true",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_open_mode4');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});
		
	});
	
	// open file with mode 4 on file which exists
	it("VT288-063 : open file with mode 4 on file exists| false",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_mode4');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual([true,"test file content"]);
		});

	});

	//open file with mode 3 on file which does not exists
	it("VT288-060 : open file with mode 3 on file not exists | true",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_open_mode3');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual([true,"test file content"]);
		});

	});


	// open file with mode 3 on file which exists
	it("VT288-061 : open file with mode 3 on file exists| true",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_mode3');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});

	});

	// Read File with path
	it("VT288-064 : Read contents with path| true",function(){
		
		runs(function()
			{
				Ruby.call('Filelist','file_read');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});
		
	});

	// Read with specified size
	it("VT288-066 : Read contents with specified size| true",function(){
		runs(function()
			{
				Ruby.call('Filelist','file_read_specific');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});
	});


	// Read with specified size with mentioned position
	it("VT288-067 : Read contents with specified size with mentioned position| true",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_read_specific_seek');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});
		
	});

	// Read with specified size more than the file size
	it("VT288-068 : Read with specified size more than the file size true",function(){

		var expectedString = "test case content";
		runs(function()
			{
				Ruby.call('Filelist','file_read_more');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(expectedString,true);
		});
		
	});

	// ReadAll with valid file path
	it("VT288-070 : ReadAll with valid file path| true",function(){
		
		runs(function()
			{
				Ruby.call('Filelist','file_readall');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});
	});

	// rename with valid source and destination path
	it("VT288-072 : rename with valid source and destination path| true",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_rename');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual([0,true]);
		});

	});

	// rename with valid source and destination path
	it("VT288-073 : rename with valid source and destination path| true",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_rename');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual([0,true]);
		});

	});

	// rename with invalid source name and valid destination path
	it("VT288-074 : rename with invalid source name and valid destination path| false",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_rename_valid_invalid?a=1');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual([-1,false]);
		});

	});

	// rename with valid source name and invalid destination path
	it("VT288-075 : rename withvalid source name and invalid destination path| false",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_rename_valid_invalid?a=2');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual([-1,false]);
		});

	});

	// rename without parameters
	it("VT288-077 : rename without parameters| false",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_rename_null');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(-1);
		});

	});


	// seek with value 10
	it("VT288-078 : seek value 10| true",function(){
		
		runs(function()
			{
				Ruby.call('Filelist','file_seek_value');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			var text = "test case content this is an example file";
			var content = (text).overwrite(10,"check");
			expect(Ruby.getReturnedValue()).toEqual(content);
		});
		
	});



	// file size
	it("VT288-082 : file size | true",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_size');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(true);
		});

	});

	// file size on empty file
	it("VT288-083 : file size on empty file | true",function(){
		
		runs(function()
			{
				Ruby.call('Filelist','file_size_empty');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(0);
		});
		
	});


	// Write beginning
	it("VT288-084 : Write beginning | true",function(){
		var content = "test file content";
		runs(function()
			{
				Ruby.call('Filelist','file_write');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(content);
		});

	});


	// Write at the end
	it("VT288-085 : Write end | true",function(){

		var text1 = "test case content";
		var text2 = "this is an example file";
		var content = text1 + text2;
		runs(function()
			{
				Ruby.call('Filelist','file_write_end');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(content);
		});

	});


	// Write in between
	it("VT288-086 : Write in between  | true",function(){

		runs(function()
			{
				Ruby.call('Filelist','file_write_between');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			var text1 = "test case content";
			var text2 = "this is an example file";
			var content = text1 + text2;
			var data = "the ";
			var expectedString = content.overwrite(8,data);
			expect(Ruby.getReturnedValue()).toEqual(expectedString);
		});

	});

	// Flush
	it("VT288-029 : flush | true",function(){
		
		var data = 'mydata-that-should-be-written';
		runs(function()
			{
				Ruby.call('Filelist','file_write');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});
		
		waitsFor(function(){
			if(timeout == true){
				return true;
			}
		}, 'Wait for 1 sec ajax call to happen', 1000);

		runs(function(){
			expect(Ruby.getReturnedValue()).toEqual(data);
		});
	});

	
});




describe("RMS 4.1 : [SPB] Fix File reading errors in Ruby", function () {

		var description;
		var expectString = "Could not open file: '/programFiles/Test/rholog.txt'"
		var expectString1 = "Could not read file: '/programFiles/Test/rholog.txt'"
		var timeout = false;

		beforeEach(function() {
			timeout = false;
		});


	it("VT288-087 :Raises exception while opening nonexistent file in OPEN_FOR_READ mode", function () {
		runs(function()
			{
				Ruby.call('Filelist','read_nonexistfile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});

			waitsFor(function(){
				if(timeout == true){
					return true;
				}
			}, 'Wait for 1 sec ajax call to happen', 1000);

			runs(function(){
				expect(Ruby.getReturnedValue()).toBe(expectString);
			});
			 
    });
	

    it("VT288-088 :Raises exception while opening nonexistent file in OPEN_FOR_READ_WRITE mode", function () {
    	runs(function()
			{
				Ruby.call('Filelist','readwrite_nonexistfile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});

			waitsFor(function(){
				if(timeout == true){
					return true;
				}
			}, 'Wait for 1 sec ajax call to happen', 1000);

			runs(function(){
				expect(Ruby.getReturnedValue()).toBe(expectString);
			});
			
    });

    it("VT288-089 :Don't Raises exception while opening nonexistent file in OPEN_FOR_APPEND mode", function () {
    	runs(function()
			{
				Ruby.call('Filelist','append_nonexistfile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});

			waitsFor(function(){
				if(timeout == true){
					return true;
				}
			}, 'Wait for 1 sec ajax call to happen', 1000);

			runs(function(){
				expect(Ruby.getReturnedValue()).toBe('');
			});
    });

    it("VT288-090 :Don't Raises exception while opening non existent file in OPEN_FOR_WRITE mode", function () {
    	runs(function()
			{
				Ruby.call('Filelist','write_nonexistfile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});

			waitsFor(function(){
				if(timeout == true){
					return true;
				}
			}, 'Wait for 1 sec ajax call to happen', 1000);

			runs(function(){
				expect(Ruby.getReturnedValue()).toBe('');
			});
    });

	it("VT288-091 :Raises exception when Read call with non existing file", function () {
		
		runs(function()
			{
				Ruby.call('Filelist','readcall_nonexistfile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});

			waitsFor(function(){
				if(timeout == true){
					return true;
				}
			}, 'Wait for 1 sec ajax call to happen', 1000);

			runs(function(){
				expect(Ruby.getReturnedValue()).toBe(expectString1);
			});
    });
	

    it("VT288-092 :Doesn't raises exception while reading empty file", function () {
    	runs(function()
			{
				Ruby.call('Filelist','read_emptyfile');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});

			waitsFor(function(){
				if(timeout == true){
					return true;
				}
			}, 'Wait for 1 sec ajax call to happen', 1000);

			runs(function(){
				expect(Ruby.getReturnedValue()).toBe('');
			});
    });
   
	it("VT288-093 :Doesn't raises exception while reading CR LF", function () {
		runs(function()
			{
				Ruby.call('Filelist','readCRLF');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});

			waitsFor(function(){
				if(timeout == true){
					return true;
				}
			}, 'Wait for 1 sec ajax call to happen', 1000);

			runs(function(){
				expect(Ruby.getReturnedValue()).toBe("\r\n");
			});
    });

    it("VT288-094 :Doesn't raises exception while loading file without double quote", function () {
    	runs(function()
			{
				Ruby.call('Filelist','loadfile_withoutdq');	
				// Time to wait ajax to be happen
				setTimeout(function() {
					timeout = true;
				}, 500);
			});

			waitsFor(function(){
				if(timeout == true){
					return true;
				}
			}, 'Wait for 1 sec ajax call to happen', 1000);

			runs(function(){
				expect(Ruby.getReturnedValue()).toBe('ab');
			});
    });
    
});
