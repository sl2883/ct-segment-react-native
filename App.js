import React, { Component } from 'react';
import analytics from '@segment/analytics-react-native'

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

  componentDidMount = async () => {
    // initial method
	await analytics.setup('c1JWfN5OsNM4GejlnNmDKi6hveyPb7zC', {
		// Record screen views automatically!
		recordScreenViews: true,
		// Record certain application events automatically!
		trackAppLifecycleEvents: true
	  })
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