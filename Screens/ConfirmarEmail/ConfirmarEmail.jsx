import React from "react";
import { Alert } from "react-native";
import TelaSimples from "../../components/TelaSimples";
import API_URL from "../../Services/api";
export default function ConfirmarEmail({ emailInicial = "", voltar, concluido }) {
 async function confirmar(d) { if(!d.email || !d.codigo){Alert.alert("Atenção","Informe o e-mail e o código de seis dígitos.");return;} try { const r=await fetch(`${API_URL}/verificar_codigo`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}); const j=await r.json(); if(!r.ok){Alert.alert("Não foi possível confirmar",j.mensagem?.informacao||j.mensagem||j.erro||"Confira o código.");return;} Alert.alert("E-mail confirmado","Agora você pode entrar na sua conta."); concluido(); } catch { Alert.alert("Erro de conexão","Confira se o backend está ligado.");} }
 return <TelaSimples titulo="Confirmar e-mail" descricao="Digite o código enviado para seu e-mail." campos={[{nome:"email",rotulo:"E-mail",tipo:"email",placeholder:"seuemail@exemplo.com"},{nome:"codigo",rotulo:"Código de 6 dígitos",placeholder:"123456"}]} botao="Confirmar e-mail" aoContinuar={(d)=>confirmar({...d,email:d.email||emailInicial})} voltar={voltar} />;
}
