import { StyleSheet, Text, View, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
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
});
