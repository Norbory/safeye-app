import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getSocket } from "../socket";

export function HomeScreen() {
  const socket = getSocket();

  // Reporte de prueba para el socket
  const testReport = {
    company_id: "test",
    place: "Sala de Máquinas",
    epp: "Casco",
    time: Date(),
  };

  useEffect(() => {
    socket?.emit("incident", testReport);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
