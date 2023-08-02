import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Keyboard,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

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

  return (
    <View style={styles.container}>
      <Circle1 keyboardOpen={keyboardOpen} />
      <Circle2 keyboardOpen={keyboardOpen} />
      <Circle3 keyboardOpen={keyboardOpen} />
      <LogoTitle keyboardOpen={keyboardOpen} />
      <Image
        source={require("../../assets/isotipo.png")}
        style={keyboardOpen ? styles.hidden : styles.image}
      />
      <View
        style={
          keyboardOpen
            ? styles.loginContainerKeyboardOpen
            : styles.loginContainer
        }
      >
        <Text style={styles.welcomeText}>Bienvenido</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Usuario" />
          <TextInput style={styles.input} placeholder="Contraseña" />
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("MainTabs")}
        >
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
    backgroundColor: "#42B6E6",
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
    backgroundColor: "#42B6E6",
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  helpText: {
    fontSize: 12,
    fontWeight: "bold",
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
    paddingLeft: 20,
    backgroundColor: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: 5,
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#2474B0",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  hidden: {
    display: "none",
  },
});

function LogoTitle({ keyboardOpen }: { keyboardOpen: boolean }) {
  return (
    <View
      style={
        keyboardOpen
          ? { flexDirection: "row", marginTop: "10%", marginLeft: "5%" }
          : { flexDirection: "row", marginTop: "65%", marginLeft: "5%" }
      }
    >
      <Image source={require("../../assets/logotipo.png")} />
    </View>
  );
}

function Circle1({ keyboardOpen }: { keyboardOpen: boolean }) {
  return (
    <View
      style={
        keyboardOpen
          ? {
              display: "none",
            }
          : {
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "#2182AB",
              position: "absolute",
              top: 220,
              left: -11,
            }
      }
    />
  );
}

function Circle2({ keyboardOpen }: { keyboardOpen: boolean }) {
  return (
    <View
      style={
        keyboardOpen
          ? {
              display: "none",
            }
          : {
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "#2182AB",
              position: "absolute",
              top: 60,
              left: 75,
            }
      }
    />
  );
}

function Circle3({ keyboardOpen }: { keyboardOpen: boolean }) {
  return (
    <View
      style={
        keyboardOpen
          ? {
              display: "none",
            }
          : {
              width: 200,
              height: 200,
              borderRadius: 100,
              backgroundColor: "#2182AB",
              position: "absolute",
              top: 60,
              right: -55,
            }
      }
    />
  );
}
