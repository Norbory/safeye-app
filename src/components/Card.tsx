import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CardProps {
  backgroundImage: string;
  onGreenButtonPress: () => void;
  onRedButtonPress: () => void;
}

const Card: React.FC<CardProps> = ({ backgroundImage, onGreenButtonPress, onRedButtonPress}) => {
  return (
    <View style={styles.card}>
      
      <ImageBackground source={{ uri: backgroundImage }} resizeMode="cover" style={styles.image}></ImageBackground>
      <View style={styles.letras}>
        <Text style={styles.salon}>Sala de maquinas</Text>
        <Text style={styles.epp}>Casco</Text>
        <Text style={styles.time}>18:00</Text>
      </View>
      <View style={styles.data}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={onRedButtonPress}
        >
          <Ionicons name="trash" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={onGreenButtonPress}
        >
          <Ionicons name="checkmark-circle" size={40} color="white" />
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
    borderWidth: 1.2,
    borderColor: "#dadce3",
    borderRadius: 20,
    marginTop:"6%",
    marginHorizontal:10,
    flexDirection:"column",
    backgroundColor: "white",
    height:"80%",
    overflow: "hidden",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 20,
  },
  data: {
    flexDirection:"row",
    backgroundColor:"black",
    alignItems: "center",
    justifyContent: "space-around",
  },
  letras:{
    position:"absolute",
    bottom:"18%",
    left:"5%",
    backgroundColor:"rgba(0, 0, 0, 0.1)",
    borderRadius:10,
  },
  salon:{
    color:"white",
    fontSize: 18,
    fontWeight: 'bold',
  },
  epp:{
    color:"white",
    fontSize: 18,
    fontWeight: 'bold',
  },
  time:{
    color:"white",
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 55,
  },
});

export default Card;
