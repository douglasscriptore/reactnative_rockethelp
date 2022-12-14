import React, { useEffect, useState } from 'react';
import { VStack, Text, HStack, useTheme, ScrollView, Box } from 'native-base';
import { Header } from '../../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import { OrderProps } from '../../components/Order';
import { CardDetails } from '../../components/CardDetails';
import { OrderFirestoreDTO } from '../../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../../utils/firestoreDateFormat';
import { Loading } from '../../components/Loading';
import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard} from "phosphor-react-native"
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Alert } from 'react-native';

type RoutePrams = {
  orderId: string;
}

type OrderDatails = OrderProps & {
  patrimony: string;
  description: string;
  closed: string;
  solution?: string;
  when?: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<OrderDatails>({} as OrderDatails)
  const [solution, setSolution] = useState("")

  const navigation = useNavigation()
  const { colors } = useTheme()
  const route = useRoute()
  const {orderId} = route.params as RoutePrams

  function handleOrderClose(){
    if(!solution){
      Alert.alert('Solicitação', 'Informe a solução para encerrar a solicitação')
    }

    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .update({
      status: 'closed',
      solution,
      closed_at: firestore.FieldValue.serverTimestamp()
    }).then(() => {
      Alert.alert('Solicitação', 'Solicitação encerrada')

      navigation.goBack()
    }).catch(error => {
      console.log(Error)
      Alert.alert('Solicitação', 'Não foi possivel encerrar a solicitação')
      
    })
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then( doc => {

        const {  patrimony, description, status, created_at, closed_at, solution } = doc.data()
        const closed = closed_at ? dateFormat(closed_at) : null

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          when: dateFormat(created_at),
          solution,
          closed
        } as OrderDatails)
        setIsLoading(false)
      })
  },[])


  if(isLoading) {
    return <Loading/>
  }
  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>
    

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {
          order.status === 'closed' ?
          <CircleWavyCheck size={22} color={colors.green[300]}/> :
          <Hourglass size={22} color={colors.secondary[700]}/>
        }
        <Text
          fontSize="sm"
          color={order.status === "closed" ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
          >
            {order.status === "closed" ? 'finalizado' : 'em andamento'}
          </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />

        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={Clipboard}
        />  

        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === 'open' && <Input 
            bg="gray.600"
            placeholder="Descriçãoo da solução"
            onChangeText={setSolution}
            h={24}
            textAlignVertical="top"
            multiline
          />}
        </CardDetails>  
      </ScrollView>
      {
        order.status === 'open' &&
          <Button title="Encerrar solicitação" m={5} onPress={handleOrderClose}/>
      }
    </VStack>
  );
}