import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/routes/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  );
}
