if #arg ~= 2 then
	print("args is wrong, please use \'lua generate_id.lua fileName\'")

	return
end

local dirRoot = "../original_protocol/"
local dirExportRoot = "../protocol/export/"
local fileName = arg[2] .. ".proto"
local outName = arg[2] .. "_id.lua"
local server = arg[1]
local operId = 1
local lua2id = {}
local id2lua = {}
local ID_SIZE = 65536

function parse( ... )
	local file = io.open(dirRoot .. server .. '/' .. fileName, "r")
	local line = file:read()

	local lineN = 1
	while line do
		local endPos = string.find(line, "#")
		if endPos then
			line = string.sub(line, 1, endPos - 1)
		end

		local ret = parseLine(line)
		assert(0 == ret, string.format("somthing error in line:%d, code:%d", lineN, ret))

		line = file:read()
		lineN = lineN + 1
	end

	file:close()
end

function parseLine( line )
	local tag = {}
	for w in string.gmatch(line, "[%.]?%a+") do
		table.insert(tag, w)
	end

	if (tag[1] or "") == "message" then
		local key = tag[2]
		table.insert(lua2id, {key = key, value = operId})
		id2lua[operId] = key
		operId = operId + 1
		if operId > ID_SIZE - 1 then
			error("Id is greater then", ID_SIZE)
		end
	end

	return 0
end

function save( ... )
	local outFile = io.open(dirExportRoot .. outName, "w")
	-- outFile:write("\n\n")
	outFile:write("local tbl = {\n")

	for k, v in pairs(id2lua) do
		local str = "\t[" .. k .. "] = '" .. v .. "',\n"
		outFile:write(str)
	end

	for _, v in pairs(lua2id) do
		local str = "\t" .. v.key .. " = " .. v.value .. ",\n"
		outFile:write(str)
	end

	outFile:write("}\n\n")
	outFile:write("return tbl")
	outFile:write("\n")
	outFile:close()
end

function start( ... )
	parse()
	save()
end

start()