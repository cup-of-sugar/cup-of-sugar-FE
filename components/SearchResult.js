import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity, Image} from 'react-native';
import Colors from '../constants/Colors'

export function SearchResult({ name, lender, rating}) {
  return (
    <TouchableOpacity style={styles.searchResult}>
      <Text style={styles.itemName}>{name}</Text>
      <View style={styles.lenderInfo}>
        <Text style={styles.lender}>Offered By: {lender}</Text>
        <Text style={styles.lender}>Rating: {rating}</Text>
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
  lenderInfo: {
    marginRight: 10,
  },
  lender: {
    fontSize: 13,
    fontWeight: 'bold',
    padding: 3,
    textAlign: 'right',
  }
});
