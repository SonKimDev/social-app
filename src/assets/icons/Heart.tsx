import {FavouriteIcon} from 'hugeicons-react-native'

const Heart = (props) => {

  return (
    <FavouriteIcon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Heart;
  