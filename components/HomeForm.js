import React, { Component } from 'react';
import {Picker, Text, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import ErrorBoundary from './ErrorBoundary'

class HomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={ category: '', itemName: '' }
  }

  handleNameChange = itemName => {
    this.setState({ itemName })
  }

  handleCategoryChange = category => {
    this.setState({ category })
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.header}>Select A Category:</Text>
        <ErrorBoundary>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItems}
          name='category'
          selectedValue={this.state.category}
          onValueChange={this.handleCategoryChange}>
          <Picker.Item label="Garden" value="Garden" />
          <Picker.Item label="Pantry" value="Pantry" />
          <Picker.Item label="Cleaning" value="Cleaning" />
        </Picker>
        </ErrorBoundary>
        <Text style={styles.header}>Item Name:</Text>
        <ErrorBoundary>
        <TextInput
          style={styles.textInput}
          name='itemName'
          value={this.state.itemName}
          onChangeText={this.handleNameChange}
          placeholder='Item name...'
        />
        </ErrorBoundary>
        <TouchableOpacity style={styles.searchButton}><Text style={styles.searchButtonText}>Search</Text></TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    color: '#385A94',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  formContainer: {
    flex: 1,
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    height: 50,
    fontSize: 25,
    margin: 10,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  picker: {
    margin: 10,
  },
  pickerItems: {
    height: 110,
  },
  searchButton: {
    marginRight:40,
    marginLeft:40,
    marginTop:40,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#0C94E1',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  searchButtonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color:'#fff',
    textAlign:'center',
  }
});

export default HomeForm;
