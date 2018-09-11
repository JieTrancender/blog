require "common"

local tbl = {}

function tbl.Login( fd, msg )
	return {
		err = 0,
		info = {
			playerId = 400001,
			name = "testUser",
			sessionkey = 1,
			gameUrl = "jie-trancende.org",
			camp = 0,
			createDt = __NOW
		}
	}

	-- return {err = 0, msg = "success"}
end

g_protMgr:registFuncTbl("login", tbl)