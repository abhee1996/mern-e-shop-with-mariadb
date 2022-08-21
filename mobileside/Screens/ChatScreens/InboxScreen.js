import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useCallback, useEffect, useState} from 'react';
import {Messages} from '../../config/inbox_messages';
import {useFocusEffect} from '@react-navigation/core';

import colors from '../../config/colors';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {getUserProfileByUUID} from '../../Redux/actions/Auth.Action';
import axios from 'axios';
import config from '../../config/config';
import {useDispatch, useSelector} from 'react-redux';
import {
  getfireShopChat,
  getfireusersChat,
} from '../../Redux/actions/chat.actions';
import {getShopDetailByUuid} from '../../Redux/actions/ShopAuth.action';

const {width, height} = Dimensions.get('window');
const InboxScreen = props => {
  const context = useContext(AuthGlobal);
  const [users, setUsers] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userUUid, setUserUUid] = useState();
  const [shopUUid, setShopUUid] = useState();
  const [stateDocId, setStateDocId] = useState();
  const {firestoreUser} = context;
  const userUid = context?.userValue?.user?.user_uid;
  const ShopId = context?.shopValue?.shop?.shop_uuid;
  const [loading, setLoading] = useState(true);

  async function getFireUsers(cr) {
    setUsers([]);
    setUserName('');
    cr.forEach(async (docId, i) => {
      let eshopDb = await firestore()
        .collection('eshop')
        .doc('eShop-hV1O5KpI9ZhoOqjA0CuZqcJfdyl2');
      let chatrmdb = await eshopDb.collection('chatrooms').doc(`${docId}`);

      let querySnap = await chatrmdb
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .get();
      const querykey = 'receiverId'; //'chatroom_uuid';

      const querySnapDocsUniqueByKey = [
        ...new Map(
          querySnap?.docs?.map(item => [item[querykey], item]),
        ).values(),
      ];

      const allUsers = await querySnapDocsUniqueByKey?.map(snap => {
        if (ShopId == snap?.data()?.receiverId) {
          console.log('shop chat case');

          return snap.data();
        } else if (userUid == snap?.data()?.senderId) {
          console.log('user chat case');

          return snap.data();
        }
      });

      setUsers(users => [...users, ...allUsers]);

      if (ShopId) {
        allUsers?.map(async (usr, i) => {
          const resChatUser = await getUserProfileByUUID(usr?.senderId);
          console.log('resChatUser[i]?.name', resChatUser[i]?.name);
          // setUserName(resChatUser[i]?.name);
          const un = [resChatUser[i]?.name];
          setUserName(userName => [...userName, ...un]); //resChatUser[i]?.
          setUserUUid(resChatUser[i]?.user_uid);
          setLoading(false);
        });
      } else if (userUid) {
        allUsers?.map(async (usr, i) => {
          const resChatUser = await getShopDetailByUuid(usr?.receiverId);
          console.log('resChatUser[i]?.name', resChatUser[i]?.name);
          setUserName(resChatUser[i]?.name);
          //setUserName(userName => [userName, resChatUser[i]?.name]); //resChatUser[i]?.name);
          setShopUUid(resChatUser[i]?.shopUuid);
          setLoading(false);
        });
      }
    });
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (userUid) {
        console.log('userUid', userUid);
        getfireusersChat(userUid).then(res => {
          var result = res.reduce((r, o) => {
            Object.entries(o).forEach(([k, v]) => {
              r[k] = r[k] || [];
              if (!r[k].includes(v)) r[k].push(v);
            });
            return r;
          }, Object.create(null));
          setChatList(result?.chatroom_uuid);
          getFireUsers(result?.chatroom_uuid);
        });
      } else if (ShopId) {
        getfireShopChat(ShopId).then(res => {
          var result = res.reduce((r, o) => {
            Object.entries(o).forEach(([k, v]) => {
              r[k] = r[k] || [];
              if (!r[k].includes(v)) r[k].push(v);
            });
            return r;
          }, Object.create(null));
          setChatList(result?.chatroom_uuid);
          getFireUsers(result?.chatroom_uuid);
        });
      }
      // getFireUsers();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: colors.voiletpro.violet500,
          alignItems: 'center',
          height: 55,
        }}>
        <AppIconButton
          leftIcon={true}
          iconAs="MaterialIcons"
          name="arrow-back"
          width={-45}
          height={23}
          size={40}
          txtColor={colors.default.white}
          style={{
            right: 135,
          }}
          buttonStyle={{
            alignSelf: 'center',
            justifyContent: 'center',
            top: 10,
          }}
          iconColor={colors.default.white}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={{color: colors.default.white, fontSize: 25}}>Inbox</Text>
      </View>
      {console.log('userName', userName)}
      {users?.length === 0 ? (
        <>
          <ActivityIndicator size="large" color="red" />
        </>
      ) : (
        <>
          {users?.length > 0 ? (
            <View style={styles.container}>
              <>
                <FlatList
                  data={users}
                  keyExtractor={item => item._id}
                  renderItem={({item, index}) => (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          console.log(
                            ' item userUUid shopUUid',
                            item,
                            // userUUid,
                            // shopUUid,
                          );
                          props.navigation.navigate('ChatScreen', {
                            item,
                            userUUid: userUUid,
                            shopUUid: shopUUid,
                            chatList: chatList,
                            userName: userName,
                          });
                        }}
                        style={styles.messageCard}>
                        <View style={styles.UserInfo}>
                          <View style={styles.UserImgWrapper}>
                            <Image
                              source={{
                                uri: `https://cdn.pixabay.com/photo/2020/04/30/03/26/rufous-5111261_960_720.jpg`,
                              }}
                              style={styles?.UserImg}
                            />
                          </View>
                          <View style={styles.TextSection}>
                            <View style={styles.UserInfoText}>
                              <Text style={styles.userName}>
                                {userName[index]}
                              </Text>
                              <Text style={styles.PostTime}>
                                {item?.messageTime || Date.now()}
                              </Text>
                            </View>
                            <Text style={styles.MessageText}>
                              {item?.text || 'hello world'}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </>
                  )}
                />
              </>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: ' #ffffff',
    width: width,
    height: height,
  },
  messageCard: {width: '100%'},
  UserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  UserImg: {width: 50, height: 50, borderRadius: 25},
  TextSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomColor: '#cccccc',
  },
  UserInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  UserName: {fontSize: 14, fontWeight: 'bold', fontFamily: 'Lato-Regular'},
  PostTime: {fontSize: 12, color: '#666', fontFamily: 'Lato-Regular'},
  MessageText: {fontSize: 14, color: '#333333'},
});
