import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import Loading from './Loading';
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';

export default function Button(props: any) {

  if (props.loading) {
    return (
      <View style={[styles.button, props.buttonStyle, {backgroundColor: 'white'}]}>
        <Loading />
      </View>
    )
  }

  return (
    <Pressable onPress={props.onPress} style={[styles.button, props.buttonStyle, props.hasShadow && styles.shadow]}>
      <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: theme.colors.primary,
    height: hp(6.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderCurve: 'continuous',
    borderRadius: theme.radius.xl
  },
  text:{
    fontSize: hp(2.5),
    color: 'white',
    fontWeight: theme.fonts.bold,
  },
  shadow:{
    shadowColor: theme.colors.dark,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
})