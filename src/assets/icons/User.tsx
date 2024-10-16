import {UserIcon} from 'hugeicons-react-native'

const User = (props) => {

  return (
    <UserIcon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default User;
  