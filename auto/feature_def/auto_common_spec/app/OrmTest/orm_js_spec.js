   var db = null;
    var cleanVars = function(object) {
        var vars = object.vars();
        var cleanVars = {};
        for (var key in vars) {
            if (vars.hasOwnProperty(key)) {
                if (key !== 'object' && key !== 'source_id') {
                    cleanVars[key] = vars[key];
                }
            }
        }
        return cleanVars;
    };
describe("ORM JS API", function() {
describe("<ORM module specs>", function() {
  var reset = function(){
    db = Rho.ORMHelper.dbConnection("local");
    var partitions = Rho.ORMHelper.getDbPartitions();

    $.each(partitions, function(index, db2) {
      db2.$execute_sql("DELETE FROM SOURCES");
      db2.$execute_sql("DELETE FROM OBJECT_VALUES");
      db2.$execute_sql("DELETE FROM CHANGED_VALUES");
      if(db2.$is_table_exist("Product")){
        db2.$execute_sql("DROP TABLE Product");
      }
    });
    Rho.ORM.clear();
  };

    beforeEach(function(){
      reset();
    });

    it('VT302-0001 | Check Rho.ORM exist or not | Should return an object',function(){
      expect(typeof(Rho.ORM)).toEqual('function');
    });

    it('VT302-0004 | should create model',function(){
      var Product = function(model){
          model.modelName("Product");
          model.enable("sync");
          model.property("name","string");
          model.property("brand","string");
          model.set("partition","local");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.sync_type).toEqual('incremental');
      expect(source.name).toEqual('Product');
    });

    it('VT302-0005 | Call Rho.ORM.addModel, passing model name as numerical string',function(){
      var Product = function(model){
          model.modelName("123456");
          model.enable("sync");
          model.property("name","string");
          model.property("brand","string");
          model.set("partition","local");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["123456"];
      expect(source.sync_type).toEqual('incremental');
      expect(source.name).toEqual('123456');
    });

    it('VT302-0006 | set enable as sync at the time of creating model',function(){
      var Product = function(model){
          model.modelName("Product");
          model.enable("sync");
          model.property("name","string");
          model.property("brand","string");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.sync_type).toEqual('incremental');
      expect(source.name).toEqual('Product');
    });

    it('VT302-0007 | set enable as propertyBag at the time of creating model',function(){
      var Product = function(model){
          model.modelName("Product");
          model.enable("propertyBag");
          model.property("name","string");
          model.property("brand","string");
          model.set("partition","local");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.sync_type).toEqual('none');
      expect(source.name).toEqual('Product');
    });

    it('VT302-0008 | set enable as fixedSchema at the time of creating model',function(){
      var Product = function(model){
          model.modelName("Product");
          model.enable("fixedSchema");
          model.property("name","string");
          model.property("brand","string");
          model.set("partition","local");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.sync_type).toEqual('none');
      expect(source.name).toEqual('Product');
    });

    it('VT302-0009 | Set sync and set propertyBag at the time of creating model',function(){
      var Product = function(model){
          model.modelName("Product");
          model.enable("sync");
          model.enable("propertyBag");
          model.property("name","string");
          model.property("brand","string");
          model.set("partition","local");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.partition).toEqual('local');
      expect(source.sync_type).toEqual('incremental');
      expect(source.name).toEqual('Product');
    });

    it('VT302-0010 | Set sync and set fixedSchema at the time of creating model',function(){
      var Product = function(model){
          model.modelName("Product");
          model.enable("sync");
          model.enable("fixedSchema");
          model.property("name","string");
          model.property("brand","string");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.sync_type).toEqual('incremental');
      expect(source.partition).toEqual('user');
      expect(source.name).toEqual('Product');
    });

    it('VT302-0011 | Create a Model with property("name","string")',function(){
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source).toBeUndefined();
      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.property['name'][0]).toEqual('string');
      expect(source.partition).toEqual('local');
      expect(source.name).toEqual('Product');
    });

    it("VT302-0012 | Create a Model with property('int_prop', 'integer')",function(){
      var Product = function(model){
          model.modelName("Product");
          model.property("id","integer");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.property['id'][0]).toEqual('integer');
      expect(source.partition).toEqual('local');
      expect(source.name).toEqual('Product');
    });

    it("VT302-0013 | Create a Model with property ('float_prop', 'float')",function(){
      var Product = function(model){
          model.modelName("Product");
          model.property("float_prop","float");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.property['float_prop'][0]).toEqual('float');
      expect(source.partition).toEqual('local');
      expect(source.name).toEqual('Product');
    });

    it("VT302-0014 | Create a Model with property ('date_prop', 'date')",function(){
      var Product = function(model){
          model.modelName("Product");
          model.property("date_prop","date");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.property['date_prop'][0]).toEqual('date');
      expect(source.partition).toEqual('local');
      expect(source.name).toEqual('Product');
    });

    it("VT302-0015 | Create a Model with property ('time_prop', 'time')",function(){
      var Product = function(model){
          model.modelName("Product");
          model.property("time_prop","time");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.property['time_prop'][0]).toEqual('time');
      expect(source.partition).toEqual('local');
      expect(source.name).toEqual('Product');
    });

    it("VT302-0016 | Create a Model with property ('image_url', 'blob')",function(){
      var Product = function(model){
          model.modelName("Product");
          model.property("image_url","blob");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.property['image_url'][0]).toEqual('blob');
      expect(source.partition).toEqual('local');
      expect(source.name).toEqual('Product');
    });

    it("VT302-0017 | Create a Model with property('mycustomproperty', 'hello')",function(){
      var Product = function(model){
          model.modelName("Product");
          model.property("mycustomproperty","hello");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.property['mycustomproperty'][0]).toEqual('hello');
      expect(source.partition).toEqual('local');
      expect(source.name).toEqual('Product');
    });

    it("VT302-0018 | Create a Model with property('image_url', 'blob', 'overwrite')",function(){
      var Product = function(model){
          model.modelName("Product");
          model.property("image_url","blob","overwrite");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
      expect(source.property['image_url'][0]).toEqual('blob');
      expect(source.property['image_url'][1]).toEqual('overwrite');
      expect(source.partition).toEqual('local');
      expect(source.name).toEqual('Product');
    });

    it("VT302-0019 | should add index",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();
        var Product = function(model){
            model.modelName("Product");
            model.property("name","string");
            model.property("price","float");
            model.enable("fixedSchema");
            model.addIndex("p1",["name"]);
            model.set("partition","local");
        };

        var Model = Rho.ORM.addModel(Product);
        Model.create({"name":"test"});
        sources = Rho.ORMHelper.getAllSources();

        expect(Model).toBeDefined();

        res = db.$execute_sql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
        expect(res[0].map.name).toEqual('test');
        db.$execute_sql("DROP TABLE Product");
    });

    it("VT302-0020 | addIndex to multiple columns while creating a model",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();

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
        sources = Rho.ORMHelper.getAllSources();

        expect(Model).toBeDefined();

        res = db.$execute_sql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
        expect(res[0].map.name).toEqual('test');
        db.$execute_sql("DROP TABLE Product");
    });

    it("VT302-0021 | add multiple Index to multiple columns while creating a model",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();
        if(db.$is_table_exist("Product")){
          db.$execute_sql("DROP TABLE Product");
        }

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
        sources = Rho.ORMHelper.getAllSources();

        expect(Model).toBeDefined();

        res = db.$execute_sql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
        res2 = db.$execute_sql("SELECT * FROM Product INDEXED BY p2 Where type = 'testing2' ");
        expect(res[0].map.name).toEqual('test');
        expect(res2[0].map.name).toEqual('debug');
        db.$execute_sql("DROP TABLE Product");
    });

    it("VT302-0022 | should add unique index",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();

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

        sources = Rho.ORMHelper.getAllSources();
        expect(Model).toBeDefined();
        expect(Rho.ORM.getModel('Product')).toBe(Model);

        res = db.$execute_sql("SELECT * FROM Product INDEXED BY u1 Where name = 'test' ");
        console.log("res is: " + JSON.stringify(res));
        expect(res[0].map.name).toEqual('test');
        db.$execute_sql("DROP TABLE Product");
    });

    it("VT302-0023 | addUniqueIndex to multiple columns while creating a model",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();

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

        sources = Rho.ORMHelper.getAllSources();

        expect(Model).toBeDefined();

        res = db.$execute_sql("SELECT * FROM Product INDEXED BY u2 Where name = 'test' ");
        expect(res[0].map.name).toEqual('test');
        db.$execute_sql("DROP TABLE Product");
    });

    it("VT302-0024 | add multiple Unique Index to multiple columns while creating a model",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();
        if(db.$is_table_exist("Product")){
          db.$execute_sql("DROP TABLE Product");
        }

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
        sources = Rho.ORMHelper.getAllSources();

        expect(Model).toBeDefined();

        res = db.$execute_sql("SELECT * FROM Product INDEXED BY u1 Where name = 'test' ");
        res2 = db.$execute_sql("SELECT * FROM Product INDEXED BY u2 Where type = 'testing2' ");
        expect(res[0].map.name).toEqual('test');
        expect(res2[0].map.name).toEqual('debug');
        db.$execute_sql("DROP TABLE Product");
    });

    it("VT302-0025 | should add belongs_to relationship",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();

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
        db.$execute_sql("DROP TABLE Product");
        db.$execute_sql("DROP TABLE Item");
    });

    it("VT302-0026 | should add belongs_to relationship in any load order",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();
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
        db.$execute_sql("DROP TABLE Product");
        db.$execute_sql("DROP TABLE Item");
    });

    it("VT302-0027 | should add multiple belongs_to relationship in any load order",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();
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
        db.$execute_sql("DROP TABLE Product");
        db.$execute_sql("DROP TABLE Item");
        db.$execute_sql("DROP TABLE Item2");
    });

    it("VT302-0030 | Create a model with sync type bulk_only",function(){
      var Product = function(model){
          model.modelName("Product");
          model.enable("sync");
          model.property("time_prop","time");
          model.set("sync_type","bulk_only");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];

      expect(source.sync_type).toEqual('bulk_only');
      expect(source.partition).toEqual('user');
      expect(source.name).toEqual('Product');
    });

    it('VT302-0031 | Create a model with sync_priority as 1',function(){
      var Product = function(model){
          model.modelName("Product");
          model.enable("sync");
          model.property("name","string");
          model.property("brand","string");
          model.set("sync_priority",1);
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];

      expect(source.sync_type).toEqual('incremental');
      expect(source.sync_priority).toEqual(1);
      expect(source.name).toEqual('Product');
    });

    it('VT302-0032 | Create a model with in app Partition',function(){
      var Product = function(model){
          model.modelName("Product");
          model.enable("sync");
          model.property("name","string");
          model.property("brand","string");
          model.set("partition","app");
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];

      expect(source.partition).toEqual('app');
      expect(source.sync_type).toEqual('incremental');
      expect(source.name).toEqual('Product');
    });

    it('VT302-0033 | Create a model with schema_version, 1.0',function(){
      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("brand","string");
          model.set("schema_version",'1.0');
      };
      p = Rho.ORM.addModel(Product);
      source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];

      expect(source.schema_version).toEqual('1.0');
      expect(source.partition).toEqual('local');
      expect(source.name).toEqual('Product');
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
    //   source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];

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

    //   source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];

    //   expect(source.freezed).toEqual(true);
    //   expect(error).toEqual('Write error message');
    //   expect(source.partition).toEqual('local');
    //   expect(source.name).toEqual('Product');
    // });

    it('VT302-0038 | Get a model by its name after it has been added / should add model, get model, clear all models', function() {
        expect(Rho.ORM.getModel('Product')).toBeUndefined();

        var Product = function(model){
            model.modelName("Product");
            model.enable("sync");
            model.property("name","string");
            model.property("brand","string");
            model.set("partition","local");
        };

        var Model = Rho.ORM.addModel(Product);
        expect(Model).toBeDefined();
        expect(Rho.ORM.getModel('Product')).toBe(Model);
    });

    it('VT302-0008 | should add fixed schema model with table', function() {
        expect(Rho.ORM.getModel('Product')).toBeUndefined();

        var Product = function(model){
            model.modelName("Product");
            model.enable("sync");
            model.property("name","string");
            model.property("price","integer");
            model.enable("fixedSchema");
            model.set("partition","local");
        };

        var Model = Rho.ORM.addModel(Product);
        var sources = Rho.ORMHelper.getAllSources();
        expect(Model).toBeDefined();
        expect(sources['Product']).toBeDefined();
        expect(Rho.ORM.getModel('Product')).toBe(Model);

        res = db.$execute_sql("SELECT * FROM Product",[]);
        expect(res).toEqual([]);
        db.$execute_sql("DROP TABLE Product");
    });

    it("should return client id",function(){
        var db2 = Rho.ORMHelper.dbConnection("user");
        db2.$execute_sql("DELETE FROM CLIENT_INFO");
        var client_id;
        client_id = Rho.ORM.getClientId();
        expect(client_id).toEqual([]);

        db2.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

        client_id = Rho.ORM.getClientId();
        expect(client_id).toEqual("7");
    });
 });

