#!/bin/bash
TAG="latest"
ARCH=`uname -m`
[[ $ARCH == arm* ]] && TAG="pi"
docker build -t "subash/dns-proxy:$TAG" .
docker push "subash/dns-proxy:$TAG"
