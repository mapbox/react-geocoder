# react-geocoder

A geocoder component using Mapbox.

## api

An `accessToken` is assumed to be a valid Mapbox accessToken.

```
<Geocoder
  accessToken=required string
  onSelect=required function
  onSuggest=optional function
  source=optional string, default 'mapbox.places'
  endpoint=optional string, default 'http://api.tiles.mapbox.com'
  inputClass=optional string, default ''
  inputPlaceholder=optional string, default 'Search'
  resultClass=optional string, default ''
  resultsClass=optional string, default ''
  showLoader=optional string, default ''
  inputPosition=optional string, default 'top', can be 'bottom'
  resultFocusClass=optional string, default 'strong'
  proximity=optional string, default '',
  bbox=optional string, default '',
  limit=optional number, default 5 for forward, 1 for reverse
    (a single `type` must be specified to use the `limit` parameter for reverse queries)
  focusOnMount=optional bool, default true
  />
```
