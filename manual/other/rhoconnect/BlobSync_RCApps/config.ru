#!/usr/bin/env ruby
require 'rhoconnect/application/init'

# secret is generated along with the app
Rhoconnect::Server.set     :secret,      '2bb9c732231b40baf3021252a51ad9af061780ba887869770cc54a94e93450ed94a32ee6989eabfcd76f0192771f50d650c16aa8b97578f70c6aae45ecfbd914'

#Rhoconnect::Server.set     :public_folder,        ROOT_PATH + '/public'
# !!! Add your custom initializers and overrides here !!!
# For example, uncomment the following line to enable Stats
#Rhoconnect::Server.enable  :stats
# uncomment the following line to disable Resque Front-end console
#Rhoconnect.disable_resque_console = true
# uncomment the following line to disable Rhoconnect Front-end console
#Rhoconnect.disable_rc_console = true

# run RhoConnect Application
run Rhoconnect.app
