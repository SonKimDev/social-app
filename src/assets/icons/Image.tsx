import {Image01Icon} from 'hugeicons-react-native'

const Image = (props) => {

  return (
    <Image01Icon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Image;
  