import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Footer() {
    return (
        <View style={styles.footer}>

            {/* MARCA */}
            <View style={styles.marca}>

                <Text style={styles.logo}>
                    CORTAÊ
                </Text>

                <Text style={styles.descricao}>
                    Leve sua barbearia para o{"\n"}
                    próximo{" "}
                    <Text style={styles.destaque}>
                        estágio.
                    </Text>
                </Text>

            </View>

            {/* ACESSO RÁPIDO */}
            <View style={styles.coluna}>

                <Text style={styles.titulo}>
                    Acesso rápido
                </Text>

                <TouchableOpacity>
                    <Text style={styles.link}>
                        Início
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.link}>
                        Encontrar estabelecimento
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.link}>
                        Meus agendamentos
                    </Text>
                </TouchableOpacity>

            </View>

            {/* MAIS */}
            <View style={styles.coluna}>

                <Text style={styles.titulo}>
                    Mais
                </Text>

                <TouchableOpacity>
                    <Text style={styles.link}>
                        Sobre nós
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.link}>
                        Trabalhe conosco
                    </Text>
                </TouchableOpacity>

            </View>

            {/* REDES SOCIAIS */}
            <View style={styles.redes}>

                <TouchableOpacity>
                    <Ionicons
                        name="logo-facebook"
                        size={22}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons
                        name="logo-instagram"
                        size={22}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons
                        name="logo-youtube"
                        size={22}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons
                        name="logo-twitter"
                        size={22}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>

            </View>

            {/* COPYRIGHT */}
            <Text style={styles.copyright}>
                © 2026 CORTAÊ. Todos os direitos reservados
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({

    footer: {
        backgroundColor: "#000000",

        width: "100%",

        paddingHorizontal: 50,
        paddingTop: 50,
        paddingBottom: 25,

        flexDirection: "row",

        flexWrap: "wrap",

        justifyContent: "space-between",
    },

    marca: {
        width: "27%",
    },

    logo: {
        color: "#FFFFFF",

        fontSize: 34,

        fontWeight: "900",

        marginBottom: 18,
    },

    descricao: {
        color: "#FFFFFF",

        fontSize: 14,

        lineHeight: 21,
    },

    destaque: {
        color: "#FF9C08",
    },

    coluna: {
        width: "20%",
    },

    titulo: {
        color: "#FFFFFF",

        fontSize: 15,

        fontWeight: "800",

        marginBottom: 17,
    },

    link: {
        color: "#D0D0D0",

        fontSize: 13,

        marginBottom: 12,
    },

    redes: {
        width: "20%",

        flexDirection: "row",

        justifyContent: "space-around",

        alignItems: "center",
    },

    copyright: {
        width: "100%",

        color: "#AAAAAA",

        fontSize: 10,

        textAlign: "center",

        marginTop: 45,
    },

});