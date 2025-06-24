import { StyleSheet } from "react-native";
import { colors } from "./globalStyles";  

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  textInput: {
    marginTop: 8,
  },
  photoButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  photoList: {
    marginTop: 10,
  },
  photo: {
    width: 160,
    height: 160,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  noPhotoText: {
    marginTop: 10,
    color: "#555",
    textAlign: "center",
  },
  finalizeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
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
