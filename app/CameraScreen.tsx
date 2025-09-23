import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraType, CameraView } from 'expo-camera';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType>('back');
  const [flash, setFlash] = useState<'on' | 'off'>('off');
  const navigation = useNavigation();
  const [isCameraOpen, setIsCameraOpen] = useState(true);


  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
      return () => {
        navigation.getParent()?.setOptions({ tabBarStyle: undefined });
      };
    }, [navigation])
  );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      // Request media library permissions
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      if (mediaStatus.status !== 'granted') {
        alert('Media Library permission is required to save and access photos.');
      }
      // Request location permissions
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (locationStatus.status !== 'granted') {
        alert('Location permission is required to save location with photos.');
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={type}
        flash={flash}
        ratio="16:9"
      />
      {/* Controls are absolutely positioned over CameraView */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 50, left: 20, zIndex: 10, backgroundColor: '#eee', borderRadius: 20, padding: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Return</Text>
      </TouchableOpacity>
      <View style={styles.topControls}>
        <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => setFlash(flash === 'off' ? 'on' : 'off')} style={{ marginBottom: 16 }}>
            <Ionicons name={flash === 'on' ? 'flash' : 'flash-off'} size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setType(type === 'back' ? 'front' : 'back')}>
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomControls}>
        <View style={{ width: 50 }} />
        <TouchableOpacity style={styles.shutterButton}
          onPress={async () => {
            if (cameraRef.current) {
              // @ts-ignore
              const photo = await cameraRef.current.takePictureAsync();
              // Get device location
              const location = await Location.getCurrentPositionAsync({});
              console.log('Photo URI:', photo.uri);
              console.log('Device location:', location.coords); // latitude, longitude
              router.push({ pathname: '/Review', params: { latitude: location.coords.latitude, longitude: location.coords.longitude, uri: photo.uri } });
              // Close camera after taking picture
              navigation.goBack();
            }
          }}
        >
          <View style={styles.shutterInner} />
        </TouchableOpacity>
        <View style={{ width: 50 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  camera: { flex: 1, borderRadius: 20, overflow: 'hidden' },
  topControls: {
    position: 'absolute', top: 40, left: 30, right: 30, flexDirection: 'row', justifyContent: 'space-between', zIndex: 1,
  },
  bottomControls: {
    position: 'absolute', bottom: 40, left: 30, right: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  shutterButton: {
    width: 70, height: 70, borderRadius: 35, borderWidth: 5, borderColor: 'white', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.2)',
  },
  shutterInner: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: 'white',
  },
  thumbnail: {
    width: 50, height: 50, borderRadius: 10, backgroundColor: '#222',
  },
});
