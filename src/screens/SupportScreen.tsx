import { ScrollView, StyleSheet, Text, View } from "react-native";

export function SupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soporte Técnico</Text>
      <Text style={styles.subtitle}>Preguntas usuales</Text>
      <Text style={styles.question}>Como exportar el reporte</Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eleifend,
        sapien non egestas lobortis, diam libero euismod augue, eu sodales ipsum
        augue interdum urna. Nam vulputate nunc vitae sodales interdum. Aliquam
        congue lorem enim, et dapibus dolor ultricies non.
      </Text>
      <Text style={styles.question}>Con quien me comunico</Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lacus
        justo, auctor sit amet laoreet et, condimentum eu ex. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Vivamus vitae quam mattis, congue
        lorem nec, aliquet sem. Maecenas nunc massa, commodo et mi ac, varius
        pulvinar nunc. Curabitur auctor elit in dolor elementum sodales.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  question: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    alignSelf: "flex-start",
    marginBottom: 20,
    marginLeft: 20,
  },
});
