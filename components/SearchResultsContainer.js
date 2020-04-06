import React from 'react';
import {ScrollView, StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { SearchResult } from './SearchResult';
import Colors from '../constants/Colors';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

const ITEMS = gql`
  {
    getAllItems {
      name
      quantity
      measurement
      description
      category {
        name
      }
    }
  }
`;

export function SearchResultsContainer() {
  const { loading, error, data } = useQuery(ITEMS);

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error</Text>

  if (data) return (
    <View style={styles.searchContainer}>
      <ScrollView style={styles.searchContainer} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.resultsText}>Results:</Text>
        {data.getAllItems.map(item => <SearchResult key={item.name} item={item} /> )}
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
  }
});
