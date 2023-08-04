import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CardProps {
  onGreenButtonPress: () => void;
  onRedButtonPress: () => void;
}

const Card: React.FC<CardProps> = ({ onGreenButtonPress, onRedButtonPress }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "red" }]}
        onPress={onRedButtonPress}
      >
        <Ionicons name="close-circle" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={onGreenButtonPress}
      >
        <Ionicons name="checkmark-circle" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop:"10%",
    flexDirection:"row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    height:"80%",
    width:"70%"
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

export default Card;
