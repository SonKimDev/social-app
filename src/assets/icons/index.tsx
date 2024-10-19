import React from 'react'
import { StyleSheet } from 'react-native'
import { Home01Icon, CallIcon, Camera01Icon, Comment01Icon, Delete01Icon, Edit01Icon, FavouriteIcon, MoreHorizontalIcon, ArrowLeft01Icon, Image01Icon, Location01Icon, LockIcon, Logout01Icon, Mail01Icon, PlusSignCircleIcon, Search01Icon, MailSend01Icon, Share01Icon, UserAccountIcon, Video01Icon } from 'hugeicons-react-native'
import { theme } from '../../constants/theme'

const icons = {
  home: Home01Icon,
  call: CallIcon,
  camera: Camera01Icon,
  comment: Comment01Icon,
  delete: Delete01Icon,
  edit: Edit01Icon,
  heart: FavouriteIcon,
  more: MoreHorizontalIcon,
  arrowLeft: ArrowLeft01Icon,
  image: Image01Icon,
  location: Location01Icon,
  lock: LockIcon,
  logout: Logout01Icon,
  mail: Mail01Icon,
  plus: PlusSignCircleIcon,
  search: Search01Icon,
  send: MailSend01Icon,
  share: Share01Icon,
  user: UserAccountIcon,
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
