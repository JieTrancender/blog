util = require "util"

local c = require "skynet.core"

function split( str, delim )
	if str == nil or str == "" then return {} end

	local tmpDelim = delim or ":"
	if tmpDelim == "" then return string.strToArr(str) end

	if type(delim) ~= "string" or string.len(delim) <= 0 then return end

	local start = 1
	local result = {}

	while true do
		local pos = string.find(str, tmpDelim, start, true)
		if not pos then
			break
		end

		table.insert(result, string.sub(str, start, pos - 1))
		start = pos + string.len(tmpDelim)
	end

	table.insert(result, string.sub(str, start))

	return result
end

function print_r( obj )
	print(util.table_dump(obj))
end

--日志输出
function logImp( ... )
	local t = {...}
	for i=1,#t do
		t[i] = tostring(t[i])
	end
	return c.error(table.concat(t, " "))
end

function log( ... )
	if _roleId then
		logImp(_roleId, ...)
	else
		logImp(...)
	end
end

function logError( ... )
	if _roleId then
		logImp(_roleId, "error", ...)
	else
		logImp("error", ...)
	end
end

function logWarning( ... )
	if _roleId then
		logImp(_roleId, "warning", ...)
	else
		logImp("warning", ...)
	end
end