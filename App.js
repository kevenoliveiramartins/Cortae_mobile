import React, {useState,} from "react";

import Login from "./Screens/Login/Login";

import SelecionarBarbearia from "./Screens/SelecioneBarbearia/SelecioneBarbearia";


export default function App() {

  const [tela, setTela] =
      useState("login");


  function irParaBarbearias(
      dadosUsuario
  ) {

    console.log(
        "USUÁRIO LOGADO:",
        dadosUsuario
    );


    setTela(
        "barbearias"
    );
  }


  function voltarLogin() {

    setTela(
        "login"
    );

  }


  // ==========================================
  // LOGIN
  // ==========================================

  if (tela === "login") {

    return (

        <Login

            irParaBarbearias={
              irParaBarbearias
            }

        />

    );

  }


  // ==========================================
  // BARBEARIAS
  // ==========================================

  return (

      <SelecionarBarbearia

          voltarLogin={
            voltarLogin
          }

      />

  );

}