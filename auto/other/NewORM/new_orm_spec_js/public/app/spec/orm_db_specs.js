describe("ORM Db Reset Specs", function() {
  var localDB = Rho.ORMHelper.dbConnection('local');
  var userDB  = Rho.ORMHelper.dbConnection('user');
  var appDB   = Rho.ORMHelper.dbConnection('app');

  var reset = function() {
    var partitions = Rho.ORMHelper.getDbPartitions();
    $.each(partitions, function(index, db) {
      db.executeSql("DELETE FROM SOURCES");
      db.executeSql("DELETE FROM OBJECT_VALUES");
      db.executeSql("DELETE FROM CHANGED_VALUES");
      if(db.isTableExist("Product")) db.executeSql("DROP TABLE Product");
    });
  };
  var find_value_of_attrib = function(array_of_maps, att_name) {
    for (var i in array_of_maps) {
      if(array_of_maps[i].attrib == att_name) return array_of_maps[i].value;
    }
    return null;
  };
  var find_attrib_with_value = function(array_of_maps, name, value) {
    for (var i in array_of_maps) {
      if(array_of_maps[i].attrib == name && array_of_maps[i].value == value)
        return array_of_maps[i].value;
    }
    return null;
  };

  beforeEach(function() {
    reset();
    Rho.ORM.clear();
  });

  it("Call databaseFullReset(true) should reset client info databaseFullReset tables",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var client_id = userDB.executeSql("Select * from client_info");
    expect(client_id[0].client_id).toEqual("7");

   if (useNewOrm) {
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

    var objects = localDB.executeSql("select * from OBJECT_VALUES");
    var objects_u = userDB.executeSql("select * from OBJECT_VALUES");

    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
    expect(find_value_of_attrib(objects_u, 'name')).toEqual('test2');

    Rho.ORM.databaseFullReset(true, false);

    client_id = userDB.executeSql("Select * from client_info");
    objects = localDB.executeSql("select * from OBJECT_VALUES");
    objects_u = userDB.executeSql("select * from OBJECT_VALUES");

    expect(client_id).toEqual([]);
    expect(objects_u).toEqual([]);
    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
  });

  it("Call databaseFullReset(false) should not reset client info databaseFullReset tables",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var client_id = userDB.executeSql("Select * from client_info");
    expect(client_id[0].client_id).toEqual("7");

    if (useNewOrm) {
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

    var objects = localDB.executeSql("select * from OBJECT_VALUES");
    var objects_u = userDB.executeSql("select * from OBJECT_VALUES");

    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
    expect(find_value_of_attrib(objects_u, 'name')).toEqual('test2');

    Rho.ORM.databaseFullReset(false, false);

    client_id = userDB.executeSql("Select * from client_info");
    objects = localDB.executeSql("select * from OBJECT_VALUES");
    objects_u = userDB.executeSql("select * from OBJECT_VALUES");

    expect(client_id[0].client_id).toEqual("7");
    expect(objects_u).toEqual([]);
    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
    expect(find_value_of_attrib(objects, 'brand')).toEqual('PUMA');
  });

  it("should reset client info databaseFullReset tables of all partitions",function(){
    if (useNewOrm) {
      var Product_user_fixed = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
        model.enable("sync");
        model.fixed_schema = true;
      };
      var Item_user_pb = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
        model.enable("sync");
      };
      var Product_local_fixed = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","local");
        model.fixed_schema = true;
      };
      var Item_local_pb = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","local");
      };
      var P_user_fixed = Rho.ORM.addModel("Product", Product_user_fixed);
      var I_user_pb = Rho.ORM.addModel("Item", Item_user_pb);
      var P_local_fixed = Rho.ORM.addModel("Product_local", Product_local_fixed);
      var I_local_pb = Rho.ORM.addModel("Item_local", Item_local_pb);
    } else {
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
        model.enable("fixedSchema");
      };
      var Item_local_pb = function(model){
        model.modelName("Item_local");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","local");
      };
      var P_user_fixed = Rho.ORM.addModel(Product_user_fixed);
      var I_user_pb = Rho.ORM.addModel(Item_user_pb);
      var P_local_fixed = Rho.ORM.addModel(Product_local_fixed);
      var I_local_pb = Rho.ORM.addModel(Item_local_pb);
    }

    P_user_fixed.create({'name':'user_fixed','price':2.0});
    I_user_pb.create({'name':'user_pb','price':2.0});
    P_local_fixed.create({'name':'local_fixed','price':2.0});
    I_local_pb.create({'name':'local_pb','price':2.0});

    var user_f = userDB.executeSql("Select * from Product");
    var user_p = userDB.executeSql("Select * from OBJECT_VALUES");
    expect(user_f[0].name).toEqual("user_fixed");
    expect(find_value_of_attrib(user_p, 'name')).toEqual("user_pb");

    var tables = localDB.executeSql("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
    var local_f = localDB.executeSql("select * from Product_local");

    var local_p = localDB.executeSql("Select * from OBJECT_VALUES");
    expect(local_f[0].name).toEqual("local_fixed");
    expect(find_value_of_attrib(local_p, 'name')).toEqual("local_pb");

    Rho.ORM.databaseFullReset(false,true);

    user_f = userDB.executeSql("Select * from Product");
    user_p = userDB.executeSql("Select * from OBJECT_VALUES");
    expect(user_f).toEqual([]);
    expect(user_p).toEqual([]);
    expect(userDB.isTableExist("Product")).toBe(true);

    local_f = localDB.executeSql("Select * from Product_local");
    local_p = localDB.executeSql("Select * from OBJECT_VALUES");
    expect(local_f).toEqual([]);
    expect(local_p).toEqual([]);
    expect(localDB.isTableExist("Product_local")).toBe(true);
  });

  it("Call databaseFullReset(false,false) should not reset client info and local models ",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var client_id = userDB.executeSql("Select * from client_info");
    expect(client_id[0].client_id).toEqual("7");

    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name", "string", "");
        model.setModelProperty("brand", "string", "");
        model.set("partition","local");
      };
      var Product2 = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("brand","string","");
        model.set("partition","user");
      };
      var model = Rho.ORM.addModel("Product", Product);
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
      var model = Rho.ORM.addModel(Product);
      var model2 = Rho.ORM.addModel(Product2);
    }

    model.create({"name":"test","brand":"PUMA"});
    model2.create({"name":"test2","brand":"PUMA2"});

    var objects = localDB.executeSql("select * from OBJECT_VALUES");
    var objects_u = userDB.executeSql("select * from OBJECT_VALUES");
    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
    expect(find_value_of_attrib(objects_u, 'name')).toEqual('test2');

    Rho.ORM.databaseFullReset(false,false);

    client_id = userDB.executeSql("Select * from client_info");
    objects = localDB.executeSql("select * from OBJECT_VALUES");
    objects_u = userDB.executeSql("select * from OBJECT_VALUES");
    expect(client_id[0].client_id).toEqual("7");
    expect(objects_u).toEqual([]);
    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
  });

  it("Call databaseFullReset(true,true) should reset client info and local models ",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var client_id = userDB.executeSql("Select * from client_info");
    expect(client_id[0].client_id).toEqual("7");

    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name", "string", "");
        model.setModelProperty("brand", "string", "");
        model.set("partition","local");
      };
      var Product2 = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("brand","string","");
        model.set("partition","user");
      };
      var model = Rho.ORM.addModel("Product", Product);
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
      var model = Rho.ORM.addModel(Product);
      var model2 = Rho.ORM.addModel(Product2);
    }
    model.create({"name":"test","brand":"PUMA"});
    model2.create({"name":"test2","brand":"PUMA2"});

    var objects = localDB.executeSql("select * from OBJECT_VALUES");
    var objects_u = userDB.executeSql("select * from OBJECT_VALUES");

    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
    expect(find_value_of_attrib(objects_u, 'name')).toEqual('test2');

    Rho.ORM.databaseFullReset(true,true);

    client_id = userDB.executeSql("Select * from client_info");
    objects = localDB.executeSql("select * from OBJECT_VALUES");
    objects_u = userDB.executeSql("select * from OBJECT_VALUES");

    expect(client_id).toEqual([]);
    expect(objects_u).toEqual([]);
    expect(objects).toEqual([]);
  });

  it("should reset client info databaseFullReset tables",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    var client_id = userDB.executeSql("Select * from client_info");
    expect(client_id[0].client_id).toEqual("7");

    Rho.ORM.databaseFullReset(true,false);
    client_id = userDB.executeSql("Select * from client_info");
    expect(client_id).toEqual([]);
  });

  it("should reset client info databaseFullReset tables with undefined params",function(){
    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
        model.enable("sync");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
        model.enable("sync");
      };
      var model1 = Rho.ORM.addModel(Product);
    }
    var p = model1.create({'name':'test','price':2.0});

    var db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    expect(db_product[0].value).toEqual("test");

    Rho.ORM.databaseFullReset(undefined,undefined);

    db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    expect(db_product).toEqual([]);
  });

  it("should reset client info databaseFullReset tables with no params",function(){
    if (useNewOrm) {
      var Product = function(model){
        model.fixed_schema =true;
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
        model.enable("sync");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
        model.enable("sync");
        model.enable("fixedSchema");
      };
      var model1 = Rho.ORM.addModel(Product);
    }

    var p = model1.create({'name':'test','price':2.0});
    var db_product = userDB.executeSql("Select * from Product");
    expect(db_product[0].name).toEqual("test");

    Rho.NewORM.databaseFullReset();

    db_product = userDB.executeSql("Select * from Product");
    expect(db_product).toEqual([]);
  });

  it("should reset object_values and not sources table if set databaseFullResetAndLogout",function(){
    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
        model.enable("sync");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
        model.enable("sync");
      };
      var model1 = Rho.ORM.addModel(Product);
    }
    var p = model1.create({'name':'test','price':2.0});
    var sources_db = userDB.executeSql("select * from sources");
    var objects    = userDB.executeSql("select * from object_values");

    expect(sources_db[0].name).toEqual("Product");
    expect(objects[0].value).toEqual("test");

    Rho.ORM.databaseFullResetAndLogout();

    sources_db = userDB.executeSql("Select * from sources");
    objects    = userDB.executeSql("select * from object_values");
    expect(sources_db[0].name).toEqual("Product");
    expect(objects).toEqual([]);
  });

  it("should delete all records only from selected models fixedschema databaseFullResetEx",function(){
    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.fixed_schema = true;
        model.setSchemaIndex("u1",["name"],true);
        model.set("partition","user");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.enable("fixedSchema");
        model.addUniqueIndex("u1",["name"]);
        model.set("partition","user");
      };
      var model1 = Rho.ORM.addModel(Product);
    }
    var p = model1.create({'name':'test','price':2.0});
    var db_product = userDB.executeSql("Select * from Product");
    expect(db_product[0].name).toEqual("test");

    if (useNewOrm)
      var ary = ['Product'];
    else
      var ary = {"models":['Product']};

    Rho.ORM.databaseFullResetEx(ary, false, false);
    db_product = userDB.executeSql("Select * from Product");
    expect(db_product).toEqual([]);
  });

  it("should delete all records only from selected models propertyBag databaseFullResetEx",function(){
    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
      };
      var model1 = Rho.ORM.addModel(Product);
    }
    var p = model1.create({'name':'test','price':2.0});
    var db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    expect(db_product[0].value).toEqual("test");
    expect(db_product[1].value).toEqual("2");

    if (useNewOrm)
      var ary = ['Product'];
    else
      var ary = {"models":['Product']};
    Rho.ORM.databaseFullResetEx(ary, false, false);

    db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    expect(db_product).toEqual([]);
  });

  it("should reset client_info table if set databaseFullResetEx",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
      };
      var model1 = Rho.ORM.addModel(Product);
    }
    var p = model1.create({'name':'test','price':2.0});
    var db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    expect(db_product[0].value).toEqual("test");
    expect(db_product[1].value).toEqual("2");

    if (useNewOrm) {
      var ary = [];
      Rho.ORM.databaseFullResetEx(ary, true, false);
    } else {
      var ary = {"models":['Product'],"reset_client_info":true};
      Rho.ORM.databaseFullResetEx(ary);
    }
    db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    db_product2 = userDB.executeSql("Select * from client_info");

    expect(db_product2).toEqual([]);
  });

  it("Call databaseFullResetEx with Model name as Hash and reset_client_info as false and reset_local_models to false",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
      };
      var Product2 = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
        model.enable("sync");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
      var model2 = Rho.ORM.addModel("Product2", Product2);
    } else {
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
      var model1 = Rho.ORM.addModel(Product);
      var model2 = Rho.ORM.addModel(Product2);
    }
    var p = model1.create({'name':'test','price':2.0});
    var p2 = model2.create({'name':'test2','price':4.0});
    var db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    expect(db_product.length).toBe(4);
    expect(find_attrib_with_value(db_product,'name','test')).toEqual("test");
    expect(find_attrib_with_value(db_product,'price','2')).toEqual("2");
    expect(find_attrib_with_value(db_product,'name','test2')).toEqual("test2");
    expect(find_attrib_with_value(db_product,'price','4')).toEqual("4");

    if (useNewOrm) {
      Rho.ORM.databaseFullResetEx(['Product'], false, false);
    }
    else {
      var ary = {"models":['Product'],"reset_local_models":false,"reset_client_info":false};
      Rho.ORM.databaseFullResetEx(ary);
    }

    db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    expect(db_product.length).toBe(2);
    expect(find_attrib_with_value(db_product,'name','test2')).toEqual("test2");
    expect(find_attrib_with_value(db_product,'price','4')).toEqual("4");
  });

  it("Call databaseFullResetEx with Model name as Hash and reset_client_info as false",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
      };
      var Product2 = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
      var model2 = Rho.ORM.addModel("Product2", Product2);
    } else {
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
      var model1 = Rho.ORM.addModel(Product);
      var model2 = Rho.ORM.addModel(Product2);
    }
    var p = model1.create({'name':'test','price':2.0});
    var p2 = model2.create({'name':'test2','price':4.0});

    var db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();

    expect(db_product.length).toBe(4);
    expect(find_attrib_with_value(db_product,'name','test')).toEqual("test");
    expect(find_attrib_with_value(db_product,'price','2')).toEqual("2");
    expect(find_attrib_with_value(db_product,'name','test2')).toEqual("test2");
    expect(find_attrib_with_value(db_product,'price','4')).toEqual("4");

    if (useNewOrm) {
      Rho.ORM.databaseFullResetEx(['Product'], false, false);
    }
    else {
      var ary = {"models":['Product'],"reset_client_info":false};
      Rho.ORM.databaseFullResetEx(ary);
    }

    db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    expect(db_product.length).toBe(2);
    expect(find_attrib_with_value(db_product,'name','test2')).toEqual("test2");
    expect(find_attrib_with_value(db_product,'price','4')).toEqual("4");
  });

  it("Call databaseFullResetEx with Model name as Hash and reset_client_info as false and reset_local_models to true",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","user");
      };
      var model1 = Rho.ORM.addModel(Product);
    }

    var p = model1.create({'name':'test','price':2.0});
    var db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();
    expect(db_product2).toEqual("7");
    expect(db_product.length).toBe(2);
    expect(find_attrib_with_value(db_product,'name','test')).toEqual("test");
    expect(find_attrib_with_value(db_product,'price','2')).toEqual("2");

    if (useNewOrm) {
      Rho.ORM.databaseFullResetEx(['Product'], false, true);
    }
    else {
      var ary = {"models":['Product'],"reset_client_info":false,"reset_local_models":true};
      Rho.ORM.databaseFullResetEx(ary);
    }

    db_product = userDB.executeSql("Select * from OBJECT_VALUES");
    db_product2 = Rho.ORM.getClientId();
    expect(db_product2).toEqual("7");
    expect(db_product).toEqual([]);
  });

  it("should do nothing if localdb and localdb flag set to false",function(){
    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","local");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","local");
      };
      var model1 = Rho.ORM.addModel(Product);
    }
    var p = model1.create({'name':'test','price':2.0});
    var db_product = localDB.executeSql("Select * from OBJECT_VALUES");
    expect(db_product.length).toBe(2);
    expect(find_attrib_with_value(db_product,'name','test')).toEqual("test");
    expect(find_attrib_with_value(db_product,'price','2')).toEqual("2");

    if (useNewOrm) {
      Rho.ORM.databaseFullResetEx(['Product'], false, false);
    }
    else {
      var ary = {"models":['Product'],"reset_local_models":false,"reset_client_info":false};
      Rho.ORM.databaseFullResetEx(ary);
    }

    db_product = localDB.executeSql("Select * from OBJECT_VALUES");
    expect(db_product.length).toBe(2);
    expect(find_attrib_with_value(db_product,'name','test')).toEqual("test");
    expect(find_attrib_with_value(db_product,'price','2')).toEqual("2");
  });

  it("should reset client and local db if databaseFullclientResetAndLogout",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","local");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","local");
      };
      var model1 = Rho.ORM.addModel(Product);
    }
    var p = model1.create({'name':'test','price':2.0});
    var objects = localDB.executeSql("select * from OBJECT_VALUES");
    var client_info = userDB.executeSql("select * from client_info");

    expect(find_attrib_with_value(objects,'name','test')).toEqual("test");
    expect(client_info[0].client_id).toEqual("7");

    Rho.ORM.databaseFullclientResetAndLogout();

    objects = localDB.executeSql("select * from OBJECT_VALUES");
    client_info = userDB.executeSql("select * from client_info");
    expect(objects).toEqual([]);
    expect(client_info).toEqual([]);
  });

  it("call databaseLocalReset without having any local model | Should not removed data from synced database",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    if (useNewOrm) {
      var Product = function(model){
        model.enable("sync");
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.fixed_schema = true;
        model.set("partition","user");
      };
      var model = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("sync");
        model.property("name","string");
        model.property("price","float");
        model.enable("fixedSchema");
        model.set("partition","user");
      };
      var model = Rho.ORM.addModel(Product);
    }
    model.create({"name":"test"});

    Rho.ORM.databaseLocalReset();

    var res = userDB.executeSql("SELECT * FROM Product Where name = 'test' ");
    var clientId = Rho.ORM.getClientId();

    expect(model).toBeDefined();
    expect(clientId).toEqual("7");
    expect(res[0].name).toEqual('test');
  });

  it("call databaseLocalReset with changes in local model | Should removed local model data",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","local");
      };
      var model = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.set("partition","local");
      };
      var model = Rho.ORM.addModel(Product);
    }

    model.create({"name":"test"});
    var objects = localDB.executeSql("select * from OBJECT_VALUES");
    expect(objects[0].value).toEqual("test");

    Rho.ORM.databaseLocalReset();

    objects = localDB.executeSql("select * from OBJECT_VALUES");
    var clientId = Rho.ORM.getClientId();

    expect(model).toBeDefined();
    expect(objects).toEqual([]);
    expect(clientId).toEqual("7");
  });

  it("call databaseLocalReset with changes in both local and user model | Should removed local model data",function(){
    userDB.executeSql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    if (useNewOrm) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","local");
      };
      var Product_u = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","user");
      };
      var model = Rho.ORM.addModel("Product", Product);
      var model_u = Rho.ORM.addModel("Product_u", Product_u);
    } else {
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
      var model = Rho.ORM.addModel(Product);
      var model_u = Rho.ORM.addModel(Product_u);
    }

    model.create({"name":"test"});
    model_u.create({"name":"test_u"});

    var objects = localDB.executeSql("select * from OBJECT_VALUES");
    var objects_u = userDB.executeSql("select * from OBJECT_VALUES");

    expect(find_attrib_with_value(objects,'name','test')).toEqual("test");
    expect(find_attrib_with_value(objects_u,'name','test_u')).toEqual("test_u");

    Rho.ORM.databaseLocalReset()

    objects = localDB.executeSql("select * from OBJECT_VALUES");
    objects_u = userDB.executeSql("select * from OBJECT_VALUES");
    var clientId = Rho.ORM.getClientId();

    expect(model).toBeDefined();
    expect(clientId).toEqual("7");
    expect(objects).toEqual([]);
    expect(find_attrib_with_value(objects_u,'name','test_u')).toEqual("test_u");
  });

  it("Call haveLocalChanges without having any model",function(){
    expect(Rho.ORM.haveLocalChanges()).toEqual(false);
  });

  it("should return true if a model objects have local changes for sync haveLocalChanges",function(){
    expect(Rho.ORM.haveLocalChanges()).toEqual(false);

    userDB.executeSql("INSERT INTO CHANGED_VALUES (object) VALUES('meobj')");
    expect(Rho.ORM.haveLocalChanges()).toEqual(true);

    userDB.executeSql("DELETE FROM SOURCES");
    userDB.executeSql("DELETE FROM OBJECT_VALUES");
    userDB.executeSql("DELETE FROM CHANGED_VALUES");
    expect(Rho.ORM.haveLocalChanges()).toEqual(false);
  });

  it("should load source from table if it exists",function(){
    if (!useNewOrm) Rho.ORM.clearFreeSourceIds();
    localDB.executeSql("DELETE FROM SOURCES");

    if (useNewOrm) {
      var customer = Rho.ORM.addModel("Customer", function(model){
        model.set("partition","local");
      });
      var product = Rho.ORM.addModel("Product", function(model){
        model.set("partition","local");
     });
     var customer_src_id = Rho.ORM.getModel('Customer').source_id;
     var product_src_id  = Rho.ORM.getModel('Product').source_id;
    } else {
      var customer = Rho.ORM.addModel(function(model){
        model.modelName("Customer");
        model.set("partition","local");
      });
      var product = Rho.ORM.addModel(function(model){
        model.modelName("Product");
        model.set("partition","local");
      });
      var sources = Rho.ORMHelper.getAllSources();
      var customer_src_id = sources["Customer"].source_id;
      var product_src_id  = sources["Product"].source_id;
    }
    expect(product_src_id).toBeGreaterThan(0);
    expect(customer_src_id).toBeGreaterThan(0);
    db_product = localDB.executeSql("select source_id from sources where name = 'Product'");
    db_customer = localDB.executeSql("select source_id from sources where name = 'Customer'");

    expect(db_product.length).toEqual(1);
    expect(db_customer.length).toEqual(1);

    expect(parseInt(db_product[0].source_id)).toEqual(product_src_id);
    expect(parseInt(db_customer[0].source_id)).toEqual(customer_src_id);
  });

});