import { StyleSheet, Text, ViewStyle } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';
import { getUserImageSrc } from '../services/imageService';

interface Props {
  uri: any,
  size?: number,
  rounded?: number,
  style?: ViewStyle,
}

export default function Avatar(props: Props) {

  const { uri, size = hp(4.5), rounded = theme.radius.md, style } = props;

  return (
    <Image
      source={getUserImageSrc(uri)}
      transition={100}
      style={[styles.avatar, {height: size, width: size, borderRadius: rounded}, style]}
    />
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderCurve: 'continuous',
    borderColor: theme.colors.darkLight,
    borderWidth: 1,
  }
})