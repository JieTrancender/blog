require "common"

util.add_path("./login/protocol/?.lua")

local skynet = require "skynet"
local snax = require "skynet.snax"
local cache = require "skynet.codecache"
cache.mode("EXIST")

__DEBUG = skynet.getenv("DEBUG")

-- require "config_mgr"

require "login_include"

local cmd = require "login_cmd"
local socket_s = cmd.socket_s
local socket_c = cmd.socket_c

skynet.start(function ( ... )
	mongod = snax.queryservice("mongod")

	-- 时间偏移
	local commonInfo = mongod.req.findOne("common", {})
	if commonInfo then
		-- setTimeOffset(commonInfo.offsetTime or 0)
	end

	__NOW = os.time()

	gate_c = skynet.newservice("gate")  -- 客户端监听
	gate_s = skynet.newservice("gate")  -- 服务端监听
	gate_w = skynet.uniqueservice("webgated")  -- web客户端监听

	skynet.dispatch("lua", function ( session, source, command, what, ... )
		log("logind:", session, source, command, what, log(util.table_dump(...)))
		if command == "socket" then
			if source == gate_c or source == gate_w then
				local func = assert(socket_c[what], string.format("client socket:%s", what))
				func(source, ...)
			else
				local func = assert(socket_s[what], string.format("server socket:%s", what))
				func(...)
			end
		else
			local func = assert(cmd[command], string.format("source:%s, command:%s", skynet.address(source), command))
			skynet.retpack(func(what, ...))
		end
	end)

	-- 定时器
end)