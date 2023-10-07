import React, { useState, useEffect, useRef } from "react";
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


export function HomeScreen() {
  const reportList = useReports();

  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      backgroundImage: DEFAULT_BACKGROUND_IMAGE,
      zona: "Sala de maquinas",
      epp: "",
      tiempo: "18:00 p.m."
    }
  ]);

  useEffect(() => {
  const updatedCardsData = reportList.map((report: Report, index: number) => ({
    id: index + 1,
    backgroundImage: report.imageUrls[0],
    zona: report.areaName,
    epp: report.EPPs.join("   "),
    tiempo: report.date,
  }));

  setCardsData(updatedCardsData);
}, [reportList]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isButtonSend, setisButtonSend] = useState(false);
  const selectedCardRef = useRef(null); 
  const idRef = useRef(null); 

  const handleRedButtonPress = (id: number) => {
    const updatedCardsData = cardsData.filter((card) => card.id !== id);
    setCardsData(updatedCardsData);
  };

  const handleGreenButtonPress = (id: number) => {
    selectedCardRef.current = { ...cardsData.find((card) => card.id === id) }; 
    idRef.current = id; 
    setModalVisible(true);
  };

  const updateIsButtonSend = (value : any) => {
    setisButtonSend(value);
  };

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
      <ScrollView horizontal={true} style={styles.scrollView}>
        {cardsData.map(( cardsData,  index) => (
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
        {cardsData.length > 0 && (
          <View style={styles.notificacion}>
            <Ionicons
              name={"ellipse-sharp"}
              size={50}
              color={cardsData.length > 0 ? "#F44343" : "#cbcdd1"}
              style={styles.noti}
            />
            <Text style={styles.number}>
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
    right: 18,
    top: 2
  },
});