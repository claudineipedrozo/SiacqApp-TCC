import * as React from "react";
import { View, Text, Alert, Image, FlatList, TouchableOpacity } from "react-native";
import { TextInput, RadioButton, Checkbox } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";

import { styles } from "../../styles/execution.styles";
import { globalStyles } from "../../styles/globalStyles";

export default function Execution() {
  const [photos, setPhotos] = React.useState<string[]>([]);
  const [residualCloro, setResidualCloro] = React.useState("");
  const [ph, setPh] = React.useState("");
  const [temperatura, setTemperatura] = React.useState("");
  const [chuva, setChuva] = React.useState<string>("");

  const [parametrosSelecionados, setParametrosSelecionados] = React.useState<string[]>([]);

  const router = useRouter();

  const params = useLocalSearchParams<{
    id: string;
    numero: string;
    local: string;
    endereco: string;
    pontoColeta: string;
    manancial: string;    
    finalizadas?: string;
  }>();

  const coletaAtualId = params.id;
  const coletaNumero = params.numero;
  const coletaLocal = params.local;
  const coletaEndereco = params.endereco;
  const coletaPontoColeta = params.pontoColeta;
  const coletaManancial = params.manancial;
  const finalizadasAnteriores = params.finalizadas ? params.finalizadas.split(",") : [];

  const toggleParametro = (value: string) => {
    setParametrosSelecionados((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const takePhoto = async () => {
    if (photos.length >= 4) {
      Alert.alert("Limite atingido", "Você só pode adicionar até 4 fotos.");
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
    console.log("Parâmetros selecionados:", parametrosSelecionados);

    const novasFinalizadas = Array.from(new Set([...finalizadasAnteriores, coletaAtualId]));

    router.replace({
      pathname: "../screens/collectList",
      params: { finalizadas: novasFinalizadas.join(",") },
    });
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.labelText}>Coleta nº {coletaNumero}</Text>
      <Text>Local: {coletaLocal}</Text>
      <Text>Endereço: {coletaEndereco}</Text>
      <Text>Ponto de Coleta: {coletaPontoColeta}</Text>
      <Text>Manancial: {coletaManancial}</Text>

      {/* ✅ Checkboxes */}
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Parâmetros Analisados:</Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {["Microbiológica", "Fisico-Química", "Cromatográfica", "Hidrobiológica"].map((item) => (
            <View
              key={item}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
                marginBottom: 5,
              }}
            >
              <Checkbox
                status={parametrosSelecionados.includes(item) ? "checked" : "unchecked"}
                onPress={() => toggleParametro(item)}
              />
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ✅ Radio Buttons da Chuva */}
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>
          Chuva nas últimas 24h?
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}
            onPress={() => setChuva("sim")}
          >
            <RadioButton
              value="sim"
              status={chuva === "sim" ? "checked" : "unchecked"}
              onPress={() => setChuva("sim")}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Sim</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setChuva("nao")}
          >
            <RadioButton
              value="nao"
              status={chuva === "nao" ? "checked" : "unchecked"}
              onPress={() => setChuva("nao")}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ Inputs de execução das coletas */}    
      <TextInput
        label="Residual de Cloro"
        value={residualCloro}
        onChangeText={setResidualCloro}
        mode="outlined"
        theme={{ colors: { primary: "#1E90FF" } }}
        style={{ marginTop: 6, height: 48 }}
        contentStyle={{height: 30, paddingVertical: 4}}
      />

      <TextInput
        label="pH"
        value={ph}
        onChangeText={setPh}
        mode="outlined"
        theme={{ colors: { primary: "#1E90FF" } }}
        style={{ marginTop: 6, height: 48 }}
        contentStyle={{height: 30, paddingVertical: 4}}
      />

      <TextInput
        label="Temperatura"
        value={temperatura}
        onChangeText={setTemperatura}
        mode="outlined"
        theme={{ colors: { primary: "#1E90FF" } }}
        style={{ marginTop: 6, height: 48 }}
        contentStyle={{height: 30, paddingVertical: 4}}
      />

      <TouchableOpacity onPress={takePhoto} style={styles.photoButton}>
        <Text style={styles.buttonText}>Tirar Foto</Text>
      </TouchableOpacity>

      <FlatList
        data={photos}
        keyExtractor={(item, index) => `${item}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.photoContainer}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.photo} />}
        ListEmptyComponent={<Text style={styles.noPhotoText}>Nenhuma foto adicionada ainda.</Text>}
      />

      <TouchableOpacity onPress={finalizarColeta} style={styles.finalizeButton}>
        <Text style={styles.buttonText}>Finalizar Coleta</Text>
      </TouchableOpacity>
    </View>
  );
}
