import {StyleSheet, View, Text, TextInput, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {placeholder} from '@babel/types';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width} = Dimensions.get('window');

const InputField = props => {
  const {
    placeholder,
    name,
    id,
    value,
    iconName,
    password,
    autoCorrect,
    onChangeText,
    onFocus,
    onBlur,
    onEndEditing,
    secureTextEntry,
    keyBoardType,
    borderRadius,
    islabel,
    label,
    labelStyle,
    height,
    width,
    error,
    isIcon,
  } = props;
  var bdRad = 5 + borderRadius || 5;
  var inputHight = 50 + height || 50;
  var inputWidth = width || `80%`;
  const [hidePassword, setHidePassword] = useState(password);

  const [isFocused, setIsFocused] = useState(false);
  const wh = width / 2;
  // console.log('onFocus', onFocus);
  return (
    <>
      {islabel ? (
        <>
          <View style={labelStyle}>
            <Text>{label}</Text>
          </View>
        </>
      ) : null}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? colors.dangerpro.danger700
              : isFocused
              ? colors.primarypro.primary500
              : colors.default.ligthWhite,
            width: inputWidth,
          },
        ]}>
        {isIcon && (
          <Icon
            name={iconName}
            style={[
              styles.icon,
              {
                color: colors.primarypro.primary500,
                fontSize: 22,
                left: 2,
              },
            ]}
          />
        )}
        <TextInput
          style={[
            styles.input,
            {
              borderRadius: bdRad,
              height: inputHight,
              width: inputWidth,
            },
          ]}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          autoCorrect={autoCorrect}
          onChangeText={onChangeText}
          onTouchStart={() => {
            // onFocus(),
            setIsFocused(true);
          }}
          onFocus={() => {
            // onFocus(),
            setIsFocused(true);
          }}
          onEndEditing={onEndEditing}
          onBlur={() => {
            // onBlur();
            setIsFocused(false);
          }}
          secureTextEntry={hidePassword}
          keyBoardType={keyBoardType}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={[
              styles.icon,
              {
                color: colors.primarypro.primary700,
                fontSize: 22,
                right: 0,
              },
            ]}
          />
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.default.light,

    padding: 10,
    // borderWidth: 1,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: colors.default.lightGray,
  },
  icon: {
    top: 15,
  },
  inputContainer: {
    height: 55,
    backgroundColor: colors.default.light,
    flexDirection: 'row',

    borderWidth: 1.5,
    borderRadius: 5,
    margin: 3,
  },
});
export default InputField;
