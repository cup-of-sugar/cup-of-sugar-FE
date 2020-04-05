import React from 'react';
import {ScrollView, StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { SearchResult } from './SearchResult';
import Colors from '../constants/Colors';

export function SearchResultsContainer() {
  return (
    <View style={styles.searchContainer}>
      <ScrollView style={styles.searchContainer} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.resultsText}>Results:</Text>
        <SearchResult name={'Rake'} lender={'Carleigh'} rating={'*****'}/>
        <SearchResult name={'Lawn Mower'} lender={'Lain'} rating={'***'}/>
        <SearchResult name={'Sprinkler'} lender={'Tristan'} rating={'**'}/>
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
    width: 370,
  },
  searchContainer: {
    flex: 1,
    margin: 10,
    overflow: 'scroll',
  },
  resultsText: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  }
});
