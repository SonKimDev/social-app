import { Alert, ScrollView, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createComment, fetchPostDetails, removeComment, removePost } from '../../services/postService';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import PostCard from '../../components/PostCard';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/auth/selector';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import Icon from '../../assets/icons';
import CommentItem from '../../components/CommentItem';
import { supabase } from '../../lib/supabase';
import { getUserData } from '../../services/userService';
import { createNotification } from '../../services/notifivationService';

export default function PostDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { postId, commentId } = route.params || {};
  const user = useSelector(selectUserData);

  const inputRef = useRef(null);
  const commentRef = useRef('');

  const [post, setPost] = useState(null);
  const [startLoading, setStartLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  async function getPostDetails() {
    let res = await fetchPostDetails(postId);
    if (res.success) {
      setPost(res.data);
    }
    setStartLoading(false);
  }

  async function onNewComment() {
    if (!commentRef.current || commentRef.current.trim() === '') {
      return null;
    }
    

    let data = {
      userId: user?.id,
      postId: post?.id,
      text: commentRef.current
    }

    setLoading(true);
    let res = await createComment(data);
    setLoading(false);

    if (res.success) {
      if (user.id != post.userId) {
        let notify = {
          senderId: user.id,
          receiverId: post.userId,
          title: 'commented your post',
          data: JSON.stringify({postId: post.id, commentId: res?.data?.id})
        }
        createNotification(notify);
      }
      inputRef?.current.clear();
      commentRef.current = '';
    } else {
      Alert.alert('Comment', res.msg);
    }
  }

  async function onDeleteComment(comment) {
    let res = await removeComment(comment?.id);
    if (res.success) {
      setPost(prevPost => {
        let updatePost = {...prevPost}
        updatePost.comments = updatePost.comments.filter(c => c.id != comment?.id);
        return updatePost;
      })
    } else {
      Alert.alert('Comment', res.msg);
    }
  }
  
  async function handleNewComment(payload) {
    if (payload.new) {
      let newComment = {...payload.new};
      let res = await getUserData(newComment.userId);
      newComment.user = res.success ? res.data : {};
      setPost(prevPost =>{
        return {
          ...prevPost,
          comments: [newComment, ...prevPost.comments]
        }
      })
    }
    
  }

  async function onDeletePost(item) {
    let res = await removePost(post?.id);

    if (res.success) {
      navigation.goBack();
    } else {
      Alert.alert('post', res.msg);
    }
  }

  async function onEditPost(item) {
    navigation.goBack();
    navigation.navigate('NewPostScreen', {post: item});
  }

  useEffect(() => {
    let commentChannel = supabase
    .channel('comments')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'comments',
      filter: `postId=eq.${postId}`
    }, handleNewComment)
    .subscribe()
    getPostDetails();

    return () => {
      supabase.removeChannel(commentChannel);
    }
  }, [])
  
  if (startLoading) {
    return (
      <View style={styles.center}>
        <Loading />
      </View>
    )
  }

  if (!post) {
    return (
      <View style={[styles.center, {justifyContent: 'flex-start', marginTop: 100}]}>
        <Text style={styles.notFound}>Post not found!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <PostCard
          item={{...post, comments: [{count: post?.comments?.length}]}}
          currentUser={user}
          navigation={navigation}
          hasShadow={false}
          showMoreIcon={false}
          showDelete={true}
          onDelete={onDeletePost}
          onEdit={onEditPost}
        />

        <View style={styles.inputContainer}>
          <Input
            inputRef={inputRef}
            onChangeText={value => commentRef.current = value}
            placeholder='Type comment...'
            placeholderTextColor={theme.colors.textLight}
            containerStyles={{flex: 1, height: hp(6.2), borderRadius: theme.radius.xl}}
          />

          {
            loading ? (
              <View style={styles.loading}>
                <Loading size='small'/>
              </View>
            ) : (
              <TouchableOpacity style={styles.sendIcon} onPress={onNewComment}>
                <Icon
                  name='send'
                  color={theme.colors.primaryDark}
                />
              </TouchableOpacity>
            )
          }
        </View>

        <View style={{marginVertical: 15, gap: 17}}>
          {
            post?.comments?.map(comment => 
              <CommentItem
                key={comment?.id?.toString()}
                item={comment}
                highlight = {comment.id == commentId}
                onDelete={onDeleteComment}
                canDelete={user?.id == comment?.userId || user?.id == post?.id}
              />
            )
          }

          {
            post?.comments?.length == 0 && (
              <Text style={{color: theme.colors.text, marginLeft: 5}}>
                Be first to comment!
              </Text>
            )
          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: wp(7)
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  list: {
    paddingHorizontal: wp(4)
  },
  sendIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
    height: hp(5.8),
    width: hp(5.8)
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notFound: {
    fontSize: hp(2.5),
    color: theme.colors.text,
    fontWeight: theme.fonts.medium
  },
  loading: {
    height: hp(5.8),
    width: hp(5.8),
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scale: 1.3}]
  }
})