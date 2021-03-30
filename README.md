##### Integrating a React Native app with Segment & then with CleverTap

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

## Step 2: CleverTap in Segment RN app
Get CleverTap's Segment React Native SDK  
> @segment/analytics-react-native-clevertap

##### Update the App.js file to have 
> import CleverTap from '@segment/analytics-react-native-clevertap'

##### and
> using : [CleverTap] in analytics.setup function (check app.js)

## Validation
##### Ensure that segment is getting the data 
> In the Segment -> Source -> <YOUR_SOURCE_CONNECTION> -> Debugger, you must start seeing events after you launch your app

##### Ensure that Segment is sending the events to CleverTap
> In the Segment -> Destination -> <YOUR_CLEVERTAP_DESTINATION> -> Event Delivery, you must see Events Delivered > 0 (check that time range is correct)

##### Ensure CleverTap gets the event
> In CleverTap dashboard, Event analysis of the sent event must show > 0 events

##### For iOS
Make sure to run 
> pod install
in the ios folder

##### Example and expansive use
>  [CT Example](https://github.com/jaysmehta/CleverTapSegmentReactNative/blob/master/App.js)
