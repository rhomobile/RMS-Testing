describe("ORM Db Reset Specs", function() {
  var useNewORM = false;
  var useNewORM = Rho.NewORM.useNewOrm();
  console.log("useNewORM: " + useNewORM);

  var localDB = Rho.ORMHelper.dbConnection('local');
  var userDB  = Rho.ORMHelper.dbConnection('user');
  var appDB   = Rho.ORMHelper.dbConnection('app');

  var reset = function() {
    var partitions = Rho.ORMHelper.getDbPartitions();
    $.each(partitions, function(index, db) {
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      db.$execute_sql("DELETE FROM CHANGED_VALUES");
      if(db.$is_table_exist("Product")) db.$execute_sql("DROP TABLE Product");
    });
  };
  var find_value_of_attrib = function(array_of_maps, att_name) {
    for (var i in array_of_maps) {
      if(array_of_maps[i].map.attrib == att_name) return array_of_maps[i].map.value;
    }
    return null;
  };
  var find_attrib_with_value = function(array_of_maps, name, value) {
    for (var i in array_of_maps) {
      if(array_of_maps[i].map.attrib == name && array_of_maps[i].map.value == value)
        return array_of_maps[i].map.value;
    }
    return null;
  };

  beforeEach(function() {
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

    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
    expect(find_value_of_attrib(objects_u, 'name')).toEqual('test2');

    Rho.ORM.databaseFullReset(true, false);

    client_id = userDB.$execute_sql("Select * from client_info");
    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");

    expect(client_id).toEqual([]);
    expect(objects_u).toEqual([]);
    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
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
    var objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");

    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
    expect(find_value_of_attrib(objects_u, 'name')).toEqual('test2');

    Rho.ORM.databaseFullReset(false, false);

    client_id = userDB.$execute_sql("Select * from client_info");
    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");

    expect(client_id[0].map.client_id).toEqual("7");
    expect(objects_u).toEqual([]);
    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
    expect(find_value_of_attrib(objects, 'brand')).toEqual('PUMA');
  });

  // FIXME:
  it("VT302-0043 | should reset client info databaseFullReset tables of all partitions",function(){
    if (useNewORM) {
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
        model.enable("sync");
        model.fixed_schema = true;
      };
      var Item_local_pb = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.set("partition","local");
        model.enable("sync");
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
    }

    P_user_fixed.create({'name':'user_fixed','price':2.0});
    I_user_pb.create({'name':'user_pb','price':2.0});
    P_local_fixed.create({'name':'local_fixed','price':2.0});
    I_local_pb.create({'name':'local_pb','price':2.0});
    console.log("1: ");

    var user_f = userDB.$execute_sql("Select * from Product");

    console.log(JSON.stringify(user_f));
    var user_p = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(user_f[0].map.name).toEqual("user_fixed");
    expect(find_value_of_attrib(user_p, 'name')).toEqual("user_pb");

    console.log("2: tables: ");
    var tables = localDB.$execute_sql("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
    console.log(JSON.stringify(tables));
    var local_f = localDB.$execute_sql("select * from Product_local");
    // FIXME:
    // => could not prepare statement: 1; Message: no such table: Product_local
    console.log("Product_local: ");
    console.log(JSON.stringify(local_f));

    var local_p = localDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(local_f[0].map.name).toEqual("local_fixed");
    expect(find_value_of_attrib(local_p, 'name')).toEqual("local_pb");
    console.log("3: ");

    Rho.ORM.databaseFullReset(false,true);

    console.log("4: ");
    user_f = userDB.$execute_sql("Select * from Product");
    user_p = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(user_f).toEqual([]);
    expect(user_p).toEqual([]);
    expect(userDB.$is_table_exist("Product")).toBe(true);
    console.log("5: ");

    local_f = localDB.$execute_sql("Select * from Product_local");
    local_p = localDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(local_f).toEqual([]);
    expect(local_p).toEqual([]);
    expect(localDB.$is_table_exist("Product_local")).toBe(true);
  });

  it("VT302-0044 | Call databaseFullReset(false,false) should not reset client info and local models ",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var client_id = userDB.$execute_sql("Select * from client_info");
    expect(client_id[0].map.client_id).toEqual("7");

    if (useNewORM) {
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

    var objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    var objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");
    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
    expect(find_value_of_attrib(objects_u, 'name')).toEqual('test2');

    Rho.ORM.databaseFullReset(false,false);

    client_id = userDB.$execute_sql("Select * from client_info");
    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");
    expect(client_id[0].map.client_id).toEqual("7");
    expect(objects_u).toEqual([]);
    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
  });

  it("VT302-0045 | Call databaseFullReset(true,true) should reset client info and local models ",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    var client_id = userDB.$execute_sql("Select * from client_info");
    expect(client_id[0].map.client_id).toEqual("7");

    if (useNewORM) {
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

    var objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    var objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");

    expect(find_value_of_attrib(objects, 'name')).toEqual('test');
    expect(find_value_of_attrib(objects_u, 'name')).toEqual('test2');

    Rho.ORM.databaseFullReset(true,true);

    client_id = userDB.$execute_sql("Select * from client_info");
    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");

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
    if (useNewORM) {
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

    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product[0].map.value).toEqual("test");

    Rho.ORM.databaseFullReset(undefined,undefined);

    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product).toEqual([]);
  });

  // FIXME:
  it("VT302-0048 | should reset client info databaseFullReset tables with no params",function(){
    if (useNewORM) {
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
    var db_product = userDB.$execute_sql("Select * from Product");
    expect(db_product[0].map.name).toEqual("test");

    // FIXME: Wrong number of arguments: 0 instead of 2
    Rho.ORM.databaseFullReset();

    db_product = userDB.$execute_sql("Select * from Product");
    expect(db_product).toEqual([]);
  });

  it("VT302-0050 | should reset object_values and not sources table if set databaseFullResetAndLogout",function(){
    if (useNewORM) {
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
    if (useNewORM) {
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
    var db_product = userDB.$execute_sql("Select * from Product");
    expect(db_product[0].map.name).toEqual("test");

    if (useNewORM)
      var ary = ['Product'];
    else
      var ary = {"models":['Product']};

    Rho.ORM.databaseFullResetEx(ary, false, false);
    db_product = userDB.$execute_sql("Select * from Product");
    expect(db_product).toEqual([]);
  });

  it("VT302-0054 | should delete all records only from selected models propertyBag databaseFullResetEx",function(){
    if (useNewORM) {
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
    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product[0].map.value).toEqual("test");
    expect(db_product[1].map.value).toEqual("2");

    if (useNewORM)
      var ary = ['Product'];
    else
      var ary = {"models":['Product']};
    Rho.ORM.databaseFullResetEx(ary, false, false);

    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product).toEqual([]);
  });

  // FIXME:
  it("VT302-0055 | should reset client_info table if set databaseFullResetEx",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    if (useNewORM) {
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
    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    expect(db_product[0].map.value).toEqual("test");
    expect(db_product[1].map.value).toEqual("2");
    if (useNewORM) {
      var ary = ['Product'];
      Rho.ORM.databaseFullResetEx(ary, true, false);
      // FIXME:
      // => reset_client_info should not be true if reset selected models
    }
    else {
      var ary = {"models":['Product'],"reset_client_info":true};
      Rho.ORM.databaseFullResetEx(ary);
    }

    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    db_product2 = userDB.$execute_sql("Select * from client_info");
    expect(db_product2).toEqual([]);
  });

  it("VT302-0056 | Call databaseFullResetEx with Model name as Hash and reset_client_info as false and reset_local_models to false",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    if (useNewORM) {
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
    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    // console.log(JSON.stringify(db_product));

    expect(db_product.length).toBe(4);
    expect(find_attrib_with_value(db_product,'name','test')).toEqual("test");
    expect(find_attrib_with_value(db_product,'price','2')).toEqual("2");
    expect(find_attrib_with_value(db_product,'name','test2')).toEqual("test2");
    expect(find_attrib_with_value(db_product,'price','4')).toEqual("4");

    if (useNewORM) {
      Rho.ORM.databaseFullResetEx(['Product'], false, false);
    }
    else {
      var ary = {"models":['Product'],"reset_local_models":false,"reset_client_info":false};
      Rho.ORM.databaseFullResetEx(ary);
    }

    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    expect(db_product.length).toBe(2);
    expect(find_attrib_with_value(db_product,'name','test2')).toEqual("test2");
    expect(find_attrib_with_value(db_product,'price','4')).toEqual("4");
  });

  it("VT302-0057 | Call databaseFullResetEx with Model name as Hash and reset_client_info as false",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    if (useNewORM) {
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

    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();

    expect(db_product.length).toBe(4);
    expect(find_attrib_with_value(db_product,'name','test')).toEqual("test");
    expect(find_attrib_with_value(db_product,'price','2')).toEqual("2");
    expect(find_attrib_with_value(db_product,'name','test2')).toEqual("test2");
    expect(find_attrib_with_value(db_product,'price','4')).toEqual("4");

    if (useNewORM) {
      Rho.ORM.databaseFullResetEx(['Product'], false, false);
    }
    else {
      var ary = {"models":['Product'],"reset_client_info":false};
      Rho.ORM.databaseFullResetEx(ary);
    }

    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    db_product2 = Rho.ORM.getClientId();

    expect(db_product2).toEqual("7");
    expect(db_product.length).toBe(2);
    expect(find_attrib_with_value(db_product,'name','test2')).toEqual("test2");
    expect(find_attrib_with_value(db_product,'price','4')).toEqual("4");
  });

  it("VT302-0058 | Call databaseFullResetEx with Model name as Hash and reset_client_info as false and reset_local_models to true",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    if (useNewORM) {
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
    var db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    var db_product2 = Rho.ORM.getClientId();
    expect(db_product2).toEqual("7");
    expect(db_product.length).toBe(2);
    expect(find_attrib_with_value(db_product,'name','test')).toEqual("test");
    expect(find_attrib_with_value(db_product,'price','2')).toEqual("2");

    if (useNewORM) {
      Rho.ORM.databaseFullResetEx(['Product'], false, true);
    }
    else {
      var ary = {"models":['Product'],"reset_client_info":false,"reset_local_models":true};
      Rho.ORM.databaseFullResetEx(ary);
    }

    db_product = userDB.$execute_sql("Select * from OBJECT_VALUES");
    db_product2 = Rho.ORM.getClientId();
    expect(db_product2).toEqual("7");
    expect(db_product).toEqual([]);
  });

  it("VT302-0060 | should do nothing if localdb and localdb flag set to false",function(){
    if (useNewORM) {
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
    var db_product = localDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product.length).toBe(2);
    expect(find_attrib_with_value(db_product,'name','test')).toEqual("test");
    expect(find_attrib_with_value(db_product,'price','2')).toEqual("2");

    if (useNewORM) {
      Rho.ORM.databaseFullResetEx(['Product'], false, false);
    }
    else {
      var ary = {"models":['Product'],"reset_local_models":false,"reset_client_info":false};
      Rho.ORM.databaseFullResetEx(ary);
    }

    db_product = localDB.$execute_sql("Select * from OBJECT_VALUES");
    expect(db_product.length).toBe(2);
    expect(find_attrib_with_value(db_product,'name','test')).toEqual("test");
    expect(find_attrib_with_value(db_product,'price','2')).toEqual("2");
  });

  // FIXME: !!!
  it("VT302-0062 | should reset client and local db if databaseFullclientResetAndLogout",function(){
    localDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    if (useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.enable("sync");
        model.set("partition","local");
      };
      var model1 = Rho.ORM.addModel("Product", Product);
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.enable("sync");
        model.set("partition","local");
      };
      var model1 = Rho.ORM.addModel(Product);
    }
    var p = model1.create({'name':'test','price':2.0});
    var objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    var client_info = localDB.$execute_sql("select * from client_info");

    expect(find_attrib_with_value(objects,'name','test')).toEqual("test");
    expect(client_info[0].map.client_id).toEqual("7");

    Rho.ORM.databaseFullclientResetAndLogout();
    // FIXME: !!!
    // has no method "databaseFullclientResetAndLogout"

    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    client_info = localDB.$execute_sql("select * from client_info");
    expect(objects).toEqual([]);
    expect(client_info).toEqual([]);
  });

  it("VT302-0063 | call databaseLocalReset without having any local model | Should not removed data from synced database",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    if (useNewORM) {
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

    var res = userDB.$execute_sql("SELECT * FROM Product Where name = 'test' ");
    var clientId = Rho.ORM.getClientId();

    expect(model).toBeDefined();
    expect(clientId).toEqual("7");
    expect(res[0].map.name).toEqual('test');
  });

  it("VT302-0065 | call databaseLocalReset with changes in local model | Should removed local model data",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    if (useNewORM) {
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
    var objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    expect(objects[0].map.value).toEqual("test");

    Rho.ORM.databaseLocalReset();

    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    var clientId = Rho.ORM.getClientId();

    expect(model).toBeDefined();
    expect(objects).toEqual([]);
    expect(clientId).toEqual("7");
  });

  it("VT302-0066 | call databaseLocalReset with changes in both local and user model | Should removed local model data",function(){
    userDB.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
    if (useNewORM) {
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

    var objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    var objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");

    expect(find_attrib_with_value(objects,'name','test')).toEqual("test");
    expect(find_attrib_with_value(objects_u,'name','test_u')).toEqual("test_u");

    Rho.ORM.databaseLocalReset()

    objects = localDB.$execute_sql("select * from OBJECT_VALUES");
    objects_u = userDB.$execute_sql("select * from OBJECT_VALUES");
    var clientId = Rho.ORM.getClientId();

    expect(model).toBeDefined();
    expect(clientId).toEqual("7");
    expect(find_attrib_with_value(objects_u,'name','test_u')).toEqual("test_u");
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

  it("should load source from table if it exists",function(){
    if (!useNewORM) Rho.ORM.clearFreeSourceIds();
    localDB.$execute_sql("DELETE FROM SOURCES");

    if (useNewORM) {
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
    db_product = localDB.$execute_sql("select source_id from sources where name = 'Product'");
    db_customer = localDB.$execute_sql("select source_id from sources where name = 'Customer'");

    expect(db_product.length).toEqual(1);
    expect(db_customer.length).toEqual(1);

    expect(parseInt(db_product[0].map.source_id)).toEqual(product_src_id);
    expect(parseInt(db_customer[0].map.source_id)).toEqual(customer_src_id);

  //   Rho.ORM.clear();
  //   //console.log("add model4 'Customer2'");
  //   customer = Rho.ORM.addModel(function(model){
  //     model.modelName("Customer");
  //     model.set("partition","local");
  //   });
  //   //console.log("add model3 'Product2'");
  //   product = Rho.ORM.addModel(function(model){
  //     model.modelName("Product");
  //     model.set("partition","local");
  //   });
  //   sources = Rho.ORMHelper.getAllSources();
  //   expect(String(customer_src_id)).toEqual(sources["Customer"].source_id);
  //   expect(String(product_src_id)).toEqual(sources["Product"].source_id);
  });

});