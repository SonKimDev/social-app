import {Home01Icon} from 'hugeicons-react-native'

const Home = (props) => {

  return (
    <Home01Icon
      size={24} 
      variant={'stroke'}
      color={props.color}
      strokeWidth={props.strokeWidth}
    />
  )
}
  
export default Home;
  