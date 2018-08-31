local skynet = require "skynet"
local manager = require "skynet.manager"
local snax = require "skynet.snax"

local mongo_user = skynet.getenv("mongo_user")
local mongo_passwd = skynet.getenv("mongo_passwd")
local mongo_db = skynet.getenv("mongo_db")
local mongo_hosts = skynet.getenv("mongo_local_hosts") or skynet.getenv("mongo_hosts")

skynet.start(function ( ... )
	local mongod = snax.uniqueservice("mongod", mongo_hosts, mongo_db, mongo_user, mongo_passwd)

	skynet.exit()
end)