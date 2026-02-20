import AsyncStorage from "@react-native-async-storage/async-storage"
import { Collect } from "../types/Collect"

const STORAGE_KEY = "@coletas"

export async function listarColetas(): Promise<Collect[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY)

    if (!data) return []

    return JSON.parse(data) as Collect[]
  } catch (error) {
    console.error("Erro ao listar coletas:", error)
    return []
  }
}

export async function salvarColeta(coleta: Collect): Promise<void> {
  try {
    const coletas = await listarColetas()

    const index = coletas.findIndex((c) => c.id === coleta.id)

    if (index >= 0) {
      coletas[index] = coleta
    } else {
      coletas.push(coleta)
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(coletas))
  } catch (error) {
    console.error("Erro ao salvar coleta:", error)
  }
}

export async function atualizarColeta(
  coletaAtualizada: Collect,
): Promise<void> {
  try {
    const coletas = await listarColetas()

    const novasColetas: Collect[] = coletas.map((coleta) =>
      coleta.id === coletaAtualizada.id ? coletaAtualizada : coleta,
    )

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasColetas))
  } catch (error) {
    console.error("Erro ao atualizar coleta:", error)
  }
}

export async function removerColeta(id: string): Promise<void> {
  try {
    const coletas = await listarColetas()

    const filtradas: Collect[] = coletas.filter((coleta) => coleta.id !== id)

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas))
  } catch (error) {
    console.error("Erro ao remover coleta:", error)
  }
}
