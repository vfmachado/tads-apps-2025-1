import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, Text, useTheme } from 'react-native-paper';
import { AuthContext } from '../contexts/auth-context';


export default Home = ({ navigation }) => {

  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const theme = useTheme();

  const handleLogin = async () => {
    if (username === '' || password === '') {
      setError('Please enter both username and password');
      return;
    }
    setError(null);
    
    console.log('Logging in with:', username, password);
    
    login(username, password, () => {
      navigation.navigate('profile');
    });
    // login(username, password);
    // setTimeout(() => {
    //   navigation.navigate('profile');
    // }, 200);
    
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />
      {error ? <HelperText type="error">{error}</HelperText> : null}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    // color: theme.colors.myOwnColor,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

