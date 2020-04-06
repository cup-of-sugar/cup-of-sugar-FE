import React, { Component } from 'react';
import {Picker, Text, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

class HomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={ category: '', itemName: '', error: ''}
  }

  checkInputs = () => {
    !this.state.category || !this.state.itemName ? this.setState({error: 'Please complete both form fields!'}) : this.startSearch()
  }

  handleNameChange = itemName => {
    this.setState({ itemName })
  }

  handleCategoryChange = category => {
    this.setState({ category })
  }

  startSearch = () => {
    this.setState({error: ''})
    this.props.updateSearch(this.state.itemName, this.state.category)
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.header}>Select A Category:</Text>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItems}
          name='category'
          selectedValue={this.state.category}
          onValueChange={this.handleCategoryChange}>
          <Picker.Item label="Choose a category..." />
          <Picker.Item label="Garden" value="Garden" />
          <Picker.Item label="Pantry" value="Pantry" />
          <Picker.Item label="Cleaning" value="Cleaning" />
        </Picker>
        <Text style={styles.header}>Item Name:</Text>
        <TextInput
          style={styles.textInput}
          name='itemName'
          value={this.state.itemName}
          onChangeText={this.handleNameChange}
          placeholder='Item name...'
        />
        <TouchableOpacity style={styles.searchButton} onPress={this.checkInputs}><Text style={styles.searchButtonText}>Search</Text></TouchableOpacity>
        <Text style={styles.errorText}>{this.state.error}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  errorText: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  formContainer: {
    flex: 1,
    paddingTop: 15
  },
  header: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
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
    fontSize: 26,
    height: 150,
  },
  searchButton: {
    marginRight:40,
    marginLeft:40,
    marginTop:40,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor: Colors.lightBlue,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  searchButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'#fff',
    textAlign:'center',
  }
});

export default HomeForm;
