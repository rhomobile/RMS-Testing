RSPEC Auto Tests for cli-rhohub requirements
===========

Prerequisite
	It requires rspec gem to run the tests.

	= How to install

		$ gem install rspec
		$ gem install rails --no-rdoc --no-ri
  
	= How to use

		1: copy the spec folder and paste inside your local rhohub application folder.
		2: now go to the application folder using commandline/terminal
		3: Provide command
		    $ rspec --format h > output.html

  
	= Output File

		output.html file will be generated inside application folder
		Open the .html file to view results. (It includes command line output in .html file too)
		
Prerequisite
============

Before running this test be sure there must be atleast one failed build. 
(Once pushing to app-staging.rhohub.com through proxy works no need to have such condition)

