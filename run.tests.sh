#!/usr/bin/bash

docker pull selenoid/chrome:latest
docker pull aerokube/selenoid:latest-release

docker run -d -p 4444:4444 --name selenoid -v $PWD/src/config/:/etc/selenoid/ -v /var/run/docker.sock:/var/run/docker.sock aerokube/selenoid:latest-release

npm install

npm run test:ci

