import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Report } from "../types";

import { getSocket } from "../socket";

export function HomeScreen() {
  const socket = getSocket();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // Recibe los reportes del socket
    const handleReport = (report: Report) => {
      console.log(report);
      setReports((prevReports) => [...prevReports, report]);
    };

    socket?.on("sendReport", handleReport);

    return () => {
      socket?.off("incident", handleReport);
    };
  }, [socket]);

  // Renderiza los reportes recibidos
  const renderReports = () => {
    return reports.map((report, index) => {
      const date = new Date(report.time);
      const time = `${date.getHours()}:${String(date.getMinutes()).padStart(
        2,
        "0"
      )}`;
      return (
        <Text style={styles.text} key={index}>
          {index + 1}. {report.epp} - {time} - {report.place}
        </Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      {
        // Muestra los reportes recibidos
        reports.length === 0 ? (
          <Text style={styles.text}>No hay reportes</Text>
        ) : (
          <View>
            <Text style={styles.text}>Reportes:</Text>
            {renderReports()}
          </View>
        )
      }
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
