import { Slot } from "expo-router"
import { CollectsProvider } from "@/features/collects/context/CollectsContext"

export default function RootLayout() {
  return (
    <CollectsProvider>
      <Slot />
    </CollectsProvider>
  )
}
