// src/screens/Execution.styles.ts

import { StyleSheet } from "react-native"
import { colors } from "@/styles/globalStyles"

export const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 24,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  coletaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 12,
  },
  divider: {
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
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
  checkboxContainer: {
    gap: 8,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#333",
    marginLeft: 8,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
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

  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  photoContainer: {
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: "transparent",
    alignItems: "center",
    zIndex: 20,
  },
  finalizeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 56,
    width: "92%",
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: colors.primary,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.32,
    shadowRadius: 6.27,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
})
