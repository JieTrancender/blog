require "common"

local skynet = require "skynet"
local snax = require "skynet.snax"
local cache = require "skynet.codecache"
cache.mode("EXIST")

__DEBUG = skynet.getenv("DEBUG")

-- require "config_mgr"

local cmd = require "login_cmd"

skynet.start(function ( ... )
	mongod = snax.queryservice("mongod")

	-- 时间偏移
	local commonInfo = mongod.req.findOne("common", {})
	if commonInfo then
		-- setTimeOffset(commonInfo.offsetTime or 0)
	end

	skynet.dispatch("lua", function ( session, source, command, what, ... )
		if command == "socket" then
			if source == gate_c or source == gate_w then
				-- local func = assert()
			else
				-- 
			end
		else
			local func = assert(cmd[command], string.format("source:%s, command:%s", skynet.address(source), command))
			skynet.retpack(func(what, ...))
		end
	end)
end)