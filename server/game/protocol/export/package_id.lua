-- 协议包对应id

local tbl = {
	loginGame = 1,
	test = 2,
	login = 3,
}

local ret = {}
for k, v in pairs(tbl) do
	ret[k] = v
	ret[v] = k
end

return ret