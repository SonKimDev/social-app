import { StyleSheet, View, TouchableOpacity, Alert, Pressable, Text} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserData } from '../../store/auth/selector'
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { hp, wp } from '../../helpers/common';
import Header from '../../components/Header';
import Icon from '../../assets/icons';
import { theme } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import { clearAuth } from '../../store/auth';
import Avatar from '../../components/Avatar';

export default function ProfileScreen() {

  const user = useSelector(selectUserData);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function onLogout() {
    dispatch(clearAuth());
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      console.error('Sign out error:', error); // Log lỗi nếu có
      Alert.alert('logout', 'Error signing out');
    } else {
      console.log('Successfully signed out'); // Log thành công
    }
  }

  async function handleLogout() {
    Alert.alert('Confirm', "Are you sure you want to log out?", [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Logout',
        onPress: () => onLogout(),
        style: 'destructive'
      }
    ])
  }
  

  console.log(user);

  return (
    <ScreenWrapper bg='white'>
      <UserHeader user={user} navigation={navigation} handleLogout={() => handleLogout()}/>
    </ScreenWrapper>
  )
}

const UserHeader = ({ user, navigation, handleLogout }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4) }}>
      <View>
        <Header title='Profile' mb={30}/>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name='logout' color={theme.colors.rose} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{gap: 15}}>
          <View style={styles.avatarContainer}>
            <Avatar
              uri={user?.image}
              size={hp(12)}
              rounded={theme.radius.xxl*1.4}
            />
            <Pressable style={styles.editIcon} onPress={() => navigation.navigate('EditProfileScreen')}>
              <Icon name='edit' strokeWidth={2.5} size={20}/>
            </Pressable>
          </View>

          <View style={{alignItems: 'center', gap: 4}}>
            <Text style={styles.userName}>{user && user.name}</Text>
            <Text style={styles.infoText}>{user && user.address}</Text>
          </View>

          <View style={{gap: 10}}>
            <View style={styles.info}>
              <Icon name='mail' size={20} color={theme.colors.textLight}/>
              <Text style={styles.infoText}>
                {user && user.email}
              </Text>
            </View>
            {
              user && user.phoneNumber && (
              <View style={styles.info}>
                <Icon name='call' size={20} color={theme.colors.textLight}/>
                <Text style={styles.infoText}>
                  {user && user.phoneNumber}
                </Text>
              </View>
              )
            }
            {
              user && user.bio && (
                <Text style={styles.infoText}>
                  {user.bio}
                </Text>
              )
            }
          </View>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    marginHorizontal: wp(4),
    marginBottom: 20
  },
  headerShape: {
    width: wp(100),
    height: hp(20)
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: 'center'
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7
  },
  userName: {
    fontSize: hp(3),
    fontWeight: '500',
    color: theme.colors.textDark
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: '500',
    color: theme.colors.textLight
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: '#fee2e2'
  },
  listStyle: {
    paddingHorizontal: wp(4),
    paddingBottom: 30
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text
  }
})