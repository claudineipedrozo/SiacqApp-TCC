import { Tabs } from "expo-router";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CollectsProvider } from "../../contexts/CollectsContext";

export default function Layout() {
  const insets = useSafeAreaInsets();
  const baseHeight = 65;
  const tabBarStyle = {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    height: baseHeight + insets.bottom,
    paddingBottom: insets.bottom + 10,
    paddingTop: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  };

  return (
    <CollectsProvider>
      <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1E90FF",
        tabBarInactiveTintColor: "#999",
        tabBarStyle,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="home" size={size || 24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="collectList"
        options={{
          title: "Coletas",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="water-pump"
              size={size || 24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="analysisList"
        options={{
          title: "Análises",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="laboratory" size={size || 24} color={color} />
          ),
        }}
      />
    </Tabs>
    </CollectsProvider>
  );
}
