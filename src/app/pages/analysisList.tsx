import * as React from "react";
import { View, FlatList, Alert } from "react-native";
import { Card, Text } from "react-native-paper";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import { styles } from "../../styles";


const listaDeColetas = [
   {id: "08679", numero: "08679", local: "Aquidauana - MS", endereco: "Rua Antonio Nogueira, 1645", manancial: "Rio Aquidauana", status: "Pendente"},
   {id: "08680", numero: "08680", local: "Campo Grande - MS", endereco: "Rua Bahia, 200", manancial: "Córrego Prosa", status: "Pendente"},
   {id: "08681", numero: "08679", local: "Aquidauana - MS", endereco: "Rua Antonio Nogueira, 1645", manancial: "Rio Aquidauana", status: "Pendente"},
   {id: "08682", numero: "08680", local: "Campo Grande - MS", endereco: "Rua Bahia, 200", manancial: "Córrego Prosa", status: "Pendente"},
   {id: "08683", numero: "08679", local: "Aquidauana - MS", endereco: "Rua Antonio Nogueira, 1645", manancial: "Rio Aquidauana", status: "Pendente"},
   {id: "08684", numero: "08680", local: "Campo Grande - MS", endereco: "Rua Bahia, 200", manancial: "Córrego Prosa", status: "Pendente"},
   {id: "08685", numero: "08679", local: "Aquidauana - MS", endereco: "Rua Antonio Nogueira, 1645", manancial: "Rio Aquidauana", status: "Pendente"},
   {id: "08686", numero: "08680", local: "Campo Grande - MS", endereco: "Rua Bahia, 200", manancial: "Córrego Prosa", status: "Pendente"},
   {id: "08687", numero: "08679", local: "Aquidauana - MS", endereco: "Rua Antonio Nogueira, 1645", manancial: "Rio Aquidauana", status: "Pendente"},
   {id: "08688", numero: "08680", local: "Campo Grande - MS", endereco: "Rua Bahia, 200", manancial: "Córrego Prosa", status: "Pendente"},
];

type Coleta = {
  id: string;
  numero: string;
  local: string;
  endereco: string;
  manancial: string;
  status: string;
};


export default function AnalysisList() {

  const { finalizadaId } = useLocalSearchParams();

  const handleItemPress = (item: Coleta) => {
    Alert.alert(
      "Detalhes da Coleta",
      `Deseja iniciar ${item.numero}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Iniciar",
          onPress: () => {
            router.push({ pathname: "./detailPage", params: { ...item }, });
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Coleta }) => {
    const finalizada = item.id === finalizadaId;

    return (
      <Card
        onPress={() => handleItemPress(item)}
        style={{
          backgroundColor: finalizada ? "#d1f7c4" : "#DCDCDC",
          padding: 16,
          borderWidth: 1,
          marginBottom: 10,
          borderRadius: 8,
        }}
      >
        <Card.Content>
          <Text style={{ fontWeight: "bold" }}>Coleta nº {item.numero}</Text>
          <Text>Local: {item.local}</Text>
          <Text>Endereço: {item.endereco}</Text>
          <Text>Manancial: {item.manancial}</Text>
          <Text>Status: {finalizada ? "Finalizada" : item.status}</Text>
        </Card.Content>
      </Card>
    );
};

  return (
    <View style={styles.container}>
      <FlatList
        data={listaDeColetas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      ></FlatList>
    </View>
  );
};

