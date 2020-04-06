import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity, Image} from 'react-native';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';

export function SearchResult({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.searchResult} onPress={() => navigation.navigate('Details', { item })}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.itemInfo}>
        <Text style={styles.amount}>{item.quantity} {item.measurement} available</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  searchResult: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.aqua,
    borderRadius: 7,
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    height: 70,
    width: 330,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  itemInfo: {
    marginRight: 10,
  },
  amount: {
    fontSize: 13,
    fontWeight: 'bold',
    padding: 3,
    textAlign: 'right',
  }
});
