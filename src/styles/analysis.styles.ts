import { StyleSheet } from "react-native";
import { colors } from "./globalStyles";  

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  coletaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 12,
  },
  sectionCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  photoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  photoButtonSmall: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  photoButtonText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  photoWrapper: {
    position: "relative",
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  removePhotoButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  emptyPhotoContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  noPhotoText: {
    marginTop: 12,
    marginBottom: 8,
    color: "#999",
    fontSize: 14,
  },
  finalizeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: colors.primary,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  // Estilos para a lista de análises
  card: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardIcon: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  badge: {
    marginLeft: 8,
  },
  cardInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  summaryContainer: {
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  summaryText: {
    fontSize: 14,
    color: "#1976D2",
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
    textAlign: "center",
  },
  footerContainer: {
    marginTop: 20,
    marginBottom: 16,
  },
  syncButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
  },
  syncButtonLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  textInput: {
    marginTop: 8,
  },
  photoList: {
    marginTop: 10,
  },
  pendenteCard: {
    backgroundColor: "#DCDCDC",
  },
  enviadoCard: {
    backgroundColor: "#d1f7c4",
  },
  coletaNumero: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
