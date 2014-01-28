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
  var reset = function() {
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
  var appDB   = Rho.ORMHelper.dbConnection('app');

  beforeEach(function() {
    reset();
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
    // console.log(JSON.stringify(source)); // =>
    // {"sync_type":"incremental","partition":"local",
    //  "property":{"name":["string",null],"brand":["string",null]},
    //  "loaded":true,"name":"Product","sync_priority":1000, "source_id":40001,"str_blob_attribs":""}

    expect(source.model_name).toEqual('Product');
    expect(source.sync_type).toEqual('incremental');
    expect(source.partition).toEqual('local');
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
    addModel("Product", Product);
    var source = getModelSource('Product');

    expect(source.sync_type).toEqual('incremental');
    expect(source.partition).toEqual('user');
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

    expect(source.property['name'][0]).toEqual('string'); // FIXME: source.property
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

    expect(source.property['id'][0]).toEqual('integer'); // FIXME: source.property
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

    expect(source.property['float_prop'][0]).toEqual('float');  // FIXME: source.property
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

    expect(source.property['date_prop'][0]).toEqual('date');  // FIXME: source.property
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

    expect(source.property['time_prop'][0]).toEqual('time');  // FIXME: source.property
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

    expect(source.property['image_url'][0]).toEqual('blob');  // FIXME: source.property
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

    expect(source.property['mycustomproperty'][0]).toEqual('hello');  // FIXME: source.property
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

    expect(source.property['image_url'][0]).toEqual('blob');  // FIXME: source.property
    expect(source.property['image_url'][1]).toEqual('overwrite');  // FIXME: source.property
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

  // TODO:
  it("VT302-0019 | should add index",function() {
    if(useNewORM) {
      var Product = function(model) {
        model.fixed_schema = true;
        model.setModelProperty("name", "string", "");
        model.setModelProperty("price","float", "");
        model.setSchemaIndex("p1", ["name"], false); // FIXME: ?
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

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' "); // FIXME: error
    // => could not prepare statement: 1; Message: no such index: p1
    expect(res[0].map.name).toEqual('test');
  });

  // TODO:
  it("VT302-0020 | addIndex to multiple columns while creating a model",function() {
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.fixed_schema = true;
        model.setSchemaIndex("p1", ["name","price"], false); // FIXME: ?
        model.set("partition","local");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.enable("fixedSchema");
        model.addIndex("p1",["name","price"]);
        model.set("partition","local");
      };
    }
    var model = addModel('Product', Product);
    model.create({"name":"test","price":87.89});
    expect(model).toBeDefined();

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' "); // FIXME: error
    // => could not prepare statement: 1; Message: no such index: p1
    expect(res[0].map.name).toEqual('test');
  });

  // TODO:
  it("VT302-0021 | add multiple Index to multiple columns while creating a model",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.setModelProperty("type","string","");
        model.fixed_schema = true;
        model.setSchemaIndex("p1", ["name","price"], false); // FIXME: ?
        model.setSchemaIndex("p2", ["type"], false);         // FIXME: ?
        model.set("partition","local");
      };
    } else {
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
    }
    var model = addModel('Product', Product);

    model.create({"name":"test","price":87.89,"type":"testing"});
    model.create({"name":"debug","price":0.78,"type":"testing2"});
    expect(model).toBeDefined();

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' "); // FIXME: error
    // => could not prepare statement: 1; Message: no such index: p1
    res2 = localDB.$execute_sql("SELECT * FROM Product INDEXED BY p2 Where type = 'testing2' "); // FIXME: error
    expect(res[0].map.name).toEqual('test');
    expect(res2[0].map.name).toEqual('debug');
  });

  // TODO:
  it("VT302-0022 | should add unique index",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.fixed_schema = true;
        model.setSchemaIndex("u1", ["name"], true); // FIXME: ?
        model.set("partition","local");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.enable("fixedSchema");
        model.addUniqueIndex("u1",["name"]);
        model.set("partition","local");
      };
    }
    var model = addModel('Product', Product);
    model.create({"name":"test"});
    expect(model).toBeDefined();

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY u1 Where name = 'test' ");
    console.log("res: " + JSON.stringify(res));
    expect(res[0].map.name).toEqual('test');
  });

  // TODO:
  it("VT302-0023 | addUniqueIndex to multiple columns while creating a model",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.fixed_schema = true;
        model.setSchemaIndex("u2", ["name","price"], true); // FIXME: ?
        model.set("partition","local");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.enable("fixedSchema");
        model.addUniqueIndex("u2",["name","price"]);
        model.set("partition","local");
      };
    }
    var model = addModel('Product', Product);
    model.create({"name":"test","price":87.89});
    model.create({"name":"test","price":87.90});
    model.create({"name":"test2","price":87.90});

    expect(model).toBeDefined();

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY u2 Where name = 'test' ");
    // => could not prepare statement: 1; Message: no such index: u2
    expect(res[0].map.name).toEqual('test');
  });

  // TODO:
  it("VT302-0024 | add multiple Unique Index to multiple columns while creating a model",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.setModelProperty("type","string","");
        model.fixed_schema = true;
        model.setSchemaIndex("u1", ["name","price"], true); // FIXME: ?
        model.setSchemaIndex("u2", ["type"], true);         // FIXME: ?
        model.set("partition","local");
      };
    } else {
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
    }
    var model = addModel('Product', Product);
    model.create({"name":"test","price":87.89,"type":"testing"});
    model.create({"name":"test","price":87.00,"type":"testing3"});
    model.create({"name":"test1","price":87.00,"type":"testing4"});
    model.create({"name":"debug","price":0.78,"type":"testing2"});

    expect(model).toBeDefined();

    res = localDB.$execute_sql("SELECT * FROM Product INDEXED BY u1 Where name = 'test' ");
    // => could not prepare statement: 1; Message: no such index: u1
    res2 = localDB.$execute_sql("SELECT * FROM Product INDEXED BY u2 Where type = 'testing2' ");

    expect(res[0].map.name).toEqual('test');
    expect(res2[0].map.name).toEqual('debug');
  });

  // TODO:
  it("VT302-0025 | should add belongs_to relationship",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.fixed_schema = true;
        model.setSchemaIndex("u1", ["name"], true); // FIXME: ?
        model.set("partition","local");
      };
      var Item = function(model){
        model.setModelProperty("name","string", "");
        model.setModelProperty("code","string", "");
        model.fixed_schema = true;
        model.enable('sync');
        model.set("partition","local");
        model.setBelongsTo("product_id", "Product"); // FIXME: 2 params?
      };
    } else {
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
    }
    var product = addModel('Product', Product);
    var item = addModel('Item', Item);

    // FIXME:
    sources = Rho.ORMHelper.getAllSources();
    expect(sources.Product.str_associations).toEqual("Item");
    expect(sources.Item.belongs_to[0]).toEqual("Product");
  });

  // TODO:
  it("VT302-0026 | should add belongs_to relationship in any load order",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.fixed_schema = true;
        model.setSchemaIndex("u1", ["name"], true); // FIXME: ?
        model.set("partition","local");
      };
      var Item = function(model){
        model.setModelProperty("name","string", "");
        model.setModelProperty("code","string", "");
        model.fixed_schema = true;
        model.enable('sync');
        model.set("partition","local");
        model.setBelongsTo("product_id", "Product"); // FIXME: 2 params?
      };
    } else {
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
    }
    var item = addModel('Item', Item);
    var product = addModel('Product', Product);

    // FIXME:
    sources = Rho.ORMHelper.getAllSources();
    expect(sources.Product.str_associations).toEqual("Item");
    expect(sources.Item.belongs_to[0]).toEqual("Product");
  });

  // TODO:
  it("VT302-0027 | should add multiple belongs_to relationship in any load order",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.fixed_schema = true;
        model.setSchemaIndex("u1", ["name"], true); // FIXME: ?
        model.set("partition","local");
      };
      var Item = function(model){
        model.setModelProperty("name","string", "");
        model.setModelProperty("code","string", "");
        model.fixed_schema = true;
        model.enable('sync');
        model.set("partition","local");
        model.setBelongsTo("product_id", "Product"); // FIXME: 2 params?
      };
      var Item2 = function(model){
        model.setModelProperty("name","string", "");
        model.setModelProperty("code","string", "");
        model.fixed_schema = true;
        model.enable('sync');
        model.set("partition","local");
        model.setBelongsTo("product_id", "Product"); // FIXME: 2 params?
      };
    } else {
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
    }
    var product = addModel('Product', Product);
    var item  = addModel('Item', Item);
    var item2 = addModel('Item2', Item2);

    // FIXME:
    sources = Rho.ORMHelper.getAllSources();
    expect(sources.Product.str_associations).toEqual("Item,Item2");
    expect(sources.Item.belongs_to[0]).toEqual("Product");
    expect(sources.Item2.belongs_to[0]).toEqual("Product");
  });

  it("VT302-0030 | Create a model with sync type bulk_only",function(){
    if(useNewORM) {
      var Product = function(model){
        model.enable("sync");
        model.setModelProperty("time_prop","time", "");
        model.set("sync_type","bulk_only");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("sync");
        model.property("time_prop","time");
        model.set("sync_type","bulk_only");
      };
    }
    addModel('Product', Product);

    var source = getModelSource('Product');
    expect(source.sync_type).toEqual('bulk_only');
    expect(source.partition).toEqual('user');
    expect(source.model_name).toEqual('Product');
  });

  it('VT302-0031 | Create a model with sync_priority as 1',function(){
    if(useNewORM) {
      var Product = function(model){
        model.enable("sync");
        model.setModelProperty("name","string", "");
        model.setModelProperty("brand","string", "");
        model.set("sync_priority", "1");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("sync");
        model.property("name","string");
        model.property("brand","string");
        model.set("sync_priority", 1);
      };
    }
    addModel('Product', Product);

    var source = getModelSource('Product');
    expect(source.sync_type).toEqual('incremental');
    expect(source.sync_priority).toEqual(1);
    expect(source.model_name).toEqual('Product');
  });

  it('VT302-0032 | Create a model with in app Partition',function(){
    if(useNewORM) {
      var Product = function(model){
        model.enable("sync");
        model.setModelProperty("name","string", "");
        model.setModelProperty("brand","string", "");
        model.set("partition","app");
      };
    } else {
      var Product = function(model){
        model.modelName("Product");
        model.enable("sync");
        model.property("name","string");
        model.property("brand","string");
        model.set("partition","app");
      };
    }
    addModel('Product', Product);

    var source = getModelSource('Product');
    expect(source.partition).toEqual('app');
    expect(source.sync_type).toEqual('incremental');
    expect(source.model_name).toEqual('Product');
  });

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

    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');

    var res = localDB.$execute_sql("select * from sources where name = 'Product'");
    //console.log(JSON.stringify(res)); // =>
    // [{"map":
    //   {"associations":"","backend_refresh_time":"0","blob_attribs":"","last_deleted_size":"0","last_inserted_size":"0",
    //    "last_sync_duration":"0","last_sync_success":"0","last_updated":"0","metadata":"",
    //    "name":"Product","partition":"local","schema":"",
    //    "schema_version":"1.0","source_attribs":"","source_id":"40027","sync_priority":"1000","sync_type":"none","token":""}
    //  }]
    //console.log(res[0].map.schema); // =>
    // CREATE TABLE "Product" ( "brand" varchar default null,"name" varchar default null,"object" varchar(255) PRIMARY KEY );
    expect(res[0].map.schema_version).toEqual('1.0');
    // expect(source.schema_version).toEqual('1.0'); // FIXME: source.schema_version n/a
  });

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
    // console.log(JSON.stringify(res)); // => []
    expect(res).toEqual([]);
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

});
