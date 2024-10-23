import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { clearAuth } from '../../store/auth';
import { supabase } from '../../lib/supabase';
import ScreenWrapper from '../../components/ScreenWrapper';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import Icon from '../../assets/icons';
import Button from '../../components/Button';
import { selectUserData } from '../../store/auth/selector';
import Avatar from '../../components/Avatar';
import { fetchPosts } from '../../services/postService';
import PostCard from '../../components/PostCard';
import Loading from '../../components/Loading';
import { getUserData } from '../../services/userService';

var limit = 0;

export default function HomeScreen() {
  const user = useSelector(selectUserData);
  
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  async function getPosts() {
    if (!hasMore) {
      return null;
    }

    limit = limit + 10;
    let res = await fetchPosts(limit);
    if (res.success) {
      if (posts.length === res.data.length) {
        setHasMore(false);
      }
      setPosts(res.data);
    }
  }

  async function handlePostEvent(payload) {
    if (payload.eventType == 'INSERT' && payload?.new?.id) {
      let newPost = {...payload.new};
      let res = await getUserData(newPost.userId);
      newPost.postLikes = [];
      newPost.comments = [{count: 0}];
      newPost.user = res.success ? res.data : {};
      setPosts(prevPosts => [newPost, ...prevPosts])
    }
    if (payload.eventType == 'DELETE' && payload.old.id) {
      setPosts(prevPost => {
        let updatedPost = prevPost.filter(p => p.id != payload.old.id);
        return updatedPost;
      })
    }
    if (payload.eventType == 'UPDATE' && payload?.new?.id) {
      setPosts(prevPosts => {
        let updatedPost = prevPosts.map(post => {
          if (post.id == payload.new.id) {
            post.body = payload.new.body;
            post.file = payload.new.file;
          }
          return post;
        })
        return updatedPost;
      })
    }
  }

  useEffect(() => {
    let postChannel = supabase
    .channel('posts')
    .on('postgres_changes', {event: '*', schema: 'public', table: 'posts'}, handlePostEvent)
    .subscribe()
    getPosts();

    return () => {
      supabase.removeChannel(postChannel);
    }
  }, [])
  

  return (
    <ScreenWrapper bg='white'>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Linkup</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => navigation.navigate('NotificationScreen')}>
              <Icon name={'heart'} size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('NewPostScreen')}>
              <Icon name={'plus'} size={hp(3.2)} strokeWidth={2} color={theme.colors.text}/>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
              <Avatar 
                uri={user?.image}
                size={hp(4.3)}
                rounded={theme.radius.sm}
                style={{borderWidth: 2}}
              />
            </Pressable>
          </View>
        </View>

        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <PostCard item={item} currentUser={user} navigation={navigation}/>}
          onEndReached={() => {
            getPosts();
          }}
          onEndReachedThreshold={0}
          ListFooterComponent={hasMore ? (
            <View style={{marginVertical: posts.length === 0 ? 200 : 30}}>
              <Loading/>
            </View>
          ): (
            <View style={{marginVertical: 30}}>
              <Text style={styles.noPost}>No more posts</Text>
            </View>
          )}
        />

      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: wp(4)
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold
  },
  avatarImage: {
    height: hp(3.2),
    width: hp(4.2),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    borderColor: theme.colors.gray,
    borderWidth: 3
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4)
  },
  noPost: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text
  },
  pill: {
    position: 'absolute',
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight
  },
  pillText: {
    color: 'white',
    fontSize: hp(1.2),
    fontWeight: theme.fonts.bold
  }
});
