import React from 'react';
import {ScrollView, StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

const ITEMS = gql`
  {
    getAllItems {
      name
      quantity
    }
  }
`;

export function TestApollo() {
  const { loading, error, data } = useQuery(ITEMS);

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error</Text>

  return (

    <View>
      <Text>{data.getAllItems[0].name}</Text>
    </View>
  )
}
