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

def getTestDB
  ::Rho::RHO.get_db_partitions['local']
  #::Rho::RHO.get_db_partitions['user']
end

def clean_db_data
  db = getTestDB
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
