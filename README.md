
<mark>Make sure you've set up Segment connections correctly</mark>

- Source is set to React Native app
- Destination is set to CT with the project id and token set
- Soruce and Destination are connected and enabled

### Integrating a React Native app with Segment & then with CleverTap

## Step 1: Segment in React Native app

To get started with Segment, follow [this](https://segment.com/docs/connections/sources/catalog/libraries/mobile/react-native/)

* Add the segment dependency 
  
  ```javascript
  npm install -save @segment/analytics-react-native
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

* Go to 
  
  ```
  Segment 
   -> Source 
    -> <YOUR_SOURCE_CONNECTION> 
     -> Debugger
  ```
* 
* You must now be getting the events in Segment
  ![Events in Segment](https://github.com/sl2883/ct-segment-react-native/blob/main/images/appTosegment.png "")

##### Ensure that Segment is sending the events to CleverTap

* Go to 
  
  ```
  Segment 
   -> Destination 
    -> <YOUR_CLEVERTAP_DESTINATION> 
     -> Event Delivery
  ```

* You must see # of Events Delivered to be greater than zero
  ![Events to CleverTap](https://github.com/sl2883/ct-segment-react-native/blob/main/images/segmentToCT.png "")
  
  > If # of events is zero, check that the time range is correct

##### Ensure CleverTap gets the event

* Go to 
  
  ```
  CleverTap Dashboard 
   -> Event Analysis
  ```

* Query the event that was delivered from Segment in Step 1
  ![CleverTap Dashboard](https://github.com/sl2883/ct-segment-react-native/blob/main/images/CTdashboard.png "")

##### For iOS

In the ios folder, make sure to run 

```
pod install
```

##### More elaborative app that showcases react native apps working with segment and CleverTap

>  [Jay's example](https://github.com/jaysmehta/CleverTapSegmentReactNative/)

<h1> Enabling push notifications - Android </h1>

<h3> Install the clevertap-react-native module </h3>
In your react-native app's folder

```
npm install --save clevertap-react-native
```

<h3> Update your build.gradle to have the right dependencies </h3>

In your android app build.gradle, add the following
```java
    implementation 'com.clevertap.android:clevertap-android-sdk:3.6.3'

    implementation "com.google.android.gms:play-services-base:+"
    implementation "com.google.firebase:firebase-messaging:+"
    implementation 'androidx.multidex:multidex:2.0.1'

    //For CleverTap Android SDK v3.6.3 and above add the following -
    implementation 'com.android.installreferrer:installreferrer:1.1'

    implementation 'com.android.support:appcompat-v7:28.0.0'//MANDATORY for App Inbox
    implementation 'com.android.support:design:28.0.0'//MANDATORY for App Inbox
    implementation 'com.github.bumptech.glide:glide:4.9.0'//MANDATORY for App Inbox

    //Optional ExoPlayer Libraries for Audio/Video Inbox Messages. Audio/Video messages will be dropped without these dependencies
    implementation 'com.google.android.exoplayer:exoplayer:2.8.4'
    implementation 'com.google.android.exoplayer:exoplayer-hls:2.8.4'
    implementation 'com.google.android.exoplayer:exoplayer-ui:2.8.4'
```

<h3>In your App -> Main -> AndroidManifest file, add you clevertap account details </h3>

```javascript
<meta-data
    android:name="CLEVERTAP_ACCOUNT_ID"
    android:value="Your CleverTap Account ID"/>
 <meta-data
        android:name="CLEVERTAP_TOKEN"
        android:value="Your CleverTap Account Token"/>
```

<h3>And permission to send data to clevertap</h3>

```javascript
<!-- Required to allow the app to send events and user profile information -->
<uses-permission android:name="android.permission.INTERNET"/>
<!-- Recommended so that CleverTap knows when to attempt a network call -->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

<h3> In your MainActivity, enable deep links </h3>

```javascript
import com.clevertap.react.CleverTapModule;

@Override
	protected void onCreate(Bundle savedInstanceState) {
    	super.onCreate(savedInstanceState);
    	CleverTapModule.setInitialUri(getIntent().getData());
	}
}
```
<h3> In your MainApplication, initiate ActivityLifeCycle.</h3>

> Need to Check - Is it required event though segment will have these?

```javascript
import com.clevertap.android.sdk.ActivityLifecycleCallback;

@Override
  public void onCreate() {

    ActivityLifecycleCallback.register(this); 
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    if (!BuildConfig.DEBUG) {
      UpdatesController.initialize(this);
    }

    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
```

<h3> Add MyFirebaseMessagingService class, to send token to CT and to set channels </h3>

```javascript
package com.second;

import android.os.Bundle;
import android.util.Log;
import com.clevertap.android.sdk.CleverTapAPI;
import com.clevertap.android.sdk.pushnotification.NotificationInfo;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import java.util.Map;
public class MyFirebaseMessagingService extends FirebaseMessagingService {
    @Override
    public void onMessageReceived(RemoteMessage message){
        try {
            if (message.getData().size() > 0) {
                Bundle extras = new Bundle();
                for (Map.Entry<String, String> entry : message.getData().entrySet()) {
                    extras.putString(entry.getKey(), entry.getValue());
                }
                Log.e("TAG","onReceived Mesaage Called");
                NotificationInfo info = CleverTapAPI.getNotificationInfo(extras);
                if (info.fromCleverTap) {
                    //Create Notification Channel
                    CleverTapAPI.createNotificationChannel(getApplicationContext(), "generic", "generic", "generic", 2, true);

                    CleverTapAPI.createNotificationChannel(getApplicationContext(), "123456", "123456", "Your Channel Description", 2, true);
                    // Creating a Notification Channel With Sound Support
                    //        CleverTapAPI.createNotificationChannel(getApplicationContext(), "got", "Game of Thrones", "Game Of Thrones", NotificationManager.IMPORTANCE_MAX, true, "gameofthrones.mp3");

                    CleverTapAPI.createNotificationChannel(getApplicationContext(), "got", "Game of Thrones", "Game Of Thrones", 2, true, "gameofthrones.mp3");


                    CleverTapAPI.createNotification(getApplicationContext(), extras);
                }
            }
        } catch (Throwable t) {
            Log.d("MYFCMLIST", "Error parsing FCM message", t);
        }
    }
    @Override
    public void onNewToken(String token) {
        CleverTapAPI.getDefaultInstance(this).pushFcmRegistrationId(token,true);
        // If you want to send messages to this application instance or
        // manage this apps subscriptions on the server side, send the
        // Instance ID token to your app server.
        //sendRegistrationToServer(token);
    }
} 

//Update your channels above
```

<h3> In your App -> Main -> AndroidManifest, add the new service </h3>

```java
<service android:name=".MyFirebaseMessagingService">
	<intent-filter>
		<action android:name="com.google.firebase.MESSAGING_EVENT"/>
	</intent-filter>
</service>
```

<h3> Bring your google-services.json to app folder </h3>

> Make sure that your Firebase service key and token are updated in CT FCM push
<h3> Update your app's build.gradle according to Google's integration steps</h3>

```
apply plugin: 'com.google.gms.google-services'
```
<h3> Update your project's build.gradle according to Google's integration steps</h3>

```
classpath("com.google.gms:google-services:4.3.5")
```

> Make sure notification channel is updated in MyFirebaseMessagingService
> Make sure that the same notification channel is used for sending notifications (test)

<h2> Enabling Push Notifications - iOS </h2>

> Make sure your minimum ios target in PodFile is 11 (need to know the ideal, but this works for me)

<h3> Get you sdks </h3>
Inside your ios folder

```
pod install
```

You may encounter this error 
>warning: The iOS Simulator deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0, but the range of supported deployment target versions is 9.0 to 14.4.99. (in target 'boost-for-react-native' from project 'Pods')

**Fix this by adding the following piece of code inside your target in PodFile**
```objectivec
post_install do |installer|
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        if Gem::Version.new('8.0') > Gem::Version.new(config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'])
          config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '8.0'
        end
      end
    end
  end
```

<h3>Update your AppDelegate.m</h3>
Imports

```objectivec
#import <CleverTap-iOS-SDK/CleverTap.h>
#import <clevertap-react-native/CleverTapReactManager.h>
```
In didFinishLaunchingWithOptions

```objectivec
[self registerForPush];
[CleverTap autoIntegrate];
[CleverTap setDebugLevel:CleverTapLogDebug];
[[CleverTapReactManager sharedInstance] applicationDidLaunchWithOptions:launchOptions];```
```
And add additional functions
```objectivec
-(void) registerForPush {
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;
    [center requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge) completionHandler:^(BOOL granted, NSError * _Nullable error){
    if(!error){
      dispatch_async(dispatch_get_main_queue(), ^{
         [[UIApplication sharedApplication] registerForRemoteNotifications];
      });
    }
    }];

}
//Device Token
-(void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
  NSLog(@"Device Token : %@",deviceToken);

}
-(void) application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error{
  NSLog(@"Error %@",error.description);
}

