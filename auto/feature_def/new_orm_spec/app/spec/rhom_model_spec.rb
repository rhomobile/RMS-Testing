describe "RhomModel" do

  before(:each) do
    clean_db_data
  end

  it "should get count of objects" do
    Product.count.should == 0
    Product.create({"name" => "test","brand" => "android"})
    Product.count.should == 1 # error in neworm
  end

  it "list of properties supported by instance of object" do
    @product = Product.create({"name" => "test","brand" => "android"})
    puts "---------- Properties ..."
    puts @product.inspect
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
  end

end