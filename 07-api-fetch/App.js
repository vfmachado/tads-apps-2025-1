import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { verifyInstallation } from 'nativewind';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigator from './navigation/RootNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  verifyInstallation();

  return (
    <AuthProvider>
      <RootNavigator />
    {/* <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="InstaClone" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer> */}
    </AuthProvider>
  );
}
