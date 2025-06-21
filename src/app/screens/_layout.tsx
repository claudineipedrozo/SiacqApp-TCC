import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: "transparent",
          drawerInactiveBackgroundColor: "transparent",
          drawerHideStatusBarOnOpen: true,
          drawerStyle: { paddingTop: 32, width: "60%" },
        }}
        drawerContent={(props) => (
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ flex: 1 }}
          >
            <DrawerItemList {...props} />

            <View style={{ flex: 1 }} />

            <DrawerItem
              label="Sair"
              onPress={() => {
                router.replace("/auth/login");
              }}
              icon={() => (
                <MaterialCommunityIcons
                  name="logout"
                  color={"#1E90FF"}
                  size={20}
                />
              )}
            />
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Início",
            drawerIcon: () => (
              <Fontisto name="home" size={20} color={"#1E90FF"} />
            ),
          }}
        />

        <Drawer.Screen
          name="collect"
          options={{
            drawerLabel: "Coletas",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="water-pump"
                size={20}
                color={"#1E90FF"}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="analysis"
          options={{
            drawerLabel: "Análises",
            drawerIcon: () => (
              <Fontisto name="laboratory" size={20} color={"#1E90FF"} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
