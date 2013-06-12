describe("Application Module Test Starts Here", function() {

    it("|App Bundle folder", function() {
        var data = Rho.Application.appBundleFolder;
        displayResult("|App Bundle folder",data);
    });
    
    it("|Apps Bundle folder", function() {
        var data = Rho.Application.appsBundleFolder;
        displayResult("|Apps Bundle folder",data);
    });
     
    it ("|get BadLink Uri", function() {
        var data = Rho.Application.badLinkURI;
        displayResult("|get BadLink Uri",data);
    });
     
    it ("|get Config path", function() {
        var data = Rho.Application.configPath;
        displayResult("|get Config path",data);
    });
/* Ruby only    
    it ("|get defaultNative menu", function() {
        var data = Rho.Application.defaultNativeMenu;
        displayResult("|get defaultNative menu",data);
    });
    
    it ("|get default Application Locale", function() {
      var data = Rho.Application.locale;
        displayResult("|get default Application Locale",data);
    });
*/     
    it ("|get Application name", function() {
        var data = Rho.Application.name;
        displayResult("|get Application name",data);
    });
     
    it ("|get default Public  folder", function() {
        var data = Rho.Application.publicFolder;                           
        displayResult("|get default Public  folder",data);
    });
  
    it ("|settingsPageURI ", function() {
        var data = Rho.Application.settingsPageURI;
        displayResult("|get default Public  folder",data);
    });
  
    it ("|call Application.splash ", function() {
        var data = Rho.Application.splash;
        displayResult("|call Application.splash ",data);
    });
    
    it ("|Get start URI By calling Application.startURI ", function() {
        var data = Rho.Application.startURI;
        displayResult("|Get start URI By calling Application.startURI ",data);
    });
    
    it ("|Set and Get start URI By calling Application.startURI ", function() {
        Rho.Application.startURI='http://www.google.com';
         var data = Rho.Application.startURI;
        displayResult("|Get start URI By calling Application.startURI ",data);
    });
  
  
    it ("|get Userfolder path from default location", function() {
        var data = Rho.Application.userFolder;
        displayResult("|get Userfolder path from default location ",data);
    });
  
    it ("|get version form Config file", function() {
        var data = Rho.Application.version;
        displayResult("|get version form Config file",data);
    });
    
    it ("|Set badlink uri and call to get badlink uri", function() {
        Rho.Application.badLinkURI='http://www.google.com';
        var data = Rho.Application.badLinkURI;
        displayResult("|Set badlink uri and call to get badlink uri",data);
    });
      
    it ("|set badlink uri to null and get the badlink uri value", function() {
        Rho.Application.badLinkURI='';
        var data = Rho.Application.badLinkURI;
        displayResult("|set badlink uri to null and get the badlink uri value",data);
    });
  
    it ("|Set setting page settingsPageURI:/app/NoSettings ", function() {
        Rho.Application.settingsPageURI='/app/NoSettings';
        var data = Rho.Application.settingsPageURI;
        displayResult("|Set setting page settingsPageURI:/app/NoSettings ",data);
    });
    
    it ("|Set settings page to empty string settingsPageURI", function() {
        Rho.Application.settingsPageURI='';
        var data = Rho.Application.settingsPageURI;
        displayResult("|Set settings page to empty string settingsPageURI",data);
    });
  
    it ("|Database File path with Local as Partition", function() {
        var beja = Rho.Application.databaseFilePath('local');
        var jija=Rho.Application.relativeDatabaseBlobFilePath(beja)
        var data=Rho.Application.expandDatabaseBlobFilePath(jija);
        displayResult("|Database File path with Local as Partition",data);
    });
    
    it ("|Database File path with User as Partition", function() {
        var beja = Rho.Application.databaseFilePath('user');
        var jija=Rho.Application.relativeDatabaseBlobFilePath(beja);
        var jaja =Rho.Application.expandDatabaseBlobFilePath(jija);
        var data =Rho.Application.relativeDatabaseBlobFilePath(jaja);
        displayResult("|Database File path with User as Partition",data);
    });
    
    it ("|Database File path with No Partition name", function() {
        var data = Rho.Application.databaseFilePath('');
        displayResult("|Database File path with No Partition name ",data);
    });
    
    it ("|Database File path with Invalid Partition name", function() {
        var data = Rho.Application.databaseFilePath('@$@4324$#2');
        displayResult("|Database File path with Invalid Partition name ",data);
    });
    
    
    it ("|Model folder path for model : BarcodeTest", function() {
        var data = Rho.Application.modelFolderPath('BarcodeTest');
        displayResult("|Model folder path for model : BarcodeTest",data);
    });
  
    it ("|Model folder path WITH NULL", function() {
        var data = Rho.Application.modelFolderPath('');
        displayResult("|Model folder path  WITH NULL",data);
    });


    it ("|Model folder path with model name that doesn't exist", function() {
        var data = Rho.Application.modelFolderPath('idontExist');
        displayResult("|Model folder path model name that doesn't exist",data);
    });
/* Ruby only     
    it ("|get default Country code", function() {
        var data = Rho.Application.country;
        displayResult("|get default Country code",data);
    });
*/     
    it ("|get default database blob Folder", function() {
        var data = Rho.Application.databaseBlobFolder;
        displayResult("|get default database blob Folder",data);
    });
     
    it ("|get Models Manifest Path", function() {
        var data = Rho.Application.modelsManifestPath;
        displayResult("|get Models Manifest Path",data);
    }); 
      
    it ("|Relative Database File path for the database file path with local partition", function() {
        var obj = Rho.Application.databaseFilePath('local');
        var data=Rho.Application.relativeDatabaseBlobFilePath(obj);
        displayResult("|Relative Database File path for the database file path with local partition",data);
    }); 
     
    it ("|Relative Database File path with null", function() {
        var data=Rho.Application.relativeDatabaseBlobFilePath('');
        displayResult("|Relative Database File path with null",data);
    }); 
     
    it ("|Relative Database File path with Invalid file path", function() {
        var obj = Rho.Application.databaseFilePath('local');
        var obj1=Rho.Application.relativeDatabaseBlobFilePath(obj);
    var data=Rho.Application.relativeDatabaseBlobFilePath(obj1); 
        displayResult("|Relative Database File path with Invalid file path",data);
    }); 
 
    it ("|Expand Database File path by giving the Relative database File path of Local", function() {
        var obj = Rho.Application.databaseFilePath('local');
        var obj1=Rho.Application.relativeDatabaseBlobFilePath(obj);
        var data=Rho.Application.expandDatabaseBlobFilePath(obj1);
        displayResult("|Expand Database File path by giving the Relative database File path of Local",data);
    }); 
       
    it ("|Expand Database File path with null", function() {
        var data=Rho.Application.expandDatabaseBlobFilePath('');
        displayResult("|Expand Database File path with null",data);
    }); 
       
    it ("|Expand Database File path with Invalid file path", function() {
        var obj=Rho.Application.databaseFilePath('local');
        var obj1=Rho.Application.expandDatabaseBlobFilePath(obj);
        var data=Rho.Application.expandDatabaseBlobFilePath(obj1);
        displayResult("|Expand Database File path with Invalid file path",data);
    }); 
   
     
    it ("|Security Token Not passed", function() {
        var data = Rho.Application.securityTokenNotPassed;
        displayResult("|Security Token Not passed",data);
    }); 
    


});
