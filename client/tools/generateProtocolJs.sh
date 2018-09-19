#!/bin/bash

if [ $# != 1 ]
then
	echo 'usage:./generateProtocolJs.sh protocolName';
else
	pbjs -t json ../protobuf/$1.proto > ../json/$1.json;
	cp ../json/$1.json ../js/$1.js;
	sed -i '1i\module.exports = ' ../js/$1.js;
fi
