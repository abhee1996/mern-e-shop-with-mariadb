import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from 'react-native';
import React from 'react';
import colors from '../../config/colors';
const {width, height} = Dimensions.get('window');

const AppLoader = ({visible = false, loaderColor}) => {
  return (
    <>
      {visible && (
        <View style={[style.container, {height, width}]}>
          <View
            style={{
              height: 70,
              backgroundColor: colors.default.white,
              marginHorizontal: 50,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              //   borderWidth: 1,
            }}>
            <ActivityIndicator size="large" color={loaderColor || 'red'} />
            <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default AppLoader;

const style = StyleSheet.create({
  loader: {
    height: 70,
    backgroundColor: colors.default.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  container: {
    position: 'absolute',
    zIndex: 10,
    height: height,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});
