import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import useReports from "../hooks/useReports";
import { Report } from "../types";

export function IncidentsScreen() {
  const [setseeAdmonished, setSetseeAdmonished] = useState(true);
  const { reportList } = useReports();

  // Renderiza lista de reportes con la propiedad admonished en true
  const renderAdmonished = () => {
    return reportList.map((report: Report, index) => {
      if (report.admonished) {
        const date = new Date(report.time);
        const time = `${date.getHours()}:${String(date.getMinutes()).padStart(
          2,
          "0"
        )}`;
        return (
          <Text style={styles.reportText} key={report._id}>
            {index + 1}. {report.epp} - {time} - {report.place}
          </Text>
        );
      }
    });
  };

  // Renderiza lista de reportes con la propiedad admonished en false
  const renderDicarted = () => {
    return reportList.map((report: Report, index) => {
      if (!report.admonished) {
        const date = new Date(report.time);
        const time = `${date.getHours()}:${String(date.getMinutes()).padStart(
          2,
          "0"
        )}`;
        return (
          <Text style={styles.reportText} key={report._id}>
            {index + 1}. {report.epp} - {time} - {report.place}
          </Text>
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => setSetseeAdmonished(true)}
        >
          <Text style={styles.buttonText}>Amonestados</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setSetseeAdmonished(false)}
        >
          <Text style={styles.buttonText}>Descartados</Text>
        </Pressable>
      </View>
      {setseeAdmonished ? (
        <>
          <Text style={styles.title}>Amonestados</Text>
          {renderAdmonished()}
        </>
      ) : (
        <>
          <Text style={styles.title}>Descartados</Text>
          {renderDicarted()}
        </>
      )}
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
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    flexDirection: "row",
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#49B4CB",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  reportText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 12,
  },
});
