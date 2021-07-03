#!/usr/bin/bash

export ID=$(($(date +%s%N)/1000000))

function wait() {
  DOCKER_PS_OUTPUT=$(docker ps)
  if [[ $DOCKER_PS_OUTPUT =~ "tests-$ID" ]]; then
    RESULT=1
  else
    RESULT=2
  fi
}



docker network create network-$ID

docker build -t ui_tests-$ID -f ./Tests.Dockerfile .
docker-compose -p project-$ID -f jenkins.docker-compose.yml up -d

sleep 3

wait

while [ $RESULT -lt 2 ]; do
  echo 'Testing . . . '
  sleep 5
  wait
done

# Get Tests logs
docker logs tests-$ID

sleep 2

# Remove Selenoid container
docker stop selenoid-$ID
docker rm selenoid-$ID

# Remove Tests Container
docker rm tests-$ID
docker rmi ui_tests-$ID


docker-compose -f jenkins.docker-compose.yml down

