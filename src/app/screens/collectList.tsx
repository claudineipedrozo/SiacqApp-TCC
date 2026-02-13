import * as React from "react";
import { View, FlatList, Alert, Text, ActivityIndicator, ScrollView } from "react-native";
import { Button, Card, Badge } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { styles } from "../../styles/collectList.styles";
import { globalStyles } from "../../styles/globalStyles";
import { useContext } from "react";
import { CollectsContext } from "../../contexts/CollectsContext";

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

  const collectsCtx = useContext(CollectsContext);
  const [coletas, setColetas] = React.useState<Coleta[]>(collectsCtx.coletas);
  const [loading, setLoading] = React.useState(true);
  const [isSyncing, setIsSyncing] = React.useState(false);

  React.useEffect(() => {
    // subscribe to context changes
    setColetas(collectsCtx.coletas);
  }, [collectsCtx.coletas]);

  React.useEffect(() => {
    // Simula carregamento das coletas
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
    const isEnviado = item.status === "Enviado";

    const getStatusColor = () => {
      if (isEnviado) return "#B0B0B0";
      if (isFinalizada) return "#4CAF50";
      return "#1E90FF";
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
                name="water-pump" 
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

  const coletasFinalizadas = coletas.filter((c) => c.status === "Finalizada").length;

  return (
    <View style={globalStyles.container}>
      {coletasFinalizadas > 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            {coletasFinalizadas} {coletasFinalizadas === 1 ? 'coleta finalizada' : 'coletas finalizadas'} pronta{coletasFinalizadas > 1 ? 's' : ''} para sincronizar
          </Text>
        </View>
      )}

      <FlatList
        data={coletas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{ height: 24 }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="water-pump-off" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Nenhuma coleta disponível</Text>
          </View>
        }
      />

      <View style={styles.footerContainer}>
        <Button
          onPress={handleEnviarColetas}
          disabled={isSyncing || coletasFinalizadas === 0}
          mode="contained"
          style={[
            styles.syncButton,
            { 
              backgroundColor: isSyncing || coletasFinalizadas === 0 ? "#A9A9A9" : "#1E90FF",
              opacity: isSyncing || coletasFinalizadas === 0 ? 0.6 : 1
            }
          ]}
          labelStyle={styles.syncButtonLabel}
          icon={isSyncing ? () => <ActivityIndicator color="#fff" size="small" /> : "cloud-upload"}
        >
          {isSyncing ? "Sincronizando..." : "Sincronizar Coletas"}
        </Button>
      </View>
    </View>
  );
}
