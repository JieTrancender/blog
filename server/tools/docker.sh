docker run -ti --name mongo_os -v /data:/data -p 27017:27017 -d mongo
docker run -ti --name server_os -v ~/blog:/data/blog -p 11001-11009:11001-11009 -d centos 