-(BOOL)application:(UIApplication *)application willContinueUserActivityWithType:(NSString *)userActivityType{
  
  return TRUE;
}

//PN Delgates
-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler{
    
  self.resp = response.notification.request.content.userInfo;
  completionHandler();
}
-(void) userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler{
    completionHandler(UNAuthorizationOptionAlert | UNAuthorizationOptionBadge | UNAuthorizationOptionSound);
}
```

Also update your AppDelegate.h to have the right imports, variables and implementations

```objectivec
#import <Foundation/Foundation.h>
#import <EXUpdates/EXUpdatesAppController.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UserNotifications.h>
#import <CleverTap-iOS-SDK/CleverTap.h>
#import <clevertap-react-native/CleverTapReactManager.h>

#import <UMCore/UMAppDelegateWrapper.h>

@interface AppDelegate : UMAppDelegateWrapper <RCTBridgeDelegate, EXUpdatesAppControllerDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic,strong) NSDictionary *resp;

@end
```

~~Lastly, make sure you've added the CT token & account id in your Info.plist file~~

```json
<key>CleverTapAccountID</key>
<string>XXX-XX-XXX</string>
<key>CleverTapToken</key>
<string>XXX-XXX</string>
```


## Notes to self

- To run the react native project on iOS device
```
react-native run-ios --device
```

- If you get aps-entitlement error, check that Signing and capabilities have the "Background mode" and "push notification"
