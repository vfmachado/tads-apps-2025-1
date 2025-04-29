import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home'; 
import Profile from './src/screens/Profile';
import Dashboard from './src/screens/Dashboard';
import { AuthProvider } from './src/contexts/auth-context';
import Navigation from './Navigation';
import { DefaultTheme, PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    myOwnColor: '#BADA55',
    primary: '#3498db',
  },
  roundness: 2,
};

export default function App() {
 
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Navigation />
      </AuthProvider> 
    </PaperProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: 'lightgray',
    padding: 20,
    margin: 10,
    borderRadius: 10
  }
});
