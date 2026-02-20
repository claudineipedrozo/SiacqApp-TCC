import * as React from "react"
import { View, FlatList, Text, ActivityIndicator, Alert } from "react-native"
import { Button, Card, Badge } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

import { styles } from "@/features/collects/styles/collectList.styles"
import { globalStyles } from "@/styles/globalStyles"
import { useCollects } from "@/features/collects/context/CollectsContext"
import { Collect } from "@/features/collects/types/Collect"

export default function CollectList() {
  const router = useRouter()
  const { collects } = useCollects()
  const [loading, setLoading] = React.useState(true)
  const [isSyncing, setIsSyncing] = React.useState(false)

  React.useEffect(() => {
    // Simula carregamento das coletas
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleItemPress = (item: Collect) => {
    Alert.alert("Detalhes", `Deseja iniciar a coleta ${item.numero}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Iniciar",
        onPress: () =>
          router.push({
            pathname: "../pages/execution",
            params: { id: item.id },
          }),
      },
    ])
  }

  const handleSincronizar = async () => {
    setIsSyncing(true)
    //await sincronizarColetas()
    setIsSyncing(false)
    Alert.alert("Sucesso", "Coletas sincronizadas com sucesso!")
  }

  const renderItem = ({ item }: { item: Collect }) => {
    const isFinalizada = item.status === "Finalizada"
    const isEnviado = item.status === "Enviado"

    const getStatusColor = () => {
      if (isEnviado) return "#B0B0B0" // cinza
      if (isFinalizada) return "#4CAF50" // verde
      return "#1E90FF" // azul pendente
    }

    const getStatusIcon = () => {
      if (isEnviado) return "check-circle"
      if (isFinalizada) return "check"
      return "clock-outline"
    }

    return (
      <Card
        onPress={() => handleItemPress(item)}
        style={[
          styles.card,
          { borderLeftWidth: 4, borderLeftColor: getStatusColor() },
        ]}
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
            <Text style={styles.infoText}>{item.local}</Text>
            <Text style={styles.infoText}>{item.endereco}</Text>
            <Text style={styles.infoText}>Ponto: {item.pontoColeta}</Text>
            <Text style={styles.infoText}>{item.manancial}</Text>
          </View>
        </Card.Content>
      </Card>
    )
  }

  if (loading) {
    return (
      <View style={globalStyles.centered}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={{ marginTop: 12, fontSize: 16, color: "#1E90FF" }}>
          Carregando coletas...
        </Text>
      </View>
    )
  }

  const coletasFinalizadas = collects.filter(
    (c) => c.status === "Finalizada",
  ).length

  return (
    <View style={globalStyles.container}>
      {coletasFinalizadas > 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            {coletasFinalizadas}{" "}
            {coletasFinalizadas === 1
              ? "coleta finalizada"
              : "coletas finalizadas"}{" "}
            pronta{coletasFinalizadas > 1 ? "s" : ""} para sincronizar
          </Text>
        </View>
      )}

      <FlatList
        data={collects}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{ height: 24 }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="water-pump-off"
              size={64}
              color="#ccc"
            />
            <Text style={styles.emptyText}>Nenhuma coleta disponível</Text>
          </View>
        }
      />

      <View style={styles.footerContainer}>
        <Button
          onPress={handleSincronizar}
          disabled={isSyncing || coletasFinalizadas === 0}
          mode="contained"
          style={[
            styles.syncButton,
            {
              backgroundColor:
                isSyncing || coletasFinalizadas === 0 ? "#A9A9A9" : "#1E90FF",
              opacity: isSyncing || coletasFinalizadas === 0 ? 0.6 : 1,
            },
          ]}
          labelStyle={styles.syncButtonLabel}
          icon={
            isSyncing
              ? () => <ActivityIndicator color="#fff" size="small" />
              : "cloud-upload"
          }
        >
          {isSyncing ? "Sincronizando..." : "Sincronizar Coletas"}
        </Button>
      </View>
    </View>
  )
}
