require 'rho/rhocontroller'
require 'helpers/browser_helper'
require 'rho/rhocontact'

class ContactsController < Rho::RhoController
  include BrowserHelper

  # GET /Contacts
  def index
    @offset = 0;
    puts @contact = Rho::RhoContact.find(:all)
    render :back => '/app'
  end

  # GET /Contacts/1
  def show
    @contact = Rho::RhoContact.find(@params['id'])
    render :action => :show
  end
 
  # GET /Contacts/new
  def new
    render :action => :new
  end
 
  # GET /Contacts/1/edit
  def edit
    @contact = Rho::RhoContact.find(@params['id'])
    render :action => :edit
  end
 
  # POST /Contacts
  def create
    @contact = Rho::RhoContact.create!(@params['contact'])
    redirect :action => :index
  end
 
  # POST /Contacts/1
  def update
    puts @params['contact'].inspect
    Rho::RhoContact.update_attributes(@params['contact'])
    redirect :action => :index
  end
 
  # POST /Contacts/1/delete
  def delete
    Rho::RhoContact.destroy(@params['id'])
    redirect :action => :index
  end
  
  def createRandContacts
    o =  [('a'..'z'),('A'..'Z')].map{|i| i.to_a}.flatten
    p =  [('A'..'Z')].map{|i| i.to_a}.flatten 
    $conFirstName = (0...5).map{ o[rand(o.length)] }.join
    $conLastName = (0...5).map{ o[rand(o.length)] }.join
    $conMobNum = rand(10 ** 10).to_s.rjust(10,'0')
    $conBusNum = rand(10 ** 10).to_s.rjust(10,'0')
    $concoreId =  (0...3).map{ p[rand(p.length)] }.join + rand(3 ** 3).to_s.rjust(3,'0')
    $conEmail = $concoreId + "@motorolasolutions.com"
    $conComp = "Motorola Solutions"
  end
  
  # Test Case ID VT229-0003
  def createContact(k = 0)
    puts $testCaseID = "VT229-0003"
    contacts = []
    for i in 0..k
      createRandContacts
      contacts << {"first_name" =>$conFirstName, "last_name" =>$conLastName, "mobile_number" =>$conMobNum, "business_number" =>$conBusNum, "email_address" =>$conEmail, "company_name" =>$conComp}
    end
    puts "Value of local variable is #{contacts}" 
    
    contacts.each do |contact|
      Rho::RhoContact.create! contact
    end
    redirect :action => :index  
  end
  
  # Test Case ID VT229-0004
  def create_find
    puts $testCaseID = "VT229-0004"
    con_remove
    createContact 10
    @contact = Rho::RhoContact.find(:all)
    puts "Contacts Are" + @contact.inspect
    redirect :action => :index
  end
  
  # Test Case ID VT229-0006
  def find_perpage
    $testCaseID = "VT229-0006"
    con_remove
    createContact 20
    puts @contact = Rho::RhoContact.find(:all, :per_page => 5, :offset => @offset, :select => ["id", "display_name", "first_name", "last_name", "mobile_number"])
    redirect :action => :index
  end
  
  # Test Case ID VT229-0006
  def find_perpage_2
    $testCaseID = "VT229-0006"
    con_remove
    createContact 20
    puts @contact = Rho::RhoContact.find(:all, :per_page => 5, :offset => 0, :select => ["id", "display_name", "first_name", "last_name", "mobile_number"])
    redirect :action => :index
  end
  
    # Test Case ID VT229-0007
    def find_offset
      $testCaseID = "VT229-0007"
      con_remove
      createContact 20
      puts @contact = Rho::RhoContact.find(:all, :per_page => 5, :offset => 5, :select => ["id", "display_name", "first_name", "last_name", "mobile_number"])
      redirect :action => :index
    end
    
    # Test Case ID VT229-0011
    def find_first
        $testCaseID = "VT229-0011"
        con_remove
        createContact 20
      puts @contact =  Rho::RhoContact.find(:first)
        redirect :action => :index
    end
    
    # Test Case ID VT229-0012
    def max_results
        $testCaseID = "VT229-0012"
      con_remove
        createContact 20
        
        @count =  Rho::RhoContact.find(:count,:max_results)
        puts @count
        Alert.show_status('Contacts',@count,'hide')
        redirect :action => :index
    end

    # Test Case ID VT229-0013
    def contact_select
        $testCaseID = "VT229-0013"
      con_remove
        createContact 20
        @contact = Rho::RhoContact.find(:all, :select => ["id", "last_name"], :conditions => {:phone => 'not_nil'})
        puts @contact
        redirect :action => :index
    end
    
    # Test Case ID VT229-0015
    def contact_select_all
        $testCaseID = "VT229-0015"
      con_remove
        createContact 20
      puts @contact = Rho::RhoContact.find(:all, :per_page => 5, :offset => 5, :select => ["id", "display_name", "first_name", "last_name", "mobile_number"])
        puts @contact
        redirect :action => :index
    end
    
    # Test Case ID VT229-0017
    def contact_condition_not_nil
        $testCaseID = "VT229-0017"
      con_remove
        createContact 20
        @count = Rho::RhoContact.find(:count, :conditions => {:phone => 'not_nil'})
        puts @count
        Alert.show_status('Count',@count,'hide')
        redirect :action => :index
    end
    
  # Test Case ID VT229-0018
  def contact_condition_is_nil
    con_remove
      createContact 20
      @count = Rho::RhoContact.find(:count, :conditions => {:phone => 'is_nil'})
      puts @count
      Alert.show_status('Count',@count,'hide')
      redirect :action => :index
  end
  
  # Test Case ID VT229-0019
  def contact_mix
    $testCaseID = "VT229-0019"
    con_remove
    createContact 20
    @contact = Rho::RhoContact.find(:all, :per_page => 5, :offset => 5, :select => ["id", "last_name"], :conditions => {:phone => 'not_nil', :email => 'not_nil'})
    puts @contact
    redirect :action => :index
  end
  
  # Test Case ID VT229-0020
  def contact_mix_2
    $testCaseID = "VT229-0020"
    con_remove
    createContact 20
    @contact = Rho::RhoContact.find(:all, :per_page => 5, :offset => 5, :select => ["id", "last_name"], :conditions => {:phone => 'is_nil', :email => 'is_nil'})
    puts @contact
    redirect :action => :index
  end
  
