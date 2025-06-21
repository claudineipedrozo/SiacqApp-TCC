import * as React from "react";
import { View, Text, Button, Alert, Image, FlatList } from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import { styles } from "../../styles";


export default function AnalysisDetail() {
  const [photos, setPhotos] = React.useState<string[]>([]);

  const router = useRouter();

  const takePhoto = async () => {

    if(photos.length >=5) {
      Alert.alert("Você já adicionou 5 fotos!")
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
          router.replace({
            pathname: "../screens/analysis",
            params: { analiseFinalizadaId: "08679" },  // Passe o id da análise finalizada
          });
        },
      },
    ]
  );
};

  return (
    <View style={styles.container}>
      <Text>Coleta nº 08679</Text>
      <Text>Endereço: Antonio Nogueira, 1645</Text>
      <Text>Cidade/ Distrito: Aquidauana - MS</Text>
      <Text>Manancial: Rio Aquidauana</Text>

      <TextInput
        label={"Cor"}
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

       <TextInput
        label={"Turbidez"}
        mode="outlined"
        theme={{ colors: { primary: "#1E90FF" } }}
      />

       <TextInput
        label={"Coliformes"}
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
          <Image source={{ uri: item }} 
          style={{width: 160, height: 160, marginRight: 10, marginBottom: 10, padding: 50, 
            borderRadius: 8, borderWidth: 1, borderColor: '#ccc'}} />
        )}
        ListEmptyComponent={<Text style={{ marginTop: 10 }}>Nenhuma foto registrada.</Text>} /> 

        <Button title="Finalizar Análise" onPress={finalizarAnalise} /> 
    </View>
  );
}


