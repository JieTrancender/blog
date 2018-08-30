#! /bin/bash
ps -ef | grep blog_master | grep -v grep | cut -c 9-15 | xargs kill -9