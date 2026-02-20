export type Collect = {
  id: string
  numero: string
  local: string
  endereco: string
  pontoColeta: string
  manancial: string
  status: "Pendente" | "Finalizada" | "Enviado"

  residualCloro: number

  ph?: number
  temperatura?: number

  chuva: "sim" | "nao" | ""

  parametros: string[]
  photos: string[]

  dataHora: string

  synchronized: boolean
}

export type CreateCollectDTO = {
  local: string
  endereco: string
  pontoColeta: string
  manancial: string
}

export type UpdateCollectDTO = {
  residualCloro: number
  ph?: number
  temperatura?: number
  chuva: "sim" | "nao" | ""
  parametros: string[]
  photos: string[]
}
