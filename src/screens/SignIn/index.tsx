import React, { useState } from 'react';
import auth from "@react-native-firebase/auth"
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from 'phosphor-react-native'

import Logo from "../../assets/logo_primary.svg"
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {colors} = useTheme();

  function handleSignIn() {
    if(!email || !password){
      return Alert.alert("Entrar", "Informe e-email e senha")
    }
 
    setIsLoading(true)
    auth().signInWithEmailAndPassword(email,password)
    .then(response => console.log(response))
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          return Alert.alert("Entrar", "E-mail inválido")
        case "auth/user-not-found":
          return Alert.alert("Entrar", "E-mail ou senha inválidos")
        case "auth/wrong-password":
          return Alert.alert("Entrar", "E-mail ou senha inválidos")

        default:
          return Alert.alert("Entrar", "Não foi possível acessar")
      }
    })
    // .finally(() => setIsLoading(false))
  }

    return (
      <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
        <Logo />
        <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
          Acesse sua conta
        </Heading>

        <Input 
          placeholder="E-mail"
          InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4} />}
          onChangeText={setEmail}
          mb={4}  
        />
        <Input 
          placeholder="Password"
          InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
          secureTextEntry
          onChangeText={setPassword}
          mb={8}
        />

        <Button 
          title="Entrar"
          w="full" onPress={handleSignIn}
          isLoading={isLoading}
        />

      </VStack>
    )
}