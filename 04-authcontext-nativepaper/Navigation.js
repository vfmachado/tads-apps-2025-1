import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Dashboard from './src/screens/Dashboard';
import { AuthContext } from './src/contexts/auth-context';

const Stack = createNativeStackNavigator();


export default function Navigation() {

  const { user } = useContext(AuthContext);
  console.log({ user })
  return (

    <NavigationContainer>
      <Stack.Navigator>
        {user == null ?
          <Stack.Screen
            name="home"
            component={Home}
            options={{ title: 'welcome' }}
          />
          : <>
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="dashboard" component={Dashboard} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
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
