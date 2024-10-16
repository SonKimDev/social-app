import {PlusSignCircleIcon} from 'hugeicons-react-native'

const Plus = (props) => {

  return (
    <PlusSignCircleIcon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Plus;
  