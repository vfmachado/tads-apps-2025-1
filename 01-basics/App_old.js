import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [primeiroNome, setPrimeiroNome] = useState("TESTE");

  const [sobrenome, setSobrenome] = useState("TESTE");

const [nomeCompleto, setNomeCompleto] = useState("TESTE");
  
  return (
    // view equivale a uma div
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* todos os textos sao Text  e o estilo que define como ele aparece */}
      <Text style={{
        color: 'blue',
        fontSize: '30'
      }}>AULA TADS MOBILE</Text>
      <Text style={styles.texto} >Primeiro Nome</Text>
      <TextInput style={styles.input}
        onChangeText={text => {
          setPrimeiroNome(text)
          // CUIDADO AQUI E ENTENDA O PQ (Assync, setPrimeiroNome nao terminou de executar/atualizar)
          // setNomeCompleto(primeiroNome)
        }}
      />

      <Text style={styles.texto} >Sobrenome</Text>
      <TextInput style={styles.input}
        onChangeText={t => setSobrenome(t)}
      />
      
      <Text style={styles.texto}>Nome Informado</Text>
      <Text style={styles.texto}>{primeiroNome} {sobrenome}</Text>

      {/* <Text style={styles.texto}>{nomeCompleto}</Text> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 24,
    marginTop: 20
  },
  input: {
    borderWidth: 2,
    width: 200,
    height: 40,
    padding: 5,
    fontSize: 24
  }
});
