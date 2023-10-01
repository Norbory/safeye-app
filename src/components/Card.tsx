import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { POPPINS } from "../constantes/fonts";

interface CardProps {
  backgroundImage: string;
  onGreenButtonPress: () => void;
  onRedButtonPress: () => void;
  onImagePress: () => void;
  zona: string;
  epp: Array<string>;
  tiempo: string;
}

const Card: React.FC<CardProps> = ({ backgroundImage, onGreenButtonPress, onRedButtonPress,onImagePress, zona, epp, tiempo}) => {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': POPPINS,
  });

  const handleImagePress = () => {
    onImagePress(); 
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.card, {backgroundColor:"#cbcdd1"}]}>
      <ImageBackground source={{ uri: backgroundImage }} resizeMode="stretch" style={styles.image} imageStyle={styles.cardImage}></ImageBackground>
      <View style={styles.letras}>
        <Text style={styles.texto}>{zona}</Text>
        <Text style={styles.texto}>{epp}</Text>
        <Text style={styles.texto}>{tiempo}</Text>
      </View>
      <View style={styles.data}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#F44343" }]}
          onPress={onRedButtonPress}
        >
          <Ionicons name="trash" size={50} color="#F1FAEE" 
                    style={styles.iconShadow}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#66C783" }]}
          onPress={onGreenButtonPress}
        >
          <Ionicons name="checkmark-sharp" size={50} color="#F1FAEE" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position:"relative",
    flex: 1,
    alignSelf:"center",
    borderRadius: 20,
    marginTop:"4%",
    marginHorizontal:10,
    flexDirection:"column",
    backgroundColor: "white",
    height:"75%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 20,
  },
  cardImage: {
    borderWidth: 0.5,
    borderColor: "#252525",
    borderRadius: 19, 
  },
  data: {
    height:"0%",
    flexDirection:"row",
    backgroundColor:"black",
    alignItems: "center",
    justifyContent: "space-around",
  },
  letras:{
    position:"absolute",
    bottom:"15%",
    left:"5%",
    borderRadius:10,
  },
  texto:{
    fontFamily:"Poppins-Bold",
    color:"#F1FAEE",
    fontSize: 18,
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  button: {
    borderWidth: 0.5,
    borderColor: "#252525",
    width: 90,
    height: 90,
    borderRadius: 45,
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
  iconShadow:{
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 8,
  },
});

export default Card;
