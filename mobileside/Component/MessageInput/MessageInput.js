import {Overlay} from 'native-base';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import KeyboardViewSpacer from 'react-native-keyboard-view-space/lib';
import colors from '../../config/colors';
import {RenderSend} from '../../Screens/ChatScreens/chat.screen';
import AppIconButton from '../AppButtons/AppIconButton';
import {RenderComposer} from '../AppChatComponents/InputToolbar';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
const {width, height} = Dimensions.get('window');

// import ImagePicker from "react-native-image-crop-picker";
// import { Overlay } from "react-native-elements";

function MessageInput({value, onSend, setIsTyping, props}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  // const [value, setValue] = useState('');
  // console.log('props', props);
  const pickImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setModalVisible(false);
      //onSend(image.path, 'image');
      setValue('');
      Keyboard.dismiss();
    });
  };
  const openCamera = async () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      setModalVisible(false);
      //onSend(image.path, 'image');
      setValue('');
      Keyboard.dismiss();
    });
  };

  const sendMessage = () => {
    onSend(value);
    // onSend(value, 'text');
    setValue('');
    Keyboard.dismiss();
    setIsTyping(false);
  };

  return (
    <>
      <View style={styles.container} {...props}>
        <TextInput
          multiline={true}
          placeholderTextColor={colors.default.medium}
          style={(styles.text, styles.input)}
          value={value}
          placeholder="Your message here..."
          onChangeText={text => setValue(text)}
          onTouchStart={() => {
            setIsTyping(true);
          }}
          onFocus={() => {
            setIsTyping(true);
          }}
        />
        <RenderSend />
        {/* {renderSend} */}
        {/* <RenderSend {...props} /> */}
        {/* <AppIconButton
          leftIcon={true}
          iconAs="MaterialIcons"
          name="attachment"
          width={-65}
          height={23}
          size={22}
          txtColor={colors.default.white}
          style={[
            {
              // backgroundColor: colors.dangerpro.danger600,
              // marginLeft: 12,
              alignSelf: 'center',
              borderWidth: 2,
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
          width={-65}
          height={23}
          size={22}
          txtColor={colors.default.white}
          style={[
            {
              backgroundColor: colors.dangerpro.danger600,
              // marginLeft: 12,
              alignSelf: 'center',
              borderWidth: 2,
            },
          ]}
          onPress={() => {
            sendMessage();
          }}
        /> */}
      </View>

      <Overlay
        visible={modalVisible}
        transparent={true}
        onBackdropPress={() => setModalVisible(false)}>
        <TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              margin: 20,
            }}>
            <View style={{alignItems: 'center'}}>
              <AppIconButton
                leftIcon={true}
                iconAs="FontAwesome"
                name="image"
                txtColor={colors.default.white}
                style={[
                  {
                    backgroundColor: colors.dangerpro.danger600,
                    marginLeft: 12,
                    alignSelf: 'center',
                  },
                ]}
                size={50}
                iconColor={'brown'}
                onPress={pickImage}
              />
              <Text
                style={{color: colors.default.medium}} //onPress={pickImage}
              >
                Media
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <AppIconButton
                leftIcon={true}
                iconAs="FontAwesome"
                txtColor={colors.default.white}
                style={[
                  {
                    backgroundColor: colors.dangerpro.danger600,
                    marginLeft: 12,
                    alignSelf: 'center',
                  },
                ]}
                size={50}
                iconColor={colors.amber.amber600}
                name="camera"
                onPress={openCamera}
              />
              <Text style={{color: colors.default.medium}}>Camera</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Overlay>
      <Overlay visible={imageModalVisible}>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <Image
            style={styles.image}
            source={{uri: 'https://picsum.photos/seed/picsum/200/300'}}
          />
        </View>
      </Overlay>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.default.white,
    borderRadius: 3,
    flexDirection: 'row',
    marginHorizontal: 2,
    // borderWidth: 2,
    //bottom: 90,
  },
  text: {
    color: colors.secondary.s700,
    fontSize: 16,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  input: {
    paddingHorizontal: 15,
    maxHeight: height / 16,
    width: '70%',
    borderWidth: 2,
  },
  icons: {
    flexDirection: 'row',
    // alignSelf: 'flex-end',
    margin: 10,
    borderWidth: 2,
  },
  modal: {
    marginTop: '70%',
    height: 150,
    marginHorizontal: 20,
    marginRight: 10,
    backgroundColor: colors.default.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MessageInput;
