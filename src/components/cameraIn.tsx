// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import { Ionicons } from "@expo/vector-icons";
// import { Camera, CameraType } from 'expo-camera';

// type CameraComponentProps = {
//   closeModal: (photo:string) => void;
// };

// const CameraComponent: React.FC<CameraComponentProps> = ({ closeModal }) => {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const cameraRef = useRef<Camera>(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       let photo = await cameraRef.current.takePictureAsync();
//       console.log(photo.uri);
//       closeModal(photo.uri);
//       // Aquí puedes hacer lo que quieras con la foto (guardarla, mostrarla, etc.)
//     }
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No tienes acceso a la cámara</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         type={CameraType.back}
//         ref={cameraRef}
//       >
//         <View style={styles.cameraButtons}>
//           <TouchableOpacity onPress={takePicture} style={styles.capture}>
//             <Ionicons name="scan-circle-outline" size={100} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>
//         {/* onPress={closeModal} */}
//         <TouchableOpacity  style={styles.close}>
//           <Ionicons name="close-sharp" size={40} color="#FFFFFF" />
//         </TouchableOpacity>
//       </Camera>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     height: Dimensions.get('window').height,
//     width: Dimensions.get('window').width,
//   },
//   cameraButtons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   capture: {
//     alignSelf: 'center',
//     margin: 20,
//   },
//   captureText: {
//     color: '#000',
//     fontSize: 18,
//   },
//   close: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });

// export default CameraComponent;
