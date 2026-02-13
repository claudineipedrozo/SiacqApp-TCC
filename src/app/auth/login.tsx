import * as React from "react";
import { View, Text, Image, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { router } from "expo-router";


import { styles } from "../../styles";
import Logo from "../../../assets/images/logo.png";  

export default function Index() {  

  const [text, setText] = React.useState("");
  const [lock, setLock] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  
  const initialPage = () => { 
    if (text === "" || lock === ""){
      Alert.alert("Favor digitar o usuário e senha!")
      return;
    }
    
    router.navigate("../screens") }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.text}>SIACQ - SANESUL</Text>

      <TextInput
        placeholder="Digite o seu usuário"
        value={text}
        onChangeText={(text) => setText(text)}
        mode="flat"
        style={styles.input}
        left={<TextInput.Icon icon="account" />}
        contentStyle={styles.inputContent}
      />

      <TextInput
        placeholder="Digite a sua senha"
        value={lock}
        onChangeText={(lock) => setLock(lock)}
        mode="flat"
        style={styles.input}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        contentStyle={styles.inputContent}
        secureTextEntry={!showPassword} 
      />

      <Button
        mode="contained"
        onPress={ initialPage }
        buttonColor="#2D91B6"
        textColor="white"        
        style={styles.button}
        labelStyle={styles.buttonLabel}
        contentStyle={{ justifyContent: "center", height: 60 }}
      >
        LOGIN
      </Button>
    </View>
  );
}


