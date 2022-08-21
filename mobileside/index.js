/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import store from './Redux/store';
import Auth from './Redux/AuthStore/Auth.store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthGlobal from './Redux/AuthStore/AuthGlobal';
import SplashScreen from 'react-native-splash-screen';
import {getUserProfile} from './Redux/actions/Auth.Action';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'tomato',
//     accent: 'yellow',
//   },
// };
const newColorTheme = {
  brand: {
    900: '#8287af',
    800: '#7c83db',
    700: '#b3bef6',
  },
};
const getAsyncData = async () => {
  //setUser, setShop, setAuthContext) => {
  try {
    // await  AsyncStorage.getItem('shop_jwt').then(res => {
    // });
    // await AsyncStorage.getItem('shop_jwt_decoded').then(res => {
    //   setShop(JSON.parse(res));
    // });
    // // for user
    // await AsyncStorage.getItem('user_jwt_decoded').then(res => {
    //   setUser(JSON.parse(res));
    // });
    await SplashScreen.hide();
  } catch (error) {
    console.warn(error);
  } finally {
  }
};
const theme = extendTheme({colors: newColorTheme});
export default function Main() {
  const context = React.useContext(AuthGlobal);
  const [user, setUser] = React.useState(null);
  const [shop, setShop] = React.useState(null);
  React.useEffect(() => {
    getAsyncData(); //(setUser, setShop, setAuthContext);
    //SplashScreen.hide();
  }, []);

  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <App />
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
}
AppRegistry.registerComponent(appName, () => Main);
