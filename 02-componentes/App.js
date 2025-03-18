import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Card from './components/Card';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (title.trim() && description.trim()) {
      setItems([...items, { title, description }]);
      setTitle('');
      setDescription('');
    }
  };

  const removeItem  = (title) => {
    const lista = [...items].filter(it => it.title != title);
    setItems(lista)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic React Native Components</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Item" onPress={addItem} />
      {/* ISSO É RUIM POR N MOTIVOS
      1. VETORES EM ELEMENTOS PRECISAM DE IDS UNICOS
      2. NAO É SCROLLABLE
      3. ALTERA A DISPOSICAO DOS ELEMENTOS
      4. RENDERS EXCESSIVOS PARA ITEMS QUE NAO ESTAO VISIVEIS
      5. TE FAZ UMA PESSOA PIOR
       {items.map(item => (
        <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
      ))} */}
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            description={item.description}
            remover={removeItem}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    marginTop: 40
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  }
})
export default App;