import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { verifyInstallation } from 'nativewind';

const Stack = createNativeStackNavigator();

export default function App() {
  verifyInstallation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="InstaClone" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
