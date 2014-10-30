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
  inputClass=optional string, default ''
  inputPlaceholder=optional string, default 'Search'
  resultClass=optional string, default ''
  resultsClass=optional string, default ''
  inputPosition=optional string, default 'top', can be 'bottom'
  resultFocusClass=optional string, default 'strong'
  />
```
