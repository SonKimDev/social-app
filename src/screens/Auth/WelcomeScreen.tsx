import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ScreenWrapper from '../../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { hp, wp } from '../../helpers/common';
import Button from '../../components/Button';
import { theme } from '../../constants/theme';

export default function WelcomeScreen() {

  const navigation = useNavigation();

  return (
    <ScreenWrapper bg={'white'}>
      <StatusBar style='dark'/>
      <View style={styles.container}>
        <Image style={styles.welcomeImage} resizeMode='contain' source={require('../../assets/images/welcome.png')}/>

        <View style={{gap: 20, marginBottom: hp(1.6)}}>
          <Text style={styles.title}>LinkUp!</Text>
          <Text style={styles.punchLine}>
            Where every thought finds a home and every image tells a story.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
              title='Getting Started'
              buttonStyle={{marginHorizontal: wp(3)}}
              onPress={() => navigation.navigate('SignUpScreen')}
            />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={[styles.loginText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: wp(10),
  },
  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf: 'center',
    marginBottom: hp(20),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold,
  },
  punchLine: {
    textAlign: 'center',
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text,
  },
  footer: {
    gap: 30,
    width: '100%',
  },
  bottomTextContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  loginText:{
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6)
  },
})