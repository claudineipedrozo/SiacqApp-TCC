import * as React from "react";
import { View, FlatList, Alert } from "react-native";
import { Card, Text } from "react-native-paper";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

import { styles } from "../../styles";


const listaDeColetas = [
   {id: "08679", numero: "08679", local: "Aquidauana - MS", endereco: "Rua Antonio Nogueira, 1645", manancial: "Rio Aquidauana", status: "Pendente"},
   {id: "08680", numero: "08680", local: "Campo Grande - MS", endereco: "Rua Bahia, 200", manancial: "Córrego Prosa", status: "Pendente"},
   {id: "08681", numero: "08681", local: "Aquidauana - MS", endereco: "Rua Antonio Nogueira, 1645", manancial: "Rio Aquidauana", status: "Pendente"},
   {id: "08682", numero: "08682", local: "Campo Grande - MS", endereco: "Rua Bahia, 200", manancial: "Córrego Prosa", status: "Pendente"},
   {id: "08683", numero: "08683", local: "Aquidauana - MS", endereco: "Rua Antonio Nogueira, 1645", manancial: "Rio Aquidauana", status: "Pendente"},
   {id: "08684", numero: "08684", local: "Campo Grande - MS", endereco: "Rua Bahia, 200", manancial: "Córrego Prosa", status: "Pendente"},
   {id: "08685", numero: "08685", local: "Aquidauana - MS", endereco: "Rua Antonio Nogueira, 1645", manancial: "Rio Aquidauana", status: "Pendente"},
   {id: "08686", numero: "08686", local: "Campo Grande - MS", endereco: "Rua Bahia, 200", manancial: "Córrego Prosa", status: "Pendente"},
   {id: "08687", numero: "08687", local: "Aquidauana - MS", endereco: "Rua Antonio Nogueira, 1645", manancial: "Rio Aquidauana", status: "Pendente"},
   {id: "08688", numero: "08688", local: "Campo Grande - MS", endereco: "Rua Bahia, 200", manancial: "Córrego Prosa", status: "Pendente"},
];

type Coleta = {
  id: string;
  numero: string;
  local: string;
  endereco: string;
  manancial: string;
  status: string;
};

export default function CollectList() {
  const { finalizadaId } = useLocalSearchParams<{ finalizadaId?: string }>();

  // Transformar a lista em estado
  const [coletas, setColetas] = React.useState<Coleta[]>(listaDeColetas);

  React.useEffect(() => {
    if (finalizadaId) {
      setColetas((prev) => prev.filter((item) => item.id !== finalizadaId));
    }
  }, [finalizadaId]);

  const handleItemPress = (item: Coleta) => {
    Alert.alert(
      "Detalhes da Coleta",
      `Deseja iniciar ${item.numero}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Iniciar",
          onPress: () => {
            router.push({
              pathname: "../pages/analysis",
              params: { ...item },
            });
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Coleta }) => {
    return (
      <Card
        onPress={() => handleItemPress(item)}
        style={{
          backgroundColor: "#DCDCDC",
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
          <Text>Status: {item.status}</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {coletas.length === 0 ? (
        <Text>Nenhuma coleta pendente a analisar.</Text>
      ) : (
        <FlatList
          data={coletas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};