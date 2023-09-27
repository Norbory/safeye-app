import React, { useState, useEffect } from "react";
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

export function HomeScreen() {
  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      backgroundImage: DEFAULT_BACKGROUND_IMAGE,
      zona: "Sala de maquinas",
      epp: "CASCO",
      tiempo: "18:00 p.m."
    },
    {
      id: 2,
      backgroundImage: ALTERNATE_BACKGROUND_IMAGE,
      zona: "Sala de quimicos",
      epp: "CASCO",
      tiempo: "20:24 p.m."
    },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isButtonSend, setisButtonSend] = useState(false);

  const handleRedButtonPress = (id: number) => {
    const updatedCardsData = cardsData.filter((card) => card.id !== id);
    setCardsData(updatedCardsData);
  };

  const handleGreenButtonPress = () => {
    setModalVisible(true);
  };

  const updateIsButtonSend = (value) => {
    setisButtonSend(value);
  };

  useEffect(() => {
    if (isButtonSend) {
      // Si isButtonSend es true, elimina las cartas correspondientes
      cardsData.forEach((cardData) => {
        handleRedButtonPress(cardData.id);
      });
      setModalVisible(false);
      setisButtonSend(false);
    }
  }, [isButtonSend, cardsData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {cardsData.map((cardData, index) => (
          <Card
            key={index}
            backgroundImage={cardData.backgroundImage}
            onGreenButtonPress={() => handleGreenButtonPress()}
            onRedButtonPress={() => handleRedButtonPress(cardData.id)}
            onImagePress={() => {}}
            zona={cardData.zona}
            epp={cardData.epp}
            tiempo={cardData.tiempo}
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
