import { StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children?: ReactNode,
  bg?: string,
}

export default function ScreenWrapper(props: Props) {

  const { children, bg } = props;

  const { top } = useSafeAreaInsets();

  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View style={{flex: 1, paddingTop, backgroundColor: bg}}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({})