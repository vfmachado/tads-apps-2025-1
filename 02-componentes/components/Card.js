import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Card = ({ title, description, remover}) => {
    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.cardTitle}>CARD - {title}</Text>
                <Text style={styles.cardDescription}>DESC - {description}</Text>
            </View>
            <View>
                <Button title='REMOVER' onPress={() => remover(title)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default Card;
