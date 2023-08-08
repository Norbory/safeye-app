import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import { LoginScreen } from "../screens";
import { useAuth } from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isSignIn } = useAuth();

  return (
    <Stack.Navigator initialRouteName="Login">
      {isSignIn ? (
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
