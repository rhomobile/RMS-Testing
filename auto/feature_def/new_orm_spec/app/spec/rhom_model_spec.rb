describe "RhomModel" do

  before(:all) do
    Rho::RHO.load_all_sources()
    @save_sync_types = getTestDB().select_from_table('sources','name, sync_type')
    getTestDB().update_into_table('sources', {'sync_type'=>'none'})

    Rho::RhoConfig.sources[getProduct.to_s]['sync_type'] = 'incremental' if $spec_settings[:sync_model]
    Rho::RhoConfig.sources[getCustomer.to_s]['sync_type'] = 'incremental' if $spec_settings[:sync_model]

    # puts "Rho::RhoConfig.sources: "
    # puts Rho::RhoConfig.sources.inspect
    # =>
    # {
    #   "Customer"=>{"sync_type"=>"incremental", "sync_priority"=>2, "property"=>{"address"=>[:string, nil], "created_at"=>[:string, nil], "city"=>[:string, nil], "email"=>[:string, nil], "last"=>[:string, nil], "updated_at"=>[:string, nil], "lat"=>[:string, nil], "long"=>[:string, nil], "phone"=>[:string, nil], "state"=>[:string, nil], "zip"=>[:string, nil]}, "name"=>"Customer", :loaded=>true, "partition"=>"user", "str_associations"=>"Product,quantity,Product,sku", "str_blob_attribs"=>"", "source_id"=>3},
    #   "Customer_s"=>{"sync_type"=>"incremental", "sync_priority"=>1, "schema_version"=>"1.0", "schema"=>{"property"=>{"address"=>[:string, nil], "created_at"=>[:string, nil], "city"=>[:string, nil], "email"=>[:string, nil], "first"=>[:string, nil], "last"=>[:string, nil], "updated_at"=>[:string, nil], "lat"=>[:string, nil], "long"=>[:string, nil], "phone"=>[:string, nil], "state"=>[:string, nil], "zip"=>[:string, nil]}}, "name"=>"Customer_s", :loaded=>true, "partition"=>"user", "str_associations"=>"Product_s,quantity,Product_s,sku", "str_blob_attribs"=>"", "source_id"=>4},
    #   "Product"=>{"sync_type"=>"incremental", "sync_priority"=>1, "belongs_to"=>[{"quantity"=>"Customer"}, {"sku"=>"Customer"}], "property"=>{}, "name"=>"Product", :loaded=>true, "partition"=>"user", "str_associations"=>"", "str_blob_attribs"=>"", "source_id"=>5},
    #   "Product_s"=>{"sync_type"=>"incremental", "sync_priority"=>2, "schema_version"=>"1.0", "belongs_to"=>[{"quantity"=>"Customer_s"}, {"sku"=>"Customer_s"}], "schema"=>{"property"=>{"brand"=>[:string, nil], "created_at"=>[:string, nil], "name"=>[:string, nil], "price"=>[:string, nil], "quantity"=>[:string, nil], "sku"=>[:string, nil], "updated_at"=>[:string, nil]}}, "name"=>"Product_s", :loaded=>true, "partition"=>"user", "str_associations"=>"", "str_blob_attribs"=>"", "source_id"=>6}
    # }
    #
  end

  after(:all) do
  end

  before(:each) do
    clean_db_data
  end

  after(:each) do
  end

  it "should get count of objects" do
    count = getProduct.count
    getProduct.create({"name" => "Test","brand" => "Android"})
    getProduct.count.should == (count + 1)
  end

  it "list of properties supported by instance of object" do
    attrs = {"name" => "Test","brand" => "Android"}
    @product = getProduct.create(attrs)

    # TODO:
    puts "---------- Properties ..."
    puts @product.loaded
    puts @product.model_name
    puts @product.sync_type if $spec_settings[:sync_model]
    puts @product.partition

    puts @product.source_id
    puts @product.sync_priority
    puts @product.fixed_schema
    puts @product.freezed
    # puts "----------"

    # @product.source_id.should > 0
    @product.source_id.should == Rho::RhoConfig.sources[getProduct.to_s]['source_id']
    @product.name.should == attrs['name']
    @product.brand.should == attrs['brand']
  end

  it 'VT302-0004 | should create model' do
    vars = {"name"=>"Galaxy S", "brand"=>"Android"}
    @product1 = getProduct.create(vars)
    @product2 = getProduct.find(@product1.object)

    # puts @product1.inspect
    puts "should create model:"
    puts @product2.inspect

    @product2.object.should =="#{@product1.object}"
    @product2.name.should == vars['name']
    @product2.brand.should == vars['brand']
  end

  it 'should create a new model and save it' do
    vars = {"name"=>"Galaxy S", "brand"=>"Android"}
    @product1 = getProduct.new(vars)
    @product1.save
    @product2 = getProduct.find(@product1.object)

    # puts @product1.inspect
    # puts @product2.inspect

    @product2.object.should =="#{@product1.object}"
    @product2.name.should == vars['name']
    @product2.brand.should == vars['brand']
  end
    # it('VT302-0004 | should create model',function(){
    #   var Product = function(model){
    #       model.modelName("Product");
    #       model.enable("sync");
    #       model.property("name","string");
    #       model.property("brand","string");
    #       model.set("partition","local");
    #   };
    #   p = Rho.ORM.addModel(Product);
    #   source = Opal.Rho._scope.RhoConfig.$sources().map["Product"];
    #   expect(source.sync_type).toEqual('incremental');
    #   expect(source.name).toEqual('Product');
    # });

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

end