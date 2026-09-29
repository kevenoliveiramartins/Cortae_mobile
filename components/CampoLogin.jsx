import React from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function CampoLogin({
                                       label,
                                       placeholder,
                                       value,
                                       onChangeText,
                                       tipo = "email",
                                       mostrarSenha = false,
                                       alterarVisibilidade,
                                   }) {

    const senha = tipo === "senha";

    return (
        <View style={styles.container}>

            {/* LABEL */}

            <Text style={styles.label}>
                {label}
            </Text>


            {/* INPUT */}

            <View style={styles.inputContainer}>

                <Ionicons
                    name={
                        senha
                            ? "lock-closed-outline"
                            : "mail-outline"
                    }
                    size={18}
                    color="#666666"
                />

                <TextInput
                    style={styles.input}

                    placeholder={placeholder}

                    placeholderTextColor="#666666"

                    value={value}

                    onChangeText={onChangeText}

                    keyboardType={
                        senha
                            ? "default"
                            : "email-address"
                    }

                    autoCapitalize={
                        senha
                            ? "none"
                            : "none"
                    }

                    secureTextEntry={
                        senha && !mostrarSenha
                    }
                />

                {/* BOTÃO MOSTRAR SENHA */}

                {senha && (
                    <TouchableOpacity
                        onPress={alterarVisibilidade}
                        style={styles.olho}
                    >
                        <Ionicons
                            name={
                                mostrarSenha
                                    ? "eye-outline"
                                    : "eye-off-outline"
                            }
                            size={20}
                            color="#777777"
                        />
                    </TouchableOpacity>
                )}

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width: "100%",
        marginBottom: 20,
    },

    label: {
        color: "#B7B7B7",

        fontSize: 11,

        fontWeight: "700",

        letterSpacing: 0.5,

        marginBottom: 11,
    },

    inputContainer: {
        width: "100%",

        height: 50,

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: 14,

        borderRadius: 11,

        borderWidth: 1,

        borderColor: "#333333",

        backgroundColor:
            "rgba(255, 255, 255, 0.04)",
    },

    input: {
        flex: 1,

        height: "100%",

        color: "#FFFFFF",

        fontSize: 14,

        marginLeft: 10,
    },

    olho: {
        width: 30,

        height: 40,

        alignItems: "center",

        justifyContent: "center",
    },

});