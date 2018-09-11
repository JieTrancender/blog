lua generate_id.lua login login

\cp ../original_protocol/export/*.lua ${EXPORT_PROTOCOL_PATH}'export'


. generate_pb.sh
cd ${EXPORT_PROTOCOL_PATH}


\cp export/*.lua ${PROTOCOL_SERVER_LOGIN_EXPORT_PATH}'export'
\cp game/*pb ${PROTOCOL_SERVER_LOGIN_EXPORT_PATH}
\cp login/*pb ${PROTOCOL_SERVER_LOGIN_EXPORT_PATH}
# \cp public/*pb ${PROTOCOL_SERVER_LOGIN_EXPORT_PATH}
# \cp ../enum/*.lua ../../server/config/enum/