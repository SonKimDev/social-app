import {Share01Icon} from 'hugeicons-react-native'

const Share = (props) => {

  return (
    <Share01Icon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Share;
  