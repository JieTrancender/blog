root = "./"
DEBUG = true
project_name = "client"
thread = 2
logservice = "mylogger"
logger = "./log/login"
logger = nil
harbor = 0
start = "main"
bootstrap = "snlua bootstrap"
-- standalone = "0.0.0.0:2018"
luaservice = root.."skynet/service/?.lua;"..root..project_name.."/?.lua;"..root.."skynet/test/?.lua;"..root.."skynet/examples/?.lua"
lualoader = root.."skynet/lualib/loader.lua"
cpath = root.."skynet/cservice/?.so;"..root.."cservice/?.so"
snax = root.."skynet/examples/?.lua;"..root.."skynet/test/?.lua;"..root.."service/?.lua"
lua_path = root.."lualib/?.lua;"..root.."skynet/lualib/?.lua;"..root.."skynet/lualib/?/init.lua;"..root..project_name.."/?.lua;./game/protocol/?.lua;"
lua_cpath = root.."skynet/luaclib/?.so;"..root.."luaclib/?.so"

debug_console = 11008
client_passwd = "o~p%e#r"
-- code_version = "1.0.0.0"  -- 此处不能热更

area = 1


server_id = 1