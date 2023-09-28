import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import _ from 'lodash'
import mapStyle from './mapStyle1.json'
// var imageURL = require()

/**
 *  Temp list containing the ID, location coordinates, and
 *  username of a user
 */
const markerList = [
  {
    id: 1,
    username: 'Francis',
    description: ' x',
    coordinate: {
      latitude: 39.710579,
      longitude: -75.120261
    }
  },
  {
    id: 2,
    username: 'Parth',
    description: ' sdf',
    coordinate: {
      latitude: 39.712906,
      longitude: -75.1219
    }
  },
  {
    id: 3,
    username: 'Chris',
    description: ' sdf',
    coordinate: {
      latitude: 39.718964,
      longitude: -75.113555
    }
  },
  {
    id: 4,
    username: 'Oscar',
    description: 'sdf ',
    coordinate: {
      latitude: 39.717518,
      longitude: -75.112928
    }
  }
]

const renderMarkers = () => {
  const renderedMarkers = _.map(markerList, marker => {
    const { id, username, description, coordinate } = marker

    return (
      <Marker
        key={id}
        username={username}
        description={description}
        coordinate={coordinate}
      />
    )
  })

  return renderedMarkers
}
const App = () => {
  const [myMarker, setMyMarker] = useState({
    latitude: 39.71,
    longitude: -75.1192,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  return (
    <View style={styles.container}>
      <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={myMarker}
        // userInterfaceStyle={'dark'}
        customMapStyle={mapStyle}
        showsUserLocation={true}
      >
        {renderMarkers()}
        {/* <Marker coordinate={mapRegion}>
          <Image
            source={require('./images/marker.png')}
            style={{ height: 35, width: 35 }}
          />
        </Marker> */}
      </MapView>
    </View>
  )
}
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
