import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Component } from 'react';
import {
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export class RequestScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
          What item are you looking for?
        </Text>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.label}>Select a category*</Text>
          <Picker
            selectedValue=""
            style={{ height: 40, marginBottom: 8 }}
            onValueChange={() => {}}
          >
            <Picker.Item label="Garden" value="garden" />
            <Picker.Item label="Pantry" value="pantry" />
            <Picker.Item label="Cleaning" value="cleaning" />
          </Picker>
          <Text style={styles.label}>Item name*</Text>
          <TextInput
            placeholder="Enter item name"
            style={styles.input}
            onChangeText={() => {}}
            value=""
          ></TextInput>
          <Text style={styles.label}>Description*</Text>
          <TextInput
            placeholder="Enter description"
            style={styles.input}
            onChangeText={() => {}}
            value=""
          ></TextInput>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            placeholder="How many?"
            style={styles.input}
            onChangeText={() => {}}
            value=""
          ></TextInput>
          <Text style={styles.label}>Time</Text>
          <TextInput
            placeholder="How long?"
            style={styles.input}
            onChangeText={() => {}}
            value=""
          ></TextInput>
          <Button onPress={() => {}} title="Request" color="#385A94" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C94E1',
    overflow: 'scroll',
  },
  contentContainer: {
    justifyContent: 'center',
    paddingTop: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 8,
    padding: 5,
  },
  label: {
    color: '#fff',
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
