// Describe:

// "Model_Object"
// "Fixed Schema Models"
// "Property Bag Models"

describe("Model Object", function() {
  var model;
  var object;
  var modelDef = function(model){
    if(!useNewOrm) {
      model.modelName('Product');
      model.property("key","string");
    } else
      model.setModelProperty("key", "string", "");

    model.set("partition","local");
  };
  var modelDef2 = function(model){
    if(!useNewOrm) {
      model.modelName("Item");
      model.property("key","string");
    } else
      model.setModelProperty("key", "string", "");

    model.set("partition","local");
  };
  var modelDefs3 = function(model){
    if(!useNewOrm) {
      model.modelName("Item");
      model.property("name","string");
    } else
      model.setModelProperty("name", "string", "");

    model.enable("sync");
  };

  function reset() {
    Rho.ORM.clear();
    var partitions = Rho.ORMHelper.getDbPartitions();
    $.each(partitions, function(index, db2) {
      db2.executeSql("delete FROM SOURCES");
      db2.executeSql("DELETE FROM OBJECT_VALUES");
      db2.executeSql("DELETE FROM CHANGED_VALUES");
    });
  };

  beforeEach(function() {
    reset();
    model = specHelpers.addModel('Product', modelDef);
    model.deleteAll();
    object = model.make({'key': 'value'});
  });

  it('returns vars', function() {
    expect(specHelpers.cleanVars(object)).toEqual({'key': 'value'});
  });

  it('retrieves object id', function() {
    if(useNewOrm){
      expect(object.object).toBe(object.get('object'));
    } else {
      expect(object.object()).toBe(object.get('object'));
    }
  });

  it('gets existing property', function() {
    expect(object.get('key')).toBe('value');
  });

  it('gets absent property', function() {
    expect(object.get('absent_key')).toBeUndefined();
  });

  it('sets property', function() {
    object.set('key', 'another value');
    expect(specHelpers.cleanVars(object)).toEqual({'key': 'another value'});
  });

  it('sets new property', function() {
    object.set('new_key', 'new value');
    expect(specHelpers.cleanVars(object)).toEqual({'key': 'value', 'new_key': 'new value'});
  });

  it('supports set chaining', function() {
    object.set('key', 'another value').set('new_key', 'new value');
    expect(specHelpers.cleanVars(object)).toEqual({'key': 'another value', 'new_key': 'new value'});
  });

  it('sets property with empty name', function() {
    object.set('', 'another value');
    expect(specHelpers.cleanVars(object)).toEqual({'key': 'value', '': 'another value'});
  });

  it('has properties', function() {
    expect(object.has('key')).toBe(true);
    expect(object.has('absent_key')).toBe(false);
  });

  it('should create object in database', function() {
    var before = model.count();
    model.create({'key': 'value'});
    var after = model.count();
    expect(after).toBe(before + 1);
  });

  it('should save object to database', function() {
    model.deleteAll();
    var object = model.create({'key': 'value'});

    if(useNewOrm) {
      expect(specHelpers.allVars(model.find(object.object))).toEqual(specHelpers.allVars(object));
      object.set('key', 'another value').set('new_key', 'new value');
      expect(specHelpers.allVars(model.find(object.object))).not.toEqual(specHelpers.allVars(object));
      object.save();
      expect(specHelpers.allVars(model.find(object.object))).toEqual(specHelpers.allVars(object));
    } else {
      expect(model.find(object.object()).vars()).toEqual(object.vars());
      object.set('key', 'another value').set('new key', 'new value');
      expect(model.find(object.object()).vars()).not.toEqual(object.vars());
      object.save();
      expect(model.find(object.object()).vars()).toEqual(object.vars());
    }
  });

  it('updates object attributes in database', function() {
    model.deleteAll();
    var object = model.create({'key': 'value', 'original_key': 'original value'});

    if(useNewOrm) {
      expect(specHelpers.allVars(model.find(object.object))).toEqual(specHelpers.allVars(object));
      object.updateAttributes({'key': 'another value', 'new_key': 'new value'});
      expect(specHelpers.allVars(model.find(object.object))).toEqual(specHelpers.allVars(object));
      expect(specHelpers.cleanVars(object)).toEqual({'key': 'another value', 'new_key': 'new value', 'original_key': 'original value'});
    } else {
      expect(specHelpers.allVars(model.find(object.object()))).toEqual(specHelpers.allVars(object));
      object.updateAttributes({'key': 'another value', 'new_key': 'new value'});
      expect(model.find(object.object()).vars()).toEqual(object.vars());
      expect(specHelpers.cleanVars(object)).toEqual({'key': 'another value', 'new_key': 'new value', 'original_key': 'original value'});
    };
  });

  it('destroys object in database', function() {
    model.deleteAll();
    var object1 = model.create({'key1': 'value1'});
    var object2 = model.create({'key2': 'value2'});

    expect(model.count()).toBe(2);

    object1.destroy();

    var found = model.find('all');
    expect(found.length).toBe(1);
    expect(specHelpers.allVars(found[0])).toEqual(specHelpers.allVars(object2));
  });

  it('does not create empty object in database', function() {
    var before = model.count();
    model.create();
    expect(model.count()).toBe(before);
  });

  it('does not create object with the only empty property in database', function() {
    var before = model.count();
    model.create({'': 'value'});
    expect(model.count()).toBe(before);
  });

  it('deletes all objects in database', function() {
    model.create({'key': 'value'});
    expect(model.count()).toBeGreaterThan(0);
    model.deleteAll();
    expect(model.count()).toBe(0);
  });

  // ==========================================================
  it('delete object in sync database', function() {
    var Modelsync = specHelpers.addModel("Item", modelDefs3);
    Modelsync.create({'name': 'tests'});

    var userDb = Rho.ORMHelper.dbConnection("user");
    var cv = userDb.executeSql("select * from CHANGED_VALUES");

    console.log("T302-0211.1: ");
    console.log(cv);
    console.log(JSON.stringify(cv));

    expect(cv[0].update_type).toEqual("create");

    cv = userDb.executeSql("delete from CHANGED_VALUES");
    expect(cv).toEqual([]);

    var obj = Modelsync.find("first");
    obj.destroy();

    cv = userDb.executeSql("select * from CHANGED_VALUES");
    expect(cv[0].update_type).toEqual("delete");
  });

  it('update object in sync database', function() {
    var Modelsync = specHelpers.addModel("Item", modelDefs3);
    Modelsync.create({'name': 'tests'});

    var userDb = Rho.ORMHelper.dbConnection("user");
    var cv = userDb.executeSql("select * from CHANGED_VALUES");

    console.log("T302-0211.2: ");
    console.log(cv);
    console.log(JSON.stringify(cv));

    expect(cv[0].update_type).toEqual("create");

    cv = userDb.executeSql("delete from CHANGED_VALUES");
    expect(cv).toEqual([]);

    var obj = Modelsync.find("first");
    obj.updateAttributes({name:"tests2"});
    cv = userDb.executeSql("select * from CHANGED_VALUES");
    expect(cv[0].update_type).toEqual("update");
  });

  it('deletes all objects of specific model in database', function() {
    var model1 = specHelpers.addModel("Product", modelDef);
    var model2 = specHelpers.addModel("Item", modelDef2);

    model1.create({'key': 'value'});
    model2.create({'key': 'value'});

    expect(model1.count()).toBeGreaterThan(0);
    expect(model2.count()).toBeGreaterThan(0);

    var before1 = model1.count();
    model2.deleteAll();
    var after1 = model.count();

    expect(after1).toBe(before1);
    expect(model2.count()).toBe(0);
  });

  it('reads object from database', function() {
    model.deleteAll();
    model.create({'key': 'value'});
    var found = model.find('all');
    expect(found.length).toBe(1);
    expect(specHelpers.cleanVars(found[0])).toEqual({'key': 'value'});
  });

  it('compares 2 objects props', function() {
    var m1 = model.create({'key': 'value'});
    var m2 = model.create({'key': 'value'});
    res = (m1.get('key') == m2.get('key'));
    expect(res).toBe(true);
  });

  it('does not write empty property to database', function() {
    model.deleteAll();
    model.create({'key': 'value', '': 'empty'});
    var found = model.find('all');
    expect(found.length).toBe(1);
    expect(specHelpers.cleanVars(found[0])).toEqual({'key': 'value'});
  });

  it('counts objects in database', function() {
    var model2 = specHelpers.addModel("Item", modelDef2);
    var before1 = model.count();

    model.create({'key': 'value'});
    model.create({'key': 'value'});
    model2.create({'key': 'value'});

    var after1 = model.count();

    expect(after1).toBe(before1 + 2);
  });

  it('counts objects in database using find', function() {
    var model2 = specHelpers.addModel("Item", modelDef2);
    var before1 = model.find('count');

    model.create({'key': 'value'});
    model.create({'key': 'value'});
    model2.create({'key': 'value'});

    var after1 = model.find('count');

    expect(after1).toBe(before1 + 2);
  });

  it('counts objects in database using find with condition', function() {
    var model2 = specHelpers.addModel("Item", modelDef2);
    var before1 = model.find('count', {conditions: {'key': 'value to find'}});

    model.create({'key': 'value'});
    model.create({'key': 'value to find'});
    model.create({'key': 'value to find'});
    model.create({'another_key': 'value to find'});
    model2.create({'key': 'value to find'});

    var after1 = model.find('count', {conditions: {'key': 'value to find'}});

    expect(after1).toBe(before1 + 2);
  });

  it('finds all objects in database', function() {
    var model2 = specHelpers.addModel("Item", modelDef2);

    model.create({'key1': 'value1'});
    model2.create({'key2': 'value2'});
    model.create({'key3': 'value3'});

    var found = model.find('all');

    expect(found.length).toBe(2);
    var i = (found[0].has('key1')) ? 0 : 1;
    expect(specHelpers.cleanVars(found[i])).toEqual({'key1': 'value1'});
    expect(specHelpers.cleanVars(found[1 - i])).toEqual({'key3': 'value3'});
  });

  it('finds all objects with one condition', function() {
    model.create({'key': 'value1'});
    var objects = [model.create({'key': 'value2'}), model.create({'key': 'value2'})];

    var found = model.find('all', {conditions: {'key': 'value2'}});

    expect(found.length).toBe(2);
    if(useNewOrm) {
      var i = (found[0].object === objects[0].object) ? 0 : 1;
      expect(specHelpers.cleanVars(found[i])).toEqual(specHelpers.cleanVars(objects[0]));
      expect(specHelpers.cleanVars(found[1 - i])).toEqual(specHelpers.cleanVars(objects[1]));
    } else {
      var i = (found[0].object() === objects[0].object()) ? 0 : 1;
      expect(specHelpers.cleanVars(found[i])).toEqual(specHelpers.cleanVars(objects[0]));
      expect(specHelpers.cleanVars(found[1 - i])).toEqual(specHelpers.cleanVars(objects[1]));
    };
  });

  it('finds all objects with conditions', function() {
    model.deleteAll();

    model.create({'key1': 'value2'});
    model.create({'key2': 'value3'});
    var objects = [
        model.create({'key1': 'value2', 'key2': 'value3'}),
        model.create({'key1': 'value2', 'key2': 'value3'})
    ];
    model.create({'key1': 'value2', 'key2': 'value2'});
    model.create({'key1': 'value3', 'key2': 'value3'});

    var found = model.find('all', {conditions: {'key1': 'value2', 'key2': 'value3'}});

    expect(found.length).toBe(2);
    if(useNewOrm) {
      var i = (found[0].object === objects[0].object) ? 0 : 1;
      expect(specHelpers.cleanVars(found[i])).toEqual(specHelpers.cleanVars(objects[0]));
      expect(specHelpers.cleanVars(found[1 - i])).toEqual(specHelpers.cleanVars(objects[1]));
    } else {
      var i = (found[0].object() === objects[0].object()) ? 0 : 1;
      expect(specHelpers.cleanVars(found[i])).toEqual(specHelpers.cleanVars(objects[0]));
      expect(specHelpers.cleanVars(found[1 - i])).toEqual(specHelpers.cleanVars(objects[1]));
    };
  });

  it('finds specific object', function() {
    var original = model.create({'key1': 'value1'});
    model.create({'key2': 'value2'});
    if(useNewOrm) {
      expect(specHelpers.allVars(model.find(original.object))).toEqual(specHelpers.allVars(original));
    }
    else {
      expect(specHelpers.allVars(model.find(original.object()))).toEqual(specHelpers.allVars(original));
    };
  });

  it('should finds first object in database', function() {
    model.deleteAll();
    var originals = [model.create({'key1': 'value1'}), model.create({'key3': 'value3'})];
    var found = model.find('first');
    expect(specHelpers.allVars(found)).toEqual(specHelpers.allVars(originals[(found.has('key1')) ? 0 : 1]));
  });

  // Bhakta: This way of calling find is not mentioned in Docs.
  it("should find with select",function() {
    model.deleteAll();
    var res;
    expect(model.count()).toEqual(0);

    model.create({"industry":"Technology","name":"Moto"});
    model.create({"industry":"Technology","name":"Aeroprise"});
    model.create({"industry":"Accounting","name":"PWC"});
    expect(model.count()).toEqual(3);
    res = model.find("all",
                {
                  conditions: {"industry":"Technology"},
                  select: ['name']
                });
    expect(res[0].get("name")).toEqual("Moto");
    expect(res[0].get("industry")).toBeUndefined();
    expect(res[1].get("name")).toEqual("Aeroprise");
    expect(res[1].get("industry")).toBeUndefined();
  });

  it("should find first",function() {
    model.create({"name":"Mobio"});
    model.create({"name":"Mobio2"});
    var res = model.find("first");
    expect(res.get("name")).toEqual("Mobio");
  });

  it("should update record",function(){
    var record = model.create({"name":"Zoolo","industry":"Tech"});
    record.updateAttributes({"name":"Zoolo2"});
    var res = model.find("first",{conditions:{"name":"Zoolo2"}});
    expect(res.get("name")).toEqual("Zoolo2");
  });

  it("should create record ",function(){
    var record = model.create({"name":"Zoolo","industry":"Tech"});
    var res = model.find("first",{conditions:{"name":"Zoolo"}});
    expect(res.get("name")).toEqual("Zoolo");
  });

  it("should delete record",function(){
    model.deleteAll();
    var record = model.create({"name":"Zoolo","industry":"Tech"});
    var res = model.find("first",{conditions:{"name":"Zoolo"}});
    expect(res.get("name")).toEqual("Zoolo");

    record.destroy();
    res = model.count();
    expect(res).toEqual(0);
  });

  it("should make record",function(){
    var record = model.make({"name":"Zoolo","industry":"Tech"});
    var res = model.count();
    record.save();
    res = model.count();
    expect(res).toEqual(1);
  });

});

