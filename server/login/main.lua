require "common"

local skynet = require "skynet"
local manager = require "skynet.manager"
local snax = require "skynet.snax"

local mongo_user = skynet.getenv("mongo_user")
local mongo_passwd = skynet.getenv("mongo_passwd")
local mongo_db = skynet.getenv("mongo_db")
local mongo_hosts = skynet.getenv("mongo_local_hosts") or skynet.getenv("mongo_hosts")

local client_ip = skynet.getenv("client_ip")
local client_port = skynet.getenv("client_port")
local server_ip = skynet.getenv("server_ip")
local server_port = skynet.getenv("server_port")
local web_ip = skynet.getenv("web_ip")
local web_port = skynet.getenv("web_port")

skynet.start(function ( ... )
	local mongod = snax.uniqueservice("mongod", mongo_hosts, mongo_db, mongo_user, mongo_passwd)

	local data = mongod.req.findOne("player", {playerId = 1234})
	mongod.post.update("player", {playerId = 1234}, {playerId = 1234, source = "test", dt = os.time()})

	local logind = skynet.uniqueservice("logind")

	skynet.call(logind, "lua", "listenClient", client_ip, client_port)
	skynet.call(logind, "lua", "listenServer", server_ip, server_port)
	skynet.call(logind, "lua", "listenWeb", web_ip, web_port)

	skynet.call(logind, "lua", "start", "hello", {playerId = 1234, source = "test"})

	log("---------login start---------")

	skynet.exit()
end)