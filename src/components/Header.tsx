import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackButton from './BackButton';
import { useNavigation } from '@react-navigation/native';
import { hp } from '../helpers/common';
import { theme } from '../constants/theme';

interface Props {
  title?: string,
  showBackButton?: boolean,
  mb?: number
}

export default function Header(props: Props) {

  const { title, showBackButton = true, mb = 10 } = props;

  const navigation = useNavigation();

  return (
    <View style={[styles.container, {marginBottom: mb}]}>
      {
        showBackButton && (
          <View style={styles.backButton}>
            <BackButton navigation={navigation}/>
          </View>
        )
      }
      <Text style={styles.title}>{title || ""}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    gap: 10
  },
  backButton:{
    position: 'absolute',
    left: 0
  },
  title:{
    fontSize: hp(2.7),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textDark
  },
})