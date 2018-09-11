#! /bin/bash

cd ../../

WORK_BASE=${PWD}

cd public/tools

DB_IP='192.168.6.135'
DB_USER='root'
DB_PWD='root'
DB_PORT=3306
DB_VERSION='master'
DB_BASE='pkm'
CONFIG_DB=${DB_BASE}'_config_'${DB_VERSION}

CONFIG_SERVER_EXPORT_PATH=${WORK_BASE}'/server/config/config_data/'
CONFIG_CLIENT_EXPORT_PATH=${WORK_BASE}'/client/game/resource/config/'
PROTOCOL_CLIENT_EXPORT_PATH=${WORK_BASE}'/production/Resources/scripts/MainGame/Net/Protocols/'
PB_CLIENT_EXPORT_PATH=${WORK_BASE}'/production/Resources/assets/protocols/'
PROTOCOL_SERVER_GAME_EXPORT_PATH=${WORK_BASE}'/server/game/protocol/'
PROTOCOL_SERVER_LOGIN_EXPORT_PATH=${WORK_BASE}'/server/login/protocol/'
ORIGINAL_PROTOCOL_PATH=${WORK_BASE}'/public/original_protocol/'
EXPORT_PROTOCOL_PATH=${WORK_BASE}'/public/protocol/'
CONFIG_PUBLIC_EXPORT_PATH=${WORK_BASE}'/public/config/'
