require File.expand_path('../../../dir/fixtures/common', __FILE__)

describe :open_directory, :shared => true do
if ( System.get_property('platform') != 'WINDOWS' ) && ( System.get_property('platform') != 'WINDOWS_DESKTOP' )
  it "opens directories" do
    File.send(@method, tmp("")).should be_kind_of(File)
  end
end  
end
