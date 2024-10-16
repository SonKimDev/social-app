import {Camera01Icon} from 'hugeicons-react-native'

const Camera = (props) => {

  return (
    <Camera01Icon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Camera;
  