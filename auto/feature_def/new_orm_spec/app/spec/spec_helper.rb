require 'rhom'
require 'rho/rhoutils'
require 'json'

USE_HSQLDB = !System.get_property('has_sqlite') unless defined? USE_HSQLDB
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
    Rho::RhoUtils.load_offline_data(@tables, @folder, @source_map) unless USE_COPY_FILES
  end

  def after_all
  end
end

###################################################
def getProduct
  return Product_s if $spec_settings[:schema_model]
  Product
end

def getCustomer
  return Customer_s if $spec_settings[:schema_model]
  Customer
end

def getAccount
  return Account_s if $spec_settings[:schema_model]
  Account
end

def getCase
  return Case_s if $spec_settings[:schema_model]
  Case
end

def getFreezedProduct
  return FreezedProductS if $spec_settings[:schema_model]
  FreezedProduct
end

def getTestDB
  ::Rho::RHO.get_db_partitions['local']
end

def clean_db_data(patrition = 'local')
  db = ::Rho::RHO.get_db_partitions[patrition]
  db.start_transaction
  db.delete_all_from_table('client_info')
  db.delete_all_from_table('object_values')
  db.delete_all_from_table('changed_values')
  db.delete_all_from_table('Customer_s') if db.table_exist?('Customer_s')
  db.delete_all_from_table('Product_s') if db.table_exist?('Product_s')
  db.delete_all_from_table('Account_s') if db.table_exist?('Account_s')
  db.delete_all_from_table('Case_s') if db.table_exist?('Case_s')
  db.commit
end

def copy_file(src, dst_dir)
  content = File.binread(src)
  File.open(File.join( dst_dir, File.basename(src) ), "wb"){|f| f.write(content) }
end
