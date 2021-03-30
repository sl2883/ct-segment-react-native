> Make sure you've set up Segment connections correctly -
> Source is set to React Native app
> Destination is set to CT with the project id and token set
> Soruce and Destination are connected and enabled

### Integrating a React Native app with Segment & then with CleverTap

## Step 1: Segment in React Native app
To get started with Segment, follow [this](https://segment.com/docs/connections/sources/catalog/libraries/mobile/react-native/)

* Add the segment dependency 
```javascript
yarn add @segment/analytics-react-native
```

* Import the analytics class object wherever you wish to connect to segment backend
```javascript
import analytics from '@segment/analytics-react-native'
```

* Setup and add segment events
```javascript
await analytics.setup('YOUR_WRITE_KEY', {
	// Record screen views automatically!
	recordScreenViews: true,
	// Record certain application events automatically!
	trackAppLifecycleEvents: true
})
```

> Remember to replace YOUR_WRITE_KEY with your own Segment Write Key

## Step 2: CleverTap in Segment React Native app
* Get CleverTap's Segment React Native SDK  
```javascript
yarn add @segment/analytics-react-native-clevertap
```

* Import CleverTap class
```javascript
import CleverTap from '@segment/analytics-react-native-clevertap'
```

* Update the Segment setup function to now also send data to CleverTap
```javascript
await analytics.setup('YOUR_WRITE_KEY', {
	// Record screen views automatically!
	recordScreenViews: true,
	// Record certain application events automatically!
	trackAppLifecycleEvents: true,
	using : [CleverTap]
})
```

## Validation
##### Ensure that segment is getting the data
After you launch your app and perform some actions

* Go to Segment -> Source -> <YOUR_SOURCE_CONNECTION> -> Debugger
* You must now be getting the events in Segment
![Events in Segment](https://github.com/sl2883/ct-segment-react-native/blob/main/images/appTosegment.png "")

##### Ensure that Segment is sending the events to CleverTap
* Go to Segment -> Destination -> <YOUR_CLEVERTAP_DESTINATION> -> Event Delivery
* You must see # of Events Delivered to be greater than zero
![Events to CleverTap](https://github.com/sl2883/ct-segment-react-native/blob/main/images/segmentToCT.png "")
> If # of events is zero, check that the time range is correct

##### Ensure CleverTap gets the event
* Go to CleverTap Dashboard -> Event Analysis
* Query the event that was delivered from Segment in Step 1
![CleverTap Dashboard](https://github.com/sl2883/ct-segment-react-native/blob/main/images/CTdashboard.png "")


##### For iOS
Make sure to run 
> pod install
in the ios folder

##### More elaborative app that showcases react native apps working with segment and CleverTap
>  [CT Example](https://github.com/jaysmehta/CleverTapSegmentReactNative/)
