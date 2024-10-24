import { Alert, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../../components/BackButton';
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/common';
import Input from '../../components/Input';
import Icon from '../../assets/icons';
import Button from '../../components/Button';
const SignUpScreen = () => {

  const navigation = useNavigation();
  const emailRef = useRef('');
  const nameRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    if(!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert('Login', 'please fill alll the fields!');
      return;
    }

    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const { data: {session}, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });

    setLoading(false);
    
    if (error) {
      Alert.alert('Sign Up', error.message);
    }
  }

  return (
    <ScreenWrapper bg={'white'}>
      <StatusBar style='dark'/>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <BackButton navigation={navigation} />

        <View>
          <Text style={styles.welcomeText}>Let's, </Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        <View style={styles.form}>
          <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
            Please fill the details to create an account
          </Text>
          <Input
            icon={<Icon name={'user'} size={26} strokeWidth={1.6}/>}
            placeholder='Enter your name'
            onChangeText={value => nameRef.current = value}
          />
          <Input
            icon={<Icon name={'mail'} size={26} strokeWidth={1.6}/>}
            placeholder='Enter your email'
            onChangeText={value => emailRef.current = value}
          />
          <Input
            icon={<Icon name={'lock'} size={26} strokeWidth={1.6}/>}
            placeholder='Enter your password'
            secureTextEntry={true}
            onChangeText={value => passwordRef.current = value}
          />
          <Text style={styles.forgotPassword}>
            Forgot Password?
          </Text>
          <Button
            title={'Sign up'}
            loading={loading}
            onPress={onSubmit}
            hasShadow
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?
          </Text>
          <Pressable onPress={() => navigation.replace('LoginScreen')}>
            <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>
              Login
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </ScreenWrapper>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText:{
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
})