import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchNotification } from '../../services/notifivationService';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/auth/selector';
import ScreenWrapper from '../../components/ScreenWrapper';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import NotificationItem from '../../components/NotificationItem';
import Header from '../../components/Header';

export default function NotificationScreen() {

  const [notifications, setNotifications] = useState([]);

  const navigation = useNavigation();
  const user = useSelector(selectUserData);

  async function getNotifications() {
    let res = await fetchNotification(user.id);
    if (res.success) {
      setNotifications(res.data);
    }
  }

  useEffect(() => {
    getNotifications();
  }, [])
  

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title='Notifications'/>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listStyle}>
          {
            notifications.map(item => {
              return (
                <NotificationItem
                  key={item?.id}
                  item={item}
                  navigation={navigation}
                />
              )
            })
          }
          {
            notifications.length == 0 && (
              <Text style={styles.noData}>No notifications yet.</Text>
            )
          }
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4)
  },
  listStyle: {
    paddingVertical: 20,
    gap: 10
  },
  noData: {
    fontSize: hp(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
    textAlign: 'center'
  }
})