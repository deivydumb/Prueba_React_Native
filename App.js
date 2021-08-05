import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  async getUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      this.setState({ data: json});
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 4, padding: 50  }} >
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text > {"\n"}Name: {item.name},{"\n"}Email: {item.email},{"\n"}
               Ciudad: {item.address.city},{"\n"}Nombre Compañia: {item.company.name} </Text>
              
              )}
          />
        )}
      </View>
    );
  }
  
};

