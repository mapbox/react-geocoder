# react-geocoder

A geocoder component using Mapbox.

## api

An `accessToken` is assumed to be a valid Mapbox accessToken.

```
<Geocoder
  accessToken=required string
  onSelect=required function
  source=optional string, default 'mapbox.places-v1'
  endpoint=optional string, default 'http://api.tiles.mapbox.com'
  />
```
