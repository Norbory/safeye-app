import React, { useState, useEffect } from "react";
import moment from 'moment';
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
  const reportList = useReports();


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
      <ScrollView style={{ width: "100%", height: "100%" }}>
      {reportList.filter((report) => report.Deleted).map((report: Report, index: number) => (
        <View key={report._id} style={styles.reportContainer}>
          <Text style={styles.reportTitle}>Incidente {index + 1}</Text>
          <Text style={styles.reportText}>Area: {report.areaName}</Text>
          <Text style={styles.reportText}>
            EPPs: {report.EPPs.join(", ")}
          </Text>
          <Text style={report.Reported ? styles.reportedStyle : styles.notReportedStyle}>
            Reportado: {report.Reported ? "Sí" : "No"}
          </Text>

          <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {moment(report.date).utcOffset(-5).format('D/M/YYYY H:mm')}
          </Text> 
          </View>
        </View>
      ))}
  </ScrollView>

      {reportList.length < 1 && <Text>No hay reportes</Text>}
      <TouchableOpacity onPress={generatePDF} style={styles.buttonContainer}>
        <Text style={styles.tbutton}>DESCARGAR</Text>
        <Ionicons name="download" size={25} color="#fff" style={styles.iconShadow} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  
  dateContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  dateText: {
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: "#252525", // Texto oscuro
    fontSize: 24, // Tamaño de fuente ligeramente mayor
    fontWeight: "bold",
    marginBottom: 20,
  },
  reportContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#FFF", // Fondo blanco
    width: "90%", // Un poco más estrecho
    padding: 10, // Espaciado interno
    marginBottom: 20,
    borderRadius: 8, // Bordes redondeados
    shadowColor: "#000", // Sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reportTitle: {
    color: "#333",
    fontSize: 20, // Tamaño de fuente ligeramente mayor
    fontWeight: "bold",
    marginBottom: 5, // Menor espacio entre elementos
  },
  reportText: {
    color: "#555", // Texto un poco más oscuro
    fontSize: 14, // Tamaño de fuente ligeramente mayor
    fontWeight: "400",
    marginBottom: 3, // Menor espacio entre elementos
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 20, // Alineado a la derecha
    bottom: 5,
    backgroundColor: "#49B4CB",
    borderRadius: 30,
    paddingVertical: 12, // Espaciado vertical
    paddingHorizontal: 20, // Espaciado horizontal
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
  reportedStyle: {
    color: 'green', // Cambia el color según tus preferencias
    fontSize: 16,
  },

  notReportedStyle: {
    color: 'red', // Cambia el color según tus preferencias
    fontSize: 16,
  }
});
