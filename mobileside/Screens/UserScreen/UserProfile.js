import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {Container} from 'native-base';
import axios from 'axios';
import config from '../../config/config';
import {userlogout, getUserProfile} from '../../Redux/actions/Auth.Action';
import {DevSettings} from 'react-native';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import Register from './Register';
const {width, height} = Dimensions.get('window');
const UserProfile = props => {
  const context = useContext(AuthGlobal);
  console.log('context', context);
  const UserId = context?.userValue?.userId;
  const [userProfile, setuserProfile] = useState();
  const isUser = context.userValue.isUser;
  console.log('isUser', isUser);
  useEffect(() => {
    if (isUser === false || isUser === null) {
      props.navigation.navigate('Login');
    }
    const asyncAuthURL = `${config.server}/users/auth/userprofile/${UserId}`;
    getUserProfile(UserId).then(res => {
      setuserProfile(res);
    });
    // AsyncStorage.getItem('user_jwt').then(res => {
    //   let requestBody = {
    //     headers: {
    //       Authorization: `Bearer ${res}`,
    //     },
    //   };
    //   axios.get(asyncAuthURL, requestBody).then(user => {
    //     setuserProfile(user.data);
    //   });
    // });
  }, [isUser]);

  return (
    <>
      {/* <Container style={styles.container}> */}
      <ScrollView contentContainerStyle={styles.subContainer}>
        <View style={{fontSize: 30}}>
          <Text>{userProfile?.name}</Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{margin: 5}}>{userProfile?.email}</Text>
          <Text style={{margin: 5}}>{userProfile?.phone}</Text>
        </View>
        <View style={styles.regform}>
          <Register
            isUser={isUser}
            context={context}
            userProfile={userProfile}
          />
        </View>
        {/* <View style={{marginTop: 80}}>
            <Button
              title="sign out"
              onPress={() => {
                userlogout(context.dispatch);
                DevSettings.reload();
              }}
            />
          </View> */}
      </ScrollView>
      {/* </Container> */}
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
  },
  regform: {
    alignItems: 'center',
    // alignSelf: 'center',
    justifyContent: 'center',
    // height: height - 20,
    // margin: 5,
    // left: 15,
    // borderWidth: 2,
  },
  subContainer: {alignItems: 'center'},
});
