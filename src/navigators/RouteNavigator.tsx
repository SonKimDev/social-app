import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../store/auth/selector';
import { supabase } from '../lib/supabase';
import { clearAuth, setAuth, setUserData } from '../store/auth';
import { getUserData } from '../services/userService';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

export default function RouteNavigator() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) { // Kiểm tra nếu session có user
        dispatch(setAuth(session.user));
        updateUserData(session.user);
      } else {
        dispatch(clearAuth());
      }
    });
  }, []);

  const updateUserData = async (user) => {
    const res = await getUserData(user?.id);

    if (res?.success) {
      const email = user?.email || null;
      dispatch(setUserData({ ...res.data, email }));
    } else {
      console.error('Failed to fetch user data');
    }
  };

  return auth ? <MainNavigator /> : <AuthNavigator />;
}
