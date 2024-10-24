import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/Main/HomeScreen';
import NewPostScreen from '../screens/Main/NewPostScreen';
import NotificationScreen from '../screens/Main/NotificationScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import EditProfileScreen from '../screens/Main/EditProfileScreen';
import PostDetailScreen from '../screens/Main/PostDetailScreen';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown: false}}>
      <Stack.Screen name='HomeScreen' component={HomeScreen}/>
      <Stack.Screen name='NewPostScreen' component={NewPostScreen}/>
      <Stack.Screen name='NotificationScreen' component={NotificationScreen}/>
      <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
      <Stack.Screen name='EditProfileScreen' component={EditProfileScreen}/>
      <Stack.Screen name='PostDetailScreen' component={PostDetailScreen} options={{presentation: Platform.OS == 'android' ? 'none' : 'modal'}}/>
    </Stack.Navigator>
  )
}