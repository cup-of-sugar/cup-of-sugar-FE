import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import HomeForm from '../components/HomeForm';
import ErrorBoundary from '../components/ErrorBoundary';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function HomeScreen() {

  return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.welcomeText}> What would you like to borrow today?</Text>
          <ErrorBoundary>
          <HomeForm />
          </ErrorBoundary>
        </ScrollView>
      </View>
  );
}

HomeScreen.navigationOptions = {
  header: 'none',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    justifyContent: 'center',
    paddingTop: 30,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 35,
    margin: 10,
    marginTop: 20,
    textAlign: 'center',
  },
});
