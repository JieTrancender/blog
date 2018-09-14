local skynet = require "skynet"
local socketdriver = require "skynet.socketdriver"

local tbl = {}

function tbl.listenClient( ip, port )
	skynet.call(gate_c, "lua", "open", {
		address = ip,
		port = port,
		maxclient = 5000
	})
end

function tbl.listenServer( ip, port )
	skynet.call(gate_s, "lua", "open", {
		address = ip,
		port = port,
		maxclient = 1000
	})
end

function tbl.listenWeb( ip, port )
	skynet.call(gate_w, "lua", "start", {
		address = ip,
		port = port,
		maxclient = 5000
	})
end

function tbl.start( what, msg )
	log("Login#start", what, util.table_dump(msg))
end

local connHandler = {}  -- {key:fd, value:hash<addr,source>}
local function send_to_client( fd, package, size )
	if connHandler[fd] and connHandler[fd].source == gate_w then
		skynet.send(gate_w, "lua", "send", fd, package)
	else
		socketdriver.send(fd, package, size)
	end
end

local socket_c = {}
function socket_c.open( source, fd, addr )
	log("logind socket_c:", source, fd, addr)

	connHandler[fd] = {
		addr = addr,
		source = source
	}

	if source ~= gate_w then
		skynet.call(gate_c, "lua", "accept", fd)
	end

	-- g_userMgr:onConnect(fd, addr)
end

local function dispatch( fd, msg, sz )
	local ret, id1, id2, sid = g_protMgr:dispatch(fd, msg, sz)
	if ret then
		local retBuf, retSz = g_protMgr:pack(ret, id1, id2, sid)
		send_to_client(fd, retBuf, retSz)
	elseif ret == false then
		socket_c.close(fd)
	end
end

function socket_c.data( source, fd, msg )
	log("logind socket_c:", source, fd, util.table_dump(msg))

	local ok = dispatch(fd, msg, #msg) or true

	if not ok then
		skynet.error(string.format("invalid client package fd:%d, err:%s", fd, err))
		socket_c.close(fd)
	end
end

function socket_c.close( source, fd )
	-- g_userMgr:onClose(fd)
	connHandler[fd] = nil
end

function socket_c.error( source, fd, msg )
	socket_c.close(fd)
end

tbl.socket_c = socket_c

return tbl