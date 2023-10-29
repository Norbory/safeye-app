import React, { useState, useEffect, useRef } from "react";
import moment from 'moment';
import { StyleSheet, StatusBar, SafeAreaView, ScrollView, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import {
  DEFAULT_BACKGROUND_IMAGE,
  LAST_IMG
} from "../constantes/images";
import CustomModal from "../components/Window";
import useReports from "../hooks/useReports";
import { Report } from "../types";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import {getcompanyId} from '../utils/AuthUtils';

 
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

export function HomeScreen() {

  //Notificaciones
  // type Token = string;
  // type Notification = any;
  // const [expoPushToken, setExpoPushToken] = useState<Token>('');
  // const [notification, setNotification] = useState<Notification | null>(null);
  // const notificationListener = useRef<any>();
  // const responseListener = useRef<any>();

  const reportList = useReports();
  const [nombreE, setNombreE] = useState("");
  const { business } = useAuth();
  // Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: 'Look at that notification',
  //     body: "I'm so proud of myself!",
  //   },
  //   trigger: null,
  // });

  useEffect(() => {
    const getName = async () => {
      try {
        const nombreDeLaEmpresa = business.Name;
        setNombreE(nombreDeLaEmpresa);
      } catch (error) {
        console.error("Error al obtener el nombre:", error);
      }
    };
    getName();
  }, []);

  //Section of Notification
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token || ""));

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      backgroundImage: DEFAULT_BACKGROUND_IMAGE,
      zona: "",
      epp: "",
      tiempo: "",
      deleted: true,
      _id: ""
    }
  ]);
  
  useEffect(() => {
  const updatedCardsData = reportList.map((report: Report, index: number) => ({
    id: index + 1,
    backgroundImage: report.imageUrls[0],
    zona: report.areaName,
    epp: report.EPPs.join("   "),
    tiempo: moment(report.date).utcOffset(-5).format('D/M/YYYY H:mm'),
    deleted: report.Deleted,
    _id: report._id
  }));

  setCardsData(updatedCardsData);
}, [reportList]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isButtonSend, setisButtonSend] = useState(false);
  const selectedCardRef = useRef(null); 
  const idRef = useRef(null); 

  const handleRedButtonPress = async (id: number) => {
    const companyId = "653d63d60d58e7aa7ed22a0d";
    const updatedCardsData = [...cardsData]; // Hacer una copia de las cartas existentes
    const selectedIndex = updatedCardsData.findIndex((card) => card.id === id);
  
    if (selectedIndex !== -1) {
      try {
        await axios.put(
          `https://apicarranza-b6fd258252ec.herokuapp.com/company/${companyId}/incidents/${updatedCardsData[selectedIndex]._id}`,
          { Reported: false, Deleted: true }
        );
        updatedCardsData.splice(selectedIndex, 1);
        setCardsData(updatedCardsData);
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  const handleGreenButtonPress = async (id: number) => {
    const companyId = "653d63d60d58e7aa7ed22a0d";
    const selectedCard = cardsData.find((card) => card.id === id);
    if (selectedCard) {
      try {
        await axios.put(`https://apicarranza-b6fd258252ec.herokuapp.com/company/${companyId}/incidents/${selectedCard._id}`, { Reported: true, Deleted: true });
        selectedCardRef.current = { ...cardsData.find((card) => card.id === id) }; 
        idRef.current = id;
        setModalVisible(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const updateIsButtonSend = (value : any) => 
  //   setisButtonSend(value);
  // };

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

  const activeCardsData = cardsData.filter((cardData) => !cardData.deleted);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {cardsData
          .filter((cardData) => !cardData.deleted)
          .map((cardsData, index) => (
          <Card
            key={index}
            backgroundImage={cardsData.backgroundImage}
            onGreenButtonPress={() => handleGreenButtonPress(cardsData.id)}
            onRedButtonPress={() => handleRedButtonPress(cardsData.id)}
            onImagePress={() => {}}
            zona={cardsData.zona}
            epp={cardsData.epp}
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
        {activeCardsData.length > 0 && (
          <View style={styles.notificacion}>
            <Ionicons
              name={"ellipse-sharp"}
              size={50}
              color={activeCardsData.length > 0 ? "#F44343" : "#cbcdd1"}
              style={styles.noti}
            />
            <Text style={styles.number}>
              {activeCardsData.length}
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
        />
      )}
      {/* <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      /> */}
    </SafeAreaView>
  );
}

// Funciones para notificaciones
// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token: string | undefined;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     // Learn more about projectId:
//     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
//     token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }
//   return token;
// }

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
    fontSize: 32,
    right: 13,
    top: 2
  },
  empresa:{
    position: "absolute",
    color: "#F1FAEE",
    fontSize: 20,
    fontWeight: "bold",
    top: 8,
    left:10
  }
});