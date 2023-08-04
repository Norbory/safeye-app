import { StyleSheet, Text, View } from "react-native";
import Incident from "./components/Incident";

export function DailyScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.title}>Resumen de incidentes</Text>
      <Incident
        Incident="M1416M"
        Element="Mandil"
        Zone="Quimicos"
        State="Amonestado"
        Supervisor="Ing. Luis Lopez"
      />
      <Incident
        Incident="M1416M"
        Element="Mandil"
        Zone="Quimicos"
        State="Amonestado"
        Supervisor="Ing. Luis Lopez"
      />
      <Incident
        Incident="M1416M"
        Element="Mandil"
        Zone="Quimicos"
        State="Amonestado"
        Supervisor="Ing. Luis Lopez"
      />
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
  subc: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 3,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  titlea: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
    alignSelf: "flex-start",
  },
  subt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  text: { fontSize: 18, color: "#ffffff" },
});
