import {CallIcon} from 'hugeicons-react-native'

const Call = (props) => {

  return (
    <CallIcon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Call;
  