local skynet = require "skynet"
local manager = require "skynet.manager"
local snax = require "skynet.snax"

skynet.start(function ( ... )
	print("-----skynet.start")

	skynet.exit()
end)