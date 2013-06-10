

describe "Rhom" do
  it "should database_full_reset_ex incorrectly and raise an exception" do
    exc = false
    begin
      Rhom::Rhom.database_full_reset_ex( :models => ['Product'], :reset_client_info => true )
    rescue => e
      exc = true
    end

    exc.should be_true
  end

  it "should database_full_reset_ex support different parameters" do
    Rhom::Rhom.database_full_reset_ex
    Rhom::Rhom.database_full_reset_ex( :reset_client_info => true )
    Rhom::Rhom.database_full_reset_ex( :reset_local_models => true )
    Rhom::Rhom.database_full_reset_ex( :reset_local_models => true, :reset_client_info => false )
  end

  it "should database_full_reset_ex with models" do

    Product.create( { :name => 'prod1' } )
    Customer.create( { :city => 'SPB' } )

    res = Product.find(:all)
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

  it "should database_full_reset_ex with one model" do

    Product.create( { :name => 'prod1' } )
    Customer.create( { :city => 'SPB' } )

    res = Product.find(:all)
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