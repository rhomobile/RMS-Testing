  var Model;
  var object;
  var db = null;
  function reset(){
    db = Rho.ORMHelper.dbConnection("local");
    Rho.ORM.clear();
    var partitions = Rho.ORMHelper.getDbPartitions();
    $.each(partitions, function(index, db2) {
      db2.$execute_sql("DELETE FROM SOURCES");
      db2.$execute_sql("DELETE FROM OBJECT_VALUES");
      db2.$execute_sql("DELETE FROM CHANGED_VALUES");
    });
  }

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

  describe("<model's object>", function() {
    var modelDef = function(model){
        model.modelName('Product'),
        model.property("key");
        model.set("partition","local");
    };
    var modelDef2 = function(model){
        model.modelName("Item");
        model.property("key","string");
        model.set("partition","local");
    };

    beforeEach(function(){
      reset();
      Model = Rho.ORM.addModel(modelDef);
      Model.deleteAll();
      object = Model.make({'key': 'value'});
    });


    it('returns vars', function() {
        expect(cleanVars(object)).toEqual({'key': 'value'});
    });

    it('retrieves object id', function() {
        expect(object.object()).toBe(object.get('object'));
    });

    it('gets existing property', function() {
        expect(object.get('key')).toBe('value');
    });

    it('gets absent property', function() {
        expect(object.get('absent key')).toBeUndefined();
    });

    it('sets property', function() {
        object.set('key', 'another value');
        expect(cleanVars(object)).toEqual({'key': 'another value'});
    });

    it('sets new property', function() {
        object.set('new key', 'new value');
        expect(cleanVars(object)).toEqual({'key': 'value', 'new key': 'new value'});
    });

    it('supports set chaining', function() {
        object.set('key', 'another value').set('new key', 'new value');
        expect(cleanVars(object)).toEqual({'key': 'another value', 'new key': 'new value'});
    });

    it('sets property', function() {
        object.set('key', 'another value');
        expect(cleanVars(object)).toEqual({'key': 'another value'});
    });

    it('sets property with empty name', function() {
        object.set('', 'another value');
        expect(cleanVars(object)).toEqual({'key': 'value', '': 'another value'});
    });

    it('has properties', function() {
        expect(object.has('key')).toBe(true);
        expect(object.has('absent key')).toBe(false);
    });

    it('VT302-0200 | creates object in database', function() {
        var modelDef = function(model){
            model.modelName('Product'),
            model.property("key");
        };
        //var Model = Rho.ORM.addModel(modelDef);
        var before = Model.count();
        Model.create({'key': 'value'});
        var after = Model.count();
        expect(after).toBe(before + 1);
    });

    it('VT302-0234 | saves object to database', function() {
        var modelDef = function(model){
            model.modelName('Product'),
            model.property("key");
        };
        //var Model = Rho.ORM.addModel(modelDef);
        Model.deleteAll({});

        var object = Model.create({'key': 'value'});

        expect(Model.find(object.object()).vars()).toEqual(object.vars());
        object.set('key', 'another value').set('new key', 'new value');
        expect(Model.find(object.object()).vars()).not.toEqual(object.vars());
        object.save();
        expect(Model.find(object.object()).vars()).toEqual(object.vars());
    });

    it('VT302-0254 | updates object attributes in database', function() {
        //var Model = Rho.ORM.addModel(modelDef);
        Model.deleteAll();

        var object = Model.create({'key': 'value', 'original key': 'original value'});

        expect(Model.find(object.object()).vars()).toEqual(object.vars());
        object.updateAttributes({'key': 'another value', 'new key': 'new value'});
        expect(Model.find(object.object()).vars()).toEqual(object.vars());
        expect(cleanVars(object)).toEqual({'key': 'another value', 'new key': 'new value', 'original key': 'original value'});
    });

    it('VT302-0210 | destroys object in database', function() {
        //var Model = Rho.ORM.addModel(modelDef);

        Model.deleteAll();

        var object1 = Model.create({'key1': 'value1'});
        var object2 = Model.create({'key2': 'value2'});

        expect(Model.count()).toBe(2);

        object1.destroy();

        var found = Model.find('all');
        expect(found.length).toBe(1);
        expect(found[0].vars()).toEqual(object2.vars());
    });

    it('VT302-0201 | does not create empty object in database', function() {
        //var Model = Rho.ORM.addModel(modelDef);
        var before = Model.count();
        Model.create();
        expect(Model.count()).toBe(before);
    });

    it('VT302-0256 | does not create object with the only empty property in database', function() {
        //var Model = Rho.ORM.addModel(modelDef);
        var before = Model.count();
        Model.create({'': 'value'});
        expect(Model.count()).toBe(before);
    });

    it('VT302-0204 | deletes all objects in database', function() {
        //var Model = Rho.ORM.addModel(modelDef);
        Model.create({'key': 'value'});
        expect(Model.count()).toBeGreaterThan(0);
        Model.deleteAll();
        expect(Model.count()).toBe(0);
    });
//Bhakta: Changed the Description Because destroy method works on single activerecord object.
    it('VT302-0211 | delete object in sync database', function() {
      var modelDefs3 = function(model){
        model.modelName("Item");
        model.property("name","string");
        model.set("partition","local");
        model.enable("sync");
      };
      var Modelsync = Rho.ORM.addModel(modelDefs3);
      Modelsync.create({'name': 'tests'});
      var cv = db.$execute_sql("select * from CHANGED_VALUES");
      expect(cv[0].map.update_type).toEqual("create");

      cv=db.$execute_sql("delete from CHANGED_VALUES");
      expect(cv).toEqual([]);

      var obj = Modelsync.find("first");
      obj.destroy();
      cv = db.$execute_sql("select * from CHANGED_VALUES");
      expect(cv[0].map.update_type).toEqual("delete");
    });

    it('VT302-0211 | update object in sync database', function() {
      var modelDefs3 = function(model){
        model.modelName("Item");
        model.property("name","string");
        model.set("partition","local");
        model.enable("sync");
      };
      var Modelsync = Rho.ORM.addModel(modelDefs3);
      Modelsync.create({'name': 'tests'});
      var cv = db.$execute_sql("select * from CHANGED_VALUES");
      expect(cv[0].map.update_type).toEqual("create");

      cv=db.$execute_sql("delete from CHANGED_VALUES");
      expect(cv).toEqual([]);

      var obj = Modelsync.find("first");
      obj.updateAttributes({name:"tests2"});
      cv = db.$execute_sql("select * from CHANGED_VALUES");
      expect(cv[0].map.update_type).toEqual("update");
    });

    it('VT302-0257 | deletes all objects of specific model in database', function() {
        var Model1 = Rho.ORM.addModel(modelDef);
        var Model2 = Rho.ORM.addModel(modelDef2);

        Model1.create({'key': 'value'});
        Model2.create({'key': 'value'});

        expect(Model1.count()).toBeGreaterThan(0);
        expect(Model2.count()).toBeGreaterThan(0);

        var before1 = Model1.count();
        Model2.deleteAll();
        var after1 = Model1.count();

        expect(after1).toBe(before1);
        expect(Model2.count()).toBe(0);
    });

    it('VT302-0217 | reads object from database', function() {
        //var Model = Rho.ORM.addModel(modelDef);
        Model.deleteAll();
        Model.create({'key': 'value'});
        var found = Model.find('all');
        expect(found.length).toBe(1);
        expect(cleanVars(found[0])).toEqual({'key': 'value'});
    });


    it('compares 2 objects props', function() {
        //var Model = Rho.ORM.addModel(modelDef);
        var m1 = Model.create({'key': 'value'});
        var m2 = Model.create({'key': 'value'});
        res = (m1.get('key') == m2.get('key'));
        expect(res).toBe(true);
    });

    it('VT302-0258 | does not write empty property to database', function() {
        //var Model = Rho.ORM.addModel(modelDef);
        Model.deleteAll();
        Model.create({'key': 'value', '': 'empty'});
        var found = Model.find('all');
        expect(found.length).toBe(1);
        expect(cleanVars(found[0])).toEqual({'key': 'value'});
    });

    it('counts objects in database', function() {
        var Model1 = Rho.ORM.addModel(modelDef);
        var Model2 = Rho.ORM.addModel(modelDef2);

        var before1 = Model1.count();

        Model1.create({'key': 'value'});
        Model1.create({'key': 'value'});
        Model2.create({'key': 'value'});

        var after1 = Model1.count();

        expect(after1).toBe(before1 + 2);
    });

    it('VT302-0259 | counts objects in database using find', function() {
        var Model1 = Rho.ORM.addModel(modelDef);
        var Model2 = Rho.ORM.addModel(modelDef2);

        var before1 = Model1.find('count');

        Model1.create({'key': 'value'});
        Model1.create({'key': 'value'});
        Model2.create({'key': 'value'});

        var after1 = Model1.find('count');

        expect(after1).toBe(before1 + 2);
    });

    it('VT302-0260 | counts objects in database using find with condition', function() {
        var Model1 = Rho.ORM.addModel(modelDef);
        var Model2 = Rho.ORM.addModel(modelDef2);

        var before1 = Model1.find('count', {conditions: {'key': 'value to find'}});

        Model1.create({'key': 'value'});
        Model1.create({'key': 'value to find'});
        Model1.create({'key': 'value to find'});
        Model1.create({'another key': 'value to find'});
        Model2.create({'key': 'value to find'});

        var after1 = Model1.find('count', {conditions: {'key': 'value to find'}});

        expect(after1).toBe(before1 + 2);
    });


    it('VT302-0261 | finds all objects in database', function() {
        var Model1 = Rho.ORM.addModel(modelDef);
        var Model2 = Rho.ORM.addModel(modelDef2);

        Model1.deleteAll();

        Model1.create({'key1': 'value1'});
        Model2.create({'key2': 'value2'});
        Model1.create({'key3': 'value3'});

        var found = Model1.find('all');

        expect(found.length).toBe(2);
        var i = (found[0].has('key1')) ? 0 : 1;
        expect(cleanVars(found[i    ])).toEqual({'key1': 'value1'});
        expect(cleanVars(found[1 - i])).toEqual({'key3': 'value3'});
    });

    it('VT302-0218 | finds all objects with one condition', function() {
        //var Model = Rho.ORM.addModel(modelDef);

        Model.deleteAll();

        Model.create({'key': 'value1'});
        var objects = [Model.create({'key': 'value2'}), Model.create({'key': 'value2'})];

        var found = Model.find('all', {conditions: {'key': 'value2'}});

        expect(found.length).toBe(2);
        var i = (found[0].object() === objects[0].object()) ? 0 : 1;
        expect(found[i    ].vars()).toEqual(objects[0].vars());
        expect(found[1 - i].vars()).toEqual(objects[1].vars());
    });

    it('VT302-0262 | finds all objects with conditions', function() {
        //var Model = Rho.ORM.addModel(modelDef);

        Model.deleteAll();

        Model.create({'key1': 'value2'});
        Model.create({'key2': 'value3'});
        var objects = [
            Model.create({'key1': 'value2', 'key2': 'value3'}),
            Model.create({'key1': 'value2', 'key2': 'value3'})
        ];
        Model.create({'key1': 'value2', 'key2': 'value2'});
        Model.create({'key1': 'value3', 'key2': 'value3'});

        var found = Model.find('all', {conditions: {'key1': 'value2', 'key2': 'value3'}});

        expect(found.length).toBe(2);
        var i = (found[0].object() === objects[0].object()) ? 0 : 1;
        expect(found[i    ].vars()).toEqual(objects[0].vars());
        expect(found[1 - i].vars()).toEqual(objects[1].vars());
    });

    it('finds specific object', function() {
        var original = Model.create({'key1': 'value1'});
        Model.create({'key2': 'value2'});
        expect(Model.find(original.object()).vars()).toEqual(original.vars());
    });

    it('VT302-0227 | should finds first object in database', function() {
        Model.deleteAll();
        var originals = [Model.create({'key1': 'value1'}), Model.create({'key3': 'value3'})];
        var found = Model.find('first');
        expect(found.vars()).toEqual(originals[(found.has('key1')) ? 0 : 1].vars());
    });

// Bhakta: This way of calling find is not mentioned in Docs.
  it("should find with conditions",function() {
    Model.deleteAll();
    var res;
    expect(Model.count()).toEqual(0);

    Model.create({"industry":"Technology","name":"Moto"});
    Model.create({"industry":"Technology","name":"Aeroprise"});
    Model.create({"industry":"Accounting","name":"PWC"});
    expect(Model.count()).toEqual(3);
    res = Model.find("all",
                {
                  conditions: {"industry":"Technology"},
                  order:'name',
                  orderdir:"desc"
                });
    expect(res.length).toEqual(2);
    expect(res[0].get("name")).toEqual("Moto");
    expect(res[0].get("industry")).toEqual("Technology");
    expect(res[1].get("name")).toEqual("Aeroprise");
    expect(res[1].get("industry")).toEqual("Technology");
  });
// Bhakta: This way of calling find is not mentioned in Docs.
  it("should find with select",function() {
    Model.deleteAll();
    var res;
    expect(Model.count()).toEqual(0);

    Model.create({"industry":"Technology","name":"Moto"});
    Model.create({"industry":"Technology","name":"Aeroprise"});
    Model.create({"industry":"Accounting","name":"PWC"});
    expect(Model.count()).toEqual(3);
    res = Model.find("all",
                {
                  conditions: {"industry":"Technology"},
                  select: ['name']
                });
    expect(res[0].get("name")).toEqual("Moto");
    expect(res[0].get("industry")).toBeUndefined();
    expect(res[1].get("name")).toEqual("Aeroprise");
    expect(res[1].get("industry")).toBeUndefined();
  });

  // it("should find with advanced OR conditions",function() {
  //   Model.deleteAll();
  //   var res;
  //   expect(Model.count()).toEqual(0);

  //   Model.create({"industry":"Technology","name":"Moto"});
  //   Model.create({"industry":"Technology","name":"Aeroprise"});
  //   Model.create({"industry":"Accounting","name":"PWC"});


  //   var query = '%IND%';
  //   // res = Model.find( "all",
  //   //   {
       
  //   //   });

  //   // conditions : {func:'UPPER', name:'name', op:'LIKE'}: query,
  //   //     {func:'UPPER', name:'industry', op:'LIKE'}: query,
  //   //     op: 'OR', select:['name','industry']
  //   // @accts.length.should == 1
  //   // @accts[0].name.should == "Mobio India"
  //   // @accts[0].industry.should == "Technology"
  // });

 // it("should find with advanced OR conditions with order",function() {
 //    query = '%IND%'
 //    @accts = getAccount.find( :all,
 //       :conditions => {
 //        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
 //        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query},
 //        :op => 'OR', :select => ['name','industry'],
 //        :order=>'name', :orderdir=>'DESC' )

 //    @accts.length.should == 1
 //    @accts[0].name.should == "Mobio India"
 //    @accts[0].industry.should == "Technology"
 // });

 // it("should NOT find with advanced OR conditions",function() {
 //    query = '%IND33%'
 //    @accts = getAccount.find( :all,
 //       :conditions => {
 //        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
 //        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query},
 //        :op => 'OR', :select => ['name','industry'])

 //    @accts.length.should == 0
 // });

 // it("should find with advanced AND conditions",function() {
 //    query = '%IND%'
 //    query2 = '%chnolo%' #LIKE is case insensitive by default
 //    @accts = getAccount.find( :all,
 //       :conditions => {
 //        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
 //        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query2
 //       },
 //       :op => 'AND',
 //       :select => ['name','industry'])

 //    @accts.length.should == 1
 //    @accts[0].name.should == "Mobio India"
 //    @accts[0].industry.should == "Technology"
 // });

 // it("should find with advanced AND conditions with order",function() {
 //    query = '%IND%'
 //    query2 = '%chnolo%' #LIKE is case insensitive by default
 //    @accts = getAccount.find( :all,
 //       :conditions => {
 //        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
 //        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query2
 //       },
 //       :op => 'AND',
 //       :select => ['name','industry'],
 //       :order=>'name', :orderdir=>'DESC')

 //    @accts.length.should == 1
 //    @accts[0].name.should == "Mobio India"
 //    @accts[0].industry.should == "Technology"
 // });

 // it("should NOT find with advanced AND conditions",function() {
 //    query = '%IND123%'
 //    query2 = '%chnolo%'     #LIKE is case insensitive by default
 //    @accts = getAccount.find( :all,
 //       :conditions => {
 //        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
 //        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query2},
 //        :op => 'AND', :select => ['name','industry'])

 //    @accts.length.should == 0
 // });

 // it("should count with advanced AND conditions",function() {
 //    query = '%IND%'
 //    query2 = '%chnolo%'     #LIKE is case insensitive by default
 //    nCount = getAccount.find( :count,
 //       :conditions => {
 //        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
 //        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query2},
 //        :op => 'AND' )

 //    nCount.should == 1
 // });

 // it("should count 0 with advanced AND conditions",function() {
 //    query = '%IND123%'
 //    query2 = '%chnolo%'     #LIKE is case insensitive by default
 //    nCount = getAccount.find( :count,
 //       :conditions => {
 //        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
 //        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query2},
 //        :op => 'AND')

 //    nCount.should == 0
 // });

 // it("should find with advanced AND conditions and non-string value",function() {
 //    res = getAccount.find( :all,
 //       :conditions => {
 //        {:func=>'length', :name=>'name', :op=>'>'} => 0
 //       },
 //       :op => 'AND')

 //    res.should_not be_nil
 //    res.length.should  == 2
 // });

 // it("should search with LIKE",function() {
 //    query2 = '%CHNolo%'     #LIKE is case insensitive by default
 //    nCount = getAccount.find( :count,
 //       :conditions => {
 //        {:name=>'industry', :op=>'LIKE'} => query2}
 //    )

 //    nCount.should_not == 0
 // });

 // it("should search with 3 LIKE",function() {
 //    getAccount.create({:SurveyID=>"Survey1", :CallID => 'Call1', :SurveyResultID => 'SurveyResult1'})
 //    getAccount.create({:SurveyID=>"Survey2", :CallID => 'Call2', :SurveyResultID => 'SurveyResult2'})
 //    getAccount.create({:SurveyID=>"Survey3", :CallID => 'Call3', :SurveyResultID => 'SurveyResult3'})

 //    shift_callreport = true
 //    prevresult = getAccount.find(:first, :conditions =>
 //            {{:func => 'LOWER', :name => 'SurveyID', :op => 'LIKE'} => 'survey%',
 //            {:func => 'LOWER', :name => 'CallID', :op => 'LIKE'} => 'call%',
 //            {:func => 'LOWER', :name => 'SurveyResultID', :op => 'LIKE'} => 'surveyresult%'},
 //            :op => 'AND') if shift_callreport

 //    prevresult.should_not be_nil
 // });

 // it("should search with IN array",function() {
 //    items = getAccount.find( :all,
 //       :conditions => {
 //        {:name=>'industry', :op=>'IN'} => ["Technology", "Technology2"] }
 //    )

 //    items.length.should == 2

 //    items = getAccount.find( :all,
 //       :conditions => {
 //        {:name=>'industry', :op=>'IN'} => ["Technology2"] }
 //    )

 //    items.length.should == 0

 // });

 // it("should search with IN string",function() {
 //    items = getAccount.find( :all,
 //       :conditions => {
 //        {:name=>'industry', :op=>'IN'} => "\"Technology\", \"Technology2\"" }
 //    )

 //    items.length.should == 2

 //    items = getAccount.find( :all,
 //       :conditions => {
 //        {:name=>'industry', :op=>'IN'} => "\"Technology2\"" }
 //    )

 //    items.length.should == 0

 // });

 // it("should search with NOT IN array",function() {
 //    items = getAccount.find( :all,
 //       :conditions => {
 //        {:name=>'industry', :op=>'NOT IN'} => ["Technology1", "Technology2"] }
 //    )

 //    items.length.should == 2

 //    items = getAccount.find( :all,
 //       :conditions => {
 //        {:name=>'industry', :op=>'NOT IN'} => ["Technology"] }
 //    )

 //    items.length.should == 0

 // });

 // it("should search with NOT IN string",function() {
 //    items = getAccount.find( :all,
 //       :conditions => {
 //        {:name=>'industry', :op=>'NOT IN'} => "\"Technology1\", \"Technology2\"" }
 //    )

 //    items.length.should == 2

 //    items = getAccount.find( :all,
 //       :conditions => {
 //        {:name=>'industry', :op=>'NOT IN'} => "\"Technology\"" }
 //    )

 //    items.length.should == 0

 // });

  //it "should find with group of advanced conditions",function() {
    // query = '%IND%'
    // cond1 = {
    //    :conditions => {
    //         {:name=>'name', :op=>'LIKE'} => query,
    //         {:name=>'industry', :op=>'LIKE'} => query},
    //    :op => 'OR'
    // }
    // cond2 = {
    //     :conditions => {
    //         {:name=>'description', :op=>'LIKE'} => 'Hello%'}
    // }

    // @accts = getAccount.find( :all,
    //    :conditions => [cond1, cond2],
    //    :op => 'AND',
    //    :select => ['name','industry','description'])

    // @accts.length.should == 1
    // @accts[0].name.should == "Mobio India"
    // @accts[0].industry.should == "Technology"
 // });

 // it "should not find with group of advanced conditions",function() {
    // query = '%IND%'
    // cond1 = {
    //    :conditions => {
    //         {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
    //         {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query},
    //    :op => 'OR'
    // }
    // cond2 = {
    //     :conditions => {
    //         {:name=>'description', :op=>'LIKE'} => 'Hellogg%'}
    // }

    // @accts = getAccount.find( :all,
    //    :conditions => [cond1, cond2],
    //    :op => 'AND',
    //    :select => ['name','industry'])

    // @accts.length.should == 0
//  });

  it("VT302-0263 | should find first",function() {
    Model.create({"name":"Mobio"});
    Model.create({"name":"Mobio2"});
    var res = Model.find("first");
    expect(res.get("name")).toEqual("Mobio");
  });

  it("should order by column desc asc",function() {
    Model.create({"name":"Mobio"});
    Model.create({"name":"Zoolo"});
    Model.create({"name":"Foolo"});
    var res = Model.find("all",{conditions:{},order:"name",orderdir:"DESC"});
    expect(res[0].get("name")).toEqual("Zoolo");
    expect(res[1].get("name")).toEqual("Mobio");
    expect(res[2].get("name")).toEqual("Foolo");

    res = Model.find("all",{conditions:{},order:"name",orderdir:"ASC"});
    expect(res[2].get("name")).toEqual("Zoolo");
    expect(res[1].get("name")).toEqual("Mobio");
    expect(res[0].get("name")).toEqual("Foolo");
  });

  it("should order by multiple column desc asc",function() {
    Model.create({"name":"Zoolo","industry":"Tech"});
    Model.create({"name":"Zoolo","industry":"Zoo"});
    Model.create({"name":"Foolo","industry":"Business"});
    var res = Model.find("all",{conditions:{},order:["name","industry"],orderdir:["DESC","ASC"]});
    expect(res[0].get("industry")).toEqual("Tech");
    expect(res[1].get("industry")).toEqual("Zoo");
    expect(res[2].get("industry")).toEqual("Business");

    res = Model.find("all",{conditions:{},order:["name","industry"],orderdir:["ASC","DESC"]});
    expect(res[0].get("industry")).toEqual("Business");
    expect(res[1].get("industry")).toEqual("Zoo");
    expect(res[2].get("industry")).toEqual("Tech");
  });



  it("VT302-0252 | should update record",function(){
    var record = Model.create({"name":"Zoolo","industry":"Tech"});
    record.updateAttributes({"name":"Zoolo2"});
    var res = Model.find("first",{conditions:{"name":"Zoolo2"}});
    expect(res.get("name")).toEqual("Zoolo2");
  });

  it("should create record ",function(){
    var record = Model.create({"name":"Zoolo","industry":"Tech"});
    var res = Model.find("first",{conditions:{"name":"Zoolo"}});
    expect(res.get("name")).toEqual("Zoolo");
  });

  it("VT302-0212 | should delete record",function(){
    Model.deleteAll();
    var record = Model.create({"name":"Zoolo","industry":"Tech"});
    var res = Model.find("first",{conditions:{"name":"Zoolo"}});
    expect(res.get("name")).toEqual("Zoolo");

    record.destroy();
    res = Model.count();
    expect(res).toEqual(0);
  });

  it("VT302-0232 | should make record",function(){
    var record = Model.make({"name":"Zoolo","industry":"Tech"});
    var res = Model.count();
    record.save();
    res = Model.count();
    expect(res).toEqual(1);
  });

});

