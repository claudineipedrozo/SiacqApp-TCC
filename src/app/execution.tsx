import * as React from "react"
import { Text, Alert, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { TextInput, RadioButton, Card } from "react-native-paper"
import * as ImagePicker from "expo-image-picker"
import { useRouter, useLocalSearchParams } from "expo-router"
import { useCollects } from "@/features/collects/context/CollectsContext"
import { Collect } from "@/features/collects/types/Collect"
import { styles } from "@/features/collects/styles/execution.styles"
import { globalStyles } from "@/styles/globalStyles"

export default function Execution() {
  const { collects, addCollect, updateCollect } = useCollects()
  const router = useRouter()
  const params = useLocalSearchParams<{ id: string }>()
  const coletaAtual = collects.find((c) => c.id === params.id)

  const [residualCloro, setResidualCloro] = React.useState(
    coletaAtual?.residualCloro.toString() || "",
  )
  const [ph, setPh] = React.useState(coletaAtual?.ph?.toString() ?? "")

  const [temperatura, setTemperatura] = React.useState(
    coletaAtual?.temperatura?.toString() ?? "",
  )

  const [chuva, setChuva] = React.useState<string>(coletaAtual?.chuva || "")
  const [parametrosSelecionados, setParametrosSelecionados] = React.useState<
    string[]
  >(coletaAtual?.parametros || [])
  const [photos, setPhotos] = React.useState<string[]>(
    coletaAtual?.photos || [],
  )

  if (!coletaAtual) return <Text>Coleta não encontrada!</Text>

  const finalizarColeta = async () => {
    if (!residualCloro || !ph || !temperatura) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.")
      return
    }

    await updateCollect(coletaAtual.id, {
      residualCloro: Number(residualCloro),
      ph: ph ? Number(ph) : undefined,
      temperatura: temperatura ? Number(temperatura) : undefined,
      chuva: chuva as "sim" | "nao" | "",
      parametros: parametrosSelecionados,
      photos,
    })

    Alert.alert("Sucesso", "Coleta finalizada!")
    router.replace("../screens/collectList")
  }

  const toggleParametro = (value: string) =>
    setParametrosSelecionados((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value],
    )

  const takePhoto = async () => {
    if (photos.length >= 4) return
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permissão negada", "É necessário permitir acesso à câmera.")
      return
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true,
    })
    if (!result.canceled) setPhotos((prev) => [...prev, result.assets[0].uri])
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={globalStyles.container}>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text>Coleta nº {coletaAtual.numero}</Text>
            <Text>Local: {coletaAtual.local}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text>Chuva nas últimas 24h</Text>
            <RadioButton.Group onValueChange={setChuva} value={chuva}>
              <RadioButton.Item label="Sim" value="sim" />
              <RadioButton.Item label="Não" value="nao" />
            </RadioButton.Group>
          </Card.Content>
        </Card>

        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text>Medidas</Text>
            <TextInput
              label="Residual de Cloro"
              value={residualCloro}
              onChangeText={setResidualCloro}
              keyboardType="numeric"
            />
            <TextInput
              label="pH"
              value={ph}
              onChangeText={setPh}
              keyboardType="numeric"
            />
            <TextInput
              label="Temperatura"
              value={temperatura}
              onChangeText={setTemperatura}
              keyboardType="numeric"
            />
          </Card.Content>
        </Card>

        <TouchableOpacity
          onPress={finalizarColeta}
          style={styles.finalizeButton}
        >
          <Text>Finalizar Coleta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
