#!/bin/bash

if [ $# != 1 ]
then
	echo 'usage:./generatePage.sh pageName';
else
	mkdir ../pages/$1;
	echo "mkdir pages/"$1;

	touch ../pages/$1/$1.wxml;
	echo "touch pages/"$1"/"$1".wxml";

	echo {} > ../pages/$1/$1.json;
	echo "echo {} > pages/"$1"/"$1".json";

	# touch ../pages/$1/$1.js;
	# echo "touch pages/"$1"/"$1".js";

	echo "Page({})" > ../pages/$1/$1.js;
	echo "echo Page({}) > pages/"$1"/"$1".js";

	touch ../pages/$1/$1.wxss;
	echo "touch pages/"$1"/"$1".wxss";
fi
