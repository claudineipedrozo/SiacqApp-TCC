import * as React from "react";
import { View, FlatList, Alert, Text, ActivityIndicator } from "react-native";
import { Card, Button } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";

import { styles } from "../../styles/analysis.styles";
import { globalStyles } from "../../styles/globalStyles";

type Coleta = {
  id: string;
  numero: string;
  local: string;
  endereco: string;
  pontoColeta: string;
  manancial: string;
  status: string; // "Pendente" | "Finalizada" | "Enviado"
};

const listaDeColetas: Coleta[] = [
  {
    id: "08679",
    numero: "08679",
    local: "Aquidauana - MS",
    endereco: "Rua Antonio Nogueira, 1645",
    pontoColeta: "PTA-001",
    manancial: "Rio Aquidauana",
    status: "Pendente",
  },
  {
    id: "08680",
    numero: "08680",
    local: "Campo Grande - MS",
    endereco: "Rua Bahia, 200",
    pontoColeta: "PTA-002",
    manancial: "Córrego Prosa",
    status: "Pendente",
  },
  // mais coletas...
];

export default function AnalysisList() {
  // Recebe o id da análise finalizada
  const { finalizadaId } = useLocalSearchParams<{ finalizadaId?: string }>();

  const [coletas, setColetas] = React.useState<Coleta[]>(listaDeColetas);
  const [isSyncing, setIsSyncing] = React.useState(false);

  React.useEffect(() => {
    if (finalizadaId) {
      setColetas((prev) =>
        prev.map((item) =>
          item.id === finalizadaId ? { ...item, status: "Finalizada" } : item
        )
      );
    }
  }, [finalizadaId]);

  const handleItemPress = (item: Coleta) => {
    Alert.alert(
      "Detalhes da Coleta",
      `Deseja iniciar a análise da coleta ${item.numero}?`,
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

  const enviarAnalises = () => {
    const finalizadas = coletas.filter((c) => c.status === "Finalizada");

    if (finalizadas.length === 0) {
      Alert.alert(
        "Nenhuma análise finalizada",
        "Finalize pelo menos uma análise antes de sincronizar."
      );
      return;
    }

    setIsSyncing(true);

    setTimeout(() => {
      setColetas((prev) =>
        prev.map((c) =>
          c.status === "Finalizada" ? { ...c, status: "Enviado" } : c
        )
      );

      setIsSyncing(false);
      Alert.alert("Sucesso", "Análises sincronizadas com sucesso!");
    }, 2000);
  };

  const renderItem = ({ item }: { item: Coleta }) => {
    let backgroundColor = "#DCDCDC"; // Pendente (cinza claro)

    if (item.status === "Finalizada") {
      backgroundColor = "#d1f7c4"; // Verde claro
    } else if (item.status === "Enviado") {
      backgroundColor = "#B0B0B0"; // Cinza mais escuro
    }

    return (
      <Card
        onPress={() => handleItemPress(item)}
        style={[styles.card, { backgroundColor }]}
      >
        <Card.Content>
          <Text style={styles.coletaNumero}>Coleta nº {item.numero}</Text>
          <Text>Local: {item.local}</Text>
          <Text>Endereço: {item.endereco}</Text>
          <Text>Ponto de Coleta: {item.pontoColeta}</Text>
          <Text>Manancial: {item.manancial}</Text>
          <Text>Status: {item.status}</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={globalStyles.container}>
      {isSyncing && (
        <View style={globalStyles.centered}>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text>Enviando análises...</Text>
        </View>
      )}

      {!isSyncing && (
        <>
          <FlatList
            data={coletas}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />

          <Button
            onPress={enviarAnalises}
            disabled={isSyncing}
            style={globalStyles.button}
            labelStyle={globalStyles.buttonText}
          >
            Sincronizar Análises
          </Button>
        </>
      )}
    </View>
  );
}
