import { ScrollView, StyleSheet, Text, View,Linking } from "react-native";

export function SupportScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", height: "100%" }}>
      <Text style={styles.title}>Soporte Técnico</Text>
      <Text style={styles.subtitle}>Preguntas usuales</Text>
      <Text style={styles.question}>Como exportar el reporte</Text>
      <Text style={styles.text}>
        Para exportar el reporte, debe dirigirse a la pantalla de reportes y
        presionar un incidente en especifico, esto abrirá los detalles del
        incidente y en la parte inferior de la pantalla se encontrará un botón
        con el texto "Descargar", al presionarlo se descargará el reporte en
        formato PDF.
      </Text>
      <Text style={styles.question}>Con quién me comunico</Text>
        <Text style={styles.text}>
          Para obtener soporte técnico, puedes comunicarte con Consultoría Carranza de las siguientes maneras:
          {"\n\n"}
          📧 Teléfono: {"\n"}+51 950 436 941{"\n"}
          📧 Correo electrónico: {"\n"}area.innovacion@consultoriacarranza.com.pe{"\n"}
          📧 Sitio web:{"\n"} <Text onPress={() => Linking.openURL("https://consultoriacarranza.com.pe")}>https://consultoriacarranza.com.pe</Text>{"\n"}
          📧 Facebook: {"\n"}<Text onPress={() => Linking.openURL("https://www.facebook.com/consultoriacarranza.eirl")}>https://www.facebook.com/consultoriacarranza.eirl</Text>{"\n"}
          📧 LinkedIn: {"\n"}<Text onPress={() => Linking.openURL("https://www.linkedin.com/company/consultoria-carranza-eirl/")}>https://www.linkedin.com/company/consultoria-carranza-eirl/</Text>{"\n"}
        </Text>
      </ScrollView>
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
    color: "#252525",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    color: "#252525",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  question: {
    color: "#252525",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  text: {
    color: "#252525",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    alignSelf: "flex-start",
    marginBottom: 20,
    marginLeft: 20,
  },
});
