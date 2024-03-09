import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '600px',
  height: '400px',
}

const center = {
  lat: 6.6828,
  lng: 80.3992,
}

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: '6ed21df9e972ca0e',
    googleMapsApiKey: 'AIzaSyBegmRyEjys-jM18Uu8IF11oerq7kv6BYc',
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={19}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(MyComponent)
