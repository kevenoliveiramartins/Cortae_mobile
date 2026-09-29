import React from "react";
import {
    View,
    Image,
    StyleSheet,
} from "react-native";

export default function LogoCortae() {
    return (
        <View style={styles.container}>

            <Image
                source={require("../assets/logo-cortae.png")}
                style={styles.logo}
                resizeMode="contain"
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",

        marginBottom: 18,
    },

    logo: {
        width: 260,
        height: 85,
    },
});