describe("Fixed Schema Models", function() {
  var model;
  var model2;

   function reset(){
    Rho.ORM.clear();
    var partitions = Rho.ORMHelper.getDbPartitions();
    $.each(partitions, function(index, db2) {
      db2.executeSql("DELETE FROM SOURCES");
      db2.executeSql("DELETE FROM OBJECT_VALUES");
      db2.executeSql("DELETE FROM CHANGED_VALUES");
    });
    Rho.ORM.clear();
  }

  beforeEach(function(){
    reset();
    var db = Rho.ORMHelper.dbConnection("local");
    if(db.isTableExist('Product'))
      db.executeSql("DROP TABLE Product");
    if(db.isTableExist('ProductSync'))
      db.executeSql("DROP TABLE ProductSync");

    if(useNewOrm) {
      var modelDef = function(model){
        model.enable("fixed_schema");
        model.setModelProperty("name", "string", "");
        model.setModelProperty("brand","integer", "");
        model.setModelProperty("industry", "string", "");
        model.set("partition","local");
      };
      var modelDef2 = function(model){
        model.enable("fixed_schema");
        model.enable("sync");
        model.setModelProperty("name","string","");
      };

      model = Rho.ORM.addModel('Product', modelDef);
      model.deleteAll();
      model2 = Rho.ORM.addModel('ProductSync', modelDef2);
      model2.deleteAll();
    }
    else {
      var modelDef = function(model){
        model.modelName('Product'),
        model.enable("fixedSchema");
        model.property("name");
        model.property("brand","integer");
        model.property("industry", "string");
        model.set("partition","local");
      };
      var modelDef2 = function(model){
        model.modelName("ProductSync");
        model.enable("fixedSchema");
        model.enable("sync");
        model.property("name","string");
      };

      model = Rho.ORM.addModel(modelDef);
      model.deleteAll();
      model2 = Rho.ORM.addModel(modelDef2);
      model2.deleteAll();
    };

  });

  it("should verify created fixed schema modal",function(){
    model.create({name:"testfixed"});
    var obj = model.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dblocal = Rho.ORMHelper.dbConnection("local");
    var dboutput = dblocal.executeSql("select * from Product");
    expect(dboutput[0].name).toEqual("testfixed");
  });

  it("should create sync model in db",function(){
    model2.create({"name":"testname"});
    var dbUser = Rho.ORMHelper.dbConnection("user");
    var res = dbUser.executeSql("select * from CHANGED_VALUES");
    expect(res[0].update_type).toEqual("create");
  });

  it("should support blob type",function(){
    var BlobbModel;
    if(useNewOrm) {
      var blobber = function(model){
        model.enable("fixed_schema");
        model.enable("sync");
        model.setModelProperty("name", "string", "");
        model.setModelProperty("image","blob", "");
      };
      BlobbModel = Rho.ORM.addModel('Blob', blobber);
    } else {
      var blobber = function(model){
        model.modelName("Blob");
        model.enable("fixedSchema");
        model.enable("sync");
        model.property("name");
        model.property("image","blob");
      };
      BlobbModel = Rho.ORM.addModel(blobber);
    };

    BlobbModel.create({name:"testblob",image:"randomdatahere"});
    var obj = BlobbModel.find("first");
    expect(obj.get("name")).toEqual('testblob');
    var dbUser = Rho.ORMHelper.dbConnection("user");
    dbUser.executeSql("DROP TABLE Blob");
  });

  it("should update fixedSchema",function(){
    model.create({name:"testfixed"});
    var obj = model.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dblocal = Rho.ORMHelper.dbConnection("local");
    var dboutput = dblocal.executeSql("select * from Product");
    expect(dboutput[0].name).toEqual("testfixed");

    obj.updateAttributes({name:"testfixed2"});
    var obj2 = model.find("first");
    expect(obj2.get("name")).toEqual("testfixed2");
  });

  it("should update fixedSchema with multiple fields",function(){
    model.create({name:"testfixed",brand:4});
    var obj = model.find("first");
    expect(obj.get("name")).toEqual("testfixed");
    expect(obj.get("brand")).toEqual('4');
    var dblocal = Rho.ORMHelper.dbConnection("local");
    var dboutput = dblocal.executeSql("select * from Product");
    expect(dboutput[0].name).toEqual("testfixed");

    obj.updateAttributes({name:"testfixed2",brand:2});
    var obj2 = model.find("first");
    expect(obj2.get("name")).toEqual("testfixed2");
    expect(obj2.get("brand")).toEqual("2");
  });

  // FIXME:
  it("should delete fixedSchema",function(){
    model.create({name:"testfixed"});
    var obj = model.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dbLocal = Rho.ORMHelper.dbConnection("local");
    var dboutput = dbLocal.executeSql("select * from Product");
    expect(dboutput[0].name).toEqual("testfixed");

    obj.destroy();

    var obj2 = model.find("first");
    // FIXME: should return []
    //expect(obj2).toEqual(undefined);
    if(useNewOrm)
      expect(obj2).toEqual(undefined);
    else
      expect(obj2).toEqual([]);

  });

  // FIXME:
  it("should delete fixedSchema sync model",function(){
    model2.create({name:"testfixed"});
    var obj = model2.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dbUser = Rho.ORMHelper.dbConnection("user");
    var dboutput = dbUser.executeSql("select * from ProductSync");
    expect(dboutput[0].name).toEqual("testfixed");

    var dbchanged = dbUser.executeSql("select * from CHANGED_VALUES");
    expect(dbchanged[0].update_type).toEqual("create");
    obj.destroy();

    var obj2 = model.find("first");
    // FIXME: should return []
    // expect(obj2).toEqual(undefined);
    if(useNewOrm)
      expect(obj2).toEqual(undefined);
    else
      expect(obj2).toEqual([]);

    dbchanged = dbUser.executeSql("select * from CHANGED_VALUES");
    expect(dbchanged).toEqual([]);
  });

  it('destroys fixedSchema item after CHANGED_VALUES deleted', function() {
    model2.create({name:"testfixed"});
    var obj = model2.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dbUser = Rho.ORMHelper.dbConnection("user");
    var dboutput = dbUser.executeSql("select * from ProductSync");
    expect(dboutput[0].name).toEqual("testfixed");

    var dbchanged = dbUser.executeSql("select * from CHANGED_VALUES");
    expect(dbchanged[0].update_type).toEqual("create");
    var cv = dbUser.executeSql("delete from CHANGED_VALUES");
    expect(cv).toEqual([]);

    obj = model2.find("first");
    obj.destroy();

    cv = dbUser.executeSql("select * from CHANGED_VALUES");
    expect(cv[0].update_type).toEqual("delete");
  });

   it('updates fixedSchema item after CHANGED_VALUES updated', function() {
    model2.create({name:"testfixed"});
    var obj = model2.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dbUser = Rho.ORMHelper.dbConnection("user");
    var dboutput = dbUser.executeSql("select * from ProductSync");
    expect(dboutput[0].name).toEqual("testfixed");

    var dbchanged = dbUser.executeSql("select * from CHANGED_VALUES");
    expect(dbchanged[0].update_type).toEqual("create");
    var cv = dbUser.executeSql("delete from CHANGED_VALUES");
    expect(cv).toEqual([]);

    obj = model2.find("first");
    obj.updateAttributes({name:"testfixed2"});

    cv = dbUser.executeSql("select * from CHANGED_VALUES");
    expect(cv[0].update_type).toEqual("update");
  });

  it("should make object fixedSchema",function(){
    var mobj= model.make({name:"testmake"});
    var obj = model.find("all");
    expect(obj).toEqual([]);
    expect(mobj.get("name")).toEqual("testmake");
  });

  it("should delete all fixedSchema",function(){
    model.create({name:"testfixed1"});
    model.create({name:"testfixed2"});
    model.create({name:"testfixed3",brand:4});
    model.create({name:"testfixed4",brand:2});
    var total = model.count();
    expect(total).toEqual(4);

    model.deleteAll();
    total = model.count();
    expect(total).toEqual(0);
  });

if (useNewOrm) {
  // The following specs n/a in Old ORM specs
  it("should delete all with conditions fixedSchema",function(){
     model.create({name:"testfixed1"});
     model.create({name:"testfixed2"});
     model.create({name:"testfixed3",brand:4});
     model.create({name:"testfixed4",brand:2});
     var total = model.count();
     expect(total).toEqual(4);

     model.deleteAll({name:"testfixed1"});
     total = model.count();
     expect(total).toEqual(3);
  });

  it("should order fixed_schema model by column desc asc",function() {
    model.create({"name":"Mobio"});
    model.create({"name":"Zoolo"});
    model.create({"name":"Foolo"});
    var res = model.find("all",{conditions:{},order:"name",orderdir:"DESC"});
    expect(res[0].get("name")).toEqual("Zoolo");
    expect(res[1].get("name")).toEqual("Mobio");
    expect(res[2].get("name")).toEqual("Foolo");

    res = model.find("all",{conditions:{},order:"name",orderdir:"ASC"});
    expect(res[2].get("name")).toEqual("Zoolo");
    expect(res[1].get("name")).toEqual("Mobio");
    expect(res[0].get("name")).toEqual("Foolo");
  });

  it("should order fixed_schema model by multiple column desc asc",function() {
    model.create({"name":"Zoolo","industry":"Tech"});
    model.create({"name":"Zoolo","industry":"Zoo"});
    model.create({"name":"Foolo","industry":"Business"});
    var res = model.find("all",{conditions:{},order:["name","industry"],orderdir:["DESC","ASC"]});
    expect(res[0].get("industry")).toEqual("Tech");
    expect(res[1].get("industry")).toEqual("Zoo");
    expect(res[2].get("industry")).toEqual("Business");

    res = model.find("all",{conditions:{},order:["name","industry"],orderdir:["ASC","DESC"]});
    expect(res[0].get("industry")).toEqual("Business");
    expect(res[1].get("industry")).toEqual("Zoo");
    expect(res[2].get("industry")).toEqual("Tech");
  });

  it("should order fixed_schema model by multiple column and default orderdir",function() {
    model.create({"name":"Zoolo","industry":"Tech"});
    model.create({"name":"Zoolo","industry":"Zoo"});
    model.create({"name":"Foolo","industry":"Business"});
    // 2nd order dir would be ASC by default
    var res = model.find("all",{conditions:{},order:["name","industry"],orderdir:["DESC"]});
    expect(res[0].get("industry")).toEqual("Tech");
    expect(res[1].get("industry")).toEqual("Zoo");
    expect(res[2].get("industry")).toEqual("Business");
  });
} // end of useNewOrm

if (useNewOrm) {
  // The following examples are n/a in Old ORM specs for fixed schema
  it("Call find with all and order by any column_name and orderdir as empty string",function() {
    model.create({"name":"Mobio"});
    model.create({"name":"Zoolo"});
    model.create({"name":"Foolo"});
    var res = model.find("all",{conditions:{},order:"name",orderdir:""});
    expect(res[2].get("name")).toEqual("Zoolo");
    expect(res[1].get("name")).toEqual("Mobio");
    expect(res[0].get("name")).toEqual("Foolo");
  });

  it("Call find with first and with order any column name of integer type. For e.g find('all',{conditions:{},order:'name'})",function() {

      model.create({"brand":656});
      model.create({"brand":2});
      model.create({"brand":65});
      var res = model.find("all",{conditions:{},order:"brand"});
      expect(res[0].get("brand")).toEqual('2');
      //expect(res.count()).toEqual(1);
  });

  it("Call find with first and order by any column_name and orderdir as empty string",function() {
      model.create({"name":"Mobio"});
      model.create({"name":"Zoolo"});
      model.create({"name":"Foolo"});
      var res = model.find("first",{conditions:{},order:"name",orderdir:""});

      //expect(res.count()).toEqual(1);
      expect(res.get("name")).toEqual("Foolo");
  });

  it("Should return model object(s) based on sql query", function() {
    model.create({"name":"Mobio"});
    model.create({"name":"Zoolo"});
    model.create({"name":"Foolo"});
    // Return array of objects ordered by name
    var res = model.findBySql("select * from Product order by name");

    expect(res[0]["name"]).toEqual("Foolo");
  });

  it ("Should support paginate with default options", function() {
    // default options: page = 0, per_page = 10
    for (var i = 0; i < 25; i++)
      model.create({name: ("Acme_" + i), industry: ("Tech_" + i)});

    var options = {};
    var found = model.paginate(options);
    expect(found.length).toEqual(10);
    expect(found[0].get("name")).toEqual('Acme_0');

    options['page'] = 0;
    found = model.paginate(options);
    expect(found.length).toEqual(10);
    expect(found[9].get("name")).toEqual('Acme_9');

    options['page'] = 2;
    found = model.paginate(options);
    expect(found.length).toEqual(5);
    expect(found[0].get("name")).toEqual('Acme_20');
    expect(found[4].get("name")).toEqual('Acme_24');

    options = {per_page:20};
    found = model.paginate(options);
    expect(found.length).toEqual(20);
    expect(found[0].get("name")).toEqual('Acme_0');
    expect(found[19].get("name")).toEqual('Acme_19');
  });

  it ("Should support paginate with options", function() {
    for (var i = 0; i < 25; i++)
      model.create({name: ("Acme_" + i), industry: ("Tech_" + i)});

    var options = {page:0, per_page:20};
    var found = model.paginate(options);
    expect(found.length).toEqual(20);
    expect(found[0].get("name")).toEqual('Acme_0');
    expect(found[19].get("name")).toEqual('Acme_19');

    options['page'] = 1;
    found = model.paginate(options);
    expect(found.length).toEqual(5);
    expect(found[0].get("name")).toEqual('Acme_20');
    expect(found[4].get("name")).toEqual('Acme_24');
  });

  it('Should do full update for fixed schema if model enable :full_update', function() {
    var FsProduct = function(model) {
      model.fixed_schema = true;
      model.setProperty('schema_version','1.0');

      model.setModelProperty("name","string", "");
      model.setModelProperty("brand","string", "");
      model.setModelProperty("price","string", "");
      model.setModelProperty("quantity","string", "");
      model.setModelProperty("sku","string", "");

      model.enable("sync");
      model.enable("full_update");
    };

    var model = Rho.ORM.addModel('FsProduct', FsProduct);
    var attrs = { "brand":"Samsung", "name":'Galaxy S4', "price": "$99.99", "quantity":"20" };
    var galaxy_phone = model.create(attrs);
    var db = Rho.ORMHelper.dbConnection("user");
    var res = db.executeSql("DELETE FROM CHANGED_VALUES");

    var gp = model.find(galaxy_phone.object)
    gp.updateAttributes({name: "Galaxy S5"});
    var rows = db.executeSql("select * from CHANGED_VALUES");
    // console.log(JSON.stringify(rows));
    /*
     [{"attrib":"brand","attrib_type":"","object":"3743762664","sent":"0","source_id":"1","update_type":"update","value":"Samsung"},
      {"attrib":"name","attrib_type":"","object":"3743762664","sent":"0","source_id":"1","update_type":"update","value":"Galaxy S5"},
      {"attrib":"price","attrib_type":"","object":"3743762664","sent":"0","source_id":"1","update_type":"update","value":"$99.99"},
      {"attrib":"quantity","attrib_type":"","object":"3743762664","sent":"0","source_id":"1","update_type":"update","value":"20"},
      {"attrib":"sku","attrib_type":"","object":"3743762664","sent":"0","source_id":"1","update_type":"update","value":""}]
    */
    expect(rows.length).toBeGreaterThan(1);

    for(var i in rows) {
      var row = rows[i];
      if(row.attrib == 'brand') {
        expect(row.value).toEqual(attrs.brand);
      } else if (row.attrib == 'name') {
        expect(row.value).toEqual("Galaxy S5");
      } else if (row.attrib == 'price') {
        expect(row.value).toEqual(attrs.price);
      } else if (row.attrib == 'quantity') {
        expect(row.value).toEqual(attrs.quantity);
      } else {
        expect(row.update_type).toEqual('update');
      }
    }
  });

} // end of useNewOrm

});

