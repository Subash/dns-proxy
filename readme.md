# dns-proxy
Simple server to proxy UDP DNS queries to UDP or DNS Over HTTPS servers.

![Dependencies](https://img.shields.io/david/subash/dns-proxy.svg)
![GitHub](https://img.shields.io/github/license/subash/dns-proxy.svg)

## Running
- Install Docker
- Set up static IP and DNS on the device running dns-proxy
- Change the DNS server on your router to the IP address of the device running dns-proxy

### 1. With `docker`

```shell
docker run -d \
  --env REMOTE_SERVERS=1.1.1.1 \
  -p 53:53/udp \
  subash/dns-proxy
```

### 2. With `docker-compose`

```yaml
services:
  adburner:
    image: "subash/dns-proxy"
    restart: "always"
    env:
      - "REMOTE_SERVERS=1.1.1.1"
    ports:
      - "53:53/udp"
```

## Configuration
A comma separated list of remote servers can be set by using the `REMOTE_SERVERS` environment variable. By default dns-proxy uses CloudFlare's DNS over HTTPS server. The list of remote servers can contain URLs for DNS Over HTTPS servers and plain IP addresses for UDP servers.

Note:
1. DNS over HTTPS can only be used to query upstream servers. dns-proxy itself can only resolve udp queries.
2. When multiple remote servers are provided, dns-proxy queries all of them and picks whichever is faster.
