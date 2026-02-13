import { StyleSheet } from "react-native";
import { colors } from "./globalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 46,
    backgroundColor: "#f5f5f5",
  },
  infoCard: {
    marginBottom: 8,
    borderRadius: 10,
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
    marginBottom: 8,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
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
    gap: 8,
  },
  photoWrapper: {
    position: "relative",
  },
  photo: {
    width: 100,
    height: 100,
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
    paddingVertical: 12,
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  noPhotoText: {
    marginTop: 8,
    marginBottom: 6,
    color: "#999",
    fontSize: 13,
  },
  finalizeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 48,
    width: "84%",
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: colors.primary,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
