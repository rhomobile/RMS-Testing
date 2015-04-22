var config_get_property = [
{
	testName : "Get default start_path property value using ",
	propertyName : "start_path",
	expectedStrResult : "/app/index.html",
	expectedIntResult : 0,
	expectedBoolResult : false,
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default options_path property value using ",
	propertyName : "options_path",
	expectedStrResult : "/app/Settings",
	expectedIntResult : 0,
	expectedBoolResult : false,
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default rhobundle_zip_url property value using ",
	propertyName : "rhobundle_zip_url",
	expectedStrResult : "",
	expectedIntResult : 0,
	expectedBoolResult : false,
	osType : ["WP8", "APPLE"]
}

];

var config_set_get_property = [
{
	testName : "Set and get start_path property value using ",
	propertyName : "start_path",
	propertyValue : "/app/BarcodeTest/specRunner.html",
	expectedStrResult : "/app/BarcodeTest/specRunner.html",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Set and get options_path property value using ",
	propertyName : "options_path",
	propertyValue : "/app/ConfigTest",
	expectedStrResult : "/app/ConfigTest",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default rhobundle_zip_url property value using ",
	propertyName : "rhobundle_zip_url",
	propertyValue : "https://s3.amazonaws.com/rhohub-test-builds/ce78f75e7fb147859014b37914e5f3b7.zip",
	expectedStrResult : "https://s3.amazonaws.com/rhohub-test-builds/ce78f75e7fb147859014b37914e5f3b7.zip",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default rhobundle_zip_pwd property value using ",
	propertyName : "rhobundle_zip_pwd",
	propertyValue : "test",
	expectedStrResult : "test",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default MinSeverity property value using ",
	propertyName : "MinSeverity",
	propertyValue : 3,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 3,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default LogToOutput property value using ",
	propertyName : "LogToOutput",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default ExcludeLogCategories property value using ",
	propertyName : "ExcludeLogCategories",
	propertyValue : "Cat2",
	expectedStrResult : "Cat2",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default MaxLogFileSize property value using ",
	propertyName : "MaxLogFileSize",
	propertyValue : 40000,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 40000,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default LogFilePath property value using ",
	propertyName : "LogFilePath",
	propertyValue : "/mnt/sdcard/myapp1.log",
	expectedStrResult : "/mnt/sdcard/myapp1.log",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default LogMemPeriod property value using ",
	propertyName : "LogMemPeriod",
	propertyValue : 30000,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 30000,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default net_trace property value using ",
	propertyName : "net_trace",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default log_skip_post property value using ",
	propertyName : "log_skip_post",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default log_exclude_filter property value using ",
	propertyName : "log_exclude_filter",
	propertyValue : "login, password",
	expectedStrResult : "login, password",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default net_timeout property value using ",
	propertyName : "net_timeout",
	propertyValue : 60,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 60,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default logserver property value using ",
	propertyName : "logserver",
	propertyValue : "http://rhologs.heroku.com",
	expectedStrResult : "http://rhologs.heroku.com",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default logname property value using ",
	propertyName : "logname",
	propertyValue : "helloworld",
	expectedStrResult : "helloworld",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default syncserver property value using ",
	propertyName : "syncserver",
	propertyValue : "http://localhost:9292/application",
	expectedStrResult : "http://localhost:9292/application",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default full_screen property value using ",
	propertyName : "full_screen",
	propertyValue : 0,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 0,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default enable_screen_zoom property value using ",
	propertyName : "enable_screen_zoom",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default screen_width property value using ",
	propertyName : "screen_width",
	propertyValue : 600,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 600,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default screen_height property value using ",
	propertyName : "screen_height",
	propertyValue : 400,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 400,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default local_server_port property value using ",
	propertyName : "local_server_port",
	propertyValue : 8080,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 8080,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default wm_show_statusbar property value using ",
	propertyName : "wm_show_statusbar",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default disable_screen_rotation property value using ",
	propertyName : "disable_screen_rotation",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default bb_disable_closebyback property value using ",
	propertyName : "bb_disable_closebyback",
	propertyValue : 0,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 0,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default bb_loadimages_async property value using ",
	propertyName : "bb_loadimages_async",
	propertyValue : 0,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 0,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default bulksync_state property value using ",
	propertyName : "bulksync_state",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default jqtouch_mode property value using ",
	propertyName : "jqtouch_mode",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default splash_screen property value using ",
	propertyName : "splash_screen",
	propertyValue : "zoom",
	expectedStrResult : "zoom",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default use_bb_full_browser property value using ",
	propertyName : "use_bb_full_browser",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default use_persistent_storage property value using ",
	propertyName : "use_persistent_storage",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default use_bulk_model property value using ",
	propertyName : "use_bulk_model",
	propertyValue : true,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : true,
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default no_ssl_verify_peer property value using ",
	propertyName : "no_ssl_verify_peer",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default finish_sync_in_background property value using ",
	propertyName : "finish_sync_in_background",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default enable_web_plugins property value using ",
	propertyName : "enable_web_plugins",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default send_log property value using ",
	propertyName : "send_log",
	propertyValue : "http://example.com/client_log?client_id=123&device_pin=345&log_name=mylog",
	expectedStrResult : "http://example.com/client_log?client_id=123&device_pin=345&log_name=mylog",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default http_proxy_host property value using ",
	propertyName : "http_proxy_host",
	propertyValue : "server",
	expectedStrResult : "server",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default http_proxy_port property value using ",
	propertyName : "http_proxy_port",
	propertyValue : 1080,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1080,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default http_proxy_login property value using ",
	propertyName : "http_proxy_login",
	propertyValue : "user",
	expectedStrResult : "user",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default http_proxy_password property value using ",
	propertyName : "http_proxy_password",
	propertyValue : "password",
	expectedStrResult : "password",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default clientSSLCertificate property value using ",
	propertyName : "clientSSLCertificate",
	propertyValue : "certificate path",
	expectedStrResult : "certificate path",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default clientSSLCertificatePassword property value using ",
	propertyName : "clientSSLCertificatePassword",
	propertyValue : "password",
	expectedStrResult : "password",
	expectedIntResult : "Type error: argument 1 should be integer",
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default sync_poll_interval property value using ",
	propertyName : "sync_poll_interval",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
},
{
	testName : "Get default disable_loading_indication property value using ",
	propertyName : "disable_loading_indication",
	propertyValue : 1,
	expectedStrResult : "Type error: argument 1 should be string",
	expectedIntResult : 1,
	expectedBoolResult : "Type error: argument 1 should be boolean",
	osType : ["WP8", "APPLE"]
}

];