import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  TouchableOpacity
} from "react-native";
import useReports from "../hooks/useReports";
import { Report } from "../types";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import {HTML} from "../constantes/html";
import { Ionicons } from "@expo/vector-icons";


export function DailyScreen() {
  const { reportList } = useReports();

  let generatePDF = async () => {
    const file = await printToFileAsync({ 
      html: HTML,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de incidentes</Text>
      <TouchableOpacity onPress={generatePDF} style={styles.buttonContainer}>
        <Text style={styles.tbutton}>DESCARGAR</Text>
        <Ionicons name="download" size={25} color="#fff" style={styles.iconShadow} />
      </TouchableOpacity>
      <ScrollView style={{ width: "100%", height: "100%"}}>
        {reportList.map((report: Report, index) => (
          <View key={report._id} style={styles.reportContainer}>
            <Text style={styles.reportTitle}>Incidente {index + 1}</Text>
            <Text style={styles.reportText}>Elemento: {report.epp}</Text>
            <Text style={styles.reportText}>Zona: {report.place}</Text>
            <Text style={styles.reportText}>
              Estado: {report.admonished ? "Amonestado" : "Descartado"}
            </Text>
            <Text style={styles.reportText} key={report._id}>
              Supervisor: {report.supervisor}
            </Text>
          </View>
        ))}
      </ScrollView>
      {reportList.length < 1 && <Text>No hay reportes</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 100,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  reportContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    color: "#fff",
    width: "100%",
    marginBottom: 20,
    marginLeft: 20,
    gap: 4,
  },
  reportTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  reportText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "400",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right:10,
    bottom: 30,
    alignSelf: "flex-end",
    backgroundColor: "#49B4CB",
    borderRadius: 30,
    padding: 12,
    shadowColor: "#252525",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconShadow: {
    marginLeft: 3,
    shadowColor: "#252525",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tbutton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
