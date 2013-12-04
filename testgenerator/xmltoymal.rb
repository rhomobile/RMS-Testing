require 'active_support/core_ext/hash/conversions'
require 'yaml'

def filexmltoymal
file = File.open("./File.xml", "r")
hash = Hash.from_xml(file.read)
yaml = hash.to_yaml
File.open("./File.yml", "w") { |file| file.write(yaml) }
end

def barcodexmltoymal
	begin
		file = File.open("../../Motorola-Extensions/lib/commonAPI/barcode/ext/barcode.xml", "r")
	rescue
		puts "Motorola-Extensions Repo is not there!!!"
	end
	hash = Hash.from_xml(file.read)
	yaml = hash.to_yaml
	File.open("./Barcode/barcode.yml", "w") { |file| file.write(yaml) }
end