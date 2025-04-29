import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { STACKS } from '../constants/Screens';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,  }}
      /* initialRouteName='MainStack' */>
        <Stack.Screen name={STACKS.AUTHSTACK} component={AuthStack} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
