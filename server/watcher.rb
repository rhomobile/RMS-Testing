require 'sys/proctable'
require 'timers'
include Sys


# Watch for the server.rb script.  If it is not running, start it.

timers = Timers.new

# Watch every 30 seconds
timers.every(30) {
	a = ProcTable.ps

	found = "Not Found"

	a.each do 
		|p| 
		if p.cmdline =~ /server.rb/
			found = "Found"
		end
	end

	if found == "Not Found" then 
		# Start the server back up
		p "Starting the Script"
		`start ruby server.rb 192.168.1.200`
	end
}

loop { timers.wait }