local skynet = require "skynet"

require "client_include"

-- local cmd = require "user_mgr"

skynet.start(function ( ... )
	skynet.dispatch("lua", function ( session, source, command, ... )
		log("client command:", session, source, command)
		local f = assert(g_userMgr[command], string.format("source:%s, command:%s", skynet.address(source), command))
		assert(type(f) == "function")

		skynet.retpack(f(g_userMgr, ...))
	end)
end)