import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";

export function DailyScreen() {
  interface Report {
    _id: string;
    company_id: string;
    epp: string;
    place: string;
    time: string;
    admonished: boolean;
    supervisor: string;
  }

  const useReports = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const serverUrl = "http://192.168.1.5:3000";

    const fetchReports = async () => {
      const response = await axios.get(
        `${serverUrl}/api/reports/641631458381e6dbffdc3c51`
      );
      const reports = response.data;

      setReports(reports);
    };

    useEffect(() => {
      fetchReports();
    }, []);

    useEffect(() => {
      console.log(reports);
    }, [reports]);

    return reports;
  };

  const reportList = useReports();
  const firstReport = reportList.length > 0 ? reportList[0] : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de incidentes</Text>
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
