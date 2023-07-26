import React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  DailyScreen,
  IncidentsScreen,
  StatisticsScreen,
  SupportScreen,
} from "../screens";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1FFFA9",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#000",
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={[
                styles.tabIconContainer,
                {
                  backgroundColor: focused ? "#1FFFA9" : "transparent",
                  marginTop: focused ? -45 : 0,
                },
              ]}
            >
              <Ionicons
                name="help-buoy"
                color={color}
                size={focused ? size + 15 : size}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Daily"
        component={DailyScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={[
                styles.tabIconContainer,
                {
                  backgroundColor: focused ? "#1FFFA9" : "transparent",
                  marginTop: focused ? -45 : 0,
                },
              ]}
            >
              <Ionicons
                name="clipboard"
                color={color}
                size={focused ? size + 15 : size}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={[
                styles.tabIconContainer,
                {
                  backgroundColor: focused ? "#1FFFA9" : "transparent",
                  marginTop: focused ? -45 : 0,
                },
              ]}
            >
              <Ionicons
                name="home"
                color={color}
                size={focused ? size + 15 : size}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Incidents"
        component={IncidentsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={[
                styles.tabIconContainer,
                {
                  backgroundColor: focused ? "#1FFFA9" : "transparent",
                  marginTop: focused ? -45 : 0,
                },
              ]}
            >
              <Ionicons
                name="alert-circle"
                color={color}
                size={focused ? size + 15 : size}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={[
                styles.tabIconContainer,
                {
                  backgroundColor: focused ? "#1FFFA9" : "transparent",
                  marginTop: focused ? -45 : 0,
                },
              ]}
            >
              <Ionicons
                name="stats-chart"
                color={color}
                size={focused ? size + 15 : size}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MainTabNavigator;