def test_remove
  if System::get_property('platform') == "ANDROID"
      contacts = Rho::RhoContact.find :all, :select => ["last_name"]
  else
      contacts = Rho::RhoContact.find :all
  end

  if contacts
    contacts.each do |contact|
      if contact[1]["last_name"] == "RhoTest"
        Rho::RhoContact.destroy(contact[1]['id'])
      end
    end
  end

  redirect :action => :index
end

def con_remove
  puts contact = Rho::RhoContact.find(:all)

  if contact
    contact.each do |con|
        Rho::RhoContact.destroy(con[1]['id'])
    end
  end
end

def con_remove_all
  puts contact = Rho::RhoContact.find(:all)
  if contact
    contact.each do |con|
        Rho::RhoContact.destroy(con[1]['id'])
    end
  end
  redirect :action => :index
end

def test_create
  contacts = []
  contacts << {"first_name" => "A.", "last_name" => "RhoTest", "mobile_number" => "+12345678091"}
  contacts << {"first_name" => "B.", "last_name" => "RhoTest", "mobile_number" => "+12345678092"}
  contacts << {"first_name" => "C.", "last_name" => "RhoTest", "mobile_number" => "+12345678093"}
  contacts << {"first_name" => "D.", "last_name" => "RhoTest", "mobile_number" => "+12345678094"}
  contacts << {"first_name" => "E.", "last_name" => "RhoTest", "mobile_number" => "+12345678095"}
  contacts << {"first_name" => "F.", "last_name" => "RhoTest", "mobile_number" => "+12345678096"}
  contacts << {"first_name" => "G.", "last_name" => "RhoTest", "mobile_number" => "+12345678097"}
  contacts << {"first_name" => "H.", "last_name" => "RhoTest", "mobile_number" => "+12345678098"}
  contacts << {"first_name" => "I.", "last_name" => "RhoTest", "mobile_number" => "+12345678099"}
  contacts << {"first_name" => "J.", "last_name" => "RhoTest", "mobile_number" => "+12345678100"}
  contacts << {"first_name" => "K.", "last_name" => "RhoTest", "mobile_number" => "+12345678101"}
  contacts << {"first_name" => "L.", "last_name" => "RhoTest", "mobile_number" => "+12345678102"}
  contacts << {"first_name" => "M.", "last_name" => "RhoTest", "mobile_number" => "+12345678103"}
  contacts << {"first_name" => "N.", "last_name" => "RhoTest", "mobile_number" => "+12345678104"}
  contacts << {"first_name" => "O.", "last_name" => "RhoTest", "mobile_number" => "+12345678105"}
  contacts << {"first_name" => "P.", "last_name" => "RhoTest", "mobile_number" => "+12345678106"}
  contacts << {"first_name" => "Q.", "last_name" => "RhoTest", "mobile_number" => "+12345678107"}
  contacts << {"first_name" => "R.", "last_name" => "RhoTest", "mobile_number" => "+12345678108"}
  contacts << {"first_name" => "S.", "last_name" => "RhoTest", "mobile_number" => "+12345678109"}
  contacts << {"first_name" => "T.", "last_name" => "RhoTest", "mobile_number" => "+12345678110"}

  contacts.each do |contact|
    Rho::RhoContact.create! contact
  end

  redirect :action => :index
end

def test_create_250
  Alert.show_popup(
      :message=>"Creating large amount of contacts may take long time.\nWould you like to proceed?",
      :title=>"Create 250 contacts",
      :buttons => ["Ok", "Cancel"],
      :callback => url_for(:action => :create_250_alert)
  )
  render :action => :do_create
end

end
