require "common"

local skynet = require "skynet"

local server_ip = "127.0.0.1"
local server_port = 11001

local username = "fri51"

skynet.start(function ( ... )
	local client = skynet.newservice("client")
	skynet.call(client, "lua", "startLogin", server_ip, server_port)
	skynet.call(client, "lua", "login", username)

	log("console client start")

	skynet.exit()
end)