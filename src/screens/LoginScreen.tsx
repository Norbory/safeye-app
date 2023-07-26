import { StyleSheet, Text, View, Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

export function LoginScreen({ navigation }: LoginScreenProps) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SAFEYE</Text>
      <Button title="SIGN IN" onPress={() => navigation.navigate("MainTabs")} />
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
