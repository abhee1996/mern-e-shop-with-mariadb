import React, {useEffect, useReducer, useState} from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthReducer from '../reducers/Auth.reducer';
import AuthGlobal from './AuthGlobal';
import {
  createStore,
  configureStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import AuthShopReducer from '../reducers/AuthShop.reducer';
import {setCurrentUser} from '../actions/Auth.Action';
import {setCurrentShop} from '../actions/ShopAuth.action';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const getAsyncData = async (setUser, setShop) => {
  try {
    //for shop
    await AsyncStorage.getItem('shop_jwt_decoded').then(res => {
      setShop(JSON.parse(res));
    });
    // for user
    await AsyncStorage.getItem('user_jwt_decoded').then(res => {
      setUser(JSON.parse(res));
    });
  } catch (error) {
    console.warn(error);
  }
};
const Auth = props => {
  const [stateUser, dispatch] = useReducer(AuthReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [stateShop, dispatchShop] = useReducer(AuthShopReducer, {
    isShopAuthenticated: null,
    shop: {},
  });
  const [user, setUser] = React.useState(null);
  const [firestoreUser, setFirestoreUser] = React.useState(null);
  const [shop, setShop] = React.useState(null);
  const [showChild, setShowChild] = useState(false);
  const userValue = React.useMemo(() => ({user, setUser}), [user, setUser]);
  const shopValue = React.useMemo(() => ({shop, setShop}), [shop, setShop]);
  useEffect(() => {
    setShowChild(true);
    getAsyncData(setUser, setShop);

    // AsyncStorage.
    if (AsyncStorage.user_login_Jwt_Token) {
      AsyncStorage.setItem(`stateUser`, stateUser);

      const decoded = AsyncStorage.user_login_Jwt_Token
        ? AsyncStorage.user_login_Jwt_Token
        : '';
      if (setShowChild) {
        dispatch(setCurrentUser(jwt_decode(decoded)));
      }
    }
    // Shop //
    else if (AsyncStorage.shop_jwt) {
      AsyncStorage.setItem(`stateShop`, stateShop);

      const decoded = AsyncStorage.shop_jwt ? AsyncStorage.shop_jwt : '';

      if (showShopChild === true) {
        dispatch(setCurrentShop(jwt_decode(decoded)));
      }
    }
    return () => {
      setShowChild(false);
    };
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          stateShop,
          dispatch,
          dispatchShop,
          userValue,
          shopValue,
          setFirestoreUser,
          firestoreUser,
          loginWithFireStore: async (email, password) => {
            try {
              const _isLogin = await auth().signInWithEmailAndPassword(
                email,
                password,
              );
              console.log('isLogin', _isLogin);
              return _isLogin;
            } catch (error) {
              console.log('fire auth login error', error);
            }
          },
          registerWithFireStore: async (
            name,
            email,
            password,
            isUser,
            isShop,
          ) => {
            try {
              console.log('registering in firebase');
              const res = await auth().createUserWithEmailAndPassword(
                email,
                password,
              ); //
              console.log('res auth create user', res);
              if (res) {
                if (isUser == true) {
                  console.log('isUser:>', isUser);
                  await firestore()
                    .collection('eshop')
                    .doc('eShop-hV1O5KpI9ZhoOqjA0CuZqcJfdyl2')
                    .collection('users')
                    .doc(res.user.uid)
                    .set({
                      name: name,
                      email: res.user.email,
                      uid: res.user.uid,
                      isUser: isUser,
                      isShop: isShop,
                    });
                } else {
                  console.log('isShop:', isShop);
                  await firestore()
                    .collection('eshop')
                    .doc('eShop-hV1O5KpI9ZhoOqjA0CuZqcJfdyl2')
                    .collection('shops')
                    .doc(res.user.uid)
                    .set({
                      name: name,
                      email: res.user.email,
                      shopId: res.user.uid,
                      isUser: isUser,
                      isShop: isShop,
                    });
                }
              }
            } catch (error) {
              console.log('fire auth register error', error);
            }
          },
          logoutWithFireStore: async () => {
            try {
              await auth().signOut();
            } catch (error) {
              console.log('fire auth signout error', error);
            }
          },
        }}>
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};
export default Auth;

// import React, {useEffect, useReducer, useState} from 'react';
// import jwt_decode from 'jwt-decode';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   createStore,
//   configureStore,
//   combineReducers,
//   applyMiddleware,
// } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
// import AuthReducer from '../reducers/Auth.reducer';
// import AuthShopReducer from '../reducers/AuthShop.reducer';
// import AuthGlobal from './AuthGlobal';
// import {setCurrentUser} from '../actions/Auth.Action';
// import {setCurrentShop} from '../actions/ShopAuth.action';
// const reducers = combineReducers({
//   Auth: AuthReducer,
//   AuthShop: AuthShopReducer,
// });
// const Auth = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(thunkMiddleware)),
// );
// export default Auth;
// const Auth = props => {
//   const [stateAuth, dispatch] = useReducer(AuthReducer, {
//     userAuth: {
//       isAuthenticated: null,
//       user: {},
//     },
//     shopAuth: {
//       isShopAuthenticated: null,
//       shop: {},
//     },
//   });
//   // const [stateShop, dispatchShop] = useReducer(AuthShopReducer, {
//   //   isShopAuthenticated: null,
//   //   shop: {},
//   // });

//   const [showChild, setShowChild] = useState(false);
//   const [showShopChild, setShowShopChild] = useState(false);

//   useEffect(() => {
//     setShowChild(true);
//     setShowShopChild(true);
//     // AsyncStorage. //User//
//     if (AsyncStorage.user_login_Jwt_Token) {
//       const decoded = AsyncStorage.user_login_Jwt_Token
//         ? AsyncStorage.user_login_Jwt_Token
//         : '';
//       if (setShowChild) {
//         dispatch(setCurrentUser(jwt_decode(decoded)));
//       }
//     }
//     // Shop //
//     if (AsyncStorage.shop_jwt) {
//       console.log('shop_jwt');
//       const decoded = AsyncStorage.shop_jwt ? AsyncStorage.shop_jwt : '';
//       if (showShopChild === true) {
//         dispatch(setCurrentShop(jwt_decode(decoded)));
//       }
//     }

//     return () => {
//       setShowChild(false);
//       setShowShopChild(false);
//     };
//   }, []);
//   // if (!showChild) {
//   //   return null;
//   // }
//   // else {
//   //   return (
//   //     <AuthGlobal.Provider
//   //       value={{
//   //         stateUser,
//   //         stateShop,
//   //         dispatch,
//   //       }}>
//   //       {props.children}
//   //     </AuthGlobal.Provider>
//   //   );
//   // }
//   if (!showChild && !showShopChild) {
//     return null;
//   } else if (showChild) {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           stateAuth,
//           // stateShop,
//           dispatch,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   } else {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           // stateUser,
//           stateAuth,
//           // stateShop,
//           dispatch,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   }
// };

// export default Auth;

//// ///////////////
//               //
// auth store 1   //
//                //
////////////////////
// const Auth = props => {
//   const [stateAuth, dispatch] = useReducer(AuthReducer, {
//     userAuth: {
//       isAuthenticated: null,
//       user: {},
//     },
//     shopAuth: {
//       isShopAuthenticated: null,
//       shop: {},
//     },
//   });
//   // const [stateShop, dispatchShop] = useReducer(AuthShopReducer, {
//   //   isShopAuthenticated: null,
//   //   shop: {},
//   // });

//   const [showChild, setShowChild] = useState(false);
//   const [showShopChild, setShowShopChild] = useState(false);

//   useEffect(() => {
//     setShowChild(true);
//     setShowShopChild(true);
//     // AsyncStorage. //User//
//     if (AsyncStorage.user_login_Jwt_Token) {
//       const decoded = AsyncStorage.user_login_Jwt_Token
//         ? AsyncStorage.user_login_Jwt_Token
//         : '';
//       if (setShowChild) {
//         dispatch(setCurrentUser(jwt_decode(decoded)));
//       }
//     }
//     // Shop //
//     if (AsyncStorage.shop_jwt) {
//       console.log('shop_jwt');
//       const decoded = AsyncStorage.shop_jwt ? AsyncStorage.shop_jwt : '';
//       if (showShopChild === true) {
//         dispatch(setCurrentShop(jwt_decode(decoded)));
//       }
//     }

//     return () => {
//       setShowChild(false);
//       setShowShopChild(false);
//     };
//   }, []);
//   // if (!showChild) {
//   //   return null;
//   // }
//   // else {
//   //   return (
//   //     <AuthGlobal.Provider
//   //       value={{
//   //         stateUser,
//   //         stateShop,
//   //         dispatch,
//   //       }}>
//   //       {props.children}
//   //     </AuthGlobal.Provider>
//   //   );
//   // }
//   if (!showChild && !showShopChild) {
//     return null;
//   } else if (showChild) {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           stateAuth,
//           // stateShop,
//           dispatch,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   } else {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           // stateUser,
//           stateAuth,
//           // stateShop,
//           dispatch,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   }
// };
//// ///////////////
//               //
// auth store 2   //
//                //
////////////////////
// const Auth = props => {
//   const [stateUser, dispatch] = useReducer(AuthReducer, {
//     isAuthenticated: null,
//     user: {},
//   });
//   const [stateShop, dispatchShop] = useReducer(AuthShopReducer, {
//     isShopAuthenticated: null,
//     shop: {},
//   });
//   const reducers = combineReducers({
//     Auth: AuthReducer,
//     AuthShop: AuthShopReducer,
//   });
//   const [showChild, setShowChild] = useState(false);
//   const [showShopChild, setShowShopChild] = useState(false);
//   const store = createStore(
//     reducers,
//     composeWithDevTools(applyMiddleware(thunkMiddleware)),
//   );
//   useEffect(() => {
//     setShowChild(true);
//     setShowShopChild(true);
//     // AsyncStorage. //User//
//     if (AsyncStorage.user_login_Jwt_Token) {
//       const decoded = AsyncStorage.user_login_Jwt_Token
//         ? AsyncStorage.user_login_Jwt_Token
//         : '';
//       if (setShowChild) {
//         dispatch(setCurrentUser(jwt_decode(decoded)));
//       }
//     }
//     // Shop //
//     if (AsyncStorage.shop_jwt) {
//       console.log('shop_jwt');
//       const decoded = AsyncStorage.shop_jwt ? AsyncStorage.shop_jwt : '';
//       if (showShopChild === true) {
//         dispatchShop(setCurrentShop(jwt_decode(decoded)));
//       }
//     }

//     return () => {
//       setShowChild(false);
//       setShowShopChild(false);
//     };
//   }, []);
//   // if (!showChild) {
//   //   return null;
//   // }
//   // else {
//   //   return (
//   //     <AuthGlobal.Provider
//   //       value={{
//   //         stateUser,
//   //         stateShop,
//   //         dispatch,
//   //       }}>
//   //       {props.children}
//   //     </AuthGlobal.Provider>
//   //   );
//   // }
//   if (!showChild && !showShopChild) {
//     return null;
//   } else if (showChild) {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           stateUser,
//           // stateShop,
//           dispatch,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   } else {
//     return (
//       <AuthGlobal.Provider
//         value={{
//           // stateUser,
//           stateShop,
//           dispatchShop,
//         }}>
//         {props.children}
//       </AuthGlobal.Provider>
//     );
//   }
// };
