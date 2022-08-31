// import {MaterialIcons} from '@expo/vector-icons';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import colors from '../../config/colors';
import AppIconButton from '../AppButtons/AppIconButton';
import MessageInput from '../MessageInput/MessageInput';

// import {
//   getLocationAsync,
//   pickImageAsync,
//   takePictureAsync,
// } from './mediaUtils'

const AppAccessoryBar = props => {
  const {onSend, setIsTyping} = props;
  return (
    <View style={styles.container}>
      {/* <Button onPress={() => pickImageAsync(onSend)} name="photo" />
      <Button onPress={() => takePictureAsync(onSend)} name="camera" />
      <Button onPress={() => getLocationAsync(onSend)} name="my-location" /> */}
      <MessageInput onSend={onSend} setIsTyping={setIsTyping} />
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
          setIsTyping();
          onSend();
        }}
      />
    </View>
  );
};

export default AppAccessoryBar;

const Button = ({onPress, size = 30, color = 'rgba(0,0,0,0.5)', ...props}) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons size={size} color={color} {...props} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
});
