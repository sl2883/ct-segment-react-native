import React, { Component } from 'react';
import analytics from '@segment/analytics-react-native'
import CleverTap from '@segment/analytics-react-native-clevertap'

const CT = require('clevertap-react-native');

import {
  View,
  Text, 
  StyleSheet,
  Button
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {

	CT.setDebugLevel(3);
	//CleverTap.createNotificationChannel("generic","generic","generic",3,true);
    // initial method
	await analytics.setup('c1JWfN5OsNM4GejlnNmDKi6hveyPb7zC', {
		// Record screen views automatically!
		recordScreenViews: true,
		// Record certain application events automatically!
		trackAppLifecycleEvents: true,
		using : [CleverTap]
	  })
  };

productViewed = (e) => {
	console.log('viewed');
	analytics.track('Product viewed', {
		'name': 'Sword of Heracles',
		'eventId': '1234'
  	});
}

productPurchased = (e) => {

	console.log('purchased');
	analytics.track('Product purchased', {
		'name': 'Sword of Heracles',
		'eventId': '1234'
  	});
}



  render() {
    return (
      <View>
        <Text>Test</Text>
		<Button
			onPress={this.productViewed}
			title="Product View"
			color="#841584"
			/>
		<Button
			onPress={this.productPurchased}
			title="Product Purchased"
			color="#FF9900"
			/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default App;