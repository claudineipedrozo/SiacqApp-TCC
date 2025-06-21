import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer"

import TelaInicial from "../../../assets/images/Qualidade-da-Agua.png";

export default function Index() {
  return (
    <ImageBackground source={TelaInicial} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={{ uri: "https://github.com/claudineipedrozo.png" }} style={styles.img} />
          <View style={styles.user}>
            <Text style={styles.hi}>Olá,</Text>
            <Text style={styles.username}>Claudinei Pedrozo</Text>
          </View>
          <DrawerToggleButton />
        </View>        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 32,
    backgroundColor: "#FFFFFF"
  },
  content: {
    backgroundColor: "#ffffffb3",
    padding: 20,
    borderRadius: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  user: {
    flex: 1,
    justifyContent: "center",
  },
  hi: {
    fontSize: 14,    
  },
  username: {
    fontSize: 16,
    fontWeight: "700",
  },
});
