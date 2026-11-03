import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { apiFetch, mensagemDaApi } from "../../Services/api";

export default function Cadastro({ voltarLogin, irParaVerificar }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [aceitouTermos, setAceitouTermos] = useState(false);
    const [carregando, setCarregando] = useState(false);

    async function cadastrar() {
        const emailLimpo = email.trim().toLowerCase();

        if (!nome.trim() || !emailLimpo || !telefone.trim() || !senha || !confirmarSenha) {
            Alert.alert("Atenção", "Preencha todos os campos.");
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert("Atenção", "As senhas não são iguais.");
            return;
        }

        if (!aceitouTermos) {
            Alert.alert("Atenção", "Aceite os termos para continuar.");
            return;
        }

        setCarregando(true);

        try {
            // A API informa a versão exata dos termos publicados.
            const termos = await apiFetch("/termos_publicos", {
                method: "GET",
            });

            const versao = termos?.versao;

            // Se os termos estiverem habilitados, a API exige a versão atual.
            if (termos?.aceite_habilitado && !versao) {
                throw new Error("Não foi possível obter a versão dos termos de uso.");
            }

            const dados = await apiFetch("/cadastro", {
                method: "POST",
                body: {
                    nome: nome.trim(),
                    email: emailLimpo,
                    telefone: telefone.replace(/\D/g, ""),
                    senha,
                    confirmarSenha,
                    tipo: 1,
                    genero: "",
                    termos_aceitos: aceitouTermos,
                    termos_versao: versao || "",
                },
            });

            Alert.alert(
                "Conta criada",
                mensagemDaApi(dados) || "Enviamos um código para seu e-mail.",
                [
                    {
                        text: "Continuar",
                        onPress: () => irParaVerificar(emailLimpo),
                    },
                ]
            );
        } catch (erro) {
            Alert.alert("Não foi possível criar a conta", mensagemDaApi(erro));
        } finally {
            setCarregando(false);
        }
    }

    return (
        <ImageBackground
            source={require("../../assets/fundo-login.png")}
            style={estilos.fundo}
            resizeMode="cover"
        >
            <View style={estilos.sombra}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={estilos.teclado}
                >
                    <ScrollView
                        contentContainerStyle={estilos.conteudo}
                        keyboardShouldPersistTaps="handled"
                    >
                        <TouchableOpacity style={estilos.voltar} onPress={voltarLogin}>
                            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
                        </TouchableOpacity>

                        <Text style={estilos.titulo}>Criar Conta</Text>

                        <Text style={estilos.rotulo}>NOME COMPLETO</Text>
                        <TextInput style={estilos.input} placeholder="Seu nome" placeholderTextColor="#777777" value={nome} onChangeText={setNome} />

                        <Text style={estilos.rotulo}>E-MAIL</Text>
                        <TextInput style={estilos.input} placeholder="email@gmail.com" placeholderTextColor="#777777" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

                        <Text style={estilos.rotulo}>TELEFONE</Text>
                        <TextInput style={estilos.input} placeholder="(00) 00000-0000" placeholderTextColor="#777777" keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} />

                        <Text style={estilos.rotulo}>SENHA</Text>
                        <View style={estilos.campoSenha}>
                            <TextInput style={estilos.inputSenha} placeholder="Digite sua senha" placeholderTextColor="#777777" secureTextEntry={!mostrarSenha} value={senha} onChangeText={setSenha} />
                            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                                <Ionicons name={mostrarSenha ? "eye-off" : "eye"} size={20} color="#999999" />
                            </TouchableOpacity>
                        </View>

                        <Text style={estilos.rotulo}>CONFIRMAR SENHA</Text>
                        <View style={estilos.campoSenha}>
                            <TextInput style={estilos.inputSenha} placeholder="Repita sua senha" placeholderTextColor="#777777" secureTextEntry={!mostrarConfirmacao} value={confirmarSenha} onChangeText={setConfirmarSenha} />
                            <TouchableOpacity onPress={() => setMostrarConfirmacao(!mostrarConfirmacao)}>
                                <Ionicons name={mostrarConfirmacao ? "eye-off" : "eye"} size={20} color="#999999" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={estilos.termos} onPress={() => setAceitouTermos(!aceitouTermos)}>
                            <Ionicons name={aceitouTermos ? "checkbox" : "square-outline"} size={20} color="#FF8500" />
                            <Text style={estilos.textoTermos}>Li e aceito os termos de uso e a política de privacidade.</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilos.botao} onPress={cadastrar} disabled={carregando}>
                            {carregando ? <ActivityIndicator color="#FFFFFF" /> : <Text style={estilos.textoBotao}>CRIAR CONTA</Text>}
                        </TouchableOpacity>

                        <View style={estilos.rodape}>
                            <Text style={estilos.textoRodape}>Já possui uma conta?</Text>
                            <TouchableOpacity onPress={voltarLogin}>
                                <Text style={estilos.link}> Login</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
}

const estilos = StyleSheet.create({
    fundo: { flex: 1, backgroundColor: "#111111" },
    sombra: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.78)" },
    teclado: { flex: 1 },
    conteudo: { flexGrow: 1, paddingHorizontal: 26, paddingTop: 35, paddingBottom: 30, justifyContent: "center" },
    voltar: { width: 38, height: 38, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center", marginBottom: 22 },
    titulo: { color: "#FFFFFF", fontSize: 25, fontWeight: "bold", marginBottom: 28 },
    rotulo: { color: "#BBBBBB", fontSize: 9, fontWeight: "600", marginBottom: 7, marginTop: 13 },
    input: { height: 45, backgroundColor: "#202020", borderColor: "#333333", borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, color: "#FFFFFF", fontSize: 12 },
    campoSenha: { height: 45, backgroundColor: "#202020", borderColor: "#333333", borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, flexDirection: "row", alignItems: "center" },
    inputSenha: { flex: 1, color: "#FFFFFF", fontSize: 12 },
    termos: { flexDirection: "row", alignItems: "center", marginTop: 20, gap: 8 },
    textoTermos: { color: "#CCCCCC", fontSize: 10, flex: 1, lineHeight: 16 },
    botao: { height: 46, backgroundColor: "#FF8500", borderRadius: 12, alignItems: "center", justifyContent: "center", marginTop: 24 },
    textoBotao: { color: "#FFFFFF", fontSize: 12, fontWeight: "bold" },
    rodape: { flexDirection: "row", justifyContent: "center", marginTop: 22 },
    textoRodape: { color: "#AAAAAA", fontSize: 11 },
    link: { color: "#FF8500", fontSize: 11, fontWeight: "bold" },
});
