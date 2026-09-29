import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

export default function Header({ navigation }) {
    return (
        <View style={styles.header}>

            {/* LOGO */}
            <TouchableOpacity
                onPress={() => navigation?.navigate("Home")}
            >
                <Text style={styles.logo}>
                    CORTAÊ
                </Text>
            </TouchableOpacity>

            {/* BOTÕES */}
            <View style={styles.botoes}>

                <TouchableOpacity
                    onPress={() => navigation?.navigate("Cadastro")}
                >
                    <Text style={styles.cadastrar}>
                        CADASTRAR
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.login}
                    onPress={() => navigation?.navigate("Login")}
                >
                    <Text style={styles.loginTexto}>
                        LOGIN
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    header: {
        height: 70,
        width: "100%",

        backgroundColor: "#FFFFFF",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: 25,

        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",

        elevation: 4,
    },

    logo: {
        fontSize: 28,
        fontWeight: "900",
        color: "#000000",
        letterSpacing: -1,
    },

    botoes: {
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
    },

    cadastrar: {
        fontSize: 14,
        fontWeight: "800",
        color: "#000000",
    },

    login: {
        backgroundColor: "#000000",

        paddingHorizontal: 28,
        height: 35,

        borderRadius: 20,

        alignItems: "center",
        justifyContent: "center",
    },

    loginTexto: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "800",
    },

});