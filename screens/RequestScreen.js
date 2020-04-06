import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export const RequestScreen = () => {
  return (
    <View style={styles.container}>
      <Text>What item are you looking for?</Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>Select a category</Text>
        <Picker
          selectedValue=""
          style={{ height: 50, width: 150 }}
          onValueChange={() => {}}
        >
          <Picker.Item label="Garden" value="garden" />
          <Picker.Item label="Pantry" value="pantry" />
          <Picker.Item label="Cleaning" value="cleaning" />
        </Picker>
        <Text style={styles.label}>Item name</Text>
        <TextInput
          placeholder="Enter item name"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={() => {}}
          value=""
        ></TextInput>
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Enter description"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={() => {}}
          value=""
        ></TextInput>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="How many?"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={() => {}}
          value=""
        ></TextInput>
        <Text style={styles.label}>Time</Text>
        <TextInput
          placeholder="How long?"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={() => {}}
          value=""
        ></TextInput>
        <Button
          onPress={() => {}}
          title="Submit"
          style={{ backgroundColor: '#0C94E1' }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'scroll',
  },
  contentContainer: {
    justifyContent: 'center',
    paddingTop: 30,
  },
  label: {
    marginTop: 5,
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
