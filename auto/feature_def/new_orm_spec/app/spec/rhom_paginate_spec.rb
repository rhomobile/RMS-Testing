describe "Rhom::Paginate" do
  before(:all) do
    @helper = Test_Helper.new
    @helper.before_all(['object_values'], 'spec/pagination')
  end

  before(:each) do
    @helper.before_each
  end

  after(:each) do
    @helper.after_each
  end

  after(:all) do
    @helper.after_all
  end

  @expected = [
    {:object => '3788304956', :name => 'c2z5izd8w9', :address => '6rd9nv8dml', :industry => 'hxua4d6ttl'},
    {:object => '7480317731', :name => '79nqr7ekzr', :address => 'emv1tezmdf', :industry => '1zg7f7q6ib'},
    {:object => '9897778878', :name => 'n5qx54qcye', :address => 'stzc1x7upn', :industry => '9kdinrjlcx'}]

  @expected_b = [
    {:object => '5277763718', :name => 'c1ekv44ald', :address => 'kohrans65v', :industry => 'ml2ghjs1yk'},
    {:object => '7480317731', :name => '79nqr7ekzr', :address => 'emv1tezmdf', :industry => '1zg7f7q6ib'},
    {:object => '9897778878', :name => 'n5qx54qcye', :address => 'stzc1x7upn', :industry => '9kdinrjlcx'}]

  @expected_s = [
    {:object => '8763523348', :name => '39afj8vbj6', :address => 'x7jincp3xj', :industry => 'sge128jo9o'},
    {:object => '3119932988', :name => '9ayg49v9tx', :address => 'go72f9az69', :industry => 'rwyk7udigr'},
    {:object => '527579259', :name => 'test', :address => 'bcgi7t4e3e', :industry => 'ozjdrljgm2'}]

  def get_expected
    if !USE_HSQLDB
      return @expected_s if $spec_settings[:schema_model]
      return  (System.get_property('platform') == 'WP8') ? @expected_s : @expected
    else
      return @expected if $spec_settings[:schema_model]
      @expected
    end
  end

  it "should support paginate with no options" do
    return if USE_HSQLDB and !$spec_settings[:schema_model]

    3.times do |i|
      @accts = getAccount.paginate(:page => i)
      @accts.length.should == 10 # TODO: BAB => fails for property bag (returns 30)
      @accts[9].object.should == "#{get_expected[i][:object]}"
      @accts[9].name.should == get_expected[i][:name]
      @accts[9].address.should == get_expected[i][:address]
      @accts[9].industry.should == get_expected[i][:industry]
    end

    @accts = getAccount.paginate(:page => 3)
    @accts.length.should == 0
  end

  it "should support paginate with options" do
    @accts = getAccount.paginate(:page => 0, :per_page => 20)

    @accts.length.should == 20 # TODO: BAB => fails for property bag (returns 30)
    @accts[9].object.should == "#{get_expected[0][:object]}"
    @accts[9].name.should == get_expected[0][:name]
    @accts[9].address.should == get_expected[0][:address]
    @accts[9].industry.should == get_expected[0][:industry]
    @accts = getAccount.paginate(:page => 3)
    @accts.length.should == 0
  end

  it "should support paginate with options and conditions" do
    expected_cond = {:object => '3788304956', :name => 'c2z5izd8w9', :address => '6rd9nv8dml', :industry => 'hxua4d6ttl'}

    @accts = getAccount.paginate(:page => 0, :per_page => 20, :conditions => {'name' => 'c2z5izd8w9'})
    @accts.length.should == 1
    @accts[0].object.should == "#{expected_cond[:object]}"
    @accts[0].name.should == expected_cond[:name]
    @accts[0].address.should == expected_cond[:address]
    @accts[0].industry.should == expected_cond[:industry]
  end

  it "should support paginate with options, conditions and order" do
    @accts = getAccount.paginate(:page => 0, :per_page => 1, :conditions => {'name' => 'test'}, :order=> 'name')
    @accts.length.should == 1 # TODO: BAB => fails for property bag (returns 3)

    @accts = getAccount.paginate(:page => 1, :per_page => 1, :conditions => {'name' => 'test'}, :order=> 'name')
    @accts.length.should == 1

    @accts = getAccount.paginate(:page => 2, :per_page => 1, :conditions => {'name' => 'test'}, :order=> 'name')
    @accts.length.should == 1

    @accts = getAccount.paginate(:page => 3, :per_page => 1, :conditions => {'name' => 'test'}, :order=> 'name')
    @accts.length.should == 0
  end

  it "should support paginate with options and order" do
    @accts = getAccount.paginate(:per_page => 20, :order=> 'name')
    @accts.length.should == 20 # TODO: BAB => fails for property bag (returns 30)

    @accts2 = getAccount.paginate(:per_page => 20, :order=> 'name', :page => 1)
    @accts2.length.should == 10

    @accts3 = getAccount.paginate(:per_page => 20, :order=> 'name', :page => 2)
    @accts3.length.should == 0
  end

end
