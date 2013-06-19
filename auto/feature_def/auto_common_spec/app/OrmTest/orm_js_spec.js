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
      db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('local'), 'local');
    });

    afterEach(function(){
      db.execute("DELETE FROM SOURCES");
      db.execute("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
      db.close();
      db = null;
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
        sources = Rho.ORMHelper.getAllSources();
        expect(Model).toBeDefined();
        expect(Rho.ORM.getModel('Product')).toBe(Model);

        res = db.execute("SELECT * FROM Product");
        //console.log("res is: " + JSON.stringify(res));
        expect(res).toEqual([]);
        db.execute("DROP TABLE Product");
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

        res = db.execute("SELECT * FROM Product INDEXED BY p1 Where name = 'test' ");
        //console.log("res is: " + JSON.stringify(res));
        expect(res[0].name).toEqual('test');
        db.execute("DROP TABLE Product");
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

        res = db.execute("SELECT * FROM Product INDEXED BY u1 Where name = 'test' ");
        console.log("res is: " + JSON.stringify(res));
        expect(res[0].name).toEqual('test');
        db.execute("DROP TABLE Product");
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
        db.execute("DROP TABLE Product");
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
        db.execute("DROP TABLE Product");
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
        db.execute("DROP TABLE Product");
    });

    it("should return client id",function(){
        db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');
        var client_id;
        client_id = Rho.ORM.getClientId();
        expect(client_id).toEqual([]);

        db.execute("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

        client_id = Rho.ORM.getClientId();
        expect(client_id).toEqual("7");
    });

    it("should return true if a model objects have local changes for sync haveLocalChanges",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();
        var sources = Rho.ORMHelper.getAllSources();
        expect(sources.Product).toBeUndefined();

        db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');
        expect(Rho.ORM.haveLocalChanges()).toEqual(false);

        db.execute("INSERT INTO CHANGED_VALUES (object) VALUES('meobj')");

        expect(Rho.ORM.haveLocalChanges()).toEqual(true);
    });

    it("should delete all records with databaseFullReset",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();
        var sources = Rho.ORMHelper.getAllSources();
        expect(sources.Product).toBeUndefined();
        expect(sources.Item).toBeUndefined();
        expect(sources.Item2).toBeUndefined();
    });

    it("should delete all records and session info databaseFullResetAndLogout",function(){
        expect(Rho.ORM.getModel('Product')).toBeUndefined();
        var sources = Rho.ORMHelper.getAllSources();
        expect(sources.Product).toBeUndefined();
    });
});

