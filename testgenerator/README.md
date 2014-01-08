Test Generator
===========

It will generates .js file of specific module in module specific folder.
The generated js file will contain jasmine test, which is generated from a .yml file.

This is in progress state.

Available Command:

rake generate:js:barcode

Test Generator For Manual Spec
==============================

This will help to generate test in jasmine from xls/Google spreadsheet.

= Prerequisite
	It requires google-drive gem to fetch spreadsheet content.

	= How to install

		$ sudo gem install google_drive
  
	= How to use

		$ rake generate:testcase[google_spreadsheet_key,sheet_number]
  
		sheet_number starts from 0.
  
	= Output File

		One .js file will get created under testgenerator folder with name tests_generated_spec.js
		
=Note:
If your network under proxy then create two system variables (HTTP_PROXY, HTTPS_PROXY) with value http://proxy:port

Prerequisite
============

Generator use node js-beautify module to beautify the code.
Use npm to install js-beautify.
npm -g install js-beautify

