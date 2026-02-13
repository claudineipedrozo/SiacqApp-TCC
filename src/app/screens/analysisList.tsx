import * as React from "react";
import { View, FlatList, Alert, Text, ActivityIndicator } from "react-native";
import { Card, Button, Badge } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
    const isFinalizada = item.status === "Finalizada";
    const isEnviado = item.status === "Enviado";

    const getStatusColor = () => {
      if (isEnviado) return "#B0B0B0";
      if (isFinalizada) return "#4CAF50";
      return "#FF9800";
    };

    const getStatusIcon = () => {
      if (isEnviado) return "check-circle";
      if (isFinalizada) return "check";
      return "clock-outline";
    };

    return (
      <Card
        onPress={() => handleItemPress(item)}
        style={[styles.card, { borderLeftWidth: 4, borderLeftColor: getStatusColor() }]}
        elevation={2}
      >
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <MaterialCommunityIcons 
                name="test-tube" 
                size={24} 
                color={getStatusColor()} 
                style={styles.cardIcon}
              />
              <Text style={styles.cardTitle}>Coleta nº {item.numero}</Text>
            </View>
            <Badge 
              style={[styles.badge, { backgroundColor: getStatusColor() }]}
              size={20}
            >
              {item.status}
            </Badge>
          </View>

          <View style={styles.cardInfo}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
              <Text style={styles.infoText}>{item.local}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="road" size={16} color="#666" />
              <Text style={styles.infoText} numberOfLines={1}>{item.endereco}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="map-marker-radius" size={16} color="#666" />
              <Text style={styles.infoText}>Ponto: {item.pontoColeta}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="water" size={16} color="#666" />
              <Text style={styles.infoText}>{item.manancial}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const analisesFinalizadas = coletas.filter((c) => c.status === "Finalizada").length;

  return (
    <View style={globalStyles.container}>
      {isSyncing && (
        <View style={globalStyles.centered}>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text style={{ marginTop: 12, fontSize: 16, color: "#1E90FF" }}>
            Enviando análises...
          </Text>
        </View>
      )}

      {!isSyncing && (
        <>
          {analisesFinalizadas > 0 && (
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>
                {analisesFinalizadas} {analisesFinalizadas === 1 ? 'análise finalizada' : 'análises finalizadas'} pronta{analisesFinalizadas > 1 ? 's' : ''} para sincronizar
              </Text>
            </View>
          )}

          <FlatList
            data={coletas}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="test-tube-off" size={64} color="#ccc" />
                <Text style={styles.emptyText}>Nenhuma análise disponível</Text>
              </View>
            }
          />

          <View style={styles.footerContainer}>
            <Button
              onPress={enviarAnalises}
              disabled={isSyncing || analisesFinalizadas === 0}
              mode="contained"
              style={[
                styles.syncButton,
                { 
                  backgroundColor: isSyncing || analisesFinalizadas === 0 ? "#A9A9A9" : "#1E90FF",
                  opacity: isSyncing || analisesFinalizadas === 0 ? 0.6 : 1
                }
              ]}
              labelStyle={styles.syncButtonLabel}
              icon={isSyncing ? () => <ActivityIndicator color="#fff" size="small" /> : "cloud-upload"}
            >
              {isSyncing ? "Sincronizando..." : "Sincronizar Análises"}
            </Button>
          </View>
        </>
      )}
    </View>
  );
}
