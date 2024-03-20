import 
  React, 
  { useState, 
    useEffect, 
    useRef   
} from "react";
import moment from 'moment';
import { 
  StyleSheet, 
  StatusBar, 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text,
  Alert,
  Pressable,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Button,
  Platform
} from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import {
  DEFAULT_BACKGROUND_IMAGE,
  LAST_IMG
} from "../constantes/images";
import { URL, COMPANY_ID } from "../constantes/string";
import CustomModal from "../components/Window.jsx";
import useReports from "../hooks/useReports";
import useAreas  from "../hooks/useAreas";
import { Report, Area } from "../types";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import CameraComponent from "../components/cameraIn";
import Voice from '@react-native-voice/voice'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { getToken } from "../utils/AuthUtils";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token?.data;
}

export function HomeScreen() {
  //Camara settings
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedPhotoUri, setCapturedPhotoUri] = useState("");

  //Push notifications settings
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = (photoUri: string) => {
    setIsCameraOpen(false);
    setCapturedPhotoUri(photoUri);
  };

  const { user } = useAuth();

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const reportList = useReports();
  const areaList = useAreas();
  const [selectedId, setSelectedId] = useState<string>("");

  const [modal1, setModal1] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isButtonSend, setisButtonSend] = useState(false);
  const selectedCardRef = useRef(null); 
  const idRef = useRef(null); 

  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      backgroundImage: DEFAULT_BACKGROUND_IMAGE,
      zona: "",
      epp: "",
      tiempo: "",
      deleted: true,
      _id: "",
      supervisor: ""
    }
  ]);
  
  const handleUpdateCards = () => {
    // Actualiza el estado de las cartas con la nueva lista de userReports
    const updatedCardsData = reportList.filter((report) => !report.Deleted).map((report: Report, index: number) => ({
      id: index + 1,
      backgroundImage: report.imageUrls[0],
      zona: report.areaName,
      epp: report.EPPs.join("   "),
      tiempo: moment(report.date).format('D/M/YYYY     H:mm'),
      deleted: report.Deleted,
      _id: report._id,
      supervisor: report.supervisor || "Supervisor no registrado"
    }));
    setCardsData(updatedCardsData);
  };
  
  const [selected, setSelected] = useState("");

  const data = areaList.map((area: Area) => ({key: area._id, value: area.name}));

  //Voice settings
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);

  //Recording settings
  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const registerToken = async (token: string) => {
    await axios.post(`${URL}/company/${COMPANY_ID}/tokens`, {
      token
    });
  };

  const startSpeechToText = async () => {
    await Voice.start("en-US");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result: any) => {
    setResults(result.value);
  };

  const onSpeechError = (error: any) => {
    console.log(error);
  };

  const addNewCard = async () =>{
    setModal1(true);
  }
  
  const closeModal = () =>{
    setModal1(false);
  }
 
  const handleRedButtonPress = async (id: number) => {
    const updatedCardsData = [...cardsData]; // Hacer una copia de las cartas existentes
    const selectedIndex = updatedCardsData.findIndex((card) => card.id === id);
  
    if (selectedIndex !== -1) {
      Alert.alert(
        "¿Estás seguro de descartar este incidente?",
        "Una vez descartado, no podrás recuperar la información.",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Sí, descartar",
            onPress: async () => {
              
              try {
                await axios.put(
                  `${URL}/company/${COMPANY_ID}/incidents/${updatedCardsData[selectedIndex]._id}`,
                  { Reported: false, Deleted: true }
                );
                setMessage('El incidente fue eliminado exitosamente.');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
              } catch (error) {
                console.error("Hubo un error el cual es el siguiente: ",error);
                setMessage('Hubo un error al intentar descartar el incidente.');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
              }
            }
          }
        ],
        { cancelable: false }
      );
    }
  };
  
  const handleGreenButtonPress = async (id: number) => {
    const updatedCardsData = [...cardsData];
    const selectedIndex = updatedCardsData.findIndex((card) => card.id === id);
    if (selectedIndex !== -1) {    
      setSelectedId(updatedCardsData[selectedIndex]._id);
      // Mostrar el modal
      setModalVisible(true);
  }};

  const handleEnvio = async (area: string) => {
    Alert.alert(
      "¿Estás seguro de registrar este incidente?",
      "Una vez registrado, no podrás modificar la información.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Sí, registrar",
          onPress: async () => {
            try {
              // Enviar la solicitud POST
              const response = await axios.post(`${URL}/company/${COMPANY_ID}/incidents`, {
                ID_area: area, // Adjuntar el ID del área
                ID_Cam: "6505633501f1e713f9f60f70",
                supervisor: user?.name, // Adjuntar el nombre del supervisor
                imageUrls: [`"${capturedPhotoUri}"`], // Adjuntar la imagen en base64
              });
              setModal1(false);
              setCapturedPhotoUri("");
              setMessage('El incidente fue registrado exitosamente.');
              setShowMessage(true);
              setTimeout(() => setShowMessage(false), 3000);
              setSelectedId(response.data._id);
              setModalVisible(true);
            } catch (error) {
              console.error("Error al enviar:", error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };
  
  useEffect(() => {
    handleUpdateCards();
  }, [reportList]);

  useEffect(() => {
    if (expoPushToken){
      registerToken(expoPushToken);
    }
  }, [expoPushToken]);

  useEffect(() => {
    if (isButtonSend) {
      if (idRef.current !== null) {
        const updatedCardsData = cardsData.filter((card) => card.id !== idRef.current);
        setCardsData(updatedCardsData);
      }
  
      if (selectedCardRef.current) {
        console.log("Tarjeta seleccionada:", selectedCardRef.current);
        console.log("ID seleccionado:", idRef.current);
      }
  
      setModalVisible(false);
      setisButtonSend(false);
    }
  }, [isButtonSend, cardsData]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.add} onPress={()=>addNewCard()}>
        <Text style={styles.empresa}>Añadir incidente +</Text>
      </Pressable>
      
      <ScrollView horizontal={true} style={styles.scrollView}>
        {cardsData
          .map((cardsData, index) => (
          <Card
            key={index}
            backgroundImage={cardsData.backgroundImage??DEFAULT_BACKGROUND_IMAGE}
            onGreenButtonPress={() => handleGreenButtonPress(cardsData.id)}
            onRedButtonPress={() => handleRedButtonPress(cardsData.id)}
            onImagePress={() => {}}
            zona={cardsData.zona}
            epp={cardsData.epp.length > 0 ? cardsData.epp : `S: ${cardsData.supervisor}`}
            tiempo={cardsData.tiempo}
          />
        ))}
        {cardsData.length === 0 && (
          <Card
            backgroundImage={LAST_IMG}
            onGreenButtonPress={() => {}}
            onRedButtonPress={() => {}}
            onImagePress={() => {}}
            zona={""}
            epp={""}
            tiempo={""}
          />
        )}
        {cardsData.length > 0 && (
          <View style={styles.notificacion}>
            <Ionicons
              name={"ellipse-sharp"}
              size={50}
              color={cardsData.length > 0 ? "#F44343" : "#cbcdd1"}
              style={styles.noti}
            />
            <Text style={cardsData.length < 10 ? styles.number1 : styles.number}>
              {cardsData.length}
            </Text>
          </View>
        )}
      </ScrollView>

      {isModalVisible && (
        <CustomModal
          isModalVisible={isModalVisible}
          setisButtonSend={setisButtonSend}
          onClose={() => {
            setModalVisible(false);
          }}
          incidentId={selectedId}
        />
      )}

      {showMessage && (
        <Text style={{
          position: 'absolute',
          zIndex: 1,
          backgroundColor: 'rgba(128, 128, 128, 0.5)', // Fondo gris claro con transparencia
          padding: 10, // Añade relleno alrededor del texto
          borderRadius: 10, // Agrega bordes redondeados alrededor del mensaje
          textAlign: 'center', // Centra el texto horizontalmente
          width: '80%', // Define el ancho del mensaje
          top: '50%', // Posiciona el mensaje en la mitad de la pantalla verticalmente
          left: '10%', // Centra el mensaje horizontalmente
          transform: [{ translateY: -50 }], // Ajusta el mensaje verticalmente hacia arriba
          color: 'white',
          fontSize: 16,
          fontWeight:"700",
        }}>
          {message}
        </Text>
      )}     
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal1}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.title}>Añade una desviación</Text>
          <Text style={styles.subtitle}>Zona donde ocurrio:</Text>
          <SelectList 
            setSelected={(key: React.SetStateAction<string>) => setSelected(key)} 
            data={data} 
            save="key"
          />
          <Text style={styles.subtitle}>Fotografía del incidente:</Text>

          <View style={styles.fotoRow}>
            <ImageBackground 
              source={{uri:capturedPhotoUri?capturedPhotoUri:LAST_IMG}} 
              style={styles.imagen} 
            />
            <TouchableOpacity 
              onPress={openCamera}
              style={[styles.buttonFoto]}
            >
              <Ionicons
                name={"camera-outline"}
                size={40}
                color={"#FFFFFF"}
                style={styles.noti}
              />
            </TouchableOpacity>
          </View>
          {!started ? <Button title='Start Speech to Text' onPress={startSpeechToText} /> : undefined}
          {started ? <Button title='Stop Speech to Text' onPress={stopSpeechToText} /> : undefined}
          {results.map((result, index) => <Text key={index}>{result}</Text>)}
          <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={() => handleEnvio(selected)}
              style={styles.buttonSend}>
              <Text style={styles.modales}>REGISTRAR</Text>
            </TouchableOpacity>
            <Pressable
              style={styles.buttonDelete}
              onPress={() => closeModal()}>
              <Text style={styles.modales}>CANCELAR</Text>
            </Pressable>
          </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent={true} visible={isCameraOpen}>
        <View style={styles.cameraModal}>
          <CameraComponent closeModal={closeCamera}/>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
  notificacion: {
    position: "absolute",
    top: 80,
    left: 20,
  },
  noti: {
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
  number: {
    position: "absolute",
    color: "#F1FAEE",
    fontSize: 28,
    right: 10,
    top: 3
  },
  number1: {
    position: "absolute",
    color: "#F1FAEE",
    fontSize: 28,
    right: 18,
    top: 4
  },
  empresa:{
    position: "absolute",
    color: "#F1FAEE",
    fontSize: 16,
    fontWeight: "bold",
    top: 7,
    left:18
  },
  add:{
    position:"absolute",
    top: 90,
    right: -10,
    zIndex:1,
    borderWidth: 0.5,
    borderColor: "#252525",
    backgroundColor:"#3d3680",
    width: 180,
    height: 40,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 40,
    bottom:20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 8,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginHorizontal: 20,
  },
  buttonClose: {
    backgroundColor: '#4a4e69',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  title:{
    fontSize: 24,
    fontWeight:"700",
    textAlign: "center",
  },
  subtitle:{
    fontSize: 14,
    fontWeight:"500",
    marginTop: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxForm:{
    flexDirection:"row"
  },
  cameraModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center", // Alinea verticalmente en el centro
    marginBottom: 5, // Espacio entre la fila y otros elementos
  },
  buttonSend: {
    flex: 1,
    maxHeight: "100%",
    maxWidth: "100%",
    borderRadius: 10,
    backgroundColor: "#31CF5A",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 10,
    marginHorizontal: 5,
  },
  buttonDelete: {
    flex: 1,
    maxHeight: "100%",
    maxWidth: "100%",
    borderRadius: 10,
    backgroundColor: "#DF344B",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 10,
    marginHorizontal: 5,
  },
  modales: {
    color: "#F1FAEE",
    fontWeight: "500",
  },
  imagen: {
    width: 180, 
    height: 180, 
    alignSelf: 'center', 
    marginVertical: 8,
  },
  fotoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonFoto: {
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    marginHorizontal: 20,
    backgroundColor: '#4a4e69',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});


