require 'rhom'
require 'rho/rhoutils'
require 'json'

USE_HSQLDB = !System.get_property('has_sqlite')
unless defined? USE_COPY_FILES
  USE_COPY_FILES = true
  USE_COPY_FILES = false if (defined? RHO_ME || defined? RHO_WP7 || System.get_property('platform') == 'WINDOWS')
end
puts "USE_COPY_FILES: #{USE_COPY_FILES}" # => false

class Test_Helper
  def before_all(tables, folder)
    @tables, @folder = tables, folder
    Rho::RHO.load_all_sources()
    clean_db_data
    @source_map = { 'Account' => 'Account_s', 'Case' => 'Case_s'} if $spec_settings[:schema_model]
    if USE_COPY_FILES
      Rho::RhoUtils.load_offline_data(@tables, @folder, @source_map)
      src_path = Rho::RhoFSConnector::get_db_fullpathname('local')
      if USE_HSQLDB
        src_path.sub!(".sqlite", ".data")
        copy_file( src_path, Rho::RhoFSConnector::get_blob_folder() )
        src_path.sub!(".data", ".script")
        copy_file( src_path, Rho::RhoFSConnector::get_blob_folder() )
      else
        copy_file( src_path, Rho::RhoFSConnector::get_blob_folder() )
      end
    end
  end

  def after_each
    if USE_COPY_FILES
      dst_path = Rho::RhoFSConnector::get_db_fullpathname('local')
      src_path = File.join( Rho::RhoFSConnector::get_blob_folder(), File.basename(dst_path))
      if USE_HSQLDB
        src_path.sub!(".sqlite", ".data")
        copy_file( src_path, File.dirname(dst_path) )
        src_path.sub!(".data", ".script")
        copy_file( src_path, File.dirname(dst_path) )
      else
        copy_file( src_path, File.dirname(dst_path) )
      end
    else
      clean_db_data
    end
  end

  def before_each
    # puts Rho::RhoConfig.sources
    # =>
    # { "Product_s"=>{"sync_type"=>"incremental", "sync_priority"=>2, "schema_version"=>"1.0",
    #   "belongs_to"=>[{"quantity"=>"Customer_s"}, {"sku"=>"Customer_s"}],
    #   "schema"=>{"property"=>{"brand"=>[:string, nil], "created_at"=>[:string, nil], "name"=>[:string, nil],
    #                           "price"=>[:string, nil], "quantity"=>[:string, nil], "sku"=>[:string, nil], "updated_at"=>[:string, nil]}},
    #   "name"=>"Product_s", :loaded=>true, "partition"=>"user", "str_associations"=>"", "str_blob_attribs"=>"", "source_id"=>3},
    # ...
    # }
    Rho::RhoUtils.load_offline_data(@tables, @folder, @source_map) unless USE_COPY_FILES
  end

  def after_all
  end
end

describe "Rhom::RhomObject" do
  @use_new_orm = begin Rho::RHO.use_new_orm rescue false end
  puts "Rhom specs: use_new_orm: #{@use_new_orm}"

  before(:all) do
    # puts " -- before all"
    # puts Rho::RhoConfig.sources
    # =>
    # { "Product_s"=>{:loaded=>false, :file_path=>"Product_s/product_s", "name"=>"Product_s"},
    #   "Product"=>{:loaded=>false, :file_path=>"Product/product", "name"=>"Product"},
    #   "Customer_s"=>{:loaded=>false, :file_path=>"Customer_s/customer_s", "name"=>"Customer_s"},
    #   "Customer"=>{:loaded=>false, :file_path=>"Customer/customer", "name"=>"Customer"},
    #   "Case_s"=>{:loaded=>false, :file_path=>"Case_s/case_s", "name"=>"Case_s"},
    #   "Case"=>{:loaded=>false, :file_path=>"Case/case", "name"=>"Case"},
    #   "Account_s"=>{:loaded=>false, :file_path=>"Account_s/account_s", "name"=>"Account_s"},
    #   "Account"=>{:loaded=>false, :file_path=>"Account/account", "name"=>"Account"}}
    # puts " -- before all"
    @helper = Test_Helper.new
    @helper.before_all(['client_info','object_values'], 'spec')
    unless @use_new_orm
      if $spec_settings[:sync_model]
        Rho::RhoConfig.sources[getAccount.to_s]['sync_type'] = 'incremental'
        Rho::RhoConfig.sources[getCase.to_s]['sync_type'] = 'incremental'
      end
    end
  end

  before(:each) do
    @helper.before_each
  end

  after(:each) do
    @helper.after_each
  end

  # after(:all) do
  #   @helper.after_all
  # end

  it "should dynamically assign values" do
    account = getAccount.new

    account.name = 'hello name'
    account.industry = 'hello industry'
    account.object = '3560c0a0-ef58-2f40-68a5-fffffffffffff'

    account.name.should == 'hello name'
    account.industry.should == 'hello industry'
    account.object.should == '3560c0a0-ef58-2f40-68a5-fffffffffffff'
  end

  # FIXME: broken for property bag!
  it "should retrieve an object of model`" do
    results = getCase.find(:all)
    results.length.should == 1 # *** FAIL: Rhom::RhomObject - Expected 3 to equal 1

    res = getTestDB.select_from_table('sources','source_id', {"name" => getCase.to_s})
    source_id = res[0]['source_id']
    object = results[0].object
    if $spec_settings[:schema_model]
      res = getTestDB().select_from_table(getCase.to_s, "*")
      case_number = res[0]["case_number"]
    else
      res = getTestDB().select_from_table('object_values',"*", {"source_id"=> source_id, "object" => object, "attrib" => "case_number"})
      case_number = res[0]["value"]
    end
    results[0].case_number.should == case_number
  end

  # FIXME:
  it "should retrieve all objects of model" do
    results = getAccount.find(:all, :order => 'name', :orderdir => "DESC")
    results.length.should == 2 # *** FAIL: Expected 3 to equal 2 (for Property bag)
    results[0].name.should >= results[1].name
    results[0].industry.should == results[1].industry
  end

  # FIXME: find_all alias for New ORM
  it "should respond to find_all method and retrieve all objects of model" do
    params = { :order => 'name', :orderdir => "DESC" }
    results = (@use_new_orm) ? getAccount.find(:all, params) : getAccount.find_all(params)
    results.length.should == 2 # *** FAIL: Expected 3 to equal 2 (for Property bag)
    results[0].name.should >= results[1].name
    results[0].industry.should == results[1].industry
  end

  it "should raise Exception error if nil given as a find argument" do
    lambda{ getAccount.find(nil) }.should raise_error(Exception)
  end

