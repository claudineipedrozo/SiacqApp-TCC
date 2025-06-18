import { View, Text, StyleSheet, ImageBackground } from "react-native";

import TelaInicial from "../../../assets/images/telaInicial.png";

export default function Index() {
  return (
    <ImageBackground source={TelaInicial} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Olá, Tela de Coletas!</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
  content: {
    backgroundColor: "#ffffffb3",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});
