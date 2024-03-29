/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useContext, useEffect, useState} from 'react';
import {LogBox, SafeAreaView, Text, View} from 'react-native';
import Header from './Component/Header/Header';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigator/MainNavigator';
import {AuthStackNavigator} from './navigator/HomeNavigation';
import AuthGlobal from './Redux/AuthStore/AuthGlobal';
import auth from '@react-native-firebase/auth';

//import AsyncStorage from '@react-native-async-storage/async-storage';
// const getdata = async (setShop, setUser, setToken) => {
//   await AsyncStorage.getItem('shop_jwt').then(res => {
//     setToken(res);
//   });
//   //for shop
//   await AsyncStorage.getItem('shop_jwt_decoded').then(res => {
//     setShop(JSON.parse(res));
//   });
//   // for user
//   await AsyncStorage.getItem('user_jwt_decoded').then(res => {
//     setUser(JSON.parse(res));
//   });
// };
LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);
const App = () => {
  const context = useContext(AuthGlobal);
  const ShopId = context?.shopValue?.shop?.shopId || null;
  const UserId = context?.userValue?.user?.userId || null;
  const [initializing, setInitializing] = useState(null);
  function onAuthStateChanged(user) {
    context?.setFirestoreUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return subscribe;
  }, []);
  if (initializing) return null;

  return (
    <>
      <NavigationContainer>
        {/* {context?.firestoreUser && UserId ? ( */}
        {UserId ? (
          <>
            <Header />
            <MainNavigator />
          </>
        ) : // ) : context?.firestoreUser && ShopId ? (
        ShopId ? (
          <>
            <Header />
            <MainNavigator />
          </>
        ) : (
          <AuthStackNavigator />
        )}
      </NavigationContainer>
    </>
  );
};

export default App;
// } else {
//   return (
//     <View>
//       <Text> no app</Text>
//     </View>
//   );
// }

//previous package.json file
// {
//   "name": "mobileside",
//   "version": "0.0.1",
//   "private": true,
//   "scripts": {
//     "android": "react-native run-android",
//     "ios": "react-native run-ios",
//     "start": "react-native start",
//     "test": "jest",
//     "lint": "eslint ."
//   },
//   "dependencies": {
//     "@react-native-async-storage/async-storage": "^1.17.7",
//     "@react-native-firebase/app": "^15.3.0",
//     "@react-native-firebase/auth": "^15.3.0",
//     "@react-native-firebase/firestore": "^15.3.0",
//     "@react-native-firebase/storage": "^15.3.0",
//     "@react-native-masked-view/masked-view": "^0.2.6",
//     "@react-navigation/bottom-tabs": "^6.3.1",
//     "@react-navigation/elements": "^1.3.3",
//     "@react-navigation/material-top-tabs": "^6.2.1",
//     "@react-navigation/native": "^6.0.10",
//     "@react-navigation/native-stack": "^6.6.2",
//     "@react-navigation/stack": "^6.2.1",
//     "@types/react": "^18.0.14",
//     "@types/react-native": "^0.68.0",
//     "axios": "^0.27.2",
//     "deprecated-react-native-prop-types": "^2.2.0",
//     "eslint-plugin-prettier": "^4.0.0",
//     "expo-secure-store": "^11.3.0",
//     "jwt-decode": "^3.1.2",
//     "mime": "^3.0.0",
//     "native-base": "^3.4.7",
//     "prettier": "^2.7.1",
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "react-native": "^0.69.4",
//     "react-native-gesture-handler": "^2.4.2",
//     "react-native-gifted-chat": "^1.0.4",
//     "react-native-image-crop-picker": "^0.38.0",
//     "react-native-keyboard-aware-scroll-view": "^0.9.5",
//     "react-native-keyboard-spacer": "^0.4.1",
//     "react-native-keyboard-view-space": "^1.0.6",
//     "react-native-otp-textinput": "0.0.9",
//     "react-native-pager-view": "^5.4.25",
//     "react-native-permissions": "^3.3.1",
//     "react-native-push-notification": "^8.1.1",
//     "react-native-raw-bottom-sheet": "^2.2.0",
//     "react-native-safe-area-context": "^4.3.1",
//     "react-native-screens": "^3.13.1",
//     "react-native-slick": "^1.6.0",
//     "react-native-splash-screen": "^3.3.0",
//     "react-native-svg": "^12.3.0",
//     "react-native-tab-view": "^3.1.1",
//     "react-native-vector-icons": "^9.1.0",
//     "react-redux": "^8.0.2",
//     "redux": "^4.2.0",
//     "redux-devtools-extension": "^2.13.9",
//     "redux-logger": "^3.0.6",
//     "redux-thunk": "^2.4.1",
//     "tsutils": "^3.21.0",
//     "typescript": "^4.7.4",
//     "yup": "^0.32.11"
//   },
//   "devDependencies": {
//     "@babel/core": "^7.18.5",
//     "@babel/runtime": "^7.18.3",
//     "@react-native-community/eslint-config": "^3.0.2",
//     "babel-jest": "^28.1.1",
//     "eslint": "^8.18.0",
//     "jest": "^28.1.1",
//     "metro-react-native-babel-preset": "^0.71.1",
//     "react-test-renderer": "17.0.2"
//   },
//   "jest": {
//     "preset": "react-native"
//   }
// }
