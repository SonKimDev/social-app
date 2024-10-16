import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WelcomeScreen from '../screens/Main/WelcomeScreen';
import SignUpScreen from '../screens/Main/SignUpScreen';
import LoginScreen from '../screens/Main/LoginScreen';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{headerShown: false}}>
      <Stack.Screen name='WelcomeScreen' component={WelcomeScreen}/>
      <Stack.Screen name='SignUpScreen' component={SignUpScreen}/>
      <Stack.Screen name='LoginScreen' component={LoginScreen}/>
    </Stack.Navigator>
  )
}