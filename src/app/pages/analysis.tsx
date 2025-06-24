import * as React from "react";
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";

import { styles } from "../../styles/analysis.styles";
import { globalStyles } from "../../styles/globalStyles";

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

  return (
    <View style={styles.container}>
      {/* Exemplo de exibição de dados */}
      <Text style={styles.infoText}>Coleta nº {id}</Text>
      {/* Campos de entrada */}
      {["Cor", "pH", "Temperatura", "Turbidez", "Coliformes"].map((label) => (
        <TextInput
          key={label}
          label={label}
          mode="outlined"
          theme={{ colors: { primary: "#1E90FF" } }}
          style={styles.textInput}
        />
      ))}

      <TouchableOpacity onPress={takePhoto} style={styles.photoButton}>
        <Text style={styles.buttonText}>Tirar Foto</Text>
      </TouchableOpacity>

      <FlatList
        data={photos}
        keyExtractor={(item, index) => `${item}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.photoList}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.photo} />}
        ListEmptyComponent={<Text style={styles.noPhotoText}>Nenhuma foto registrada.</Text>}
      />

      <TouchableOpacity onPress={finalizarAnalise} style={styles.finalizeButton}>
        <Text style={styles.buttonText}>Finalizar Análise</Text>
      </TouchableOpacity>
    </View>
  );
}