unless @use_new_orm
  # FIXME: Very corner case. Do we need it?
  # *** FAIL: Rhom::RhomObject - Expected "\x01\x02\x03" to equal "\x01\x02\x03\x00\x058\x06\a\x1C"
  it "should save string with zeroes" do
    #val = "\1\2\3\0\5\8\6\7\34"
    val = "\x01\x02\x03\x00\x058\x06\a\x1C"
    item = getAccount.create(:industry => Rho::RhoSupport::binary_encode(val))
    item2 = getAccount.find(item.object)
    Rho::RhoSupport::binary_decode(item2.industry).should == val
  end
end

  # FIXME:
  it "should create multiple records offline" do
    vars = {"name"=>"foobarthree", "industry"=>"entertainment"}
    getAccount.changed?.should == false

    account = getAccount.create(vars)
    if $spec_settings[:sync_model]
      getAccount.changed?.should == true # Expected false to equal true
      account.changed?.should == true
    end

    acct = getAccount.find(account.object)
    acct.name.should == 'foobarthree'
    acct.industry.should == 'entertainment'

    account = getAccount.new
    obj = account.object
    account.name = 'foobarfour'
    account.industry = 'solar'
    account.save

    acct = getAccount.find(obj)
    acct.name.should == 'foobarfour'
    acct.industry.should == 'solar'
  end

  it "should update attribs while save" do
    records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
    records.length.should == 0

    acct = getAccount.find(:first)
    obj_id = acct.object
    acct.name = 'soccer'
    acct.save
    acct2 = getAccount.find(obj_id)
    acct2.name.should == 'soccer'

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 1 # FIXME: Expected 0 to equal 1
    end
  end

  it "should create multiple records with unique ids" do
    ids = []
    10.times do |i|
      vars = {"name"=>"some_new_record_#{rand.to_s}", "industry"=>"electronics_#{rand.to_s}"}
      @acct = getAccount.create(vars)
      ids << @acct.object
      @acct = getAccount.find(ids[i])
      @acct.name.should == vars['name']
      @acct.industry.should == vars['industry']
    end
    ids.uniq.length.should == 10
  end

  it "should create a record, then update attributes" do
    vars = {"name"=>"some new record", "industry"=>"electronics"}
    @account1 = getAccount.create(vars)
    new_id = @account1.object
    @account2 = getAccount.find(new_id)
    @account2.object.should =="#{@account1.object}"
    @account2.name.should == vars['name']
    @account2.industry.should == vars['industry']

    update_attributes = {"industry"=>"electronics2"}
    @account2.update_attributes(update_attributes)

    @account3 = getAccount.find(new_id)
    @account3.object.should =="#{@account1.object}"
    @account3.name.should == vars['name']
    @account3.industry.should == update_attributes['industry']

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'create')
      records.length.should == 1  # FIXME: Expected 0 to equal 1
      records[0]['attrib'].should == 'object'

      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 0
    end
  end

  it "should create a record, then update it by saving edited object" do
    vars = {"name"=>"some new record"}
    @account1 = getAccount.create(vars)
    new_id = @account1.object
    @account2 = getAccount.find(new_id)
    @account2.object.should =="#{@account1.object}"
    @account2.name.should == vars['name']

    update_attributes = {"industry"=>"electronics2"}
    @account2.industry = update_attributes['industry']
    @account2.save

    @account3 = getAccount.find(new_id)
    @account3.object.should =="#{@account1.object}"
    @account3.name.should == vars['name']
    @account3.industry.should == update_attributes['industry']

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'create')
      records.length.should == 1  # FIXME: Expected 0 to equal 1
      records[0]['attrib'].should == 'object'

      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 0
    end
  end

  it "should partially update a record" do
    new_attributes = {"name"=>"Mobio US"}
    @account  = getAccount.find("44e804f2-4933-4e20-271c-48fcecd9450d")
    @account.update_attributes(new_attributes)
    @new_acct = getAccount.find("44e804f2-4933-4e20-271c-48fcecd9450d")

    @new_acct.name.should == "Mobio US"
    @new_acct.industry.should == "Technology"

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 1
    end
  end

  it "should fully update a record" do
    new_attributes = {"name"=>"Mobio US", "industry"=>"Electronics"}
    @account = getAccount.find(:first)
    @account.update_attributes(new_attributes)
    @account.name.should == "Mobio US"
    @account.industry.should == "Electronics"

    @new_acct = getAccount.find(:first)

    @new_acct.name.should == "Mobio US"
    @new_acct.industry.should == "Electronics"

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 2
    end
  end

  it "should empty attrib in a record" do
    new_attributes = {"name"=>""}
    @account = getAccount.find("44e804f2-4933-4e20-271c-48fcecd9450d")
    @account.name.should_not == ""
    @account.update_attributes(new_attributes)
    @new_acct = getAccount.find("44e804f2-4933-4e20-271c-48fcecd9450d")
    @new_acct.name.should == ""
    @new_acct.industry.should == "Technology"

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 1
    end

  end

  # FIXME:
  it "should create a record diff case name" do
    item = getAccount.create( 'propOne'=>'1', 'TwoProps'=>'2')
    item.propOne.should == '1'
    item.TwoProps.should == '2'

    item2 = getAccount.find(item.object)
    item.vars.should == item2.vars

    item2.propOne.should == '1'
    item2.TwoProps.should == '2'

    new_attributes  = {'propOne'=>'4', 'TwoProps'=>'3'}
    item2.update_attributes(new_attributes)

    item3 = getAccount.find(item.object)
    item3.propOne.should == new_attributes['propOne']
    item3.TwoProps.should == new_attributes['TwoProps']
  end

  it "should make new record diff case name" do
    new_attributes  = {'propOne'=>'1', 'TwoProps'=>'2'}
    item = getAccount.new( new_attributes )
    item.propOne.should == '1'
    item.TwoProps.should == '2'
    item.save

    item2 = getAccount.find(item.object)

    # FIXME: old orm returns
    puts "BAB: #{getAccount}"
    puts "item.vars.inspect:"
    puts item.vars.inspect
    # => {:object=>"160226845285978.9", :source_id=>40005, :propOne=>"1", :TwoProps=>"2"}
    puts "item2.vars.inspect:"
    puts item2.vars.inspect
    # => {:source_id=>40005, :object=>"160226845285978.9", :propOne=>"1", :TwoProps=>"2"}
    # but new orm does not return source_id!
    # {:TwoProps=>"2", :object=>"1328537541", :propOne=>"1", :source_id=>"40001"}
    # {:TwoProps=>"2", :object=>"1328537541", :propOne=>"1"}

    item.vars.should == item2.vars

    item2.propOne.should == '1'
    item2.TwoProps.should == '2'

    item2.propOne = '3'
    item2.TwoProps = '4'
    item2.save

    item3 = getAccount.find(item.object)
    item3.propOne.should == item2.propOne
    item3.TwoProps.should == item2.TwoProps
  end

  it "should update a record  diff case name" do
    new_attributes = {"name"=>"Mobio US"}
    @account = getAccount.find("44e804f2-4933-4e20-271c-48fcecd9450d")
    @account.update_attributes(new_attributes)
    @new_acct = getAccount.find("44e804f2-4933-4e20-271c-48fcecd9450d")
    @new_acct.name.should == "Mobio US"
    @new_acct.industry.should == "Technology"

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 1
    end
  end

  it "should update a record with full mode" do
    records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
    records.length.should == 0

    new_attributes = {"created_by_name"=>"evgeny"}
    @case = getCase.find("41a4e1f1-2c0c-7e51-0495-4900dc4c072c")
    @case.update_attributes(new_attributes)
    @new_case = getCase.find("41a4e1f1-2c0c-7e51-0495-4900dc4c072c")
    @new_case.created_by_name.should == "evgeny"

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 1
      records[0]['attrib'].should == 'created_by_name'
    end
  end

  it "should save a record with full mode" do
    records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
    records.length.should == 0

    @case = getCase.find("41a4e1f1-2c0c-7e51-0495-4900dc4c072c")
    @case.created_by_name = "evgeny"
    @case.save

    @new_case = getCase.find("41a4e1f1-2c0c-7e51-0495-4900dc4c072c")
    @new_case.created_by_name.should == "evgeny"

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 1
      records[0]['attrib'].should == 'created_by_name'
    end
  end

  it "should set <something>_type_<something> or <something>_object_<something> field for a record" do
    new_attributes = {"account_type"=>"Partner",
                      "type_acct"=>"Customer",
                      "object_acct"=>"new object",
                      "acct_object"=>"same object"}
    @account = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')
    @account.update_attributes(new_attributes)

    @new_acct = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')

    @new_acct.name.should == "Mobio India"
    @new_acct.account_type.should == "Partner"
    @new_acct.type_acct.should == "Customer"
    @new_acct.object_acct.should == "new object"
    @new_acct.acct_object.should == "same object"
  end

  it "should _NOT_ set 'attrib_type' field for a record" do
    unless $spec_settings[:schema_model]
      new_attributes = {"attrib_type"=>"Partner"}
      @account = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')
      @account.update_attributes(new_attributes)

      @new_acct = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')

      @new_acct.name.should == "Mobio India"
      @new_acct.instance_variables.each do |var|
          var.to_s.gsub(/@/,'').match('\btype\b').should be_nil
      end
    else

    end
  end

  it "should update an attribute that was previously nil" do
    new_attributes = {"new_name"=>"Mobio Europe"}
    @account = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')
    @account.update_attributes(new_attributes)

    @new_acct = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')

    @new_acct.new_name.should == "Mobio Europe"
    @new_acct.name.should == "Mobio India"
    @new_acct.industry.should == "Technology"
  end

  #it "should update an attribute to nil" do
  #  new_attributes = {"name"=>nil}
  #  @account = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')
  #  @account.update_attributes(new_attributes)

  #  @new_acct = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')

  #  @new_acct.name.should be_nil
  #  @new_acct.industry.should == "Technology"
  #end

  it "should update an attribute to empty string" do
    new_attributes = {"name"=>""}
    @account = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')
    @account.update_attributes(new_attributes)

    @new_acct = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')

    @new_acct.name.should == ""
    @new_acct.industry.should == "Technology"
  end

  it "should save an attribute to empty string" do
    @account = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')
    @acct.name.should_not == ""
    @account.name = ""
    @account.save

    @new_acct = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')

    @new_acct.name.should == ""
    @new_acct.industry.should == "Technology"
  end

  it "should store only last updated value for attrib" do
    object_id = '44e804f2-4933-4e20-271c-48fcecd9450d'
    new_attributes1 = {"new_name"=>"Mobio Europe"}
    @account = getAccount.find(object_id)
    @account.update_attributes(new_attributes1)
    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 1
    end

    @new_acct = getAccount.find(object_id)

    @new_acct.new_name.should == "Mobio Europe"
    @new_acct.name.should == "Mobio India"
    @new_acct.industry.should == "Technology"

    new_attributes2 = {"new_name"=>"Mobio Asia"}
    @account = getAccount.find(object_id)
    @account.update_attributes(new_attributes2)
    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 1
    end

    @new_acct = getAccount.find(object_id)

    @new_acct.new_name.should == "Mobio Asia"
    @new_acct.name.should == "Mobio India"
    @new_acct.industry.should == "Technology"
    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', 'update_type' => 'update')
      records.length.should == 1
    end
  end

  # FIXME:
  it "should update record with time field" do
    @acct = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')

    # FIXME: The following line does not work
    # @acct.update_attributes(:last_checked =>Time.now())
    # But this one ok if time passed as string
    @acct.update_attributes( :last_checked => Time.now.to_s )

    @accts = getAccount.find(:all,
      :conditions => { {:name=>'last_checked', :op=>'>'}=>(Time.now-(10*60)).to_i() } )

    @accts.length.should == 1
    @accts[0].object.should == '44e804f2-4933-4e20-271c-48fcecd9450d'
  end

  it "should return an empty value for a non-existent attribute" do
    @acct = getAccount.find('44e804f2-4933-4e20-271c-48fcecd9450d')
    @acct.foobar.should be_nil
  end

  #
  # Find examples
  it "should find with conditions" do
    @accts = getAccount.find(:all, :conditions => {'industry' => 'Technology'}, :order => 'name', :orderdir => "desc")
    @accts.length.should == 2
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
    @accts[1].name.should == "Aeroprise"
    @accts[1].industry.should == "Technology"
  end

  it "should find with multiple conditions" do
    @accts = getAccount.find(:all, :conditions => {'name' => 'Mobio India', 'industry' => 'Technology'})
    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  it "should find with advanced OR conditions" do
    query = '%IND%'
    @accts = getAccount.find( :all,
       :conditions => {
        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query},
        :op => 'OR', :select => ['name','industry'])

    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  it "should find with advanced OR conditions with order" do
    query = '%IND%'
    @accts = getAccount.find( :all,
      :conditions => {
        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query},
         :op => 'OR', :select => ['name','industry'],
         :order=>'name', :orderdir=>'DESC' )

    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  it "should NOT find with advanced OR conditions" do
    query = '%IND33%'
    @accts = getAccount.find( :all,
      :conditions => {
        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query},
         :op => 'OR', :select => ['name','industry'])

    @accts.length.should == 0
  end

  it "should find with advanced AND conditions" do
    query = '%IND%'
    query2 = '%chnolo%' #LIKE is case insensitive by default
    @accts = getAccount.find( :all,
       :conditions => {
        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query2
       },
       :op => 'AND',
       :select => ['name','industry'])

    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  it "should find with advanced AND conditions with order" do
    query = '%IND%'
    query2 = '%chnolo%' #LIKE is case insensitive by default
    @accts = getAccount.find( :all,
       :conditions => {
        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query2
       },
       :op => 'AND',
       :select => ['name','industry'],
       :order=>'name', :orderdir=>'DESC')

    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  it "should NOT find with advanced AND conditions" do
    query = '%IND123%'
    query2 = '%chnolo%'     #LIKE is case insensitive by default
    @accts = getAccount.find( :all,
       :conditions => {
        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query2},
        :op => 'AND', :select => ['name','industry'])

    @accts.length.should == 0
  end

  it "should count with advanced AND conditions" do
    query = '%IND%'
    query2 = '%chnolo%'     #LIKE is case insensitive by default
    nCount = getAccount.find( :count,
       :conditions => {
        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query2},
        :op => 'AND' )

    nCount.should == 1
  end

  it "should count 0 with advanced AND conditions" do
    query = '%IND123%'
    query2 = '%chnolo%'     #LIKE is case insensitive by default
    nCount = getAccount.find( :count,
       :conditions => {
        {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
        {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query2},
        :op => 'AND')

    nCount.should == 0
  end

  it "should find with advanced AND conditions and non-string value" do
    res = getAccount.find( :all,
       :conditions => {
        {:func=>'length', :name=>'name', :op=>'>'} => 0
       },
       :op => 'AND')

    res.should_not be_nil
    res.length.should  == 2
  end

  it "should search with LIKE" do
    query2 = '%CHNolo%'     #LIKE is case insensitive by default
    nCount = getAccount.find( :count,
       :conditions => {
        {:name=>'industry', :op=>'LIKE'} => query2}
    )

    nCount.should_not == 0
  end

  it "should search with 3 LIKE" do
    getAccount.create({:SurveyID=>"Survey1", :CallID => 'Call1', :SurveyResultID => 'SurveyResult1'})
    getAccount.create({:SurveyID=>"Survey2", :CallID => 'Call2', :SurveyResultID => 'SurveyResult2'})
    getAccount.create({:SurveyID=>"Survey3", :CallID => 'Call3', :SurveyResultID => 'SurveyResult3'})

    shift_callreport = true
    prevresult = getAccount.find(:first, :conditions =>
            {{:func => 'LOWER', :name => 'SurveyID', :op => 'LIKE'} => 'survey%',
            {:func => 'LOWER', :name => 'CallID', :op => 'LIKE'} => 'call%',
            {:func => 'LOWER', :name => 'SurveyResultID', :op => 'LIKE'} => 'surveyresult%'},
            :op => 'AND') if shift_callreport

    prevresult.should_not be_nil
  end

  it "should search with IN array" do
    items = getAccount.find( :all,
       :conditions => {
        {:name=>'industry', :op=>'IN'} => ["Technology", "Technology2"] }
    )
    items.length.should == 2

    items = getAccount.find( :all,
       :conditions => {
        {:name=>'industry', :op=>'IN'} => ["Technology2"] }
    )
    items.length.should == 0
  end

  it "should search with IN string" do
    items = getAccount.find( :all,
       :conditions => {
        {:name=>'industry', :op=>'IN'} => "\"Technology\", \"Technology2\"" }
    )
    items.length.should == 2

    items = getAccount.find( :all,
       :conditions => {
        {:name=>'industry', :op=>'IN'} => "\"Technology2\"" }
    )
    items.length.should == 0
  end

  it "should search with NOT IN array" do
    items = getAccount.find( :all,
       :conditions => {
        {:name=>'industry', :op=>'NOT IN'} => ["Technology1", "Technology2"] }
    )
    items.length.should == 2

    items = getAccount.find( :all,
       :conditions => {
        {:name=>'industry', :op=>'NOT IN'} => ["Technology"] }
    )
    items.length.should == 0
  end

  it "should search with NOT IN string" do
    items = getAccount.find( :all,
       :conditions => {
        {:name=>'industry', :op=>'NOT IN'} => "\"Technology1\", \"Technology2\"" }
    )
    items.length.should == 2

    items = getAccount.find( :all,
       :conditions => {
        {:name=>'industry', :op=>'NOT IN'} => "\"Technology\"" }
    )
    items.length.should == 0
  end

  it "should find with group of advanced conditions" do
    query = '%IND%'
    cond1 = {
       :conditions => {
            {:name=>'name', :op=>'LIKE'} => query,
            {:name=>'industry', :op=>'LIKE'} => query},
       :op => 'OR'
    }
    cond2 = {
        :conditions => {
            {:name=>'description', :op=>'LIKE'} => 'Hello%'}
    }

    @accts = getAccount.find( :all,
       :conditions => [cond1, cond2],
       :op => 'AND',
       :select => ['name','industry','description'])

    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  it "should not find with group of advanced conditions" do
    query = '%IND%'
    cond1 = {
       :conditions => {
            {:func=>'UPPER', :name=>'name', :op=>'LIKE'} => query,
            {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => query},
       :op => 'OR'
    }
    cond2 = {
        :conditions => {
            {:name=>'description', :op=>'LIKE'} => 'Hellogg%'}
    }

    @accts = getAccount.find( :all,
       :conditions => [cond1, cond2],
       :op => 'AND',
       :select => ['name','industry'])

    @accts.length.should == 0

    @accts2 = getAccount.find( :all,
       :conditions => [cond2, cond1],
       :op => 'AND',
       :select => ['name','industry'])

    @accts2.length.should == 0
  end

  it "should find first with conditions" do
    @mobio_ind_acct = getAccount.find(:first, :conditions => {'name' => 'Mobio India'})
    @mobio_ind_acct.name.should == "Mobio India"
    @mobio_ind_acct.industry.should == "Technology"
  end

  it "should order by column" do
    @accts = getAccount.find(:all, :order => 'name')

    @accts.first.name.should == "Aeroprise"
    @accts.first.industry.should == "Technology"
    @accts[1].name.should == "Mobio India"
    @accts[1].industry.should == "Technology"
  end

  it "should desc order by column" do
    @accts = getAccount.find(:all, :order => 'name', :orderdir => 'DESC')

    @accts.first.name.should == "Mobio India"
    @accts.first.industry.should == "Technology"
    @accts[1].name.should == "Aeroprise"
    @accts[1].industry.should == "Technology"
  end

  it "should order by block" do
    @accts = getAccount.find(:all, :order => 'name') do |x,y|
        y <=> x
    end

    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
    @accts[1].name.should == "Aeroprise"
    @accts[1].industry.should == "Technology"

    @accts = getAccount.find(:all, :order => 'name', :orderdir => 'DESC') do |x,y|
        y <=> x
    end

    @accts[0].name.should == "Aeroprise"
    @accts[0].industry.should == "Technology"
    @accts[1].name.should == "Mobio India"
    @accts[1].industry.should == "Technology"

    puts "block without order parameter"
    @accts = getAccount.find(:all) do |item1,item2|
        item2.name <=> item1.name
    end

    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
    @accts[1].name.should == "Aeroprise"
    @accts[1].industry.should == "Technology"

  end

  it "should order by multiple columns" do
    getAccount.create(:name=>'ZMobile', :industry => 'IT', :modified_by_name => 'user')
    getAccount.create(:name=>'Aeroprise', :industry => 'Accounting', :modified_by_name => 'admin')

    @accts = getAccount.find(:all, :order => ['name', 'industry'], :orderdir => ['ASC', 'DESC'])

    @accts.length().should == 4
    @accts[0].name.should == "Aeroprise"
    @accts[0].industry.should == "Technology"
    @accts[1].name.should == "Aeroprise"
    @accts[1].industry.should == "Accounting"
    @accts[2].name.should == "Mobio India"
    @accts[2].industry.should == "Technology"
    @accts[3].name.should == "ZMobile"
    @accts[3].industry.should == "IT"

    puts "multiple order with condition"
    @accts = getAccount.find(:all, :conditions => {:modified_by_name => 'admin'},
        :order => ['name', 'industry'], :orderdir => ['ASC', 'DESC'])

    @accts.length().should == 3
    @accts[0].name.should == "Aeroprise"
    @accts[0].industry.should == "Technology"
    @accts[1].name.should == "Aeroprise"
    @accts[1].industry.should == "Accounting"
    @accts[2].name.should == "Mobio India"
    @accts[2].industry.should == "Technology"

  end

  it "should delete_all" do
    vars = {"name"=>"foobarthree", "industry"=>"entertainment"}
    account = getAccount.create(vars)
    getAccount.count.should > 0
    if $spec_settings[:sync_model]
        records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
        records.length.should == 0

        records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'create'} )
        records.length.should > 0

    end

    getAccount.delete_all
    getAccount.count.should == 0

    if $spec_settings[:sync_model]
        records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
        records.length.should > 0

        records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'create'} )
        records.length.should == 0
    end
  end

  it "should delete_all with conditions" do
    vars = {"name"=>"foobarthree", "industry"=>"entertainment"}
    account = getAccount.create(vars)
    @accts = getAccount.find(:all, :conditions => {'name' => 'Mobio India'})
    @accts.length.should > 0

    if $spec_settings[:sync_model]
        records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
        records.length.should == 0

        records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'create'} )
        records.length.should > 0

    end

    getAccount.delete_all(:conditions => {'name' => 'Mobio India'})

    @accts = getAccount.find(:all, :conditions => {'name' => 'Mobio India'})
    @accts.length.should == 0

    if $spec_settings[:sync_model]
        records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
        records.length.should > 0

        records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'create'} )
        records.length.should > 0

    end

  end

  it "should delete_all with conditions across objects" do
    @accts = getAccount.find(:all, :conditions => {'industry' => 'Technology'})
    @accts.length.should > 0

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
      records.length.should == 0
    end

    getAccount.delete_all(:conditions => {'industry' => 'Technology'})

    @accts = getAccount.find(:all, :conditions => {'industry' => 'Technology'})
    @accts.length.should == 0

    @accts = getAccount.find(:all)

    @accts.length.should == 0

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
      records.length.should > 0
    end
  end

  it "should delete_all not delete from other sources" do
    vars = {"name"=>"Aeroprise"}
    account = getCase().create(vars)

    accts = getAccount.find(:all)
    accts.length.should > 0

    test_cond = {'name' => 'Aeroprise'}
    cases = getCase().find(:all, :conditions => test_cond)
    cases.length.should > 0

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
      records.length.should == 0

      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getCase().get_source_id(), "update_type"=>'create'} )
      records.length.should > 0
    end

    getAccount.delete_all(:conditions => test_cond)
    accts = getAccount.find(:all, :conditions => test_cond)
    accts.length.should == 0

    cases = getCase().find(:all, :conditions => test_cond)
    cases.length.should > 0

    accts = getAccount.find(:all)
    accts.length.should > 0

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
      records.length.should > 0

      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getCase().get_source_id(), "update_type"=>'create'} )
      records.length.should > 0
    end
  end

  # FIXME:
  it "should delete_all with multiple conditions" do
    vars = {"name"=>"Aeroprise", "website"=>"test.com"}
    account = getAccount.create(vars)

    test_cond = {'name' => 'Aeroprise', 'website'=>'aeroprise.com'}
    accts = getAccount.find(:all, :conditions => test_cond)
    accts.length.should == 1 # # FIXME: Expected 4 to equal 1

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
      records.length.should == 0

      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'create'} )
      records.length.should > 0
    end

    getAccount.delete_all(:conditions => test_cond)
    accts = getAccount.find(:all, :conditions => test_cond)
    accts.length.should == 0

    accts = getAccount.find(:all, :conditions => vars)
    accts.length.should == 1

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
      records.length.should > 0

      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'create'} )
      records.length.should == 1
      records[0]['attrib'].should == 'object'
    end
  end

  # FIXME:
  it "should delete_all with advanced conditions" do
    vars = {"name"=>"Aeroprise", "website"=>"test.com"}
    account = getAccount.create(vars)

    test_cond = {{:func=>'UPPER', :name=>'name', :op=>'LIKE'} => 'AERO%',
        {:func=>'UPPER', :name=>'website', :op=>'LIKE'} => 'TEST%'}

    accts = getAccount.find(:all, :conditions => test_cond, :op => 'OR') # FIXME: ArgumentError: wrong number of arguments (2 for 3)
    accts.length.should == 2

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
      records.length.should == 0

      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'create'} )
      records.length.should > 0
    end

    getAccount.delete_all(:conditions => test_cond, :op => 'OR')

    accts = getAccount.find(:all, :conditions => test_cond, :op => 'OR')
    accts.length.should == 0

    accts = getAccount.find(:all, :conditions => vars)
    accts.length.should == 0

    if $spec_settings[:sync_model]
      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'delete'} )
      records.length.should > 0

      records = getTestDB().select_from_table('changed_values','*', {'source_id' => getAccount().get_source_id(), "update_type"=>'create'} )
      records.length.should == 0
    end
  end

  # FIXME:
  it "should not find with advanced condition" do
    vars = {"name"=>"Aeroprise", "website"=>"testaa.com"}
    account = getAccount.create(vars)

    test_cond = {{:func=>'UPPER', :name=>'name', :op=>'LIKE'} => 'AERO%',
        {:func=>'UPPER', :name=>'website', :op=>'LIKE'} => 'TEST'}

    accts = getAccount.find(:all, :select => ['name', 'website'],  :conditions => test_cond, :op => 'OR')
    # ArgumentError: wrong number of arguments (2 for 3)
    accts.length.should > 0
    accts = getAccount.find(:all, :select => ['name', 'website'], :conditions => {{:func=>'UPPER', :name=>'website', :op=>'='} => 'TEST'} )
    accts.length.should == 0
    accts = getAccount.find(:all, :select => ['name', 'website'], :conditions => {{:func=>'UPPER', :name=>'website', :op=>'='} => 'XY'} )
    accts.length.should == 0
    accts = getAccount.find(:all, :select => ['name', 'website'], :conditions => {{:func=>'UPPER', :name=>'website', :op=>'='} => 'AMO'} )
    accts.length.should == 0
    accts = getAccount.find(:all, :select => ['name', 'website'], :conditions => {{:func=>'LOWER', :name=>'website', :op=>'='} => 'test'} )
    accts.length.should == 0
    accts = getAccount.find(:all, :select => ['name', 'website'], :conditions => {{:name=>'website', :op=>'LIKE'} => 'test'} )
    accts.length.should == 0
    accts = getAccount.find(:all, :select => ['name', 'website'], :conditions => {{:name=>'website', :op=>'LIKE'} => 'te'} )
    accts.length.should == 0
    accts = getAccount.find(:all, :select => ['name', 'website'], :conditions => {{:name=>'website', :op=>'LIKE'} => 'om'} )
    accts.length.should == 0
    accts = getAccount.find(:all, :select => ['name', 'website'], :conditions => {{:name=>'website', :op=>'LIKE'} => 'xy'} )
    accts.length.should == 0
 end

  # FIXME: Expected [] to be nil ?
  it "should support blob type" do
    file_name = File.join(Rho::RhoApplication::get_blob_folder, 'MyText123.txt')
    File.delete(file_name) if File.exists?(file_name)
    File.exists?(file_name).should ==  false

    write_data  = "this is blob test"
    f = File.new(file_name, "w")
    f.write(write_data)
    f.close

    File.exists?(file_name).should == true
    blob_name = Rho::Application.relativeDatabaseBlobFilePath(file_name)

    puts "file_name : #{file_name}"
    puts "blob_name : #{blob_name}"

    item = getAccount.create({'my_text'=>blob_name})
    item.my_text.should == blob_name
    File.exists?(file_name).should == true

    item.destroy
    item2 = getAccount.find(item.object)
    if @use_new_orm
      item2.should be_empty
    else
      item2.should be_nil
    end
    File.exists?(file_name).should == false # FIXME: Expected true to equal false
  end

  # FIXME:
  it "should include only selected column without order" do
    @accts = getAccount.find(:all, :select => ['name'] )

    @accts[0].name.should_not be_nil
    @accts[0].industry.should be_nil
    @accts[0].vars.length.should == 3 # Expected 19 to equal 3
  end

  # FIXME:
  it "should include only selected column" do
    @accts = getAccount.find(:all, :select => ['name'], :order => 'name', :orderdir => 'DESC' )

    @accts[0].name.should == "Mobio India"
    # Expected "implement SugarCRM sample app" to equal "Mobio India"
    @accts[0].industry.should be_nil
    @accts[0].vars.length.should == 3
  end

  # FIXME:
  it "should include only selected columns" do
    @accts = getAccount.find(:all, :select => ['name','industry'], :order => 'name', :orderdir => 'DESC')

    @accts[0].name.should == "Mobio India"
    # Expected "implement SugarCRM sample app" to equal "Mobio India"
    @accts[0].industry.should == "Technology"
    @accts[0].shipping_address_street.should be_nil
    @accts[0].vars.length.should == 4
  end

  # FIXME:
  it "should include selected columns and conditions" do
    @accts = getAccount.find(:all, :conditions => {'name' => 'Mobio India'}, :select => ['name','industry'])
    @accts.length.should == 1 # FIXME: Expected 3 to equal 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
    @accts[0].shipping_address_street.should be_nil
    @accts[0].vars.length.should == 4
  end

  #it "should perform find with select and merged conditions" do
  #@accts = getAccount.find(:all, :conditions => {'name' => 'Mobio India'}, :select => ['industry'])
  #@accts.length.should == 1
  #@accts[0].name.should == "Mobio India"
  #@accts[0].industry.should == "Technology"
  #@accts[0].shipping_address_street.should be_nil
  #@accts[0].vars.length.should == 3
  #end

  # FIXME:
  it "should support find with conditions => nil" do
    @accts = getAccount.find(:all, :conditions => {'description' => nil})
    @accts.length.should == 1 # FIXME: Expected 3 to equal 1
    @accts[0].name.should == "Aeroprise"
    @accts[0].industry.should == "Technology"
  end

  # FIXME:
  it "should find with sql multiple conditions" do
    @acct = getAccount.find(:first, :conditions => [ "name = ? AND industry = ?", "'Mobio India'", "'Technology'" ], :select => ['name', 'industry'])
    # FIXME: RuntimeError: no such column: name
    @acct.name.should == "Mobio India"
    @acct.industry.should == "Technology"
  end

  # FIXME:
  it "should support sql conditions arg" do
    @accts = getAccount.find(:all, :conditions => "name = 'Mobio India'", :select => ['name', 'industry'])
    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  # FIXME:
  it "should support simple sql conditions" do
    @accts = getAccount.find(:all, :conditions => ["name = ?", "'Mobio India'"], :select => ['name', 'industry'])
    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  # FIXME:
  it "should support complex sql conditions arg" do
    @accts = getAccount.find(:all, :conditions => "name like 'Mobio%'", :select => ['name', 'industry'])
    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  # FIXME:
  it "should support sql conditions single filter" do
    @accts = getAccount.find(:all, :conditions => ["name like ?", "'Mob%'"], :select => ['name', 'industry'])
    # FIXME: RuntimeError: no such column: name
    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  # FIXME:
  it "should support sql conditions single filter with order" do
    return if USE_HSQLDB

    @accts = getAccount.find(:all, :conditions => ["name like ?", "'Mob%'"], :select => ['name', 'industry'], :order=>'name', :orderdir => 'DESC' )
    # FIXME: RuntimeError: no such column: name
    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  # FIXME:
  it "should support sql conditions with multiple filters" do
    @accts = getAccount.find(:all, :conditions => ["name like ? and industry like ?", "'Mob%'", "'Tech%'"], :select => ['name', 'industry'])
    # FIXME: RuntimeError: no such column: name
    @accts.length.should == 1
    @accts[0].name.should == "Mobio India"
    @accts[0].industry.should == "Technology"
  end

  # FIXME:
  it "should return records when order by is nil for some records" do
    return if USE_HSQLDB

    @accts = getAccount.find(:all, :order => 'shipping_address_country', :dont_ignore_missed_attribs => true, :select => ['name'])
    @accts.length.should == 2 # FIXME: Expected 3 to equal 2

    if ( @accts[1].name == "Aeroprise" )
      @accts[1].name.should == "Aeroprise"
    else
      @accts[0].name.should == "Aeroprise"
    end
  end

  it "should find by sql" do
    if $spec_settings[:schema_model]
      @accts = getAccount.find_by_sql("SELECT * FROM " + getAccount.to_s )
      @accts.length.should == 2

      @accts[0].name.should_not be_nil
      @accts[1].name.should_not be_nil
    end
  end

  it "should find by number" do
    getAccount.create('rating'=>1)
    getAccount.create('rating'=>2)
    getAccount.create('rating'=>3)
    getAccount.create('rating'=>4)
    getAccount.create('rating'=>11)
    getAccount.create('rating'=>12)
    getAccount.create('rating'=>13)
    getAccount.create('rating'=>14)

    size = 3
    @accts = getAccount.find(:all, :conditions => { {:func=> 'CAST', :name=>'rating as INTEGER', :op=>'<'} => size } )
    @accts.length.should == 2 # FIXME: Expected 11 to equal 2
    @accts[0].rating.to_i.should < size
    @accts[1].rating.to_i.should < size

    size = 11
    @accts = getAccount.find(:all, :conditions => { {:func=> 'CAST', :name=>'rating as INTEGER', :op=>'>'} => size } )
    @accts.length.should == 3
    @accts[0].rating.to_i.should > size
    @accts[1].rating.to_i.should > size
    @accts[2].rating.to_i.should > size
  end

