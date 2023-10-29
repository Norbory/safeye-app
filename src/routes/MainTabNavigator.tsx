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
import UserInfoComponent from "../components/UserInfoComponent";
import { useAuth } from "../hooks/useAuth";
import { getToken } from "../utils/AuthUtils";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { user } = useAuth();
  const User = getToken();
  
  return (
    <View style={{ flex: 1 }}>
      {
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#0A3559"
            },
            tabBarActiveTintColor: "#DADCDE",
            tabBarInactiveTintColor: "#252525",
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
                      backgroundColor: focused ? "#0A3559" : "transparent",
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
                      backgroundColor: focused ? "#0A3559" : "transparent",
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
                      backgroundColor: focused ? "#0A3559" : "transparent",
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
                      backgroundColor: focused ? "#0A3559" : "transparent",
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
                      backgroundColor: focused ? "#0A3559" : "transparent",
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
      }
      <UserInfoComponent
        username={`${user.name}`}
        isActive={true}
      />
    </View>
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
