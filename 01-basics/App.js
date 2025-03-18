import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [view, setView] = useState(1);
  const [dados, setDados] = useState({
    
  });

  const formulario = [
    {name: 'NOME', label: 'nome'},
    {name: 'EMAIL', label: 'email'},
    {name: 'CPF', label: 'cpf'},
    {name: 'NASCIMENTO', label: 'dtNasc'},
  ]
  // 4 CAMPOS
  // NOME 
  // EMAIL
  // CPF
  // DT NASCIMENTO
  
  return (<>
    {view == 1 &&
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* todos os textos sao Text  e o estilo que define como ele aparece */}
      <Text style={{
        color: 'blue',
        fontSize: '30'
      }}>AULA TADS MOBILE</Text>
      
      {formulario.map(campo => (<View id={campo.label}>
          <Text style={styles.texto} >{campo.name}</Text>
          <TextInput style={styles.input}
            onChangeText={text => {
              key = campo.label;
              const newDado = {
                ...dados
              };
              newDado[key] = text;
              setDados(newDado)
        }}
      />
        </View>
      ))}

      {/* <Text style={styles.texto} >Nome</Text>
      <TextInput style={styles.input}
        onChangeText={text => {
          setDados({
            nome: text
          })
        }}
      />

      <Text style={styles.texto} >EMAIL</Text>
      <TextInput style={styles.input}
        onChangeText={text => {
          setDados({
            ...dados,
            email: text
          })
        }}
      />

    <Text style={styles.texto} >CPF</Text>
      <TextInput style={styles.input}
        onChangeText={text => {
          setDados({
            ...dados,
            cpf: text
          })
        }}
      />
      
      <Text style={styles.texto} >DT Nascimento</Text>
      <TextInput style={styles.input}
        onChangeText={text => {
          setDados({
            ...dados,
            dtNasciment: text
          })
        }}
      /> */}

      <Text style={styles.texto}>Dados</Text>
      <Text style={styles.texto}>{JSON.stringify(dados, null, 2)}</Text>

      <Button title='ENTRAR' onPress={evt => setView(2)} />
      {/* <Text style={styles.texto}>{nomeCompleto}</Text> */}
      
    </View>
    }
    {view == 2 && <View>
      <Text>TEXTOOO VIEW 2</Text>
    </View>}
    </>
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
