#!/bin/sh

docker stop test.local;
docker rm test.local;

docker run -it \
-h test.local \
--name test.local \
--net=my-docker-network --ip=10.10.0.2 \
-v /media/valeriy/Data/Work/FRONTEND/DOCKER/testApp/DATA:/usr/src/local/ \
bombit/test
