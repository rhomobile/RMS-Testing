describe "RhomModel" do
  @use_new_orm = begin Rho::RHO.use_new_orm rescue false end
  puts "Rhom specs: use_new_orm: #{@use_new_orm}"

  before(:each) do
    clean_db_data
  end

  it "should get count of objects" do
    count = getProduct.count
    getProduct.create({"name" => "Test","brand" => "Android"})
    getProduct.count.should == (count + 1)
  end

  it "should get count of objects using find method" do
    count = getProduct.count
    getProduct.create({"name" => "Test","brand" => "Android"})
    getProduct.find(:count).should == (count + 1)
  end

  it "should get count of objects" do
    count = getProduct.count
    getProduct.create({"name" => "Test","brand" => "Android"})
    getProduct.count.should == (count + 1)
  end

  it "list of properties supported by instance of object" do
    attrs = {"name" => "Test","brand" => "Android"}
    @product = getProduct.create(attrs)

    res = ::Rho::RHO.get_user_db().select_from_table('sources','name,sync_type,source_id',
      {"name" => getProduct.to_s})
    @product.source_id.to_i.should == res[0]['source_id'].to_i
    @product.name.should == attrs['name']
    @product.brand.should == attrs['brand']
    @product.source_id.should_not be_nil
    @product.object.should_not be_nil
  end

  it "should return all properties of model" do
    attrs = {"name" => "Test","brand" => "Android"}
    @product = getProduct.create(attrs)
    # includes source_id, object
    (@product.vars.size-2).should == attrs.size
  end

  it 'VT302-0004 | should create model' do
    vars = {"name"=>"Galaxy S", "brand"=>"Android"}
    @product1 = getProduct.create(vars)
    @product2 = getProduct.find(@product1.object)

    # # puts @product1.inspect
    # puts "should create model:"
    # puts @product2.inspect
    @product2.object.should =="#{@product1.object}"
    @product2.name.should == vars['name']
    @product2.brand.should == vars['brand']
  end

  it 'should create a new model and save it' do
    vars = {"name"=>"Galaxy S", "brand"=>"Android"}
    @product1 = getProduct.new(vars)
    @product1.save
    @product2 = getProduct.find(@product1.object)

    @product2.object.should =="#{@product1.object}"
    @product2.name.should == vars['name']
    @product2.brand.should == vars['brand']
  end


  it "should create a record with apostrophe" do
    vars = {"name"=>"Galaxy S ' 7", "brand"=>"Android"}
    @product1 = getProduct.create(vars)
    @product2 = getProduct.find(@product1.object)

    @product2.object.should =="#{@product1.object}"
    @product2.name.should == vars['name']
    @product2.brand.should == vars['brand']
  end

  it 'should update attributes and save them' do
    vars = {"name"=>"Galaxy S", "brand"=>"Android"}
    @product1 = getProduct.create(vars)

    vars['name'] = "Galaxy S4"
    @product1.update_attributes(vars)
    @product2 = getProduct.find(@product1.object)

    @product2.object.should =="#{@product1.object}"
    @product2.name.should == vars['name']
    @product2.brand.should == vars['brand']
  end

  it 'should delete one model object' do
    vars = {"name"=>"Galaxy S", "brand"=>"Android"}
    @product = getProduct.create(vars)
    count = getProduct.count
    product_id = @product.object

    @product.destroy

    if @use_new_orm
      getProduct.find(product_id).should be_empty
    else
      getProduct.find(product_id).should be_nil
    end
    (count - 1).should == getProduct.count
  end

end