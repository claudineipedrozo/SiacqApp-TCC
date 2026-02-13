import * as React from "react";
import { View, Text, Alert, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, RadioButton, Checkbox, Card, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";

import { styles } from "../../styles/execution.styles";
import { globalStyles } from "../../styles/globalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView 
        style={globalStyles.container}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
      {/* Card de Informações da Coleta */}
      <Card style={styles.infoCard} elevation={2}>
        <Card.Content>
          <View style={styles.infoHeader}>
            <MaterialCommunityIcons name="water-pump" size={28} color="#1E90FF" />
            <Text style={styles.coletaTitle}>Coleta nº {coletaNumero}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map-marker" size={18} color="#666" />
            <Text style={styles.infoText}>{coletaLocal}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="road" size={18} color="#666" />
            <Text style={styles.infoText}>{coletaEndereco}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="map-marker-radius" size={18} color="#666" />
            <Text style={styles.infoText}>Ponto: {coletaPontoColeta}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="water" size={18} color="#666" />
            <Text style={styles.infoText}>{coletaManancial}</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Parâmetros Analisados */}
      <Card style={styles.sectionCard} elevation={1}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Parâmetros Analisados</Text>
          <View style={styles.checkboxContainer}>
            {["Microbiológica", "Fisico-Química", "Cromatográfica", "Hidrobiológica"].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.checkboxItem}
                onPress={() => toggleParametro(item)}
              >
                <Checkbox
                  status={parametrosSelecionados.includes(item) ? "checked" : "unchecked"}
                  onPress={() => toggleParametro(item)}
                />
                <Text style={styles.checkboxLabel}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Chuva nas últimas 24h */}
      <Card style={styles.sectionCard} elevation={1}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Chuva nas últimas 24h?</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => setChuva("sim")}
            >
              <RadioButton
                value="sim"
                status={chuva === "sim" ? "checked" : "unchecked"}
                onPress={() => setChuva("sim")}
              />
              <Text style={styles.radioLabel}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => setChuva("nao")}
            >
              <RadioButton
                value="nao"
                status={chuva === "nao" ? "checked" : "unchecked"}
                onPress={() => setChuva("nao")}
              />
              <Text style={styles.radioLabel}>Não</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* Medições */}
      <Card style={styles.sectionCard} elevation={1}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Medições</Text>
          <TextInput
            label="Residual de Cloro"
            value={residualCloro}
            onChangeText={setResidualCloro}
            mode="outlined"
            theme={{ colors: { primary: "#1E90FF" } }}
            style={styles.input}
            left={<TextInput.Icon icon="water" />}
          />
          <TextInput
            label="pH"
            value={ph}
            onChangeText={setPh}
            mode="outlined"
            theme={{ colors: { primary: "#1E90FF" } }}
            style={styles.input}
            left={<TextInput.Icon icon="chart-line" />}
          />
          <TextInput
            label="Temperatura (°C)"
            value={temperatura}
            onChangeText={setTemperatura}
            mode="outlined"
            theme={{ colors: { primary: "#1E90FF" } }}
            style={styles.input}
            left={<TextInput.Icon icon="thermometer" />}
            keyboardType="numeric"
          />
        </Card.Content>
      </Card>

      {/* Fotos */}
      <Card style={styles.sectionCard} elevation={1}>
        <Card.Content>
          <View style={styles.photoHeader}>
            <Text style={styles.sectionTitle}>Fotos ({photos.length}/4)</Text>
            {photos.length < 4 && (
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
              <Text style={styles.noPhotoText}>Nenhuma foto adicionada ainda</Text>
              <TouchableOpacity onPress={takePhoto} style={styles.photoButton}>
                <MaterialCommunityIcons name="camera" size={20} color="#fff" />
                <Text style={styles.buttonText}>Tirar Foto</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card.Content>
      </Card>

        {/* Botão Finalizar dentro do scroll para maior intuitividade */}
        <View style={{ height: 12 }} />
        <TouchableOpacity onPress={finalizarColeta} style={[styles.finalizeButton, { alignSelf: 'center' }]}>
          <MaterialCommunityIcons name="check-circle" size={24} color="#fff" />
          <Text style={styles.buttonText}>Finalizar Coleta</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
