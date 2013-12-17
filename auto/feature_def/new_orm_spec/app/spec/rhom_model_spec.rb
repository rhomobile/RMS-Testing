describe "RhomModel" do

  before(:all) do
    Rho::RHO.load_all_sources()
    @save_sync_types = getTestDB().select_from_table('sources','name, sync_type')
    getTestDB().update_into_table('sources',{'sync_type'=>'none'})

    Rho::RhoConfig.sources[getProduct_str()]['sync_type'] = 'incremental' if $spec_settings[:sync_model]
    Rho::RhoConfig.sources[getCustomer_str()]['sync_type'] = 'incremental' if $spec_settings[:sync_model]
  end

  before(:each) do
    clean_db_data
  end

  it "should get count of objects" do
    count = getProduct.count
    getProduct.create({"name" => "Test","brand" => "Android"})
    getProduct.count.should == (count + 1)
  end

  it "list of properties supported by instance of object" do
    attrs = {"name" => "Test","brand" => "Android"}
    @product = getProduct.create(attrs)

    puts "---------- Properties ..."
    puts @product.inspect
    puts @product.name
    puts @product.brand
    puts $spec_settings

    # TODO:
    puts @product.loaded
    puts @product.model_name
    puts @product.sync_type
    puts @product.partition
    puts @product.source_id
    puts @product.sync_priority
    puts @product.fixed_schema
    puts @product.freezed
    puts "----------"

    @product.source_id.should > 0
    @product.name.should == attrs['name']
    @product.brand.should == attrs['brand']
  end

  it 'VT302-0004 | should create model' do
    vars = {"name"=>"Galaxy S", "brand"=>"Android"}
    @product1 = getProduct.create(vars)
    @product2 = getProduct.find(@product1.object)

    puts @product1.inspect
    puts @product2.inspect

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

end