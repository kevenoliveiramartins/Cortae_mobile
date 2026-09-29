import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import API_URL from "../../Services/api";


export default function SelecionarBarbearia({
                                                voltarLogin,
                                            }) {

    const [barbearias, setBarbearias] =
        useState([]);

    const [busca, setBusca] =
        useState("");

    const [carregando, setCarregando] =
        useState(true);


    // ==========================================
    // BUSCAR BARBEARIAS
    // ==========================================

    async function carregarBarbearias() {

        setCarregando(true);


        try {

            console.log(
                "BUSCANDO BARBEARIAS..."
            );


            const resposta =
                await fetch(
                    `${API_URL}/barbearias-disponiveis`
                );


            console.log(
                "STATUS BARBEARIAS:",
                resposta.status
            );


            const dados =
                await resposta.json();


            console.log(
                "BARBEARIAS:",
                dados
            );


            if (!resposta.ok) {

                setBarbearias([]);

                return;
            }


            /*
             * Caso sua API retorne:
             *
             * [
             *    {...},
             *    {...}
             * ]
             */

            if (Array.isArray(dados)) {

                setBarbearias(
                    dados
                );

                return;
            }


            /*
             * Caso retorne:
             *
             * {
             *    barbearias: [...]
             * }
             */

            if (
                Array.isArray(
                    dados?.barbearias
                )
            ) {

                setBarbearias(
                    dados.barbearias
                );

                return;
            }


            setBarbearias([]);

        }


        catch (erro) {

            console.log(
                "ERRO BARBEARIAS:",
                erro
            );

            setBarbearias([]);

        }


        finally {

            setCarregando(false);

        }

    }


    useEffect(() => {

        carregarBarbearias();

    }, []);


    // ==========================================
    // FILTRO
    // ==========================================

    const barbeariasFiltradas =
        barbearias.filter(
            (barbearia) => {

                const nome =
                    String(
                        barbearia.nome || ""
                    ).toLowerCase();


                const endereco =
                    String(
                        barbearia.endereco || ""
                    ).toLowerCase();


                const texto =
                    busca.toLowerCase();


                return (
                    nome.includes(texto) ||
                    endereco.includes(texto)
                );

            }
        );


    // ==========================================
    // IMAGEM
    // ==========================================

    function pegarImagem(imagem) {

        if (!imagem) {
            return null;
        }


        if (
            imagem.startsWith(
                "http://"
            ) ||
            imagem.startsWith(
                "https://"
            )
        ) {

            return imagem;

        }


        if (
            imagem.startsWith("/")
        ) {

            return (
                `${API_URL}${imagem}`
            );

        }


        return (
            `${API_URL}/${imagem}`
        );

    }


    // ==========================================
    // CARD
    // ==========================================

    function renderBarbearia({
                                 item,
                             }) {

        const imagem =
            pegarImagem(
                item.imagem
            );


        return (

            <View
                style={styles.card}
            >

                {/* FOTO */}

                {imagem ? (

                    <Image

                        source={{
                            uri: imagem,
                        }}

                        style={
                            styles.imagem
                        }

                        resizeMode="cover"

                    />

                ) : (

                    <View
                        style={[
                            styles.imagem,

                            styles.semImagem,
                        ]}
                    >

                        <Ionicons

                            name="cut-outline"

                            size={45}

                            color="#666666"

                        />

                    </View>

                )}


                {/* INFORMAÇÕES */}

                <View
                    style={
                        styles.informacoes
                    }
                >


                    {/* NOME */}

                    <Text
                        style={
                            styles.nome
                        }

                        numberOfLines={1}
                    >
                        {item.nome ||
                            "Barbearia"}
                    </Text>


                    {/* ENDEREÇO */}

                    <View
                        style={
                            styles.enderecoContainer
                        }
                    >

                        <Ionicons
                            name="location-outline"
                            size={13}
                            color="#777777"
                        />

                        <Text
                            style={
                                styles.endereco
                            }

                            numberOfLines={1}
                        >
                            {item.endereco ||
                                "Endereço não informado"}
                        </Text>

                    </View>


                    {/* STATUS */}

                    <View
                        style={
                            styles.status
                        }
                    >

                        <Text
                            style={
                                styles.aberto
                            }
                        >
                            ABERTO AGORA
                        </Text>


                        {item.horario && (

                            <Text
                                style={
                                    styles.horario
                                }
                            >
                                até {item.horario}
                            </Text>

                        )}

                    </View>


                    {/* BOTÕES */}

                    <View
                        style={
                            styles.acoes
                        }
                    >

                        <TouchableOpacity

                            style={
                                styles.botaoAgendar
                            }

                            onPress={() => {

                                console.log(
                                    "BARBEARIA ESCOLHIDA:",
                                    item
                                );

                            }}
                        >

                            <Text
                                style={
                                    styles.textoAgendar
                                }
                            >
                                Agendar Agora
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={
                                styles.favorito
                            }
                        >

                            <Ionicons

                                name="heart-outline"

                                size={20}

                                color="#999999"

                            />

                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        );

    }


    // ==========================================
    // CARREGANDO
    // ==========================================

    if (carregando) {

        return (

            <View
                style={
                    styles.loading
                }
            >

                <ActivityIndicator
                    size="large"
                    color="#FF8500"
                />


                <Text
                    style={
                        styles.loadingTexto
                    }
                >
                    Carregando barbearias...
                </Text>

            </View>

        );

    }


    // ==========================================
    // TELA
    // ==========================================

    return (

        <View
            style={
                styles.container
            }
        >


            {/* HEADER */}

            <View
                style={
                    styles.header
                }
            >

                <TouchableOpacity

                    style={
                        styles.voltar
                    }

                    onPress={
                        voltarLogin
                    }
                >

                    <Ionicons

                        name="chevron-back"

                        size={21}

                        color="#FFFFFF"

                    />

                </TouchableOpacity>


                <Text
                    style={
                        styles.titulo
                    }
                >
                    Selecione a Barbearia
                </Text>

            </View>


            {/* BUSCA */}

            <View
                style={
                    styles.busca
                }
            >

                <Ionicons

                    name="search-outline"

                    size={18}

                    color="#666666"

                />


                <TextInput

                    style={
                        styles.inputBusca
                    }

                    placeholder={
                        "Buscar barbearia..."
                    }

                    placeholderTextColor="#666666"

                    value={busca}

                    onChangeText={
                        setBusca
                    }

                />


                <TouchableOpacity
                    style={
                        styles.filtro
                    }
                >

                    <Ionicons

                        name="options-outline"

                        size={17}

                        color="#FF8500"

                    />

                </TouchableOpacity>

            </View>


            {/* TÍTULO */}

            <Text
                style={
                    styles.subtitulo
                }
            >
                BARBEARIAS{"\n"}PRÓXIMAS
            </Text>


            {/* LISTA */}

            <FlatList

                data={
                    barbeariasFiltradas
                }

                keyExtractor={(
                    item,
                    index
                ) => String(
                    item.id ??
                    item.id_barbearia ??
                    index
                )}

                renderItem={
                    renderBarbearia
                }

                showsVerticalScrollIndicator={
                    false
                }

                contentContainerStyle={
                    styles.lista
                }


                ListEmptyComponent={

                    <View
                        style={
                            styles.vazio
                        }
                    >

                        <Ionicons

                            name="cut-outline"

                            size={42}

                            color="#555555"

                        />

                        <Text
                            style={
                                styles.vazioTexto
                            }
                        >
                            Nenhuma barbearia encontrada.
                        </Text>

                    </View>

                }

            />

        </View>

    );

}


