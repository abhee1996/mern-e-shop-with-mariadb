import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Screen from '../../Component/Screen';
import {Linking} from 'react-native';
import {Platform} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import PushNotification from 'react-native-push-notification';

import AppIconButton from '../../Component/AppButtons/AppIconButton';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import MessageInput from '../../Component/MessageInput/MessageInput';
import colors from '../../config/colors';
import config from '../../config/config';
import axios from 'axios';
import {LogBox} from 'react-native';
import {Keyboard} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
const {width, height} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getChat(conversation_id, userId) {
  // const url = `${config.server}api/message/getChat?conversationId=${conversation_id}&userId=${userId}&name=receiver`;
  const url = `${config.server}/message/getchat/${conversation_id}&userId=${userId}&name=receiver`;
  return fetch(url).then(data => data.json());
}
const formateToGiftedDate = date => {
  var m = new Date(date);
  var dateFormated =
    m.getFullYear() +
    '-' +
    ('0' + m.getDate()).slice(-2) +
    '-' +
    ('0' + (m.getMonth() + 1)).slice(-2) +
    ' ' +
    ('0' + m.getHours()).slice(-2) +
    ':' +
    ('0' + m.getMinutes()).slice(-2) +
    ':' +
    ('0' + m.getSeconds()).slice(-2);
  return date;
};
const renderBubble = props => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: '#696969',
        },
        left: {
          color: '#696969',
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: 'white',
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
          marginLeft: 10,
          paddingRight: 20,
        },
        right: {
          backgroundColor: '#69d7fa',
          marginRight: 10,
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
          paddingRight: 20,
        },
      }}
    />
  );
};

// function createMessage(message) {
//   if (message.message_type == 'image') {
//     if (message.mine == '1') {
//       return {
//         _id: message.id,
//         createdAt: message.created_ts,
//         image: message.message,
//         received: message.is_seen === '0' ? false : true,
//         sent: true,
//         pending: false,
//         user: {
//           _id: message.mine,
//         },
//       };
//     } else {
//       return {
//         _id: message.id,
//         createdAt: message.created_ts,
//         image: message.message,
//         user: {
//           _id: message.mine,
//         },
//       };
//     }
//   } else {
//     return {
//       _id: message.id,
//       text: message.message,
//       createdAt: formateToGiftedDate(message.created_ts),
//       received: message.is_seen === '0' ? false : true,
//       sent: true,
//       pending: false,
//       user: {
//         _id: message.mine,
//       },
//     };
//   }
// }

