import React, { useState } from 'react';
import { VStack } from 'native-base';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';


export function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [patrimony, setPatrimony] = useState('')
  const [description, setDescription] = useState('')

  const navigation = useNavigation()

  function handleNewOrderRegister() {
    if(!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todos os campos.")
    }

    setIsLoading(true)

    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    }).then(() => {
      Alert.alert("Solicitação", "Solicitação realizada com sucesso")
      navigation.goBack()
    }).catch(error => {
      console.log(error)
      Alert.alert("Solicitação", "Não foi possivel registrar o pedido")

    })
    .finally(() => setIsLoading(false))
  }


  return (
    <VStack flex={1} px={6} pb={6} bg="gray.600">
      <Header title="Nova solicitação"/>

      <Input 
        placeholder="Numero do patrimônio"
        onChangeText={setPatrimony}
        // mt={4}
      />
      <Input 
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical='top'
        onChangeText={setDescription}
      />
      <Button title="Cadastrar" mt={5} onPress={handleNewOrderRegister}/>
    </VStack>
  );
}