import * as React from "react";
import { View, Text, Button, Alert, Image, FlatList } from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";

import { styles } from "../../styles";

export default function Execution() {
  const [photos, setPhotos] = React.useState<string[]>([]);

  const router = useRouter();
  const { id, finalizadas } = useLocalSearchParams<{ id: string; finalizadas?: string }>();

  const takePhoto = async () => {
    if (photos.length >= 4) {
      Alert.alert("Você já adicionou 4 fotos!");
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

  const finalizarColeta = () => {
    // Pega a lista de IDs finalizados anteriores
    const idsAnteriores = finalizadas ? finalizadas.split(",") : [];

    // Adiciona o ID atual, mas evitando duplicatas
    const novasFinalizadas = Array.from(new Set([...idsAnteriores, id]));

    // Navega de volta para a lista, passando a nova lista de finalizadas
    router.replace({
      pathname: "../screens/collect",
      params: { finalizadas: novasFinalizadas.join(",") },
    });
  };

  return (
    <View style={styles.container}>
      <Text>Coleta nº {id}</Text>
      <Text>Endereço: Antonio Nogueira, 1645</Text>
      <Text>Cidade/Distrito: Aquidauana - MS</Text>
      <Text>Manancial: Rio Aquidauana</Text>

      <TextInput
        label={"Residual de Cloro"}
        mode="outlined"
        theme={{ colors: { primary: "#1E90FF" } }}
      />

      <TextInput
        label={"pH"}
        mode="outlined"
        theme={{ colors: { primary: "#1E90FF" } }}
      />

      <TextInput
        label={"Temperatura"}
        mode="outlined"
        theme={{ colors: { primary: "#1E90FF" } }}
      />

      <Button title="Tirar Foto" onPress={takePhoto} />

      <FlatList
        data={photos}
        keyExtractor={(item, index) => `${item}-${index}`}
        numColumns={2}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{
              width: 160,
              height: 160,
              marginRight: 10,
              marginBottom: 10,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          />
        )}
        ListEmptyComponent={<Text style={{ marginTop: 10 }}>Nenhuma foto ainda.</Text>}
      />

      <Button title="Finalizar Coleta" onPress={finalizarColeta} />
    </View>
  );
}
