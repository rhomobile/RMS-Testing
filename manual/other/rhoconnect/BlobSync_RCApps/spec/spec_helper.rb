require 'rubygems'

# Set environment to test
ENV['RHO_ENV'] = 'test'
ROOT_PATH = File.expand_path(File.join(File.dirname(__FILE__),'..'))
Bundler.require(:default, ENV['RHO_ENV'].to_sym)

# Try to load vendor-ed rhoconnect, otherwise load the gem
begin
  require 'vendor/rhoconnect/lib/rhoconnect'
rescue LoadError
  require 'rhoconnect'
end

$:.unshift File.join(File.dirname(__FILE__), "..")
include Rhoconnect
require 'rhoconnect/application/init'
require 'rhoconnect/test_methods'

shared_examples_for "SpecHelper" do
  include Rhoconnect::TestMethods
  before(:all) do
  	Rhoconnect.bootstrap(ROOT_PATH)
  end
  
  before(:each) do
    Store.flush_all
    Rhoconnect.bootstrap(ROOT_PATH)
  end  
end