import {Mail01Icon} from 'hugeicons-react-native'

const Mail = (props) => {

  return (
    <Mail01Icon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Mail;
  