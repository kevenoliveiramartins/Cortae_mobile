import React, { useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import LogoCortae from "../../components/LogoCortae";

import CampoLogin from "../../components/CampoLogin";

import API_URL from "../../Services/api";


export default function Login({
                                  irParaBarbearias,
                              }) {

    const [email, setEmail] =
        useState("");

    const [senha, setSenha] =
        useState("");

    const [mostrarSenha, setMostrarSenha] =
        useState(false);

    const [carregando, setCarregando] =
        useState(false);


    // ==================================================
    // LOGIN
    // ==================================================

    async function entrar() {

        if (!email.trim()) {

            Alert.alert(
                "Atenção",
                "Digite seu e-mail."
            );

            return;
        }


        if (!senha.trim()) {

            Alert.alert(
                "Atenção",
                "Digite sua senha."
            );

            return;
        }


        setCarregando(true);


        try {

            console.log(
                "================================"
            );

            console.log(
                "TENTANDO LOGIN"
            );

            console.log(
                "URL:",
                `${API_URL}/login`
            );

            console.log(
                "EMAIL:",
                email
            );


            // ==========================================
            // CHAMADA DA API
            // ==========================================

            const resposta = await fetch(
                `${API_URL}/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({

                        email:
                            email.trim(),

                        senha:
                        senha,

                    }),
                }
            );


            console.log(
                "STATUS:",
                resposta.status
            );


            // ==========================================
            // RESPOSTA
            // ==========================================

            let dados = {};

            try {

                dados =
                    await resposta.json();

            } catch {

                dados = {};

            }


            console.log(
                "DADOS:",
                dados
            );


            // ==========================================
            // LOGIN INCORRETO
            // ==========================================

            if (!resposta.ok) {

                let mensagem =
                    "E-mail ou senha incorretos.";


                if (
                    typeof dados?.mensagem ===
                    "string"
                ) {

                    mensagem =
                        dados.mensagem;

                }


                else if (
                    dados?.mensagem
                        ?.informacao
                ) {

                    mensagem =
                        dados.mensagem
                            .informacao;

                }


                else if (
                    dados?.erro
                ) {

                    mensagem =
                        dados.erro;

                }


                Alert.alert(
                    "Não foi possível entrar",
                    mensagem
                );


                return;
            }


            // ==========================================
            // LOGIN CORRETO
            // ==========================================

            console.log(
                "LOGIN REALIZADO!"
            );


            /*
             * Passa os dados recebidos
             * para o App.js.
             */

            if (irParaBarbearias) {

                irParaBarbearias(
                    dados
                );

            }

        }


        catch (erro) {

            console.log(
                "ERRO:",
                erro
            );


            Alert.alert(
                "Erro de conexão",

                "Não foi possível conectar com a API.\n\nVerifique se o backend está ligado e se o celular está na mesma rede Wi-Fi do computador."
            );

        }


        finally {

            setCarregando(false);

        }

    }


    return (

        <ImageBackground

            source={require(
                "../../assets/fundo-login.png"
            )}

            style={
                styles.background
            }

            resizeMode="cover"
        >

            {/* ESCURECER FUNDO */}

            <View
                style={styles.overlay}
            />


            <KeyboardAvoidingView

                style={styles.keyboard}

                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : undefined
                }
            >

                <ScrollView

                    contentContainerStyle={
                        styles.scroll
                    }

                    showsVerticalScrollIndicator={
                        false
                    }

                    keyboardShouldPersistTaps="handled"
                >









                    {/* CONTEÚDO */}

                    <View
                        style={
                            styles.conteudo
                        }
                    >


                        {/* LOGO */}

                        <LogoCortae />


                        {/* DESCRIÇÃO */}

                        <Text
                            style={
                                styles.subtitulo
                            }
                        >
                            Experiência Premium de
                        </Text>


                        <Text
                            style={
                                styles.subtitulo
                            }
                        >
                            Barbearia
                        </Text>


                        {/* FORMULÁRIO */}

                        <View
                            style={
                                styles.formulario
                            }
                        >


                            {/* E-MAIL */}

                            <CampoLogin

                                label="E-MAIL"

                                placeholder={
                                    "Digite seu e-mail"
                                }

                                value={email}

                                onChangeText={
                                    setEmail
                                }

                                tipo="email"

                            />


                            {/* SENHA */}

                            <CampoLogin

                                label="SENHA"

                                placeholder={
                                    "Digite sua senha"
                                }

                                value={senha}

                                onChangeText={
                                    setSenha
                                }

                                tipo="senha"

                                mostrarSenha={
                                    mostrarSenha
                                }

                                alterarVisibilidade={() =>
                                    setMostrarSenha(
                                        !mostrarSenha
                                    )
                                }

                            />


                            {/* ESQUECEU SENHA */}

                            <TouchableOpacity

                                style={
                                    styles.esqueceuContainer
                                }
                            >

                                <Text
                                    style={
                                        styles.esqueceu
                                    }
                                >
                                    Esqueceu a senha?
                                </Text>

                            </TouchableOpacity>


                            {/* ENTRAR */}

                            <TouchableOpacity

                                style={[
                                    styles.botaoEntrar,

                                    carregando &&
                                    styles.botaoDesativado,
                                ]}

                                onPress={
                                    entrar
                                }

                                disabled={
                                    carregando
                                }
                            >

                                {carregando ? (

                                    <ActivityIndicator
                                        color="#FFFFFF"
                                        size="small"
                                    />

                                ) : (

                                    <Text
                                        style={
                                            styles.textoEntrar
                                        }
                                    >
                                        Entrar na Conta
                                    </Text>

                                )}

                            </TouchableOpacity>


                            {/* CRIAR CONTA */}

                            <TouchableOpacity
                                style={
                                    styles.botaoCriar
                                }
                            >

                                <Text
                                    style={
                                        styles.textoCriar
                                    }
                                >
                                    Criar Conta
                                </Text>

                            </TouchableOpacity>


                        </View>

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>

        </ImageBackground>

    );
}


const styles = StyleSheet.create({

    background: {
        flex: 1,

        backgroundColor:
            "#111111",
    },


    overlay: {
        ...StyleSheet.absoluteFillObject,

        backgroundColor:
            "rgba(0,0,0,0.72)",
    },


    keyboard: {
        flex: 1,
    },


    scroll: {
        flexGrow: 1,

        paddingHorizontal: 27,

        paddingTop: 48,

        paddingBottom: 30,
    },


    botaoVoltar: {
        width: 38,

        height: 38,

        borderRadius: 20,

        backgroundColor:
            "rgba(255,255,255,0.15)",

        alignItems: "center",

        justifyContent: "center",
    },


    conteudo: {
        width: "100%",

        alignItems: "center",

        marginTop: 55,
    },


    subtitulo: {
        color: "#FF8500",

        fontSize: 14,

        lineHeight: 20,

        textAlign: "center",
    },


    formulario: {
        width: "100%",

        marginTop: 34,
    },


    esqueceuContainer: {
        alignItems: "flex-end",

        marginTop: -2,

        marginBottom: 34,
    },


    esqueceu: {
        color: "#FF8500",

        fontSize: 12,

        fontWeight: "600",
    },


    botaoEntrar: {
        width: "100%",

        height: 50,

        backgroundColor:
            "#FF8500",

        borderRadius: 11,

        alignItems: "center",

        justifyContent: "center",

        elevation: 6,

        shadowColor:
            "#FF8500",

        shadowOffset: {
            width: 0,

            height: 5,
        },

        shadowOpacity: 0.35,

        shadowRadius: 7,
    },


    botaoDesativado: {
        opacity: 0.65,
    },


    textoEntrar: {
        color: "#FFFFFF",

        fontSize: 14,

        fontWeight: "800",
    },


    botaoCriar: {
        width: "100%",

        height: 46,

        marginTop: 14,

        borderRadius: 11,

        borderWidth: 1.5,

        borderColor:
            "#292929",

        alignItems: "center",

        justifyContent: "center",

        backgroundColor:
            "rgba(0,0,0,0.25)",
    },


    textoCriar: {
        color: "#FFFFFF",

        fontSize: 14,

        fontWeight: "700",
    },

});