describe("<model's fixed_schema>", function() {
  var Model2;
  var modelDef = function(model){
      model.modelName('Product'),
      model.enable("fixedSchema");
      model.property("name");
      model.property("brand","integer");
      model.set("partition","local");
  };
  var modelDef2 = function(model){
      model.modelName("ProductSync");
      model.enable("fixedSchema");
      model.enable("sync");
      model.property("name","string");
      model.set("partition","local");
  };
  beforeEach(function(){
    reset();
    if(db.$is_table_exist('Product'))
      db.$execute_sql("DROP TABLE Product");
    if(db.$is_table_exist('ProductSync'))
      db.$execute_sql("DROP TABLE ProductSync");
    Model = Rho.ORM.addModel(modelDef);
    Model.deleteAll();
    Model2 = Rho.ORM.addModel(modelDef2);
    Model2.deleteAll();
  });

  it("VT302-0263 | should verify created fixed schema modal",function(){
    Model.create({name:"testfixed"});
    var obj = Model.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dblocal = Rho.ORMHelper.dbConnection("local");
    var dboutput = dblocal.$execute_sql("select * from Product");
    expect(dboutput[0].map.name).toEqual("testfixed");
  });

  it("VT302-0264 | should create sync model in db",function(){
    Model2.create({"name":"testname"});
    var res = db.$execute_sql("select * from CHANGED_VALUES");
    expect(res[0].map.update_type).toEqual("create");
  });

  it("should support blob type",function(){
      var blobber = function(model){
        model.modelName("Blob");
        model.enable("fixedSchema");
        model.enable("sync");
        model.property("name");
        model.set("partition","local");
        model.property("image","blob");
      };
      var BlobbModel = Rho.ORM.addModel(blobber);
      BlobbModel.create({name:"testblob",image:"randomdatahere"});
      var obj = BlobbModel.find("first");
      expect(obj.get("name")).toEqual('testblob');
      db.$execute_sql("DROP TABLE Blob");
  });

  it("should return orderFunction",function(){
    Model.create({"name":"test1"});
    Model.create({"name":"test2"});
    Model.create({"name":"test3"});
    var resp = Model.find('all',
                {
                  orderFunction: function (item1, item2) { return item1.name <= item2.name;}
                });
  });

  it("VT302-0253 | should update fixedSchema",function(){
    Model.create({name:"testfixed"});
    var obj = Model.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dblocal = Rho.ORMHelper.dbConnection("local");
    var dboutput = dblocal.$execute_sql("select * from Product");
    expect(dboutput[0].map.name).toEqual("testfixed");

    obj.updateAttributes({name:"testfixed2"});
    var obj2 = Model.find("first");
    expect(obj2.get("name")).toEqual("testfixed2");
  });

  it("VT302-0255 | should update fixedSchema with multiple fields",function(){
    Model.create({name:"testfixed",brand:4});
    var obj = Model.find("first");
    expect(obj.get("name")).toEqual("testfixed");
    expect(obj.get("brand")).toEqual('4');
    var dblocal = Rho.ORMHelper.dbConnection("local");
    var dboutput = dblocal.$execute_sql("select * from Product");
    expect(dboutput[0].map.name).toEqual("testfixed");

    obj.updateAttributes({name:"testfixed2",brand:2});
    var obj2 = Model.find("first");
    expect(obj2.get("name")).toEqual("testfixed2");
    expect(obj2.get("brand")).toEqual("2");
  });

  it("VT302-0213 | should delete fixedSchema",function(){
    Model.create({name:"testfixed"});
    var obj = Model.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dblocal = Rho.ORMHelper.dbConnection("local");
    var dboutput = dblocal.$execute_sql("select * from Product");
    expect(dboutput[0].map.name).toEqual("testfixed");

    obj.destroy();

    var obj2 = Model.find("first");
    expect(obj2).toEqual([]);
  });

  it("VT302-0214 | should delete fixedSchema sync model",function(){
    Model2.create({name:"testfixed"});
    var obj = Model2.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dblocal = Rho.ORMHelper.dbConnection("local");
    var dboutput = dblocal.$execute_sql("select * from ProductSync");
    expect(dboutput[0].map.name).toEqual("testfixed");

    var dbchanged = dblocal.$execute_sql("select * from CHANGED_VALUES");
    expect(dbchanged[0].map.update_type).toEqual("create");
    obj.destroy();

    var obj2 = Model.find("first");
    expect(obj2).toEqual([]);

    dbchanged = dblocal.$execute_sql("select * from CHANGED_VALUES");
    expect(dbchanged).toEqual([]);
  });

  it('VT302-0215 | destroys fixedSchema item after CHANGED_VALUES deleted', function() {
    Model2.create({name:"testfixed"});
    var obj = Model2.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dblocal = Rho.ORMHelper.dbConnection("local");
    var dboutput = dblocal.$execute_sql("select * from ProductSync");
    expect(dboutput[0].map.name).toEqual("testfixed");

    var dbchanged = dblocal.$execute_sql("select * from CHANGED_VALUES");
    expect(dbchanged[0].map.update_type).toEqual("create");
    var cv = db.$execute_sql("delete from CHANGED_VALUES");
    expect(cv).toEqual([]);

    obj = Model2.find("first");
    obj.destroy();

    cv = db.$execute_sql("select * from CHANGED_VALUES");
    expect(cv[0].map.update_type).toEqual("delete");
  });

   it('VT302-0215 | destroys fixedSchema item after CHANGED_VALUES updated', function() {
    Model2.create({name:"testfixed"});
    var obj = Model2.find("first");
    expect(obj.get("name")).toEqual("testfixed");

    var dblocal = Rho.ORMHelper.dbConnection("local");
    var dboutput = dblocal.$execute_sql("select * from ProductSync");
    expect(dboutput[0].map.name).toEqual("testfixed");

    var dbchanged = dblocal.$execute_sql("select * from CHANGED_VALUES");
    expect(dbchanged[0].map.update_type).toEqual("create");
    var cv = dblocal.$execute_sql("delete from CHANGED_VALUES");
    expect(cv).toEqual([]);

    obj = Model2.find("first");
    obj.updateAttributes({name:"testfixed2"});

    cv = dblocal.$execute_sql("select * from CHANGED_VALUES");
    expect(cv[0].map.update_type).toEqual("update");
  });

  it("VT302-0233 | should make object fixedSchema",function(){
    var mobj= Model.make({name:"testmake"});
    var obj = Model.find("all");
    expect(obj).toEqual([]);
    expect(mobj.get("name")).toEqual("testmake");
  });

  it("should delete all fixedSchema",function(){
    Model.create({name:"testfixed1"});
    Model.create({name:"testfixed2"});
    Model.create({name:"testfixed3",brand:4});
    Model.create({name:"testfixed4",brand:2});
    var total = Model.count();
    expect(total).toEqual(4);

    Model.deleteAll();
    total = Model.count();
    expect(total).toEqual(0);
  });

  // it("should delete all with conditions fixedSchema",function(){
  //   Model.create({name:"testfixed1"});
  //   Model.create({name:"testfixed2"});
  //   Model.create({name:"testfixed3",brand:4});
  //   Model.create({name:"testfixed4",brand:2});
  //   var total = Model.count();
  //   expect(total).toEqual(4);

  //   Model.deleteAll({name:"testfixed1"});
  //   total = Model.count();
  //   expect(total).toEqual(3);
  // });

  it('returns vars', function() {
    object = Model.make({'key': 'value'});
    expect(cleanVars(object)).toEqual({'key': 'value'});
  });

  it('retrieves object id', function() {
    object = Model.make({'key': 'value'});
    expect(object.object()).toBe(object.get('object'));
  });

  it('gets existing property', function() {
    object = Model.make({'key': 'value'});
    expect(object.get('key')).toBe('value');
  });

  it('gets absent property', function() {
    object = Model.make({'key': 'value'});
    expect(object.get('absent key')).toBeUndefined();
  });

  it('sets property', function() {
    object = Model.make({'key': 'value'});
    object.set('key', 'another value');
    expect(cleanVars(object)).toEqual({'key': 'another value'});
  });

  it('sets new property', function() {
    object = Model.make({'key': 'value'});
    object.set('new key', 'new value');
    expect(cleanVars(object)).toEqual({'key': 'value', 'new key': 'new value'});
  });

  it('supports set chaining', function() {
    object = Model.make({'key': 'value'});
    object.set('key', 'another value').set('new key', 'new value');
    expect(cleanVars(object)).toEqual({'key': 'another value', 'new key': 'new value'});
  });

  it('sets property', function() {
    object = Model.make({'key': 'value'});
    object.set('key', 'another value');
    expect(cleanVars(object)).toEqual({'key': 'another value'});
  });

  it('sets property with empty name', function() {
    object = Model.make({'key': 'value'});
    object.set('', 'another value');
    expect(cleanVars(object)).toEqual({'key': 'value', '': 'another value'});
  });

  it('has properties', function() {
    object = Model.make({'key': 'value'});
    expect(object.has('key')).toBe(true);
    expect(object.has('absent key')).toBe(false);
  });

//     describe("rhom pagination",function(){
//         it("should support paginate with no options",function(){

//         })

//         it("should support paginate with options and conditions",function(){

//         })

//         it("should support paginate with options and order",function(){

//         })
});