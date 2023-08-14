import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import useReports from "../hooks/useReports";
import { Report } from "../types";
import { useAuth } from "../hooks/useAuth";

import { getSocket } from "../socket";

export function HomeScreen() {
  const socket = getSocket();
  const [reports, setReports] = useState<Report[]>([]);
  const { createReport } = useReports();
  const { user } = useAuth();

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
    // Mapea los reportes recibidos
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

  // Maneja crear un reporte
  const handleCreateReport = async (admonished: boolean) => {
    try {
      // Crea el reporte en la base de datos
      await createReport({ ...reports[0], admonished });
      // Elimina el reporte de la lista
      setReports((prevReports) => prevReports.slice(1));
    } catch (error) {
      console.log(error);
    }
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
      {
        // Muestra los botones para aceptar o rechazar un reporte
        reports.length === 0 ? null : (
          <>
            <Button
              title="Rechazar Reporte"
              onPress={(event) => handleCreateReport(false)}
            />

            <Button
              title="Aceptar Reporte"
              onPress={(event) => handleCreateReport(true)}
            />
          </>
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
