describe("<ORM module specs>", function() {
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

    beforeEach(function(){
      db = Rho.ORMHelper.dbConnection("local");
    });

    afterEach(function(){
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      db.$execute_sql("DELETE FROM CHANGED_VALUES");
      Rho.ORM.clear();
    });

    it('should create model',function(){
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

    it('should add model, get model, clear all models', function() {
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

    it('should add fixed schema model with table', function() {
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

        res = db.$execute_sql("SELECT * FROM Product");
        
        expect(res).toEqual([]);
        db.$execute_sql("DROP TABLE Product");
    });

    it("should add index",function(){
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
        expect(Rho.ORM.getModel('Product')).toBe(Model);

        res = db.$execute_sql("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
        expect(res[0].map.name).toEqual('test');
        db.$execute_sql("DROP TABLE Product");
    });

    it("should add unique index",function(){
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

    it("should add belongs_to relationship",function(){
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
    });

    it("should add belongs_to relationship in any load order",function(){
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
    });

    it("should add multiple belongs_to relationship in any load order",function(){
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
    });

    it("should return client id",function(){
        var db2 = Rho.ORMHelper.dbConnection("user");
        var client_id;
        client_id = Rho.ORM.getClientId();
        expect(client_id).toEqual([]);

        db2.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

        client_id = Rho.ORM.getClientId();
        expect(client_id).toEqual("7");
    });
 });

describe("<ORM Db Reset specs>", function() {

  it("should return true if a model objects have local changes for sync haveLocalChanges",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();

      var db = Rho.ORMHelper.dbConnection("user");
      expect(Rho.ORM.haveLocalChanges()).toEqual(false);

      db.$execute_sql("INSERT INTO CHANGED_VALUES (object) VALUES('meobj')");

      expect(Rho.ORM.haveLocalChanges()).toEqual(true);
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

  it("should delete all records only from selected models fixedschema databaseFullResetEx",function(){
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

      Rho.ORM.databaseFullResetEx(ary,false,false);
      db_product = db.$execute_sql("Select * from Product");
      expect(db_product).toEqual([]);
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("should delete all records only from selected models propertyBag databaseFullResetEx",function(){
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

      Rho.ORM.databaseFullResetEx(ary,false,false);
      db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      expect(db_product).toEqual([]);
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("should do nothing if localdb and localdb flag set to false",function(){
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

      var ary = {"models":['Product']};
      Rho.ORM.databaseFullResetEx(ary,false,false);

      db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      expect(db_product[0].map.value).toEqual("test");
      expect(db_product[1].map.value).toEqual("2");
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("should reset client_info table if set databaseFullResetEx",function(){
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

      var ary = {"models":['Product']};

      Rho.ORM.databaseFullResetEx(ary,true,false);
      db_product = db.$execute_sql("Select * from OBJECT_VALUES");
      db_product2 = db.$execute_sql("Select * from client_info");
      expect(db_product2).toEqual([]);
      db.$execute_sql("DELETE FROM SOURCES");
      db.$execute_sql("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
    });

    it("should reset client info databaseFullReset tables",function(){
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

    it("should reset client info databaseFullReset tables with undefined params",function(){
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

   it("should reset client info databaseFullReset tables with no params",function(){
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
      Rho.ORM.clear();
    });

   it("should reset client info databaseFullReset tables of all partitions",function(){
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
      Rho.ORM.clear();
    });

    it("should reset object_values and not sources table if set databaseFullResetEx",function(){
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

    it("should reset client and local db if databaseFullclientResetAndLogout",function(){
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
});
