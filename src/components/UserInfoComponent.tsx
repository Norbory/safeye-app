import React, { useContext } from "react";
import { 
        View,
        Text, 
        Image, 
        StyleSheet,
        TouchableOpacity,
        Alert
      } from "react-native";
import { useFonts } from 'expo-font';
import { IUSER } from '../constantes/images'
import { POPPINS } from "../constantes/fonts";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../auth/AuthContext";

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

      const { logout } = useContext(AuthContext);
      const navigation = useNavigation(); 

      // Función para cerrar sesión
      const handleLogout = async () => {
        Alert.alert(
          'Cerrar sesión',
          '¿Estás seguro de que deseas cerrar sesión?',
          [
            {
              text: 'Cancelar',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Aceptar',
              onPress: async () => {
                await AsyncStorage.removeItem('token');
                logout();
                navigation.navigate('Login'); // Utilizar la variable navigation aquí
              },
            },
          ],
          { cancelable: false }
        );
      };
      
      if (!fontsLoaded) {
        return null;
      }
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
              <Image source={IUSER} style={styles.profileImage} />
            </TouchableOpacity>
            <View style={styles.container1}>
              <Text style={styles.usernameText}>Bienvenido</Text>
              <Text style={styles.usernameText}>{username}</Text>
            </View>
        </View>
    );
    };

    const styles = StyleSheet.create({
        container: {
          position: "absolute",
          top: 40,
          left: 15,
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
          fontSize: 14,
          fontWeight: "bold",
          textAlign: "left",
          marginLeft: 4,
          marginVertical: -2,
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