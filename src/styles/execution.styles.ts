// src/screens/Execution.styles.ts

import { StyleSheet } from "react-native";
import { colors } from "./globalStyles";

export const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  photoContainer: {
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
  },
  photoButton: {
    marginTop: 12, 
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  finalizeButton: {
    marginTop: 16,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
