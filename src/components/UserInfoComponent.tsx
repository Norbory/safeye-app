import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export type Props = {
    username: string;
    isActive: boolean;
  };

const UserInfoComponent: React.FC<Props> = ({
    username,
    isActive,
    }) => {
    return(
        <View style={styles.container}>
            <Image source={require('../../assets/monito.jpg')} style={styles.profileImage} />
            <View style={styles.container1}>
                <Text style={styles.usernameText}>{username}</Text>
                {isActive && (
                    <View style={styles.activeContainer}>
                    <Ionicons name="checkmark-circle" color="#1FFFA9" size={20} />
                    <Text style={styles.activeText}>Active</Text>
                    </View>
                )}
            </View>
        </View>
    );
    };

    const styles = StyleSheet.create({
        container: {
          position: "absolute",
          top: 30,
          left: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        },
        container1: {
            flexDirection: "column",
          },
        usernameText: {
          color: "#fff",
          fontSize: 14,
          fontWeight: "bold",
          marginLeft: 10,
        },
        activeContainer: {
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
        },
        activeText: {
          fontSize: 12,
          color: "#1FFFA9",
          marginLeft: 5,
        },
        profileImage: {
          width: 30,
          height: 30,
          borderRadius: 15,
        },
      });

export default UserInfoComponent;