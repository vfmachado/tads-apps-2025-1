import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
};

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};


const App = () => {
  const [tela, setTela] = useState(1);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  //   <>
  //   {tela == 1 && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <Text>TELA PRIMARIA</Text>
  //     <Button title='VAI PRA 2' onPress={() => setTela(2)}/>
  //   </View>
  //   }
  //   {tela == 2 && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //   <Text>TELA SECUNDARIA</Text>
  //   <Button title='VOLTAR' onPress={() => setTela(1)}/>
  // </View>
  //   }
  //   </>
  );
};

export default App;
