import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Keyboard,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { LOGO } from "../constantes/images";
import { URL } from "../constantes/string";

export function LoginScreen() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardOpen(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardOpen(false)
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${URL}/login`, {
        "user_username": username,
        "user_password": password
      });

      // console.log(res.data);

      const { user, business, token } = res.data;

      login(user, business, token);

    } catch (error) {
      console.log(error);
      // Si hay un error en el inicio de sesión, muestra una alerta
      Alert.alert(
        'Error de inicio de sesión',
        'Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <LogoTitle keyboardOpen={keyboardOpen} />
      <View
        style={
          keyboardOpen
            ? styles.loginContainerKeyboardOpen
            : styles.loginContainer
        }
      >
        <Text style={styles.welcomeText}>Bienvenido</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            onChange={(e) => setUsername(e.nativeEvent.text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          <Ionicons
            name="person"
            size={20}
            color="#49B4CB"
            style={keyboardOpen ? styles.hidden : styles.icon}
          />
          <Ionicons
            name="lock-closed"
            size={20}
            color="#49B4CB"
            style={keyboardOpen ? styles.hidden : styles.icon1}
          />
        </View>
        <Pressable style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </Pressable>
        <Text style={styles.helpText}>Por favor complete todos los campos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    position: "relative",
  },
  image: {
    width: 250,
    height: 250,
    position: "absolute",
    bottom: 205,
    alignSelf: "center",
  },
  loginContainer: {
    width: "100%",
    height: 260,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#070236",
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  loginContainerKeyboardOpen: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    gap: 20,
    justifyContent: "center",
    backgroundColor: "#070236",
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  helpText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  inputContainer: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    width: "80%",
    height: 40,
    paddingLeft: 42,
    backgroundColor: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: 10,
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#070236",
    fontSize: 18,
    fontWeight: "bold",
  },
  hidden: {
    display: "none",
  },
  icon: {
    position: "absolute",
    left: 50,
    top: 10,
  },
  icon1: {
    position: "absolute",
    left: 50,
    top: 54,
  },
  logo: {
    width: 300,
    height: "50%",
  },
  // gradient: {
  //   ...StyleSheet.absoluteFillObject,
  //   zIndex: -1,
  // },
});

function LogoTitle({ keyboardOpen }) {
  return (
    <View
      style={
        keyboardOpen
          ? { marginTop: "5%", marginLeft: "10%" }
          : { marginTop: "60%", marginLeft: "10%" }
      }
    >
      <Image
        source={LOGO}
        style={[styles.logo]}
        resizeMode="contain"
      />
    </View>
  );
}
