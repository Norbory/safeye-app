import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Boton({ title, onPress }: { title: string, onPress: () => void }): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button]}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        borderRadius: 8,
        marginTop: 10,
        marginBottom: -30,
        paddingVertical: 14,
        paddingHorizontal: 5,
        backgroundColor: "#070236",
        width: "50%",
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 16,
        textAlign: "center",
    }
});
