. setPath.sh

lua generate_id.lua game loginGame
lua generate_id.lua game test

\cp ../original_protocol/export/*.lua ${EXPORT_PROTOCOL_PATH}'export/'

. generate_pb.sh
cd ${EXPORT_PROTOCOL_PATH}

\cp export/*.lua ${PROTOCOL_SERVER_GAME_EXPORT_PATH}'export'
\cp login/*pb ${PROTOCOL_SERVER_GAME_EXPORT_PATH}
\cp game/*pb ${PROTOCOL_SERVER_GAME_EXPORT_PATH}
# \cp public/*pb ${PROTOCOL_SERVER_GAME_EXPORT_PATH}

# \cp ../enum/*.lua ../../server/config/enum/

echo "导出成功"