#TO FIX in next release. issue in pivotal - 29776177
# FIXME:
if !defined?(RHO_WP7)
  it "should find with sql by number" do
    getAccount.create('rating'=>1)
    getAccount.create('rating'=>2)
    getAccount.create('rating'=>3)
    getAccount.create('rating'=>4)
    getAccount.create('rating'=>11)
    getAccount.create('rating'=>12)
    getAccount.create('rating'=>13)
    getAccount.create('rating'=>14)

    size = 3
    @accts = getAccount.find(:all, :conditions => ["CAST(rating as INTEGER)< ?", "#{size}"], :select => ['rating'] )
    # FIXME: RuntimeError: no such column: rating
    @accts.length.should == 2
    @accts[0].rating.to_i.should < size
    @accts[1].rating.to_i.should < size

    size = 11
    @accts = getAccount.find(:all, :conditions => ["CAST(rating as INTEGER)> ?", "#{size}"], :select => ['rating'] )
    @accts.length.should == 3
    @accts[0].rating.to_i.should > size
    @accts[1].rating.to_i.should > size
    @accts[2].rating.to_i.should > size
  end
end

  # FIXME:
  it "should complex find by number" do
    getAccount.create('rating'=>1)
    getAccount.create('rating'=>2)
    getAccount.create('rating'=>3)
    getAccount.create('rating'=>4)
    getAccount.create('rating'=>11)
    getAccount.create('rating'=>12)
    getAccount.create('rating'=>13)
    getAccount.create('rating'=>14)

    size = 3
    @accts = getAccount.find(:all,
        :conditions => {
         {:func=> 'CAST', :name=>'rating as INTEGER', :op=>'<'} => size,
         {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => '%ZERO%'},
         :op => 'OR' ) # FIXME: ArgumentError: wrong number of arguments (2 for 3)

    @accts.length.should == 2
    @accts[0].rating.to_i.should < size
    @accts[1].rating.to_i.should < size

    size = 11
    @accts = getAccount.find(:all,
        :conditions => {
         {:func=> 'CAST', :name=>'rating as INTEGER', :op=>'>'} => size,
         {:func=>'UPPER', :name=>'industry', :op=>'LIKE'} => '%ZERO%'},
         :op => 'OR' )

    @accts.length.should == 3
    @accts[0].rating.to_i.should > size
    @accts[1].rating.to_i.should > size
    @accts[2].rating.to_i.should > size
  end

  it "should find by non-string fields" do
    if $spec_settings[:schema_model]
      item = getAccount.create( {:new_name => 'prod1', :float_test => 2.3, :date_test => 123, :time_test => 678} )
      item.float_test.is_a?(Float).should == true
      item.date_test.is_a?(Integer).should == true
      item.time_test.is_a?(Integer).should == true

      items = getAccount.find(:all, :conditions => {:float_test => 2.3} )
      items.should_not be_nil
      items.length.should == 1
      item2 = items[0]

      item2.object.should == item.object
      item2.float_test.is_a?(Float).should == true
      item2.date_test.is_a?(Integer).should == true
      item2.time_test.is_a?(Integer).should == true

      items = getAccount.find(:all, :conditions => { {:name=>'float_test', :op=>'<'}=> 53 } )
      items.should_not be_nil
      items.length.should == 1
      item2 = items[0]

      item2.object.should == item.object
      item2.float_test.is_a?(Float).should == true
      item2.date_test.is_a?(Integer).should == true
      item2.time_test.is_a?(Integer).should == true
    end
  end


  # FIXME:
  it "should find by object" do
    accts = getAccount.find(:all,:conditions=>
        {
            { :name => "object", :op =>"IN" } => ['44e804f2-4933-4e20-271c-48fcecd9450d','63cf13da-cff4-99e7-f946-48fcec93f1cc']
        }
    )
    accts.length.should == 2 # Expected 3 to equal 2

    accts = getAccount.find(:all,:conditions=>
        {
            { :name => "object", :op =>"IN" } => ['1','2','3']
        }
    )
    accts.length.should == 0

  end

  # FIXME:
  it "should complex find by object" do
    accts = getAccount.find(:all,:conditions=> {
            { :name => "object", :op =>"IN" } => ['44e804f2-4933-4e20-271c-48fcecd9450d','63cf13da-cff4-99e7-f946-48fcec93f1cc'],
            { :name => "name" } => 'Mobio India'
        }
    )
    accts.length.should == 1 # Expected 3 to equal 1

    accts = getAccount.find(:all,:conditions=>{
            { :name => "object", :op =>"IN" } => ['1','2','3'],
            { :name => "name" } => 'Mobio India'
        }
    )
    accts.length.should == 0
  end

=begin
if !defined?(RHO_WP7)
  # FIXME:
  it "should not add property to freezed model" do
    # TODO: Rho::RhoConfig.sources and 'freezed'
    if !$spec_settings[:schema_model]
        props = Rho::RhoConfig.sources()[getCase.to_s]
        props['freezed'] = true
        #props['property'].should_not be_nil
        #props['property']['description'].should_not be_nil
        # puts "************* 1:"
        # puts props.inspect
        # puts "************* 1:"
    end

    lambda { obj = getCase().new( :wrong_address => 'test') }.should raise_error(ArgumentError)
    lambda { obj = getCase().create( :wrong_address => 'test') }.should raise_error(ArgumentError)

    lambda {
        obj = getCase().new
        obj.wrong_address = 'test'
    }.should raise_error(ArgumentError)

    lambda {
        obj = getCase().new
        obj.update_attributes(:wrong_address => 'test')
    }.should raise_error(ArgumentError)

    if $spec_settings[:schema_model]
        lambda {
            getCase().find_by_sql("INSERT INTO #{getCase.to_s()}(object,wrong_address) values ('1234', 'my_addr')")
        }.should raise_error(ArgumentError)
    end
  end
end

  # FIXME:
  it "should add property to freezed model" do
    # TODO: Rho::RhoConfig.sources and 'freezed'
    if !$spec_settings[:schema_model]
      props = Rho::RhoConfig.sources()[getCase.to_s]
      props['freezed'] = true
    end

    obj = getCase().new( :description => 'test')
    obj.description.should == "test"

    obj1 = getCase().create( :description => 'test1')
    obj1.description.should == "test1"
    res1 = getCase().find(obj1.object)
    res1.should_not be_nil
    res1.description.should == "test1"

    obj2 = getCase().new
    obj2.description = 'test2'
    obj2.save()
    res2 = getCase().find(obj2.object)
    res2.should_not be_nil
    res2.description.should == "test2"

    obj3 = getCase().new
    obj3.update_attributes(:description => 'test3')
    obj3.description.should == "test3"
    res3 = getCase().find(obj3.object)
    res3.should_not be_nil
    res3.description.should == "test3"

    if $spec_settings[:schema_model]
      getCase().find_by_sql("INSERT INTO #{getCase.to_s}(object,description) values ('1234', 'my_addr')")
      res4 = getCase().find('1234')
      res4.should_not be_nil
      res4.description.should == "my_addr"
    end
  end
=end
end # "Rhom::RhomObject"


# TODO: Add pagination fixtures (spec/pagination)
=begin
describe "Rhom#paginate" do

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

		if  System.get_property('platform') == 'WP8'
			return @expected_s
		else
			return @expected
		end
else
        return @expected if $spec_settings[:schema_model]

        @expected #_b
end
    end

    it "should support paginate with no options" do
      return if USE_HSQLDB and !$spec_settings[:schema_model]

      3.times do |x|
        @accts = getAccount.paginate(:page => x)
        @accts.length.should == 10
        @accts[9].object.should == "#{get_expected[x][:object]}"
        @accts[9].name.should == get_expected[x][:name]
        @accts[9].address.should == get_expected[x][:address]
        @accts[9].industry.should == get_expected[x][:industry]
      end
      @accts = getAccount.paginate(:page => 3)
      @accts.length.should == 0
    end

    it "should support paginate with options" do
      @accts = getAccount.paginate(:page => 0, :per_page => 20)
      @accts.length.should == 20
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
      @accts.length.should == 1

      @accts = getAccount.paginate(:page => 1, :per_page => 1, :conditions => {'name' => 'test'}, :order=> 'name')
      @accts.length.should == 1

      @accts = getAccount.paginate(:page => 2, :per_page => 1, :conditions => {'name' => 'test'}, :order=> 'name')
      @accts.length.should == 1

      @accts = getAccount.paginate(:page => 3, :per_page => 1, :conditions => {'name' => 'test'}, :order=> 'name')
      @accts.length.should == 0
    end

    it "should support paginate with options and order" do
      @accts = getAccount.paginate(:per_page => 20, :order=> 'name')
      @accts.length.should == 20

      @accts2 = getAccount.paginate(:per_page => 20, :order=> 'name', :page => 1)
      @accts2.length.should == 10

      @accts3 = getAccount.paginate(:per_page => 20, :order=> 'name', :page => 2)
      @accts3.length.should == 0
    end

    it "should assign metadata" do
      meta = {"foo" => "bar"}
      getAccount.metadata = meta.to_json
      getAccount.metadata.should == meta
    end
end

=end