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
  # it "should return the nil client id if client db is reset" do
  #   Rhom::Rhom.database_client_reset #(false)
  #   client_id = Rhom::Rhom.client_id
  #   client_id.should be_nil
  # end

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
    db = ::Rho::RHO.get_user_db
    db.execute_sql("DELETE FROM CHANGED_VALUES");
    Rhom::Rhom.have_local_changes.should be_false
  end

  it "VT302-0068 | should return true if a model objects have local changes for sync haveLocalChanges" do
    db = ::Rho::RHO.get_user_db
    Rhom::Rhom.have_local_changes.should be_false
    db.execute_sql("INSERT INTO CHANGED_VALUES (object) VALUES('meobj')")
    Rhom::Rhom.have_local_changes.should be_true

    db.execute_sql("DELETE FROM SOURCES");
    db.execute_sql("DELETE FROM OBJECT_VALUES");
    db.execute_sql("DELETE FROM CHANGED_VALUES");
    Rhom::Rhom.have_local_changes.should be_false
  end

  # Original Rhom specs
  # - 1
  it "should raise an exception if database_full_reset_ex called incorrectly" do
    begin
      exc = false
      Rhom::Rhom.database_full_reset_ex( :models => ['Product'], :reset_client_info => true )
    rescue => e
      exc = true
    end

    exc.should be_true
  end

  # - 2
  it "should support different parameters for database_full_reset_ex method" do
    # neworm: undefined method `database_full_reset_ex'
    Rhom::Rhom.database_full_reset_ex
    Rhom::Rhom.database_full_reset_ex( :reset_client_info => true )
    Rhom::Rhom.database_full_reset_ex( :reset_local_models => true )
    Rhom::Rhom.database_full_reset_ex( :reset_local_models => true, :reset_client_info => false )
  end

  # - 3
  it "should  delete all objects for given models" do
    Product.create( { :name => 'prod1' } )
    Customer.create( { :city => 'SPB' } )

    Product.find(:all).length.should > 0
    Customer.find(:count).should > 0

    Rhom::Rhom.database_full_reset_ex( :models => ['Product', 'Customer'] )
    Rho::RhoConfig.reset_models.should == 'Product,Customer'

    Product.find(:all).length.should == 0
    Customer.find(:count).should == 0
  end

  # - 4
  it "should  delete all objects for a given model" do
    Product.create( { :name => 'prod1' } )
    Customer.create( { :city => 'SPB' } )

    Product.find(:all).length.should > 0
    Customer.find(:count).should > 0

    Rhom::Rhom.database_full_reset_ex( :models => ['Product'] )
    Rho::RhoConfig.reset_models.should == 'Product'

    Product.find(:all).length.should == 0
    Customer.find(:count).should > 0
  end

end