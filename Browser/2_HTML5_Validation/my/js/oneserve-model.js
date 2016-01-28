//
// User resource object
//
Resource = function(id,name) {
	this.id = id;
	this.name = name;
	this.user;
	this.pass;
	this.client;
	this.supplier;
	this.resourceId;
	this.offline;
	this.gps;
	this.clientParams;
	this.context;
	this.rights;
	this.storeId;
	this.clientGroupId;
	
    this.getName = function()
    {
        return name;
    }
    this.getId = function()
    {
        return id;
    }	
    this.getUser = function()
    {
        return user;
    }	
    this.getPass = function()
    {
        return pass;
    }	
    
    this.setUser = function(user)
    {
    	this.user = user;
    }
    this.setPass = function(pass)
    {
    	this.pass = pass;
    }
    this.setClient = function(client)
    {
    	this.client = client;
    }
    this.setSupplier = function(supplier)
    {
    	this.supplier = supplier;
    }
    this.setResourceId = function(resourceId)
    {
    	this.resourceId = resourceId;
    }
    this.setGps = function(gps)
    {
    	this.gps = gps;
    }
    this.setOffline = function(offline)
    {
    	this.offline = offline;
    }    
    this.setClientParams = function(clientParams)
    {
    	this.clientParams = clientParams;
    }     
    this.setContext = function(context)
    {
    	this.context = context;
    }   
    this.setRights = function(rights)
    {
    	this.rights = rights;
    }   
    this.setStoreId = function(storeId)
    {
    	this.storeId = storeId;
    }   
    this.setClientGroup = function(clientGroupId)
    {
    	this.clientGroupId = clientGroupId;
    }   
    this.hasRight = function(right)
    {
    	var rights = this.rights.split(',');
    	for (var x=0;x<rights.length;x++)
    	{
    		if (right == rights[x])
    			return true;
    	}
    	return false;
    }
}


