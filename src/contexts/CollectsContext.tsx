import React, { createContext, useState, useEffect, ReactNode } from "react";

export type Coleta = {
  id: string;
  numero: string;
  local: string;
  endereco: string;
  pontoColeta: string;
  manancial: string;
  status: string;
};

type ContextType = {
  coletas: Coleta[];
  addColeta: (c: Omit<Coleta, "id" | "numero" | "status">) => void;
  setColetas: (c: Coleta[]) => void;
};

export const CollectsContext = createContext<ContextType>({
  coletas: [],
  addColeta: () => {},
  setColetas: () => {},
});

export function CollectsProvider({ children }: { children: ReactNode }) {
  const [coletas, setColetasState] = useState<Coleta[]>([]);

  useEffect(() => {
    // initial sample data
    const initial: Coleta[] = [
      { id: "08679", numero: "08679", local: "Aquidauana", endereco: "Rua 1", pontoColeta: "PTA-001", manancial: "Rio A", status: "Pendente" },
      { id: "08680", numero: "08680", local: "Campo Grande", endereco: "Rua 2", pontoColeta: "PTA-002", manancial: "Córrego B", status: "Pendente" },
    ];
    setColetasState(initial);
  }, []);

  const addColeta = (c: Omit<Coleta, "id" | "numero" | "status">) => {
    const id = Date.now().toString();
    const numero = id.slice(-6);
    const novo: Coleta = {
      id,
      numero,
      local: c.local,
      endereco: c.endereco,
      pontoColeta: c.pontoColeta,
      manancial: c.manancial,
      status: "Pendente",
    };
    setColetasState((prev) => [novo, ...prev]);
  };

  return (
    <CollectsContext.Provider value={{ coletas, addColeta, setColetas: setColetasState }}>
      {children}
    </CollectsContext.Provider>
  );
}
