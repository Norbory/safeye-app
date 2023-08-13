import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { getSocket } from "../socket";

export function StatisticsScreen() {
  //  SOLO PARA PRUEBA ELIMINAR LUEGO //
  const socket = getSocket();
  // Reporte de prueba para el socket
  const testReport1 = {
    company_id: "test",
    place: "Sala de Máquinas",
    epp: "Casco",
    time: Date(),
  };

  const testReport2 = {
    company_id: "test",
    place: "Sala de Máquinas",
    epp: "Chaleco",
    time: Date(),
  };

  useEffect(() => {
    socket?.emit("incident", testReport1);
    setTimeout(() => {
      socket?.emit("incident", testReport2);
    }, 5000);
  }, []);
  //  SOLO PARA PRUEBA ELIMINAR LUEGO //

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Statistics Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
