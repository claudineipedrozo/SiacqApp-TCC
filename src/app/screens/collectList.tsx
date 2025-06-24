import * as React from "react";
import { View, FlatList, Alert, Text, ActivityIndicator } from "react-native";
import { Button, Card } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";

import { styles } from "../../styles/collectList.style";
import { globalStyles } from "../../styles/globalStyles";

type Coleta = {
  id: string;
  numero: string;
  local: string;
  endereco: string;
  pontoColeta: string;
  manancial: string;
  status: string;
};

export default function CollectList() {
  const { finalizadas } = useLocalSearchParams<{ finalizadas?: string }>();

  const [finalizadasIds, setFinalizadasIds] = React.useState<string[]>(() =>
    finalizadas ? finalizadas.split(",") : []
  );

  const [coletas, setColetas] = React.useState<Coleta[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isSyncing, setIsSyncing] = React.useState(false);

  React.useEffect(() => {
    // Simula carregamento das coletas com delay
    setTimeout(() => {
      const fetchedColetas: Coleta[] = [
        { id: "08679", numero: "08679", local: "Aquidauana", endereco: "Rua 1", pontoColeta: "PTA-001", manancial: "Rio A", status: "Pendente" },
        { id: "08680", numero: "08680", local: "Campo Grande", endereco: "Rua 2", pontoColeta: "PTA-002", manancial: "Córrego B", status: "Pendente" },
        // ... outras coletas
      ];

      const coletasAtualizadas = fetchedColetas.map((coleta) =>
        finalizadasIds.includes(coleta.id)
          ? { ...coleta, status: "Finalizada" }
          : coleta
      );

      setColetas(coletasAtualizadas);
      setLoading(false);
    }, 1500);
  }, [finalizadasIds]);

  const handleItemPress = (item: Coleta) => {
    Alert.alert("Detalhes", `Deseja iniciar a coleta ${item.numero}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Iniciar",
        onPress: () => {
          router.push({
            pathname: "../pages/execution",
            params: { ...item, finalizadas: finalizadasIds.join(",") },
          });
        },
      },
    ]);
  };

  const handleEnviarColetas = () => {
    const coletasParaEnviar = coletas.filter((c) => c.status === "Finalizada");

    if (coletasParaEnviar.length === 0) {
      Alert.alert("Aviso", "Nenhuma coleta finalizada para sincronizar.");
      return;
    }

    setIsSyncing(true);

    // Simula envio
    setTimeout(() => {
      setColetas((prev) =>
        prev.map((coleta) =>
          coleta.status === "Finalizada" ? { ...coleta, status: "Enviado" } : coleta
        )
      );
      setIsSyncing(false);
      Alert.alert("Sucesso", "Coletas sincronizadas com sucesso!");
    }, 2000);
  };

  if (loading) {
    return (
      <View style={globalStyles.centered}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={{ marginTop: 12, fontSize: 16, color: "#1E90FF" }}>
          Carregando coletas...
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Coleta }) => {
    const isFinalizada = item.status === "Finalizada";

    return (
      <Card
        onPress={() => handleItemPress(item)}
        style={[
          styles.card,
          { backgroundColor: isFinalizada ? "#d1f7c4" : "#DCDCDC" },
        ]}
      >
        <Card.Content>
          <Text style={{ fontWeight: "bold" }}>Coleta nº {item.numero}</Text>
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
      <FlatList
        data={coletas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListFooterComponent={() => (
          <View style={{ marginTop: 20 }}>
            <Button
              onPress={handleEnviarColetas}
              disabled={isSyncing}
              style={{
                backgroundColor: isSyncing ? "#A9A9A9" : "#1E90FF",
                height: 50,
                borderRadius: 8,
                justifyContent: "center",
              }}
              labelStyle={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}
            >
              {isSyncing ? "Sincronizando..." : "Sincronizar Coletas"}
            </Button>
          </View>
        )}
      />
    </View>
  );
}
