import React from "react";
import { View, Text, Image, StyleSheet} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from 'expo-font';

export type Props = {
    username: string;
    isActive: boolean;
  };

const UserInfoComponent: React.FC<Props> = ({
    username,
    isActive,
    }) => {
      const [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
      });
      if (!fontsLoaded) {
        return null;
      }
    return(
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.usernameText}>Hola, {username}</Text>
                  <View style={styles.activeContainer}>
                  <Ionicons name="ellipse" color={isActive ? "#1FFFA9" : "#F44343"} size={15} />
                  <Text style={styles.activeText}>{isActive ? "conectado" : "desconectado"}</Text>
                  </View>
            </View>
            <Image source={require('../../assets/monito.jpg')} style={styles.profileImage} />
        </View>
    );
    };

    const styles = StyleSheet.create({
        container: {
          position: "absolute",
          top: 40,
          right: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        },
        container1: {
            flexDirection: "column",
            marginRight:10,
          },
        usernameText: {
          fontFamily:"Poppins-Bold",
          color: "#fff",
          fontSize: 22,
          fontWeight: "bold",
          marginLeft: 10,
          textShadowColor: "black",
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 1,
        },
        activeContainer: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent:"flex-end",
          marginLeft: 10,
        },
        activeText: {
          fontFamily:"Poppins-Bold",
          fontSize: 12,
          color: "#F1FAEE",
          marginLeft: 5,
          textShadowColor: "black",
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 1,
        },
        profileImage: {
          width: 40,
          height: 40,
          borderRadius: 20,
        },
      });

export default UserInfoComponent;