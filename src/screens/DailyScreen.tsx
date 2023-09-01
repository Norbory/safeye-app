import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  Button
} from "react-native";
import useReports from "../hooks/useReports";
import { Report } from "../types";
import RNHTMLtoPDF from "react-native-html-to-pdf";

export function DailyScreen() {
  const { reportList } = useReports();

  const handleDownloadPDF = async () => {
    // Convertir el contenido HTML en PDF
    let options = {
      html: "<h1>Reporte de incidentes semanales</h1><h2>Incidente #138HJSF78J</h2><p>Zona: Sala de maquinas</p><p>EPP: Casco</p>",
      fileName: "formulario.pdf",
      directory: "Documents",
    };

    const file = await RNHTMLtoPDF.convert(options);

    // Proporcionar el enlace para descargar el PDF
    console.log("Archivo PDF generado:", file.filePath);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de incidentes</Text>
      <Button title="Descargar PDF" onPress={handleDownloadPDF} />
      <ScrollView style={{ width: "100%", height: "100%" }}>
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
});
