require "common"

local skynet = require "skynet"
local manager = require "skynet.manager"
local snax = require "skynet.snax"

local mongo_user = skynet.getenv("mongo_user")
local mongo_passwd = skynet.getenv("mongo_passwd")
local mongo_db = skynet.getenv("mongo_db")
local mongo_hosts = skynet.getenv("mongo_local_hosts") or skynet.getenv("mongo_hosts")

skynet.start(function ( ... )
	local mongod = snax.uniqueservice("mongod", mongo_hosts, mongo_db, mongo_user, mongo_passwd)

	local data = mongod.req.findOne("player", {playerId = 1234})
	mongod.post.update("player", {playerId = 1234}, {playerId = 1234, source = "test", dt = os.time()})

	local logind = skynet.uniqueservice("logind")

	skynet.call(logind, "lua", "start", "hello", {playerId = 1234, source = "test"})

	log("---------login start---------")

	skynet.exit()
end)