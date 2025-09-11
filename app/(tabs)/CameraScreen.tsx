import { Camera, CameraType, CameraView } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
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
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.controls}>
          <Button
            title="Flip Camera"
            onPress={() => {
              setFacing(facing === "back" ? "front" : "back");
            }}
          />
          <Button
            title="Take Picture"
            onPress={async () => {
              if (cameraRef.current) {
                const photo = await cameraRef.current.takePictureAsync();
                console.log(photo.uri);
              }
            }}
          />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  controls: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