describe("Property Bag Models", function() {
  var db = null;
  var model;

  var reset = function() {
    db = Rho.ORMHelper.dbConnection("local");
    var partitions = Rho.ORMHelper.getDbPartitions();

    $.each(partitions, function(index, db2) {
      db2.executeSql("DELETE FROM SOURCES");
      db2.executeSql("DELETE FROM OBJECT_VALUES");
      db2.executeSql("DELETE FROM CHANGED_VALUES");
      if(db2.isTableExist("Product")){
        db2.executeSql("DROP TABLE Product");
      }
      if(db2.isTableExist("ProductFixed")){
        db2.executeSql("DROP TABLE ProductFixed");
      }
    });
    Rho.ORM.clear();

    if(useNewOrm) {
      var defaultDefModelP = function(model){
        model.setModelProperty("id","integer","");
        model.setModelProperty("name","string","");
        model.setModelProperty("type","string","");
        model.set("partition","local");
      };
      model = Rho.ORM.addModel('Product', defaultDefModelP);
    } else {
      var defaultDefModelP = function(model){
        model.modelName("Product");
        model.property("id");
        model.set("partition","local");
      };
      model = Rho.ORM.addModel(defaultDefModelP);
    };
  };

  beforeEach(function(){
    reset();
  });

  it('Call create passing a empty hash({})',function(){
    productModel = Rho.ORM.getModel('Product');
    var before = productModel.count();
    productModel.create({});
    var after = productModel.count();
    expect(after).toBe(before);
  });

  it('Call deleteAll with model Object passing undefined,undefined in arguments',function(){
    model.create({name:"testfixed1"});
    model.create({name:"testfixed2"});
    model.create({name:"testfixed3",brand:4});
    model.create({name:"testfixed4",brand:2});
    var total = model.count();
    expect(total).toEqual(4);

    model.deleteAll(undefined,undefined);
    total = model.count();
    expect(total).toEqual(0);
  });

  it('Call find without passing any argument to it',function(){
    for (var i=0;i<=100;i++){
        var nameValue = "testfixed"+i;
        model.create({name: nameValue});
    }
    var obj = model.find();
    expect(obj.length).toEqual(101);
  });

  it('finds all objects with one condition for e.g model.find("all", {conditions: {"key": "value2"}})',function(){
    itemTypes = ['Electronics','Softwares','Cameras','Books'];
    for (var i=0;i<=50;i++){
        var nameValue = "Item "+i;
        var itemType = itemTypes[Math.floor(Math.random()*itemTypes.length)];
        model.create({id: i, name: nameValue, type: itemType});
    }
    var obj = model.find('all',{conditions: {type: 'Cameras'}});

    expect(obj[0].get("type")).toEqual("Cameras");
  });

  it("finds all objects with conditions for e.g model.find('all', {conditions: {'key1': 'value2', 'key2': 'value3'}}) ",function(){
    itemTypes = ['Electronics','Softwares','Cameras','Books']
    for (var i=0;i<=100;i++){
        var nameValue = "Item "+i;
        var itemType = itemTypes[Math.floor(Math.random()*itemTypes.length)];
        model.create({id: i, name: nameValue, type: itemType});
    }
    var obj = model.find('all',{conditions: {type: 'Cameras',type: 'Softwares'}});

    expect(obj.length).toBeLessThan(101);
    expect(obj.length).toBeGreaterThan(0);
  });

  it("Call find with all and select two columns",function() {
    model.deleteAll();
    expect(model.count()).toEqual(0);

    model.create({"industry":"Technology","name":"Moto","Address":"USA"});
    model.create({"industry":"Technology","name":"Aeroprise","Address":"Bangalore"});
    model.create({"industry":"Accounting","name":"PWC","Address":"Russia"});
    expect(model.count()).toEqual(3);
    var res = model.find("all",
                {
                  conditions: {"industry":"Technology"},
                  select: ['name','Address']
                });
    expect(res[0].get("name")).toEqual("Moto");
    expect(res[0].get("Address")).toEqual("USA");
    expect(res[0].get("industry")).toBeUndefined();
    expect(res[1].get("name")).toEqual("Aeroprise");
    expect(res[1].get("Address")).toEqual("Bangalore");
    expect(res[1].get("industry")).toBeUndefined();
  });

  it("Call find with all and select empty Array",function() {
      model.deleteAll();
      var res;
      expect(model.count()).toEqual(0);

      model.create({"industry":"Technology","name":"Moto","Address":"USA"});
      model.create({"industry":"Technology","name":"Aeroprise","Address":"Bangalore"});
      model.create({"industry":"Accounting","name":"PWC","Address":"Russia"});
      expect(model.count()).toEqual(3);
      res = model.find("all",
                  {
                    conditions: [],
                    select: []
                  });

      if(useNewOrm) {
        expect(res[0].get("name")).toEqual("Moto");
        expect(res[0].get("Address")).toEqual("USA");
        expect(res[0].get("industry")).toEqual("Technology");

        expect(res[1].get("name")).toEqual("Aeroprise");
        expect(res[1].get("Address")).toEqual("Bangalore");
        expect(res[1].get("industry")).toEqual("Technology");

        expect(res[2].get("name")).toEqual("PWC");
        expect(res[2].get("Address")).toEqual("Russia");
        expect(res[2].get("industry")).toEqual("Accounting");
      } else {
        // this is a bug in OLD ORM : empty select means all attribs, not no attribs
        expect(res).toEqual([]);
      };
  });

  it('finds first objects with one condition for e.g model.find("first", {conditions: {"key": "value2"}})',function(){
    itemTypes = ['Electronics','Softwares','Cameras','Books']
    for (var i=0;i<=100;i++){
        var nameValue = "Item "+i;
        var itemType = itemTypes[Math.floor(Math.random()*itemTypes.length)];
        model.create({id: i, name: nameValue, type: itemType});
    }
    var obj = model.find('first',{conditions: {type: 'Cameras'}});

    expect(obj.get("type")).toEqual("Cameras");
  });

  it("finds first objects with conditions for e.g model.find('all', {conditions: {'key1': 'value2', 'key2': 'value3'}}) ",function(){
    itemTypes = ['Electronics','Softwares','Cameras','Books']
    for (var i=0;i<=100;i++){
        var nameValue = "Item "+i;
        var itemType = itemTypes[Math.floor(Math.random()*itemTypes.length)];
        model.create({id: i, name: nameValue, type: itemType});
    }
    var obj = model.find('first',{conditions: {id: '1',name: 'Item 1'}});

    expect(obj.get("id")).toEqual("1");
    expect(obj.get("name")).toEqual("Item 1");
  });

  it("Call find with first and select two columns",function() {
    model.deleteAll();
    var res;
    expect(model.count()).toEqual(0);

    model.create({"industry":"Technology","name":"Moto","Address":"USA"});
    model.create({"industry":"Technology","name":"Aeroprise","Address":"Bangalore"});
    model.create({"industry":"Accounting","name":"PWC","Address":"Russia"});
    expect(model.count()).toEqual(3);
    res = model.find("first",
                {
                  conditions: {"industry":"Technology"},
                  select: ['name','Address']
                });

    //expect(res.count()).toEqual(1);
    expect(res.get("name")).toEqual("Moto");
    expect(res.get("Address")).toEqual("USA");
    expect(res.get("industry")).toBeUndefined();
  });

  // FIXME: Not Supported (conditions)
  xit("Call find with all , conditions empty hash and select empty String",function() {
      model.deleteAll();
      var res;
      expect(model.count()).toEqual(0);

      model.create({"industry":"Technology","name":"Moto","Address":"USA"});
      model.create({"industry":"Technology","name":"Aeroprise","Address":"Bangalore"});
      model.create({"industry":"Accounting","name":"PWC","Address":"Russia"});
      expect(model.count()).toEqual(3);
      res = model.find("all",
                  {
                    conditions: {},
                    select: []
                  });
      expect(res.count()).toEqual(3);
  });

  // FIXME: Not Supported (conditions)
  xit("Call find with first and select with empty",function() {
    model.deleteAll();
    var res;
    model.create({"industry":"Technology","name":"Moto","Address":"USA"});
    model.create({"industry":"Technology","name":"Aeroprise","Address":"Bangalore"});
    model.create({"industry":"Accounting","name":"PWC","Address":"Russia"});
    //expect(model.count()).toEqual(3);
    res = model.find("first",
                {
                  conditions: {"industry":"Technology"},
                  select: []
                });
    expect(res).toEqual([]);
  });

  // FIXME: Not Supported (conditions)
  xit("Call find with first and other parameter as empty",function() {
    model.deleteAll();
    var res;
    expect(model.count()).toEqual(0);

    model.create({"industry":"Technology","name":"Moto","Address":"USA"});
    model.create({"industry":"Technology","name":"Aeroprise","Address":"Bangalore"});
    model.create({"industry":"Accounting","name":"PWC","Address":"Russia"});
    expect(model.count()).toEqual(3);
    res = model.find("first",
                {
                  conditions: {},
                  select: []
                });
    expect(res.get("name")).toEqual("Moto");
  });

  it('should find count ',function(){
    itemTypes = ['Electronics','Softwares','Cameras','Books']
    for (var i=0;i<=100;i++){
      var nameValue = "Item "+i;
      var itemType = itemTypes[Math.floor(Math.random()*itemTypes.length)];
      model.create({id: i, name: nameValue, type: itemType});
    }
    var obj = model.find('count');
    expect(obj).toEqual(101);
  });

  it('should find count objects with one condition for e.g model.find("count", {conditions: {"key": "value2"}})',function(){
    itemTypes = ['Electronics','Softwares']
    for (var i=0;i<=100;i++){
        var nameValue = "Item "+i;
        var itemType = itemTypes[Math.floor(Math.random()*itemTypes.length)];
        model.create({id: i, name: nameValue, type: itemType});
    }
    var obj = model.find('count',{conditions: {"id":"1"}});
    expect(obj).toEqual(1);
  });

  it("Call updateAttributes without passing any arguments",function(){
    var record = model.create({"name":"Zoolo","industry":"Tech"});
    record.updateAttributes();
    var res = model.find("first",{conditions:{"name":"Zoolo"}});
    expect(res.get("name")).toEqual("Zoolo");
  });

  it("Call updateAttributes by passing empty array",function(){
    var record = model.create({});
    record.updateAttributes();
    var res = model.find("first",{conditions:{"name":"Zoolo"}});
    if(useNewOrm) {
      expect(res).toEqual(undefined);
    } else {
      expect(res).toEqual([]);
    };
  });

if (useNewOrm) {
  // The following examples are n/a in Old ORM specs for property bag
  it('Should do full update for property bag if model enable :full_update', function() {
    var PBProduct = function(model) {
      model.setModelProperty("name","string", "");
      model.setModelProperty("brand","string", "");
      model.setModelProperty("price","string", "");
      model.setModelProperty("quantity","string", "");
      model.setModelProperty("sku","string", "");

      model.enable("sync");
      model.enable("full_update");
    };

    var model = Rho.ORM.addModel('PBProduct', PBProduct);
    var attrs = { "brand":"Samsung", "name":'Galaxy S4', "price": "$99.99", "quantity":"20" };
    var galaxy_phone = model.create(attrs);
    var db = Rho.ORMHelper.dbConnection("user");
    var res = db.executeSql("DELETE FROM CHANGED_VALUES");

    var gp = model.find(galaxy_phone.object)
    gp.updateAttributes({name: "Galaxy S5"});
    var rows = db.executeSql("select * from CHANGED_VALUES");

    expect(rows.length).toBeGreaterThan(1);
    for(var i in rows) {
      var row = rows[i];
      if(row.attrib == 'brand') {
        expect(row.value).toEqual(attrs.brand);
      } else if (row.attrib == 'name') {
        expect(row.value).toEqual("Galaxy S5");
      } else if (row.attrib == 'price') {
        expect(row.value).toEqual(attrs.price);
      } else if (row.attrib == 'quantity') {
        expect(row.value).toEqual(attrs.quantity);
      } else {
        expect(row.update_type).toEqual('update');
      }
    }
  });
}

});