#!/bin/bash

set -e

function wait() {
  DOCKER_PS_OUTPUT=$(docker ps)
  if [[ $DOCKER_PS_OUTPUT =~ "tests"]]; then
    RESULT = 1
  else
    RESULT = 2
  fi
}


docker network create selenoid || true

docker pull selenoid/chrome:86.0
docker pull aerokube/selenoid:latest-release
docker build -t tests:latest -f ./Tests.Dockerfile .

docker-compose up -d

sleep 3

wait

while [ $RESULT -lt 2 ]; do
  echo 'Testing . . . '
  sleep 10
  wait
done

docker-compose down