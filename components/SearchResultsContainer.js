import React from 'react';
import {ScrollView, StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { SearchResult } from './SearchResult';
import Colors from '../constants/Colors';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

export function SearchResultsContainer(props) {

    let category = props.items.category;
    let item = props.items.itemName;

    const ITEMS = gql`
      {
        getAllItemsByName(name: "${category}", items: "${item}") {
          name
          quantity
          description
          measurement
          category {
            name
          }
        }
      }
    `;

  const { loading, error, data } = useQuery(ITEMS);

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>
  if (error) return <Text style={styles.errorText}>No items found!</Text>

  if (data) return (
    <View style={styles.searchContainer}>
      <ScrollView style={styles.searchContainer} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.resultsText}>Results:</Text>
        {data.getAllItemsByName.map(item => <SearchResult key={item.name} item={item} /> )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    paddingTop: 20,
    width: '98%',
  },
  searchContainer: {
    marginLeft: '1%',
    flex: 1,
  },
  resultsText: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  errorText: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  loadingText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});
