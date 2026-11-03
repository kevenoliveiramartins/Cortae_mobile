import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";

// Componente simples para reaproveitar o mesmo visual nas telas do aplicativo.
export default function TelaSimples({ titulo, descricao, campos = [], botao = "Continuar", aoContinuar, voltar, extras, children }) {
    const [valores, setValores] = useState({});

    function atualizar(campo, valor) {
        setValores({ ...valores, [campo]: valor });
    }

    function continuar() {
        if (aoContinuar) aoContinuar(valores);
        else Alert.alert("Cortaê", "Esta tela visual está pronta. A próxima etapa é conectar esta função à API.");
    }

    return (
        <ScrollView style={estilos.fundo} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
            <Text style={estilos.logo}>CORTA<Text style={estilos.laranja}>Ê</Text></Text>
            <Text style={estilos.titulo}>{titulo}</Text>
            {!!descricao && <Text style={estilos.descricao}>{descricao}</Text>}
            {children}
            {campos.map((campo) => (
                <View key={campo.nome} style={estilos.grupo}>
                    <Text style={estilos.rotulo}>{campo.rotulo}</Text>
                    <TextInput
                        style={estilos.input}
                        placeholder={campo.placeholder || campo.rotulo}
                        placeholderTextColor="#888"
                        value={valores[campo.nome] || ""}
                        onChangeText={(texto) => atualizar(campo.nome, texto)}
                        secureTextEntry={campo.tipo === "senha"}
                        keyboardType={campo.tipo === "email" ? "email-address" : campo.tipo === "telefone" ? "phone-pad" : "default"}
                        autoCapitalize={campo.tipo === "email" ? "none" : "sentences"}
                    />
                </View>
            ))}
            <TouchableOpacity style={estilos.botao} onPress={continuar}>
                <Text style={estilos.textoBotao}>{botao}</Text>
            </TouchableOpacity>
            {!!voltar && <TouchableOpacity style={estilos.botaoVoltar} onPress={voltar}><Text style={estilos.textoVoltar}>Voltar</Text></TouchableOpacity>}
            {extras}
        </ScrollView>
    );
}

const estilos = StyleSheet.create({
    fundo: { flex: 1, backgroundColor: "#F5F5F5" },
    conteudo: { flexGrow: 1, padding: 24, paddingTop: 42, paddingBottom: 40 },
    logo: { fontSize: 28, fontWeight: "900", color: "#111", marginBottom: 30, letterSpacing: 1 },
    laranja: { color: "#FF9C08" },
    titulo: { fontSize: 27, fontWeight: "800", color: "#111", marginBottom: 8 },
    descricao: { fontSize: 15, color: "#666", lineHeight: 22, marginBottom: 24 },
    grupo: { marginBottom: 16 },
    rotulo: { fontSize: 14, fontWeight: "700", color: "#222", marginBottom: 7 },
    input: { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#DDD", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: "#111" },
    botao: { backgroundColor: "#FF9C08", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 8 },
    textoBotao: { color: "#111", fontWeight: "800", fontSize: 16 },
    botaoVoltar: { padding: 15, alignItems: "center", marginTop: 8 },
    textoVoltar: { color: "#333", fontWeight: "700" },
});
