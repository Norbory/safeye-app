import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CustomComponentProps {
  Incident: string;
  Element: string;
  Zone: string;
  State: string;
  Supervisor: string;
}

const Incident: React.FC<CustomComponentProps> = (props) => {
  const { Incident, Element, Zone, State, Supervisor } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.titlea}>Incidente {Incident}</Text>
      <View style={styles.subc}>
        <Text style={styles.subt}>Elemento: </Text>
        <Text style={styles.text}>{Element}</Text>
      </View>
      <View style={styles.subc}>
        <Text style={styles.subt}>Zona: </Text>
        <Text style={styles.text}>{Zone}</Text>
      </View>
      <View style={styles.subc}>
        <Text style={styles.subt}>Estado: </Text>
        <Text style={styles.text}>{State}</Text>
      </View>
      <View style={styles.subc}>
        <Text style={styles.subt}>Supervisor: </Text>
        <Text style={styles.text}>{Supervisor}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 15 },
  subc: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 3,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
  titlea: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  subt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  text: { fontSize: 18, color: "#ffffff" },
});

export default Incident;
