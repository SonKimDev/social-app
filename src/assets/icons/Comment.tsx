import {Comment01Icon} from 'hugeicons-react-native'

const Comment = (props) => {

  return (
    <Comment01Icon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Comment;
  