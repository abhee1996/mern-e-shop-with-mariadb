import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
// import colors from '../config/colors';
// import config from '../config/config';
// import Screen from '../components/Screen';
// import Text from '../components/Text';
import {UserContext} from '../custom_hooks/UserContext';
// import Spinner from 'react-native-loading-spinner-overlay';
import * as SecureStore from 'expo-secure-store';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import OTPTextView from 'react-native-otp-textinput';

async function storeUser(userId, number, setUser) {
  await SecureStore.setItemAsync(
    'user',
    JSON.stringify({id: userId, number: number}),
  );
  setUser({id: userId, number: number});
}
async function getOtp(number) {
  const data = {number: number};
  const url = config.server + 'api/auth/sendOtp';
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {});
}

function OTPScreen({route, navigation}) {
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const [error, setError] = useState();
  const [otp, setOtp] = useState(route.params.otp);
  useEffect(() => {
    if (route.params.infoSaved) {
      setLoading(false);
      storeUser(route.params.userId, route.params.number, setUser);
    } else {
      setLoading(false);
      navigation.navigate('InfoScreen', {
        userId: route.params.userId,
        number: route.params.number,
      });
    }
  }, []);

  const sendOtp = async () => {
    const result = await getOtp(route.params.number);
    if (result.status) setOtp(result.otp);
    else setError('Could not send OTP,try again');
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.Image} source={require('../img/Splash.png')} />
      </View>
      <View style={styles.loginCard}>
        <Text style={styles.heading}>Enter OTP </Text>
        <OTPTextView
          ref={e => (this.input1 = e)}
          containerStyle={styles.textInputContainer}
          handleTextChange={text => this.setState({otpInput: text})}
          inputCount={4}
          keyboardType="numeric"
        />
        {/* <OTPInputView
          style={{width: '80%', height: 100}}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setLoading(true);
            if (code === otp) {
              if (route.params.infoSaved) {
                setLoading(false);
                storeUser(route.params.userId, route.params.number, setUser);
              } else {
                setLoading(false);
                navigation.navigate('InfoScreen', {
                  userId: route.params.userId,
                  number: route.params.number,
                });
              }
            } else setError('Wrong OTP');
            setLoading(false);
          }}
        /> */}
        <Text style={{color: colors.danger, fontSize: 14}}>{error}</Text>
        <Text style={{color: colors.medium, marginTop: 20, fontSize: 14}}>
          SMS Not received?
        </Text>
        <Text
          style={{
            color: 'dodgerblue',
            fontSize: 14,
            textDecorationLine: 'underline',
          }}
          onPress={e => {
            e.preventDefault();
            getOtp(route.params.number).then(result => {
              if (result.status) {
                setOtp(result.otp);
              } else setError('Could not send OTP , Check connection');
            });
          }}>
          Send Otp Again
        </Text>
      </View>
      {/* <Spinner
        visible={loading}
        textContent={'Matching OTP...'}
        textStyle={styles.spinnerTextStyle}
      /> */}
    </Screen>
  );
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colors.secondary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 5,
  },
  loginCard: {
    backgroundColor: colors.white,
    borderRadius: 5,
    flex: 2,
    alignItems: 'center',
    padding: 10,
    paddingTop: 25,
    margin: 10,
    marginTop: 15,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
  },
  Image: {
    width: '65%',
    height: '100%',
  },
  heading: {
    color: '#da8a67',
    marginBottom: 15,
    fontSize: 18,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    fontSize: 20,
    color: colors.black,
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
  },

  underlineStyleHighLighted: {
    borderColor: colors.secondary,
  },
});
export default OTPScreen;
