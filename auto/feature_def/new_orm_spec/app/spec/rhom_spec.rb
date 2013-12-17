describe "Rhom" do

  before(:each) do
    clean_db_data
  end

  #
  # getClientId | client_id
  # haveLocalChanges | have_local_changes
  # databaseLocalReset | database_local_reset
  # databaseClientReset | database_client_reset
  # generateId | ?

  it 'VT302-0001 | Check Rhom::Rhom exist or not | Should return an object' do
    Rhom::Rhom.should_not be_nil
  end

  # TODO: no legacy examples for database_client_reset
  # mutex error with neworm!
  it "should return the nil client id if client db is reset" do
    Rhom::Rhom.database_client_reset(false)
    client_id = Rhom::Rhom.client_id
    client_id.should be_nil
  end

  # orm_js_spec.js: 652
  it "should return client id" do
    user_db = ::Rho::RHO.get_user_db
    user_db.execute_sql("DELETE FROM CLIENT_INFO")
    client_id = Rhom::Rhom.client_id
    client_id.should be_nil

    user_db.execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)")
    client_id = Rhom::Rhom.client_id
    client_id.should == "7"
  end


  it "VT302-0068b | Call haveLocalChanges without having any model" do
    # Rhom::Rhom.database_local_reset
    Rhom::Rhom.have_local_changes.should be_false
  end

  it "VT302-0068 | should return true if a model objects have local changes for sync haveLocalChanges" do

    # puts "VT302-0068"
    # error with neworm!
    # puts Product

    db = ::Rho::RHO.get_user_db
    Rhom::Rhom.have_local_changes.should be_false
    db.execute_sql("INSERT INTO CHANGED_VALUES (object) VALUES('meobj')")
    Rhom::Rhom.have_local_changes.should be_true

    db.execute_sql("DELETE FROM SOURCES");
    db.execute_sql("DELETE FROM OBJECT_VALUES");
    db.execute_sql("DELETE FROM CHANGED_VALUES");
    Rhom::Rhom.have_local_changes.should be_false
  end


  # it "should get count of objects" do
  #   Product.count.should == 0
  #   Product.create({"name" => "test","brand" => "android"})
  #   Product.count.should == 1 # error in neworm
  # end

  # it "list of properties supported by instance of object" do
  #   @product = Product.create({"name" => "test","brand" => "android"})
  #   puts "---------- Properties ..."
  #   puts @product.inspect
  #   puts @product.partition

  #   "one".should == 'one'
  # end

  # it("VT302-0063 | call databaseLocalReset without having any local model | Should not removed data from synced database",function(){
  #       var db = Rho.ORMHelper.dbConnection("user");
  #       db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

  #       var Product = function(model){
  #           model.modelName("Product");
  #           model.enable("sync");
  #           model.property("name","string");
  #           model.property("price","float");
  #           model.enable("fixedSchema");
  #           model.set("partition","user");
  #       };

  #       var Model = Rho.ORM.addModel(Product);
  #       Model.create({"name":"test"});

  #       Rho.ORM.databaseLocalReset();

  #       sources = Rho.ORMHelper.getAllSources();
  #       var res = db.$execute_sql("SELECT * FROM Product Where name = 'test' ");
  #       var clientId = Rho.ORM.getClientId();

  #       expect(Model).toBeDefined();
  #       expect(clientId).toEqual("7");
  #       expect(res[0].map.name).toEqual('test');

  #       db.$execute_sql("DROP TABLE Product");
  # });



    # it("VT302-0065 | call databaseLocalReset with changes in local model | Should removed local model data",function(){
    #     var client_db = Rho.ORMHelper.dbConnection("user");
    #     client_db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    #     var Product = function(model){
    #         model.modelName("Product");
    #         model.property("name","string");
    #         model.property("price","float");
    #         model.set("partition","local");
    #     };

    #     var Model = Rho.ORM.addModel(Product);
    #     Model.create({"name":"test"});
    #     var db = Rho.ORMHelper.dbConnection("local");
    #     var objects = db.$execute_sql("select * from OBJECT_VALUES");
    #     expect(objects[0].map.value).toEqual("test");

    #     Rho.ORM.databaseLocalReset();

    #     objects = db.$execute_sql("select * from OBJECT_VALUES");
    #     var clientId = Rho.ORM.getClientId();

    #     expect(Model).toBeDefined();
    #     expect(objects).toEqual([]);
    #     expect(clientId).toEqual("7");

    #     db.$execute_sql("DELETE FROM SOURCES");
    #     db.$execute_sql("DELETE FROM OBJECT_VALUES");
    #     Rho.ORM.clear();
    # });

    # it("VT302-0066 | call databaseLocalReset with changes in both local and user model | Should removed local model data",function(){

    #     var client_db = Rho.ORMHelper.dbConnection("user");
    #     client_db.$execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)");

    #     var Product = function(model){
    #         model.modelName("Product");
    #         model.property("name","string");
    #         model.property("price","float");
    #         model.set("partition","local");
    #     };

    #     var Product_u = function(model){
    #         model.modelName("Product_u");
    #         model.property("name","string");
    #         model.property("price","float");
    #         model.set("partition","user");
    #     };

    #     var Model = Rho.ORM.addModel(Product);
    #     var Model_u = Rho.ORM.addModel(Product_u);

    #     Model.create({"name":"test"});
    #     Model_u.create({"name":"test_u"});

    #     var db = Rho.ORMHelper.dbConnection("local");
    #     var objects = db.$execute_sql("select * from OBJECT_VALUES");
    #     var db_u = Rho.ORMHelper.dbConnection("user");
    #     var objects_u = db_u.$execute_sql("select * from OBJECT_VALUES");


    #     //dispCurrentProcess(JSON.stringify(objects));
    #     expect(objects[0].map.value).toEqual("test");
    #     expect(objects_u[0].map.value).toEqual("test_u");

    #     Rho.ORM.databaseLocalReset()

    #     objects = db.$execute_sql("select * from OBJECT_VALUES");
    #     objects_u = db_u.$execute_sql("select * from OBJECT_VALUES");
    #     var clientId = Rho.ORM.getClientId();

    #     expect(Model).toBeDefined();
    #     expect(objects_u[0].map.value).toEqual("test_u");
    #     expect(clientId).toEqual("7");

    #     db.$execute_sql("DELETE FROM SOURCES");
    #     db.$execute_sql("DELETE FROM OBJECT_VALUES");
    #     Rho.ORM.clear();
    # });

  # Original Rhom specs
  # - 1
  it "should database_full_reset_ex incorrectly and raise an exception" do
    exc = false
    begin
      Rhom::Rhom.database_full_reset_ex( :models => ['Product'], :reset_client_info => true )
    rescue => e
      exc = true
    end

    exc.should be_true
  end

  # - 2
  it "should database_full_reset_ex support different parameters" do
    # neworm: undefined method `database_full_reset_ex'
    Rhom::Rhom.database_full_reset_ex
    Rhom::Rhom.database_full_reset_ex( :reset_client_info => true )
    Rhom::Rhom.database_full_reset_ex( :reset_local_models => true )
    Rhom::Rhom.database_full_reset_ex( :reset_local_models => true, :reset_client_info => false )
  end

  # - 3
  it "should database_full_reset_ex with models" do

    Product.create( { :name => 'prod1' } )
    Customer.create( { :city => 'SPB' } )

    res = Product.find(:all)
    # neworm: returns 0
    res.length.should > 0

    res = Customer.find(:count)
    res.should > 0

    Rhom::Rhom.database_full_reset_ex( :models => ['Product', 'Customer'] )
    Rho::RhoConfig.reset_models.should == 'Product,Customer'

    res = Product.find(:all)
    res.length.should == 0

    res = Customer.find(:count)
    res.should == 0
  end

  # - 4
  it "should database_full_reset_ex with one model" do

    Product.create( { :name => 'prod1' } )
    Customer.create( { :city => 'SPB' } )

    res = Product.find(:all)
    # neworm: returns 0
    res.length.should > 0

    res = Customer.find(:count)
    res.should > 0

    Rhom::Rhom.database_full_reset_ex( :models => ['Product'] )
    Rho::RhoConfig.reset_models.should == 'Product'

    res = Product.find(:all)
    res.length.should == 0

    res = Customer.find(:count)
    res.should > 0
  end

end