describe("Basic CRUD Model Specs", function() {
  if(useNewOrm) {
    var Product = function(model) {
      model.fixed_schema = true;
      model.setProperty('schema_version','1.0');
      model.setModelProperty("name","string", "");
      model.setModelProperty("brand","string", "");
      model.enable("sync");
    };

    var addProductModel = function() {
      return Rho.ORM.addModel('Product', Product);
    };
  } else { // Old ORM
    var Product = function(model){
      model.modelName("Product");
      model.enable("fixedSchema");
      model.enable("sync");
      model.property("name","string");
      model.property("brand","string");
      // model.set("partition","user");
    };

    var addProductModel = function() {
      return Rho.ORM.addModel(Product);
    };
  }

  var reset = function() {
    if(useNewOrm){
      var partitions = Rho.ORM.getDbPartitions();
    } else {
      var partitions = Rho.ORMHelper.getDbPartitions();
    }
    $.each(partitions, function(index, db2){
      db2.executeSql("DELETE FROM SOURCES");
      db2.executeSql("DELETE FROM OBJECT_VALUES");
      db2.executeSql("DELETE FROM CHANGED_VALUES");
      if(db2.isTableExist("Product")){
        console.log("Found Product !");
        db2.executeSql("DROP TABLE Product");
      }
      if(db2.isTableExist("CustomerWOF")){
        db2.executeSql("DROP TABLE CustomerWOF");
        console.log("Found CustomerWOF");
      }
      if(db2.isTableExist("UserWFS")){
        db2.executeSql("DROP TABLE UserWFS");
        console.log("Found UserWFS");
      }
    });
  };

  beforeEach(function() {
    reset();
  });

  it("Should return client id",function(){
    var db = Rho.ORMHelper.dbConnection("user");
    db.executeSql("DELETE FROM CLIENT_INFO");
    var client_id = Rho.ORM.getClientId();

    if(useNewOrm) // FIXME:
      expect(client_id).toEqual(null); // TBD: New ORM returns null
    else
      expect(client_id).toEqual([]);

    db.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    client_id = Rho.ORM.getClientId();
    expect(client_id).toEqual("7");
  });
  

  it('Should create model',function() {
    var model = addProductModel();
    expect(model).toBeDefined();
    expect(model).not.toBe(null);

    var db = Rho.ORMHelper.dbConnection("user");
    var res = db.executeSql("select * from sources where name = 'Product'");
    //console.log(JSON.stringify(res));
    // =>
    // [ {"map":
    //     { "associations":"","backend_refresh_time":"0","blob_attribs":"","last_deleted_size":"0","last_inserted_size":"0",
    //       "last_sync_duration":"0","last_sync_success":"0","last_updated":"0","metadata":"",
    //       "name":"Product","partition":"user",
    //       "schema":"CREATE TABLE \"Product\" ( \"brand\" varchar default null,\"name\" varchar default null,\"object\" varchar(255) PRIMARY KEY );\r\n",
    //       "schema_version":"1.0","source_attribs":"","source_id":"1","sync_priority":"1000",
    //       "sync_type":"incremental","token":""
    //     }
    //  }]
    expect(res[0].name).toEqual('Product');
    expect(res[0].sync_type).toEqual('incremental');
    expect(res[0].partition).toEqual('user');
  });

  it('Get a model by its name after it has been added', function() {
    var model = addProductModel();
    var p = Rho.ORM.getModel('Product');

    if(useNewOrm) {
      expect(p.model_name).toEqual('Product');
      expect(p.sync_type).toEqual('incremental');
      expect(p.partition).toEqual('user');

      // default values of other properties
      expect(p.loaded).toBe(true);
      expect(p.sync_priority).toEqual(1000);
      expect(p.source_id).toBeGreaterThan(0);
      expect(p.fixed_schema).toBe(true);
      expect(p.freezed).toBe(true);
    } else {
      expect(p).toEqual(model);
    }
  });

  it('Model object returned by addModel method should have model properties or be defined', function() {
    var productModel = addProductModel();

    if(useNewOrm) {
      expect(productModel.model_name).toEqual('Product');
      expect(productModel.sync_type).toEqual('incremental');
      expect(productModel.partition).toEqual('user');
    } else {
      expect(productModel).toBeDefined();
    }

  });

  it('Model object returned by addModel for none-existing source should be null or undefined', function() {
    var sth = Rho.ORM.getModel('Someting');
    if(useNewOrm)
      expect(sth).toBeNull();
    else // should de 'undefined' for Old ORM
      expect(sth).toBeUndefined();
  });

  it('Model should count created objects', function() {
    var model = addProductModel();
    var count = 0;

    if(useNewOrm) {
      expect(model.getCount()).toBe(count);
      model.create({"name":"iphone", "brand":"Apple"});
      expect(model.getCount()).toBe(count + 1);
    } else {
      expect(model.count()).toBe(count);
      model.create({"name":"iphone", "brand":"Apple"});
      expect(model.count()).toBe(count + 1);
    }
  });

  it('Model should count deleted objects', function() {
    var model = addProductModel();
    model.create({"name":"iphone","brand":"Apple"});
    expect(model.count()).toBeGreaterThan(0);
    if(useNewOrm) expect(model.getCount()).toBeGreaterThan(0);
    model.deleteAll();
    expect(model.count()).toBe(0);
    if(useNewOrm) expect(model.getCount()).toBe(0);
  });

});
