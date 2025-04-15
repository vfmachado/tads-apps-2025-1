import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import Title from "../components/Title"
import { mainStyle } from "../utils/CSS"
import CategoryCard from "../components/CategoryCard"
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { Button } from "react-native"
import { ActivityIndicator } from "react-native"
import { AuthContext } from "../contexts/auth-context"
import { Card } from "react-native-paper"


export default Profile = ({ navigation }) => {

  const { logout } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // TODA QUE VEZ QUE O COMPONENTE FOR MONTADO
    console.log({ msg: 'fetching data', page })
    fetch(`https://swapi.dev/api/people/?page=${page}`)
      .then(response => response.json())
      .then(dataJson => setData([...data, ...dataJson.results]))
      .catch(error => console.error(error))

    return () => {
      // CLEANUP (NORMALMENTE OMITIDO POIS NAO PRECISO EXECUTAR NADA)
      // TODA VEZ QUE O COMPONENTE FOR DESMONTADO
    }
  }, [page]);
  //  ^ ARRAY DE DEPENDENCIAS -> TODOS OS ESTADOS DA APLICACAO QUE ESTIVEREM NO ARRAY DE DEPENDENCIAS SAO MONITORADOS E QUANDO ALTERADOS O USEEFFECT RODA NOVAMENTE.

  // useCallback para fazer o fetch parece fazer mais sentido
  // useMemo para fazer o map dos itens


  // @tanstack/react-query

  const renderItemfn = ({item}) => {
    const id = item.url.split('/')[5]
    return (
    <Card key={item.id}>
        <Card.Title title={id + " - " + item.name} />
        <Card.Content>
          <Text>Height: {item.height}</Text>
          <Text>Mass: {item.mass}</Text>
          {/* <View> passando por cada um dos filmes</View> */}
        </Card.Content>
      </Card>
    )
  }

  return (
    <ScrollView>
      <Text>Profile</Text>

      <FlatList

        data={data}

        renderItem={renderItemfn}

        onEndReachedThreshold={0.2}
        onEndReached={() => setPage(page + 1)}
        
        ListFooterComponent={() => {
          return (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )
        }}
      />

      
            {/* paginar foi facil...  */}
      <Button title="CARREGAR MAIS" onPress={() => setPage(page + 1)} />

      <Button title="Dashboard" onPress={() => navigation.navigate('dashboard')} />

      <Button title="Deslogar" onPress={() => logout()} />
    </ScrollView>
  );
};
