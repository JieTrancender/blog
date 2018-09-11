root = "./"
DEBUG = true
project_name = "login"
thread = 2
logservice = "mylogger"
logger = "./log/login"
logger = nil
harbor = 0
start = "main"
bootstrap = "snlua bootstrap"
-- standalone = "0.0.0.0:2018"
luaservice = root.."skynet/service/?.lua;"..root..project_name.."/?.lua;"..root.."skynet/test/?.lua;"..root.."skynet/examples/?.lua;"..root.."service/?.lua;"
lualoader = root.."skynet/lualib/loader.lua"
cpath = root.."skynet/cservice/?.so;"..root.."cservice/?.so"
lua_path = root.."lualib/?.lua;"..root.."skynet/lualib/?.lua;"..root.."skynet/lualib/?/init.lua;"..root..project_name.."/?.lua;"
snax = root.."skynet/examples/?.lua;"..root.."skynet/test/?.lua;"..root.."service/?.lua;"..root.."skynet/service/?.lua;"..root.."skynet/lualib/?.lua;"
lua_cpath = root.."skynet/luaclib/?.so;"..root.."luaclib/?.so"

debug_console = 11008
client_passwd = "o~p%e#r"
-- code_version = "1.0.0.0"  -- 此处不能热更

server_id = 1

mongo_hosts = "192.168.3.130:27017"
mongo_user = nil
mongo_passwd = nil
mongo_db = "blog_release_test_game_"..server_id

mysql_ip = "127.0.0.1"
mysql_user = "root"
mysql_passwd = "a161076566b0f278"
mysql_db = "blog_release_test_game_log_"..server_id

client_ip = "0.0.0.0"
client_port = "120"..(server_id - 1).."1"

web_ip = "0.0.0.0"
web_port = "120"..(server_id - 1).."2"

server_ip = "0.0.0.0"
server_port = "120"..(server_id - 1).."3"