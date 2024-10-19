import { StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';

interface Props {
  icon?: ReactNode,
  containerStyles?: ViewStyle,
  inputRef?: any,
  placeholder?: string,
  secureTextEntry?: boolean,
  multiline?: boolean,
  onChangeText?: (text: string) => void,
}

export default function Input(props: Props) {

  const { icon, containerStyles, inputRef, placeholder, secureTextEntry = false, multiline = false, onChangeText } = props;

  return (
    <View style={[styles.container, containerStyles]}>
      {
        icon && icon
      }
      <TextInput
        style={{flex: 1}}
        placeholderTextColor={theme.colors.textLight}
        ref={inputRef}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        autoCorrect={false}
        autoCapitalize='none'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(7.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous',
    paddingHorizontal: 18,
    gap: 12,
  }
})