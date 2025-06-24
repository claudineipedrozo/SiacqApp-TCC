// src/screens/CollectList.styles.ts

import { StyleSheet } from "react-native";
import { colors } from "./globalStyles";

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
  },
  finalizedCard: {
    backgroundColor: colors.success,
  },
  pendingCard: {
    backgroundColor: colors.secondary,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: colors.primary,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
