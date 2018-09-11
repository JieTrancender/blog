local protobuf = require "protobuf"
local packId = require "export.package_id"

local tbl = {}
local idMap = {}
local regFunc = {}

local function newRequire( fileName )
	local pbId = require("export." .. fileName .. "_id")
	local fid = packId[fileName]
	assert(idMap[fid] == nil)
	assert(idMap[fileName] == nil)
	idMap[fid] = pbId
	idMap[fileName] = pbId

	protobuf.register_file("game/protocol/" .. fileName .. ".pb")
end

-- 从一级id require所有文件
for k, v in pairs(packId) do
	if type(k) == "string" then
		newRequire(k)
	end
end

local ID_SIZE = 65536

function tbl.getId( package, message )
	local id1 = packId[package]
	local pb = idMap[id1]
	local id2 = pb[message]

	return id1, id2
end

-- n * ID_SIZE + m
function tbl.registFunc( id1, id2, func )
	if type(id1) == "string" then
		id1, id2 = tbl.getId(id1, id2)
	end

	local id = id1 * ID_SIZE + id2
	regFunc[id] = func
end

function tbl.registFuncTbl( id1, funcTbl )
	if type(id1) == "string" then
		id1 = packId[id1]
	end

	local pbId = idMap[id1]
	assert(pbId)
	for k, v in pairs(funcTbl) do
		if type(v) == "function" then
			local id2 = pbId[k]
			assert(id2, string.format("unknown protocol id1:%s, id2:%s", id1, k))
			tbl.registFunc(id1, id2, v)
		end
	end
end

function tbl.getFunc( id1, id2 )
	local id = id1 * ID_SIZE + id2

	return regFunc[id]
end

function tbl.getpattern( id1, id2 )
	if type(id1) ~= "string" then
		id1 = packId[id1]
	end

	if type(id2) ~= "string" then
		id2 = idMap[id1][id2]
	end

	return id1 .. "." .. id2
end

function tbl.pack( msg, id1, id2, sid )
	local pbName

	if type(id1) == "string" then
		id1, id2 = tbl.getId(id1, id2)
	end

	local pattern = tbl.getpattern(id1, id2)
	local strBuf = protobuf.encode(pattern, msg)
	local size = 4 + #strBuf
	local sz1 = math.floor(size / ID_SIZE)
	local sz2 = size % ID_SIZE
	local buf = string.pack(">I2>I1>I2>I1", size, id1, id2, sid or 0) .. strBuf

	return buf, size
end

local unpack = string.unpack

function tbl.unpack( msgBuf, sz )
	local id1, id2, sid, pbBuf = unpack(">I1>I2>I1c" .. (sz - 4), msgBuf)
	local pattern = tbl.getpattern(id1, id2)
	local msg = protobuf.decode(pattern, pbBuf)

	return msg, id1, id2, sid
end

function tbl.dispatch( msgBuf, sz )
	local msg, id1, id2, sid = tbl.unpack(msgBuf, sz)
	local func = tbl.getFunc(id1, id2)
	if func then
		func(msg)
	else
		log(string.format("dispatch invalid protocol:%d, %d:", id1, id2) .. packId[id1] .. "," .. idMap[id1][id2])
	end
end

if g_protMgr == nil  then
	g_protMgr = tbl
end

return tbl