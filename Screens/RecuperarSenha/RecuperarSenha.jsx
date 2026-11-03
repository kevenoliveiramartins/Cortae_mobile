import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { apiFetch, mensagemDaApi } from "../../Services/api";

export default function RecuperarSenha({ voltarLogin }) {
    const [etapa, setEtapa] = useState(1);
    const [email, setEmail] = useState("");
    const [codigo, setCodigo] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function enviarEtapa() {
        const emailLimpo = email.trim().toLowerCase();

        if (!emailLimpo) {
            Alert.alert("Atenção", "Digite seu e-mail.");
            return;
        }
        if (etapa >= 2 && codigo.trim().length !== 6) {
            Alert.alert("Atenção", "Digite o código de 6 dígitos.");
            return;
        }
        if (etapa === 3 && (!senha || !confirmarSenha)) {
            Alert.alert("Atenção", "Preencha os dois campos de senha.");
            return;
        }
        if (etapa === 3 && senha !== confirmarSenha) {
            Alert.alert("Atenção", "As senhas não coincidem.");
            return;
        }

        setCarregando(true);

        try {
            const corpo = {
                etapa,
                email: emailLimpo,
            };

            if (etapa >= 2) corpo.codigo = codigo.trim();
            if (etapa === 3) {
                corpo.senha = senha;
                corpo.confirmarSenha = confirmarSenha;
            }

            const dados = await apiFetch("/recuperar_senha", {
                method: "POST",
                body: corpo,
            });

            if (etapa < 3) {
                setEtapa(etapa + 1);
                Alert.alert(
                    "Sucesso",
                    dados?.mensagem?.informacao || (etapa === 1 ? "Código enviado para seu e-mail." : "Código confirmado.")
                );
            } else {
                Alert.alert(
                    "Senha alterada",
                    dados?.mensagem?.informacao || "Sua senha foi alterada com sucesso.",
                    [{ text: "Voltar ao login", onPress: voltarLogin }]
                );
            }
        } catch (erro) {
            Alert.alert("Não foi possível continuar", mensagemDaApi(erro));
        } finally {
            setCarregando(false);
        }
    }

    const titulos = { 1: "Esqueci minha senha", 2: "Verificar código", 3: "Criar nova senha" };
    const descricoes = { 1: "Informe seu e-mail para receber um código de recuperação.", 2: "Digite o código de 6 dígitos enviado para seu e-mail.", 3: "Escolha uma senha nova para sua conta." };

    return (
        <View style={styles.fundo}>
            <KeyboardAvoidingView style={styles.teclado} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                    <TouchableOpacity style={styles.voltar} onPress={voltarLogin}>
                        <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text style={styles.titulo}>{titulos[etapa]}</Text>
                    <Text style={styles.descricao}>{descricoes[etapa]}</Text>

                    <Text style={styles.rotulo}>E-MAIL</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="email@gmail.com"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {etapa >= 2 && (
                        <>
                            <Text style={styles.rotulo}>CÓDIGO DE 6 DÍGITOS</Text>
                            <TextInput
                                style={styles.input}
                                value={codigo}
                                onChangeText={(valor) => setCodigo(valor.replace(/\D/g, "").slice(0, 6))}
                                placeholder="000000"
                                placeholderTextColor="#888"
                                keyboardType="number-pad"
                                maxLength={6}
                            />
                        </>
                    )}

                    {etapa === 3 && (
                        <>
                            <Text style={styles.rotulo}>NOVA SENHA</Text>
                            <TextInput style={styles.input} value={senha} onChangeText={setSenha} placeholder="Digite uma nova senha" placeholderTextColor="#888" secureTextEntry />
                            <Text style={styles.rotulo}>CONFIRMAR NOVA SENHA</Text>
                            <TextInput style={styles.input} value={confirmarSenha} onChangeText={setConfirmarSenha} placeholder="Digite novamente" placeholderTextColor="#888" secureTextEntry />
                        </>
                    )}

                    <TouchableOpacity style={styles.botao} onPress={enviarEtapa} disabled={carregando}>
                        {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBotao}>{etapa === 1 ? "ENVIAR CÓDIGO" : etapa === 2 ? "CONFIRMAR CÓDIGO" : "ALTERAR SENHA"}</Text>}
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    fundo: { flex: 1, backgroundColor: "#000000" },
    teclado: { flex: 1 },
    conteudo: { flexGrow: 1, justifyContent: "center", padding: 26 },
    voltar: { width: 38, height: 38, borderRadius: 20, backgroundColor: "#292929", alignItems: "center", justifyContent: "center", marginBottom: 24 },
    titulo: { color: "#fff", fontSize: 25, fontWeight: "bold" },
    descricao: { color: "#bbb", fontSize: 13, lineHeight: 20, marginTop: 10, marginBottom: 18 },
    rotulo: { color: "#bbb", fontSize: 10, fontWeight: "bold", marginTop: 15, marginBottom: 7 },
    input: { height: 48, borderWidth: 1, borderColor: "#333", borderRadius: 11, backgroundColor: "#151515", color: "#fff", paddingHorizontal: 14 },
    botao: { height: 46, backgroundColor: "#FF8500", borderRadius: 11, alignItems: "center", justifyContent: "center", marginTop: 26 },
    textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});
