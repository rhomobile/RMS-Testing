def getTestDB
  ::Rho::RHO.get_db_partitions['local']
end

def clean_db_data
  db = getTestDB
  db.start_transaction
  db.delete_all_from_table('client_info')
  db.delete_all_from_table('object_values')
  db.delete_all_from_table('changed_values')
  db.delete_all_from_table('Customer_s') if db.table_exist?('Customer_s')
  db.delete_all_from_table('Product_s') if db.table_exist?('Product_s')
  db.commit
end
