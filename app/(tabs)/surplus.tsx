import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Example: photos array from your database
const photos = [
  { uri: '...', latitude: 45.4463, longitude: -71.8624 },
  { uri: '...', latitude: 46.8139, longitude: -71.2080 },
  // ...more photos
];

const HEADER_HEIGHT = 130; // Adjust as needed

export default function SurplusMapScreen() {
  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#222', marginTop:16, marginLeft: 24 }}>No filter</Text>
        <View style={{ marginTop: 16, width: '90%' }}>
          {/* Add search or other header content here */}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {region ? (
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation={true}
          >
            {photos.map((photo, idx) => (
              <Marker
                key={idx}
                coordinate={{ latitude: photo.latitude, longitude: photo.longitude }}
                title={`Photo ${idx + 1}`}
                description={photo.uri}
              />
            ))}
          </MapView>
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Loading map...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: 32,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    height: HEADER_HEIGHT,
    zIndex: 2,
  },
  map: {
    flex: 1,
    marginTop: -HEADER_HEIGHT / 2, // Slight overlap for rounded corners
  },
});