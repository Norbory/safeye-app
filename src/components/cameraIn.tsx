import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';
import { Camera, CameraType } from 'expo-camera';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

type CameraComponentProps = {
  closeModal: (photo: string) => void;
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
      const compressedImage = await compressImage(photo.uri, 240, 587);
      const base64Image = await imageToBase64(compressedImage.uri, 'incidente.png');
      const imageSizeInBytes = base64Image.length * 0.75; // Cada carácter base64 representa 6 bits (0.75 bytes)
      const imageSizeInKB = imageSizeInBytes / 1024; // Convertir a kilobytes
      console.log('Tamaño de la imagen en kilobytes:', imageSizeInKB);
      closeModal(base64Image);
    }
  };

  const compressImage = async (uri: string, maxWidth: number, maxHeight: number) => {
    try {
      // Comprimir la imagen
      const resizedImage = await manipulateAsync(uri, 
        [{ resize: { width: maxWidth, height: maxHeight } }], 
        {
          compress: 0.4,
        }
      );
      return resizedImage;
    } catch (error) {
      console.error('Error al redimensionar la imagen:', error);
      return { uri: '' };
    }
  };

  const imageToBase64 = async (uri: string, filename: string) => {
    try {
      const imageBuffer = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const base64Data = `data:image/png;base64,${imageBuffer}`;
      // Codificar el nombre del archivo en la URL base64
      const updatedBase64Data = base64Data.replace(/data:image\/png;base64,/, `data:image/png;name=${filename};base64,`);
      return updatedBase64Data;
    } catch (error) {
      console.error('Error al convertir la imagen a base64:', error);
      return '';
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
                <Ionicons name="scan-circle-outline" size={100} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={closeModal} style={styles.close}>
            <Ionicons name="close-sharp" size={40} color="#FFFFFF" />
        </TouchableOpacity>
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
    width: Dimensions.get('window').width,
  },
  cameraButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  capture: {
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    color: '#000',
    fontSize: 18,
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CameraComponent;
