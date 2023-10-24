import React, { useState, useEffect, useRef } from "react";
import moment from 'moment';
import { StyleSheet, StatusBar, SafeAreaView, ScrollView, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import {
  DEFAULT_BACKGROUND_IMAGE,
  ALTERNATE_BACKGROUND_IMAGE,
  LAST_IMG,
  LIST_CASO
} from "../constantes/images";
import CustomModal from "../components/Window";
import useReports from "../hooks/useReports";
import { Report } from "../types";
import axios from "axios";
import {IP} from "../constantes/secret";


export function HomeScreen() {
  const reportList = useReports();
  const [nombreE, setNombreE] = useState("");
  const id = '65199ec6cb4d6bc2da6f49ae';

  useEffect(() => {
    const getName = async () => {
      try {
        const response = await axios.get(`https://k18gs1mk-8080.brs.devtunnels.ms/company/${id}`);
        const nombreDeLaEmpresa = response.data.Name;
        setNombreE(nombreDeLaEmpresa);
      } catch (error) {
        console.error("Error al obtener el nombre:", error);
      }
    };
    getName();
  }, []);

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
  const prove = () => {
    setModalVisible(true);
  };
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
    const selectedCard = cardsData.find((card) => card.id === id);
    if (selectedCard) {
      try {
        await axios.put(`https://k18gs1mk-8080.brs.devtunnels.ms/company/65199ec6cb4d6bc2da6f49ae/incidents/${selectedCard._id}`, { Reported: false, Deleted: true });
        selectedCard.deleted = true;
        setCardsData([...cardsData]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleGreenButtonPress = (id: number) => {
    selectedCardRef.current = { ...cardsData.find((card) => card.id === id) }; 
    idRef.current = id; 
    setModalVisible(true);
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
        <Text style={styles.empresa}>{nombreE}</Text>
        {cardsData
          .filter((cardData) => !cardData.deleted)// Filtra las tarjetas que no están marcadas como eliminad
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
            onGreenButtonPress={() => {prove()}}
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
    </SafeAreaView>
  );
}

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