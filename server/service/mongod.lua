require "common"

local skynet = require "skynet"
local mongo = require "skynet.db.mongo"
local json = require "cjson"

local DEBUG
local bson_encode

local makeConf = function ( hosts, username, password )
	local hosts = split(hosts, ',')
	local conf = {}
	for i, v in ipairs(hosts) do
		local info = split(v, ':')
		table.insert(conf, {
			host = info[1],
			username = username,
			password = password,
			port = info[2]
		})
	end

	if #conf == 1 then
		return conf[1]
	end

	return {rs = conf}
end

local db, db_name
function init( ... )
	DEBUG = skynet.getenv("DEBUG")
	if DEBUG then
		local bson = require "bson"
		bson_encode = bson.encode
	end

	local hosts, username, password
	hosts, db_name, username, password = ...

	db = mongo.client(makeConf(hosts, username, password))
	if db == nil then
		logError("mongod failed to connect")
	end

	print_r(db)
	print("--------debug", skynet.getenv("DEBUG"))
end

function exit( ... )
	-- body
end

function response.error( ... )
	error "throw and error"
end

function accept.insert( tableName, tbl )
	if DEBUG then
		local ok = pcall(bson_encode, tbl)
		if not ok then
			logError("mongod insert:", json.encode(tbl))
		end
	end

	local ret = db[db_name][tableName]:safe_insert(tbl)
	if ret == nil or ret.n ~= 1 then
		skynet.error("mongod insert, errno:", json.encode(ret), json.encode(tbl))
	end
end

-- 异步更新
-- upsert:如果查找不到记录是否生成新的记录
-- multi:是否更新多条，默认一条
function accept.update( tableName, selector, tbl, upsert, multi )
	if DEBUG then
		local ok = pcall(bson_encode, tbl)
		if not ok then
			logError("mongod update:", json.encode(selector), json.encode(tbl))
		end
	end

	if upsert == nil then upsert = true end
	db[db_name][tableName]:update(selector, tbl, upsert, multi)
end

-- 同步更新
function response.update( tableName, selector, tbl, upsert, multi )
	if DEBUG then
		local ok = pcall(bson_encode, tbl)
		if not ok then
			logError("mongod update:", json.encode(selector), json.encode(tbl))
		end
	end

	if upsert == nil then upsert = true end
	local ret = db[db_name][tableName]:update(selector, tbl, upsert, multi)
	if ret == nil then
		skynet.error("mongod update, errno:", json.encode(ret), json.encode(tbl))
	end

	return ret
end

-- sort:{key:-1} -1表示倒序，默认增序
-- skip: n 表示跳过n个
-- limit: n 表示只显示n个
function response.find( tableName, tbl, sort, skip, limit, selector )
	local ret = db[db_name][tableName]:find(tbl, selector)
	if ret == nil then
		skynet.error("mongod update, errno:", json.encode(ret), json.encode(tbl))
	end

	if sort then
		ret = ret:sort(sort)
	end

	if skip then
		ret = ret:skip(skip)
	end

	if limit then
		ret = ret:limit(limit)
	end

	local result = {}
	while ret:hasNext() do
		local item = ret:next()
		table.insert(result, item)
	end

	return result
end

function response.findOne( tableName, tbl, selector )
	return db[db_name][tableName]:findOne(tbl, selector)
end

function response.findMulti( tableNameList, tbl )
	local result = {}
	for k, v in ipairs(tableNameList) do
		result[k] = db[db_name][tableName]:findOne(tbl)
	end

	return result
end

function response.findAndModify( tableName, tbl )
	local ret = db[db_name][tableName]:findAndModify(tbl)
	if ret == nil then
		skynet.error("mongod findAndModify, errno:", json.encode(ret), json.encode(tbl))
	end

	return ret
end

-- single:1 表示删除一条
function response.delete( tableName, tbl, single )
	local ret = db[db_name][tableName]:delete(tbl, single)
	if ret == nil then
		skynet.error("mongod delete, errno:", json.encode(ret), json.encode(tbl))
	end

	return ret
end

-- 大量删除数据，同步删表重建
function accept.drop( tableName )
	local ret = db[db_name][tableName]:drop()
	if ret == nil then
		skynet.error("mongod drop, errno:", json.encode(ret), json.encode(tbl))
	end

	return ret
end

-- 创建索引
function accept.ensureIndex( tableName, tbl, options )
	local ret = db[db_name][tableName]:ensureIndex(tbl, options)
	if ret == nil then
		skynet.error("mongod ensureIndex, errno:", json.encode(ret), json.encode(tbl))
	end

	return ret
end

-- 关闭服务器的时候调用
function response.stop( ... )
	log("mongod stoping...", skynet.mqlen())
	while skynet.mqlen() > 0 do
		skynet.sleep(100)
	end

	return 0
end