describe("<ORM Db Reset specs>", function() {

  var reset = function(){
    db = Rho.ORMHelper.dbConnection("local");
    var partitions = Rho.ORMHelper.getDbPartitions();

    $.each(partitions, function(index, db2) {
      db2.$execute_sql("DELETE FROM SOURCES");
      db2.$execute_sql("DELETE FROM OBJECT_VALUES");
      db2.$execute_sql("DELETE FROM CHANGED_VALUES");
      if(db2.$is_table_exist("Product")){
        db2.$execute_sql("DROP TABLE Product");
      }
    });
    Rho.ORM.clear();
  };


  beforeEach(function(){
    reset();
  });

  it("VT302-0041 | Call databaseFullReset(true) should reset client info databaseFullReset tables",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");
      db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

      var client_id = db.$execute_sql("Select * from client_info");
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

      Rho.ORM.databaseFullReset(true);

      client_id = db.$execute_sql("Select * from client_info");
      objects = db2.$execute_sql("select * from OBJECT_VALUES");
      objects_u = db_u.$execute_sql("select * from OBJECT_VALUES");
      expect(client_id).toEqual([]);
      expect(objects_u).toEqual([]);
      expect(objects[0].map.value).toEqual('test');

      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      db_u.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0042 | Call databaseFullReset(false) should not reset client info databaseFullReset tables",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");
      db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

      var client_id = db.$execute_sql("Select * from client_info");
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

      Rho.ORM.databaseFullReset(false);

      client_id = db.$execute_sql("Select * from client_info");
      objects = db2.$execute_sql("select * from OBJECT_VALUES");
      objects_u = db_u.$execute_sql("select * from OBJECT_VALUES");
      expect(objects[0].map.value).toEqual('test');
      expect(client_id[0].map.client_id).toEqual("7");
      expect(objects_u).toEqual([]);

      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0043 | should reset client info databaseFullReset tables of all partitions",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db_user = Rho.ORMHelper.dbConnection("user");
      var db_local = Rho.ORMHelper.dbConnection("local");

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


      var user_f = db_user.$execute_sql("Select * from Product");
      expect(user_f[0].map.name).toEqual("user_fixed");
      var user_p = db_user.$execute_sql("Select * from OBJECT_VALUES");
      expect(user_p[0].map.value).toEqual("user_pb");

      var local_f = db_local.$execute_sql("Select * from Product_local");
      expect(local_f[0].map.name).toEqual("local_fixed");
      var local_p = db_local.$execute_sql("Select * from OBJECT_VALUES");
      expect(local_p[0].map.value).toEqual("local_pb");

      Rho.ORM.databaseFullReset(false,true);

      user_f = db_user.$execute_sql("Select * from Product");
      expect(user_f).toEqual([]);
      user_p = db_user.$execute_sql("Select * from OBJECT_VALUES");
      expect(user_p).toEqual([]);
      expect(db_user.$is_table_exist("Product")).toBe(true);

      local_f = db_local.$execute_sql("Select * from Product_local");
      expect(local_f).toEqual([]);
      local_p = db_local.$execute_sql("Select * from OBJECT_VALUES");
      expect(local_p).toEqual([]);
      expect(db_local.$is_table_exist("Product_local")).toBe(true);
      db_user.$execute_sql("DELETE FROM SOURCES");
      db_local.$execute_sql("DELETE FROM SOURCES");
      db_user.$execute_sql("DELETE FROM OBJECT_VALUES");
      db_local.$execute_sql("DELETE FROM OBJECT_VALUES");
      db_user.$execute_sql("DROP TABLE Product");
      db_local.$execute_sql("DROP TABLE Product_local");
      Rho.ORM.clear();
    });

    it("VT302-0044 | Call databaseFullReset(false,false) should not reset client info and local models ",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");
      db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

      var client_id = db.$execute_sql("Select * from client_info");
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

      Rho.ORM.databaseFullReset(false,false);
      
      client_id = db.$execute_sql("Select * from client_info");
      objects = db2.$execute_sql("select * from OBJECT_VALUES");
      objects_u = db_u.$execute_sql("select * from OBJECT_VALUES");
      
      expect(objects_u).toEqual([]);
      expect(objects[0].map.value).toEqual('test');
      expect(client_id[0].map.client_id).toEqual("7");
      expect(objects[0].map.value).toEqual('test');
      
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0045 | Call databaseFullReset(true,true) should reset client info and local models ",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");
      db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

      var client_id = db.$execute_sql("Select * from client_info");
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

      client_id = db.$execute_sql("Select * from client_info");
      objects = db2.$execute_sql("select * from OBJECT_VALUES");
      objects_u = db_u.$execute_sql("select * from OBJECT_VALUES");

      expect(client_id).toEqual([]);
      expect(objects_u).toEqual([]);
      expect(objects).toEqual([]);

      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0046 | should reset client info databaseFullReset tables",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");
      db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

      var client_id = db.$execute_sql("Select * from client_info");
      expect(client_id[0].map.client_id).toEqual("7");

      Rho.ORM.databaseFullReset(true,false);
      client_id = db.$execute_sql("Select * from client_info");
      expect(client_id).toEqual([]);

      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0047 | should reset client info databaseFullReset tables with undefined params",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");

      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","user");
          model.enable("sync");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      expect(db_product[0].map.value).toEqual("test");

      var ary = {"models":['Product']};
      Rho.ORM.databaseFullReset(undefined,undefined);

      db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      expect(db_product).toEqual([]);

      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

   it("VT302-0048 | should reset client info databaseFullReset tables with no params",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");

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
      var db_product = db.$execute_sql("Select * from Product");
      expect(db_product[0].map.name).toEqual("test");

      var ary = {"models":['Product']};
      Rho.ORM.databaseFullReset();

      db_product = db.$execute_sql("Select * from Product");
      expect(db_product).toEqual([]);

      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      db.$execute_sql("DROP TABLE Product");
      Rho.ORM.clear();
    });

    it("VT302-0050 | should reset object_values and not sources table if set databaseFullResetAndLogout",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");

      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","user");
          model.enable("sync");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var sources_db = db.$execute_sql("select * from sources");
      var objects    = db.$execute_sql("select * from object_values");

      expect(sources_db[0].map.name).toEqual("Product");
      expect(objects[0].map.value).toEqual("test");

      Rho.ORM.databaseFullResetAndLogout();

      sources_db = db.$execute_sql("Select * from sources");
      objects    = db.$execute_sql("select * from object_values");
      expect(sources_db[0].map.name).toEqual("Product");
      expect(objects).toEqual([]);
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0053 | should delete all records only from selected models fixedschema databaseFullResetEx",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");

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
      var db_product = db.$execute_sql("Select * from Product");
      expect(db_product[0].map.name).toEqual("test");

      var ary = {"models":['Product']};

      Rho.ORM.databaseFullResetEx(ary);
      db_product = db.$execute_sql("Select * from Product");
      expect(db_product).toEqual([]);
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      db.$execute_sql("DROP TABLE Product");
      Rho.ORM.clear();
    });

    it("VT302-0054 | should delete all records only from selected models propertyBag databaseFullResetEx",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");

      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","user");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      expect(db_product[0].map.value).toEqual("test");
      expect(db_product[1].map.value).toEqual("2");

      var ary = {"models":['Product']};

      Rho.ORM.databaseFullResetEx(ary);
      db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      expect(db_product).toEqual([]);
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0055 | should reset client_info table if set databaseFullResetEx",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");
      db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","user");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      var db_product2 = Rho.ORM.getClientId();
      expect(db_product2).toEqual("7");
      expect(db_product[0].map.value).toEqual("test");
      expect(db_product[1].map.value).toEqual("2");

      var ary = {"models":['Product'],"reset_client_info":true};
      Rho.ORM.databaseFullResetEx(ary);
      
      db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      db_product2 = db.$execute_sql("Select * from client_info");
      expect(db_product2).toEqual([]);
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0056 | Call databaseFullResetEx with Model name as Hash and reset_client_info as false and reset_local_models to false",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");
      db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
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

      var db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      var db_product2 = Rho.ORM.getClientId();

      expect(db_product2).toEqual("7");
      expect(db_product[0].map.value).toEqual("test");
      expect(db_product[1].map.value).toEqual("2");
      expect(db_product[2].map.value).toEqual("test2");
      expect(db_product[3].map.value).toEqual("4");

      var ary = {"models":['Product'],"reset_local_models":false,"reset_client_info":false};
      Rho.ORM.databaseFullResetEx(ary);
      
      db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      
      db_product2 = Rho.ORM.getClientId();

      expect(db_product2).toEqual("7");
      expect(db_product[0].map.value).toEqual("test2");
      expect(db_product[1].map.value).toEqual("4");
      
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0057 | Call databaseFullResetEx with Model name as Hash and reset_client_info as false",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");
      db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
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

      var db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      var db_product2 = Rho.ORM.getClientId();
      
      expect(db_product2).toEqual("7");
      expect(db_product[0].map.value).toEqual("test");
      expect(db_product[1].map.value).toEqual("2");
      expect(db_product[2].map.value).toEqual("test2");
      expect(db_product[3].map.value).toEqual("4");

      var ary = {"models":['Product'],"reset_client_info":false};
      Rho.ORM.databaseFullResetEx(ary);
      
      db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      db_product2 = Rho.ORM.getClientId();
      
      expect(db_product2).toEqual("7");
      expect(db_product[0].map.value).toEqual("test2");
      expect(db_product[1].map.value).toEqual("4");
      
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0058 | Call databaseFullResetEx with Model name as Hash and reset_client_info as false and reset_local_models to true",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("user");
      db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","user");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      var db_product2 = Rho.ORM.getClientId();
      expect(db_product2).toEqual("7");
      expect(db_product[0].map.value).toEqual("test");
      expect(db_product[1].map.value).toEqual("2");

      var ary = {"models":['Product'],"reset_client_info":false,"reset_local_models":true};
      Rho.ORM.databaseFullResetEx(ary);

      db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      db_product2 = Rho.ORM.getClientId();
      expect(db_product2).toEqual("7");
      expect(db_product).toEqual([]);

      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0060 | should do nothing if localdb and localdb flag set to false",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = Rho.ORMHelper.dbConnection("local");

      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","local");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      expect(db_product[0].map.value).toEqual("test");
      expect(db_product[1].map.value).toEqual("2");

      var ary = {"models":['Product'],"reset_local_models":false,"reset_client_info":false};
      Rho.ORM.databaseFullResetEx(ary);

      db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      expect(db_product[0].map.value).toEqual("test");
      expect(db_product[1].map.value).toEqual("2");
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("VT302-0062 | should reset client and local db if databaseFullclientResetAndLogout",function(){
      var db = Rho.ORMHelper.dbConnection("local");
      db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.enable("sync");
          model.set("partition","local");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var objects = db.$execute_sql("select * from OBJECT_VALUES");
      var client_info = db.$execute_sql("select * from client_info");
      expect(objects[0].map.value).toEqual("test");
      expect(client_info[0].map.client_id).toEqual("7");
      Rho.ORM.databaseFullclientResetAndLogout();

      objects = db.$execute_sql("select * from OBJECT_VALUES");
      client_info = db.$execute_sql("select * from client_info");
      expect(objects).toEqual([]);
      expect(client_info).toEqual([]);
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

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

    it("VT302-0065 | call databaseLocalReset with changes in local model | Should removed local model data",function(){
        var client_db = Rho.ORMHelper.dbConnection("user");
        client_db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

        var Product = function(model){
            model.modelName("Product");
            model.property("name","string");
            model.property("price","float");
            model.set("partition","local");
        };

        var Model = Rho.ORM.addModel(Product);
        Model.create({"name":"test"});
        var db = Rho.ORMHelper.dbConnection("local");
        var objects = db.$execute_sql("select * from OBJECT_VALUES");
        expect(objects[0].map.value).toEqual("test");

        Rho.ORM.databaseLocalReset();

        objects = db.$execute_sql("select * from OBJECT_VALUES");
        var clientId = Rho.ORM.getClientId();

        expect(Model).toBeDefined();
        expect(objects).toEqual([]);
        expect(clientId).toEqual("7");

        db.$execute_sql("DELETE FROM SOURCES");
        db.$execute_sql("DELETE FROM OBJECT_VALUES");
        Rho.ORM.clear();
    });

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
        Rho.ORM.clear();
    });

    it("VT302-0068b | Call haveLocalChanges without having any model",function(){
      expect(Rho.ORM.haveLocalChanges()).toEqual(false);
    });

    it("VT302-0068 | should return true if a model objects have local changes for sync haveLocalChanges",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();

      var db = Rho.ORMHelper.dbConnection("user");
      expect(Rho.ORM.haveLocalChanges()).toEqual(false);

      db.$execute_sql("INSERT INTO CHANGED_VALUES (object) VALUES('meobj')");

      expect(Rho.ORM.haveLocalChanges()).toEqual(true);
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      db.$execute_sql("DELETE FROM CHANGED_VALUES");
      expect(Rho.ORM.haveLocalChanges()).toEqual(false);
      Rho.ORM.clear();
    });

  it("should load source from table if exists",function(){
    Rho.ORM.clear();
    Rho.ORM.clearFreeSourceIds();
    db.$execute_sql("DELETE FROM SOURCES");

    console.log("add model1 Customer*******");
    var customer = Rho.ORM.addModel(function(model){
      model.modelName("Customer");
      model.set("partition","local");
    });
    console.log("add model2 Product*******");
    var product = Rho.ORM.addModel(function(model){
      model.modelName("Product");
      model.set("partition","local");
    });

    var sources = Rho.ORMHelper.getAllSources();
    var customer_src_id = sources["Customer"].source_id;
    var product_src_id  = sources["Product"].source_id;

    expect(product_src_id).toEqual(40002);
    expect(customer_src_id).toEqual(40001);
    db_product = db.$execute_sql("select source_id from sources where name = 'Product'");
    expect(db_product.length).toEqual(1);
    expect(db_product[0].map.source_id).toEqual("40002");

    db_customer = db.$execute_sql("select source_id from sources where name = 'Customer'");
    expect(db_customer[0].map.source_id).toEqual("40001");
    expect(db_customer.length).toEqual(1);

    Rho.ORM.clear();

    console.log("add model4 Customer2*******");
    customer = Rho.ORM.addModel(function(model){
      model.modelName("Customer");
      model.set("partition","local");
    });

    console.log("add model3 Product2*******");
    product = Rho.ORM.addModel(function(model){
      model.modelName("Product");
      model.set("partition","local");
    });

    sources = Rho.ORMHelper.getAllSources();
    expect(String(customer_src_id)).toEqual(sources["Customer"].source_id);
    expect(String(product_src_id)).toEqual(sources["Product"].source_id);
  });
});
});
