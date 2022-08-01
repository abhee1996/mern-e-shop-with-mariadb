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
  const ShopId = context?.shopValue?.shopId || null;
  console.log('ShopId App.js', ShopId);
  const UserId = context?.userValue?.userId || null;
  console.log('UserId App.js', UserId);

  if (UserId === null && ShopId === null) {
    console.log(' if !UserId && !ShopId null'); //, UserId, ShopId);
    return (
      <NavigationContainer>
        <AuthStackNavigator />
      </NavigationContainer>
    );
  }
  // else if (UserId === undefined && ShopId === undefined) {
  //   console.log(' if !UserId && !ShopId undefined'); //, UserId, ShopId);
  //   return (
  //     <NavigationContainer>
  //       <AuthStackNavigator />
  //     </NavigationContainer>
  //   );
  // }
  else if (UserId) {
    console.log(' if  !ShopId');

    return (
      <NavigationContainer>
        <Header />
        <MainNavigator />
      </NavigationContainer>
    );
  } else if (ShopId) {
    console.log(' if UserId && ShopId');

    return (
      <>
        <NavigationContainer>
          <Header />
          <MainNavigator />
        </NavigationContainer>
      </>
    );
  } else {
    return (
      <View>
        <Text> no app</Text>
      </View>
    );
  }
};

export default App;
