describe "Rhom" do
  it "should database_full_reset_ex incorrectly and raise an exception" do
    exc = false
    begin
      ORM::ORM.databaseFullResetEx( :models => ['Product'], :reset_client_info => true )
    rescue => e
      exc = true
    end

    exc.should be_true
  end

  it "should database_full_reset_ex support different parameters" do
    ORM::ORM.databaseFullResetEx
    ORM::ORM.databaseFullResetEx( :reset_client_info => true )
    ORM::ORM.databaseFullResetEx( :reset_local_models => true )
    ORM::ORM.databaseFullResetEx( :reset_local_models => true, :reset_client_info => false )
  end

  it "should database_full_reset_ex with models" do

    Product.create( { :name => 'prod1' } )
    Customer.create( { :city => 'SPB' } )

    res = Product.find(:all)
    res.length.should > 0

    res = Customer.find(:count)
    res.should > 0

    ORM::ORM.databaseFullResetEx( :models => ['Product', 'Customer'] )
    Rho::RhoConfig.reset_models.should == 'Product,Customer'

    res = Product.find(:all)
    res.length.should == 0

    res = Customer.find(:count)
    res.should == 0
  end

  it "should database_full_reset_ex with one model" do

    Product.create( { :name => 'prod1' } )
    Customer.create( { :city => 'SPB' } )

    res = Product.find(:all)
    res.length.should > 0

    res = Customer.find(:count)
    res.should > 0

    ORM::ORM.databaseFullResetEx(:models=>['Product'])
    Rho::RhoConfig.reset_models.should == 'Product'

    res = Product.find(:all)
    res.length.should == 0

    res = Customer.find(:count)
    res.should > 0
  end

  it "should return true if have local changes" do
    Product_s.create(:name=>"testchange")
    ORM::ORM.haveLocalChanges().should_not be_nil
  end

  it "should full reset and logout" do
    Product_s.create( { :name => 'prod1' } )
    Customer_s.create( { :city => 'SPB' } )

    res = Product_s.find(:all)
    res.length.should > 0

    res = Customer_s.find(:count)
    res.should > 0

    ORM::ORM.databaseFullResetAndLogout()

    res = Product_s.find(:all)
    res.length.should == 0

    res = Customer_s.find(:all)
    res.length.should == 0
  end

  it "should full client reset and logout" do
    Product_s.create( { :name => 'prod1' } )
    Customer_s.create( { :city => 'SPB' } )

    res = Product_s.find(:all)
    res.length.should > 0

    res = Customer_s.find(:count)
    res.should > 0

    ORM::ORM.databaseFullclientResetAndLogout()

    res = Product_s.find(:all)
    res.length.should == 0

    res = Customer_s.find(:all)
    res.length.should == 0
  end

end