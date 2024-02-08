import React from "react";
import { 
        View,
        Text, 
        Image, 
        StyleSheet
      } from "react-native";
import { useFonts } from 'expo-font';
import { IUSER } from '../constantes/images'
import { POPPINS } from "../constantes/fonts";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Props = {
    username: string;
    isActive: boolean;
  };

const UserInfoComponent: React.FC<Props> = ({
    username,
    isActive,
    }) => {
      const [fontsLoaded] = useFonts({
        'Poppins-Bold': POPPINS,
      });
      if (!fontsLoaded) {
        return null;
      }
    return(
        <View style={styles.container}>
            <View style={styles.container1}>
              <Text style={styles.usernameText}>Bienvenido</Text>
            </View>
            <Image source={IUSER} style={styles.profileImage} />
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
          color: "#252525",
          fontSize: 16,
          fontWeight: "bold",
          marginRight: -8,
          textShadowColor: "rgba(0,0,0,0.3)",
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