const styles = StyleSheet.create({

    container: {
        flex: 1,

        backgroundColor:
            "#111111",

        paddingHorizontal: 14,

        paddingTop: 18,
    },


    /* HEADER */

    header: {
        flexDirection: "row",

        alignItems: "center",

        marginBottom: 18,
    },


    voltar: {
        width: 30,

        height: 30,

        borderRadius: 20,

        backgroundColor:
            "#242424",

        alignItems: "center",

        justifyContent: "center",

        marginRight: 11,
    },


    titulo: {
        color: "#FFFFFF",

        fontSize: 15,

        fontWeight: "800",
    },


    /* BUSCA */

    busca: {
        height: 39,

        width: "100%",

        backgroundColor:
            "#202020",

        borderRadius: 11,

        flexDirection: "row",

        alignItems: "center",

        paddingLeft: 12,

        marginBottom: 18,
    },


    inputBusca: {
        flex: 1,

        height: "100%",

        color: "#FFFFFF",

        fontSize: 12,

        marginLeft: 8,
    },


    filtro: {
        width: 34,

        height: 34,

        borderRadius: 10,

        backgroundColor:
            "#30200F",

        alignItems: "center",

        justifyContent: "center",

        marginRight: 3,
    },


    /* SUBTÍTULO */

    subtitulo: {
        color: "#999999",

        fontSize: 10,

        lineHeight: 14,

        letterSpacing: 1,

        fontWeight: "700",

        marginBottom: 12,
    },


    lista: {
        paddingBottom: 30,
    },


    /* CARD */

    card: {
        backgroundColor:
            "#202020",

        borderRadius: 25,

        overflow: "hidden",

        marginBottom: 17,
    },


    imagem: {
        width: "100%",

        height: 132,
    },


    semImagem: {
        backgroundColor:
            "#292929",

        alignItems: "center",

        justifyContent: "center",
    },


    /* INFORMAÇÕES */

    informacoes: {
        paddingHorizontal: 13,

        paddingTop: 12,

        paddingBottom: 12,
    },


    nome: {
        color: "#FFFFFF",

        fontSize: 14,

        fontWeight: "800",

        width: "55%",

        marginBottom: 7,
    },


    enderecoContainer: {
        flexDirection: "row",

        alignItems: "center",

        width: "65%",
    },


    endereco: {
        color: "#777777",

        fontSize: 9,

        marginLeft: 4,

        flex: 1,
    },


    /* STATUS */

    status: {
        position: "absolute",

        right: 13,

        top: 14,

        alignItems: "flex-end",
    },


    aberto: {
        color: "#27D77B",

        fontSize: 7,

        fontWeight: "800",
    },


    horario: {
        color: "#888888",

        fontSize: 8,

        marginTop: 3,
    },


    /* AÇÕES */

    acoes: {
        flexDirection: "row",

        alignItems: "center",

        marginTop: 13,
    },


    botaoAgendar: {
        flex: 1,

        height: 34,

        backgroundColor:
            "#FF8500",

        borderRadius: 9,

        alignItems: "center",

        justifyContent: "center",

        marginRight: 8,
    },


    textoAgendar: {
        color: "#FFFFFF",

        fontSize: 11,

        fontWeight: "800",
    },


    favorito: {
        width: 39,

        height: 34,

        borderRadius: 9,

        backgroundColor:
            "#292929",

        alignItems: "center",

        justifyContent: "center",
    },


    /* LOADING */

    loading: {
        flex: 1,

        backgroundColor:
            "#111111",

        alignItems: "center",

        justifyContent: "center",
    },


    loadingTexto: {
        color: "#999999",

        fontSize: 13,

        marginTop: 12,
    },


    /* VAZIO */

    vazio: {
        alignItems: "center",

        justifyContent: "center",

        paddingTop: 70,
    },


    vazioTexto: {
        color: "#777777",

        fontSize: 13,

        marginTop: 12,
    },

});