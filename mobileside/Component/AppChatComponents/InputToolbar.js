/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Image} from 'react-native';
import {InputToolbar, Actions, Composer, Send} from 'react-native-gifted-chat';
import colors from '../../config/colors';
import AppIconButton from '../AppButtons/AppIconButton';

export const renderInputToolbar = props => (
  <InputToolbar
    {...props}
    containerStyle={{
      // backgroundColor: '#222B45',
      paddingTop: 6,
    }}
    primaryStyle={{alignItems: 'center'}}
  />
);

export const renderActions = props => (
  <Actions
    {...props}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 0,
    }}
    // name="attachment"
    //<Image
    //   style={{width: 32, height: 32}}
    //   source={{
    //     uri: 'https://placeimg.com/32/32/any',
    //   }}
    // />
    icon={() => (
      <AppIconButton
        leftIcon={true}
        iconAs="MaterialIcons"
        name="attachment"
        size={30}
        iconColor={colors.purplepro.purple7000}
        IconStyle={{
          top: 10,
          width: 32,
          height: 32,
        }}
        // onPress={() => {
        //   props?.onSend(props);
        // }}
      />
    )}
    options={{
      'Choose From Library': () => {
        console.log('Choose From Library');
      },
      Cancel: () => {
        console.log('Cancel');
      },
    }}
    optionTintColor="#222B45"
  />
);

export const renderComposer = props => {
  console.log('renderComposer props', props);
  return (
    <Composer
      {...props}
      textInputStyle={{
        color: '#222B45',
        backgroundColor: '#EDF1F7',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#E4E9F2',
        paddingTop: 8.5,
        paddingHorizontal: 12,
        marginLeft: 0,
      }}
      textInputAutoFocus={true}
      onFocusInput={() => {
        console.log('props On focus Input', props);
        props?.setIsTyping(true);
      }}
      //textInputProps={()=>{}}
      onTextChanged={() => props?.setIsTyping(true)}
      // onInputSizeChanged={() => props.setIsTyping(true)}
      keyboardAppearance="light"></Composer>
  );
}; //(
// <Composer
//   {...props}
//   textInputStyle={{
//     color: '#222B45',
//     backgroundColor: '#EDF1F7',
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: '#E4E9F2',
//     paddingTop: 8.5,
//     paddingHorizontal: 12,
//     marginLeft: 0,
//   }}
//   onInputSizeChanged={}
//   keyboardAppearance="light"></Composer>
//);

export const renderSend = props => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    }}>
    <AppIconButton
      leftIcon={true}
      iconAs="MaterialIcons"
      name="send"
      size={30}
      iconColor={colors.purplepro.purple7000}
      IconStyle={{
        top: 10,
        width: 32,
        height: 32,
      }}
      onPress={() => {
        // console.log('props', props);
        props?.onSend(props);
      }}
    />
  </Send>
);
