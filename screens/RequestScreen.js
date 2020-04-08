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
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export class RequestScreen extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
      name: '',
      description: '',
      amount: 0,
      time: '',
    };
  }

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.name);
  };

  render() {
    const inputComponent = (
      <TextInput
        placeholder={this.state.category === 'food' ? 'How many?' : 'How long?'}
        style={styles.input}
        onChange={this.handleChange}
        name="time"
      ></TextInput>
    );

    const textComponent = (
      <Text style={styles.label}>
        {this.state.category === 'food' ? 'Amount' : 'Time'}
      </Text>
    );

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
            value=""
            onValueChange={(itemValue) => this.handleChange(itemValue)}
            style={{ marginBottom: 8, height: 40 }}
          >
            <Picker.Item
              label="Garden"
              value="garden"
              name="category"
              onChange={this.handleChange}
            />
            <Picker.Item
              name="category"
              onChange={this.handleChange}
              label="Food"
              value="food"
            />
            <Picker.Item
              name="category"
              onChange={this.handleChange}
              label="Cleaning"
              value="cleaning"
            />
          </Picker>
          <Text style={styles.label}>Item name*</Text>
          <TextInput
            placeholder="Enter item name"
            style={styles.input}
            name="name"
            onChange={this.handleChange}
          ></TextInput>
          <Text style={styles.label}>Description*</Text>
          <TextInput
            placeholder="Enter description"
            style={styles.input}
            onChange={this.handleChange}
            name="description"
          ></TextInput>
          {textComponent}
          {inputComponent}
          {/* <Text style={styles.label}>Amount</Text>
          <TextInput
            placeholder="How many?"
            style={styles.input}
            onChange={this.handleChange}
            name="amount"
          ></TextInput>
          <Text style={styles.label}>Time</Text>
          <TextInput
            placeholder="How long?"
            style={styles.input}
            onChange={this.handleChange}
            name="time"
          ></TextInput> */}
          <Button
            onPress={() => {}}
            title="Request"
            color="#385A94"
            style={{
              ...Platform.select({
                ios: {
                  backgroundColor: '#385A94',
                  borderRadius: 8,
                  color: '#fff',
                },
                android: {
                  borderRadius: 8,
                },
                default: {
                  borderRadius: 8,
                },
              }),
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C94E1',
    padding: 5,
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
