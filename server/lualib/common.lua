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