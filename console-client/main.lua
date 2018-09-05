local skynet = require "skynet"

skynet.start(function ( ... )
	print("Console client start...")

	skynet.exit()
end)