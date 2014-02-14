describe "Rhom" do
  @use_new_orm = begin Rho::RHO.use_new_orm rescue false end
  puts "Rhom specs: use_new_orm: #{@use_new_orm}"

  before(:each) do
    clean_db_data('user')
  end

  it 'Check Rhom::Rhom exist or not | Should return an object' do
    Rhom::Rhom.should_not be_nil
  end

  it "Should return client id" do
    user_db = ::Rho::RHO.get_user_db
    user_db.execute_sql("DELETE FROM CLIENT_INFO")
    client_id = Rhom::Rhom.client_id
    client_id.should be_nil

    user_db.execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)")
    client_id = Rhom::Rhom.client_id
    client_id.should == "7"
  end

  it "Call haveLocalChanges without having any model" do
    db = ::Rho::RHO.get_user_db
    db.execute_sql("DELETE FROM CHANGED_VALUES");
    Rhom::Rhom.have_local_changes.should be_false
  end

  it "Should return true if a model objects have local changes for sync haveLocalChanges" do
    db = ::Rho::RHO.get_user_db
    Rhom::Rhom.have_local_changes.should be_false
    db.execute_sql("INSERT INTO CHANGED_VALUES (object) VALUES('meobj')")
    Rhom::Rhom.have_local_changes.should be_true

    db.execute_sql("DELETE FROM SOURCES");
    db.execute_sql("DELETE FROM OBJECT_VALUES");
    db.execute_sql("DELETE FROM CHANGED_VALUES");
    Rhom::Rhom.have_local_changes.should be_false
  end

  it "Should raise an exception if database_full_reset_ex called incorrectly" do
    begin
      exc = false
      Rhom::Rhom.database_full_reset_ex( :models => ['Product'], :reset_client_info => true )
    rescue => e
      exc = true
    end
    exc.should be_true
  end

  it "Should support different parameters for database_full_reset_ex method" do
    Rhom::Rhom.database_full_reset_ex
    Rhom::Rhom.database_full_reset_ex( :reset_client_info => true )
    Rhom::Rhom.database_full_reset_ex( :reset_local_models => true )
    Rhom::Rhom.database_full_reset_ex( :reset_local_models => true, :reset_client_info => false )
  end


  it "Should  delete all objects for given fixed schema models" do
    Product_s.create( { :brand => "Apple", :name => 'iPhone 5S', :price => "$199", :quantity => "10" } )
    Product_s.create( { :brand => "Samsung", :name => 'Galaxy S4', :price => "$99.99", :quantity => "20" } )
    Customer_s.create( { :city => 'SPB', :address => "Fontanka" } )

    Product_s.find(:all).length.should > 0
    Customer_s.find(:count).should > 0

    Rhom::Rhom.database_full_reset_ex( :models => ['Product_s', 'Customer_s'] )

    Rho::RhoConfig.reset_models.should == 'Product_s,Customer_s'
    Product_s.find(:all).length.should == 0
    Customer_s.find(:count).should == 0
  end

  it "Should  delete all objects for a given fixed schema model" do
    Product_s.create( { :brand => "Apple", :name => 'iPhone 5S', :price => "$199", :quantity => "10" } )
    Product_s.create( { :brand => "Samsung", :name => 'Galaxy S4', :price => "$99.99", :quantity => "20" } )
    Customer_s.create( { :city => 'SPB', :address => "Fontanka" } )

    Product_s.find(:all).length.should > 0
    Customer_s.find(:count).should > 0

    Rhom::Rhom.database_full_reset_ex( :models => ['Product_s'] )

    Rho::RhoConfig.reset_models.should == 'Product_s'
    Product_s.find(:count).should == 0

    Product_s.find(:all).should be_empty # =>
    Customer_s.find(:count).should > 0
  end

  it "Should  delete all objects for given property bag models" do
    Product.create( { :brand => "Apple", :name => 'iPhone 5S', :price => "$199", :quantity => "10" } )
    Product.create( { :brand => "Samsung", :name => 'Galaxy S4', :price => "$99.99", :quantity => "20" } )
    Customer.create( { :city => 'SPB', :address => "Fontanka" } )

    Product.find(:all).length.should > 0
    Customer.find(:count).should > 0

    Rhom::Rhom.database_full_reset_ex( :models => ['Product', 'Customer'] )

    Rho::RhoConfig.reset_models.should == 'Product,Customer'
    Product.find(:all).length.should == 0
    Customer.find(:count).should == 0
  end

  it "Should  delete all objects for a given property bag model" do
    Product.create( { :brand => "Apple", :name => 'iPhone 5S', :price => "$199", :quantity => "10" } )
    Product.create( { :brand => "Samsung", :name => 'Galaxy S4', :price => "$99.99", :quantity => "20" } )
    Customer.create( { :city => 'SPB', :address => "Fontanka" } )

    Product.find(:all).length.should > 0
    Customer.find(:count).should > 0

    Rhom::Rhom.database_full_reset_ex( :models => ['Product'] )

    Rho::RhoConfig.reset_models.should == 'Product'
    Product.find(:count).should == 0

    Product.find(:all).should be_empty
    Customer.find(:count).should > 0
  end

end