describe("<ORM Db Reset specs>", function() {

  it("should delete all records only from selected models fixedschema databaseFullResetEx",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');

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
      var db_product = db.execute("Select * from Product");
      expect(db_product[0].name).toEqual("test");

      var ary = {"models":['Product']};

      Rho.ORM.databaseFullResetEx(ary,false,false);
      db_product = db.execute("Select * from Product");
      expect(db_product).toEqual([]);
       db.execute("DELETE FROM SOURCES");
      db.execute("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
      //db.close();
      db = null;
    });

    it("should delete all records only from selected models propertyBag databaseFullResetEx",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');

      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","user");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var db_product = db.execute("Select * from OBJECT_VALUES");
      expect(db_product[0].value).toEqual("test");
      expect(db_product[1].value).toEqual("2");

      var ary = {"models":['Product']};

      Rho.ORM.databaseFullResetEx(ary,false,false);
      db_product = db.execute("Select * from OBJECT_VALUES");
      expect(db_product).toEqual([]);
      db.execute("DELETE FROM SOURCES");
      db.execute("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
      //db.close();
      db = null;
    });

    it("should do nothing if localdb and localdb flag set to false",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('local'), 'local');

      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","local");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var db_product = db.execute("Select * from OBJECT_VALUES");
      expect(db_product[0].value).toEqual("test");
      expect(db_product[1].value).toEqual("2");

      var ary = {"models":['Product']};
      Rho.ORM.databaseFullResetEx(ary,false,false);

      db_product = db.execute("Select * from OBJECT_VALUES");
      expect(db_product[0].value).toEqual("test");
      expect(db_product[1].value).toEqual("2");
      db.execute("DELETE FROM SOURCES");
      db.execute("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
      //db.close();
      db = null;
    });

    it("should reset client_info table if set databaseFullResetEx",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');
      db.execute("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");
      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","user");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var db_product = db.execute("Select * from OBJECT_VALUES");
      var db_product2 = Rho.ORM.getClientId();
      expect(db_product2).toEqual("7");
      expect(db_product[0].value).toEqual("test");
      expect(db_product[1].value).toEqual("2");

      var ary = {"models":['Product']};

      Rho.ORM.databaseFullResetEx(ary,true,false);
      db_product = db.execute("Select * from OBJECT_VALUES");
      db_product2 = db.execute("Select * from client_info");
      expect(db_product2).toEqual([]);
      db.execute("DELETE FROM SOURCES");
      db.execute("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
      //db.close();
      db = null;
    });

    it("should reset client info databaseFullReset tables",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');
      db.execute("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

      var client_id = db.execute("Select * from client_info");
      expect(client_id[0].client_id).toEqual("7");

      Rho.ORM.databaseFullReset(true,false);
      client_id = db.execute("Select * from client_info");
      expect(client_id).toEqual([]);

      db.execute("DELETE FROM SOURCES");
      db.execute("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
      //db.close();
      db = null;
    });

    it("should reset client info databaseFullReset tables with undefined params",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');

      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","user");
          model.enable("sync");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var db_product = db.execute("Select * from OBJECT_VALUES");
      expect(db_product[0].value).toEqual("test");

      var ary = {"models":['Product']};
      Rho.ORM.databaseFullReset(undefined,undefined);

      db_product = db.execute("Select * from OBJECT_VALUES");
      expect(db_product).toEqual([]);

      db.execute("DELETE FROM SOURCES");
      db.execute("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
      db.close();
      db = null;
    });

   it("should reset client info databaseFullReset tables with no params",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');

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
      var db_product = db.execute("Select * from Product");
      expect(db_product[0].name).toEqual("test");

      var ary = {"models":['Product']};
      Rho.ORM.databaseFullReset();

      db_product = db.execute("Select * from Product");
      expect(db_product).toEqual([]);

      db.execute("DELETE FROM SOURCES");
      db.execute("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
      db.close();
      db = null;
    });

    it("should reset object_values and not sources table if set databaseFullResetEx",function(){
      expect(Rho.ORM.getModel('Product')).toBeUndefined();
      var sources = Rho.ORMHelper.getAllSources();
      expect(sources.Product).toBeUndefined();
      var db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('user'), 'user');

      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","user");
          model.enable("sync");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var sources_db = db.execute("select * from sources");
      var objects    = db.execute("select * from object_values");

      expect(sources_db[0].name).toEqual("Product");
      expect(objects[0].value).toEqual("test");

      Rho.ORM.databaseFullResetAndLogout();

      sources_db = db.execute("Select * from sources");
      objects    = db.execute("select * from object_values");
      expect(sources_db[0].name).toEqual("Product");
      expect(objects).toEqual([]);
      db.execute("DELETE FROM SOURCES");
      db.execute("DELETE FROM OBJECT_VALUES");
      Rho.ORM.clear();
      //db.close();
      db = null;
    });

    it("should reset client and local db if databaseFullclientResetAndLogout",function(){
      var db = new Rho.Database.SQLite3(Rho.Application.databaseFilePath('local'), 'local');
      db.execute("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

      var Product = function(model){
          model.modelName("Product");
          model.property("name","string");
          model.property("price","float");
          model.set("partition","user");
          model.enable("sync");
          model.set("partition","local");
      };

      var Model1 = Rho.ORM.addModel(Product);

      var p = Model1.create({'name':'test','price':2.0});
      var objects = db.execute("select * from OBJECT_VALUES");
      var client_info = db.execute("select * from client_info");
      expect(objects[0].value).toEqual("test");
      expect(client_info[0].client_id).toEqual("7");
      Rho.ORM.databaseFullclientResetAndLogout();

      objects = db.execute("select * from OBJECT_VALUES");
      client_info = db.execute("select * from client_info");
      expect(objects).toEqual([]);
      expect(client_info).toEqual([]);
    });

});
