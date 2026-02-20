import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
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
    elevation: 4,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  img: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#eee",
  },

  user: {
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
  },

  kpiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  kpiCard: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    elevation: 2,
  },

  kpiValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
  },

  kpiLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
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

  activityText: {
    color: "#333",
  },

  activityTime: {
    color: "#999",
    fontSize: 12,
  },

  bottomActions: {
    marginTop: 24,
    gap: 12,
  },

  newCollectButton: {
    backgroundColor: "#1E90FF",
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  syncButton: {
    backgroundColor: "#FF9800",
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  buttonLabel: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
})
