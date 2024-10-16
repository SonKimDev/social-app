import {SquareLock01Icon} from 'hugeicons-react-native'

const Lock = (props) => {

  return (
    <SquareLock01Icon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Lock;
  