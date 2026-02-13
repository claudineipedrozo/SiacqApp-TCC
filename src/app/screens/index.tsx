import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, Modal } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CollectCreate from "../../components/collectCreate";

export default function Index() {
  const handleLogout = () => router.replace("/auth/login");

  const pendingColetas = 3;
  const analisesFinalizadas = 2;
  const prontoSync = 1;
  const analisesPendentes = 4;

  const [loadedColetas, setLoadedColetas] = useState(0);
  const [loadedAnalises, setLoadedAnalises] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleLoadForExecution = () => {
    // For now, simulate loading by using pending counts
    setLoadedColetas(pendingColetas);
    setLoadedAnalises(analisesPendentes);
    Alert.alert("Carregamento", `Carregadas ${pendingColetas} coletas e ${analisesPendentes} análises para execução.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerCard}>
          <View style={styles.headerLeft}>
            <Image source={{ uri: "https://github.com/claudineipedrozo.png" }} style={styles.img} />
            <View style={styles.user}>
              <Text style={styles.hi}>Olá,</Text>
              <Text style={styles.username}>Claudinei Pedrozo</Text>
            </View>

            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.logoutButton, styles.logoutInCard]}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Sair da conta"
            >
              <MaterialCommunityIcons name="logout" size={20} color="#1E90FF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.kpisRow}>
          <View style={styles.kpiBig}>
            <MaterialCommunityIcons name="clipboard-list" size={28} color="#1E90FF" />
            <Text style={styles.kpiValueBig}>{pendingColetas}</Text>
            <Text style={styles.kpiLabel}>Coletas Pendentes</Text>
          </View>

          <View style={styles.kpiBig}>
            <MaterialCommunityIcons name="test-tube" size={28} color="#FF9800" />
            <Text style={styles.kpiValueBig}>{analisesPendentes}</Text>
            <Text style={styles.kpiLabel}>Análises Pendentes</Text>
          </View>
        </View>

        {/* shortcuts removed (Sincronizar, Análises). Nova Coleta será mostrada abaixo das atividades */}

        <View style={styles.activities}>
          <Text style={styles.activitiesTitle}>Atividades recentes{loadedColetas > 0 ? ` • ${loadedColetas} carregadas` : ''}</Text>

          {loadedColetas > 0 && (
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>Coletas carregadas para execução</Text>
              <Text style={styles.activityTime}>{loadedColetas}</Text>
            </View>
          )}

          <View style={styles.activityItem}><Text style={styles.activityText}>Coleta 08679 iniciada</Text><Text style={styles.activityTime}>2h</Text></View>
          <View style={styles.activityItem}><Text style={styles.activityText}>Análise 08680 finalizada</Text><Text style={styles.activityTime}>5h</Text></View>
          <View style={styles.activityItem}><Text style={styles.activityText}>Sincronização concluída</Text><Text style={styles.activityTime}>1d</Text></View>
        </View>

        <View style={styles.bottomActionWrapper}>
          <TouchableOpacity style={styles.loadButton} onPress={handleLoadForExecution} activeOpacity={0.8}>
            <MaterialCommunityIcons name="database-import" size={18} color="#fff" />
            <Text style={styles.loadLabel}>Carregar Coletas/ Análises</Text>
          </TouchableOpacity>

          <View style={{ height: 12 }} />

          <TouchableOpacity style={styles.newCollectButton} onPress={() => setShowCreateModal(true)}>
            <MaterialCommunityIcons name="plus-box" size={20} color="#fff" />
            <Text style={styles.newCollectLabel}>Nova Coleta</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={showCreateModal} animationType="slide" presentationStyle="fullScreen">
          <CollectCreate onClose={() => setShowCreateModal(false)} />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
  },
  card: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  img: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
  user: {
    flex: 1,
    justifyContent: "center",
  },
  hi: {
    fontSize: 14,
    color: "#444",
  },
  username: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  kpis: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 6,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },
  kpiLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  shortcuts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  shortcut: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 6,
  },
  shortcutIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  shortcutLabel: {
    marginTop: 8,
    fontSize: 12,
    color: "#333",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 28,
  },
  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoutInCard: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  kpisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
  },
  kpiBig: {
    width: '48%',
    backgroundColor: "#fff",
    marginHorizontal: 0,
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    height: 96,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  kpiValueBig: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginTop: 6,
  },
  kpisRowSingle: {
    marginTop: 16,
    paddingHorizontal: 6,
  },
  kpiBigSingle: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    height: 96,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  shortcutsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  shortcutGrid: {
    flex: 1,
    height: 92,
    marginHorizontal: 6,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  shortcutGridLabel: {
    color: "#fff",
    marginTop: 8,
    fontWeight: "600",
  },
  activities: {
    marginTop: 20,
  },
  activitiesTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  activityItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  activityText: { color: "#333" },
  activityTime: { color: "#999", fontSize: 12 },
  bottomActionWrapper: {
    marginTop: 16,
    paddingHorizontal: 0,
    marginBottom: 24,
  },
  newCollectButton: {
    backgroundColor: "#1E90FF",
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  newCollectLabel: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
  loadButton: {
    backgroundColor: "#4CAF50",
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
  },
  loadLabel: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
});
