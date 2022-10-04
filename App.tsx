import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SignIn } from './src/screens/SignIn';
import { Home } from './src/screens/Home';
import { Loading } from './src/components/Loading';
import {THEME} from './src/styles/theme'
import { Register } from './src/screens/Register';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold})
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent" 
        translucent
      />
      {fontsLoaded ? <Register/> : <Loading/>}
    </NativeBaseProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
