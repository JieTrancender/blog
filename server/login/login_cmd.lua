local tbl = {}

function tbl.start( what, msg )
	log("Login#start", what, util.table_dump(msg))
end

return tbl