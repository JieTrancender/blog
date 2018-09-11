local packId = require "export.package_id"
local proto = require "pbc_c_include"

-- 为表tbl注册obj中的回调函数
local function registFuncTbl( tbl, obj, ... )
	local args = {...}
	local ch
	if type(obj) == "string" then
		ch = obj:sub(-1, -1)
		for _, v in pairs(args) do
			if ch == v then
				table.insert(tbl, obj)
				break
			end
		end
	elseif type(obj) == "table" then
		for index, func in pairs(obj) do
			if type(func) == "string" and type(index) == "number" then
				ch = func:sub(-1, -1)
				for _, v in pairs(args) do
					if ch == v then
						table.insert(tbl, func)
						break
					end
				end
			end
		end
	else
		print("no implement:" .. type(obj))
	end
end

local function forbidPrint( operation )
	if string.find(operation, "RedPointP") then
		return true
	end
end

local function allowPrint( operation )
	local list = {"NewOperationExecP"}

	for _, v in ipairs(list) do
		if operation == v then
			return true
		end
	end
end

-- 设置表obj回调函数的hash映射
local function setOperation( obj, callbackFunc )
	for _, operation in ipairs(callbackFunc) do
		obj[operation] = function ( msg )
			if not allowPrint(operation) and forbidPrint(operation) then
				log("exic:", operation)
			else
				log(operation, util.table_dump(msg))
			end
		end
	end
end

-- 通过文件名注册对应协议的回调函数
local function registAllCallback( fileName )
	-- print(fileName)

	local protoId = require ("export." .. fileName .. "_id")
	local protocol = {}
	local protocolCallback = {}

	registFuncTbl(protocolCallback, protoId, 'P', 'R')
	setOperation(protocol, protocolCallback)
	proto.registFuncTbl(fileName, protocol)
end

for k, v in pairs(packId) do
	if type(k) == "string" then
		registAllCallback(k)
	end
end