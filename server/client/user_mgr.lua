require "common"

local skynet = require "skynet"
local socket = require "skynet.socket"
local proto = require "pbc_c_include"

local _loginSock
local _gameSock
local loginLast = ""
local gameLast = ""

UserMgr = oo.class(nil, "UserMgr")

function UserMgr:__init( ... )
	self._userId = 0
	self._userInfo = nil
	self._user = nil
	self._key = nil
	self._username = nil
end

function UserMgr:startLogin( ip, port )
	log("UserMgr#startLogin:connect", ip, port)
	if _loginSock ~= nil then
		socket.close(_loginSock)
		_loginSock = nil
		loginLast = ""
	end

	_loginSock = socket.open(ip, port)
	log("UserMgr#startLogin:start", _loginSock)
	assert(_loginSock)

	local function unpack_f( f )
		local function try_recv( fd, last )
			local result, size

			result, last, size = f(last)
			if result then
				return result, last, size
			end

			local r = socket.read(fd)
			if r == false then
				self:serverClosed()
				return false
			end

			return f(last .. r)
		end

		return function ( fd )
			while true do
				local result, size

				result, loginLast, size = try_recv(fd, loginLast)
				if result then
					return result, size
				elseif result == false then
					return nil
				end
			end
		end
	end

	local function unpack_package( text )
		local size = #text
		if size < 2 then
			return nil, text
		end

		local s = text:byte(1) * 256 + text:byte(2)
		if size < s + 2 then
			return nil, text
		end

		return text:sub(3, 2 + s), text:sub(3 + s), s
	end

	local readPackage = unpack_f(unpack_package)

	skynet.fork(function ( ... )
		while _loginSock do
			local msgBuf, sz = readPackage(_loginSock)
			if msgBuf then
				proto.dispatch(msgBuf, sz)
			end
		end
	end)
end

function UserMgr:sendLogin( msg, id1, id2 )
	local buf, size = proto.pack(msg, id1, id2, 0)
	socket.write(_loginSock, buf)
end

function UserMgr:login( account )
	local username = account or "robot"

	self._username = username
	local msg = {
		username = username,
		token = "",
		clientPasswd = "client_passwd",
		platform = "test",
		osCode = 0,
		deviceId = "",
		codeVersion = code_version,
		userAgent = "{\"userAgent:\":\"",
		serverId = skynet.getenv("area")
	}

	self:sendLogin(msg, "login", "Login")
end

if g_userMgr == nil then
	g_userMgr = UserMgr()
end

return g_userMgr