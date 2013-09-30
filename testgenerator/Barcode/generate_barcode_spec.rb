require 'fileutils'
require 'yaml'

$path_to_spec = File.join('Barcode', 'barcode_js_spec.js')
$getType = ''

def generate_js_barcode_spec
	testCases = YAML.load_file('Barcode\Barcode.yml')
	testCases['BarcodeTestCase'].each do |category|

		$getType = category['getType']
		case category['category'].to_s
		when "set", "Set", "SET"
			write_jasmine_describe
			generate_set_test(category['Properties'])
			end_jasmine_describe
		else
			puts "Didn't get Any Matching Category"
		end

	end
end

def write_jasmine_describe
    File.open($path_to_spec, 'w') do |f|
		f.puts 'describe("Barcode JS API", function() {'
    end
end

def end_jasmine_describe
    File.open($path_to_spec, 'a') do |f|
		f.puts '});'
    end
end

def generate_set_test(properties)

    File.open($path_to_spec, 'a') do |f|
		f.puts 'describe("Barcode APIs Set Test", function() {'
		f.puts 'var enumData = Rho.Barcode.enumerate();'
		f.puts 'for (var j = 0;j<enumData.length;j++){'
		f.puts '  var arrSCN = getApplicableProperties(enumData[j]);'
		f.puts '  (function(enumObject){'
		f.puts "	var scnname = enumObject.getProperty('friendlyName');"
		f.puts "	var scnid = enumObject.getProperty('ID');"
		f.puts '    var scntype = enumObject.scannerType;'
	end
	add_enable_test

	properties.each do |property|

		property['setType'].each_with_index do |type, index|

		case type.to_s
		when "direct", "Direct", "DIRECT"
			add_setting_directly_test(property['id'][index],"enumObject",property['Property'],property['values'])
		when "setProperty","SetProperty","Setproperty","setproperty"
			add_setting_setproperty_test(property['id'][index],"enumObject",property['Property'],property['values'])
		when "setProperties","setproperties","SetProperties","Setproperties"
			add_setting_setproperties_test(property['id'][index],"enumObject",property['Property'],property['values'])
		else
			puts "Didn't get Any Matching Category"
		end
		end
	end

	add_disable_test
    File.open($path_to_spec, 'a') do |f|
		f.puts '	})(enumData[j]);' #Ending anonymous Method call
		f.puts '}' #Ending the For Loop
		f.puts '});' #Ending set describe

	end
end

def add_enable_test
	File.open($path_to_spec, 'a') do |f|
	f.puts '	describe("Enable Scanner "+ scnid +": "+ scnname + scntype, function() {'

	f.puts '	beforeEach(function() {'
	f.puts '	enableflag = false;'
	f.puts '	});'
			
	f.puts '	it("Enable "+ scnid + scnname, function() {'
	f.puts '			runs(function() {'
	f.puts '				setTimeout(function(){'
	f.puts '					enableflag = true;'
	f.puts '				}, 5000)'
	f.puts '			});'
				
	f.puts '			waitsFor(function() {'
	f.puts '				return enableflag;'
	f.puts '			}, "Waiting for enable", 11000);'
	f.puts '			runs(function() {'
	f.puts '				enableflag = false;'
	f.puts ''
	f.puts '				enumObject.enable();'
	f.puts '				setTimeout(function() {'
	f.puts '				enableflag = true;'
	f.puts '				}, 10000);'
	f.puts '			});'
				
	f.puts '			waitsFor(function() {'
	f.puts '				return enableflag;'
	f.puts '			}, "Waiting for enable", 11000);'
	f.puts '		'
	f.puts '		});'
	f.puts '	});'
	end
end
def add_disable_test
	File.open($path_to_spec, 'a') do |f|
	f.puts '	describe("Disable Scanner "+ scnid +": "+ scnname + scntype, function() {'
	
	f.puts '	beforeEach(function() {'
	f.puts '	disableflag = false;'
	f.puts '	});'
			
	f.puts '	it("Disable "+ scnid + scnname, function() {'
	f.puts '			runs(function() {'
	f.puts '				enumObject.disable();'
	f.puts '				setTimeout(function() {'
	f.puts '				disableflag = true;'
	f.puts '				}, 10000);'
	f.puts '			});'
				
	f.puts '			waitsFor(function() {'
	f.puts '				return disableflag;'
	f.puts '			}, "Waiting for enable", 11000);'
	f.puts '		'
	f.puts '		});'
	f.puts '	});'
	end
end