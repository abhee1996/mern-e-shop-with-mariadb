import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useToast} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import FormContainer from '../../Component/FormContainer';
import InputField from '../../Component/InputField';
import Error from '../../Component/Error';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import * as Yup from 'yup';
import config from '../../config/config';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import colors from '../../config/colors';
import {getUserProfile, userlogout} from '../../Redux/actions/Auth.Action';
import {DevSettings} from 'react-native';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
const {width, height} = Dimensions.get('window');
const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().label('Email'),
});
const Register = props => {
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [userProfile, setuserProfile] = useState();
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthGlobal);

  const UserId = context?.userValue?.user?.userId;
  const isUser = context?.userValue?.user?.isUser;

  const toast = useToast();

  let registerURL = `${config.server}/users/auth/register`;
  const register = async () => {
    if (name === '' || email === '' || password === '') {
      setError('Please fill all credientials to register');
    } else {
      let user = {
        name: name,
        email: email,
        password: password,
      };

      await axios
        .post(registerURL, user)
        .then(res => {
          if (res?.status == 200) {
            context?.registerWithFireStore(name, email, password, true, false);
            toast.show({
              title: 'Registeration Successfully',
              placement: 'top-right',
              color: 'white',
              bgColor: 'green.300',
            });
            setTimeout(() => {
              props.navigation.navigate('Login');
            }, 500);
          }
        })
        .catch(err => {
          console.warn('error in registeration', err);
          toast.show({
            title: 'Registeration failed',
            placement: 'top-right',
          });
        });
    }
  };
  const updateUser = () => {
    if (
      (name === '' || username === '' || email === '' || password === '',
      phone === '',
      city === '',
      address === '',
      country === '')
    ) {
      setError('Please fill all credientials to save user profile');
    } else {
      let user = {
        name: name,
        username: username,
        phone: phone,
        email: email,
        city: city,
        address: address,
        zipcode: zipcode,
        country: country,
      };
      let updateUserURL = `${config.server}/users/auth/userdetail/update/${props?.userProfile?.id}`;

      axios
        .put(updateUserURL, user)
        .then(res => {
          if (res.status == 200) {
            console.log('res', res);
            toast.show({
              title: 'Update User Successfully',
              placement: 'top-right',
              color: 'white',
              bgColor: 'green.300',
            });
          }
        })
        .catch(err => {
          console.warn('error in User Update', err);
          toast.show({
            title: 'User Update failed',
            placement: 'top-right',
          });
        });
    }
  };
  useEffect(() => {
    if (!isUser) {
      setLoading(false);
    }
    getUserProfile(UserId).then(_res => {
      setuserProfile(_res);
      if (isUser) {
        setName(_res.name);
        setUserName(_res.username);
        setEmail(_res.email);
        setPhone(_res.phone);
        setLoading(false);
      }
    });
    // console.log('validationSchema', validationSchema);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </>
      ) : (
        <>
          {/* {props?.isUser ? ( */}
          <>
            <KeyboardAwareScrollView
              viewIsInsideTabBar={true}
              // extraHeight={20}
              enableOnAndroid={true}>
              <FormContainer
                title={props?.isUser ? 'User Profile' : 'Create Account'}>
                <InputField
                  placeholder="Name"
                  name="name"
                  value={name}
                  id={'name'}
                  onChangeText={text => setName(text)}
                />
                {props?.isUser ? (
                  <>
                    <InputField
                      placeholder="User Name"
                      name="username"
                      value={username}
                      id={'username'}
                      onChangeText={text => setUserName(text)}
                    />
                    <InputField
                      placeholder="Phone Number"
                      name="phone"
                      id={'phone'}
                      value={phone}
                      keyboardType={'numeric'}
                      onChangeText={text => setPhone(text)}
                    />
                  </>
                ) : null}
                <InputField
                  placeholder="Email"
                  name="email"
                  value={email}
                  id={'email'}
                  onChangeText={text => setEmail(text.toLowerCase())}
                />
                {!props?.isUser ? (
                  <InputField
                    placeholder="Password"
                    name="password"
                    value={password}
                    id={'password'}
                    password
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                  />
                ) : null}
                {props?.isUser ? (
                  <>
                    <InputField
                      placeholder="City"
                      name="city"
                      value={city}
                      id={'city'}
                      // secureTextEntry={true}
                      onChangeText={text => setCity(text)}
                    />
                    <InputField
                      placeholder="Address"
                      name="address"
                      id={'address'}
                      value={address}
                      onChangeText={text => setAddress(text)}
                    />
                    <InputField
                      placeholder="Zipcode"
                      name="zipcode"
                      id={'zipcode'}
                      value={zipcode}
                      keyboardType={'numeric'}
                      onChangeText={text => setZipcode(text)}
                    />
                    <InputField
                      placeholder="Country"
                      name="country"
                      value={country}
                      id={'country'}
                      onChangeText={text => setCountry(text)}
                    />
                  </>
                ) : null}
                <View>{error ? <Error message={error} /> : null}</View>
                <View>
                  <AppIconButton
                    title={props?.isUser ? 'save' : 'Register'}
                    size={25}
                    width={25}
                    height={4}
                    marginX="3%"
                    marginY="1%"
                    borderRadius={0}
                    buttonBgColor={colors.successpro.success500}
                    txtColor={colors.default.white}
                    onPress={() => {
                      if (props?.isUser) {
                        updateUser();
                      } else {
                        console.log('registering for both local and firebase');
                        register();
                        context?.registerWithFireStore(
                          name,
                          email,
                          password,
                          true,
                          false,
                        );
                      }
                    }}
                  />
                </View>
                <View>
                  <AppIconButton
                    title={props?.isUser ? 'logout' : 'Back To Login'}
                    size={25}
                    width={25}
                    height={4}
                    marginX="3%"
                    marginY="1%"
                    borderRadius={0}
                    buttonBgColor={colors.warningpro.warning500}
                    txtColor={colors.default.white}
                    onPress={() => {
                      if (props?.isUser) {
                        userlogout(props?.context?.dispatch);
                        DevSettings.reload();
                      } else {
                        props.navigation.navigate('Login');
                      }
                    }}
                  />
                </View>
              </FormContainer>
            </KeyboardAwareScrollView>
          </>
          {/* ) : ( */}
          <>
            {/* <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                extraHeight={200}
                enableOnAndroid={true}>
                <FormContainer
                  title="Create Account"
                  //style={{borderWidth: 4, marginBottom: 0}}
                >
                  <InputField
                    placeholder="Name"
                    name="name"
                    value={name}
                    id={'name'}
                    onChangeText={text => setName(text)}
                  />
                  {/* <InputField
                    placeholder="User Name"
                    name="username"
                    value={username}
                    id={'username'}
                    onChangeText={text => setUserName(text)}
                  /> 

                  <InputField
                    placeholder="Email"
                    name="email"
                    value={email}
                    id={'email'}
                    onChangeText={text => setEmail(text.toLowerCase())}
                  />
                  <InputField
                    placeholder="Password"
                    name="password"
                    value={password}
                    id={'password'}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                  />

                  <View>{error ? <Error message={error} /> : null}</View>
                  <View>
                    <AppIconButton
                      title="Register"
                      size={25}
                      width={25}
                      height={4}
                      marginX="3%"
                      marginY="1%"
                      borderRadius={0}
                      buttonBgColor={colors.successpro.success500}
                      txtColor={colors.default.white}
                      onPress={() => register()}
                    />
                  </View>
                  <View>
                    <AppIconButton
                      title="Back To Login"
                      size={25}
                      width={25}
                      height={4}
                      marginX="3%"
                      marginY="1%"
                      borderRadius={0}
                      buttonBgColor={colors.warningpro.warning500}
                      txtColor={colors.default.white}
                      onPress={() => props.navigation.navigate('Login')}
                    />
                  </View>
                </FormContainer>
              </KeyboardAwareScrollView> */}
          </>
          {/* )} */}
        </>
      )}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  spinner: {
    height: height / 2,
    alignSelf: 'center',
  },
});
