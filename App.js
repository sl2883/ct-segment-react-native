import React, { Component } from 'react';
import {
  View,
  Text, 
  StyleSheet
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // initial method
  };

  render() {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default App;