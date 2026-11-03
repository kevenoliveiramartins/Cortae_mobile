import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from "react-native";
import { apiFetch, mensagemDaApi } from "../../Services/api";

export default function VerificarCodigo({ emailInicial, voltarLogin }) {
    const [email, setEmail] = useState(emailInicial || "");
    const [codigo, setCodigo] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function verificar() {
        if (!email.trim() || codigo.trim().length !== 6) {
            Alert.alert("Atenção", "Informe o e-mail e o código de 6 dígitos."); return;
        }
        setCarregando(true);
        try {
            const dados = await apiFetch("/verificar_codigo", { method: "POST", body: { email: email.trim().toLowerCase(), codigo: codigo.trim() } });
            if (dados?.codigo_expira_em) {
                setCodigo("");
                Alert.alert("Código expirado", dados?.mensagem?.informacao || "Enviamos outro código para seu e-mail.");
                return;
            }
            Alert.alert("E-mail confirmado", dados?.mensagem?.informacao || "E-mail confirmado com sucesso!", [{ text: "Ir para login", onPress: voltarLogin }]);
        } catch (erro) {
            Alert.alert("Não foi possível verificar", mensagemDaApi(erro));
        } finally { setCarregando(false); }
    }

    return <ImageBackground source={require("../../assets/fundo-login.png")} style={styles.fundo} resizeMode="cover">
        <View style={styles.overlay} />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
                <TouchableOpacity style={styles.voltar} onPress={voltarLogin}><Text style={styles.seta}>‹</Text></TouchableOpacity>
                <Text style={styles.titulo}>Verificar e-mail</Text>
                <Text style={styles.descricao}>Digite o e-mail usado no cadastro e o código de 6 dígitos que enviamos para você.</Text>
                <Text style={styles.rotulo}>E-MAIL</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="email@gmail.com" placeholderTextColor="#888" keyboardType="email-address" autoCapitalize="none" />
                <Text style={styles.rotulo}>CÓDIGO DE VERIFICAÇÃO</Text>
                <TextInput style={styles.input} value={codigo} onChangeText={v => setCodigo(v.replace(/\D/g, "").slice(0, 6))} placeholder="000000" placeholderTextColor="#888" keyboardType="number-pad" maxLength={6} />
                <TouchableOpacity style={styles.botao} onPress={verificar} disabled={carregando}>{carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBotao}>CONFIRMAR E-MAIL</Text>}</TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    </ImageBackground>;
}

const styles = StyleSheet.create({ fundo: { flex: 1, backgroundColor: "#111" }, overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.78)" }, conteudo: { flexGrow: 1, justifyContent: "center", padding: 26 }, voltar: { width: 38, height: 38, borderRadius: 20, backgroundColor: "#292929", alignItems: "center", justifyContent: "center", marginBottom: 24 }, seta: { color: "#fff", fontSize: 30, marginTop: -4 }, titulo: { color: "#fff", fontSize: 25, fontWeight: "bold" }, descricao: { color: "#bbb", fontSize: 13, lineHeight: 20, marginTop: 10, marginBottom: 18 }, rotulo: { color: "#bbb", fontSize: 10, fontWeight: "bold", marginTop: 15, marginBottom: 7 }, input: { height: 48, borderWidth: 1, borderColor: "#333", borderRadius: 11, backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", paddingHorizontal: 14 }, botao: { height: 46, backgroundColor: "#FF8500", borderRadius: 11, alignItems: "center", justifyContent: "center", marginTop: 26 }, textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 12 } });
