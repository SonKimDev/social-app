import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/Auth/HomeScreen';
import NewPostScreen from '../screens/Auth/NewPostScreen';
import NotificationScreen from '../screens/Auth/NotificationScreen';
import ProfileScreen from '../screens/Auth/ProfileScreen';
import EditProfileScreen from '../screens/Auth/EditProfileScreen';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown: false}}>
      <Stack.Screen name='HomeScreen' component={HomeScreen}/>
      <Stack.Screen name='NewPostScreen' component={NewPostScreen}/>
      <Stack.Screen name='NotificationScreen' component={NotificationScreen}/>
      <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
      <Stack.Screen name='EditProfileScreen' component={EditProfileScreen}/>
    </Stack.Navigator>
  )
}