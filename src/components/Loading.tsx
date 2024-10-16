import { ActivityIndicator, ColorValue, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme';

interface Props {
  size?: 'large' | 'small',
  color?: ColorValue,
}

export default function Loading(props: Props) {

  const { size = 'large', color = theme.colors.primary } = props;

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={size} color={color}/>
    </View>
  )
}

const styles = StyleSheet.create({})