import React, { useState } from "react";
import moment from 'moment';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  Pressable,
  Modal,
  ImageBackground
} from "react-native";
import useReports from "../hooks/useReports";
import { Report } from "../types";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import {HTML} from "../constantes/html";
import * as FileSystem from 'expo-file-system';
import { URL } from "../constantes/string";

export function DailyScreen() {
  const reportList = useReports();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  let generatePDF = async () => {
    const file = await printToFileAsync({ 
      html: HTML,
      base64: false,
    });

    await shareAsync(file.uri);
    setSelectedReport(null); 
    setModalVisible(false);
  };

  const descargarPDF = async (incidentId:String) => {
      
      const url =`${URL}/company/report/${incidentId}`
      console.log(incidentId);
      try {      

        let LocalPath = FileSystem.cacheDirectory  + 'lorem-ipsum.pdf';
        const result= await FileSystem.downloadAsync(url, LocalPath)
        
        if (result.status === 200) {
          console.log('Downloaded Successfully');
          await shareAsync(result.uri);
          setSelectedReport(null); 
          setModalVisible(false);
        } else {
          console.log('Download Failed');
        }

    } catch (error) {
      console.log(error);
    }
  };

  {/* Agrego el Modal */}
  let showCard = (report:Report) => {
    setSelectedReport(report);
    setModalVisible(true);
  };

  let closeModal = () => {
    setSelectedReport(null); 
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de incidentes</Text>
      <ScrollView style={{ width: "100%", height: "100%" }}>

      {/* Lista de incidentes Tarjetas */}
      {reportList.filter((report) => report.Deleted).map((report: Report, index: number) => (
        <View key={report._id}>
        <Pressable 
          key={report._id} 
          style={styles.reportContainer}
          onPress={() => showCard(report)}
        >
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
        </Pressable>
        </View>
      ))}
  </ScrollView>
      {reportList.length < 1 && <Text>No hay reportes</Text>}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.titleText}>Incidente</Text>

            {/* Contenedor para la imagen, área y EPPs */}
            <View style={styles.imageAreaEPPContainer}>
              <ImageBackground source={{ uri: selectedReport?.imageUrls[0] }} style={styles.reportImage}></ImageBackground>

              <View style={styles.reportDetails}>
                <Text style={styles.modalText}>Área: {selectedReport?.areaName}</Text>
                <Text style={styles.modalText}>EPPs: {selectedReport?.EPPs.join(", ")}</Text>
              </View>
            </View>

            {/* Contenedor para los botones en una fila */}
            <View style={styles.botones}>
              <Pressable
                style={[styles.button, styles.buttonClose,   {
                  backgroundColor: selectedReport && selectedReport.Reported === false ? 'grey' : '#2196F3', // Cambia 'blue' al color que desees cuando esté habilitado
                },]}
                onPress={() => descargarPDF( String(selectedReport?._id) )}
                disabled={selectedReport && selectedReport.Reported === false}
                >
                <Text style={styles.textStyle}>Descargar reporte</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => closeModal()}>
                <Text style={styles.textStyle}>Salir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  reportedStyle: {
    color: 'green', // Cambia el color según tus preferencias
    fontSize: 16,
  },
  notReportedStyle: {
    color: 'red', // Cambia el color según tus preferencias
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal:3
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  titleText:{
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20
  },
  imageAreaEPPContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportImage: {
    width: 100,
    height: 160, 
    marginRight: 10,
  },
  reportDetails: {
    flex: 1,
    justifyContent:'flex-start'
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
