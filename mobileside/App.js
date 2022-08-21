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
