import { StatusBar } from 'expo-status-bar';
import './gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RouteNavigator from './src/navigators/RouteNavigator';
import { Provider } from 'react-redux';
import store from './src/store/store';
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RouteNavigator />
      </NavigationContainer>
    </Provider>
  );
}