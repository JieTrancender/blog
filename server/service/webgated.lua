local skynet = require "skynet"
local socket = require "skynet.socket"
local string = require "string"
local websocket = require "websocket"
local httpd = require "http.httpd"
local urllib = require "http.url"
local netpack = require "skynet.netpack"
local sockethelper = require "http.sockethelper"

local connection = {}
local handler = {}
local watchdog

function handler.on_open(ws, addr)
    connection[ws.id] = ws
    skynet.send(watchdog, "lua", "socket", "open", ws.id, addr)
end

function handler.on_message(ws, message)
    skynet.send(watchdog, "lua", "socket", "data", ws.id, string.sub(message, 3, -1))
    --ws:close()
end

function handler.on_close(ws, code, reason)
    --connection[ws.id] = nil
    skynet.send(watchdog, "lua", "socket", "close", ws.id)
end

local function handle_socket(id, addr)
    -- limit request body size to 8192 (you can pass nil to unlimit)
    print("------handler_socket")
    local code, url, method, header, body = httpd.read_request(sockethelper.readfunc(id), 8192)
    print("-------", code, url, method, header, body)
    if code then

        if url == "/ws" then
            local ws = websocket.new(id, header, handler, nil , addr)
            ws:start()
        end
    end
end

local CMD = {}
function CMD.start( source, conf )
    -- body    
    print("webgated start")
    watchdog = source
    local address = conf.address or "0.0.0.0"
    local port = assert(conf.port)
    maxclient = conf.maxclient or 1024

    skynet.error(string.format("Listen on %s:%d", address, port))

    local id = assert(socket.listen(address, port))
    socket.start(id , function(id, addr)
       socket.start(id)
       pcall(handle_socket, id, addr)
    end)
end

--kick out client
function CMD.kick( source, id )
    if connection[id] then
        connection[id]:close()
        connection[id] = nil
    end
end

--send message to client
function CMD.send( source, id, message )
    local ws = connection[id]
    if ws then
        ws:send_binary(message)
    else
        skynet.error(string.format("websocket not exist %s", id))
    end
end

skynet.start(function()
    skynet.dispatch("lua", function(session, source, command, ...)
        print("webgated:", session, source, command)
        local f = assert(CMD[command], string.format("source:%s, command:%s", skynet.address(source), command))
        if session > 0 then
            skynet.retpack(f(source, ...))
        else
            f(source, ...)
        end
    end)
end)
