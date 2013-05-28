describe("Database Module Test Starts Here", function() {
	beforeEach(function() {
		
	displayflag = false;
	// reset values
	});
	
	afterEach(function() {
	displayflag = false;
	//logre lated code
	});
	
	it("VT282-298 : To Open a Database : Rho::Database", function() {
		runs(function(){
			var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
			
			setTimeout(function() {
				displayflag = true;
			}, 10000);
		});
		
		waitsFor(function() {
			return displayflag;
		}, "Amit asking", 11000);
		
		runs(function(){
			expect(db.toString).toEqual(Rho.Database);
		});
	});
	
	it("VT282-298 : To Open a Database : Rho::Database", function() {
		runs(function(){
			var db = new Rho.Database(Rho.Application.databaseFilePath('local'), 'local');
			expect(db.toString).toEqual(Rho.Database)
		});
		
		it("VT282-298 : Barcode Enum", function() {
			runs(function(){
				Rho.Barcode.enumerate (function(data){
					enumCallback(data)
				}
				})
				setTimeout(function() {
					displayflag = true;
				}, 10000);
			});
			
			waitsFor(function() {
				return displayflag;
			}, "Amit asking", 11000);
		
			runs(function(){
				expect(data).toEqual('SCN1,SCN2');
			});
	});
		

		it("VT282-298 : Barcode Enum", function() {
			runs(function(barcode[i]){
	var data = ModelBarcode.find(all) 
				  data = db.isTableExist(tableName)
				  
					expect(data).toEqual('true');

			});
			);
		
		# Test case2 - executeSql with no Args
		def executeNoArgs
		  db =Rho::Database.new(Rho::Application.databaseFilePath('local'), "local");
		  
		  tableName = Library.getRandomName
		  puts "Table Name #{tableName}"
		  

		  WebView.execute_js("resultDatabase('#{data}')")
		end
	
	
	

	
});