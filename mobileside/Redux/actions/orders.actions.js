import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../config/config';
import axios from 'axios';
import {DevSettings} from 'react-native';
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
export const getOrderDetails = async url => {
  const configheaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios.get(url, configheaders);
  return result;
};
//for user
export const updateOrderStatusByShopUuid = async (shop_uuid, orderUuid) => {
  console.log('uuid', uuid);
  // const SHOP_PROFILE_URL = `${configDotServer}/shop/shopdetail/shopuuid/${uuid}`;
  // const SHOP_PROFILE_URL = `${configDotServer}/trackOrder/shipping/status/${uuid}`;
  const SHOP_PROFILE_URL = `${configDotServer}/trackOrder/shipping/status/order_uuid/${orderUuid}/shop/${shop_uuid}`;
  const configheaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  };

  let _result = await axios
    .put(SHOP_PROFILE_URL, configheaders)
    .then(res => res.data);

  return _result;
};
//for shop
export const updateOrderStatusByUserUuid = async (user_uid, orderUuid) => {
  console.log('uuid', uuid);
  // const SHOP_PROFILE_URL = `${configDotServer}/shop/shopdetail/shopuuid/${uuid}`;
  // const SHOP_PROFILE_URL = `${configDotServer}/trackOrder/shipping/status/order_uuid/${orderUuid}/user/${user_uid}`;
  const SHOP_PROFILE_URL = `${configDotServer}/trackOrder/shipping/status/order_uuid/${orderUuid}/user/${user_uid}`;
  const configheaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
  };

  let _result = await axios
    .put(SHOP_PROFILE_URL, configheaders)
    .then(res => res.data);

  return _result;
};
