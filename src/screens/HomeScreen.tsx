import { StyleSheet, Text, View, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Card from "../components/Card"

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Card onGreenButtonPress={() => {}} onRedButtonPress={() => {}} />
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
