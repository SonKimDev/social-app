import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'

interface Props {
  size?: number;
  navigation?: any;
}

export default function BackButton(props: Props) {

  const { size = 26, navigation } = props;

  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.button}>
      <Icon name={'arrowLeft'} strokeWidth={2.5} size={size} color={theme.colors.text}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.07)'
  }
})