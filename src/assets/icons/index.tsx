import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ArrowLeft from './ArrowLeft'
import Call from './Call'
import Camera from './Camera'
import Comment from './Comment'
import Delete from './Delete'
import Edit from './Edit'
import Heart from './Heart'
import Home from './Home'
import Image from './Image'
import Location from './Location'
import Lock from './Lock'
import Logout from './Logout'
import Mail from './Mail'
import Plus from './Plus'
import Search from './Search'
import Send from './Send'
import Share from './Share'
import User from './User'
import Video from './Video'
import { theme } from '../../constants/theme'

const icons = {
  arrowLeft: ArrowLeft,
  call: Call,
  camera: Camera,
  comment: Comment,
  delete: Delete,
  edit: Edit,
  heart: Heart,
  home: Home,
  image: Image,
  location: Location,
  lock: Lock,
  logout: Logout,
  mail: Mail,
  plus: Plus,
  search: Search,
  send: Send,
  share: Share,
  user: User,
  video: Video,
}

interface Props {
  name: string,
  height?: number,
  width?: number,
  strokeWidth?: number,
  color?: string,
  size?: number,
}

const Icon = (props: Props) => {

  
  const { name, height = 24, width = 24, strokeWidth = 1.9, color = theme.colors.textLight, size = 24} = props;
  
  const IconComponent = icons[name];

  return (
    <IconComponent
      height={height}
      width={width}
      strokeWidth={strokeWidth}
      color={color}
      size={size}
    />
  )
}

export default Icon

const styles = StyleSheet.create({})