import {Video01Icon} from 'hugeicons-react-native'

const Video = (props) => {

  return (
    <Video01Icon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Video;
  