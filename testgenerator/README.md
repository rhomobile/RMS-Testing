##Test Generator For Auto Spec##
--------------------------------
It will generates .js file of specific module in module specific folder.
The generated js file will contain jasmine test, which is generated from a .yml file.

Available Commands:
```
rake generate:js:audiocapture  # Generates AudioCapture Property SET/GET Test
rake generate:js:barcode       # Generates Barcode Property SET/GET Test
rake generate:js:camera        # Generates Camera Property SET/GET Test
rake generate:js:cardreader    # Generates CardReader Property SET/GET Test
rake generate:js:rhoconstants  # Generate Constant Tests
rake generate:js:signature     # Generates Signature Property SET/GET Test
```
-----------------------------------------------------------------------------------
##Test Generator For Manual Spec##
----------------------------------

This will help to generate test in jasmine from xls/Google spreadsheet.

####Prerequisite####
*It requires google-drive gem to fetch spreadsheet content.*

**How to install**  
`$ sudo gem install google_drive`  
**How to use**  
`$ rake generate:testcase[google_spreadsheet_key,sheet_number]`  
*sheet_number starts from 0.*  
  
**Output File**  
One .js file will get created under testgenerator folder with name tests_generated_spec.js
		
**Note:**  
If your network under proxy then create two system variables (HTTP_PROXY, HTTPS_PROXY) with value *http://proxy:port*

**Prerequisite**
Generator use node js-beautify module to beautify the code.Use npm to install js-beautify.  
`npm -g install js-beautify`

