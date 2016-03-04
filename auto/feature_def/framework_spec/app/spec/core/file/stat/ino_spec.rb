require File.expand_path('../../../../spec_helper', __FILE__)

describe "File::Stat#ino" do
  before :each do
    @file = tmp('i_exist')
    touch(@file) { |f| f.write "rubinius" }
  end

  after :each do
    rm_r @file
  end
if ( System.get_property('platform') != 'WINDOWS' ) && ( System.get_property('platform') != 'WINDOWS_DESKTOP' )
  it "returns the ino of a File::Stat object" do
    st = File.stat(@file)
    st.ino.is_a?(Integer).should == true
    st.ino.should > 0
  end
end
end
