import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

export default function PostDetailScreen() {
  const route = useRoute()

  const { postId } = route.params;

  return (
    <View>
      <Text>PostDetailScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})