import React from "react";
import { 
        View,
        Image, 
        StyleSheet
      } from "react-native";
import { COMPA } from '../constantes/images'

export const Logo = () =>{
    return(
        <View style={styles.container}>
            <Image source={COMPA} style={styles.profileImage} />
        </View>
    );
};

    const styles = StyleSheet.create({
        container: {
          position: "absolute",
          top: 40,
          right: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        },
        profileImage: {
          width: 40,
          height: 40,
        },
      });

export default Logo;