describe "RhomModel" do
  @use_new_orm = begin Rho::RHO.use_new_orm rescue true end
  puts "RhomModel specs: use_new_orm: #{@use_new_orm}"

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

  it 'should create model' do
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

    getProduct.find(product_id).should be_nil
    
    (count - 1).should == getProduct.count
  end
  it 'should return true if any changes added to that object' do
    getCustomer.create({'name'=>'bhakta','age'=>'28'})
    data = getCustomer.find(:all,:conditions => {'name' => 'bhakta'})
    data[0].update_attributes({'age' => '34'})
    getCustomer.hasChanges(data[0].object).should == true
  end

  it 'should throw argument error for freezed model on createInstance' do
    lambda { 
      obj = getFreezedProduct.create({'brand'=>'testbrand','name'=>'samsung','price'=>'50000','extra_property'=>'Test Error'}) 
    }.should raise_error(ArgumentError)
  end

  it 'should throw argument error for freezed model on saveObject' do
    lambda { 
      obj = getFreezedProduct.new
      obj.brand = 'testbrand'
      obj.name = 'samsung'
      obj.price = '50000'
      obj.extra_property = 'test_error'
      obj.save 
    }.should raise_error(ArgumentError)
  end

  it 'should throw argument error for freezed model on updateObject' do
    lambda { 
      data = getFreezedProduct.create({'brand'=>'testbrand','name'=>'samsung','price'=>'50000'})
      data.update_attributes({'extra_property'=>'Test Error'})
    }.should raise_error(ArgumentError)
  end

  it 'should delete object by using deleteObjectsPropertyBagByCondArray when condition matches with one records' do
    getCustomer.create({'name'=>'bhakta','age'=>'28'})
    getCustomer.create({'name'=>'bhakta2','age'=>'28'})
    data = getCustomer.find(:all,:conditions => {'name' => 'bhakta'})
    getCustomer.deleteObjectsPropertyBagByCondArray("name = ?",['bhakta'],{},['name'])
    getProduct.find(data[0].object).should be_nil
  end

  it 'should delete objects by using deleteObjectsPropertyBagByCondArray when condition matches with more than one records' do
    getCustomer.create({'name'=>'bhakta','age'=>'28'})
    getCustomer.create({'name'=>'bhakta2','age'=>'36'})
    getCustomer.create({'name'=>'bhakta3','age'=>'34'})
    getCustomer.create({'name'=>'bhakta4','age'=>'28'})
    data = getCustomer.find(:all,:conditions => {'age' => '28'})
    getCustomer.deleteObjectsPropertyBagByCondArray("age = ?",['28'],{},['age'])
    getProduct.find(data[0].object).should be_nil
    getProduct.find(data[1].object).should be_nil
    getCustomer.count.should_not == 0
  end

  it 'should not delete any objects by using deleteObjectsPropertyBagByCondArray when condition does not matches with any of records' do
    getCustomer.create({'name'=>'bhakta','age'=>'28'})
    getCustomer.create({'name'=>'bhakta2','age'=>'36'})
    getCustomer.create({'name'=>'bhakta3','age'=>'34'})
    getCustomer.create({'name'=>'bhakta4','age'=>'28'})
    initialCount = getCustomer.count
    getCustomer.deleteObjectsPropertyBagByCondArray("age = ?",['60'],{},['age'])
    getCustomer.count.should == initialCount
  end

  it 'should delete all if no condition passed' do
    getCustomer.create({'name'=>'bhakta','age'=>'28'})
    getCustomer.create({'name'=>'bhakta2','age'=>'36'})
    getCustomer.create({'name'=>'bhakta3','age'=>'34'})
    getCustomer.create({'name'=>'bhakta4','age'=>'28'})
    getCustomer.deleteObjectsPropertyBagByCondArray("",[],{},[])
    getCustomer.count.should == 0
  end

  it 'should update object by using updateObject api' do
    getCustomer.delete_all
    getCustomer.create({'name'=>'bhakta','age'=>'28'})
    data = getCustomer.findObjectsPropertyBagByCondHash(:all,{'name' => 'bhakta'},{},[])
    new_name = "macworld"
    getCustomer.updateObject(data[0]['object'], data[0], {'name'=>"#{new_name}"})
    new_data = getCustomer.find(data[0]['object'])
    new_data.name.should == new_name
  end
  

end