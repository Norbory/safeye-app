import React, { useState } from "react";
import {StyleSheet, StatusBar, SafeAreaView, ScrollView, View, Text} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
// import EmptyCardImage from "../../assets/empty.png";

export function HomeScreen() {
  
  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      backgroundImage: "https://www.eloficial.ec/wp-content/uploads/2014/02/casco_s.png",
    },
    {
      id: 2,
      backgroundImage: "https://prosinfer.com/wp-content/uploads/slider2/articulos-de-seguridad-industrial-lima-peru-minas-construccion-compressor.png",
    },
  ]);

  const handleRedButtonPress = (id: number) => {
    const updatedCardsData = cardsData.filter((card) => card.id !== id);
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
            />
          ))}
        {cardsData.length === 0 && (
          <Card
              backgroundImage={"https://static.thenounproject.com/png/357658-200.png"}
              onGreenButtonPress={() => {}}
              onRedButtonPress={() => {}}
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
