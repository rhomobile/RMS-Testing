describe("ORM Db Reset Specs", function() {
  var useNewORM = false;
  // var useNewORM = Rho.NewORM.useNewOrm();
  console.log("useNewORM: " + useNewORM);

  var reset = function() {
    var partitions = Rho.ORMHelper.getDbPartitions();
    $.each(partitions, function(index, db) {
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      db.$execute_sql("DELETE FROM CHANGED_VALUES");
      if(db.$is_table_exist("Product")) db.$execute_sql("DROP TABLE Product");
    });
  };
  var localDB = Rho.ORMHelper.dbConnection('local');
  var userDB  = Rho.ORMHelper.dbConnection('user');
  var appDB   = Rho.ORMHelper.dbConnection('app');

  beforeEach(function(){
    reset();
    if (!useNewORM) Rho.ORM.clear();
  });

  it("VT302-0041 | Call databaseFullReset(true) should reset client info databaseFullReset tables",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var client_id = userDB.$execute_sql("Select * from client_info");
    expect(client_id[0].map.client_id).toEqual("7");

    if (useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("brand","string","");
        model.set("partition","local");
      };
      var Product2 = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("brand","string","");
        model.set("partition","user");
      };
      var model  = Rho.ORM.addModel("Product", Product);
      var model2 = Rho.ORM.addModel("Product2", Product2);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","local");
      };
      var Product2 = function(model){
        model.modelName("Product2");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","user");
      };
      var model  = Rho.ORM.addModel(Product);
      var model2 = Rho.ORM.addModel(Product2);
    }
    model.create({"name":"test","brand":"PUMA"});
    model2.create({"name":"test2","brand":"PUMA2"});

    var objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    var objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");
    expect(objects[0].map.value).toEqual('test');
    expect(objects_u[0].map.value).toEqual('test2');

    Rho.ORM.databaseFullReset(true);

    client_id = userDB.$execute_sql("Select * from client_info");
    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");
    expect(client_id).toEqual([]);
    expect(objects_u).toEqual([]);
    expect(objects[0].map.value).toEqual('test');
  });

  it("VT302-0042 | Call databaseFullReset(false) should not reset client info databaseFullReset tables",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var client_id = userDB.$execute_sql("Select * from client_info");
    expect(client_id[0].map.client_id).toEqual("7");

    if (useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("brand","string","");
        model.set("partition","local");
      };
      var Product2 = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("brand","string","");
        model.set("partition","user");
      };
      var model  = Rho.ORM.addModel("Product", Product);
      var model2 = Rho.ORM.addModel("Product2", Product2);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","local");
      };
      var Product2 = function(model){
        model.modelName("Product2");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","user");
      };
      var model  = Rho.ORM.addModel(Product);
      var model2 = Rho.ORM.addModel(Product2);
    }

    model.create({"name":"test","brand":"PUMA"});
    model2.create({"name":"test2","brand":"PUMA2"});

    var objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    expect(objects[0].map.value).toEqual('test');

    var objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");
    expect(objects_u[0].map.value).toEqual('test2');

    Rho.ORM.databaseFullReset(false);

    client_id = userDB.$execute_sql("Select * from client_info");
    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");
    expect(objects[0].map.value).toEqual('test');
    expect(client_id[0].map.client_id).toEqual("7");
    expect(objects_u).toEqual([]);
  });

  it("VT302-0043 | should reset client info databaseFullReset tables of all partitions",function(){
    var Product_user_fixed = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
        model.enable("sync");
        model.enable("fixedSchema");
    };
    var Item_user_pb = function(model){
        model.modelName("Item");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
        model.enable("sync");
    };
    var Product_local_fixed = function(model){
        model.modelName("Product_local");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","local");
        model.enable("sync");
        model.enable("fixedSchema");
    };
    var Item_local_pb = function(model){
        model.modelName("Item_local");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","local");
        model.enable("sync");
    };
    var P_user_fixed = Rho.ORM.addModel(Product_user_fixed);
    var I_user_pb = Rho.ORM.addModel(Item_user_pb);
    var P_local_fixed = Rho.ORM.addModel(Product_local_fixed);
    var I_local_pb = Rho.ORM.addModel(Item_local_pb);

    P_user_fixed.create({'name':'user_fixed','price':2.0});
    I_user_pb.create({'name':'user_pb','price':2.0});

    P_local_fixed.create({'name':'local_fixed','price':2.0});
    I_local_pb.create({'name':'local_pb','price':2.0});


    var user_f = userDB.$execute_sql("Select * from Product");
    expect(user_f[0].map.name).toEqual("user_fixed");
    var user_p = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(user_p[0].map.value).toEqual("user_pb");

    var local_f = localDB.$execute_sql("Select * from Product_local");
    expect(local_f[0].map.name).toEqual("local_fixed");
    var local_p = localDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(local_p[0].map.value).toEqual("local_pb");

    Rho.ORM.databaseFullReset(false,true);

    user_f = userDB.$execute_sql("Select * from Product");
    expect(user_f).toEqual([]);
    user_p = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(user_p).toEqual([]);
    expect(userDB.$is_table_exist("Product")).toBe(true);

    local_f = localDB.$execute_sql("Select * from Product_local");
    expect(local_f).toEqual([]);
    local_p = localDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(local_p).toEqual([]);
    expect(localDB.$is_table_exist("Product_local")).toBe(true);
  });

  it("VT302-0044 | Call databaseFullReset(false,false) should not reset client info and local models ",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    var client_id = userDB.$execute_sql("Select * from client_info");
    expect(client_id[0].map.client_id).toEqual("7");

    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","local");
    };

    var Product2 = function(model){
        model.modelName("Product2");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","user");
    };

    Model = Rho.ORM.addModel(Product);
    Model2 = Rho.ORM.addModel(Product2);

    Model.create({"name":"test","brand":"PUMA"});
    Model2.create({"name":"test2","brand":"PUMA2"});

    var objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    expect(objects[0].map.value).toEqual('test');

    var objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");
    expect(objects_u[0].map.value).toEqual('test2');

    Rho.ORM.databaseFullReset(false,false);

    client_id = userDB.$execute_sql("Select * from client_info");
    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");

    expect(objects_u).toEqual([]);
    expect(objects[0].map.value).toEqual('test');
    expect(client_id[0].map.client_id).toEqual("7");
    expect(objects[0].map.value).toEqual('test');
  });

  it("VT302-0045 | Call databaseFullReset(true,true) should reset client info and local models ",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    var client_id = userDB.$execute_sql("Select * from client_info");
    expect(client_id[0].map.client_id).toEqual("7");

    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","local");
    };

    var Product2 = function(model){
        model.modelName("Product2");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","user");
    };

    Model = Rho.ORM.addModel(Product);
    Model2 = Rho.ORM.addModel(Product2);

    Model.create({"name":"test","brand":"PUMA"});
    Model2.create({"name":"test2","brand":"PUMA2"});

    var db2 = Rho.ORMHelper.dbConnection("local");
    var objects = db2.$execute_sql("select * from OBJECT_VALUES");
    expect(objects[0].map.value).toEqual('test');

    var db_u = Rho.ORMHelper.dbConnection("user");
    var objects_u = db_u.$execute_sql("select * from OBJECT_VALUES");
    expect(objects_u[0].map.value).toEqual('test2');

    Rho.ORM.databaseFullReset(true,true);

    client_id = userDB.$execute_sql("Select * from client_info");
    objects = db2.$execute_sql("select * from OBJECT_VALUES");
    objects_u = db_u.$execute_sql("select * from OBJECT_VALUES");

    expect(client_id).toEqual([]);
    expect(objects_u).toEqual([]);
    expect(objects).toEqual([]);
  });

  it("VT302-0046 | should reset client info databaseFullReset tables",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    var client_id = userDB.$execute_sql("Select * from client_info");
    expect(client_id[0].map.client_id).toEqual("7");

    Rho.ORM.databaseFullReset(true,false);
    client_id = userDB.$execute_sql("Select * from client_info");
    expect(client_id).toEqual([]);
  });

  it("VT302-0047 | should reset client info databaseFullReset tables with undefined params",function(){
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
        model.enable("sync");
    };

    var Model1 = Rho.ORM.addModel(Product);

    var p = Model1.create({'name':'test','price':2.0});
    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product[0].map.value).toEqual("test");

    var ary = {"models":['Product']};
    Rho.ORM.databaseFullReset(undefined,undefined);

    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product).toEqual([]);
  });

  it("VT302-0048 | should reset client info databaseFullReset tables with no params",function(){
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
        model.enable("sync");
        model.enable("fixedSchema");
    };

    var Model1 = Rho.ORM.addModel(Product);

    var p = Model1.create({'name':'test','price':2.0});
    var db_product = userDB.$execute_sql("Select * from Product");
    expect(db_product[0].map.name).toEqual("test");

    var ary = {"models":['Product']};
    Rho.ORM.databaseFullReset();

    db_product = userDB.$execute_sql("Select * from Product");
    expect(db_product).toEqual([]);

    userDB.$execute_sql("DELETE FROM SOURCES");
    userDB.$execute_sql("DELETE FROM OBJECT_VALUES");
    userDB.$execute_sql("DROP TABLE Product");
  });

  it("VT302-0050 | should reset object_values and not sources table if set databaseFullResetAndLogout",function(){
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
        model.enable("sync");
    };

    var Model1 = Rho.ORM.addModel(Product);

    var p = Model1.create({'name':'test','price':2.0});
    var sources_db = userDB.$execute_sql("select * from sources");
    var objects    = userDB.$execute_sql("select * from object_values");

    expect(sources_db[0].map.name).toEqual("Product");
    expect(objects[0].map.value).toEqual("test");

    Rho.ORM.databaseFullResetAndLogout();

    sources_db = userDB.$execute_sql("Select * from sources");
    objects    = userDB.$execute_sql("select * from object_values");
    expect(sources_db[0].map.name).toEqual("Product");
    expect(objects).toEqual([]);
  });

  it("VT302-0053 | should delete all records only from selected models fixedschema databaseFullResetEx",function(){
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.enable("fixedSchema");
        model.addUniqueIndex("u1",["name"]);
        model.set("partition","user");
    };

    var Model1 = Rho.ORM.addModel(Product);

    var p = Model1.create({'name':'test','price':2.0});
    var db_product = userDB.$execute_sql("Select * from Product");
    expect(db_product[0].map.name).toEqual("test");

    var ary = {"models":['Product']};

    Rho.ORM.databaseFullResetEx(ary);
    db_product = userDB.$execute_sql("Select * from Product");
    expect(db_product).toEqual([]);
  });

  it("VT302-0054 | should delete all records only from selected models propertyBag databaseFullResetEx",function(){
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
    };

    var Model1 = Rho.ORM.addModel(Product);

    var p = Model1.create({'name':'test','price':2.0});
    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product[0].map.value).toEqual("test");
    expect(db_product[1].map.value).toEqual("2");

    var ary = {"models":['Product']};

    Rho.ORM.databaseFullResetEx(ary);
    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product).toEqual([]);
  });

  it("VT302-0055 | should reset client_info table if set databaseFullResetEx",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
    };

    var Model1 = Rho.ORM.addModel(Product);

    var p = Model1.create({'name':'test','price':2.0});
    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();
    expect(db_product2).toEqual("7");
    expect(db_product[0].map.value).toEqual("test");
    expect(db_product[1].map.value).toEqual("2");

    var ary = {"models":['Product'],"reset_client_info":true};
    Rho.ORM.databaseFullResetEx(ary);

    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    db_product2 = userDB.$execute_sql("Select * from client_info");
    expect(db_product2).toEqual([]);
  });

  it("VT302-0056 | Call databaseFullResetEx with Model name as Hash and reset_client_info as false and reset_local_models to false",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
    };

    var Product2 = function(model){
        model.modelName("Product2");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
        model.enable("sync");
    };

    var Model1 = Rho.ORM.addModel(Product);
    var Model2 = Rho.ORM.addModel(Product2);

    var p = Model1.create({'name':'test','price':2.0});
    var p2 = Model2.create({'name':'test2','price':4.0});

    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    expect(db_product[0].map.value).toEqual("test");
    expect(db_product[1].map.value).toEqual("2");
    expect(db_product[2].map.value).toEqual("test2");
    expect(db_product[3].map.value).toEqual("4");

    var ary = {"models":['Product'],"reset_local_models":false,"reset_client_info":false};
    Rho.ORM.databaseFullResetEx(ary);

    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");

    db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    expect(db_product[0].map.value).toEqual("test2");
    expect(db_product[1].map.value).toEqual("4");
  });

  it("VT302-0057 | Call databaseFullResetEx with Model name as Hash and reset_client_info as false",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
    };

    var Product2 = function(model){
        model.modelName("Product2");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
    };

    var Model1 = Rho.ORM.addModel(Product);
    var Model2 = Rho.ORM.addModel(Product2);

    var p = Model1.create({'name':'test','price':2.0});
    var p2 = Model2.create({'name':'test2','price':4.0});

    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    expect(db_product[0].map.value).toEqual("test");
    expect(db_product[1].map.value).toEqual("2");
    expect(db_product[2].map.value).toEqual("test2");
    expect(db_product[3].map.value).toEqual("4");

    var ary = {"models":['Product'],"reset_client_info":false};
    Rho.ORM.databaseFullResetEx(ary);

    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    expect(db_product[0].map.value).toEqual("test2");
    expect(db_product[1].map.value).toEqual("4");
  });

  it("VT302-0058 | Call databaseFullResetEx with Model name as Hash and reset_client_info as false and reset_local_models to true",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
    };

    var Model1 = Rho.ORM.addModel(Product);

    var p = Model1.create({'name':'test','price':2.0});
    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();
    expect(db_product2).toEqual("7");
    expect(db_product[0].map.value).toEqual("test");
    expect(db_product[1].map.value).toEqual("2");

    var ary = {"models":['Product'],"reset_client_info":false,"reset_local_models":true};
    Rho.ORM.databaseFullResetEx(ary);

    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    db_product2 = Rho.ORM.getClientId();
    expect(db_product2).toEqual("7");
    expect(db_product).toEqual([]);
  });

  it("VT302-0060 | should do nothing if localdb and localdb flag set to false",function(){
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","local");
    };

    var Model1 = Rho.ORM.addModel(Product);

    var p = Model1.create({'name':'test','price':2.0});
    var db_product = localDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product[0].map.value).toEqual("test");
    expect(db_product[1].map.value).toEqual("2");

    var ary = {"models":['Product'],"reset_local_models":false,"reset_client_info":false};
    Rho.ORM.databaseFullResetEx(ary);

    db_product = localDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product[0].map.value).toEqual("test");
    expect(db_product[1].map.value).toEqual("2");
  });

  it("VT302-0062 | should reset client and local db if databaseFullclientResetAndLogout",function(){
    localDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    var Product = function(model){
      model.modelName("Product");
      model.property("name","string");
      model.property("price","float");
      model.enable("sync");
      model.set("partition","local");
    };

    var Model1 = Rho.ORM.addModel(Product);

    var p = Model1.create({'name':'test','price':2.0});
    var objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    var client_info = localDB.$execute_sql("select * from client_info");
    expect(objects[0].map.value).toEqual("test");
    expect(client_info[0].map.client_id).toEqual("7");
    Rho.ORM.databaseFullclientResetAndLogout();

    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    client_info = localDB.$execute_sql("select * from client_info");
    expect(objects).toEqual([]);
    expect(client_info).toEqual([]);
  });

  // FIXME: !!!
  it("VT302-0063 | call databaseLocalReset without having any local model | Should not removed data from synced database",function(){
    var db = Rho.ORMHelper.dbConnection("user");
    db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    var Product = function(model){
        model.modelName("Product");
        model.enable("sync");
        model.property("name","string");
        model.property("price","float");
        model.enable("fixedSchema");
        model.set("partition","user");
    };

    var Model = Rho.ORM.addModel(Product);
    Model.create({"name":"test"});

    Rho.ORM.databaseLocalReset();

    sources = Rho.ORMHelper.getAllSources();
    var res = db.$execute_sql("SELECT * FROM Product Where name = 'test' ");
    var clientId = Rho.ORM.getClientId();

    expect(Model).toBeDefined();
    expect(clientId).toEqual("7");
    expect(res[0].map.name).toEqual('test');

    db.$execute_sql("DROP TABLE Product");
  });

  // FIXME: !!!
  it("VT302-0065 | call databaseLocalReset with changes in local model | Should removed local model data",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","local");
    };

    var Model = Rho.ORM.addModel(Product);
    Model.create({"name":"test"});
    var objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    expect(objects[0].map.value).toEqual("test");

    Rho.ORM.databaseLocalReset();

    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    var clientId = Rho.ORM.getClientId();

    expect(Model).toBeDefined();
    expect(objects).toEqual([]);
    expect(clientId).toEqual("7");

    localDB.$execute_sql("DELETE FROM SOURCES");
    localDB.$execute_sql("DELETE FROM OBJECT_VALUES");
  });

  // FIXME: !!!
  it("VT302-0066 | call databaseLocalReset with changes in both local and user model | Should removed local model data",function(){
    var client_db = Rho.ORMHelper.dbConnection("user");
    client_db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","local");
    };

    var Product_u = function(model){
        model.modelName("Product_u");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
    };

    var Model = Rho.ORM.addModel(Product);
    var Model_u = Rho.ORM.addModel(Product_u);

    Model.create({"name":"test"});
    Model_u.create({"name":"test_u"});

    var db = Rho.ORMHelper.dbConnection("local");
    var objects = db.$execute_sql("select * from OBJECT_VALUES");
    var db_u = Rho.ORMHelper.dbConnection("user");
    var objects_u = db_u.$execute_sql("select * from OBJECT_VALUES");


    //dispCurrentProcess(JSON.stringify(objects));
    expect(objects[0].map.value).toEqual("test");
    expect(objects_u[0].map.value).toEqual("test_u");

    Rho.ORM.databaseLocalReset()

    objects = db.$execute_sql("select * from OBJECT_VALUES");
    objects_u = db_u.$execute_sql("select * from OBJECT_VALUES");
    var clientId = Rho.ORM.getClientId();

    expect(Model).toBeDefined();
    expect(objects_u[0].map.value).toEqual("test_u");
    expect(clientId).toEqual("7");

    db.$execute_sql("DELETE FROM SOURCES");
    db.$execute_sql("DELETE FROM OBJECT_VALUES");
    //Rho.ORM.clear();
  });

  it("VT302-0068b | Call haveLocalChanges without having any model",function(){
    expect(Rho.ORM.haveLocalChanges()).toEqual(false);
  });

  it("VT302-0068 | should return true if a model objects have local changes for sync haveLocalChanges",function(){
    expect(Rho.ORM.haveLocalChanges()).toEqual(false);

    userDB.$execute_sql("INSERT INTO CHANGED_VALUES (object) VALUES('meobj')");
    expect(Rho.ORM.haveLocalChanges()).toEqual(true);

    userDB.$execute_sql("DELETE FROM SOURCES");
    userDB.$execute_sql("DELETE FROM OBJECT_VALUES");
    userDB.$execute_sql("DELETE FROM CHANGED_VALUES");
    expect(Rho.ORM.haveLocalChanges()).toEqual(false);
  });

  it("should load source from table if exists",function(){
    Rho.ORM.clearFreeSourceIds();
    localDB.$execute_sql("DELETE FROM SOURCES");

    console.log("add model1 'Customer'");
    var customer = Rho.ORM.addModel(function(model){
      model.modelName("Customer");
      model.set("partition","local");
    });
    console.log("add model2 'Product'");
    var product = Rho.ORM.addModel(function(model){
      model.modelName("Product");
      model.set("partition","local");
    });

    var sources = Rho.ORMHelper.getAllSources();
    var customer_src_id = sources["Customer"].source_id;
    var product_src_id  = sources["Product"].source_id;

    expect(product_src_id).toEqual(40002);
    expect(customer_src_id).toEqual(40001);
    db_product = localDB.$execute_sql("select source_id from sources where name = 'Product'");
    expect(db_product.length).toEqual(1);
    expect(db_product[0].map.source_id).toEqual("40002");

    db_customer = localDB.$execute_sql("select source_id from sources where name = 'Customer'");
    expect(db_customer[0].map.source_id).toEqual("40001");
    expect(db_customer.length).toEqual(1);

    Rho.ORM.clear(); // TODO: do we need it?

    console.log("add model4 'Customer2'");
    customer = Rho.ORM.addModel(function(model){
      model.modelName("Customer");
      model.set("partition","local");
    });

    console.log("add model3 'Product2'");
    product = Rho.ORM.addModel(function(model){
      model.modelName("Product");
      model.set("partition","local");
    });

    sources = Rho.ORMHelper.getAllSources();
    expect(String(customer_src_id)).toEqual(sources["Customer"].source_id);
    expect(String(product_src_id)).toEqual(sources["Product"].source_id);
  });
});