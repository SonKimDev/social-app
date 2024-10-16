import {Location01Icon} from 'hugeicons-react-native'

const Location = (props) => {

  return (
    <Location01Icon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Location;
  