import * as React from "react";
import { View, FlatList, Text, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Card } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";

type Coleta = {
  id: string;
  numero: string;
  local: string;
  endereco: string;
  manancial: string;
  status: string;
};

export default function CollectList() {
  const { finalizadas } = useLocalSearchParams<{ finalizadas?: string }>();

  const [coletas, setColetas] = React.useState<Coleta[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isSyncing, setIsSyncing] = React.useState(false);

  // Transforma a string finalizadas em array
  const finalizadasArray = React.useMemo(() => {
    return finalizadas ? finalizadas.split(",") : [];
  }, [finalizadas]);

  // Carregar coletas do backend (simulado aqui)
  React.useEffect(() => {
    const carregarColetas = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulando chamada API com delay e dados mockados
        await new Promise((res) => setTimeout(res, 1500));
        const dadosApi: Coleta[] = [
          {
            id: "08679",
            numero: "08679",
            local: "Aquidauana - MS",
            endereco: "Rua Antonio Nogueira, 1645",
            manancial: "Rio Aquidauana",
            status: "Pendente",
          },
          {
            id: "08680",
            numero: "08680",
            local: "Campo Grande - MS",
            endereco: "Rua Bahia, 200",
            manancial: "Córrego Prosa",
            status: "Pendente",
          },
          {
            id: "08681",
            numero: "08681",
            local: "Aquidauana - MS",
            endereco: "Rua Antonio Nogueira, 1645",
            manancial: "Rio Aquidauana",
            status: "Pendente",
          },
          {
            id: "08682",
            numero: "08682",
            local: "Campo Grande - MS",
            endereco: "Rua Bahia, 200",
            manancial: "Córrego Prosa",
            status: "Pendente",
          },
          {
            id: "08683",
            numero: "08683",
            local: "Aquidauana - MS",
            endereco: "Rua Antonio Nogueira, 1645",
            manancial: "Rio Aquidauana",
            status: "Pendente",
          },
          {
            id: "08684",
            numero: "08684",
            local: "Campo Grande - MS",
            endereco: "Rua Bahia, 200",
            manancial: "Córrego Prosa",
            status: "Pendente",
          },
          {
            id: "08685",
            numero: "08685",
            local: "Aquidauana - MS",
            endereco: "Rua Antonio Nogueira, 1645",
            manancial: "Rio Aquidauana",
            status: "Pendente",
          },
          {
            id: "08686",
            numero: "08686",
            local: "Campo Grande - MS",
            endereco: "Rua Bahia, 200",
            manancial: "Córrego Prosa",
            status: "Pendente",
          },
          {
            id: "08687",
            numero: "08687",
            local: "Aquidauana - MS",
            endereco: "Rua Antonio Nogueira, 1645",
            manancial: "Rio Aquidauana",
            status: "Pendente",
          },
          {
            id: "08688",
            numero: "08688",
            local: "Campo Grande - MS",
            endereco: "Rua Bahia, 200",
            manancial: "Córrego Prosa",
            status: "Pendente",
          },
        ];

        setColetas(dadosApi);
      } catch (e: any) {
        setError("Não foi possível carregar as coletas.");
      } finally {
        setLoading(false);
      }
    };

    carregarColetas();
  }, []);

  // Atualiza status das coletas finalizadas quando carregar e quando param mudam
  React.useEffect(() => {
    if (!loading && finalizadasArray.length > 0) {
      setColetas((prevColetas) =>
        prevColetas.map((coleta) =>
          finalizadasArray.includes(coleta.id)
            ? { ...coleta, status: "Finalizada" }
            : coleta
        )
      );
    }
  }, [finalizadasArray, loading]);

  const handleItemPress = (item: Coleta) => {
    Alert.alert(
      "Detalhes da Coleta",
      `Deseja iniciar a coleta ${item.numero}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Iniciar",
          onPress: () => {
            router.push({
              pathname: "../pages/execution",
              params: { ...item, finalizadas },
            });
          },
        },
      ]
    );
  };

  const handleEnviarColetas = () => {
    const coletasParaEnviar = coletas.filter((c) => c.status === "Finalizada");

    if (coletasParaEnviar.length === 0) {
      Alert.alert("Aviso", "Nenhuma coleta finalizada para sincronizar.");
      return;
    }

    setIsSyncing(true);

    setTimeout(() => {
      setColetas((prev) =>
        prev.map((coleta) =>
          coleta.status === "Finalizada"
            ? { ...coleta, status: "Enviado" }
            : coleta
        )
      );

      setIsSyncing(false);
      Alert.alert("Sucesso", "Coletas enviadas com sucesso!");
    }, 2000);
  };

  const renderItem = ({ item }: { item: Coleta }) => {
    const isFinalizada = item.status === "Finalizada";

    return (
      <Card
        onPress={() => handleItemPress(item)}
        style={{
          backgroundColor: isFinalizada ? "#d1f7c4" : "#DCDCDC",
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

  if (loading) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#1E90FF" />
      <Text style={styles.loadingText}>Carregando coletas...</Text>
    </View>
  );
}

  if (error) {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}


  if (coletas.length === 0) {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.emptyText}>Nenhuma coleta disponível no momento.</Text>
    </View>
  );
}


  return (
    <View style={styles.container}>
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
              labelStyle={{
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {isSyncing
                ? "Sincronizando..."
                : "Sincronizar Coletas Executadas"}
            </Button>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  message: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#1E90FF",
  },
   errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
  },
});
