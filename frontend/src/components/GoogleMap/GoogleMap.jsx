import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = {
  lat: -3.745,
  lng: -38.523,
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
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Add Marker component with position prop */}
      <Marker position={center} />

      {/* You can add more markers by creating additional Marker components with different positions */}
      {/* <Marker position={{ lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE }} /> */}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(MyComponent)
