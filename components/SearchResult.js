import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity, Image} from 'react-native';
import Colors from '../constants/Colors'

export function SearchResult({ name, quantity, measurement}) {
  return (
    <TouchableOpacity style={styles.searchResult}>
      <Text style={styles.itemName}>{name}</Text>
      <View style={styles.itemInfo}>
        <Text style={styles.amount}>{quantity} {measurement} available</Text>
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
