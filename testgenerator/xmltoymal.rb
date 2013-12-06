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

def cardreaderxmltoymal
	begin
		file = File.open("../../Motorola-Extensions/lib/commonAPI/cardreader/ext/cardreader.xml", "r")
	rescue
		puts "Motorola-Extensions Repo is not there!!!"
	end
	hash = Hash.from_xml(file.read)
	yaml = hash.to_yaml
	File.open("./Cardreader/cardreader.yml", "w") { |file| file.write(yaml) }
end

def signaturexmltoymal
	begin
		file = File.open("../../Motorola-Extensions/lib/commonAPI/signature/ext/signature.xml", "r")
	rescue
		puts "Motorola-Extensions Repo is not there!!!"
	end
	hash = Hash.from_xml(file.read)
	yaml = hash.to_yaml
	File.open("./Signature/signature.yml", "w") { |file| file.write(yaml) }	
end

def cameraxmltoymal
	begin
		file = File.open("../../rhodes/lib/commonAPI/mediacapture/ext/camera.xml", "r")
	rescue
		puts "Rhodes Repo is not there!!!"
	end
	hash = Hash.from_xml(file.read)
	yaml = hash.to_yaml
	File.open("./Camera/camera.yml", "w") { |file| file.write(yaml) }	
end

def audiocapturexmltoymal
	begin
		file = File.open("../../rhodes/lib/commonAPI/audiocapture/ext/audiocapture.xml", "r")
	rescue
		puts "Rhodes Repo is not there!!!"
	end
	hash = Hash.from_xml(file.read)
	yaml = hash.to_yaml
	File.open("./AudioCapture/audiocapture.yml", "w") { |file| file.write(yaml) }	
end