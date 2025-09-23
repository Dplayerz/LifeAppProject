import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Example: photos array from your database
const photos = [
  { uri: '...', latitude: 45.4463, longitude: -71.8624 },
  { uri: '...', latitude: 46.8139, longitude: -71.2080 },
  // ...more photos
];

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
    <View style={{ flex: 1 }}>
        {region ? (
          <MapView
            style={{ flex: 1 }}
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
  );
}