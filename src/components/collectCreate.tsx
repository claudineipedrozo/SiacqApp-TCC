import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CollectsContext } from "../contexts/CollectsContext";

type Props = {
  onClose?: () => void;
};

export default function CollectCreate({ onClose }: Props) {
  const collectsContext = useContext(CollectsContext);
  const [regional, setRegional] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [interessado, setInteressado] = useState("");
  const [ponto, setPonto] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleSave = () => {
    if (!regional || !localidade || !interessado || !ponto || !endereco) {
      Alert.alert("Campos incompletos", "Preencha todos os campos antes de salvar.");
      return;
    }

    const { addColeta } = collectsContext;
    addColeta({
      local: localidade,
      endereco,
      pontoColeta: ponto,
      manancial: regional,
    });

    Alert.alert("Cadastro", "Coleta criada com sucesso.", [
      { text: "OK", onPress: () => (onClose ? onClose() : router.back()) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Nova Coleta</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Regional</Text>
          <TextInput value={regional} onChangeText={setRegional} style={styles.input} placeholder="Ex: Norte" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Localidade</Text>
          <TextInput value={localidade} onChangeText={setLocalidade} style={styles.input} placeholder="Ex: Unidade X" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Interessado</Text>
          <TextInput value={interessado} onChangeText={setInteressado} style={styles.input} placeholder="Nome do interessado" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Ponto de Coleta</Text>
          <TextInput value={ponto} onChangeText={setPonto} style={styles.input} placeholder="Ex: Sala 12" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Endereço da Coleta</Text>
          <TextInput
            value={endereco}
            onChangeText={setEndereco}
            style={[styles.input, styles.textarea]}
            placeholder="Rua, número, complemento"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
            <MaterialCommunityIcons name="content-save" size={18} color="#fff" />
            <Text style={styles.saveLabel}>Salvar Coleta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => (onClose ? onClose() : router.back())} activeOpacity={0.8}>
            <Text style={styles.cancelLabel}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7fb" },
  content: { padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  field: { marginBottom: 12 },
  label: { fontSize: 13, color: "#444", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  textarea: { height: 80, textAlignVertical: "top" },
  actions: { marginTop: 18 },
  saveButton: {
    backgroundColor: "#1E90FF",
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  saveLabel: { color: "#fff", fontWeight: "700", marginLeft: 8 },
  cancelButton: { marginTop: 10, alignItems: "center" },
  cancelLabel: { color: "#1E90FF", fontWeight: "700" },
});
