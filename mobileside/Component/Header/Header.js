import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import colors from '../../config/colors';
import config from '../../config/config';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import AppIconButton from '../AppButtons/AppIconButton';
import {userlogout} from '../../Redux/actions/Auth.Action';
import {shoplogout} from '../../Redux/actions/ShopAuth.action';
import {Select} from 'native-base';

const {width, height} = Dimensions.get('window');
const Header = props => {
  const context = useContext(AuthGlobal);
  console.log('context.userValue', context.userValue);
  const [currentShop, setCurrentShop] = useState();
  const [userProfile, setuserProfile] = useState();
  // console.log('Header context.contextValue', context.contextValue);
  const navigation = useNavigation();
  // console.log('useNavigation', navigation);
  const userId = context?.userValue?.userId;
  const shopId = context?.shopValue?.shopId;
  const isShopAuthenticated = context.stateShop.isShopAuthenticated;
  let [language, setLanguage] = useState('key0');

  // console.log('isShopAuthenticated', isShopAuthenticated);
  // console.log('userId', userId);
  if (userId) {
    useEffect(() => {
      if (userId === null) {
        navigation.navigate('Login');
      }
      const asyncAuthURL = `${config.server}/users/auth/userprofile/${userId}`;
      AsyncStorage.getItem('user_login_Jwt_Token').then(res => {
        let requestBody = {
          headers: {
            Authorization: `Bearer ${res}`,
          },
        };
        axios.get(asyncAuthURL, requestBody).then(user => {
          setuserProfile(user.data);
        });
      });
    }, [userId]);
  } else {
    useEffect(() => {
      if (shopId === null) {
        navigation.navigate('Login');
      }
      const asyncShopAuthURL = `${config.server}/shop/shopdetail/${shopId}`;
      AsyncStorage.getItem('shop_jwt').then(res => {
        let requestBody = {
          headers: {
            Authorization: `Bearer ${res}`,
          },
        };
        axios
          .get(asyncShopAuthURL, requestBody)
          .then(shop => {
            setCurrentShop(shop.data);
          })
          .catch(err => {
            console.log('error in get shop details', err);
          });
      });
      console.log('currentShop', currentShop);
      return () => {
        // setuserProfile();
      };
    }, [shopId]);
  }
  return (
    <SafeAreaView style={styles.header}>
      <View
        style={{
          width: width - 10,
          height: height / 14,
          backgroundColor: '#AD40AF',
        }}>
        {shopId ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                // borderWidth: 1,
                width: width / 1.07,
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  width: 150,
                  height: 50,
                  right: 20,
                }}>
                <Text style={{color: '#fff'}}>
                  shop Id: {currentShop?.shopUuid}
                </Text>
              </View>
              <View
                style={{
                  width: 50,
                  height: 50,
                  right: 45,
                }}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  resizeMode="contain"
                  source={require('../../assets/shopping-cart-20380.png')}
                />
              </View>
              <View
                style={{
                  width: 50,
                  height: 50,
                  left: 40,
                }}>
                <AppIconButton
                  style={{
                    fontWeight: 'bold',
                  }}
                  leftIcon={true}
                  iconAs={'AntDesign'}
                  iconColor={'#fff'}
                  name={'logout'}
                  size={17}
                  width={-60}
                  height={-8}
                  marginY="20%"
                  borderRadius={20}
                  buttonBgColor={colors.dangerpro.danger600}
                  txtColor={colors.default.white}
                  onPress={() => {
                    AsyncStorage.removeItem('shop_jwt'),
                      shoplogout(context.dispatchShop);
                    navigation.navigate('Login');
                  }}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            {userId ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',

                    width: width - 50,
                  }}>
                  <View
                    style={{
                      alignSelf: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                      }}>
                      user : {userProfile?.email}
                    </Text>
                  </View>
                  <Image
                    style={{height: 50, right: 200}}
                    resizeMode="contain"
                    source={require('../../assets/shopping-cart-20380.png')}
                  />
                  <AppIconButton
                    style={{
                      right: 310,
                      fontWeight: 'bold',
                    }}
                    leftIcon={true}
                    iconAs={'AntDesign'}
                    iconColor={'#fff'}
                    name={'logout'}
                    size={17}
                    width={-60}
                    height={-8}
                    marginY="25%"
                    borderRadius={20}
                    buttonBgColor={colors.dangerpro.danger600}
                    txtColor={colors.default.white}
                    onPress={() => {
                      userlogout(context.dispatch);
                      navigation.navigate('Login');
                    }}
                  />
                </View>
              </>
            ) : (
              <>
                <Image
                  style={{height: 50}}
                  resizeMode="contain"
                  source={require('../../assets/shopping-cart-20380.png')}
                />
              </>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#AD40AF',
  },
});
export default Header;
{
  /* <View
style={{
  // left: 100,
  // fontSize: 30,
  // width: 30,
  // backgroundColor: 'red',
  // borderWidth: 2,
  borderColor: '#03bafc',
}}>
<Select
  style={{
    // borderWidth: 2,
    left: 10,
    // fontSize: 30,
    width: 10,
    borderColor: '#03bafc',
  }}
  placeholder="Mode of payment"
  // selectedValue={language}
  width={50}
  onValueChange={itemValue => setLanguage(itemValue)}>
  <Select.Item label="Wallet" value="key0" />
  <Select.Item label="ATM Card" value="key1" />
  <Select.Item label="Debit Card" value="key2" />
  <Select.Item label="Credit Card" value="key3" />
  <Select.Item label="Net Banking" value="key4" />
</Select>
</View> */
}
