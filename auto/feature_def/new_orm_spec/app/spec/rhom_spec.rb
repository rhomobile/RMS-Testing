describe "Rhom" do
  @use_new_orm = begin Rho::RHO.use_new_orm rescue true end
  puts "Rhom specs: use_new_orm: #{@use_new_orm}"

  before(:each) do
    clean_db_data('user')
  end

  it 'Check Rhom::Rhom exist or not | should return an object' do
    Rhom::Rhom.should_not be_nil
  end

  it "should return client id" do
    user_db = ::Rho::RHO.get_user_db
    user_db.execute_sql("DELETE FROM CLIENT_INFO")
    client_id = Rhom::Rhom.client_id
    client_id.should be_nil

    user_db.execute_sql("INSERT INTO CLIENT_INFO (client_id) VALUES(7)")
    client_id = Rhom::Rhom.client_id
    client_id.should == "7"
  end

  it 'should return model by name' do
    model = Rhom::Rhom.getModel("Product")
    model.should_not be_nil
  end if @use_new_orm # TODO: BAB: getModel n/a in OldRom

  # TODO: BAB
  # create alias for get_model
  # it 'should return model by name using alias name' do
  #   model = Rhom::Rhom.get_model("Product")
  #   model.should_not be_nil
  # end

  it 'should list all properties for model' do
    model = Rhom::Rhom.getModel("Product")
    model.model_name.should ==  'Product'
    model.loaded.should == true
    model.sync_type.should == 'incremental'
    model.sync_priority.should == 1
    model.partition.should == 'user'
    model.fixed_schema.should == false
    model.freezed.should == false
  end if @use_new_orm  # TODO: BAB: getModel n/a in OldRom

  it "Call haveLocalChanges without having any model" do
    db = ::Rho::RHO.get_user_db
    db.execute_sql("DELETE FROM CHANGED_VALUES");
    Rhom::Rhom.have_local_changes.should be_false
  end

  it "should return true if a model objects have local changes for sync haveLocalChanges" do
    db = ::Rho::RHO.get_user_db
    Rhom::Rhom.have_local_changes.should be_false
    db.execute_sql("INSERT INTO CHANGED_VALUES (object) VALUES('meobj')")
    Rhom::Rhom.have_local_changes.should be_true

    db.execute_sql("DELETE FROM SOURCES");
    db.execute_sql("DELETE FROM OBJECT_VALUES");
    db.execute_sql("DELETE FROM CHANGED_VALUES");
    Rhom::Rhom.have_local_changes.should be_false
  end

  it "should raise an exception if database_full_reset_ex called incorrectly" do
    begin
      exc = false
      Rhom::Rhom.database_full_reset_ex( :models => ['Product'], :reset_client_info => true )
    rescue => e
      exc = true
    end
    exc.should be_true
  end

  it "should support different parameters for database_full_reset_ex method" do
    Rhom::Rhom.database_full_reset_ex
    Rhom::Rhom.database_full_reset_ex( :reset_client_info => true )
    Rhom::Rhom.database_full_reset_ex( :reset_local_models => true )
    Rhom::Rhom.database_full_reset_ex( :reset_local_models => true, :reset_client_info => false )
  end


  it "should  delete all objects for given fixed schema models" do
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

  it "should  delete all objects for a given fixed schema model" do
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

  it "should  delete all objects for given property bag models" do
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

  it "should  delete all objects for a given property bag model" do
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

  it "should full update for fixed schema if model enable :full_update" do
    attrs = { :brand => "Samsung", :name => 'Galaxy S4', :price => "$99.99", :quantity => "20" }
    galaxy_phone = FixedSchemaProduct.create( attrs )

    db = ::Rho::RHO.get_user_db
    db.delete_all_from_table('changed_values')

    update_attributes = {:name => "Galaxy S5"}
    gp = FixedSchemaProduct.find(galaxy_phone.object)
    gp.update_attributes(update_attributes)

    rows = db.select_from_table('changed_values','*')
    # puts rows.inspect

    rows.size.should >= 4
    rows.each do |row|
      case row['attrib']
      when 'brand'
        row['value'].should == attrs[:brand]
      when 'name'
        row['value'].should == "Galaxy S5"
      when 'price'
        row['value'].should == attrs[:price]
      when 'quantity'
        row['value'].should == attrs[:quantity]
      else
        row["update_type"].should == "update"
      end
    end
  end if @use_new_orm  # TODO: BAB: is it broken in OdlORM

  it "should full update for property bag if model enable :full_update" do
    attrs = { :brand => "Samsung", :name => 'Galaxy S4', :price => "$99.99", :quantity => "20" }
    galaxy_phone = PropertyBagProduct.create( attrs )
    gp = PropertyBagProduct.find(galaxy_phone.object)

    db = ::Rho::RHO.get_user_db
    db.delete_all_from_table('changed_values')

    update_attributes = {:name => "Galaxy S5"}
    gp.update_attributes(update_attributes)

    rows = db.select_from_table('changed_values','*')
    # puts rows.inspect

    rows.size.should >= 4
    rows.each do |row|
      case row['attrib']
      when 'brand'
        row['value'].should == attrs[:brand]
      when 'name'
        row['value'].should == "Galaxy S5"
      when 'price'
        row['value'].should == attrs[:price]
      when 'quantity'
        row['value'].should == attrs[:quantity]
      else
        row["update_type"].should == "update"
      end
    end
  end if @use_new_orm  # TODO: BAB: is it broken in OdlORM

end