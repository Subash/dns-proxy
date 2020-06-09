#!/bin/bash
tag="latest"
arch=`uname -m`
[[ $arch == arm* ]] && tag="pi"
docker build -t "subash/dns-proxy:$tag" .
docker push "subash/dns-proxy:$tag"
