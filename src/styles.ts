import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      justifyContent: "center",
      alignItems: "stretch",
      backgroundColor: "#FFFF",
    },
    text: {
      fontSize: 38,
      color: "#2D91B6",
      fontWeight: "bold",
      marginBottom: 50,
      textAlign: "center",
    },
    logo: {
      width: 240,
      height: 240,
      marginBottom: 24,
      alignSelf: "center"
    },
    input: {
      height: 40,
      width: 350,
      marginBottom: 36,
      alignSelf: "center",
      borderRadius: 8,
    },
    inputContent: {
      height: 24,
    },
    button: {
      marginTop: 80,
      width: 250,
      height: 44,
      alignSelf: "center",
      
      borderRadius: 8,
    },
    buttonLabel: {
      fontSize: 16, 
      fontWeight: "bold",
      textAlign: "center", 
    },
    card: {
      marginBottom: 8,
    }
  });
  