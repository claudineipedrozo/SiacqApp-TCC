import * as React from "react";
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput, Card, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";

import { styles } from "../../styles/analysis.styles";
import { globalStyles } from "../../styles/globalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Analysis() {
  const [photos, setPhotos] = React.useState<string[]>([]);
  const [isSaving, setIsSaving] = React.useState(false);

  const router = useRouter();

  // *** Aqui pegamos o id da análise passada via params ***
  const { id } = useLocalSearchParams<{ id: string }>();

  const takePhoto = async () => {
    if (photos.length >= 5) {
      Alert.alert("Você já adicionou 5 fotos!");
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "É necessário permitir acesso à câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setPhotos((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const finalizarAnalise = () => {
    Alert.alert(
      "Finalizar Análise",
      "Tem certeza que deseja finalizar esta análise?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          onPress: () => {
            setIsSaving(true);

            setTimeout(() => {
              setIsSaving(false);

              // *** Passa o id da análise finalizada para a lista ***
              router.replace({
                pathname: "../screens/analysisList",
                params: { finalizadaId: id },
              });
            }, 2000);
          },
        },
      ]
    );
  };

  if (isSaving) {
    return (
      <View style={globalStyles.centered}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={{ marginTop: 12, fontSize: 16, color: "#1E90FF" }}>
          Salvando análise...
        </Text>
      </View>
    );
  }

  const analysisFields = [
    { label: "Cor", icon: "palette", unit: "" },
    { label: "pH", icon: "chart-line", unit: "" },
    { label: "Temperatura", icon: "thermometer", unit: "°C" },
    { label: "Turbidez", icon: "water", unit: "NTU" },
    { label: "Coliformes", icon: "bacteria", unit: "NMP/100mL" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      {/* Card de Informações */}
      <Card style={styles.infoCard} elevation={2}>
        <Card.Content>
          <View style={styles.infoHeader}>
            <MaterialCommunityIcons name="test-tube" size={28} color="#1E90FF" />
            <Text style={styles.coletaTitle}>Análise - Coleta nº {id}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Campos de Análise */}
      <Card style={styles.sectionCard} elevation={1}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Resultados da Análise</Text>
          {analysisFields.map((field) => (
            <TextInput
              key={field.label}
              label={`${field.label}${field.unit ? ` (${field.unit})` : ""}`}
              mode="outlined"
              theme={{ colors: { primary: "#1E90FF" } }}
              style={styles.input}
              left={<TextInput.Icon icon={field.icon} />}
              keyboardType={field.label === "Coliformes" ? "numeric" : "default"}
            />
          ))}
        </Card.Content>
      </Card>

      {/* Fotos */}
      <Card style={styles.sectionCard} elevation={1}>
        <Card.Content>
          <View style={styles.photoHeader}>
            <Text style={styles.sectionTitle}>Fotos ({photos.length}/5)</Text>
            {photos.length < 5 && (
              <TouchableOpacity onPress={takePhoto} style={styles.photoButtonSmall}>
                <MaterialCommunityIcons name="camera" size={20} color="#1E90FF" />
                <Text style={styles.photoButtonText}>Adicionar</Text>
              </TouchableOpacity>
            )}
          </View>
          {photos.length > 0 ? (
            <View style={styles.photoGrid}>
              {photos.map((photo, index) => (
                <View key={`${photo}-${index}`} style={styles.photoWrapper}>
                  <Image source={{ uri: photo }} style={styles.photo} />
                  <TouchableOpacity
                    style={styles.removePhotoButton}
                    onPress={() => setPhotos(photos.filter((_, i) => i !== index))}
                  >
                    <MaterialCommunityIcons name="close-circle" size={24} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyPhotoContainer}>
              <MaterialCommunityIcons name="camera-off" size={48} color="#ccc" />
              <Text style={styles.noPhotoText}>Nenhuma foto registrada</Text>
              <TouchableOpacity onPress={takePhoto} style={styles.photoButton}>
                <MaterialCommunityIcons name="camera" size={20} color="#fff" />
                <Text style={styles.buttonText}>Tirar Foto</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card.Content>
      </Card>

        {/* Botão Finalizar (dentro do conteúdo) */}
        <View style={{ height: 8 }} />
        <TouchableOpacity onPress={finalizarAnalise} style={[styles.finalizeButton, { alignSelf: 'center' }]}>
          <MaterialCommunityIcons name="check-circle" size={20} color="#fff" />
          <Text style={styles.buttonText}>Finalizar Análise</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
