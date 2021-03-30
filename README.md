##### Integrating a React Native app with Segment & then with CleverTap

## Step 1: Segment in RN app
To get started with Segment, follow [this](https://segment.com/docs/connections/sources/catalog/libraries/mobile/react-native/)

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
