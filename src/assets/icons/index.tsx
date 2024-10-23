import React from 'react'
import { StyleSheet } from 'react-native'
import { Home01Icon, CallIcon, Camera01Icon, Comment01Icon, Delete02Icon, Edit01Icon, FavouriteIcon, MoreHorizontalIcon, ArrowLeft01Icon, Image01Icon, Location01Icon, SquareLock02Icon, Logout01Icon, Mail01Icon, AddSquareIcon, Search01Icon, SentIcon, Share01Icon, UserIcon, Video01Icon } from 'hugeicons-react-native'
import { theme } from '../../constants/theme'

const icons = {
  home: Home01Icon,
  call: CallIcon,
  camera: Camera01Icon,
  comment: Comment01Icon,
  delete: Delete02Icon,
  edit: Edit01Icon,
  heart: FavouriteIcon,
  more: MoreHorizontalIcon,
  arrowLeft: ArrowLeft01Icon,
  image: Image01Icon,
  location: Location01Icon,
  lock: SquareLock02Icon,
  logout: Logout01Icon,
  mail: Mail01Icon,
  plus: AddSquareIcon,
  search: Search01Icon,
  send: SentIcon,
  share: Share01Icon,
  user: UserIcon,
  video: Video01Icon,
}

interface Props {
  name: string,
  height?: number,
  width?: number,
  strokeWidth?: number,
  color?: string,
  size?: number,
  fill?: string,
}

const Icon = (props: Props) => {
  const { name, height = 24, width = 24, strokeWidth = 1.9, color = theme.colors.textLight, size = 24, fill = 'none' } = props;

  const IconComponent = icons[name]; // Lấy icon động theo tên

  if (!IconComponent) {
    return null; // Nếu icon không tồn tại, trả về null hoặc component placeholder
  }

  return (
    <IconComponent
      size={size} // Truyền size nếu cần
      color={color} // Truyền màu
      strokeWidth={strokeWidth} // Truyền strokeWidth
      style={{ height, width }} // Nếu cần tùy chỉnh width, height
      fill={fill}
    />
  )
}

export default Icon

const styles = StyleSheet.create({})
