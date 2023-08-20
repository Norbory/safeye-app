import React, { useState } from "react";
import {StyleSheet, StatusBar, SafeAreaView, ScrollView, View, Text} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import {
        DEFAULT_BACKGROUND_IMAGE,
        ALTERNATE_BACKGROUND_IMAGE,
        LAST_IMG,
        LIST_CASO
      } from "../constantes/images"
// import EmptyCardImage from "../../assets/empty.png";

export function HomeScreen() {
  
  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      backgroundImage: DEFAULT_BACKGROUND_IMAGE,
      zona:"Sala de maquinas",
      epp:"CASCO",
      tiempo:"18:00 p.m."
    },
    {
      id: 2,
      backgroundImage: ALTERNATE_BACKGROUND_IMAGE,
      zona:"Sala de quimicos",
      epp:"CASCO",
      tiempo:"20:24 p.m."
    },
  ]);

  const handleRedButtonPress = (id: number) => {
    const updatedCardsData = cardsData.filter((card) => card.id !== id);
    setCardsData(updatedCardsData);
  };

  const handleImagePress = (id: number) => {
    // Cambiar la imagen de fondo al presionar la carta
    const updatedCardsData = cardsData.map((card) => {
      if (card.id === id) {
        // Cambiar la imagen de fondo aquí
        return {
          ...card,
          backgroundImage: LIST_CASO[0], // Reemplaza NEW_IMAGE_URI por la nueva URI de la imagen
        };
      }
      return card;
    });

    setCardsData(updatedCardsData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={true} style={styles.scrollView}>
        {cardsData.map((cardData, index) => (
            <Card
              key={index}
              backgroundImage={cardData.backgroundImage}
              onGreenButtonPress={() => {}}
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
              <Ionicons name={"ellipse-sharp"} 
                        size={50} 
                        color= {cardsData.length > 0?"#F44343":"#cbcdd1"}
                        style={styles.noti}
                        />
                  <Text style={styles.number}>
                    {cardsData.length}
                  </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex:1,
    marginHorizontal: 20,
  },
  notificacion:{
    position:"absolute",
    top:80,
    left:20,
  },
  noti:{
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
  number:{
    position:"absolute",
    color:"#F1FAEE",
    fontSize: 32,
    right:18,
    top:2
  },
});
