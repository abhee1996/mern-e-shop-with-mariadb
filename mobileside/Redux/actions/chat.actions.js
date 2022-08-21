import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../../config/config';
import axios from 'axios';
import {DevSettings} from 'react-native';

export async function getfireusersChat(userUid) {
  const configHeaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
    },
  };
  try {
    const __result = await axios
      .get(
        `${config.server}/conversation/get/firebase/message/${userUid}`,
        configHeaders,
      )
      .then(res => {
        return res.data;
      });
    console.log('__result');
    const key = 'chatroom_uuid';

    const arrayUniqueByKey = [
      ...new Map(__result?.map(item => [item[key], item])).values(),
    ];
    return arrayUniqueByKey;
  } catch (error) {
    console.log('error', error);
  }
}
export async function getfireShopChat(shopuuid) {
  const configHeaders = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`,
    },
  };
  try {
    const __result = await axios
      .get(
        `${config.server}/conversation/get/firebase/message/shop/${shopuuid}`,
        configHeaders,
      )
      .then(res => {
        return res.data;
      });
    const key = 'chatroom_uuid';

    const arrayUniqueByKey = [
      ...new Map(__result?.map(item => [item[key], item])).values(),
    ];
    console.log('__result');
    return arrayUniqueByKey;
  } catch (error) {
    console.log('error', error);
  }
}
