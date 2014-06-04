RSPEC Auto Tests for build scenario requirements
===========

Prerequisite
	It requires rspec gem to run the tests.

	= How to install

		$ gem install rspec
		$ gem install rails --no-rdoc --no-ri
  
	= How to use

		1: copy the spec folder and paste inside your local application folder.
		2: now go to the application folder using commandline/terminal
		3: Provide below commands
		    $ rspec --format h > output.html # To run all spec
			$ rspec --tag wmce --format h > output.html # To run WM/CE build scenario
			$ rspec --tag android --format h > output.html # To run android build scenario
			$ rspec --tag win32 --format h > output.html # To run win32 build scenario
			
		To exclude one platform and run for other
			$ rspec --tag ~@ios --format h > output.html # To run all spec except ios build scenario
		
			

  
	= Output File

		output.html file will be generated inside application folder
		Open the .html file to view results. (It includes command line output in .html file too)