const ChatScreen = props => {
  const context = useContext(AuthGlobal);
  const {firestoreUser} = context;
  // console.log('context', context);
  const [messages, setMessages] = useState();
  const {
    conversationId,
    receiverId,
    userUUid,
    shopUUid,
    chatList,
    userName,
    senderId,
    title,
    name,
    number,
    item,
  } = props?.route?.params;
  console.log('props?.route?.params;', props?.route?.params);
  const [isSeenData, setIsSeenData] = useState();
  const [chatRange, setChatRange] = useState(20);
  const [msgIds, setMsgIds] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const userUid =
    context?.userValue?.user?.user_uid || item.senderId || userUUid;
  const ShopId =
    context?.shopValue?.shop?.shop_uuid ||
    item?.shopUuid ||
    item?.receiverId ||
    shopUUid;
  console.log('chatList', chatList);
  console.log('userName[1]', userName);
  console.log('ShopId', ShopId);
  console.log('__item_', item, '_userUUid', userUid);
  const getFurtherMessages = () => {
    // getChat(conversationId, senderId).then(data => {
    //   setMessages(
    //     data.map(item => {
    //       setShowSpinner(false);
    //       return createMessage(item);
    //     }),
    //   );
    // });.collection('eshop').doc('eShop-hV1O5KpI9ZhoOqjA0CuZqcJfdyl2')
  };
  //----dome chat code start---///

  useEffect(() => {
    const interval = setInterval(() => {
      const docId = 'chatroom' + userUid?.slice(4) + '-' + ShopId?.slice(4);
      console.log('docId', docId, 'docId', docId.length);
      const messageSnapShot = firestore()
        .collection('eshop')
        .doc('eShop-hV1O5KpI9ZhoOqjA0CuZqcJfdyl2')
        .collection('chatrooms')
        .doc(docId)
        .collection('messages')
        .orderBy('createdAt', 'desc');
      messageSnapShot.onSnapshot(snapshot => {
        console.log('snapshot fires');
        const allMessages = snapshot?.docs?.map(snap => {
          const data = snap?.data();

          if (data?.createdAt) {
            return {
              ...snap.data(),
              createdAt: snap?.data()?.createdAt?.toDate(),
            };
          } else {
            return {
              ...snap.data(),
              createdAt: new Date(),
            };
          }
        });
        setMessages(allMessages);
      });
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const mymsg = {
      ...msg,
      sendedBy: firestoreUser?.uid,
      senderId: userUid,
      receiverId: item?.shopUuid || item?.receiverId,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    const docId = 'chatroom' + userUid?.slice(4) + '-' + ShopId?.slice(4);
    const finalMsg = {
      ...msg,
      chatroom_uuid: docId,
      sender_uuid: userUid,
      receiver_uuid: item?.shopUuid || item?.receiverId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    const configHeaders = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    axios
      .post(
        `${config.server}/conversation/newmessage/firebase/messaging`,
        finalMsg,
        configHeaders,
      )
      .then(res => {
        if (res.status == 200) {
          // alert('fire chat saved');
          console.info('resStatus', res.status);
        } else {
          console.warn('resStatus', res.status);
        }
      });
    firestore()
      .collection('eshop')
      .doc('eShop-hV1O5KpI9ZhoOqjA0CuZqcJfdyl2')
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .add({
        ...mymsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    console.log('finalMsg', finalMsg);
  }, []);
  //----dome chat code end---///
  useEffect(() => {
    if (props?.route?.name === 'ChatScreen')
      PushNotification.removeAllDeliveredNotifications();
    if (messages) {
      // && isSeenData[0]?.is_seen) {
      // setMessages(
      //   messages.map((msg, i) => {
      //     return {
      //       ...msg,
      //       // received: isSeenData[i]?.is_seen === '1' ? true : false,
      //       sent: true,
      //       pending: false,
      //     };
      //   }),
      // );
    }
  }, [isSeenData]);
  useEffect(() => {
    LogBox.ignoreLogs(['Animated.event now requires a second argument']);
    if (messages === undefined) {
      getFurtherMessages();
    }

    const interval = setInterval(() => {
      const url =
        config.server +
        'api/message/getNewMessagesForChat?conversationId=' +
        conversationId +
        '&userId=' +
        senderId;
      // fetch(url)
      //   .then(data => data.json())
      //   .then(data => {
      //     // append new messages
      //     data.forEach(message => {
      //       // setMessages(previousMessages =>
      //       //   GiftedChat.append(previousMessages, createMessage(message)),
      //       // );
      //     });
      //   });
    }, 3000);

    const interval2 = setInterval(() => {
      const seen_url =
        config.server +
        'api/message/getMessagesStatus?conversationId=' +
        conversationId +
        '&userId=' +
        senderId;
      // fetch(seen_url)
      //   .then(data => data.json())
      //   .then(data => {
      //     setIsSeenData(data);
      //   });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);
  // const onSend = useCallback((message = [], type) => {
  //   const url = config.server + 'api/message/sendMessage';
  //   var m = new Date();
  //   var created_ts =
  //     m.getFullYear() +
  //     '-' +
  //     ('0' + (m.getMonth() + 1)).slice(-2) +
  //     '-' +
  //     ('0' + m.getDate()).slice(-2) +
  //     ' ' +
  //     ('0' + m.getHours()).slice(-2) +
  //     ':' +
  //     ('0' + m.getMinutes()).slice(-2) +
  //     ':' +
  //     ('0' + m.getSeconds()).slice(-2);
  //   const confHeaders = {
  //     headers: {
  //       // Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   if (type == 'text') {
  //     const formdata = new FormData();
  //     // productImages.forEach(newImg => {
  //     //   let newImageURI = 'file:///' + newImg?.image?.split('file:/').join('');
  //     //   if (newImg.isNew) {
  //     //     let file = newImageURI.split('/').pop();
  //     //     formdata.append('images', {
  //     //       uri: newImageURI,
  //     //       type: mime.getType(newImageURI),
  //     //       name: file,
  //     //     });
  //     //   }
  //     // });
  //     formdata.append('name', name);
  //     formdata.append('sku', sku);
  //     formdata.append('conversationId', conversationId);
  //     formdata.append('userId', senderId);
  //     formdata.append('receiverId', receiverId);
  //     formdata.append('message', message);
  //     formdata.append('message_type', 'text');
  //     formdata.append('receiver_type', true);
  //     // axios
  //     //   .post(url, formdata, confHeaders)

  //     //   .then(response => {
  //     //     let result = JSON.parse(response.data);
  //     //     if (result?.status === '1') {
  //     //       //setMessages(previousMessages =>
  //     //       //  GiftedChat .append(previousMessages, {
  //     //       //     //_id: Math.round(Math.random() * 1000000),
  //     //       //     text: message,
  //     //       //     sent: false,
  //     //       //     received: false,
  //     //       //     pending: true,
  //     //       //     createdAt: formateToGiftedDate(created_ts),
  //     //       //     // user: {
  //     //       //     //   _id: '1',
  //     //       //     // },
  //     //       //   }),
  //     //       // );
  //     //     } else {
  //     //       Toast.show('❗ could not send');
  //     //     }
  //     //   })
  //     //   .catch(error => {
  //     //     Toast.show('Exception! could not send');
  //     //     console.error(error);
  //     //   });
  //   } else if (type == 'image') {
  //     Toast.show('sending...');
  //     const formdata = new FormData();
  //     const fileName = Date.now() + '-' + stats.filename;

  //     productImages.forEach(newImg => {
  //       let newImageURI = 'file:///' + newImg?.image?.split('file:/').join('');
  //       if (newImg.isNew) {
  //         let file = newImageURI.split('/').pop();
  //         formdata.append('images', {
  //           uri: newImageURI,
  //           type: mime.getType(newImageURI),
  //           name: file,
  //         });
  //       }
  //     });
  //     formdata.append('name', name);
  //     formdata.append('sku', sku);
  //     formdata.append('conversationId', conversationId);
  //     formdata.append('userId', senderId);
  //     formdata.append('receiverId', receiverId);
  //     formdata.append('message', message);
  //     formdata.append('message_type', 'text');
  //     formdata.append('receiver_type', true);
  //     // axios.post(url, formdata, confHeaders)
  //     // RNFetchBlob.fs
  //     //   .stat(message)
  //     //   .then(stats => {
  //     //     const fileName = Date.now() + '-' + stats.filename;
  //     //     RNFetchBlob.fetch(
  //     //       'POST',
  //     //       url,
  //     //       {
  //     //         'Content-Type': 'multipart/form-data',
  //     //       },
  //     //       [
  //     //         {
  //     //           name: 'file',
  //     //           filename: fileName,
  //     //           type: stats.type,
  //     //           data: RNFetchBlob.wrap(message),
  //     //         },
  //     //         {
  //     //           name: 'json',
  //     //           data: JSON.stringify({
  //     //             conversationId: conversationId,
  //     //             userId: senderId,
  //     //             receiverId: receiverId,
  //     //             message: fileName,
  //     //             message_type: 'image',
  //     //             receiver_type: true,
  //     //             date: created_ts,
  //     //           }),
  //     //         },
  //     //       ],
  //     //     )
  //     // .then(response => {
  //     //   let result = JSON.parse(response.data);
  //     //   if (result?.status === '1') {
  //     // setMessages(previousMessages =>
  //     //   GiftedChat.append(previousMessages, {
  //     //     //_id: Math.round(Math.random() * 1000000),
  //     //     image: message,
  //     //     createdAt: formateToGiftedDate(created_ts),
  //     //     sent: false,
  //     //     received: false,
  //     //     pending: true,
  //     //     // user: {
  //     //     //   _id: '1',
  //     //     // },
  //     //   }),
  //     // );
  //     // } else {
  //     //   Toast.show('❗ Image not send');
  //     // }
  //     // })
  //     // .catch(error => {
  //     //   Toast.show('❗ Image not send');
  //     //   console.error(error);
  //     // });

  //     // .catch(error => {
  //     //   Toast.show('❗ Image not send');
  //     //   console.error(error);
  //     // });
  //   }
  // }, []);
  const scrollToBottomComponent = () => {
    return (
      <AppIconButton
        leftIcon={true}
        iconAs="FontAwesome"
        name="angle-double-down"
        // width={-45}
        // height={23}
        size={40}
        size={30}
        buttonBgColor={colors.purplepro.purple500}
        iconColor={colors.purplepro.purple500}
        // onPress={() => props.navigation.goBack()}
      />
    );
  };
  const isCloseToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToTop = 80;
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    );
  };
  const renderSend = props => {
    const {text} = props;
    return (
      <Send {...props} alwaysShowSend={true}>
        <View
          style={{
            height: 45,
            width: 70,
          }}>
          <AppIconButton
            leftIcon={true}
            iconAs="MaterialIcons"
            name="attachment"
            width={-45}
            height={-23}
            size={22}
            txtColor={colors.default.white}
            iconColor={colors.amber.amber300}
            style={[
              {
                top: 22,
                right: 20,
              },
            ]}
            // onPress={() => {
            //    setModalVisible(true)
            // }}
          />
          <AppIconButton
            leftIcon={true}
            iconAs="MaterialIcons"
            name="send"
            width={-5}
            size={32}
            iconColor={colors.purplepro.purple7000}
            IconStyle={{
              left: 20,
            }}
            size={22}
            onPress={() => {
              props?.onSend(props);
            }}
          />
        </View>
      </Send>
    );
  };
  const deleteMessages = () => {
    const url =
      config.server +
      'api/message/deleteMessages/' +
      conversationId +
      '/receiver';

    // axios.get(url, msgIds).then(rsp => {
    //   if (rsp.data) {
    //     getFurtherMessages();
    //     setShowDelete(false);
    //     setMsgIds([]);
    //   }
    // });
  };
  return (
    <>
      <Screen>
        <View
          onTouchStart={() => {
            Keyboard.dismiss();
          }}
          style={styles.header}>
          <AppIconButton
            leftIcon={true}
            iconAs="MaterialIcons"
            name="arrow-back"
            width={-45}
            height={23}
            size={40}
            txtColor={colors.default.white}
            style={{
              right: 8,
            }}
            buttonStyle={{
              alignSelf: 'center',
              justifyContent: 'center',
              top: 11,
            }}
            iconColor={colors.purplepro.purple500}
            onPress={() => props.navigation.goBack()}
          />
          <View style={styles.headingBox}>
            <Text style={styles.senderName}>{userName}</Text>
            {/* <Text style={styles.senderName}>{item?.name}</Text> */}
            {/* {name != '' ? (
              <Text style={styles.senderName}>{name}</Text>
            ) : (
              <Text style={styles.senderName}>{item?.name}</Text>
            )} */}
            <Text style={styles.subject}>{title}</Text>
          </View>
          <AppIconButton
            leftIcon={true}
            iconAs="FontAwesome"
            name="phone-alt"
            width={-30}
            height={21}
            size={33}
            marginX="3.4%"
            marginY="3%"
            buttonStyle={{
              alignSelf: 'center',
              top: 8,
              left: 3,
            }}
            iconColor={colors.lightBlue.lightBlue500}
            borderRadius={100}
            txtColor={colors.default.white}
            style={styles.imageContainer}
            onPress={e => {
              Linking.openURL(
                Platform.OS === 'android'
                  ? `tel:${number}`
                  : `telprompt:${number}`,
              );
            }}
          />
        </View>
        <View
          onTouchStart={() => {
            Keyboard.dismiss();
          }}
          style={{flex: 1, backgroundColor: '#f1f1f1', marginBottom: 55}}>
          {showDelete ? (
            <>
              <View style={styles.showDeleteView}>
                <AppIconButton
                  leftIcon={true}
                  iconAs="MaterialCommunityIcons"
                  name="cancel"
                  width={-45}
                  height={23}
                  size={22}
                  txtColor={colors.default.white}
                  style={[
                    styles.showDeletButton,
                    {backgroundColor: colors.indigopro.indigo700},
                  ]}
                  onPress={() => {
                    setMsgIds([]);
                    setShowDelete(false);
                  }}
                />

                <AppIconButton
                  leftIcon={true}
                  iconAs="AntDesign"
                  name="delete"
                  width={-45}
                  height={23}
                  size={22}
                  txtColor={colors.default.white}
                  style={[
                    styles.showDeletButton,
                    {backgroundColor: colors.dangerpro.danger600},
                  ]}
                  //onPress={() => deleteMessages()}
                />
              </View>
            </>
          ) : (
            <></>
          )}

          <View style={{height: height / 1.38}}>
            {messages?.length === 0 ? (
              <>
                <ActivityIndicator size="large" color="red" />
              </>
            ) : (
              <>
                {messages ? (
                  <>
                    {/* <ScrollView
                      automaticallyAdjustKeyboardInsets={true}
                      keyboardDismissMode="on-drag"
                      keyboardShouldPersistTaps="never"> */}
                    {/* <KeyboardAwareScrollView
              viewIsInsideTabBar={true}
              // extraHeight={360}
              scrollEnabled={true}
              bounces
              style={{top: 10, height: 200, borderWidth: 3}}
              // onTouchStart
              enableOnAndroid={true}> */}
                    {/* <KeyboardAvoidingView
                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                      style={{flex: 100, height: 100}}> */}
                    <GiftedChat
                      isKeyboardInternallyHandled={false}
                      messagesContainerStyle={
                        {
                          //marginBottom: 200,
                          // borderWidth: 2,
                        }
                      }
                      // minComposerHeight={100}
                      forceGetKeyboardHeight={false}
                      scrollToBottomStyle={{
                        backgroundColor: colors.dangerpro.danger600,
                        // top: 10,
                        // height: 10,
                        // borderWidth: 3,
                      }}
                      // messagesContainerStyle={{
                      //   backgroundColor: colors.dangerpro.danger600,
                      //   top: 10,
                      //   height: 200,
                      //   borderWidth: 3,
                      // }}
                      // minInputToolbarHeight={100}
                      //messages={messages}
                      messages={
                        chatRange > messages?.length
                          ? messages
                          : messages?.slice(0, chatRange)
                      }
                      showAvatarForEveryMessage={true}
                      // chatRange > messages?.length
                      //   ? messages
                      //   : messages?.slice(0, chatRange)
                      // }
                      // renderInputToolbar={() => {
                      //   return (
                      //     <MessageInput //onSend={onSend}
                      //     />
                      //   );
                      // }}
                      // onSend={messages => onSend(messages, 'text')}
                      onSend={messages => onSend(messages)}
                      multiline
                      alwaysShowSend
                      scrollToBottom
                      minComposerHeight={40}
                      minInputToolbarHeight={60}
                      scrollToBottomComponent={scrollToBottomComponent}
                      renderSend={props => {
                        const {text} = props;
                        return (
                          <Send {...props} alwaysShowSend={true}>
                            <View
                              style={{
                                height: 45,
                                width: 70,
                              }}>
                              <AppIconButton
                                leftIcon={true}
                                iconAs="MaterialIcons"
                                name="attachment"
                                width={-45}
                                height={-23}
                                size={22}
                                txtColor={colors.default.white}
                                iconColor={colors.amber.amber300}
                                style={[
                                  {
                                    top: 22,
                                    right: 20,
                                  },
                                ]}
                                // onPress={() => {
                                //    setModalVisible(true)
                                // }}
                              />
                              <AppIconButton
                                leftIcon={true}
                                iconAs="MaterialIcons"
                                name="send"
                                width={-5}
                                size={32}
                                iconColor={colors.purplepro.purple7000}
                                IconStyle={{
                                  left: 20,
                                }}
                                size={22}
                                onPress={() => {
                                  props?.onSend(props);
                                }}
                              />
                            </View>
                          </Send>
                        );
                      }}
                      // onLongPress={(context, message) => {
                      //   let temp = [...msgIds];
                      //   temp.push(message._id);
                      //   setMsgIds(temp);
                      //   setShowDelete(true);
                      // }}
                      renderAvatar={null}
                      renderBubble={renderBubble}
                      listViewProps={{
                        scrollEventThrottle: 400,
                        onScroll: ({nativeEvent}) => {
                          if (isCloseToTop(nativeEvent)) {
                            setChatRange(chatRange + 20);
                          }
                        },
                      }}
                      user={{
                        // _id: '1',
                        _id: firestoreUser.uid,
                      }}
                    />
                    {/* {Platform.OS === 'android' && (
                      <KeyboardAvoidingView
                        behavior="padding"
                        style={{flex: 0.5, height: 0}}
                      />
                    )} */}
                    <KeyboardAvoidingView
                      behavior={
                        Platform.OS === 'ios'
                          ? 'padding'
                          : Platform.OS === 'android'
                          ? 'padding'
                          : 'height'
                      }
                      style={{flex: 0.5}}
                    />
                    {/* </KeyboardAwareScrollView> */}
                    {/* </KeyboardAvoidingView> */}
                    {/* </ScrollView> */}
                  </>
                ) : (
                  <>
                    <Text style={{marginTop: 20}}></Text>
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </Screen>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginLeft: 40,
    left: 15,
    // borderWidth: 1,
  },
  header: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    height: Dimensions.get('window').height / 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#767676',
    top: 10,
  },
  headingBox: {
    marginLeft: 2,
    flex: 1,
    // borderWidth: 1,
  },
  subject: {
    fontSize: 12,
    color: '#767676',
  },

  showDeleteView: {
    backgroundColor: colors.backgroud,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  showDeletButton: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
