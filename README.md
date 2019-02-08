# transcoder [![CircleCI](https://circleci.com/gh/geodatagouv/transcoder.svg?style=svg)](https://circleci.com/gh/geodatagouv/transcoder)

> Geodata transcoder for [geoplatform](https://github.com/geodatagouv/geoplatform)

[![Last Release](https://badgen.net/github/release/geodatagouv/transcoder/stable)](https://github.com/geodatagouv/transcoder/releases)
[![dependencies Status](https://badgen.net/david/dep/geodatagouv/transcoder)](https://david-dm.org/geodatagouv/transcoder)
[![XO code style](https://badgen.net/badge/code%20style/XO/cyan)](https://github.com/xojs/xo)

## Getting started

### Providers

This exposes a service to transcode geodata for the following providers:

- `links`: uses [link-proxy](https://github.com/geodatagouv/link-proxy) downloads, configured with the `LINK_PROXY_URL` environment variable.
- `services`: uses [geoplatform](https://github.com/geodatagouv/geoplatform) services, configured with the `GEOPLATFORM_URL` environment variable.

## API

This exposes one entry point per provider. It uses `ogr2ogr` to transcode the original datasets into the requested `format` and `projection`, specified as query string parameters.

### `links`

`/links/:linkId/downloads/:downloadId`

Downloads the `downloadId` file on the `linkId` link.


### `services`

`/services/:serviceId/feature-types/:name`

Downloads the feature type `name` on the `serviceId` service.

## Example

```bash
curl -v 'http://localhost:5002/links/5bfd55cfcb932f8781e74766/downloads/5c01d29bf1b5757b5b8208f2?format=SHP&projection=WGS84' >| /dev/null
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 5002 (#0)
> GET /links/5bfd55cfcb932f8781e74766/downloads/5c01d29bf1b5757b5b8208f2?format=SHP&projection=WGS84 HTTP/1.1
> Host: localhost:5002
> User-Agent: curl/7.54.0
> Accept: */*
>
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0< HTTP/1.1 200 OK
< Content-Type: application/zip
< Content-Disposition: attachment; filename="l_stationtramv2_r27.shp.zip"
< Date: Thu, 07 Feb 2019 15:34:36 GMT
< Connection: keep-alive
< Transfer-Encoding: chunked
<
{ [103 bytes data]
100  1670    0  1670    0     0   2905      0 --:--:-- --:--:-- --:--:--  2904
* Connection #0 to host localhost left intact
```

## Docker

[![Docker Pulls](https://badgen.net/docker/pulls/geodatagouv/transcoder?icon=docker)](https://hub.docker.com/r/geodatagouv/transcoder)

```bash
$ docker pull geodatagouv/transcoder:latest
```

## License

MIT

## Miscellaneous

```
    ╚⊙ ⊙╝
  ╚═(███)═╝
 ╚═(███)═╝
╚═(███)═╝
 ╚═(███)═╝
  ╚═(███)═╝
   ╚═(███)═╝
```
