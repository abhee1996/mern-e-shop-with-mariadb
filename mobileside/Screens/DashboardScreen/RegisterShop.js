import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormContainer from '../../Component/FormContainer';
import InputField from '../../Component/InputField';
import colors from '../../config/colors';
import AppIconButton from '../../Component/AppButtons/AppIconButton';
import Error from '../../Component/Error';

import config from '../../config/config';
import axios from 'axios';
import AuthGlobal from '../../Redux/AuthStore/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'native-base';
import * as Yup from 'yup';
import {getShopDetail} from '../../Redux/actions/ShopAuth.action';
import {saveCurrentShop} from '../../Redux/actions/ShopAuth.action';
import {ActivityIndicator} from 'react-native';
const {width, height} = Dimensions.get('window');

const RegisterShop = props => {
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [number, setNumber] = useState('');
  const [discription, setDiscription] = useState('');
  const [address, setAddress] = useState('');
  const [shop, setShop] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthGlobal);
  const toast = useToast();

  const shopValue = context?.shopValue;
  const UserId = context?.userValue?.user?.userId;

  const shopId = shopValue?.shop?.shopId;

  const isShopAuthenticated = props?.isShopAuthenticated;

  useEffect(() => {
    if (!shopValue.shop) {
      setShop(null);
      setLoading(false);
    } else {
      getShopDetail(shopId).then(_res => {
        setShop(_res),
          setName(_res?.name),
          setEmail(_res?.email),
          setOwner(_res?.owner),
          setNumber(_res?.number);
        setDiscription(_res?.discription);
        setType(_res?.type);
        setAddress(_res?.place);
        setLoading(false);
      });
    }
    AsyncStorage.getItem('shop_jwt')
      .then(res => {
        setToken(res);
        // console.log('token', token);
      })
      .catch(error => console.log('error', error));
  }, []);

  const shopAction = response => {
    try {
      if (response.status == 200) {
        toast.show({
          title: `${
            isShopAuthenticated
              ? 'Shop Updated Successfully'
              : 'Registeration Successfully'
          }`,
          placement: 'top-right',
          color: 'white',
          bgColor: 'green.300',
        });
        {
          isShopAuthenticated
            ? null
            : setTimeout(() => {
                props.navigation.navigate('Login');
              }, 500);
        }
      }
    } catch (err) {
      console.warn('error in registeration', err);
      toast.show({
        title: `${
          isShopAuthenticated ? 'Shop Updated failed' : 'Registeration failed'
        }`,
        placement: 'top-right',
      });
    }
  };
  const saveShop = () => {
    if (
      (name === '' || owner === '' || email === '' || password === '',
      number === '')
    ) {
      setError('Please fill all credientials to register');
    } else {
      if (isShopAuthenticated) {
        console.log('update shop data');

        const putshop = {
          name: name,
          owner: owner,
          email: email,
          discription: discription,
          place: address,
          type: type,
          number: number,
        };
        saveCurrentShop(isShopAuthenticated, putshop, shopId).then(_res => {
          shopAction(_res);
          setLoading(false);
        });
      } else {
        console.log('register new shop');
        const newshop = {
          name: name,
          owner: owner,
          email: email,
          password: password,
          number: number,
        };

        // saveCurrentShop(isShopAuthenticated, newshop).then(_res => {
        //   shopAction(_res);
        //   setLoading(false);
        // });
        // context?.registerWithFireStore(name, email, password, false, true);
      }
    }
  };
  const validateEmail = em => {
    // if (
    //   !em.match(
    //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   )
    // ) {
    //   return setError('please input a valid email');
    // }
    return em.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  return (
    <View>
      {loading ? (
        <>
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="red" />
          </View>
        </>
      ) : (
        <>
          {isShopAuthenticated ? (
            <>
              <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                // extraHeight={360}
                enableOnAndroid={true}>
                <FormContainer //title="Shop Profile"
                >
                  <InputField
                    placeholder="Name"
                    name="name"
                    value={name}
                    id={'name'}
                    onChangeText={text => setName(text)}
                  />
                  <InputField
                    placeholder="Owner Name"
                    name="owner"
                    value={owner}
                    id={'owner'}
                    onChangeText={text => setOwner(text)}
                  />
                  <InputField
                    placeholder="Email "
                    name="email"
                    value={email}
                    id={'email'}
                    onChangeText={text => setEmail(text.toLowerCase())}
                  />

                  <InputField
                    placeholder="Phone Number"
                    name="number"
                    id={'number'}
                    // value={number}
                    value={number?.toString()}
                    keyBoardType={'numeric'}
                    onChangeText={text => setNumber(text)}
                  />
                  <InputField
                    placeholder="Type"
                    name="type"
                    value={type}
                    id={'type'}
                    onChangeText={text => setType(text.toLowerCase())}
                  />
                  <InputField
                    placeholder="Discription"
                    name="discription"
                    value={discription}
                    id={'discription'}
                    onChangeText={text => setDiscription(text)}
                  />

                  <InputField
                    placeholder="Address"
                    name="place"
                    value={address}
                    id={'place'}
                    onChangeText={text => setAddress(text)}
                  />

                  <View>{error ? <Error message={error} /> : null}</View>
                  <View
                    style={{
                      marginVertical: 20,
                    }}>
                    <AppIconButton
                      title="Save"
                      size={25}
                      width={25}
                      height={4}
                      marginX="3%"
                      marginY="1%"
                      borderRadius={0}
                      buttonBgColor={colors.successpro.success500}
                      txtColor={colors.default.white}
                      onPress={() => saveShop()}
                    />
                  </View>
                </FormContainer>
              </KeyboardAwareScrollView>
            </>
          ) : (
            <>
              <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                extraHeight={200}
                enableOnAndroid={true}>
                <FormContainer title="Create Shop Account">
                  <InputField
                    placeholder="Shop Name"
                    name="name"
                    value={name}
                    id={'name'}
                    onChangeText={text => setName(text)}
                    onEndEditing={() => {
                      if (!name) {
                        setErrors({name: 'please input name'});
                        // handleErrors({name: 'please input name'}, 'name');
                      }
                    }}
                    onFocus={() => {
                      if (!name) {
                        setErrors({name: 'please input name'});
                        // handleErrors({name: 'please input name'}, 'name');
                      }
                    }}
                  />
                  {/* {errors?.name && (
                    <View>

                      {errors?.name ? <Error message={errors?.name} /> : null}
                    </View>
                  )} */}
                  <InputField
                    placeholder="Email "
                    name="email"
                    value={email}
                    id={'email'}
                    onChangeText={text => setEmail(text.toLowerCase())}
                    onEndEditing={() => {
                      // if (!email) {
                      //   // setErrors({email: 'please input email'});
                      //   setErrors(prevError => [
                      //     ...prevError,
                      //     {email1: 'please input email'},
                      //   ]);
                      //   // handleErrors({email: 'please input email'}, 'email');
                      // } else
                      if (!validateEmail(email)) {
                        // setErrors();
                        console.log(
                          '!validateEmail(email)',
                          !validateEmail(email),
                        );
                        setErrors(prevError => [
                          ...prevError,
                          {email2: 'please input a valid email'},
                        ]);
                        console.log('errors', errors);
                        // handleErrors(
                        //   {email: 'please input a valid email'},
                        //   'email',
                        // );
                      } else {
                        setErrors([]);
                      }
                    }}
                    //
                    onFocus={() => {
                      setErrors([]);
                      if (!email) {
                        // setErrors({email: 'please input email'});
                        setErrors(prevError => [
                          ...prevError,
                          {email1: 'please input email'},
                        ]);
                        // handleErrors({email: 'please input email'}, 'email');
                      }
                    }}
                  />

                  <Text>
                    {/* <Text>{errors ? errors[0]?.email1 : ''}</Text> */}

                    {/* {console.log(

                      '__errors',
                      errors?.filter(err => {
                        return err;
                      }),
                    )} */}
                    {/* {
                      errors?.filter(err => {
                        return err;
                      }).email1
                    } */}
                    {/* {errors &&
                      errors?.forEach(err => {
                        if (err?.email1) return <Error message={err?.email1} />;
                        else if (err?.email2)
                          return <Error message={err?.email2} />;
                        else return null;
                      })} */}
                  </Text>
                  <InputField
                    placeholder="Password"
                    name="password"
                    value={password}
                    id={'password'}
                    password
                    onChangeText={text => setPassword(text)}
                  />

                  <View>{error ? <Error message={error} /> : null}</View>
                  <View>
                    <AppIconButton
                      title="Register as Shop"
                      size={25}
                      width={25}
                      height={4}
                      marginX="3%"
                      marginY="1%"
                      borderRadius={0}
                      buttonBgColor={colors.successpro.success500}
                      txtColor={colors.default.white}
                      onPress={() => saveShop()}
                    />
                  </View>
                  <View>
                    <AppIconButton
                      title="Login as Shop"
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
              </KeyboardAwareScrollView>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default RegisterShop;

const styles = StyleSheet.create({
  spinner: {
    height: height / 2,
    alignSelf: 'center',
  },
});
// const saveShop = async () => {
// let registerShopURL = `${config.server}/shop/auth/new`;
// let updateShopURL = `${config.server}/shop/put/${shopId}`;
//   if (
//     (name === '' || owner === '' || email === '' || password === '',
//     number === '')
//   ) {
//     setError('Please fill all credientials to register');
//   } else {
//     let putshop = {
//       name: name,
//       owner: owner,
//       email: email,
//       discription: discription,
//       place: address,
//       type: type,
//     };
//     const config = {
//       headers: {
//         // Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     if (isShopAuthenticated) {
//       console.log('update shop data');
//       const putResponse = await axios.put(updateShopURL, putshop, config);
//       let result = putResponse.then(res => {
//         return res;
//       });
//       shopAction(result);
//       // shopAction(updateShopURL, shop, config);
//     } else {
//       console.log('register new shop');
//       const newshop = {
//         name: name,
//         owner: owner,
//         email: email,
//         password: password,
//         number: number,
//       };
//       let newResponse = await axios.post(registerShopURL, newshop, config);
//       let result = newResponse.then(res => {
//         return res;
//       });

//       shopAction(result);
//     }
//   }
// };

// const [inputs, setInputs] = useState({
//   name: name,
//   email: email,
//   owner: owner,
//   password: password,
//   type: type,
//   number: number,
//   discription: discription,
//   address: address,
// });
// const validateEmail = em => {
//   if (
//     !em.match(
//       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     )
//   ) {
//     return setError('please input a valid email');
//   }
//   return;
// };
// function validate() {
//   Keyboard.dismiss();
//   let valid = true;
//   const validateEmail = em => {
//     return em?.match(
//       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );
//   };
//   if (!email) {
//     setError('please input email');
//   } else if (!validateEmail(email)) {
//     setError('please input a valid email');
//   } else if (!name) {
//     setError('please input name');
//   } else if (!password) {
//     setError('please input password');
//   } else if (!password.length > 4 || !password.length < 16) {
//     setError('please  password must be in between 4 to 16 chracters');
//   }
// }
// function handleErrors(err, input) {
//   setErrors(prevError => ({...prevError, [input]: err}));
// }
// function handleOnChangeText(setState, text, input) {
//   console.log('text', text, 'name', name);
//   setState(preValue => [...preValue, ...text]);
// }
//   <KeyboardAwareScrollView
//   viewIsInsideTabBar={true}
//   extraHeight={200}
//   enableOnAndroid={true}>
//   <AppLoader visible={loading} loaderColor="#000" />
//   <FormContainer title="Create Shop Account">
//     <InputField
//       placeholder="Shop Name"
//       name="name"
//       value={name}
//       id={'name'}
//       // error={errors?.name}
//       onEndEditing={() => {
//         if (!name) {
//           // setError('please input name');
//           //setErrors({name: 'please input name'});
//           handleErrors({name: 'please input name'}, 'name');
//         }
//       }}
//       onFocus={() => {
//         if (!name) {
//           // setError('please input name');
//           //setErrors({name: 'please input name'});
//           handleErrors({name: 'please input name'}, 'name');
//         }
//       }}
//       onChangeText={text => {
//         //handleOnChangeText(setName, text, name);
//         setName(text);
//       }}
//     />
//     {errors?.name && (
//       <View>
//         {errors?.name ? <Error message={errors?.name} /> : null}
//       </View>
//     )}
//     <InputField
//       placeholder="Email "
//       name="email"
//       value={email}
//       // error={errors?.email}
//       id={'email'}
//       onEndEditing={() => {
//         console.log('editing end');
//         if (!email) {
//           // setErrors({email: 'please input email'});
//           handleErrors({email: 'please input email'}, 'email');
//         } else if (!validateEmail(email)) {
//           // setErrors({email: 'please input a valid email'});
//           handleErrors(
//             {email: 'please input a valid email'},
//             'email',
//           );
//         }
//       }}

//       onChangeText={text => {
//         //handleOnChangeText(setEmail, text, 'email');

//         setEmail(text.toLowerCase());
//       }}
//     />
//     {errors?.email && (
//       <View>
//         {errors?.email ? <Error message={errors?.email} /> : null}
//       </View>
//     )}
//     <InputField
//       placeholder="Password"
//       name="password"
//       value={password}
//       id={'password'}
//       // error={errors?.password}
//       password
//       onEndEditing={() => {
//         console.log('editing end');
//         if (!password) {
//           setErrors({password: 'please input password'});
//         } else if (!validateEmail(password)) {
//           setErrors({password: 'please input a valid password'});
//         }
//       }}
//       onChangeText={text => {
//         setPassword(text);
//         //handleOnChangeText(setPassword, text, 'password');
//       }}
//     />
//     {errors?.password && (
//       <View>
//         {errors?.password ? (
//           <Error message={errors?.password} />
//         ) : null}
//       </View>
//     )}

//     {/* <View>{error ? <Error message={error} /> : null}</View> */}
//     <View>
//       <AppIconButton
//         title="Register as Shop"
//         size={25}
//         width={25}
//         height={4}
//         marginX="3%"
//         marginY="1%"
//         borderRadius={0}
//         buttonBgColor={colors.successpro.success500}
//         txtColor={colors.default.white}
//         onPress={() => saveShop()}
//       />
//     </View>
//     <View>
//       <AppIconButton
//         title="Login as Shop"
//         size={25}
//         width={25}
//         height={4}
//         marginX="3%"
//         marginY="1%"
//         borderRadius={0}
//         buttonBgColor={colors.warningpro.warning500}
//         txtColor={colors.default.white}
//         onPress={() => props.navigation.navigate('Login')}
//       />
//     </View>
//   </FormContainer>
// </KeyboardAwareScrollView>
