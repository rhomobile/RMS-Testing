describe("ORM Module Specs", function() {
  var useNewORM = false;
  var useNewORM = Rho.NewORM.useNewOrm();
  console.log("useNewORM: " + useNewORM);

  if(useNewORM) {
    var addModel = function(name, model) {
      return Rho.ORM.addModel(name, model);
    };

  } else {
    var addModel = function(name, model) {
      return Rho.ORM.addModel(model);
    };
  }

  var getModelSource = function (modelName) {
    // console.log("getModelSource: " + modelName);
    if (useNewORM) {
      var source = Rho.ORM.getModel(modelName);
    } else {
      // var source = Opal.Rho._scope.RhoConfig.$sources().map[modelName];
      var source = Rho.ORMHelper.getAllSources()[modelName];
      // Add missing property to old ORM internal structure
      source.model_name = source.name;
    }
    return source;
  }

  var reset = function(syncdb) {
    // console.log("-- reset db: " + syncdb);
    var db = Rho.ORMHelper.dbConnection(syncdb);
    var partitions = Rho.ORMHelper.getDbPartitions();
    $.each(partitions, function(index, db2) {
      db2.$execute_sql("DELETE FROM SOURCES");
      db2.$execute_sql("DELETE FROM OBJECT_VALUES");
      db2.$execute_sql("DELETE FROM CHANGED_VALUES");
      if(db2.$is_table_exist("Product")) db2.$execute_sql("DROP TABLE Product");
      if(db2.$is_table_exist("Item")) db2.$execute_sql("DROP TABLE Item");
      if(db2.$is_table_exist("Item2")) db2.$execute_sql("DROP TABLE Item2");
    });
  };

  var localDB = Rho.ORMHelper.dbConnection('local');
  var userDB  = Rho.ORMHelper.dbConnection('user');

  beforeEach(function() {
    reset("local");
    // reset("user");
    if (!useNewORM) Rho.ORM.clear();
  });

  it('VT302-0001 | Check Rho.ORM exist or not | Should return an object',function() {
    if(useNewORM)
      expect(typeof(Rho.ORM)).toEqual('function');
    else
      expect(typeof(Rho.ORM)).toEqual('object');
  });

  it('VT302-0004 | Should create model',function() {
    if(useNewORM) {
      var Product = function(model) {
        model.enable("sync");
        model.setModelProperty("name","string", "");
        model.setModelProperty("brand","string", "");
        model.set("partition","local");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("sync");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","local");
      };
    }
    addModel("Product", Product);
    var source = getModelSource('Product');

    // console.log("source: " + source);
    // console.log(JSON.stringify(source)); // =>
    // {"sync_type":"incremental","partition":"local",
    //  "property":{"name":["string",null],"brand":["string",null]},
    //  "loaded":true,"name":"Product","sync_priority":1000, "source_id":40001,"str_blob_attribs":""}

    expect(source.model_name).toEqual('Product');
    expect(source.sync_type).toEqual('incremental');
    expect(source.partition).toEqual('local');

    // FIXME: source.getProperty("name") returns nothing  (new orm)
    // console.log("VT302-0004: ");
    // console.log("name: " + source.getProperty("name"));
    // console.log("brand: " + source.getProperty("brand"));

  });

  it('VT302-0005 | Call Rho.ORM.addModel, passing model name as numerical string',function(){
    if(useNewORM) {
        var Product = function(model) {
          model.enable("sync");
          model.setModelProperty("name","string", "");
          model.setModelProperty("brand","string", "");
          model.set("partition","local");
        };
    } else {
      var Product = function(model){
        model.modelName("123456");
        model.enable("sync");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","local");
      };
    }
    addModel("123456", Product);
    var source = getModelSource("123456");

    expect(source.model_name).toEqual('123456');
    // expect(source.sync_type).toEqual('incremental');
  });

  it('VT302-0006 | set enable as sync at the time of creating model',function() {
    if(useNewORM) {
      var Product = function(model) {
        model.enable("sync");
        model.setModelProperty("name","string", "");
        model.setModelProperty("brand","string", "");
        // model.set("partition","local");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("sync");
        model.property("name","string");
        model.property("brand","string");
        // model.set("partition","local");
      };
    }

    reset("user");
    addModel("Product", Product);
    var source = getModelSource('Product');

    expect(source.sync_type).toEqual('incremental');
    expect(source.partition).toEqual('user');
    // expect(source.model_name).toEqual('Product');
  });

  it('VT302-0007 | set enable as propertyBag at the time of creating model',function(){
    if(useNewORM) {
      var Product = function(model) {
        model.fixed_schema = false;
        model.setModelProperty("name","string", "");
        model.setModelProperty("brand","string", "");
        model.set("partition","local");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("propertyBag");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","local");
      };
    }
    addModel("Product", Product);

    var source = getModelSource('Product');
    expect(source.sync_type).toEqual('none');
    expect(source.model_name).toEqual('Product');

    if (useNewORM)
      expect(source.fixed_schema).toBe(false);
    else
      expect(source.schema).toBeUndefined();
  });

  it('VT302-0008 | set enable as fixedSchema at the time of creating model',function(){
    if(useNewORM) {
      var Product = function(model) {
        model.fixed_schema = true;
        model.setModelProperty("name","string", "");
        model.setModelProperty("brand","string", "");
        model.set("partition","local");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("fixedSchema");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","local");
      };
    }
    addModel("Product", Product);

    var source = getModelSource('Product');
    expect(source.sync_type).toEqual('none');
    expect(source.model_name).toEqual('Product');

    if (useNewORM)
      expect(source.fixed_schema).toBe(true);
    else {
      expect(source.schema).toBeDefined();
      // console.log(JSON.stringify(source)); // =>
      // { "partition":"local","schema":{"property":{"name":["string",null],"brand":["string",null]}},
      //   "loaded":true,"name":"Product","sync_priority":1000,"sync_type":"none","source_id":40004,
      //   "str_blob_attribs":"","model_name":"Product"}
    }
  });

  it('VT302-0009 | Set sync and set propertyBag at the time of creating model',function() {
    if(useNewORM) {
      var Product = function(model) {
        model.fixed_schema = false;
        model.enable("sync");
        model.setModelProperty("name","string", "");
        model.setModelProperty("brand","string", "");
        model.set("partition","local");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("propertyBag");
        model.enable("sync");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","local");
      };
    }
    addModel("Product", Product);
    var source = getModelSource('Product');

    expect(source.partition).toEqual('local');
    expect(source.sync_type).toEqual('incremental');
    expect(source.model_name).toEqual('Product');
  });

  it('VT302-0010 | Set sync and set fixedSchema at the time of creating model',function(){
    if(useNewORM) {
      var Product = function(model) {
        model.enable("sync");
        model.fixed_schema = true;
        model.setModelProperty("name","string", "");
        model.setModelProperty("brand","string", "");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("sync");
        model.enable("fixedSchema");
        model.property("name","string");
        model.property("brand","string");
      };
    }
    reset("user");
    addModel("Product", Product);
    var source = getModelSource('Product');

    expect(source.sync_type).toEqual('incremental');
    expect(source.partition).toEqual('user');
    expect(source.model_name).toEqual('Product');
  });

  //TODO: !!!
  it('VT302-0011 | Create a Model with property("name","string")',function() {
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string", "");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
      };
    }
    addModel('Product', Product);
    var source = getModelSource('Product');

    expect(source.property['name'][0]).toEqual('string');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

  //TODO: !!!
  it("VT302-0012 | Create a Model with property('int_prop', 'integer')",function(){
    if (useNewORM) {
      var Product = function(model){
        model.setModelProperty("id","integer", "");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("id","integer");
      };
    }
    addModel('Product', Product);
    var source = getModelSource('Product');

    expect(source.property['id'][0]).toEqual('integer');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

  //TODO: !!!
  it("VT302-0013 | Create a Model with property ('float_prop', 'float')",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("float_prop","float", "");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("float_prop","float");
      };
    }
    addModel('Product', Product);
    var source = getModelSource('Product');

    expect(source.property['float_prop'][0]).toEqual('float');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

  //TODO: !!!
  it("VT302-0014 | Create a Model with property ('date_prop', 'date')",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("date_prop","date", "");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("date_prop","date");
      };
    }
    addModel('Product', Product);
    var source = getModelSource('Product');

    expect(source.property['date_prop'][0]).toEqual('date');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

  //TODO: !!!
  it("VT302-0015 | Create a Model with property ('time_prop', 'time')",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("time_prop","time", "");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("time_prop","time");
      };
    }
    addModel('Product', Product);
    var source = getModelSource('Product');

    expect(source.property['time_prop'][0]).toEqual('time');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

  //TODO: !!!
  it("VT302-0016 | Create a Model with property ('image_url', 'blob')",function(){
    if (useNewORM) {
      var Product = function(model){
        model.setModelProperty("image_url","blob", "");
      };
    } else {
      var Product = function(model){
          model.modelName("Product");
          model.property("image_url","blob");
      };
    }
    addModel('Product', Product);
    var source = getModelSource('Product');

    expect(source.property['image_url'][0]).toEqual('blob');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

  //TODO: !!!
  it("VT302-0017 | Create a Model with property('mycustomproperty', 'hello')",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("mycustomproperty","hello", "");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("mycustomproperty","hello");
      };
    }
    addModel('Product', Product);
    var source = getModelSource('Product');

    expect(source.property['mycustomproperty'][0]).toEqual('hello');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

  //TODO: !!!
  it("VT302-0018 | Create a Model with property('image_url', 'blob', 'overwrite')",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("image_url","blob","overwrite");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("image_url","blob","overwrite");
      };
    }
    addModel('Product', Product);
    var source = getModelSource('Product');

    expect(source.property['image_url'][0]).toEqual('blob');
    expect(source.property['image_url'][1]).toEqual('overwrite');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

  // TODO: here ...
  it("VT302-0019 | should add index",function() {
    if(useNewORM) {
      var Product = function(model) {
        model.fixed_schema = true;
        model.setModelProperty("name", "string", "");
        model.setModelProperty("price","float", "");
        model.setSchemaIndex("p1", ["name"], true);
        model.set("partition","local");
      };
    } else {
      var Product = function(model) {
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.enable("fixedSchema");
        model.addIndex("p1",["name"]);
        model.set("partition","local");
      };
    }
    var model = addModel('Product', Product);
    model.create({"name":"test"});
    expect(model).toBeDefined();

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
    expect(res[0].map.name).toEqual('test');
  });

  it("VT302-0020 | addIndex to multiple columns while creating a model",function(){
    var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.enable("fixedSchema");
        model.addIndex("p1",["name","price"]);
        model.set("partition","local");
    };

    var Model = Rho.ORM.addModel(Product);
    Model.create({"name":"test","price":87.89});
    expect(Model).toBeDefined();

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
    expect(res[0].map.name).toEqual('test');
  });

  it("VT302-0021 | add multiple Index to multiple columns while creating a model",function(){
    var Product = function(model){
      model.modelName("Product");
      model.property("name","string");
      model.property("price","float");
      model.property("type","string");
      model.enable("fixedSchema");
      model.addIndex("p1",["name","price"]);
      model.addIndex("p2",["type"]);
      model.set("partition","local");
    };

    var Model = Rho.ORM.addModel(Product);
    Model.create({"name":"test","price":87.89,"type":"testing"});
    Model.create({"name":"debug","price":0.78,"type":"testing2"});
    expect(Model).toBeDefined();

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
    res2 = localDB.$execute_sql("SELECT * FROM Product INDEXED BY p2 Where type = 'testing2' ");
    expect(res[0].map.name).toEqual('test');
    expect(res2[0].map.name).toEqual('debug');
  });

  it("VT302-0022 | should add unique index",function(){
    var Product = function(model){
      model.modelName("Product");
      model.property("name","string");
      model.property("price","float");
      model.enable("fixedSchema");
      model.addUniqueIndex("u1",["name"]);
      model.set("partition","local");
    };

    var Model = Rho.ORM.addModel(Product);
    Model.create({"name":"test"});

    expect(Model).toBeDefined();
    expect(Rho.ORM.getModel('Product')).toBe(Model);

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY u1 Where name = 'test' ");
    // console.log("res is: " + JSON.stringify(res));
    expect(res[0].map.name).toEqual('test');
  });

  it("VT302-0023 | addUniqueIndex to multiple columns while creating a model",function(){
    var Product = function(model){
      model.modelName("Product");
      model.property("name","string");
      model.property("price","float");
      model.enable("fixedSchema");
      model.addUniqueIndex("u2",["name","price"]);
      model.set("partition","local");
    };

    var Model = Rho.ORM.addModel(Product);
    Model.create({"name":"test","price":87.89});
    Model.create({"name":"test","price":87.90});
    Model.create({"name":"test2","price":87.90});

    expect(Model).toBeDefined();

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY u2 Where name = 'test' ");
    expect(res[0].map.name).toEqual('test');
  });

  it("VT302-0024 | add multiple Unique Index to multiple columns while creating a model",function(){
    var Product = function(model){
      model.modelName("Product");
      model.property("name","string");
      model.property("price","float");
      model.property("type","string");
      model.enable("fixedSchema");
      model.addUniqueIndex("u1",["name","price"]);
      model.addUniqueIndex("u2",["type"]);
      model.set("partition","local");
    };

    var Model = Rho.ORM.addModel(Product);
    Model.create({"name":"test","price":87.89,"type":"testing"});
    Model.create({"name":"test","price":87.00,"type":"testing3"});
    Model.create({"name":"test1","price":87.00,"type":"testing4"});
    Model.create({"name":"debug","price":0.78,"type":"testing2"});

    expect(Model).toBeDefined();

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY u1 Where name = 'test' ");
    res2 = localDB.$execute_sql("SELECT * FROM Product INDEXED BY u2 Where type = 'testing2' ");
    expect(res[0].map.name).toEqual('test');
    expect(res2[0].map.name).toEqual('debug');
  });

  it("VT302-0025 | should add belongs_to relationship",function(){
    var Product = function(model){
      model.modelName("Product");
      model.property("name","string");
      model.property("price","float");
      model.enable("fixedSchema");
      model.addUniqueIndex("u1",["name"]);
      model.set("partition","local");
    };
    var Item = function(model){
      model.modelName("Item");
      model.property("name","string");
      model.property("code");
      model.enable("fixedSchema");
      model.enable('sync');
      model.set("partition","local");
      model.belongs_to("Product");
    };
    var Model = Rho.ORM.addModel(Product);
    var Model2 = Rho.ORM.addModel(Item);

    sources = Rho.ORMHelper.getAllSources();
    expect(sources.Product.str_associations).toEqual("Item");
    expect(sources.Item.belongs_to[0]).toEqual("Product");
    // localDB.$execute_sql("DROP TABLE Product");
    // localDB.$execute_sql("DROP TABLE Item");
  });

  it("VT302-0026 | should add belongs_to relationship in any load order",function(){
    var sources = Rho.ORMHelper.getAllSources();
    expect(sources.Product).toBeUndefined();
    expect(sources.Item).toBeUndefined();

    var Product = function(model){
      model.modelName("Product");
      model.property("name","string");
      model.property("price","float");
      model.enable("fixedSchema");
      model.addUniqueIndex("u1",["name"]);
      model.set("partition","local");
    };
    var Item = function(model){
      model.modelName("Item");
      model.property("name","string");
      model.property("code");
      model.enable("fixedSchema");
      model.enable('sync');
      model.set("partition","local");
      model.belongs_to("Product");
    };
    var Model2 = Rho.ORM.addModel(Item);
    var Model = Rho.ORM.addModel(Product);

    sources = Rho.ORMHelper.getAllSources();
    expect(sources.Product.str_associations).toEqual("Item");
    expect(sources.Item.belongs_to[0]).toEqual("Product");
    // localDB.$execute_sql("DROP TABLE Product");
    // localDB.$execute_sql("DROP TABLE Item");
  });

  it("VT302-0027 | should add multiple belongs_to relationship in any load order",function(){
    var sources = Rho.ORMHelper.getAllSources();
    expect(sources.Product).toBeUndefined();
    expect(sources.Item).toBeUndefined();
    expect(sources.Item2).toBeUndefined();

    var Product = function(model){
      model.modelName("Product");
      model.property("name","string");
      model.property("price","float");
      model.enable("fixedSchema");
      model.addUniqueIndex("u1",["name"]);
      model.set("partition","local");
    };
    var Item = function(model){
      model.modelName("Item");
      model.property("name","string");
      model.property("code");
      model.enable("fixedSchema");
      model.enable('sync');
      model.set("partition","local");
      model.belongs_to("Product");
    };
    var Item2 = function(model){
      model.modelName("Item2");
      model.property("name","string");
      model.property("code");
      model.enable("fixedSchema");
      model.enable('sync');
      model.set("partition","local");
      model.belongs_to("Product");
    };
    var Model2 = Rho.ORM.addModel(Item);
    var Model3 = Rho.ORM.addModel(Item2);
    var Model = Rho.ORM.addModel(Product);


    sources = Rho.ORMHelper.getAllSources();
    expect(sources.Product.str_associations).toEqual("Item,Item2");
    expect(sources.Item.belongs_to[0]).toEqual("Product");
    expect(sources.Item2.belongs_to[0]).toEqual("Product");
    // localDB.$execute_sql("DROP TABLE Product");
    // localDB.$execute_sql("DROP TABLE Item");
    // localDB.$execute_sql("DROP TABLE Item2");
  });

  it("VT302-0030 | Create a model with sync type bulk_only",function(){
    var Product = function(model){
      model.modelName("Product");
      model.enable("sync");
      model.property("time_prop","time");
      model.set("sync_type","bulk_only");
    };
    Rho.ORM.addModel(Product);

    var source = getModelSource('Product');
    expect(source.sync_type).toEqual('bulk_only');
    expect(source.partition).toEqual('user');
    expect(source.model_name).toEqual('Product');
  });

  it('VT302-0031 | Create a model with sync_priority as 1',function(){
    var Product = function(model){
      model.modelName("Product");
      model.enable("sync");
      model.property("name","string");
      model.property("brand","string");
      model.set("sync_priority",1);
    };
    Rho.ORM.addModel(Product);

    var source = getModelSource('Product');
    expect(source.sync_type).toEqual('incremental');
    expect(source.sync_priority).toEqual(1);
    expect(source.model_name).toEqual('Product');
  });

  it('VT302-0032 | Create a model with in app Partition',function(){
    var Product = function(model){
      model.modelName("Product");
      model.enable("sync");
      model.property("name","string");
      model.property("brand","string");
      model.set("partition","app");
    };
    Rho.ORM.addModel(Product);

    var source = getModelSource('Product');
    expect(source.partition).toEqual('app');
    expect(source.sync_type).toEqual('incremental');
    expect(source.model_name).toEqual('Product');
  });

  //  TODO:
  it('VT302-0033 | Create a model with schema_version, 1.0',function() {
    if(useNewORM) {
      var Product = function(model){
        model.fixed_schema = true;
        model.setProperty('schema_version','1.0');
        model.setModelProperty("name","string", "");
        model.setModelProperty("brand","string", "");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("brand","string");
        model.set("schema_version",'1.0');
      };
    }
    addModel('Product', Product);
    var source = getModelSource('Product');

    expect(source.schema_version).toEqual('1.0'); // FIXME:
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

  //Freezing a propertyBag model not supported with current release
  // it('VT302-0034 | Create a model with freezed, true | Should\'nt add new column',function(){
  //   var error = '';
  //   expect(Rho.ORM.getModel('Product')).toBeUndefined();

  //   var Product = function(model){
  //       model.modelName("Product");
  //       model.property("name","string");
  //       model.property("brand","string");
  //       model.set('freezed',true);
  //       model.set("partition","local");
  //   };

  //   Model = Rho.ORM.addModel(Product);
  //   var source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];

  //   Model.create({"name":"test","brand":"PUMA"});
  //   var db2 = Rho.ORMHelper.dbConnection("local");
  //   var objects = db2.$execute_sql("select * from OBJECT_VALUES");

  //   expect(objects[0].map.value).toEqual('test');

  //   try{
  //   Model.create({"name":"test2","brand":"REBOOK","Price":54.05});
  //   var objects = db2.$execute_sql("select * from OBJECT_VALUES");
  //   expect(objects[2].map.value).not.toEqual("test2");
  //   expect(objects[3].map.value).not.toEqual("REBOOK");
  //   //Number is returning as a String.
  //   expect(objects[4].map.value).not.toEqual(54.05);
  //   }
  //   catch(e){
  //     error = e.message;
  //   }

  //   var source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];

  //   expect(source.freezed).toEqual(true);
  //   expect(error).toEqual('Write error message');
  //   expect(source.partition).toEqual('local');
  //   expect(source.name).toEqual('Product');
  // });

  it('VT302-0038 | Get a model by its name after it has been added', function() {
    if(useNewORM) {
      var Product = function(model) {
        model.enable("sync");
        model.setModelProperty("name","string", "");
        model.setModelProperty("brand","string", "");
        model.set("partition","local");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("sync");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","local");
      };
    }
    var model = addModel('Product', Product);
    expect(model).toBeDefined();

    if(useNewORM)
      expect(Rho.ORM.getModel('Product')).not.toBeNull();
    else
      expect(Rho.ORM.getModel('Product')).toBe(model);
  });

  it('VT302-0008 | should add fixed schema model with table', function() {
    if(useNewORM) {
      var Product = function(model) {
        model.fixed_schema = true;
        model.enable("sync");
        model.setModelProperty("name","string", "");
        model.setModelProperty("brand","string", "");
        model.set("partition","local");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("fixedSchema");
        model.enable("sync");
        model.property("name","string");
        model.property("price","integer");
        model.set("partition","local");
      };
    }
    var model = addModel('Product', Product);
    expect(model).toBeDefined();

    if(useNewORM) {
      expect(Rho.ORM.getModel('Product')).not.toBeNull();
    } else {
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources['Product']).toBeDefined();
      expect(Rho.ORM.getModel('Product')).toBe(model);
    }

    res = localDB.$execute_sql("SELECT * FROM Product",[]);
    console.log(JSON.stringify(res)); // =>

    expect(res).toEqual([]);
  });

});
