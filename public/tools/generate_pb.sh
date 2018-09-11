. setPath.sh

protoc --descriptor_set_out ${EXPORT_PROTOCOL_PATH}'game/loginGame.pb' --proto_path ${ORIGINAL_PROTOCOL_PATH} ${ORIGINAL_PROTOCOL_PATH}'game/loginGame.proto'
protoc --descriptor_set_out ${EXPORT_PROTOCOL_PATH}'game/test.pb' --proto_path ${ORIGINAL_PROTOCOL_PATH} ${ORIGINAL_PROTOCOL_PATH}'game/test.proto'

protoc --descriptor_set_out ${EXPORT_PROTOCOL_PATH}'login/login.pb' --proto_path ${ORIGINAL_PROTOCOL_PATH} ${ORIGINAL_PROTOCOL_PATH}'login/login.proto'