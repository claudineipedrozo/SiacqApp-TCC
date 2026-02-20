import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native"
import React, { useMemo, useState } from "react"
import { router } from "expo-router"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import CollectCreate from "@/features/collects/screens/collectCreate"
import { useCollects } from "@/features/collects/context/CollectsContext"
import { styles } from "@/features/collects/styles/index.styles"

export default function Index() {
  const { collects } = useCollects()

  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleLogout = () => router.replace("/auth/login")

  // 📊 KPIs Dinâmicos
  const pendingColetas = useMemo(
    () => collects.filter((c) => c.status === "Pendente").length,
    [collects],
  )

  const finalizadas = useMemo(
    () => collects.filter((c) => c.status === "Finalizada").length,
    [collects],
  )

  const pendentesSync = useMemo(
    () =>
      collects.filter((c) => c.status === "Finalizada" && !c.synchronized)
        .length,
    [collects],
  )

  // 📋 Últimas 3 coletas
  const ultimasColetas = useMemo(() => {
    return [...collects]
      .sort(
        (a, b) =>
          new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime(),
      )
      .slice(0, 3)
  }, [collects])

  const handleSync = () => {
    Alert.alert("Sincronização", "Sincronização simulada com sucesso.")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 👤 Header */}
        <View style={styles.headerCard}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: "https://github.com/claudineipedrozo.png" }}
              style={styles.img}
            />
            <View style={styles.user}>
              <Text style={styles.hi}>Olá,</Text>
              <Text style={styles.username}>Claudinei Pedrozo</Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <MaterialCommunityIcons name="logout" size={20} color="#1E90FF" />
          </TouchableOpacity>
        </View>

        {/* 📊 KPIs */}
        <View style={styles.kpiContainer}>
          <View style={styles.kpiCard}>
            <MaterialCommunityIcons
              name="clipboard-list"
              size={24}
              color="#1E90FF"
            />
            <Text style={styles.kpiValue}>{pendingColetas}</Text>
            <Text style={styles.kpiLabel}>Pendentes</Text>
          </View>

          <View style={styles.kpiCard}>
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color="#4CAF50"
            />
            <Text style={styles.kpiValue}>{finalizadas}</Text>
            <Text style={styles.kpiLabel}>Finalizadas</Text>
          </View>

          <View style={styles.kpiCard}>
            <MaterialCommunityIcons
              name="cloud-upload"
              size={24}
              color="#FF9800"
            />
            <Text style={styles.kpiValue}>{pendentesSync}</Text>
            <Text style={styles.kpiLabel}>Aguardando Sync</Text>
          </View>
        </View>

        {/* 📋 Últimas Coletas */}
        <View style={styles.activities}>
          <Text style={styles.activitiesTitle}>Últimas Coletas</Text>

          {ultimasColetas.length === 0 && (
            <Text style={{ color: "#666" }}>Nenhuma coleta registrada.</Text>
          )}

          {ultimasColetas.map((coleta) => (
            <View key={coleta.id} style={styles.activityItem}>
              <View>
                <Text style={styles.activityText}>{coleta.local}</Text>
                <Text style={{ fontSize: 12, color: "#777" }}>
                  {coleta.status}
                </Text>
              </View>

              <Text style={styles.activityTime}>
                {new Date(coleta.dataHora).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>

        {/* 🔘 Ações */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.newCollectButton}
            onPress={() => setShowCreateModal(true)}
          >
            <MaterialCommunityIcons name="plus-box" size={20} color="#fff" />
            <Text style={styles.buttonLabel}>Nova Coleta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.syncButton} onPress={handleSync}>
            <MaterialCommunityIcons name="cloud-sync" size={20} color="#fff" />
            <Text style={styles.buttonLabel}>Sincronizar</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={showCreateModal}
          animationType="slide"
          presentationStyle="fullScreen"
        >
          <CollectCreate onClose={() => setShowCreateModal(false)} />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  )
}
