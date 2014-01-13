require "rubygems"
require "google_drive"
require 'highline/import'

$file_name = "tests_generated_spec.js"
$path_to_spec = File.join('./', $file_name)

def get_email(prompt="Enter your Email(gmail)")
   ask(prompt) {|q| q.echo = true}
end

def get_password(prompt="Enter Password")
   ask(prompt) {|q| q.echo = false}
end

#Method to generate test if xls file locally available
def generate_test_from_ms_xls

end

#Method to generate test from google spread sheet
def generate_test_from_google_xls spreadsheet, sl_no

	theEmail = get_email()
	thePassword = get_password()

	session = GoogleDrive.login(theEmail, thePassword)
	ws = session.spreadsheet_by_key("#{spreadsheet}").worksheets[sl_no.to_i]

	# Check the structure of xls sheet
	if ws[1,5] != "Case Description" # Case Description
		puts "Provide your Case Description column name properly"
		exit
	elsif ws[1,7] != "Procedure" # Procedure
		puts "Provide your Procedure column name properly"
		exit
	elsif ws[1,8] != "Expected Results" # Expected Results
		puts "Provide your Expected Results column name properly"
		exit
	elsif ws[1,9] != "Notes" # Notes
		puts "Provide your Notes column name properly"
		exit
	end

	File.open($path_to_spec, 'w') do |f|
		#Start Describe
    	f.puts "describe('#{ws.title} Functionality Test', function() {"
	end
	# Dumps all cells.
	for row in 2..ws.num_rows
		test_casedescription = (ws[row,5].gsub("\n", "<br/>")).gsub("'", %q(\\\'))
		test_procedure = (ws[row,7].gsub("\n", "<br/>")).gsub("'", %q(\\\'))
		test_expected = (ws[row,8].gsub("\n", "<br/>")).gsub("'", %q(\\\'))
		
		File.open($path_to_spec, 'a') do |f|
			#Start it
			f.puts "it('#{test_casedescription}',function(){"
			f.puts "dispTestCaseRunning('#{test_procedure}');"
			f.puts "dispExpectedResult('#{test_expected}');"
			f.puts "//Common Method implemented to wait for tester to run the test.Code available in specHelper.js"
			f.puts "_result.waitToRunTest();"
			f.puts "runs(function(){"
			f.puts "// Write your code here."
			f.puts "});"
			f.puts "//Add more waitsfor or run blocks if required."
			f.puts "//Common Method implemented to wait for tester to make it pass or fail.Code available in specHelper.js"
			f.puts "_result.waitForResponse();"
			f.puts "});"
		end

	end
	File.open($path_to_spec, 'a') do |f|
		#End Describe
		f.puts "});"
	end

end