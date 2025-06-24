// src/styles/globalStyles.ts

import { StyleSheet } from "react-native";

export const colors = {
  primary: "#1E90FF",
  secondary: "#DCDCDC",
  success: "#d1f7c4",
  error: "red",
  text: "#333",
  background: "#fff",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
