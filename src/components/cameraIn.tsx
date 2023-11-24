import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

type CameraComponentProps = {
  closeModal: () => void;
};

const CameraComponent: React.FC<CameraComponentProps> = ({ closeModal }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      // Aquí puedes hacer lo que quieras con la foto (guardarla, mostrarla, etc.)
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No tienes acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.back}
        ref={cameraRef}
      >
        <View style={styles.cameraButtons}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={styles.captureText}>Tomar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal} style={styles.close}>
            <Text style={styles.closeText}>Cerrar cámara</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
  },
  cameraButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    color: '#000',
    fontSize: 18,
  },
  close: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  closeText: {
    color: '#000',
    fontSize: 18,
  },
});

export default CameraComponent;
