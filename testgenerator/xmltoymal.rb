require 'active_support/core_ext/hash/conversions'
require 'yaml'

PATH_APPLICATION = "../../rhodes/lib/commonAPI/coreapi/ext/Application.xml"
PATH_AUDIOCAPTURE = "../../rhodes/lib/commonAPI/audiocapture/ext/audiocapture.xml"
PATH_BARCODE = "../../Motorola-Extensions/lib/commonAPI/barcode/ext/barcode.xml"
PATH_BATTERY = "../../Motorola-Extensions/lib/commonAPI/indicators/ext/battery.xml"
PATH_CAMERA = "../../rhodes/lib/commonAPI/mediacapture/ext/camera.xml"
PATH_CARDREADER = "../../Motorola-Extensions/lib/commonAPI/cardreader/ext/cardreader.xml"
PATH_DATABASE = "../../rhodes/lib/commonAPI/coreapi/ext/Database.xml"
PATH_SIMULSCAN = "../../Motorola-Extensions/lib/commonAPI/simulscan/ext/SimulScan.xml"
PATH_INTENT = "../../rhodes/lib/commonAPI/coreapi/ext/Intent.xml"
PATH_KEYCAPTURE = "../../Motorola-Extensions/lib/commonAPI/hardwarekeys/ext/keycapture.xml"
PATH_KEYSTATE = "../../Motorola-Extensions/lib/commonAPI/indicators/ext/keystate.xml"
PATH_LOG = "../../rhodes/lib/commonAPI/coreapi/ext/Log.xml"
PATH_MEDIAPLAYER = "../../rhodes/lib/commonAPI/mediaplayer/ext/mediaplayer.xml"
PATH_NATIVEMENUBAR = "../../rhodes/lib/commonAPI/coreapi/ext/NativeMenubar.xml"
PATH_NATIVETABBAR = "../../rhodes/lib/commonAPI/coreapi/ext/NativeTabbar.xml"
PATH_NATIVETOOLBAR = "../../rhodes/lib/commonAPI/coreapi/ext/NativeToolbar.xml"
PATH_NAVBAR = "../../rhodes/lib/commonAPI/coreapi/ext/Navbar.xml"
PATH_NETWORK = "../../rhodes/lib/commonAPI/coreapi/ext/Network.xml"
PATH_NOTIFICATION = "../../rhodes/lib/commonAPI/coreapi/ext/Notification.xml"
PATH_ORM = "../../rhodes/lib/commonAPI/coreapi/ext/Orm.xml"
PATH_PRINTER = "../../Motorola-Extensions/lib/commonAPI/printing/ext/printing.xml"
PATH_PRINTERZEBRA = "../../Motorola-Extensions/lib/commonAPI/printing_zebra/ext/printingzebra.xml"
PATH_PUSH = "../../rhodes/lib/commonAPI/coreapi/ext/Push.xml"
PATH_RHOCONECTCLIENT = ""
PATH_RHOFILE = "../../rhodes/lib/commonAPI/coreapi/ext/File.xml"
PATH_SCREENORIENTATION = "../../rhodes/lib/commonAPI/screenorientation/ext/screenorientation.xml"
PATH_SENSOR = "../../rhodes/lib/commonAPI/Sensor/ext/sensor.xml"
PATH_SIGNATURE = "../../Motorola-Extensions/lib/commonAPI/signature/ext/signature.xml"
PATH_SIGNALINDICATORS = "../../Motorola-Extensions/lib/commonAPI/indicators/ext/signalindicators.xml"
PATH_SYSTEM = "../../rhodes/lib/commonAPI/coreapi/ext/System.xml"
PATH_WEBVIEW = "../../rhodes/lib/commonAPI/coreapi/ext/Webview.xml"

def module_xmltoymal (xmlpath, modulename)
	begin
		file = File.open(xmlpath, "r")
	rescue
		puts "Rhodes/Motorola Extensions Repo is not there!!!"
	end
	unless File.exists?(Dir.tmpdir()+"/"+modulename)
		Dir.mkdir(Dir.tmpdir()+"/"+modulename)
	end

	hash = Hash.from_xml(file.read)
	yaml = hash.to_yaml
	ymalpath = Dir.tmpdir() + "/" + modulename + "/" + modulename.downcase + ".yml"
	File.open(ymalpath, "w") { |file| file.write(yaml) }

end

