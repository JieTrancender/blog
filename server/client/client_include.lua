--为了热更新，记录所有需要热更的文件
local require_o = require
mypackage = {}
mateTable = {
	__index = function( stable, key )
		local keys = {}
		for k, v in pairs(stable) do
			if k == key or string.find(k, key..'.') == 1 then
				table.insert(keys, k)
			end
		end
		return keys
	end
}
mypackage = setmetatable({}, mateTable)
local require = function(fn)
	mypackage[fn] = 1
	return require_o(fn)
end

require "user_mgr"
require "oper"