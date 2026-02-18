import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export type Coleta = {
  id: string
  numero: string
  local: string
  endereco: string
  pontoColeta: string
  manancial: string
  status: string
}

type ContextType = {
  coletas: Coleta[]
  addColeta: (c: Omit<Coleta, "id" | "numero" | "status">) => void
  updateColeta: (id: string, patch: Partial<Coleta>) => void
  removeColeta: (id: string) => void
  setColetas: (c: Coleta[]) => void
}

const STORAGE_KEY = "@siaq:coletas"

export const CollectsContext = createContext<ContextType>({
  coletas: [],
  addColeta: () => {},
  updateColeta: () => {},
  removeColeta: () => {},
  setColetas: () => {},
})

export function CollectsProvider({ children }: { children: ReactNode }) {
  const [coletas, setColetasState] = useState<Coleta[]>([])

  // Load from storage on mount
  useEffect(() => {
    ;(async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY)
        if (raw) {
          setColetasState(JSON.parse(raw))
          return
        }

        // fallback sample data
        const initial: Coleta[] = [
          {
            id: "08679",
            numero: "08679",
            local: "Aquidauana",
            endereco: "Rua 1",
            pontoColeta: "PTA-001",
            manancial: "Rio A",
            status: "Pendente",
          },
          {
            id: "08680",
            numero: "08680",
            local: "Campo Grande",
            endereco: "Rua 2",
            pontoColeta: "PTA-002",
            manancial: "Córrego B",
            status: "Pendente",
          },
        ]
        setColetasState(initial)
      } catch (err) {
        console.warn("Failed to load coletas:", err)
      }
    })()
  }, [])

  // Persist when coletas change
  useEffect(() => {
    ;(async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(coletas))
      } catch (err) {
        console.warn("Failed to persist coletas:", err)
      }
    })()
  }, [coletas])

  const addColeta = useCallback(
    (c: Omit<Coleta, "id" | "numero" | "status">) => {
      const id = Date.now().toString()
      const numero = id.slice(-6)
      const novo: Coleta = {
        id,
        numero,
        local: c.local,
        endereco: c.endereco,
        pontoColeta: c.pontoColeta,
        manancial: c.manancial,
        status: "Pendente",
      }
      setColetasState((prev) => [novo, ...prev])
    },
    [],
  )

  const updateColeta = useCallback((id: string, patch: Partial<Coleta>) => {
    setColetasState((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    )
  }, [])

  const removeColeta = useCallback((id: string) => {
    setColetasState((prev) => prev.filter((c) => c.id !== id))
  }, [])

  return (
    <CollectsContext.Provider
      value={{
        coletas,
        addColeta,
        updateColeta,
        removeColeta,
        setColetas: setColetasState,
      }}
    >
      {children}
    </CollectsContext.Provider>
  )
}
