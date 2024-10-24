import { Alert, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme } from '../constants/theme';
import { hp, stripHtmlTags, wp } from '../helpers/common';
import Avatar from './Avatar';
import moment from 'moment';
import Icon from '../assets/icons';
import RenderHTML from 'react-native-render-html';
import { downloadFile, getSupabaseFileUrl } from '../services/imageService';
import {Image} from 'expo-image'
import { Video } from 'expo-av';
import { createPostLike, removePostLike } from '../services/postService';
import Loading from './Loading';

interface Props {
  item: any,
  currentUser: any,
  navigation: any,
  hasShadow?: boolean,
  showMoreIcon?: boolean,
  showDelete?: boolean,
  onDelete?: (item: any) => void,
  onEdit?: (item: any) => void
}

const textStyle = {
  color: theme.colors.dark,
  fontSize: hp(1.75)
}

const tagsStyles = {
  div: textStyle,
  p: textStyle,
  ol: textStyle,
  h1: {
    color: theme.colors.dark
  },
  h4: {
    color: theme.colors.dark
  }
}

export default function PostCard(props: Props) {

  const { item, currentUser, navigation, hasShadow = false, showMoreIcon = true, showDelete = false, onDelete, onEdit } = props;

  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);

  const createdAt = moment(item?.created_at).format('MMM D');

  async function openPostsDetail() {
    if (!showMoreIcon) {
      return null;
    }
    navigation.navigate('PostDetailScreen', {postId: item?.id})
  }

  async function onLiked() {
    if (liked) {
      let updatedLikes = likes ? likes.filter(like => like?.userId != currentUser?.id) : [];
      setLikes([...updatedLikes])
      let res = await removePostLike(item?.id, currentUser?.id);
      if (!res.success) {
        Alert.alert('Post', 'Something went wrong!')
      }
    } else {
      let data = {
        userId: currentUser?.id,
        postId: item?.id
      }
      setLikes([...likes, data])
      let res = await createPostLike(data);
      if (!res.success) {
        Alert.alert('Post', 'Something went wrong!')
      }
    }
  }
  

  async function onShare() {
    let content = {message: stripHtmlTags(item?.body), url: null};
    if (item?.file) {
      setLoading(true);
      let url = await downloadFile(getSupabaseFileUrl(item?.file).uri);
      setLoading(false);
      content.url = url;
    }
    Share.share(content);
  }

  async function handlePostDelete() {
    Alert.alert('Comfirm', 'Are you sure you want to do this?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => onDelete(item),
        style: 'destructive',
      }
    ])
  }

  const liked = likes.filter(like => like?.userId == currentUser?.id)[0] ? true : false;
  
  useEffect(() => {
    if (Array.isArray(item?.postLikes)) {
      setLikes(item?.postLikes);
    } else {
      setLikes([]);
    }
  }, [item])
  
  return (
    <View style={[styles.container, hasShadow && styles.shadowStyles]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar
            size={hp(4.5)}
            uri={item?.user?.image}
            rounded={theme.radius.md}
          />
          <View style={{gap: 2}}>
            <Text style={styles.username}>{item?.user?.name}</Text>
            <Text style={styles.postTime}>{createdAt}</Text>
          </View>
        </View>
        {
          showMoreIcon && (
            <TouchableOpacity onPress={openPostsDetail}>
              <Icon
                name='more'
                size={hp(3.4)}
                strokeWidth={3}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          )
        }

        {
          showDelete && currentUser?.id === item?.userId && (
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => onEdit(item)}>
                <Icon
                  name='edit'
                  size={hp(2.5)}
                  strokeWidth={3}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePostDelete}>
                <Icon
                  name='delete'
                  size={hp(2.5)}
                  strokeWidth={3}
                  color={theme.colors.rose}
                />
              </TouchableOpacity>
            </View>
          )
        }
      </View>

      <View style={styles.content}>
        <View style={styles.postBody}>
          {
            item?.body && (
              <RenderHTML
                contentWidth={wp(100)}
                source={{html: item?.body}}
                tagsStyles={tagsStyles}
              />
            )
          }
        </View>

        {
          item?.file && item?.file?.includes('postImages') && (
            <Image
              source={getSupabaseFileUrl(item?.file)}
              transition={100}
              style={styles.postMedia}
              contentFit='cover'
            />
          )
        }

        {
          item?.file && item?.file?.includes('postVideos') && (
            <Video
              style={[styles.postMedia, {height: hp(30)}]}
              source={getSupabaseFileUrl(item?.file)}
              useNativeControls
              resizeMode='cover'
              isLooping
            />
          )
        }
      </View>

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={onLiked}>
            <Icon
              name='heart'
              size={24}
              color={liked ? theme.colors.rose : theme.colors.textLight}
              fill={liked ? theme.colors.rose : 'none'}
            />
          </TouchableOpacity>
          <Text style={styles.count}>
            {
              likes?.length
            }
          </Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={openPostsDetail}>
            <Icon
              name='comment'
              size={24}
              color={theme.colors.textLight}
            />
          </TouchableOpacity>
          <Text style={styles.count}>
            {
              item?.comments[0].count
            }
          </Text>
        </View>
        <View style={styles.footerButton}>
          {
            loading ? (
              <Loading
                size='small'
              />
            ) : <TouchableOpacity onPress={onShare}>
            <Icon
              name='share'
              size={24}
              color={theme.colors.textLight}
            />
          </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  shadowStyles: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 1
  },
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: theme.radius.xxl*1.1,
    borderCurve: 'continuous',
    padding: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    shadowColor: '#000'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  username: {
    fontSize: hp(1.7),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.medium
  },
  postTime: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    fontWeight: theme.fonts.medium
  },
  content: {
    gap: 10,
    // marginBottom: 10
  },
  postMedia: {
    height: hp(40),
    width: '100%',
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous'
  },
  postBody: {
    marginLeft: 5
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  footerButton: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18
  },
  count: {
    color: theme.colors.text,
    fontSize: hp(1.8)
  }
})