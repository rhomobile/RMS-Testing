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

  var checkModelProperty = function(source, propname, proptype, propoption){
    if(useNewORM){
      expect(source.getModelProperty(propname).type).toEqual(proptype);
      if(propoption.length > 0) {
        expect(source.getModelProperty(propname).option).toEqual(propoption);
      };
    } else {
      expect(source.property[propname][0]).toEqual(proptype);
      if(propoption.length > 0) {
        expect(source.property[propname][1]).toEqual(propoption);
      };
    };
  };

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
      db2.executeSql("DELETE FROM SOURCES");
      db2.executeSql("DELETE FROM OBJECT_VALUES");
      db2.executeSql("DELETE FROM CHANGED_VALUES");
      if(db2.isTableExist("Product")) db2.executeSql("DROP TABLE Product");
      if(db2.isTableExist("Item")) db2.executeSql("DROP TABLE Item");
      if(db2.isTableExist("Item2")) db2.executeSql("DROP TABLE Item2");
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

    checkModelProperty(source, 'name', 'string', '');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

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

    checkModelProperty(source, 'id', 'integer', '');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

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

    checkModelProperty(source, 'float_prop', 'float', '');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

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

    checkModelProperty(source, 'date_prop', 'date', '');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

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

    checkModelProperty(source, 'time_prop', 'time', '');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

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

    checkModelProperty(source, 'image_url', 'blob', '');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

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

    checkModelProperty(source, 'image_url', 'blob', 'overwrite');
    expect(source.partition).toEqual('local');
    expect(source.model_name).toEqual('Product');
  });

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

    res = localDB.executeSql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
    expect(res[0].name).toEqual('test');
  });

  it("VT302-0020 | addIndex to multiple columns while creating a model",function() {
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.fixed_schema = true;
        model.setSchemaIndex("p1", ["name","price"], false);
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

    res = localDB.executeSql("SELECT * FROM Product INDEXED BY \"p1\" Where name = 'test' ");
    expect(res[0].name).toEqual('test');
  });


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

    res = localDB.executeSql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
    res2 = localDB.executeSql("SELECT * FROM Product INDEXED BY p2 Where type = 'testing2' ");
    expect(res[0].name).toEqual('test');
    expect(res2[0].name).toEqual('debug');
  });

  it("VT302-0022 | should add unique index",function(){
    if(useNewORM) {
      var Product = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.fixed_schema = true;
        model.setSchemaIndex("u1", ["name"], true);
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

    res = localDB.executeSql("SELECT * FROM Product INDEXED BY u1 Where name = 'test' ");
    console.log("res: " + JSON.stringify(res));
    expect(res[0].name).toEqual('test');
  });

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

    res = localDB.executeSql("SELECT * FROM Product INDEXED BY u2 Where name = 'test' ");
    expect(res[0].name).toEqual('test');
  });

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

    res = localDB.executeSql("SELECT * FROM Product INDEXED BY u1 Where name = 'test' ");
    res2 = localDB.executeSql("SELECT * FROM Product INDEXED BY u2 Where type = 'testing2' ");

    expect(res[0].name).toEqual('test');
    expect(res2[0].name).toEqual('debug');
  });

  // FIXME:
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
    if(useNewORM){
      expect(product.associations).toEqual("Item,product_id");
      expect(item.getBelongsTo('product_id')[0]).toEqual("Product");
    } else {
      sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product.str_associations).toEqual("Item");
      expect(sources.Item.belongs_to[0]).toEqual("Product");  
    };
  });

  // The only way would be to use new Model, + model Def + initModel explicitly
  it("VT302-0026 | should add belongs_to relationship in any load order in JS - but only using initModel",function(){
    if(useNewORM) {
      var ProductDef = function(model){
        model.setModelProperty("name","string","");
        model.setModelProperty("price","float","");
        model.fixed_schema = true;
        model.setSchemaIndex("u1", ["name"], true); // FIXME: ?
        model.set("partition","local");
      };
      var ItemDef = function(model){
        model.setModelProperty("name","string", "");
        model.setModelProperty("code","string", "");
        model.fixed_schema = true;
        model.enable('sync');
        model.set("partition","local");
        model.setBelongsTo("product_id", "Product"); // FIXME: 2 params?
      };
    } else {
      var ProductDef = function(model){
        model.modelName("Product");
        model.property("name","string");
        model.property("price","float");
        model.enable("fixedSchema");
        model.addUniqueIndex("u1",["name"]);
        model.set("partition","local");
      };
      var ItemDef = function(model){
        model.modelName("Item");
        model.property("name","string");
        model.property("code");
        model.enable("fixedSchema");
        model.enable('sync');
        model.set("partition","local");
        model.belongs_to("Product");
      };
    }
    var item;
    var product;
    if(useNewORM) {
      item = new Rho.NewORMModel('Item');
      ItemDef(item);
      product = new Rho.NewORMModel('Product');
      ProductDef(product); 
      // and only now - do explicit init
      item.initModel();
      product.initModel();
    } else {
      item = addModel(ItemDef);
      product = addModel(ProductDef);
    }
    
    if(useNewORM){
      expect(product.associations).toEqual("Item,product_id");
      expect(item.getBelongsTo('product_id')[0]).toEqual("Product");
    } else {
      sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product.str_associations).toEqual("Item");
      expect(sources.Item.belongs_to[0]).toEqual("Product");  
    };
  });

  // FIXME:
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
    // FIXME:
    if(useNewORM){
      expect(product.associations).toEqual("Item,product_id,Item2,product_id");
      expect(item.getBelongsTo('product_id')[0]).toEqual("Product");
      expect(item2.getBelongsTo('product_id')[0]).toEqual("Product");
    } else {
      sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product.str_associations).toEqual("Item,Item2");
      expect(sources.Item.belongs_to[0]).toEqual("Product");
      expect(sources.Item2.belongs_to[0]).toEqual("Product"); 
    };
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

    var res = localDB.executeSql("select * from sources where name = 'Product'");
    //console.log(JSON.stringify(res)); // =>
    // [{"map":
    //   {"associations":"","backend_refresh_time":"0","blob_attribs":"","last_deleted_size":"0","last_inserted_size":"0",
    //    "last_sync_duration":"0","last_sync_success":"0","last_updated":"0","metadata":"",
    //    "name":"Product","partition":"local","schema":"",
    //    "schema_version":"1.0","source_attribs":"","source_id":"40027","sync_priority":"1000","sync_type":"none","token":""}
    //  }]
    //console.log(res[0].schema); // =>
    // CREATE TABLE "Product" ( "brand" varchar default null,"name" varchar default null,"object" varchar(255) PRIMARY KEY );
    expect(res[0].schema_version).toEqual('1.0');
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

    res = localDB.executeSql("SELECT * FROM Product",[]);
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
  //   var objects = db2.executeSql("select * from OBJECT_VALUES");

  //   expect(objects[0].value).toEqual('test');

  //   try{
  //   Model.create({"name":"test2","brand":"REBOOK","Price":54.05});
  //   var objects = db2.executeSql("select * from OBJECT_VALUES");
  //   expect(objects[2].value).not.toEqual("test2");
  //   expect(objects[3].value).not.toEqual("REBOOK");
  //   //Number is returning as a String.
  //   expect(objects[4].value).not.toEqual(54.05);
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
