import { createContext, useContext, useState } from "react"
import {
  Collect,
  CreateCollectDTO,
  UpdateCollectDTO,
} from "@/features/collects/types/Collect"

interface CollectsContextData {
  collects: Collect[]
  addCollect: (data: CreateCollectDTO) => void
  updateCollect: (id: string, data: UpdateCollectDTO) => void
}

const CollectsContext = createContext<CollectsContextData | undefined>(
  undefined,
)

export function CollectsProvider({ children }: { children: React.ReactNode }) {
  const [collects, setCollects] = useState<Collect[]>([])

  function addCollect(data: CreateCollectDTO) {
    const newCollect: Collect = {
      id: Date.now().toString(),
      numero: `COL-${Date.now()}`,

      local: data.local,
      endereco: data.endereco,
      pontoColeta: data.pontoColeta,
      manancial: data.manancial,

      status: "Pendente",

      residualCloro: 0,

      chuva: "",

      parametros: [],
      photos: [],

      dataHora: new Date().toISOString(),

      synchronized: false,
    }
    setCollects((prev) => [...prev, newCollect])
  }

  function updateCollect(id: string, data: UpdateCollectDTO) {
    setCollects((prev) =>
      prev.map((collect) =>
        collect.id === id
          ? {
              ...collect,
              ...data,
              status: "Finalizada",
              dataHora: new Date().toISOString(),
            }
          : collect,
      ),
    )
  }

  return (
    <CollectsContext.Provider
      value={{
        collects,
        addCollect,
        updateCollect,
      }}
    >
      {children}
    </CollectsContext.Provider>
  )
}

export function useCollects() {
  const context = useContext(CollectsContext)

  if (!context) {
    throw new Error("useCollects deve ser usado dentro de CollectsProvider")
  }

  return context
}
